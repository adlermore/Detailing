'use client';
import { useEffect, useState } from "react";
import PageLoader from "../PageLoader";
import IconRight from "@/public/icons/IconRight";
import request from "@/utils/hooks/request";

export default function Questions() {
  const [questions, setQuestions] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    request(process.env.NEXT_PUBLIC_DATA_API + '/faqs')
      .then((faqData) => {
        setQuestions(faqData.data)
      })
      .catch((error) => {
        throw new Error(error)
      });
  }, []);

  const handleQuestionClick = (id) => {
    setSelectedQuestion(id === selectedQuestion ? null : id);
  };

  if (!questions) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col gap-4 mt-12">
      {questions?.map(elem => {
        return <div key={elem.id} className="border-b-2 border-indigo-500">
          <h3 className="flex items-center cursor-pointer p-4 font-bold" onClick={() => handleQuestionClick(elem.id)}>
            <span className={`${selectedQuestion === elem.id ? 'rotate-90' : 'rotate-0'} transition`}><IconRight /></span>
            {elem.question}
          </h3>
          <p className={`${selectedQuestion === elem.id ? 'max-h-70 opacity-100 visible pb-4 duration-400 ' : ' duration-400 max-h-0 opacity-0  invisible'} pl-9`} dangerouslySetInnerHTML={{ __html: elem.answer }}></p>
        </div>
      })
      }
    </div >
  )
}