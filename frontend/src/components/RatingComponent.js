import React from 'react'

const RatingComponent = ({ value, text, color, size }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color, fontSize: `${size}` }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color, fontSize: `${size}` }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color, fontSize: `${size}` }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color, fontSize: `${size}` }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color, fontSize: `${size}` }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}
RatingComponent.defaultProps = {
  color: '#ffaa45',
}

export default RatingComponent
