import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ScreenHeader.styles';
import GoBackButton from '../../assets/icons/goBackBtn.svg';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

function ScreenHeader({title}: {title: string}) {
  
  const navigation = useAppNavigation();


  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={navigation.goBack}>
        <GoBackButton width={28} height={28} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default ScreenHeader;
