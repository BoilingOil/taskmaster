/**
 * Taskmaster
 * by Jason Walker
 * https://github.com/boilingoil/taskmaster
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TaskList, TaskDetails} from './components';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tasks">
        <Stack.Screen
          name="Tasks"
          component={TaskList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={TaskDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
