// getArtists.ts
// utility script to pull artist wallet addresses from hasura for testing/ making beautiful trees
// exports a json file with an array of valid addresses to use in 'artists.json'

import { network } from "hardhat";
import axios, { AxiosRequestConfig } from 'axios';
import  fs  from "fs";


const fetchGraphQL = async (
    operationsDoc: string,
    operationName: string,
    variables: Record<string, any>
) => {    

    if (process.env.HASURA_ENDPOINT) {
        console.log('\x1b[37m','USING HASURA_ENDPOINT: ', process.env.HASURA_ENDPOINT, '\x1b[0m');
    }

    const config: AxiosRequestConfig = {
        url: process.env.HASURA_ENDPOINT || 'https://catalog.hasura.app/v1/graphql',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'undefined',
        },
        data: {
            query: operationsDoc,
            variables,
            operationName,
        },
    };

    const result = await axios(config).then(res => {
        return res.data;
    }).catch(e => {
        console.error(e);
    });


    return result;
};

// GQL query to fetch all valid artists
const operation = `
    query MyQuery {
      catalog_users(where: {isArtist: {_eq: true}}) {
        id
      }
    }
  `;


// fetch all artists
const fetchMyQuery = async () => {

    console.group(
        '\n \n \x1b[36m','(▀̿Ĺ̯▀̿ ̿) the artist address utility (▀̿Ĺ̯▀̿ ̿)', '\x1b[0m \n \n',
    );

    const result = await fetchGraphQL(operation, 'MyQuery', {});

    // format
    const formatted = result.data.catalog_users.map((artist: any) => { return artist.id});
            
    console.log('\x1b[32m','output to artists.json: ', formatted , '\x1b[0m');
    fs.writeFileSync('artists.json', JSON.stringify(formatted));

    return result.toString();
}


fetchMyQuery().then(() => process.exit(0)).catch((error) => {
    console.error(error)
    process.exit(1)
});
