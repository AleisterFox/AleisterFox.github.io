/**
 * GSAP Animations & ScrollTriggers - Tech Style
 */

document.addEventListener("DOMContentLoaded", () => {
  // Lenis Smooth Scroll Setup
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // GSAP Integration with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0, 0);

  // Check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // --------------------------------------------------
    // Loader Animation Sequence
    // --------------------------------------------------
    const loader = document.getElementById("global-loader");
    const progressBar = document.querySelector(".progress-bar-fill");
    const progressText = document.querySelector(".progress-text");
    
    // Create a proxy object to tween the progress value
    const progressObj = { value: 0 };
    
    const logTl = gsap.timeline();
    const logLines = document.querySelectorAll(".log-line");

    // Animate terminal logs sequentially
    logLines.forEach((line, index) => {
      const okText = line.querySelector('.log-ok');
      
      // Reveal the line text
      logTl.to(line, { opacity: 1, duration: 0.15 });
      
      // If it has an [OK] span, reveal it slightly after
      if (okText) {
        logTl.to(okText, { opacity: 1, duration: 0.1 }, "+=0.25");
      }
    });
    
    // Start progress bar after logs
    logTl.to(progressObj, {
      value: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(progressObj.value);
        progressBar.style.width = rounded + "%";
        progressText.textContent = rounded + "%";
      },
      onComplete: () => {
        // Fade out loader in place
        gsap.to(loader, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            loader.style.display = "none";
            initHeroAnimations();
          }
        });
      }
    }, "+=0.2");

    // --------------------------------------------------
    // Main Animations
    // --------------------------------------------------
    function initHeroAnimations() {
      // Hero Title Reveal
      const heroTl = gsap.timeline();
      heroTl.fromTo(".title-name",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(".title-line", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(".hero-status-bar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(".hero-description",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(".hero-cta-group a",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.6"
      );
    }

    // --------------------------------------------------
    // ScrollTriggers
    // --------------------------------------------------
    
    // About Section Cards Stagger
    gsap.fromTo(".about-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 75%",
        }
      }
    );

    // Portfolio Rows Tech Reveal
    const projectRows = document.querySelectorAll(".project-row");
    projectRows.forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        }
      );
    });

    // Contact Box
    gsap.fromTo(".contact-box",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        }
      }
    );

    // --------------------------------------------------
    // Hover Image Reveal Logic
    // --------------------------------------------------
    const revealContainer = document.querySelector('.cursor-image-reveal');
    const revealImg = revealContainer.querySelector('img');
    
    // Use GSAP quickSetter for high-performance mouse tracking
    const xSet = gsap.quickSetter(revealContainer, "x", "px");
    const ySet = gsap.quickSetter(revealContainer, "y", "px");

    // Disable effect on touch devices (detect screen width)
    const isTouchDevice = window.innerWidth <= 768;

    if (!isTouchDevice) {
      document.addEventListener('mousemove', (e) => {
        // Center the image on the cursor
        xSet(e.clientX);
        ySet(e.clientY);
      });

      projectRows.forEach((row) => {
        row.addEventListener('mouseenter', () => {
          const imgSrc = row.getAttribute('data-image');
          if (imgSrc) {
            revealImg.src = imgSrc;
            revealContainer.classList.add('is-active');
            gsap.to(revealContainer, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power3.out"
            });
          }
        });

        row.addEventListener('mouseleave', () => {
          revealContainer.classList.remove('is-active');
          gsap.to(revealContainer, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in"
          });
        });
      });
    }
  }
});
