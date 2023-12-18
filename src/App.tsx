/**
 * Taskmaster
 * https://github.com/boilingoil/taskmaster
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GlobalProvider} from './context/GlobalState';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TaskList} from './components';

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

export default App;
