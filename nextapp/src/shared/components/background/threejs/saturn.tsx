"use client";
import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

// @ts-nocheck

extend({ UnrealBloomPass });

export const Saturn = () => {
  const meshRef = useRef(null);
  const count = 20000;
  const speedMult = 1;
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
    () => ({ orbSpeed: 0.35, planetSize: 18, ringSpread: 6, trailLen: 2 }),
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
      const orbSpeed = addControl("orbSpeed", "Orbit Speed", 0.05, 2.0, 0.35);
      const planetSize = addControl("planetSize", "Planet Size", 5, 40, 18);
      const ringSpread = addControl("ringSpread", "Ring Spread", 1, 15, 6);
      const trailLen = addControl("trailLen", "Trail Length", 0.5, 4.0, 2.0);

      const norm = i / count;
      const planetCount = 0.35;
      const atmosphereCount = 0.08;
      const ringCount = 0.18;
      const satelliteCount = 0.04;
      const trailCount = 0.12;
      const starCount =
        1.0 -
        planetCount -
        atmosphereCount -
        ringCount -
        satelliteCount -
        trailCount;

      const planetEnd = planetCount;
      const atmosphereEnd = planetEnd + atmosphereCount;
      const ringEnd = atmosphereEnd + ringCount;
      const satelliteEnd = ringEnd + satelliteCount;
      const trailEnd = satelliteEnd + trailCount;

      if (norm < planetEnd) {
        const localNorm = norm / planetEnd;
        const golden = 2.399963229728653;
        const idx = localNorm * planetEnd * count;
        const theta = golden * idx;
        const phi = Math.acos(1.0 - 2.0 * localNorm);
        const jitter = 0.97 + 0.06 * Math.sin(idx * 13.7 + time * 0.3);
        const r = planetSize * jitter;
        const sp = Math.sin(phi);
        const x = r * sp * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * sp * Math.sin(theta);
        target.set(x, y, z);
        const depth = 0.35 + 0.15 * (y / planetSize);
        const hue = 0.58 + 0.06 * Math.sin(phi * 3.0 + theta * 0.5);
        color.setHSL(hue, 0.45, depth);
      } else if (norm < atmosphereEnd) {
        const localNorm = (norm - planetEnd) / atmosphereCount;
        const golden = 2.399963229728653;
        const idx = localNorm * atmosphereCount * count;
        const theta = golden * idx + time * 0.02;
        const phi = Math.acos(1.0 - 2.0 * localNorm);
        const breathe = 1.0 + 0.04 * Math.sin(time * 0.8 + localNorm * 6.28);
        const r = (planetSize + 1.5 + localNorm * 4.5) * breathe;
        const sp = Math.sin(phi);
        const x = r * sp * Math.cos(theta);
        const y = r * Math.cos(phi);
        const z = r * sp * Math.sin(theta);
        target.set(x, y, z);
        const glow = 0.25 + 0.2 * (1.0 - localNorm);
        color.setHSL(0.57, 0.6, glow);
      } else if (norm < ringEnd) {
        const localNorm = (norm - atmosphereEnd) / ringCount;
        const angle =
          localNorm * 6.283185307 * 3.0 + Math.sin(localNorm * 50.0) * 0.15;
        const ringR = planetSize + 8.0 + localNorm * ringSpread * 3.0;
        const wobble = 0.6 * Math.sin(localNorm * 80.0 + time * 0.15);
        const x = ringR * Math.cos(angle + time * 0.01);
        const z = ringR * Math.sin(angle + time * 0.01);
        const y = wobble + 0.3 * Math.sin(localNorm * 200.0);
        target.set(x, y * 0.5, z);
        const rHue = 0.08 + 0.04 * Math.sin(localNorm * 30.0);
        const rLight = 0.3 + 0.15 * Math.sin(localNorm * 60.0 + time * 0.2);
        color.setHSL(rHue, 0.35, rLight);
      } else if (norm < satelliteEnd) {
        const localNorm = (norm - ringEnd) / satelliteCount;
        const orbAngle = time * orbSpeed;
        const semiMajor = planetSize + 30.0;
        const semiMinor = planetSize + 22.0;
        const satX = semiMajor * Math.cos(orbAngle);
        const satZ = semiMinor * Math.sin(orbAngle);
        const satY = 5.0 * Math.sin(orbAngle * 0.5);
        const spread = 1.2;
        const golden = 2.399963229728653;
        const idx = localNorm * satelliteCount * count;
        const sTheta = golden * idx;
        const sPhi = Math.acos(1.0 - 2.0 * localNorm);
        const ssp = Math.sin(sPhi);
        const ox = spread * ssp * Math.cos(sTheta);
        const oy = spread * Math.cos(sPhi);
        const oz = spread * ssp * Math.sin(sTheta);
        const pulse = 0.85 + 0.15 * Math.sin(time * 4.0 + localNorm * 12.0);
        target.set(satX + ox * pulse, satY + oy * pulse, satZ + oz * pulse);
        const sLight = 0.55 + 0.25 * pulse;
        color.setHSL(0.12, 0.7, sLight);
      } else if (norm < trailEnd) {
        const localNorm = (norm - satelliteEnd) / (trailEnd - satelliteEnd);
        const orbAngle = time * orbSpeed;
        const semiMajor = planetSize + 30.0;
        const semiMinor = planetSize + 22.0;
        const trailPhase = orbAngle - localNorm * trailLen;
        const fadeX = semiMajor * Math.cos(trailPhase);
        const fadeZ = semiMinor * Math.sin(trailPhase);
        const fadeY = 5.0 * Math.sin(trailPhase * 0.5);
        const scatter = localNorm * 1.8;
        const hash = Math.sin(localNorm * 347.77) * 43758.5453;
        const fx = scatter * (Math.sin(hash) - 0.5);
        const fy = scatter * (Math.cos(hash * 1.3) - 0.5);
        const fz = scatter * (Math.sin(hash * 2.1) - 0.5);
        target.set(fadeX + fx, fadeY + fy, fadeZ + fz);
        const fadeBright = 0.45 * (1.0 - localNorm);
        color.setHSL(0.1, 0.5 * (1.0 - localNorm), Math.max(fadeBright, 0.03));
      } else {
        const localNorm = (norm - trailEnd) / (1.0 - trailEnd);
        const hash1 = Math.sin(localNorm * 12345.6789) * 43758.5453;
        const hash2 = Math.sin(localNorm * 67890.1234) * 23421.6312;
        const hash3 = Math.sin(localNorm * 11111.1111) * 31415.9265;
        const sx = (hash1 - Math.floor(hash1) - 0.5) * 300.0;
        const sy = (hash2 - Math.floor(hash2) - 0.5) * 300.0;
        const sz = (hash3 - Math.floor(hash3) - 0.5) * 300.0;
        target.set(sx, sy, sz);
        const twinkle =
          0.15 +
          0.35 *
            Math.abs(
              Math.sin(time * (0.5 + localNorm * 2.0) + localNorm * 100.0),
            );
        color.setHSL(0.0, 0.0, twinkle);
      }

      if (i === 0) {
        setInfo(
          // @ts-ignore
          "Orbital Vista",
          "A satellite traces an elliptical orbit around a dense particle planet, trailing luminous debris through rings of ancient dust and distant starfields.",
        );
        const orbAngle = time * orbSpeed;
        const semiMajor = planetSize + 30.0;
        const semiMinor = planetSize + 22.0;
        const labX = semiMajor * Math.cos(orbAngle);
        const labZ = semiMinor * Math.sin(orbAngle);
        const labY = 5.0 * Math.sin(orbAngle * 0.5) + 3.5; // @ts-ignore
        annotate("sat", new THREE.Vector3(labX, labY, labZ), "Satellite");
        annotate(
          // @ts-ignore
          "planet",
          new THREE.Vector3(0, planetSize + 4, 0),
          "Planet Core",
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
