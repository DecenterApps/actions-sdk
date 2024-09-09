import { Action } from 'actions-spec';
import pinataSdk from '@pinata/sdk';

/*
 * PinataCredentials type for API Key and Secret Key
 */
type PinataCredentials = {
    apiKey: string;
    apiSecretKey: string;
};

/*
 * Deploy the Action object to IPFS using Pinata SDK
 */
export async function deployToIpfs(
    action: Action,
    pinataCredentials: PinataCredentials
): Promise<string | Error> {
    // Validate the Action object using ajv schemas once helper functions are ready
    try {
        const pinata = await _initPinata(pinataCredentials);
        if (pinata instanceof Error) {
            return pinata;
        }
        const ipfsFile = await pinata.pinJSONToIPFS(action);
        return ipfsFile.IpfsHash;
    } catch (error) {
        console.log(error);
        return new Error('Error pinning to IPFS!');
    }
}

/*
 * Initialize Pinata SDK using the provided credentials
 */
async function _initPinata(
    pinataCredentials: PinataCredentials
): Promise<pinataSdk | Error> {
    try {
        const pinata = new pinataSdk(
            pinataCredentials.apiKey,
            pinataCredentials.apiSecretKey
        );

        const { authenticated } = await pinata.testAuthentication();
        if (!authenticated) {
            return new Error('Error authenticating with Pinata!');
        }

        return pinata;
    } catch (error) {
        return error as Error;
    }
}