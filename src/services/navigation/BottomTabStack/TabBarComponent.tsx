import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {FontSizeGenerator} from 'utils/fontSizeGenerator.util';

import HomeIcon from '@assets/icons/Home.svg';
import TasksIcon from '@assets/icons/Tasks.svg';
import PollsIcon from '@assets/icons/pollsIcon.svg';
import ProfileIcon from '@assets/icons/userIcon.svg';

import FONTS from 'constants/fonts';
import t from 'services/translations/translator';
import COLORS from 'constants/colors';

const TabBarComponent: React.FC<BottomTabBarProps> = ({navigation}) => {
  const {bottom} = useSafeAreaInsets();

  const getRouteName = () => {
    const routeIndex = navigation?.getState()?.index || 0;
    const routesObject = navigation?.getState()?.routes[routeIndex];
    if (!routesObject?.state) {
      return routesObject?.name;
    }
    const innerIndex = routesObject?.state?.index || 0;
    const currentRoute = routesObject?.state?.routes[innerIndex];
    return currentRoute?.name;
  };

  const routeName = getRouteName();

  const isHomeActive = routeName === 'HomeScreen';
  const isTasksActive =
    routeName === 'TasksScreen' || routeName === 'TaskDetailScreen';
  const isPollsActive =
    routeName === 'PollsScreen' || routeName === 'PollDetailsScreen';
  const isProfileActive = routeName === 'ProfileScreen';

  const navigateToHome = () => navigation.navigate('HomeScreen');
  const navigateToTasks = () => navigation.navigate('TasksScreen');
  const navigateToPolls = () => navigation.navigate('PollsScreen');
  const navigateToProfile = () => navigation.navigate('ProfileScreen');

  return (
    <View style={[styles.container, {paddingBottom: bottom || 16}]}>
      <TouchableOpacity
        style={[styles.buttonView, isHomeActive && styles.activeButton]}
        activeOpacity={0.8}
        onPress={navigateToHome}>
        <View style={styles.buttonView}>
          <HomeIcon />
          <Text style={styles.buttonText}>{t('tabBarComponent.home')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonView, isTasksActive && styles.activeButton]}
        activeOpacity={0.8}
        onPress={navigateToTasks}>
        <View style={styles.buttonView}>
          <TasksIcon />
          <Text style={styles.buttonText}>{t('tabBarComponent.tasks')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonView, isPollsActive && styles.activeButton]}
        activeOpacity={0.8}
        onPress={navigateToPolls}>
        <View style={styles.buttonView}>
          <PollsIcon />
          <Text style={styles.buttonText}>{t('tabBarComponent.polls')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonView, isProfileActive && styles.activeButton]}
        activeOpacity={0.8}
        onPress={navigateToProfile}>
        <View style={styles.buttonView}>
          <ProfileIcon width={20} height={20} />
          <Text style={styles.buttonText}>{t('tabBarComponent.profile')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabBarComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.LIGHT,
  },
  activeButton: {
    opacity: 1,
  },
  buttonView: {
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FontSizeGenerator(12),
    fontFamily: FONTS.GEO_SEMIBOLD,
    minHeight: 15,
  },
});
