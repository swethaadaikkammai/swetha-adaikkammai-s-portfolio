# Swetha's Portfolio

## Running the project

1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```
   Then open the URL it prints (usually http://localhost:5173).
3. To build for production:
   ```
   npm run build
   ```
   Output goes to the `dist/` folder, which you can deploy anywhere static (Vercel, Netlify, GitHub Pages, etc.).

## Editing content

All the text on the page (name, bio, education, work experience, skills, projects, volunteering, etc.) lives in plain data arrays/objects near the top of `src/App.tsx`. Edit those values directly — there's no in-browser "click to edit" UI, so changes are made in code and picked up automatically by the dev server.
