import React from 'react'
//i will pass it the data from Product componenet but for color I'm gonna make the default prop below
const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
           // it is inline css, we can also write like {{color: color}}
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt' //it is half star
              : 'far fa-star' //it is an empty star
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
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
          style={{ color }}
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
          style={{ color }}
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
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {/* it means if there is text then show it just like text ? text: '' */}
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
