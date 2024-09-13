# Actions

## Overview

Actions is a specification and toolset for integrating Web3 functionalities into Web2 environments. It defines a standardized JSON format for encoding blockchain interactions, allowing developers to create and deploy Web3 experiences across various online platforms. By utilizing IPFS for decentralized storage, Actions enables the creation of portable, context-aware blockchain interfaces that can be embedded in tweets, blog posts, or any text-based web content. This approach aims to simplify blockchain interactions for users by bringing Web3 capabilities directly to their preferred Web2 platforms, without requiring navigation to separate dApps or websites.

## Repository Structure

This repository contains the following main components:

-   [`packages/actions-spec`](./packages/actions-spec/): The core specification for Actions, including type definitions.
-   [`packages/actions-sdk`](./packages/actions-sdk/): The SDK for creating, validating, and deploying Actions.
-   [`examples/`](./examples/): A collection of Action templates and usage examples.

## Getting Started

### Installation

To get started with the Actions SDK, install it via npm:

```bash
npm install @actions/sdk
```

### Basic Usage

Here's a quick example of how to use the Actions SDK to validate and deploy an Action:

```typescript
import { validateAction, deployToIpfs } from '@actions/sdk';
import { myAction } from './myAction';

async function deployMyAction() {
    // Validate the action
    const { valid, errors } = validateAction(myAction);
    if (!valid) {
        console.error('Action validation failed:', errors);
        return;
    }

    // Deploy to IPFS
    const pinataCredentials = {
        apiKey: 'YOUR_PINATA_API_KEY',
        apiSecretKey: 'YOUR_PINATA_API_SECRET_KEY',
    };

    try {
        const ipfsHash = await deployToIpfs(myAction, pinataCredentials);
        console.log('Action deployed successfully! IPFS CID:', ipfsHash);
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

deployMyAction();
```

For a more detailed example, check out our [sample deployment script](./examples/deployAction.ts).

## Packages

### actions-spec

The [`actions-spec`](./packages/actions-spec/) package contains the core specification for Actions, including all necessary type definitions. This package is primarily for reference and is re-exported by the `actions-sdk` package.

For detailed information about the specification and how clients should interpret various Action types, please refer to the [spec.md](./packages/actions-spec/spec.md) in the `packages/actions-spec` directory.

Key files:

-   [index.d.ts](./packages/actions-spec/index.d.ts): Type definitions for Actions
-   [spec.md](./packages/actions-spec/spec.md): Detailed specification documentation

### actions-sdk

The [`actions-sdk`](./packages/actions-sdk/) package is the main tool for developers working with Actions. It re-exports all types from `actions-spec` and provides additional utility functions for creating, validating, and deploying Actions.

Key features:

-   Action validation
-   IPFS deployment
-   Helper functions for Action creation

For more information on how to use the SDK, check the [README](./packages/actions-sdk/README.md) in the `packages/actions-sdk` directory.

## Examples

The [`examples/`](./examples/) directory contains various Action templates and usage examples. These can serve as a starting point for creating your own Actions or understanding how to implement specific functionalities.

## Contributing

We welcome contributions to the Actions project!

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub Issues](https://github.com/DecenterApps/actions-sdk/issues) page.
