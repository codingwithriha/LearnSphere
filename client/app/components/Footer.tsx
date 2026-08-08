import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-[20px] font-[700] text-gradient font-Poppins">LearnSphere</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering learners worldwide with quality courses and expert instruction.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-[18px] font-[600] text-slate-900 dark:text-white">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[18px] font-[600] text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[18px] font-[600] text-slate-900 dark:text-white">Contact</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">hello@learnsphere.com</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">+1 (885) 665-2022</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Copyright © 2026 LearnSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
