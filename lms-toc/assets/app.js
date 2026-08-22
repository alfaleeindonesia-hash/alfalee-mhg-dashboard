/* ============================================================
   LMS Theory of Change — mesin aplikasi
   Tanpa dependensi eksternal. Semua progres & isian tersimpan
   di localStorage peramban masing-masing peserta.
   ============================================================ */
(function () {
  "use strict";

  var LS = "toc-lms-v1";
  var state = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {}
  }
  function get(path, dflt) { return state[path] === undefined ? dflt : state[path]; }
  function set(path, v) { state[path] = v; save(); }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- NAVIGASI ---------------- */
  var sections = $$("section.lesson");
  var navEl = $("#sbNav");

  function buildNav() {
    var lastGroup = null, html = "";
    sections.forEach(function (s) {
      var g = s.dataset.group || "";
      if (g !== lastGroup) { html += '<div class="nav-group">' + g + "</div>"; lastGroup = g; }
      html += '<a href="#' + s.id + '" data-id="' + s.id + '">' +
        '<span class="n">' + (s.dataset.num || "•") + "</span>" +
        '<span class="t">' + (s.dataset.nav || s.dataset.title || s.id) + "</span></a>";
    });
    navEl.innerHTML = html;
  }

  function trackable() { return sections.filter(function (s) { return s.dataset.track === "1"; }); }

  function refreshNav() {
    var done = get("done", {});
    $$("#sbNav a").forEach(function (a) {
      a.classList.toggle("done", !!done[a.dataset.id]);
      a.classList.toggle("active", a.dataset.id === current);
    });
    var tr = trackable(), n = tr.filter(function (s) { return done[s.id]; }).length;
    var pct = tr.length ? Math.round((n / tr.length) * 100) : 0;
    var C = 2 * Math.PI * 22;
    var fg = $("#ringFg");
    if (fg) { fg.setAttribute("stroke-dasharray", (C * pct / 100).toFixed(1) + " " + C.toFixed(1)); }
    var t = $("#ringTxt"); if (t) t.textContent = pct + "%";
    var l = $("#progLab");
    if (l) l.innerHTML = "<b>" + n + " dari " + tr.length + " bagian</b>selesai dipelajari";
  }

  var current = null;
  function show(id, push) {
    var sec = document.getElementById(id);
    if (!sec || !sec.classList.contains("lesson")) { id = sections[0].id; sec = sections[0]; }
    sections.forEach(function (s) { s.classList.toggle("show", s === sec); });
    current = id;
    if (push !== false && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    document.body.classList.remove("nav-open");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "auto" : "auto" });
    var tt = $("#topTitle"); if (tt) tt.textContent = sec.dataset.nav || "";
    refreshNav();
    var act = $('#sbNav a[data-id="' + id + '"]');
    if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest" });
  }

  window.addEventListener("hashchange", function () { show(location.hash.slice(1), false); });

  /* ---------------- FOOTER TIAP MODUL ---------------- */
  function buildFooters() {
    sections.forEach(function (s, i) {
      if (s.dataset.nofoot === "1") return;
      var prev = sections[i - 1], next = sections[i + 1];
      var f = document.createElement("div");
      f.className = "lesson-foot";
      var dbtn = s.dataset.track === "1"
        ? '<button class="btn done-btn" data-done="' + s.id + '">Tandai bagian ini selesai</button>'
        : "<span></span>";
      f.innerHTML = dbtn + '<div class="nextprev">' +
        (prev ? '<a class="btn ghost" href="#' + prev.id + '">‹ ' + (prev.dataset.nav || "") + "</a>" : "") +
        (next ? '<a class="btn gold" href="#' + next.id + '">' + (next.dataset.nav || "") + " ›</a>" : "") +
        "</div>";
      s.appendChild(f);
    });
  }

  function refreshDoneButtons() {
    var done = get("done", {});
    $$("[data-done]").forEach(function (b) {
      var on = !!done[b.dataset.done];
      b.classList.toggle("is-done", on);
      b.textContent = on ? "✓ Sudah selesai — klik untuk batalkan" : "Tandai bagian ini selesai";
    });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-done]");
    if (b) {
      var done = get("done", {});
      done[b.dataset.done] = !done[b.dataset.done];
      if (!done[b.dataset.done]) delete done[b.dataset.done];
      set("done", done); refreshDoneButtons(); refreshNav();
    }
    var nav = e.target.closest("#sbNav a, a[href^='#']");
    if (nav && nav.getAttribute("href") && nav.getAttribute("href").charAt(0) === "#") {
      var id = nav.getAttribute("href").slice(1);
      if (document.getElementById(id) && document.getElementById(id).classList.contains("lesson")) {
        e.preventDefault(); show(id);
      }
    }
  });

  /* ---------------- SIMPAN ISIAN (textarea/input/checkbox) ---------------- */
  function bindSaves() {
    var vals = get("fields", {});
    $$("[data-save]").forEach(function (el) {
      var k = el.dataset.save;
      if (el.type === "checkbox") {
        el.checked = !!vals[k];
        el.closest(".chk") && el.closest(".chk").classList.toggle("on", el.checked);
      } else if (vals[k] !== undefined) { el.value = vals[k]; }
      var ev = el.type === "checkbox" ? "change" : "input";
      el.addEventListener(ev, function () {
        var v = get("fields", {});
        v[k] = el.type === "checkbox" ? el.checked : el.value;
        set("fields", v);
        if (el.type === "checkbox" && el.closest(".chk")) el.closest(".chk").classList.toggle("on", el.checked);
        flash(el);
        if (el.dataset.scoregroup) scoreChecklist(el.dataset.scoregroup);
      });
    });
  }
  var flashT;
  function flash(el) {
    var s = el.parentNode.querySelector(".saved") || (el.closest(".exercise") || el.closest(".tool") || document).querySelector(".saved");
    if (!s) return;
    s.textContent = "✓ tersimpan di peramban ini";
    clearTimeout(flashT); flashT = setTimeout(function () { s.textContent = ""; }, 1800);
  }

  /* ---------------- DAFTAR PERIKSA BERSKOR ---------------- */
  function scoreChecklist(g) {
    var boxes = $$('[data-scoregroup="' + g + '"]');
    var on = boxes.filter(function (b) { return b.checked; }).length;
    var out = $('[data-scoreout="' + g + '"]');
    if (!out) return;
    var no = boxes.length - on;
    var verdict, cls;
    if (no === 0) { verdict = "Seluruh butir terpenuhi. ToC siap dipakai sebagai dasar proposal."; cls = "ok"; }
    else if (no <= 5) { verdict = "Masih ada " + no + ' butir "tidak". Perbaiki dulu, tetapi ToC sudah dapat dipakai sebagai draf kerja.'; cls = "warn"; }
    else { verdict = "Ada " + no + ' butir "tidak" — lebih dari lima. Sesuai Lampiran B, ToC ini belum siap dipakai sebagai dasar proposal.'; cls = "bad"; }
    out.innerHTML = "<b>" + on + " / " + boxes.length + " terpenuhi.</b> " + verdict;
    out.className = "chk-score note " + cls;
  }

  /* ---------------- KUIS ---------------- */
  var QUIZ = window.TOC_QUIZ || {};
  function buildQuizzes() {
    $$("[data-quiz]").forEach(function (box) {
      var key = box.dataset.quiz, data = QUIZ[key];
      if (!data) return;
      var h = '<div class="hd"><span class="ic">🧭</span><h4>' + (data.title || "Cek pemahaman") + "</h4></div>" +
        '<p class="qsub">' + (data.sub || "Pilih satu jawaban untuk setiap pertanyaan, lalu periksa hasilnya. Nilai lulus 70%.") + "</p>";
      data.q.forEach(function (q, i) {
        h += '<div class="q" data-qi="' + i + '"><div class="qt"><span class="qn">' + (i + 1) + ".</span>" + q.t + "</div>";
        q.o.forEach(function (o, j) {
          h += '<label class="opt" data-oi="' + j + '"><input type="radio" name="' + key + "_" + i + '" value="' + j + '"><span>' + o + "</span></label>";
        });
        h += '<div class="expl"><b>Pembahasan.</b> ' + q.e + "</div></div>";
      });
      h += '<div class="acts"><button class="btn" data-qcheck="' + key + '">Periksa jawaban</button>' +
        '<button class="btn ghost sm" data-qreset="' + key + '">Ulangi</button></div>' +
        '<div class="score" data-qscore="' + key + '"></div>';
      box.innerHTML = h;
    });
    var saved = get("quiz", {});
    Object.keys(saved).forEach(function (k) {
      var el = $('[data-quiz="' + k + '"] .score');
      if (el) markScore(k, saved[k].c, saved[k].n, el, true);
    });
  }

  function markScore(key, c, n, el, quiet) {
    var pct = Math.round((c / n) * 100);
    el.className = "score show " + (pct >= 70 ? "pass" : "fail");
    el.innerHTML = "<b>Nilai: " + c + "/" + n + " (" + pct + "%)</b> — " +
      (pct >= 70 ? "lulus. Pembahasan setiap soal terbuka di bawah; baca juga soal yang sudah benar."
        : "belum lulus (ambang 70%). Baca kembali pembahasan, lalu ulangi.") +
      (quiet ? ' <span style="opacity:.7">(hasil terakhir yang tersimpan)</span>' : "");
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-qcheck]");
    if (b) {
      var key = b.dataset.qcheck, data = QUIZ[key], box = $('[data-quiz="' + key + '"]');
      var c = 0;
      data.q.forEach(function (q, i) {
        var qEl = $('.q[data-qi="' + i + '"]', box);
        var sel = $('input[name="' + key + "_" + i + '"]:checked', qEl);
        $$(".opt", qEl).forEach(function (o) { o.classList.remove("correct", "wrong", "reveal"); });
        $$(".opt", qEl)[q.a].classList.add(sel && +sel.value === q.a ? "correct" : "reveal");
        if (sel && +sel.value !== q.a) $$(".opt", qEl)[+sel.value].classList.add("wrong");
        if (sel && +sel.value === q.a) c++;
        $(".expl", qEl).classList.add("show");
      });
      var sc = $('[data-qscore="' + key + '"]', box);
      markScore(key, c, data.q.length, sc);
      var qz = get("quiz", {}); qz[key] = { c: c, n: data.q.length }; set("quiz", qz);
      sc.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    var r = e.target.closest("[data-qreset]");
    if (r) {
      var k2 = r.dataset.qreset, bx = $('[data-quiz="' + k2 + '"]');
      $$("input[type=radio]", bx).forEach(function (i) { i.checked = false; });
      $$(".opt", bx).forEach(function (o) { o.classList.remove("correct", "wrong", "reveal"); });
      $$(".expl", bx).forEach(function (x) { x.classList.remove("show"); });
      $(".score", bx).className = "score";
      var qz2 = get("quiz", {}); delete qz2[k2]; set("quiz", qz2);
    }
  });

  /* ---------------- VIDEO (klik untuk memuat, privacy-enhanced) ---------------- */
  document.addEventListener("click", function (e) {
    var f = e.target.closest(".vid .frame[data-yt]");
    if (!f || f.dataset.loaded) return;
    var id = f.dataset.yt;
    f.dataset.loaded = "1";
    f.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&rel=0&modestbranding=1" title="Video pembelajaran ToC" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
  });

  /* ---------------- MATRIKS ASUMSI ---------------- */
  var AKEY = "asumsi";
  function asumsiRows() { return get(AKEY, []); }
  function renderAsumsi() {
    var host = $("#asumsiTable"); if (!host) return;
    var rows = asumsiRows();
    var h = '<div class="tbl-wrap"><table class="compact"><thead><tr><th style="min-width:210px">Asumsi (spesifik, dapat diuji)</th>' +
      "<th>Jenis</th><th>Akibat jika salah</th><th>Kekuatan bukti</th><th>Tindakan</th><th></th></tr></thead><tbody>";
    if (!rows.length) h += '<tr><td colspan="6" style="color:#7C8798">Belum ada asumsi. Klik “Tambah asumsi” — targetnya minimal 10.</td></tr>';
    rows.forEach(function (r, i) {
      h += "<tr>" +
        '<td><input type="text" data-ai="' + i + '" data-af="t" value="' + esc(r.t) + '" placeholder="Contoh: Fasilitas pengolahan kabupaten bersedia menerima sampah terpilah"></td>' +
        "<td>" + sel(i, "j", r.j, ["Kausal", "Implementasi", "Kontekstual", "Normatif"]) + "</td>" +
        "<td>" + sel(i, "d", r.d, ["Besar", "Kecil"]) + "</td>" +
        "<td>" + sel(i, "b", r.b, ["Kuat", "Lemah"]) + "</td>" +
        '<td><input type="text" data-ai="' + i + '" data-af="a" value="' + esc(r.a) + '" placeholder="Riset awal / uji coba / konsultasi"></td>' +
        '<td class="row-actions"><button data-adel="' + i + '" title="Hapus baris">✕</button></td></tr>';
    });
    h += "</tbody></table></div>";
    host.innerHTML = h;
    plotAsumsi();
  }
  function esc(s) { return String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
  function sel(i, f, v, opts) {
    return '<select data-ai="' + i + '" data-af="' + f + '">' + opts.map(function (o) {
      return '<option' + (o === v ? " selected" : "") + ">" + o + "</option>";
    }).join("") + "</select>";
  }
  function plotAsumsi() {
    if (!$("#qBL")) return;
    var rows = asumsiRows();
    var q = { "Besar|Lemah": [], "Besar|Kuat": [], "Kecil|Lemah": [], "Kecil|Kuat": [] };
    rows.forEach(function (r, i) { var k = (r.d || "Besar") + "|" + (r.b || "Lemah"); if (q[k]) q[k].push(i + 1); });
    var boxes = {
      "Besar|Kuat": ["#qBK", "Pantau rutin"],
      "Besar|Lemah": ["#qBL", "PRIORITAS TERTINGGI"],
      "Kecil|Kuat": ["#qKK", "Catat saja"],
      "Kecil|Lemah": ["#qKL", "Tinjau tengah periode"]
    };
    Object.keys(boxes).forEach(function (k) {
      var el = $(boxes[k][0] + " .nums");
      if (el) el.textContent = q[k].length ? "Asumsi no. " + q[k].join(", ") : "—";
    });
  }
  document.addEventListener("input", function (e) {
    var el = e.target.closest("[data-ai]"); if (!el) return;
    var rows = asumsiRows(); rows[+el.dataset.ai][el.dataset.af] = el.value; set(AKEY, rows); plotAsumsi();
  });
  document.addEventListener("change", function (e) {
    var el = e.target.closest("select[data-ai]"); if (!el) return;
    var rows = asumsiRows(); rows[+el.dataset.ai][el.dataset.af] = el.value; set(AKEY, rows); plotAsumsi();
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest("#asumsiAdd")) {
      var rows = asumsiRows(); rows.push({ t: "", j: "Kausal", d: "Besar", b: "Lemah", a: "" }); set(AKEY, rows); renderAsumsi();
    }
    var d = e.target.closest("[data-adel]");
    if (d) { var r2 = asumsiRows(); r2.splice(+d.dataset.adel, 1); set(AKEY, r2); renderAsumsi(); }
  });

  /* ---------------- KERANGKA INDIKATOR (MEAL) ---------------- */
  var IKEY = "indikator";
  function iRows() { return get(IKEY, []); }
  function renderInd() {
    var host = $("#indTable"); if (!host) return;
    var rows = iRows();
    var cols = [["o", "Outcome"], ["i", "Indikator"], ["bl", "Baseline"], ["tg", "Target"],
    ["s", "Sumber data & metode"], ["f", "Frekuensi"], ["p", "Penanggung jawab"]];
    var h = '<div class="tbl-wrap"><table class="compact"><thead><tr>' +
      cols.map(function (c) { return "<th>" + c[1] + "</th>"; }).join("") + "<th></th></tr></thead><tbody>";
    if (!rows.length) h += '<tr><td colspan="8" style="color:#7C8798">Belum ada baris. Aturannya: satu indikator untuk setiap outcome — bukan hanya untuk output.</td></tr>';
    rows.forEach(function (r, i) {
      h += "<tr>" + cols.map(function (c) {
        return '<td><input type="text" data-ii="' + i + '" data-if="' + c[0] + '" value="' + esc(r[c[0]]) + '"></td>';
      }).join("") + '<td class="row-actions"><button data-idel="' + i + '">✕</button></td></tr>';
    });
    h += "</tbody></table></div>";
    host.innerHTML = h;
  }
  document.addEventListener("input", function (e) {
    var el = e.target.closest("[data-ii]"); if (!el) return;
    var rows = iRows(); rows[+el.dataset.ii][el.dataset.if] = el.value; set(IKEY, rows);
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest("#indAdd")) { var r = iRows(); r.push({}); set(IKEY, r); renderInd(); }
    var d = e.target.closest("[data-idel]");
    if (d) { var r2 = iRows(); r2.splice(+d.dataset.idel, 1); set(IKEY, r2); renderInd(); }
  });

  /* ---------------- GLOSARIUM & PENCARIAN ---------------- */
  function bindGlossary() {
    var inp = $("#glSearch"); if (!inp) return;
    inp.addEventListener("input", function () {
      var q = inp.value.toLowerCase();
      $$("#glList .row").forEach(function (r) {
        r.classList.toggle("hide", q && r.textContent.toLowerCase().indexOf(q) === -1);
      });
    });
  }

  /* ---------------- EKSPOR / IMPOR / RESET ---------------- */
  function bindTools() {
    var ex = $("#btnExport");
    if (ex) ex.addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "toc-hasil-kerja-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click(); URL.revokeObjectURL(a.href);
    });
    var im = $("#btnImport");
    if (im) im.addEventListener("click", function () {
      var f = document.createElement("input"); f.type = "file"; f.accept = ".json,application/json";
      f.onchange = function () {
        var rd = new FileReader();
        rd.onload = function () {
          try { state = JSON.parse(rd.result); save(); location.reload(); }
          catch (err) { alert("Berkas tidak dapat dibaca. Pastikan itu berkas hasil ekspor dari modul ini."); }
        };
        rd.readAsText(f.files[0]);
      };
      f.click();
    });
    var rs = $("#btnReset");
    if (rs) rs.addEventListener("click", function () {
      if (confirm("Hapus seluruh progres, jawaban kuis, dan isian latihan di peramban ini? Tindakan ini tidak dapat dibatalkan — ekspor dulu bila perlu.")) {
        state = {}; save(); location.reload();
      }
    });
    var pr = $("#btnPrint"); if (pr) pr.addEventListener("click", function () { window.print(); });
    var mb = $("#btnMenu"); if (mb) mb.addEventListener("click", function () { document.body.classList.toggle("nav-open"); });
    var sc = $(".scrim"); if (sc) sc.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
  }

  /* ---------------- INISIALISASI ---------------- */
  buildNav();
  buildFooters();
  buildQuizzes();
  bindSaves();
  bindGlossary();
  bindTools();
  renderAsumsi();
  renderInd();
  refreshDoneButtons();
  $$("[data-scoregroup]").forEach(function (b) { scoreChecklist(b.dataset.scoregroup); });
  var seen = {};
  $$("[data-scoregroup]").forEach(function (b) { if (!seen[b.dataset.scoregroup]) { seen[b.dataset.scoregroup] = 1; scoreChecklist(b.dataset.scoregroup); } });
  show(location.hash.slice(1) || sections[0].id, false);
})();
