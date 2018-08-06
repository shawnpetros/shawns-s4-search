import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import cars from './constants/cars.json'

const sorted = () => {
  const sortMe = cars.map(({ mileage, price, title, link, pic }) => {
    return {
      pic,
      title,
      link,
      mileage: Number(mileage.replace(/[^0-9]/g, '')),
      price: Number(price.replace(/[^0-9]/g, ''))
    }
  })

  const sorted = _.sortBy(sortMe, 'mileage')

  return _.uniqBy(sorted, 'mileage', 'price')
}

ReactDOM.render(<App cars={sorted()} />, document.getElementById('root'))
registerServiceWorker()
