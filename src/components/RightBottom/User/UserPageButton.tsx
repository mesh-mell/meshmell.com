"use client";

import Link from "next/link";
import { FaHouseUser } from "react-icons/fa";

const UserPageButton = () => {
  return (
    <>
      <Link
        href="/en/aaa/aaa"
        className={
          "mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center}"
        }
      >
        <div
          className={
            "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-neutral-100 dark:bg-neutral-950 border-[1.5px] sm:border-[3px] border-black dark:border-white  rounded-full"
          }
        >
          <FaHouseUser className={" text-3xl sm:text-4xl"} />
        </div>
      </Link>
    </>
  );
};

export default UserPageButton;
