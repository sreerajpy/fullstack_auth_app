import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FiEdit2, FiTrash2, FiX, FiAlertTriangle, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const navigate = useNavigate()

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for Modals
    const [selectedUser, setSelectedUser] = useState(null); // Used for Edit
    const [userToDelete, setUserToDelete] = useState(null); // Used for Delete
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => { fetchUsers(); }, [isActionLoading]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/users");
            setUsers(res.data?.data || []);
        } catch (err) { console.error("Fetch failed"); }
        finally { setLoading(false); }
    };

    // --- GET BY ID FOR EDIT ---
    const openEditModal = async (id) => {
        setIsActionLoading(true);
        try {
            const res = await axios.get(`/users/${id}`);
            setSelectedUser(res.data?.data || res.data); // Adjust based on your API structure
        } catch (err) {
            alert("Could not fetch user details");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsActionLoading(true);
        const formData = { name: e.target.name.value, email: e.target.email.value };

        try {
            await axios.post(`/users/${selectedUser.id}`, formData);
            setSelectedUser(null);
        } catch (err) { alert("Update failed"); }
        finally { setIsActionLoading(false); }
    };

    // --- DELETE LOGIC ---
    const confirmDelete = async () => {
        setIsActionLoading(true);
        try {
            await axios.delete(`/users/${userToDelete.id}`);
            setUserToDelete(null);
        } catch (err) { alert("Delete failed"); }
        finally { setIsActionLoading(false); }
    };
    const handleLogout = () => {
        // 1. Clear the token
        localStorage.removeItem("token");

        // 2. Redirect to login immediately
        navigate("/login");
    };
    return (
        <div className="p-6 bg-gray-50 min-h-screen relative">
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={handleLogout}
                    className="flex items-end gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </div>

            <div className="max-w-6xl mx-auto">

                <h2 className="text-2xl font-bold text-gray-800 mb-8">User Management</h2>


                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{u.name}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => openEditModal(u.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"><FiEdit2 size={18} /></button>
                                        <button onClick={() => setUserToDelete(u)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FiTrash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- EDIT MODAL --- */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Edit User</h3>
                            <button onClick={() => setSelectedUser(null)}><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input name="name" defaultValue={selectedUser.name} className="w-full p-3 border rounded-lg" placeholder="Name" required />
                            <input name="email" defaultValue={selectedUser.email} disabled className="w-full p-3 border rounded-lg" placeholder="Email" required />
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                                <button type="submit" disabled={isActionLoading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg">
                                    {isActionLoading ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {userToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <FiAlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Confirm Delete</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Are you sure you want to remove <b>{userToDelete.name}</b>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setUserToDelete(null)} className="flex-1 py-2 bg-gray-100 rounded-lg font-medium">Cancel</button>
                            <button
                                onClick={confirmDelete}
                                disabled={isActionLoading}
                                className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                            >
                                {isActionLoading ? "Deleting..." : "Delete User"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}