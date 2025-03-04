import {SvgProps} from 'react-native-svg';
import {RootStackParamList} from '../services/navigation/Base.navigation';

export interface NavItem {
  Icon: React.FC<SvgProps>;
  to: keyof RootStackParamList;
  label: string;
}
