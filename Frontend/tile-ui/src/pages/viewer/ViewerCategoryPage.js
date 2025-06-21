import { useEffect, useState } from "react";
import axios from "axios";

const ViewerCategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchUnblockedCategories = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5058/api/Category", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(res.data.filter(cat => !cat.isBlocked));
  };

  useEffect(() => {
    fetchUnblockedCategories();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Categories</h2>
      <ul className="space-y-3">
        {categories.map(cat => (
          <li key={cat.id} className="bg-white p-4 rounded shadow">
            <strong>{cat.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewerCategoryPage;
