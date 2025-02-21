import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

function TaskForm({ task, onSubmit, onClose }) {
    const [name, setName] = useState(task?.name || '');
    const [description, setDescription] = useState(task?.description || '');
    const [teams, setTeams] = useState(task?.teams || []);
    const [status, setStatus] = useState(task?.status || 'TO DO');
    const { addToast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return addToast('Name required', { type: 'error' });
        if (!description) return addToast('Description required', { type: 'error' });
        if (!teams) return addToast('Cathegory required', { type: 'error' });
        if (!status) return addToast('Status required', { type: 'error' });
        onSubmit({ name, description, teams, status });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Task Name"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Task Description"
            />
            <div className="space-y-2">
                {['Design', 'Backend', 'Frontend'].map((team) => (
                    <label key={team} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            value={team}
                            checked={teams.includes(team)}
                            onChange={(e) => {
                                setTeams(e.target.value);
                            }}
                            className="form-radio text-blue-500 focus:ring-blue-500"
                        />
                        <span>{team}</span>
                    </label>
                ))}
            </div>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            >
                {['TO DO', 'DOING', 'DONE'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer">
                Save
            </button>
        </form>
    );
}

export default TaskForm;