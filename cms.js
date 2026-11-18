/* Sayfalar statik HTML olarak hazır gelir. Supabase anahtarı girilmişse
   en güncel içeriği veritabanından çekip sayfadaki ilgili alanları yeniler. */
(function () {
  var cfg = window.CMS_CONFIG || {};
  var ready = cfg.SUPABASE_URL && cfg.SUPABASE_KEY;

  window.CMS = {
    ready: !!ready,
    insertMessage: function (row) {
      if (!ready) return Promise.reject(new Error('not-configured'));
      return fetch(cfg.SUPABASE_URL + '/rest/v1/cms_messages', {
        method: 'POST',
        headers: { apikey: cfg.SUPABASE_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify(row)
      }).then(function (r) { if (!r.ok) throw new Error(r.status); });
    }
  };

  if (!ready || !document.querySelector('[data-slot],[data-site]')) return;

  fetch(cfg.SUPABASE_URL + '/rest/v1/cms_store?id=eq.main&select=data', { headers: { apikey: cfg.SUPABASE_KEY } })
    .then(function (r) { if (!r.ok) throw r.status; return r.json(); })
    .then(function (rows) {
      var c = rows && rows[0] && rows[0].data;
      if (!c || !c.site) return;
      var s = window.CMSRender.slots(c);
      [].forEach.call(document.querySelectorAll('[data-slot]'), function (el) {
        if (s[el.dataset.slot] != null) el.innerHTML = s[el.dataset.slot];
      });
      [].forEach.call(document.querySelectorAll('[data-site]'), function (el) {
        var v = c.site[el.dataset.site];
        if (!v) return;
        el.dataset.tr = v.tr; el.dataset.en = v.en; el.textContent = v.tr;
        if (el.tagName == 'A' && el.dataset.mail != null) el.href = 'mailto:' + v.tr;
      });
      if (window.SiteUI) window.SiteUI.refresh();
    })
    .catch(function (e) { console.warn('CMS içeriği alınamadı, statik içerik gösteriliyor.', e); });
})();
