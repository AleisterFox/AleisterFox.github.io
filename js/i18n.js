/**
 * i18n System - Tech/Developer Focused
 */

const translations = {
  es: {
    "nav.about": "01_Info",
    "nav.work": "02_Projects",
    "nav.contact": "03_Init",
    "nav.home": "00_Home",
    
    "hero.status": "Disponible para proyectos. Desarrollando interfaces web y producto digital desde Celaya, Gto.",
    "hero.title.1": "Frontend &",
    "hero.title.2": "Web Developer.",
    "hero.desc": "// Desarrollador Web enfocado en Frontend con capacidades Fullstack. Me especializo en crear interfaces interactivas, limpias y accesibles con React, JavaScript y CSS moderno, integrando APIs y lógica de backend para entregar productos funcionales.",
    "hero.btn.projects": "Ver_Proyectos",
    "hero.btn.cv": "GET /resume.pdf",
    
    "about.title": "> System.Info",
    "about.card1.title": "01. Frontend con Criterio Fullstack",
    "about.card1.desc": "Mi especialidad es el frontend: transformar ideas en interfaces rápidas, intuitivas y con atención al detalle visual con React y tecnologías web modernas. Al mismo tiempo, tengo la base para integrar APIs, conectar bases de datos y resolver la lógica necesaria para que el producto cobre vida.",
    "about.card2.title": "02. Del Retail al Software",
    "about.card2.desc": "Antes de enfocarme de lleno en el desarrollo, gestioné inventario de activos IT para tiendas de retail. Esa experiencia me dio una comprensión clara de cómo operan los negocios y qué necesitan los usuarios reales: interfaces claras, flujos sin fricción y software práctico centrado en resolver problemas.",
    "about.history.title": ">> sudo cat trajectory.log",
    "about.t1.title": "Fundador / Software Developer",
    "about.t1.desc": "Desarrollo de sitios web, interfaces interactivas y soluciones digitales.",
    "about.t2.title": "Desarrollador Web",
    "about.t2.desc": "Desarrollo y mantenimiento de soluciones web.",
    "about.t3.title": "Desarrollador Frontend",
    "about.t3.desc": "Desarrollo frontend y maquetación de interfaces web.",
    "about.t4.title": "Front End Developer",
    "about.t4.desc": "Desarrollo frontend y construcción de componentes web.",
    "about.t5.title": "Desarrollo Web",
    "about.t5.desc": "Desarrollo de proyectos web independientes.",
    
    "portfolio.title": "> Projects",
    "portfolio.p1.title": "Amezcua",
    "portfolio.p1.desc": "Portal inmobiliario con catálogo dinámico de propiedades.",
    "portfolio.p2.title": "Seguros con Bere",
    "portfolio.p2.desc": "Sitio web para asesor de seguros con calculadora de PPR interactiva.",
    "portfolio.p3.title": "Trefiladora ITA",
    "portfolio.p3.desc": "Catálogo web y plataforma comercial B2B.",
    "portfolio.p4.title": "Adminika",
    "portfolio.p4.desc": "Gestor inmobiliario y dashboard administrativo.",
    "portfolio.p5.title": "Nómada Labs",
    "portfolio.p5.desc": "Sitio web interactivo y portafolio de servicios con Three.js.",
    "portfolio.p6.title": "Luna Burguette",
    "portfolio.p6.desc": "Portafolio web responsive para diseñadora gráfica.",
    
    "contact.title": "> init_connection()",
    "contact.desc": "¿Tienes un proyecto en mente o buscas sumar a tu equipo? Hablemos.",
    "contact.btn": "open_connection"
  },
  en: {
    "nav.about": "01_Info",
    "nav.work": "02_Projects",
    "nav.contact": "03_Init",
    "nav.home": "00_Home",
    
    "hero.status": "Available for projects. Building web interfaces and digital products from Celaya, Gto.",
    "hero.title.1": "Frontend &",
    "hero.title.2": "Web Developer.",
    "hero.desc": "// Frontend-focused Web Developer with Fullstack capabilities. I specialize in building clean, interactive, and accessible interfaces with React, JavaScript, and modern CSS, integrating APIs and backend logic to deliver functional products.",
    "hero.btn.projects": "View_Projects",
    "hero.btn.cv": "GET /resume.pdf",
    
    "about.title": "> System.Info",
    "about.card1.title": "01. Frontend with Fullstack Insight",
    "about.card1.desc": "My core focus is frontend: turning ideas into fast, intuitive, and visually polished interfaces with React and modern web technologies. At the same time, I have the solid foundation to integrate APIs, connect databases, and wire up the logic needed to bring products to life.",
    "about.card2.title": "02. From Retail to Software",
    "about.card2.desc": "Before diving fully into software development, I managed IT asset inventory for retail stores. That experience gave me a clear perspective on how businesses operate and what real users need: clear interfaces, frictionless flows, and practical software focused on solving problems.",
    "about.history.title": ">> sudo cat trajectory.log",
    "about.t1.title": "Founder / Software Developer",
    "about.t1.desc": "Development of websites, interactive interfaces, and digital solutions.",
    "about.t2.title": "Web Developer",
    "about.t2.desc": "Development and maintenance of web solutions.",
    "about.t3.title": "Frontend Developer",
    "about.t3.desc": "Frontend development and web solutions.",
    "about.t4.title": "Front End Developer",
    "about.t4.desc": "Frontend development and component construction.",
    "about.t5.title": "Web Development",
    "about.t5.desc": "Development of independent web projects.",
    
    "portfolio.title": "> Projects",
    "portfolio.p1.title": "Amezcua",
    "portfolio.p1.desc": "Real estate web portal with dynamic property catalog.",
    "portfolio.p2.title": "Seguros con Bere",
    "portfolio.p2.desc": "Website for an insurance advisor featuring an interactive PPR calculator.",
    "portfolio.p3.title": "Trefiladora ITA",
    "portfolio.p3.desc": "B2B commercial web catalog and platform.",
    "portfolio.p4.title": "Adminika",
    "portfolio.p4.desc": "Real estate manager and administrative dashboard.",
    "portfolio.p5.title": "Nómada Labs",
    "portfolio.p5.desc": "Interactive website and service portfolio with Three.js.",
    "portfolio.p6.title": "Luna Burguette",
    "portfolio.p6.desc": "Minimalist responsive portfolio for a graphic designer.",
    
    "contact.title": "> init_connection()",
    "contact.desc": "Have a project in mind or looking to strengthen your team? Let's connect.",
    "contact.btn": "open_connection"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }

  detectLanguage() {
    const saved = localStorage.getItem('site_lang');
    if (saved && (saved === 'es' || saved === 'en')) return saved;
    
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('en') ? 'en' : 'es';
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'es') return;
    this.currentLang = lang;
    localStorage.setItem('site_lang', lang);
    this.updateDOM();
    this.updateToggleState();
  }

  updateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    const dictionary = translations[this.currentLang];
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key]) {
        el.innerHTML = dictionary[key];
      }
    });

    document.documentElement.lang = this.currentLang;
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateDOM();
      this.bindToggle();
    });
  }

  bindToggle() {
    const toggleBtns = document.querySelectorAll('.lang-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = this.currentLang === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
      });
    });
    this.updateToggleState();
  }
  
  updateToggleState() {
    const toggleBtns = document.querySelectorAll('.lang-toggle-btn');
    toggleBtns.forEach(btn => {
       btn.textContent = this.currentLang === 'es' ? 'EN' : 'ES';
    });
  }
}

window.i18n = new I18nManager();
