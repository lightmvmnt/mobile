import {SvgProps} from 'react-native-svg';
import {RootStackParamList} from '../core/routing/Base.routing';

export interface NavItem {
  Icon: React.FC<SvgProps>;
  to: keyof RootStackParamList;
  label: string;
}
