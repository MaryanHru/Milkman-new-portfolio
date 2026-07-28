"use client";

import { useEffect, useRef } from "react";

type Vertex = [number, number, number];
type Point = [number, number];
type Layer = "shell" | "face" | "feature";

type Face = {
  vertices: Vertex[];
  color: string;
  layer: Layer;
  order: number;
};

const outline: Point[] = [
  [-1.12, 1.18],
  [-0.58, 0.74],
  [-0.27, 0.94],
  [0, 1.16],
  [0.27, 0.94],
  [0.58, 0.74],
  [1.12, 1.18],
  [1.09, 0.2],
  [0.94, -0.58],
  [0.55, -0.98],
  [0, -1.3],
  [-0.55, -0.98],
  [-0.94, -0.58],
  [-1.09, 0.2],
];

const frontZ = 0.42;
const backZ = -0.42;
const facetZ = frontZ + 0.012;
const featureZ = frontZ + 0.09;

function polygon(
  points: Point[],
  z: number,
  color: string,
  layer: Layer,
  order: number,
): Face {
  return {
    vertices: points.map(([x, y]) => [x, y, z]),
    color,
    layer,
    order,
  };
}

function buildModel(blink: number): Face[] {
  const faces: Face[] = [];

  outline.forEach(([x1, y1], index) => {
    const [x2, y2] = outline[(index + 1) % outline.length];
    faces.push({
      vertices: [
        [x1, y1, backZ],
        [x2, y2, backZ],
        [x2, y2, frontZ],
        [x1, y1, frontZ],
      ],
      color: index < 7 ? "#4b167f" : index % 2 ? "#58208d" : "#35105f",
      layer: "shell",
      order: index,
    });
  });

  // One uninterrupted front silhouette. All facets sit on top of this base,
  // so antialiasing can never open transparent seams between them.
  faces.push(polygon(outline, frontZ, "#7b2ed0", "face", 0));

  const center: Point = [0, -0.08];
  const facetColors = [
    "#9b43ef", "#8333df", "#a047f2", "#7629c8", "#6b24b4", "#5b1f9c", "#6f28bf",
    "#5a1e99", "#6723ad", "#742ac0", "#8433d4", "#943de6", "#a149f1", "#913be0",
  ];

  outline.forEach((point, index) => {
    faces.push(
      polygon(
        [center, point, outline[(index + 1) % outline.length]],
        facetZ,
        facetColors[index],
        "face",
        10 + index,
      ),
    );
  });

  // Large planes keep the logo-like low-poly look without breaking the shell.
  faces.push(
    polygon([[-1.12, 1.18], [-0.58, 0.74], [-0.84, 0.56]], facetZ + 0.006, "#b053ff", "face", 30),
    polygon([[-1.12, 1.18], [-0.84, 0.56], [-0.9, 0.82]], facetZ + 0.01, "#41116f", "face", 31),
    polygon([[1.12, 1.18], [0.58, 0.74], [0.84, 0.56]], facetZ + 0.006, "#8e35e7", "face", 30),
    polygon([[1.12, 1.18], [0.84, 0.56], [0.9, 0.82]], facetZ + 0.01, "#35105f", "face", 31),
    polygon([[-0.27, 0.94], [0, 1.16], [0, -0.08]], facetZ + 0.008, "#a549f4", "face", 32),
    polygon([[0.27, 0.94], [0, 1.16], [0, -0.08]], facetZ + 0.008, "#5b1f9e", "face", 32),
  );

  const eyeScale = Math.max(0.045, blink);
  const eyePoints = (points: Point[], side: -1 | 1) =>
    points.map(([x, y]) => [x * side, -0.01 + (y + 0.01) * eyeScale] as Point);

  ([-1, 1] as const).forEach((side) => {
    faces.push(
      polygon(
        eyePoints([[0.29, 0.23], [0.57, 0.34], [0.8, 0.17], [0.67, -0.17], [0.35, -0.13]], side),
        featureZ,
        "#ffbd32",
        "feature",
        0,
      ),
      polygon(
        eyePoints([[0.36, 0.17], [0.57, 0.27], [0.72, 0.13], [0.63, -0.1], [0.41, -0.07]], side),
        featureZ + 0.035,
        "#120e18",
        "feature",
        1,
      ),
      polygon(
        eyePoints([[0.49, 0.13], [0.59, 0.17], [0.54, 0.02]], side),
        featureZ + 0.06,
        "#fffdf7",
        "feature",
        2,
      ),
    );
  });

  faces.push(
    polygon([[-0.42, -0.21], [0, -0.11], [0, -0.34], [-0.41, -0.44]], featureZ + 0.02, "#f5efe7", "feature", 3),
    polygon([[0.42, -0.21], [0, -0.11], [0, -0.34], [0.41, -0.44]], featureZ + 0.02, "#d2cac5", "feature", 3),
    polygon([[-0.17, -0.55], [0, -0.54], [0.17, -0.55], [0, -0.74]], featureZ + 0.075, "#30103e", "feature", 4),
    polygon([[-0.17, -0.55], [0, -0.54], [-0.06, -0.65]], featureZ + 0.09, "#531875", "feature", 5),
  );

  return faces;
}

function rotate([x, y, z]: Vertex, rotateX: number, rotateY: number): Vertex {
  const cosY = Math.cos(rotateY);
  const sinY = Math.sin(rotateY);
  const turnedX = x * cosY + z * sinY;
  const turnedZ = -x * sinY + z * cosY;
  const cosX = Math.cos(rotateX);
  const sinX = Math.sin(rotateX);

  return [
    turnedX,
    y * cosX - turnedZ * sinX,
    y * sinX + turnedZ * cosX,
  ];
}

function shade(hex: string, amount: number) {
  const raw = Number.parseInt(hex.slice(1), 16);
  const channel = (shift: number) =>
    Math.max(0, Math.min(255, ((raw >> shift) & 255) * amount)) | 0;
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

export default function Cat3DModel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest(".about-section");
    const context = canvas?.getContext("2d");
    if (!canvas || !section || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restingY = -0.11;
    let width = 1;
    let height = 1;
    let targetX = -0.025;
    let targetY = restingY;
    let currentX = targetX;
    let currentY = targetY;
    let frameId = 0;
    let watching = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const neutral = () => {
      targetX = -0.025;
      targetY = restingY;
      watching = false;
      canvas.classList.remove("is-watching");
    };

    const handlePointer = (event: PointerEvent) => {
      if (reducedMotion) return;
      const sectionBounds = section.getBoundingClientRect();
      const inWhiteSection =
        event.clientY >= Math.max(0, sectionBounds.top) &&
        event.clientY <= Math.min(window.innerHeight, sectionBounds.bottom);

      if (!inWhiteSection) {
        neutral();
        return;
      }

      const bounds = canvas.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const horizontal = (event.clientX - centerX) / Math.max(window.innerWidth * 0.42, 1);
      const vertical = (event.clientY - centerY) / Math.max(window.innerHeight * 0.36, 1);

      targetY = Math.max(-0.42, Math.min(0.42, horizontal * 0.4));
      // Positive X rotation points the face normal downward.
      targetX = Math.max(-0.38, Math.min(0.42, vertical * 0.38));
      watching = true;
      canvas.classList.add("is-watching");
    };

    const project = ([x, y, z]: Vertex): Point => {
      const camera = 4.5;
      const perspective = camera / (camera - z);
      const scale = Math.min(width, height) * 0.275;
      return [
        width / 2 + x * scale * perspective,
        height / 2 - y * scale * perspective,
      ];
    };

    const drawFace = (face: Face) => {
      const turned = face.vertices.map((vertex) => rotate(vertex, currentX, currentY));
      const points = turned.map(project);
      const depth = turned.reduce((sum, vertex) => sum + vertex[2], 0) / turned.length;
      const light = face.layer === "shell"
        ? Math.max(0.48, Math.min(0.86, 0.65 + depth * 0.12))
        : Math.max(0.84, Math.min(1.08, 0.95 + depth * 0.04));

      context.beginPath();
      points.forEach(([x, y], index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.fillStyle = shade(face.color, light);
      context.fill();
    };

    const drawLine = (vertices: Vertex[], color: string, lineWidth: number) => {
      const points = vertices.map((vertex) => project(rotate(vertex, currentX, currentY)));
      context.beginPath();
      points.forEach(([x, y], index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    };

    const render = (time: number) => {
      currentX += (targetX - currentX) * 0.095;
      currentY += (targetY - currentY) * 0.095;
      context.clearRect(0, 0, width, height);

      const cycle = (time % 4600) / 4600;
      const blink = cycle > 0.9 && cycle < 0.96
        ? Math.max(0.045, Math.abs(cycle - 0.93) / 0.03)
        : 1;
      const faces = buildModel(blink);
      const shells = faces
        .filter((face) => face.layer === "shell")
        .sort((a, b) => {
          const depth = (face: Face) =>
            face.vertices.reduce((sum, vertex) => sum + rotate(vertex, currentX, currentY)[2], 0) /
            face.vertices.length;
          return depth(a) - depth(b);
        });

      shells.forEach(drawFace);
      faces
        .filter((face) => face.layer === "face")
        .sort((a, b) => a.order - b.order)
        .forEach(drawFace);
      faces
        .filter((face) => face.layer === "feature")
        .sort((a, b) => a.order - b.order)
        .forEach(drawFace);

      const lineZ = featureZ + 0.025;
      drawLine([[0, -0.73, lineZ], [0, -0.83, lineZ], [-0.1, -0.92, lineZ], [-0.18, -0.87, lineZ]], "#35104e", Math.max(3, width * 0.01));
      drawLine([[0, -0.83, lineZ], [0.1, -0.92, lineZ], [0.18, -0.87, lineZ]], "#35104e", Math.max(3, width * 0.01));

      [-0.61, -0.72, -0.83].forEach((y, index) => {
        const endY = y - index * 0.055;
        drawLine([[-0.53, y, lineZ - 0.02], [-1.28, endY, lineZ - 0.08]], "#43136f", Math.max(2, width * 0.005));
        drawLine([[0.53, y, lineZ - 0.02], [1.28, endY, lineZ - 0.08]], "#43136f", Math.max(2, width * 0.005));
      });

      frameId = window.requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("blur", neutral);
    frameId = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("blur", neutral);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="cat-mesh-scene" aria-hidden="true">
      <i className="cat-mesh-shadow" />
      <canvas ref={canvasRef} />
    </div>
  );
}
