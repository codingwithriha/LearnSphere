import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { FiFileText, FiDollarSign, FiShoppingBag } from "react-icons/fi";

type Props = { isDashboard?: boolean };

const AllInvoices = ({ isDashboard }: Props) => {
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;
    const temp = data.orders.map((item: any) => {
      const user = usersData?.users.find((entry: any) => entry._id === item.userId);
      const course = coursesData?.courses.find((entry: any) => entry._id === item.courseId);
      return {
        ...item,
        userName: user?.name || "Unknown learner",
        userEmail: user?.email || "",
        title: course?.name || "Course unavailable",
        price: course?.price != null ? "$" + course.price : "—",
      };
    });
    setOrderData(temp);
  }, [data, usersData, coursesData]);

  const rows = useMemo(() => orderData.map((item: any) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    created_at: format(item.createdAt),
  })), [orderData]);

  const columns: any = [
    { field: "userName", headerName: "Learner", flex: 0.9, minWidth: 140 },
    ...(!isDashboard ? [
      { field: "userEmail", headerName: "Email address", flex: 1.2, minWidth: 190 },
      { field: "title", headerName: "Course", flex: 1.2, minWidth: 180 },
    ] : []),
    { field: "price", headerName: "Amount", flex: 0.65, minWidth: 100 },
    ...(isDashboard ? [
      { field: "created_at", headerName: "Date", flex: 0.8, minWidth: 120 },
    ] : [
      {
        field: "contact",
        headerName: "Contact",
        sortable: false,
        filterable: false,
        minWidth: 90,
        renderCell: (params: any) => params.row.userEmail ? (
          <a className="admin-icon-action" href={`mailto:${params.row.userEmail}`} aria-label={`Email ${params.row.userName}`}>
            <AiOutlineMail size={18} />
          </a>
        ) : <span className="admin-muted">—</span>,
      },
      { field: "created_at", headerName: "Purchased", flex: 0.8, minWidth: 120 },
    ]),
  ];

  const totalOrders = rows.length;
  const totalRevenue = orderData.reduce((sum: number, item: any) => sum + (Number(item.price?.replace("$", "")) || 0), 0);

  if (isLoading) return <Loader />;

  if (isDashboard) {
    return (
      <Box className="admin-grid-wrap">
        <DataGrid
          autoHeight
          checkboxSelection={false}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          hideFooter
          sx={gridSx}
        />
      </Box>
    );
  }

  return (
    <main className="admin-table-page">
      <div className="admin-table-heading">
        <div>
          <span className="admin-eyebrow">PAYMENTS & ENROLLMENTS</span>
          <h1 className="admin-page-title">Invoices</h1>
          <p className="admin-table-description">Review course purchases, payment amounts and learner details.</p>
        </div>
      </div>

      <div className="admin-table-stats">
        <div className="admin-table-stat">
          <span className="admin-table-stat-icon violet"><FiFileText /></span>
          <div><p>Total invoices</p><strong>{totalOrders.toLocaleString()}</strong></div>
        </div>
        <div className="admin-table-stat">
          <span className="admin-table-stat-icon green"><FiDollarSign /></span>
          <div><p>Recorded revenue</p><strong>${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></div>
        </div>
        <div className="admin-table-stat">
          <span className="admin-table-stat-icon coral"><FiShoppingBag /></span>
          <div><p>Course purchases</p><strong>{totalOrders.toLocaleString()}</strong></div>
        </div>
      </div>

      <section className="admin-panel admin-data-panel">
        <div className="admin-panel-heading">
          <div><span className="admin-eyebrow">TRANSACTION HISTORY</span><h2 className="admin-panel-title">All invoices</h2></div>
          <span className="admin-period-pill">{totalOrders} records</span>
        </div>
        <Box className="admin-grid-wrap">
          <DataGrid
            autoHeight
            checkboxSelection
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            sx={gridSx}
          />
        </Box>
      </section>
    </main>
  );
};

const gridSx = {
  border: 0,
  color: "var(--admin-foreground)",
  "& .MuiDataGrid-columnHeaders": { background: "rgba(155,112,255,.09)", borderBottom: "1px solid var(--admin-panel-border)", color: "var(--admin-foreground)" },
  "& .MuiDataGrid-cell": { borderColor: "var(--admin-panel-border)" },
  "& .MuiDataGrid-row:hover": { background: "rgba(155,112,255,.055)" },
  "& .MuiDataGrid-footerContainer": { borderColor: "var(--admin-panel-border)", color: "var(--admin-foreground)" },
  "& .MuiCheckbox-root": { color: "#9870ed" },
  "& .MuiDataGrid-columnSeparator": { color: "var(--admin-panel-border)" },
  "& .MuiDataGrid-toolbarContainer": { padding: "10px 14px" },
  "& .MuiButton-root": { color: "var(--admin-muted)" },
};

export default AllInvoices;
