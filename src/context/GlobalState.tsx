import React, {createContext, useReducer} from 'react';

import appReducer, {TaskProps} from './AppReducer';

type InitialState = {
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  editTask: (task: TaskProps) => void;
  removeTask: (id: number) => void;
};

const initialState: InitialState = {
  tasks: [
    {
      id: 0,
      title: 'Welcome To Taskmaster!',
      status: 'notStarted',
      notes:
        'WELCOME! The controls are very simple. You can start a task and complete a task. Completed tasks can be deleted. Try it with this one. Have a great day!',
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
      status: 'inProgress',
    },
    {
      id: 4,
      title: 'Build Taskmaster UI',
      status: 'inProgress',
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
      status: 'inProgress',
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
  addTask: () => {},
  editTask: () => {},
  removeTask: () => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}: {children: any}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

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
        tasks: state.tasks,
        addTask,
        editTask,
        removeTask,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
