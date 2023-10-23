
import React, { useState } from 'react';

function TaskForm() {
  const [task, setTask] = useState('');

  const handleTaskChange = (e) => {
      setTask(e.target.value);
     
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
  fetch("http://localhost/backend/db/createTask.php", {
    method: 'POST',
    body: JSON.stringify({ task }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        // Håndter succes, f.eks., opdater dit opgaveliste i frontend
        console.log(data.message);
      }
    });
};

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleTaskSubmit}>
        <input type="text" value={task} onChange={handleTaskChange} />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
