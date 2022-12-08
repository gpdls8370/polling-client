import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import mainFeed from './mainFeed';
import testScene from './testScene';
import makePoll from './makePoll';
import {navigation_id, type_color, type_id, url} from '../components/Constants';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import balanceFeed from './balanceFeed';
import battleFeed from './battleFeed';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {RecoilRoot} from 'recoil';
import pollingResult from './pollingResult';
import login from './login';
import signUp from './signUp';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import personalInfo from './personalInfo';
import landing from './landing';
import comment from './comment';
import balanceResult from './balanceResult';
import profile from './profile';
import Menu from '../components/Menu';
import profileImageSelection from './profileImageSelection';
import battlePost from './battlePost';
import search from './search';
import myPolls from './myPolls';
import myVotedPolls from './myVotedPolls';
import messaging from '@react-native-firebase/messaging';
import {localNotificationService} from '../uitls/push.noti';
import {navigate, navigationRef} from '../uitls/RootNavigation';
import {showNetworkError} from '../components/ToastManager';
import likeTagSelect from './likeTagSelect';

const Drawer = createDrawerNavigator();
function feedDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: 250,
        },
      }}
      drawerContent={() => <Menu />}>
      <Drawer.Screen name="Feed" component={feedTabs} />
    </Drawer.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();
function feedTabs() {
  return (
    <Tab.Navigator
      initialRouteName={navigation_id.mainFeed}
      tabBarPosition={'bottom'}
      tabBarHideOnKeyboard={true}
      keyboardHidesTabBar={true}
      screenOptions={{
        swipeEnable: true,
        tabBarStyle: {backgroundColor: '#FAFAFA'},
        tabBarItemStyle: {
          flexDirection: 'row',
        },
        keyboardHidesTabBar: true,
        tabBarHideOnKeyboard: true,
        tabBarIndicatorStyle: {backgroundColor: 'gray', height: 3},
      }}>
      <Tab.Screen
        name={navigation_id.balanceFeed}
        component={balanceFeed}
        options={{
          tabBarLabel: '밸런스',
          tabBarLabelStyle: {
            marginTop: 7,
            fontSize: 19,
            fontFamily: 'BMJUA_ttf',
            color: type_color.balance,
          },
          tabBarIcon: () => (
            <Icon2 name="scale-balance" color={type_color.balance} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={navigation_id.mainFeed}
        component={mainFeed}
        options={{
          tabBarLabel: '폴링',
          tabBarLabelStyle: {
            marginTop: 7,
            fontSize: 19,
            fontFamily: 'BMJUA_ttf',
            color: type_color.polling,
          },
          tabBarIcon: () => (
            <Icon name="check-circle" color={type_color.polling} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={navigation_id.battleFeed}
        component={battleFeed}
        options={{
          tabBarLabel: '배틀',
          tabBarLabelStyle: {
            marginTop: 7,
            fontSize: 19,
            fontFamily: 'BMJUA_ttf',
            color: type_color.battle,
          },
          tabBarIcon: () => (
            <Icon2 name="sword-cross" color={type_color.battle} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  const onNotification = (notify: any) => {
    console.log('[App] onNotification : notify :', notify);

    console.log(notify.notification.android.imageUrl);

    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify.data,
      {
        soundName: 'default',
        playSound: true,
        picture: notify.notification.android
          ? notify.notification.android.imageUrl
          : null,
      },
    );
  };

  const onOpenNotification = (notify: any) => {
    console.log('[App] onOpenNotification : notify :', notify);

    if (
      notify.postType === type_id.polling ||
      notify.postType === type_id.balance
    ) {
      console.log('onOpenNotification -> polling or balance');
      if (notify.postId) {
        fetch(url.voteLoad + notify.postId)
          .then(function (response) {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok.');
            }
          })
          .then(function (data) {
            console.log(data);

            navigationRef.current?.dispatch(StackActions.popToTop());
            navigationRef.current?.dispatch(
              StackActions.replace(navigation_id.Feeds),
            );

            navigate(navigation_id.pollingResult, {
              postType: data.postType,
              postId: data.postId,
              timeBefore: data.timeBefore,
              userCount: data.userCount,
              storyText: data.storyText,
              selection: data.selection,
            });
          })
          .catch(function (error) {
            showNetworkError(error.message);
            console.log(
              'There has been a problem with your fetch operation: ',
              error.message,
            );
          });
      }
    } else if (notify.postType === type_id.battle) {
      console.log('onOpenNotification -> battle');
      if (notify.postId) {
        fetch(url.battleLoad + '/' + notify.postId)
          .then(function (response) {
            console.log(response);
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Network response was not ok.');
            }
          })
          .then(function (data) {
            navigate(navigation_id.battlePost, {
              postId: data.postId,
              timeLeft: data.timeLeft,
              userCount: data.userCount,
              textA: data.textA,
              textB: data.textB,
            });
          })
          .catch(function (error) {
            showNetworkError(error.message);
            console.log(
              'There has been a problem with your fetch operation: ',
              error.message,
            );
          });
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
    localNotificationService.configure(onOpenNotification);

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      onNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={landing}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={navigation_id.landing} component={landing} />
          <Stack.Screen name={navigation_id.Feeds} component={feedDrawer} />
          <Stack.Screen name="test" component={testScene} />
          <Stack.Screen name={navigation_id.comment} component={comment} />
          <Stack.Screen name={navigation_id.login} component={login} />
          <Stack.Screen name={navigation_id.signup} component={signUp} />
          <Stack.Screen
            name={navigation_id.personalInfo}
            component={personalInfo}
          />
          <Stack.Screen name={navigation_id.makePoll} component={makePoll} />
          <Stack.Screen
            name={navigation_id.pollingResult}
            component={pollingResult}
          />
          <Stack.Screen
            name={navigation_id.balanceResult}
            component={balanceResult}
          />
          <Stack.Screen name={navigation_id.profile} component={profile} />
          <Stack.Screen
            name={navigation_id.profileImageSelection}
            component={profileImageSelection}
          />
          <Stack.Screen
            name={navigation_id.battlePost}
            component={battlePost}
          />
          <Stack.Screen name={navigation_id.search} component={search} />
          <Stack.Screen name={navigation_id.myPolls} component={myPolls} />
          <Stack.Screen
            name={navigation_id.myVotedPolls}
            component={myVotedPolls}
          />
          <Stack.Screen
            name={navigation_id.likeTagSelect}
            component={likeTagSelect}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </RecoilRoot>
  );
}

export default App;
