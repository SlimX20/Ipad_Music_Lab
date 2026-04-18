# iPad Music Lab

## Overview
This project is a minimal static web starter for the imported `Ipad_Music_Lab` repository. The original import contained only a README and license, so a small public landing page was added to make the project runnable in Replit.

## Project Structure
- `public/index.html` - Static landing page entry point.
- `public/styles.css` - Styling for the landing page.
- `README.md` - Original imported project description.

## Runtime
The project runs as a static site served from the `public` directory on port 5000 using Python's built-in HTTP server.

## Development Notes
- The frontend workflow must bind to `0.0.0.0:5000` so it is visible in the Replit preview.
- Deployment is configured as a static site with `public` as the public directory.
