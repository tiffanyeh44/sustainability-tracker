import { useState, useEffect } from 'react';
import { getActions, deleteAction, updateAction } from '../services/api';

const ActionTable = () => {
  const [actions, setActions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch list once on mount
  const fetchActions = async () => {
    try {
      const res = await getActions();
      setActions(res.data);
    } catch (err) {
      console.error('Error fetching actions:', err);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAction(id);
      fetchActions();
    } catch (err) {
      console.error('Error deleting action:', err);
    }
  };

  const startEdit = (action) => {
    setEditingId(action.id);
    setEditData({ ...action });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      await updateAction(editingId, {
        ...editData,
        points: parseInt(editData.points),
      });
      setEditingId(null);
      fetchActions();
    } catch (err) {
      console.error('Error updating action:', err);
    }
  };

  return (
    <table className="w-full border-collapse border text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Action</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Points</th>
          <th className="border px-4 py-2">Manage</th>
        </tr>
      </thead>
      <tbody>
        {actions.map((action) => (
          <tr key={action.id}>
            <td className="border px-4 py-2">{action.id}</td>
            {editingId === action.id ? (
              <>
                <td className="border px-4 py-2">
                  <input
                    name="action"
                    value={editData.action}
                    onChange={handleEditChange}
                    className="border rounded p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    name="date"
                    type="date"
                    value={editData.date}
                    onChange={handleEditChange}
                    className="border rounded p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    name="points"
                    type="number"
                    value={editData.points}
                    onChange={handleEditChange}
                    className="border rounded p-1"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button onClick={handleEditSave} className="text-green-600 font-bold mr-2">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-gray-500">
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="border px-4 py-2">{action.action}</td>
                <td className="border px-4 py-2">{action.date}</td>
                <td className="border px-4 py-2">{action.points}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => startEdit(action)} className="text-blue-600 font-bold mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(action.id)} className="text-red-600 font-bold">
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActionTable;
