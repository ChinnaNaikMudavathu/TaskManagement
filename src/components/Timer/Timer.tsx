import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';

import {TimerProps} from '../../Models/Timer.Models';

import TimerStyle from './Timer.styles';

const Timer = (props: TimerProps) => {
  const [timer, setTimer] = useState('');
  const timerRef = useRef<any>(null);
  const isScreenFocus = useIsFocused();

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      var today = new Date();
      const timerValue = `${today?.getHours()}-${today?.getMinutes()}-${today?.getSeconds()} ${today?.getDate()}-${today?.getMonth()}-${today?.getFullYear()}`
      setTimer(timerValue || '');
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    timerRef?.current && clearInterval(timerRef?.current);
  }, []);

  useEffect(() => {
    if (isScreenFocus) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isScreenFocus]);

  return (
    <View style={TimerStyle.Container}>
      <Text style={TimerStyle.TimerText}>Timer: {timer}</Text>
    </View>
  );
};

export default Timer;
