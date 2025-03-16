---
layout:     post
title:      "Bugs 가사 크롤러"
subtitle:   "이 프로젝트는 Bugs에서 J-POP 일간 차트의 곡 정보를 수집하고, 각 곡의 가사를 크롤링하여 JSON 파일로 저장하는 Python 코드입니다. 가사를 한국어, 일본어 발음(로마자), 일본어 원문으로 정리하여 데이터프레임으로 변환합니다."
date:       2023-03-15 12:00:00
author:     "cbh456746"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:
    - 메타
---
# Bugs 가사 크롤러

이 프로젝트는 Bugs에서 J-POP 일간 차트의 곡 정보를 수집하고, 각 곡의 가사를 크롤링하여 JSON 파일로 저장하는 Python 코드입니다. 가사를 한국어, 일본어 발음(로마자), 일본어 원문으로 정리하여 데이터프레임으로 변환합니다.

## 기능 설명

### 1. `Bugs_lyrics_to_df(dict, url)`
특정 곡의 가사를 크롤링하여 데이터프레임으로 변환하는 함수입니다.
- `requests.Session`을 사용하여 HTTP 요청을 보냅니다.
- 429 오류 발생 시 일정 시간 랜덤 딜레이 후 재시도합니다.
- 가사에서 한국어가 포함되지 않으면 데이터를 저장하지 않습니다.
- 가사에서 영어 문장만 있는 경우, 3회 반복하여 데이터에 추가합니다.
- 결과를 `dict[file_name] = lyrics_frame` 형식으로 저장합니다.

```python
def Bugs_lyrics_to_df(dict,url): #link -> [title,lyrics_dataframe]
    # input : link of bugs 가사 페이지
    # output : 가사 리스트
    try:
        # 세션 생성 (세션을 유지하면 차단 가능성 줄어듦)
        session = requests.Session()
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        })

        # 웹사이트에서 HTML 가져오기
        response = session.get(url)

        # 429 오류 발생 시 재시도
        if response.status_code == 429:
            print("⚠ 429 Too Many Requests - 재시도 중...")
            time.sleep(random.uniform(2, 5))  # 더 긴 딜레이 후 재시도
            response = session.get(url)

        response.raise_for_status()  # HTTP 오류 발생 시 예외 처리

        # BeautifulSoup으로 HTML 파싱
        soup = BeautifulSoup(response.content, "html.parser")

        # 제목 추출
        title_tag = soup.find('title')
        title = title_tag.get_text(strip=True) if title_tag else "untitled"

        # 파일 이름 생성 (특수문자 제거)
        file_name = re.sub(r'\W+', '_', title) + ".txt"
        if file_name in dict: #만약 dict에 title이 file_name과 겹치는게 있으면 종료
            print(f"⚠ {file_name} - 중복된 곡으로 스킵합니다.")
            return
        # <xmp> 태그 내부 가사 추출
        lyrics_tag = soup.find('xmp')

        if lyrics_tag:
            lyrics_text = lyrics_tag.get_text(strip=True)  # 텍스트 추출 및 앞뒤 공백 제거
            lyrics_list = [line.strip("\r") for line in lyrics_text.split("\n")]  # 개행 문자 기준으로 나누고, '와 \r 제거
        else:
            lyrics_list = []

        lyrics_list = [item for item in lyrics_list if item !='']
        has_korean = False
        for line in lyrics_list:
            if re.search(r'[가-힣]', line):  # 한글 문자가 있는지 확인
                has_korean = True
                break

        if not has_korean:
            print(f"⚠ {file_name} - 한국어 가사가 없어 스킵합니다.")
            return  # 한국어가 없으면 함수 종료

        data=[]
        for lyrics in lyrics_list:
            if re.match(r"^[a-zA-Z0-9!@#$%^&*()_+-=\s']+$",lyrics):
                # 문장이 영어,숫자,특수문자 로만 이루어져 있다면 3번 추가
                data.extend([lyrics] * 3)
            else:
                data.append(lyrics)
        if len(data) % 3 != 0:
            raise ValueError(f"데이터 길이({len(data)})가 3의 배수가 아닙니다. 가사 처리 오류!")

        lyrics_frame = pd.DataFrame(np.array(data).reshape(-1, 3), columns=['ja', 'pr', 'ko'])
        print(f"✅ 가사 저장 완료: {file_name}")
        dict[file_name] = lyrics_frame
        return

    except requests.exceptions.RequestException as e:
        print(f"❌ 웹사이트 요청 중 오류 발생: {e}")
    except Exception as e:
        print(f"❌ 기타 오류 발생: {e}")

```

### 2. `Bugs_link_parser(url)`
Bugs 차트 페이지에서 각 곡의 상세 페이지 링크를 추출하는 함수입니다.
- `trackInfo` 클래스를 가진 `<a>` 태그에서 링크를 가져옵니다.

```python
def Bugs_link_parser(url):
    #input > bugs 일간 차트 url
    #output > 차트에 있는 전곡의 곡정보 링크 (list)
    try:
        # 세션 생성 (세션을 유지하면 차단 가능성 줄어듦)
        session = requests.Session()
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        })

        # 웹사이트에서 HTML 가져오기
        response = session.get(url)

        # 429 오류 발생 시 재시도
        if response.status_code == 429:
            print("⚠ 429 Too Many Requests - 재시도 중...")
            time.sleep(random.uniform(2, 5))  # 더 긴 딜레이 후 재시도
            response = session.get(url)

        response.raise_for_status()  # HTTP 오류 발생 시 예외 처리

        # BeautifulSoup으로 HTML 파싱
        soup = BeautifulSoup(response.content, "html.parser")

        # 특정 <p> 태그 찾기
        ank = soup.find_all('a',class_='trackInfo')
        links =[]
        for a in ank:
            links.append(a.get('href'))


        if links:
            return links
        else:
            print("링크를 찾을 수 없습니다.")
            return None


    except requests.exceptions.RequestException as e:
        print(f"❌ 웹사이트 요청 중 오류 발생: {e}")
    except Exception as e:
        print(f"❌ 기타 오류 발생: {e}")
```

### 3. `Bugs_lyrics_mining(list)`
입력된 Bugs 차트 URL 리스트에서 곡 정보를 가져와 가사를 크롤링하고 JSON 파일로 저장하는 함수입니다.
- `Bugs_link_parser(url)`을 사용하여 곡별 링크를 수집합니다.
- `Bugs_lyrics_to_df(dict, song_url)`을 사용하여 가사를 가져와 데이터프레임으로 저장합니다.
- 최종적으로 `lyrics_data.json` 파일로 저장합니다.

```python
def Bugs_lyrics_mining(list):
    dict_data ={}
    for url in list:
        for song in Bugs_link_parser(url):
            Bugs_lyrics_to_df(dict_data,song)

    json_dict = {}
    for file_name, df in dict_data.items():
        json_dict[file_name] = df.to_dict(orient='records')  # DataFrame을 레코드 리스트로 변환

    with open('lyrics_data.json', 'w', encoding='utf-8') as f:
        json.dump(json_dict, f, ensure_ascii=False, indent=4)  # JSON 파일로 저장
    print("✅ JSON 파일로 저장 완료: lyrics_data.json")
    return dict_data
```

### 4. `date_generator(date1, date2)`
특정 기간의 Bugs 차트 URL 리스트를 생성하는 함수입니다.
- `pd.date_range(date1, date2, freq="D")`를 사용하여 날짜 리스트를 만듭니다.
- Bugs 차트 URL 형식에 맞춰 날짜별 링크를 생성합니다.

```python
def date_generator(date1,date2): #사용법 Bugs_lyrics_mining(date_generator('2020-01-01','2020-12-31')
    link_format = 'https://music.bugs.co.kr/genre/chart/etc/njpop/total/day?date='
    dates = pd.date_range(date1, date2, freq="D")
    formatted_dates = link_format + dates.strftime('%Y%m%d')
    return formatted_dates
```

### 5. 실행 예제
아래 코드를 실행하면 `2020-01-01`부터 `2020-01-02`까지의 Bugs 차트를 기반으로 가사를 수집하여 JSON 파일로 저장합니다.

```python
Bugs_lyrics_mining(date_generator('2020-01-01', '2020-01-02'))
```

## 실행 방법

1. `requests`, `BeautifulSoup4`, `pandas`, `numpy` 패키지가 필요합니다. 설치되지 않았다면 아래 명령어로 설치하세요.
   ```bash
   pip install requests beautifulsoup4 pandas numpy
   ```
2. 코드를 실행하면 `lyrics_data.json` 파일이 생성되며 크롤링한 가사가 저장됩니다.

## 주의 사항
- Bugs 사이트의 `robots.txt` 정책을 준수하며 크롤링할 것.
- `429 Too Many Requests` 오류 방지를 위해 적절한 딜레이를 추가했지만, 차단될 가능성이 있음.
- JSON 데이터 저장 경로를 적절히 설정해야 합니다.

---
이 프로젝트는 일본어 노래 가사를 수집하고, 한국어 번역 모델 학습을 위한 데이터셋을 구축하는 데 활용할 수 있습니다. 필요에 따라 코드를 수정하여 적용할 수 있습니다.
