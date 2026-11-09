'use client'
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../../app/utils/Heading';
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Props = {}

const page = ({params}:any) => {
    const id = params?.id;

  return (
    <div>
        <Heading
         title="LearnSphere - Admin"
         description="LearnSphere is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="w-[18vw] shrink-0 max-[900px]:w-[76px]">
                <AdminSidebar />
            </div>
            <div className="flex-1 min-w-0">
               <DashboardHeader />
               <EditCourse id={id} />
            </div>
        </div>
    </div>
  )
}

export default page