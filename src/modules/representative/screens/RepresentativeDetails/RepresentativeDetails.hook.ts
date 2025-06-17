import {useAppSelector} from '../../../../store/store';

export const useRepresentativeDetails = () => {
  const {representative_details, get_representative_details_loading} =
    useAppSelector(state => state.representatives);

  return {
    representative_details,
    get_representative_details_loading,
  };
};
