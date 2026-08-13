import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "I had the pleasure of exploring LearnSphere, a platform that offers an extensive range of courses on tech-related topics. The catalog caters to every skill level, and I'd recommend it to anyone looking to grow in tech.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack Developer, Quarter Ltd.",
    comment:
      "The teaching style here is outstanding and the tutorials are top-notch. Complex topics get broken down into manageable parts, and the real-world examples reinforce every concept you learn.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer Systems Engineering Student, Zimbabwe",
    comment:
      "The ability to cover diverse programming languages and topics while keeping lessons practical is genuinely impressive. It reinforces theory with insights I could apply immediately.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer, Indonesia",
    comment:
      "LearnSphere provides an extensive range of courses on tech-related topics. I was thoroughly impressed with the depth and clarity of the lessons from day one.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full Stack Web Developer, Algeria",
    comment:
      "The content is special because the videos are long enough to cover everything in detail. Even a complete beginner can finish an integrated project by the end.",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full Stack Web Developer, Canada",
    comment:
      "LearnSphere focuses on practical applications rather than just theory. Building a real web marketplace taught me every stage of shipping a project from start to finish.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto py-16">
      <div className="w-full 800px:flex items-center gap-10">
        <div className="800px:w-[45%] w-full">
          <Image
            src={require("../../../public/assests/business-img.png")}
            alt="Students learning together"
            width={700}
            height={700}
            className="w-full h-auto"
          />
        </div>
        <div className="800px:w-[55%] w-full mt-8 800px:mt-0">
          <h3 className={`${styles.title} 800px:!text-[40px] 800px:text-left text-center`}>
            Our Students Are{" "}
            <span className="text-gradient">Our Strength</span>
            <br /> See What They Say About Us
          </h3>
          <p className={`${styles.label} 800px:text-left text-center mt-2`}>
            Thousands of learners have used LearnSphere to pick up new
            skills, ship real projects, and move their careers forward. Here
            is some of what they told us about the experience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {reviews.map((item, index) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;