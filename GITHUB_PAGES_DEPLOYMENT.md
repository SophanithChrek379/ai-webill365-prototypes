# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js static site to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. Your project already built and working locally

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `ai-webill365-publishing`)
4. Make it public (GitHub Pages requires public repositories for free accounts)
5. Don't initialize with README, .gitignore, or license (since you already have a project)
6. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

Since you already have a Git repository, you need to change the remote origin to point to GitHub:

```bash
# Remove the current origin
git remote remove origin

# Add your GitHub repository as the new origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Verify the new remote
git remote -v
```

## Step 3: Push Your Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit for GitHub Pages deployment"

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. This will use the workflow file we created (`.github/workflows/deploy.yml`)

## Step 5: Deploy

The GitHub Actions workflow will automatically:

1. Build your Next.js project
2. Generate static files in the `out` directory
3. Deploy them to GitHub Pages

You can monitor the deployment progress in the "Actions" tab of your repository.

## Step 6: Access Your Site

Your site will be available at:

```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME
```

## Automatic Deployment

Every time you push changes to the `main` branch, GitHub Actions will automatically:

1. Build your project
2. Deploy the updated site

## Manual Deployment

If you want to deploy manually, you can run:

```bash
# Build the project
npm run build

# Add and commit changes
git add .
git commit -m "Update site"

# Push to trigger deployment
git push origin main
```

## Troubleshooting

### Build Issues

- Check the "Actions" tab in your GitHub repository for build errors
- Ensure all dependencies are properly listed in `package.json`
- Verify your Next.js configuration is correct

### 404 Errors

- Make sure your `next.config.ts` has `trailingSlash: true` for GitHub Pages compatibility
- Check that all internal links use relative paths

### Assets Not Loading

- Ensure all assets are in the `public` directory
- Check that image paths are correct in your components

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your repository Settings > Pages
2. Under "Custom domain", enter your domain
3. Add a CNAME file to your `public` directory with your domain
4. Configure your DNS settings to point to GitHub Pages

## Environment Variables

If your app uses environment variables, you'll need to add them in GitHub:

1. Go to your repository Settings > Secrets and variables > Actions
2. Add your environment variables as repository secrets
3. Update the workflow file to use them if needed

## Performance Optimization

- Your static site will be served from GitHub's CDN
- Images and assets are automatically optimized
- Consider using Next.js Image component for better performance

## Support

If you encounter issues:

1. Check the GitHub Actions logs in the "Actions" tab
2. Verify your repository settings
3. Ensure your code builds locally before pushing
