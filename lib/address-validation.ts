// Address Validation for Stacks Blockchain
// Validates and formats Stacks addresses and contract identifiers

export interface AddressValidationResult {
  valid: boolean;
  error?: string;
}

export const STACKS_MAINNET_VERSION = 22;
export const STACKS_TESTNET_VERSION = 26;

export function getAddressVersion(network: 'mainnet' | 'testnet'): number {
  return network === 'mainnet' ? STACKS_MAINNET_VERSION : STACKS_TESTNET_VERSION;
}

export function isValidC32Address(address: string): boolean {
  const c32Regex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]+$/;
  return c32Regex.test(address);
}

export function validateStacksAddress(address: string, network: 'mainnet' | 'testnet'): AddressValidationResult {
  if (!address || address.length === 0) {
    return { valid: false, error: 'Address cannot be empty' };
  }
  
  if (!isValidC32Address(address)) {
    return { valid: false, error: 'Invalid C32 address format' };
  }
  
  return { valid: true };
}

export interface ContractIdentifier {
  address: string;
  contractName: string;
}

export function parseContractIdentifier(contractId: string): ContractIdentifier | null {
  const parts = contractId.split('.');
  if (parts.length !== 2) return null;
  return { address: parts[0], contractName: parts[1] };
}

export function isValidContractName(name: string): boolean {
  const contractNameRegex = /^[a-zA-Z]([a-zA-Z0-9]|[-_])*$/;
  return contractNameRegex.test(name) && name.length <= 128;
}

export function validateContractIdentifier(contractId: string, network: 'mainnet' | 'testnet'): AddressValidationResult {
  const parsed = parseContractIdentifier(contractId);
  
  if (!parsed) {
    return { valid: false, error: 'Invalid contract identifier format' };
  }
  
  const addressValidation = validateStacksAddress(parsed.address, network);
  if (!addressValidation.valid) {
    return addressValidation;
  }
  
  if (!isValidContractName(parsed.contractName)) {
    return { valid: false, error: 'Invalid contract name' };
  }
  
  return { valid: true };
}

export interface PrincipalType {
  type: 'standard' | 'contract';
  network?: 'mainnet' | 'testnet';
}

export function getPrincipalType(principal: string): PrincipalType | null {
  if (principal.includes('.')) {
    return { type: 'contract' };
  }
  return { type: 'standard' };
}

export function formatContractIdentifier(address: string, contractName: string): string {
  return \`\${address}.\${contractName}\`;
}

export class AddressValidator {
  private network: 'mainnet' | 'testnet';
  
  constructor(network: 'mainnet' | 'testnet') {
    this.network = network;
  }
  
  validate(address: string): AddressValidationResult {
    return validateStacksAddress(address, this.network);
  }
  
  validateContract(contractId: string): AddressValidationResult {
    return validateContractIdentifier(contractId, this.network);
  }
}

export function normalizeAddress(address: string): string {
  return address.toUpperCase().replace(/[^0123456789ABCDEFGHJKMNPQRSTVWXYZ]/g, '');
}

export function isMainnetAddress(address: string): boolean {
  return address.startsWith('SP') || address.startsWith('SM');
}

export function isTestnetAddress(address: string): boolean {
  return address.startsWith('ST') || address.startsWith('SN');
}

export function detectNetwork(address: string): 'mainnet' | 'testnet' | null {
  if (isMainnetAddress(address)) return 'mainnet';
  if (isTestnetAddress(address)) return 'testnet';
  return null;
}

export interface AddressComponents {
  version: number;
  hash160: string;
  network: 'mainnet' | 'testnet';
}

export function getAddressComponents(address: string): AddressComponents | null {
  const network = detectNetwork(address);
  if (!network) return null;
  
  return {
    version: getAddressVersion(network),
    hash160: address.substring(2),
    network,
  };
}

export const ADDRESS_ERRORS = {
  EMPTY_ADDRESS: 'Address cannot be empty',
  INVALID_FORMAT: 'Invalid address format',
  INVALID_C32: 'Invalid C32 encoding',
  NETWORK_MISMATCH: 'Address network does not match expected network',
} as const;

export function validatePrincipal(principal: string, network: 'mainnet' | 'testnet'): AddressValidationResult {
  const type = getPrincipalType(principal);
  
  if (!type) {
    return { valid: false, error: 'Invalid principal format' };
  }
  
  if (type.type === 'contract') {
    return validateContractIdentifier(principal, network);
  }
  
  return validateStacksAddress(principal, network);
}

export function compareAddresses(addr1: string, addr2: string): boolean {
  return normalizeAddress(addr1) === normalizeAddress(addr2);
}

export interface AddressInfo {
  address: string;
  network: 'mainnet' | 'testnet';
  type: 'standard' | 'contract';
  contractName?: string;
}

export function getAddressInfo(principal: string): AddressInfo | null {
  const network = detectNetwork(principal);
  if (!network) return null;
  
  const type = getPrincipalType(principal);
  if (!type) return null;
  
  const parsed = parseContractIdentifier(principal);
  
  return {
    address: parsed ? parsed.address : principal,
    network,
    type: type.type,
    contractName: parsed?.contractName,
  };
}

export function isBurnAddress(address: string): boolean {
  const burnAddresses = ['SP000000000000000000002Q6VF78', 'ST000000000000000000002AMW42H'];
  return burnAddresses.includes(address);
}

export default {
  validateStacksAddress,
  validateContractIdentifier,
  validatePrincipal,
  AddressValidator,
  parseContractIdentifier,
  formatContractIdentifier,
  normalizeAddress,
  detectNetwork,
  compareAddresses,
  getAddressInfo,
};
