export type TaskProps = {
  id: number;
  title: string;
  status: 'complete' | 'notStarted' | 'inProgress';
  notes?: string;
};

export type TaskActions = 'ADD_TASK' | 'EDIT_TASK' | 'REMOVE_TASK';

export default function appReducer(
  state: {tasks: TaskProps[]},
  action: {type: TaskActions; payload: any},
) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'EDIT_TASK':
      const updatedTask = action.payload;

      const updatedTasks = state.tasks.map((task: {id: any}) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    default:
      return state;
  }
}