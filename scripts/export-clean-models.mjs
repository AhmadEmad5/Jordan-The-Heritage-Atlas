import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import fs from "fs";

async function createModels() {
  console.log("Building clean 3D models...");
  const exporter = new GLTFExporter();

  // Test building a coin mesh
  const geometry = new THREE.CylinderGeometry(1, 1, 0.12, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0xc59f52,
    metalness: 0.82,
    roughness: 0.35,
  });
  const mesh = new THREE.Mesh(geometry, material);

  exporter.parse(
    mesh,
    (gltf) => {
      const buffer = Buffer.from(gltf);
      fs.writeFileSync("public/models/test-coin.glb", buffer);
      console.log("Successfully exported test-coin.glb, size:", buffer.length);
    },
    (err) => console.error("Export error:", err),
    { binary: true }
  );
}

createModels();
