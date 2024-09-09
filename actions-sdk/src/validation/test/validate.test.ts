import exp from 'constants';
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
    });
});
