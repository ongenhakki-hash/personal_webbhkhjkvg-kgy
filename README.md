# İsmail Hakkı Öngen – Kişisel Site (statik, GitHub Pages uyumlu)

Bu klasör **Node.js gerektirmez**. Saf HTML + CSS + JS'dir; GitHub Pages, Netlify, Vercel ya da herhangi bir hostingde doğrudan çalışır.

- Sayfalar (`index.html`, `about.html`, …) içerik gömülü olarak hazır gelir → anahtar girmeden de site eksiksiz görünür.
- `config.js` içine Supabase **publishable** anahtarı girilirse:
  - site her açılışta en güncel içeriği Supabase'den çeker,
  - iletişim formu mesajları Supabase'e kaydeder,
  - `admin/` yönetim paneli çalışır (değişiklikler anında sitede görünür).

## 1. GitHub Pages'e yükleme
1. Bu klasördeki **tüm dosyaları** repo'nun köküne koy (`index.html` en üst seviyede olmalı).
2. GitHub > repo > **Settings > Pages** > *Source: Deploy from a branch* > Branch: `main`, klasör: `/ (root)` > **Save**.
3. 1–2 dk sonra site `https://KULLANICIADI.github.io/REPOADI/` adresinde açılır.

> `server.js`, `package.json`, `node_modules`, `.env`, `data/` **yüklenmez**; artık gerekmiyorlar.

## 2. Yönetim panelini bağlama (bir kez)
1. **Supabase > Project Settings > API Keys** → *Publishable key*'i (`sb_publishable_…`) kopyala, `config.js` içindeki `SUPABASE_KEY` alanına yapıştır.
   ⚠️ `sb_secret_…` anahtarını **asla** buraya yazma.
2. **Supabase > Authentication > Users > Add user** → kendi e-postan ve şifrenle bir kullanıcı oluştur (*Auto confirm* işaretli).
3. **Authentication > Sign In / Providers** → *Allow new users to sign up* seçeneğini **kapat**.
4. **SQL Editor**'de `supabase-kurulum.sql` dosyasını aç, içindeki e-postayı 2. adımdakiyle değiştir, **Run**.
5. Panel: `https://KULLANICIADI.github.io/REPOADI/admin/` → e-posta + şifreyle giriş.

## Notlar
- Panelde şifre değiştirme Supabase hesabının şifresini değiştirir. Eski `admin123` sistemi kaldırıldı.
- `content.json`, anahtar yokken veya Supabase'e ulaşılamazken gösterilen yedek içeriktir.
- Anahtar girilmemişse iletişim formu, ziyaretçinin e-posta programını açar (mailto).
