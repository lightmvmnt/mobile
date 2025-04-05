import {Text, View} from 'react-native';
import {styles} from './InfoContainer.styles';
import {Props} from './InfoContainer.types';
import {ActivityIndicator} from 'react-native-paper';

function InfoContainer({
  count,
  counterBgColor,
  counterColor,
  title,
  Icon,
  loading,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon width={30} height={30} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={[styles.counterContainer, {backgroundColor: counterBgColor}]}>
        <Text style={[styles.counter, {color: counterColor}]}>
          {loading ? (
            <ActivityIndicator size={16} color={counterColor} />
          ) : (
            count
          )}
        </Text>
      </View>
    </View>
  );
}

export default InfoContainer;
