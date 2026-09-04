/* Kerangka Penggalian Data Yayasan — basis pengetahuan (statis) */

const DIVISI = [
{
  id:"program", no:1, nama:"Program & Implementasi", ikon:"🎯",
  misi:"Membuktikan apa yang benar-benar terjadi di lapangan: siapa dibantu, berapa banyak, dengan biaya berapa, dan apakah berubah.",
  pertanyaan:[
   "Sebutkan seluruh program aktif 12 bulan terakhir — nama, lokasi, tanggal mulai/selesai, sumber dana.",
   "Untuk satu program, tunjukkan rantai lengkap: input → aktivitas → keluaran → hasil. Mana yang datanya ada, mana yang kosong?",
   "Bagaimana penerima manfaat didata? Siapa yang mengisi, di kertas atau digital, dan di mana file itu sekarang?",
   "Apakah satu orang penerima bisa terhitung dua kali di dua program? Bagaimana Anda tahu?",
   "Berapa biaya per penerima manfaat program X? Kalau tidak tahu, angka apa yang Anda punya untuk mendekatinya?",
   "Kapan terakhir kali data lapangan dibandingkan dengan laporan yang dikirim ke donor? Ada selisih?",
   "Keputusan program apa yang bulan lalu Anda ambil tanpa data — karena datanya tidak ada?"
  ],
  data:[
   {n:"Daftar induk program",d:"Satu baris per program: kode, nama, tujuan, lokasi, periode, PIC, donor, pagu",s:"Spreadsheet program / SK internal",o:"Manajer Program",f:"Bulanan",k:"int"},
   {n:"Registri penerima manfaat",d:"Identitas unik penerima + program yang diterima (dengan ID unik anti-duplikat)",s:"Formulir lapangan / Google Form",o:"Koordinator Lapangan",f:"Per kegiatan",k:"sen"},
   {n:"Log kegiatan",d:"Tanggal, lokasi, jenis kegiatan, jumlah peserta, fasilitator, bukti (foto/absensi)",s:"Laporan kegiatan",o:"PIC Kegiatan",f:"Per kegiatan",k:"int"},
   {n:"Realisasi keluaran vs target",d:"Target keluaran per indikator dan realisasinya per bulan",s:"Rencana kerja + laporan",o:"Manajer Program",f:"Bulanan",k:"int"},
   {n:"Biaya per penerima manfaat",d:"Total biaya program ÷ jumlah penerima unik",s:"Gabungan Keuangan + Registri",o:"Program & Keuangan",f:"Kuartalan",k:"rah"},
   {n:"Daftar mitra pelaksana",d:"Nama mitra, peran, wilayah, nilai kerja sama, masa berlaku",s:"MoU / kontrak",o:"Manajer Program",f:"Semesteran",k:"rah"}
  ],
  artefak:["Rencana kerja tahunan + anggaran program","3 laporan kegiatan terakhir (mentah, bukan versi rapi)","Formulir pendataan penerima manfaat yang benar-benar dipakai","Satu laporan donor terakhir beserta lampiran datanya","Daftar mitra & MoU aktif"],
  red:["Jumlah penerima manfaat selalu bulat (500, 1.000) — tanda estimasi, bukan hitungan.","Tidak ada ID unik penerima → angka agregat pasti mengandung duplikat.","Laporan donor lebih rapi daripada data lapangan → ada 'penyesuaian' di tengah jalan.","Foto kegiatan ada, absensi tidak ada."]
},
{
  id:"meal", no:2, nama:"MEAL — Monitoring, Evaluasi, Akuntabilitas & Pembelajaran", ikon:"📐",
  misi:"Menguji apakah yayasan mengukur perubahan atau hanya mengukur kesibukan.",
  pertanyaan:[
   "Tunjukkan Theory of Change dan matriks indikatornya. Kapan terakhir diperbarui?",
   "Untuk tiap indikator: apa definisi operasionalnya, siapa yang mengumpulkan, dengan alat apa, seberapa sering?",
   "Mana indikator keluaran (output) dan mana indikator hasil (outcome)? Berapa persen yang benar-benar outcome?",
   "Adakah data dasar (baseline)? Kalau tidak, bagaimana klaim 'meningkat X%' dibuat?",
   "Bagaimana keluhan penerima manfaat masuk, dicatat, dan ditutup? Berapa yang masuk 6 bulan terakhir?",
   "Temuan evaluasi terakhir mengubah keputusan apa? Sebutkan satu yang konkret.",
   "Data mana yang dikumpulkan tapi tidak pernah dipakai siapa pun?"
  ],
  data:[
   {n:"Matriks indikator (logframe)",d:"Indikator, definisi, rumus, sumber verifikasi, frekuensi, target, penanggung jawab",s:"Dokumen MEAL",o:"Manajer MEAL",f:"Kuartalan",k:"int"},
   {n:"Nilai dasar (baseline)",d:"Nilai awal tiap indikator sebelum intervensi + tanggal & metode pengambilan",s:"Survei awal",o:"MEAL",f:"Per program",k:"int"},
   {n:"Data pemantauan berkala",d:"Realisasi tiap indikator per periode + catatan penyimpangan",s:"Laporan bulanan/kunjungan",o:"MEAL",f:"Bulanan",k:"int"},
   {n:"Registri umpan balik & keluhan",d:"Tanggal, kanal, isi, kategori, status tindak lanjut, waktu penyelesaian",s:"Kotak saran / WA / hotline",o:"Petugas Akuntabilitas",f:"Berjalan",k:"sen"},
   {n:"Laporan evaluasi & pembelajaran",d:"Evaluasi tengah/akhir program + rekomendasi & status tindak lanjutnya",s:"Konsultan / internal",o:"MEAL",f:"Per program",k:"rah"},
   {n:"Kualitas data (spot-check)",d:"Hasil uji petik keakuratan data lapangan vs laporan",s:"Audit data internal",o:"MEAL",f:"Semesteran",k:"rah"}
  ],
  artefak:["Theory of Change + logframe versi terbaru","Kamus indikator (definisi operasional)","Laporan evaluasi 2 tahun terakhir","Rekap keluhan & tindak lanjutnya","Instrumen survei yang dipakai"],
  red:["Semua indikator berupa jumlah kegiatan/peserta — tidak ada satu pun perubahan perilaku atau kondisi.","Target selalu tercapai 100% atau lebih → target dipasang setelah hasil diketahui.","Registri keluhan kosong → bukan berarti tidak ada keluhan, berarti saluran tidak jalan.","Rekomendasi evaluasi tidak punya status tindak lanjut."]
},
{
  id:"fundraising", no:3, nama:"Penggalangan Dana & Kemitraan", ikon:"💛",
  misi:"Melihat dari mana uang datang, berapa mahal mendapatkannya, dan seberapa rapuh strukturnya.",
  pertanyaan:[
   "Rincian penerimaan 24 bulan terakhir per sumber: ritel, korporat, hibah lembaga, zakat/infak, CSR, pemerintah.",
   "Berapa persen total dana berasal dari 3 penyumbang terbesar? (Ini ukuran kerapuhan, bukan prestasi.)",
   "Berapa biaya untuk mendapatkan Rp1 donasi, per kanal? Termasuk gaji tim dan iklan.",
   "Berapa donatur yang menyumbang lagi tahun berikutnya (retensi)? Angka mentahnya, bukan perkiraan.",
   "Di mana basis data donatur berada, siapa yang bisa mengaksesnya, dan apakah ada izin komunikasi ulang?",
   "Berapa hibah yang sedang diajukan, nilainya, dan tanggal keputusannya (pipeline)?",
   "Adakah dana terikat yang belum terserap dan hampir jatuh tempo?"
  ],
  data:[
   {n:"Basis data donatur",d:"Identitas, kanal, tanggal & nilai donasi, preferensi, izin komunikasi",s:"CRM / spreadsheet / rekening koran",o:"Manajer Fundraising",f:"Berjalan",k:"sen"},
   {n:"Penerimaan per sumber & kanal",d:"Nilai donasi terkumpul dipilah sumber, kanal, program tujuan, terikat/tidak",s:"Rekap kasir & bank",o:"Fundraising + Keuangan",f:"Bulanan",k:"rah"},
   {n:"Biaya akuisisi (CPA / ROI kanal)",d:"Biaya kampanye ÷ dana terkumpul per kanal",s:"Belanja iklan + laporan keuangan",o:"Fundraising",f:"Bulanan",k:"rah"},
   {n:"Retensi & nilai seumur hidup donatur",d:"% donatur berulang, rata-rata donasi, LTV per segmen",s:"Analisis basis data donatur",o:"Fundraising",f:"Kuartalan",k:"rah"},
   {n:"Pipeline hibah & proposal",d:"Lembaga, nilai, tahap, tanggal keputusan, probabilitas",s:"Papan pipeline",o:"Manajer Kemitraan",f:"Mingguan",k:"rah"},
   {n:"Kepatuhan dana terikat",d:"Dana terikat: nilai, syarat, batas waktu penggunaan, % terserap",s:"Perjanjian hibah",o:"Fundraising + Keuangan",f:"Bulanan",k:"rah"}
  ],
  artefak:["Rekap penerimaan 24 bulan (format mentah)","Perjanjian hibah aktif","Struktur basis data donatur (tangkapan layar kolomnya)","Laporan belanja iklan per kanal","Daftar proposal yang diajukan & hasilnya"],
  red:["Retensi donatur tidak pernah dihitung → hampir pasti di bawah 25%.","Lebih dari 50% dana dari satu sumber → risiko eksistensial, bukan sekadar catatan.","Basis data donatur ada di WhatsApp/HP staf, bukan di sistem lembaga.","Biaya penggalangan dana 'disembunyikan' di pos program."]
},
{
  id:"komunikasi", no:4, nama:"Komunikasi, Media & Kreatif", ikon:"📣",
  misi:"Memisahkan jangkauan yang tampak ramai dari jangkauan yang benar-benar menghasilkan donasi, relawan, atau perubahan sikap.",
  pertanyaan:[
   "Sebutkan seluruh akun & kanal resmi, siapa pemegang aksesnya, dan siapa pemilik akun secara legal.",
   "Metrik apa yang dilaporkan ke pimpinan — dan metrik mana yang dipakai untuk mengambil keputusan?",
   "Berapa donasi/pendaftaran relawan yang benar-benar berasal dari media sosial? Bagaimana dilacak?",
   "Apakah ada pelacakan tautan (UTM) dari konten ke halaman donasi? Kalau tidak, semua klaim atribusi adalah tebakan.",
   "Berapa biaya produksi konten per bulan (orang + alat + iklan), dan output-nya berapa keping?",
   "Bagaimana persetujuan (consent) pemakaian foto/cerita penerima manfaat didokumentasikan?",
   "Ada arsip aset digital terpusat, atau semua di Google Drive pribadi?"
  ],
  data:[
   {n:"Inventaris kanal & akses",d:"Kanal, username, pemilik akun, pemegang kata sandi, tanggal audit akses terakhir",s:"Daftar akses internal",o:"Manajer Komunikasi",f:"Kuartalan",k:"rah"},
   {n:"Kinerja konten",d:"Per keping: tanggal, format, topik, jangkauan, interaksi, simpan, klik keluar",s:"Analitik platform / Sheet tracker",o:"Analis Sosmed",f:"Mingguan",k:"int"},
   {n:"Atribusi konversi",d:"Tautan berkode (UTM) → sesi → donasi/pendaftaran",s:"Analitik web + halaman donasi",o:"Komunikasi + Fundraising",f:"Bulanan",k:"rah"},
   {n:"Kalender konten & produksi",d:"Rencana tayang, status produksi, PIC, biaya produksi",s:"Kalender redaksi",o:"Produser Konten",f:"Mingguan",k:"int"},
   {n:"Arsip persetujuan narasumber",d:"Formulir izin pemakaian citra/cerita + masa berlaku",s:"Berkas persetujuan",o:"Komunikasi",f:"Per pengambilan",k:"sen"},
   {n:"Liputan media & sebutan publik",d:"Media, tanggal, nada pemberitaan, nilai setara iklan",s:"Pemantauan media",o:"Humas",f:"Bulanan",k:"pub"}
  ],
  artefak:["Daftar akun + siapa pemegang akses","Ekspor analitik 6 bulan terakhir","Kalender konten berjalan","Contoh formulir persetujuan narasumber","Rekap belanja iklan"],
  red:["Akun atas nama email pribadi staf → aset lembaga bisa hilang saat orangnya keluar.","Laporan hanya berisi jangkauan & pengikut, nol angka konversi.","Cerita penerima manfaat dipakai tanpa arsip persetujuan → risiko hukum & etika.","Aset kreatif tidak terarsip; kampanye lama tak bisa diaudit."]
},
{
  id:"keuangan", no:5, nama:"Keuangan & Akuntansi", ikon:"🧾",
  misi:"Menjawab tiga hal: uang ada berapa, terikat berapa, dan cukup untuk berapa bulan.",
  pertanyaan:[
   "Tunjukkan neraca dan laporan aktivitas 3 tahun terakhir — audited kalau ada.",
   "Berapa saldo kas tidak terikat hari ini, dan berapa bulan operasional yang bisa ditutup (runway)?",
   "Bagaimana pemisahan dana terikat vs tidak terikat dicatat? Di sistem atau di kepala bendahara?",
   "Berapa rasio biaya program : biaya operasional : biaya penggalangan dana?",
   "Bagaimana alokasi biaya bersama (gaji, sewa, listrik) dibebankan ke program? Ada dasar tertulisnya?",
   "Berapa lama jeda antara transaksi terjadi dan tercatat di sistem?",
   "Siapa yang bisa memindahkan uang sendirian tanpa persetujuan kedua?"
  ],
  data:[
   {n:"Bagan akun (Chart of Accounts)",d:"Struktur akun + penandaan program/donor/pusat biaya",s:"Sistem akuntansi",o:"Manajer Keuangan",f:"Tahunan",k:"rah"},
   {n:"Buku besar transaksi",d:"Seluruh transaksi: tanggal, akun, program, donor, nilai, bukti",s:"Sistem akuntansi / jurnal",o:"Akuntan",f:"Harian",k:"rah"},
   {n:"Anggaran vs realisasi",d:"Per program & per pos, beserta varian dan penjelasannya",s:"Laporan bulanan",o:"Manajer Keuangan",f:"Bulanan",k:"rah"},
   {n:"Posisi kas & runway",d:"Saldo per rekening, dipilah terikat/tidak, proyeksi arus kas 12 bulan",s:"Rekening koran + proyeksi",o:"Bendahara",f:"Mingguan",k:"rah"},
   {n:"Dasar alokasi biaya bersama",d:"Metode pembebanan biaya bersama ke program (persentase/pemicu)",s:"Kebijakan keuangan",o:"Manajer Keuangan",f:"Tahunan",k:"rah"},
   {n:"Temuan audit & tindak lanjut",d:"Temuan auditor, tingkat risiko, status penyelesaian",s:"Laporan audit",o:"Direktur + Pengawas",f:"Tahunan",k:"rah"}
  ],
  artefak:["Laporan keuangan 3 tahun (audited bila ada)","Bagan akun","Proyeksi arus kas berjalan","Kebijakan keuangan & wewenang persetujuan","Laporan audit terakhir + surat manajemen"],
  red:["Tidak bisa menyebut angka runway dalam 5 menit → manajemen kas tidak berjalan.","Dana terikat tercampur di satu rekening tanpa penandaan → risiko penyalahgunaan tak sengaja.","Pencatatan tertinggal lebih dari 30 hari → laporan apa pun tidak dapat dipercaya.","Satu orang memegang otorisasi transfer sendirian."]
},
{
  id:"sdm", no:6, nama:"SDM, Relawan & Budaya Kerja", ikon:"👥",
  misi:"Mengukur kapasitas manusia yang sesungguhnya — bukan bagan organisasi di dinding.",
  pertanyaan:[
   "Daftar seluruh orang: pegawai tetap, kontrak, paruh waktu, relawan aktif — dengan status kontraknya.",
   "Berapa biaya orang total per bulan, dan berapa persen dari total pengeluaran?",
   "Berapa turnover 12 bulan terakhir, dan posisi mana yang paling sering kosong?",
   "Siapa 'titik tunggal kegagalan' — orang yang kalau keluar, satu fungsi berhenti?",
   "Bagaimana kinerja dinilai? Ada ukurannya atau berdasarkan kesan?",
   "Relawan: bagaimana direkrut, dicatat jamnya, dan diperlakukan setelah kegiatan selesai?",
   "Ada kebijakan perlindungan (safeguarding) dan jalur pelaporan pelanggaran yang aman?"
  ],
  data:[
   {n:"Daftar induk kepegawaian",d:"Nama, jabatan, divisi, status, tanggal masuk/keluar, atasan, biaya",s:"Berkas SDM",o:"Manajer SDM",f:"Bulanan",k:"sen"},
   {n:"Registri relawan",d:"Identitas, keahlian, kegiatan diikuti, jam kontribusi, status aktif",s:"Formulir relawan",o:"Koordinator Relawan",f:"Per kegiatan",k:"sen"},
   {n:"Turnover & lama masa kerja",d:"Jumlah keluar ÷ rata-rata pegawai; lama masa kerja per posisi",s:"Analisis data SDM",o:"SDM",f:"Kuartalan",k:"rah"},
   {n:"Matriks kompetensi & kesenjangan",d:"Keterampilan yang dibutuhkan vs yang dimiliki per divisi",s:"Penilaian internal",o:"SDM + Kepala Divisi",f:"Semesteran",k:"int"},
   {n:"Siklus penilaian kinerja",d:"Target individu, hasil penilaian, rencana pengembangan",s:"Formulir penilaian",o:"SDM",f:"Semesteran",k:"sen"},
   {n:"Registri insiden & safeguarding",d:"Laporan pelanggaran/insiden, penanganan, status",s:"Jalur pelaporan",o:"Focal Point Safeguarding",f:"Berjalan",k:"sen"}
  ],
  artefak:["Bagan organisasi + daftar personel aktif","Rekap biaya personel","Contoh kontrak kerja & kontrak relawan","Kebijakan safeguarding & kode etik","Rekap keluar-masuk pegawai 2 tahun"],
  red:["Bagan organisasi menampilkan posisi yang sebenarnya kosong atau dirangkap.","Relawan tidak tercatat jamnya → kontribusi in-kind hilang dari laporan dampak.","Tidak ada kebijakan safeguarding padahal bekerja dengan anak/kelompok rentan → risiko fatal.","Penilaian kinerja tidak pernah dilakukan dua tahun terakhir."]
},
{
  id:"operasional", no:7, nama:"Operasional, Umum & Pengadaan", ikon:"📦",
  misi:"Menemukan kebocoran biaya dan aset yang tidak diketahui keberadaannya.",
  pertanyaan:[
   "Daftar seluruh aset tetap: apa, di mana, siapa pemegangnya, kondisi, nilai perolehan.",
   "Bagaimana pengadaan di atas nilai tertentu dilakukan? Ada perbandingan penawaran?",
   "Daftar seluruh vendor beserta nilai transaksi setahun. Ada yang terafiliasi dengan pengurus?",
   "Berapa nilai bantuan barang (in-kind) yang diterima dan bagaimana dinilai?",
   "Bagaimana logistik distribusi bantuan dicatat dari gudang sampai ke penerima?",
   "Kontrak apa yang berjalan otomatis tiap bulan (sewa, langganan, aplikasi) dan berapa totalnya?"
  ],
  data:[
   {n:"Daftar aset tetap",d:"Kode aset, jenis, lokasi, pemegang, tanggal perolehan, nilai, kondisi",s:"Kartu inventaris",o:"Manajer Umum",f:"Semesteran",k:"rah"},
   {n:"Registri vendor",d:"Nama, jenis barang/jasa, nilai transaksi, kontak, status afiliasi",s:"Berkas pengadaan",o:"Pengadaan",f:"Kuartalan",k:"rah"},
   {n:"Riwayat pengadaan",d:"Permintaan, penawaran pembanding, pemenang, alasan, nilai, persetujuan",s:"Berkas pengadaan",o:"Pengadaan",f:"Per transaksi",k:"rah"},
   {n:"Bantuan barang (in-kind)",d:"Jenis, jumlah, pemberi, dasar penilaian rupiah, penyaluran",s:"Berita acara serah terima",o:"Logistik",f:"Per penerimaan",k:"int"},
   {n:"Rantai distribusi bantuan",d:"Stok masuk, keluar, sisa, penerima, bukti serah terima",s:"Kartu stok / gudang",o:"Logistik",f:"Berjalan",k:"int"},
   {n:"Kontrak & langganan berulang",d:"Sewa, utilitas, langganan perangkat lunak: nilai, jatuh tempo, pemilik",s:"Berkas kontrak",o:"Manajer Umum",f:"Bulanan",k:"rah"}
  ],
  artefak:["Daftar inventaris terbaru","SOP pengadaan","Rekap vendor + nilai setahun","Berita acara serah terima bantuan","Daftar langganan & kontrak berulang"],
  red:["Inventaris terakhir diperbarui lebih dari setahun lalu → aset kemungkinan sudah hilang.","Vendor yang sama menang terus tanpa pembanding.","Bantuan in-kind tidak dinilai → laporan penerimaan lembaga lebih kecil dari kenyataan.","Langganan aplikasi yang tidak dipakai masih terpotong tiap bulan."]
},
{
  id:"legal", no:8, nama:"Legal, Kepatuhan & Tata Kelola", ikon:"⚖️",
  misi:"Memastikan yayasan sah, patuh, dan tidak sedang duduk di atas risiko yang tidak dikenali.",
  pertanyaan:[
   "Tunjukkan akta pendirian, SK Kemenkumham, NPWP, dan perubahan terakhir pengurus. Sudah sinkron?",
   "Siapa Pembina, Pengurus, Pengawas saat ini — dan kapan rapat terakhir digelar dengan notulen?",
   "Perizinan apa yang wajib untuk kegiatan Anda (PUB, izin pengumpulan dana, izin operasional)? Mana yang kedaluwarsa?",
   "Kewajiban pelaporan apa yang melekat (SPT, laporan tahunan, laporan donor) dan mana yang terlambat?",
   "Ada perjanjian yang membebani lembaga secara tidak wajar (eksklusivitas, jaminan hasil, denda)?",
   "Bagaimana benturan kepentingan pengurus dideklarasikan dan dicatat?",
   "Ada sengketa, tuntutan, atau tunggakan pajak yang berjalan?"
  ],
  data:[
   {n:"Dokumen legalitas induk",d:"Akta, SK pengesahan, NPWP, perubahan pengurus, alamat domisili",s:"Berkas legal",o:"Sekretaris Yayasan",f:"Saat berubah",k:"rah"},
   {n:"Registri perizinan",d:"Jenis izin, nomor, tanggal terbit & kedaluwarsa, penanggung jawab perpanjangan",s:"Berkas perizinan",o:"Legal",f:"Kuartalan",k:"rah"},
   {n:"Kalender kepatuhan",d:"Kewajiban pelaporan & pajak, tenggat, status, bukti lapor",s:"Kalender internal",o:"Legal + Keuangan",f:"Bulanan",k:"rah"},
   {n:"Registri kontrak",d:"Pihak, ruang lingkup, nilai, jangka waktu, klausul risiko, tanggal berakhir",s:"Berkas kontrak",o:"Legal",f:"Kuartalan",k:"rah"},
   {n:"Notulen & keputusan organ yayasan",d:"Rapat Pembina/Pengurus/Pengawas: tanggal, kehadiran, keputusan",s:"Buku notulen",o:"Sekretaris",f:"Per rapat",k:"rah"},
   {n:"Deklarasi benturan kepentingan",d:"Pernyataan tahunan pengurus & staf kunci atas afiliasi bisnis/keluarga",s:"Formulir tahunan",o:"Pengawas",f:"Tahunan",k:"sen"}
  ],
  artefak:["Akta + SK pengesahan terakhir","Daftar izin & tanggal kedaluwarsa","Notulen rapat organ 2 tahun terakhir","Daftar kontrak aktif","Formulir benturan kepentingan"],
  red:["Susunan pengurus di akta berbeda dengan yang menjalankan lembaga sehari-hari.","Rapat Pembina tidak pernah digelar → tata kelola formalitas belaka.","Izin pengumpulan dana kedaluwarsa tapi penggalangan tetap jalan.","Tidak ada deklarasi benturan kepentingan padahal vendor terafiliasi pengurus."]
},
{
  id:"ti", no:9, nama:"Teknologi, Sistem & Keamanan Data", ikon:"🖥️",
  misi:"Memetakan di mana data sebenarnya tinggal, siapa yang bisa membukanya, dan apa yang hilang kalau satu laptop rusak.",
  pertanyaan:[
   "Sebutkan seluruh sistem/aplikasi yang dipakai tiap divisi, termasuk spreadsheet dan grup WhatsApp yang jadi 'sistem'.",
   "Data mana yang hanya ada di satu perangkat tanpa salinan?",
   "Siapa memegang akun admin untuk domain, surel, penyimpanan awan, dan media sosial?",
   "Bagaimana pencadangan dilakukan, seberapa sering, dan kapan terakhir diuji pemulihannya?",
   "Data pribadi penerima manfaat & donatur disimpan di mana, dienkripsi atau tidak, dan berapa lama disimpan?",
   "Berapa sistem yang saling terhubung otomatis, dan berapa yang masih disalin manual?",
   "Kalau staf keluar hari ini, berapa lama aksesnya benar-benar dicabut?"
  ],
  data:[
   {n:"Inventaris sistem & aplikasi",d:"Nama sistem, fungsi, pemilik, jumlah pengguna, biaya, data yang disimpan",s:"Audit internal TI",o:"Penanggung Jawab TI",f:"Semesteran",k:"rah"},
   {n:"Peta alur data",d:"Dari mana data lahir, berpindah ke mana, berakhir di mana (per proses inti)",s:"Pemetaan proses",o:"TI + Pemilik Proses",f:"Tahunan",k:"rah"},
   {n:"Matriks hak akses",d:"Siapa punya akses apa, tingkat apa, kapan terakhir ditinjau",s:"Pengaturan sistem",o:"TI",f:"Kuartalan",k:"rah"},
   {n:"Kebijakan & log pencadangan",d:"Objek dicadangkan, frekuensi, lokasi, tanggal uji pemulihan terakhir",s:"Log sistem",o:"TI",f:"Bulanan",k:"rah"},
   {n:"Registri data pribadi",d:"Jenis data pribadi, jumlah subjek, dasar pemrosesan, masa simpan",s:"Pemetaan privasi",o:"TI + Legal",f:"Semesteran",k:"sen"},
   {n:"Registri insiden keamanan",d:"Kejadian, dampak, penanganan, pelaporan",s:"Catatan insiden",o:"TI",f:"Berjalan",k:"sen"}
  ],
  artefak:["Daftar seluruh aplikasi & akunnya","Tangkapan layar struktur folder penyimpanan awan","Bukti pencadangan terakhir","Daftar pemegang akses admin","Kebijakan kata sandi & perangkat"],
  red:["Data induk lembaga ada di Drive pribadi karyawan.","Tidak pernah ada uji pemulihan cadangan → cadangan yang tak pernah diuji sama dengan tidak ada.","Akun admin dipakai bersama satu kata sandi.","Data pribadi penerima manfaat tersebar di grup WhatsApp."]
}
];

/* Enam dimensi penilaian kematangan data */
const DIMENSI = [
 {id:"ada", nm:"Ketersediaan", ket:"Apakah datanya benar-benar ada dan bisa ditunjukkan hari ini?"},
 {id:"def", nm:"Definisi & Konsistensi", ket:"Satu istilah, satu arti, satu rumus, di seluruh divisi."},
 {id:"aku", nm:"Keakuratan", ket:"Data lapangan cocok dengan laporan saat diuji petik."},
 {id:"wkt", nm:"Ketepatan Waktu", ket:"Data tersedia saat keputusan diambil, bukan tiga bulan setelahnya."},
 {id:"akses", nm:"Aksesibilitas & Kepemilikan", ket:"Ada pemilik jelas; orang yang butuh bisa mengambil tanpa memohon."},
 {id:"pakai", nm:"Pemanfaatan", ket:"Data benar-benar mengubah keputusan, bukan sekadar arsip laporan."}
];

const LEVEL = [
 {v:1,nm:"Tidak Ada",ket:"Data tidak dikumpulkan, atau hanya ada di ingatan orang."},
 {v:2,nm:"Ad-hoc",ket:"Ada, tapi dibuat dadakan saat diminta; format berubah tiap kali."},
 {v:3,nm:"Terdokumentasi",ket:"Ada format baku dan penanggung jawab, tapi manual dan sering telat."},
 {v:4,nm:"Terkelola",ket:"Rutin, terverifikasi, punya definisi baku, dipakai dalam rapat berkala."},
 {v:5,nm:"Terpadu",ket:"Terhubung antar sistem, hampir real-time, jadi dasar keputusan strategis."}
];

const KLAS = {pub:{nm:"Publik",c:"t-pub"},int:{nm:"Internal",c:"t-int"},rah:{nm:"Rahasia",c:"t-rah"},sen:{nm:"Sensitif / Pribadi",c:"t-sen"}};

const STATUS = ["Belum disentuh","Dokumen diminta","Wawancara selesai","Data diterima","Terverifikasi"];
