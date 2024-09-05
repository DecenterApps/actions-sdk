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
