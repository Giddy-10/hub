import React, { ReactNode } from 'react'

const QuestionsContainer = ({children}: {children: ReactNode}) => {
  return (
    <div className="max-w-4/5 mx-auto w-fit mb-20 px-20 py-16 border rounded-2xl flex flex-col items-start gap-10">{children}</div>
  )
}

export default QuestionsContainer