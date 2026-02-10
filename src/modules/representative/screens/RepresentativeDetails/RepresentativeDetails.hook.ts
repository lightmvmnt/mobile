import {selectRepresentatives} from '@store/representatives/representatives.selectors';
import {useAppSelector} from '@store/store';

export const useRepresentativeDetails = () => {
  const {representative_details, get_representative_details_loading} =
    useAppSelector(selectRepresentatives);

  return {
    representative_details,
    get_representative_details_loading,
  };
};
