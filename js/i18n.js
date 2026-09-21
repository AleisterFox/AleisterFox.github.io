/**
 * i18n System - Tech/Developer Focused
 */

const translations = {
  es: {
    "nav.about": "01_Info",
    "nav.work": "02_Deployments",
    "nav.contact": "03_Init",
    "nav.home": "00_Home",
    
    "hero.status": "Sistema en línea. Liderando Nómada Labs desde Celaya, Guanajuato.",
    "hero.title.1": "Software",
    "hero.title.2": "Developer.",
    "hero.desc": "// Desarrollador Web especializado en alto rendimiento, lógica de negocio compleja y código limpio. No solo escribo líneas, construyo soluciones.",
    "hero.btn.projects": "Ejecutar_Proyectos",
    "hero.btn.cv": "GET /resume.pdf",
    
    "about.title": "> System.Info",
    "about.card1.title": "01. Arquitectura & Lógica",
    "about.card1.desc": "Diseño y desarrollo plataformas completas de principio a fin: sistemas POS con impresión térmica, CRM/ERP multi-cliente y portales web para negocios del Bajío. Cada proyecto pasa por mis manos, de la base de datos al último detalle de interfaz.",
    "about.card2.title": "02. Del Retail al Software",
    "about.card2.desc": "Antes de fundar Nómada Labs gestioné inventario de activos IT para tiendas de retail multi-sucursal. Hoy aplico esa misma disciplina operativa a arquitecturas de software escalables, mantenibles y pensadas para crecer.",
    "about.history.title": ">> sudo cat trajectory.log",
    "about.t1.title": "Fundador / Software Developer",
    "about.t1.desc": "Desarrollo de sitios web, aplicaciones y software a medida.",
    "about.t2.title": "Desarrollador Web",
    "about.t2.desc": "Desarrollo y mantenimiento de soluciones web.",
    "about.t3.title": "Desarrollador Frontend",
    "about.t3.desc": "Desarrollo frontend y soluciones web.",
    "about.t4.title": "Front End Developer",
    "about.t4.desc": "Desarrollo frontend y construcción de interfaces web.",
    "about.t5.title": "Desarrollo Web",
    "about.t5.desc": "Desarrollo de proyectos web independientes.",
    
    "portfolio.title": "> Deployments",
    "portfolio.p1.title": "Amezcua",
    "portfolio.p1.desc": "Plataforma web inmobiliaria.",
    "portfolio.p2.title": "Seguros con Bere",
    "portfolio.p2.desc": "Sitio web personal de un agente de seguros que incluye una calculadora de PPR.",
    "portfolio.p3.title": "Trefiladora ITA",
    "portfolio.p3.desc": "Infraestructura e-commerce B2B.",
    "portfolio.p4.title": "Adminika",
    "portfolio.p4.desc": "Gestor inmobiliario y Dashboard.",
    "portfolio.p5.title": "Nómada Labs",
    "portfolio.p5.desc": "Agencia de desarrollo web y transformación digital.",
    
    "contact.title": "> init_connection()",
    "contact.desc": "¿Tienes un proyecto para tu negocio? Estoy listo para construirlo contigo.",
    "contact.btn": "sudo open_connection"
  },
  en: {
    "nav.about": "01_Info",
    "nav.work": "02_Deployments",
    "nav.contact": "03_Init",
    "nav.home": "00_Home",
    
    "hero.status": "System online. Leading Nómada Labs from Celaya, Guanajuato.",
    "hero.title.1": "Software",
    "hero.title.2": "Developer.",
    "hero.desc": "// Web Developer focused on high performance, complex business logic, and clean code. I don't just write lines, I build solutions.",
    "hero.btn.projects": "Execute_Projects",
    "hero.btn.cv": "GET /resume.pdf",
    
    "about.title": "> System.Info",
    "about.card1.title": "01. Architecture & Logic",
    "about.card1.desc": "I design and build end-to-end platforms: thermal printing POS systems, multi-client CRM/ERPs, and web portals for local businesses. Every project goes through my hands, from the database to the final UI detail.",
    "about.card2.title": "02. From Retail to Software",
    "about.card2.desc": "Before founding Nómada Labs, I managed IT asset inventory for multi-branch retail stores. Today, I apply that same operational discipline to scalable, maintainable software architectures built to grow.",
    "about.history.title": ">> sudo cat trajectory.log",
    "about.t1.title": "Founder / Software Developer",
    "about.t1.desc": "Development of websites, applications, and custom software.",
    "about.t2.title": "Web Developer",
    "about.t2.desc": "Development and maintenance of web solutions.",
    "about.t3.title": "Frontend Developer",
    "about.t3.desc": "Frontend development and web solutions.",
    "about.t4.title": "Front End Developer",
    "about.t4.desc": "Frontend development and web interface construction.",
    "about.t5.title": "Web Development",
    "about.t5.desc": "Development of independent web projects.",
    "portfolio.title": "> Deployments",
    "portfolio.p1.title": "Amezcua",
    "portfolio.p1.desc": "Real estate web platform.",
    "portfolio.p2.title": "Seguros con Bere",
    "portfolio.p2.desc": "Personal website for an insurance agent including a PPR calculator.",
    "portfolio.p3.title": "Trefiladora ITA",
    "portfolio.p3.desc": "B2B e-commerce infrastructure.",
    "portfolio.p4.title": "Adminika",
    "portfolio.p4.desc": "Real estate manager and Dashboard.",
    "portfolio.p5.title": "Nómada Labs",
    "portfolio.p5.desc": "Web development and digital transformation agency.",
    
    "contact.title": "> init_connection()",
    "contact.desc": "Do you have a project for your business? I'm ready to build it with you.",
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
