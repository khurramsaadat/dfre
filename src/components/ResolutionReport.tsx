"use client";
import { useRef, useState } from 'react';
import Image from 'next/image';

export type ReportBox = {
  index: number;
  width: number;
  height: number;
  image?: string;
  imageSize?: { width: number; height: number };
  fileName?: string;
};

interface ResolutionReportProps {
  boxes: ReportBox[];
  promoTitle: string;
}

export default function ResolutionReport({ boxes, promoTitle }: ResolutionReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [lightTheme, setLightTheme] = useState(true);

  const totalWithImages = boxes.filter((b) => b.image).length;
  const mismatched = boxes.filter(
    (b) => b.image && b.imageSize && (b.imageSize.width !== b.width || b.imageSize.height !== b.height)
  );

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  const formatFileName = (name: string, maxLen: number = 60): string => {
    if (!name || name.length <= maxLen) return name || 'Untitled';
    const ext = name.lastIndexOf('.') > 0 ? name.slice(name.lastIndexOf('.')) : '';
    const base = name.slice(0, name.lastIndexOf('.') > 0 ? name.lastIndexOf('.') : name.length);
    const available = maxLen - ext.length - 3;
    return base.slice(0, available) + '...' + ext;
  };

  // Theme-aware colors
  const dark = !lightTheme;
  const theme = {
    cardBg: dark ? '#0f172a' : '#ffffff',
    cardBorder: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #cbd5e1',
    cardShadow: dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
    headerText: dark ? '#f1f5f9' : '#0f172a',
    subText: '#64748b',
    dateText: dark ? '#475569' : '#64748b',
    alertBg: dark ? 'rgba(239, 68, 68, 0.08)' : '#fef2f2',
    alertCountText: dark ? '#fca5a5' : '#b91c1c',
    alertReviseText: dark ? '#ef4444' : '#b91c1c',
    thText: dark ? '#475569' : '#334155',
    thSubText: dark ? '#64748b' : '#64748b',
    thBorder: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #cbd5e1',
    rowAlt: dark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
    rowBorder: dark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #e2e8f0',
    numText: dark ? '#475569' : '#64748b',
    thumbBg: dark ? '#1e293b' : '#f1f5f9',
    thumbBorder: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #cbd5e1',
    fileText: dark ? '#e2e8f0' : '#0f172a',
    reqText: dark ? '#cbd5e1' : '#1e293b',
    recText: dark ? '#ef4444' : '#dc2626',
    specsLabel: dark ? '#64748b' : '#334155',
    specsText: dark ? '#475569' : '#475569',
    footerBorder: dark ? '1px solid rgba(255,255,255,0.04)' : '1px solid #cbd5e1',
    btnBg: dark ? '#1e293b' : '#e2e8f0',
    btnText: dark ? '#e2e8f0' : '#1e293b',
    btnBorder: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #94a3b8',
    btnHoverBg: dark ? '#334155' : '#cbd5e1',
    toggleBg: dark ? 'rgba(255,255,255,0.06)' : '#e2e8f0',
    toggleHoverBg: dark ? 'rgba(255,255,255,0.12)' : '#cbd5e1',
  };

  // Downscale image to thumbnail size for PDF to reduce file size
  const downscaleImage = (src: string, maxW: number, maxH: number, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
      img.src = src;
    });
  };

  const handleDownloadPDF = async () => {
    if (mismatched.length === 0) return;

    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const m = 14;

    // Header
    let y = 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59);
    doc.text('Resolution Report', m, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(currentDate, pageWidth - m, y, { align: 'right' });

    // Promo + count
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    if (promoTitle) {
      doc.text(promoTitle, m, y);
    }
    doc.setTextColor(200, 30, 30);
    const countText = `${mismatched.length} of ${totalWithImages} image${totalWithImages !== 1 ? 's' : ''} require correction`;
    doc.text(countText, pageWidth - m, y, { align: 'right' });

    // Separator - darker for print visibility
    y += 8;
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.line(m, y, pageWidth - m, y);
    y += 8;

    // Column positions
    const col = {
      num: m,
      thumb: m + 7,
      fileName: m + 48,
      required: pageWidth - m - 65,
      received: pageWidth - m - 20,
    };

    // Table header - blue background, black bold text
    const drawTableHeader = (yPos: number): number => {
      doc.setFillColor(219, 234, 254);
      doc.rect(m, yPos - 3.5, pageWidth - m * 2, 9, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('#', col.num, yPos);
      doc.text('ARTWORKS', col.thumb, yPos);
      doc.text('FILENAME', col.fileName, yPos);
      doc.text('REQUIRED', col.required, yPos);
      doc.text('RECEIVED', col.received, yPos);
      // Subtitle row
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('Resolution', col.required, yPos + 3.5);
      doc.text('Resolution', col.received, yPos + 3.5);
      return yPos + 8;
    };

    y = drawTableHeader(y);

    // Fixed thumbnail width in PDF - all same width, height proportional
    const thumbFixedW = 35;
    const thumbMaxH = 20;

    // Pre-downscale all thumbnails to ~300px wide for small PDF file size
    const thumbData: (string | null)[] = [];
    for (const box of mismatched) {
      if (box.image && box.imageSize) {
        try {
          const scaled = await downscaleImage(box.image, 900, 600, 0.7);
          thumbData.push(scaled);
        } catch { thumbData.push(null); }
      } else {
        thumbData.push(null);
      }
    }

    for (let i = 0; i < mismatched.length; i++) {
      const box = mismatched[i];

      // Calculate proportional thumb height for this image
      let thumbH = thumbFixedW * 0.5625; // default 16:9
      if (box.imageSize) {
        thumbH = thumbFixedW * (box.imageSize.height / box.imageSize.width);
        if (thumbH > thumbMaxH) thumbH = thumbMaxH;
      }
      const rowH = Math.max(18, thumbH + 4);

      if (y + rowH > pageHeight - 22) {
        doc.addPage();
        y = 12;
        y = drawTableHeader(y);
      }

      if (i % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(m, y - 2, pageWidth - m * 2, rowH, 'F');
      }

      // Row number - vertically centered, darker for print
      const textY = y + rowH / 2 + 1;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text(`${i + 1}`, col.num, textY);

      // Thumbnail - downscaled for small file size
      if (thumbData[i]) {
        try {
          doc.addImage(thumbData[i]!, 'JPEG', col.thumb, y + (rowH - thumbH) / 2 - 1, thumbFixedW, thumbH);
        } catch { /* skip corrupt images */ }
      }

      // Filename - vertically centered
      doc.setTextColor(40, 40, 40);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const maxFileChars = Math.floor((col.required - col.fileName - 4) / 1.8);
      doc.text(formatFileName(box.fileName || 'Untitled', maxFileChars), col.fileName, textY);

      // Required with px
      doc.setFontSize(8.5);
      doc.setTextColor(50, 50, 50);
      doc.text(`${box.width} x ${box.height} px`, col.required, textY);

      // Received with px (red)
      if (box.imageSize) {
        doc.setTextColor(200, 30, 30);
        doc.setFont('helvetica', 'bold');
        doc.text(`${box.imageSize.width} x ${box.imageSize.height} px`, col.received, textY);
      }

      // Row separator - darker for print visibility
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.15);
      doc.line(m, y + rowH - 2, pageWidth - m, y + rowH - 2);

      y += rowH;
    }

    // Specs box - same blue as column headers, black text
    y += 3;
    if (y + 16 > pageHeight - 14) { doc.addPage(); y = 12; }
    doc.setFillColor(219, 234, 254);
    doc.roundedRect(m, y - 2, pageWidth - m * 2, 14, 1.5, 1.5, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Specs Required:', m + 3, y + 3);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text('High Quality JPG or PNG  -  72 DPI  -  Please maintain the required resolution as mentioned above.', m + 24, y + 3);
    
    // Action required line
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Action Required:', m + 3, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text('Please revise the sizes and resubmit.', m + 24, y + 8);
    
    // Footer line
    const fy = pageHeight - 6;
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.2);
    doc.line(m, fy - 5, pageWidth - m, fy - 5);
    // Page number below the line
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(`Page 1 of ${doc.getNumberOfPages()}`, pageWidth - m, fy, { align: 'right' });

    const fileName = promoTitle
      ? `Resolution_Report_${promoTitle.replace(/\s+/g, '_')}`
      : 'Resolution_Report';
    doc.save(`${fileName}.pdf`);
  };

  // All images match - no report needed
  if (mismatched.length === 0) {
    return (
      <div ref={reportRef} style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0f172a', borderRadius: 10, padding: '24px 32px', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <svg width={24} height={24} fill="none" stroke="#22c55e" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span style={{ color: '#22c55e', fontSize: 16, fontWeight: 700 }}>All images match the required resolutions</span>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
            {totalWithImages} of {totalWithImages} images verified - no mismatches detected.
          </p>
        </div>
      </div>
    );
  }

  // Reusable table styles
  const thBase: React.CSSProperties = {
    padding: '6px 8px 2px',
    color: theme.thText,
    fontWeight: 600,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    textAlign: 'center',
    borderBottom: theme.thBorder,
    verticalAlign: 'bottom',
  };

  const tdBase: React.CSSProperties = {
    padding: '8px 8px',
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  // Fixed thumbnail container: same width for all, height proportional via objectFit
  const THUMB_W = 120;
  const THUMB_H = 68;

  return (
    <div ref={reportRef} style={{ width: '100%', maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div
        style={{
          background: theme.cardBg,
          borderRadius: 10,
          overflow: 'hidden',
          border: theme.cardBorder,
          boxShadow: theme.cardShadow,
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Header */}
        <div style={{ padding: '18px 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <h2 style={{ color: theme.headerText, fontSize: 18, fontWeight: 700, margin: 0 }}>Resolution Report</h2>
            {promoTitle && (
              <span style={{ color: theme.subText, fontSize: 13 }}>{promoTitle}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: theme.dateText, fontSize: 12 }}>{currentDate}</span>
            <button
              onClick={() => setLightTheme(!lightTheme)}
              title={lightTheme ? 'Switch to dark theme' : 'Switch to light theme (print-friendly)'}
              style={{
                background: theme.toggleBg,
                border: 'none',
                cursor: 'pointer',
                padding: '4px 6px',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                color: theme.dateText,
                fontSize: 10,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = theme.toggleHoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = theme.toggleBg; }}
            >
              {lightTheme ? (
                <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              <span>{lightTheme ? 'Dark' : 'Print'}</span>
            </button>
          </div>
        </div>

        {/* Alert banner */}
        <div
          style={{
            margin: '0 16px 12px',
            background: theme.alertBg,
            borderLeft: '3px solid #ef4444',
            borderRadius: '0 6px 6px 0',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width={16} height={16} fill="none" stroke="#ef4444" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span style={{ color: theme.alertCountText, fontSize: 12, fontWeight: 500 }}>
              {mismatched.length} of {totalWithImages} image{totalWithImages !== 1 ? 's' : ''} with incorrect resolution
            </span>
          </div>
          <span style={{ color: theme.alertReviseText, fontSize: 12, fontWeight: 700 }}>
            Please revise the images and resubmit
          </span>
        </div>

        {/* Table - flat list, no grouping */}
        <div style={{ padding: '0 8px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ ...thBase, width: 36 }}>#</th>
                <th style={{ ...thBase, width: 140 }}>Artworks</th>
                <th style={{ ...thBase, textAlign: 'left', paddingLeft: 12 }}>Filename</th>
                <th style={{ ...thBase, width: 110, textAlign: 'right', paddingRight: 16 }}>
                  <div>Required</div>
                  <div style={{ fontSize: 9, fontWeight: 400, color: theme.thSubText, letterSpacing: '0px', textTransform: 'none' }}>Resolution</div>
                </th>
                <th style={{ ...thBase, width: 110, textAlign: 'right', paddingRight: 16 }}>
                  <div>Received</div>
                  <div style={{ fontSize: 9, fontWeight: 400, color: theme.thSubText, letterSpacing: '0px', textTransform: 'none' }}>Resolution</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {mismatched.map((box, i) => (
                <tr
                  key={box.index}
                  style={{
                    background: i % 2 === 0 ? theme.rowAlt : 'transparent',
                    borderBottom: theme.rowBorder,
                  }}
                >
                  <td style={{ ...tdBase, width: 36 }}>
                    <span style={{ color: theme.numText, fontSize: 11, fontWeight: 500 }}>{i + 1}</span>
                  </td>

                  <td style={{ ...tdBase, padding: '6px 8px', width: 140 }}>
                    {box.image && (
                      <div
                        style={{
                          width: THUMB_W,
                          height: THUMB_H,
                          borderRadius: 4,
                          overflow: 'hidden',
                          border: theme.thumbBorder,
                          position: 'relative',
                          margin: '0 auto',
                          background: theme.thumbBg,
                        }}
                      >
                        <Image src={box.image} alt="Preview" fill style={{ objectFit: 'contain' }} />
                      </div>
                    )}
                  </td>

                  <td style={{ ...tdBase, textAlign: 'left', paddingLeft: 12 }}>
                    <div
                      style={{ color: theme.fileText, fontWeight: 500, fontSize: 12, wordBreak: 'break-word', lineHeight: 1.35 }}
                      title={box.fileName || 'Untitled'}
                    >
                      {formatFileName(box.fileName || 'Untitled')}
                    </div>
                  </td>

                  <td style={{ ...tdBase, width: 110, textAlign: 'right', paddingRight: 16 }}>
                    <span style={{ color: theme.reqText, fontWeight: 600, fontSize: 13 }}>
                      {box.width} x {box.height} px
                    </span>
                  </td>

                  <td style={{ ...tdBase, width: 110, textAlign: 'right', paddingRight: 16 }}>
                    <span style={{ color: theme.recText, fontWeight: 700, fontSize: 13 }}>
                      {box.imageSize ? `${box.imageSize.width} x ${box.imageSize.height} px` : 'N/A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Specs + Download */}
        <div
          style={{
            padding: '12px 16px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: theme.footerBorder,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div style={{ color: theme.specsText, fontSize: 11, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 600, color: theme.specsLabel }}>Specs:</span>{' '}
            High Quality JPG or PNG &nbsp;-&nbsp; 72 DPI &nbsp;-&nbsp; Exact pixel dimensions as required
          </div>
          <button
            onClick={handleDownloadPDF}
            title="Download this resolution report as a PDF file"
            style={{
              padding: '8px 20px',
              background: theme.btnBg,
              color: theme.btnText,
              borderRadius: 6,
              border: theme.btnBorder,
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.btnHoverBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.btnBg;
            }}
          >
            <svg width={14} height={14} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
