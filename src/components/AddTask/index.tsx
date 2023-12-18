import React, {useState, useContext} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import {GlobalContext} from '../../context/GlobalState';
import {TaskProps} from '../../context/AppReducer';

export function AddTask() {
  const {tasks, addTask} = useContext(GlobalContext);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    const newTask: TaskProps = {
      id: tasks.length + 1,
      title,
      status: 'notStarted',
    };
    addTask(newTask);
  };

  return (
    <View>
      <Text>Add Task:</Text>
      <TextInput
        placeholder="Add Title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Create Task</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
