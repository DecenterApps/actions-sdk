import Ajv, { JSONSchemaType } from 'ajv';
import {
    actionErrorSchema,
    constantParameterSchema,
    actionInputSchema,
    actionInputSelectableSchema,
    typedActionParameterSchema,
    txActionSchema,
    txMultiActionSchema,
    transferActionSchema,
    linkActionSchema,
    actionReferenceSchema,
    linkedActionSchema,
    actionSchema,
} from './schemas';

/**
 * Create an instance of Ajv.
 *
 * @property {boolean} discriminator - Enables support for discriminator keyword.
 * @property {boolean} allErrors - Collects all errors instead of stopping on the first error.
 */
const ajv = new Ajv({ discriminator: true, allErrors: true });

/**
 * Add all schema definitions to the Ajv instance.
 * Each schema is added with a unique reference path that can be used in other schemas.
 */
ajv.addSchema(constantParameterSchema, '#/definitions/constantParameter');
ajv.addSchema(actionInputSchema, '#/definitions/actionInput');
ajv.addSchema(
    actionInputSelectableSchema,
    '#/definitions/actionInputSelectable'
);
ajv.addSchema(typedActionParameterSchema, '#/definitions/typedActionParameter');
ajv.addSchema(txActionSchema, '#/definitions/txAction');
ajv.addSchema(txMultiActionSchema, '#/definitions/txMultiAction');
ajv.addSchema(transferActionSchema, '#/definitions/transferAction');
ajv.addSchema(linkActionSchema, '#/definitions/linkAction');
ajv.addSchema(actionReferenceSchema, '#/definitions/actionReference');
ajv.addSchema(actionSchema, '#/definitions/action');

export default ajv;