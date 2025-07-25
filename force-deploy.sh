#!/bin/bash

echo "🚀 Force Deploy Script for GitHub Pages"
echo "========================================"

# Add a timestamp to force a new commit
timestamp=$(date +"%Y-%m-%d %H:%M:%S")
echo "📅 Timestamp: $timestamp"

# Create a deployment marker file
echo "Deployment forced at: $timestamp" > .deployment-marker

# Add and commit the changes
git add .
git commit -m "🔧 Force fresh deployment to fix mixed content issues - $timestamp"

# Push to trigger GitHub Actions
echo "📤 Pushing to GitHub to trigger deployment..."
git push origin main

echo "✅ Deployment triggered!"
echo "📋 Next steps:"
echo "1. Check GitHub Actions: https://github.com/SophanithChrek379/ai-webill365-prototypes/actions"
echo "2. Wait for deployment to complete (3-5 minutes)"
echo "3. Clear browser cache and test: https://sophanithchrek379.github.io/ai-webill365-prototypes/"
echo "4. Check browser console for mixed content errors"

echo ""
echo "🔍 To monitor deployment:"
echo "   - GitHub Actions: https://github.com/SophanithChrek379/ai-webill365-prototypes/actions"
echo "   - Live site: https://sophanithchrek379.github.io/ai-webill365-prototypes/" 