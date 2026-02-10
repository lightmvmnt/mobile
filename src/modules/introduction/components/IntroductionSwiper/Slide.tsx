import {COLORS, LAYOUT} from '@constants';
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {styles} from './IntroductionSwiper.styles';

function Slide({
  slideIndex,
  slideSwipeHandler,
}: {
  slideIndex: number;
  slideSwipeHandler: () => void;
}) {
  return (
    <View style={styles.slide}>
      <View style={styles.slideSubTitleContainer}>
        <Text
          style={[
            styles.slideSubTitle,
            {
              maxWidth: slideIndex !== 2 ? LAYOUT.WIDTH : LAYOUT.WIDTH - 100,
            },
          ]}>
          {slideIndex === 0 && 'და მას ვერავინ წაგვართმევს'}
          {slideIndex === 1 && 'თუ ვიმოქმედებთ ორგანიზებულად'}
          {slideIndex === 2 &&
            'შეასრულე თითო მისია დღეში და ნახავ ერთად რამდენი შეგვიძლია'}
        </Text>
      </View>

      <Button
        style={styles.slideButton}
        contentStyle={styles.slideButtonContent}
        labelStyle={styles.slideButtonLabel}
        mode="contained"
        textColor={COLORS.LIGHT}
        onPress={slideSwipeHandler}
        buttonColor={COLORS.NEW_MAIN}>
        შემდეგი
      </Button>
    </View>
  );
}

export default Slide;
