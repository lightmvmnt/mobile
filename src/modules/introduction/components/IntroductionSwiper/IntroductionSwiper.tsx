import React, {useRef, useState} from 'react';
import {styles} from './IntroductionSwiper.styles';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import Slide from './Slide';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {SetStorageObjectValue} from '../../../../utils/asyncStore.util';

function IntroductionInfoSwiper({
  slideIndexHandler,
}: {
  slideIndexHandler: (index: number) => void;
}) {
  const [isLastSlide, setIsLastSlide] = useState(false);

  const swiperRef = useRef<Swiper>(null);
  const navigation = useNavigation<NavigationProps>();

  const goToNextSlide = () => {
    swiperRef.current?.scrollBy(1);
  };

  const goToNextPage = () => {
    SetStorageObjectValue('IS_FIRST_LAUNCH', 'Done');
    navigation.navigate('Signin');
  };

  const handleIndexChanged = (index: number) => {
    slideIndexHandler(index);
    setIsLastSlide(index === 2);
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        containerStyle={styles.swiperWrapper}
        loop={false}
        dotStyle={styles.swiperDot}
        activeDotStyle={styles.activeSwiperDot}
        paginationStyle={{top: 30}}
        onIndexChanged={handleIndexChanged}>
        <Slide
          key={1}
          slideIndex={0}
          slideSwipeHandler={() =>
            isLastSlide ? goToNextPage() : goToNextSlide()
          }
        />
        <Slide
          key={2}
          slideIndex={1}
          slideSwipeHandler={() =>
            isLastSlide ? goToNextPage() : goToNextSlide()
          }
        />
        <Slide
          key={3}
          slideIndex={2}
          slideSwipeHandler={() =>
            isLastSlide ? goToNextPage() : goToNextSlide()
          }
        />
      </Swiper>
    </View>
  );
}

export default IntroductionInfoSwiper;
