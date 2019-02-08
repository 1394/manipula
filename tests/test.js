'use strict'

const mO = require('../manipula').object
const assert = require('assert')

const disp = (txt, res) => {
  console.log(`${txt} ... Ok\n`)
}

const src = {
  a: {
    b: {
      c: [1, 2, 3],
      d: {
        e: '234'
      }
    }
  }
}

const dst = {
  a: {
    b: {
      c: [1, 2, 3],
      d: {
        e: '234'
      }
    }
  },
  insertedProp: {
    c: [1, 2, 3],
    d: {
      e: '234'
    }
  }
}

const dst2 = {
  a: {
    b: {
      c: [1, 2, 3],
      d: {
        e: '234',
        insertedProp: {
          c: [1, 2, 3],
          d: {
            e: '234'
          }
        }
      }
    }
  }
}

const bSrc = {
  c: [1, 2, 3],
  d: {
    e: '234'
  }
}

// get methods
disp('mO.get.key path: string', assert.deepStrictEqual(
  mO.get.key(src, 'a.b'),
  bSrc)
)
disp('mO.get.key path: array', assert.deepStrictEqual(
  mO.get.key(src, ['a', 'b']),
  bSrc)
)
disp('mO.get.key defaultValue', assert.ok(mO.get.key(src, 'a.b1', 'defaultValue') === 'defaultValue'))

// concat methods
disp('mO.set.key root Merge', assert.deepStrictEqual(
  mO.concat.key(src, 'insertedProp', bSrc),
  dst)
)
disp('mO.set.key deep Merge', assert.deepStrictEqual(
  mO.concat.key(src, 'a.b.d.insertedProp', bSrc),
  dst2)
)

// reassemble
disp('mO.reassemble', assert.deepStrictEqual(
  mO.reassemble(src, ['a.b.c->arr', 'a.b.d.e->e']),
  {arr: [1, 2, 3], e: '234'}
))

console.dir(mO.reassemble(src, ['a.b.c->arr', 'a.b.d.e']), {depth: 10})
