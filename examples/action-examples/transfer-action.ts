import { Action, ActionError, LinkedAction, chainId } from 'actions-sdk';

const error: ActionError = {
    message: 'Error displaying blink',
};

const links: LinkedAction[] = [
    {
        type: 'transfer-action',
        label: 'Send 0.01 ETH',
        chainId: chainId.ETHEREUM_MAINNET,
        address: {
            type: 'constant',
            id: 'Address',
            value: '0x6a8cfF99b2856372bC8EaE39E2c413832E4C12e0',
        },
        value: {
            type: 'constant',
            id: 'Value',
            value: '10000000000',
        },
        success: {
            message: 'Ether sent',
        },
        error: {
            message: 'Transfer failed',
        },
    },
    {
        type: 'reference-action',
        label: 'Next Content Creator ⏭️',
        cid: 'QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB',
    },
];

export const transferAction: Action = {
    title: 'Support ',
    icon: 'https://coincentral.com/wp-content/uploads/2017/08/ethereum-800x450.png',
    description:
        'If you want to support your favourite content creator, you can send ether to them using the links below. By doing this you will be eligible to receive exclusive content from them.',
    label: 'Send ETH',
    links: links,
    error: error,
};
