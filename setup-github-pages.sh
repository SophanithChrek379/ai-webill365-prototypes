#!/bin/bash

echo "🎯 GitHub Pages Setup Script"
echo "============================"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "Please run this script from your project root directory"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if GitHub Actions workflow exists
if [ ! -f ".github/workflows/deploy.yml" ]; then
    echo "❌ Error: GitHub Actions workflow not found"
    echo "Please ensure .github/workflows/deploy.yml exists"
    exit 1
fi

echo "✅ GitHub Actions workflow found"

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "⚠️  Warning: 'out' directory not found"
    echo "Building project..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Build failed"
        exit 1
    fi
fi

echo "✅ Static build ready"

# Show current remote
echo ""
echo "🔗 Current remote configuration:"
git remote -v

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create a GitHub repository (if you haven't already)"
echo "   - Go to https://github.com/new"
echo "   - Name it: ai-webill365-publishing"
echo "   - Make it PUBLIC (required for free GitHub Pages)"
echo ""
echo "2. Update your remote origin:"
echo "   git remote set-url origin https://github.com/YOUR_USERNAME/ai-webill365-publishing.git"
echo ""
echo "3. Push your code:"
echo "   git add ."
echo "   git commit -m 'Setup GitHub Pages deployment'"
echo "   git push -u origin $CURRENT_BRANCH"
echo ""
echo "4. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Settings > Pages"
echo "   - Source: GitHub Actions"
echo ""
echo "5. Your site will be available at:"
echo "   https://YOUR_USERNAME.github.io/ai-webill365-publishing"
echo ""
echo "📖 For detailed instructions, see: GITHUB_PAGES_DEPLOYMENT.md" 