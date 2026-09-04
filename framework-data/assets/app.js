/* Kerangka Penggalian Data Yayasan — logika aplikasi */
(function(){
"use strict";

const KEY = "alfalee_framework_data_v1";
const state = load();

function load(){
  try{ const r = JSON.parse(localStorage.getItem(KEY)||"{}");
    return {chk:r.chk||{}, status:r.status||{}, kamus:r.kamus||[], skor:r.skor||{}, catatan:r.catatan||{}};
  }catch(e){ return {chk:{},status:{},kamus:[],skor:{},catatan:{}}; }
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){ alert("Gagal menyimpan — penyimpanan peramban penuh atau diblokir."); } }
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = s => document.querySelector(s);

/* ---------- Tab ---------- */
const TABS = [
 ["prinsip","Prinsip & Cara Pakai"],["divisi","Peta 9 Divisi"],["wawancara","Protokol Wawancara"],
 ["kamus","Kamus Data"],["matang","Nilai Kematangan"],["roadmap","Roadmap 6 Minggu"],
 ["etika","Etika & Kerahasiaan"],["ekspor","Ekspor / Impor"]
];
function buildTabs(){
  $("#tabs").innerHTML = TABS.map((t,i)=>`<button data-t="${t[0]}"${i===0?' class="on"':''}>${esc(t[1])}</button>`).join("");
  $("#tabs").addEventListener("click", e=>{
    const b = e.target.closest("button[data-t]"); if(!b) return;
    document.querySelectorAll("#tabs button").forEach(x=>x.classList.toggle("on", x===b));
    document.querySelectorAll("section.tab").forEach(s=>s.classList.toggle("on", s.id==="t-"+b.dataset.t));
    window.scrollTo({top:0,behavior:"smooth"});
  });
  $("#t-prinsip").classList.add("on");
}

/* ---------- 1. Prinsip ---------- */
function renderPrinsip(){
  $("#t-prinsip").innerHTML = `
  <div class="card">
    <h2>Aturan main sebelum bertanya apa pun</h2>
    <p class="lead">Penggalian data gagal bukan karena divisi menolak, tapi karena penggalinya bertanya "punya data apa?" — pertanyaan yang selalu dijawab "banyak" lalu berhenti di situ.</p>
    <div class="grid2">
      <div class="box"><b>1. Mulai dari keputusan, bukan dari data.</b> Untuk tiap divisi tanyakan: keputusan apa yang harus diambil tiap minggu/bulan? Data hanya berharga kalau ada keputusan yang menunggunya. Data tanpa keputusan = beban administrasi.</div>
      <div class="box"><b>2. Minta artefak, bukan penjelasan.</b> "Tunjukkan filenya sekarang" mengungkap kebenaran 10x lebih cepat daripada "bagaimana prosesnya?". Yang tidak bisa ditunjukkan dalam 5 menit, praktis tidak ada.</div>
      <div class="box"><b>3. Satu definisi untuk satu istilah.</b> "Penerima manfaat" di Program, di MEAL, dan di laporan donor sering berarti tiga hal berbeda. Selisih laporan hampir selalu berasal dari sini, bukan dari kecurangan.</div>
      <div class="box"><b>4. Telusuri satu kasus dari ujung ke ujung.</b> Ambil satu penerima manfaat dan satu donasi, lalu ikuti jejaknya lintas divisi sampai muncul di laporan. Di sinilah semua kebocoran ketahuan.</div>
      <div class="box"><b>5. Catat yang tidak ada.</b> Kekosongan data adalah temuan, bukan kegagalan wawancara. Daftar kekosongan inilah yang jadi rencana kerja.</div>
      <div class="box bad"><b>6. Jangan menjanjikan sistem baru di ruang wawancara.</b> Begitu Anda menyebut "nanti ada aplikasi", narasumber berhenti jujur dan mulai menjual kebutuhan.</div>
    </div>
    <h3>Empat lapis penggalian (urutannya tidak boleh dibalik)</h3>
    <table><thead><tr><th style="width:70px">Lapis</th><th>Yang digali</th><th>Pertanyaan kunci</th><th>Bukti yang diambil</th></tr></thead><tbody>
      <tr><td><b>L1</b></td><td>Keputusan</td><td>Keputusan apa yang Anda ambil rutin, dan atas dasar apa?</td><td>Notulen rapat, laporan yang dibaca pimpinan</td></tr>
      <tr><td><b>L2</b></td><td>Proses</td><td>Siapa mengerjakan apa, dalam urutan apa, dengan formulir apa?</td><td>SOP, formulir, alur kerja nyata (bukan yang tertulis)</td></tr>
      <tr><td><b>L3</b></td><td>Artefak & sistem</td><td>Data itu tinggal di mana persisnya? Siapa pemiliknya?</td><td>File, tautan, tangkapan layar, hak akses</td></tr>
      <tr><td><b>L4</b></td><td>Kualitas</td><td>Kalau saya uji petik 10 baris, berapa yang cocok?</td><td>Hasil uji petik, selisih antar sumber</td></tr>
    </tbody></table>
    <h3>Cara memakai perangkat ini</h3>
    <ol>
      <li>Buka <b>Peta 9 Divisi</b> — pakai daftar pertanyaan & artefak sebagai lembar kerja wawancara. Centang yang sudah didapat, ubah status divisi.</li>
      <li>Pakai <b>Protokol Wawancara</b> sebagai skrip 75 menit; jangan mengarang urutan sendiri.</li>
      <li>Setiap elemen data yang ditemukan, catat di <b>Kamus Data</b> — ini keluaran utama seluruh proses.</li>
      <li>Setelah semua divisi selesai, isi <b>Nilai Kematangan</b> untuk menentukan urutan perbaikan.</li>
      <li>Eksekusi lewat <b>Roadmap 6 Minggu</b>. Ekspor hasilnya sebagai berkas JSON/CSV.</li>
    </ol>
  </div>`;
}

/* ---------- 2. Peta Divisi ---------- */
function renderDivisi(){
  const el = $("#t-divisi");
  el.innerHTML = `
   <div class="card">
     <h2>Peta Penggalian 9 Divisi</h2>
     <p class="lead">Tiap divisi punya: tujuan penggalian, pertanyaan wajib, elemen data yang harus ada, artefak yang diminta, dan tanda bahaya yang harus dikenali. Centang saat artefak benar-benar diterima — bukan saat dijanjikan.</p>
     <div class="grid3" id="kpiDiv"></div>
   </div>
   <div id="divList"></div>`;

  el.querySelector("#divList").innerHTML = DIVISI.map(d=>{
    const st = state.status[d.id]||0;
    return `<details class="div" id="d-${d.id}">
      <summary><span class="num">${d.no}</span> ${d.ikon} ${esc(d.nama)} <span class="pill" data-st="${d.id}">${esc(STATUS[st])}</span></summary>
      <div class="body">
        <div class="box"><b>Tujuan penggalian:</b> ${esc(d.misi)}</div>
        <h3>Pertanyaan wajib</h3>
        ${d.pertanyaan.map(q=>`<div class="q">${esc(q)}</div>`).join("")}
        <h3>Elemen data yang harus ada</h3>
        <table><thead><tr><th>Elemen</th><th>Definisi</th><th>Sumber</th><th>Pemilik</th><th>Frekuensi</th><th>Klasifikasi</th></tr></thead><tbody>
        ${d.data.map(x=>`<tr><td><b>${esc(x.n)}</b></td><td>${esc(x.d)}</td><td>${esc(x.s)}</td><td>${esc(x.o)}</td><td>${esc(x.f)}</td><td><span class="tag ${KLAS[x.k].c}">${esc(KLAS[x.k].nm)}</span></td></tr>`).join("")}
        </tbody></table>
        <h3>Artefak yang diminta <span class="pill">centang saat berkasnya sudah di tangan</span></h3>
        ${d.artefak.map((a,i)=>{
          const k = d.id+"|"+i, on = !!state.chk[k];
          return `<label class="chk${on?" done":""}"><input type="checkbox" data-chk="${k}"${on?" checked":""}><span>${esc(a)}</span></label>`;
        }).join("")}
        <h3>Tanda bahaya</h3>
        <div class="box bad">${d.red.map(r=>`• ${esc(r)}`).join("<br>")}</div>
        <h3>Status & catatan lapangan</h3>
        <div class="row" style="margin-bottom:8px">
          <select data-status="${d.id}" style="max-width:230px">${STATUS.map((s,i)=>`<option value="${i}"${i===st?" selected":""}>${esc(s)}</option>`).join("")}</select>
        </div>
        <textarea rows="3" data-note="${d.id}" placeholder="Temuan, kekosongan data, nama narasumber, janji tindak lanjut...">${esc(state.catatan[d.id]||"")}</textarea>
      </div></details>`;
  }).join("");

  el.addEventListener("change", e=>{
    const t = e.target;
    if(t.dataset.chk){ state.chk[t.dataset.chk] = t.checked; t.closest(".chk").classList.toggle("done",t.checked); save(); kpiDivisi(); }
    if(t.dataset.status){ state.status[t.dataset.status] = +t.value; save();
      const p = el.querySelector(`[data-st="${t.dataset.status}"]`); if(p) p.textContent = STATUS[+t.value]; kpiDivisi(); }
  });
  el.addEventListener("input", e=>{ if(e.target.dataset.note){ state.catatan[e.target.dataset.note]=e.target.value; save(); }});
  kpiDivisi();
}
function kpiDivisi(){
  const box = $("#kpiDiv"); if(!box) return;
  const totalA = DIVISI.reduce((a,d)=>a+d.artefak.length,0);
  const dapat = DIVISI.reduce((a,d)=>a+d.artefak.filter((_,i)=>state.chk[d.id+"|"+i]).length,0);
  const verif = DIVISI.filter(d=>(state.status[d.id]||0)>=4).length;
  const pct = Math.round(dapat/totalA*100);
  box.innerHTML = `
    <div class="kpi"><div class="l">Artefak diterima</div><div class="v">${dapat}<span style="font-size:15px;color:var(--muted)"> / ${totalA}</span></div>
      <div class="row" style="margin-top:8px"><div class="bar"><i style="width:${pct}%"></i></div><span style="font-size:12px;color:var(--muted)">${pct}%</span></div></div>
    <div class="kpi"><div class="l">Divisi terverifikasi</div><div class="v">${verif}<span style="font-size:15px;color:var(--muted)"> / ${DIVISI.length}</span></div></div>
    <div class="kpi"><div class="l">Entri kamus data</div><div class="v">${state.kamus.length}</div></div>`;
}

/* ---------- 3. Protokol Wawancara ---------- */
function renderWawancara(){
  const blok = [
   ["0–5 menit","Pembingkaian","Sampaikan: ini bukan audit kinerja orang. Tujuannya menemukan data mana yang lembaga miliki dan mana yang belum, supaya beban laporan berkurang. Minta izin merekam."],
   ["5–20 menit","Keputusan (L1)","\"Dalam sebulan terakhir, keputusan apa yang Anda ambil di divisi ini?\" Tulis 5 keputusan. Untuk tiap keputusan: \"Angka apa yang Anda lihat sebelum memutuskan? Dari mana?\" Kalau jawabannya 'feeling' atau 'pengalaman', catat apa adanya — itu temuan."],
   ["20–40 menit","Proses & formulir (L2)","Minta narasumber menceritakan satu siklus kerja penuh dari awal sampai laporan. Gambar alurnya di depan mereka dan minta koreksi. Tandai tiap titik di mana data lahir, disalin, atau hilang."],
   ["40–60 menit","Artefak & sistem (L3)","\"Buka laptopnya sekarang, tunjukkan file itu.\" Catat: nama file, lokasi persis, siapa yang bisa akses, kapan terakhir diubah. Minta salinan atau tautan saat itu juga — jangan menunggu dikirim nanti."],
   ["60–70 menit","Uji petik kualitas (L4)","Ambil 10 baris acak dari data mereka dan telusuri ke bukti sumbernya. Hitung berapa yang cocok. Angka ini lebih jujur daripada seluruh wawancara."],
   ["70–75 menit","Penutup","\"Kalau ada satu data yang Anda ingin punya tapi belum ada, apa?\" Konfirmasi daftar berkas yang akan dikirim + tenggatnya. Sepakati satu nama sebagai pemilik data divisi."]
  ];
  $("#t-wawancara").innerHTML = `
  <div class="card">
    <h2>Protokol Wawancara Divisi — 75 Menit</h2>
    <p class="lead">Satu sesi per divisi. Dua penggali: satu bertanya, satu mencatat. Jangan gabungkan dua divisi dalam satu sesi — narasumber akan saling menutupi.</p>
    ${blok.map((b,i)=>`<div class="step"><div class="n">${i+1}</div><div class="t"><b>${esc(b[0])} — ${esc(b[1])}</b><p>${esc(b[2])}</p></div></div>`).join("")}
    <h3>Enam pertanyaan pembuka kunci (dipakai untuk semua divisi)</h3>
    <div class="q">Keputusan apa yang Anda ambil rutin, dan angka apa yang Anda lihat sebelumnya?</div>
    <div class="q">Laporan apa yang Anda buat, untuk siapa, dan berapa lama membuatnya?</div>
    <div class="q">Data apa yang Anda ketik ulang dari satu tempat ke tempat lain? (Setiap pengetikan ulang adalah titik kesalahan.)</div>
    <div class="q">Kalau saya minta angka X hari ini, berapa lama Anda bisa memberikannya?</div>
    <div class="q">Data apa yang Anda kumpulkan tapi tidak pernah ditanya siapa pun?</div>
    <div class="q">Angka mana di laporan lembaga yang menurut Anda paling rapuh?</div>
    <h3>Aturan pencatat</h3>
    <ul>
      <li>Tulis kutipan asli, bukan ringkasan. "Saya biasanya tanya WA ke bendahara" lebih berguna daripada "koordinasi lisan".</li>
      <li>Setiap penyebutan nama file, sistem, atau orang → langsung masuk Kamus Data.</li>
      <li>Setiap janji ("nanti saya kirim") → catat dengan tenggat dan nama. Tanpa itu, tidak akan pernah dikirim.</li>
      <li>Kirim ringkasan wawancara ke narasumber dalam 24 jam untuk dikoreksi. Koreksi mereka adalah data tambahan.</li>
    </ul>
    <div class="box bad" style="margin-top:14px"><b>Jangan lakukan:</b> mengirim kuesioner sebagai pengganti wawancara. Kuesioner data hanya menghasilkan jawaban yang aman dan normatif; Anda akan mendapat "sudah ada" untuk data yang sebenarnya tidak ada.</div>
  </div>`;
}

/* ---------- 4. Kamus Data ---------- */
function renderKamus(){
  $("#t-kamus").innerHTML = `
  <div class="card">
    <h2>Kamus Data — Keluaran Utama</h2>
    <p class="lead">Satu baris untuk satu elemen data. Ini yang tersisa setelah semua wawancara selesai, dan ini yang jadi dasar apa pun yang dibangun setelahnya (dasbor, sistem, laporan donor).</p>
    <div class="grid2">
      <div class="field"><label class="f">Nama elemen data</label><input id="k-n" placeholder="mis. Jumlah penerima manfaat unik"></div>
      <div class="field"><label class="f">Divisi pemilik</label><select id="k-dv">${DIVISI.map(d=>`<option value="${d.id}">${esc(d.nama)}</option>`).join("")}</select></div>
    </div>
    <div class="field"><label class="f">Definisi operasional / rumus</label><input id="k-d" placeholder="mis. COUNT DISTINCT NIK penerima dalam periode berjalan"></div>
    <div class="grid3">
      <div class="field"><label class="f">Sumber (lokasi persis)</label><input id="k-s" placeholder="mis. Sheet 'Registri 2026' tab Peserta"></div>
      <div class="field"><label class="f">Pemilik data (nama/jabatan)</label><input id="k-o" placeholder="mis. Koordinator Lapangan"></div>
      <div class="field"><label class="f">Frekuensi pembaruan</label><input id="k-f" placeholder="mis. Mingguan"></div>
    </div>
    <div class="grid3">
      <div class="field"><label class="f">Klasifikasi</label><select id="k-k">${Object.keys(KLAS).map(k=>`<option value="${k}">${esc(KLAS[k].nm)}</option>`).join("")}</select></div>
      <div class="field"><label class="f">Status ketersediaan</label><select id="k-st"><option>Tersedia & terverifikasi</option><option>Tersedia, belum diverifikasi</option><option>Ada sebagian</option><option>Tidak ada — perlu dibangun</option></select></div>
      <div class="field"><label class="f">Dipakai untuk keputusan apa</label><input id="k-u" placeholder="mis. Alokasi anggaran kuartal"></div>
    </div>
    <div class="row"><button class="btn" id="k-add">Tambah ke kamus</button><button class="btn alt" id="k-csv">Unduh CSV</button><span style="font-size:12px;color:var(--muted)" id="k-cnt"></span></div>
  </div>
  <div class="card"><h3 style="margin-top:0">Isi kamus</h3><div id="k-tbl"></div></div>`;

  $("#k-add").onclick = ()=>{
    const g = id => $(id).value.trim();
    if(!g("#k-n")){ alert("Nama elemen data wajib diisi."); return; }
    state.kamus.push({n:g("#k-n"),dv:$("#k-dv").value,d:g("#k-d"),s:g("#k-s"),o:g("#k-o"),f:g("#k-f"),k:$("#k-k").value,st:$("#k-st").value,u:g("#k-u")});
    ["#k-n","#k-d","#k-s","#k-o","#k-f","#k-u"].forEach(i=>$(i).value="");
    save(); kamusTable(); kpiDivisi();
  };
  $("#k-csv").onclick = ()=>{
    if(!state.kamus.length){ alert("Kamus masih kosong."); return; }
    const head = ["Elemen","Divisi","Definisi","Sumber","Pemilik","Frekuensi","Klasifikasi","Status","Keputusan"];
    const q = v => '"'+String(v==null?"":v).replace(/"/g,'""')+'"';
    const rows = state.kamus.map(r=>[r.n,(DIVISI.find(d=>d.id===r.dv)||{}).nama||r.dv,r.d,r.s,r.o,r.f,KLAS[r.k].nm,r.st,r.u].map(q).join(","));
    dl("﻿"+[head.map(q).join(",")].concat(rows).join("\r\n"),"kamus-data-yayasan.csv","text/csv;charset=utf-8");
  };
  kamusTable();
}
function kamusTable(){
  const el = $("#k-tbl"); if(!el) return;
  $("#k-cnt").textContent = state.kamus.length+" entri tersimpan";
  if(!state.kamus.length){ el.innerHTML = `<p class="lead">Belum ada entri. Isi tiap kali sebuah data ditemukan dalam wawancara — jangan ditunda sampai akhir.</p>`; return; }
  el.innerHTML = `<table><thead><tr><th>Elemen</th><th>Divisi</th><th>Definisi</th><th>Sumber</th><th>Pemilik</th><th>Klas.</th><th>Status</th><th></th></tr></thead><tbody>
  ${state.kamus.map((r,i)=>`<tr><td><b>${esc(r.n)}</b><br><span style="color:var(--muted);font-size:11.5px">${esc(r.u||"")}</span></td>
   <td>${esc(((DIVISI.find(d=>d.id===r.dv)||{}).nama)||r.dv)}</td><td>${esc(r.d)}</td><td>${esc(r.s)}</td><td>${esc(r.o)}<br><span style="color:var(--muted);font-size:11.5px">${esc(r.f)}</span></td>
   <td><span class="tag ${KLAS[r.k].c}">${esc(KLAS[r.k].nm)}</span></td><td>${esc(r.st)}</td>
   <td><button class="btn danger" data-del="${i}" style="padding:4px 9px;font-size:11px">Hapus</button></td></tr>`).join("")}</tbody></table>`;
  el.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{ if(confirm("Hapus entri ini?")){ state.kamus.splice(+b.dataset.del,1); save(); kamusTable(); kpiDivisi(); }});
}

/* ---------- 5. Kematangan ---------- */
function renderMatang(){
  $("#t-matang").innerHTML = `
  <div class="card">
    <h2>Nilai Kematangan Data per Divisi</h2>
    <p class="lead">Isi setelah wawancara, bukan sebelum. Nilai berdasarkan bukti yang Anda lihat sendiri, bukan klaim narasumber. Skala 1–5.</p>
    <table><thead><tr><th style="width:90px">Level</th><th>Arti</th></tr></thead><tbody>
     ${LEVEL.map(l=>`<tr><td><b>${l.v} — ${esc(l.nm)}</b></td><td>${esc(l.ket)}</td></tr>`).join("")}
    </tbody></table>
    <table style="margin-top:14px"><thead><tr><th style="width:210px">Dimensi</th><th>Yang dinilai</th></tr></thead><tbody>
     ${DIMENSI.map(d=>`<tr><td><b>${esc(d.nm)}</b></td><td>${esc(d.ket)}</td></tr>`).join("")}
    </tbody></table>
  </div>
  <div class="card"><h3 style="margin-top:0">Ringkasan skor</h3><div id="m-sum"></div></div>
  <div id="m-list"></div>`;

  $("#m-list").innerHTML = DIVISI.map(d=>`
   <details class="div"><summary><span class="num">${d.no}</span> ${d.ikon} ${esc(d.nama)} <span class="pill" data-ms="${d.id}"></span></summary>
   <div class="body">${DIMENSI.map(dim=>{
     const v = (state.skor[d.id]||{})[dim.id]||0;
     return `<div class="sc"><span class="nm">${esc(dim.nm)}</span><input type="range" min="0" max="5" step="1" value="${v}" data-sk="${d.id}|${dim.id}"><span class="vv" data-vv="${d.id}|${dim.id}">${v||"–"}</span></div>`;
   }).join("")}</div></details>`).join("");

  $("#m-list").addEventListener("input", e=>{
    const t=e.target; if(!t.dataset.sk) return;
    const [dv,dim]=t.dataset.sk.split("|");
    state.skor[dv]=state.skor[dv]||{}; state.skor[dv][dim]=+t.value;
    document.querySelector(`[data-vv="${t.dataset.sk}"]`).textContent = +t.value||"–";
    save(); matangSum();
  });
  matangSum();
}
function matangSum(){
  const el=$("#m-sum"); if(!el) return;
  const rows = DIVISI.map(d=>{
    const s = state.skor[d.id]||{}, vals = DIMENSI.map(x=>s[x.id]||0).filter(v=>v>0);
    const avg = vals.length? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
    const p = document.querySelector(`[data-ms="${d.id}"]`);
    if(p) p.textContent = avg? "Rata-rata "+avg.toFixed(1) : "belum dinilai";
    return {d,avg,s};
  });
  const dinilai = rows.filter(r=>r.avg>0);
  const overall = dinilai.length? (dinilai.reduce((a,r)=>a+r.avg,0)/dinilai.length) : 0;
  const lemah = dinilai.slice().sort((a,b)=>a.avg-b.avg).slice(0,3);
  const perDim = DIMENSI.map(dim=>{
    const v = DIVISI.map(d=>(state.skor[d.id]||{})[dim.id]||0).filter(x=>x>0);
    return {dim, avg: v.length? v.reduce((a,b)=>a+b,0)/v.length : 0};
  });
  el.innerHTML = `
   <div class="grid3" style="margin-bottom:14px">
     <div class="kpi"><div class="l">Kematangan lembaga</div><div class="v">${overall?overall.toFixed(1):"–"}<span style="font-size:15px;color:var(--muted)"> / 5</span></div>
       <div style="font-size:12px;color:var(--muted);margin-top:4px">${overall? esc(tafsir(overall)) : "Belum ada divisi yang dinilai"}</div></div>
     <div class="kpi"><div class="l">Divisi dinilai</div><div class="v">${dinilai.length}<span style="font-size:15px;color:var(--muted)"> / ${DIVISI.length}</span></div></div>
     <div class="kpi"><div class="l">Dimensi terlemah</div><div class="v" style="font-size:17px">${perDim.filter(x=>x.avg>0).sort((a,b)=>a.avg-b.avg)[0]?esc(perDim.filter(x=>x.avg>0).sort((a,b)=>a.avg-b.avg)[0].dim.nm):"–"}</div></div>
   </div>
   <table><thead><tr><th>Divisi</th>${DIMENSI.map(d=>`<th>${esc(d.nm)}</th>`).join("")}<th>Rata²</th></tr></thead><tbody>
   ${rows.map(r=>`<tr><td><b>${esc(r.d.nama)}</b></td>${DIMENSI.map(dm=>{const v=(r.s[dm.id]||0);return `<td style="text-align:center;font-weight:700;color:${v>=4?"var(--auto)":v===3?"var(--warn)":v>0?"var(--bad)":"var(--line)"}">${v||"–"}</td>`;}).join("")}<td style="text-align:center;font-weight:800">${r.avg?r.avg.toFixed(1):"–"}</td></tr>`).join("")}
   </tbody></table>
   ${lemah.length?`<div class="box bad" style="margin-top:12px"><b>Tiga divisi yang harus dibereskan lebih dulu:</b><br>${lemah.map(r=>`• ${esc(r.d.nama)} (${r.avg.toFixed(1)})`).join("<br>")}<br><span style="color:var(--muted)">Perbaiki yang terlemah dulu — rantai laporan lembaga sekuat mata rantai terlemahnya, bukan serata-ratanya.</span></div>`:""}`;
}
function tafsir(v){
  if(v<1.8) return "Data lembaga praktis tidak dapat diaudit.";
  if(v<2.6) return "Bertahan lewat kerja manual individu; rapuh saat orang keluar.";
  if(v<3.4) return "Ada format baku, tapi laporan masih lambat & sering diperbaiki manual.";
  if(v<4.3) return "Terkelola. Layak dijadikan dasar dasbor & pelaporan donor.";
  return "Terpadu. Fokus berpindah ke analitik & prediksi.";
}

/* ---------- 6. Roadmap ---------- */
function renderRoadmap(){
  const w = [
   ["Minggu 1","Persiapan & mandat","Surat penugasan dari Ketua/Direktur ke seluruh kepala divisi (tanpa ini, wawancara akan terus diundur). Kunci 9 jadwal wawancara sekaligus. Siapkan folder penampung berkas dengan struktur per divisi.","Jadwal terkunci, mandat tertulis, folder siap"],
   ["Minggu 2","Wawancara gelombang 1","Program, MEAL, Keuangan — tiga divisi yang datanya saling mengunci. Lakukan berurutan dalam satu minggu supaya selisih antar divisi masih segar untuk dikonfrontasi.","3 catatan wawancara + artefak awal"],
   ["Minggu 3","Wawancara gelombang 2","Fundraising, Komunikasi, SDM, Operasional, Legal, TI. Isi Kamus Data setiap hari, jangan menumpuk.","9 divisi tuntas, kamus data terisi"],
   ["Minggu 4","Uji silang & rekonsiliasi","Ambil 3 angka kunci (jumlah penerima manfaat, total penerimaan, jumlah kegiatan) lalu bandingkan versi tiap divisi. Semua selisih ditulis beserta penyebabnya. Ini bagian terpenting dari seluruh proses.","Berita acara selisih + definisi tunggal yang disepakati"],
   ["Minggu 5","Penilaian & prioritas","Isi Nilai Kematangan, tentukan 10 elemen data prioritas yang akan dibenahi lebih dulu (kriteria: dipakai untuk keputusan × mudah diperbaiki).","Peta kematangan + daftar 10 prioritas"],
   ["Minggu 6","Rancang & serah terima","Tetapkan pemilik data per elemen, frekuensi wajib, dan format baku. Rancang satu laporan bulanan tunggal yang menggantikan laporan-laporan terpisah. Presentasikan ke Pengurus.","Kamus data final, SK pemilik data, format laporan tunggal"]
  ];
  $("#t-roadmap").innerHTML = `
  <div class="card">
    <h2>Roadmap Pelaksanaan — 6 Minggu</h2>
    <p class="lead">Enam minggu adalah batas realistis sebelum momentum hilang dan divisi kembali ke kebiasaan lama. Jangan direncanakan enam bulan.</p>
    <table><thead><tr><th style="width:90px">Waktu</th><th style="width:170px">Fase</th><th>Kegiatan</th><th style="width:210px">Keluaran wajib</th></tr></thead><tbody>
     ${w.map(x=>`<tr><td><b>${esc(x[0])}</b></td><td><b>${esc(x[1])}</b></td><td>${esc(x[2])}</td><td>${esc(x[3])}</td></tr>`).join("")}
    </tbody></table>
    <h3>Peran minimum</h3>
    <ul>
      <li><b>Pemilik proses (1 orang):</b> pejabat setingkat direktur/manajer — memegang mandat dan membuka pintu divisi.</li>
      <li><b>Penggali (2 orang):</b> satu bertanya, satu mencatat. Idealnya salah satunya dari luar divisi yang diwawancara.</li>
      <li><b>Pemilik data per divisi (9 orang):</b> ditetapkan di akhir minggu 6, bukan di awal. Nama, bukan jabatan kosong.</li>
    </ul>
    <h3>Kriteria selesai</h3>
    <div class="box ok">Proses ini selesai bila: (1) setiap angka di laporan lembaga bisa ditelusuri ke satu sumber bernama; (2) setiap elemen data punya satu pemilik dengan nama; (3) tiga angka kunci lembaga menghasilkan nilai yang sama dari divisi mana pun ditanya. Kurang dari itu, belum selesai — sekadar dokumentasi.</div>
    <div class="box bad" style="margin-top:10px"><b>Jebakan paling sering:</b> proses ini berbelok jadi proyek pengadaan aplikasi di minggu ke-3. Membeli sistem sebelum definisi data disepakati hanya memindahkan kekacauan ke tempat yang lebih mahal.</div>
  </div>`;
}

/* ---------- 7. Etika ---------- */
function renderEtika(){
  $("#t-etika").innerHTML = `
  <div class="card">
    <h2>Etika, Kerahasiaan & Perlindungan Data</h2>
    <div class="warnbar"><b>Perhatian:</b> yayasan menyimpan data kelompok rentan — penerima manfaat, anak, penyintas, donatur. Penggalian data yang ceroboh menciptakan risiko yang lebih besar daripada masalah yang ingin diselesaikan.</div>
    <h3>Klasifikasi data & aturan penanganan</h3>
    <table><thead><tr><th style="width:150px">Kelas</th><th>Contoh</th><th>Aturan</th></tr></thead><tbody>
      <tr><td><span class="tag t-pub">Publik</span></td><td>Laporan tahunan terbit, liputan media, profil program</td><td>Bebas dibagikan.</td></tr>
      <tr><td><span class="tag t-int">Internal</span></td><td>Rencana kerja, log kegiatan, kalender konten</td><td>Untuk staf; jangan diunggah ke layanan pihak ketiga tanpa izin.</td></tr>
      <tr><td><span class="tag t-rah">Rahasia</span></td><td>Laporan keuangan rinci, kontrak, gaji, pipeline hibah</td><td>Akses berbasis kebutuhan; simpan di drive lembaga, bukan pribadi.</td></tr>
      <tr><td><span class="tag t-sen">Sensitif / Pribadi</span></td><td>NIK & alamat penerima manfaat, data kesehatan, keluhan, data donatur, laporan insiden</td><td>Wajib dasar pemrosesan & persetujuan; akses dicatat; dianonimkan untuk analisis; tidak boleh keluar dari sistem lembaga.</td></tr>
    </tbody></table>
    <h3>Aturan bagi tim penggali</h3>
    <ul>
      <li><b>Minta struktur, bukan isi.</b> Untuk memahami sistem, cukup daftar kolom dan 5 baris contoh yang sudah dianonimkan — bukan seluruh basis data penerima manfaat.</li>
      <li><b>Jangan menyalin data sensitif ke perangkat pribadi.</b> Gunakan folder lembaga dengan akses terbatas dan tenggat hapus.</li>
      <li><b>Jangan pakai alat AI publik untuk data pribadi.</b> Anonimkan lebih dulu; ini termasuk mengunggah spreadsheet berisi NIK.</li>
      <li><b>Wawancara bukan investigasi.</b> Bila muncul dugaan penyimpangan, hentikan penggalian dan serahkan ke jalur pengawas/whistleblowing — jangan diselidiki sendiri.</li>
      <li><b>Hapus setelah selesai.</b> Berkas kerja penggalian punya masa hidup; tetapkan tanggal pemusnahan di awal.</li>
    </ul>
    <h3>Kewajiban yang mengikat (Indonesia)</h3>
    <ul>
      <li><b>UU 27/2022 (Pelindungan Data Pribadi)</b> — yayasan adalah pengendali data; butuh dasar pemrosesan, pemberitahuan, dan kewajiban lapor bila terjadi kebocoran. Berlaku juga bagi lembaga nirlaba.</li>
      <li><b>UU 16/2001 jo. 28/2004 (Yayasan)</b> — kewajiban laporan tahunan dan keterbukaan bagi yayasan dengan penerimaan di atas ambang tertentu, termasuk kewajiban audit.</li>
      <li><b>Izin Pengumpulan Uang atau Barang (PUB)</b> — penggalangan dana publik menuntut izin dan laporan penggunaannya.</li>
      <li><b>Ketentuan donor</b> — banyak perjanjian hibah punya klausul retensi data, hak audit, dan pembatasan pemakaian data penerima manfaat yang lebih ketat daripada hukum nasional. Baca kontraknya.</li>
    </ul>
    <div class="box" style="margin-top:12px">Catatan: rangkuman regulasi di atas bersifat orientasi kerja, bukan nasihat hukum. Konfirmasikan kewajiban spesifik lembaga Anda ke penasihat hukum sebelum mengambil keputusan kepatuhan.</div>
  </div>`;
}

/* ---------- 8. Ekspor ---------- */
function renderEkspor(){
  $("#t-ekspor").innerHTML = `
  <div class="card">
    <h2>Ekspor / Impor Hasil Kerja</h2>
    <p class="lead">Seluruh isian tersimpan di peramban perangkat ini saja. Ekspor untuk memindahkan ke perangkat lain, mengarsipkan, atau menggabungkan hasil beberapa penggali.</p>
    <div class="row">
      <button class="btn" id="e-json">Unduh seluruh hasil (JSON)</button>
      <button class="btn alt" id="e-md">Unduh laporan ringkas (Markdown)</button>
      <button class="btn alt" id="e-print">Cetak / Simpan PDF</button>
      <button class="btn alt" id="e-imp">Impor berkas JSON</button>
      <button class="btn danger" id="e-clr">Hapus semua data</button>
    </div>
    <input type="file" id="e-file" accept="application/json,.json" style="display:none">
    <div class="box" style="margin-top:14px"><b>Menggabungkan hasil beberapa penggali:</b> impor akan <b>menimpa</b> isi perangkat ini. Bila dua orang mengisi paralel, ekspor keduanya lalu gabungkan pada satu perangkat secara manual sebelum menyimpan versi final.</div>
  </div>`;
  $("#e-json").onclick = ()=> dl(JSON.stringify({versi:1, diekspor:new Date().toISOString(), data:state},null,2),"penggalian-data-yayasan.json","application/json");
  $("#e-md").onclick = ()=> dl(markdown(),"laporan-penggalian-data.md","text/markdown;charset=utf-8");
  $("#e-print").onclick = ()=> window.print();
  $("#e-imp").onclick = ()=> $("#e-file").click();
  $("#e-file").onchange = e=>{
    const f = e.target.files[0]; if(!f) return;
    const r = new FileReader();
    r.onload = ()=>{ try{
        const j = JSON.parse(r.result), d = j.data||j;
        if(!d || typeof d!=="object") throw 0;
        if(!confirm("Impor akan menimpa seluruh isian di perangkat ini. Lanjutkan?")) return;
        Object.assign(state,{chk:d.chk||{},status:d.status||{},kamus:d.kamus||[],skor:d.skor||{},catatan:d.catatan||{}});
        save(); location.reload();
      }catch(err){ alert("Berkas tidak dikenali. Pastikan ini hasil ekspor dari perangkat ini."); } };
    r.readAsText(f);
  };
  $("#e-clr").onclick = ()=>{ if(confirm("Hapus seluruh isian di perangkat ini? Tindakan ini tidak bisa dibatalkan.")){ localStorage.removeItem(KEY); location.reload(); }};
}
function markdown(){
  let o = "# Laporan Penggalian Data Yayasan\n\nDiekspor: "+new Date().toLocaleString("id-ID")+"\n\n## Status per divisi\n\n| Divisi | Status | Artefak diterima | Kematangan |\n|---|---|---|---|\n";
  DIVISI.forEach(d=>{
    const got = d.artefak.filter((_,i)=>state.chk[d.id+"|"+i]).length;
    const s = state.skor[d.id]||{}, v = DIMENSI.map(x=>s[x.id]||0).filter(x=>x>0);
    const avg = v.length? (v.reduce((a,b)=>a+b,0)/v.length).toFixed(1) : "-";
    o += `| ${d.nama} | ${STATUS[state.status[d.id]||0]} | ${got}/${d.artefak.length} | ${avg} |\n`;
  });
  o += "\n## Kamus data ("+state.kamus.length+" entri)\n\n| Elemen | Divisi | Definisi | Sumber | Pemilik | Klasifikasi | Status |\n|---|---|---|---|---|---|---|\n";
  state.kamus.forEach(r=>{ o += `| ${r.n} | ${((DIVISI.find(d=>d.id===r.dv)||{}).nama)||r.dv} | ${r.d} | ${r.s} | ${r.o} | ${KLAS[r.k].nm} | ${r.st} |\n`; });
  o += "\n## Catatan lapangan\n\n";
  DIVISI.forEach(d=>{ if((state.catatan[d.id]||"").trim()) o += `### ${d.nama}\n\n${state.catatan[d.id]}\n\n`; });
  return o;
}
function dl(txt,name,mime){
  const b = new Blob([txt],{type:mime});
  const u = URL.createObjectURL(b), a = document.createElement("a");
  a.href = u; a.download = name; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(u); a.remove(); },400);
}

buildTabs(); renderPrinsip(); renderDivisi(); renderWawancara(); renderKamus(); renderMatang(); renderRoadmap(); renderEtika(); renderEkspor();
})();
