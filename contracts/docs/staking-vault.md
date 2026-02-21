# Staking Vault Contract

**Contract Name:** `serenehub-staking-vault`

## Constants
- `LOCK-PERIOD`: 144 blocks (~24 hours)
- `EARLY-WITHDRAWAL-FEE`: 2.5%
- `NORMAL-WITHDRAWAL-FEE`: 0.5%

## Data Structures

### `stakes` (Map)
Maps `principal` to:
- `amount`: Uint
- `unlock-height`: Uint

## Functions

### `stake`
- **Args**: `(amount uint)`
- **Description**: Locks STX in the contract.
- **Logic**: Updates `unlock-height` to `burn-block-height + LOCK-PERIOD`.

### `request-unstake`
- **Args**: `(amount uint)`
- **Description**: Withdraws staked STX.
- **Logic**: Checks if `burn-block-height >= unlock-height`. Applies appropriate fee.
