import * as THREE from "./vendor/three/build/three.module.js";
import { repairGeometry } from "./repair-geometry.js";

export const wedgeDefaults = {
  baseLength: 20,
  height: 3.5,
  tipHeight: 0.7,
  extrusionLength: 190,
};

export function buildWedgeSolid({
  baseLength = wedgeDefaults.baseLength,
  height = wedgeDefaults.height,
  tipHeight = wedgeDefaults.tipHeight,
  extrusionLength = wedgeDefaults.extrusionLength,
} = {}) {
  const base = Math.max(baseLength, 1);
  const tall = Math.max(height, 0.5);
  const blunt = Math.max(Math.min(tipHeight, tall), 0);
  const depth = Math.max(extrusionLength, 0.5);
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(base, 0);
  shape.lineTo(base, blunt);
  shape.lineTo(0, tall);
  shape.lineTo(0, 0);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false,
  });
  geometry.center();
  geometry.computeBoundingBox();
  geometry.computeVertexNormals();
  return repairGeometry(geometry);
}
