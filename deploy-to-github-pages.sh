#!/bin/bash

echo "🚀 Setting up GitHub Pages deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first."
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository as origin."
    echo "Example: git remote add origin https://github.com/username/repository.git"
    exit 1
fi

echo "✅ Git repository found"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully"

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ 'out' directory not found. Build may have failed."
    exit 1
fi

echo "📁 Static files generated in 'out' directory"

# Add all files to git
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date)"

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Push to remote
echo "🚀 Pushing to remote repository..."
git push origin $CURRENT_BRANCH

echo ""
echo "🎉 Deployment setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Go to Settings > Pages"
echo "3. Under 'Source', select 'GitHub Actions'"
echo "4. The GitHub Actions workflow will automatically deploy your site"
echo ""
echo "Your site will be available at: https://username.github.io/repository-name"
echo ""
echo "Note: Replace 'username' and 'repository-name' with your actual GitHub username and repository name." 