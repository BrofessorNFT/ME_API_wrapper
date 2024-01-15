import ActivityTab from '@/components/activityTab'
import SearchBar from '@/components/searchbar'
import { DEFAULT_COLLECTION } from '@/settings';
import FpChecker  from '@/components/fpchecker';
import LineChart from '@/components/linechart';
import PopularCollectionsTab from '@/components/popularcollectionstab';
import { Slider } from '@/components/ui/slider';

import { SliderProvider } from '@/components/SharedContext';
import SliderComponent from '@/components/slidercomponent';
import RightPanel from '@/components/rightpanel';



export default function Home({ searchParams}) {
    const query = searchParams?.query || DEFAULT_COLLECTION ;
    return (
    <main >
    <div className='hidden lg:flex justify-center items-center p-5'> 
        <SearchBar
            placeholder={'Search collection'}
            />
        </div>
     <div className="flex items-start justify-between lg:px-12 flex-wrap lg:flex-nowrap">   
        <div className=' flex-row   w-1/4 -my-20 bg-card  justify-center items-center lg:mx-10 rounded-3xl hidden lg:block'><ActivityTab ticker = {query}/></div>
        <div className=' flex  flex-col w-full lg:w-1/2 justify-center lg:mx-2 border  '>
            <div className='flex justify-center text-xl '><span>Popular collections on ME</span></div>
            <div className='flex flex-row flex-wrap justify-center '><PopularCollectionsTab/></div>
            <div className='w-full justify-center flex-col flex items-center' >
                <SliderProvider>
                    <LineChart ticker={query} />
                    <SliderComponent />
                </SliderProvider>
            </div>
              
            </div>

        <div className='w-1/4 hidden lg:block'>
        <RightPanel ticker={query}/>
        </div>
    </div>
    </main>
    )}