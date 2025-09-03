import AddActionForm from './components/AddActionForm';
import ActionTable from './components/ActionTable';
import React, { useState } from 'react'; 

//refreshKey state used to reload table data
function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshActions = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-700">Sustainability Tracker</h1>
      <AddActionForm onActionAdded={refreshActions} />
      <ActionTable key={refreshKey} />
    </div>
  );
}

export default App;