import React, {useContext} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styles from './styles';
import {TaskProps, TaskListProps} from '../../context/AppReducer';
import {GlobalContext} from '../../context/GlobalState';
import Task from '../Task';

export default function TaskList({
  title,
}: Readonly<TaskListProps>): React.JSX.Element {
  const {tasks} = useContext(GlobalContext);

  const isDarkMode = useColorScheme() === 'dark';

  const handleAddTask = () => {
    console.log('TODO: goTo ADD TASK screen!!');
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
                {title}
              </Text>
              <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.addTaskButton} />
              </TouchableOpacity>
            </View>
          }
          data={tasks}
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
