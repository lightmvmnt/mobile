import {useEffect, useState} from 'react';
import {RepresentativeDetails} from '@store/representatives/representatives.types';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {selectAccount} from '@store/profile/profile.selectors';
import {selectRepresentatives} from '@store/representatives/representatives.selectors';
import {
  chooseRepresentative,
  removeChosenRepresentative,
  updateChosenRepresentative,
} from '@store/representatives/representatives.thunk';
import Toast from 'react-native-toast-message';
import {changePressedRepresentativeId} from '@store/representatives/representatives.slice';

export const useRepresentativeDetailsButtons = (
  representative: RepresentativeDetails | null,
) => {
  const account = useAppSelector(selectAccount);
  const {
    choose_representative_loading,
    chosen_representative_id,
    pressed_representative_id,
  } = useAppSelector(selectRepresentatives);

  const [isThemselves, setIsThemselves] = useState(false);
  const [isChosen, setIsChosen] = useState(false);
  const [hasChosenElse, setHasChosenElse] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!representative || !account) {
      return;
    }

    if (account?.leader_details) {
      setIsThemselves(
        account.leader_details.id === representative.leader_details.id,
      );
    }
  }, [representative, account]);

  useEffect(() => {
    if (!representative) {
      return;
    }

    setIsChosen(representative.leader_details.id === chosen_representative_id);
    setHasChosenElse(
      representative.leader_details.id !== chosen_representative_id,
    );
  }, [representative, chosen_representative_id]);

  const onChooseButtonPress = () => {
    if (!representative) {
      return;
    }

    if (isThemselves) {
      Toast.show({
        type: 'info',
        text1: 'გაფრთხილება',
        text2: 'საკუთარ თავის არჩევა არ შეგიძლიათ',
        visibilityTime: 3000,
      });
      return;
    }

    dispatch(changePressedRepresentativeId(representative.leader_details.id));

    if (!isChosen && !hasChosenElse) {
      dispatch(chooseRepresentative(representative.leader_details.id));
      return;
    }

    if (!isChosen && hasChosenElse) {
      dispatch(updateChosenRepresentative(representative.leader_details.id));
      return;
    }

    if (isChosen) {
      dispatch(removeChosenRepresentative());
      return;
    }
  };

  return {
    isChosen,
    pressed_representative_id,
    choose_representative_loading,
    onChooseButtonPress,
  };
};
