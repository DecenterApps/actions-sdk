import { Action } from 'actions-spec';
import pinataSdk from '@pinata/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/*
 * Deploy the Action object to IPFS using Pinata SDK
 */
export async function deployToIpfs(action: Action): Promise<string | Error> {
    // Validate the Action object using ajv schemas once helper functions are ready
    try {
        const pinata = await _initPinata();
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
 * Initialize Pinata SDK with the API Key and Secret Key from the .env file
 */
async function _initPinata(): Promise<pinataSdk | Error> {
    try {
        const pinata = new pinataSdk(
            process.env.PINATA_API_KEY,
            process.env.PINATA_API_SECRET_KEY
        );

        const { authenticated } = await pinata.testAuthentication();
        if (!authenticated) {
            return new Error('Error authenticating with Pinata');
        }

        return pinata;
    } catch (error) {
        return error as Error;
    }
}
