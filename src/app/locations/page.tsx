"use client";
import React, { useState } from "react";
import { ClipboardIcon, ShareIcon, PrinterIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const locations = [
  {
    name: "Pole-1 Ittihad Road",
    decimal: "25.283739107708772, 55.357997330812836",
    dms: "25°17'01.5\"N 55°21'28.8\"E",
    short: "25.283750, 55.358000",
    map: "https://www.google.com/maps?q=25.283739107708772,55.357997330812836&z=17&hl=en"
  },
  {
    name: "Pole-2 SZR Last Exit",
    decimal: "24.903459919850114, 54.94664253313848",
    dms: "24°54'12.5\"N 54°56'47.9\"E",
    short: "24.903472, 54.946639",
    map: "https://www.google.com/maps?q=24.903459919850114,54.94664253313848&z=17&hl=en"
  },
  {
    name: "Pole-3 Airport Road",
    decimal: "25.242637467051395, 55.36193533759589",
    dms: "25°14'33.5\"N 55°21'43.0\"E",
    short: "25.242637, 55.361935",
    map: "https://www.google.com/maps?q=25.242637467051395,55.36193533759589&z=17&hl=en"
  },
  {
    name: "Pole-4 MBZ Road",
    decimal: "25.261671709782203, 55.408521021044955",
    dms: "25°15'42.0\"N 55°24'30.7\"E",
    short: "25.261667, 55.408528",
    map: "https://www.google.com/maps?q=25.261671709782203,55.408521021044955&z=17&hl=en"
  },
  {
    name: "Pole-5 Garhoud Road",
    decimal: "25.22642724595015, 55.330701499517694",
    dms: "25°13'35.1\"N 55°19'50.5\"E",
    short: "25.226417, 55.330694",
    map: "https://www.google.com/maps?q=25.22642724595015,55.330701499517694&z=17&hl=en"
  },
  {
    name: "Pole-6 Al Ain Road",
    decimal: "25.165353775024414,55.32902526855469",
    dms: null,
    short: null,
    map: "https://www.google.com/maps?q=25.165353775024414,55.32902526855469&z=17&hl=en"
  },
  {
    name: "Pole-7 Al Khail Road",
    decimal: "25.215885162353516,55.32541275024414",
    dms: null,
    short: null,
    map: "https://www.google.com/maps?q=25.215885162353516,55.32541275024414&z=17&hl=en"
  }
];

export default function Locations() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleCopy = (loc: typeof locations[0], idx: number) => {
    const text = `${loc.name}\nDecimal: ${loc.decimal}${loc.dms ? `\nDMS: ${loc.dms}` : ''}\nGoogle Maps: ${loc.map}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleShare = (loc: typeof locations[0]) => {
    const text = `${loc.name}\nDecimal: ${loc.decimal}${loc.dms ? `\nDMS: ${loc.dms}` : ''}\nGoogle Maps: ${loc.map}`;
    if (navigator.share) {
      navigator.share({ title: loc.name, text, url: loc.map });
    } else {
      alert('Sharing is not supported on this device.');
    }
  };

  // Function to generate a single multi-page PDF with all locations
  const handlePrintPDF = async () => {
    if (isGeneratingPDF) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (2 * margin);
      
      // Set document properties
      pdf.setProperties({
        title: 'DFRE Pole Locations',
        subject: 'Location coordinates and maps for DFRE poles',
        author: 'DFRE',
        keywords: 'locations, poles, coordinates, DFRE',
        creator: 'DFRE Location System'
      });

      // ========== PAGE 1: INDEX/COVER PAGE ==========
      let yPosition = margin + 25;
      
      // Main title on cover page with enhanced styling
      pdf.setFillColor(234, 88, 12); // Orange color
      pdf.rect(margin, yPosition, contentWidth, 24, 'F');
      
      // Add shadow effect
      pdf.setDrawColor(200, 70, 10);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition + 24, margin + contentWidth, yPosition + 24);
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(32);
      pdf.setFont('helvetica', 'bold');
      pdf.text('DFRE Pole Locations', pageWidth / 2, yPosition + 15, { align: 'center' });
      
      yPosition += 40;
      
      // Subtitle with decorative line
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(15);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Complete Location Directory', pageWidth / 2, yPosition, { align: 'center' });
      
      // Decorative line under subtitle
      pdf.setDrawColor(234, 88, 12);
      pdf.setLineWidth(1);
      const lineWidth = 60;
      pdf.line(pageWidth / 2 - lineWidth / 2, yPosition + 3, pageWidth / 2 + lineWidth / 2, yPosition + 3);
      
      yPosition += 18;
      
      // Table of contents header with improved styling - same colors as Google Maps Link
      pdf.setFillColor(255, 247, 237); // Warm orange tint (same as Google Maps Link)
      pdf.rect(margin, yPosition, contentWidth, 12, 'F');
      pdf.setDrawColor(251, 191, 36); // Golden border (same as Google Maps Link)
      pdf.setLineWidth(0.8);
      pdf.rect(margin, yPosition, contentWidth, 12, 'S');
      
      pdf.setTextColor(55, 65, 81); // Dark grey
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Table of Contents', margin + 4, yPosition + 8);
      
      yPosition += 18;
      
      // List all locations with page numbers (clickable) with better styling
      locations.forEach((loc, index) => {
        const pageNum = index + 2; // Pages start from 2 (after cover)
        
        // Alternating background colors for better readability
        if (index % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(margin, yPosition - 5, contentWidth, 9, 'F');
        }
        
        // Make the entire row clickable - creates internal link to specific page
        pdf.setTextColor(55, 65, 81); // Dark grey
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}.`, margin + 6, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.text(loc.name, margin + 15, yPosition);
        
        pdf.setTextColor(100, 116, 139); // Light grey for page numbers
        pdf.setFontSize(10);
        pdf.text(`Page ${pageNum}`, pageWidth - margin - 18, yPosition);
        
        // Add clickable link to jump to the specific page
        pdf.link(margin, yPosition - 5, contentWidth, 9, { pageNumber: pageNum });
        
        yPosition += 9;
      });
      
      yPosition += 10;
      
      // Add summary info box with improved styling
      pdf.setFillColor(254, 249, 195); // Light yellow background
      pdf.rect(margin, yPosition, contentWidth, 28, 'F');
      pdf.setDrawColor(250, 204, 21); // Yellow border
      pdf.setLineWidth(1);
      pdf.rect(margin, yPosition, contentWidth, 28, 'S');
      
      pdf.setTextColor(55, 65, 81); // Dark grey
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Document Information', margin + 4, yPosition + 7);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105);
      
      // Create two columns
      const col1X = margin + 6;
      const col2X = margin + contentWidth / 2 + 6;
      
      pdf.text(`Total Locations: ${locations.length}`, col1X, yPosition + 15);
      pdf.text(`Total Pages: ${locations.length + 1}`, col1X, yPosition + 22);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text('Document Type:', col2X, yPosition + 15);
      pdf.setFont('helvetica', 'normal');
      pdf.text('DFRE Pole Locations Reference', col2X, yPosition + 22);
      
      // Footer on cover page with improved styling
      const coverFooterY = pageHeight - 12;
      
      // Footer background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, coverFooterY - 5, pageWidth, 17, 'F');
      
      // Footer border
      pdf.setDrawColor(203, 213, 225);
      pdf.setLineWidth(0.5);
      pdf.line(margin, coverFooterY - 4, pageWidth - margin, coverFooterY - 4);
      
      // Footer text
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('DFRE Pole Locations', pageWidth / 2, coverFooterY, { align: 'center' });
      
      pdf.setFontSize(7);
      pdf.setTextColor(148, 163, 184);
      pdf.setFont('helvetica', 'italic');
      pdf.text('All coordinates are provided for reference only', pageWidth / 2, coverFooterY + 4, { align: 'center' });

      // ========== LOCATION PAGES (Starting from Page 2) ==========
      for (let i = 0; i < locations.length; i++) {
        const loc = locations[i];
        
        // Add new page for each location
        pdf.addPage();
        
        yPosition = margin;
        
        // Add location name as header with gradient effect
        pdf.setFillColor(234, 88, 12); // Orange color
        pdf.rect(margin, yPosition, contentWidth, 14, 'F');
        
        // Add subtle shadow effect
        pdf.setDrawColor(200, 70, 10);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPosition + 14, margin + contentWidth, yPosition + 14);
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(loc.name, pageWidth / 2, yPosition + 9.5, { align: 'center' });
        
        yPosition += 18;
        
        // Add page number with better styling
        pdf.setTextColor(156, 163, 175);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Page ${i + 2} of ${locations.length + 1}`, pageWidth / 2, yPosition + 3, { align: 'center' });
        
        yPosition += 10;
        
        yPosition += 10;
        
        // Add Google Maps link section with improved styling (moved up before coordinates)
        pdf.setFillColor(255, 247, 237); // Warm orange tint
        pdf.rect(margin, yPosition, contentWidth, 20, 'F');
        pdf.setDrawColor(251, 191, 36); // Golden border
        pdf.setLineWidth(0.8);
        pdf.rect(margin, yPosition, contentWidth, 20, 'S');
        
        pdf.setTextColor(55, 65, 81); // Dark grey
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Google Maps Link', margin + 4, yPosition + 6);
        
        pdf.setTextColor(55, 65, 81); // Dark grey
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.textWithLink('Click here to open in Google Maps', margin + 4, yPosition + 12, { url: loc.map });
        
        // Add full URL as selectable text
        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(7);
        const splitUrl = pdf.splitTextToSize(loc.map, contentWidth - 8);
        pdf.text(splitUrl, margin + 4, yPosition + 17);
        
        yPosition += 30; // Increased spacing to clear the Google Maps box (20mm box + 10mm gap)
        
        // Add map preview section - moved closer to image, no separator line
        pdf.setTextColor(55, 65, 81); // Dark grey
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Location Map Preview', margin, yPosition);
        
        yPosition += 6;
        
        // Calculate image dimensions to fit in remaining page space
        const availableHeight = pageHeight - yPosition - margin - 15;
        const mapWidth = contentWidth;
        const mapHeight = Math.min(100, availableHeight); // Fixed height for map
        
        // Try to load actual map image from public/images folder
        // If image doesn't exist, fall back to placeholder
        
        try {
          // Parse coordinates
          const coords = loc.decimal.split(',').map(c => c.trim());
          const lat = parseFloat(coords[0]);
          const lon = parseFloat(coords[1]);
          
          // Generate image filename from location name (using JPG)
          const imageFileName = loc.name.toLowerCase().replace(/\s+/g, '-') + '.jpg';
          const imageUrl = `/images/${imageFileName}`;
          
          console.log(`Attempting to load map image: ${imageUrl}`);
          
          let mapImageLoaded = false;
          
          try {
            // Try to load the map image
            const mapImg = new Image();
            mapImg.crossOrigin = 'anonymous';
            
            await new Promise<void>((resolve, reject) => {
              mapImg.onload = () => {
                console.log(`Map image loaded successfully: ${imageFileName}`);
                mapImageLoaded = true;
                resolve();
              };
              mapImg.onerror = () => {
                console.log(`Map image not found: ${imageFileName}, using placeholder`);
                reject(new Error('Image not found'));
              };
              mapImg.src = imageUrl;
              
              // Timeout after 5 seconds
              setTimeout(() => reject(new Error('Image load timeout')), 5000);
            });
            
            // If image loaded successfully, use it directly (no resizing/compression needed)
            if (mapImageLoaded) {
              // Create canvas to convert image to base64
              const canvas = document.createElement('canvas');
              canvas.width = mapImg.width;
              canvas.height = mapImg.height;
              
              const ctx = canvas.getContext('2d');
              if (ctx) {
                // Draw the image as-is (no resizing or compression)
                ctx.drawImage(mapImg, 0, 0);
                
                // Convert to base64 - use original quality
                const imageData = canvas.toDataURL('image/jpeg', 1.0);
                
                // Add the image to PDF at full quality
                pdf.addImage(imageData, 'JPEG', margin, yPosition, mapWidth, mapHeight);
                
                // Add outline/border around the map image
                pdf.setDrawColor(156, 163, 175); // Medium grey border
                pdf.setLineWidth(1);
                pdf.rect(margin, yPosition, mapWidth, mapHeight, 'S');
                
                console.log(`Map image added to PDF successfully: ${imageFileName}`);
              } else {
                throw new Error('Canvas context not available');
              }
            }
            
          } catch (imgError) {
            // Image not found or failed to load, use placeholder
            console.log('Using placeholder for map preview');
            mapImageLoaded = false;
          }
          
          // If image didn't load, create placeholder
          if (!mapImageLoaded) {
            // Create a visually appealing map placeholder
            // Background with gradient to simulate map
            pdf.setFillColor(235, 245, 251); // Light blue background
            pdf.rect(margin, yPosition, mapWidth, mapHeight, 'F');
            
            // Add border
            pdf.setDrawColor(59, 130, 246); // Blue border
            pdf.setLineWidth(1);
            pdf.rect(margin, yPosition, mapWidth, mapHeight, 'S');
            
            // Add grid lines to simulate map
            pdf.setDrawColor(200, 220, 240);
            pdf.setLineWidth(0.2);
            
            // Vertical lines
            for (let i = 1; i < 4; i++) {
              const x = margin + (mapWidth / 4) * i;
              pdf.line(x, yPosition, x, yPosition + mapHeight);
            }
            
            // Horizontal lines
            for (let i = 1; i < 3; i++) {
              const y = yPosition + (mapHeight / 3) * i;
              pdf.line(margin, y, margin + mapWidth, y);
            }
            
            // Add location marker icon (larger, centered)
            const centerX = pageWidth / 2;
            const centerY = yPosition + (mapHeight / 2);
            
            // Marker pin shape
            pdf.setFillColor(234, 88, 12); // Orange
            pdf.circle(centerX, centerY - 8, 6, 'F');
            
            // Marker point (triangle)
            pdf.triangle(
              centerX, centerY - 2,
              centerX - 5, centerY + 6,
              centerX + 5, centerY + 6,
              'F'
            );
            
            // Add white circle in center of marker
            pdf.setFillColor(255, 255, 255);
            pdf.circle(centerX, centerY - 8, 2.5, 'F');
            
            // Add location name
            pdf.setTextColor(31, 41, 55);
            pdf.setFontSize(13);
            pdf.setFont('helvetica', 'bold');
            pdf.text(loc.name, centerX, centerY + 15, { align: 'center' });
            
            // Add coordinates
            pdf.setTextColor(75, 85, 99);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Lat: ${lat.toFixed(6)}  |  Lon: ${lon.toFixed(6)}`, centerX, centerY + 22, { align: 'center' });
            
            // Add instruction box at bottom
            pdf.setFillColor(254, 243, 199); // Light yellow
            const infoBoxHeight = 15;
            const infoBoxY = yPosition + mapHeight - infoBoxHeight;
            pdf.rect(margin, infoBoxY, mapWidth, infoBoxHeight, 'F');
            
            pdf.setTextColor(146, 64, 14); // Dark yellow/brown
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('CLICK ANYWHERE TO VIEW INTERACTIVE MAP', centerX, infoBoxY + 6, { align: 'center' });
            
            pdf.setFontSize(8);
            pdf.setFont('helvetica', 'normal');
            pdf.text('Opens in Google Maps with satellite view, street view, and directions', centerX, infoBoxY + 11, { align: 'center' });
            
            console.log('Map placeholder created successfully');
          }
          
        } catch (error) {
          console.error('Error creating map preview:', error);
          
          // Fallback: Create an informative visual placeholder
          pdf.setFillColor(245, 245, 245);
          pdf.rect(margin, yPosition, mapWidth, mapHeight, 'F');
          pdf.setDrawColor(220, 220, 220);
          pdf.setLineWidth(1);
          pdf.rect(margin, yPosition, mapWidth, mapHeight, 'S');
          
          // Add map icon (location marker)
          pdf.setFillColor(234, 88, 12); // Orange
          const markerX = pageWidth / 2;
          const markerY = yPosition + (mapHeight / 2) - 8;
          
          // Draw location pin
          pdf.circle(markerX, markerY, 4, 'F');
          pdf.triangle(markerX, markerY + 4, markerX - 3, markerY + 9, markerX + 3, markerY + 9, 'F');
          
          // Add text
          pdf.setTextColor(75, 85, 99);
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Map Location', pageWidth / 2, yPosition + (mapHeight / 2) + 8, { align: 'center' });
          
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(100, 116, 139);
          pdf.text(loc.decimal, pageWidth / 2, yPosition + (mapHeight / 2) + 14, { align: 'center' });
          
          pdf.setTextColor(29, 78, 216);
          pdf.setFontSize(8);
          pdf.setFont('helvetica', 'italic');
          pdf.text('Click to view interactive map', pageWidth / 2, yPosition + (mapHeight / 2) + 20, { align: 'center' });
        }
        
        // Add clickable area over the entire map area
        pdf.link(margin, yPosition, mapWidth, mapHeight, { url: loc.map });
        
        yPosition += mapHeight + 10;
        
        // Add coordinates section AFTER map preview - same colors as Google Maps Link
        pdf.setFillColor(255, 247, 237); // Warm orange tint (same as Google Maps Link)
        pdf.rect(margin, yPosition, contentWidth, 10, 'F');
        pdf.setDrawColor(251, 191, 36); // Golden border (same as Google Maps Link)
        pdf.setLineWidth(0.8);
        pdf.rect(margin, yPosition, contentWidth, 10, 'S');
        
        pdf.setTextColor(55, 65, 81); // Dark grey
        pdf.setFontSize(13);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Coordinates', margin + 4, yPosition + 6.5);
        
        yPosition += 14;
        
        // Add decimal coordinates with better spacing
        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Decimal:', margin + 4, yPosition);
        pdf.setTextColor(15, 23, 42);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(loc.decimal, margin + 30, yPosition);
        
        yPosition += 7;
        
        // Add DMS coordinates
        if (loc.dms) {
          pdf.setTextColor(71, 85, 105);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('DMS:', margin + 4, yPosition);
          pdf.setTextColor(15, 23, 42);
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(loc.dms, margin + 30, yPosition);
          yPosition += 7;
        }
        
        // Add short coordinates
        if (loc.short) {
          pdf.setTextColor(71, 85, 105);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Short:', margin + 4, yPosition);
          pdf.setTextColor(15, 23, 42);
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          pdf.text(loc.short, margin + 30, yPosition);
          yPosition += 7;
        }
        
        // Add footer on each page with improved styling
        const footerY = pageHeight - 12;
        
        // Footer background
        pdf.setFillColor(248, 250, 252);
        pdf.rect(0, footerY - 5, pageWidth, 17, 'F');
        
        // Footer border
        pdf.setDrawColor(203, 213, 225);
        pdf.setLineWidth(0.5);
        pdf.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
        
        // Footer text
        pdf.setTextColor(100, 116, 139);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text('DFRE Pole Locations', pageWidth / 2, footerY, { align: 'center' });
        
        pdf.setFontSize(7);
        pdf.setTextColor(148, 163, 184);
        pdf.setFont('helvetica', 'italic');
        pdf.text('All coordinates are provided for reference only', pageWidth / 2, footerY + 4, { align: 'center' });
      }
      
      // Save the PDF
      const fileName = `dfre-pole-locations-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_center,_#ef4444,_#fb923c,_#fde047)] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-orange-900 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] flex-1">Locations</h1>
          <button
            onClick={handlePrintPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-4 py-2 bg-orange-900 text-white rounded-lg font-bold shadow-lg hover:bg-orange-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
            title="Download PDF with all locations"
          >
            <PrinterIcon className="w-5 h-5" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Print PDF'}
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {locations.map((loc, idx) => (
            <div key={idx} className="w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{loc.name}</h2>
                <div className="text-gray-700 text-xs mb-1">
                  <span className="font-medium">Decimal:</span> {loc.decimal}
                </div>
                {loc.dms && (
                  <div className="text-gray-700 text-xs mb-1">
                    <span className="font-medium">DMS:</span> {loc.dms}
                  </div>
                )}
                {loc.short && (
                  <div className="text-gray-700 text-xs mb-1">
                    <span className="font-medium">Short:</span> {loc.short}
                  </div>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleCopy(loc, idx)}
                    className="flex items-center gap-1 px-3 py-1 bg-orange-900 text-white rounded font-bold shadow hover:bg-orange-800 transition text-xs"
                    title="Copy coordinates and link"
                  >
                    <ClipboardIcon className="w-4 h-4" />
                    {copiedIdx === idx ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => handleShare(loc)}
                    className="flex items-center gap-1 px-3 py-1 bg-orange-900 text-white rounded font-bold shadow hover:bg-orange-800 transition text-xs"
                    title="Share location"
                  >
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <a
                  href={loc.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-orange-900 text-white rounded font-bold shadow hover:bg-orange-800 transition text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="w-full md:w-64 h-48 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title={loc.name}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(loc.decimal)}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 