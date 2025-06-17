import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {
  getChosenRepresentativeId,
  getRepresentatives,
} from '../../../../store/thunks/representatives/representatives.thunk';

export const useRepresentative = () => {
  const {representatives, get_representatives_loading} = useAppSelector(
    state => state.representatives,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRepresentatives());
    dispatch(getChosenRepresentativeId());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getRepresentatives());
    dispatch(getChosenRepresentativeId());
  };

  return {
    representatives,
    get_representatives_loading,
    onRefresh,
  };
};
