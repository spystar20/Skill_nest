import React from 'react'
import Loader from './Loader'

const Dataset = ({loading,error,children}) => {
    if(loading){
        return <Loader/>
    }
    if(error){
        return (
        <div>
            {error}
        </div>)
    }
  return (
   children
  )
}

export default Dataset