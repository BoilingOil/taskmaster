import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useTasks from '../../hooks/useTasks';
import {TaskProps} from '../../context/AppReducer';
import styles from './styles';

export default function TaskDetails({navigation, route}) {
  const {activityState, tasks, addTask, fetchTask, removeTask} = useTasks();
  const {selectedTask} = route.params;
  const [updatedTitle, setTitle] = useState<string>();
  const [updatedDescription, setDescription] = useState<string>();
  const [updatedDeadline, setDeadline] = useState<string>();

  useEffect(() => {
    console.log('incoming params:', route.params.selectedTask);
  }, [route.params]);

  const handleSubmit = () => {
    if (updatedTitle && selectedTask) {
      const newTask: TaskProps = {
        id: selectedTask.id,
        title: updatedTitle,
        status: 'notStarted',
      };
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      {selectedTask ? (
        <View style={styles.sectionContainer}>
          <Text>Edit Task</Text>
          <View>
            <Text>Title:</Text>
            <TextInput
              value={selectedTask.title}
              onChangeText={text => setTitle(text)}
            />
          </View>
          <View>
            <Text>Deadline:</Text>
            <TextInput
              value={selectedTask.deadline}
              onChangeText={text => setDeadline(text)}
            />
          </View>
          <View>
            <Text>Description:</Text>
            <TextInput
              value={selectedTask.description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={handleSubmit}>
              <View
                style={{
                  width: 150,
                  borderRadius: 4,
                  backgroundColor: 'lightblue',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text>Update Task</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <View
                style={{
                  width: 150,
                  borderRadius: 4,
                  backgroundColor: 'red',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={handleCancel}>
            <Text>OOPS</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
