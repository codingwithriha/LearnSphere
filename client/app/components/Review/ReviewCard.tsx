import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="h-full flex flex-col rounded-2xl p-6 glass-card transition-transform duration-300 hover:-translate-y-1">
      <span className="text-gradient text-[42px] leading-none font-Poppins font-[700] select-none">
        &ldquo;
      </span>

      <p className="-mt-4 flex-1 text-[15px] leading-relaxed font-Poppins text-slate-700 dark:text-slate-200 line-clamp-6">
        {props.item.comment}
      </p>

      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-brand-100 dark:border-brand-800">
        <Image
          src={props.item.avatar}
          alt={props.item.name}
          width={44}
          height={44}
          className="w-[44px] h-[44px] rounded-full object-cover ring-2 ring-brand-500/20 flex-shrink-0"
        />
        <div className="min-w-0">
          <h5 className="text-[15px] font-Poppins font-[600] text-slate-900 dark:text-white truncate">
            {props.item.name}
          </h5>
          <h6 className="text-[13px] font-Poppins text-slate-500 dark:text-slate-400 truncate">
            {props.item.profession}
          </h6>
        </div>
        <div className="ml-auto flex-shrink-0">
          <Ratings rating={5} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;