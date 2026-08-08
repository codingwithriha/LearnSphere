"use client";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import img1 from "../../../public/assests/banner-img-1.png";

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full 1000px:flex items-center relative overflow-hidden">
          <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14 blur-3xl"></div>
          <div className="1000px:w-[42%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-3xl blur-2xl"></div>
              <Image
                src={data?.layout?.banner?.image?.url || img1}
                width={420}
                height={420}
                alt="Learn online"
                className="relative object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10] rounded-2xl"
              />
            </div>
          </div>
          <div className="1000px:w-[58%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[120px] z-10">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-Poppins font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
              Start learning today
            </span>
            <h2 className="dark:text-white text-slate-900 text-[32px] px-3 w-full 1000px:text-[58px] font-[700] font-Josefin py-2 1000px:leading-[68px] 1500px:w-[70%] 1100px:w-[85%]">
              {data?.layout?.banner?.title || "Unlock Your Potential With Expert-Led Courses"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-Poppins font-[500] text-[17px] 1500px:!w-[60%] 1100px:!w-[85%] mt-4 leading-relaxed">
              {data?.layout?.banner?.subTitle ||
                "Join thousands of learners and master in-demand skills with structured, high-quality courses."}
            </p>
            <div className="1500px:w-[60%] 1100px:w-[85%] w-[92%] h-[54px] bg-transparent relative mt-8">
              <input
                type="search"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="input-field !mt-0 !h-[54px] !rounded-2xl !pr-14 !text-[17px] shadow-sm"
              />
              <button
                type="button"
                className="absolute flex items-center justify-center w-[50px] h-[46px] right-1 top-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={handleSearch}
                aria-label="Search courses"
              >
                <BiSearch className="text-white" size={24} />
              </button>
            </div>
            <div className="1500px:w-[60%] 1100px:w-[85%] w-[92%] flex items-center mt-8 gap-3">
              <div className="flex -space-x-3">
                <Image
                  src={require("../../../public/assests/client-1.jpg")}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-white dark:ring-slate-900"
                />
                <Image
                  src={require("../../../public/assests/client-2.jpg")}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-white dark:ring-slate-900"
                />
                <Image
                  src={require("../../../public/assests/client-3.jpg")}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-white dark:ring-slate-900"
                />
              </div>
              <p className="font-Poppins text-slate-600 dark:text-slate-300 text-[16px] font-[500]">
                500K+ learners trust us.{" "}
                <Link href="/courses" className="text-indigo-600 dark:text-indigo-400 font-[600] hover:underline">
                  View Courses
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
