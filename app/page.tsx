"use client";

import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

type Screen = "start" | "menu" | "about" | "skills" | "gallery" | "project" | "web" | "web-case" | "oc-case" | "video" | "contact";
type Gallery = "Redes sociales" | "Branding e identidad visual" | "Banners web" | "Inteligencia artificial";
type SkillSection =
  | "activities"
  | "abilities"
  | "education"
  | "experience"
  | "software";
type WebCaseSection =
  | "context"
  | "problem"
  | "objectives"
  | "architecture"
  | "uxui"
  | "development"
  | "responsive"
  | "result";  
type OcCaseSection =
  | "context"
  | "problem"
  | "research"
  | "users"
  | "architecture"
  | "wireframes"
  | "ui"
  | "prototype"
  | "result";  

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
  { label: "Diseño web y UX/UI", screen: "web" },
  { label: "Inteligencia artificial", screen: "gallery", gallery: "Inteligencia artificial" },
];

const galleryAssets: Record<Gallery, string[]> = {
  "Redes sociales": ["/projects/electronics-mexico/redes-01.png", "/projects/chili-beans-mexico/redes-01.png", "/projects/mark-sports/redes-01.png"],
  "Branding e identidad visual": [
  "/projects/general-water-company/branding-01.png",
  "/projects/manual-identidad-siempre-2026.png",
],
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
    description:
      "GWC Store es una empresa internacional especializada en el desarrollo de tecnologías para el tratamiento del agua. En su e-commerce ofrece una amplia gama de productos, incluyendo dispensadores, filtros, ablandadores y más.",
    sector: "AGUA",
    agency: "KRAB-E",
    year: "2023",
    images: [
      "/projects/general-water-company/branding-01.png",
      "/projects/general-water-company/branding-02.png",
    ],
  },

  {
    name: "SIEMPRE — IDENTIDAD VISUAL",
    logo: "/projects/manual-identidad-siempre-2026.png",
    description:
      "Desarrollo del Manual de Identidad Visual Corporativa 2026 de Siempre Salud y Bienestar. Un sistema creado para organizar, unificar y fortalecer la aplicación de la marca en sus diferentes canales de comunicación.",
    sector: "SALUD Y BIENESTAR",
    agency: "SIEMPRE",
    year: "2026",
    images: ["/projects/manual-identidad-siempre-2026.png"],
    externalUrl:
      "https://drive.google.com/file/d/1NMLCMhBJV9bfHcWP5O9BcYy5AfeygSAF/view?usp=drive_link",
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
  const [activeWebCaseSection, setActiveWebCaseSection] =
  useState<WebCaseSection>("context");
  const [activeOcCaseSection, setActiveOcCaseSection] =
  useState<OcCaseSection>("context");
  const [expandedCaseImage, setExpandedCaseImage] =
  useState<string | null>(null);
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

  const jobContactMessage =
  "Hola Pablo, vi tu portfolio y me gustaría conversar con vos sobre una oportunidad laboral. La empresa es..., el puesto es... y la modalidad es...";

const jobContactWhatsappUrl =
  `https://wa.me/5491134145166?text=${encodeURIComponent(
    jobContactMessage
  )}`;

const projectContactMessage =
  "Hola Pablo, vi tu portfolio y quisiera consultarte por un proyecto. Necesitamos..., la fecha estimada es... y el proyecto consiste en...";

const projectContactWhatsappUrl =
  `https://wa.me/5491134145166?text=${encodeURIComponent(
    projectContactMessage
  )}`;


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
  function openProject(index: number) {
  const externalUrl =
    gallery === "Branding e identidad visual"
      ? brandingProjects[index]?.externalUrl
      : undefined;

  if (externalUrl) {
    window.open(
      externalUrl,
      "_blank",
      "noopener,noreferrer"
    );

    return;
  }

  setSelectedProject(index);
  setProjectSlide(0);
  go("project");
}
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
        <div className="about-actions">
  <button
    className="about-contact-link"
    onClick={() => go("contact")}
  >
    INICIAR CONTACTO
    <span>→</span>
  </button>

  <a
    className="about-cv-link"
    href="https://drive.google.com/file/d/1wm_KYLpuxhmEhxwrfec-6hTzzZsRfpld/view?usp=drive_link"
    target="_blank"
    rel="noopener noreferrer"
  >
    VER / DESCARGAR CV
    <span>↓</span>
  </a>
</div>
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
<div className="web-header">
  <span className="screen-label">
    ARCHIVO / PRODUCTOS DIGITALES
  </span>

  <h1>DISEÑO WEB Y UX/UI</h1>

  <p>
    Sitios, aplicaciones y casos de estudio desarrollados
    desde la estrategia hasta la experiencia final.
  </p>
</div>        
<div className="web-projects">
          {[
  {
    name: "SIEMPRE ARGENTINA",
    preview: "/projects/diseno-web/siempre-argentina.png",
    url: "https://pfontenez.github.io/siemprearg-nuevo-FINAL-responsive/",
  },
  {
    name: "OBJETIVOS CLAROS",
    preview: "/projects/ux-ui/objetivos-claros/01-portada-objetivos-claros.png",
    url: "",
  },
  {
    name: "INVITACIÓN FRANCHESCA",
    preview: "/projects/diseno-web/invitacion-franchesca.png",
    url: "https://pfontenez.github.io/invitacion-franchesca/",
  },
].map((project,index) => <button
  key={project.name}
  className={`web-project ${
    !access ? "is-locked" : "is-ready"
  }`}
 onClick={() =>
  !access
    ? setAccessOpen(true)
    : index === 0
      ? go("web-case")
      : index === 1
        ? go("oc-case")
        : window.open(
            project.url,
            "_blank",
            "noopener,noreferrer"
          )
}
>
           {project.preview && (
  <img
    className="web-project-preview"
    src={project.preview}
    alt={`Vista previa de ${project.name}`}
  />
)}

<span className="web-project-number">
  0{index + 1}
</span>

<div>
  <small>
    {index === 1 ? "CASO UX/UI" : "PROYECTO WEB"}
  </small>

  <h2>
    {access
      ? project.name
      : `PROYECTO 0${index + 1}`}
  </h2>

  <p>
    {!access
      ? "CONTENIDO PROTEGIDO"
      : index === 0
        ? "VER CASO DE ESTUDIO"
        : index === 1
          ? "EXPLORAR PROCESO UX/UI"
          : "ABRIR SITIO WEB"}
  </p>
</div>

<b>
  {!access
    ? "NIVEL 2 · INGRESAR CÓDIGO"
    : "EXPLORAR ↗"}
</b>
</button>
)}
        </div>
      </section>}

      {screen === "oc-case" && (
  <section className="scene web-case-scene oc-case-scene">
    <img
      className="scene-bg web-bg"
      src="/backgrounds/horse-statue.webp"
      alt="Caso de estudio de la aplicación Objetivos Claros"
    />

    <div className="web-shade" />

    <Back
      onClick={() => go("web")}
      label="VOLVER A PROYECTOS"
    />

    <div className="web-header">
      <span className="screen-label">
        ARCHIVO DE PROYECTO / DISEÑO UX/UI
      </span>

      <h1>OBJETIVOS CLAROS</h1>

      <p>
        Investigación, diseño y prototipo de una aplicación móvil
        orientada al entrenamiento y al cumplimiento de objetivos.
      </p>
    </div>
    <div className="web-case-layout">
  <aside className="web-case-sidebar">
    <div className="web-case-meta">
      <span>DATOS DEL PROYECTO</span>

      <dl>
        <div>
          <dt>ROL</dt>
          <dd>DISEÑADOR UX/UI</dd>
        </div>

        <div>
          <dt>PRODUCTO</dt>
          <dd>APLICACIÓN MÓVIL</dd>
        </div>

        <div>
          <dt>PLATAFORMA</dt>
          <dd>ANDROID</dd>
        </div>

        <div>
          <dt>ALCANCE</dt>
          <dd>UX · UI · PROTOTIPO</dd>
        </div>

        <div>
          <dt>HERRAMIENTAS</dt>
          <dd>FIGMA · PHOTOSHOP</dd>
        </div>

        <div>
            <dt>TIPO</dt>
            <dd>PROYECTO ACADÉMICO</dd>
          </div>

          <div>
            <dt>FORMACIÓN</dt>
            <dd>CODERHOUSE</dd>
          </div>

          <div>
            <dt>AÑO</dt>
            <dd>2022</dd>
          </div>
      </dl>
    </div>

    <nav
      className="web-case-navigation"
      aria-label="Secciones del caso Objetivos Claros"
    >
      {([
        { id: "context", label: "CONTEXTO" },
        { id: "problem", label: "PROBLEMA" },
        { id: "research", label: "INVESTIGACIÓN" },
        { id: "users", label: "USUARIOS" },
        { id: "architecture", label: "ARQUITECTURA" },
        { id: "wireframes", label: "WIREFRAMES" },
        { id: "ui", label: "DISEÑO UI" },
        { id: "prototype", label: "PROTOTIPO" },
        { id: "result", label: "RESULTADO" },
      ] as const).map((section, index) => (
        <button
          key={section.id}
          className={
            activeOcCaseSection === section.id
              ? "is-active"
              : ""
          }
          onClick={() =>
            setActiveOcCaseSection(section.id)
          }
        >
          <span>
            {String(index + 1).padStart(2, "0")}
          </span>

          <b>{section.label}</b>
        </button>
      ))}
    </nav>
  </aside>

  <div className="web-case-panel">
    <div className="web-case-panel-header">
      <span>EXPEDIENTE DE PRODUCTO</span>

      <a
        href="https://www.behance.net/gallery/144965909/UX-UI-App-OC"
        target="_blank"
        rel="noopener noreferrer"
        className="web-case-live-link"
      >
        VER PROYECTO ORIGINAL <b>↗</b>
      </a>
    </div>

    {activeOcCaseSection === "context" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 01 / 09
    </span>

    <h2>CONTEXTO</h2>

    <p className="web-case-lead">
      Objetivos Claros fue desarrollado como proyecto final de
      formación UX/UI en Coderhouse, abordando el proceso de diseño
      de producto desde la investigación hasta el prototipo funcional.
    </p>

    <p>
      La propuesta consistió en diseñar una herramienta integral de
      entrenamiento cuyo diferencial principal fuera reunir distintos
      tipos de cronómetros configurables dentro de una sola aplicación.
      Esto permitiría adaptar la experiencia a diferentes sistemas y
      modalidades de entrenamiento, especialmente vinculadas al CrossFit.
    </p>

    <p>
      La aplicación también incorporaría rutinas preestablecidas,
      precalentamientos, WODs, una guía visual de movimientos, seguimiento
      del progreso semanal y la posibilidad de trabajar con un entrenador
      online mediante rutinas personalizadas y comunicación por chat.
    </p>

    <p>
      El proceso incluyó investigación, definición de usuarios,
      análisis de productos similares, arquitectura de información,
      recorridos de navegación, wireframes, pruebas de usabilidad,
      iteraciones de diseño y construcción de la interfaz final.
    </p>

    <div className="web-case-tech">
      <span>CRONÓMETROS CONFIGURABLES</span>
      <span>RUTINAS Y WODS</span>
      <span>GUÍA DE MOVIMIENTOS</span>
      <span>PROGRESO SEMANAL</span>
      <span>ENTRENADOR ONLINE</span>
      <span>CHAT PERSONALIZADO</span>
    </div>
  </article>
)}
{activeOcCaseSection === "problem" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 02 / 09
    </span>

    <h2>PROBLEMA</h2>

    <p className="web-case-lead">
      Las personas que realizan entrenamientos funcionales suelen
      depender de diferentes herramientas para cronometrar ejercicios,
      consultar rutinas, revisar movimientos y registrar su progreso.
    </p>

    <p>
      Esta fragmentación obliga a cambiar constantemente entre
      aplicaciones, anotaciones y canales de comunicación, interrumpiendo
      el entrenamiento y dificultando la construcción de una experiencia
      organizada y consistente.
    </p>

    <p>
      Para quienes recién comienzan, además, los nombres de los ejercicios,
      la estructura de los WODs y los distintos formatos de cronómetro
      pueden resultar difíciles de comprender sin una guía accesible.
    </p>

    <div className="web-case-conclusion">
      <strong>DESAFÍO DE DISEÑO</strong>

      <p>
        Cómo reunir en una sola aplicación las herramientas necesarias
        para planificar, ejecutar y registrar un entrenamiento, permitiendo
        al mismo tiempo recibir acompañamiento profesional personalizado.
      </p>
    </div>
  </article>
)}

{activeOcCaseSection === "research" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 03 / 09
    </span>

    <h2>INVESTIGACIÓN</h2>

    <p className="web-case-lead">
      La investigación se enfocó en comprender cómo entrenan las
      personas, qué herramientas utilizan y cuáles son las principales
      dificultades que aparecen durante la actividad.
    </p>

    <p>
      El análisis permitió ordenar las necesidades del producto,
      identificar distintos perfiles de usuario y reconocer oportunidades
      para integrar cronómetros, rutinas, movimientos y seguimiento dentro
      de una misma experiencia.
    </p>

    <ul className="web-case-list">
      <li>
        Definición de arquetipos y necesidades principales.
      </li>

      <li>
        Construcción de puntos de vista para orientar el diseño.
      </li>

      <li>
        Benchmark de aplicaciones y herramientas de entrenamiento.
      </li>

      <li>
        Identificación de funcionalidades prioritarias.
      </li>

      <li>
        Pruebas de usabilidad e iteraciones sobre la propuesta.
      </li>
    </ul>

    <div className="web-case-tech">
      <span>ARQUETIPOS</span>
      <span>POV</span>
      <span>BENCHMARK</span>
      <span>USABILIDAD</span>
      <span>ITERACIÓN</span>
    </div>
  </article>
)}

{activeOcCaseSection === "users" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 04 / 09
    </span>

    <h2>USUARIOS</h2>

    <p className="web-case-lead">
      La primera etapa del producto fue diseñada exclusivamente para
      personas que entrenan y necesitan organizar su actividad desde
      una única herramienta móvil.
    </p>

    <p>
      El usuario principal puede utilizar distintos cronómetros,
      acceder a rutinas preestablecidas, consultar movimientos y
      registrar su progreso semanal. También puede recibir rutinas y
      comunicarse con un entrenador online desde su propia experiencia.
    </p>

    <div className="web-case-route-grid">
      <article>
        <span>USUARIO PRINCIPAL</span>
        <h3>PERSONA QUE ENTRENA</h3>

        <p>
          Utiliza la aplicación para planificar y ejecutar sus
          entrenamientos, consultar ejercicios y seguir su evolución.
        </p>
      </article>

      <article>
        <span>EXPANSIÓN FUTURA</span>
        <h3>ENTRENADOR ONLINE</h3>

        <p>
          La experiencia específica del entrenador se planteó como una
          segunda aplicación conectada al mismo ecosistema, pero quedó
          fuera del alcance de esta primera etapa.
        </p>
      </article>
    </div>

    <blockquote className="web-case-conclusion">
      Un mismo ecosistema con dos experiencias diferenciadas:
      una para quien entrena y otra, proyectada a futuro, para quien
      acompaña y diseña las rutinas.
    </blockquote>
  </article>
)}

{activeOcCaseSection === "architecture" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 05 / 09
    </span>

    <h2>ARQUITECTURA</h2>

    <p className="web-case-lead">
      La arquitectura se organizó alrededor de las acciones necesarias
      antes, durante y después de cada entrenamiento.
    </p>

    <p>
      Las funcionalidades fueron agrupadas para que el usuario pudiera
      acceder rápidamente a los cronómetros, comenzar una rutina,
      consultar un movimiento o revisar su progreso sin abandonar la
      experiencia principal.
    </p>

    <ul className="web-case-list">
      <li>
        Inicio y acceso a las funciones principales.
      </li>

      <li>
        Selección y configuración de cronómetros.
      </li>

      <li>
        Rutinas, precalentamientos y WODs preestablecidos.
      </li>

      <li>
        Diccionario y guía visual de movimientos.
      </li>

      <li>
        Registro y visualización del progreso semanal.
      </li>

      <li>
        Comunicación y seguimiento con un entrenador online.
      </li>
    </ul>

    <figure className="web-case-responsive-visual">
      <button
  type="button"
  className="web-case-image-button"
  onClick={() =>
    setExpandedCaseImage(
      "/projects/ux-ui/objetivos-claros/04-flujo-prototipo.png"
    )
  }
  aria-label="Ampliar flujo del prototipo"
>
  <img
    src="/projects/ux-ui/objetivos-claros/04-flujo-prototipo.png"
    alt="Flujo de navegación del prototipo de Objetivos Claros"
  />

  <span>AMPLIAR ↗</span>
</button>

      <figcaption>
        Mapa del prototipo funcional y conexiones entre pantallas.
      </figcaption>
    </figure>
  </article>
)}

{activeOcCaseSection === "wireframes" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 06 / 09
    </span>

    <h2>WIREFRAMES</h2>

    <p className="web-case-lead">
      Los wireframes permitieron definir la estructura de las pantallas
      y validar los recorridos principales antes de avanzar con la
      identidad visual.
    </p>

    <p>
      En esta etapa se priorizaron la jerarquía de la información,
      la ubicación de los controles y la comprensión de las acciones.
      Las pantallas fueron evolucionando a partir de las pruebas de
      usabilidad y de los problemas detectados durante las iteraciones.
    </p>

    <ul className="web-case-list">
      <li>
        Acceso rápido a las funciones principales.
      </li>

      <li>
        Configuración comprensible de los cronómetros.
      </li>

      <li>
        Navegación directa entre rutinas y movimientos.
      </li>

      <li>
        Jerarquización de instrucciones durante el entrenamiento.
      </li>

      <li>
        Visualización sencilla del progreso semanal.
      </li>
    </ul>

    <figure className="web-case-responsive-visual">
      <button
  type="button"
  className="web-case-image-button"
  onClick={() =>
    setExpandedCaseImage(
      "/projects/ux-ui/objetivos-claros/05-wireframes.png"
    )
  }
  aria-label="Ampliar wireframes de Objetivos Claros"
>
  <img
    src="/projects/ux-ui/objetivos-claros/05-wireframes.png"
    alt="Wireframes de la aplicación Objetivos Claros"
  />

  <span>AMPLIAR ↗</span>
</button>

      <figcaption>
        Exploración y evolución de las pantallas antes del diseño visual final.
      </figcaption>
    </figure>
  </article>
)}

{activeOcCaseSection === "ui" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 07 / 09
    </span>

    <h2>DISEÑO UI</h2>

    <p className="web-case-lead">
      La identidad visual fue desarrollada para transmitir movimiento,
      energía y claridad, manteniendo una interfaz funcional durante
      situaciones de entrenamiento.
    </p>

    <p>
      El sistema utiliza una paleta de alto contraste, componentes
      reconocibles y jerarquías simples para facilitar la lectura de
      tiempos, rutinas e instrucciones mientras el usuario se encuentra
      en actividad.
    </p>

    <div className="web-case-tech">
      <span>ALTO CONTRASTE</span>
      <span>LECTURA RÁPIDA</span>
      <span>COMPONENTES CONSISTENTES</span>
      <span>IDENTIDAD DEPORTIVA</span>
      <span>DISEÑO MOBILE</span>
    </div>

    <div className="oc-case-brand-grid">
      <figure>
        <button
  type="button"
  className="web-case-image-button"
  onClick={() =>
    setExpandedCaseImage(
      "/projects/ux-ui/objetivos-claros/02-identidad-logo.png"
    )
  }
  aria-label="Ampliar identidad visual de Objetivos Claros"
>
  <img
    src="/projects/ux-ui/objetivos-claros/02-identidad-logo.png"
    alt="Logotipo completo de Objetivos Claros"
  />
  <span>AMPLIAR ↗</span>
</button>

        <figcaption>
          Logotipo principal e identidad de la aplicación.
        </figcaption>
      </figure>

      <figure>
        <button
  type="button"
  className="web-case-image-button"
  onClick={() =>
    setExpandedCaseImage(
      "/projects/ux-ui/objetivos-claros/03-identidad-isotipo.png"
    )
  }
  aria-label="Ampliar isotipo de Objetivos Claros"
>
  <img
    src="/projects/ux-ui/objetivos-claros/03-identidad-isotipo.png"
    alt="Isotipo de la aplicación Objetivos Claros"
  />
  <span>AMPLIAR ↗</span>
</button>

        <figcaption>
          Isotipo preparado para el ícono y sus diferentes aplicaciones.
        </figcaption>
      </figure>
    </div>
  </article>
)}

{activeOcCaseSection === "prototype" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 08 / 09
    </span>

    <h2>PROTOTIPO</h2>

    <p className="web-case-lead">
      El prototipo funcional permitió conectar las pantallas y simular
      los recorridos principales antes de considerar una etapa de
      desarrollo.
    </p>

    <p>
      Se trabajaron las interacciones necesarias para comenzar un
      entrenamiento, configurar los cronómetros, navegar entre rutinas,
      consultar movimientos y acceder al seguimiento del usuario.
    </p>

    <ul className="web-case-list">
      <li>
        Navegación entre las funciones principales.
      </li>

      <li>
        Configuración de distintos tipos de cronómetro.
      </li>

      <li>
        Acceso a rutinas, WODs y guía de movimientos.
      </li>

      <li>
        Visualización del progreso semanal.
      </li>

      <li>
        Simulación de recorridos y validación de interacciones.
      </li>
    </ul>

    <figure className="web-case-responsive-visual">
      <button
  type="button"
  className="web-case-image-button"
  onClick={() =>
    setExpandedCaseImage(
      "/projects/ux-ui/objetivos-claros/01-portada-objetivos-claros.png"
    )
  }
  aria-label="Ampliar presentación del prototipo"
>
  <img
    src="/projects/ux-ui/objetivos-claros/01-portada-objetivos-claros.png"
    alt="Presentación del prototipo de Objetivos Claros"
  />

  <span>AMPLIAR ↗</span>
</button>

      <figcaption>
        Propuesta visual y prototipo mobile de Objetivos Claros.
      </figcaption>
    </figure>

    <a
      className="oc-case-prototype-link"
      href="https://www.figma.com/proto/Uru3E9ek6PnJjYqXLLnwgu/Prototipo-OC-con-sistema-de-grillas-Fonte%C3%B1ez-Pablo?page-id=0%3A1&node-id=338%3A9853&viewport=3397%2C4196%2C0.82&scaling=min-zoom&starting-point-node-id=46%3A5794"
      target="_blank"
      rel="noopener noreferrer"
    >
      EXPLORAR PROTOTIPO FUNCIONAL <b>↗</b>
    </a>
  </article>
)}

{activeOcCaseSection === "result" && (
  <article className="web-case-section">
    <span className="web-case-section-number">
      SECCIÓN 09 / 09
    </span>

    <h2>RESULTADO</h2>

    <p className="web-case-lead">
      El resultado fue un prototipo funcional que integra diferentes
      herramientas de entrenamiento dentro de una experiencia móvil
      consistente y organizada.
    </p>

    <p>
      La propuesta permitió reunir cronómetros configurables, rutinas,
      WODs, movimientos, progreso semanal y acompañamiento online en
      una misma arquitectura de producto.
    </p>

    <ul className="web-case-list">
      <li>
        Definición de una propuesta de valor clara.
      </li>

      <li>
        Organización de funcionalidades dentro de un único producto.
      </li>

      <li>
        Construcción de recorridos y pantallas principales.
      </li>

      <li>
        Iteración del diseño a partir de pruebas de usabilidad.
      </li>

      <li>
        Desarrollo de una identidad y un sistema visual consistente.
      </li>

      <li>
        Prototipo navegable preparado para comunicar el funcionamiento.
      </li>
    </ul>

    <blockquote className="web-case-conclusion">
  De una necesidad cotidiana de entrenamiento a un ecosistema
  digital pensado para acompañar, organizar y medir cada sesión.
</blockquote>
    </article>
  )}
</div>
</div>

{expandedCaseImage && (
  <div
    className="web-case-lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Vista ampliada del proyecto"
    onClick={() => setExpandedCaseImage(null)}
  >
    <button
      type="button"
      className="web-case-lightbox-close"
      onClick={() => setExpandedCaseImage(null)}
      aria-label="Cerrar imagen ampliada"
    >
      ×
    </button>

    <img
      src={expandedCaseImage}
      alt="Vista ampliada del caso de estudio Objetivos Claros"
      onClick={(event) => event.stopPropagation()}
    />
  </div>
)}
</section>
)}

          {screen === "web-case" && (
      <section className="scene web-case-scene">
        <img
          className="scene-bg web-bg"
          src="/backgrounds/horse-statue.webp"
          alt="Caso de estudio Siempre Argentina"
        />

        <div className="web-shade" />

        <Back
          onClick={() => go("web")}
          label="VOLVER A PROYECTOS"
        />

        <div className="web-header">
          <span className="screen-label">
            ARCHIVO DE PROYECTO / PRODUCT DESIGN
          </span>

          <h1>SIEMPRE ARGENTINA</h1>

          <p>
            Rediseño de experiencia digital y desarrollo web a medida.
          </p>
        </div>

        <div className="web-case-layout">
  <aside className="web-case-sidebar">
    <div className="web-case-meta">
      <span>DATOS DEL PROYECTO</span>

      <dl>
        <div>
            <dt>ROL PRINCIPAL</dt>
            <dd>DISEÑADOR MULTIMEDIA</dd>
          </div>

          <div>
            <dt>ÁREA</dt>
            <dd>MARKETING</dd>
          </div>

          <div>
            <dt>APORTE ADICIONAL</dt>
            <dd>UX/UI + DESARROLLO WEB</dd>
          </div>

        <div>
          <dt>ALCANCE</dt>
          <dd>REDISEÑO INTEGRAL</dd>
        </div>

        <div>
          <dt>TECNOLOGÍA</dt>
          <dd>HTML · CSS · JAVASCRIPT</dd>
        </div>

        <div>
          <dt>IMPLEMENTACIÓN</dt>
          <dd>SIN PLANTILLAS</dd>
        </div>
      </dl>
    </div>

    <nav
      className="web-case-navigation"
      aria-label="Secciones del caso de estudio"
    >
      {([
        { id: "context", label: "CONTEXTO" },
        { id: "problem", label: "PROBLEMA" },
        { id: "objectives", label: "OBJETIVOS" },
        { id: "architecture", label: "ARQUITECTURA" },
        { id: "uxui", label: "DECISIONES UX/UI" },
        { id: "development", label: "DESARROLLO" },
        { id: "responsive", label: "RESPONSIVE" },
        { id: "result", label: "RESULTADO" },
      ] as const).map((section, index) => (
        <button
          key={section.id}
          className={
            activeWebCaseSection === section.id
              ? "is-active"
              : ""
          }
          onClick={() =>
            setActiveWebCaseSection(section.id)
          }
        >
          <span>
            {String(index + 1).padStart(2, "0")}
          </span>

          <b>{section.label}</b>
        </button>
      ))}
    </nav>
  </aside>

  <div className="web-case-panel">
  <div className="web-case-panel-top">
    <span>EXPEDIENTE DE PRODUCTO</span>

    <a
      href="https://pfontenez.github.io/siemprearg-nuevo-FINAL-responsive/"
      target="_blank"
      rel="noopener noreferrer"
    >
      VER SITIO EN VIVO
      <b>↗</b>
    </a>
  </div>

  {activeWebCaseSection === "context" && (
    <article className="web-case-section">
      <span className="web-case-section-number">
        SECCIÓN 01 / 08
      </span>

      <h2>CONTEXTO</h2>

      <p className="web-case-lead">
        Siempre Argentina es una empresa de salud y bienestar
        que ofrece servicios para familias, empresas y
        profesionales.
        Mi rol principal dentro de Siempre Argentina se desarrolló 
        en el área de Marketing como diseñador multimedia, combinando 
        diseño gráfico, contenido digital y edición de video. El rediseño 
        del sitio fue un aporte adicional a mis responsabilidades habituales, 
        desde el cual amplié mi participación hacia el análisis UX/UI, la 
        organización de contenidos, el diseño de interfaz y el desarrollo web.

      </p>

      <p>
        El sitio institucional existente estaba desarrollado
        sobre una plantilla de WordPress. La plataforma reunía
        una gran cantidad de servicios, públicos y objetivos de
        contacto dentro de una misma estructura.
      </p>

      <p>
        La nueva propuesta fue diseñada y desarrollada desde
        cero con HTML, CSS y JavaScript, sin utilizar plantillas
        prediseñadas. Esto permitió trabajar la estructura, los
        componentes y el comportamiento responsive en función
        de las necesidades reales del proyecto.
      </p>

     <div className="web-case-visual-comparison">
  <figure>
    <div className="web-case-image-heading">
      <span>ANTES</span>
      <b>SITIO INSTITUCIONAL EXISTENTE</b>
    </div>

    <button
      type="button"
      className="web-case-image-button"
      onClick={() =>
        setExpandedCaseImage(
          "/projects/diseno-web/siempre-case-study/01-sitio-anterior-wordpress.png"
        )
      }
      aria-label="Ampliar captura del sitio anterior"
    >
      <img
        src="/projects/diseno-web/siempre-case-study/01-sitio-anterior-wordpress.png"
        alt="Sitio anterior de Siempre Argentina desarrollado en WordPress"
      />
      <span>AMPLIAR ↗</span>
    </button>

    <figcaption>
      Estructura basada en una plantilla de WordPress.
    </figcaption>
  </figure>

  <figure>
    <div className="web-case-image-heading">
      <span>DESPUÉS</span>
      <b>PROPUESTA DESARROLLADA A MEDIDA</b>
    </div>

    <button
      type="button"
      className="web-case-image-button"
      onClick={() =>
        setExpandedCaseImage(
          "/projects/diseno-web/siempre-case-study/02-propuesta-nueva-desktop.png"
        )
      }
      aria-label="Ampliar captura de la nueva propuesta"
    >
      <img
        src="/projects/diseno-web/siempre-case-study/02-propuesta-nueva-desktop.png"
        alt="Nueva propuesta del sitio de Siempre Argentina"
      />
      <span>AMPLIAR ↗</span>
    </button>

    <figcaption>
      Nueva arquitectura, interfaz y desarrollo en HTML,
      CSS y JavaScript.
    </figcaption>
  </figure>
</div>
    </article>
  )}

  {activeWebCaseSection === "problem" && (
    <article className="web-case-section">
      <span className="web-case-section-number">
        SECCIÓN 02 / 08
      </span>

      <h2>PROBLEMA</h2>

      <p className="web-case-lead">
        El desafío principal no era solamente visual: había
        que organizar una experiencia con múltiples públicos,
        servicios y recorridos.
      </p>

      <ul className="web-case-list">
        <li>
          Familias y empresas ingresaban con necesidades
          diferentes, pero compartían recorridos similares.
        </li>

        <li>
          La cantidad de categorías y subcategorías dificultaba
          encontrar rápidamente la información.
        </li>

        <li>
          Se repetían llamados a la acción genéricos como
          “Conocé más” y “Ver más”.
        </li>

        <li>
          La página de inicio concentraba demasiada información
          y niveles de lectura.
        </li>

        <li>
          La estructura de la plantilla condicionaba la
          adaptación de contenidos y componentes.
        </li>

        <li>
          La experiencia mobile necesitaba una reorganización
          específica y no una simple reducción del escritorio.
        </li>
      </ul>
    </article>
  )}

  {activeWebCaseSection === "objectives" && (
    <article className="web-case-section">
      <span className="web-case-section-number">
        SECCIÓN 03 / 08
      </span>

      <h2>OBJETIVOS</h2>

      <p className="web-case-lead">
        Transformar un sitio cargado de información en una
        experiencia clara, previsible y orientada al contacto.
      </p>

      <ul className="web-case-list">
        <li>
          Diferenciar los recorridos para personas y empresas.
        </li>

        <li>
          Simplificar el acceso a planes, servicios y canales
          de atención.
        </li>

        <li>
          Mejorar la jerarquía visual y la legibilidad.
        </li>

        <li>
          Utilizar llamados a la acción relacionados con cada
          necesidad.
        </li>

        <li>
          Mantener la identidad y la credibilidad de una
          empresa vinculada a la salud.
        </li>

        <li>
          Construir una experiencia responsive funcional en
          diferentes dispositivos.
        </li>
      </ul>
    </article>
  )}

  {activeWebCaseSection === "architecture" && (
    <article className="web-case-section">
      <span className="web-case-section-number">
        SECCIÓN 04 / 08
      </span>

      <h2>ARQUITECTURA</h2>

      <p className="web-case-lead">
        La información se reorganizó según el tipo de usuario
        y la tarea que necesitaba realizar.
      </p>

      <div className="web-case-route-grid">
        <div>
          <span>RUTA 01</span>
          <h3>PERSONAS Y FAMILIAS</h3>
          <p>
            Planes, acompañantes de salud, internación
            domiciliaria y profesionales.
          </p>
        </div>

        <div>
          <span>RUTA 02</span>
          <h3>EMPRESAS</h3>
          <p>
            Servicios corporativos, prestaciones, auditoría,
            equipamiento y soluciones institucionales.
          </p>
        </div>

        <div>
          <span>RUTA 03</span>
          <h3>INFORMACIÓN INSTITUCIONAL</h3>
          <p>
            Empresa, equipo, franquicias, contenidos y
            oportunidades laborales.
          </p>
        </div>

        <div>
          <span>RUTA 04</span>
          <h3>CONTACTO</h3>
          <p>
            WhatsApp, formularios y accesos directos ubicados
            según el contexto.
          </p>
        </div>
      </div>
    </article>
  )}

  {activeWebCaseSection === "uxui" && (
    <article className="web-case-section">
      <span className="web-case-section-number">
        SECCIÓN 05 / 08
      </span>

      <h2>DECISIONES UX/UI</h2>

      <p className="web-case-lead">
        Cada decisión visual respondió a un problema de
        comprensión, navegación o contacto.
      </p>

      <div className="web-case-decisions">
        <div>
          <span>01</span>
          <h3>RECORRIDOS DIFERENCIADOS</h3>
          <p>
            Separé los accesos para familias y empresas porque
            ambos públicos ingresan con objetivos diferentes.
          </p>
        </div>

        <div>
          <span>02</span>
          <h3>JERARQUÍA DE CONTENIDOS</h3>
          <p>
            Organicé los servicios en categorías para reducir
            la cantidad de decisiones simultáneas.
          </p>
        </div>

        <div>
          <span>03</span>
          <h3>ACCIONES CONTEXTUALES</h3>
          <p>
            Reemplacé acciones genéricas por llamados
            vinculados con el contenido de cada sección.
          </p>
        </div>

        <div>
          <span>04</span>
          <h3>SISTEMA CONSISTENTE</h3>
          <p>
            Unifiqué botones, tarjetas, jerarquías, espaciados
            y comportamientos para facilitar el aprendizaje.
          </p>
        </div>
      </div>
    </article>
  )}

      {activeWebCaseSection === "development" && (
        <article className="web-case-section">
          <span className="web-case-section-number">
            SECCIÓN 06 / 08
          </span>

          <h2>DESARROLLO</h2>

          <p className="web-case-lead">
            La propuesta fue implementada desde cero para tener
            control directo sobre la estructura y la experiencia.
          </p>

          <p>
            El sitio fue desarrollado con HTML, CSS y JavaScript,
            sin utilizar una plantilla prediseñada. Cada sección,
            componente y comportamiento se construyó en función
            del contenido y de los recorridos definidos.
            Dentro de este aporte adicional me encargué de analizar 
            el sitio existente, reorganizar los contenidos, definir 
            recorridos de navegación, diseñar la interfaz, desarrollar 
            la propuesta, revisar enlaces y realizar pruebas funcionales 
            en diferentes tamaños de pantalla.

          </p>

          <div className="web-case-tech">
            <div>
              <small>ESTRUCTURA</small>
              <b>HTML SEMÁNTICO</b>
            </div>

            <div>
              <small>INTERFAZ</small>
              <b>CSS RESPONSIVE</b>
            </div>

            <div>
              <small>INTERACCIÓN</small>
              <b>JAVASCRIPT</b>
            </div>

            <div>
              <small>CONTROL</small>
              <b>DESARROLLO A MEDIDA</b>
            </div>
          </div>

          <p>
            Mi participación incluyó el análisis del sitio
            anterior, la reorganización de contenidos, el diseño
            de interfaz, la implementación, la revisión de enlaces
            y las pruebas funcionales.
          </p>
        </article>
      )}

      {activeWebCaseSection === "responsive" && (
        <article className="web-case-section">
          <span className="web-case-section-number">
            SECCIÓN 07 / 08
          </span>

          <h2>RESPONSIVE</h2>

          <p className="web-case-lead">
            La versión mobile fue trabajada como una experiencia
            específica, no como una reducción automática de la
            versión de escritorio.
          </p>

          <figure className="web-case-responsive-visual">
  <button
    type="button"
    className="web-case-image-button"
    onClick={() =>
      setExpandedCaseImage(
        "/projects/diseno-web/siempre-case-study/03-propuesta-nueva-mobile.png"
      )
    }
    aria-label="Ampliar captura de la versión mobile"
  >
    <img
      src="/projects/diseno-web/siempre-case-study/03-propuesta-nueva-mobile.png"
      alt="Versión responsive del sitio de Siempre Argentina"
    />
    <span>AMPLIAR ↗</span>
  </button>

  <figcaption>
    Adaptación mobile de la propuesta desarrollada a medida.
  </figcaption>
</figure>

          <ul className="web-case-list">
            <li>
              Reorganización vertical de los bloques.
            </li>

            <li>
              Simplificación del menú y de los niveles de
              navegación.
            </li>

            <li>
              Ajuste de tipografías, espaciados y áreas táctiles.
            </li>

            <li>
              Reubicación de imágenes según la jerarquía del
              contenido.
            </li>

            <li>
              Botones y formularios adaptados al uso táctil.
            </li>

            <li>
              Pruebas de lectura, navegación y funcionamiento en
              diferentes tamaños de pantalla.
            </li>
          </ul>
        </article>
      )}

      {activeWebCaseSection === "result" && (
        <article className="web-case-section">
          <span className="web-case-section-number">
            SECCIÓN 08 / 08
          </span>

          <h2>RESULTADO</h2>

          <p className="web-case-lead">
            El resultado es una propuesta más clara, consistente
            y adaptable, construida a partir de las necesidades del
            contenido y sus usuarios.
          </p>

          <ul className="web-case-list">
            <li>
              Recorridos diferenciados para personas y empresas.
            </li>

            <li>
              Mayor claridad en la presentación de los servicios.
            </li>

            <li>
              Jerarquías y componentes visuales consistentes.
            </li>

            <li>
              Acceso más directo a los canales de contacto.
            </li>

            <li>
              Mayor control sobre la implementación y el
              comportamiento responsive.
            </li>
          </ul>

          <blockquote className="web-case-conclusion">
            De una plantilla generalista a una experiencia digital
            diseñada y desarrollada a medida.
          </blockquote>
        </article>
        )}
        </div>
  </div>

  {expandedCaseImage && (
    <div
      className="web-case-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada del proyecto"
      onClick={() => setExpandedCaseImage(null)}
    >
      <button
        type="button"
        className="web-case-lightbox-close"
        onClick={() => setExpandedCaseImage(null)}
        aria-label="Cerrar imagen ampliada"
      >
        ×
      </button>

      <img
        src={expandedCaseImage}
        alt="Vista ampliada del caso de estudio Siempre Argentina"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )}
</section>
)}
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

    <img
      className="contact-character"
      src="/characters/pablo-front.png"
      alt="Pablo Fonteñez"
      aria-hidden="true"
   />

    <div className="contact-interface">
      <header className="contact-mission-header">
        <span className="screen-label">
          CENTRO DE OPERACIONES / COMUNICACIONES
        </span>

        <h1>NUEVA MISIÓN</h1>

        <p>
          Seleccioná el tipo de colaboración para establecer contacto.
        </p>
      </header>

      <div className="contact-dashboard">
        <aside className="contact-player-panel">
          <div className="contact-panel-heading">
            <span>
              <i className="contact-status-dot" />
              PLAYER ONLINE
            </span>

            <b>DISPONIBLE</b>
          </div>

          <h2>ESTADO DEL PROFESIONAL</h2>

          <dl className="contact-player-data">
            <div>
              <dt>INCORPORACIÓN</dt>
              <dd>INMEDIATA</dd>
            </div>

            <div>
              <dt>EXPERIENCIA</dt>
              <dd>15+ AÑOS</dd>
            </div>

            <div>
              <dt>BASE OPERATIVA</dt>
              <dd>BUENOS AIRES · ARGENTINA</dd>
            </div>

            <div>
              <dt>EQUIPAMIENTO</dt>
              <dd>PROPIO</dd>
            </div>

            <div>
              <dt>IDIOMA DE TRABAJO</dt>
              <dd>ESPAÑOL</dd>
            </div>
          </dl>

          <div className="contact-coverage">
            <span>COBERTURA OPERATIVA</span>

            <div>
              <small>ARGENTINA</small>
              <b>PRESENCIAL · HÍBRIDA · REMOTA</b>
            </div>

            <div>
              <small>OTROS PAÍSES</small>
              <b>REMOTA</b>
            </div>
          </div>
        </aside>

        <div className="contact-missions">
          <article className="contact-mission-card">
            <div className="contact-mission-number">
              <span>01</span>
              <small>POSICIÓN ESTABLE</small>
            </div>

            <h2>INCORPORACIÓN AL EQUIPO</h2>

            <p>
              Disponible para incorporarme a empresas, agencias o equipos
              creativos. En Argentina puedo trabajar de manera presencial,
              híbrida o remota. Para oportunidades de otros países, cuento
              con disponibilidad remota.
            </p>

            <div className="contact-mission-tags">
              <span>RELACIÓN DE DEPENDENCIA</span>
              <span>EQUIPO CREATIVO</span>
              <span>REMOTO INTERNACIONAL</span>
            </div>

            <a
              href={jobContactWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              CONTACTAR POR UNA OPORTUNIDAD
              <span>→</span>
            </a>
          </article>

          <article className="contact-mission-card">
            <div className="contact-mission-number">
              <span>02</span>
              <small>COLABORACIÓN FREELANCE</small>
            </div>

            <h2>INICIAR UN PROYECTO</h2>

            <p>
              Disponible para proyectos puntuales, campañas o colaboraciones
              recurrentes en diseño, comunicación digital, contenido
              audiovisual y desarrollo web.
            </p>

            <div className="contact-project-types">
              <span>MISIÓN PUNTUAL</span>
              <span>CAMPAÑA</span>
              <span>SOPORTE RECURRENTE</span>
            </div>

            <div className="contact-specialties">
              {[
                "DISEÑO GRÁFICO",
                "REDES SOCIALES",
                "IDENTIDAD VISUAL",
                "PRESENTACIONES",
                "EDICIÓN DE VIDEO",
                "DISEÑO WEB",
                "INTELIGENCIA ARTIFICIAL",
                "OTRO PROYECTO",
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <small className="contact-budget-note">
              PRESUPUESTO PERSONALIZADO SEGÚN ALCANCE Y TIEMPOS
            </small>

            <a
              href={projectContactWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ENVIAR SOLICITUD
              <span>→</span>
            </a>
          </article>
        </div>
      </div>

      <footer className="contact-comms">
        <div className="contact-comms-status">
          <span>
            <i className="contact-status-dot" />
            PLAYER ONLINE
          </span>

          <span>CANAL SEGURO</span>
          <span>RESPUESTA ESTIMADA: 24/48 HS</span>
        </div>

        <nav aria-label="Canales de contacto">
            <a
              href={contactWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <small></small>
              <b>11 3414-5166</b>
            </a>

            <a href="mailto:pabloezequielfontenez@gmail.com">
              <small></small>
              <b>pabloezequielfontenez@gmail.com</b>
            </a>

            <a
              href="https://www.linkedin.com/in/pfontenez/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <small></small>
              <b>linkedin.com/in/pfontenez</b>
            </a>
          </nav>
      </footer>
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
