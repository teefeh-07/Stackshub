# NFT Marketplace Contract

**Contract Name:** `serenehub-nft-marketplace`

## Data Structures

### `listings` (Map)
Stores active listings mapping `token-id` to:
- `maker`: Principal (seller)
- `price`: Uint (in microSTX)

## Functions

### `mint`
- **Args**: `(uri (string-ascii 256))`
- **Description**: Mints a new NFT with the provided metadata URI.
- **Cost**: Transaction fee only.

### `list-nft`
- **Args**: `(token-id uint) (price uint)`
- **Description**: Lists an NFT for sale. Transfers the NFT to the contract for custody.
- **Checks**: Sender must be owner.

### `buy-nft`
- **Args**: `(token-id uint)`
- **Description**: Purchases a listed NFT.
- **Transfers**:
  - Price * 98.75% -> Seller
  - Price * 1.25% -> Protocol
  - NFT -> Buyer
