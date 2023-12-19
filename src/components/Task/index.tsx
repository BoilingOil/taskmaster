import React, {useEffect, useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import {TaskProps} from '../../context/AppReducer';

export default function Task({
  selected,
  id,
  title,
  status,
  onSelection,
  onEdit,
  onRemove,
}: Readonly<TaskProps>): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedStyle, setSelectedStyle] = useState({borderColor: 'white'});
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(title);
  const [updatedDeadline, setUpdatedDeadline] = useState(title);

  const handleDetails = () => {
    if (`${id}` && onSelection) {
      onSelection(id);
    }
  };

  const handleRemove = () => {
    Alert.alert(
      'Are you sure?',
      'This will delete the selected task. There is no undoing this.',
      [
        {
          text: 'Do it!',
          onPress: () => {
            console.log('OK Pressed');
            if (onRemove) {
              onRemove(id);
            }
          },
        },
        {
          text: 'Wait...',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const handleCompletion = () => {
    const updatedTask: TaskProps = {
      id,
      title,
      status,
    };
    if (onEdit) {
      if (status === 'notStarted') {
        updatedTask.status = 'complete';
        onEdit(updatedTask);
      } else if (status === 'complete') {
        updatedTask.status = 'notStarted';
        onEdit(updatedTask);
      }
    }
  };

  useEffect(() => {
    setSelectedStyle({borderColor: selected === id ? 'black' : 'transparent'});
  }, [id, selected]);

  return (
    <View style={[styles.sectionContainer, selectedStyle]}>
      <View style={styles.row}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleCompletion}>
            <View
              style={[
                styles.checkbox,
                status === 'complete' ? {backgroundColor: Colors.black} : null,
              ]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleRemove}>
          <View>
            <Text>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleDetails}>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
