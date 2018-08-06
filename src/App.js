import React from 'react'
import logo from './audi.svg'
import Car from './Car'
import './App.css'

export default ({ cars }) => (
  <div className='App'>
    <header className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h1 className='App-title'>Find Your S4 Brah!</h1>
    </header>
    <p className='App-intro'>
      To get started, find a car you like...and click away!
    </p>
    <div className='container d-flex h-100'>
      <div className='row justify-content-center align-self-center'>
        { cars.map((car, i) => <Car key={i} car={car} />) }
      </div>
    </div>
  </div>
)
