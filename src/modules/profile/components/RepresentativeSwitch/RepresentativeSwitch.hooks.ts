import {changeModalState} from '@store/app/app.slice';
import {setModalCallback} from '@store/modalCallback';
import {selectProfile} from '@store/profile/profile.selectors';
import {selectRepresentatives} from '@store/representatives/representatives.selectors';
import {
  removeRepresentativeStatus,
  sentRepresentativeRequest,
} from '@store/representatives/representatives.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

export const useRepresentativeSwitch = () => {
  const {account, socialAccounts} = useAppSelector(selectProfile);
  const {rep_switch_loading} = useAppSelector(selectRepresentatives);

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
    return socialAccounts.find(socialAccount => socialAccount.type_id === 1);
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
    setModalCallback(() => {
      dispatch(removeRepresentativeStatus());
      setIsSwitchOn(false);
    });
    dispatch(
      changeModalState({
        isModalOpen: true,
        modalDescription: 'ნამდვილად გსურთ წარმომადგენლის სტატუსი გაუქმება?',
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
