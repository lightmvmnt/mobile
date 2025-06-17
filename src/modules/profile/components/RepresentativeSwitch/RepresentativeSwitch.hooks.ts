import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {
  removeRepresentativeStatus,
  sentRepresentativeRequest,
} from '../../../../store/thunks/representatives/representatives.thunk';
import Toast from 'react-native-toast-message';
import {changeModalState} from '../../../../store/slices/app/app.slice';

export const useRepresentativeSwitch = () => {
  const {account, connectedProviders} = useAppSelector(state => state.profile);
  const {rep_switch_loading} = useAppSelector(state => state.representatives);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!account) {
      return;
    }

    if (account.leader_details) {
      if (account.leader_details.is_approved) {
        setIsSwitchOn(true);
        setIsSwitchDisabled(false);
      } else {
        setIsSwitchOn(true);
        setIsSwitchDisabled(true);
      }
    }
  }, [account]);

  const isFacebookConnected = () => {
    return connectedProviders.find(
      provider => provider.provider.id === 'facebook',
    );
  };

  const onToggleSwitch = (value: boolean) => {
    if (value) {
      representativeRequestHandler();
    } else {
      repStatusRemoveSwitchHandler();
    }
  };

  const representativeRequestHandler = () => {
    if (isFacebookConnected()) {
      setIsSwitchOn(true);
      dispatch(sentRepresentativeRequest());
    } else {
      Toast.show({
        type: 'info',
        text1: 'გაფრთხილება',
        text2:
          'წარმომადგენლის სტატუსის მოსათხოვნად დააკავშირეთ თქვენი ფეისბუქ ანგარიში',
        text2Style: {},
        visibilityTime: 5000,
      });
    }
  };

  const repStatusRemoveSwitchHandler = () => {
    dispatch(
      changeModalState({
        isModalOpen: true,
        modalDescription: 'ნამდვილად გსურთ წარმომადგენლის სტატუსი გაუქმება?',
        modalButtonHandler: () => {
          dispatch(removeRepresentativeStatus());
          setIsSwitchOn(false);
        },
        mainButtonTitle: 'კი',
        secondaryButtonTitle: 'არა',
      }),
    );
  };

  return {
    rep_switch_loading,
    isSwitchOn,
    isSwitchDisabled,
    onToggleSwitch,
  };
};
