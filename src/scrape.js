const htmlparser = require('htmlparser')
const { select } = require('soupselect-update')
const fetch = require('isomorphic-fetch')
const URLSearchParams = require('url-search-params')
const fs = require('fs')

const CARS_COM = 'https://www.cars.com/for-sale/searchresults.action'
const CARS_COM_SEARCH_PARAMS = {
  localVehicles: 'true',
  mdId: '21912', // S4
  mkId: '20049', // Audi
  mlgId: '28867', // Mileage <60k
  page: '1',
  perPage: '100',
  prMn: '15000', // Min price 15k
  prMx: '30000', // Max price 30k
  rd: '99999', // no clue
  searchSource: 'GN_REFINEMENT', // no clue
  showMore: 'true', // i guess...show more?
  sort: 'price-highest', // sort by highest price
  yrId: [
    '47272', // 2013?
    '51683', // 2014?
    '56007', // 2015?
    '58487' // 2016?
  ],
  zc: '53132' // zip code
}

const parseCarsCom = (html) => {
  let cars = []
  new htmlparser.Parser(new htmlparser.DefaultHandler((err, dom) => {
    if (err) {
      throw err
    }

    const carListings = select(dom, '.shop-srp-listings__listing')
      .reduce((collector, element) => {
        let listing = {}

        listing.pic = select(element, '.listing-row__photo').map(elem => {
          const regX = /(https:\/\/.+.jpe?g)/g
          const attribs = elem.attribs.style || elem.attribs['data-lazy-style']
          const url = regX.exec(attribs)
          if (url) return url[0]
          return ''
        })[0]
        listing.price = select(element, '.listing-row__price').map(elem => elem.children[0].raw)[0].trim()
        listing.mileage = select(element, '.listing-row__mileage').map(elem => elem.children[0].raw)[0].trim()
        listing.title = select(element, '.listing-row__title').map(elem => elem.children[0].raw)[0].trim()
        listing.link = select(element, '.listing-row__link').map(elem => elem.attribs.href)[0]

        return [...collector, listing]
      }, [])

    cars = carListings
  })).parseComplete(html)
  return cars
}

const getCarsFromCarsCom = async () => {
  const params = new URLSearchParams()
  for (let param in CARS_COM_SEARCH_PARAMS) {
    params.append(param, CARS_COM_SEARCH_PARAMS[param])
  }
  const url = `${CARS_COM}/?${params}`
  const response = await fetch(url, { mode: 'no-cors' })
  if (response.status >= 400) {
    throw new Error('Bad response from server')
  }
  const html = await response.text()
  return parseCarsCom(html)
}

(async () => {
  const cars = await getCarsFromCarsCom()
  fs.writeFile('./src/constants/cars.json', JSON.stringify(cars, null, 2), () => {
    console.log('done')
  })
})()

export default () => new Promise(async (resolve, reject) => {
  try {
    const cars = await getCarsFromCarsCom()
    resolve({ cars })
  } catch (error) {
    reject(error)
  }
})
