import { Action, ActionError, LinkedAction, chainId } from 'actions-sdk';

const error: ActionError = {
    message:
        'NFT Sale Action: An unexpected error occurred during the NFT sale process',
};

const links: LinkedAction[] = [
    {
        type: 'tx',
        label: 'NFT Sale',
        chainId: chainId.ETHEREUM_MAINNET,
        txData: {
            address: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5', // NFTActionHandler contract address
            abi: 'fulfillOrder(address,uint256)',
            parameters: [
                {
                    type: 'constant',
                    id: 'tokenAddress',
                    value: '0x5Af0D9827E0c53E4799BB226655A1de152A425a5',
                },

                {
                    type: 'constant',
                    id: 'tokenId',
                    value: 'PLACEHOLDER_TOKEN_ID',
                },
            ],
            value: 'PLACEHOLDER_VALUE', // Should be price of NFT in wei
        },
        success: {
            message: 'NFT Sale successful! Check your wallet!',
        },
        error: {
            message: 'NFT Sale failed!',
        },
    },
];

export const nftSaleAction: Action = {
    title: 'Collection Name #tokenID', // e.g. "Milady #234"
    icon: 'https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.jpg?s=612x612&w=0&k=20&c=9AL8Uj9TTtrbHpM78kMp9fqjT_8EqpEekjdixeKUzDw=',
    description: 'Buy Milady #234',
    label: 'NFT Sale',
    links: links,
    error: error,
};
