// Clarity Traits for Stacks blockchain
// Provides interfaces for common Clarity trait patterns

export interface ClarityTrait {
  name: string;
  methods: string[];
}

export interface SIP009Trait extends ClarityTrait {
  name: 'sip009-nft-trait';
  methods: ['get-last-token-id', 'get-token-uri', 'get-owner', 'transfer'];
}

export interface SIP010Trait extends ClarityTrait {
  name: 'sip010-ft-trait';
  methods: ['get-name', 'get-symbol', 'get-decimals', 'get-balance', 'get-total-supply', 'transfer'];
}

export interface SIP013Trait extends ClarityTrait {
  name: 'sip013-semi-fungible-token-trait';
  methods: ['get-balance', 'get-overall-balance', 'get-total-supply', 'transfer'];
}

export const SUPPORTED_TRAITS = ['sip009-nft-trait', 'sip010-ft-trait', 'sip013-semi-fungible-token-trait'] as const;
export type SupportedTrait = typeof SUPPORTED_TRAITS[number];

export function isValidTrait(trait: string): trait is SupportedTrait {
  return SUPPORTED_TRAITS.includes(trait as SupportedTrait);
}

export interface TraitReference {
  contractAddress: string;
  contractName: string;
  traitName: string;
}

export function formatTraitReference(ref: TraitReference): string {
  return \`\${ref.contractAddress}.\${ref.contractName}.\${ref.traitName}\`;
}

export interface TraitImplementation {
  trait: SupportedTrait;
  contractId: string;
  verified: boolean;
}

export class TraitRegistry {
  private implementations: Map<string, TraitImplementation[]> = new Map();
  
  register(contractId: string, trait: SupportedTrait, verified = false): void {
    const impls = this.implementations.get(contractId) || [];
    impls.push({ trait, contractId, verified });
    this.implementations.set(contractId, impls);
  }
}

export interface TraitMethod {
  name: string;
  args: Array<{ name: string; type: string }>;
  returnType: string;
}

export const SIP009_METHODS: TraitMethod[] = [
  { name: 'get-last-token-id', args: [], returnType: '(response uint uint)' },
  { name: 'get-token-uri', args: [{ name: 'token-id', type: 'uint' }], returnType: '(response (optional (string-ascii 256)) uint)' },
];

export const SIP010_METHODS: TraitMethod[] = [
  { name: 'get-name', args: [], returnType: '(response (string-ascii 32) uint)' },
  { name: 'get-symbol', args: [], returnType: '(response (string-ascii 10) uint)' },
];

export function getTraitMethods(trait: SupportedTrait): TraitMethod[] {
  switch (trait) {
    case 'sip009-nft-trait':
      return SIP009_METHODS;
    case 'sip010-ft-trait':
      return SIP010_METHODS;
    default:
      return [];
  }
}

export interface TraitValidator {
  validate(contractSource: string): Promise<boolean>;
  getImplementedTraits(contractSource: string): Promise<SupportedTrait[]>;
}

export class BasicTraitValidator implements TraitValidator {
  async validate(contractSource: string): Promise<boolean> {
    return contractSource.includes('impl-trait');
  }
  
  async getImplementedTraits(contractSource: string): Promise<SupportedTrait[]> {
    return [];
  }
}

export interface TraitError {
  code: string;
  message: string;
  trait?: SupportedTrait;
}

export const TRAIT_ERRORS = {
  INVALID_TRAIT: { code: 'ERR_INVALID_TRAIT', message: 'Invalid trait specified' },
  NOT_IMPLEMENTED: { code: 'ERR_NOT_IMPLEMENTED', message: 'Trait not implemented' },
} as const;

export function createTraitError(errorType: keyof typeof TRAIT_ERRORS, trait?: SupportedTrait): TraitError {
  return { ...TRAIT_ERRORS[errorType], trait };
}

export default {
  SUPPORTED_TRAITS,
  isValidTrait,
  formatTraitReference,
  TraitRegistry,
  getTraitMethods,
  createTraitError,
};
