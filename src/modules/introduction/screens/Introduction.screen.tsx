import {LogoWithTitle, SafeAreaBackground} from '@components';
import React, {useState} from 'react';
import {View} from 'react-native';

import {IntroductionSwiper} from '../components';
import {styles} from './Introduction.styles';

function IntroductionScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slideIndexHandler = (index: number) => {
    setCurrentSlideIndex(index);
  };

  return (
    <SafeAreaBackground>
      <View style={styles.wrapper}>
        <LogoWithTitle slideIndex={currentSlideIndex} />
      </View>
      <IntroductionSwiper slideIndexHandler={slideIndexHandler} />
    </SafeAreaBackground>
  );
}

export default IntroductionScreen;
