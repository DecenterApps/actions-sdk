// examples/deployAction.ts

import { validateAction, deployToIpfs } from 'actions-sdk';
import { donationAction } from './action-examples/donation-action';

async function deployAction() {
    console.log('\n🚀 Starting action deployment process...\n');

    // Step 1: Validate the action
    console.log('🔍 Validating action...');
    const { valid, errors } = validateAction(donationAction);

    if (!valid) {
        console.error('\n❌ Action validation failed:');
        console.error(errors);
        return;
    }

    console.log('✅ Action validated successfully.\n');

    // Step 2: Deploy to IPFS
    console.log('📤 Deploying action to IPFS...');
    const pinataCredentials = {
        apiKey: 'YOUR_PINATA_API_KEY',
        apiSecretKey: 'YOUR_PINATA_API_SECRET_KEY',
    };

    try {
        const ipfsHash = await deployToIpfs(donationAction, pinataCredentials);
        if (typeof ipfsHash === 'string') {
            console.log('\n✨ Action deployed successfully!');
            console.log(`📎 IPFS CID: ${ipfsHash}\n`);
        } else {
            console.error('\n❌ Action deployment failed:', ipfsHash.message);
        }
    } catch (error) {
        console.error('\n💥 An error occurred during deployment:', error);
    }
}

deployAction();
