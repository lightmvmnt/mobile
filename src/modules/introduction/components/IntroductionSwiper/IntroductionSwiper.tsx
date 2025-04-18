import React, {useRef, useState} from 'react';
import {View} from 'react-native';

import Swiper from 'react-native-swiper';

import {styles} from './IntroductionSwiper.styles';
import {SetStorageObjectValue} from '../../../../utils/asyncStore.util';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

import Slide from './Slide';


function IntroductionInfoSwiper({
  slideIndexHandler,
}: {
  slideIndexHandler: (index: number) => void;
}) {
  const [isLastSlide, setIsLastSlide] = useState(false);

  const swiperRef = useRef<Swiper>(null);
  const navigation = useAppNavigation();

  const goToNextSlide = () => {
    swiperRef.current?.scrollBy(1);
  };

  const goToNextPage = () => {
    SetStorageObjectValue('IS_FIRST_LAUNCH', 'Done');
    navigation.navigate('SigninScreen');
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
