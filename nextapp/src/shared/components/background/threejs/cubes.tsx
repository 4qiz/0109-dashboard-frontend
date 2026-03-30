"use client";

import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

extend({ UnrealBloomPass });

export const Cubes = () => {
  const meshRef = useRef(null);
  const count = 25000;
  const speedMult = 0.1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++)
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ),
      );
    return pos;
  }, []);

  // Material & Geom
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff }),
    [],
  );
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(
    () => ({ numCubes: 60, spread: 80, size: 10, speed: 0.3 }),
    [],
  ); // @ts-ignore
  const addControl = (id, l, min, max, val) => {
    // @ts-ignore
    return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = () => {};
  const annotate = () => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;
    // @ts-ignore
    if (material.uniforms && material.uniforms.uTime) {
      // @ts-ignore
      material.uniforms.uTime.value = time;
    }

    for (let i = 0; i < count; i++) {
      // USER CODE START
      const numCubesCtrl = addControl("numCubes", "Cube Count", 10, 200, 60);
      const spread = addControl("spread", "Swarm Spread", 20, 200, 80);
      const size = addControl("size", "Cube Size", 1, 30, 10);
      const speed = addControl("speed", "Float Speed", 0.0, 2.0, 0.3);

      const nCubes = Math.max(1, Math.floor(numCubesCtrl));
      const pPerCube = Math.floor(count / nCubes);
      const cIdx = Math.min(Math.floor(i / pPerCube), nCubes - 1);
      const localIdx = i - cIdx * pPerCube;

      const pPerEdge = Math.max(1, Math.floor(pPerCube / 12));
      const edgeIdx = Math.floor(localIdx / pPerEdge) % 12;
      const edgeT = (localIdx % pPerEdge) / pPerEdge;

      const axis = edgeIdx % 3;
      const o1 = Math.floor(edgeIdx / 3) % 2;
      const o2 = Math.floor(edgeIdx / 6) % 2;

      const u = edgeT * 2.0 - 1.0;
      const v = o1 * 2.0 - 1.0;
      const w = o2 * 2.0 - 1.0;

      let lx = 0,
        ly = 0,
        lz = 0;
      if (axis === 0) {
        lx = u;
        ly = v;
        lz = w;
      } else if (axis === 1) {
        lx = w;
        ly = u;
        lz = v;
      } else {
        lx = v;
        ly = w;
        lz = u;
      }

      lx *= size;
      ly *= size;
      lz *= size;

      const t = time * speed;
      const rotX = t * 0.5 + cIdx * 1.1;
      const rotY = t * 0.3 + cIdx * 1.3;
      const rotZ = t * 0.4 + cIdx * 1.7;

      const sx = Math.sin(rotX),
        cx = Math.cos(rotX);
      const sy = Math.sin(rotY),
        cy = Math.cos(rotY);
      const sz = Math.sin(rotZ),
        cz = Math.cos(rotZ);

      const y1 = ly * cx - lz * sx;
      const z1 = ly * sx + lz * cx;
      const x1 = lx * cy + z1 * sy;
      const z2 = -lx * sy + z1 * cy;
      const x2 = x1 * cz - y1 * sz;
      const y2 = x1 * sz + y1 * cz;

      const phi = Math.acos(1.0 - 2.0 * (cIdx / Math.max(1, nCubes - 1)));
      const theta = Math.PI * (1.0 + Math.sqrt(5.0)) * cIdx;

      let bx = spread * Math.sin(phi) * Math.cos(theta);
      let by = spread * Math.sin(phi) * Math.sin(theta);
      let bz = spread * Math.cos(phi);

      bx += Math.sin(t + cIdx) * (spread * 0.15);
      by += Math.cos(t * 0.8 + cIdx * 2.0) * (spread * 0.15);
      bz += Math.sin(t * 1.2 - cIdx) * (spread * 0.15);

      target.set(bx + x2, by + y2, bz + z2);

      const hue = cIdx / nCubes + t * 0.1;
      const edgeGlow = Math.sin(edgeT * Math.PI);
      color.setHSL(hue % 1.0, 0.8, 0.3 + 0.4 * edgeGlow);

      if (i === 0) {
        setInfo(
          // @ts-ignore
          "Drifting Tesseracts",
          "A volumetric swarm of wireframe cubes floating and rotating independently through space.",
        );
      }
      // USER CODE END

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix(); // @ts-ignore
      meshRef.current.setMatrixAt(i, dummy.matrix); // @ts-ignore
      meshRef.current.setColorAt(i, pColor);
    } // @ts-ignore
    meshRef.current.instanceMatrix.needsUpdate = true; // @ts-ignore
    if (meshRef.current.instanceColor)
      // @ts-ignore
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
};
