/**
 * WebGL Background - Neural Network / Code Matrix
 * Bulletproof rendering using Points and Lines.
 */

class WebGLNetwork {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    // Dark background for tech vibe
    this.scene.background = new THREE.Color(0x09090b);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 200;

    this.renderer = new THREE.WebGLRenderer({ 
      canvas: this.canvas, 
      antialias: true 
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.particleCount = window.innerWidth < 768 ? 250 : 500;
    this.particles = null;
    this.linesMesh = null;
    this.positions = null;
    this.velocities = [];
    
    this.maxDistance = 35; // Distance to connect nodes
    
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.initNetwork();
    this.bindEvents();
    this.animate();
  }

  initNetwork() {
    const geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.particleCount * 3);
    
    for (let i = 0; i < this.particleCount; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * 400; // x
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * 400; // y
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // z

      this.velocities.push({
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

    // Particle Material
    const pMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 1.5,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, pMaterial);
    this.scene.add(this.particles);

    // Lines Material & Geometry
    this.linesGeometry = new THREE.BufferGeometry();
    
    // Allocate max possible lines to prevent recreating buffer every frame
    this.maxLines = 4000; 
    this.linePositions = new Float32Array(this.maxLines * 6); // 2 vertices per line, 3 coords (x,y,z)
    const positionAttribute = new THREE.BufferAttribute(this.linePositions, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    this.linesGeometry.setAttribute('position', positionAttribute);
    
    this.linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.15
    });
    
    this.linesMesh = new THREE.LineSegments(this.linesGeometry, this.linesMaterial);
    this.scene.add(this.linesMesh);
  }

  updateLines() {
    let lineCount = 0;

    for (let i = 0; i < this.particleCount; i++) {
      for (let j = i + 1; j < this.particleCount; j++) {
        const dx = this.positions[i * 3] - this.positions[j * 3];
        const dy = this.positions[i * 3 + 1] - this.positions[j * 3 + 1];
        const dz = this.positions[i * 3 + 2] - this.positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < this.maxDistance && lineCount < this.maxLines) {
          // Point A
          this.linePositions[lineCount * 6] = this.positions[i * 3];
          this.linePositions[lineCount * 6 + 1] = this.positions[i * 3 + 1];
          this.linePositions[lineCount * 6 + 2] = this.positions[i * 3 + 2];
          // Point B
          this.linePositions[lineCount * 6 + 3] = this.positions[j * 3];
          this.linePositions[lineCount * 6 + 4] = this.positions[j * 3 + 1];
          this.linePositions[lineCount * 6 + 5] = this.positions[j * 3 + 2];
          
          lineCount++;
        }
      }
    }

    this.linesGeometry.setDrawRange(0, lineCount * 2);
    this.linesGeometry.attributes.position.needsUpdate = true;
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      this.mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Adjust particle count on resize if needed (simplified)
    this.particleCount = window.innerWidth < 768 ? 200 : 500;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Update particle positions
    for (let i = 0; i < this.particleCount; i++) {
      this.positions[i * 3] += this.velocities[i].x;
      this.positions[i * 3 + 1] += this.velocities[i].y;
      this.positions[i * 3 + 2] += this.velocities[i].z;

      // Bounds checking to bounce back
      if (Math.abs(this.positions[i * 3]) > 200) this.velocities[i].x *= -1;
      if (Math.abs(this.positions[i * 3 + 1]) > 200) this.velocities[i].y *= -1;
      if (Math.abs(this.positions[i * 3 + 2]) > 200) this.velocities[i].z *= -1;
    }
    
    this.particles.geometry.attributes.position.needsUpdate = true;
    
    // Calculate and update lines
    this.updateLines();

    // Camera movement based on mouse for parallax
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    // Rotate entire scene slightly on scroll
    const scrollY = window.scrollY;
    this.scene.rotation.y = scrollY * 0.001;
    this.scene.rotation.x = scrollY * 0.0005;

    this.renderer.render(this.scene, this.camera);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    window.webglNetwork = new WebGLNetwork();
  }
});
