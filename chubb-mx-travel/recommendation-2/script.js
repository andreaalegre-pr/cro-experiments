(function() {
  const styleId = 'cro-experiment-atf-v6';
  document.getElementById(styleId)?.remove();

  const track = document.querySelector('.dy-carousel-track');
  if (!track) { console.warn('No se encontró .dy-carousel-track'); return; }

  const activeItem = track.querySelector('.carousel-item.active, .dy-slide.active') || track;
  const captionBox = activeItem.querySelector('.carousel-caption') || track.querySelector('.carousel-caption');
  const h1 = captionBox ? captionBox.querySelector('h1') : document.querySelector('.carousel-caption h1');
  const subtitle = captionBox ? captionBox.querySelector('.carousel_para p, p') : null;
  const quoteWrapper = document.querySelector('.cgt-section-wrapper.quote');

  track.classList.add('cro-hero-track');
  activeItem.classList.add('cro-hero-item');

  const style = document.createElement('style');
  style.id = styleId;
  style.innerHTML = `
    .cro-hero-track, .cro-hero-item {
      position: relative !important;
      overflow: hidden !important;
      background-color: #000000 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    @media (min-width: 769px) { .cro-hero-track, .cro-hero-item { height: 130px !important; } }
    @media (max-width: 768px) { .cro-hero-track, .cro-hero-item { height: 90px !important; } }
    .cro-hero-item img { display: none !important; }

    .cro-banner-placeholder {
      color: rgba(255,255,255,0.55) !important;
      font-size: 11px !important;
      letter-spacing: 1.5px !important;
      text-transform: uppercase !important;
      font-weight: 600 !important;
    }

    /* Contenedor nuevo: fuerza el orden H1 -> Subtítulo, en flujo normal (no absolute) */
    .cro-hero-content {
      position: static !important;
      width: 100% !important;
      max-width: 600px !important;
      margin: 0 auto !important;
      padding: 18px 16px 16px !important;
      background-color: #111111 !important;
      color: #ffffff !important;
      text-align: center !important;
      box-sizing: border-box !important;
      display: block !important;
    }
    .cro-hero-content h1 {
      position: static !important;
      color: #ffffff !important;
      font-size: 20px !important;
      line-height: 1.3 !important;
      margin: 0 0 8px 0 !important;
      display: block !important;
      order: 1 !important;
    }
    .cro-subtitle-badge {
      position: static !important;
      display: inline-block !important;
      background-color: rgba(255,255,255,0.12) !important;
      color: #ffffff !important;
      font-size: 12px !important;
      padding: 5px 12px !important;
      border-radius: 20px !important;
      margin: 0 !important;
      order: 2 !important;
    }
    @media (min-width: 769px) {
      .cro-hero-content h1 { font-size: 28px !important; }
      .cro-subtitle-badge { font-size: 14px !important; }
      .cro-hero-content { padding: 26px 16px 22px !important; }
    }

    @media (max-width: 768px) {
      .cgt-section-wrapper.quote {
        margin-top: 0 !important;
        padding-top: 8px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        width: 100% !important;
        display: flex !important;
        justify-content: center !important;
      }
      .cgt-section-wrapper.quote .cgt-quote-form {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Placeholder dentro del bloque negro del banner
  if (!track.querySelector('.cro-banner-placeholder')) {
    const label = document.createElement('span');
    label.className = 'cro-banner-placeholder';
    label.textContent = 'BANNER 1 · ESPACIO A ADAPTAR POR EL CLIENTE';
    track.appendChild(label);
  }

  // Crear contenedor nuevo y forzar el orden: H1 primero, subtítulo después
  let contentBlock = document.getElementById('cro-hero-content');
  if (!contentBlock) {
    contentBlock = document.createElement('div');
    contentBlock.id = 'cro-hero-content';
    contentBlock.className = 'cro-hero-content';
  }
  if (h1) contentBlock.appendChild(h1);          // 1º: H1
  if (subtitle) {
    subtitle.classList.add('cro-subtitle-badge');
    contentBlock.appendChild(subtitle);          // 2º: "Líder mundial..."
  }

  const bannerSection = track.closest('section, div[class*="carousel"], div[class*="banner"], div[class*="hero"]') || track.parentElement;

  if (bannerSection && bannerSection.parentElement) {
    // Orden final en el DOM: Banner -> contentBlock (H1+subtítulo) -> Cotizador
    bannerSection.parentElement.insertBefore(contentBlock, bannerSection.nextSibling);
    if (quoteWrapper) {
      bannerSection.parentElement.insertBefore(quoteWrapper, contentBlock.nextSibling);
    }
  }

  console.log('%cCRO Experiment v6 final: Banner > H1 > Subtítulo > Cotizador (centrado en mobile).', 'color: green; font-weight: bold;');
})();
