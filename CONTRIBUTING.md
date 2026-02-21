# Contributing to SereneHub

We welcome contributions to SereneHub! This guide will help you get started.

## Development Setup

### Smart Contracts (Clarinet)

1. Install [Clarinet](https://github.com/hirosystems/clarinet).
2. Navigate to `serenehub-contracts/`.
3. Run tests:
   ```bash
   clarinet test
   ```
4. Start a local Devnet (optional):
   ```bash
   clarinet integrate
   ```

### Frontend (Next.js)

1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

## Code Style

- **Frontend**: We use ESLint and Prettier. Run `npm run lint` before committing.
- **Contracts**: Follow standard Clarity naming conventions (kebab-case).

## Pull Request Process

1. Fork the repository.
2. Create a feature branch (`feat/my-feature`).
3. Commit your changes.
4. Push to the branch.
5. Create a Pull Request targeting `main`.
