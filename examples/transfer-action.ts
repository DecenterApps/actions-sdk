import { Action, ActionError, LinkedAction } from 'actions-sdk';

const error: ActionError = {
    message: 'Error displaying blink',
};

const links: LinkedAction[] = [
    {
        type: 'transfer-action',
        label: 'Send 0.01 ETH',
        address: {
            type: 'constant',
            value: '0x6a8cfF99b2856372bC8EaE39E2c413832E4C12e0',
        },
        value: '10000000000000000',
    },
    {
        type: 'action',
        label: 'Next Content Creator ⏭️',
        cid: 'QmZ2dfagw22415fsafasf',
    },
];

const action: Action = {
    title: 'Support ',
    icon: 'https://coincentral.com/wp-content/uploads/2017/08/ethereum-800x450.png',
    description:
        'If you want to support your favourite content creator, you can send ether to them using the links below. By doing this you will be eligible to receive exclusive content from them.',
    label: 'Send ETH',
    links: links,
    error: error,
};
