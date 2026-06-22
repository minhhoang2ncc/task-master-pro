# Task Master Pro

A modern, modular task management dashboard built with React, TypeScript, Vite, and shadcn/ui.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Recharts** - Data visualization
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Architecture

This project follows a **Modular Monolith** architecture:

```
src/
├── app/                 # Global application setup
├── shared/              # Reusable UI components & utilities
├── pages/               # Pages that contain modules
└── modules/             # Business domain modules
    ├── dashboard/       # Dashboard features
    ├── analytics/       # Analytics & reporting
    ├── settings/        # User settings
```

## Getting Started

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Features

- Dashboard with summary cards and task list
- Analytics with charts and performance metrics
- Light/Dark mode support
- User settings and profile management
- Multi-language support (English, Spanish, Vietnamese)
- Responsive design
- Accessible components

## Deployment

This project is configured to deploy to **GitHub Pages**.

### GitHub Pages Setup

1. **Enable GitHub Pages**: Go to Settings → Pages → Source: GitHub Actions
2. **Push to main branch** - The workflow will automatically deploy
3. **Access your site**: `https://yourusername.github.io/task-master-pro/`

The deployment workflow:
- Builds the project on push to main branch
- Runs `npm run build` to create optimized production build
- Uploads artifacts to GitHub Pages
- Deploys automatically

### Local Deployment

To test the production build locally:
```bash
npm run build
npm run preview
```

## Adding Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add button
```

Components will be installed in `src/shared/components/`

## Development Tips

- **Import paths**: Use `@/shared/components/*` for shared components and `@/modules/*/` for module-specific files
- **Styling**: Use Tailwind CSS with `dark:` prefix for dark mode support
- **Colors**: Use Tailwind color palette (indigo for primary, yellow for dark mode accent)
- **Theme**: Toggle between light/dark modes in Settings page
- **API ready**: Mock data in components can be replaced with real API calls

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

