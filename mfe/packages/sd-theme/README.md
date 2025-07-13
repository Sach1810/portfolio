# Sacha Theme Package

A modern SCSS theme system with light/dark mode support and live reload capabilities.

## Features

- 🎨 Complete design system with colors, typography, spacing
- 🌓 Dark/light mode with automatic system preference detection
- ⚡ Live reload during development
- 📦 Modular SCSS architecture
- 🎯 Ready for production use

## Development Setup

### 1. Start Theme Package in Watch Mode

```bash
cd theme-package
npm run watch
```

This will automatically rebuild the theme CSS whenever you make changes to the SCSS files.

### 2. Use in Client App

The client app is already configured to import the theme:

```javascript
// In client/src/main.js
import "../theme-package/dist/theme.css";
```

### 3. Test Theme Changes

1. Open your client app in the browser
2. Navigate to the homepage to see the theme test section
3. Make changes to any SCSS file in `theme-package/src/styles/`
4. The changes will automatically rebuild and hot reload in your client app

## File Structure

```
theme-package/
├── src/
│   ├── styles/
│   │   ├── _variables.scss    # Design tokens
│   │   ├── _theme.scss        # Theme system & utilities
│   │   ├── _base.scss         # Base styles
│   │   └── main.scss          # Main entry point
│   └── index.js               # JavaScript utilities
├── dist/
│   └── theme.css              # Compiled CSS (auto-generated)
└── vite.config.js             # Build configuration
```

## Usage

### CSS Classes

```html
<!-- Background colors -->
<div class="bg-primary">Primary Background</div>
<div class="bg-secondary">Secondary Background</div>
<div class="bg-accent">Accent Background</div>

<!-- Text colors -->
<p class="text-primary">Primary Text</p>
<p class="text-secondary">Secondary Text</p>
<p class="text-accent">Accent Text</p>

<!-- Shadows -->
<div class="shadow-sm">Small Shadow</div>
<div class="shadow-md">Medium Shadow</div>
<div class="shadow-lg">Large Shadow</div>
```

### SCSS Mixins

```scss
@use "../theme-package/src/styles/_theme.scss" as theme;

.my-button {
  @include theme.themed-button;
}

.my-card {
  @include theme.themed-card;
}

.my-input {
  @include theme.themed-input;
}
```

### JavaScript Theme Utilities

```javascript
import { themeUtils } from '../theme-package/src/index.js'

// Toggle theme
themeUtils.toggleTheme()

// Set specific theme
themeUtils.setTheme('dark')

// Get current theme
const currentTheme = themeUtils.getCurrentTheme()
```

## Theme Switching

The theme automatically:
- Detects system preference (light/dark)
- Saves user preference to localStorage
- Provides smooth transitions between themes
- Updates when system preference changes

## Development Workflow

1. **Edit theme files** in `theme-package/src/styles/`
2. **Watch mode** automatically rebuilds CSS
3. **Client app** hot reloads with new styles
4. **No manual rebuilding** required

## Production Build

```bash
cd theme-package
npm run build
```

This creates `dist/theme.css` for production use.

## Customization

### Override Variables

```scss
// In your main SCSS file
$c-accent: #your-custom-color;

@import '../theme-package/src/styles/main.scss';
```

### Custom Theme

```scss
:root {
  --c-accent: #your-custom-color;
  --c-bg-primary: #your-custom-bg;
}

[data-theme="dark"] {
  --c-accent: #your-custom-dark-color;
  --c-bg-primary: #your-custom-dark-bg;
}
``` 