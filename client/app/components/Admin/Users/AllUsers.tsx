"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { FiUsers, FiShield, FiBookOpen, FiUserPlus } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";

type Props = { isTeam?: boolean };

const AllUsers: FC<Props> = ({ isTeam }) => {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  const users = useMemo(() => {
    const allUsers = data?.users || [];
    return isTeam ? allUsers.filter((item: any) => item.role === "admin") : allUsers;
  }, [data, isTeam]);

  useEffect(() => {
    if (updateError && "data" in updateError) {
      toast.error((updateError as any).data.message);
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
      setEmail("");
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully");
      setOpen(false);
    }
    if (deleteError && "data" in deleteError) {
      toast.error((deleteError as any).data.message);
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

  const rows = users.map((item: any) => ({
    id: item._id,
    name: item.name,
    email: item.email,
    role: item.role,
    courses: item.courses?.length || 0,
    created_at: format(item.createdAt),
  }));

  const columns: any = [
    { field: "name", headerName: "Name", flex: 1.1, minWidth: 150 },
    { field: "email", headerName: "Email address", flex: 1.5, minWidth: 210 },
    {
      field: "role",
      headerName: "Access role",
      flex: 0.75,
      minWidth: 120,
      renderCell: (params: any) => (
        <span className={`admin-role-pill ${params.value === "admin" ? "admin-role-admin" : "admin-role-user"}`}>
          <span className="admin-role-dot" />{params.value}
        </span>
      ),
    },
    { field: "courses", headerName: "Courses", flex: 0.6, minWidth: 95 },
    { field: "created_at", headerName: "Joined", flex: 0.8, minWidth: 120 },
    {
      field: "delete",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 100,
      flex: 0.55,
      renderCell: (params: any) => (
        <div className="flex items-center gap-3">
          <a className="admin-icon-action" href={`mailto:${params.row.email}`} aria-label={`Email ${params.row.name}`}>
            <AiOutlineMail size={17} />
          </a>
          <Button
            className="!min-w-0 !p-2 !rounded-xl !text-rose-500 hover:!bg-rose-500/10"
            onClick={() => { setUserId(params.row.id); setOpen(true); }}
            aria-label={`Delete ${params.row.name}`}
          >
            <AiOutlineDelete size={18} />
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    await updateUserRole({ email: email.trim(), role });
  };

  const handleDelete = async () => {
    if (userId) await deleteUser(userId);
  };

  const adminCount = (data?.users || []).filter((item: any) => item.role === "admin").length;
  const courseCount = users.reduce((total: number, item: any) => total + (item.courses?.length || 0), 0);

  return (
    <main className="admin-table-page">
      <div className="admin-table-heading">
        <div>
          <span className="admin-eyebrow">{isTeam ? "ACCESS & PERMISSIONS" : "PEOPLE DIRECTORY"}</span>
          <h1 className="admin-page-title">{isTeam ? "Manage team" : "Users"}</h1>
          <p className="admin-table-description">
            {isTeam ? "Manage administrator access and invite trusted team members." : "View learner accounts, course activity and account access in one place."}
          </p>
        </div>
        {isTeam && (
          <button className="admin-primary-action" onClick={() => setActive(true)}>
            <FiUserPlus size={17} /> Add team member
          </button>
        )}
      </div>

      {isLoading ? <Loader /> : (
        <>
          <div className="admin-table-stats">
            <div className="admin-table-stat">
              <span className="admin-table-stat-icon violet"><FiUsers /></span>
              <div><p>{isTeam ? "Team members" : "Total users"}</p><strong>{users.length.toLocaleString()}</strong></div>
            </div>
            <div className="admin-table-stat">
              <span className="admin-table-stat-icon coral"><FiShield /></span>
              <div><p>Administrators</p><strong>{adminCount.toLocaleString()}</strong></div>
            </div>
            <div className="admin-table-stat">
              <span className="admin-table-stat-icon green"><FiBookOpen /></span>
              <div><p>{isTeam ? "Courses managed" : "Courses enrolled"}</p><strong>{courseCount.toLocaleString()}</strong></div>
            </div>
          </div>

          <section className="admin-panel admin-data-panel">
            <div className="admin-panel-heading">
              <div><span className="admin-eyebrow">DIRECTORY</span><h2 className="admin-panel-title">{isTeam ? "Team directory" : "All registered users"}</h2></div>
              <span className="admin-period-pill">{users.length} {isTeam ? "members" : "accounts"}</span>
            </div>
            <Box className="admin-grid-wrap">
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
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

      <Modal open={active} onClose={() => setActive(false)} aria-labelledby="add-team-member-title">
        <Box className="admin-modal-card">
          <span className="admin-eyebrow">TEAM ACCESS</span>
          <h2 id="add-team-member-title" className="admin-modal-title">Add team member</h2>
          <p className="admin-table-description">Enter the account email and choose its access level.</p>
          <label className="admin-field-label">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="admin-modal-input" />
          <label className="admin-field-label">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="admin-modal-input">
            <option value="admin">Administrator</option>
            <option value="user">User</option>
          </select>
          <div className="admin-modal-actions">
            <button className="admin-secondary-action" onClick={() => setActive(false)}>Cancel</button>
            <button className="admin-primary-action" onClick={handleSubmit}>Add member</button>
          </div>
        </Box>
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="delete-user-title">
        <Box className="admin-modal-card">
          <span className="admin-eyebrow">CONFIRM ACTION</span>
          <h2 id="delete-user-title" className="admin-modal-title">Delete this account?</h2>
          <p className="admin-table-description">This action will remove the selected user from LearnSphere. This cannot be undone.</p>
          <div className="admin-modal-actions">
            <button className="admin-secondary-action" onClick={() => setOpen(false)}>Cancel</button>
            <button className="admin-danger-action" onClick={handleDelete}>Delete user</button>
          </div>
        </Box>
      </Modal>
    </main>
  );
};

export default AllUsers;
