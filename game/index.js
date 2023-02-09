/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
AppRegistry.registerComponent(appName, () => App);
