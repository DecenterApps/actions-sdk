import { keccak256 } from 'js-sha3';

/**
 * Validates if the given data is a valid checksummed Ethereum address according to EIP-55.
 *
 * @param {unknown} data - The data to validate as an Ethereum address.
 * @returns {boolean} True if the data is a valid checksummed Ethereum address, false otherwise.
 */
export function validateAddress(data: unknown): boolean {
    if (typeof data !== 'string') {
        return false;
    }
    const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    if (!ethAddressRegex.test(data)) {
        return false;
    }
    return isChecksumAddress(data);
}

/**
 * Checks if the given address is a valid checksummed address according to EIP-55.
 *
 * @param {string} address - The Ethereum address to validate.
 * @returns {boolean} True if the address is correctly checksummed, false otherwise.
 */
export function isChecksumAddress(address: string): boolean {
    // Remove '0x' prefix
    address = address.replace('0x', '');
    const lowercaseAddress = address.toLowerCase();
    const hash = keccak256(lowercaseAddress); // Use Keccak-256 hashing

    for (let i = 0; i < 40; i++) {
        const shouldBeUpper = parseInt(hash[i], 16) >= 8;
        if (shouldBeUpper) {
            if (address[i] !== address[i].toUpperCase()) {
                return false;
            }
        } else {
            if (address[i] !== address[i].toLowerCase()) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Validates if the given data is a valid Ethereum ABI function signature.
 *
 * @param {unknown} data - The data to validate as an Ethereum ABI function signature.
 * @returns {boolean} True if the data is a valid ABI function signature, false otherwise.
 */
export function validateAbi(data: unknown): boolean {
    if (typeof data !== 'string') {
        return false;
    }
    const abiFunctionSignatureRegex =
        /^(function\s+)?[a-zA-Z_][a-zA-Z0-9_]*\((([a-zA-Z0-9\[\]]+)(,[a-zA-Z0-9\[\]]+)*)?\)$/;
    return abiFunctionSignatureRegex.test(data);
}

/**
 * Validates if the given data is a valid IPFS CID.
 *
 * @param {unknown} data - The data to validate as an IPFS CID.
 * @returns {boolean} True if the data is a valid IPFS CID, false otherwise.
 */
export function validateCid(data: unknown): boolean {
    if (typeof data !== 'string') {
        return false;
    }
    const ipfsCidRegex = /Qm[1-9A-Za-z]{44}$/;
    return ipfsCidRegex.test(data);
}
