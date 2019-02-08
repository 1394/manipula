/**
 * @namespace ArrayManipula
 */
const ArrayManipula = {
  /**
   * group elements of array by property
   * @memberof ArrayManipula
   * @param {Array} arr source array of objects
   * @param {String} property property for grouping
   * @param {String} [defProp] if value by property empty will group by defProp
   */
  groupby: (arr, property, defProp) => {
    if (!Array.isArray(arr)) {
      throw new Error(`groupby arr must be Array`)
    }
    let acc = {}
    arr.forEach(el => {
      let prop = el[property] || defProp
      if (prop) {
        acc[prop] = acc[prop] || []
        acc[prop].push(el)
      }
    })
    return acc
  },
  /**
   * build index on array elements by property
   * @memberof ArrayManipula
   * @function
   * @param {Array} arr source array of objects
   * @param {String} property property for index
   * @param {String} [emptyProp] if value by property empty will group by emptyProp
   */
  indexby: (arr, property, emptyProp) => {
    if (!Array.isArray(arr)) {
      throw new Error(`groupby arr must be Array`)
    }
    let acc = {}
    arr.forEach(el => {
      let prop = el[property]
      if (prop) {
        acc[prop] = el
      } else {
        if (emptyProp) {
          acc[emptyProp] = acc[emptyProp] || []
          acc[emptyProp].push(el)
        }
      }
    })
    return acc
  }
}

module.exports = ArrayManipula
