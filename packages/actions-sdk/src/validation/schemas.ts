import { JSONSchemaType } from 'ajv';
import {
    ActionError,
    ConstantParameter,
    ActionInput,
    ActionInputSelectable,
    ReferencedParameter,
    ComputedInput,
    ContractReadInput,
    TypedActionParameter,
    LinkAction,
    ReferenceAction,
    TransferAction,
    TxAction,
    TxMultiAction,
    LinkedAction,
    Action,
} from 'actions-spec';

/**
 * Represents the JSON schema for an ActionError object.
 */
export const actionErrorSchema: JSONSchemaType<ActionError> = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
    required: ['message'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for a ConstantParameter object.
 */
export const constantParameterSchema: JSONSchemaType<ConstantParameter> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'constant' },
        id: { type: 'string' },
        value: {
            oneOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'array', items: { type: 'string' } },
                { type: 'array', items: { type: 'number' } },
                { type: 'array', items: { type: 'boolean' } },
            ],
        },
    },
    required: ['type', 'id', 'value'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for ActionInput object.
 */
export const actionInputSchema: JSONSchemaType<ActionInput> = {
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: ['text', 'number', 'radio', 'select'],
        },
        id: { type: 'string' },
        scope: { type: 'string', enum: ['USER', 'GLOBAL'] },
        label: { type: 'string' },
        required: { type: 'boolean', nullable: true },
        pattern: { type: 'string', nullable: true },
    },
    required: ['type', 'id', 'scope', 'label'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for ActionInputSelectable object.
 */
export const actionInputSelectableSchema: JSONSchemaType<ActionInputSelectable> =
    {
        type: 'object',
        properties: {
            type: { type: 'string', const: 'select' },
            id: { type: 'string' },
            scope: { type: 'string', const: 'USER' },
            label: { type: 'string' },
            options: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'string' },
                        selected: { type: 'boolean', nullable: true },
                    },
                    required: ['label', 'value'],
                    additionalProperties: false,
                },
            },
            required: { type: 'boolean', nullable: true },
            pattern: { type: 'string', nullable: true },
        },
        required: ['type', 'id', 'scope', 'label', 'options'],
        additionalProperties: false,
    };

/**
 * Represents the JSON schema for ReferencedParameter object.
 */
export const referencedParameterSchema: JSONSchemaType<ReferencedParameter> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'referenced' },
        refParameterId: { type: 'string' },
    },
    required: ['type', 'refParameterId'],
    additionalProperties: false,
};

/**
 * Represents the helper schema for action parameters.
 */
const baseParameterSchema = {
    type: 'object',
    oneOf: [
        { $ref: '#/definitions/constantParameter' },
        { $ref: '#/definitions/actionInput' },
        { $ref: '#/definitions/actionInputSelectable' },
        { $ref: '#/definitions/computedInput' },
        { $ref: '#/definitions/contractReadInput' },
    ],
    required: ['type'],
} as const;

/**
 * Represents the JSON schema for ComputedInput object.
 */
export const computedInputSchema: JSONSchemaType<ComputedInput> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'computed' },
        id: { type: 'string' },
        operation: { type: 'string', enum: ['add', 'multiply'] },
        values: {
            type: 'array',
            items: baseParameterSchema,
        },
    },
    required: ['type', 'id', 'operation', 'values'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for ContractReadInput object.
 */
export const contractReadInputSchema: JSONSchemaType<ContractReadInput> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'contract-read' },
        id: { type: 'string' },
        address: { type: 'string' },
        abi: { type: 'string' },
        parameters: {
            type: 'array',
            items: baseParameterSchema,
        },
        returnValueIndex: { type: 'number', nullable: true },
    },
    required: ['type', 'id', 'address', 'abi', 'parameters'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for TypedActionParameter object.
 */
export const typedActionParameterSchema: JSONSchemaType<TypedActionParameter> =
    baseParameterSchema;

/**
 * Represents the JSON schema for TxAction object.
 */
export const txActionSchema: JSONSchemaType<TxAction> = {
    type: 'object',
    properties: {
        label: { type: 'string' },
        type: { type: 'string', const: 'tx' },
        chainId: { type: 'integer' },
        txData: {
            type: 'object',
            properties: {
                address: { type: 'string' },
                abi: { type: 'string' },
                parameters: {
                    type: 'array',
                    items: {
                        anyOf: [
                            typedActionParameterSchema,
                            referencedParameterSchema,
                        ],
                    },
                },
                value: { type: 'string', nullable: true },
            },
            required: ['address', 'abi', 'parameters'],
            additionalProperties: false,
        },
        success: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                nextActionCid: { type: 'string', nullable: true },
            },
            required: ['message'],
            additionalProperties: false,
        },
        error: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
        },
    },
    required: ['type', 'chainId', 'txData', 'success', 'error'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for TxMultiAction object.
 */
export const txMultiActionSchema: JSONSchemaType<TxMultiAction> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'tx-multi' },
        label: { type: 'string' },
        chainId: { type: 'integer' },
        txData: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    address: { type: 'string' },
                    abi: { type: 'string' },
                    parameters: {
                        type: 'array',
                        items: {
                            anyOf: [
                                typedActionParameterSchema,
                                referencedParameterSchema,
                            ],
                        },
                    },
                    value: { type: 'string', nullable: true },
                },
                required: ['address', 'abi', 'parameters'],
                additionalProperties: false,
            },
        },
        displayConfig: {
            type: 'object',
            properties: {
                displayMode: {
                    type: 'string',
                    enum: ['combined', 'sequential'],
                },
                renderedTxIndex: { type: 'integer', nullable: true },
            },
            required: ['displayMode'],
            additionalProperties: false,
        },
        success: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                nextActionCid: { type: 'string', nullable: true },
            },
            required: ['message'],
            additionalProperties: false,
        },
        error: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
        },
    },
    required: [
        'type',
        'chainId',
        'txData',
        'displayConfig',
        'success',
        'error',
    ],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for LinkAction object.
 */
export const linkActionSchema: JSONSchemaType<LinkAction> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'link' },
        label: { type: 'string' },
        href: { type: 'string' },
    },
    required: ['type', 'label', 'href'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for ReferenceAction object.
 */
export const referenceActionSchema: JSONSchemaType<ReferenceAction> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'reference-action' },
        label: { type: 'string' },
        cid: { type: 'string' },
    },
    required: ['type', 'label', 'cid'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for TransferAction object.
 */
export const transferActionSchema: JSONSchemaType<TransferAction> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'transfer-action' },
        label: { type: 'string' },
        address: {
            oneOf: [typedActionParameterSchema, referencedParameterSchema],
        },
        value: { type: 'string' },
        success: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                nextActionCid: { type: 'string', nullable: true },
            },
            required: ['message'],
            additionalProperties: false,
        },
        error: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
            required: ['message'],
            additionalProperties: false,
        },
    },
    required: ['type', 'label', 'address', 'value', 'success', 'error'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for LinkedAction object.
 */
export const linkedActionSchema: JSONSchemaType<LinkedAction> = {
    type: 'object',
    oneOf: [
        { $ref: '#/definitions/linkAction' },
        { $ref: '#/definitions/referenceAction' },
        { $ref: '#/definitions/txAction' },
        { $ref: '#/definitions/txMultiAction' },
        { $ref: '#/definitions/transferAction' },
    ],
    required: ['type', 'label'],
    discriminator: { propertyName: 'type' },
};

/**
 * Represents the JSON schema for Action object.
 */
export const actionSchema: JSONSchemaType<Action> = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        icon: { type: 'string' },
        description: { type: 'string' },
        label: { type: 'string' },
        links: {
            type: 'array',
            items: linkedActionSchema,
            nullable: true,
        },
        error: { ...actionErrorSchema, nullable: true },
    },
    required: ['title', 'icon', 'description', 'label'],
    additionalProperties: false,
};
