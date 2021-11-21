const PRODUCTION = 'production'
const isDevelopment = process.env.NODE_ENV !== PRODUCTION
const isProduction = process.env.NODE_ENV === PRODUCTION

module.exports = {
  isDevelopment,
  isProduction,
}
