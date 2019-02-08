/**
 * @namespace ArrayManipula
 */
const ArrayManipula = {
  /**
   * group elements of array by property
   * @memberof ArrayManipula
   * @param {Array} arr source array of objects
   * @param {String} property property for grouping
   * @param {Object} [opts] options
   * @param {String} opts.defProp if value by property empty will group by defProp
   * @param {Function} opts.getValue function for extract value from element of array: function (el, property) { ...;return value }
   */
  groupby: (arr, property, opts = {}) => {
    if (!Array.isArray(arr)) {
      throw new Error(`groupby arr must be Array`)
    }
    let acc = {}
    arr.forEach(el => {
      let prop = el[property] || opts.defProp
      if (prop) {
        acc[prop] = acc[prop] || []
        if (typeof opts.getValue === 'function') {
          try {
            acc[prop].push(opts.getValue(el, prop))
          } catch (ex) {
            console.error('groupby getValue error :', ex)
          }
        } else {
          acc[prop].push(el)
        }
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
   * @param {Object} [opts] options
   * @param {String} opts.emptyProp if value by property empty will group by emptyProp
   * @param {Function} opts.getValue function for extract value from element of array: function (el, property) { ...;return value }
   */
  indexby: (arr, property, opts = {}) => {
    if (!Array.isArray(arr)) {
      throw new Error(`groupby arr must be Array`)
    }
    let acc = {}
    arr.forEach(el => {
      let prop = el[property]
      if (prop) {
        if (typeof opts.getValue === 'function') {
          try {
            acc[prop] = opts.getValue(el, prop)
          } catch (ex) {
            console.error('indexby getValue error :', ex)
          }
        } else {
          acc[prop] = el
        }
      } else {
        if (opts.emptyProp) {
          acc[opts.emptyProp] = acc[opts.emptyProp] || []
          acc[opts.emptyProp].push(el)
        }
      }
    })
    return acc
  }
}

module.exports = ArrayManipula
