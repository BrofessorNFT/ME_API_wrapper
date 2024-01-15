'use server'
import LineChart from "./linechart";
async function getCollectionFromME(ticker) {
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

let temp = []
export default async function FpChecker({ticker}) {
    
    let info = await getCollectionFromME('froganas');
    temp.push(info)
    console.log(ticker)
    console.log(temp)
    // setInterval(async () => {
    //     let info = await getCollectionFromME(ticker);
    //     temp.push(info);
    //     console.log(info)
    //     // You might want to update the state here if you're using React state
    //     // to trigger re-render, otherwise the DOM won't update.
    //     // setState(temp); // Uncomment and modify this if using React state
    // }, 2000); // 1000 milliseconds = 1 second
    // console.log(temp)
    return ( <LineChart data = {temp} label = "Okay Bears"></LineChart>);
}
