import React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import TaskNotes from '../TaskNotes';
import {TaskProps} from '../../context/AppReducer';

export default function Task({
  id,
  title,
  status,
  notes,
}: Readonly<TaskProps>): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <View
        style={[
          styles.checkbox,
          status === 'complete' ? {backgroundColor: Colors.black} : null,
        ]}
      />
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {notes ? <TaskNotes taskId={id} notes={notes} /> : <Text>Add Notes</Text>}
    </View>
  );
}
