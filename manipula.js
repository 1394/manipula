'use strict'

const deepmerge = require('./deepmerge')

const Manupula = {
  get: {
    /**
     * key: get prop by path
     * @memberof Manupula
     * @param obj {Object} source object
     * @param path {String|Array} path, for example 'a.b.c.d'
     * @returns prop {Any} property by path
     * @example obj = {a: {b: {c: {d: 42}}}}, get(obj, 'a.b.c.d') will return 42
     */
    key: (obj, path, defValue) => {
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
    }
  },
  /**
   * @memberof Manupula
   * return reassembled object with keys when key can be reassigned from any source level to any destination level
   * @param obj {Object} source object
   * @param keys {String|Array} path, for example 'a.b.c.d', for reassign prop path must be in format 'oldPropPath->newPropPath'
   * @returns object
   * @example src = {a: {b: {c: {d: 42}}}}, obj(src, ['a.b->b','a.b.c->c']) will return {b: {c: {d: 42}}, c: {d: 42}}
   */
  reassemble: (obj, paths) => paths.reduce((acc, path) => {
    let [oldKey, newKey] = path.split('->')
    if (newKey && oldKey) {
      acc = Manupula._set.key({ src: acc, key: newKey, val: Manupula.get.key(obj, oldKey), copy: false })
    } else {
      acc = Manupula._set.key({ src: acc, key: path, val: Manupula.get.key(obj, path), copy: false })
    }
    return acc
  }, {}),
  _set: {
    key: ({src, key, val, copy}) => {
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
    }
  },
  /**
   * @memberof Manupula
   * set property value in object by path
   * @param src {Object} source object
   * @param key {String} path
   * @param val {Any} value
   * @returns modified source object
   */
  set: {
    key: (src, key, val) => {
      return Manupula._set.key({src, key, val})
    }
  },
  /**
   * @memberof Manupula
   * immutable!
   * return copied object where set property value in object by path
   * @param src {Object} source object
   * @param key {String} path
   * @param val {Any} value
   * @returns copy of modified source object
   */
  concat: {
    key: (src, key, val) => {
      return Manupula._set.key({src, key, val, copy: true})
    }
  }
}

module.exports = {
  object: Manupula
}
