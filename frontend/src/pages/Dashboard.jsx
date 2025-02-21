import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import axios from 'axios';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                'https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks'
            );
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('Failed to fetch tasks. Please try again.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskSubmit = async (taskData) => {
        console.log('Task Submitted:', taskData);
        try {
            await axios.post(
                'https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks',
                { ...taskData, createdAt: new Date().toISOString() }
            );
            await fetchTasks();
            setIsModalOpen(false);
            alert('Task created successfully!');
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task');
        }
    };

    return (
        <div className="p-4">
            <div className='flex justify-between items-center pr-4 mb-4'>
                <h1 className="text-2xl font-bold">Hello {user.name}, Here's your tasks</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                    Add Task
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TaskForm onSubmit={handleTaskSubmit} onClose={() => setIsModalOpen(false)} />
            </Modal>

            <KanbanBoard tasks={tasks} onRefresh={fetchTasks} />
        </div>
    );
};

export default Dashboard;