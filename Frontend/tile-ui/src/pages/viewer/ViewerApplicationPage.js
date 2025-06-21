import { useEffect, useState } from "react";
import axios from "axios";

const ViewerApplicationPage = () => {
  const [applications, setApplications] = useState([]);

  const fetchUnblockedApplications = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5058/api/Application", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApplications(res.data.filter(app => !app.isBlocked));
  };

  useEffect(() => {
    fetchUnblockedApplications();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Applications</h2>
      <ul className="space-y-3">
        {applications.map(app => (
          <li key={app.id} className="bg-white p-4 rounded shadow">
            <strong>{app.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewerApplicationPage;
