# AsgardFi Terminal

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLloZPzV8kCG72j5tv1VFcqVmKxmXP9isGwg&s" alt="AsgardFi Logo" width="100" />

## Overview

AsgardFi Terminal is an on-chain DeFi prime brokerage on Solana, focusing on providing tools for safe and convenient leverage across DeFi protocols such as marginfi, Kamino, and Solend. This dashboard allows users to monitor, analyze, and interact with various Solana DeFi protocols in a unified interface.

## Features

- **Protocol View**: Analyze protocol data with detailed metrics
- **Token View**: Track token performance across various markets
- **Drift Vaults**: Monitor Drift protocol vaults with detailed metrics
- **Stablecoin Yields**: Compare stablecoin lending yields across protocols
- **SOL Yields**: Track SOL lending rates, staking yields, and interest rate differentials
- **JLP & LP Yields**: Access comprehensive yield data for Jupiter LP and other liquidity providers
- **Real-time Metrics**: View up-to-date protocol performance data
- **Responsive Design**: Optimized for both desktop and mobile experiences

## Technologies

This project is built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- Recharts for data visualization
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd asgardfi-terminal-forge

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### Accessing the Application

Once the development server is running, you can access the application at `http://localhost:5173` (or the port specified in your terminal).

## Development

### Project Structure

- `/src/components`: UI components
- `/src/pages`: Page components
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and data

### Adding New Features

1. Create new components in the `/src/components` directory
2. Update routing in the Dashboard component to include new views
3. Follow the existing design patterns for consistent UI/UX

## Deployment

### Build for Production

```sh
# Generate a production build
npm run build

# Preview the production build locally
npm run preview
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Hosting Options

This application can be deployed to various hosting platforms:

- Vercel
- Netlify
- GitHub Pages
- AWS S3/CloudFront
- Any static site hosting service

### Custom Domain

To connect a custom domain to your AsgardFi Terminal:

1. Configure your DNS settings with your domain provider
2. Set up the appropriate records (A, CNAME) pointing to your hosting service
3. Configure SSL/TLS for secure connections

## License

© 2025 AsgardFi. All rights reserved.
