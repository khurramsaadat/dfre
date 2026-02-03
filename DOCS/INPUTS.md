# User Inputs Log

_Log all user inputs here with timestamps (YYYY-MM-DD HH:mm) as per project rules._ 

2024-06-09  User input: save (after navbar icons, copy/share buttons, client fix, and error investigation)

2024-06-09  User input: Rename ds to design-studio, add Locations page and links in navbar/footer, embed Google Maps.

2024-06-09  [User]: Requested DFRE Schedule card on homepage to open /design-studio page (same as navbar/footer). Command: save 

2024-06-09:
- User requested to reduce navbar link size (desktop, match footer, icon too).
- User requested gap between navbar link and underline (desktop only, -8px).
- User requested icons in footer quick links (same as navbar, before text, all sizes).
- User requested underline in footer only on hover/active, like navbar.
- User requested underline under both icon and text in footer.
- User requested increased gap and shorter underline in footer.
- User requested footer quick links font size to match navbar (text-sm).
- User requested Playwright checks for font size consistency.
- User confirmed all changes and requested save.

2024-11-20:
- User requested Print PDF button on locations page for downloading PDF version of locations.
- Initial requirements: Multi-page PDF (separate PDF for each location), single button at top right, printer-friendly white background with modern UI/UX, embedded Google Maps iframes captured in PDF, filename format: location-name.pdf, title: "DFRE Pole Locations".
- User requested correction: ONE PDF with multiple pages (each location on separate page), text should be selectable for copy/paste, links and location maps should be clickable, additional improvements needed.
- User feedback on PDF improvements:
  - Add Page 1 as index/cover page with title "DFRE Pole Locations"
  - Keep location title (e.g., "Pole: Al Garhoud") on each location page
  - Remove "Generated: November 20, 2025 at 5:36:20 PM" timestamp from pages
  - Fix Location Map Preview not showing issue (second request - critical)
  - Remove strange characters (emoji) before "Click map to open in Google Maps"
  - User provided reference image showing expected map preview (satellite/hybrid view with streets and labels)
  - Implemented multiple fallback map services to ensure maps load reliably
  - User reported "Invalid Key" error for map preview - external APIs not working
  - Changed approach to create professional map placeholder instead of external API calls
  - User requested index page to be clickable (links to specific pages)
  - User requested to remove "Generated: November 20, 2025" from index page
  - User requested to remove emoji (📍) before "CLICK ANYWHERE TO VIEW INTERACTIVE MAP"
  - User provided new location order:
    1. Pole-1 Ittihad Road
    2. Pole-2 SZR Last Exit
    3. Pole-3 Airport Road
    4. Pole-4 MBZ Road
    5. Pole-5 Garhoud Road
    6. Pole-6 Al Ain Road
    7. Pole-7 Al Khail Road
  - User provided PNG map screenshot for Pole-5 Garhoud Road
  - User requested to use PNG images for map previews with size optimization for web
  - Implemented automatic PNG loading from public/images folder with compression
  - User replaced all PNG files with JPG files (all 7 poles)
  - User requested to use JPG images as-is without compression/resizing
  - Updated code to load JPG images at full quality without optimization
  - User requested more space above "Location Map Preview" title
  - User requested overall style and look & feel improvements for PDF pages
  - User pointed out emojis show as strange characters in PDF - remove ALL emojis
  - User requested outline/border for map preview images
  - User requested more space above "Decimal:" text (not too close to Coordinates box)
  - User requested dark grey text instead of blue colors
  - User requested layout and color improvements:
    - More space between "Pole-1" and "Table of Contents" (18mm instead of 16mm)
    - Move "Location Map Preview" text closer to image (6mm spacing instead of 8mm)
    - Remove separator line under "Location Map Preview"
    - Change Coordinates box and Table of Contents box to same colors as Google Maps Link box (warm orange background #FFF7ED, golden border #FBC02D)
    - Reorganize: Move Coordinates section AFTER map preview (Google Maps Link → Map Preview → Coordinates)
  - User reported overlap between Google Maps Link and Location Map Preview on location pages
  - Fixed spacing: Increased gap from 10mm to 26mm after Google Maps box to prevent overlap
  - User requested more space above "Location Map Preview" text
  - Increased spacing from 26mm to 30mm (20mm box + 10mm gap)
  - User requested to push all code to GitHub repo

2024-11-20:
- User requested changes to dm6assets page:
  - Replace "Promo Path" input field with a button called "Load Dubai Logos"
  - Remove "DMS Link" input field and its label
  - Implemented "Load Dubai Logos" button that loads Dubai Municipality logo images into all boxes
  - User requested to remove "Promo Schedule" input field and its label
  - User requested to remove "Save PDF" button and all PDF-related code
  - Removed jsPDF import and all PDF generation functionality
  - Removed promo details display section from layout
- User requested UI/UX improvements for dm6assets panel:
  - Buttons to be blue and text to be white
  - Improved panel styling with dark background
  - Enhanced button hover effects and transitions
  - Updated "Load Dubai Logos" button to load specific images:
    - "640x360 01.jpg" → Box 1 and Box 4
    - "800x180 01.jpg" → Box 3 and Box 6
    - "1280x720.jpg" → Box 2 and Box 5
- User requested additional improvements:
  - Add tooltips to all controls in dm6assets panel
  - Show small preview image of Dubai logo next to "Load Dubai Logos" button
  - Implement similar controls for dm3assets page with same styling and functionality
- User requested to update all dependencies to latest versions
  - Updated Next.js from 14.1.0 to 15.5.11
  - Updated React from 18.2.0 to 19.2.4
  - Updated React-DOM from 18.2.0 to 19.2.4
  - Updated TypeScript from 5.3.3 to 5.8.3
  - Updated jsPDF from 3.0.1 to 4.1.0
  - Updated all other dependencies to latest versions
  - Build successful with all updated dependencies
  - User corrected: Next.js 15.5.11 is not the latest version
  - Updated to Next.js 16.1.6 (latest stable version)
  - Updated eslint-config-next to match Next.js 16.1.6 