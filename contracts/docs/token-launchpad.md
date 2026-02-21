# Token Launchpad Contract

**Contract Name:** `serenehub-token-launchpad`

## Constants
- `CREATION-FEE`: 5 STX

## Functions

### `create-token`
- **Args**:
  - `name`: (string-ascii 32)
  - `symbol`: (string-ascii 10)
  - `decimals`: uint
  - `initial-supply`: uint
- **Description**: Deploys a new SIP-010 fungible token.
- **Note**: Currently uses a simplified factory model where the contract tracks created tokens rather than dynamically deploying separate contracts (due to Clarity constraints, this usually requires a trait-based approach or a template).
