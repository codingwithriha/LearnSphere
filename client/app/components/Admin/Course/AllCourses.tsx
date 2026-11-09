"use client";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiBookOpen, FiStar, FiUsers } from "react-icons/fi";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { toast } from "react-hot-toast";
import Link from "next/link";

const AllCourses = () => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const courses = useMemo(() => data?.courses ?? [], [data?.courses]);
  const rows = useMemo(() => courses.map((item: any) => ({
    id: item._id,
    title: item.name,
    ratings: item.ratings ?? 0,
    purchased: item.purchased ?? 0,
    created_at: format(item.createdAt),
  })), [courses]);

  const columns: any = [
    { field: "title", headerName: "Course title", flex: 1.5, minWidth: 220 },
    {
      field: "ratings",
      headerName: "Rating",
      flex: 0.65,
      minWidth: 100,
      renderCell: (params: any) => <span className="admin-course-rating"><FiStar size={14} /> {Number(params.value || 0).toFixed(1)}</span>,
    },
    { field: "purchased", headerName: "Enrollments", flex: 0.7, minWidth: 110 },
    { field: "created_at", headerName: "Created", flex: 0.8, minWidth: 125 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 110,
      flex: 0.6,
      renderCell: (params: any) => (
        <div className="flex items-center gap-2">
          <Link className="admin-icon-action" href={`/admin/edit-course/${params.row.id}`} aria-label={`Edit ${params.row.title}`}>
            <FiEdit2 size={16} />
          </Link>
          <Button
            className="!min-w-0 !p-2 !rounded-xl !text-rose-500 hover:!bg-rose-500/10"
            onClick={() => { setCourseId(params.row.id); setOpen(true); }}
            aria-label={`Delete ${params.row.title}`}
          >
            <AiOutlineDelete size={18} />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course deleted successfully");
    }
    if (error && "data" in error) toast.error((error as any).data.message);
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    if (courseId) await deleteCourse(courseId);
  };

  const totalEnrolments = courses.reduce((sum: number, item: any) => sum + (Number(item.purchased) || 0), 0);
  const averageRating = courses.length
    ? courses.reduce((sum: number, item: any) => sum + (Number(item.ratings) || 0), 0) / courses.length
    : 0;

  return (
    <main className="admin-table-page">
      <div className="admin-table-heading">
        <div>
          <span className="admin-eyebrow">LEARNING CATALOGUE</span>
          <h1 className="admin-page-title">Live courses</h1>
          <p className="admin-table-description">Manage published learning content, monitor enrolments and keep your catalogue up to date.</p>
        </div>
      </div>

      {isLoading ? <Loader /> : (
        <>
          <div className="admin-table-stats">
            <div className="admin-table-stat">
              <span className="admin-table-stat-icon violet"><FiBookOpen /></span>
              <div><p>Total courses</p><strong>{courses.length.toLocaleString()}</strong></div>
            </div>
            <div className="admin-table-stat">
              <span className="admin-table-stat-icon green"><FiUsers /></span>
              <div><p>Total enrolments</p><strong>{totalEnrolments.toLocaleString()}</strong></div>
            </div>
            <div className="admin-table-stat">
              <span className="admin-table-stat-icon coral"><FiStar /></span>
              <div><p>Average rating</p><strong>{averageRating.toFixed(1)}<small className="admin-stat-suffix"> / 5</small></strong></div>
            </div>
          </div>

          <section className="admin-panel admin-data-panel">
            <div className="admin-panel-heading">
              <div><span className="admin-eyebrow">CONTENT MANAGEMENT</span><h2 className="admin-panel-title">Course library</h2></div>
              <span className="admin-period-pill">{courses.length} courses</span>
            </div>
            <Box className="admin-grid-wrap">
              <DataGrid
                autoHeight
                checkboxSelection
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                sx={{
                  border: 0,
                  color: "var(--admin-foreground)",
                  "& .MuiDataGrid-columnHeaders": { background: "rgba(155,112,255,.09)", borderBottom: "1px solid var(--admin-panel-border)", color: "var(--admin-foreground)" },
                  "& .MuiDataGrid-cell": { borderColor: "var(--admin-panel-border)" },
                  "& .MuiDataGrid-row:hover": { background: "rgba(155,112,255,.055)" },
                  "& .MuiDataGrid-footerContainer": { borderColor: "var(--admin-panel-border)", color: "var(--admin-foreground)" },
                  "& .MuiCheckbox-root": { color: "#9870ed" },
                  "& .MuiDataGrid-columnSeparator": { color: "var(--admin-panel-border)" },
                }}
              />
            </Box>
          </section>
        </>
      )}

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="delete-course-title">
        <Box className="admin-modal-card">
          <span className="admin-eyebrow">CONFIRM ACTION</span>
          <h2 id="delete-course-title" className="admin-modal-title">Delete this course?</h2>
          <p className="admin-table-description">The selected course will be removed from the catalogue. This action cannot be undone.</p>
          <div className="admin-modal-actions">
            <button className="admin-secondary-action" onClick={() => setOpen(false)}>Cancel</button>
            <button className="admin-danger-action" onClick={handleDelete}>Delete course</button>
          </div>
        </Box>
      </Modal>
    </main>
  );
};

export default AllCourses;
