/**
 * i18n System - Tech/Developer Focused
 */

const translations = {
  es: {
    "nav.about": "01_Info",
    "nav.work": "02_Deployments",
    "nav.contact": "03_Init",
    "nav.home": "00_Home",
    
    "hero.status": "Sistema en línea. Construyendo arquitecturas escalables.",
    "hero.title.1": "Software",
    "hero.title.2": "Engineer.",
    "hero.desc": "// Desarrollador Web especializado en alto rendimiento, lógica de negocio compleja y código limpio. No solo escribo líneas, construyo soluciones.",
    "hero.btn.projects": "Ejecutar_Proyectos",
    "hero.btn.cv": "GET /resume.pdf",
    
    "about.title": "> System.Info",
    "about.card1.title": "01. Arquitectura & Lógica",
    "about.card1.desc": "Mi enfoque principal es resolver problemas complejos mediante algoritmos eficientes. Desde bases de datos relacionales hasta arquitecturas de componentes dinámicos en el frontend.",
    "about.card2.title": "02. Rendimiento (Perf)",
    "about.card2.desc": "El código debe ser escalable y mantenible. Utilizo las mejores prácticas de ingeniería de software para asegurar que las aplicaciones no solo funcionen, sino que vuelen.",
    
    "portfolio.title": "> Deployments",
    "portfolio.p1.title": "Amezcua",
    "portfolio.p1.desc": "Plataforma web inmobiliaria.",
    "portfolio.p2.title": "ADN SPA",
    "portfolio.p2.desc": "Plataforma web de bienestar.",
    "portfolio.p3.title": "Trefiladora ITA",
    "portfolio.p3.desc": "Infraestructura e-commerce B2B.",
    "portfolio.p4.title": "Adminika",
    "portfolio.p4.desc": "Gestor inmobiliario y Dashboard.",
    
    "contact.title": "> init_connection()",
    "contact.desc": "¿Listo para compilar el siguiente gran sistema? Construyamos software robusto.",
    "contact.btn": "sudo open_connection"
  },
  en: {
    "nav.about": "01_Info",
    "nav.work": "02_Deployments",
    "nav.contact": "03_Init",
    "nav.home": "00_Home",
    
    "hero.status": "System online. Building scalable architectures.",
    "hero.title.1": "Software",
    "hero.title.2": "Engineer.",
    "hero.desc": "// Web Developer focused on high performance, complex business logic, and clean code. I don't just write lines, I build solutions.",
    "hero.btn.projects": "Execute_Projects",
    "hero.btn.cv": "GET /resume.pdf",
    
    "about.title": "> System.Info",
    "about.card1.title": "01. Architecture & Logic",
    "about.card1.desc": "My main focus is solving complex problems through efficient algorithms. From relational databases to dynamic component architectures on the frontend.",
    "about.card2.title": "02. Performance (Perf)",
    "about.card2.desc": "Code must be scalable and maintainable. I use software engineering best practices to ensure applications don't just work, they fly.",
    
    "portfolio.title": "> Deployments",
    "portfolio.p1.title": "Amezcua",
    "portfolio.p1.desc": "Real estate web platform.",
    "portfolio.p2.title": "ADN SPA",
    "portfolio.p2.desc": "Wellness web platform.",
    "portfolio.p3.title": "Trefiladora ITA",
    "portfolio.p3.desc": "B2B e-commerce infrastructure.",
    "portfolio.p4.title": "Adminika",
    "portfolio.p4.desc": "Real estate manager and Dashboard.",
    
    "contact.title": "> init_connection()",
    "contact.desc": "Ready to compile the next big system? Let's build robust software.",
    "contact.btn": "sudo open_connection"
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
