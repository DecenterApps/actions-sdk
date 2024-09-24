import Ajv, { JSONSchemaType } from 'ajv';
import {
    actionErrorSchema,
    constantParameterSchema,
    actionInputSchema,
    actionInputSelectableSchema,
    computedInputSchema,
    contractReadInputSchema,
    typedActionParameterSchema,
    txActionSchema,
    txMultiActionSchema,
    transferActionSchema,
    linkActionSchema,
    referenceActionSchema,
    linkedActionSchema,
    actionSchema,
} from './schemas';
import { validateAddress, validateAbi, validateCid } from './custom-validators';

/**
 * Create an instance of Ajv.
 *
 * @property {boolean} discriminator - Enables support for discriminator keyword.
 * @property {boolean} allErrors - Collects all errors instead of stopping on the first error.
 */
const ajv = new Ajv({ discriminator: true, allErrors: true });

/**
 * Add custom formats for address, abi and IPFS CID to the Ajv instance.
 */

ajv.addFormat('address', {
    type: 'string',
    validate: validateAddress,
});

// *** Currently function signature validation is disabled ***
ajv.addFormat('abi', {
    type: 'string',
    validate: validateAbi,
});

ajv.addFormat('cid', {
    type: 'string',
    validate: validateCid,
});

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
ajv.addSchema(computedInputSchema, '#/definitions/computedInput');
ajv.addSchema(contractReadInputSchema, '#/definitions/contractReadInput');
ajv.addSchema(typedActionParameterSchema, '#/definitions/typedActionParameter');
ajv.addSchema(txActionSchema, '#/definitions/txAction');
ajv.addSchema(txMultiActionSchema, '#/definitions/txMultiAction');
ajv.addSchema(transferActionSchema, '#/definitions/transferAction');
ajv.addSchema(linkActionSchema, '#/definitions/linkAction');
ajv.addSchema(referenceActionSchema, '#/definitions/referenceAction');
ajv.addSchema(linkedActionSchema, '#/definitions/linkedAction');
ajv.addSchema(actionSchema, '#/definitions/action');

export default ajv;
