# Alfalee × MHG — Command Center

Dua dashboard terhubung untuk kampanye Muhammad Husein Gaza, plus satu sistem belajar internal:

- **index.html** — landing (menautkan keduanya)
- **alfalee-mhg-dashboard-gabungan.html** — Dashboard Kampanye (angka Rupiah): funnel journey, target-vs-aktual, profit/P&L, kalender + matriks.
- **dashboard-kinerja-multichannel.html** — Dashboard Kinerja (ATI & Engagement): 7 channel, Humanitarian ATI, IG live dari Google Sheet.
- **lms-toc/** — **Sekolah ToC**, sistem belajar internal Theory of Change (lihat di bawah).

Kedua dashboard tersinkron dua-arah otomatis saat berada di **satu domain** (localStorage + BroadcastChannel).

## Deploy ke GitHub Pages

1. **Login (langkah kamu):** buka terminal baru, jalankan `gh auth login` → GitHub.com → HTTPS → *Login with a web browser* → salin kode & otorisasi di browser.
2. **Deploy:** jalankan `./deploy.ps1` (membuat repo publik, push, aktifkan Pages).
3. URL: `https://<username>.github.io/alfalee-mhg-dashboard/`

## Catatan

- Data Instagram ditarik **live** dari Google Sheet tracker — sheet harus di-share **"anyone with link → Viewer"**.
- Situs bersifat **publik** (URL tak terdaftar). Angka kampanye/keuangan dapat dilihat siapa pun yang punya link.
- Update konten: edit file → `git add -A && git commit -m "update" && git push` → Pages otomatis rebuild.

## Sekolah ToC — modul belajar Theory of Change

Sistem belajar internal untuk staf program, MEAL, dan penggalangan dana. Statis, tanpa dependensi eksternal, jalan langsung dari GitHub Pages maupun dari berkas lokal.

| Berkas | Isi |
|---|---|
| `lms-toc/index.html` | Aplikasi belajar: Modul 0–8, studi kasus, lampiran, perangkat kerja, pustaka video, ujian akhir |
| `lms-toc/proposal-inh.html` | Contoh proposal permohonan dana berbasis ToC (dokumen latihan, atas nama INH) |
| `lms-toc/assets/style.css` | Gaya tampilan (mengikuti palet Command Center) |
| `lms-toc/assets/app.js` | Navigasi, progres, mesin kuis, perangkat kerja, ekspor/impor |
| `lms-toc/assets/quiz.js` | Bank soal: 8 kuis modul + ujian akhir 12 soal |

**Yang perlu diketahui pengguna**

- Progres, jawaban kuis, dan seluruh isian latihan tersimpan **hanya di peramban masing-masing peserta** (`localStorage`). Tidak ada server, tidak ada data yang terkirim ke mana pun. Tombol **Ekspor/Impor** di kiri bawah dipakai untuk memindahkan hasil kerja antar perangkat.
- Video YouTube **baru dimuat setelah diklik** (memakai domain `youtube-nocookie.com`), sehingga halaman tetap ringan.
- Seluruh angka pada studi kasus dan contoh proposal adalah **ilustrasi untuk latihan** — bukan data riil. Bagian profil lembaga pada contoh proposal sengaja dibiarkan berupa isian kosong.
- Modul disusun dari dokumen sumber *Modul Belajar Theory of Change untuk NGO v1.0*; catatan keterbatasan sumber ditampilkan di halaman Beranda.
