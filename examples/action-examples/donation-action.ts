import { Action, ActionError, LinkedAction } from 'actions-sdk';

const error: ActionError = {
    message: 'Error displaying blink',
};

const links: LinkedAction[] = [
    {
        type: 'tx',
        label: 'Donate',
        chainId: 1,
        txData: {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            abi: 'transfer(address,uint256)',
            parameters: [
                {
                    type: 'text',
                    id: 'WALLET_ADDRESS',
                    scope: 'GLOBAL',
                    label: 'WALLET_ADDRESS',
                    required: true,
                },
                {
                    type: 'number',
                    id: 'AMOUNT',
                    scope: 'USER',
                    label: 'Amount',
                    required: true,
                },
            ],
        },
        success: {
            message: 'Donation successful!',
        },
        error: {
            message: 'Donation failed!',
        },
    },
    {
        type: 'tx',
        label: 'Donate 10 DAI',
        chainId: 1,
        txData: {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            abi: 'transfer(address,uint256)',
            parameters: [
                {
                    type: 'text',
                    id: 'WALLET_ADDRESS',
                    scope: 'GLOBAL',
                    label: 'WALLET_ADDRESS',
                    required: true,
                },
                {
                    type: 'constant',
                    id: 'AMOUNT',
                    value: 10000000000000000000,
                },
            ],
        },
        success: {
            message: 'Donation successful!',
        },
        error: {
            message: 'Donation failed!',
        },
    },
    {
        type: 'tx',
        label: 'Donate 50 DAI',
        chainId: 1,
        txData: {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            abi: 'transfer(address,uint256)',
            parameters: [
                {
                    type: 'text',
                    id: 'WALLET_ADDRESS',
                    scope: 'GLOBAL',
                    label: 'WALLET_ADDRESS',
                    required: true,
                },
                {
                    type: 'constant',
                    id: 'AMOUNT',
                    value: 50000000000000000000,
                },
            ],
        },
        success: {
            message: 'Donation successful!',
        },
        error: {
            message: 'Donation failed!',
        },
    },
    {
        type: 'tx',
        label: 'Donate 100 DAI',
        chainId: 1,
        txData: {
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            abi: 'transfer(address,uint256)',
            parameters: [
                {
                    type: 'text',
                    id: 'WALLET_ADDRESS',
                    scope: 'GLOBAL',
                    label: 'WALLET_ADDRESS',
                    required: true,
                },
                {
                    type: 'constant',
                    id: 'AMOUNT',
                    value: 100000000000000000000,
                },
            ],
        },
        success: {
            message: 'Donation successful!',
        },
        error: {
            message: 'Donation failed!',
        },
    },
    {
        type: 'link',
        label: 'Learn more',
        href: 'https://donate-example.com',
    },
];

export const donationAction: Action = {
    title: 'Donation Blink',
    icon: 'https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.jpg?s=612x612&w=0&k=20&c=9AL8Uj9TTtrbHpM78kMp9fqjT_8EqpEekjdixeKUzDw=',
    description: 'Donate to the cause',
    label: 'Donate',
    links: links,
    error: error,
};
