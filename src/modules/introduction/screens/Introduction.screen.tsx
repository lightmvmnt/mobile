import React, {useState} from 'react';
import {LogoWithTitle} from '../../../globalComponents';
import {SafeAreaBackground} from '../../../globalComponents';
import {styles} from './Introduction.styles';
import {View} from 'react-native';
import {IntroductionSwiper} from '../components';
import { IntroductionScreenParams } from 'services/navigation/AuthStack/AuthStackNavigator';

const IntroductionScreen: React.FC<IntroductionScreenParams> = () => {
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
