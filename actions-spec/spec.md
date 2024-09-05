# Actions Technical Specification

## Introduction

`actions-spec` is a standardized specification for building decentralized communication protocols between web2 and web3 applications. This specification builds upon concepts like Solana's "Blinks" and "Actions" but aims to provide a more decentralized approach by utilizing IPFS instead of relying on centralized servers.

The primary goal of `actions-spec` is to define a universal JSON format for encoding actions that can be interpreted by various web3-enabled clients (e.g., browser extensions, wallets, or dApps). This approach minimizes fragmentation by enabling users to interact with web3 from their favorite platforms and apps, without the need to adopt new networks or services.

## Specification

The specification is composed of several key components:

-   [Action](#action): Core structure representing the action.
-   [Linked Actions](#linked-actions): Defines actions that are linked and executed after the main action.
    -   [Linked Action Types](#linked-action-types): Different types of linked actions (e.g., transactions, transfers).
-   [Action Inputs](#action-inputs): Defines various types of inputs required for an action.
    -   [Input Scopes](#input-scopes): Scopes defining where inputs originate.
    -   [Typed Action Parameters](#typed-action-parameters): Parameters for resolving input types.
-   [Action Errors](#action-errors): Structure for handling errors in actions.

## Action

The core structure for any action is defined by the `Action` interface, which includes the following fields:

```ts
export interface Action {
    title: string;
    icon: string;
    description: string;
    label: string;
    links?: LinkedAction[];
    error?: ActionError;
}
```

### Fields Description

-   `title`: A brief, user-friendly title for the action.
-   `icon`: - The value must be an absolute HTTPS URL of an icon image. The file must be an SVG, PNG, or WebP image, or the client/wallet must reject it
    as **malformed**.
-   `description`: A short description providing context for the action.
-   `label`: A user-facing label for the action button or UI element.
-   `links`: An optional array of linked actions that can be performed, defined by the `LinkedAction` interface.
-   `error`: An optional `ActionError `object that provides an error message to the user if something goes wrong during the action execution.

## Linked Actions

Linked actions define subsequent operations or references that can be executed after the primary action. Each linked action is represented by a `LinkedAction` interface and is categorized into various types. These types specify the nature of the linked actions and how they should be processed.

### Linked Action Types

There are several types of linked actions, each serving a different purpose:

#### `link`

-   **Type**: `link`
-   **Description**: A simple hyperlink that directs the user to a specified URL.
-   **Fields**:
    -   `href`: The URL to which the user is redirected.

```ts
export interface LinkAction extends LinkedActionBase {
    type: 'link';
    href: string;
}
```

#### `action`

-   **Type**: `action`
-   **Description**: References another action by its CID (Content Identifier), allowing for the execution of a secondary action.
-   **Fields**:
    -   `cid`: The CID of the referenced action.

```ts
export interface ActionReference extends LinkedActionBase {
    type: 'action';
    cid: string;
}
```

#### `tx`

-   **Type**: `tx`
-   **Description**: Represents a single blockchain transaction. This type of linked action includes the necessary transaction data and parameters.

-   **Fields**:
    -   `chainId`: The ID of the blockchain network where the transaction will be executed.
    -   `txData`: Contains details about the transaction, including:
        -   `address`: The contract address for the transaction.
        -   `abi`: The ABI (Application Binary Interface) of the contract.
        -   `parameters`: The parameters required for the transaction, defined as `TypedActionParameter[]`.
        -   `value` (optional): The value to be sent with the transaction.
    -   `success`: Defines the message to display upon successful transaction execution and an optional CID for the next action.
    -   `error`: Defines the message to display in case of an error.

```ts
export interface TxAction extends LinkedActionBase {
    type: 'tx';
    chainId: number;
    txData: {
        address: string;
        abi: string;
        parameters: TypedActionParameter[];
        value?: string;
    };
    success: {
        message: string;
        nextActionCid?: string;
    };
    error: {
        message: string;
    };
}
```

#### `tx-multi`

-   **Type**: `tx-multi`
-   **Description**: Represents multiple blockchain transactions that are executed in sequence or parallel. It includes details for each transaction.

-   **Fields**:
    -   `chainId`: The ID of the blockchain network for the transactions.
    -   `txData`: An array of transaction details, each including:
        -   `address`: The contract address for the transaction.
        -   `abi`: The ABI (Application Binary Interface) of the contract.
        -   `parameters`: The parameters required for the transaction, defined as `TypedActionParameter[]`.
        -   `value` (optional): The value to be sent with the transaction.
    -   `success`: Defines the message to display upon successful execution of all transactions and an optional CID for the next action.
    -   `error`: Defines the message to display in case of an error.

```ts
export interface TxMultiAction extends LinkedActionBase {
    type: 'tx-multi';
    chainId: number;
    txData: Array<{
        address: string;
        abi: string;
        parameters: TypedActionParameter[];
        value?: string;
    }>;
    success: {
        message: string;
        nextActionCid?: string;
    };
    error: {
        message: string;
    };
}
```

#### `transfer-action`

-   **Type**: `transfer-action`
-   **Description**: Represents a token transfer action. This type is used to specify a transfer of value from one address to another.

-   **Fields**:
    -   `value`: The amount to be transferred.

```ts
export interface TransferAction extends LinkedActionBase {
    type: 'transfer-action';
    value: string;
}
```

Clients must handle each linked action type according to its defined purpose:

-   For `tx` and `tx-multi` types, clients should prepare and execute the blockchain transactions as specified.
-   For `link` and `action` types, clients should redirect or reference the specified URL or action CID.
