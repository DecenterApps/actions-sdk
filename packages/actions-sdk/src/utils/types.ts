/**
 * This file re-exports various types used in the actions-sdk package.
 * These types include:
 * - ACTIONS_PROTOCOL: The protocol used for actions.
 * - Action: Represents an action.
 * - LinkedAction: Represents all possible linked actions.
 * - LinkedActionBase: Represents the base class for linked actions.
 * - LinkedActionType: Represents the type of a linked action.
 * - LinkAction: Represents a link action.
 * - ReferenceAction: Represents a reference to an action.
 * - TxAction: Represents a transactional action.
 * - TxMultiAction: Represents a multi-transactional action.
 * - TransferAction: Represents a transfer action.
 * - TypedActionParameter: Represents a typed action parameter.
 * - ConstantParameter: Represents a constant parameter.
 * - ActionInput: Represents an action input.
 * - ActionInputSelectable: Represents a selectable action input.
 * - ComputedInput: Represents a computed input.
 * - ContractReadInput: Represents a contract read input.
 * - ReferencedParameter: Represents a reused parameter in actions.
 * - InputScope: Represents the scope of an input.
 * - ActionInputType: Represents the type of an action input.
 * - ActionSuccessResponse: Represents success response that can be returned from an action.
 * - ActionError: Represents an error that can occur during an action.
 */
export type {
    ACTIONS_PROTOCOL,
    Action,
    LinkedAction,
    LinkedActionBase,
    LinkedActionType,
    LinkAction,
    ReferenceAction,
    TxAction,
    TxMultiAction,
    TransferAction,
    TypedActionParameter,
    ConstantParameter,
    ActionInput,
    ActionInputSelectable,
    ComputedInput,
    ContractReadInput,
    ReferencedParameter,
    InputScope,
    ActionInputType,
    ActionSuccessResponse,
    ActionError,
} from 'actions-spec';
