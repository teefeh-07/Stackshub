/**
 * Truncates a Stacks address for display.
 * @param address The full address string.
 * @param startChars Number of characters to keep at the start.
 * @param endChars Number of characters to keep at the end.
 * @returns Formatted address (e.g., "SP12...3456").
 */
export function truncateAddress(address: string, startChars = 4, endChars = 4): string {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Converts STX amount to microSTX (integer).
 * @param stx Amount in STX.
 * @returns Amount in microSTX.
 */
export function toMicroStx(stx: number): number {
  return Math.floor(stx * 1_000_000);
}

/**
 * Converts microSTX to STX (float).
 * @param microStx Amount in microSTX.
 * @returns Amount in STX.
 */
export function fromMicroStx(microStx: number): number {
  return microStx / 1_000_000;
}
