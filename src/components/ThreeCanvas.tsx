import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      setIsWebGLSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    // Light Setup for metallic or glow appearance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf97316, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create Architectural Wireframe Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0xf97316, 0x334155);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // Create 3D Wireframe Structure resembling a house skeleton
    const group = new THREE.Group();
    scene.add(group);

    // Main house box geometry
    const houseWidth = 3.5;
    const houseHeight = 2.5;
    const houseDepth = 3.5;

    const boxGeom = new THREE.BoxGeometry(houseWidth, houseHeight, houseDepth);
    const boxEdges = new THREE.EdgesGeometry(boxGeom);
    const orangeMaterial = new THREE.LineBasicMaterial({ 
      color: 0xf97316, 
      linewidth: 2,
    });
    const houseWireframe = new THREE.LineSegments(boxEdges, orangeMaterial);
    group.add(houseWireframe);

    // Add Roof (Prism) wireframe
    const roofHeight = 1.5;
    const roofGeom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Front Triangle
      -houseWidth / 2, houseHeight / 2, houseDepth / 2,
      0, houseHeight / 2 + roofHeight, houseDepth / 2,
      houseWidth / 2, houseHeight / 2, houseDepth / 2,
      
      // Back Triangle
      -houseWidth / 2, houseHeight / 2, -houseDepth / 2,
      0, houseHeight / 2 + roofHeight, -houseDepth / 2,
      houseWidth / 2, houseHeight / 2, -houseDepth / 2,

      // Ridge
      0, houseHeight / 2 + roofHeight, houseDepth / 2,
      0, houseHeight / 2 + roofHeight, -houseDepth / 2,

      // Left slopes
      -houseWidth / 2, houseHeight / 2, houseDepth / 2,
      -houseWidth / 2, houseHeight / 2, -houseDepth / 2,

      // Right slopes
      houseWidth / 2, houseHeight / 2, houseDepth / 2,
      houseWidth / 2, houseHeight / 2, -houseDepth / 2,
    ]);

    roofGeom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const roofMaterial = new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 });
    const roofWireframe = new THREE.LineSegments(roofGeom, roofMaterial);
    group.add(roofWireframe);

    // Add inner structural columns & floors (represented by smaller white/grey wireframes)
    const innerGeom = new THREE.BoxGeometry(houseWidth - 0.2, houseHeight / 2, houseDepth - 0.2);
    const innerEdges = new THREE.EdgesGeometry(innerGeom);
    const greyMaterial = new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 1 });
    const innerWireframe = new THREE.LineSegments(innerEdges, greyMaterial);
    innerWireframe.position.y = -houseHeight / 4;
    group.add(innerWireframe);

    // Interactive mouse targets
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Get normalized coordinates (-1 to 1)
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Deflect structure based on mouse
      targetRotationY = x * 0.4;
      targetRotationX = y * 0.4;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Scroll trigger behavior
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Observer for robust dynamic canvas sizing (No fixed window calculations)
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Initial size setup
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate rotation for smooth lag effect
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      // Base auto-rotation
      const time = Date.now() * 0.0005;
      group.rotation.y = currentRotationY + time * 0.15;
      group.rotation.x = currentRotationX + Math.sin(time * 0.1) * 0.05;

      // Scroll triggered camera slide & zoom
      const scrollFraction = Math.min(scrollY / 2000, 1);
      camera.position.z = 10 - scrollFraction * 4; // Zoom in
      camera.position.y = 3 - scrollFraction * 2;  // Descend view angle
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      
      // Memory cleanup
      boxGeom.dispose();
      boxEdges.dispose();
      innerGeom.dispose();
      innerEdges.dispose();
      roofGeom.dispose();
      orangeMaterial.dispose();
      greyMaterial.dispose();
      roofMaterial.dispose();
      gridHelper.dispose();
      renderer.dispose();
    };
  }, []);

  if (!isWebGLSupported) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-900/50 rounded-xl border border-orange-500/30">
        <div className="text-orange-500 text-5xl mb-4 font-display">3D MODEL</div>
        <p className="text-slate-300 text-sm max-w-md">
          Your browser does not support WebGL or hardware acceleration is disabled. 
          Enjoy this stunning concept rendering of Construction Aubywan INC instead.
        </p>
        <div className="mt-6 p-8 border border-dashed border-slate-700 rounded-lg relative overflow-hidden bg-slate-950/80">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent"></div>
          <div className="relative font-mono text-xs text-orange-500 text-left space-y-1">
            <div>// ARCHITECTURAL WIREFRAME STRUCTURE</div>
            <div>[ST-EUSTACHE RESIDENTIEL MODEL v2026]</div>
            <div>STATUS: STANDBY</div>
            <div>X_COORD: 45.5577° N | Y_COORD: 73.8964° W</div>
          </div>
          <div className="w-48 h-32 border border-orange-500/20 mt-4 mx-auto rounded flex items-center justify-center">
            <div className="w-12 h-12 border border-slate-700 rotate-45 flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-4 left-4 pointer-events-none bg-slate-950/80 px-3 py-1.5 rounded border border-slate-800 text-xs font-mono text-slate-400 backdrop-blur-sm">
        <span className="text-orange-500 animate-pulse mr-1.5">●</span> 
        Interactive Blueprint Engine (Scroll to Zoom, Move Mouse)
      </div>
    </div>
  );
}
