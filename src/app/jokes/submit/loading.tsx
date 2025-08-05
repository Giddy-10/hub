import { Spinner } from '@/components/spectrumui/spinner-dependencies'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-60 flex justify-center items-center'>
        <Spinner size={'large'} />
    </div>
  )
}

export default loading