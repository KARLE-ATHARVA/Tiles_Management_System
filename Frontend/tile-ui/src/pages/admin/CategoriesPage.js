import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5058/api/Category", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(res.data);
  };

  const toggleBlock = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`http://localhost:5058/api/Category/block/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Category status updated.");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to update category.");
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return toast.error("Category name is required.");
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5058/api/Category", {
        name: newCategory
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Category added successfully!");
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to add category.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Categories</h1>
      <form onSubmit={addCategory} className="mb-6 flex gap-4">
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New Category Name" className="border px-4 py-2 rounded w-64" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Category</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white rounded shadow p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="font-bold text-lg">{cat.name}</span>
              <button onClick={() => toggleBlock(cat.id)} className={`px-3 py-1 rounded text-white ${cat.isBlocked ? 'bg-red-500' : 'bg-green-500'}`}>
                {cat.isBlocked ? 'Blocked' : 'Unblocked'}
              </button>
            </div>
            <p><strong>ID:</strong> {cat.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
