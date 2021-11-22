/* eslint-disable no-param-reassign */
module.exports = function barneyPreLoader(cnt, map, meta) {
  cnt += ' decorated loader'
  cnt = cnt.replace(/[\r\n]/g, '')
  return cnt
}
