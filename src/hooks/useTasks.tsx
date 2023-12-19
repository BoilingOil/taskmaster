import {useState, useEffect, useCallback} from 'react';
import {TaskProps} from '../context/AppReducer';

function useTasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [activityState, setActivityState] = useState<string>('loading');
  const [selectedTask, setSelectedTask] = useState<TaskProps>();

  useEffect(() => {
    console.log('selected task:', selectedTask);
  }, [selectedTask]);

  async function getTasks(url: string) {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        CacheControl: 'no-cache',
      },
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function getTask(url: string) {
    return await fetch(url, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        CacheControl: 'no-cache',
      },
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  async function postTask(url: string, task: TaskProps) {
    return await fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }
  async function putTask(url: string, task: TaskProps) {
    return await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }
  async function deleteTask(url: string) {
    return await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  const fetchTasks = useCallback(() => {
    getTasks('http://localhost:3000/tasks').then(
      (updatedTasks: TaskProps[]) => {
        if (updatedTasks.length > 0) {
          setTasks(updatedTasks);
        }
        setActivityState('idle');
      },
    );
  }, []);

  const fetchTask = useCallback((id: number) => {
    setActivityState('busy');
    getTask(`http://localhost:3000/tasks/${id}`).then((task: TaskProps) => {
      if (task) {
        console.log('GOT TASK', task);
        setSelectedTask(task);
      }
      setActivityState('idle');
    });
  }, []);

  const addTask = useCallback(() => {
    const newTask: TaskProps = {
      id: tasks.length + 1,
      title: 'New Task',
      status: 'notStarted',
      description: 'Add a description',
      deadline: 'tomorrow',
    };
    postTask('http://localhost:3000/tasks', newTask).then(() => {
      fetchTasks();
    });
  }, [fetchTasks, tasks.length]);

  const editTask = useCallback(
    (task: TaskProps) => {
      putTask(`http://localhost:3000/tasks/${task.id}`, task).then(() => {
        fetchTasks();
      });
    },
    [fetchTasks],
  );

  const removeTask = useCallback(
    (id: number) => {
      setActivityState('busy');
      deleteTask(`http://localhost:3000/tasks/${id}`).then(() => {
        fetchTasks();
        setActivityState('idle');
      });
    },
    [fetchTasks],
  );

  return {
    activityState,
    tasks,
    selectedTask,
    addTask,
    editTask,
    fetchTasks,
    fetchTask,
    removeTask,
  };
}

export default useTasks;
