import Link from "next/link";

import { LanguageType } from "@/src/types/language";

const Home = ({ lang }: { lang: LanguageType }) => {
  const userId = "1";

  return (
    <div className='w-screen h-screen'>
      <div className='flex items-center justify-center flex-col h-full gap-4'>
        <div className='flex items-center justify-center text-5xl font-bold'>
          Welcome to Meshmell
        </div>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col md:flex-row justify-center items-center'>
            <Link href={`/${lang}/exhibition`}>
              <div className='h-[300px] p-4 w-[500px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 m-2 flex flex-col items-center justify-center gap-4'>
                <div className='font-bold text-center text-2xl'>
                  Download 3D models for free!
                </div>
                <div>No login required</div>
              </div>
            </Link>
            <Link href={`/${lang}/share/${userId}`}>
              <div className='h-[300px] p-4 w-[500px] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 m-2 flex flex-col items-center justify-center gap-4'>
                <div className='font-bold text-center text-2xl'>
                  Share your 3D model! with orbit control!
                </div>
                <div>Login required</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
