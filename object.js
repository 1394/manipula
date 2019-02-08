const deepmerge = require('./deepmerge')

/**
 * @namespace ObjectManupula
 */
const ObjectManupula = {
  /**
   * get prop by path
   * @memberof ObjectManupula
   * @param {Object} obj source object
   * @param {String|Array} path path, for example 'a.b.c.d'
   * @returns {Any} property by path
   * @example obj = {a: {b: {c: {d: 42}}}}, get(obj, 'a.b.c.d') will return 42
   */
  get: (obj, path, defValue) => {
    if (!Array.isArray(path)) {
      path = path.split('.')
    }
    return path.reduce((acc, keypart, idx) => {
      if (idx === 0) {
        acc = obj[keypart]
      } else {
        acc = acc && acc[keypart] ? acc = acc[keypart] : defValue
      }
      return acc
    }, {})
  },
  /**
   * return reassembled object with keys when key can be reassigned from any source level to any destination level
   * @memberof ObjectManupula
   * @param {Object} obj source object
   * @param {String|Array} keys path, for example 'a.b.c.d', for reassign prop path must be in format 'oldPropPath->newPropPath'
   * @returns {Object}
   * @example src = {a: {b: {c: {d: 42}}}}, obj(src, ['a.b->b','a.b.c->c']) will return {b: {c: {d: 42}}, c: {d: 42}}
   */
  reassemble: (obj, paths) => paths.reduce((acc, path) => {
    let [oldKey, newKey] = path.split('->')
    if (newKey && oldKey) {
      acc = ObjectManupula._set({ src: acc, key: newKey, val: ObjectManupula.get(obj, oldKey), copy: false })
    } else {
      acc = ObjectManupula._set({ src: acc, key: path, val: ObjectManupula.get(obj, path), copy: false })
    }
    return acc
  }, {}),
  /**
   * @private
   */
  _set: ({src, key, val, copy}) => {
    let obj = copy ? Object.assign({}, src) : src
    if (!Array.isArray(key)) {
      key = key.split('.')
    }
    let firstKey = key.shift()
    if (key.length === 0) {
      obj[firstKey] = val
      return obj
    }
    let next = key.reduceRight((acc, keypart, idx) => {
      if (idx === key.length - 1) {
        acc = {}
        acc[keypart] = val
        return acc
      } else {
        let r = {}
        r[keypart] = acc
        acc = r
        return acc
      }
    }, {})
    return deepmerge(obj, {[firstKey]: next})
  },
  /**
   * set property value in object by path
   * @memberof ObjectManupula
   * @param {Object} src source object
   * @param {String} key path
   * @param {Any} val value
   * @returns modified source object
   */
  set: (src, key, val) => {
    return ObjectManupula._set({src, key, val})
  },
  /**
   * immutable!
   * return copied object where set property value in object by path
   * @memberof ObjectManupula
   * @param {Object} src source object
   * @param {String} key path
   * @param {Any} val value
   * @returns copy of modified source object
   */
  concat: (src, key, val) => {
    return ObjectManupula._set({src, key, val, copy: true})
  }
}

module.exports = ObjectManupula
