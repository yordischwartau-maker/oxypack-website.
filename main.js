(() => {
  // mobiel menu
  const btn = document.getElementById("menuBtn"), menu = document.getElementById("menu");
  const setMenu = open => {
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
  };
  btn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // dienstkaart kiest alvast het type project in het formulier
  const type = document.getElementById("type");
  document.querySelectorAll(".card[data-type]").forEach(c =>
    c.addEventListener("click", () => { type.value = c.dataset.type; }));

  // FAQ: één vraag tegelijk open
  const faqs = [...document.querySelectorAll(".faq details")];
  faqs.forEach(d => d.addEventListener("toggle", () => {
    if (d.open) faqs.forEach(o => { if (o !== d) o.open = false; });
  }));

  // mobiele actiebalk verbergen zodra het contactformulier in beeld is
  const bar = document.getElementById("mobileBar"), contact = document.getElementById("contact");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => bar.classList.toggle("hide", e.isIntersecting), { threshold: 0.15 }).observe(contact);
  }

  // contactformulier (geen backend: opent het e-mailprogramma)
  const form = document.getElementById("form"), note = document.getElementById("note");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    form.querySelectorAll("input[required]").forEach(i => i.classList.toggle("bad", !i.checkValidity()));
    if (!d.naam.trim() || !/^\S+@\S+\.\S+$/.test(d.email)) { note.textContent = "Vul je naam en een geldig e-mailadres in."; return; }
    const body = `Naam: ${d.naam}\nE-mail: ${d.email}\nTelefoon: ${d.telefoon}\nType: ${d.type}\nGewenste start: ${d.start}\n\n${d.bericht}`;
    location.href = `mailto:info@oxypack.eu?subject=${encodeURIComponent("Aanvraag: " + d.type)}&body=${encodeURIComponent(body)}`;
    note.textContent = "Bedankt! Je e-mailprogramma opent nu met je aanvraag. We reageren binnen één werkdag.";
  });

  document.getElementById("yr").textContent = new Date().getFullYear();
})();
