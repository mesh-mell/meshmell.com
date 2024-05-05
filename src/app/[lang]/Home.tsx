import Link from "next/link";

import { LanguageType } from "@/src/types/language";

const Home = ({ lang }: { lang: LanguageType }) => {

  const userId = "1";

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Link href={`/${lang}/exhibition`}>
          <div className="h-[300px] block p-4 w-full md:w-1/2 max-w-md bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 m-2">
            <div className="font-bold">Share your 3D model! with orbit control!</div>
            <div>No login required</div>
          </div>
        </Link>
        <Link href={`/${lang}/share/${userId}`}>
          <div className="h-[300px] block p-4 w-full md:w-1/2 max-w-md bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 m-2">
            <div className="font-bold">Download 3D models for free!</div>
            <div>Login required</div>
          </div>
        </Link>
      </div>
    </div >
  )
}

export default Home
