# MineShine

A premium avatar-based life-simulation game for children.

## How to Run

1. Install a local HTTP server (e.g., `npx http-server .` or Python `python -m http.server 8000`)
2. Open `http://localhost:8000/index.html` in a modern web browser.
3. For development, use a local server to avoid CORS issues with ES modules.

## Features

- Customizable avatar with emotions
- Room decoration with drag & drop furniture
- Multiple worlds to explore
- Persistent save with localStorage
- Smooth animations and interactions

## Architecture

- PixiJS for rendering
- Modular architecture with managers for different systems
- Event-driven communication
- SPA/PWA ready