import React from 'react'

import AnswerButton from './AnswerButton';
import { ANSWER_PREFIXES } from '../constants/general';

interface AnswerProps {
    answerIndex: any,
    isAnswered: boolean,
    answer: any,
    answerStyle: any,
    textStyle: any,
    handleAnswerSelection: (answerIndex: any) => void,
    setIsAnswered: (isAnswered: boolean) => void,

}

export default function Answer({ answerIndex, isAnswered, answer, answerStyle, textStyle, handleAnswerSelection, setIsAnswered }: AnswerProps) {
  
  return (
    <>
      <AnswerButton
          key={answerIndex}
          isAnswered={isAnswered}
          text={ANSWER_PREFIXES[answerIndex] + answer.text}
          style={answerStyle}
          textStyle={textStyle}
          onPress={() => { 
            handleAnswerSelection(answerIndex);
            setIsAnswered(true);
          }}
        />
    </>
  );
};