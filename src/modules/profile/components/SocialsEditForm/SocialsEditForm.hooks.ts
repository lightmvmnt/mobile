import {changeModalState} from '@store/app/app.slice';
import {setModalCallback} from '@store/modalCallback';
import {selectProfile} from '@store/profile/profile.selectors';
import {changeSocialAddModalVisibility} from '@store/profile/profile.slice';
import {removeUserSocial} from '@store/profile/profile.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';

export const useSocialsEditForm = () => {
  const {socialAccounts, account, removeSocialAccountLoading} =
    useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  const findSocialAccount = (id: number) => {
    const socialAccount = socialAccounts.find(social => social.type_id === id);

    return socialAccount;
  };

  const onSocialButtonPress = (id: number) => {
    const socialAccount = socialAccounts.find(social => social.type_id === id);

    if (socialAccount) {
      setModalCallback(() => {
        dispatch(removeUserSocial(socialAccount.id));
      });
      dispatch(
        changeModalState({
          isModalOpen: true,
          modalDescription: 'ნამდვილად გსურთ ანგარიშს მოხსნა?',
          mainButtonTitle: 'კი',
          secondaryButtonTitle: 'არა',
        }),
      );
    } else {
      dispatch(changeSocialAddModalVisibility({visible: true, type_id: id}));
    }
  };

  return {
    account,
    removeSocialAccountLoading,
    findSocialAccount,
    onSocialButtonPress,
  };
};
