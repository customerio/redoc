# Custom Redoc Release Guide

This guide explains how to generate a new release of your custom redoc package with the region selector and styling hooks.

## 🎯 What's Custom

- **Region Selector**: US/EU dropdown in the sidebar
- **Response Classes**: Dynamic classes like `200response`, `404response`, etc.
- **Parameter Classes**: `queryParams`, `pathParams`, `cookieParams`, `headerParams`
- **Operation Classes**: `opContent` for operation content styling
- **Updated to v2.5.1**: Latest redoc features with your customizations

## 🚀 Quick Release

### Option 1: Automated Script
```bash
# Publish a new release
./scripts/publish-release.sh

# This will:
# 1. Build the bundles
# 2. Commit changes
# 3. Publish with gitpkg
# 4. Show you the commit hash to use
```

### Option 2: Manual Steps
```bash
# 1. Build the bundles
npm run bundle:working

# 2. Commit the build
git add bundles/ typings/ .gitpkg.json
git commit -m "Build bundles for release"

# 3. Publish with gitpkg
gitpkg publish
```

## 📦 Using in Your Docs

After publishing, update your docs `package.json`:

```json
{
  "dependencies": {
    "redoc": "git+https://ghp_YOUR_TOKEN@github.com/customerio/redoc.git#COMMIT_HASH"
  }
}
```

Replace:
- `YOUR_TOKEN` with your GitHub token
- `COMMIT_HASH` with the commit hash from the publish output

## 🎨 Available CSS Classes

### Region Selector
```css
.region-selector {
  /* Style the region dropdown container */
}
```

### Response Classes
```css
.200response { /* 200 status responses */ }
.404response { /* 404 status responses */ }
.500response { /* 500 status responses */ }
/* Any response code + 'response' */
```

### Parameter Classes
```css
.queryParams { /* Query parameters */ }
.pathParams { /* Path parameters */ }
.cookieParams { /* Cookie parameters */ }
.headerParams { /* Header parameters */ }
```

### Operation Classes
```css
.opContent { /* Operation content container */ }
```

## 🔧 Development Workflow

1. **Make changes** to TypeScript files in `/src`
2. **Test locally** with `npm run start:demo`
3. **Build bundles** with `npm run bundle:working`
4. **Publish release** with `./scripts/publish-release.sh`
5. **Update docs** with new commit hash

## 📁 File Structure

```
bundles/
├── redoc.lib.js          # Library bundle (for imports)
├── redoc.standalone.js   # Standalone bundle (for HTML)
└── typings/              # TypeScript declarations
```

## 🐛 Troubleshooting

### Build Issues
- Make sure all dependencies are installed: `npm install`
- Check TypeScript compilation: `npm run ts-check`
- Verify webpack config: `npx webpack --config webpack.working.js`

### Gitpkg Issues
- Ensure you're authenticated with GitHub
- Check that the repository is accessible
- Verify the commit hash exists

### Missing Classes
- Check that custom classes are in the source files
- Rebuild bundles after making changes
- Verify the classes are in the built bundles

## 📝 Notes

- The build process uses custom webpack configs (`webpack.working.js`, `webpack.standalone.js`)
- All custom functionality is preserved in the built bundles
- TypeScript declarations are included for IDE support
- The package is published as a git package, not to npm
