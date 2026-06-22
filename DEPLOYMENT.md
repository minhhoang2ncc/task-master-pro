# Deployment Guide for Task Master Pro

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Prerequisites

1. Push your code to GitHub
2. Ensure your repository is public (or private with GitHub Pages enabled)
3. The repository name should match the `base` in `vite.config.ts`

### Automatic Deployment

**Workflow File**: `.github/workflows/deploy.yml`

The workflow:
- ✅ Triggers on push to `main` branch (or manually via workflow_dispatch)
- ✅ Installs dependencies with `npm ci`
- ✅ Builds the project with `npm run build`
- ✅ Uploads the `dist/` directory to GitHub Pages
- ✅ Deploys automatically

### Configuration

**Vite Config** (`vite.config.ts`):
```typescript
base: "/task-master-pro/"  // Must match your GitHub repo name
```

Change `task-master-pro` to your actual repository name.

### Access Your Site

After the first deployment:
```
https://yourusername.github.io/task-master-pro/
```

### Manual Deployment

If needed, you can manually trigger the deployment:

1. Go to **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

### Troubleshooting

**Issue**: Site not showing up after push
- ✓ Wait 1-2 minutes for the workflow to complete
- ✓ Check the **Actions** tab for workflow status
- ✓ Verify Settings → Pages shows "Deployed successfully"

**Issue**: 404 errors on page refresh
- ✓ Ensure React Router has `basename="/task-master-pro/"` 
- ✓ Check `vite.config.ts` `base` setting matches your repo name

**Issue**: Assets not loading
- ✓ Verify `base` path in `vite.config.ts` is correct
- ✓ Check that build output is in `dist/` directory

### Environment Variables

If you need environment variables:

1. Create a `.env.local` file locally (not committed)
2. For GitHub Actions, add secrets in Settings → Secrets and variables → Actions
3. Update the workflow to use them:

```yaml
- name: Build project
  env:
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
  run: npm run build
```

### Performance

The built site includes:
- ✅ Optimized JavaScript bundles
- ✅ CSS minification
- ✅ Image optimization
- ✅ Tree-shaking of unused code
- ✅ Source maps for debugging (production)

### Next Steps

1. Push to GitHub: `git push origin main`
2. Wait for workflow to complete (check Actions tab)
3. Your site will be live at `https://yourusername.github.io/task-master-pro/`
4. Share the link! 🚀
