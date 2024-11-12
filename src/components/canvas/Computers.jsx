import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF('./desktop_pc/scene.gltf', true);
  
  useEffect(() => {
    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const position = object.geometry.attributes.position;
          
          if (position) {
            for (let i = 0; i < position.count; i++) {
              const x = position.getX(i);
              const y = position.getY(i);
              const z = position.getZ(i);

              // Safely check for NaN and log the issue
              if (isNaN(x) || isNaN(y) || isNaN(z)) {
                console.error('NaN detected in geometry positions:', { x, y, z });
                // Set default position to avoid issues
                position.setXYZ(i, 0, 0, 0);
              }
            }
            // Recompute bounding box and sphere after correcting NaN values
            object.geometry.computeBoundingBox();
            object.geometry.computeBoundingSphere();
          }
        }
      });
    }
  }, [scene]);

  // scene.traverse((object) => {
  //   if (object.isMesh) {
  //     const position = object.geometry.attributes.position;

  //     for (let i=0; i < position.count; i++) {
  //       const x = position.getX(i);
  //       const y = position.getY(i);
  //       const z = position.getZ(i);

  //       if (isNaN(x) || isNaN(y) || isNaN(z)) {
  //         console.error('NaN detected in geometry positions:', { x, y, z, });
  //         position.setXYV(i, 0, 0, 0);
  //       }
  //     }

  //     object.geometry.computeBoundingBox();
  //     object.geometry.computeBoundingSphere();
  //   }
  // });

  return (
    <mesh>
      <hemisphereLight intensity={1.5} groundColor="black" />
      <pointLight intensity={5} />
      <spotLight 
        position={[-20, 15, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -2, -2.2] : [0, -2.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const canvasRef = useRef();
  const SCROLL_MULTIPLIER = 100;

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width:500px)');

    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);
  
  // Touch start handler
  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  }

  // Touch move handler
  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY;

    window.scrollBy(0, -deltaY * SCROLL_MULTIPLIER);

    setTouchStartY(touchY);
  }

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      ref={ canvasRef }
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}


export default ComputersCanvas;