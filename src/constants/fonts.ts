import {Platform} from 'react-native';

const MAIN = Platform.OS === 'android' ? 'gf-alaverdi-mt' : 'GFAlaverdiMt';
const GEO = 'NotoSansGeorgian';
const HELVETICA =
  Platform.OS === 'ios' ? 'HelveticaNeueLTGEO' : 'HelveticaNeue';

const FONTS = {
  BOLD: `${MAIN}-bold`,
  BLACK: `${MAIN}-black`,
  GEO_REGULAR: `${GEO}-Regular`,
  GEO_MEDIUM: `${GEO}-Medium`,
  GEO_SEMIBOLD: `${GEO}-SemiBold`,
  GEO_BOLD: `${GEO}-Bold`,
  HELVETICA_HEAVY: `${HELVETICA}-${
    Platform.OS === 'ios' ? '85Heavy' : 'Heavy'
  }`,
  HELVETICA_BOLD: `${HELVETICA}-${Platform.OS === 'ios' ? '75Bold' : 'Bold'}`,
  HELVETICA_MEDIUM: `${HELVETICA}-${
    Platform.OS === 'ios' ? '65Medium' : 'Medium'
  }`,
};

export default FONTS;
