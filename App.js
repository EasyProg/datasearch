import React from 'react';
import { StyleSheet, Text, View, TextInput, Slider , Button, TouchableOpacity } from 'react-native';
import {StackNavigator} from 'react-navigation';
import SearchScreen from './components/SearchScreen';
import ResultScreen from './components/ResultScreen';


const App = StackNavigator({
    Home:  { screen: SearchScreen },
    Result:{ screen: ResultScreen }

});
export default App;



