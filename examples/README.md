# Action SDK Deployment Example

This project demonstrates how to validate and deploy an action using the Action SDK.

## Prerequisites

-   [Node (>= v18.17)](https://nodejs.org/en/download/)
-   [Pinata API keys for IPFS deployment](https://app.pinata.cloud/register)

## Setup

1. Clone this repository:

    ```
    git clone https://github.com/DecenterApps/actions-sdk.git
    cd action-sdk/examples
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Open `deployAction.ts` and replace the Pinata credentials with your own:
    ```typescript
    const pinataCredentials = {
        apiKey: 'YOUR_PINATA_API_KEY',
        apiSecretKey: 'YOUR_PINATA_API_SECRET_KEY',
    };
    ```

## Running the Deployment Script

To deploy an action, run:

```
npm run deploy-action
```

This script will validate the action and then deploy it to IPFS using Pinata.

## Customizing the Action

By default, the script deploys the `donationAction` from `./action-examples/donation-action.ts`. To deploy a different action:

1. Create your custom action or use another example from the `action-examples` folder.
2. Import your action in `deployAction.ts`:
    ```typescript
    import { yourCustomAction } from './path-to-your-action';
    ```
3. Update the `deployAction` function to use your action:
    ```typescript
    const { valid, errors } = validateAction(yourCustomAction);
    // ...
    const ipfsHash = await deployToIpfs(yourCustomAction, pinataCredentials);
    ```

## Need Help?

If you encounter any issues or have questions, please open an issue in this repository.

Happy deploying! 🎉
