interface ChainIdConfig {
    [network: string]: number;
}

interface GlobalInputs {
    [name: string]: string;
}

interface FuncSignatures {
    [funcName: string]: string;
}

export const chainId: ChainIdConfig = {
    ETHEREUM_MAINNET: 1,
    ETHEREUM_GOERLI: 5,
    OP_MAINNET: 10,
    CRONOS_MAINNET: 25,
    ROOTSTOCK_MAINNET: 30,
    TELOS: 40,
    BNB_SMARTCHAIN: 56,
    GNOSIS: 100,
    POLYGON_MAINNET: 137,
    MANTLE: 5000,
    BASE: 8543,
    ARBITRUM_ONE: 42161,
    AVALANCHE: 43114,
    LINEA: 59144,
    BLAST: 81457,
};

export const globalInputs: GlobalInputs = {
    WALLET_ADDRESS: 'WALLET_ADDRESS',
};

export const erc20FunctionSignatures: FuncSignatures = {
    NAME: 'name()',
    SYMBOL: 'symbol()',
    DECIMALS: 'decimals()',
    APPROVE: 'approve(address,uint256)',
    TRANSFER: 'transfer(address,uint256)',
    TRANSFER_FROM: 'transferFrom(address,address,uint256)',
    ALLOWANCE: 'allowance(address,address)',
    BALANCE_OF: 'balanceOf(address)',
};

export const erc721FunctionSignatures: FuncSignatures = {
    OWNER_OF: 'ownerOf(uint256)',
    BALANCE_OF: 'balanceOf(address)',
    APPROVE: 'approve(address,uint256)',
    GET_APPROVED: 'getApproved(uint256)',
    SET_APPROVAL_FOR_ALL: 'setApprovalForAll(address,bool)',
    IS_APPROVED_FOR_ALL: 'isApprovedForAll(address)',
    TRANSFER_FROM: 'transferFrom(address,address,uint256)',
    SAFE_TRANSFER_FROM: 'safeTransferFrom(address,address,uint256)',
    SAFE_TRANSFER_FROM_DATA: 'safeTransferFrom(address,address,uint256,bytes)',
};
