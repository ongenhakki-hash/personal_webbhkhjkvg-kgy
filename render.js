/* İçerik (JSON) -> HTML parçaları. Hem tarayıcıda (cms.js) hem de build sırasında kullanılır. */
(function (root) {
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var sl = function (s) { return String(s).toLowerCase().replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  var lst = function (s) { return String(s || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean); };
  var t = function (x, l, k) { return (x[l] || {})[k]; };
  var b = function (x, k) { return 'data-en="' + esc(t(x, 'en', k)) + '">' + esc(t(x, 'tr', k)); };
  var im = function (x) { return x.image ? '<img src="' + esc(x.image) + '" alt="" loading="lazy" onerror="this.remove()">' : ''; };
  var card = function (p, a) { var tag = a ? 'a' : 'div'; return '<' + tag + ' class="card"' + (a ? ' href="projects.html"' : '') + '><div class="ph">' + im(p) + '</div><div class="b"><h3 ' + b(p, 'title') + '</h3><p ' + b(p, 'desc') + '</p></div></' + tag + '>'; };
  var keys = function (p) { var ce = lst(t(p, 'en', 'cats')); return lst(t(p, 'tr', 'cats')).map(function (c, i) { return sl(ce[i] || c); }); };
  var post = function (p) {
    var ct = lst(t(p, 'tr', 'cats')), ce = lst(t(p, 'en', 'cats'));
    return '<article class="post" data-k="' + keys(p).join(' ') + '">' + ct.map(function (c, i) { return '<span class="tag c" data-en="' + esc(ce[i] || c) + '">' + esc(c) + '</span>'; }).join(' ') +
      '\n<h2 ' + b(p, 'title') + '</h2><p style="white-space:pre-line" ' + b(p, 'body') + '</p>' +
      (t(p, 'tr', 'tags') ? '<p class="tg" data-en="' + esc('Tags: ' + t(p, 'en', 'tags')) + '">' + esc('Etiketler: ' + t(p, 'tr', 'tags')) + '</p>' : '') + '</article>';
  };
  var latest = function (p) {
    var ct = lst(t(p, 'tr', 'cats')), ce = lst(t(p, 'en', 'cats'));
    return '<a href="blog.html"><span ' + b(p, 'title') + '</span>' + (ct[0] ? '<span class="tag c" data-en="' + esc(ce[0] || ct[0]) + '">' + esc(ct[0]) + '</span>' : '') + '</a>';
  };

  function slots(c) {
    var f = {};
    c.posts.forEach(function (p) { var ce = lst(t(p, 'en', 'cats')); lst(t(p, 'tr', 'cats')).forEach(function (x, i) { var e = ce[i] || x; f[sl(e)] = [x, e]; }); });
    return {
      FEATURED: c.projects.filter(function (p) { return p.featured; }).slice(0, 3).map(function (p) { return card(p, 1); }).join(''),
      GALLERY3: c.gallery.slice(0, 3).map(function (g) { return '<a class="card" href="gallery.html"><div class="ph">' + im(g) + '</div></a>'; }).join(''),
      PROJECTS: c.projects.map(function (p) { return card(p, 0); }).join(''),
      GALLERYALL: c.gallery.map(function (g, i) { return '<figure><div class="ph' + (i % 2 ? ' t' : '') + '">' + im(g) + '</div><figcaption ' + b(g, 'cap') + '</figcaption></figure>'; }).join(''),
      FILTERS: Object.keys(f).map(function (k) { return '<button class="tag f" data-f="' + k + '" data-en="' + esc(f[k][1]) + '">' + esc(f[k][0]) + '</button>'; }).join(''),
      POSTS: c.posts.map(post).join('\n'),
      LATEST: c.posts.slice(0, 3).map(latest).join('')
    };
  }

  var api = { esc: esc, slots: slots };
  if (typeof module == 'object' && module.exports) module.exports = api; else root.CMSRender = api;
})(this);
