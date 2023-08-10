import React, { Dispatch, SetStateAction } from 'react'
import Rating from '@mui/material/Rating';

type Props = {}

const StarRating = ({ onChange, value}:{onChange: (value:number|null)=>void, value:number|null}) => {

  return (
    <Rating
        name="size-large"
        size='large'
        value={value}
        onChange={(event, newValue) => {
            onChange(newValue);
        }}
      />
  )
}

export default StarRating