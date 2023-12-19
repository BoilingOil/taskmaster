import React, {useState, useContext, useEffect} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {GlobalContext} from '../../context/GlobalState';
import {TaskProps} from '../../context/AppReducer';
import styles from './styles';

export default function EditTask() {
  const {tasks, editTask} = useContext(GlobalContext);
  const [title, setTitle] = useState<string>();
  const [task, setSelectedTask] = useState<TaskProps>();

  const currentTaskId = 0;

  useEffect(() => {
    const taskId = currentTaskId;
    const selectedTask = tasks.find(t => {
      return t.id === taskId;
    });
    setSelectedTask(selectedTask);
  }, [currentTaskId, tasks]);

  const handleSubmit = () => {
    if (title) {
      const newTask: TaskProps = {
        id: currentTaskId,
        title,
        status: 'notStarted',
      };
      editTask(newTask);
    }
  };

  return (
    <SafeAreaView>
      {task ? (
        <View style={styles.sectionContainer}>
          <Text>Edit Task</Text>
          <Text>Title:</Text>
          <TextInput
            // placeholder={task.title}
            value={task.title}
            onChangeText={text => setTitle(text)}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Create Tast</Text>
          </TouchableOpacity>
          <Text>TODO: add cancel button</Text>
        </View>
      ) : (
        <View>
          <Text>OOPS</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
