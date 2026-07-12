"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface CropArea {
  cropLeft: number;
  cropTop: number;
  cropWidth: number;
  cropHeight: number;
}

interface CropEditorProps {
  imageUrl: string;
  onCropChange: (area: CropArea) => void;
}

type AspectPreset = "free" | "1:1" | "16:9" | "4:3" | "3:2";

const aspectValues: Record<Exclude<AspectPreset, "free">, number> = {
  "1:1": 1,
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "3:2": 3 / 2,
};

export function CropEditor({ imageUrl, onCropChange }: CropEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [display, setDisplay] = useState({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [aspect, setAspect] = useState<AspectPreset>("free");
  const [dragMode, setDragMode] = useState<"move" | "create" | null>(null);
  const dragStart = useRef({ x: 0, y: 0, cropX: 0, cropY: 0, cropW: 0, cropH: 0 });

  const scale = natural.w > 0 ? display.w / natural.w : 1;

  const emitCrop = useCallback(
    (x: number, y: number, w: number, h: number) => {
      if (natural.w === 0 || natural.h === 0) return;
      const cropLeft = Math.round(Math.max(0, x));
      const cropTop = Math.round(Math.max(0, y));
      const cropWidth = Math.round(Math.min(w, natural.w - cropLeft));
      const cropHeight = Math.round(Math.min(h, natural.h - cropTop));
      if (cropWidth < 1 || cropHeight < 1) return;
      onCropChange({ cropLeft, cropTop, cropWidth, cropHeight });
    },
    [natural.w, natural.h, onCropChange]
  );

  const initCrop = useCallback(
    (nw: number, nh: number) => {
      const margin = 0.1;
      const x = nw * margin;
      const y = nh * margin;
      const w = nw * (1 - margin * 2);
      const h = nh * (1 - margin * 2);
      setCrop({ x, y, w, h });
      emitCrop(x, y, w, h);
    },
    [emitCrop]
  );

  const updateDisplayMetrics = useCallback(() => {
    const container = containerRef.current;
    if (!container || natural.w === 0) return;
    const cw = container.clientWidth;
    const ch = Math.min(420, container.clientHeight || 420);
    const imageRatio = natural.w / natural.h;
    const containerRatio = cw / ch;
    let dw: number, dh: number;
    if (imageRatio > containerRatio) {
      dw = cw;
      dh = cw / imageRatio;
    } else {
      dh = ch;
      dw = ch * imageRatio;
    }
    setDisplay({
      w: dw,
      h: dh,
      offsetX: (cw - dw) / 2,
      offsetY: (ch - dh) / 2,
    });
  }, [natural.w, natural.h]);

  useEffect(() => {
    updateDisplayMetrics();
    window.addEventListener("resize", updateDisplayMetrics);
    return () => window.removeEventListener("resize", updateDisplayMetrics);
  }, [updateDisplayMetrics]);

  const clampCrop = (x: number, y: number, w: number, h: number) => {
    let nw = Math.max(20, Math.min(w, natural.w));
    let nh = Math.max(20, Math.min(h, natural.h));

    if (aspect !== "free") {
      const ratio = aspectValues[aspect];
      if (nw / nh > ratio) nw = nh * ratio;
      else nh = nw / ratio;
    }

    const nx = Math.max(0, Math.min(x, natural.w - nw));
    const ny = Math.max(0, Math.min(y, natural.h - nh));

    if (nx + nw > natural.w) nw = natural.w - nx;
    if (ny + nh > natural.h) nh = natural.h - ny;

    return { x: nx, y: ny, w: nw, h: nh };
  };

  const toImageCoords = (clientX: number, clientY: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = (clientX - rect.left - display.offsetX) / scale;
    const y = (clientY - rect.top - display.offsetY) / scale;
    return { x, y };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (natural.w === 0) return;
    e.preventDefault();
    const target = e.target as HTMLElement;
    const isHandle = target.dataset.handle;
    const coords = toImageCoords(e.clientX, e.clientY);

    if (isHandle === "move" && crop.w > 0) {
      setDragMode("move");
      dragStart.current = {
        x: coords.x,
        y: coords.y,
        cropX: crop.x,
        cropY: crop.y,
        cropW: crop.w,
        cropH: crop.h,
      };
    } else {
      setDragMode("create");
      dragStart.current = {
        x: coords.x,
        y: coords.y,
        cropX: coords.x,
        cropY: coords.y,
        cropW: 0,
        cropH: 0,
      };
    }
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragMode) return;
    const coords = toImageCoords(e.clientX, e.clientY);

    if (dragMode === "move") {
      const dx = coords.x - dragStart.current.x;
      const dy = coords.y - dragStart.current.y;
      const next = clampCrop(
        dragStart.current.cropX + dx,
        dragStart.current.cropY + dy,
        dragStart.current.cropW,
        dragStart.current.cropH
      );
      setCrop(next);
      emitCrop(next.x, next.y, next.w, next.h);
    } else {
      const x1 = dragStart.current.x;
      const y1 = dragStart.current.y;
      const x2 = coords.x;
      const y2 = coords.y;
      const nx = Math.min(x1, x2);
      const ny = Math.min(y1, y2);
      const nw = Math.abs(x2 - x1);
      const nh = Math.abs(y2 - y1);
      const next = clampCrop(nx, ny, nw, nh);
      setCrop(next);
      emitCrop(next.x, next.y, next.w, next.h);
    }
  };

  const onPointerUp = () => setDragMode(null);

  const applyAspect = (preset: AspectPreset) => {
    setAspect(preset);
    if (preset === "free" || natural.w === 0) return;
    const ratio = aspectValues[preset];
    const cx = crop.x + crop.w / 2;
    const cy = crop.y + crop.h / 2;
    let nw = crop.w;
    let nh = nw / ratio;
    if (nh > natural.h * 0.9) {
      nh = natural.h * 0.9;
      nw = nh * ratio;
    }
    const next = clampCrop(cx - nw / 2, cy - nh / 2, nw, nh);
    setCrop(next);
    emitCrop(next.x, next.y, next.w, next.h);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["free", "1:1", "16:9", "4:3", "3:2"] as AspectPreset[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => applyAspect(p)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              aspect === p
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {p === "free" ? "Free" : p}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto h-[420px] w-full max-w-2xl select-none overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="Interactive crop preview — drag to select the area to keep"
          className="pointer-events-none absolute"
          style={{
            width: display.w,
            height: display.h,
            left: display.offsetX,
            top: display.offsetY,
          }}
          onLoad={(e) => {
            const img = e.currentTarget;
            setNatural({ w: img.naturalWidth, h: img.naturalHeight });
            initCrop(img.naturalWidth, img.naturalHeight);
          }}
          draggable={false}
        />

        {crop.w > 0 && (
          <>
            <div
              className="pointer-events-none absolute bg-black/50"
              style={{
                left: display.offsetX,
                top: display.offsetY,
                width: display.w,
                height: crop.y * scale,
              }}
            />
            <div
              className="pointer-events-none absolute bg-black/50"
              style={{
                left: display.offsetX,
                top: display.offsetY + (crop.y + crop.h) * scale,
                width: display.w,
                height: display.h - (crop.y + crop.h) * scale,
              }}
            />
            <div
              className="pointer-events-none absolute bg-black/50"
              style={{
                left: display.offsetX,
                top: display.offsetY + crop.y * scale,
                width: crop.x * scale,
                height: crop.h * scale,
              }}
            />
            <div
              className="pointer-events-none absolute bg-black/50"
              style={{
                left: display.offsetX + (crop.x + crop.w) * scale,
                top: display.offsetY + crop.y * scale,
                width: display.w - (crop.x + crop.w) * scale,
                height: crop.h * scale,
              }}
            />
            <div
              data-handle="move"
              className="absolute cursor-move border-2 border-blue-500 bg-blue-500/10"
              style={{
                left: display.offsetX + crop.x * scale,
                top: display.offsetY + crop.y * scale,
                width: crop.w * scale,
                height: crop.h * scale,
              }}
            >
              <span className="absolute -top-7 left-0 rounded bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                {Math.round(crop.w)} × {Math.round(crop.h)} px
              </span>
            </div>
          </>
        )}
      </div>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
        Drag on the image to select a crop area, or drag the selection to reposition it.
      </p>
    </div>
  );
}
