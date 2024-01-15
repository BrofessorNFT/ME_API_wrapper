import Link from 'next/link'

const LaunchButton = ({link}) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded inline-flex items-center transition duration-300 ease-in-out mt-5">
      <Link href ={link}><span>Launch the App</span> </Link>
      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </button>
  );
};

export default LaunchButton;