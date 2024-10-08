import { Action, ActionError, LinkedAction, chainId } from 'actions-sdk';

const error: ActionError = {
    message:
        'Payment Action: An unexpected error occurred during the payment process',
};

const links: LinkedAction[] = [
    {
        type: 'tx',
        label: 'Payment Action',
        chainId: chainId.ETHEREUM_MAINNET,
        txData: {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // Token contract address
            abi: 'transfer(address,uint256)',
            parameters: [
                {
                    type: 'constant',
                    id: 'recipient',
                    value: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // Recipient address
                },

                {
                    type: 'constant',
                    id: 'amount',
                    value: '10000000000000000000',
                },
            ],
        },
        success: {
            message: 'Payment successful! Check your email for the newsletter',
        },
        error: {
            message: 'Payment failed! Please try again later',
        },
    },
];

export const paymentActionERC20: Action = {
    title: 'Monthly newsletter subscription',
    icon: 'https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.jpg?s=612x612&w=0&k=20&c=9AL8Uj9TTtrbHpM78kMp9fqjT_8EqpEekjdixeKUzDw=',
    description: 'Subscribe to our monthly newsletter for 10 DAI',
    label: 'Payment Action',
    links: links,
    error: error,
};
