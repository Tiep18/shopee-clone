import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/contance/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

export default function RatingStarFilter({ queryConfig }: Props) {
  const navigate = useNavigate()
  const handleRatingFilter = (rating: number) => {
    navigate({
      pathname: path.products,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(rating)
      }).toString()
    })
  }
  return (
    <div>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => handleRatingFilter(5 - index)}
              className='mb-2 flex max-w-fit cursor-pointer items-center'
              tabIndex={0}
              role='button'
              aria-hidden='true'
            >
              {Array(5)
                .fill(0)
                .map((_, starIndex) => {
                  if (starIndex < 5 - index) {
                    return (
                      <div key={starIndex} className='flex items-center py-1'>
                        <svg viewBox='0 0 9.5 8' className='mx-[1px] h-[14px]'>
                          <defs>
                            <linearGradient
                              id='ratingStarGradient'
                              x1='50%'
                              x2='50%'
                              y1='0%'
                              y2='100%'
                            >
                              <stop offset={0} stopColor='#ffca11' />
                              <stop offset={1} stopColor='#ffad27' />
                            </linearGradient>
                            <polygon
                              id='ratingStar'
                              points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                            />
                          </defs>
                          <g
                            fill='url(#ratingStarGradient)'
                            fillRule='evenodd'
                            stroke='none'
                            strokeWidth={1}
                          >
                            <g transform='translate(-876 -1270)'>
                              <g transform='translate(155 992)'>
                                <g transform='translate(600 29)'>
                                  <g transform='translate(10 239)'>
                                    <g transform='translate(101 10)'>
                                      <use
                                        stroke='#ffa727'
                                        strokeWidth='.5'
                                        xlinkHref='#ratingStar'
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    )
                  } else
                    return (
                      <div key={starIndex} className='flex items-center py-1'>
                        <svg viewBox='0 0 30 30' className='mx-[1px] h-[16px]'>
                          <defs>
                            <linearGradient
                              id='star__hollow'
                              x1='50%'
                              x2='50%'
                              y1='0%'
                              y2='99.0177926%'
                            >
                              <stop offset='0%' stopColor='#FFD211' />
                              <stop offset='100%' stopColor='#FFAD27' />
                            </linearGradient>
                          </defs>
                          <path
                            fill='none'
                            fillRule='evenodd'
                            stroke='url(#star__hollow)'
                            strokeWidth={2}
                            d='M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z'
                          />
                        </svg>
                      </div>
                    )
                })}
            </div>
          )
        })}
    </div>
  )
}
