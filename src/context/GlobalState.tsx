import React, {createContext, useReducer} from 'react';

import appReducer, {TaskProps} from './AppReducer';

type InitialState = {
  selectedTask: TaskProps;
  tasks: TaskProps[];
  select: (task: TaskProps) => void;
  add: (task: TaskProps) => void;
  edit: (task: TaskProps) => void;
  remove: (id: number) => void;
};

const initialState: InitialState = {
  selectedTask: {
    id: 0,
    title: 'Welcome To Taskmaster!',
    status: 'notStarted',
    description:
      'WELCOME! The controls are very simple. You can start a task and complete a task. Completed tasks can be deleted. Try it with this one. Have a great day!',
    deadline: 'today',
  },
  tasks: [
    {
      id: 0,
      title: 'Welcome To Taskmaster!',
      status: 'notStarted',
      description:
        'WELCOME! The controls are very simple. You can start a task and complete a task. Completed tasks can be deleted. Try it with this one. Have a great day!',
      deadline: 'today',
    },
    {
      id: 1,
      title: 'Design Taskmaster Frontend Environment',
      status: 'complete',
    },
    {
      id: 2,
      title: 'Setup React Native Project',
      status: 'complete',
    },
    {
      id: 3,
      title: 'Build Taskmaster UI',
      status: 'notStarted',
    },
    {
      id: 4,
      title: 'Build Taskmaster UI',
      status: 'notStarted',
    },
    {
      id: 5,
      title: 'Setup Taskmaster Backend Environment',
      status: 'notStarted',
    },
    {
      id: 6,
      title: 'Design TaskmasterAPI',
      status: 'notStarted',
    },
    {
      id: 7,
      title: 'Build TaskmasterAPI',
      status: 'notStarted',
    },
    {
      id: 8,
      title: 'Implement TaskmasterAPI into Taskmaster',
      status: 'notStarted',
    },
    {
      id: 9,
      title: 'Complete Taskmaster',
      status: 'notStarted',
    },
    {
      id: 10,
      title: 'Showcase Taskmaster',
      status: 'notStarted',
    },
  ],
  select: () => {},
  add: () => {},
  edit: () => {},
  remove: () => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}: {children: any}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function selectTask(task: TaskProps) {
    dispatch({
      type: 'SELECT_TASK',
      payload: task,
    });
  }

  function addTask(task: TaskProps) {
    dispatch({
      type: 'ADD_TASK',
      payload: task,
    });
  }

  function editTask(task: TaskProps) {
    dispatch({
      type: 'EDIT_TASK',
      payload: task,
    });
  }

  function removeTask(id: number) {
    dispatch({
      type: 'REMOVE_TASK',
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        selectedTask: initialState.tasks[0],
        tasks: state.tasks,
        select: selectTask,
        add: addTask,
        edit: editTask,
        remove: removeTask,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
