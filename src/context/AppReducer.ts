export type TaskProps = {
  selected?: number | undefined;
  id: number;
  title: string;
  status: 'complete' | 'notStarted';
  description?: string;
  deadline?: string;
  onSelection?: (id: number) => void;
  onEdit?: (task: TaskProps) => void;
  onRemove?: (id: number) => void;
};

export type TaskDetailsProps = {
  navigation: {setVisible: React.Dispatch<React.SetStateAction<boolean>>};
};

export type TaskListProps = {
  navigation: {setVisible: React.Dispatch<React.SetStateAction<boolean>>};
};

export type TaskActions =
  | 'SELECT_TASK'
  | 'ADD_TASK'
  | 'EDIT_TASK'
  | 'REMOVE_TASK';

export default function appReducer(
  state: {tasks: TaskProps[]; selectedTask: TaskProps},
  action: {type: TaskActions; payload: any},
) {
  switch (action.type) {
    case 'SELECT_TASK':
      console.log('PAYLOAD', action.payload);
      return {
        ...state,
        selectedTask: action.payload,
      };

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
