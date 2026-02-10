import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';

import GoBackButton from '../../assets/icons/goBackBtn.svg';
import {NavigationProps} from '../../services/navigation/Base.navigation';
import {styles} from './ScreenHeader.styles';

function ScreenHeader({title}: {title: string}) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
        <GoBackButton width={28} height={28} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default ScreenHeader;
