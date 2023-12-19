import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import {TaskProps, TaskListProps} from '../../context/AppReducer';
import useTasks from '../../hooks/useTasks';
import Task from '../Task';

export default function TaskList({
  navigation,
}: Readonly<TaskListProps>): React.JSX.Element {
  const {
    activityState,
    tasks,
    selectedTask,
    addTask,
    fetchTasks,
    fetchTask,
    editTask,
    removeTask,
  } = useTasks();

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    console.log('SELECTED:', selectedTask);
    if (selectedTask) {
      navigation.navigate('Details', {
        selectedTask,
      });
    }
  }, [selectedTask, navigation]);

  const handleRefresh = () => {
    fetchTasks();
  };

  const handleAdd = () => {
    try {
      const newTask: TaskProps = {
        id: tasks.length + 1,
        title: 'New Task',
        status: 'notStarted',
        description: 'Add a description',
        deadline: 'tomorrow',
      };
      addTask();
    } catch (e) {
      console.log(e);
    }
  };

  // handle saving the edited task
  const handleUpdate = (updatedTask: TaskProps) => {
    editTask(updatedTask);
  };

  const handleRemove = (id: number) => {
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
  //   edit(updatedTask as TaskProps);
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
  //   edit(updatedTask as TaskProps);
  // };

  const handleSelect = (id: number) => {
    fetchTask(id);
  };

  if (activityState === 'loading') {
    return (
      <View style={styles.sectionContainer}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
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
              <TouchableOpacity onPress={handleAdd}>
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Task</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          data={tasks}
          renderItem={({item}: {item: TaskProps}) => (
            <Task
              id={item.id}
              title={item.title}
              status={item.status}
              description={item.description}
              onSelection={handleSelect}
              onEdit={handleUpdate}
              onRemove={handleRemove}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      ) : (
        <Text>NO TASKS</Text>
      )}
    </SafeAreaView>
  );
}
