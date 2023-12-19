import React, {useContext, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import {TaskProps /*, TaskListProps */} from '../../context/AppReducer';
import {GlobalContext} from '../../context/GlobalState';
import Task from '../Task';

export default function TaskList(/*{
  title,
  navigation,
}: Readonly<TaskListProps>*/): React.JSX.Element {
  const {tasks, addTask, editTask, removeTask} = useContext(GlobalContext);
  const [selectedTask, setSelectedTask] = useState<TaskProps>();

  const isDarkMode = useColorScheme() === 'dark';

  const handleAddTask = () => {
    const newTask: TaskProps = {
      id: tasks.length + 1,
      title: 'New Task',
      status: 'notStarted',
    };
    addTask(newTask);
  };

  const handleRemoveTask = (id: number) => {
    removeTask(id);
  };

  // // handle marking the tag as complete
  // const handleStatusChange = (
  //   id: number,
  //   status: 'complete' | 'notStarted',
  // ) => {
  //   const currentTask = tasks.find(t => {
  //     return t.id === id;
  //   });
  //   const updatedTask = {
  //     ...currentTask,
  //     status,
  //   };
  //   console.log(updatedTask);
  //   editTask(updatedTask as TaskProps);
  // };

  // // handle editing the title of the task
  // const handleTitleChange = (id: number, title: string) => {
  //   const currentTask = tasks.find(t => {
  //     return t.id === id;
  //   });
  //   const updatedTask = {
  //     ...currentTask,
  //     title,
  //   };
  //   editTask(updatedTask as TaskProps);
  // };

  const handleSelectionChange = (id: number) => {
    const selection = tasks.find(t => {
      return t.id === id;
    });
    // console.log('SELECTION:', selection);
    setSelectedTask(selection);
  };

  // handle saving the edited task
  const handleEditTask = (updatedTask: TaskProps) => {
    editTask(updatedTask);
  };

  return (
    <View style={styles.sectionContainer}>
      {tasks.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <View style={styles.listHeaderContainer}>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: isDarkMode ? Colors.white : Colors.black,
                  },
                ]}>
                Tasks
              </Text>
              <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.addTaskButton} />
              </TouchableOpacity>
            </View>
          }
          data={tasks}
          renderItem={({item}: {item: TaskProps}) => (
            <Task
              selected={selectedTask?.id}
              id={item.id}
              title={item.title}
              status={item.status}
              notes={item.notes}
              onSelection={handleSelectionChange}
              onEdit={handleEditTask}
              onRemove={handleRemoveTask}
            />
          )}
          extraData={selectedTask}
          keyExtractor={item => `${item.id}`}
        />
      ) : (
        <Text>NO TASKS</Text>
      )}
    </View>
  );
}
