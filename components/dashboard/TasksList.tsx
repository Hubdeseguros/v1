import React from 'react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Llamar a cliente para renovación',
    dueDate: '2025-05-26',
    priority: 'high',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Enviar cotización a María García',
    dueDate: '2025-05-25',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Actualizar datos de póliza #5423',
    dueDate: '2025-05-27',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Revisar estado de siniestro #789',
    dueDate: '2025-05-28',
    priority: 'low',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Preparar informe mensual',
    dueDate: '2025-05-30',
    priority: 'high',
    status: 'pending'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const TasksList = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Tareas Pendientes</h3>
          <a href="#" className="text-sm text-primary hover:text-secondary">
            Ver todas
          </a>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id={`task-${task.id}`}
                  name={`task-${task.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor={`task-${task.id}`} className="ml-3 block text-sm font-medium text-gray-900">
                  {task.title}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status === 'pending' ? 'Pendiente' : task.status === 'in-progress' ? 'En progreso' : 'Completada'}
                </span>
                <span className="text-xs text-gray-500">{formatDate(task.dueDate)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 flex justify-center">
        <button className="text-sm text-white bg-primary hover:bg-secondary px-4 py-2 rounded-md transition-colors">
          Agregar nueva tarea
        </button>
      </div>
    </div>
  );
};

export default TasksList;
