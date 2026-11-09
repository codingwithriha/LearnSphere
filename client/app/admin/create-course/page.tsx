'use client'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../app/utils/Heading';
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
         title="LearnSphere - Admin"
         description="LearnSphere is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="w-[16%] shrink-0">
                <AdminSidebar />
            </div>
            <div className="flex-1 min-w-0">
               <DashboardHeader />
               <CreateCourse /> 
            </div>
        </div>
    </div>
  )
}

export default page