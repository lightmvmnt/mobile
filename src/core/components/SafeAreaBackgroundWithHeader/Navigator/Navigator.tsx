import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Navigator.styles';
import {NavItem} from '../../../../types/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps} from '../../../routing/Base.routing';

function Navigator({items}: {items: NavItem[]}) {
  const navigator = useNavigation<NavigationProps>();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {items.map((item, i) => (
        <TouchableOpacity
          key={+i}
          style={route.name === item.to ? styles.activeButton : styles.button}
          activeOpacity={0.8}
          onPress={() => navigator.navigate(item.to)}>
          <View style={styles.buttonView}>
            <item.Icon width={24} height={24} />
            <Text style={styles.buttonText}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Navigator;
