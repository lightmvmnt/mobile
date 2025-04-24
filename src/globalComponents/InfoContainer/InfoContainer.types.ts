import {SvgProps} from 'react-native-svg';

export interface Props {
  title: string;
  Icon: React.FC<SvgProps>;
  count: number;
  counterBgColor: string;
  counterColor: string;
  loading: boolean;
}
