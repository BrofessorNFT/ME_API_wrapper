import Link from 'next/link'
import Image from 'next/image'
import SearchBar from './searchbar'
import { ModeToggle } from './modetoggle'

export default function NavContainer({ children }) {
    return (<nav className='relative z-50 dark:bg-gray-900  bg-slate-500 py-1'>
        
        <div className='flex flex-row justify-between p-4' >
            <Link href = '/'>
                <Image 
                src='/icon.png'
                alt = 'Site logo'
                height = {50}
                width = {50}/>
            </Link>

            <div className='flex'>
                <ul className='flex flex-row px-10 items-center ' >
                    <Link href='/dashboard'>
                        <li className='px-10 text-base  font-semibold text-center  '>dashboard</li>
                    </Link>
                    <Link href='/'>
                        <li className='px-10 text-base  font-semibold text-center '>stats</li>
                    </Link>
                    <Link href='/'>
                        <li className='px-10 text-base  font-semibold text-center '>holders</li>
                    </Link>
                </ul>
            </div>

            <div className='flex group items-center relative' >

                    <Link href = '/profile'>
                        <Image
                        src='/firehead.png'
                        className='rounded-full group-hover:scale-110 transition-transform duration-300 ease-in-out'
                        width={50}  // Increased by 25%
                        height={50} // Increased by 25%
                        alt ='profile picture'
                        />
                    </Link>
                    <ModeToggle className="p-5"/>
            </div>
            {children}
        </div>
    </nav>)
}

