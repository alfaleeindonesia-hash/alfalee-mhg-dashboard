# Alfalee × MHG — Command Center

Dua dashboard terhubung untuk kampanye Muhammad Husein Gaza:

- **index.html** — landing (menautkan keduanya)
- **alfalee-mhg-dashboard-gabungan.html** — Dashboard Kampanye (angka Rupiah): funnel journey, target-vs-aktual, profit/P&L, kalender + matriks.
- **dashboard-kinerja-multichannel.html** — Dashboard Kinerja (ATI & Engagement): 7 channel, Humanitarian ATI, IG live dari Google Sheet.

Keduanya tersinkron dua-arah otomatis saat berada di **satu domain** (localStorage + BroadcastChannel).

## Deploy ke GitHub Pages

1. **Login (langkah kamu):** buka terminal baru, jalankan `gh auth login` → GitHub.com → HTTPS → *Login with a web browser* → salin kode & otorisasi di browser.
2. **Deploy:** jalankan `./deploy.ps1` (membuat repo publik, push, aktifkan Pages).
3. URL: `https://<username>.github.io/alfalee-mhg-dashboard/`

## Catatan

- Data Instagram ditarik **live** dari Google Sheet tracker — sheet harus di-share **"anyone with link → Viewer"**.
- Situs bersifat **publik** (URL tak terdaftar). Angka kampanye/keuangan dapat dilihat siapa pun yang punya link.
- Update konten: edit file → `git add -A && git commit -m "update" && git push` → Pages otomatis rebuild.
