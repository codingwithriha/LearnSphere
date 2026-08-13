import React from "react";
import Image from "next/image";
import { styles } from "../styles/style";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
  HiOutlineLightBulb,
} from "react-icons/hi";

const values = [
  {
    icon: HiOutlineLightBulb,
    title: "Practical First",
    description:
      "Every course is built around real, shippable projects, not just theory. You learn by building the same things you'll build on the job.",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Affordable Education",
    description:
      "Price should never be the barrier between you and a career in tech. Our courses are priced so anyone can access quality education.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "A Supportive Community",
    description:
      "You're never learning alone. Our community of learners and mentors is there to help you get unstuck, every step of the way.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "For Every Level",
    description:
      "Whether you're writing your first line of code or leveling up an existing career, there's a learning path built for where you are.",
  },
];

const About = () => {
  return (
    <div className="text-black dark:text-white">
      {/* Intro */}
      <div className="w-[92%] 800px:w-[75%] m-auto pt-14 pb-10 text-center">
        <h1 className={`${styles.title} 800px:!text-[45px] !text-[32px]`}>
          What is <span className="text-gradient">LearnSphere?</span>
        </h1>
        <p className={`${styles.label} !text-[17px] mt-4 max-w-[720px] mx-auto`}>
          LearnSphere is a programming community built to help new
          developers learn practical, in-demand skills and turn them into
          real projects &mdash; without breaking the bank.
        </p>
      </div>

      {/* Value cards */}
      <div className="w-[92%] 800px:w-[85%] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="glass-card rounded-2xl p-6 flex flex-col gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-brand-500 to-coral-500 flex items-center justify-center">
              <Icon size={22} className="text-white" />
            </div>
            <h4 className="font-Poppins font-[600] text-[17px]">{title}</h4>
            <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Founder note */}
      <div className="w-[92%] 800px:w-[75%] m-auto mt-16 mb-16">
        <div className="glass-card rounded-2xl p-8 800px:p-10 800px:flex gap-8 items-center">
          <div className="800px:w-[30%] w-full flex justify-center 800px:justify-start mb-6 800px:mb-0">
            <div className="w-[110px] h-[110px] rounded-full bg-gradient-to-r from-brand-500 to-coral-500 flex items-center justify-center text-white text-[36px] font-Poppins font-[700]">
              CR
            </div>
          </div>
          <div className="800px:w-[70%] w-full">
            <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200">
              &ldquo;I know firsthand the challenges that come with learning
              and growing in the programming industry &mdash; that&apos;s why
              I built LearnSphere. Our courses and community exist to give
              you the guidance, support, and motivation to become a skilled
              programmer, at a price that never stands in your way.&rdquo;
            </p>
            <div className="mt-5">
              <span className="text-[18px] font-Poppins font-[600] text-gradient">
                CodingWithRiha
              </span>
              <h5 className="text-[14px] font-Poppins text-slate-500 dark:text-slate-400">
                Founder &amp; CEO, LearnSphere
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;