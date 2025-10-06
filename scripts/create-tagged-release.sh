#!/bin/bash

# Script to create a tagged release with bundles
# Usage: ./scripts/create-tagged-release.sh [version]

set -e

VERSION=${1:-"patch"}

echo "🏷️  Creating tagged release..."

# Get current commit hash
COMMIT_HASH=$(git rev-parse --short HEAD)
echo "📝 Current commit: $COMMIT_HASH"

# Build the bundles
echo "🔨 Building bundles..."
npm run bundle:working

# Commit the build
echo "📦 Committing build changes..."
git add bundles/ typings/ .gitpkg.json
git commit -m "Build bundles for release (commit: $COMMIT_HASH)"

# Create and push tag
echo "🏷️  Creating tag..."
git tag -a "v2.5.1-custom-$(date +%Y%m%d-%H%M%S)" -m "Custom redoc release with region selector and styling hooks"
git push origin main --tags

echo ""
echo "🎉 Tagged release created successfully!"
echo ""
echo "📋 To use in your docs, update your package.json with:"
echo "   \"redoc\": \"git+https://ghp_YOUR_TOKEN@github.com/customerio/redoc.git#TAG_NAME\""
echo ""
echo "🔗 Or use the commit hash: $COMMIT_HASH"
