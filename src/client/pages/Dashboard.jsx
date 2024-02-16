import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUser from '@wasp/queries/getUser';
import getTasks from '@wasp/queries/getTasks';
import createTask from '@wasp/actions/createTask';
import updateTask from '@wasp/actions/updateTask';

export function Dashboard() {
  const { data: user, isLoading: userLoading, error: userError } = useQuery(getUser);
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useQuery(getTasks);
  const createUserTask = useAction(createTask);
  const updateUserTask = useAction(updateTask);

  if (userLoading || tasksLoading) return 'Loading...';
  if (userError || tasksError) return 'Error: ' + (userError || tasksError);

  const handleCreateTask = async (description) => {
    await createUserTask({ description });
  };

  const handleUpdateTask = async (taskId, updatedFields) => {
    await updateUserTask({ taskId, updatedFields });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}!</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Your Tasks:</h2>
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg">
            <div>{task.description}</div>
            <div>
              <button
                onClick={() => handleUpdateTask(task.id, { isDone: !task.isDone })}
                className={`bg-${task.isDone ? 'green' : 'gray'}-500 hover:bg-${task.isDone ? 'green' : 'gray'}-700 text-white font-bold py-2 px-4 rounded mr-2`}
              >
                {task.isDone ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => handleUpdateTask(task.id, { description: prompt('Enter a new description for the task:') })}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Create a New Task:</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateTask(e.target.elements.description.value);
            e.target.reset();
          }}
        >
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            className="border rounded px-2 py-1 mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}