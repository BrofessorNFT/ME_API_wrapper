'use client'
import Link from 'next/link'
import Image from 'next/image'
import { getActivitiesFromMe } from '@/lib/actions';
import { useState, useEffect } from 'react';

function convertSolanaBlockTimeToDateTime(blockTime) {
    const date = new Date(blockTime * 1000);
  
    // Extracting individual components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Formatting the date and time
    const formattedDateTime = `${day} ${month} ${year}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    return formattedDateTime;
  }

export default function ActivityTab({ticker}) {
    
    
    const [data , setData ] = useState([])
    
    useEffect(() => {
        let intervalId;
        
        const fetchData = async () => {
            try {
                const temp = await getActivitiesFromMe(ticker)
                // console.log(temp)
                setData(temp)
                // console.log(fp,lc,time, ticker)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData()
        intervalId = setInterval(fetchData, 2500);
        return () => {
            clearInterval(intervalId);
            setData([])
            
        }
        },[ticker])



    return ( <div className='w-full'>
        <ul>
        <h1 className='flex flex-row flex-wrap  justify-center items-center  m-2 text-xl  dark:bg-gray-900  bg-slate-300 rounded-3xl p-5'> Activity for collection </h1>
        {data?.filter(item => item.type === "buyNow" || item.type === "list" || item.type === "deList")
        .filter(item => item.image).slice(0,10)
        .map(item =>
            <li key = {item.signature}>
            <div className='flex flex-row flex-wrap  justify-center items-center dark:bg-gray-900  bg-slate-300 p-2 border-2 rounded-2xl overflow-hidden m-2  dark:hover:bg-slate-700 hover:bg-blue-400'>
                <div className='flex rounded-full overflow-hidden'>
                    <img
                    src ={item.image}
                    height={65}
                    alt='dfs'
                    width = {65}
                    ></img>
                </div>
                <div className='flex flex-col m-2 w-auto text'>
                {item.blockTime && <p className= ''>{convertSolanaBlockTimeToDateTime(item.blockTime)}</p>}
                {item.type && <p className= ''>Type: {item.type}</p>}
                {item.buyer && <Link className= 'truncate hover:underline'  target='_blank ' href ={`https://solscan.io/account/${item.buyer}`}>Buyer:{item.buyer.slice(0,10)}...</Link>}
                {item.seller && <Link className= 'truncate hover:underline'  target='_blank ' href ={`https://solscan.io/account/${item.seller}`}>Seller:{item.seller.slice(0,10)}...</Link>}
                <Link href={`https://solscan.io/tx/${item.signature}` } target='_blank ' className='truncate hover:underline'>View Transaction</Link>
                </div>
           </div>
            </li> )}
        </ul>
    </div>
    )  
  }
