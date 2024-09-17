# actions-sdk

## Introduction

Actions is a specification and toolset for creating standardized, decentralized communication protocols between web2 and web3 applications. It aims to simplify the integration of blockchain functionalities into various web environments, allowing developers to enable blockchain transactions without requiring users to navigate away from their current context.

The `actions-sdk` package provides developers with the tools and utilities necessary for creating, validating, and deploying Actions. These Actions can be embedded in various web2 platforms (such as social media posts, blogs, or forums) to provide seamless web3 functionality to users right where they are.

For a detailed specification of Actions, please refer to the [actions-spec package](../actions-spec/spec.md).

## Installation

To install the `actions-sdk` package, run the following command:

```bash
npm install actions-sdk
```

## Usage

Here's a basic example of how to use the `actions-sdk`:

```typescript
import {
    Action,
    ActionError,
    LinkedAction,
    validateAction,
    deployToIpfs,
} from 'actions-sdk';

// Define an Action
const transferAction: Action = {
    title: 'Support',
    icon: 'https://coincentral.com/wp-content/uploads/2017/08/ethereum-800x450.png',
    description: 'Support your favourite content creator by sending ether.',
    label: 'Send ETH',
    links: [
        {
            type: 'transfer-action',
            label: 'Send 0.01 ETH',
            address: {
                type: 'constant',
                id: 'Address',
                value: '0x6a8cfF99b2856372bC8EaE39E2c413832E4C12e0',
            },
            value: '10000000000000000',
            success: {
                message: 'Transfer succeeded',
            },
            error: {
                message: 'Transfer failed',
            },
        },
        {
            type: 'reference-action',
            label: 'Next Content Creator ⏭️',
            cid: 'QmZ2dfagw22415fsafasf',
        },
    ],
    error: {
        message: 'Error displaying blink',
    },
};

// Validate the action
// NOTE: This is optional, validateAction is already part of deployToIpfs
const { valid, errors } = validateAction(transferAction);
if (valid) {
    console.log('Action is valid');
} else {
    console.error('Action validation failed:', errors);
}

// Deploy the Action to IPFS
const pinataCredentials = {
    apiKey: 'YOUR_PINATA_API_KEY',
    apiSecretKey: 'YOUR_PINATA_API_SECRET_KEY',
};

deployToIpfs(transferAction, pinataCredentials)
    .then((ipfsHash) => console.log('Action deployed to IPFS:', ipfsHash))
    .catch((error) => console.error('Deployment failed:', error));
```

For more usage examples, check out the [examples directory](../../examples/).

## API Reference

### Types

The SDK exports the following types from the `actions-spec` package:

-   `ACTIONS_PROTOCOL`
-   `Action`
-   `LinkedAction`
-   `LinkedActionBase`
-   `LinkedActionType`
-   `LinkAction`
-   `ReferenceAction`
-   `TxAction`
-   `TxMultiAction`
-   `TransferAction`
-   `TypedActionParameter`
-   `ConstantParameter`
-   `ActionInput`
-   `ActionInputSelectable`
-   `ComputedInput`
-   `ContractReadInput`
-   `ReferencedParameter`
-   `InputScope`
-   `ActionInputType`
-   `ActionSuccessResponse`
-   `ActionError`

For detailed type definitions, see the [types.ts](./src/utils/types.ts) file.

### Constants

The SDK provides the following constants:

-   `chainId`: An object mapping network names to their respective chain IDs.
-   `globalInputs`: An object containing constant values for global inputs.
-   `erc20FunctionSignatures`: An object mapping ERC20 function names to their signatures.
-   `erc721FunctionSignatures`: An object mapping ERC721 function names to their signatures.

These constants are defined in the [constants.ts](./src/utils/constants.ts) file.

### Functions

#### `validateAction(action: Action): { valid: boolean; errors: string[] | null }`

Validates an Action object against the Actions specification. It uses JSON Schema validation with the Ajv library to ensure the Action object conforms to the defined schema.

-   Parameters:
    -   `action`: The Action object to validate.
-   Returns:
    -   An object with:
        -   `valid`: A boolean indicating whether the Action is valid.
        -   `errors`: An array of error messages if the Action is invalid, or null if it's valid.

Example usage:

```typescript
const { valid, errors } = validateAction(myAction);
if (valid) {
    console.log('Action is valid');
} else {
    console.error('Validation errors:', errors);
}
```

For implementation details, see the [validate.ts](./src/validation/validate.ts) file.

#### `deployToIpfs(action: Action, pinataCredentials: PinataCredentials): Promise<string | Error>`

Deploys an Action to IPFS using Pinata.

-   Parameters:
    -   `action`: The Action object to deploy.
    -   `pinataCredentials`: An object containing Pinata API credentials.
-   Returns:
    -   A Promise that resolves to the IPFS hash of the deployed Action, or an Error if deployment fails.

Example usage:

```typescript
const pinataCredentials = {
    apiKey: 'YOUR_PINATA_API_KEY',
    apiSecretKey: 'YOUR_PINATA_API_SECRET_KEY',
};

deployToIpfs(myAction, pinataCredentials)
    .then((ipfsHash) => console.log('Deployed to IPFS:', ipfsHash))
    .catch((error) => console.error('Deployment failed:', error));
```

For implementation details, see the [deployToIpfs.ts](./src/utils/deployToIpfs.ts) file.

## Validation Details

The SDK uses JSON Schema validation with the Ajv library to ensure Actions conform to the specification. The validation process includes:

-   Checking for required fields (title, icon, description, label)
-   Validating the structure of linked actions
-   Ensuring correct types for all fields
-   Validating nested structures like `tx` and `tx-multi` actions
-   Checking for proper formatting of addresses, chain IDs, and other blockchain-specific data

For detailed information about the validation schemas, refer to the [schemas.ts](./src/validation/schemas.ts) file in the SDK source code.

The Ajv setup for validation can be found in the [ajv-setup.ts](./src/validation/ajv-setup.ts) file.

## Contributing

We welcome contributions to the Actions project!

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub Issues](https://github.com/DecenterApps/actions-sdk/issues) page.

For more examples and use cases, check out our [examples directory](../../examples/).
