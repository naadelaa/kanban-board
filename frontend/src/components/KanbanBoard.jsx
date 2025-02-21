import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const SortableItem = ({ task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 mb-2 rounded shadow cursor-move"
        >
            <Link to={`/tasks/${task.id}`} className="block">
                <h3 className="text-xl font-semibold mb-2 hover:underline cursor-pointer">{task.name}</h3>
            </Link>
            <div className="text-md text-gray-500 mb-8">
                {task.description}
            </div>
            <div className="text-sm font-medium text-blue-800">
                {task.teams}
            </div>
        </div>
    );
};

const KanbanBoard = ({ tasks = [], onRefresh }) => {
    const addToast = useToast();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const columns = {
        'TO DO': tasks.filter(t => t.status === 'TO DO'),
        'DOING': tasks.filter(t => t.status === 'DOING'),
        'DONE': tasks.filter(t => t.status === 'DONE'),
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sourceColumn = Object.keys(columns).find(key =>
            columns[key].some(t => t.id === active.id)
        );

        const destinationColumn = Object.keys(columns).find(key =>
            columns[key].some(t => t.id === over.id)
        ) || sourceColumn;

        try {
            await axios.patch(
                `https://67b49c7ca9acbdb38ecfb382.mockapi.io/api/v1/tasks/${active.id}`,
                {
                    status: destinationColumn,
                    updatedAt: new Date().toISOString(),
                }
            );

            if (onRefresh) onRefresh();

            addToast('Task moved successfully!');
        } catch (error) {
            addToast('Failed to move task', { type: 'error' });
            if (onRefresh) onRefresh();
        }
    };

    return (
        <div className="flex gap-4 p-4 min-h-screen">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {Object.entries(columns).map(([columnId, columnTasks]) => (
                    <div key={columnId} className="flex-1 bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-sm font-bold mb-4">{columnId}</h2>
                        <SortableContext
                            items={columnTasks.map(t => t.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {columnTasks.map(task => (
                                    <SortableItem key={task.id} task={task} />
                                ))}
                            </div>
                        </SortableContext>
                    </div>
                ))}
            </DndContext>
        </div>
    );
};

export default KanbanBoard;