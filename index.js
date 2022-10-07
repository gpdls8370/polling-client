/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import EX2 from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => EX2);
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
