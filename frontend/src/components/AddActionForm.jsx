import { useState } from 'react';
import { addAction } from '../services/api';

const AddActionForm = ({ onActionAdded }) => {
  const [formData, setFormData] = useState({
    action: '',
    date: '',
    points: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAction({
        action: formData.action,
        date: formData.date,
        points: parseInt(formData.points),
      });
      setFormData({ action: '', date: '', points: '' });
      onActionAdded(); 
    } catch (error) {
      console.error('Error adding action:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block font-semibold">Action</label>
        <input
          type="text"
          name="action"
          value={formData.action}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Points</label>
        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Action
      </button>
    </form>
  );
};

export default AddActionForm;
