// utility to manually verify proxy contracts on etherscan


import { deployments, network } from "hardhat"
import axios, { AxiosRequestConfig } from "axios"
import qs from "qs"

const { ETHERSCAN_API_KEY } = process.env

const main = async () => {


    console.log(ETHERSCAN_API_KEY);
    
    const allDeployments = await deployments.all();

    const proxiesNames = Object.entries(allDeployments)
        .map(([key]) => key)
        .filter((name) => name.match(/Proxy$/g));

    console.log('proxiesNames', proxiesNames.toString());

    for (const proxyName of proxiesNames) {
        console.log(`Verifying ${proxyName}...`)
        const proxy = allDeployments[proxyName]
        const implementation = allDeployments[proxyName.replace("Proxy", "")]

        const apiSubdomain = network.name === "mainnet" ? "api" : `api-${network.name}`
        const url = `https://${apiSubdomain}.etherscan.io/api?module=contract&action=verifyproxycontract&apikey=${ETHERSCAN_API_KEY}`
        const options: AxiosRequestConfig = {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: qs.stringify({ address: proxy.address, expectedimplementation: implementation.address }),
            url,
        }
        const {
            data: { message: okOrNotOk, result: guidOrError },
        } = await axios(options)

        if (okOrNotOk === "NOTOK") {
            console.log(`Verification failed. Reason: ${guidOrError}`)
        } else {
            console.log(`Verification request sent.`)
            console.log(`To check the request status, use ${guidOrError} as GUID.`)
        }
    }
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
});

