interface ChainIdConfig {
    [network: string]: number;
}

interface GlobalInputs {
    [name: string]: string;
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
