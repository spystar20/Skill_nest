import { Rating } from '@mui/material'
import React from 'react'

const RecentReviews = ({review}) => {
  return ( 
              <div
                className="border-b border-border pb-4 last:border-none last:pb-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-body text-sm font-semibold text-text">
                      {review.userName}
                    </p>
                    <p className="font-body text-[10px] text-text-light">
                      {review.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-0.5 text-warning">
                        <Rating value={review.rating} size='small' readOnly/>
                  </div>
                </div>

                <p className="mt-2 font-body text-xs leading-relaxed text-text-light">
                  {review.review}
                </p>
              </div>
          )
}

export default RecentReviews