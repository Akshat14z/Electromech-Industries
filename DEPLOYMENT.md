# GitHub Pages Deployment Guide

## Quick Deployment Steps

1. **Make your changes** to the code

2. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## Important Configuration

- **Base Path:** `/Electromech-Industries/` (configured in `vite.config.js`)
- **Homepage:** `https://akshat14z.github.io/Electromech-Industries/`
- **Deploy Script:** Uses `gh-pages` to deploy the `dist` folder

## GitHub Pages Settings

Make sure your GitHub repository has GitHub Pages enabled:

1. Go to your repository: `https://github.com/Akshat14z/Electromech-Industries`
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select **gh-pages** branch
5. Select **/ (root)** folder
6. Click **Save**

## Troubleshooting

### If deployment fails:
- Make sure `gh-pages` is installed: `npm install --save-dev gh-pages`
- Check that you have a `dist` folder after running `npm run build`
- Verify your GitHub repository name matches the base path

### If the site doesn't update:
- Wait 1-2 minutes for GitHub Pages to rebuild
- Clear your browser cache (Ctrl+Shift+R)
- Check the GitHub Pages URL: `https://akshat14z.github.io/Electromech-Industries/`

### Common Issues:
- **404 Error:** Make sure the base path in `vite.config.js` matches your repository name
- **Blank Page:** Check browser console for errors
- **Old Content:** Clear cache and wait for GitHub Pages to update

## Your Site URL

Your deployed site should be available at:
**https://akshat14z.github.io/Electromech-Industries/**

