import React, { useState, useEffect } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const fetchTasks = async () => {
        try {
            const response = await axios.get(
                'https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks'
            );
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            addToast('Failed to fetch tasks. Please try again.', { type: 'error' });
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
            addToast('Task created successfully!');
        } catch (error) {
            console.error('Error creating task:', error);
            addToast('Failed to create task', { type: 'error' });
        }
    };

    const logout = async () => {
        addToast('Logout successfully!');
        navigate('/login')
    };

    return (
        <div className="p-4">
            <div className='flex justify-between items-center pr-4 mb-4'>
                <div className='flex'>
                    <h1 className="text-2xl font-bold mr-5">Hello {user.name}, Here's your tasks</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                    >
                        Add Task
                    </button>
                </div>
                <div>
                    <div onClick={() => logout()} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TaskForm onSubmit={handleTaskSubmit} onClose={() => setIsModalOpen(false)} />
            </Modal>

            <KanbanBoard tasks={tasks} onRefresh={fetchTasks} />
        </div>
    );
};

export default Dashboard;