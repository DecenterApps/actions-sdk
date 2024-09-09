import ajv from './ajv-setup';
import { Action } from 'actions-spec';

/**
 * Validates if the provided data conforms to the Action schema.
 * This function accepts any input and checks if it's a valid Action.
 *
 * @param data - The data to validate, which could be any JSON object.
 * @returns An object containing a boolean 'valid' flag and any validation errors.
 */
export function validateAction(data: unknown): {
    valid: boolean;
    errors: string[] | null;
} {
    const validate = ajv.getSchema<Action>('#/definitions/action');

    if (!validate) {
        throw new Error('Action schema not found');
    }

    if (validate(data)) {
        return { valid: true, errors: null };
    } else {
        const errors =
            validate.errors?.map(
                (err) => `${err.instancePath} ${err.message}`
            ) ?? null;
        return { valid: false, errors };
    }
}
