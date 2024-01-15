import { getPopularCollectionsFromMe } from "@/lib/actions";
import styles from "@/components/popularcollectionstab.css"
import Link from "next/link";
async function PopularCollectionsTab() {
    const data = await getPopularCollectionsFromMe()
    // console.log(data?.slice(0,10))
    return (
    <div className='flex overflow-x-auto py-2  scrollable-container '>
        <div className="flex space-x-4">
            {data?.slice(0,10).map(
                item => 
                        <div  className= "flex-none border border-gray-200 rounded-lg p-2"key = {item.symbol}>
                    <Link href = {`https://magiceden.io/marketplace/${item.symbol}`} target='_blank '>
                            <img
                            className="block mx-auto"
                                    src ={item.image}
                                    height={65}
                                    alt={item.symbol}
                                    width = {65}
                             ></img>
                            <div className="text-center mt-2 text-sm font-semibold"> {item.name} </div>
                    </Link>
                            </div>
            )}

        </div>

    </div>  );
}

export default PopularCollectionsTab;