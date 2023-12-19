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
// import TaskNotes from '../TaskNotes';
import {TaskProps} from '../../context/AppReducer';

export default function Task({
  selected,
  id,
  title,
  status,
  notes,
  onSelection,
  onEdit,
  onRemove,
}: Readonly<TaskProps>): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedStyle, setSelectedStyle] = useState({borderColor: 'white'});
  const [updatedTitle, setUpdatedTitle] = useState(title);
  // const [updatedNotes, setUpdatedNotes] = useState(notes);

  const handleSelection = () => {
    if (onSelection && id !== selected) {
      onSelection(id);
    }
  };

  const handleTitle = (text: string) => {
    handleSelection();
    if (text) {
      setUpdatedTitle(text);
    }
  };

  const handleTitleBlur = () => {
    console.log('TODO: store title changes globally.', title, updatedTitle);
    const updatedTask: TaskProps = {
      id,
      title,
      status,
      notes,
    };
    if (onEdit) {
      if (title !== updatedTitle) {
        updatedTask.title = updatedTitle;
        onEdit(updatedTask);
      }
    }
  };

  // const handleNotes = (text: string) => {
  //   handleSelection();
  //   console.log('TODO: toggle the multiline input for the notes:', text);
  // };

  // const handleNotesBlur = () => {
  //   console.log('TODO: store notes changes globally.');
  // };

  const handleRemove = () => {
    handleSelection();
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

  const toggleCompletion = () => {
    handleSelection();
    const updatedTask: TaskProps = {
      id,
      title,
      status,
      notes,
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
    <TouchableOpacity onPress={handleSelection}>
      <View style={[styles.sectionContainer, selectedStyle]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={toggleCompletion}>
            <View
              style={[
                styles.checkbox,
                status === 'complete' ? {backgroundColor: Colors.black} : null,
              ]}
            />
          </TouchableOpacity>
          {selected === id ? (
            <TouchableOpacity onPress={handleRemove}>
              <View>
                <Text>X</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        {selected === id ? (
          <TextInput
            style={{
              ...styles.sectionDescription,
              borderWidth: 1,
              borderColor: 'gray',
            }}
            onChangeText={handleTitle}
            value={updatedTitle}
            onBlur={handleTitleBlur}
          />
        ) : (
          <TouchableOpacity onPress={handleSelection}>
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
        )}
        {/* {notes ? (
          <TouchableOpacity onPress={handleNotes}>
            <TaskNotes taskId={id} notes={notes} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNotes}>
            <View>
              <Text>Add Notes</Text>
            </View>
          </TouchableOpacity>
        )} */}
      </View>
    </TouchableOpacity>
  );
}
