import React from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';

type TaskNotesProps = {
  taskId: number;
  notes: string;
};

export default function TaskNotes({
  taskId,
  notes,
}: Readonly<TaskNotesProps>): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return notes ? (
    <View key={taskId} style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        Notes:
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {notes}
      </Text>
    </View>
  ) : (
    <Text>Add Notes</Text>
  );
}
