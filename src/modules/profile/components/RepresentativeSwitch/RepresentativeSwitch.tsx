import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './RepresentativeSwitch.styles';
import {Switch} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {
  removeRepresentativeStatus,
  sentRepresentativeRequest,
} from '../../../../store/thunks/representatives/representatives.thunk';
import {changeModalState} from '../../../../store/slices/app/app.slice';

const RepresentativeSwitch = () => {
  const {account} = useAppSelector(state => state.profile);
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

  const onToggleSwitch = (value: boolean) => {
    if (value) {
      setIsSwitchOn(true);
      dispatch(sentRepresentativeRequest());
    } else {
      repStatusRemoveSwitchHandler();
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

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switchInfoContainer}>
        <Text style={styles.switchInfoTitle}>მინდა ვიყო წარმომადგენელი</Text>
        <Text style={styles.switchInfo}>
          ამ ფუნქციონალის მონიშვნით თქვენ ეთანხმებით რომ სხვამ აგირჩიოთ
          წარმომადგნელად (საჯარო პროფილი)
        </Text>
      </View>
      <View style={styles.switchWrapper}>
        <Switch
          color={COLORS.NEW_MAIN}
          value={isSwitchOn}
          disabled={isSwitchDisabled || rep_switch_loading}
          onValueChange={onToggleSwitch}
        />
      </View>
    </View>
  );
};

export default RepresentativeSwitch;
