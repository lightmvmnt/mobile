import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ScreenHeader.styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../core/routing/Base.routing';
import GoBackButton from '../../assets/images/goBackBtn.svg';

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
