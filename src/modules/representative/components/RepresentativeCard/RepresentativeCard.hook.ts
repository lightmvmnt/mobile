import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {Representative} from '../../../../store/slices/representatives/representatives.types';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import Toast from 'react-native-toast-message';
import {
  chooseRepresentative,
  getRepresentativeDetails,
  removeChosenRepresentative,
} from '../../../../store/thunks/representatives/representatives.thunk';
import {changePressedRepresentativeId} from '../../../../store/slices/representatives/representatives.slice';

export const useRepresentativeCard = (representative: Representative) => {
  const {account} = useAppSelector(state => state.profile);
  const {
    choose_representative_loading,
    chosen_representative_id,
    pressed_representative_id,
  } = useAppSelector(state => state.representatives);

  const [isThemselves, setIsThemselves] = useState(false);
  const [isChosen, setIsChosen] = useState(false);

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!representative && !account) {
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
  }, [representative, chosen_representative_id]);

  const handleRepresentativeDetailsButton = () => {
    dispatch(getRepresentativeDetails(representative.id));
    navigation.navigate('RepresentativeDetails');
  };

  const onChooseButtonPress = (id: number) => {
    if (isThemselves) {
      Toast.show({
        type: 'info',
        text1: 'გაფრთხილება',
        text2: 'საკუთარ თავის არჩევა არ შეგიძლიათ',
        visibilityTime: 3000,
      });
    } else {
      dispatch(changePressedRepresentativeId(id));
      if (isChosen) {
        dispatch(removeChosenRepresentative());
      } else {
        dispatch(chooseRepresentative(representative.leader_details.id));
      }
    }
  };

  const onLikeButtonPress = () => {
    if (isThemselves) {
      Toast.show({
        type: 'info',
        text1: 'გაფრთხილება',
        text2: 'საკუთარ თავის მხარდაჭერა არ შეგიძლიათ',
        visibilityTime: 3000,
      });
    }
  };

  return {
    isChosen,
    pressed_representative_id,
    choose_representative_loading,
    handleRepresentativeDetailsButton,
    onChooseButtonPress,
    onLikeButtonPress,
  };
};
