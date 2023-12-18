/**
 * Taskmaster
 * https://github.com/boilingoil/taskmaster
 *
 * @format
 */

import React, {useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {TaskProps} from './context/AppReducer';
import {GlobalProvider, GlobalContext} from './context/GlobalState';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type TaskNotesProps = {
  taskId: number;
  notes: string;
};

function TaskNotes({
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

function Task({
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
        {title} (title)
      </Text>
      {notes ? <TaskNotes taskId={id} notes={notes} /> : <Text>Add Notes</Text>}
    </View>
  );
}

type TaskListProps = {
  title: string;
};

const taskListData: TaskProps[] = [
  {
    id: 1,
    title: 'Design Taskmaster Frontend Environment',
    status: 'complete',
    notes: '',
  },
  {
    id: 2,
    title: 'Setup React Native Project',
    status: 'complete',
    notes: '',
  },
  {
    id: 3,
    title: 'Build Taskmaster UI',
    status: 'inProgress',
    notes: '',
  },
  {
    id: 4,
    title: 'Build Taskmaster UI',
    status: 'inProgress',
    notes: '',
  },
  {
    id: 5,
    title: 'Setup Taskmaster Backend Environment',
    status: 'notStarted',
    notes: '',
  },
  {
    id: 6,
    title: 'Design TaskmasterAPI',
    status: 'notStarted',
    notes: '',
  },
  {
    id: 7,
    title: 'Build TaskmasterAPI',
    status: 'inProgress',
    notes: '',
  },
  {
    id: 8,
    title: 'Implement TaskmasterAPI into Taskmaster',
    status: 'notStarted',
    notes: '',
  },
  {
    id: 9,
    title: 'Complete Taskmaster',
    status: 'notStarted',
    notes: '',
  },
  {
    id: 10,
    title: 'Showcase Taskmaster',
    status: 'notStarted',
    notes: '',
  },
];

function TaskList({title}: Readonly<TaskListProps>): React.JSX.Element {
  const {tasks} = useContext(GlobalContext);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      {tasks.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              {title}
            </Text>
          }
          data={taskListData}
          renderItem={({item}: {item: TaskProps}) => (
            <Task
              id={item.id}
              title={item.title}
              status={item.status}
              notes={item.notes}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      ) : (
        <Text>NO TASKS</Text>
      )}
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GlobalProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <TaskList title="Tasks" />
      </SafeAreaView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  checkbox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
});

export default App;
