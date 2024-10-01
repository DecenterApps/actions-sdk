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
-   [Action Success Response](#action-success-response): Structure for handling successful action responses.

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
-   `icon`: The value must be an absolute HTTPS URL of an icon image. The file must be an SVG, PNG, or WebP image, or the client/wallet must reject it as **malformed**.
-   `description`: A short description providing context for the action.
-   `label`: A user-facing label for the action button or UI element.
-   `links`: An optional array of linked actions that can be performed, defined by the `LinkedAction` interface.
-   `error`: An optional `ActionError` object that provides an error message to the user if something goes wrong during the action execution.

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

#### `reference-action`

-   **Type**: `reference-action`
-   **Description**: References another action by its CID (Content Identifier), allowing for the execution of a secondary action.
-   **Fields**:
    -   `cid`: The CID of the referenced action.

```ts
export interface ReferenceAction extends LinkedActionBase {
    type: 'reference-action';
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
    -   `success`: An `ActionSuccessResponse` object defining the success message and optional next action.
    -   `error`: An `ActionError` object defining the error message.

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
    success: ActionSuccessResponse;
    error: ActionError;
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
    -   `success`: An `ActionSuccessResponse` object defining the success message and optional next action.
    -   `error`: An `ActionError` object defining the error message.
    -   `displayConfig`: Configures how the multi-transaction action should be displayed to the user.
        -   `displayMode`: Can be either 'combined' or 'sequential', determining whether transactions should be shown as a single action or as separate steps.
        -   `renderedTxIndex` (optional): Used only when `displayMode` is 'combined', specifies which transaction's details should be rendered as the representative for the entire multi-transaction action.

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
    success: ActionSuccessResponse;
    error: ActionError;
    displayConfig: {
        displayMode: 'combined' | 'sequential';
        renderedTxIndex?: number;
    };
}
```

#### `transfer-action`

-   **Type**: `transfer-action`
-   **Description**: Represents a native currency transfer action. This type is used to specify a transfer of value from one address to another.

-   **Fields**:
    -   `address`: The recipient address for the transfer, defined as a `TypedActionParameter`.
    -   `chainId`: The identifier of the blockchain network where the transfer is executed.
    -   `value`: The amount to be transferred, defined as `TypedActionParameter`.
    -   `success`: An `ActionSuccessResponse` object defining the success message and optional next action.
    -   `error`: An `ActionError` object defining the error message.

```ts
export interface TransferAction extends LinkedActionBase {
    type: 'transfer-action';
    chainId: number;
    address: TypedActionParameter;
    value: string;
    success: ActionSuccessResponse;
    error: ActionError;
}
```

Clients must handle each linked action type according to its defined purpose:

-   For `tx`, `tx-multi` and `transfer-action` types, clients should prepare and execute the blockchain transactions as specified.
-   For `link` and `reference-action` types, clients should redirect or reference the specified URL or action CID.

## Action Inputs

Action inputs define the various types of data that can be required for an action. These inputs allow for user interaction and customization of actions.

### Action Input

Action inputs are represented by the `ActionInput` interface, which includes several fields to define the input's characteristics:

```ts
export interface ActionInput {
    type: ActionInputType;
    id: string;
    scope: InputScope;
    label: string;
    required?: boolean;
    pattern?: string;
}
```

#### Fields Description

-   `type`: Specifies the type of input field (see [Input Types](#input-types)).
-   `id`: A unique identifier for the input.
-   `scope`: Defines where the input originates (see [Input Scopes](#input-scopes)).
-   `label`: A user-friendly label for the input field.
-   `required`: An optional boolean indicating whether the input is mandatory.
-   `pattern`: An optional string representing a regular expression pattern for input validation.

### Selectable Inputs

For inputs that require selection from predefined options, the `ActionInputSelectable` interface is used:

```ts
export interface ActionInputSelectable extends Omit<ActionInput, 'scope'> {
    scope: Extract<InputScope, 'USER'>;
    options: Array<{
        label: string;
        value: string;
        selected?: boolean;
    }>;
}
```

This interface extends `ActionInput` but replaces the `scope` field with a more specific type and adds an `options` array for selectable values.

### Input Types

The following input types are supported:

```ts
export type ActionInputType = 'text' | 'number' | 'radio' | 'select';
```

Clients should render appropriate input fields based on these types. For example:

-   'text' and 'number' should be rendered as single-line input fields with appropriate validation.
-   'radio' should be rendered as selectable options.
-   'select' should be rendered as a dropdown or list of options.

## Input Scopes

Input scopes define the origin and handling of input data. There are two types of input scopes:

```ts
export type InputScope = 'USER' | 'GLOBAL';
```

-   `USER`: Indicates that the input should be provided by the user. Clients should render an input field for these inputs.
-   `GLOBAL`: Represents inputs that are handled globally by the client. These might include data like the user's wallet address or other pre-configured values. Clients should not render input fields for global inputs but instead use pre-defined values.

Clients must respect these scopes when processing inputs:

-   For `USER` scoped inputs, always prompt the user for input.
-   For `GLOBAL` scoped inputs, use predefined values without user interaction.

## Typed Action Parameters

Typed action parameters are used to specify the nature and origin of data used in actions. They can be one of five types:

```ts
export type TypedActionParameter =
    | ConstantParameter
    | ActionInput
    | ActionInputSelectable
    | ComputedInput
    | ContractReadInput
    | ReferencedParameter;
```

### Constant Parameter

Constant parameters represent fixed values that don't require user input:

```ts
export interface ConstantParameter {
    type: 'constant';
    id: string;
    value: string | number | boolean | string[] | number[] | boolean[];
}
```

Clients should use the provided `value` directly without any user interaction. The `id` field allows this parameter to be referenced in other parts of the action, particularly useful in `tx` and `tx-multi` actions.

### Action Input and Action Input Selectable

These types correspond to the `ActionInput` and `ActionInputSelectable` interfaces described earlier. Clients should handle these based on their respective specifications.

### Computed Input

Computed inputs are derived from other inputs through simple arithmetic operations:

```ts
export interface ComputedInput {
    type: 'computed';
    id: string;
    operation: 'add' | 'multiply';
    values: TypedActionParameter[];
}
```

Clients should calculate the result based on the specified operation and the provided values. The `values` array can contain any type of `TypedActionParameter`, allowing for complex computations. The `id` field allows this computed input to be referenced in other parts of the action.

-   For 'add' operation, sum all the values.
-   For 'multiply' operation, multiply all the values together.

### Contract Read Input

Contract read inputs are used to fetch data from a smart contract:

```ts
export interface ContractReadInput {
    type: 'contract-read';
    id: string;
    address: string;
    abi: string;
    parameters: TypedActionParameter[];
    returnValueIndex?: number;
}
```

Clients should use this to read data from a smart contract without modifying its state. The `parameters` array specifies the arguments for the contract call, and `returnValueIndex` (if provided) indicates which return value to use if the contract method returns multiple values. The `id` field allows this contract read input to be referenced in other parts of the action.

### Referenced Parameter

Referenced parameters are allowing parameters to be reused across different parts of an action or across multiple transactions.

```ts
export interface ReferencedParameter {
    type: 'referenced';
    refParameterId: string;
}
```

Clients should interpret this as a reference to an existing parameter within the same action. The `refParameterId` specifies the unique identifier of the parameter to be reused. When processing actions that use `ReferencedParameter`, clients must resolve these references by substituting the value of the referenced parameter before executing each transaction.

## Action Errors

Action errors provide a standardized way to communicate issues that occur during action execution:

```ts
export interface ActionError {
    message: string;
}
```

The `message` field contains a user-friendly error description. Clients should display this message to users when an error occurs during action processing.

### Error Handling

Clients should implement robust error handling:

1. Display the error message to the user in a clear and noticeable manner.
2. Provide options for the user to retry the action or return to a previous state.
3. Log detailed error information for debugging purposes, if possible.

By following these guidelines, clients can ensure a consistent and user-friendly experience when dealing with action-related errors.

## Action Success Response

Action success responses provide a standardized way to communicate successful execution of an action:

```ts
export interface ActionSuccessResponse {
    message: string;
    nextActionCid?: string;
}
```

-   `message`: A user-friendly success message to be displayed to the user.
-   `nextActionCid`: An optional field specifying the CID of the next action to be executed, if any.

Clients should display the success message to users when an action is successfully executed. If a `nextActionCid` is provided, clients should proceed to fetch and execute the specified action.
