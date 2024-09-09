import { JSONSchemaType } from 'ajv';
import {
    ActionError,
    ConstantParameter,
    ActionInput,
    ActionInputSelectable,
    TypedActionParameter,
    LinkAction,
    ActionReference,
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
        value: { type: 'string' },
    },
    required: ['type', 'value'],
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
            enum: [
                'text',
                'email',
                'url',
                'number',
                'date',
                'datetime-local',
                'checkbox',
                'radio',
                'textarea',
            ],
        },
        scope: { type: 'string', enum: ['USER', 'GLOBAL'] },
        label: { type: 'string' },
        required: { type: 'boolean', nullable: true },
        pattern: { type: 'string', nullable: true },
    },
    required: ['type', 'scope', 'label'],
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
            scope: { type: 'string', enum: ['USER'] },
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
        required: ['type', 'scope', 'label', 'options'],
        additionalProperties: false,
    };

/**
 * Represents the JSON schema for TypedActionParamete object.
 */
export const typedActionParameterSchema: JSONSchemaType<TypedActionParameter> =
    {
        type: 'object',
        oneOf: [
            { $ref: '#/definitions/constantParameter' },
            { $ref: '#/definitions/actionInput' },
            { $ref: '#/definitions/actionInputSelectable' },
        ],
        required: ['type'],
    };

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
                    items: typedActionParameterSchema,
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
                        items: typedActionParameterSchema,
                    },
                    value: { type: 'string', nullable: true },
                },
                required: ['address', 'abi', 'parameters'],
                additionalProperties: false,
            },
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
 * Represents the JSON schema for ActionReference object.
 */
export const actionReferenceSchema: JSONSchemaType<ActionReference> = {
    type: 'object',
    properties: {
        type: { type: 'string', const: 'action' },
        label: { type: 'string' },
        cid: { type: 'string' },
    },
    required: ['type', 'label', 'cid'],
    additionalProperties: false,
};

/**
 * Represents the JSON schema for LinkedAction object.
 */
export const linkedActionSchema: JSONSchemaType<LinkedAction> = {
    type: 'object',
    oneOf: [
        { $ref: '#/definitions/linkAction' },
        { $ref: '#/definitions/actionReference' },
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
