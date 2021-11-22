const GenerateTemplate = (cnt) => `
    export default '${cnt}'
  `

module.exports = function barneyLoader(
  cnt,
  map = null,
  meta = null,
) {
  return GenerateTemplate(String(cnt).toString())
}
