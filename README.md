# Alfalee × MHG — Command Center

Dua dashboard terhubung untuk kampanye Muhammad Husein Gaza, plus satu sistem belajar internal:

- **index.html** — landing (menautkan keduanya)
- **alfalee-mhg-dashboard-gabungan.html** — Dashboard Kampanye (angka Rupiah): funnel journey, target-vs-aktual, profit/P&L, kalender + matriks.
- **dashboard-kinerja-multichannel.html** — Dashboard Kinerja (ATI & Engagement): 7 channel, Humanitarian ATI, IG live dari Google Sheet.
- **lms-toc/** — **Sekolah ToC**, sistem belajar internal Theory of Change (lihat di bawah).
- **framework-data/** — **Kerangka Penggalian Data Yayasan**: metode + perangkat kerja untuk menggali data dari seluruh divisi (lihat di bawah).

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

## Kerangka Penggalian Data Yayasan (`framework-data/`)

Perangkat kerja untuk memetakan data lintas divisi yayasan sampai setiap angka di laporan lembaga bisa ditelusuri ke satu sumber bernama. Statis, tanpa dependensi, jalan dari GitHub Pages maupun berkas lokal.

| Berkas | Isi |
|---|---|
| `framework-data/index.html` | Aplikasi: 8 tab (prinsip, peta divisi, protokol wawancara, kamus data, kematangan, roadmap, etika, ekspor) |
| `framework-data/assets/data.js` | Basis pengetahuan: 9 divisi (pertanyaan wajib, elemen data, artefak, tanda bahaya), 6 dimensi & 5 level kematangan |
| `framework-data/assets/app.js` | Render, checklist artefak, kamus data, skoring kematangan, ekspor CSV/JSON/Markdown |

**Isi kerangka**

1. **Prinsip** — enam aturan main (mulai dari keputusan, minta artefak bukan penjelasan) + empat lapis penggalian L1–L4.
2. **Peta 9 divisi** — Program, MEAL, Fundraising, Komunikasi, Keuangan, SDM, Operasional, Legal, TI. Tiap divisi: tujuan penggalian, 6–7 pertanyaan wajib, 6 elemen data (definisi, sumber, pemilik, frekuensi, klasifikasi), daftar artefak yang harus diminta, dan tanda bahaya.
3. **Protokol wawancara 75 menit** — enam blok waktu termasuk uji petik 10 baris data.
4. **Kamus data** — pembuat entri + unduh CSV. Ini keluaran utama seluruh proses.
5. **Nilai kematangan** — 6 dimensi × skala 1–5 per divisi, dengan ringkasan dan tiga divisi prioritas perbaikan.
6. **Roadmap 6 minggu** — dari mandat sampai serah terima, dengan kriteria selesai.
7. **Etika & kerahasiaan** — klasifikasi data 4 kelas, aturan tim penggali, kewajiban UU PDP / UU Yayasan / izin PUB.

**Catatan pengguna**

- Seluruh isian (checklist, status divisi, kamus data, skor, catatan lapangan) tersimpan **hanya di peramban perangkat masing-masing** (`localStorage`). Tidak ada server.
- Impor JSON **menimpa** isian di perangkat tersebut — gabungkan hasil beberapa penggali secara manual sebelum menyimpan versi final.
- Rangkuman regulasi pada tab Etika bersifat orientasi kerja, **bukan nasihat hukum**.
