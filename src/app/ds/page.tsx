"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';

type Box = {
  width: number;
  height: number;
  left: number;
  top: number;
  image?: string;
  imageSize?: { width: number; height: number };
};

type BoxState = {
  box1: Box;
  box2: Box;
  box3: Box;
};

type Position = {
  x: number;
  y: number;
};

export default function DS() {
  const [currentBox, setCurrentBox] = useState<keyof BoxState | null>(null);
  const [dragTarget, setDragTarget] = useState<keyof BoxState | null>(null);
  const [dsImageName, setDsImageName] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [advNumber, setAdvNumber] = useState('');
  const [boxes, setBoxes] = useState<BoxState>({
    box1: {
      width: 640,
      height: 360,
      left: 0,
      top: 0,
      image: undefined,
      imageSize: undefined
    },
    box2: {
      width: 1280,
      height: 720,
      left: 0,
      top: 0,
      image: undefined,
      imageSize: undefined
    },
    box3: {
      width: 800,
      height: 180,
      left: 0,
      top: 0,
      image: undefined,
      imageSize: undefined
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scale, setScale] = useState(1);
  const layoutWidth = 1280; // Box2 width
  const layoutHeight = 720; // Box2 height
  const canvasRef = useRef<HTMLDivElement>(null);
  const [advPosition, setAdvPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const advRef = useRef<HTMLDivElement>(null);

  // Calculate Box3's position in the canvas
  const box3Position = {
    x: 0,  // Box3 starts from left edge
    y: boxes.box2.height  // Box3 starts after Box2's height
  };

  // Update default position to be in lower right corner of Box3
  const defaultAdvPosition: Position = { 
    x: box3Position.x + boxes.box3.width - 220,  // 200px from right edge of Box3
    y: box3Position.y + boxes.box3.height - 45   // 35px from bottom edge of Box3
  };

  const handleBoxClick = (boxKey: keyof BoxState) => {
    setCurrentBox(boxKey);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentBox) {
      handleImageFile(file, currentBox);
    }
  };

  const handleImageFile = (file: File, targetBox: keyof BoxState) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        setBoxes(prev => ({
          ...prev,
          [targetBox]: {
            ...prev[targetBox],
            image: typeof e.target?.result === 'string' ? e.target.result : undefined,
            imageSize: {
              width: img.width,
              height: img.height
            }
          }
        }));
      };
      img.src = typeof e.target?.result === 'string' ? e.target.result : '';
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e: React.DragEvent, boxKey: keyof BoxState) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(boxKey);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragTarget(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, boxKey: keyof BoxState) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure we're dropping on the intended box
    if (dragTarget !== boxKey) return;
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      handleImageFile(imageFile, boxKey);
    }
    setDragTarget(null);
  };

  // Handle Advertisement Number dragging
  const handleAdvMouseDown = (e: React.MouseEvent) => {
    if (!advRef.current) return;
    
    setIsDragging(true);
    const rect = advRef.current.getBoundingClientRect();
    setStartPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleAdvMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const scale = Number(canvasRef.current.style.transform.match(/scale\((.*?)\)/)?.[1] || 1);
    
    // Calculate new position within canvas bounds
    const newX = (e.clientX - canvasRect.left - startPos.x) / scale;
    const newY = (e.clientY - canvasRect.top - startPos.y) / scale;

    // Get canvas dimensions
    const canvasWidth = 1920;
    const canvasHeight = 900;

    // Get advertisement number dimensions
    const advWidth = advRef.current?.offsetWidth || 0;
    const advHeight = advRef.current?.offsetHeight || 0;

    // Keep within bounds
    const boundedX = Math.max(0, Math.min(newX, canvasWidth - advWidth));
    const boundedY = Math.max(0, Math.min(newY, canvasHeight - advHeight));

    setAdvPosition({ x: boundedX, y: boundedY });
  };

  const handleAdvMouseUp = () => {
    setIsDragging(false);
  };

  // Reset advertisement number position
  const handleResetPosition = () => {
    setAdvPosition(defaultAdvPosition);
  };

  // Initialize advPosition with default position
  useEffect(() => {
    setAdvPosition(defaultAdvPosition);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const scaleWidth = availableWidth / layoutWidth;
      const scaleHeight = availableHeight / layoutHeight;
      setScale(Math.min(scaleWidth, scaleHeight, 0.7));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    // Add global mouse event listeners
    if (isDragging) {
      document.addEventListener('mousemove', handleAdvMouseMove as any);
      document.addEventListener('mouseup', handleAdvMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleAdvMouseMove as any);
      document.removeEventListener('mouseup', handleAdvMouseUp);
    };
  }, [isDragging]);

  const handleCaptureImage = async () => {
    if (!canvasRef.current) return;

    try {
      // Reset scale and temporarily hide borders and effects
      const container = canvasRef.current;
      const originalTransform = container.style.transform;
      container.style.transform = 'scale(1)';

      // Find all box elements and temporarily modify their styles
      const boxes = container.querySelectorAll('.box-border');
      boxes.forEach((box: Element) => {
        if (box instanceof HTMLElement) {
          box.style.border = 'none';
          box.classList.add('capturing');
        }
      });

      // Hide controls during capture
      const controls = container.querySelector('.controls-overlay');
      if (controls instanceof HTMLElement) {
        controls.style.display = 'none';
      }

      const canvas = await html2canvas(container, {
        width: 1920,
        height: 900,
        scale: 1,
        backgroundColor: '#000000',
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Restore original styles
      container.style.transform = originalTransform;
      boxes.forEach((box: Element) => {
        if (box instanceof HTMLElement) {
          box.style.border = '';
          box.classList.remove('capturing');
        }
      });
      
      // Restore controls visibility
      if (controls instanceof HTMLElement) {
        controls.style.display = '';
      }

      // Convert to high-quality JPG
      const image = canvas.toDataURL('image/jpeg', 1.0);
      
      // Create download link
      const link = document.createElement('a');
      const filename = dsImageName ? 
        `${dsImageName.trim() || 'DS'}_${new Date().toISOString().split('T')[0]}.jpg` : 
        `DS_${new Date().toISOString().split('T')[0]}.jpg`;
      
      link.download = filename;
      link.href = image;
      link.click();

    } catch (error) {
      console.error('Error capturing image:', error);
      alert('Failed to capture image. Please try again.');
    }
  };

  const renderBox = (boxKey: keyof BoxState, box: Box) => (
    <div
      className={`box-border group ${dragTarget === boxKey ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        width: `${box.width}px`,
        height: `${box.height}px`,
        background: '#fff',
        border: '2px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
      }}
      onClick={() => handleBoxClick(boxKey)}
      onDragEnter={(e) => handleDragEnter(e, boxKey)}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, boxKey)}
    >
      {box.image ? (
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
          <Image
            src={box.image}
            alt={`Box ${boxKey}`}
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/0 group-hover:from-black/30 group-hover:via-black/20 group-hover:to-black/30 transition-all duration-300 capturing:opacity-0" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 capturing:hidden">
            <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-gray-800 font-semibold">Click to Change</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300 w-full">
            <div className="font-bold text-base mb-2" style={{marginTop: 8}}>
              Box {boxKey.slice(-1)}
            </div>
            <div className="font-bold text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
              Drag & Drop
            </div>
            <div className="text-lg transform group-hover:scale-105 transition-transform duration-300">
              or Click to Import
            </div>
            <div className="text-sm mt-4 transform group-hover:scale-105 transition-transform duration-300">
              [Placeholder]
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300 capturing:opacity-0" />
        </div>
      )}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300 capturing:opacity-0" />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-900 text-black overflow-hidden">
      <style jsx global>{`
        .capturing .group-hover\\:scale-105,
        .capturing .group-hover\\:opacity-100,
        .capturing .group-hover\\:translate-y-0,
        .capturing .group-hover\\:from-black\\/30,
        .capturing .group-hover\\:via-black\\/20,
        .capturing .group-hover\\:to-black\\/30,
        .capturing .group-hover\\:border-blue-500,
        .capturing .group-hover\\:shadow-\\[0_0_20px_rgba\\(59\\,130\\,246\\,0\\.6\\)\\] {
          opacity: 0 !important;
          transform: none !important;
          border: none !important;
          box-shadow: none !important;
          background: none !important;
        }
        .adv-number {
          cursor: move;
          user-select: none;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          transition: background-color 0.2s, transform 0.2s;
        }
        .adv-number:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.02);
        }
        .adv-number.dragging {
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
          transition: none;
        }
        .capturing .adv-number {
          background: transparent !important;
          transform: none !important;
          box-shadow: none !important;
        }
        .position-guide {
          pointer-events: none;
          border: 2px dashed;
          opacity: 0;
          transition: opacity 0.2s;
          mix-blend-mode: difference;
        }
        .adv-number:hover + .position-guide,
        .adv-number.dragging + .position-guide {
          opacity: 1;
        }
      `}</style>
      <div className="container mx-auto px-4 pb-0 pt-8 flex flex-col items-center overflow-hidden">     
        <div 
          ref={canvasRef} 
          className="w-[1920px] flex flex-col items-start overflow-hidden relative mb-0" 
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'top center',
            marginBottom: '-2rem' // Add negative margin to pull footer closer
          }}
        >
          {/* DS Canvas - Positioned behind other elements */}
          <div 
            style={{
              width: '1920px',
              height: '900px',
              backgroundColor: '#000000',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 0
            }}
          />
          
          {/* Content container with higher z-index */}
          <div className="relative z-10">
            <div className="flex">
              {renderBox('box2', boxes.box2)}
              {renderBox('box1', boxes.box1)}
            </div>
            {renderBox('box3', boxes.box3)}

            {/* Draggable Advertisement Number */}
            {advNumber && (
              <>
                <div 
                  ref={advRef}
                  className={`adv-number absolute z-30 font-semibold text-lg ${isDragging ? 'dragging' : ''}`}
                  style={{ 
                    color: textColor,
                    left: `${advPosition.x}px`,
                    top: `${advPosition.y}px`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={handleAdvMouseDown}
                >
                  {advNumber}
                </div>
                <div 
                  className="position-guide absolute z-20"
                  style={{
                    left: `${advPosition.x}px`,
                    top: `${advPosition.y}px`,
                    width: advRef.current?.offsetWidth || 0,
                    height: advRef.current?.offsetHeight || 0,
                    filter: 'invert(1)',
                  }}
                />
              </>
            )}
          </div>

          {/* Controls Overlay */}
          <div 
            className="controls-overlay absolute bottom-4 right-4 z-20 bg-gray-200/90 p-4 rounded-lg shadow-lg"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Advertisement Number Input with Reset Button */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Advertisement No.
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ADVI-012345-123456"
                      value={advNumber}
                      onChange={(e) => setAdvNumber(e.target.value)}
                      className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleResetPosition}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors duration-200 flex items-center gap-1"
                      title="Reset Position"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* DS Image Name and Text Color Controls */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    DS Image Name
                  </label>
                  <input
                    type="text"
                    placeholder="DS Image Name"
                    value={dsImageName}
                    onChange={(e) => setDsImageName(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <div 
                      className="w-16 h-8 rounded border border-gray-300 flex items-center justify-center text-xs"
                      style={{ backgroundColor: textColor, color: textColor === '#000000' ? '#ffffff' : '#000000' }}
                    >
                      {textColor.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Capture Button */}
              <button
                onClick={handleCaptureImage}
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300 w-full justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Capture Image
              </button>
            </div>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </main>
  );
} 