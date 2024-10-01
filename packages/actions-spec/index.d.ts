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
    links?: LinkedAction[];
    error?: ActionError;
}

/**
 * Union type for all possible linked actions
 */
export type LinkedAction =
    | LinkAction
    | ReferenceAction
    | TxAction
    | TxMultiAction
    | TransferAction;

/**
 * Base interface for all linked actions
 */
export interface LinkedActionBase {
    type: LinkedActionType;
    label: string;
}

/**
 * Linked action types
 */
export type LinkedActionType =
    | 'link'
    | 'reference-action'
    | 'tx'
    | 'tx-multi'
    | 'transfer-action';

/**
 * Link type linked action
 */
export interface LinkAction extends LinkedActionBase {
    type: 'link';
    href: string;
}

/**
 * Reference type linked action (referencing another action by CID)
 */
export interface ReferenceAction extends LinkedActionBase {
    type: 'reference-action';
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
        parameters: TypedActionParameter[];
        value?: string;
    };
    success: ActionSuccessResponse;
    error: ActionError;
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
        parameters: TypedActionParameter[];
        value?: string;
    }>;
    success: ActionSuccessResponse;
    error: ActionError;
    displayConfig: {
        displayMode: 'combined' | 'sequential';
        renderedTxIndex?: number; // Only used when displayMode is 'combined'
    };
}

/**
 * Transfer type linked action
 */
export interface TransferAction extends LinkedActionBase {
    type: 'transfer-action';
    chainId: number;
    address: TypedActionParameter;
    value: TypedActionParameter;
    success: ActionSuccessResponse;
    error: ActionError;
}

/**
 * Helper type for resolving parameters to their respective types
 */
export type TypedActionParameter =
    | ConstantParameter
    | ActionInput
    | ActionInputSelectable
    | ComputedInput
    | ContractReadInput
    | ReferencedParameter;

/**
 * Constant parameter for an Action
 */
export interface ConstantParameter {
    type: 'constant';
    id: string;
    value: string | number | boolean | string[] | number[] | boolean[];
}

/**
 * Input field for an Action
 */
export interface ActionInput {
    type: ActionInputType;
    id: string;
    scope: InputScope;
    label: string;
    required?: boolean;
    pattern?: string;
}

/**
 * Selectable input field for an Action
 */
export interface ActionInputSelectable extends Omit<ActionInput, 'scope'> {
    scope: Extract<InputScope, 'USER'>;
    options: Array<{
        label: string;
        value: string;
        selected?: boolean;
    }>;
}

/**
 * Base interface for all derived inputs
 * Derived inputs are inputs that are calculated based on other inputs
 */
export interface ComputedInput {
    type: 'computed';
    id: string;
    operation: 'add' | 'multiply';
    values: TypedActionParameter[];
}

/**
 * Base interface for all contract read inputs
 * This input type is used to read data from a smart contract
 */
export interface ContractReadInput {
    type: 'contract-read';
    id: string;
    address: string;
    abi: string;
    parameters: TypedActionParameter[];
    returnValueIndex?: number;
}

/**
 * Referenced parameter for tx and tx-multi Actions
 */
export interface ReferencedParameter {
    type: 'referenced';
    refParameterId: string;
}

/**
 * Input scope for an Action
 */
export type InputScope = 'USER' | 'GLOBAL';

/**
 * Supported input types for Action
 */
export type ActionInputType = 'text' | 'number' | 'radio' | 'select';

/**
 * Success response that can be returned from an Action
 */
export interface ActionSuccessResponse {
    message: string;
    nextActionCid?: string;
}

/**
 * Error message that can be returned from an Action
 */
export interface ActionError {
    /** simple error message to be displayed to the user */
    message: string;
}