export async function getCollectionFromME(ticker) {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    
    try {
        const response = await fetch(`https://api-mainnet.magiceden.dev/v2/collections/${ticker}/stats`, options);
        const data = await response.json();
        const currentTime = new Date();
        return {fp : data.floorPrice,
                lc: data.listedCount,
                time : currentTime.toISOString()}
    } catch (err) {
        console.error(err);
        return null; 
    }
}

export async function getActivitiesFromMe(ticker) {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
    const response = await fetch(`https://api-mainnet.magiceden.dev/v2/collections/${ticker}/activities`, options)
    // const data = await 
    return response.json();;
    } catch (err) {
        return null; 
    } 
  }
  


export async function getPopularCollectionsFromMe() {
const options = {method: 'GET', headers: {accept: 'application/json'}};
try {
const response = await fetch('https://api-mainnet.magiceden.dev/v2/marketplace/popular_collections', options)
return response.json();;
} catch (err) {
    return null; 
} 
}
  

export async function getHolderStatsFromME(ticker) {
const options = {method: 'GET', headers: {accept: 'application/json'}};
try {
    const response = await fetch(`https://api-mainnet.magiceden.dev/v2/collections/${ticker}/holder_stats`, options)
return response.json();;
} catch (err) {
    return null; 
} 
}