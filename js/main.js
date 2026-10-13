/* Instituto de Cirugía Dr. Luis Manuel Cano — interacciones */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Número de WhatsApp del consultorio (formato internacional, sin "+")
  var WHATSAPP = "520000000000";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Año del footer ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Navegación ---------- */
  var nav = $("#nav");
  var toggle = $("#navToggle");
  var links = $("#navLinks");
  var toTop = $("#toTop");

  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 10);
    toTop.classList.toggle("is-visible", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", closeMenu); });

  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Enlace activo según la sección ---------- */
  var sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$(".nav__links a:not(.btn)").forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  var reveals = $$(".reveal");
  // Retraso escalonado para elementos hermanos
  reveals.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains("reveal"); });
    var i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty("--d", Math.min(i * 0.08, 0.5) + "s");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Contadores ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null;
    var dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("es-MX") + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Filtro de especialidades ---------- */
  var chips = $$(".services__filters .chip");
  var services = $$(".service");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-selected", String(c === chip));
      });
      services.forEach(function (s) {
        var show = f === "all" || s.getAttribute("data-cat").split(" ").indexOf(f) !== -1;
        s.classList.toggle("is-hidden", !show);
        if (show) s.classList.add("is-in");
      });
    });
  });

  /* ---------- Modal de especialidades ---------- */
  var SERVICES = {
    laparoscopica: {
      tag: "Mínima invasión",
      title: "Cirugía laparoscópica",
      desc: "Técnica quirúrgica que se realiza mediante pequeñas incisiones, utilizando una cámara de alta definición e instrumental especializado. Es el estándar actual para la mayoría de los procedimientos abdominales.",
      list: ["Incisiones de 5 a 12 mm", "Menor dolor post-operatorio", "Menor riesgo de infección", "Regreso más rápido a tus actividades"],
      meta: [["Ambulatoria o 24 h", "Estancia"], ["General", "Anestesia"], ["1 – 2 semanas", "Recuperación"]]
    },
    vesicula: {
      tag: "Cirugía general",
      title: "Cirugía de vesícula biliar",
      desc: "La colecistectomía laparoscópica es el tratamiento definitivo para los cálculos en la vesícula (piedras), cólicos biliares y colecistitis.",
      list: ["Elimina los cólicos biliares de forma definitiva", "Previene complicaciones como pancreatitis", "Procedimiento de mínima invasión", "Alta habitualmente al día siguiente"],
      meta: [["24 h", "Estancia"], ["General", "Anestesia"], ["7 – 10 días", "Recuperación"]]
    },
    hernias: {
      tag: "Cirugía general",
      title: "Reparación de hernias",
      desc: "Corrección de hernias inguinales, umbilicales, ventrales e incisionales utilizando mallas de última generación, por vía abierta o laparoscópica según cada caso.",
      list: ["Hernia inguinal y femoral", "Hernia umbilical y epigástrica", "Hernia incisional (eventración)", "Baja tasa de recurrencia con malla"],
      meta: [["Ambulatoria", "Estancia"], ["Regional / General", "Anestesia"], ["1 – 3 semanas", "Recuperación"]]
    },
    bariatrica: {
      tag: "Cirugía metabólica",
      title: "Cirugía bariátrica",
      desc: "Tratamiento quirúrgico de la obesidad y sus enfermedades asociadas como diabetes tipo 2, hipertensión y apnea del sueño, con acompañamiento de un equipo multidisciplinario.",
      list: ["Manga gástrica laparoscópica", "Bypass gástrico", "Programa con nutrición y psicología", "Seguimiento a largo plazo"],
      meta: [["24 – 48 h", "Estancia"], ["General", "Anestesia"], ["2 – 3 semanas", "Recuperación"]]
    },
    urgencias: {
      tag: "Urgencias 24/7",
      title: "Apendicitis y urgencias quirúrgicas",
      desc: "Atención inmediata de urgencias abdominales como apendicitis, colecistitis aguda, obstrucción intestinal y hernias complicadas, en hospitales certificados.",
      list: ["Disponibilidad las 24 horas", "Diagnóstico rápido y preciso", "Apendicectomía laparoscópica", "Coordinación con hospital y aseguradora"],
      meta: [["24 – 48 h", "Estancia"], ["General", "Anestesia"], ["1 – 2 semanas", "Recuperación"]]
    },
    reflujo: {
      tag: "Cirugía metabólica",
      title: "Reflujo y hernia hiatal",
      desc: "La funduplicatura laparoscópica corrige la hernia hiatal y crea una válvula antirreflujo, ofreciendo control definitivo en pacientes que no responden a medicamentos.",
      list: ["Control del ardor y regurgitación", "Disminuye o elimina la medicación", "Corrección de la hernia hiatal", "Mínima invasión"],
      meta: [["24 – 48 h", "Estancia"], ["General", "Anestesia"], ["2 semanas", "Recuperación"]]
    },
    piel: {
      tag: "Cirugía general",
      title: "Piel y tejidos blandos",
      desc: "Extirpación de lesiones como lipomas, quistes sebáceos, lunares y uñas enterradas, con técnica cuidadosa para lograr el mejor resultado estético.",
      list: ["Lipomas y quistes", "Lunares y lesiones de piel", "Estudio de patología cuando se requiere", "Procedimientos en consultorio"],
      meta: [["Ambulatoria", "Estancia"], ["Local", "Anestesia"], ["Pocos días", "Recuperación"]]
    },
    procto: {
      tag: "Cirugía general",
      title: "Cirugía proctológica",
      desc: "Tratamiento de enfermedades anorrectales como hemorroides, fisuras, fístulas y abscesos, con técnicas modernas que reducen el dolor y aceleran la recuperación.",
      list: ["Hemorroides", "Fisura anal", "Fístulas y abscesos", "Atención discreta y respetuosa"],
      meta: [["Ambulatoria", "Estancia"], ["Regional", "Anestesia"], ["1 – 2 semanas", "Recuperación"]]
    }
  };

  var modal = $("#modal");
  var lastFocus = null;
  var checkIcon = '<svg class="ico"><use href="#i-check"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function openModal(key) {
    var d = SERVICES[key];
    if (!d) return;
    $("#modalTag").textContent = d.tag;
    $("#modalTitle").textContent = d.title;
    $("#modalDesc").textContent = d.desc;
    $("#modalList").innerHTML = d.list.map(function (li) { return "<li>" + checkIcon + "<span>" + esc(li) + "</span></li>"; }).join("");
    $("#modalMeta").innerHTML = d.meta.map(function (m) { return "<div><strong>" + esc(m[0]) + "</strong><span>" + esc(m[1]) + "</span></div>"; }).join("");
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  }
  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $$(".service__more").forEach(function (b) {
    b.addEventListener("click", function () { openModal(b.getAttribute("data-service")); });
  });
  $$("[data-close]", modal).forEach(function (el) { el.addEventListener("click", closeModal); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ---------- Slider de testimonios ---------- */
  var slider = $("#slider");
  var track = $(".slider__track", slider);
  var slides = $$(".testimonial", track);
  var dotsWrap = $(".slider__dots", slider);
  var current = 0;
  var timer = null;

  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "Testimonio " + (i + 1));
    b.addEventListener("click", function () { go(i); restart(); });
    dotsWrap.appendChild(b);
  });
  var dots = $$("button", dotsWrap);

  function go(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-100 * current) + "%)";
    dots.forEach(function (d, j) { d.classList.toggle("is-active", j === current); });
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { go(current + 1); }, 6500);
  }
  $$(".slider__btn", slider).forEach(function (b) {
    b.addEventListener("click", function () { go(current + parseInt(b.getAttribute("data-dir"), 10)); restart(); });
  });
  slider.addEventListener("mouseenter", function () { clearInterval(timer); });
  slider.addEventListener("mouseleave", restart);

  // Deslizar con el dedo en móviles
  var startX = null;
  track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { go(current + (dx < 0 ? 1 : -1)); restart(); }
    startX = null;
  });
  go(0);
  restart();

  /* ---------- Formulario de contacto ---------- */
  var form = $("#contactForm");
  var msg = $("#formMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    $$("[required]", form).forEach(function (input) {
      var wrap = input.closest(".field") || input.closest(".check");
      var valid = input.type === "checkbox" ? input.checked : input.value.trim() !== "";
      if (input.type === "tel" && valid) valid = input.value.replace(/\D/g, "").length >= 10;
      wrap.classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });

    if (!ok) {
      msg.className = "form__msg err";
      msg.textContent = "Por favor completa los campos marcados.";
      return;
    }

    var data = new FormData(form);
    var text = "Hola, me gustaría agendar una valoración.\n\n" +
      "Nombre: " + data.get("nombre") + "\n" +
      "Teléfono: " + data.get("telefono") + "\n" +
      (data.get("email") ? "Correo: " + data.get("email") + "\n" : "") +
      "Motivo: " + data.get("motivo") + "\n" +
      (data.get("mensaje") ? "Mensaje: " + data.get("mensaje") : "");

    msg.className = "form__msg ok";
    msg.textContent = "¡Gracias! Te estamos redirigiendo a WhatsApp para confirmar tu cita.";
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    form.reset();
  });

  $$("input, select", form).forEach(function (input) {
    input.addEventListener("input", function () {
      var wrap = input.closest(".field") || input.closest(".check");
      if (wrap) wrap.classList.remove("is-invalid");
    });
  });
})();
