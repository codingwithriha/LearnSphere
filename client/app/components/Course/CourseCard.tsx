import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}>
      <div className="group w-full min-h-[35vh] glass-card rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={item.thumbnail?.url || "/assests/banner-img-1.png"}
            width={500}
            height={280}
            alt={item.name}
            className="rounded-xl w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.category && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-Poppins font-medium rounded-full bg-indigo-600/90 text-white backdrop-blur-sm">
              {item.category}
            </span>
          )}
        </div>
        <div className="pt-4">
          <h1 className="font-Poppins text-[17px] font-[600] text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.name}
          </h1>
          <div className="w-full flex items-center justify-between pt-3">
            <Ratings rating={item.ratings} />
            <h5 className={`text-slate-500 dark:text-slate-400 text-sm ${isProfile && "hidden 800px:inline"}`}>
              {item.purchased} students
            </h5>
          </div>
          <div className="w-full flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-[700] text-indigo-600 dark:text-indigo-400">
                {item.price === 0 ? "Free" : `$${item.price}`}
              </h3>
              {item.estimatedPrice > 0 && (
                <h5 className="text-sm line-through text-slate-400">${item.estimatedPrice}</h5>
              )}
            </div>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
              <AiOutlineUnorderedList size={18} className="text-indigo-500" />
              <span className="pl-2">{item.courseData?.length} lectures</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
