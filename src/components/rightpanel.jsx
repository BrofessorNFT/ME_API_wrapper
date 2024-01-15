
import {getHolderStatsFromME}  from '@/lib/actions';
import Link from 'next/link';
async function RightPanel({ticker}) {
    const data = await getHolderStatsFromME(ticker)

    return (<div>   
        <div className='flex flex-col items-center p-5 border ml-10 -my-20 rounded-3xl bg-gray-900'>
            <div className='flex flex-col items-center pb-5 text-xl'>
                <span>Collection: {ticker}</span>
                <span>Total supply: {data.totalSupply}</span>
                <span>Unique Holders: {data.uniqueHolders}</span>
            </div>
            <div className='flex flex-col items-center w-full'>
                {data.topHolders.slice(0,20).map(item =>
                    <div key = {item.owner} className='flex flex-wrap m-2 w-full text items-center justify-center border'>
                        <Link className= 'truncate hover:underline'  target='_blank ' href ={`https://solscan.io/account/${item.owner}`}>{item.owner.slice(0,10)}...</Link>
                        <div className='flex flex-row  m-2 w-36 text-sm'>
                            <span> Tokens owned {item.tokens}</span>
                        </div>

                        </div>

                )}
            </div>


        </div>
        

    </div> );
}

export default RightPanel;