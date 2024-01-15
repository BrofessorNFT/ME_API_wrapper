"use client"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
export default function SearchBar({placeholder}) {
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch() {
        const params = new URLSearchParams(searchParams)
        if (searchTerm) {
            params.set('query', searchTerm)
        } else {
            params.delete('query')
        }
        // console.log(params.toString())
        // console.log(replace)
        replace(`${pathname}?${params.toString()}`);
    }
    

    return (
    <div className='flex group items-center relative'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="absolute bi bi-search left-8" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <input type="text" placeholder={placeholder}
        onChange={(e) => setSearchTerm(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        className=" mx-5 pl-10 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
        <button onClick={handleSearch}  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 hover:bg-blue-800">Search</button>
    </div>
    )}