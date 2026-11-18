/*
  SUPABASE AYARI
  --------------
  Supabase panelinde: Project Settings > API Keys
  "Publishable key" (sb_publishable_... ile başlar) değerini aşağıya yapıştır.

  !! BURAYA ASLA "secret" (sb_secret_...) ANAHTARI YAZMA !!
  Bu dosya herkese açık; publishable anahtar açık olmak için tasarlandı,
  güvenliği supabase-kurulum.sql içindeki kurallar (RLS) sağlıyor.

  Anahtar boş kalırsa site, content.json içindeki içerikle yine çalışır;
  sadece yönetim paneli ve iletişim formunun veritabanına kaydı çalışmaz.
*/
window.CMS_CONFIG = {
  SUPABASE_URL: 'https://amsvjxwyftndwifwvgkm.supabase.co',
  SUPABASE_KEY: 'sb_publishable_w-5_ZoaK3R6k6Tqsrs-q5g_-MlJXDz2'
};
