'use strict';

const mO = require('..').object;
const mA = require('..').array;
const assert = require('assert');

const disp = (txt, res) => {
  console.log(`${txt} ... Ok\n`);
};

const arr = [
  {b: 23230},
  {a: 'a1', b: 23231},
  {a: 'a2', b: 23232},
  {a: 'a2', b: 23232},
  {a: 'a3', b: 23233},
  {a: 'a4', b: 23234},
];

const src = {
  a: {
    b: {
      c: [1, 2, 3],
      d: {
        e: '234',
      },
    },
  },
};

const dst = {
  a: {
    b: {
      c: [1, 2, 3],
      d: {
        e: '234',
      },
    },
  },
  insertedProp: {
    c: [1, 2, 3],
    d: {
      e: '234',
    },
  },
};

const dst2 = {
  a: {
    b: {
      c: [1, 2, 3],
      d: {
        e: '234',
        insertedProp: {
          c: [1, 2, 3],
          d: {
            e: '234',
          },
        },
      },
    },
  },
};

const bSrc = {
  c: [1, 2, 3],
  d: {
    e: '234',
  },
};

// get methods
disp('mO.get path: string', assert.deepStrictEqual(
  mO.get(src, 'a.b'),
  bSrc)
);
disp('mO.get path: array', assert.deepStrictEqual(
  mO.get(src, ['a', 'b']),
  bSrc)
);
disp('mO.get defaultValue', assert.ok(
  mO.get(src, 'a.b1', 'defaultValue') === 'defaultValue')
);

// concat methods
disp('mO.set root Merge', assert.deepStrictEqual(
  mO.concat(src, 'insertedProp', bSrc),
  dst)
);
disp('mO.set deep Merge', assert.deepStrictEqual(
  mO.concat(src, 'a.b.d.insertedProp', bSrc),
  dst2)
);

// reassemble
disp('mO.reassemble', assert.deepStrictEqual(
  mO.reassemble(src, ['a.b.c->arr', 'a.b.d.e->e']),
  {arr: [1, 2, 3], e: '234'}
));

// arrays
//  groupby
disp('mA.groupby', assert.deepStrictEqual(
  mA.groupby(arr, 'a'),
  {a1: [{a: 'a1', b: 23231}],
    a2: [{a: 'a2', b: 23232}, {a: 'a2', b: 23232}],
    a3: [{a: 'a3', b: 23233}],
    a4: [{a: 'a4', b: 23234}],
  }
));
disp('mA.groupby with def prop', assert.deepStrictEqual(
  mA.groupby(arr, 'a', {defProp: 'def'}),
  {def: [{b: 23230}],
    a1: [{a: 'a1', b: 23231}],
    a2: [{a: 'a2', b: 23232}, {a: 'a2', b: 23232}],
    a3: [{a: 'a3', b: 23233}],
    a4: [{a: 'a4', b: 23234}],
  }
));
//  indexby
disp('mA.indexby', assert.deepStrictEqual(
  mA.indexby(arr, 'a'),
  {a1: {a: 'a1', b: 23231},
    a2: {a: 'a2', b: 23232},
    a3: {a: 'a3', b: 23233},
    a4: {a: 'a4', b: 23234},
  }
));
disp('mA.indexby with def prop', assert.deepStrictEqual(
  mA.indexby(arr, 'a', {emptyProp: 'def'}),
  {def: [{b: 23230}],
    a1: {a: 'a1', b: 23231},
    a2: {a: 'a2', b: 23232},
    a3: {a: 'a3', b: 23233},
    a4: {a: 'a4', b: 23234},
  }
));
