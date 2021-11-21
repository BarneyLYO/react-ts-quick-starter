const GenerateTemplate = (cnt) => `
    const value = ${cnt}
    export default value
  `

module.exports = function barneyLoader(cnt, map, meta) {
  return GenerateTemplate(cnt)
}
