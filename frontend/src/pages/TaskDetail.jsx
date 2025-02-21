import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(
                    `https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks/${taskId}`
                );
                setTask(response.data);
            } catch (error) {
                setError('Failed to fetch task details');
                console.error('Error fetching task:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [taskId]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!task) return <div>Task not found</div>;

    const handleEdit = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks/${taskId}`,
                task
            );

            if (response.status === 200) {
                console.log("Task updated successfully");
            }
        } catch (error) {
            console.error("Failed to update task:", error);
        } finally {
            setLoading(false);
            setShowEditModal(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks/${taskId}`
            );
            alert('Task deleted successfully');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto mb-2">
                <h1 className="text-2xl font-bold text-gray-800 mb-5">Task Detail</h1>
                <p className="text-sm text-gray-500 mt-1">
                    <Link to="/" className="text-blue-500 hover:underline">Dashboard</Link> &gt; {task.name}
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
                <div className='grid grid-cols-2 gap-4'>
                    <div className="flex flex-col items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-800">
                            {task.name}
                        </h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            {task.description}
                        </p>
                    </div>

                    <div className="text-xs text-gray-400 mb-4 flex flex-col">
                        <span className="text-sm text-gray-400">Info</span>
                        <div>
                            Created At: {new Date(task.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <div className="font-medium text-blue-800 py-2 rounded">
                        {task.teams}
                    </div>
                    <span className="text-sm text-gray-600">Status: {task.status}</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto flex justify-end space-x-2 mt-4">
                <button onClick={() => setShowEditModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
                    Edit task
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
                    Delete
                </button>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

                        <label className="block mb-2 text-sm font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={task.name}
                            onChange={(e) => setTask({ ...task, name: e.target.value })}
                        />

                        <label className="block mb-2 text-sm font-medium">Description</label>
                        <textarea
                            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            value={task.description}
                            onChange={(e) =>
                                setTask({ ...task, description: e.target.value })
                            }
                        />

                        <label className="block mb-2 text-sm font-medium">Status</label>
                        <select
                            className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={task.status}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}
                        >
                            <option value="TO DO">TO DO</option>
                            <option value="DOING">DOING</option>
                            <option value="DONE">DONE</option>
                        </select>

                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                                onClick={() => setShowEditModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                onClick={handleEdit}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p className="mb-6">Are you sure you want to delete this task?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetail;