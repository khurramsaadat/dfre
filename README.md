# Next.js Website

## Overview
This project is a modern, responsive website built with Next.js and Tailwind CSS. It features:
- A dynamic header and footer
- Feature cards for navigation
- Interactive DM 6 Assets and DM 3 Assets pages
- Custom social icon tooltips and color-invert hover effects

## Recent Updates (2024-04-27)
- Added a new DM 3 Assets page (`/dm3assets`) for independent editing
- Updated navbar: 'Services' is now 'DM 3 Assets' and links to `/dm3assets`; 'Contact' is now 'Design Studio'
- Footer social icons now use official SVGs, are consistently sized, and have a color-invert hover effect
- Custom tooltips for social icons show instantly with white text on a dark background

## Folder Structure
```
/src
  /app
    page.tsx           # Home page
    layout.tsx         # Root layout with Header and Footer
    /dm6assets
      page.tsx         # DM 6 Assets interactive layout
    /dm3assets
      page.tsx         # DM 3 Assets (new, independent)
  /components
    Header.tsx         # Navigation bar
    Footer.tsx         # Footer with social icons and tooltips
    Hero.tsx           # Hero section with feature cards
    FeatureCard.tsx    # Reusable card component
    DM6AssetsHeroLayout.tsx # Layout for DM 6 Assets page
    Typewriter.tsx     # Typewriter effect for hero section
/public
  /images              # Social icons, logos, and assets
```

## Usage
- Run `npm install` to install dependencies
- Run `npm run dev` to start the development server

## Notes
- DM 3 Assets and DM 6 Assets pages are now independent for easier updates
- Footer and navigation are visually and functionally improved for better UX
