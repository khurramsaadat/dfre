"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from 'react';

const TOGGLE_SPEED = 500;
const DISPLAY_WIDTH = 1280;
const DISPLAY_HEIGHT = 720;

interface PanelData {
  oldImage: string | null;
  newImage: string | null;
  oldSize: { w: number; h: number } | null;
  newSize: { w: number; h: number } | null;
}

const emptyPanel: PanelData = {
  oldImage: null,
  newImage: null,
  oldSize: null,
  newSize: null,
};

export default function ArtworkQCLayout() {
  const [enPanel, setEnPanel] = useState<PanelData>({ ...emptyPanel });
  const [arPanel, setArPanel] = useState<PanelData>({ ...emptyPanel });

  const [enToggling, setEnToggling] = useState(false);
  const [arToggling, setArToggling] = useState(false);
  const [enShowNew, setEnShowNew] = useState(false);
  const [arShowNew, setArShowNew] = useState(false);

  const [enDragOver, setEnDragOver] = useState(false);
  const [arDragOver, setArDragOver] = useState(false);

  const enOldRef = useRef<HTMLInputElement>(null);
  const enNewRef = useRef<HTMLInputElement>(null);
  const arOldRef = useRef<HTMLInputElement>(null);
  const arNewRef = useRef<HTMLInputElement>(null);

  // Dropzone click refs - open file browser on click
  const enDropzoneRef = useRef<HTMLInputElement>(null);
  const arDropzoneRef = useRef<HTMLInputElement>(null);

  // English toggle interval
  useEffect(() => {
    if (!enToggling) return;
    const id = setInterval(() => setEnShowNew(prev => !prev), TOGGLE_SPEED);
    return () => clearInterval(id);
  }, [enToggling]);

  // Arabic toggle interval
  useEffect(() => {
    if (!arToggling) return;
    const id = setInterval(() => setArShowNew(prev => !prev), TOGGLE_SPEED);
    return () => clearInterval(id);
  }, [arToggling]);

  const loadImage = (file: File): Promise<{ url: string; w: number; h: number }> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () =>
          resolve({ url: e.target?.result as string, w: img.width, h: img.height });
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFile = async (file: File, panel: 'en' | 'ar', slot: 'old' | 'new') => {
    if (!file.type.startsWith('image/')) return;
    const { url, w, h } = await loadImage(file);
    const setter = panel === 'en' ? setEnPanel : setArPanel;
    setter(prev => ({
      ...prev,
      ...(slot === 'old'
        ? { oldImage: url, oldSize: { w, h } }
        : { newImage: url, newSize: { w, h } }),
    }));
  };

  // Auto-detect slot on drop: first drop = old, second = new
  const handleDrop = async (e: React.DragEvent, panel: 'en' | 'ar') => {
    e.preventDefault();
    e.stopPropagation();
    if (panel === 'en') setEnDragOver(false);
    else setArDragOver(false);

    const file = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
    if (!file) return;

    const data = panel === 'en' ? enPanel : arPanel;
    const slot = !data.oldImage ? 'old' : 'new';
    await handleFile(file, panel, slot);
  };

  // Click on dropzone opens file browser (auto-detect slot)
  const handleDropzoneClick = (panel: 'en' | 'ar') => {
    const ref = panel === 'en' ? enDropzoneRef : arDropzoneRef;
    ref.current?.click();
  };

  const handleDropzoneFileChange = async (e: React.ChangeEvent<HTMLInputElement>, panel: 'en' | 'ar') => {
    const f = e.target.files?.[0];
    if (!f) return;
    const data = panel === 'en' ? enPanel : arPanel;
    const slot = !data.oldImage ? 'old' : 'new';
    await handleFile(f, panel, slot);
    e.target.value = '';
  };

  const resetPanel = (panel: 'en' | 'ar') => {
    const setter = panel === 'en' ? setEnPanel : setArPanel;
    setter({ ...emptyPanel });
    if (panel === 'en') {
      setEnToggling(false);
      setEnShowNew(false);
    } else {
      setArToggling(false);
      setArShowNew(false);
    }
  };

  const toggleFlash = (panel: 'en' | 'ar') => {
    if (panel === 'en') {
      if (enToggling) setEnShowNew(false);
      setEnToggling(prev => !prev);
    } else {
      if (arToggling) setArShowNew(false);
      setArToggling(prev => !prev);
    }
  };

  const renderPanel = (
    panel: 'en' | 'ar',
    title: string,
    subtitle: string,
    data: PanelData,
    isToggling: boolean,
    isShowingNew: boolean,
    isDragOver: boolean,
    oldRef: React.RefObject<HTMLInputElement | null>,
    newRef: React.RefObject<HTMLInputElement | null>,
    dropzoneRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    const hasBoth = !!(data.oldImage && data.newImage);
    const hasAny = !!(data.oldImage || data.newImage);
    const currentSize = isShowingNew ? data.newSize : data.oldSize;

    return (
      <div style={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Panel title */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 700,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}>
            {title}
            <span style={{ color: '#64748b', fontSize: 13, fontWeight: 400 }}>{subtitle}</span>
          </h2>
        </div>

        {/* Display area - white background like dm6assets, clickable */}
        <div
          style={{
            width: '100%',
            aspectRatio: `${DISPLAY_WIDTH} / ${DISPLAY_HEIGHT}`,
            background: isDragOver ? '#e0e7ff' : '#ffffff',
            border: isDragOver
              ? '2px dashed #3b82f6'
              : isToggling
                ? '2px solid #f59e0b'
                : '2px solid #ccc',
            borderRadius: 0,
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'border-color 0.3s, background 0.3s',
          }}
          onClick={() => handleDropzoneClick(panel)}
          onDragEnter={(e) => {
            e.preventDefault();
            if (panel === 'en') setEnDragOver(true);
            else setArDragOver(true);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => {
            e.preventDefault();
            if (panel === 'en') setEnDragOver(false);
            else setArDragOver(false);
          }}
          onDrop={(e) => handleDrop(e, panel)}
        >
          {/* Old image layer */}
          {data.oldImage && (
            <img
              src={data.oldImage}
              alt="Old artwork"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: !isShowingNew ? 1 : 0,
                transition: isToggling ? 'none' : 'opacity 0.3s',
              }}
            />
          )}

          {/* New image layer */}
          {data.newImage && (
            <img
              src={data.newImage}
              alt="New artwork"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: isShowingNew ? 1 : 0,
                transition: isToggling ? 'none' : 'opacity 0.3s',
              }}
            />
          )}

          {/* Empty state placeholder */}
          {!data.oldImage && !data.newImage && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
            }}>
              <svg width={48} height={48} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginBottom: 12, opacity: 0.4 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#6b7280' }}>Drag & Drop</div>
              <div style={{ fontSize: 13, marginTop: 4, color: '#9ca3af' }}>or Click to Import</div>
            </div>
          )}

          {/* Hover overlay for images - show "Click to Change" */}
          {hasAny && !isToggling && (
            <div className="group" style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.9)',
                padding: '6px 16px',
                borderRadius: 8,
                opacity: 0,
                transition: 'opacity 0.3s',
                pointerEvents: 'none',
              }}
              className="dropzone-hover-label"
              >
                <span style={{ color: '#374151', fontWeight: 600, fontSize: 13 }}>Click to Change</span>
              </div>
            </div>
          )}

          {/* Hidden file input for dropzone click */}
          <input
            ref={dropzoneRef}
            type="file"
            accept="image/*"
            className="hidden"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleDropzoneFileChange(e, panel)}
          />
        </div>

        {/* Info row below dropzone: dimensions + OLD/NEW badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 24,
          padding: '0 2px',
        }}>
          {/* Dimensions - below dropzone */}
          <div style={{ fontSize: 11, color: '#64748b' }}>
            {hasAny && currentSize
              ? `${currentSize.w} x ${currentSize.h}px`
              : `${DISPLAY_WIDTH} x ${DISPLAY_HEIGHT}px`
            }
          </div>

          {/* OLD / NEW badge - outside dropzone */}
          {isToggling && (
            <div style={{
              background: isShowingNew ? '#3b82f6' : '#f59e0b',
              color: '#fff',
              padding: '3px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}>
              {isShowingNew ? 'NEW' : 'OLD'}
            </div>
          )}
          {!isToggling && hasAny && (
            <div style={{
              background: '#334155',
              color: '#94a3b8',
              padding: '3px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
            }}>
              {data.oldImage && !data.newImage ? 'OLD' : data.newImage && !data.oldImage ? 'NEW' : 'OLD'}
            </div>
          )}
        </div>

        {/* Control buttons + load status directly under each button */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Old Artwork column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => oldRef.current?.click()}
              style={btnStyle('#3b82f6')}
              onMouseEnter={btnHoverIn}
              onMouseLeave={btnHoverOut}
              title="Load the old/original artwork"
            >
              <UploadIcon /> Old Artwork
            </button>
            <span style={{ fontSize: 11, color: data.oldImage ? '#22c55e' : '#64748b' }}>
              {data.oldImage ? '● Old loaded' : '○ No old artwork'}
            </span>
            <input
              ref={oldRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) await handleFile(f, panel, 'old');
                e.target.value = '';
              }}
            />
          </div>

          {/* New Artwork column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => newRef.current?.click()}
              style={btnStyle('#8b5cf6')}
              onMouseEnter={btnHoverIn}
              onMouseLeave={btnHoverOut}
              title="Load the new/updated artwork"
            >
              <UploadIcon /> New Artwork
            </button>
            <span style={{ fontSize: 11, color: data.newImage ? '#22c55e' : '#64748b' }}>
              {data.newImage ? '● New loaded' : '○ No new artwork'}
            </span>
            <input
              ref={newRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) await handleFile(f, panel, 'new');
                e.target.value = '';
              }}
            />
          </div>

          {/* Compare toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => toggleFlash(panel)}
              disabled={!hasBoth}
              style={{
                ...btnStyle(isToggling ? '#ef4444' : '#f59e0b'),
                opacity: hasBoth ? 1 : 0.4,
                cursor: hasBoth ? 'pointer' : 'not-allowed',
              }}
              title={hasBoth
                ? (isToggling ? 'Stop flashing' : 'Start flashing between old and new at 500ms')
                : 'Load both old and new artworks first'}
            >
              {isToggling ? (
                <><PauseIcon /> Stop</>
              ) : (
                <><PlayIcon /> Compare</>
              )}
            </button>
            <span style={{ fontSize: 11, color: '#475569', visibility: 'hidden' }}>spacer</span>
          </div>

          {/* Reset */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button
              onClick={() => resetPanel(panel)}
              disabled={!hasAny}
              style={{
                ...btnStyle('#475569'),
                opacity: hasAny ? 1 : 0.4,
                cursor: hasAny ? 'pointer' : 'not-allowed',
              }}
              title="Clear both old and new images"
            >
              <ResetIcon /> Reset
            </button>
            <span style={{ fontSize: 11, color: '#475569', visibility: 'hidden' }}>spacer</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      padding: '24px 32px',
    }}>
      {/* Hover style for dropzone "Click to Change" label */}
      <style>{`
        .dropzone-hover-label { opacity: 0 !important; }
        div:hover > .dropzone-hover-label { opacity: 1 !important; }
      `}</style>

      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, margin: 0 }}>
          Artwork QC
        </h1>
        <p style={{
          color: '#94a3b8',
          fontSize: 14,
          marginTop: 8,
          maxWidth: 520,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.5,
        }}>
          Compare old and new artworks side by side. Load both versions and toggle to spot differences instantly.
        </p>
      </div>

      {/* Two comparison panels */}
      <div style={{
        display: 'flex',
        gap: 24,
        maxWidth: 1600,
        margin: '0 auto',
        flexWrap: 'wrap',
      }}>
        {renderPanel(
          'en', 'English Artwork', 'EN',
          enPanel, enToggling, enShowNew, enDragOver,
          enOldRef, enNewRef, enDropzoneRef,
        )}
        {renderPanel(
          'ar', 'Arabic Artwork', 'عربي',
          arPanel, arToggling, arShowNew, arDragOver,
          arOldRef, arNewRef, arDropzoneRef,
        )}
      </div>

      {/* Instructions footer */}
      <div style={{
        textAlign: 'center',
        marginTop: 32,
        color: '#475569',
        fontSize: 12,
        lineHeight: 1.6,
      }}>
        <p style={{ margin: 0 }}>
          Drag and drop artworks directly onto the panels. First drop goes to Old, second to New.
        </p>
        <p style={{ margin: '4px 0 0' }}>
          Press Compare to flash between old and new at 500ms to catch subtle differences.
        </p>
      </div>
    </div>
  );
}

const btnStyle = (bg: string): React.CSSProperties => ({
  padding: '8px 16px',
  background: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  transition: 'all 0.2s',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
});

const btnHoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (e.currentTarget.disabled) return;
  e.currentTarget.style.transform = 'translateY(-1px)';
  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
};

const btnHoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
};

const UploadIcon = () => (
  <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const PlayIcon = () => (
  <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width={14} height={14} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const ResetIcon = () => (
  <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
