import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const Token3DView = ({ className = "w-40 h-40" }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    
    // Set renderer size and append to DOM
    renderer.setSize(200, 200);
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create token geometry
    const geometry = new THREE.CylinderGeometry(1, 1, 0.2, 32);
    
    // Create gradient material
    const material = new THREE.MeshPhongMaterial({
      color: 0x4F46E5,
      specular: 0x7C3AED,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });

    // Create token mesh
    const token = new THREE.Mesh(geometry, material);
    scene.add(token);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 2;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (token) {
        token.rotation.x += 0.005;
        token.rotation.y += 0.01;
      }
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <motion.div
      ref={mountRef}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default Token3DView; 