# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2024-04-25

### Added
- Initial project setup with Next.js and Tailwind CSS
- Created basic layout with Header, Hero, and Footer components
- Added three feature cards to the Hero section:
  - Dubai Municipality - 6 Assets
  - Dubai Municipality - 3 Assets
  - DFRE Schedule
- Created reusable FeatureCard component
- Added images for all cards
- Implemented responsive design for all components
- Created public/images directory for asset organization
- Added detailed page for Dubai Municipality - 6 Assets
- Implemented card navigation functionality
- Created DMBoxLayout component for image layout management
- Added interactive image upload functionality
- Implemented dynamic date display
- Added background color customization

### Changed
- Updated Hero section to include feature cards
- Modified layout to accommodate new components
- Added Dubai Municipality logo images for all cards
- Enhanced FeatureCard component with improved image handling and hover effects
- Corrected image path to use proper public/images directory structure
- Increased image container height and adjusted padding for better image display
- Updated card descriptions and content
- Replaced placeholder images with actual Dubai Municipality logos
- Added click interaction and navigation to the first card
- Enhanced card hover effects with smooth transitions
- Transformed Dubai Municipality 6 Assets page into an interactive layout tool

### Technical Details
- Used Next.js 14.1.0
- Implemented TypeScript for type safety
- Used Tailwind CSS for styling
- Created modular components for better maintainability
- Optimized image loading with Next.js Image component
- Implemented client-side navigation using Next.js router
- Added client-side image processing and layout management

## [0.1.1] - 2024-04-26

### Changed
- Updated the navigation for the first card on the home page to take the user to the DM6Assets page.
- Removed the unused page at `/dubai-municipality-6-assets`.
- Updated DM6Assets page to use DM6AssetsHeroLayout component for proper layout display.

### Fixed
- Corrected the component import in DM6Assets page to properly display the layout.
- Fixed type error in Hero component by adding proper TypeScript interface for hideButtons prop.

### Added
- Added Netlify deployment configuration with netlify.toml

### Current Folder Structure
```