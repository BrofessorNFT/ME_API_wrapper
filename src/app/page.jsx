import Image from 'next/image'
import LaunchButton from '@/components/launchButton';
import ActivityTab from '@/components/activityTab';

import { Metadata } from 'next'
 
export const metadata = {
  title: 'ME wrapper app',
}

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen  items-center  justify-center sm:p-1 lg:p-24">
      <div className='group relative flex flex-col items-center justify-center'>
        <Image
          src='/firehead.png'
          alt='Profile Image'
          className='rounded-full group-hover:scale-110 transition-transform duration-300 ease-in-out'
          width={175}  // Increased by 25%
          height={175} // Increased by 25%
          priority
        />
        <h1 className='text-2xl text-center mt-8 shadow-lg '> 
          Welcome to the Sanctuary of Calvaria
        </h1>
        <LaunchButton link = "/dashboard"/>
      </div>
    </main>
  )
}
