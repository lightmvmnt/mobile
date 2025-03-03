import {Text, View} from 'react-native';
import {styles} from './InfoContainer.styles';

function InfoContainer() {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Coming Soon</Text>
    </View>
  );
}

export default InfoContainer;
