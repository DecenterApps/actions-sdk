import {
    Action,
    ActionError,
    LinkedAction,
    InputScope,
    TxMultiAction,
    ConstantParameter,
    chainId,
    globalInputs,
} from 'actions-sdk';

const error: ActionError = {
    message: 'Error displaying swap action',
};

const links: LinkedAction[] = [
    {
        type: 'tx-multi',
        label: 'Swap Tokens',
        chainId: chainId.ETHEREUM_MAINNET,
        txData: [
            {
                address: '0xTOKEN_ADDRESS', // Address of the token to be swapped
                abi: 'approve(address,uint256)',
                parameters: [
                    {
                        type: 'constant',
                        value: '0xSWAP_ROUTER_ADDRESS', // Address of the swap router
                    },
                    {
                        type: 'number',
                        scope: 'USER',
                        label: 'Amount to Swap',
                        required: true,
                    },
                ],
            },
            {
                address: '0xSWAP_ROUTER_ADDRESS', // Address of the swap router
                abi: 'swapExactTokensForTokens(uint256,uint256,address[],address,uint256)',
                parameters: [
                    {
                        type: 'reused',
                        sourceTxIndex: 0,
                        sourceParamIndex: 1,
                    },
                    {
                        type: 'number',
                        scope: 'USER',
                        label: 'Minimum Amount to Receive',
                        required: true,
                    },
                    {
                        type: 'constant',
                        value: ['0xTOKEN_A_ADDRESS', '0xTOKEN_B_ADDRESS'],
                    },
                    {
                        type: 'text',
                        scope: 'GLOBAL',
                        label: globalInputs.WALLET_ADDRESS,
                        required: true,
                    },
                    {
                        type: 'constant',
                        value: globalInputs.UNIX_TIMESTAMP,
                    },
                ],
            },
        ],
        success: {
            message: 'Swap successful!',
        },
        error: {
            message: 'Swap failed!',
        },
        displayConfig: {
            displayMode: 'combined',
            renderedTxIndex: 1,
        },
    },
    {
        type: 'link',
        label: 'Learn more about swapping',
        href: 'https://swap-info-example.com',
    },
];

export const multiTransactionAction: Action = {
    title: 'Token Swap',
    icon: 'https://example.com/swap-icon.png',
    description: 'Swap your tokens easily and efficiently',
    label: 'Swap',
    links: links,
    error: error,
};
