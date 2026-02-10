import {
  getChosenRepresentativeId,
  getRepresentatives,
} from '@store/representatives/representatives.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';
import {useEffect} from 'react';

export const useRepresentative = () => {
  const {representatives, get_representatives_loading} = useAppSelector(
    state => state.representatives,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRepresentatives(''));
    dispatch(getChosenRepresentativeId());
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getRepresentatives(''));
    dispatch(getChosenRepresentativeId());
  };

  return {
    representatives,
    get_representatives_loading,
    onRefresh,
  };
};
