import React,{useEffect, useState} from 'react'
import Question from '../views/Question';
import Answer from '../views/Answer';

type QA = {
    conv_id: string;
    question: string;
    answer: string;
    _id: string;
}
type convType = {
    QAList : QA[]   
}
function Conversation(props: convType) {
  return (
    <div className='convesationSection'>
        <div className="container">
            {
                props.QAList.slice(0, props.QAList.length).map((entry, index)=>(
                    <div className="card">
                        <Question question={entry.question} />
                        <Answer answer={entry.answer} />
                    </div>
                )) 
            }
        </div>
    </div>
  )
}

export default Conversation