/**
 * Actions specification - v1.0
 */

/**
 * Protocol identifier for the Actions protocol
 */
export type ACTIONS_PROTOCOL = 'actions:'; // Placeholder, subject to change

/**
 * Action interface
 */
export interface Action {
    title: string;
    icon: string;
    description: string;
    label: string;
    inputs?: ActionInput[];
    links?: LinkedAction[];
    error?: ActionError;
}

/**
 * Input field for an Action
 */
export interface ActionInput {
    id: string;
    type: ActionInputType;
    label?: string;
    required?: boolean;
}

/**
 * Supported input types for Action
 */
export type ActionInputType =
    | 'text'
    | 'email'
    | 'url'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'select'
    | 'address';

/**
 * Linked action types
 */
export type LinkedActionType =
    | 'link'
    | 'action'
    | 'inline-action'
    | 'tx'
    | 'tx-multi'
    | 'transfer-action';

/**
 * Base interface for all linked actions
 */
export interface LinkedActionBase {
    type: LinkedActionType;
    label: string;
}

/**
 * Link type linked action
 */
export interface LinkAction extends LinkedActionBase {
    type: 'link';
    href: string;
}

/**
 * Action type linked action (referencing another action by CID)
 */
export interface ActionReference extends LinkedActionBase {
    type: 'action';
    cid: string;
}

/**
 * Transaction type linked action
 */
export interface TxAction extends LinkedActionBase {
    type: 'tx';
    chainId: number;
    txData: {
        address: string;
        abi: string;
        parameters: ResolvedParameter[];
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

/**
 * Multi-transaction type linked action
 */
export interface TxMultiAction extends LinkedActionBase {
    type: 'tx-multi';
    chainId: number;
    txData: Array<{
        address: string;
        abi: string;
        parameters: ResolvedParameter[];
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

/**
 * Transfer type linked action
 */
export interface TransferAction extends LinkedActionBase {
    type: 'transfer-action';
    value: string;
}

/**
 * Union type for all possible linked actions
 */
export type LinkedAction =
    | LinkAction
    | ActionReference
    | TxAction
    | TxMultiAction
    | TransferAction;

/**
 * Global variables recognized by extensions/clients
 */
export enum GlobalVariable {
    GLOBAL_WALLET_ADDRESS = 'global.walletAddress',
}

/**
 * User input reference
 */
export type UserInput = `userInput.${string}`;

/**
 * State variable reference
 */
export type StateVariable = `state.${string}`;

/**
 * Helper type for resolving parameters
 */
export type ResolvedParameter =
    | string
    | GlobalVariable
    | UserInput
    | StateVariable;

/**
 * Error message that can be returned from an Action
 */
export interface ActionError {
    /** simple error message to be displayed to the user */
    message: string;
}
