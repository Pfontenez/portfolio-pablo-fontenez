"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

type Screen = "start" | "menu" | "about" | "skills" | "gallery" | "project" | "web" | "video" | "contact";
type Gallery = "Redes sociales" | "Branding e identidad visual" | "Banners web" | "Inteligencia artificial";
type SkillSection =
  | "activities"
  | "abilities"
  | "education"
  | "experience"
  | "software";

  const skillSections: Array<{
  id: SkillSection;
  label: string;
}> = [
  { id: "activities", label: "ACTIVIDADES FRECUENTES" },
  { id: "abilities", label: "HABILIDADES" },
  { id: "education", label: "EDUCACIÓN" },
  { id: "experience", label: "EXPERIENCIA" },
  { id: "software", label: "SOFTWARE SKILLS" },
];

const menu: Array<{ label: string; screen?: Screen; gallery?: Gallery }> = [
  { label: "Quién soy", screen: "about" },
  { label: "Redes sociales", screen: "gallery", gallery: "Redes sociales" },
  { label: "Branding e identidad visual", screen: "gallery", gallery: "Branding e identidad visual" },
  { label: "Banners web", screen: "gallery", gallery: "Banners web" },
  { label: "Edición de video", screen: "video" },
  { label: "Diseño web", screen: "web" },
  { label: "Inteligencia artificial", screen: "gallery", gallery: "Inteligencia artificial" },
];

const galleryAssets: Record<Gallery, string[]> = {
  "Redes sociales": ["/projects/electronics-mexico/redes-01.png", "/projects/chili-beans-mexico/redes-01.png", "/projects/mark-sports/redes-01.png"],
  "Branding e identidad visual": ["/projects/general-water-company/branding-01.png"],
  "Banners web": ["/projects/banners-web/seleccion-banners.png"],
  "Inteligencia artificial": ["/projects/inteligencia-artificial/seleccion-ia.png"],
};

const galleryCharacters: Record<Gallery, {src:string; className:string; alt:string}> = {
  "Redes sociales": {src:"/characters/pablo-social.png",className:"character-gallery-social",alt:"Pablo como explorador con una barra"},
  "Branding e identidad visual": {src:"/characters/pablo-branding.png",className:"character-gallery-branding",alt:"Pablo como explorador con una escopeta"},
  "Banners web": {src:"/characters/pablo-banners.png",className:"character-gallery-banners",alt:"Pablo como explorador con hacha"},
  "Inteligencia artificial": {src:"/characters/pablo-ai.png",className:"character-gallery-ai",alt:"Pablo como explorador con un hacha al hombro"},
};

const socialProjects = [
  {
    name: "ELECTRONICS MÉXICO",
    logo: "/projects/electronics-mexico/logo.png",
    description: "Fundada en 2004, Electronics México es un distribuidor nacional de productos de hardware y software, con más de 40 empleados y tres almacenes de venta ubicados en CDMX, Nuevo Laredo y Veracruz.",
    sector: "TECNOLOGÍA", agency: "KRAB-E", year: "2024",
    images: ["/projects/electronics-mexico/redes-01.png","/projects/electronics-mexico/redes-02.png","/projects/electronics-mexico/redes-03.png"],
  },
  {
    name: "CHILI BEANS MÉXICO",
    logo: "/projects/chili-beans-mexico/logo.png",
    description: "Empresa mexicana de ropa enfocada en crear prendas básicas sin perder un estilo único para cada día. Ofrece moda versátil y de calidad para todos, garantizando una experiencia de compra segura, rápida y confiable.",
    sector: "INDUMENTARIA", agency: "KRAB-E", year: "2024",
    images: ["/projects/chili-beans-mexico/redes-01.png","/projects/chili-beans-mexico/redes-02.png","/projects/chili-beans-mexico/redes-03.png"],
  },
  {
    name: "MARK SPORTS",
    logo: "/projects/mark-sports/logo.png",
    description: "Diseño conceptual de las tiendas comerciales de Mark Sports, pertenecientes al Grupo Dash. Dash es una de las empresas líderes en retail deportivo, con más de 40 años de historia y más de 70 locales propios en toda la Argentina.",
    sector: "DEPORTES", agency: "KRAB-E", year: "2023",
    images: ["/projects/mark-sports/redes-01.png","/projects/mark-sports/redes-02.png","/projects/mark-sports/redes-03.png"],
  },
];

const brandingProjects = [
  {
    name: "GENERAL WATER COMPANY",
    logo: "/projects/general-water-company/logo.png",
    description: "GWC Store es una empresa internacional especializada en el desarrollo de tecnologías para el tratamiento del agua. En su e-commerce ofrece una amplia gama de productos, incluyendo dispensadores, filtros, ablandadores y más.",
    sector: "AGUA", agency: "KRAB-E", year: "2023",
    images: ["/projects/general-water-company/branding-01.png","/projects/general-water-company/branding-02.png"],
  },
];

const bannerProjects = [
  {
    name: "SELECCIÓN DE BANNERS WEB",
    logo: "",
    description: "En esta sección presento una selección de mis diseños de banners web, destacando la combinación de creatividad y funcionalidad. Cada pieza está diseñada pensando en la identidad de la marca y en captar la atención del público objetivo, logrando un equilibrio entre la estética y la comunicación efectiva.",
    sector: "DISEÑO DIGITAL", agency: "DIVERSAS MARCAS", year: "SELECCIÓN",
    images: ["/projects/banners-web/seleccion-banners.png"],
  },
];

const aiProjects = [
  {
    name: "IA APLICADA AL DISEÑO",
    logo: "",
    description: "La inteligencia artificial forma parte de mi proceso como una herramienta para explorar ideas, agilizar etapas y ampliar las posibilidades visuales, siempre bajo mi criterio como diseñador. Trabajo con relleno generativo y generación de imágenes y videos, integrando Photoshop, ChatGPT, Sora, Google AI Studio, Gemini y Midjourney para construir resultados sólidos y realistas. Aproximadamente el 80% de este portfolio fue desarrollado mediante este flujo de trabajo combinado.",
    sector: "DISEÑO E INTELIGENCIA ARTIFICIAL", agency: "PROYECTOS DIVERSOS", year: "2024–2026",
    images: ["/projects/inteligencia-artificial/seleccion-ia.png"],
  },
];
const menuBackgrounds = [
  "/backgrounds/church.webp",
  "/backgrounds/city.webp",
  "/backgrounds/horse-statue.webp",
  "/backgrounds/pergola.webp",
  "/backgrounds/stadium.webp",
];

function SoftwareIcon({
  software,
}: {
  software: string;
}) {
  if (software === "figma") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="12" cy="7" r="5" />
        <circle cx="20" cy="7" r="5" />
        <circle cx="12" cy="16" r="5" />
        <circle cx="20" cy="16" r="5" />
        <circle cx="12" cy="25" r="5" />
      </svg>
    );
  }

  const initials: Record<string, string> = {
    photoshop: "Ps",
    illustrator: "Ai",
    premiere: "Pr",
    aftereffects: "Ae",
  };

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="5" />

      <text
        x="16"
        y="20"
        textAnchor="middle"
      >
        {initials[software]}
      </text>
    </svg>
  );
}

export default function Home() {
  function getSkillSegmentPath(index: number) {
  const center = 200;
  const outerRadius = 174;
  const innerRadius = 78;
  const step = 72;
  const separation = 2.5;

  const startAngle =
    -90 - step / 2 + index * step + separation;

  const endAngle =
    -90 - step / 2 + (index + 1) * step - separation;

  const point = (radius: number, angle: number) => {
    const radians = (angle * Math.PI) / 180;

    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const outerStart = point(outerRadius, startAngle);
  const outerEnd = point(outerRadius, endAngle);
  const innerEnd = point(innerRadius, endAngle);
  const innerStart = point(innerRadius, startAngle);

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius} 0 0 1
      ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 0 0
      ${innerStart.x} ${innerStart.y}
    Z
  `;
}

function getSkillIconPosition(index: number) {
  const angle = (-90 + index * 72) * (Math.PI / 180);
  const radius = 125;

  return {
    x: 200 + radius * Math.cos(angle),
    y: 200 + radius * Math.sin(angle),
  };
}

function SkillCategoryIcon({
  type,
}: {
  type: SkillSection;
}) {
  if (type === "activities") {
    return (
      <g>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9l2 2 4-4" />
        <path d="M8 15h8" />
      </g>
    );
  }

  if (type === "abilities") {
    return (
      <g>
        <path d="M12 3l2.2 5.2L20 10l-4.4 3.6L17 19l-5-3-5 3 1.4-5.4L4 10l5.8-1.8z" />
      </g>
    );
  }

  if (type === "education") {
    return (
      <g>
        <path d="M3 9l9-5 9 5-9 5z" />
        <path d="M7 12v4c3 2 7 2 10 0v-4" />
        <path d="M21 9v6" />
      </g>
    );
  }

  if (type === "experience") {
    return (
      <g>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V4h8v3" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </g>
    );
  }

  return (
    <g>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </g>
  );
}
  const [screen, setScreen] = useState<Screen>("start");
  const [activeSkillSection, setActiveSkillSection] =
  useState<SkillSection | null>(null);
  const [hoveredSkillSection, setHoveredSkillSection] =
  useState<SkillSection | null>(null);
  const [menuBackgroundIndex, setMenuBackgroundIndex] = useState(0);
  const [gallery, setGallery] = useState<Gallery>("Redes sociales");
  const [transitioning, setTransitioning] = useState(false);
  const [access, setAccess] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [accessError, setAccessError] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [projectSlide, setProjectSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const previousScreen = useRef<Screen>("start");
  const sounds = useRef<Record<string, HTMLAudioElement>>({});
  const accessForm = useRef<HTMLFormElement>(null);
  const galleryCharacter = galleryCharacters[gallery];
  const galleryProjects = gallery === "Redes sociales" ? socialProjects : gallery === "Branding e identidad visual" ? brandingProjects : gallery === "Banners web" ? bannerProjects : aiProjects;
  const currentProject = galleryProjects[selectedProject] || socialProjects[0];
  const slideTotal = currentProject.images.length;
  const accessMessage =
  "Hola Pablo, estuve viendo tu portfolio y me gustaría solicitar la clave de acceso para conocer tus trabajos protegidos. Muchas gracias.";
  
  const whatsappAccessUrl =
  `https://wa.me/5491134145166?text=${encodeURIComponent(accessMessage)}`;

  const contactMessage =
  "Hola Pablo, estuve viendo tu portfolio y me gustaría ponerme en contacto con vos.";

const contactWhatsappUrl =
  `https://wa.me/5491134145166?text=${encodeURIComponent(contactMessage)}`;


const emailAccessUrl =
  `mailto:pabloezequielfontenez@gmail.com?subject=${encodeURIComponent(
    "Solicitud de acceso al portfolio"
  )}&body=${encodeURIComponent(accessMessage)}`;

  useEffect(() => {
    sounds.current = {
      inicio: new Audio("/audio/inicio.mp3"),
      menu: new Audio("/audio/menu.mp3"),
      click: new Audio("/audio/click.mp3"),
      secciones: new Audio("/audio/secciones.mp3"),
    };
    Object.values(sounds.current).forEach(audio => { audio.preload = "auto"; audio.volume = .48; });
    sounds.current.click.volume = .3;
    return () => Object.values(sounds.current).forEach(audio => { audio.pause(); audio.src = ""; });
  }, []);

  useEffect(() => {
  if (screen === previousScreen.current) return;

  const lastScreen = previousScreen.current;

  if (screen === "menu" && lastScreen !== "start") {
    setMenuBackgroundIndex(
      currentIndex => (currentIndex + 1) % (menuBackgrounds.length + 1)
    );
  }

  previousScreen.current = screen;

  if (!soundEnabled) return;

  playSound(screen === "menu" ? "menu" : "secciones");
}, [screen, soundEnabled]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
      else if (e.key === "Escape" && screen === "project") go("gallery");
      else if (e.key === "Escape" && screen !== "start") go("menu");
      if (e.key === "Enter" && screen === "start") go("menu");
      if (screen === "project" && !lightboxOpen && e.key === "ArrowLeft") setProjectSlide(value => (value + slideTotal - 1) % slideTotal);
      if (screen === "project" && !lightboxOpen && e.key === "ArrowRight") setProjectSlide(value => (value + 1) % slideTotal);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [screen, lightboxOpen, slideTotal]);

  function go(next: Screen) {
    if (next === screen || transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => { setScreen(next); window.setTimeout(() => setTransitioning(false), 70); }, 330);
  }

  function playSound(name: string) {
    const audio = sounds.current[name];
    if (!audio) return;
    if (name !== "click") {
      ["inicio", "menu", "secciones"].forEach(key => {
        const current = sounds.current[key];
        if (current && current !== audio) { current.pause(); current.currentTime = 0; }
      });
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }

  function startExperience() {
    go("menu");
  }

  function toggleSound() {
    setSoundEnabled(current => {
      const next = !current;
      if (!next) {
        ["inicio", "menu", "secciones"].forEach(key => {
          const audio = sounds.current[key];
          if (audio) { audio.pause(); audio.currentTime = 0; }
        });
      } else {
        playSound(screen === "start" ? "inicio" : screen === "menu" ? "menu" : "secciones");
      }
      return next;
    });
  }

  function handleInterfaceClick(e: MouseEvent<HTMLElement>) {
  const target = e.target as HTMLElement;

  if (target.closest('button, a, [role="button"]')) {
    playSound("click");
  }
}

  function openGallery(next: Gallery) { setGallery(next); go("gallery"); }
  function openProject(index: number) { setSelectedProject(index); setProjectSlide(0); go("project"); }
  function switchProject(index: number) { setSelectedProject(index); setProjectSlide(0); }

  function unlock(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateAccess(e.currentTarget);
  }

  function validateAccess(form: HTMLFormElement | null) {
    if (!form) return;
    const value = String(new FormData(form).get("key") || "").trim().toLowerCase();
    if (value === "nivel2") { setAccess(true); setAccessOpen(false); setAccessError(false); }
    else setAccessError(true);
  }

  return (
    <main className={`game screen-${screen} ${transitioning ? "is-transitioning" : ""}`} onClickCapture={handleInterfaceClick}>
      <div className="grain" />
      <div className="cinema top" /><div className="cinema bottom" />
      {screen !== "start" && screen !== "menu" && screen !== "contact" && <button className="home-logo" onClick={() => go("start")} aria-label="Volver al inicio"><img src="/brand/logo-pablo-horizontal.png" alt="Pablo Fonteñez" /></button>}
      <button className={`sound-toggle ${soundEnabled ? "is-on" : ""}`} onClick={toggleSound} aria-label={soundEnabled ? "Silenciar música" : "Activar música"}><span className="sound-icon" aria-hidden="true">{soundEnabled ? "♪" : "×"}</span><span>{soundEnabled ? "MÚSICA ACTIVADA" : "ACTIVAR MÚSICA"}</span></button>

      {screen === "start" && <section className="scene start-scene">
        <video className="scene-bg start-bg start-video" autoPlay muted loop playsInline poster="/backgrounds/window.webp" aria-label="Ventana de un edificio abandonado con vegetación movida por una brisa suave"><source src="/backgrounds/window-motion.mp4" type="video/mp4" /></video>
        <div className="start-shade" />
        <img className="start-logo" src="/brand/logo-pablo-horizontal.png" alt="Pablo Fonteñez — Diseñador gráfico" />
        <button className="figma-button start-button" onClick={startExperience}><span>INICIAR</span></button>
        <p className="key-hint">ENTER PARA INICIAR</p>
      </section>}

      {screen === "menu" && <section className="scene menu-scene">
        <video
  className="scene-bg menu-bg"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
>
  <source
    src="/backgrounds/menu-idle.mp4"
    type="video/mp4"
  />
</video>
        <div className="menu-vignette" />
        <div className="menu-panel">
          <button className="menu-logo-button" onClick={() => go("start")} aria-label="Volver al inicio"><img className="menu-logo" src="/brand/logo-pablo-horizontal.png" alt="Pablo Fonteñez — Diseñador gráfico" /></button>
          <nav className="main-menu" aria-label="Menú principal">
            {menu.map((item, index) => <button key={item.label} onClick={() => item.gallery ? openGallery(item.gallery) : go(item.screen || "menu")}><i>{String(index + 1).padStart(2,"0")}</i><span>{item.label}</span><b>›</b></button>)}
          </nav>
          <div className="menu-actions">
            <button onClick={() => go("contact")}>CONTACTO</button>
            <button className={access ? "level active" : "level"} onClick={() => setAccessOpen(true)}>{access ? "NIVEL 2 DESBLOQUEADO" : "CLIENTES · NIVEL 2"}</button>
          </div>
        </div>
        <div className="game-status"><span>PLAYER</span><b>PABLO FONTEÑEZ</b><i>ONLINE</i></div>
      </section>}

      {screen === "about" && <section className="scene about-scene">
        <img className="scene-bg about-bg" src="/backgrounds/pergola.webp" alt="Pérgola abandonada recuperada por la naturaleza" />
        <img className="scene-character character-about" src="/characters/pablo-action.png" alt="Pablo como explorador en pose de acción" />
        <div className="right-shade" />
        <Back onClick={() => go("menu")} />
        <div className="about-copy"><span className="screen-label">PERFIL / PLAYER 01</span><h1>QUIÉN SOY</h1><p>Soy Pablo Fonteñez, diseñador gráfico con más de 15 años de experiencia. Trabajé en identidad visual, comunicación institucional y diseño de piezas para distintos medios, buscando siempre que cada proyecto sea claro, atractivo y funcional.</p><p>Durante el último año amplié mi trabajo hacia la comunicación digital y audiovisual: contenido para redes, campañas, presentaciones, páginas web, reels y videos institucionales. Me gusta involucrarme en todo el proceso, desde la idea y la organización del contenido hasta el diseño, la edición y su adaptación a cada formato.</p><p>Hoy mi perfil combina diseño gráfico, contenido digital, edición audiovisual, desarrollo web e inteligencia artificial para conectar la idea, la imagen, el movimiento y la experiencia final.</p><button className="about-skills-link" onClick={() => go("skills")}>INVENTARIO DE HABILIDADES <span>→</span></button></div>
        <div className="contact-chips"><a href="mailto:pabloezequielfontenez@gmail.com">pabloezequielfontenez@gmail.com</a><a href="https://www.linkedin.com/in/pfontenez/" target="_blank">linkedin.com/in/pfontenez/</a><a href="https://wa.me/541134145166?text=Hola%20Pablo%2C%20vi%20tu%20portfolio%20y%20quer%C3%ADa%20contactarte." target="_blank">WhatsApp · 11 3414-5166</a></div>
      </section>}

      {screen === "skills" && (
  <section className="scene skills-scene">
    <img
      className="scene-bg skills-bg"
      src="/backgrounds/stadium.webp"
      alt="Estadio abandonado recuperado por la naturaleza"
    />

    <img
      className="scene-character character-skills"
      src="/characters/pablo-front.png"
      alt="Pablo como explorador de frente"
    />

    <div className="skills-shade" />

    <Back onClick={() => go("about")} label="VOLVER AL PERFIL" />

    <div className="skills-interactive">
      <header className="skills-interactive-header">
        <span className="screen-label">
          INVENTARIO / HABILIDADES
        </span>

        <h1>SKILLS Y MÁS</h1>

        <p>
          Explorá cada categoría para conocer mi experiencia,
          herramientas y forma de trabajo.
        </p>
      </header>
      <div className="skill-panel-column"></div>
      <div
        className={`skill-detail-panel ${
          activeSkillSection ? "is-open" : ""
        }`}
      >
  
        {!activeSkillSection && (
          <div className="skill-detail-empty">
            <span>ARCHIVO DISPONIBLE</span>
            <h2>SELECCIONÁ UNA CATEGORÍA</h2>
            <p>
              Pasá el puntero por cada porción y hacé clic para
              desplegar su contenido.
            </p>
          </div>
        )}

        {activeSkillSection === "activities" && (
          <div className="skill-detail-content">
            <span className="skill-detail-number">01</span>
            <h2>ACTIVIDADES FRECUENTES</h2>

            <ul>
              <li>Contenido para redes sociales</li>
              <li>Edición de reels y videos institucionales</li>
              <li>Presentaciones corporativas</li>
              <li>Diseño y revisión de páginas web</li>
              <li>Desarrollo visual con inteligencia artificial</li>
            </ul>
          </div>
        )}

        {activeSkillSection === "abilities" && (
          <div className="skill-detail-content">
            <span className="skill-detail-number">02</span>
            <h2>HABILIDADES</h2>

            <ul>
              <li>Atención al detalle</li>
              <li>Organización y gestión del tiempo</li>
              <li>Creatividad y criterio visual</li>
              <li>Comunicación y trabajo en equipo</li>
              <li>
                Manejo de inteligencia artificial
                <small>
                  Creación visual, prompts y optimización de contenidos.
                </small>
              </li>
            </ul>
          </div>
        )}

        {activeSkillSection === "education" && (
          <div className="skill-detail-content">
            <span className="skill-detail-number">03</span>
            <h2>EDUCACIÓN</h2>

            <div className="skill-detail-items">
              <article>
                <b>AFTER EFFECTS Y PREMIERE</b>
                <span>En curso.</span>
              </article>

              <article>
                <b>DISEÑO UX/UI</b>
                <span>
                  Research, diseño y prototipado basado en MVP.
                  Metodologías ágiles, Optimal Workshop, Useberry y Figma.
                </span>
              </article>

              <article>
                <b>DISEÑO UX/UI AVANZADO</b>
                <span>
                  Análisis de tendencias, Lean UX Canvas, pain points,
                  tree testing, UX Writing y Motion.
                </span>
              </article>
            </div>
          </div>
        )}

        {activeSkillSection === "experience" && (
          <div className="skill-detail-content">
            <span className="skill-detail-number">04</span>
            <h2>EXPERIENCIA</h2>

            <div className="skill-detail-timeline">
              <article>
                <span>2025 — ACTUALIDAD</span>
                <b>SIEMPRE ARG</b>
                <small>DISEÑADOR GRÁFICO Y DIGITAL</small>
              </article>

              <article>
                <span>JULIO 2021 — FEBRERO 2025</span>
                <b>KRAB-E</b>
                <small>DISEÑADOR GRÁFICO</small>
              </article>

              <article>
                <span>FEBRERO 2020 — JULIO 2021</span>
                <b>SEARCH</b>
                <small>DISEÑADOR GRÁFICO</small>
              </article>

              <article>
                <span>MAYO 2014 — AGOSTO 2017</span>
                <b>ESTUDIO 33</b>
                <small>DISEÑADOR GRÁFICO FREELANCE</small>
              </article>
            </div>
          </div>
        )}

        {activeSkillSection === "software" && (
          <div className="skill-detail-content">
            <span className="skill-detail-number">05</span>
            <h2>SOFTWARE SKILLS</h2>

            <div className="skill-software-list">
              {[
                ["photoshop", "PHOTOSHOP", "Diseño y edición de imágenes"],
                ["illustrator", "ILLUSTRATOR", "Diseño vectorial y maquetación"],
                ["figma", "FIGMA", "Interfaces y prototipado"],
                ["premiere", "PREMIERE PRO", "Edición y montaje de video"],
                ["aftereffects", "AFTER EFFECTS", "Motion y animación"],
              ].map(([software, name, detail]) => (
                <div className="skill-software-item" key={name}>
                  <span className="skill-software-icon">
                    <SoftwareIcon software={software} />
                  </span>

                  <div>
                    <b>{name}</b>
                    <small>{detail}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      

    {activeSkillSection && (
  <div className="skill-panel-hud">
    <div className="skill-panel-status">
      <span>
        <i />
        PLAYER ONLINE
      </span>

      <b>
        ARCHIVO{" "}
        {String(
          skillSections.findIndex(
            item => item.id === activeSkillSection
          ) + 1
        ).padStart(2, "0")}{" "}
        / 05
      </b>
    </div>

    <div className="skill-panel-energy-label">
      <span>ENERGÍA CREATIVA</span>
      <b>NIVEL 15+</b>
    </div>

    <div className="skill-panel-energy">
      {Array.from({ length: 12 }).map((_, index) => (
        <i key={index} />
      ))}
    </div>
  </div>
  )}
</div>

      <div className="skill-wheel-area">
        <div className="skill-wheel">
  <svg
    className="skill-wheel-svg"
    viewBox="0 0 400 400"
    aria-label="Categorías de habilidades"
  >
    {skillSections.map((item, index) => {
      const iconPosition = getSkillIconPosition(index);

      return (
        <g
          key={item.id}
          role="button"
          tabIndex={0}
          className={`skill-wheel-slice ${
            activeSkillSection === item.id ? "is-active" : ""
          }`}
          aria-label={`Abrir ${item.label}`}
          aria-expanded={activeSkillSection === item.id}
          onMouseEnter={() => setHoveredSkillSection(item.id)}
          onMouseLeave={() => setHoveredSkillSection(null)}
          onFocus={() => setHoveredSkillSection(item.id)}
          onBlur={() => setHoveredSkillSection(null)}
          onClick={() =>
            setActiveSkillSection(current =>
              current === item.id ? null : item.id
            )
          }
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();

              setActiveSkillSection(current =>
                current === item.id ? null : item.id
              );
            }
          }}
        >
          <path
            className="skill-wheel-slice-shape"
            d={getSkillSegmentPath(index)}
          />

          <g
            className="skill-wheel-slice-icon"
            transform={`translate(
              ${iconPosition.x - 12}
              ${iconPosition.y - 12}
            )`}
          >
            <SkillCategoryIcon type={item.id} />
          </g>

          <text
            className="skill-wheel-slice-number"
            x={iconPosition.x}
            y={iconPosition.y + 35}
            textAnchor="middle"
          >
            {String(index + 1).padStart(2, "0")}
          </text>
        </g>
      );
    })}

    <circle
      className="skill-wheel-center"
      cx="200"
      cy="200"
      r="69"
    />

    <text
      className="skill-wheel-center-small"
      x="200"
      y="187"
      textAnchor="middle"
    >
      {hoveredSkillSection || activeSkillSection
        ? "CATEGORÍA"
        : "INVENTARIO"}
    </text>

    <text
      className="skill-wheel-center-title"
      x="200"
      y="211"
      textAnchor="middle"
    >
      {skillSections
        .find(
          item =>
            item.id ===
            (hoveredSkillSection || activeSkillSection)
        )
        ?.label.split(" ")[0] || "SKILLS"}
    </text>
  </svg>
</div>

        <p className="skill-wheel-help">
          PASÁ EL PUNTERO PARA EXPLORAR · HACÉ CLIC PARA DESPLEGAR
        </p>
      </div>
    </div>
  </section>
)}

      {screen === "web" && <section className="scene web-scene">
        <img className="scene-bg web-bg" src="/backgrounds/horse-statue.webp" alt="Estatua ecuestre en una ciudad recuperada por la naturaleza" />
        <div className="web-shade" />
        <img className="scene-character character-web" src="/characters/pablo-web.png" alt="Pablo como explorador frente a sus proyectos web" />
        <Back onClick={() => go("menu")} />
        <div className="web-header"><span className="screen-label">ARCHIVO / DESARROLLO WEB</span><h1>DISEÑO WEB</h1><p>Proyectos diseñados y desarrollados para experiencias digitales.</p></div>
        <div className="web-projects">
          {[{name:"SIEMPRE ARGENTINA",preview:"/projects/diseno-web/siempre-argentina.png",url:"https://pfontenez.github.io/siemprearg-nuevo-FINAL-responsive/"},{name:"INVITACIÓN FRANCHESCA",preview:"/projects/diseno-web/invitacion-franchesca.png",url:"https://pfontenez.github.io/invitacion-franchesca/"}].map((project,index) => <button key={project.name} className={`web-project ${!access ? "is-locked" : project.url ? "is-ready" : "is-pending"}`} onClick={() => !access ? setAccessOpen(true) : project.url ? window.open(project.url,"_blank","noopener,noreferrer") : undefined}>
            {project.preview && <img className="web-project-preview" src={project.preview} alt="Vista previa del sitio web de Siempre Argentina" />}
            <span className="web-project-number">0{index + 1}</span><div><small>PROYECTO WEB</small><h2>{access ? project.name : `PROYECTO 0${index + 1}`}</h2><p>{!access ? "CONTENIDO PROTEGIDO" : project.url ? "ABRIR SITIO WEB" : "ENLACE DE GITHUB PENDIENTE"}</p></div><b>{!access ? "NIVEL 2 · INGRESAR CÓDIGO" : project.url ? "EXPLORAR ↗" : "PRÓXIMAMENTE"}</b>
          </button>)}
        </div>
      </section>}
      {screen === "video" && (
  <section className="scene video-scene">
    <img
      className="scene-bg video-bg"
      src="/backgrounds/city.webp"
      alt="Ciudad recuperada por la naturaleza"
    />

    <div className="video-shade" />
    <img
  className="scene-character character-video"
  src="/characters/pablo-action.png"
  alt="Pablo como explorador en pose de acción"
/>

    <Back onClick={() => go("menu")} />

    <div className="video-header">
      <span className="screen-label">
        ARCHIVO / PRODUCCIÓN AUDIOVISUAL
      </span>

      <h1>EDICIÓN DE VIDEO</h1>

      <p>
        REELS, CONTENIDO AUDIOVISUAL Y VIDEOS INSTITUCIONALES.
      </p>
    </div>

    <div className="video-access">
      <button
        className={`video-project ${!access ? "is-locked" : "is-ready"}`}
        onClick={() =>
          !access
            ? setAccessOpen(true)
            : window.open(
                "https://drive.google.com/drive/folders/1w3rxTDIOF-Yw63aZfFSN8ZhXt0Yy8NC8",
                "_blank",
                "noopener,noreferrer"
              )
        }
      >

      <img
  className="video-project-preview"
  src="/projects/edicion-video.png"
  alt="Vista previa de los trabajos de edición de video"
/>
        <span className="video-project-number">01</span>

        <div>
          <small>ARCHIVO AUDIOVISUAL</small>

          <h2>
            {access ? "SELECCIÓN DE VIDEOS" : "CONTENIDO PROTEGIDO"}
          </h2>

          <p>
            {access
              ? "ABRIR CARPETA DE GOOGLE DRIVE"
              : "SE REQUIERE ACCESO NIVEL 2"}
          </p>
        </div>

        <b>
          {access ? "VER VIDEOS ↗" : "NIVEL 2 · INGRESAR CÓDIGO"}
        </b>
      </button>
    </div>
  </section>
)}

      {screen === "gallery" && <section className="scene gallery-scene">
        <img className="scene-bg gallery-bg" src="/backgrounds/city.webp" alt="Ciudad abandonada recuperada por la naturaleza" /><img className={`scene-character character-gallery ${galleryCharacter.className}`} src={galleryCharacter.src} alt={galleryCharacter.alt} /><div className="gallery-shade" />
        <Back onClick={() => go("menu")} />
        <div className="gallery-header"><span className="screen-label">ARCHIVO DE TRABAJOS</span><h1>{gallery}</h1><p>Selección de proyectos y piezas desarrolladas para distintas marcas.</p></div>
        <div className={`gallery-track gallery-count-${galleryAssets[gallery].length}`}>{galleryAssets[gallery].map((src,index) => <button key={`${src}-${index}`} className={`work-card ${!access ? "is-locked" : ""}`} onClick={() => !access ? setAccessOpen(true) : index < galleryProjects.length ? openProject(index) : undefined}><img src={src} alt={`${gallery} — proyecto ${index + 1}`} /><span>{access && index < galleryProjects.length ? galleryProjects[index].name : `PROYECTO ${String(index+1).padStart(2,"0")}`}</span>{!access && <b className="locked">NIVEL 2 · INGRESAR CÓDIGO</b>}</button>)}</div>
        <div className="gallery-counter">01 <span>/</span> {String(galleryAssets[gallery].length).padStart(2,"0")}</div>
      </section>}

      {screen === "project" && <section className="scene project-scene">
        <img className="scene-bg project-bg" src="/backgrounds/city.webp" alt="" />
        <div className="project-shade" />
        <Back onClick={() => go("gallery")} label={gallery === "Redes sociales" ? "VOLVER A REDES SOCIALES" : gallery === "Branding e identidad visual" ? "VOLVER A BRANDING" : gallery === "Banners web" ? "VOLVER A BANNERS WEB" : "VOLVER A INTELIGENCIA ARTIFICIAL"} />
        <div className="project-info">
          <span className="screen-label">ARCHIVO DESBLOQUEADO / CLIENTE {String(selectedProject + 1).padStart(2,"0")}</span>
          {currentProject.logo ? <img className="project-logo" src={currentProject.logo} alt={currentProject.name} /> : <h2 className="project-title">{currentProject.name}</h2>}
          <p>{currentProject.description}</p>
          <dl><div><dt>SECTOR</dt><dd>{currentProject.sector}</dd></div><div><dt>AGENCIA</dt><dd>{currentProject.agency}</dd></div><div><dt>AÑO</dt><dd>{currentProject.year}</dd></div></dl>
          {galleryProjects.length > 1 && <div className="project-switcher">
            <button className="project-switch" onClick={() => switchProject((selectedProject + galleryProjects.length - 1) % galleryProjects.length)}>← ANTERIOR</button>
            <button className="project-switch" onClick={() => switchProject((selectedProject + 1) % galleryProjects.length)}>SIGUIENTE →</button>
          </div>}
        </div>
        <div className="project-viewer">
          {slideTotal > 1 ? <button className="project-arrow previous" onClick={() => setProjectSlide(value => (value + slideTotal - 1) % slideTotal)} aria-label="Imagen anterior">←</button> : <span />}
          <button className="project-image-button" onClick={() => setLightboxOpen(true)} aria-label="Ampliar imagen">
            <img src={currentProject.images[projectSlide]} alt={`Trabajos para ${currentProject.name} — lámina ${projectSlide + 1}`} />
            <span>AMPLIAR IMAGEN</span>
          </button>
          {slideTotal > 1 ? <button className="project-arrow next" onClick={() => setProjectSlide(value => (value + 1) % slideTotal)} aria-label="Imagen siguiente">→</button> : <span />}
          <div className="project-pagination">{currentProject.images.map((_,index) => <button key={index} className={index === projectSlide ? "active" : ""} onClick={() => setProjectSlide(index)} aria-label={`Ver lámina ${index + 1}`}>{String(index + 1).padStart(2,"0")}</button>)}</div>
          <div className="project-count">{String(projectSlide + 1).padStart(2,"0")} <span>/</span> {String(slideTotal).padStart(2,"0")}</div>
        </div>
        {lightboxOpen && <div className="project-lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Cerrar imagen">×</button>
          <img onClick={e => e.stopPropagation()} src={currentProject.images[projectSlide]} alt={`Trabajos para ${currentProject.name} — lámina ${projectSlide + 1} ampliada`} />
        </div>}
      </section>}

      {screen === "contact" && (
  <section className="scene contact-scene">
    <img
      className="scene-bg contact-bg"
      src="/backgrounds/contact-workspace.png"
      alt="Mesa de trabajo de diseño gráfico abandonada y recuperada por la naturaleza"
    />

    <div className="contact-shade" />

    <Back onClick={() => go("menu")} />

    <img
      className="thanks-logo"
      src="/brand/logo-pablo-horizontal.png"
      alt="Pablo Fonteñez — Diseñador gráfico"
    />

    <div className="contact-box">
      <span className="screen-label">FIN DE LA MISIÓN</span>

      <h1>MUCHAS GRACIAS</h1>

      <a href="mailto:pabloezequielfontenez@gmail.com">
        <small>CORREO</small>
        pabloezequielfontenez@gmail.com
      </a>

      <a
        href="https://www.linkedin.com/in/pfontenez/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>LINKEDIN</small>
        linkedin.com/in/pfontenez/
      </a>

     <a
      href={contactWhatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <small>WHATSAPP</small>
      11 3414-5166
    </a>
    </div>
  </section>
)}

      {accessOpen && <div className="access-overlay" onMouseDown={() => 
        setAccessOpen(false)}><div className="access-dialog" onMouseDown={e=>e.stopPropagation()}><button className="x" 
        onClick={() => setAccessOpen(false)}>×</button><span className="screen-label">ACCESS RESTRICTED</span>
        <h2>SE REQUIERE<br/>ACCESO NIVEL 2</h2><p>Ingresá la clave compartida para desbloquear los proyectos de clientes.</p>
        <form ref={accessForm} onSubmit={unlock}><input name="key" autoFocus placeholder="CLAVE DE ACCESO"/><button type="submit">
          DESBLOQUEAR</button></form>{accessError && <small>
          Clave incorrecta. Verificá los datos o solicitá acceso.</small>}<div className="access-request">
  <span>SOLICITAR CREDENCIAL</span>

  <div className="access-request-actions">
    <a
      href={whatsappAccessUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      WHATSAPP
    </a>

    <a href={emailAccessUrl}>
      CORREO
    </a>
  </div>
</div><i>SECURITY CLEARANCE · LEVEL 02</i></div></div>}
    </main>
  );
}

function Back({onClick,label="VOLVER AL MENÚ"}:{onClick:()=>void;label?:string}) { return <button className="back" onClick={onClick}><span>←</span>{label}</button>; }
