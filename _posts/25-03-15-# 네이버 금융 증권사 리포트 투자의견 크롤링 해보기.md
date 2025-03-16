# 네이버 금융 증권사 리포트 투자의견 크롤링 해보기

이 프로젝트는 네이버 금융 리서치 페이지에서 기업 분석 보고서(종목별)의 투자의견(BUY, NEWTRAL, SELL)을 크롤링하여 저장하는 Python 코드입니다. 웹 스크래핑을 통해 종목별 투자의견과 일자를 수집하여 JSON 형식으로 저장합니다.

## 주의 사항
- 네이버의 `robots.txt` 정책을 준수하며 크롤링할 것.
- `429 Too Many Requests` 오류를 방지하기 위해 적절한 딜레이를 추가했지만, IP가 차단될 가능성이 있음.
- JSON 데이터 저장 경로를 적절히 설정해야 합니다.
- 증권사 리포트 및 투자의견은 각 저작자의 저작물로써 허가 없는 사용에 대한 책임은 본인에게 있습니다.

아래는 결과 파일의 예시입니다
```json
{
    "LG전자": {
        "25.01.24": [
            "매수"
        ],
        "25.01.09": [
            "매수"
        ],
        "25.01.06": [
            "Buy"
        ],
        "25.01.03": [
            "Buy"
        ],
        "24.12.19": [
            "Buy"
        ],
        "24.11.29": [
            "Buy"
        ]
    },
    "현대차": {
        "25.01.24": [
            "OutPerform"
        ],
        "25.02.19": [
            "없음"
        ],
        "25.01.14": [
            "Buy"
        ],
        "25.01.13": [
            "매수"
        ],
        "25.01.10": [
            "매수"
        ],
        "24.11.29": [
            "Buy"
        ]
    }
}
```


## 기능 설명

### 1. `link_comment(url)`
특정 기업 분석 리포트 페이지에서 코멘트를 추출하는 함수입니다.
- HTTP 요청을 보낼 때 `Session`을 사용하여 쿠키를 유지합니다.
- `429 Too Many Requests` 오류가 발생하면 일정 시간 랜덤 딜레이 후 재시도합니다.
- `BeautifulSoup`을 이용해 `em` 태그에서 코멘트를 찾습니다.

```python
def link_comment(url):
    try:
        # 세션 생성 (쿠키 유지)
        session = requests.Session()
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        })

        # HTML 가져오기 (429 방지)
        for _ in range(3):  # 최대 3번 재시도
            response = session.get(url)
            if response.status_code == 429:
                print("⚠ 429 Too Many Requests - 재시도 중...")
                time.sleep(random.uniform(1, 3))  # 랜덤 딜레이
            else:
                break  # 정상 응답이면 루프 탈출

        response.raise_for_status()  # HTTP 오류 확인

        # BeautifulSoup으로 HTML 파싱
        soup = BeautifulSoup(response.content, "html.parser")

        # 특정 <em> 태그 찾기
        comments = soup.find_all('em', class_='coment')

        if comments:
            return [comment.text.strip() for comment in comments]  # 리스트로 반환
        else:
            print("❌ 해당 클래스를 가진 태그를 찾을 수 없습니다.")
            return []

    except requests.exceptions.RequestException as e:
        print(f"❌ 웹사이트 요청 중 오류 발생: {e}")
    except Exception as e:
        print(f"❌ 기타 오류 발생: {e}")
```

### 2. `news_list(url)`
주어진 URL에서 기업별 리포트를 수집하는 함수입니다.
- `requests.Session`을 사용하여 HTTP 요청을 보냅니다.
- `tr` 태그 내에서 종목명, 리포트 링크, 날짜 정보를 추출합니다.
- 추출된 링크에서 `link_comment()`를 호출하여 코멘트도 함께 가져옵니다.

```python
def news_list(url):
    try:
        session = requests.Session()
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        })

        for _ in range(3):
            response = session.get(url)
            if response.status_code == 429:
                print("⚠ 429 Too Many Requests - 재시도 중...")
                time.sleep(random.uniform(1, 3))
            else:
                break

        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        table_rows = soup.find_all("tr")
        stocks = []
        base_url = 'https://finance.naver.com/research/'
        for row in table_rows:
            stock_tag = row.find("a", class_="stock_item")
            if stock_tag is None: #종목이 아닌 태그의 경우 스킵
                continue
            link_tag = row.find("a", class_=False)  
            date_tag = row.find("td", class_="date")

            stock = stock_tag.text.strip() if stock_tag else "None"
            link_url = base_url + link_tag['href'] if link_tag and 'href' in link_tag.attrs else None
            date = date_tag.text.strip() if date_tag else "N/A"

            coment = link_comment(link_url) if link_url else []
            stocks.append((stock, coment, date))

        return stocks  # 결과를 반환

    except requests.exceptions.RequestException as e:
        print(f"❌ 웹사이트 요청 중 오류 발생: {e}")
        return []
    except Exception as e:
        print(f"❌ 기타 오류 발생: {e}")
        return []
```

### 3. `url_generator(n)`
네이버 금융 리서치 페이지의 여러 페이지 링크를 생성하는 함수입니다.
- 기본 URL (`https://finance.naver.com/research/company_list.naver?&page=`)을 기반으로 원하는 페이지 수(`n`)만큼 링크를 생성합니다.

```python
def url_generator(n):
    links =[]
    header = 'https://finance.naver.com/research/company_list.naver?&page='
    for i in range(2,n): #1페이지는 링크형식이 다름
        links.append(header+str(i))
    return links
```

### 4. `update_stock(url)`
크롤링한 데이터를 JSON 파일(`stock_data.json`)에 저장하는 함수입니다.
- 기존 데이터를 로드하여 새로운 데이터를 추가합니다.
- 새로운 종목이 있으면 딕셔너리에 추가한 후 JSON 파일로 저장합니다.

```python
def update_stock(url):
    try:
        with open("stock_data.json", "r", encoding="utf-8") as f:
            stock_dict = json.load(f)  # 기존 데이터 로드
    except FileNotFoundError:
        stock_dict = {}  # 파일이 없으면 빈 딕셔너리로 시작

    new_data = news_list(url)  # URL에서 새 데이터 가져오기

    # 새 데이터를 stock_dict에 추가
    for id_, status, date in new_data:
        if id_ not in stock_dict:
            stock_dict[id_] = {}  # 새로운 종목 추가
        stock_dict[id_][date] = status  # 날짜별 상태 저장

    # JSON 파일에 다시 저장
    with open("stock_data.json", "w", encoding="utf-8") as f:
        json.dump(stock_dict, f, indent=4, ensure_ascii=False)

    print("새 데이터가 추가되었습니다.")
```

### 5. 메인 실행 코드
크롤러가 100페이지까지 탐색하며 데이터를 수집합니다.

```python
for link in url_generator(100):
    update_stock(link)
```

## 실행 방법

1. `requests`와 `BeautifulSoup4` 패키지가 필요합니다. 설치가 되어 있지 않다면 아래 명령어로 설치할 수 있습니다.
   ```bash
   pip install requests beautifulsoup4
   ```
2. 코드를 실행하면 `stock_data.json` 파일이 생성되며 크롤링한 데이터가 저장됩니다.



---

이 프로젝트는 네이버 금융 데이터를 분석하거나 기업 리포트를 수집하여 감성 분석 등에 활용할 수 있습니다. 필요에 따라 코드를 수정하여 활용하면 좋습니다.
