// config util for hardhat-deploy, helps manage enviroments

import 'dotenv/config';


export function node_url(networkName: string): string {

    if (networkName) {
        const uri = process.env['ETH_NODE_URI_' + networkName.toUpperCase()];

        if (uri && uri !== '') {
            return uri;
        }
    }

    if (networkName === 'localhost') {
        // don't use ETH_NODE_URI
        return 'http://localhost:8545';
    }

    let uri = process.env.ETH_NODE_URI;


    if (uri) {
        uri = uri.replace('{{networkName}}', networkName);
    }

    if (!uri || uri === '') {
        // throw error 'env variable ETH_NODE_URI no config 
        return '';
    }

    if (uri.indexOf('{{') >= 0) {
        throw new Error(`invalid uri or network not supported by node provider: ${uri}`);
    }

    // gib uri
    return uri;
}

export function getMnemonic(networkName?: string): string {

    if (networkName) {
        const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()];

        if (mnemonic && mnemonic !== '') {
            return mnemonic;
        }
    }


    const mnemonic = process.env.MNEMONIC;
    // return default private key
    if (!mnemonic || mnemonic === '') {
        return 'test test test test test test test test test test test junk';
    }

    return mnemonic;

}


export function accounts(networkName?: string): {mnemonic: string} {
    return {mnemonic: getMnemonic(networkName)};
}