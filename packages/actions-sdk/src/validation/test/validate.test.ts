import { validateAction } from '../validate';
import { Action, LinkedAction, ActionError } from 'actions-spec';

describe('validateAction', () => {
    describe('Should pass', () => {
        test('should validate a simple valid action', () => {
            const validAction: Action = {
                title: 'My Action',
                icon: 'icon-url',
                description: 'This is a test action',
                label: 'Test Action',
                links: [
                    {
                        type: 'link',
                        label: 'Google',
                        href: 'https://www.google.com',
                    },
                ],
            };

            const result = validateAction(validAction);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate a complex action with multiple link types', () => {
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
                                scope: 'GLOBAL',
                                label: 'WALLET_ADDRESS',
                                required: true,
                            },
                            {
                                type: 'number',
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
                                scope: 'GLOBAL',
                                label: 'WALLET_ADDRESS',
                                required: true,
                            },
                            {
                                type: 'constant',
                                value: '10000000000000000000',
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

            const complexAction: Action = {
                title: 'Donation Blink',
                icon: 'https://example.com/donation-icon.jpg',
                description: 'Donate to the cause',
                label: 'Donate',
                links: links,
                error: error,
            };

            const result = validateAction(complexAction);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate an action with no links', () => {
            const actionWithNoLinks: Action = {
                title: 'No Links Action',
                icon: 'icon-url',
                description: 'This action has no links',
                label: 'No Links',
            };

            const result = validateAction(actionWithNoLinks);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate an action with tx-multi', () => {
            const txMultiAction: Action = {
                title: 'Multi-Transaction Action',
                icon: 'icon-url',
                description: 'This action has a tx-multi link',
                label: 'Multi-Tx',
                links: [
                    {
                        type: 'tx-multi',
                        label: 'Perform Multiple Transactions',
                        chainId: 1,
                        txData: [
                            {
                                address: '0x123...',
                                abi: 'function1(uint256)',
                                parameters: [
                                    {
                                        type: 'constant',
                                        value: 100,
                                    },
                                ],
                            },
                            {
                                address: '0x456...',
                                abi: 'function2(address)',
                                parameters: [
                                    {
                                        type: 'reused',
                                        sourceTxIndex: 0,
                                        sourceParamIndex: 0,
                                    },
                                ],
                            },
                        ],
                        displayConfig: {
                            displayMode: 'sequential',
                        },
                        success: {
                            message: 'All transactions successful!',
                        },
                        error: {
                            message: 'One or more transactions failed.',
                        },
                    },
                ],
            };

            const result = validateAction(txMultiAction);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate an action with transfer-action', () => {
            const transferAction: Action = {
                title: 'Transfer Action',
                icon: 'icon-url',
                description: 'This action has a transfer-action link',
                label: 'Transfer',
                links: [
                    {
                        type: 'transfer-action',
                        label: 'Send ETH',
                        address: {
                            type: 'text',
                            scope: 'USER',
                            label: 'Recipient Address',
                        },
                        value: '1000000000000000000', // 1 ETH in wei
                    },
                ],
            };

            const result = validateAction(transferAction);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate an action with contract read input', () => {
            const actionWithContractRead: Action = {
                title: 'Contract Read Action',
                icon: 'icon-url',
                description: 'This action reads from a contract',
                label: 'Read Contract',
                links: [
                    {
                        type: 'tx',
                        label: 'Read Balance',
                        chainId: 1,
                        txData: {
                            address:
                                '0x1234567890123456789012345678901234567890',
                            abi: 'balanceOf(address)',
                            parameters: [
                                {
                                    type: 'contract-read',
                                    address:
                                        '0x9876543210987654321098765432109876543210',
                                    abi: 'getUser(address)',
                                    parameters: [
                                        {
                                            type: 'text',
                                            scope: 'GLOBAL',
                                            label: 'WALLET_ADDRESS',
                                        },
                                    ],
                                    returnValueIndex: 0,
                                },
                            ],
                        },
                        success: {
                            message: 'Balance read successfully',
                        },
                        error: {
                            message: 'Failed to read balance',
                        },
                    },
                ],
            };

            const result = validateAction(actionWithContractRead);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate an action with computed input', () => {
            const actionWithComputedInput: Action = {
                title: 'Computed Input Action',
                icon: 'icon-url',
                description: 'This action uses computed input',
                label: 'Compute',
                links: [
                    {
                        type: 'tx',
                        label: 'Send Tokens',
                        chainId: 1,
                        txData: {
                            address:
                                '0x1234567890123456789012345678901234567890',
                            abi: 'transfer(address,uint256)',
                            parameters: [
                                {
                                    type: 'text',
                                    scope: 'USER',
                                    label: 'Recipient Address',
                                },
                                {
                                    type: 'computed',
                                    operation: 'multiply',
                                    values: [
                                        {
                                            type: 'number',
                                            scope: 'USER',
                                            label: 'Amount',
                                        },
                                        {
                                            type: 'constant',
                                            value: 1e18, // Convert to wei
                                        },
                                    ],
                                },
                            ],
                        },
                        success: {
                            message: 'Tokens sent successfully',
                        },
                        error: {
                            message: 'Failed to send tokens',
                        },
                    },
                ],
            };

            const result = validateAction(actionWithComputedInput);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });

        test('should validate a tx-multi action with combined display mode', () => {
            const txMultiWithCombinedDisplay: Action = {
                title: 'Multi-Transaction Action',
                icon: 'icon-url',
                description:
                    'This action has a tx-multi link with combined display',
                label: 'Multi-Tx Combined',
                links: [
                    {
                        type: 'tx-multi',
                        label: 'Perform Multiple Transactions',
                        chainId: 1,
                        txData: [
                            {
                                address:
                                    '0x1234567890123456789012345678901234567890',
                                abi: 'approve(address,uint256)',
                                parameters: [
                                    {
                                        type: 'constant',
                                        value: '0x9876543210987654321098765432109876543210',
                                    },
                                    {
                                        type: 'number',
                                        scope: 'USER',
                                        label: 'Approval Amount',
                                    },
                                ],
                            },
                            {
                                address:
                                    '0x9876543210987654321098765432109876543210',
                                abi: 'deposit(uint256)',
                                parameters: [
                                    {
                                        type: 'reused',
                                        sourceTxIndex: 0,
                                        sourceParamIndex: 1,
                                    },
                                ],
                            },
                        ],
                        displayConfig: {
                            displayMode: 'combined',
                            renderedTxIndex: 0,
                        },
                        success: {
                            message: 'Approval and deposit successful!',
                        },
                        error: {
                            message: 'Transaction failed.',
                        },
                    },
                ],
            };

            const result = validateAction(txMultiWithCombinedDisplay);
            expect(result.valid).toBe(true);
            expect(result.errors).toBeNull();
        });
    });

    describe('Should fail', () => {
        test('should invalidate an action with missing required fields', () => {
            const invalidAction: any = {
                title: 'Invalid Action',
                icon: 'icon-url',
                // Missing description
                label: 'Invalid',
            };

            const result = validateAction(invalidAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                " must have required property 'description'"
            );
        });

        test('should invalidate an action with extra field', () => {
            const invalidAction: any = {
                title: 'Invalid Action',
                icon: 'icon-url',
                description: 'description',
                lable: 'Invalid',
                extraField: "This shouldn't be here",
            };

            const result = validateAction(invalidAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                ' must NOT have additional properties'
            );
        });

        test('should invalidate an action with an invalid link type', () => {
            const invalidAction: any = {
                title: 'Invalid Link Type',
                icon: 'icon-url',
                description: 'This action has an invalid link type',
                label: 'Invalid',
                links: [
                    {
                        type: 'invalid-type',
                        label: 'Invalid Link',
                    },
                ],
            };

            const result = validateAction(invalidAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                '/links/0 value of tag "type" must be in oneOf'
            );
        });

        test('should invalidate non-object input', () => {
            const result = validateAction('not an object');
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(' must be object');
        });

        test('should invalidate an action with an invalid tx-multi link', () => {
            const invalidAction: any = {
                title: 'Invalid Multi-Tx Action',
                icon: 'icon-url',
                description: 'This action has an invalid tx-multi link',
                label: 'Invalid',
                links: [
                    {
                        type: 'tx-multi',
                        label: 'Invalid Multi-Tx',
                        chainId: 1,
                        txData: [
                            {
                                address: '0x123...',
                                abi: 'function1(uint256)',
                                // Missing parameters
                            },
                        ],
                        // Missing displayConfig
                        success: {
                            message: 'Success',
                        },
                        error: {
                            message: 'Error',
                        },
                    },
                ],
            };

            const result = validateAction(invalidAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                "/links/0/txData/0 must have required property 'parameters'"
            );
            expect(result.errors).toContain(
                "/links/0 must have required property 'displayConfig'"
            );
        });

        test('should invalidate an action with an invalid transfer-action link', () => {
            const invalidAction: any = {
                title: 'Invalid Transfer Action',
                icon: 'icon-url',
                description: 'This action has an invalid transfer-action link',
                label: 'Invalid',
                links: [
                    {
                        type: 'transfer-action',
                        label: 'Invalid Transfer',
                        // Missing address
                        value: 'not a number',
                    },
                ],
            };

            const result = validateAction(invalidAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                "/links/0 must have required property 'address'"
            );
        });

        test('should invalidate an action with invalid contract read input', () => {
            const invalidContractReadAction: any = {
                title: 'Invalid Contract Read Action',
                icon: 'icon-url',
                description: 'This action has an invalid contract read input',
                label: 'Invalid Read',
                links: [
                    {
                        type: 'tx',
                        label: 'Read Balance',
                        chainId: 1,
                        txData: {
                            address:
                                '0x1234567890123456789012345678901234567890',
                            abi: 'balanceOf(address)',
                            parameters: [
                                {
                                    type: 'contract-read',
                                    // Missing address
                                    abi: 'getUser(address)',
                                    parameters: [
                                        {
                                            type: 'text',
                                            scope: 'GLOBAL',
                                            label: 'WALLET_ADDRESS',
                                        },
                                    ],
                                    returnValueIndex: 'not a number', // Invalid type
                                },
                            ],
                        },
                        success: { message: 'Success' },
                        error: { message: 'Error' },
                    },
                ],
            };

            const result = validateAction(invalidContractReadAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                "/links/0/txData/parameters/0 must have required property 'address'"
            );
            expect(result.errors).toContain(
                '/links/0/txData/parameters/0/returnValueIndex must be number'
            );
        });

        test('should invalidate an action with invalid computed input', () => {
            const invalidComputedInputAction: any = {
                title: 'Invalid Computed Input Action',
                icon: 'icon-url',
                description: 'This action has an invalid computed input',
                label: 'Invalid Compute',
                links: [
                    {
                        type: 'tx',
                        label: 'Send Tokens',
                        chainId: 1,
                        txData: {
                            address:
                                '0x1234567890123456789012345678901234567890',
                            abi: 'transfer(address,uint256)',
                            parameters: [
                                {
                                    type: 'text',
                                    scope: 'USER',
                                    label: 'Recipient Address',
                                },
                                {
                                    type: 'computed',
                                    operation: 'invalid_operation', // Invalid operation
                                    values: [
                                        {
                                            type: 'number',
                                            scope: 'USER',
                                            label: 'Amount',
                                        },
                                        {
                                            type: 'constant',
                                            value: '1e18',
                                        },
                                    ],
                                },
                            ],
                        },
                        success: { message: 'Success' },
                        error: { message: 'Error' },
                    },
                ],
            };

            const result = validateAction(invalidComputedInputAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                '/links/0/txData/parameters/1/operation must be equal to one of the allowed values'
            );
            console.log(result.errors);
        });

        test('should invalidate a tx-multi action with invalid combined display mode', () => {
            const invalidTxMultiAction: any = {
                title: 'Invalid Multi-Transaction Action',
                icon: 'icon-url',
                description:
                    'This action has an invalid tx-multi link with combined display',
                label: 'Invalid Multi-Tx Combined',
                links: [
                    {
                        type: 'tx-multi',
                        label: 'Perform Multiple Transactions',
                        chainId: 1,
                        txData: [
                            {
                                address:
                                    '0x1234567890123456789012345678901234567890',
                                abi: 'approve(address,uint256)',
                                parameters: [
                                    {
                                        type: 'constant',
                                        value: '0x9876543210987654321098765432109876543210',
                                    },
                                    {
                                        type: 'number',
                                        scope: 'USER',
                                        label: 'Approval Amount',
                                    },
                                ],
                            },
                        ],
                        displayConfig: {
                            displayMode: 'invalid-type', // Invalid type
                            renderedTxIndex: 1,
                        },
                        success: { message: 'Success' },
                        error: { message: 'Error' },
                    },
                ],
            };

            const result = validateAction(invalidTxMultiAction);
            expect(result.valid).toBe(false);
            expect(result.errors).toContain(
                '/links/0/displayConfig/displayMode must be equal to one of the allowed values'
            );
        });
    });
});
