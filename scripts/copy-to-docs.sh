#!/bin/bash

# Script to copy built redoc files to docs directory
# Usage: ./scripts/copy-to-docs.sh

DOCS_DIR="../docs"
REDOC_DIR="redoc-custom"

echo "Copying redoc build files to docs directory..."

# Create redoc directory in docs if it doesn't exist
mkdir -p "$DOCS_DIR/$REDOC_DIR"

# Copy the built bundles
cp bundles/redoc.lib.js "$DOCS_DIR/$REDOC_DIR/"
cp bundles/redoc.standalone.js "$DOCS_DIR/$REDOC_DIR/"

# Copy TypeScript declarations
cp -r typings "$DOCS_DIR/$REDOC_DIR/"

# Copy package.json for version info
cp package.json "$DOCS_DIR/$REDOC_DIR/"

echo "Files copied to $DOCS_DIR/$REDOC_DIR/"
echo ""
echo "Available files:"
ls -la "$DOCS_DIR/$REDOC_DIR/"
echo ""
echo "To use in your docs:"
echo "1. Include redoc.standalone.js in your HTML:"
echo "   <script src='redoc-custom/redoc.standalone.js'></script>"
echo ""
echo "2. Or use as a module:"
echo "   import Redoc from './redoc-custom/redoc.lib.js'"
