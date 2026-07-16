(function () {
  var selectedTag = 'all';
  var search = document.getElementById('archive-search');
  var items = Array.prototype.slice.call(document.querySelectorAll('.archive-item'));
  var status = document.getElementById('archive-status');
  var filters = Array.prototype.slice.call(document.querySelectorAll('.tag-filter'));
  if (!items.length) return;
  function applyFilters() {
    var query = (search && search.value || '').trim().toLowerCase();
    var shown = 0;
    items.forEach(function (item) {
      var tags = (item.dataset.tags || '').split('|');
      var tagMatch = selectedTag === 'all' || tags.indexOf(selectedTag) !== -1;
      var textMatch = !query || (item.dataset.search || '').toLowerCase().indexOf(query) !== -1;
      var visible = tagMatch && textMatch;
      item.hidden = !visible;
      if (visible) shown += 1;
    });
    if (status) status.textContent = (selectedTag === 'all' ? '전체' : selectedTag) + ' ' + shown + '개';
  }
  filters.forEach(function (button) { button.addEventListener('click', function () { selectedTag = button.dataset.tag; filters.forEach(function (x) { x.classList.toggle('is-active', x === button); }); var url = new URL(window.location.href); if (selectedTag === 'all') url.searchParams.delete('tag'); else url.searchParams.set('tag', selectedTag); window.history.replaceState({}, '', url); applyFilters(); }); });
  if (search) search.addEventListener('input', applyFilters);
  var initial = new URLSearchParams(window.location.search).get('tag');
  if (initial) { var match = filters.filter(function (x) { return x.dataset.tag === initial; })[0]; if (match) match.click(); }
}());
