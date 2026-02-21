# SereneHub Smart Contracts

This directory contains the Clarity smart contracts that power the SereneHub platform.

## Contracts Overview

### 1. NFT Marketplace (`serenehub-nft-marketplace.clar`)
Handles the creation and trading of Non-Fungible Tokens (SIP-009).
- **Minting**: Users can mint new NFTs with a metadata URI.
- **Listing**: Owners can list NFTs for sale at a specific price (in STX).
- **Buying**: Users can purchase listed NFTs. The contract handles royalty/fee distribution (1.25% platform fee).

### 2. Service Registry (`serenehub-service-registry.clar`)
A decentralized registry for off-chain service providers.
- **Registration**: Providers pay a one-time fee (2.5 STX) to list a service.
- **Payment**: Clients pay for services on-chain. The contract facilitates the transfer, taking a 1.5% platform fee.

### 3. Staking Vault (`serenehub-staking-vault.clar`)
A DeFi component for staking STX.
- **Stake**: Users lock STX into the vault.
- **Unstake**: Users can request to withdraw their stake.
- **Fees**:
  - 0.5% for standard withdrawals (after lock period).
  - 2.5% for early emergency withdrawals.

### 4. Token Launchpad (`serenehub-token-launchpad.clar`)
A factory for creating SIP-010 fungible tokens.
- **Create Token**: Users deploy a new token with custom name, symbol, decimals, and supply.
- **Cost**: Fixed creation fee of 5 STX.

## Development

Prerequisites: [Clarinet](https://github.com/hirosystems/clarinet)

### Running Tests
```bash
clarinet test
```

### Local Devnet
```bash
clarinet integrate
```
