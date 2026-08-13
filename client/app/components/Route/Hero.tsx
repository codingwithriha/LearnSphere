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
          {/* Signature orbit field — echoes "Sphere" in LearnSphere */}
          <div className="orbit-field">
            <div className="orbit-blob bg-brand-400/40 w-[420px] h-[420px] -left-24 -top-16"></div>
            <div className="orbit-blob bg-coral-400/30 w-[360px] h-[360px] right-[-80px] top-[60px]"></div>
            <div className="orbit-blob bg-amber-400/20 w-[280px] h-[280px] left-[30%] bottom-[-100px]"></div>
            <div className="orbit-ring w-[520px] h-[520px] -left-32 top-8 hidden 1000px:block"></div>
            <div className="orbit-ring w-[360px] h-[360px] -left-10 top-24 hidden 1000px:block"></div>
          </div>

          <div className="1000px:w-[42%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/25 to-coral-500/25 rounded-full blur-2xl"></div>
              <Image
                src={data?.layout?.banner?.image?.url || img1}
                width={420}
                height={420}
                alt="Learn online"
                className="relative object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10] rounded-full ring-4 ring-white dark:ring-[#231A47] shadow-2xl shadow-brand-500/20"
              />
              <span className="badge-bestseller absolute top-4 right-4 shadow-lg z-20">
                🔥 Bestseller
              </span>
            </div>
          </div>
          <div className="1000px:w-[58%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[120px] z-10">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-Poppins font-bold bg-gradient-to-r from-brand-500 to-coral-500 text-white shadow-md shadow-brand-500/25">
              ✦ Start learning today
            </span>
            <h2 className="text-[#17123A] dark:text-white text-[34px] px-3 w-full 1000px:text-[60px] font-[800] font-Poppins py-2 1000px:leading-[68px] 1500px:w-[70%] 1100px:w-[85%]">
              <span className="text-gradient">
                {data?.layout?.banner?.title || "Unlock Your Potential"}
              </span>{" "}
              With Expert-Led Courses
            </h2>
            <p className="text-[#4a4266] dark:text-slate-300 font-Inter font-[500] text-[17px] 1500px:!w-[60%] 1100px:!w-[85%] mt-4 leading-relaxed">
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
                className="absolute flex items-center justify-center w-[50px] h-[46px] right-1 top-1 bg-gradient-to-r from-coral-500 to-brand-500 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
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
                  className="rounded-full ring-2 ring-white dark:ring-[#140E2B]"
                />
                <Image
                  src={require("../../../public/assests/client-2.jpg")}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-white dark:ring-[#140E2B]"
                />
                <Image
                  src={require("../../../public/assests/client-3.jpg")}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-white dark:ring-[#140E2B]"
                />
              </div>
              <p className="font-Poppins text-[#4a4266] dark:text-slate-300 text-[16px] font-[500]">
                500K+ learners trust us.{" "}
                <Link href="/courses" className="text-coral-600 dark:text-coral-400 font-[700] hover:underline">
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
