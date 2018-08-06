import React from 'react'
import './Car.css'

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const car = ({ car: { title, price, mileage, link, pic } }) => (
  <div className='card bg-light'>
    { pic ? <img className='card-img-top' src={pic} alt={title} /> : null }
    <h5 className='card-header'>{ title.replace(/(Audi)|(3.0?T)/g, '') }</h5>
    <div className='card-body'>
      <h6 className='card-title'>{ `$ ${numberWithCommas(price)}` }</h6>
      <p className='card-text'>{ `${numberWithCommas(mileage)} miles` }</p>
      <a href={`https://www.cars.com${link}`} target='_blank' className='btn btn-secondary'>Listing</a>
    </div>
  </div>
)

export default car
