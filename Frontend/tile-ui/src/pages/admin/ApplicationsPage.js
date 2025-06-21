import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ApplicationPage = () => {
  const [applications, setApplications] = useState([]);
  const [newApp, setNewApp] = useState("");

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://tile-management-backend.onrender.com/api/Application", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApplications(res.data);
  };

  const toggleBlock = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`https://tile-management-backend.onrender.com/api/Application/block/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Application status updated.");
      fetchApplications();
    } catch (err) {
      toast.error("Failed to update application.");
    }
  };

  const addApplication = async (e) => {
    e.preventDefault();
    if (!newApp.trim()) return toast.error("Application name is required.");
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://tile-management-backend.onrender.com/api/Application", {
        name: newApp
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Application added successfully!");
      setNewApp("");
      fetchApplications();
    } catch (err) {
      toast.error("Failed to add application.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Applications</h1>
      <form onSubmit={addApplication} className="mb-6 flex gap-4">
        <input type="text" value={newApp} onChange={(e) => setNewApp(e.target.value)} placeholder="New Application Name" className="border px-4 py-2 rounded w-64" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Application</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {applications.map(app => (
          <div key={app.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">{app.name}</span>
              <button onClick={() => toggleBlock(app.id)} className={`px-3 py-1 rounded text-white ${app.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}>
                {app.isBlocked ? 'Blocked' : 'Unblocked'}
              </button>
            </div>
            <p><strong>ID:</strong> {app.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPage;
