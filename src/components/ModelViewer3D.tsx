"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Rotate3d, Eye, RefreshCw, ZoomIn, ZoomOut, SunMedium, Sparkles } from "lucide-react";

interface ModelViewer3DProps {
  modelUrl: string;
  posterImage: string;
  alt: string;
  relicId?: string;
  className?: string;
}

export default function ModelViewer3D({
  modelUrl,
  posterImage,
  alt,
  relicId,
  className = "",
}: ModelViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [rakingLight, setRakingLight] = useState(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rakingLightRef = useRef<THREE.DirectionalLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    setLoading(true);
    setLoadError(false);

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(40, width / (height || 1), 0.1, 100);
    camera.position.set(0, 0, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Realistic IBL Room Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.6;
    controls.maxDistance = 5.2;
    controls.minDistance = 0.75;
    controlsRef.current = controls;

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Lighting (Museum Gallery Curatorial Lighting Setup)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    // Key Light (Warm golden direct light)
    const keyLight = new THREE.DirectionalLight(0xfff1de, 3.0);
    keyLight.position.set(3.2, 4.2, 3.6);
    keyLightRef.current = keyLight;
    scene.add(keyLight);

    // Fill Light (Soft cool contrast light)
    const fillLight = new THREE.DirectionalLight(0xdce7f5, 1.3);
    fillLight.position.set(-3.2, 0.8, -2.2);
    scene.add(fillLight);

    // Rim/Back Light (Golden specular highlights along edges)
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.2);
    rimLight.position.set(0, 3.0, -3.0);
    scene.add(rimLight);

    // Under-bounce Light (Simulates warm sand/pedestal bounce)
    const bounceLight = new THREE.PointLight(0xd97706, 1.1, 8);
    bounceLight.position.set(0, -2.2, 1.2);
    scene.add(bounceLight);

    // Archaeological Raking Light (Low angle side-light for micro-relief inspection)
    const rakingDirectional = new THREE.DirectionalLight(0xffecd1, 0.0);
    rakingDirectional.position.set(-4.5, 0.3, 1.0);
    rakingLightRef.current = rakingDirectional;
    scene.add(rakingDirectional);

    // Procedural Pedestal Ground Contact Shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
      grad.addColorStop(0.35, "rgba(0, 0, 0, 0.40)");
      grad.addColorStop(0.7, "rgba(0, 0, 0, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.92;
    scene.add(shadowMesh);

    const currentModel = new THREE.Group();
    modelRef.current = currentModel;
    scene.add(currentModel);

    const isCoin = relicId === "decapolis-coin" || modelUrl.includes("decapolis-coin");
    const isMosaic = relicId === "byzantine-mosaic" || modelUrl.includes("byzantine-mosaic");

    if (isCoin) {
      // =========================================================================
      // PROCEDURAL HIGH-RESOLUTION 3D ROMAN DECAPOLIS BRONZE MEDALLION
      // 1024x1024 crisp minted relief: Marcus Aurelius obverse & Tyche reverse!
      // =========================================================================
      const textureLoader = new THREE.TextureLoader();

      const faceTex = textureLoader.load("/images/artifacts/decapolis-coin-face.png");
      faceTex.colorSpace = THREE.SRGBColorSpace;
      faceTex.generateMipmaps = true;

      const bumpTex = textureLoader.load("/images/artifacts/decapolis-coin-bump.png");
      bumpTex.generateMipmaps = true;

      const backTex = textureLoader.load("/images/artifacts/decapolis-coin-back.png");
      backTex.colorSpace = THREE.SRGBColorSpace;
      backTex.generateMipmaps = true;

      const backBumpTex = textureLoader.load("/images/artifacts/decapolis-coin-back-bump.png");
      backBumpTex.generateMipmaps = true;

      // Authentic Roman coin geometry with hammered rim
      const coinRadius = 0.86;
      const coinThickness = 0.11;
      const segments = 96;
      const geom = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, segments, 10);

      // Subtle hand-hammered irregular edge
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        if (Math.abs(y) < coinThickness / 2) {
          const x = pos.getX(i);
          const z = pos.getZ(i);
          const angle = Math.atan2(z, x);
          const wobble = Math.sin(angle * 7) * 0.012 + Math.cos(angle * 13) * 0.007;
          pos.setX(i, x * (1 + wobble));
          pos.setZ(i, z * (1 + wobble));
        }
      }
      geom.computeVertexNormals();

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xa87e38,
        roughness: 0.44,
        metalness: 0.86,
        wireframe,
      });

      const frontMat = new THREE.MeshStandardMaterial({
        map: faceTex,
        bumpMap: bumpTex,
        bumpScale: 0.056,
        color: 0xdfb458,
        roughness: 0.35,
        metalness: 0.86,
        wireframe,
      });

      const backMat = new THREE.MeshStandardMaterial({
        map: backTex,
        bumpMap: backBumpTex,
        bumpScale: 0.052,
        color: 0xd6a94d,
        roughness: 0.37,
        metalness: 0.84,
        wireframe,
      });

      const coinMesh = new THREE.Mesh(geom, [rimMat, frontMat, backMat]);
      coinMesh.rotation.x = -Math.PI / 2; // Face front directly to camera
      coinMesh.castShadow = true;
      coinMesh.receiveShadow = true;

      currentModel.add(coinMesh);
      currentModel.rotation.set(0.12, 0.35, 0);
      setLoading(false);
    } else if (isMosaic) {
      // =========================================================================
      // PROCEDURAL HIGH-RESOLUTION 3D MADABA MOSAIC MAP STONE MEDALLION
      // 1024x1024 individual tesserae elevation, chiseled quarry stone perimeter!
      // =========================================================================
      const textureLoader = new THREE.TextureLoader();

      const mosaicTex = textureLoader.load("/images/artifacts/byzantine-mosaic-face.png");
      mosaicTex.colorSpace = THREE.SRGBColorSpace;
      mosaicTex.generateMipmaps = true;

      const mosaicBump = textureLoader.load("/images/artifacts/byzantine-mosaic-bump.png");
      mosaicBump.generateMipmaps = true;

      const mosaicBack = textureLoader.load("/images/artifacts/byzantine-mosaic-back.png");
      mosaicBack.colorSpace = THREE.SRGBColorSpace;
      mosaicBack.generateMipmaps = true;

      const slabRadius = 0.90;
      const slabThickness = 0.13;
      const segments = 96;
      const geom = new THREE.CylinderGeometry(slabRadius, slabRadius, slabThickness, segments, 10);

      // Organic chiseled quarry stone edge
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        if (Math.abs(y) < slabThickness / 2) {
          const x = pos.getX(i);
          const z = pos.getZ(i);
          const angle = Math.atan2(z, x);
          const chisel = Math.sin(angle * 11) * 0.015 + Math.cos(angle * 19) * 0.009;
          pos.setX(i, x * (1 + chisel));
          pos.setZ(i, z * (1 + chisel));
        }
      }
      geom.computeVertexNormals();

      const rimMat = new THREE.MeshStandardMaterial({
        color: 0xbaa88c,
        roughness: 0.95,
        metalness: 0.02,
        wireframe,
      });

      const frontMat = new THREE.MeshStandardMaterial({
        map: mosaicTex,
        bumpMap: mosaicBump,
        bumpScale: 0.068,
        roughness: 0.82,
        metalness: 0.04,
        wireframe,
      });

      const backMat = new THREE.MeshStandardMaterial({
        map: mosaicBack,
        roughness: 0.94,
        metalness: 0.02,
        wireframe,
      });

      const mosaicMesh = new THREE.Mesh(geom, [rimMat, frontMat, backMat]);
      mosaicMesh.rotation.x = -Math.PI / 2;
      mosaicMesh.castShadow = true;
      mosaicMesh.receiveShadow = true;

      currentModel.add(mosaicMesh);
      currentModel.rotation.set(0.12, 0.35, 0);
      setLoading(false);
    } else {
      // =========================================================================
      // GLB PBR MESH LOADER (NABATAEAN BOWL, AIN GHAZAL STATUE)
      // Material correction: dielectric non-metal ceramic/plaster tuning!
      // =========================================================================
      const loader = new GLTFLoader();

      loader.load(
        modelUrl,
        (gltf) => {
          const gltfScene = gltf.scene;

          // Auto-center and normalize scale
          const box = new THREE.Box3().setFromObject(gltfScene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 1.48 / maxDim;

          gltfScene.scale.setScalar(scale);
          gltfScene.position.x = -center.x * scale;
          gltfScene.position.y = -center.y * scale;
          gltfScene.position.z = -center.z * scale;

          // Fine material calibration for museum lighting
          const isBowl = relicId?.includes("bowl") || modelUrl.includes("bowl");
          const isStatue = relicId?.includes("statue") || modelUrl.includes("statue");

          gltfScene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.wireframe = wireframe;

                // Essential fix: trimesh exports default metallicFactor=1.0.
                // Ancient pottery and lime plaster are dielectric (metalness ~ 0).
                if (isBowl) {
                  mat.metalness = 0.04;
                  mat.roughness = 0.78;
                } else if (isStatue) {
                  mat.metalness = 0.03;
                  mat.roughness = 0.88;
                } else {
                  mat.metalness = Math.min(0.2, mat.metalness ?? 0.1);
                  mat.roughness = Math.max(0.4, mat.roughness ?? 0.7);
                }

                if (mat.map) {
                  mat.map.colorSpace = THREE.SRGBColorSpace;
                }
              }
            }
          });

          currentModel.add(gltfScene);
          // Initial curatorial angle
          currentModel.rotation.set(0.12, 0.35, 0);
          setLoading(false);
        },
        undefined,
        (err) => {
          console.error("Failed to load 3D GLB:", err);
          setLoadError(true);
          setLoading(false);
        }
      );
    }

    // Animation Loop with viewport and visibility culling
    let animId: number | null = null;
    let isIntersecting = true;
    let isTabVisible = !document.hidden;

    const startLoop = () => {
      if (animId === null && isIntersecting && isTabVisible) {
        animId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const animate = () => {
      if (!isIntersecting || !isTabVisible) {
        stopLoop();
        return;
      }
      animId = requestAnimationFrame(animate);
      controls.autoRotate = autoRotate;
      controls.update();
      renderer.render(scene, camera);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry?.isIntersecting ?? false;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    startLoop();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopLoop();
      controls.dispose();
      renderer.dispose();
      pmremGenerator.dispose();
      roomEnv.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, relicId]);

  // Handle wireframe dynamically
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat && "wireframe" in mat) {
                (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
              }
            });
          } else if (mesh.material && "wireframe" in mesh.material) {
            (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
          }
        }
      });
    }
  }, [wireframe]);

  // Handle archaeological raking light toggle dynamically
  useEffect(() => {
    if (rakingLightRef.current && keyLightRef.current) {
      if (rakingLight) {
        // Dramatic low side angle raking beam
        rakingLightRef.current.intensity = 4.2;
        keyLightRef.current.intensity = 1.0;
      } else {
        // Standard balanced museum lighting
        rakingLightRef.current.intensity = 0.0;
        keyLightRef.current.intensity = 3.0;
      }
    }
  }, [rakingLight]);

  const zoomIn = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      const dir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(dir);
      cameraRef.current.position.addScaledVector(dir, 0.4);
      controlsRef.current.update();
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      const dir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(dir);
      cameraRef.current.position.addScaledVector(dir, -0.4);
      controlsRef.current.update();
    }
  }, []);

  const resetView = useCallback(() => {
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.reset();
      cameraRef.current.position.set(0, 0, 3.2);
      if (modelRef.current) {
        modelRef.current.rotation.set(0.12, 0.35, 0);
      }
    }
  }, []);

  return (
    <div
      className={`relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#18130e]/95 via-[#0d0a08]/95 to-[#060504] flex items-center justify-center select-none shadow-2xl ${className}`}
    >
      {/* 3D Canvas Target */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {loading && !loadError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-20 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mb-3" />
          <span className="text-xs uppercase tracking-widest text-amber-200 font-mono">
            Rendering Ultra-HD 3D Mesh...
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {loadError && (
        <div className="absolute inset-0 z-10">
          <img src={posterImage} alt={alt} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-lg bg-black/80 text-center text-xs text-amber-200/90 font-mono">
            3D viewer fallback: displaying high-res photography
          </div>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      {!loading && !loadError && (
        <>
          {/* Top Badge: 3D Interactive Mode */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[11px] font-mono text-amber-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D SPATIAL RELIC</span>
          </div>

          {/* Bottom Left: Touch / Mouse guidance */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/5 text-[10px] text-white/70 font-mono pointer-events-none">
            <Rotate3d size={12} className="text-amber-400" />
            <span>Orbit: Drag · Zoom: Scroll / Buttons</span>
          </div>

          {/* Bottom Right: Quick Tool Bar */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1.5 rounded-xl border border-amber-400/20 shadow-xl">
            {/* Auto-rotate toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1 ${
                autoRotate
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-white/60 hover:text-white"
              }`}
              title={autoRotate ? "Pause Auto-Orbit" : "Resume Auto-Orbit"}
            >
              <Rotate3d
                size={14}
                className={autoRotate ? "animate-spin" : ""}
                style={{ animationDuration: "6s" }}
              />
            </button>

            {/* Raking Light Inspection Mode */}
            <button
              type="button"
              onClick={() => setRakingLight(!rakingLight)}
              className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1 ${
                rakingLight
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
              title={rakingLight ? "Curatorial Balanced Light" : "Archaeological Raking Light (Relief Inspection)"}
            >
              <SunMedium size={14} />
            </button>

            {/* Wireframe toggle */}
            <button
              type="button"
              onClick={() => setWireframe(!wireframe)}
              className={`p-2 rounded-lg transition-colors text-xs flex items-center gap-1 ${
                wireframe
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-white/60 hover:text-white"
              }`}
              title={wireframe ? "Solid Mesh" : "Wireframe Geometry"}
            >
              <Eye size={14} />
            </button>

            {/* Zoom In */}
            <button
              type="button"
              onClick={zoomIn}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={zoomOut}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>

            {/* Reset Camera view */}
            <button
              type="button"
              onClick={resetView}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset Viewpoint"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
