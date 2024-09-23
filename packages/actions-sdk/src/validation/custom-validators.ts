export function validateAddress(data: unknown): boolean {
    if (typeof data !== 'string') {
        return false;
    }

    // Regular expression to validate Ethereum address
    const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return ethAddressRegex.test(data);
}

export function validateAbi(data: unknown): boolean {
    if (typeof data !== 'string') {
        return false;
    }

    // Regular expression to validate Ethereum ABI
    const abiFunctionSignatureRegex =
        /^[a-zA-Z_][a-zA-Z0-9_]*\((([a-zA-Z0-9\[\]]+)(,[a-zA-Z0-9\[\]]+)*)?\)$/;
    return abiFunctionSignatureRegex.test(data);
}

export function validateCid(data: unknown): boolean {
    if (typeof data !== 'string') {
        return false;
    }

    // Regular expression to validate IPFS CID
    const ipfsCidRegex = /Qm[1-9A-Za-z]{44}$/;

    return ipfsCidRegex.test(data);
}
