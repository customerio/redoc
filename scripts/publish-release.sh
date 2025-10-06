#!/bin/bash

# Script to publish a new release of custom redoc
# Usage: ./scripts/publish-release.sh [version]

set -e

VERSION=${1:-"patch"}

echo "🚀 Publishing new redoc release..."

# Get current commit hash
COMMIT_HASH=$(git rev-parse --short HEAD)
echo "📝 Current commit: $COMMIT_HASH"

# Build the bundles
echo "🔨 Building bundles..."
npm run bundle:working

# Check if there are any changes to commit
if git diff --quiet && git diff --cached --quiet; then
    echo "✅ No changes to commit"
else
    echo "📦 Committing build changes..."
    git add bundles/ typings/ .gitpkg.json
    git commit -m "Build bundles for release (commit: $COMMIT_HASH)"
fi

# Publish with gitpkg
echo "📤 Publishing with gitpkg..."
gitpkg publish

echo ""
echo "🎉 Release published successfully!"
echo ""
echo "📋 To use in your docs, update your package.json with:"
echo "   \"redoc\": \"git+https://ghp_YOUR_TOKEN@github.com/customerio/redoc.git#$COMMIT_HASH\""
echo ""
echo "🔗 Or use the latest commit hash: $COMMIT_HASH"
