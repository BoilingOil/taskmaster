/**
 * Taskmaster
 * https://github.com/boilingoil/taskmaster
 *
 * @format
 */

import React /*, {useState} */ from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GlobalProvider} from './context/GlobalState';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TaskList /*, AddTask, EditTask */} from './components';

function App(): React.JSX.Element {
  // const [currentView, setCurrentView] = useState('taskList');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // const handleScreens = () => {
  //   switch (currentView) {
  //     case 'taskList':
  //       return <TaskList navigation={{setCurrentView}} />;
  //     case 'addTask':
  //       return <AddTask navigation={{setCurrentView}} />;
  //     case 'editTasks':
  //       return <EditTask navigation={{setCurrentView}} />;
  //   }
  // };

  return (
    <GlobalProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {/* {handleScreens()} */}
        <TaskList />
      </SafeAreaView>
    </GlobalProvider>
  );
}

export default App;
