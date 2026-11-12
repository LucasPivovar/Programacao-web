function criarCarrosselContinuo(el, velocidade) {
  if (!el) return null;

  Array.from(el.children).forEach((item) => {
    const copia = item.cloneNode(true);
    copia.setAttribute("aria-hidden", "true");
    el.appendChild(copia);
  });

  let pausado = false;
  let pausaBotao = null;

  const metade = () => el.scrollWidth / 2;

  const animar = () => {
    if (!pausado) {
      el.scrollLeft += velocidade;
      if (el.scrollLeft >= metade()) {
        el.scrollLeft -= metade();
      }
    }
    requestAnimationFrame(animar);
  };

  el.addEventListener("mouseenter", () => (pausado = true));
  el.addEventListener("mouseleave", () => (pausado = false));
  el.addEventListener("focusin", () => (pausado = true));
  el.addEventListener("focusout", () => (pausado = false));

  requestAnimationFrame(animar);

  return {
    mover(direcao) {
      const item = el.firstElementChild;
      const gap = parseFloat(getComputedStyle(el).gap) || 24;
      const passo = item ? item.getBoundingClientRect().width + gap : 320;

      pausado = true;
      clearTimeout(pausaBotao);

      if (direcao < 0 && el.scrollLeft <= 2) {
        el.scrollLeft += metade();
      }

      el.scrollBy({ left: direcao * passo, behavior: "smooth" });
      pausaBotao = setTimeout(() => {
        if (!el.matches(":hover")) pausado = false;
      }, 500);
    }
  };
}

// Ticker contínuo abaixo do hero
criarCarrosselContinuo(document.getElementById("ticker"), 0.7);

// Carrossel contínuo mais lento de impacto social
const carrosselSocial = criarCarrosselContinuo(document.getElementById("carrossel"), 0.25);

if (carrosselSocial) {
  document.getElementById("prev")?.addEventListener("click", () => carrosselSocial.mover(-1));
  document.getElementById("next")?.addEventListener("click", () => carrosselSocial.mover(1));
}
