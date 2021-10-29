/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@basementuniverse/commonjs/common.js":
/*!***********************************************************!*\
  !*** ./node_modules/@basementuniverse/commonjs/common.js ***!
  \***********************************************************/
/***/ ((module) => {

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 * @version 1.2.9
 */

/** @class Math */

/**
 * Check if two numbers are approximately equal
 * @param {number} a Number a
 * @param {number} b Number b
 * @param {number} [p=Number.EPSILON] The precision value
 * @return {boolean} True if numbers a and b are approximately equal
 */
Math.floatEquals = (a, b, p = Number.EPSILON) => Math.abs(a - b) < p;

/**
 * Clamp a number between min and max
 * @param {number} a The number to clamp
 * @param {number} [min=0] The minimum value
 * @param {number} [max=1] The maximum value
 * @return {number} A clamped number
 */
Math.clamp = (a, min = 0, max = 1) => a < min ? min : (a > max ? max : a);

/**
 * Get the fractional part of a number
 * @param {number} a The number from which to get the fractional part
 * @return {number} The fractional part of the number
 */
Math.frac = a => a >= 0 ? a - Math.floor(a) : a - Math.ceil(a);

/**
 * Do a linear interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} An interpolated value in the interval [a, b]
 */
Math.lerp = (a, b, i) => a + (b - a) * i;

/**
 * Get the position of i between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolated value in the interval [a, b]
 * @return {number} The position of i between a and b
 */
Math.unlerp = (a, b, i) => (i - a) / (b - a);

/**
 * Do a bilinear interpolation
 * @param {number} c00 Top-left value
 * @param {number} c10 Top-right value
 * @param {number} c01 Bottom-left value
 * @param {number} c11 Bottom-right value
 * @param {number} ix Interpolation value along x
 * @param {number} iy Interpolation value along y
 * @return {number} A bilinear interpolated value
 */
Math.blerp = (c00, c10, c01, c11, ix, iy) => Math.lerp(Math.lerp(c00, c10, ix), Math.lerp(c01, c11, ix), iy);

/**
 * Re-map a number i from range a1...a2 to b1...b2
 * @param {number} i The number to re-map
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 * @return {number}
 */
Math.remap = (i, a1, a2, b1, b2) => b1 + (i - a1) * (b2 - b1) / (a2 - a1);

/**
 * Do a smooth interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value
 * @return {number} An interpolated value in the interval [a, b]
 */
Math.smoothstep = (a, b, i) => Math.lerp(a, b, 3 * Math.pow(i, 2) - 2 * Math.pow(i, 3));

/**
 * Get an angle in radians
 * @param {number} degrees The angle in degrees
 * @return {number} The angle in radians
 */
Math.radians = degrees => (Math.PI / 180) * degrees;

/**
 * Get an angle in degrees
 * @param {number} radians The angle in radians
 * @return {number} The angle in degrees
 */
Math.degrees = radians => (180 / Math.PI) * radians;

/**
 * Get a random float in the interval [min, max)
 * @param {number} min Inclusive min
 * @param {number} max Exclusive max
 * @return {number} A random float in the interval [min, max)
 */
Math.randomBetween = (min, max) => Math.random() * (max - min) + min;

/**
 * Get a random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A random integer in the interval [min, max]
 */
Math.randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get a normally-distributed random number
 * @param {number} [mu=0.5] The mean value
 * @param {number} [sigma=0.5] The standard deviation
 * @param {number} [samples=2] The number of samples
 * @return {number} A normally-distributed random number
 */
Math.cltRandom = (mu = 0.5, sigma = 0.5, samples = 2) => {
  let total = 0;
  for (let i = samples; i--;) {
    total += Math.random();
  }
  return mu + (total - samples / 2) / (samples / 2) * sigma;
};

/**
 * Get a normally-distributed random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A normally-distributed random integer
 */
Math.cltRandomInt = (min, max) => Math.floor(min + Math.cltRandom(0.5, 0.5, 2) * (max + 1 - min));

/**
 * Return a weighted random integer
 * @param {Array<number>} w An array of weights
 * @return {number} An index from w
 */
Math.weightedRandom = w => {
  let total = w.reduce((a, i) => a + i, 0), n = 0;
  const r = Math.random() * total;
  while (total > r) {
    total -= w[n++];
  }
  return n - 1;
};

/**
 * An interpolation function
 * @callback interpolationCallback
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} The interpolated value in the interval [a, b]
 */

/**
 * Return an interpolated value from an array
 * @param {Array<number>} a An array of values interpolate
 * @param {number} i A number in the interval [0, 1]
 * @param {interpolationCallback} [f=Math.lerp] The interpolation function to use
 * @return {number} An interpolated value in the interval [min(a), max(a)]
 */
Math.lerpArray = (a, i, f = Math.lerp) => {
  const s = i * (a.length - 1);
  const p = Math.clamp(Math.trunc(s), 0, a.length - 1);
  return f(a[p] || 0, a[p + 1] || 0, Math.frac(s));
};

/**
 * Get the dot product of two vectors
 * @param {Array<number>} a Vector a
 * @param {Array<number>} b Vector b
 * @return {number} a ∙ b
 */
Math.dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);

/**
 * Get the factorial of a number
 * @param {number} a
 * @return {number} a!
 */
Math.factorial = a => {
  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
};

/**
 * Get the number of permutations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nPr
 */
Math.permutation = (n, r) => Math.factorial(n) / Math.factorial(n - r);

/**
 * Get the number of combinations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nCr
 */
Math.combination = (n, r) => Math.factorial(n) / (Math.factorial(r) * Math.factorial(n - r));

/** @class Array */

/**
 * A function for generating array values
 * @callback timesCallback
 * @param {number} i The array index
 * @return {*} The array value
 */

/**
 * Return a new array with length n by calling function f(i) on each element
 * @param {timesCallback} f
 * @param {number} n The size of the array
 * @return {Array<*>}
 */
Array.times = (f, n) => Array(n).fill(0).map((_, i) => f(i));

/**
 * Return an array containing numbers 0->(n - 1)
 * @param {number} n The size of the array
 * @return {Array<number>} An array of integers 0->(n - 1)
 */
Array.range = n => Array.times(i => i, n);

/**
 * Zip 2 arrays together, i.e. ([1, 2, 3], [a, b, c]) => [[1, a], [2, b], [3, c]]
 * @param {Array<*>} a
 * @param {Array<*>} b
 * @return {Array<Array<*>>}
 */
Array.zip = (a, b) => a.map((k, i) => [k, b[i]]);

/**
 * Return array[i] with positive and negative wrapping
 * @name at
 * @function
 * @memberof Array.prototype
 * @param {number} i The positively/negatively wrapped array index
 * @return {*} An element from the array
 */
Object.defineProperty(Array.prototype, 'at', {
  value: function (i) {
    const l = this.length;
    return this[i < 0 ? l - (Math.abs(i + 1) % l) - 1 : i % l];
  }
});

/**
 * Chop an array into chunks of size n
 * @name chunk
 * @function
 * @memberof Array.prototype
 * @param {number} n The chunk size
 * @return {Array<Array<*>>} An array of array chunks
 */
Object.defineProperty(Array.prototype, 'chunk', {
  value: function (n) {
    return Array.times(i => this.slice(i * n, i * n + n), Math.ceil(this.length / n));
  }
});

/**
 * Randomly shuffle an array in-place
 * @name shuffle
 * @function
 * @memberof Array.prototype
 * @return {Array<*>} The shuffled array
 */
Object.defineProperty(Array.prototype, 'shuffle', {
  value: function () {
    return this.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
  }
});

/**
 * A 2d vector
 * @typedef {Object} vec
 * @property {number} x The x component of the vector
 * @property {number} y The y component of the vector
 */

/**
 * Create a new vector
 * @param {number|vec} [x] The x component of the vector, or a vector to copy
 * @param {number} [y] The y component of the vector
 * @return {vec} A new vector
 * @example <caption>Various ways to initialise a vector</caption>
 * let a = vec(3, 2);  // (3, 2)
 * let b = vec(4);     // (4, 4)
 * let c = vec(a);     // (3, 2)
 * let d = vec();      // (0, 0)
 */
const vec = (x, y) => (!x && !y ?
  { x: 0, y: 0 } : (typeof x === 'object' ?
    { x: x.x || 0, y: x.y || 0 } : (y === null || y === undefined ?
      { x: x, y: x } : { x: x, y: y })
  )
);

/**
 * Get the components of a vector as an array
 * @param {vec} a The vector to get components from
 * @return {Array<number>} The vector components as an array
 */
vec.components = a => [a.x, a.y];

/**
 * Return a unit vector (1, 0)
 * @return {vec} A unit vector (1, 0)
 */
vec.ux = () => vec(1, 0);

/**
 * Return a unit vector (0, 1)
 * @return {vec} A unit vector (0, 1)
 */
vec.uy = () => vec(0, 1);

/**
 * Add vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a + b
 */
vec.add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

/**
 * Scale a vector
 * @param {vec} a Vector a
 * @param {number} b Scalar b
 * @return {vec} a * b
 */
vec.mul = (a, b) => ({ x: a.x * b, y: a.y * b });

/**
 * Subtract vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a - b
 */
vec.sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });

/**
 * Get the length of a vector
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.len = a => Math.sqrt(a.x * a.x + a.y * a.y);

/**
 * Get the length of a vector using taxicab geometry
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.manhattan = a => Math.abs(a.x) + Math.abs(a.y);

/**
 * Normalise a vector
 * @param {vec} a The vector to normalise
 * @return {vec} ^a
 */
vec.nor = a => {
  let len = vec.len(a);
  return len ? { x: a.x / len, y: a.y / len } : vec();
};

/**
 * Get a dot product of vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {number} a ∙ b
 */
vec.dot = (a, b) => a.x * b.x + a.y * b.y;

/**
 * Rotate a vector by r radians
 * @param {vec} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec} A rotated vector
 */
vec.rot = (a, r) => {
  let s = Math.sin(r),
    c = Math.cos(r);
  return { x: c * a.x - s * a.y, y: s * a.x + c * a.y };
}

/**
 * Check if two vectors are equal
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {boolean} True if vectors a and b are equal, false otherwise
 */
vec.eq = (a, b) => a.x === b.x && a.y === b.y;

/**
 * Get the angle of a vector
 * @param {vec} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec.rad = a => Math.atan2(a.y, a.x);

/**
 * Copy a vector
 * @param {vec} a The vector to copy
 * @return {vec} A copy of vector a
 */
vec.cpy = a => vec(a);

/**
 * A function to call on each component of a vector
 * @callback vectorMapCallback
 * @param {number} value The component value
 * @param {'x' | 'y'} label The component label (x or y)
 * @return {number} The mapped component
 */

/**
 * Call a function on each component of a vector and build a new vector from the results
 * @param {vec} a Vector a
 * @param {vectorMapCallback} f The function to call on each component of the vector
 * @return {vec} Vector a mapped through f
 */
vec.map = (a, f) => ({ x: f(a.x, 'x'), y: f(a.y, 'y') });

/**
 * Convert a vector into a string
 * @param {vec} a The vector to convert
 * @param {string} [s=', '] The separator string
 * @return {string} A string representation of the vector
 */
vec.str = (a, s = ', ') => `${a.x}${s}${a.y}`;

/**
 * A matrix
 * @typedef {Object} mat
 * @property {number} m The number of rows in the matrix
 * @property {number} n The number of columns in the matrix
 * @property {Array<number>} entries The matrix values
 */

/**
 * Create a new matrix
 * @param {number} [m=4] The number of rows
 * @param {number} [n=4] The number of columns
 * @param {Array<number>} [entries=[]] Matrix values in reading order
 * @return {mat} A new matrix
 */
const mat = (m = 4, n = 4, entries = []) => ({
  m, n,
  entries: entries.concat(Array(m * n).fill(0)).slice(0, m * n)
});

/**
 * Get an identity matrix of size n
 * @param {number} n The size of the matrix
 * @return {mat} An identity matrix
 */
mat.identity = n => mat(n, n, Array(n * n).fill(0).map((v, i) => +(Math.floor(i / n) === i % n)));

/**
 * Get an entry from a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {number} The value at position (i, j) in matrix a
 */
mat.get = (a, i, j) => a.entries[(j - 1) + (i - 1) * a.n];

/**
 * Set an entry of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @param {number} v The value to set in matrix a
 */
mat.set = (a, i, j, v) => { a.entries[(j - 1) + (i - 1) * a.n] = v; };

/**
 * Get a row from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} m The row offset
 * @return {Array<number>} Row m from matrix a
 */
mat.row = (a, m) => {
  const s = (m - 1) * a.n;
  return a.entries.slice(s, s + a.n);
};

/**
 * Get a column from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} n The column offset
 * @return {Array<number>} Column n from matrix a
 */
mat.col = (a, n) => Array.times(i => mat.get(a, (i + 1), n), a.m);

/**
 * Add matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a + b
 */
mat.add = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v + b.entries[i]);

/**
 * Subtract matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a - b
 */
mat.sub = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v - b.entries[i]);

/**
 * Multiply matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat|boolean} ab or false if the matrices cannot be multiplied
 */
mat.mul = (a, b) => {
  if (a.n !== b.m) { return false; }
  const result = mat(a.m, b.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= b.n; j++) {
      mat.set(result, i, j, Math.dot(mat.row(a, i), mat.col(b, j)));
    }
  }
  return result;
};

/**
 * Scale a matrix
 * @param {mat} a Matrix a
 * @param {number} b Scalar b
 * @return {mat} a * b
 */
mat.scale = (a, b) => mat.map(a, v => v * b);

/**
 * Transpose a matrix
 * @param {mat} a The matrix to transpose
 * @return {mat} A transposed matrix
 */
mat.trans = a => mat(a.n, a.m, Array.times(i => mat.col(a, (i + 1)), a.n).flat());

/**
 * Get the minor of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {mat|boolean} The (i, j) minor of matrix a or false if the matrix is not square
 */
mat.minor = (a, i, j) => {
  if (a.m !== a.n) { return false; }
  const entries = [];
  for (let ii = 1; ii <= a.m; ii++) {
    if (ii === i) { continue; }
    for (let jj = 1; jj <= a.n; jj++) {
      if (jj === j) { continue; }
      entries.push(mat.get(a, ii, jj));
    }
  }
  return mat(a.m - 1, a.n - 1, entries);
};

/**
 * Get the determinant of a matrix
 * @param {mat} a Matrix a
 * @return {number|boolean} |a| or false if the matrix is not square
 */
mat.det = a => {
  if (a.m !== a.n) { return false; }
  if (a.m === 1) {
    return a.entries[0];
  }
  if (a.m === 2) {
    return a.entries[0] * a.entries[3] - a.entries[1] * a.entries[2];
  }
  let total = 0, sign = 1;
  for (let j = 1; j <= a.n; j++) {
    total += sign * a.entries[j - 1] * mat.det(mat.minor(a, 1, j));
    sign *= -1;
  }
  return total;
};

/**
 * Normalise a matrix
 * @param {mat} a The matrix to normalise
 * @return {mat|boolean} ^a or false if the matrix is not square
 */
mat.nor = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  return mat.map(a, i => i * d);
};

/**
 * Get the adjugate of a matrix
 * @param {mat} a The matrix from which to get the adjugate
 * @return {mat} The adjugate of a
 */
mat.adj = a => {
  const minors = mat(a.m, a.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= a.n; j++) {
      mat.set(minors, i, j, mat.det(mat.minor(a, i, j)));
    }
  }
  const cofactors = mat.map(minors, (v, i) => v * (i % 2 ? -1 : 1));
  return mat.trans(cofactors);
};

/**
 * Get the inverse of a matrix
 * @param {mat} a The matrix to invert
 * @return {mat|boolean} a^-1 or false if the matrix has no inverse
 */
mat.inv = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  if (d === 0) { return false; }
  return mat.scale(mat.adj(a), 1 / d);
};

/**
 * Check if two matrices are equal
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {boolean} True if matrices a and b are identical, false otherwise
 */
mat.eq = (a, b) => a.m === b.m && a.n === b.n && mat.str(a) === mat.str(b);

/**
 * Copy a matrix
 * @param {mat} a The matrix to copy
 * @return {mat} A copy of matrix a
 */
mat.cpy = a => mat(a.m, a.n, [...a.entries]);

/**
 * A function to call on each entry of a matrix
 * @callback matrixMapCallback
 * @param {number} value The entry value
 * @param {number} index The entry index
 * @param {Array<number>} entries The array of matrix entries
 * @return {number} The mapped entry
 */

/**
 * Call a function on each entry of a matrix and build a new matrix from the results
 * @param {mat} a Matrix a
 * @param {matrixMapCallback} f The function to call on each entry of the matrix
 * @return {mat} Matrix a mapped through f
 */
mat.map = (a, f) => mat(a.m, a.n, a.entries.map(f));

/**
 * Convert a matrix into a string
 * @param {mat} a The matrix to convert
 * @param {string} [ms=', '] The separator string for columns
 * @param {string} [ns='\n'] The separator string for rows
 * @return {string} A string representation of the matrix
 */
mat.str = (a, ms = ', ', ns = '\n') => a.entries.chunk(a.n).map(r => r.join(ms)).join(ns);

if (true) {
  module.exports = { vec, mat };
}


/***/ }),

/***/ "./node_modules/ajv/dist/ajv.js":
/*!**************************************!*\
  !*** ./node_modules/ajv/dist/ajv.js ***!
  \**************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/core.js");
const draft7_1 = __webpack_require__(/*! ./vocabularies/draft7 */ "./node_modules/ajv/dist/vocabularies/draft7.js");
const discriminator_1 = __webpack_require__(/*! ./vocabularies/discriminator */ "./node_modules/ajv/dist/vocabularies/discriminator/index.js");
const draft7MetaSchema = __webpack_require__(/*! ./refs/json-schema-draft-07.json */ "./node_modules/ajv/dist/refs/json-schema-draft-07.json");
const META_SUPPORT_DATA = ["/properties"];
const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
class Ajv extends core_1.default {
    _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
            this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
            return;
        const metaSchema = this.opts.$data
            ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA)
            : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
        return (this.opts.defaultMeta =
            super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : undefined));
    }
}
module.exports = exports = Ajv;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Ajv;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
//# sourceMappingURL=ajv.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/code.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/code.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.regexpCode = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
class _CodeOrName {
}
exports._CodeOrName = _CodeOrName;
exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
class Name extends _CodeOrName {
    constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
            throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        return false;
    }
    get names() {
        return { [this.str]: 1 };
    }
}
exports.Name = Name;
class _Code extends _CodeOrName {
    constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
    }
    toString() {
        return this.str;
    }
    emptyStr() {
        if (this._items.length > 1)
            return false;
        const item = this._items[0];
        return item === "" || item === '""';
    }
    get str() {
        var _a;
        return ((_a = this._str) !== null && _a !== void 0 ? _a : (this._str = this._items.reduce((s, c) => `${s}${c}`, "")));
    }
    get names() {
        var _a;
        return ((_a = this._names) !== null && _a !== void 0 ? _a : (this._names = this._items.reduce((names, c) => {
            if (c instanceof Name)
                names[c.str] = (names[c.str] || 0) + 1;
            return names;
        }, {})));
    }
}
exports._Code = _Code;
exports.nil = new _Code("");
function _(strs, ...args) {
    const code = [strs[0]];
    let i = 0;
    while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
    }
    return new _Code(code);
}
exports._ = _;
const plus = new _Code("+");
function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
}
exports.str = str;
function addCodeArg(code, arg) {
    if (arg instanceof _Code)
        code.push(...arg._items);
    else if (arg instanceof Name)
        code.push(arg);
    else
        code.push(interpolate(arg));
}
exports.addCodeArg = addCodeArg;
function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
        if (expr[i] === plus) {
            const res = mergeExprItems(expr[i - 1], expr[i + 1]);
            if (res !== undefined) {
                expr.splice(i - 1, 3, res);
                continue;
            }
            expr[i++] = "+";
        }
        i++;
    }
}
function mergeExprItems(a, b) {
    if (b === '""')
        return a;
    if (a === '""')
        return b;
    if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
            return;
        if (typeof b != "string")
            return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
            return a.slice(0, -1) + b.slice(1);
        return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
    return;
}
function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str `${c1}${c2}`;
}
exports.strConcat = strConcat;
// TODO do not allow arrays here
function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null
        ? x
        : safeStringify(Array.isArray(x) ? x.join(",") : x);
}
function stringify(x) {
    return new _Code(safeStringify(x));
}
exports.stringify = stringify;
function safeStringify(x) {
    return JSON.stringify(x)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
exports.safeStringify = safeStringify;
function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _ `[${key}]`;
}
exports.getProperty = getProperty;
function regexpCode(rx) {
    return new _Code(rx.toString());
}
exports.regexpCode = regexpCode;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
const scope_1 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
var code_2 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return code_2._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return code_2.str; } }));
Object.defineProperty(exports, "strConcat", ({ enumerable: true, get: function () { return code_2.strConcat; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return code_2.nil; } }));
Object.defineProperty(exports, "getProperty", ({ enumerable: true, get: function () { return code_2.getProperty; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return code_2.stringify; } }));
Object.defineProperty(exports, "regexpCode", ({ enumerable: true, get: function () { return code_2.regexpCode; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return code_2.Name; } }));
var scope_2 = __webpack_require__(/*! ./scope */ "./node_modules/ajv/dist/compile/codegen/scope.js");
Object.defineProperty(exports, "Scope", ({ enumerable: true, get: function () { return scope_2.Scope; } }));
Object.defineProperty(exports, "ValueScope", ({ enumerable: true, get: function () { return scope_2.ValueScope; } }));
Object.defineProperty(exports, "ValueScopeName", ({ enumerable: true, get: function () { return scope_2.ValueScopeName; } }));
Object.defineProperty(exports, "varKinds", ({ enumerable: true, get: function () { return scope_2.varKinds; } }));
exports.operators = {
    GT: new code_1._Code(">"),
    GTE: new code_1._Code(">="),
    LT: new code_1._Code("<"),
    LTE: new code_1._Code("<="),
    EQ: new code_1._Code("==="),
    NEQ: new code_1._Code("!=="),
    NOT: new code_1._Code("!"),
    OR: new code_1._Code("||"),
    AND: new code_1._Code("&&"),
    ADD: new code_1._Code("+"),
};
class Node {
    optimizeNodes() {
        return this;
    }
    optimizeNames(_names, _constants) {
        return this;
    }
}
class Def extends Node {
    constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
    }
    render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (!names[this.name.str])
            return;
        if (this.rhs)
            this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
    }
}
class Assign extends Node {
    constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
    }
    render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
            return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
    }
    get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
    }
}
class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
    }
    render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
}
class Label extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        return `${this.label}:` + _n;
    }
}
class Break extends Node {
    constructor(label) {
        super();
        this.label = label;
        this.names = {};
    }
    render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
    }
}
class Throw extends Node {
    constructor(error) {
        super();
        this.error = error;
    }
    render({ _n }) {
        return `throw ${this.error};` + _n;
    }
    get names() {
        return this.error.names;
    }
}
class AnyCode extends Node {
    constructor(code) {
        super();
        this.code = code;
    }
    render({ _n }) {
        return `${this.code};` + _n;
    }
    optimizeNodes() {
        return `${this.code}` ? this : undefined;
    }
    optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
    }
    get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
    }
}
class ParentNode extends Node {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
    }
    optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            const n = nodes[i].optimizeNodes();
            if (Array.isArray(n))
                nodes.splice(i, 1, ...n);
            else if (n)
                nodes[i] = n;
            else
                nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
            // iterating backwards improves 1-pass optimization
            const n = nodes[i];
            if (n.optimizeNames(names, constants))
                continue;
            subtractNames(names, n.names);
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : undefined;
    }
    get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
    }
}
class BlockNode extends ParentNode {
    render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
    }
}
class Root extends ParentNode {
}
class Else extends BlockNode {
}
Else.kind = "else";
class If extends BlockNode {
    constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
    }
    render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
            code += "else " + this.else.render(opts);
        return code;
    }
    optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
            return this.nodes; // else is ignored here
        let e = this.else;
        if (e) {
            const ns = e.optimizeNodes();
            e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
            if (cond === false)
                return e instanceof If ? e : e.nodes;
            if (this.nodes.length)
                return this;
            return new If(not(cond), e instanceof If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
            return undefined;
        return this;
    }
    optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
            return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
            addNames(names, this.else.names);
        return names;
    }
}
If.kind = "if";
class For extends BlockNode {
}
For.kind = "for";
class ForLoop extends For {
    constructor(iteration) {
        super();
        this.iteration = iteration;
    }
    render(opts) {
        return `for(${this.iteration})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iteration.names);
    }
}
class ForRange extends For {
    constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
    }
    render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
    }
    get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
    }
}
class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
    }
    render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
    }
    optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
            return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
    }
    get names() {
        return addNames(super.names, this.iterable.names);
    }
}
class Func extends BlockNode {
    constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
    }
    render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
    }
}
Func.kind = "func";
class Return extends ParentNode {
    render(opts) {
        return "return " + super.render(opts);
    }
}
Return.kind = "return";
class Try extends BlockNode {
    render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
            code += this.catch.render(opts);
        if (this.finally)
            code += this.finally.render(opts);
        return code;
    }
    optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
    }
    optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
    }
    get names() {
        const names = super.names;
        if (this.catch)
            addNames(names, this.catch.names);
        if (this.finally)
            addNames(names, this.finally.names);
        return names;
    }
}
class Catch extends BlockNode {
    constructor(error) {
        super();
        this.error = error;
    }
    render(opts) {
        return `catch(${this.error})` + super.render(opts);
    }
}
Catch.kind = "catch";
class Finally extends BlockNode {
    render(opts) {
        return "finally" + super.render(opts);
    }
}
Finally.kind = "finally";
class CodeGen {
    constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
    }
    toString() {
        return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(prefix) {
        return this._scope.name(prefix);
    }
    // reserves unique name in the external scope
    scopeName(prefix) {
        return this._extScope.name(prefix);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
        vs.add(name);
        return name;
    }
    getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
        return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== undefined && constant)
            this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
    }
    // `const` declaration (`var` in es5 mode)
    const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    // `var` declaration with optional assignment
    var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    // assignment code
    assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    // `+=` code
    add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    // appends passed SafeExpr to code or executes Block
    code(c) {
        if (typeof c == "function")
            c();
        else if (c !== code_1.nil)
            this._leafNode(new AnyCode(c));
        return this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
            if (code.length > 1)
                code.push(",");
            code.push(key);
            if (key !== value || this.opts.es5) {
                code.push(":");
                (0, code_1.addCodeArg)(code, value);
            }
        }
        code.push("}");
        return new code_1._Code(code);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
            this.code(thenBody).else().code(elseBody).endIf();
        }
        else if (thenBody) {
            this.code(thenBody).endIf();
        }
        else if (elseBody) {
            throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(condition) {
        return this._elseNode(new If(condition));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
        return this._elseNode(new Else());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
        return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
            this.code(forBody).endFor();
        return this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
    }
    // `for` statement for a range of values
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
            const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
            return this.forRange("_i", 0, (0, code_1._) `${arr}.length`, (i) => {
                this.var(name, (0, code_1._) `${arr}[${i}]`);
                forBody(name);
            });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
            return this.forOf(nameOrPrefix, (0, code_1._) `Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    // end `for` loop
    endFor() {
        return this._endBlockNode(For);
    }
    // `label` statement
    label(label) {
        return this._leafNode(new Label(label));
    }
    // `break` statement
    break(label) {
        return this._leafNode(new Break(label));
    }
    // `return` statement
    return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
            throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
    }
    // `try` statement
    try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
            throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
            const error = this.name("e");
            this._currNode = node.catch = new Catch(error);
            catchCode(error);
        }
        if (finallyCode) {
            this._currNode = node.finally = new Finally();
            this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
    }
    // `throw` statement
    throw(error) {
        return this._leafNode(new Throw(error));
    }
    // start self-balancing block
    block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
            this.code(body).endBlock(nodeCount);
        return this;
    }
    // end the current self-balancing block
    endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === undefined)
            throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || (nodeCount !== undefined && toClose !== nodeCount)) {
            throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
            this.code(funcBody).endFunc();
        return this;
    }
    // end function definition
    endFunc() {
        return this._endBlockNode(Func);
    }
    optimize(n = 1) {
        while (n-- > 0) {
            this._root.optimizeNodes();
            this._root.optimizeNames(this._root.names, this._constants);
        }
    }
    _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
    }
    _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || (N2 && n instanceof N2)) {
            this._nodes.pop();
            return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
            throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
    }
    get _root() {
        return this._nodes[0];
    }
    get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
    }
    set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
    }
}
exports.CodeGen = CodeGen;
function addNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
    return names;
}
function addExprNames(names, from) {
    return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
}
function optimizeExpr(expr, names, constants) {
    if (expr instanceof code_1.Name)
        return replaceName(expr);
    if (!canOptimize(expr))
        return expr;
    return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
            c = replaceName(c);
        if (c instanceof code_1._Code)
            items.push(...c._items);
        else
            items.push(c);
        return items;
    }, []));
    function replaceName(n) {
        const c = constants[n.str];
        if (c === undefined || names[n.str] !== 1)
            return n;
        delete names[n.str];
        return c;
    }
    function canOptimize(e) {
        return (e instanceof code_1._Code &&
            e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== undefined));
    }
}
function subtractNames(names, from) {
    for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
}
function not(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._) `!${par(x)}`;
}
exports.not = not;
const andCode = mappend(exports.operators.AND);
// boolean AND (&&) expression with the passed arguments
function and(...args) {
    return args.reduce(andCode);
}
exports.and = and;
const orCode = mappend(exports.operators.OR);
// boolean OR (||) expression with the passed arguments
function or(...args) {
    return args.reduce(orCode);
}
exports.or = or;
function mappend(op) {
    return (x, y) => (x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._) `${par(x)} ${op} ${par(y)}`);
}
function par(x) {
    return x instanceof code_1.Name ? x : (0, code_1._) `(${x})`;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/codegen/scope.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/codegen/scope.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
const code_1 = __webpack_require__(/*! ./code */ "./node_modules/ajv/dist/compile/codegen/code.js");
class ValueError extends Error {
    constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
    }
}
var UsedValueState;
(function (UsedValueState) {
    UsedValueState[UsedValueState["Started"] = 0] = "Started";
    UsedValueState[UsedValueState["Completed"] = 1] = "Completed";
})(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
exports.varKinds = {
    const: new code_1.Name("const"),
    let: new code_1.Name("let"),
    var: new code_1.Name("var"),
};
class Scope {
    constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
    }
    toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
        return new code_1.Name(this._newName(prefix));
    }
    _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || (this._prefixes && !this._prefixes.has(prefix))) {
            throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return (this._names[prefix] = { prefix, index: 0 });
    }
}
exports.Scope = Scope;
class ValueScopeName extends code_1.Name {
    constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._) `.${new code_1.Name(property)}[${itemIndex}]`;
    }
}
exports.ValueScopeName = ValueScopeName;
const line = (0, code_1._) `\n`;
class ValueScope extends Scope {
    constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
    }
    get() {
        return this._scope;
    }
    name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
        var _a;
        if (value.ref === undefined)
            throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
            const _name = vs.get(valueKey);
            if (_name)
                return _name;
        }
        else {
            vs = this._values[prefix] = new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
    }
    getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
            return;
        return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
            if (name.scopePath === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return (0, code_1._) `${scopeName}${name.scopePath}`;
        });
    }
    scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
            if (name.value === undefined)
                throw new Error(`CodeGen: name "${name}" has no value`);
            return name.value.code;
        }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
            const vs = values[prefix];
            if (!vs)
                continue;
            const nameSet = (usedValues[prefix] = usedValues[prefix] || new Map());
            vs.forEach((name) => {
                if (nameSet.has(name))
                    return;
                nameSet.set(name, UsedValueState.Started);
                let c = valueCode(name);
                if (c) {
                    const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
                    code = (0, code_1._) `${code}${def} ${name} = ${c};${this.opts._n}`;
                }
                else if ((c = getCode === null || getCode === void 0 ? void 0 : getCode(name))) {
                    code = (0, code_1._) `${code}${c}${this.opts._n}`;
                }
                else {
                    throw new ValueError(name);
                }
                nameSet.set(name, UsedValueState.Completed);
            });
        }
        return code;
    }
}
exports.ValueScope = ValueScope;
//# sourceMappingURL=scope.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/errors.js":
/*!*************************************************!*\
  !*** ./node_modules/ajv/dist/compile/errors.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
exports.keywordError = {
    message: ({ keyword }) => (0, codegen_1.str) `must pass "${keyword}" keyword validation`,
};
exports.keyword$DataError = {
    message: ({ keyword, schemaType }) => schemaType
        ? (0, codegen_1.str) `"${keyword}" keyword must be ${schemaType} ($data)`
        : (0, codegen_1.str) `"${keyword}" keyword is invalid ($data)`,
};
function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : (compositeRule || allErrors)) {
        addError(gen, errObj);
    }
    else {
        returnErrors(it, (0, codegen_1._) `[${errObj}]`);
    }
}
exports.reportError = reportError;
function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
    }
}
exports.reportExtraError = reportExtraError;
function resetErrorsCount(gen, errsCount) {
    gen.assign(names_1.default.errors, errsCount);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._) `${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
}
exports.resetErrorsCount = resetErrorsCount;
function extendErrors({ gen, keyword, schemaValue, data, errsCount, it, }) {
    /* istanbul ignore if */
    if (errsCount === undefined)
        throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._) `${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._) `${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._) `${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._) `${err}.schemaPath`, (0, codegen_1.str) `${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
            gen.assign((0, codegen_1._) `${err}.schema`, schemaValue);
            gen.assign((0, codegen_1._) `${err}.data`, data);
        }
    });
}
exports.extendErrors = extendErrors;
function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_1._) `${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._) `[${err}]`), (0, codegen_1._) `${names_1.default.vErrors}.push(${err})`);
    gen.code((0, codegen_1._) `${names_1.default.errors}++`);
}
function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
        gen.throw((0, codegen_1._) `new ${it.ValidationError}(${errs})`);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, errs);
        gen.return(false);
    }
}
const E = {
    keyword: new codegen_1.Name("keyword"),
    schemaPath: new codegen_1.Name("schemaPath"),
    params: new codegen_1.Name("params"),
    propertyName: new codegen_1.Name("propertyName"),
    message: new codegen_1.Name("message"),
    schema: new codegen_1.Name("schema"),
    parentSchema: new codegen_1.Name("parentSchema"),
};
function errorObjectCode(cxt, error, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
        return (0, codegen_1._) `{}`;
    return errorObject(cxt, error, errorPaths);
}
function errorObject(cxt, error, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths),
    ];
    extraErrorProps(cxt, error, keyValues);
    return gen.object(...keyValues);
}
function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath
        ? (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}`
        : errorPath;
    return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
}
function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str) `${errSchemaPath}/${keyword}`;
    if (schemaPath) {
        schPath = (0, codegen_1.str) `${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
}
function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword, data, schemaValue, it } = cxt;
    const { opts, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._) `{}`]);
    if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._) `${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
    }
    if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/index.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const validation_error_1 = __webpack_require__(/*! ../runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const names_1 = __webpack_require__(/*! ./names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const validate_1 = __webpack_require__(/*! ./validate */ "./node_modules/ajv/dist/compile/validate/index.js");
const URI = __webpack_require__(/*! uri-js */ "./node_modules/uri-js/dist/es5/uri.all.js");
class SchemaEnv {
    constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
            schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
    }
}
exports.SchemaEnv = SchemaEnv;
// let codeSize = 0
// let nodeCount = 0
// Compiles schema in SchemaEnv
function compileSchema(sch) {
    // TODO refactor - remove compilations
    const _sch = getCompilingSchema.call(this, sch);
    if (_sch)
        return _sch;
    const rootId = (0, resolve_1.getFullPath)(sch.root.baseId); // TODO if getFullPath removed 1 tests fails
    const { es5, lines } = this.opts.code;
    const { ownProperties } = this.opts;
    const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
    let _ValidationError;
    if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
            ref: validation_error_1.default,
            code: (0, codegen_1._) `require("ajv/dist/runtime/validation_error").default`,
        });
    }
    const validateName = gen.scopeName("validate");
    sch.validateName = validateName;
    const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true
            ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) }
            : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._) `""`,
        opts: this.opts,
        self: this,
    };
    let sourceCode;
    try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        // gen.optimize(1)
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        // console.log((codeSize += sourceCode.length), (nodeCount += gen.nodeCount))
        if (this.opts.code.process)
            sourceCode = this.opts.code.process(sourceCode, sch);
        // console.log("\n\n\n *** \n", sourceCode)
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
            validate.$async = true;
        if (this.opts.code.source === true) {
            validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
            const { props, items } = schemaCxt;
            validate.evaluated = {
                props: props instanceof codegen_1.Name ? undefined : props,
                items: items instanceof codegen_1.Name ? undefined : items,
                dynamicProps: props instanceof codegen_1.Name,
                dynamicItems: items instanceof codegen_1.Name,
            };
            if (validate.source)
                validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
    }
    catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
            this.logger.error("Error compiling schema, function code:", sourceCode);
        // console.log("\n\n\n *** \n", sourceCode, this.opts)
        throw e;
    }
    finally {
        this._compilations.delete(sch);
    }
}
exports.compileSchema = compileSchema;
function resolveRef(root, baseId, ref) {
    var _a;
    ref = (0, resolve_1.resolveUrl)(baseId, ref);
    const schOrFunc = root.refs[ref];
    if (schOrFunc)
        return schOrFunc;
    let _sch = resolve.call(this, root, ref);
    if (_sch === undefined) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref]; // TODO maybe localRefs should hold SchemaEnv
        const { schemaId } = this.opts;
        if (schema)
            _sch = new SchemaEnv({ schema, schemaId, root, baseId });
    }
    if (_sch === undefined)
        return;
    return (root.refs[ref] = inlineOrCompile.call(this, _sch));
}
exports.resolveRef = resolveRef;
function inlineOrCompile(sch) {
    if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
    return sch.validate ? sch : compileSchema.call(this, sch);
}
// Index of schema compilation in the currently compiled list
function getCompilingSchema(schEnv) {
    for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
            return sch;
    }
}
exports.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
    return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
// resolve and compile the references ($ref)
// TODO returns AnySchemaObject (if the schema can be inlined) or validation function
function resolve(root, // information about the root schema for the current schema
ref // reference to resolve
) {
    let sch;
    while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
    return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
}
// Resolve schema, its root and baseId
function resolveSchema(root, // root object with properties schema, refs TODO below SchemaEnv is assigned to it
ref // reference to resolve
) {
    const p = URI.parse(ref);
    const refPath = (0, resolve_1._getFullPath)(p);
    let baseId = (0, resolve_1.getFullPath)(root.baseId);
    // TODO `Object.keys(root.schema).length > 0` should not be needed - but removing breaks 2 tests
    if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
    }
    const id = (0, resolve_1.normalizeId)(refPath);
    const schOrRef = this.refs[id] || this.schemas[id];
    if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
            return;
        return getJsonPointer.call(this, p, sch);
    }
    if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
    if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
    if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
            baseId = (0, resolve_1.resolveUrl)(baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
    }
    return getJsonPointer.call(this, p, schOrRef);
}
exports.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions",
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
    var _a;
    if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
    for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
            return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === undefined)
            return;
        schema = partSchema;
        // TODO PREVENT_SCOPE_CHANGE could be defined in keyword def?
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
            baseId = (0, resolve_1.resolveUrl)(baseId, schId);
        }
    }
    let env;
    if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
    }
    // even though resolution failed we need to return SchemaEnv to throw exception
    // so that compileAsync loads missing schema.
    const { schemaId } = this.opts;
    env = env || new SchemaEnv({ schema, schemaId, root, baseId });
    if (env.schema !== env.root.schema)
        return env;
    return undefined;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/names.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/names.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names = {
    // validation function arguments
    data: new codegen_1.Name("data"),
    // args passed from referencing schema
    valCxt: new codegen_1.Name("valCxt"),
    instancePath: new codegen_1.Name("instancePath"),
    parentData: new codegen_1.Name("parentData"),
    parentDataProperty: new codegen_1.Name("parentDataProperty"),
    rootData: new codegen_1.Name("rootData"),
    dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
    // function scoped variables
    vErrors: new codegen_1.Name("vErrors"),
    errors: new codegen_1.Name("errors"),
    this: new codegen_1.Name("this"),
    // "globals"
    self: new codegen_1.Name("self"),
    scope: new codegen_1.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new codegen_1.Name("json"),
    jsonPos: new codegen_1.Name("jsonPos"),
    jsonLen: new codegen_1.Name("jsonLen"),
    jsonPart: new codegen_1.Name("jsonPart"),
};
exports["default"] = names;
//# sourceMappingURL=names.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/ref_error.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/compile/ref_error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const resolve_1 = __webpack_require__(/*! ./resolve */ "./node_modules/ajv/dist/compile/resolve.js");
class MissingRefError extends Error {
    constructor(baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(this.missingRef));
    }
}
exports["default"] = MissingRefError;
//# sourceMappingURL=ref_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/resolve.js":
/*!**************************************************!*\
  !*** ./node_modules/ajv/dist/compile/resolve.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/ajv/dist/compile/util.js");
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
const traverse = __webpack_require__(/*! json-schema-traverse */ "./node_modules/json-schema-traverse/index.js");
const URI = __webpack_require__(/*! uri-js */ "./node_modules/uri-js/dist/es5/uri.all.js");
// TODO refactor to use keyword definitions
const SIMPLE_INLINED = new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const",
]);
function inlineRef(schema, limit = true) {
    if (typeof schema == "boolean")
        return true;
    if (limit === true)
        return !hasRef(schema);
    if (!limit)
        return false;
    return countKeys(schema) <= limit;
}
exports.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor",
]);
function hasRef(schema) {
    for (const key in schema) {
        if (REF_KEYWORDS.has(key))
            return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
            return true;
        if (typeof sch == "object" && hasRef(sch))
            return true;
    }
    return false;
}
function countKeys(schema) {
    let count = 0;
    for (const key in schema) {
        if (key === "$ref")
            return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
            continue;
        if (typeof schema[key] == "object") {
            (0, util_1.eachItem)(schema[key], (sch) => (count += countKeys(sch)));
        }
        if (count === Infinity)
            return Infinity;
    }
    return count;
}
function getFullPath(id = "", normalize) {
    if (normalize !== false)
        id = normalizeId(id);
    const p = URI.parse(id);
    return _getFullPath(p);
}
exports.getFullPath = getFullPath;
function _getFullPath(p) {
    return URI.serialize(p).split("#")[0] + "#";
}
exports._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id) {
    return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
}
exports.normalizeId = normalizeId;
function resolveUrl(baseId, id) {
    id = normalizeId(id);
    return URI.resolve(baseId, id);
}
exports.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
    if (typeof schema == "boolean")
        return {};
    const { schemaId } = this.opts;
    const schId = normalizeId(schema[schemaId] || baseId);
    const baseIds = { "": schId };
    const pathPrefix = getFullPath(schId, false);
    const localRefs = {};
    const schemaRefs = new Set();
    traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === undefined)
            return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
            baseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId;
        function addRef(ref) {
            ref = normalizeId(baseId ? URI.resolve(baseId, ref) : ref);
            if (schemaRefs.has(ref))
                throw ambiguos(ref);
            schemaRefs.add(ref);
            let schOrRef = this.refs[ref];
            if (typeof schOrRef == "string")
                schOrRef = this.refs[schOrRef];
            if (typeof schOrRef == "object") {
                checkAmbiguosRef(sch, schOrRef.schema, ref);
            }
            else if (ref !== normalizeId(fullPath)) {
                if (ref[0] === "#") {
                    checkAmbiguosRef(sch, localRefs[ref], ref);
                    localRefs[ref] = sch;
                }
                else {
                    this.refs[ref] = fullPath;
                }
            }
            return ref;
        }
        function addAnchor(anchor) {
            if (typeof anchor == "string") {
                if (!ANCHOR.test(anchor))
                    throw new Error(`invalid anchor "${anchor}"`);
                addRef.call(this, `#${anchor}`);
            }
        }
    });
    return localRefs;
    function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== undefined && !equal(sch1, sch2))
            throw ambiguos(ref);
    }
    function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
    }
}
exports.getSchemaRefs = getSchemaRefs;
//# sourceMappingURL=resolve.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/rules.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/compile/rules.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRules = exports.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
    return typeof x == "string" && jsonTypes.has(x);
}
exports.isJSONType = isJSONType;
function getRules() {
    const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] },
    };
    return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {},
    };
}
exports.getRules = getRules;
//# sourceMappingURL=rules.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/util.js":
/*!***********************************************!*\
  !*** ./node_modules/ajv/dist/compile/util.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
const codegen_1 = __webpack_require__(/*! ./codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const code_1 = __webpack_require__(/*! ./codegen/code */ "./node_modules/ajv/dist/compile/codegen/code.js");
// TODO refactor to use Set
function toHash(arr) {
    const hash = {};
    for (const item of arr)
        hash[item] = true;
    return hash;
}
exports.toHash = toHash;
function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
        return schema;
    if (Object.keys(schema).length === 0)
        return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
}
exports.alwaysValidSchema = alwaysValidSchema;
function checkUnknownRules(it, schema = it.schema) {
    const { opts, self } = it;
    if (!opts.strictSchema)
        return;
    if (typeof schema === "boolean")
        return;
    const rules = self.RULES.keywords;
    for (const key in schema) {
        if (!rules[key])
            checkStrictMode(it, `unknown keyword: "${key}"`);
    }
}
exports.checkUnknownRules = checkUnknownRules;
function schemaHasRules(schema, rules) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (rules[key])
            return true;
    return false;
}
exports.schemaHasRules = schemaHasRules;
function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
            return true;
    return false;
}
exports.schemaHasRulesButRef = schemaHasRulesButRef;
function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
    if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
            return schema;
        if (typeof schema == "string")
            return (0, codegen_1._) `${schema}`;
    }
    return (0, codegen_1._) `${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
}
exports.schemaRefOrVal = schemaRefOrVal;
function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
}
exports.unescapeFragment = unescapeFragment;
function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
}
exports.escapeFragment = escapeFragment;
function escapeJsonPointer(str) {
    if (typeof str == "number")
        return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
exports.escapeJsonPointer = escapeJsonPointer;
function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
}
exports.unescapeJsonPointer = unescapeJsonPointer;
function eachItem(xs, f) {
    if (Array.isArray(xs)) {
        for (const x of xs)
            f(x);
    }
    else {
        f(xs);
    }
}
exports.eachItem = eachItem;
function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName, }) {
    return (gen, from, to, toName) => {
        const res = to === undefined
            ? from
            : to instanceof codegen_1.Name
                ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to)
                : from instanceof codegen_1.Name
                    ? (mergeToName(gen, to, from), from)
                    : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
    };
}
exports.mergeEvaluated = {
    props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => {
            gen.if((0, codegen_1._) `${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._) `${to} || {}`).code((0, codegen_1._) `Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => {
            if (from === true) {
                gen.assign(to, true);
            }
            else {
                gen.assign(to, (0, codegen_1._) `${to} || {}`);
                setEvaluated(gen, to, from);
            }
        }),
        mergeValues: (from, to) => (from === true ? true : { ...from, ...to }),
        resultToName: evaluatedPropsToName,
    }),
    items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._) `${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._) `${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._) `${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => (from === true ? true : Math.max(from, to)),
        resultToName: (gen, items) => gen.var("items", items),
    }),
};
function evaluatedPropsToName(gen, ps) {
    if (ps === true)
        return gen.var("props", true);
    const props = gen.var("props", (0, codegen_1._) `{}`);
    if (ps !== undefined)
        setEvaluated(gen, props, ps);
    return props;
}
exports.evaluatedPropsToName = evaluatedPropsToName;
function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._) `${props}${(0, codegen_1.getProperty)(p)}`, true));
}
exports.setEvaluated = setEvaluated;
const snippets = {};
function useFunc(gen, f) {
    return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code)),
    });
}
exports.useFunc = useFunc;
var Type;
(function (Type) {
    Type[Type["Num"] = 0] = "Num";
    Type[Type["Str"] = 1] = "Str";
})(Type = exports.Type || (exports.Type = {}));
function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    // let path
    if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax
            ? isNumber
                ? (0, codegen_1._) `"[" + ${dataProp} + "]"`
                : (0, codegen_1._) `"['" + ${dataProp} + "']"`
            : isNumber
                ? (0, codegen_1._) `"/" + ${dataProp}`
                : (0, codegen_1._) `"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`; // TODO maybe use global escapePointer
    }
    return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
}
exports.getErrorPath = getErrorPath;
function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
        return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
        throw new Error(msg);
    it.self.logger.warn(msg);
}
exports.checkStrictMode = checkStrictMode;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/applicability.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/applicability.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self }, type) {
    const group = self.RULES.types[type];
    return group && group !== true && shouldUseGroup(schema, group);
}
exports.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
    return group.rules.some((rule) => shouldUseRule(schema, rule));
}
exports.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
    var _a;
    return (schema[rule.keyword] !== undefined ||
        ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== undefined)));
}
exports.shouldUseRule = shouldUseRule;
//# sourceMappingURL=applicability.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/boolSchema.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/boolSchema.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const boolError = {
    message: "boolean schema is false",
};
function topBoolOrEmptySchema(it) {
    const { gen, schema, validateName } = it;
    if (schema === false) {
        falseSchemaError(it, false);
    }
    else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, null);
        gen.return(true);
    }
}
exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid) {
    const { gen, schema } = it;
    if (schema === false) {
        gen.var(valid, false); // TODO var
        falseSchemaError(it);
    }
    else {
        gen.var(valid, true); // TODO var
    }
}
exports.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
    const { gen, data } = it;
    // TODO maybe some other interface should be used for non-keyword validation errors...
    const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it,
    };
    (0, errors_1.reportError)(cxt, boolError, undefined, overrideAllErrors);
}
//# sourceMappingURL=boolSchema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/dataType.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/dataType.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
const rules_1 = __webpack_require__(/*! ../rules */ "./node_modules/ajv/dist/compile/rules.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
var DataType;
(function (DataType) {
    DataType[DataType["Correct"] = 0] = "Correct";
    DataType[DataType["Wrong"] = 1] = "Wrong";
})(DataType = exports.DataType || (exports.DataType = {}));
function getSchemaTypes(schema) {
    const types = getJSONTypes(schema.type);
    const hasNull = types.includes("null");
    if (hasNull) {
        if (schema.nullable === false)
            throw new Error("type: null contradicts nullable: false");
    }
    else {
        if (!types.length && schema.nullable !== undefined) {
            throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
            types.push("null");
    }
    return types;
}
exports.getSchemaTypes = getSchemaTypes;
function getJSONTypes(ts) {
    const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types.every(rules_1.isJSONType))
        return types;
    throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
}
exports.getJSONTypes = getJSONTypes;
function coerceAndCheckDataType(it, types) {
    const { gen, data, opts } = it;
    const coerceTo = coerceToTypes(types, opts.coerceTypes);
    const checkTypes = types.length > 0 &&
        !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
    if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
            if (coerceTo.length)
                coerceData(it, types, coerceTo);
            else
                reportTypeError(it);
        });
    }
    return checkTypes;
}
exports.coerceAndCheckDataType = coerceAndCheckDataType;
const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
function coerceToTypes(types, coerceTypes) {
    return coerceTypes
        ? types.filter((t) => COERCIBLE.has(t) || (coerceTypes === "array" && t === "array"))
        : [];
}
function coerceData(it, types, coerceTo) {
    const { gen, data, opts } = it;
    const dataType = gen.let("dataType", (0, codegen_1._) `typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_1._) `undefined`);
    if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._) `${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen
            .assign(data, (0, codegen_1._) `${data}[0]`)
            .assign(dataType, (0, codegen_1._) `typeof ${data}`)
            .if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_1._) `${coerced} !== undefined`);
    for (const t of coerceTo) {
        if (COERCIBLE.has(t) || (t === "array" && opts.coerceTypes === "array")) {
            coerceSpecificType(t);
        }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_1._) `${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
    });
    function coerceSpecificType(t) {
        switch (t) {
            case "string":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "number" || ${dataType} == "boolean"`)
                    .assign(coerced, (0, codegen_1._) `"" + ${data}`)
                    .elseIf((0, codegen_1._) `${data} === null`)
                    .assign(coerced, (0, codegen_1._) `""`);
                return;
            case "number":
                gen
                    .elseIf((0, codegen_1._) `${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "integer":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`)
                    .assign(coerced, (0, codegen_1._) `+${data}`);
                return;
            case "boolean":
                gen
                    .elseIf((0, codegen_1._) `${data} === "false" || ${data} === 0 || ${data} === null`)
                    .assign(coerced, false)
                    .elseIf((0, codegen_1._) `${data} === "true" || ${data} === 1`)
                    .assign(coerced, true);
                return;
            case "null":
                gen.elseIf((0, codegen_1._) `${data} === "" || ${data} === 0 || ${data} === false`);
                gen.assign(coerced, null);
                return;
            case "array":
                gen
                    .elseIf((0, codegen_1._) `${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`)
                    .assign(coerced, (0, codegen_1._) `[${data}]`);
        }
    }
}
function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    // TODO use gen.property
    gen.if((0, codegen_1._) `${parentData} !== undefined`, () => gen.assign((0, codegen_1._) `${parentData}[${parentDataProperty}]`, expr));
}
function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
    let cond;
    switch (dataType) {
        case "null":
            return (0, codegen_1._) `${data} ${EQ} null`;
        case "array":
            cond = (0, codegen_1._) `Array.isArray(${data})`;
            break;
        case "object":
            cond = (0, codegen_1._) `${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
            break;
        case "integer":
            cond = numCond((0, codegen_1._) `!(${data} % 1) && !isNaN(${data})`);
            break;
        case "number":
            cond = numCond();
            break;
        default:
            return (0, codegen_1._) `typeof ${data} ${EQ} ${dataType}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
    function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._) `typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._) `isFinite(${data})` : codegen_1.nil);
    }
}
exports.checkDataType = checkDataType;
function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types = (0, util_1.toHash)(dataTypes);
    if (types.array && types.object) {
        const notObj = (0, codegen_1._) `typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._) `!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
    }
    else {
        cond = codegen_1.nil;
    }
    if (types.number)
        delete types.integer;
    for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
    return cond;
}
exports.checkDataTypes = checkDataTypes;
const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._) `{type: ${schema}}` : (0, codegen_1._) `{type: ${schemaValue}}`,
};
function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_1.reportError)(cxt, typeError);
}
exports.reportTypeError = reportTypeError;
function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
    return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it,
    };
}
//# sourceMappingURL=dataType.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/defaults.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/defaults.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assignDefaults = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function assignDefaults(it, ty) {
    const { properties, items } = it.schema;
    if (ty === "object" && properties) {
        for (const key in properties) {
            assignDefault(it, key, properties[key].default);
        }
    }
    else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
    }
}
exports.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
    const { gen, compositeRule, data, opts } = it;
    if (defaultValue === undefined)
        return;
    const childData = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(prop)}`;
    if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
    }
    let condition = (0, codegen_1._) `${childData} === undefined`;
    if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._) `${condition} || ${childData} === null || ${childData} === ""`;
    }
    // `${childData} === undefined` +
    // (opts.useDefaults === "empty" ? ` || ${childData} === null || ${childData} === ""` : "")
    gen.if(condition, (0, codegen_1._) `${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
}
//# sourceMappingURL=defaults.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
const boolSchema_1 = __webpack_require__(/*! ./boolSchema */ "./node_modules/ajv/dist/compile/validate/boolSchema.js");
const dataType_1 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const applicability_1 = __webpack_require__(/*! ./applicability */ "./node_modules/ajv/dist/compile/validate/applicability.js");
const dataType_2 = __webpack_require__(/*! ./dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const defaults_1 = __webpack_require__(/*! ./defaults */ "./node_modules/ajv/dist/compile/validate/defaults.js");
const keyword_1 = __webpack_require__(/*! ./keyword */ "./node_modules/ajv/dist/compile/validate/keyword.js");
const subschema_1 = __webpack_require__(/*! ./subschema */ "./node_modules/ajv/dist/compile/validate/subschema.js");
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const resolve_1 = __webpack_require__(/*! ../resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
// schema compilation - generates validation function, subschemaCode (below) is used for subschemas
function validateFunctionCode(it) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            topSchemaObjCode(it);
            return;
        }
    }
    validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
exports.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
    if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
            gen.code((0, codegen_1._) `"use strict"; ${funcSourceUrl(schema, opts)}`);
            destructureValCxtES5(gen, opts);
            gen.code(body);
        });
    }
    else {
        gen.func(validateName, (0, codegen_1._) `${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
    }
}
function destructureValCxt(opts) {
    return (0, codegen_1._) `{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._) `, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
}
function destructureValCxtES5(gen, opts) {
    gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
    }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._) `""`);
        gen.var(names_1.default.parentData, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._) `undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
            gen.var(names_1.default.dynamicAnchors, (0, codegen_1._) `{}`);
    });
}
function topSchemaObjCode(it) {
    const { schema, opts, gen } = it;
    validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
            commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
            resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
    });
    return;
}
function resetEvaluated(it) {
    // TODO maybe some hook to execute it in the end to check whether props/items are Name, as in assignEvaluated
    const { gen, validateName } = it;
    it.evaluated = gen.const("evaluated", (0, codegen_1._) `${validateName}.evaluated`);
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._) `${it.evaluated}.props`, (0, codegen_1._) `undefined`));
    gen.if((0, codegen_1._) `${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._) `${it.evaluated}.items`, (0, codegen_1._) `undefined`));
}
function funcSourceUrl(schema, opts) {
    const schId = typeof schema == "object" && schema[opts.schemaId];
    return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._) `/*# sourceURL=${schId} */` : codegen_1.nil;
}
// schema compilation - this function is used recursively to generate code for sub-schemas
function subschemaCode(it, valid) {
    if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
            subSchemaObjCode(it, valid);
            return;
        }
    }
    (0, boolSchema_1.boolOrEmptySchema)(it, valid);
}
function schemaCxtHasRules({ schema, self }) {
    if (typeof schema == "boolean")
        return !schema;
    for (const key in schema)
        if (self.RULES.all[key])
            return true;
    return false;
}
function isSchemaObj(it) {
    return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid) {
    const { schema, gen, opts } = it;
    if (opts.$comment && schema.$comment)
        commentKeyword(it);
    updateContext(it);
    checkAsyncSchema(it);
    const errsCount = gen.const("_errs", names_1.default.errors);
    typeAndKeywords(it, errsCount);
    // TODO var
    gen.var(valid, (0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
}
function checkKeywords(it) {
    (0, util_1.checkUnknownRules)(it);
    checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
    if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
    const types = (0, dataType_1.getSchemaTypes)(it.schema);
    const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
    schemaKeywords(it, types, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
    const { schema, errSchemaPath, opts, self } = it;
    if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
    }
}
function checkNoDefault(it) {
    const { schema, opts } = it;
    if (schema.default !== undefined && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
    }
}
function updateContext(it) {
    const schId = it.schema[it.opts.schemaId];
    if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.baseId, schId);
}
function checkAsyncSchema(it) {
    if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
    const msg = schema.$comment;
    if (opts.$comment === true) {
        gen.code((0, codegen_1._) `${names_1.default.self}.logger.log(${msg})`);
    }
    else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str) `${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._) `${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
    }
}
function returnResults(it) {
    const { gen, schemaEnv, validateName, ValidationError, opts } = it;
    if (schemaEnv.$async) {
        // TODO assign unevaluated
        gen.if((0, codegen_1._) `${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._) `new ${ValidationError}(${names_1.default.vErrors})`));
    }
    else {
        gen.assign((0, codegen_1._) `${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
            assignEvaluated(it);
        gen.return((0, codegen_1._) `${names_1.default.errors} === 0`);
    }
}
function assignEvaluated({ gen, evaluated, props, items }) {
    if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.props`, props);
    if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._) `${evaluated}.items`, items);
}
function schemaKeywords(it, types, typeErrors, errsCount) {
    const { gen, schema, data, allErrors, opts, self } = it;
    const { RULES } = self;
    if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition)); // TODO typecast
        return;
    }
    if (!opts.jtd)
        checkStrictTypes(it, types);
    gen.block(() => {
        for (const group of RULES.rules)
            groupKeywords(group);
        groupKeywords(RULES.post);
    });
    function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
            return;
        if (group.type) {
            gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
            iterateKeywords(it, group);
            if (types.length === 1 && types[0] === group.type && typeErrors) {
                gen.else();
                (0, dataType_2.reportTypeError)(it);
            }
            gen.endIf();
        }
        else {
            iterateKeywords(it, group);
        }
        // TODO make it "ok" call?
        if (!allErrors)
            gen.if((0, codegen_1._) `${names_1.default.errors} === ${errsCount || 0}`);
    }
}
function iterateKeywords(it, group) {
    const { gen, schema, opts: { useDefaults }, } = it;
    if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
    gen.block(() => {
        for (const rule of group.rules) {
            if ((0, applicability_1.shouldUseRule)(schema, rule)) {
                keywordCode(it, rule.keyword, rule.definition, group.type);
            }
        }
    });
}
function checkStrictTypes(it, types) {
    if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
    checkContextTypes(it, types);
    if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
    checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types) {
    if (!types.length)
        return;
    if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
    }
    types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
            strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
    });
    it.dataTypes = it.dataTypes.filter((t) => includesType(types, t));
}
function checkMultipleTypes(it, ts) {
    if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
    }
}
function checkKeywordTypes(it, ts) {
    const rules = it.self.RULES.all;
    for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
            const { type } = rule.definition;
            if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
                strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
            }
        }
    }
}
function hasApplicableType(schTs, kwdT) {
    return schTs.includes(kwdT) || (kwdT === "number" && schTs.includes("integer"));
}
function includesType(ts, t) {
    return ts.includes(t) || (t === "integer" && ts.includes("number"));
}
function strictTypesError(it, msg) {
    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
    msg += ` at "${schemaPath}" (strictTypes)`;
    (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
    constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
            this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        }
        else {
            this.schemaCode = this.schemaValue;
            if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
                throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
            }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
            this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
    }
    result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
    }
    failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
            failAction();
        else
            this.error();
        if (successAction) {
            this.gen.else();
            successAction();
            if (this.allErrors)
                this.gen.endIf();
        }
        else {
            if (this.allErrors)
                this.gen.endIf();
            else
                this.gen.else();
        }
    }
    pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), undefined, failAction);
    }
    fail(condition) {
        if (condition === undefined) {
            this.error();
            if (!this.allErrors)
                this.gen.if(false); // this branch will be removed by gen.optimize
            return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
            this.gen.endIf();
        else
            this.gen.else();
    }
    fail$data(condition) {
        if (!this.$data)
            return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._) `${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
    }
    error(append, errorParams, errorPaths) {
        if (errorParams) {
            this.setParams(errorParams);
            this._error(append, errorPaths);
            this.setParams({});
            return;
        }
        this._error(append, errorPaths);
    }
    _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
    }
    $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
    }
    reset() {
        if (this.errsCount === undefined)
            throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(cond) {
        if (!this.allErrors)
            this.gen.if(cond);
    }
    setParams(obj, assign) {
        if (assign)
            Object.assign(this.params, obj);
        else
            this.params = obj;
    }
    block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
            this.check$data(valid, $dataValid);
            codeBlock();
        });
    }
    check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
            return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._) `${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
            gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
            gen.elseIf(this.invalid$data());
            this.$dataError();
            if (valid !== codegen_1.nil)
                gen.assign(valid, false);
        }
        gen.else();
    }
    invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
            if (schemaType.length) {
                /* istanbul ignore if */
                if (!(schemaCode instanceof codegen_1.Name))
                    throw new Error("ajv implementation error");
                const st = Array.isArray(schemaType) ? schemaType : [schemaType];
                return (0, codegen_1._) `${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
            }
            return codegen_1.nil;
        }
        function invalid$DataSchema() {
            if (def.validateSchema) {
                const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema }); // TODO value.code for standalone
                return (0, codegen_1._) `!${validateSchemaRef}(${schemaCode})`;
            }
            return codegen_1.nil;
        }
    }
    subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: undefined, props: undefined };
        subschemaCode(nextContext, valid);
        return nextContext;
    }
    mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
            return;
        if (it.props !== true && schemaCxt.props !== undefined) {
            it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== undefined) {
            it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
    }
    mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
            gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
            return true;
        }
    }
}
exports.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword, def, ruleType) {
    const cxt = new KeywordCxt(it, def, keyword);
    if ("code" in def) {
        def.code(cxt, ruleType);
    }
    else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
    else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
    }
    else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
    }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
    let jsonPointer;
    let data;
    if ($data === "")
        return names_1.default.rootData;
    if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
    }
    else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
            throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
            if (up >= dataLevel)
                throw new Error(errorMsg("property/index", up));
            return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
            throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
            return data;
    }
    let expr = data;
    const segments = jsonPointer.split("/");
    for (const segment of segments) {
        if (segment) {
            data = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
            expr = (0, codegen_1._) `${expr} && ${data}`;
        }
    }
    return expr;
    function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
    }
}
exports.getData = getData;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/keyword.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/keyword.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../names */ "./node_modules/ajv/dist/compile/names.js");
const code_1 = __webpack_require__(/*! ../../vocabularies/code */ "./node_modules/ajv/dist/vocabularies/code.js");
const errors_1 = __webpack_require__(/*! ../errors */ "./node_modules/ajv/dist/compile/errors.js");
function macroKeywordCode(cxt, def) {
    const { gen, keyword, schema, parentSchema, it } = cxt;
    const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
    const schemaRef = useKeyword(gen, keyword, macroSchema);
    if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
    const valid = gen.name("valid");
    cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true,
    }, valid);
    cxt.pass(valid, () => cxt.error(true));
}
exports.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def) {
    var _a;
    const { gen, keyword, schema, parentSchema, $data, it } = cxt;
    checkAsyncKeyword(it, def);
    const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
    const validateRef = useKeyword(gen, keyword, validate);
    const valid = gen.let("valid");
    cxt.block$data(valid, validateKeyword);
    cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
    function validateKeyword() {
        if (def.errors === false) {
            assignValid();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => cxt.error());
        }
        else {
            const ruleErrs = def.async ? validateAsync() : validateSync();
            if (def.modifying)
                modifyData(cxt);
            reportErrs(() => addErrs(cxt, ruleErrs));
        }
    }
    function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._) `await `), (e) => gen.assign(valid, false).if((0, codegen_1._) `${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._) `${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
    }
    function validateSync() {
        const validateErrs = (0, codegen_1._) `${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
    }
    function assignValid(_await = def.async ? (0, codegen_1._) `await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !(("compile" in def && !$data) || def.schema === false);
        gen.assign(valid, (0, codegen_1._) `${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
    }
    function reportErrs(errors) {
        var _a;
        gen.if((0, codegen_1.not)((_a = def.valid) !== null && _a !== void 0 ? _a : valid), errors);
    }
}
exports.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
    const { gen, data, it } = cxt;
    gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._) `${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
    const { gen } = cxt;
    gen.if((0, codegen_1._) `Array.isArray(${errs})`, () => {
        gen
            .assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`)
            .assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
    }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def) {
    if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword, result) {
    if (result === undefined)
        throw new Error(`keyword "${keyword}" failed to compile`);
    return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
    // TODO add tests
    return (!schemaType.length ||
        schemaType.some((st) => st === "array"
            ? Array.isArray(schema)
            : st === "object"
                ? schema && typeof schema == "object" && !Array.isArray(schema)
                : typeof schema == st || (allowUndefined && typeof schema == "undefined")));
}
exports.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
    /* istanbul ignore if */
    if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
    }
    const deps = def.dependencies;
    if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
    }
    if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
            const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` +
                self.errorsText(def.validateSchema.errors);
            if (opts.validateSchema === "log")
                self.logger.error(msg);
            else
                throw new Error(msg);
        }
    }
}
exports.validateKeywordUsage = validateKeywordUsage;
//# sourceMappingURL=keyword.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/compile/validate/subschema.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/compile/validate/subschema.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
const codegen_1 = __webpack_require__(/*! ../codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../util */ "./node_modules/ajv/dist/compile/util.js");
function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
    if (keyword !== undefined && schema !== undefined) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
    }
    if (keyword !== undefined) {
        const sch = it.schema[keyword];
        return schemaProp === undefined
            ? {
                schema: sch,
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}`,
            }
            : {
                schema: sch[schemaProp],
                schemaPath: (0, codegen_1._) `${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
                errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`,
            };
    }
    if (schema !== undefined) {
        if (schemaPath === undefined || errSchemaPath === undefined || topSchemaRef === undefined) {
            throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
            schema,
            schemaPath,
            topSchemaRef,
            errSchemaPath,
        };
    }
    throw new Error('either "keyword" or "schema" must be passed');
}
exports.getSubschema = getSubschema;
function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
    if (data !== undefined && dataProp !== undefined) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
    }
    const { gen } = it;
    if (dataProp !== undefined) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._) `${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str) `${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._) `${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
    }
    if (data !== undefined) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true); // replaceable if used once?
        dataContextProps(nextData);
        if (propertyName !== undefined)
            subschema.propertyName = propertyName;
        // TODO something is possibly wrong here with not changing parentDataProperty and not appending dataPathArr
    }
    if (dataTypes)
        subschema.dataTypes = dataTypes;
    function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
    }
}
exports.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
    if (compositeRule !== undefined)
        subschema.compositeRule = compositeRule;
    if (createErrors !== undefined)
        subschema.createErrors = createErrors;
    if (allErrors !== undefined)
        subschema.allErrors = allErrors;
    subschema.jtdDiscriminator = jtdDiscriminator; // not inherited
    subschema.jtdMetadata = jtdMetadata; // not inherited
}
exports.extendSubschemaMode = extendSubschemaMode;
//# sourceMappingURL=subschema.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/core.js":
/*!***************************************!*\
  !*** ./node_modules/ajv/dist/core.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
var validate_1 = __webpack_require__(/*! ./compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
Object.defineProperty(exports, "KeywordCxt", ({ enumerable: true, get: function () { return validate_1.KeywordCxt; } }));
var codegen_1 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
Object.defineProperty(exports, "_", ({ enumerable: true, get: function () { return codegen_1._; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return codegen_1.str; } }));
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return codegen_1.stringify; } }));
Object.defineProperty(exports, "nil", ({ enumerable: true, get: function () { return codegen_1.nil; } }));
Object.defineProperty(exports, "Name", ({ enumerable: true, get: function () { return codegen_1.Name; } }));
Object.defineProperty(exports, "CodeGen", ({ enumerable: true, get: function () { return codegen_1.CodeGen; } }));
const validation_error_1 = __webpack_require__(/*! ./runtime/validation_error */ "./node_modules/ajv/dist/runtime/validation_error.js");
const ref_error_1 = __webpack_require__(/*! ./compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const rules_1 = __webpack_require__(/*! ./compile/rules */ "./node_modules/ajv/dist/compile/rules.js");
const compile_1 = __webpack_require__(/*! ./compile */ "./node_modules/ajv/dist/compile/index.js");
const codegen_2 = __webpack_require__(/*! ./compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const resolve_1 = __webpack_require__(/*! ./compile/resolve */ "./node_modules/ajv/dist/compile/resolve.js");
const dataType_1 = __webpack_require__(/*! ./compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const util_1 = __webpack_require__(/*! ./compile/util */ "./node_modules/ajv/dist/compile/util.js");
const $dataRefSchema = __webpack_require__(/*! ./refs/data.json */ "./node_modules/ajv/dist/refs/data.json");
const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error",
]);
const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now.",
};
const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.',
};
const MAX_EXPRESSION = 200;
// eslint-disable-next-line complexity
function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === undefined ? 1 : _optz || 0;
    return {
        strictSchema: (_c = (_b = o.strictSchema) !== null && _b !== void 0 ? _b : s) !== null && _c !== void 0 ? _c : true,
        strictNumbers: (_e = (_d = o.strictNumbers) !== null && _d !== void 0 ? _d : s) !== null && _e !== void 0 ? _e : true,
        strictTypes: (_g = (_f = o.strictTypes) !== null && _f !== void 0 ? _f : s) !== null && _g !== void 0 ? _g : "log",
        strictTuples: (_j = (_h = o.strictTuples) !== null && _h !== void 0 ? _h : s) !== null && _j !== void 0 ? _j : "log",
        strictRequired: (_l = (_k = o.strictRequired) !== null && _k !== void 0 ? _k : s) !== null && _l !== void 0 ? _l : false,
        code: o.code ? { ...o.code, optimize } : { optimize },
        loopRequired: (_m = o.loopRequired) !== null && _m !== void 0 ? _m : MAX_EXPRESSION,
        loopEnum: (_o = o.loopEnum) !== null && _o !== void 0 ? _o : MAX_EXPRESSION,
        meta: (_p = o.meta) !== null && _p !== void 0 ? _p : true,
        messages: (_q = o.messages) !== null && _q !== void 0 ? _q : true,
        inlineRefs: (_r = o.inlineRefs) !== null && _r !== void 0 ? _r : true,
        schemaId: (_s = o.schemaId) !== null && _s !== void 0 ? _s : "$id",
        addUsedSchema: (_t = o.addUsedSchema) !== null && _t !== void 0 ? _t : true,
        validateSchema: (_u = o.validateSchema) !== null && _u !== void 0 ? _u : true,
        validateFormats: (_v = o.validateFormats) !== null && _v !== void 0 ? _v : true,
        unicodeRegExp: (_w = o.unicodeRegExp) !== null && _w !== void 0 ? _w : true,
        int32range: (_x = o.int32range) !== null && _x !== void 0 ? _x : true,
    };
}
class Ajv {
    constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = new Set();
        this._loading = {};
        this._cache = new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
            addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
            addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
            this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
    }
    _addVocabularies() {
        this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
            _dataRefSchema = { ...$dataRefSchema };
            _dataRefSchema.id = _dataRefSchema.$id;
            delete _dataRefSchema.$id;
        }
        if (meta && $data)
            this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
        const { meta, schemaId } = this.opts;
        return (this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : undefined);
    }
    validate(schemaKeyRef, // key, ref or schema object
    data // to be validated
    ) {
        let v;
        if (typeof schemaKeyRef == "string") {
            v = this.getSchema(schemaKeyRef);
            if (!v)
                throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        }
        else {
            v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
            this.errors = v.errors;
        return valid;
    }
    compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
            throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
            await loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
            if ($ref && !this.getSchema($ref)) {
                await runCompileAsync.call(this, { $ref }, true);
            }
        }
        async function _compileAsync(sch) {
            try {
                return this._compileSchemaEnv(sch);
            }
            catch (e) {
                if (!(e instanceof ref_error_1.default))
                    throw e;
                checkLoaded.call(this, e);
                await loadMissingSchema.call(this, e.missingSchema);
                return _compileAsync.call(this, sch);
            }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
            if (this.refs[ref]) {
                throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
            }
        }
        async function loadMissingSchema(ref) {
            const _schema = await _loadSchema.call(this, ref);
            if (!this.refs[ref])
                await loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref])
                this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
            const p = this._loading[ref];
            if (p)
                return p;
            try {
                return await (this._loading[ref] = loadSchema(ref));
            }
            finally {
                delete this._loading[ref];
            }
        }
    }
    // Adds schema to the instance
    addSchema(schema, // If array is passed, `key` will be ignored
    key, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema = this.opts.validateSchema // false to skip schema validation. Used internally, option validateSchema should be used instead.
    ) {
        if (Array.isArray(schema)) {
            for (const sch of schema)
                this.addSchema(sch, undefined, _meta, _validateSchema);
            return this;
        }
        let id;
        if (typeof schema === "object") {
            const { schemaId } = this.opts;
            id = schema[schemaId];
            if (id !== undefined && typeof id != "string") {
                throw new Error(`schema ${schemaId} must be string`);
            }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(schema, key, // schema key
    _validateSchema = this.opts.validateSchema // false to skip schema validation, can be used to override validateSchema option for meta-schema
    ) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
    }
    //  Validate schema against its meta-schema
    validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
            return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== undefined && typeof $schema != "string") {
            throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
            this.logger.warn("meta-schema not available");
            this.errors = null;
            return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
            const message = "schema is invalid: " + this.errorsText();
            if (this.opts.validateSchema === "log")
                this.logger.error(message);
            else
                throw new Error(message);
        }
        return valid;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
            keyRef = sch;
        if (sch === undefined) {
            const { schemaId } = this.opts;
            const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
            sch = compile_1.resolveSchema.call(this, root, keyRef);
            if (!sch)
                return;
            this.refs[keyRef] = sch;
        }
        return (sch.validate || this._compileSchemaEnv(sch));
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
            this._removeAllSchemas(this.schemas, schemaKeyRef);
            this._removeAllSchemas(this.refs, schemaKeyRef);
            return this;
        }
        switch (typeof schemaKeyRef) {
            case "undefined":
                this._removeAllSchemas(this.schemas);
                this._removeAllSchemas(this.refs);
                this._cache.clear();
                return this;
            case "string": {
                const sch = getSchEnv.call(this, schemaKeyRef);
                if (typeof sch == "object")
                    this._cache.delete(sch.schema);
                delete this.schemas[schemaKeyRef];
                delete this.refs[schemaKeyRef];
                return this;
            }
            case "object": {
                const cacheKey = schemaKeyRef;
                this._cache.delete(cacheKey);
                let id = schemaKeyRef[this.opts.schemaId];
                if (id) {
                    id = (0, resolve_1.normalizeId)(id);
                    delete this.schemas[id];
                    delete this.refs[id];
                }
                return this;
            }
            default:
                throw new Error("ajv.removeSchema: invalid parameter");
        }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(definitions) {
        for (const def of definitions)
            this.addKeyword(def);
        return this;
    }
    addKeyword(kwdOrDef, def // deprecated
    ) {
        let keyword;
        if (typeof kwdOrDef == "string") {
            keyword = kwdOrDef;
            if (typeof def == "object") {
                this.logger.warn("these parameters are deprecated, see docs for addKeyword");
                def.keyword = keyword;
            }
        }
        else if (typeof kwdOrDef == "object" && def === undefined) {
            def = kwdOrDef;
            keyword = def.keyword;
            if (Array.isArray(keyword) && !keyword.length) {
                throw new Error("addKeywords: keyword must be string or non-empty array");
            }
        }
        else {
            throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
            (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
            return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
            ...def,
            type: (0, dataType_1.getJSONTypes)(def.type),
            schemaType: (0, dataType_1.getJSONTypes)(def.schemaType),
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0
            ? (k) => addRule.call(this, k, definition)
            : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
    }
    getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
    }
    // Remove keyword
    removeKeyword(keyword) {
        // TODO return type should be Ajv
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
            const i = group.rules.findIndex((rule) => rule.keyword === keyword);
            if (i >= 0)
                group.rules.splice(i, 1);
        }
        return this;
    }
    // Add format
    addFormat(name, format) {
        if (typeof format == "string")
            format = new RegExp(format);
        this.formats[name] = format;
        return this;
    }
    errorsText(errors = this.errors, // optional array of validation errors
    { separator = ", ", dataVar = "data" } = {} // optional options with properties `separator` and `dataVar`
    ) {
        if (!errors || errors.length === 0)
            return "No errors";
        return errors
            .map((e) => `${dataVar}${e.instancePath} ${e.message}`)
            .reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
            const segments = jsonPointer.split("/").slice(1); // first segment is an empty string
            let keywords = metaSchema;
            for (const seg of segments)
                keywords = keywords[seg];
            for (const key in rules) {
                const rule = rules[key];
                if (typeof rule != "object")
                    continue;
                const { $data } = rule.definition;
                const schema = keywords[key];
                if ($data && schema)
                    keywords[key] = schemaOrData(schema);
            }
        }
        return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
            const sch = schemas[keyRef];
            if (!regex || regex.test(keyRef)) {
                if (typeof sch == "string") {
                    delete schemas[keyRef];
                }
                else if (sch && !sch.meta) {
                    this._cache.delete(sch.schema);
                    delete schemas[keyRef];
                }
            }
        }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
            id = schema[schemaId];
        }
        else {
            if (this.opts.jtd)
                throw new Error("schema must be object");
            else if (typeof schema != "boolean")
                throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== undefined)
            return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
            // TODO atm it is allowed to overwrite schemas without id (instead of not adding them)
            if (baseId)
                this._checkUnique(baseId);
            this.refs[baseId] = sch;
        }
        if (validateSchema)
            this.validateSchema(schema, true);
        return sch;
    }
    _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
            throw new Error(`schema with key or id "${id}" already exists`);
        }
    }
    _compileSchemaEnv(sch) {
        if (sch.meta)
            this._compileMetaSchema(sch);
        else
            compile_1.compileSchema.call(this, sch);
        /* istanbul ignore if */
        if (!sch.validate)
            throw new Error("ajv implementation error");
        return sch.validate;
    }
    _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
            compile_1.compileSchema.call(this, sch);
        }
        finally {
            this.opts = currentOpts;
        }
    }
}
exports["default"] = Ajv;
Ajv.ValidationError = validation_error_1.default;
Ajv.MissingRefError = ref_error_1.default;
function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
            this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
}
function getSchEnv(keyRef) {
    keyRef = (0, resolve_1.normalizeId)(keyRef); // TODO tests fail without this line
    return this.schemas[keyRef] || this.refs[keyRef];
}
function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
        return;
    if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
    else
        for (const key in optsSchemas)
            this.addSchema(optsSchemas[key], key);
}
function addInitialFormats() {
    for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
            this.addFormat(name, format);
    }
}
function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
            def.keyword = keyword;
        this.addKeyword(def);
    }
}
function getMetaSchemaOptions() {
    const metaOpts = { ...this.opts };
    for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
    return metaOpts;
}
const noLogs = { log() { }, warn() { }, error() { } };
function getLogger(logger) {
    if (logger === false)
        return noLogs;
    if (logger === undefined)
        return console;
    if (logger.log && logger.warn && logger.error)
        return logger;
    throw new Error("logger must implement log, warn and error methods");
}
const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
function checkKeyword(keyword, def) {
    const { RULES } = this;
    (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
            throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
            throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def)
        return;
    if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
    }
}
function addRule(keyword, definition, dataType) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
    if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword] = true;
    if (!definition)
        return;
    const rule = {
        keyword,
        definition: {
            ...definition,
            type: (0, dataType_1.getJSONTypes)(definition.type),
            schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType),
        },
    };
    if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
        ruleGroup.rules.push(rule);
    RULES.all[keyword] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
}
function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
    }
    else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
    }
}
function keywordMetaschema(def) {
    let { metaSchema } = def;
    if (metaSchema === undefined)
        return;
    if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
    def.validateSchema = this.compile(metaSchema, true);
}
const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
};
function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
}
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/equal.js":
/*!************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/equal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://github.com/ajv-validator/ajv/issues/889
const equal = __webpack_require__(/*! fast-deep-equal */ "./node_modules/fast-deep-equal/index.js");
equal.code = 'require("ajv/dist/runtime/equal").default';
exports["default"] = equal;
//# sourceMappingURL=equal.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/ucs2length.js":
/*!*****************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/ucs2length.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// https://mathiasbynens.be/notes/javascript-encoding
// https://github.com/bestiejs/punycode.js - punycode.ucs2.decode
function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 0xd800 && value <= 0xdbff && pos < len) {
            // high surrogate, and there is a next character
            value = str.charCodeAt(pos);
            if ((value & 0xfc00) === 0xdc00)
                pos++; // low surrogate
        }
    }
    return length;
}
exports["default"] = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
//# sourceMappingURL=ucs2length.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/runtime/validation_error.js":
/*!***********************************************************!*\
  !*** ./node_modules/ajv/dist/runtime/validation_error.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class ValidationError extends Error {
    constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
    }
}
exports["default"] = ValidationError;
//# sourceMappingURL=validation_error.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAdditionalItems = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
            (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
            return;
        }
        validateAdditionalItems(cxt, items);
    },
};
function validateAdditionalItems(cxt, items) {
    const { gen, schema, data, keyword, it } = cxt;
    it.items = true;
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._) `${len} <= ${items.length}`);
    }
    else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._) `${len} <= ${items.length}`); // TODO var
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
    }
    function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
            cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
            if (!it.allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
    }
}
exports.validateAdditionalItems = validateAdditionalItems;
exports["default"] = def;
//# sourceMappingURL=additionalItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must NOT have additional properties",
    params: ({ params }) => (0, codegen_1._) `{additionalProperty: ${params.additionalProperty}}`,
};
const def = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: true,
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        /* istanbul ignore if */
        if (!errsCount)
            throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
            return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._) `${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
            gen.forIn("key", data, (key) => {
                if (!props.length && !patProps.length)
                    additionalPropertyCode(key);
                else
                    gen.if(isAdditional(key), () => additionalPropertyCode(key));
            });
        }
        function isAdditional(key) {
            let definedProp;
            if (props.length > 8) {
                // TODO maybe an option instead of hard-coded 8?
                const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
                definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
            }
            else if (props.length) {
                definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._) `${key} === ${p}`));
            }
            else {
                definedProp = codegen_1.nil;
            }
            if (patProps.length) {
                definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._) `${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
            }
            return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
            gen.code((0, codegen_1._) `delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
            if (opts.removeAdditional === "all" || (opts.removeAdditional && schema === false)) {
                deleteAdditional(key);
                return;
            }
            if (schema === false) {
                cxt.setParams({ additionalProperty: key });
                cxt.error();
                if (!allErrors)
                    gen.break();
                return;
            }
            if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
                const valid = gen.name("valid");
                if (opts.removeAdditional === "failing") {
                    applyAdditionalSchema(key, valid, false);
                    gen.if((0, codegen_1.not)(valid), () => {
                        cxt.reset();
                        deleteAdditional(key);
                    });
                }
                else {
                    applyAdditionalSchema(key, valid);
                    if (!allErrors)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                }
            }
        }
        function applyAdditionalSchema(key, valid, errors) {
            const subschema = {
                keyword: "additionalProperties",
                dataProp: key,
                dataPropType: util_1.Type.Str,
            };
            if (errors === false) {
                Object.assign(subschema, {
                    compositeRule: true,
                    createErrors: false,
                    allErrors: false,
                });
            }
            cxt.subschema(subschema, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=additionalProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/allOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "allOf",
    schemaType: "array",
    code(cxt) {
        const { gen, schema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
            if ((0, util_1.alwaysValidSchema)(it, sch))
                return;
            const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
            cxt.ok(valid);
            cxt.mergeEvaluated(schCxt);
        });
    },
};
exports["default"] = def;
//# sourceMappingURL=allOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/anyOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: true,
    code: code_1.validateUnion,
    error: { message: "must match a schema in anyOf" },
};
exports["default"] = def;
//# sourceMappingURL=anyOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/contains.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/contains.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { min, max } }) => max === undefined
        ? (0, codegen_1.str) `must contain at least ${min} valid item(s)`
        : (0, codegen_1.str) `must contain at least ${min} and no more than ${max} valid item(s)`,
    params: ({ params: { min, max } }) => max === undefined ? (0, codegen_1._) `{minContains: ${min}}` : (0, codegen_1._) `{minContains: ${min}, maxContains: ${max}}`,
};
const def = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
            min = minContains === undefined ? 1 : minContains;
            max = maxContains;
        }
        else {
            min = 1;
        }
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        cxt.setParams({ min, max });
        if (max === undefined && min === 0) {
            (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
            return;
        }
        if (max !== undefined && min > max) {
            (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
            cxt.fail();
            return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            let cond = (0, codegen_1._) `${len} >= ${min}`;
            if (max !== undefined)
                cond = (0, codegen_1._) `${cond} && ${len} <= ${max}`;
            cxt.pass(cond);
            return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === undefined && min === 1) {
            validateItems(valid, () => gen.if(valid, () => gen.break()));
        }
        else {
            gen.let(valid, false);
            const schValid = gen.name("_valid");
            const count = gen.let("count", 0);
            validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        cxt.result(valid, () => cxt.reset());
        function validateItems(_valid, block) {
            gen.forRange("i", 0, len, (i) => {
                cxt.subschema({
                    keyword: "contains",
                    dataProp: i,
                    dataPropType: util_1.Type.Num,
                    compositeRule: true,
                }, _valid);
                block();
            });
        }
        function checkLimits(count) {
            gen.code((0, codegen_1._) `${count}++`);
            if (max === undefined) {
                gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true).break());
            }
            else {
                gen.if((0, codegen_1._) `${count} > ${max}`, () => gen.assign(valid, false).break());
                if (min === 1)
                    gen.assign(valid, true);
                else
                    gen.if((0, codegen_1._) `${count} >= ${min}`, () => gen.assign(valid, true));
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=contains.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/dependencies.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str) `must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._) `{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`, // TODO change to reference
};
const def = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
    },
};
function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
        if (key === "__proto__")
            continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
}
function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
        return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
            continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
            property: prop,
            depsCount: deps.length,
            deps: deps.join(", "),
        });
        if (it.allErrors) {
            gen.if(hasProperty, () => {
                for (const depProp of deps) {
                    (0, code_1.checkReportMissingProp)(cxt, depProp);
                }
            });
        }
        else {
            gen.if((0, codegen_1._) `${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
        }
    }
}
exports.validatePropertyDeps = validatePropertyDeps;
function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
            continue;
        gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
        }, () => gen.var(valid, true) // TODO var
        );
        cxt.ok(valid);
    }
}
exports.validateSchemaDeps = validateSchemaDeps;
exports["default"] = def;
//# sourceMappingURL=dependencies.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/if.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/if.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params }) => (0, codegen_1.str) `must match "${params.ifClause}" schema`,
    params: ({ params }) => (0, codegen_1._) `{failingKeyword: ${params.ifClause}}`,
};
const def = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === undefined && parentSchema.else === undefined) {
            (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
            return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
            const ifClause = gen.let("ifClause");
            cxt.setParams({ ifClause });
            gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        }
        else if (hasThen) {
            gen.if(schValid, validateClause("then"));
        }
        else {
            gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
            const schCxt = cxt.subschema({
                keyword: "if",
                compositeRule: true,
                createErrors: false,
                allErrors: false,
            }, schValid);
            cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
            return () => {
                const schCxt = cxt.subschema({ keyword }, schValid);
                gen.assign(valid, schValid);
                cxt.mergeValidEvaluated(schCxt, valid);
                if (ifClause)
                    gen.assign(ifClause, (0, codegen_1._) `${keyword}`);
                else
                    cxt.setParams({ ifClause: keyword });
            };
        }
    },
};
function hasSchema(it, keyword) {
    const schema = it.schema[keyword];
    return schema !== undefined && !(0, util_1.alwaysValidSchema)(it, schema);
}
exports["default"] = def;
//# sourceMappingURL=if.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const prefixItems_1 = __webpack_require__(/*! ./prefixItems */ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js");
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const items2020_1 = __webpack_require__(/*! ./items2020 */ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js");
const contains_1 = __webpack_require__(/*! ./contains */ "./node_modules/ajv/dist/vocabularies/applicator/contains.js");
const dependencies_1 = __webpack_require__(/*! ./dependencies */ "./node_modules/ajv/dist/vocabularies/applicator/dependencies.js");
const propertyNames_1 = __webpack_require__(/*! ./propertyNames */ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const properties_1 = __webpack_require__(/*! ./properties */ "./node_modules/ajv/dist/vocabularies/applicator/properties.js");
const patternProperties_1 = __webpack_require__(/*! ./patternProperties */ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js");
const not_1 = __webpack_require__(/*! ./not */ "./node_modules/ajv/dist/vocabularies/applicator/not.js");
const anyOf_1 = __webpack_require__(/*! ./anyOf */ "./node_modules/ajv/dist/vocabularies/applicator/anyOf.js");
const oneOf_1 = __webpack_require__(/*! ./oneOf */ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js");
const allOf_1 = __webpack_require__(/*! ./allOf */ "./node_modules/ajv/dist/vocabularies/applicator/allOf.js");
const if_1 = __webpack_require__(/*! ./if */ "./node_modules/ajv/dist/vocabularies/applicator/if.js");
const thenElse_1 = __webpack_require__(/*! ./thenElse */ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js");
function getApplicator(draft2020 = false) {
    const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default,
    ];
    // array
    if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
    else
        applicator.push(additionalItems_1.default, items_1.default);
    applicator.push(contains_1.default);
    return applicator;
}
exports["default"] = getApplicator;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateTuple = void 0;
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
            return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        cxt.ok((0, code_1.validateArray)(cxt));
    },
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
    const { gen, parentSchema, data, keyword, it } = cxt;
    checkStrictTuple(parentSchema);
    if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
    }
    const valid = gen.name("valid");
    const len = gen.const("len", (0, codegen_1._) `${data}.length`);
    schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
        gen.if((0, codegen_1._) `${len} > ${i}`, () => cxt.subschema({
            keyword,
            schemaProp: i,
            dataProp: i,
        }, valid));
        cxt.ok(valid);
    });
    function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
            const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
            (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
    }
}
exports.validateTuple = validateTuple;
exports["default"] = def;
//# sourceMappingURL=items.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/items2020.js":
/*!********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/items2020.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const additionalItems_1 = __webpack_require__(/*! ./additionalItems */ "./node_modules/ajv/dist/vocabularies/applicator/additionalItems.js");
const error = {
    message: ({ params: { len } }) => (0, codegen_1.str) `must NOT have more than ${len} items`,
    params: ({ params: { len } }) => (0, codegen_1._) `{limit: ${len}}`,
};
const def = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error,
    code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        if (prefixItems)
            (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
            cxt.ok((0, code_1.validateArray)(cxt));
    },
};
exports["default"] = def;
//# sourceMappingURL=items2020.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/not.js":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/not.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: true,
    code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
            cxt.fail();
            return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
            keyword: "not",
            compositeRule: true,
            createErrors: false,
            allErrors: false,
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
    },
    error: { message: "must NOT be valid" },
};
exports["default"] = def;
//# sourceMappingURL=not.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/oneOf.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/oneOf.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "must match exactly one schema in oneOf",
    params: ({ params }) => (0, codegen_1._) `{passingSchemas: ${params.passing}}`,
};
const def = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: true,
    error,
    code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        /* istanbul ignore if */
        if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
            return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        // TODO possibly fail straight away (with warning or exception) if there are two empty always valid schemas
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
            schArr.forEach((sch, i) => {
                let schCxt;
                if ((0, util_1.alwaysValidSchema)(it, sch)) {
                    gen.var(schValid, true);
                }
                else {
                    schCxt = cxt.subschema({
                        keyword: "oneOf",
                        schemaProp: i,
                        compositeRule: true,
                    }, schValid);
                }
                if (i > 0) {
                    gen
                        .if((0, codegen_1._) `${schValid} && ${valid}`)
                        .assign(valid, false)
                        .assign(passing, (0, codegen_1._) `[${passing}, ${i}]`)
                        .else();
                }
                gen.if(schValid, () => {
                    gen.assign(valid, true);
                    gen.assign(passing, i);
                    if (schCxt)
                        cxt.mergeEvaluated(schCxt, codegen_1.Name);
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=oneOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/patternProperties.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const util_2 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 ||
            (alwaysValidPatterns.length === patterns.length &&
                (!it.opts.unevaluated || it.props === true))) {
            return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
            it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
            for (const pat of patterns) {
                if (checkProperties)
                    checkMatchingProperties(pat);
                if (it.allErrors) {
                    validateProperties(pat);
                }
                else {
                    gen.var(valid, true); // TODO var
                    validateProperties(pat);
                    gen.if(valid);
                }
            }
        }
        function checkMatchingProperties(pat) {
            for (const prop in checkProperties) {
                if (new RegExp(pat).test(prop)) {
                    (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
                }
            }
        }
        function validateProperties(pat) {
            gen.forIn("key", data, (key) => {
                gen.if((0, codegen_1._) `${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
                    const alwaysValid = alwaysValidPatterns.includes(pat);
                    if (!alwaysValid) {
                        cxt.subschema({
                            keyword: "patternProperties",
                            schemaProp: pat,
                            dataProp: key,
                            dataPropType: util_2.Type.Str,
                        }, valid);
                    }
                    if (it.opts.unevaluated && props !== true) {
                        gen.assign((0, codegen_1._) `${props}[${key}]`, true);
                    }
                    else if (!alwaysValid && !it.allErrors) {
                        // can short-circuit if `unevaluatedProperties` is not supported (opts.next === false)
                        // or if all properties were evaluated (props === true)
                        gen.if((0, codegen_1.not)(valid), () => gen.break());
                    }
                });
            });
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=patternProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/prefixItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const items_1 = __webpack_require__(/*! ./items */ "./node_modules/ajv/dist/vocabularies/applicator/items.js");
const def = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (cxt) => (0, items_1.validateTuple)(cxt, "items"),
};
exports["default"] = def;
//# sourceMappingURL=prefixItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/properties.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/properties.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_1 = __webpack_require__(/*! ../../compile/validate */ "./node_modules/ajv/dist/compile/validate/index.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const additionalProperties_1 = __webpack_require__(/*! ./additionalProperties */ "./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js");
const def = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === undefined) {
            additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
            it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
            it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
            return;
        const valid = gen.name("valid");
        for (const prop of properties) {
            if (hasDefault(prop)) {
                applyPropertySchema(prop);
            }
            else {
                gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
                applyPropertySchema(prop);
                if (!it.allErrors)
                    gen.else().var(valid, true);
                gen.endIf();
            }
            cxt.it.definedProperties.add(prop);
            cxt.ok(valid);
        }
        function hasDefault(prop) {
            return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== undefined;
        }
        function applyPropertySchema(prop) {
            cxt.subschema({
                keyword: "properties",
                schemaProp: prop,
                dataProp: prop,
            }, valid);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=properties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js":
/*!************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/propertyNames.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: "property name must be valid",
    params: ({ params }) => (0, codegen_1._) `{propertyName: ${params.propertyName}}`,
};
const def = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error,
    code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
            return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
            cxt.setParams({ propertyName: key });
            cxt.subschema({
                keyword: "propertyNames",
                data: key,
                dataTypes: ["string"],
                propertyName: key,
                compositeRule: true,
            }, valid);
            gen.if((0, codegen_1.not)(valid), () => {
                cxt.error(true);
                if (!it.allErrors)
                    gen.break();
            });
        });
        cxt.ok(valid);
    },
};
exports["default"] = def;
//# sourceMappingURL=propertyNames.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/applicator/thenElse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/applicator/thenElse.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword, parentSchema, it }) {
        if (parentSchema.if === undefined)
            (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
    },
};
exports["default"] = def;
//# sourceMappingURL=thenElse.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/code.js":
/*!****************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/code.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
const codegen_1 = __webpack_require__(/*! ../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const names_1 = __webpack_require__(/*! ../compile/names */ "./node_modules/ajv/dist/compile/names.js");
function checkReportMissingProp(cxt, prop) {
    const { gen, data, it } = cxt;
    gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._) `${prop}` }, true);
        cxt.error();
    });
}
exports.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
    return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._) `${missing} = ${prop}`)));
}
exports.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
    cxt.setParams({ missingProperty: missing }, true);
    cxt.error();
}
exports.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
    return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._) `Object.prototype.hasOwnProperty`,
    });
}
exports.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
    return (0, codegen_1._) `${hasPropFunc(gen)}.call(${data}, ${property})`;
}
exports.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
    return ownProperties ? (0, codegen_1._) `${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
exports.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
    const cond = (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(property)} === undefined`;
    return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
}
exports.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
    return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
exports.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
    return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
}
exports.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
    const dataAndSchema = passSchema ? (0, codegen_1._) `${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
    const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData],
    ];
    if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
    const args = (0, codegen_1._) `${dataAndSchema}, ${gen.object(...valCxt)}`;
    return context !== codegen_1.nil ? (0, codegen_1._) `${func}.call(${context}, ${args})` : (0, codegen_1._) `${func}(${args})`;
}
exports.callValidateCode = callValidateCode;
function usePattern({ gen, it: { opts } }, pattern) {
    const u = opts.unicodeRegExp ? "u" : "";
    return gen.scopeValue("pattern", {
        key: pattern,
        ref: new RegExp(pattern, u),
        code: (0, codegen_1._) `new RegExp(${pattern}, ${u})`,
    });
}
exports.usePattern = usePattern;
function validateArray(cxt) {
    const { gen, data, keyword, it } = cxt;
    const valid = gen.name("valid");
    if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
    }
    gen.var(valid, true);
    validateItems(() => gen.break());
    return valid;
    function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._) `${data}.length`);
        gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
                keyword,
                dataProp: i,
                dataPropType: util_1.Type.Num,
            }, valid);
            gen.if((0, codegen_1.not)(valid), notValid);
        });
    }
}
exports.validateArray = validateArray;
function validateUnion(cxt) {
    const { gen, schema, keyword, it } = cxt;
    /* istanbul ignore if */
    if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
    const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
    if (alwaysValid && !it.opts.unevaluated)
        return;
    const valid = gen.let("valid", false);
    const schValid = gen.name("_valid");
    gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
            keyword,
            schemaProp: i,
            compositeRule: true,
        }, schValid);
        gen.assign(valid, (0, codegen_1._) `${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        // can short-circuit if `unevaluatedProperties/Items` not supported (opts.unevaluated !== true)
        // or if all properties and items were evaluated (it.props === true && it.items === true)
        if (!merged)
            gen.if((0, codegen_1.not)(valid));
    }));
    cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
}
exports.validateUnion = validateUnion;
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/id.js":
/*!*******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/id.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const def = {
    keyword: "id",
    code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    },
};
exports["default"] = def;
//# sourceMappingURL=id.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const id_1 = __webpack_require__(/*! ./id */ "./node_modules/ajv/dist/vocabularies/core/id.js");
const ref_1 = __webpack_require__(/*! ./ref */ "./node_modules/ajv/dist/vocabularies/core/ref.js");
const core = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    id_1.default,
    ref_1.default,
];
exports["default"] = core;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/core/ref.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/core/ref.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.callRef = exports.getValidate = void 0;
const ref_error_1 = __webpack_require__(/*! ../../compile/ref_error */ "./node_modules/ajv/dist/compile/ref_error.js");
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const names_1 = __webpack_require__(/*! ../../compile/names */ "./node_modules/ajv/dist/compile/names.js");
const compile_1 = __webpack_require__(/*! ../../compile */ "./node_modules/ajv/dist/compile/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const def = {
    keyword: "$ref",
    schemaType: "string",
    code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
            return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === undefined)
            throw new ref_error_1.default(baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
            return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
            if (env === root)
                return callRef(cxt, validateName, env, env.$async);
            const rootName = gen.scopeValue("root", { ref: root });
            return callRef(cxt, (0, codegen_1._) `${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
            const v = getValidate(cxt, sch);
            callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
            const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
            const valid = gen.name("valid");
            const schCxt = cxt.subschema({
                schema: sch,
                dataTypes: [],
                schemaPath: codegen_1.nil,
                topSchemaRef: schName,
                errSchemaPath: $ref,
            }, valid);
            cxt.mergeEvaluated(schCxt);
            cxt.ok(valid);
        }
    },
};
function getValidate(cxt, sch) {
    const { gen } = cxt;
    return sch.validate
        ? gen.scopeValue("validate", { ref: sch.validate })
        : (0, codegen_1._) `${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
exports.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
    const { gen, it } = cxt;
    const { allErrors, schemaEnv: env, opts } = it;
    const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
    if ($async)
        callAsyncRef();
    else
        callSyncRef();
    function callAsyncRef() {
        if (!env.$async)
            throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
            gen.code((0, codegen_1._) `await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
            addEvaluatedFrom(v); // TODO will not work with async, it has to be returned with the result
            if (!allErrors)
                gen.assign(valid, true);
        }, (e) => {
            gen.if((0, codegen_1._) `!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
            addErrorsFrom(e);
            if (!allErrors)
                gen.assign(valid, false);
        });
        cxt.ok(valid);
    }
    function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
    }
    function addErrorsFrom(source) {
        const errs = (0, codegen_1._) `${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._) `${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`); // TODO tagged
        gen.assign(names_1.default.errors, (0, codegen_1._) `${names_1.default.vErrors}.length`);
    }
    function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
            return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        // TODO refactor
        if (it.props !== true) {
            if (schEvaluated && !schEvaluated.dynamicProps) {
                if (schEvaluated.props !== undefined) {
                    it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
                }
            }
            else {
                const props = gen.var("props", (0, codegen_1._) `${source}.evaluated.props`);
                it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
            }
        }
        if (it.items !== true) {
            if (schEvaluated && !schEvaluated.dynamicItems) {
                if (schEvaluated.items !== undefined) {
                    it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
                }
            }
            else {
                const items = gen.var("items", (0, codegen_1._) `${source}.evaluated.items`);
                it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
            }
        }
    }
}
exports.callRef = callRef;
exports["default"] = def;
//# sourceMappingURL=ref.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const types_1 = __webpack_require__(/*! ../discriminator/types */ "./node_modules/ajv/dist/vocabularies/discriminator/types.js");
const error = {
    message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag
        ? `tag "${tagName}" must be string`
        : `value of tag "${tagName}" must be in oneOf`,
    params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._) `{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`,
};
const def = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error,
    code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
            throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
            throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
            throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
            throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._) `${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._) `typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
            const mapping = getMapping();
            gen.if(false);
            for (const tagValue in mapping) {
                gen.elseIf((0, codegen_1._) `${tag} === ${tagValue}`);
                gen.assign(valid, applyTagSchema(mapping[tagValue]));
            }
            gen.else();
            cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
            gen.endIf();
        }
        function applyTagSchema(schemaProp) {
            const _valid = gen.name("valid");
            const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
            cxt.mergeEvaluated(schCxt, codegen_1.Name);
            return _valid;
        }
        function getMapping() {
            var _a;
            const oneOfMapping = {};
            const topRequired = hasRequired(parentSchema);
            let tagRequired = true;
            for (let i = 0; i < oneOf.length; i++) {
                const sch = oneOf[i];
                const propSch = (_a = sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
                if (typeof propSch != "object") {
                    throw new Error(`discriminator: oneOf schemas must have "properties/${tagName}"`);
                }
                tagRequired = tagRequired && (topRequired || hasRequired(sch));
                addMappings(propSch, i);
            }
            if (!tagRequired)
                throw new Error(`discriminator: "${tagName}" must be required`);
            return oneOfMapping;
            function hasRequired({ required }) {
                return Array.isArray(required) && required.includes(tagName);
            }
            function addMappings(sch, i) {
                if (sch.const) {
                    addMapping(sch.const, i);
                }
                else if (sch.enum) {
                    for (const tagValue of sch.enum) {
                        addMapping(tagValue, i);
                    }
                }
                else {
                    throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
                }
            }
            function addMapping(tagValue, i) {
                if (typeof tagValue != "string" || tagValue in oneOfMapping) {
                    throw new Error(`discriminator: "${tagName}" values must be unique strings`);
                }
                oneOfMapping[tagValue] = i;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/discriminator/types.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/discriminator/types.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DiscrError = void 0;
var DiscrError;
(function (DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
})(DiscrError = exports.DiscrError || (exports.DiscrError = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/draft7.js":
/*!******************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/draft7.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/ajv/dist/vocabularies/core/index.js");
const validation_1 = __webpack_require__(/*! ./validation */ "./node_modules/ajv/dist/vocabularies/validation/index.js");
const applicator_1 = __webpack_require__(/*! ./applicator */ "./node_modules/ajv/dist/vocabularies/applicator/index.js");
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/index.js");
const metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/ajv/dist/vocabularies/metadata.js");
const draft7Vocabularies = [
    core_1.default,
    validation_1.default,
    (0, applicator_1.default)(),
    format_1.default,
    metadata_1.metadataVocabulary,
    metadata_1.contentVocabulary,
];
exports["default"] = draft7Vocabularies;
//# sourceMappingURL=draft7.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/format.js":
/*!*************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/format.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match format "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{format: ${schemaCode}}`,
};
const def = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: true,
    error,
    code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
            return;
        if ($data)
            validate$DataFormat();
        else
            validateFormat();
        function validate$DataFormat() {
            const fmts = gen.scopeValue("formats", {
                ref: self.formats,
                code: opts.code.formats,
            });
            const fDef = gen.const("fDef", (0, codegen_1._) `${fmts}[${schemaCode}]`);
            const fType = gen.let("fType");
            const format = gen.let("format");
            // TODO simplify
            gen.if((0, codegen_1._) `typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._) `${fDef}.type || "string"`).assign(format, (0, codegen_1._) `${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._) `"string"`).assign(format, fDef));
            cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
            function unknownFmt() {
                if (opts.strictSchema === false)
                    return codegen_1.nil;
                return (0, codegen_1._) `${schemaCode} && !${format}`;
            }
            function invalidFmt() {
                const callFormat = schemaEnv.$async
                    ? (0, codegen_1._) `(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))`
                    : (0, codegen_1._) `${format}(${data})`;
                const validData = (0, codegen_1._) `(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
                return (0, codegen_1._) `${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
            }
        }
        function validateFormat() {
            const formatDef = self.formats[schema];
            if (!formatDef) {
                unknownFormat();
                return;
            }
            if (formatDef === true)
                return;
            const [fmtType, format, fmtRef] = getFormat(formatDef);
            if (fmtType === ruleType)
                cxt.pass(validCondition());
            function unknownFormat() {
                if (opts.strictSchema === false) {
                    self.logger.warn(unknownMsg());
                    return;
                }
                throw new Error(unknownMsg());
                function unknownMsg() {
                    return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
                }
            }
            function getFormat(fmtDef) {
                const code = fmtDef instanceof RegExp
                    ? (0, codegen_1.regexpCode)(fmtDef)
                    : opts.code.formats
                        ? (0, codegen_1._) `${opts.code.formats}${(0, codegen_1.getProperty)(schema)}`
                        : undefined;
                const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
                if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
                    return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._) `${fmt}.validate`];
                }
                return ["string", fmtDef, fmt];
            }
            function validCondition() {
                if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
                    if (!schemaEnv.$async)
                        throw new Error("async format in sync schema");
                    return (0, codegen_1._) `await ${fmtRef}(${data})`;
                }
                return typeof format == "function" ? (0, codegen_1._) `${fmtRef}(${data})` : (0, codegen_1._) `${fmtRef}.test(${data})`;
            }
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/format/index.js":
/*!************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/format/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const format_1 = __webpack_require__(/*! ./format */ "./node_modules/ajv/dist/vocabularies/format/format.js");
const format = [format_1.default];
exports["default"] = format;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/metadata.js":
/*!********************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/metadata.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contentVocabulary = exports.metadataVocabulary = void 0;
exports.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples",
];
exports.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema",
];
//# sourceMappingURL=metadata.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/const.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/const.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to constant",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValue: ${schemaCode}}`,
};
const def = {
    keyword: "const",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || (schema && typeof schema == "object")) {
            cxt.fail$data((0, codegen_1._) `!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        }
        else {
            cxt.fail((0, codegen_1._) `${schema} !== ${data}`);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=const.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/enum.js":
/*!***************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/enum.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: "must be equal to one of the allowed values",
    params: ({ schemaCode }) => (0, codegen_1._) `{allowedValues: ${schemaCode}}`,
};
const def = {
    keyword: "enum",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
            throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        const eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
            valid = gen.let("valid");
            cxt.block$data(valid, loopEnum);
        }
        else {
            /* istanbul ignore if */
            if (!Array.isArray(schema))
                throw new Error("ajv implementation error");
            const vSchema = gen.const("vSchema", schemaCode);
            valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
            gen.assign(valid, false);
            gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._) `${eql}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
            const sch = schema[i];
            return typeof sch === "object" && sch !== null
                ? (0, codegen_1._) `${eql}(${data}, ${vSchema}[${i}])`
                : (0, codegen_1._) `${data} === ${sch}`;
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=enum.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const limitNumber_1 = __webpack_require__(/*! ./limitNumber */ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js");
const multipleOf_1 = __webpack_require__(/*! ./multipleOf */ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js");
const limitLength_1 = __webpack_require__(/*! ./limitLength */ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js");
const pattern_1 = __webpack_require__(/*! ./pattern */ "./node_modules/ajv/dist/vocabularies/validation/pattern.js");
const limitProperties_1 = __webpack_require__(/*! ./limitProperties */ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js");
const required_1 = __webpack_require__(/*! ./required */ "./node_modules/ajv/dist/vocabularies/validation/required.js");
const limitItems_1 = __webpack_require__(/*! ./limitItems */ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js");
const uniqueItems_1 = __webpack_require__(/*! ./uniqueItems */ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js");
const const_1 = __webpack_require__(/*! ./const */ "./node_modules/ajv/dist/vocabularies/validation/const.js");
const enum_1 = __webpack_require__(/*! ./enum */ "./node_modules/ajv/dist/vocabularies/validation/enum.js");
const validation = [
    // number
    limitNumber_1.default,
    multipleOf_1.default,
    // string
    limitLength_1.default,
    pattern_1.default,
    // object
    limitProperties_1.default,
    required_1.default,
    // array
    limitItems_1.default,
    uniqueItems_1.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    const_1.default,
    enum_1.default,
];
exports["default"] = validation;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitItems.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitItems.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `${data}.length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitItems.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitLength.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitLength.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const ucs2length_1 = __webpack_require__(/*! ../../runtime/ucs2length */ "./node_modules/ajv/dist/runtime/ucs2length.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} characters`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._) `${data}.length` : (0, codegen_1._) `${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._) `${len} ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitLength.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitNumber.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitNumber.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const ops = codegen_1.operators;
const KWDs = {
    maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
    minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
    exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
    exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE },
};
const error = {
    message: ({ keyword, schemaCode }) => (0, codegen_1.str) `must be ${KWDs[keyword].okStr} ${schemaCode}`,
    params: ({ keyword, schemaCode }) => (0, codegen_1._) `{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`,
};
const def = {
    keyword: Object.keys(KWDs),
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._) `${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitNumber.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/limitProperties.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/limitProperties.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str) `must NOT have ${comp} than ${schemaCode} items`;
    },
    params: ({ schemaCode }) => (0, codegen_1._) `{limit: ${schemaCode}}`,
};
const def = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._) `Object.keys(${data}).length ${op} ${schemaCode}`);
    },
};
exports["default"] = def;
//# sourceMappingURL=limitProperties.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/multipleOf.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/multipleOf.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must be multiple of ${schemaCode}`,
    params: ({ schemaCode }) => (0, codegen_1._) `{multipleOf: ${schemaCode}}`,
};
const def = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        // const bdt = bad$DataType(schemaCode, <string>def.schemaType, $data)
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec
            ? (0, codegen_1._) `Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}`
            : (0, codegen_1._) `${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._) `(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
    },
};
exports["default"] = def;
//# sourceMappingURL=multipleOf.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/pattern.js":
/*!******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/pattern.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const error = {
    message: ({ schemaCode }) => (0, codegen_1.str) `must match pattern "${schemaCode}"`,
    params: ({ schemaCode }) => (0, codegen_1._) `{pattern: ${schemaCode}}`,
};
const def = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: true,
    error,
    code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        // TODO regexp should be wrapped in try/catchs
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._) `(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._) `!${regExp}.test(${data})`);
    },
};
exports["default"] = def;
//# sourceMappingURL=pattern.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/required.js":
/*!*******************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/required.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const code_1 = __webpack_require__(/*! ../code */ "./node_modules/ajv/dist/vocabularies/code.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const error = {
    message: ({ params: { missingProperty } }) => (0, codegen_1.str) `must have required property '${missingProperty}'`,
    params: ({ params: { missingProperty } }) => (0, codegen_1._) `{missingProperty: ${missingProperty}}`,
};
const def = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: true,
    error,
    code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
            return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
            allErrorsMode();
        else
            exitOnErrorMode();
        if (opts.strictRequired) {
            const props = cxt.parentSchema.properties;
            const { definedProperties } = cxt.it;
            for (const requiredKey of schema) {
                if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === undefined && !definedProperties.has(requiredKey)) {
                    const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
                    const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
                    (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
                }
            }
        }
        function allErrorsMode() {
            if (useLoop || $data) {
                cxt.block$data(codegen_1.nil, loopAllRequired);
            }
            else {
                for (const prop of schema) {
                    (0, code_1.checkReportMissingProp)(cxt, prop);
                }
            }
        }
        function exitOnErrorMode() {
            const missing = gen.let("missing");
            if (useLoop || $data) {
                const valid = gen.let("valid", true);
                cxt.block$data(valid, () => loopUntilMissing(missing, valid));
                cxt.ok(valid);
            }
            else {
                gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
                (0, code_1.reportMissingProp)(cxt, missing);
                gen.else();
            }
        }
        function loopAllRequired() {
            gen.forOf("prop", schemaCode, (prop) => {
                cxt.setParams({ missingProperty: prop });
                gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
            });
        }
        function loopUntilMissing(missing, valid) {
            cxt.setParams({ missingProperty: missing });
            gen.forOf(missing, schemaCode, () => {
                gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
                gen.if((0, codegen_1.not)(valid), () => {
                    cxt.error();
                    gen.break();
                });
            }, codegen_1.nil);
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=required.js.map

/***/ }),

/***/ "./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ajv/dist/vocabularies/validation/uniqueItems.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const dataType_1 = __webpack_require__(/*! ../../compile/validate/dataType */ "./node_modules/ajv/dist/compile/validate/dataType.js");
const codegen_1 = __webpack_require__(/*! ../../compile/codegen */ "./node_modules/ajv/dist/compile/codegen/index.js");
const util_1 = __webpack_require__(/*! ../../compile/util */ "./node_modules/ajv/dist/compile/util.js");
const equal_1 = __webpack_require__(/*! ../../runtime/equal */ "./node_modules/ajv/dist/runtime/equal.js");
const error = {
    message: ({ params: { i, j } }) => (0, codegen_1.str) `must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
    params: ({ params: { i, j } }) => (0, codegen_1._) `{i: ${i}, j: ${j}}`,
};
const def = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: true,
    error,
    code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
            return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._) `${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
            const i = gen.let("i", (0, codegen_1._) `${data}.length`);
            const j = gen.let("j");
            cxt.setParams({ i, j });
            gen.assign(valid, true);
            gen.if((0, codegen_1._) `${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
            return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
            const item = gen.name("item");
            const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
            const indices = gen.const("indices", (0, codegen_1._) `{}`);
            gen.for((0, codegen_1._) `;${i}--;`, () => {
                gen.let(item, (0, codegen_1._) `${data}[${i}]`);
                gen.if(wrongType, (0, codegen_1._) `continue`);
                if (itemTypes.length > 1)
                    gen.if((0, codegen_1._) `typeof ${item} == "string"`, (0, codegen_1._) `${item} += "_"`);
                gen
                    .if((0, codegen_1._) `typeof ${indices}[${item}] == "number"`, () => {
                    gen.assign(j, (0, codegen_1._) `${indices}[${item}]`);
                    cxt.error();
                    gen.assign(valid, false).break();
                })
                    .code((0, codegen_1._) `${indices}[${item}] = ${i}`);
            });
        }
        function loopN2(i, j) {
            const eql = (0, util_1.useFunc)(gen, equal_1.default);
            const outer = gen.name("outer");
            gen.label(outer).for((0, codegen_1._) `;${i}--;`, () => gen.for((0, codegen_1._) `${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._) `${eql}(${data}[${i}], ${data}[${j}])`, () => {
                cxt.error();
                gen.assign(valid, false).break(outer);
            })));
        }
    },
};
exports["default"] = def;
//# sourceMappingURL=uniqueItems.js.map

/***/ }),

/***/ "./node_modules/fast-deep-equal/index.js":
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


// do not edit .js files directly - edit src/index.jst



module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};


/***/ }),

/***/ "./node_modules/json-schema-traverse/index.js":
/*!****************************************************!*\
  !*** ./node_modules/json-schema-traverse/index.js ***!
  \****************************************************/
/***/ ((module) => {

"use strict";


var traverse = module.exports = function (schema, opts, cb) {
  // Legacy support for v0.3.1 and earlier.
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }

  cb = opts.cb || cb;
  var pre = (typeof cb == 'function') ? cb : cb.pre || function() {};
  var post = cb.post || function() {};

  _traverse(opts, pre, post, schema, '', schema);
};


traverse.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};

traverse.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};

traverse.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};

traverse.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};


function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse.arrayKeywords) {
          for (var i=0; i<sch.length; i++)
            _traverse(opts, pre, post, sch[i], jsonPtr + '/' + key + '/' + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse.propsKeywords) {
        if (sch && typeof sch == 'object') {
          for (var prop in sch)
            _traverse(opts, pre, post, sch[prop], jsonPtr + '/' + key + '/' + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse.keywords || (opts.allKeys && !(key in traverse.skipKeywords))) {
        _traverse(opts, pre, post, sch, jsonPtr + '/' + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}


function escapeJsonPtr(str) {
  return str.replace(/~/g, '~0').replace(/\//g, '~1');
}


/***/ }),

/***/ "./src/Debug.ts":
/*!**********************!*\
  !*** ./src/Debug.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const config = __webpack_require__(/*! ./config.json */ "./src/config.json");
class Debug {
    constructor(options = {}) {
        this.defaultOptions = {
            margin: 10,
            padding: 4,
            font: '10pt Lucida Console, monospace',
            lineHeight: 12,
            foregroundColour: '#fff',
            backgroundColour: '#3338',
            defaultValue: {
                align: 'left',
                showLabel: true,
            },
            defaultMarker: {
                showLabel: true,
                showValue: true,
                showMarker: true,
                markerSize: 6,
                markerStyle: 'x',
                markerColour: '#ccc',
                space: 'world',
                labelOffset: (0, commonjs_1.vec)(10),
            },
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.values = new Map();
        this.markers = new Map();
    }
    static initialise(options = {}) {
        Debug.instance = new Debug(options);
    }
    static getInstance() {
        if (Debug.instance == null) {
            Debug.initialise();
        }
        return Debug.instance;
    }
    static value(label, value, options = {}) {
        const debug = Debug.getInstance();
        debug.values.set(label, Object.assign({ label, value }, debug.defaultOptions.defaultValue, options));
    }
    static marker(label, value, position, options = {}) {
        const debug = Debug.getInstance();
        debug.markers.set(label, Object.assign({ label, value, position }, debug.defaultOptions.defaultMarker, options));
    }
    static draw(context) {
        const debug = Debug.getInstance();
        context.save();
        context.scale(1 / config.scaleFactor, 1 / config.scaleFactor);
        debug.markers.forEach(marker => {
            if (marker.space === 'world') {
                debug.drawMarker(context, marker);
            }
        });
        context.restore();
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        let position;
        let leftY = debug.options.margin;
        let rightY = debug.options.margin;
        const lineHeight = (debug.options.lineHeight + debug.options.padding * 2);
        debug.values.forEach(value => {
            var _a, _b, _c, _d;
            switch (value.align) {
                case 'left':
                    position = (0, commonjs_1.vec)(debug.options.margin, leftY);
                    leftY += lineHeight;
                    break;
                case 'right':
                    position = (0, commonjs_1.vec)(context.canvas.clientWidth - debug.options.margin, rightY);
                    rightY += lineHeight;
                    break;
            }
            debug.drawLabel(context, (value.showLabel ? `${value.label}: ` : '') + `${value.value}`, position, value.align, (_a = value.padding) !== null && _a !== void 0 ? _a : debug.options.padding, (_b = value.font) !== null && _b !== void 0 ? _b : debug.options.font, (_c = value.foregroundColour) !== null && _c !== void 0 ? _c : debug.options.foregroundColour, (_d = value.backgroundColour) !== null && _d !== void 0 ? _d : debug.options.backgroundColour);
        });
        debug.markers.forEach(marker => {
            if (marker.space === 'screen') {
                debug.drawMarker(context, marker);
            }
        });
        context.restore();
        debug.values.clear();
        debug.markers.clear();
    }
    drawMarker(context, marker) {
        var _a, _b, _c, _d, _e;
        context.save();
        const position = commonjs_1.vec.mul((_a = marker.position) !== null && _a !== void 0 ? _a : (0, commonjs_1.vec)(), config.scaleFactor);
        if (marker.showLabel || marker.showValue) {
            this.drawLabel(context, (marker.showLabel ? `${marker.label}: ` : '') + (marker.showValue ? `${marker.value}` : ''), commonjs_1.vec.add(position !== null && position !== void 0 ? position : (0, commonjs_1.vec)(), marker.labelOffset), 'left', (_b = marker.padding) !== null && _b !== void 0 ? _b : this.options.padding, (_c = marker.font) !== null && _c !== void 0 ? _c : this.options.font, (_d = marker.foregroundColour) !== null && _d !== void 0 ? _d : this.options.foregroundColour, (_e = marker.backgroundColour) !== null && _e !== void 0 ? _e : this.options.backgroundColour);
        }
        if (marker.showMarker) {
            context.lineWidth = 2;
            context.strokeStyle = context.fillStyle = marker.markerColour;
            switch (marker.markerStyle) {
                case 'x':
                    this.drawCross(context, position, marker.markerSize);
                    break;
                case '+':
                    this.drawPlus(context, position, marker.markerSize);
                    break;
                case '.':
                    this.drawDot(context, position, marker.markerSize);
                    break;
            }
        }
        context.restore();
    }
    drawLabel(context, text, position, align, padding, font, foregroundColour, backgroundColour) {
        context.save();
        context.font = font;
        context.textBaseline = 'top';
        const backgroundSize = {
            width: context.measureText(text).width + padding * 2,
            height: this.options.lineHeight + padding * 2,
        };
        const x = align === 'right' ? (position.x - backgroundSize.width) : position.x;
        context.fillStyle = backgroundColour;
        context.fillRect(x - padding, position.y - padding, backgroundSize.width, backgroundSize.height);
        context.fillStyle = foregroundColour;
        context.fillText(text, x, position.y);
        context.restore();
    }
    drawCross(context, position, size) {
        context.beginPath();
        const halfSize = size / 2;
        context.moveTo(position.x - halfSize, position.y - halfSize);
        context.lineTo(position.x + halfSize, position.y + halfSize);
        context.moveTo(position.x - halfSize, position.y + halfSize);
        context.lineTo(position.x + halfSize, position.y - halfSize);
        context.stroke();
    }
    drawPlus(context, position, size) {
        context.beginPath();
        const halfSize = size / 2;
        context.moveTo(position.x, position.y - halfSize);
        context.lineTo(position.x, position.y + halfSize);
        context.moveTo(position.x - halfSize, position.y);
        context.lineTo(position.x + halfSize, position.y);
        context.stroke();
    }
    drawDot(context, position, size) {
        context.beginPath();
        context.arc(position.x, position.y, size / 2, 0, Math.PI * 2);
        context.fill();
    }
}
exports["default"] = Debug;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const config = __webpack_require__(/*! ./config.json */ "./src/config.json");
const constants = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const Content_1 = __webpack_require__(/*! ./content/Content */ "./src/content/Content.ts");
const Debug_1 = __webpack_require__(/*! ./Debug */ "./src/Debug.ts");
const Input_1 = __webpack_require__(/*! ./Input */ "./src/Input.ts");
const states_1 = __webpack_require__(/*! ./states */ "./src/states/index.ts");
const StateManager_1 = __webpack_require__(/*! ./states/StateManager */ "./src/states/StateManager.ts");
class Game {
    constructor(container) {
        this.frameRate = 0;
        this.frameCount = 0;
        if (container === null) {
            throw new Error('A valid container element must be specified.');
        }
        if (container.tagName.toLowerCase() !== 'canvas') {
            throw new Error('Container element must be a canvas.');
        }
        this.canvas = container;
        const context = this.canvas.getContext('2d');
        if (context !== null) {
            this.context = context;
        }
        else {
            throw new Error("Couldn't get a 2d context.");
        }
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context.imageSmoothingEnabled = false;
    }
    initialise() {
        Debug_1.default.initialise();
        Input_1.default.initialise();
        Content_1.default.initialise();
        StateManager_1.default.initialise();
        this.lastFrameTime = this.lastFrameCountTime = performance.now();
        this.loop();
        StateManager_1.default.push(new states_1.LoadingState());
    }
    loop() {
        const now = performance.now();
        const elapsedTime = Math.min(now - this.lastFrameTime, constants.FPS_MIN);
        if (now - this.lastFrameCountTime >= 1000) {
            this.lastFrameCountTime = now;
            this.frameRate = this.frameCount;
            this.frameCount = 0;
        }
        this.frameCount++;
        this.lastFrameTime = now;
        if (config.showFPS) {
            Debug_1.default.value('FPS', this.frameRate, { align: 'right' });
        }
        this.update(elapsedTime);
        this.draw();
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update(dt) {
        Game.screen = commonjs_1.vec.mul((0, commonjs_1.vec)(this.canvas.width, this.canvas.height), 1 / config.scaleFactor);
        StateManager_1.default.update(dt);
        Input_1.default.update();
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(config.scaleFactor, 0, 0, config.scaleFactor, 0, 0);
        StateManager_1.default.draw(this.context);
        Debug_1.default.draw(this.context);
    }
}
exports["default"] = Game;


/***/ }),

/***/ "./src/Input.ts":
/*!**********************!*\
  !*** ./src/Input.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
class Input {
    constructor() {
        this.keyboardState = {};
        this.previousKeyboardState = {};
        this.mouseState = { button: false, position: (0, commonjs_1.vec)(), wheel: 0 };
        this.previousMouseState = { button: false, position: (0, commonjs_1.vec)(), wheel: 0 };
        window.addEventListener('mousedown', () => {
            this.mouseState.button = true;
        });
        window.addEventListener('mouseup', () => {
            this.mouseState.button = false;
        });
        window.addEventListener('touchstart', () => {
            this.mouseState.button = true;
        });
        window.addEventListener('touchend', () => {
            this.mouseState.button = false;
        });
        window.addEventListener('mousemove', e => {
            this.mouseState.position.x = e.offsetX;
            this.mouseState.position.y = e.offsetY;
        });
        window.addEventListener('keydown', e => {
            this.keyboardState[e.code] = true;
        });
        window.addEventListener('keyup', e => {
            this.keyboardState[e.code] = false;
        });
        window.addEventListener('wheel', e => {
            this.mouseState.wheel = e.deltaY > 0 ? 1 : -1;
        });
    }
    static initialise() {
        Input.instance = new Input();
    }
    static getInstance() {
        if (Input.instance === undefined) {
            throw new Error('Input manager not properly initialised');
        }
        return Input.instance;
    }
    static update() {
        const instance = Input.getInstance();
        instance.previousKeyboardState = Object.assign({}, instance.keyboardState);
        instance.previousMouseState = {
            button: instance.mouseState.button,
            position: commonjs_1.vec.cpy(instance.mouseState.position),
            wheel: 0,
        };
    }
    static keyDown(key) {
        const instance = Input.getInstance();
        if (key == null) {
            for (const k in instance.keyboardState) {
                if (instance.keyboardState[k]) {
                    return true;
                }
            }
            return false;
        }
        return !!instance.keyboardState[key];
    }
    static keyPressed(key) {
        const instance = Input.getInstance();
        if (key == null) {
            for (const k in instance.keyboardState) {
                if (instance.keyboardState[k] &&
                    (!(k in instance.previousKeyboardState) ||
                        !instance.previousKeyboardState[k])) {
                    return true;
                }
            }
            return false;
        }
        return !!instance.keyboardState[key] && !instance.previousKeyboardState[key];
    }
    static keyReleased(key) {
        const instance = Input.getInstance();
        if (key == null) {
            for (const k in instance.keyboardState) {
                if (!instance.keyboardState[k] &&
                    !!instance.previousKeyboardState[k]) {
                    return true;
                }
            }
            return false;
        }
        return !instance.keyboardState[key] && !!instance.previousKeyboardState[key];
    }
    static mouseDown() {
        const instance = Input.getInstance();
        return !!instance.mouseState.button;
    }
    static mousePressed() {
        const instance = Input.getInstance();
        return !!instance.mouseState.button && !instance.previousMouseState.button;
    }
    static mouseReleased() {
        const instance = Input.getInstance();
        return !instance.mouseState.button && !!instance.previousMouseState.button;
    }
    static mouseWheelUp() {
        const instance = Input.getInstance();
        return instance.mouseState.wheel > 0;
    }
    static mouseWheelDown() {
        const instance = Input.getInstance();
        return instance.mouseState.wheel < 0;
    }
    static mousePosition() {
        const instance = Input.getInstance();
        return instance.mouseState.position;
    }
}
exports["default"] = Input;


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FPS_MIN = exports.SKIP_INTRO = exports.SIMULATE_SLOW_LOADING = exports.DEBUG = void 0;
exports.DEBUG = true;
exports.SIMULATE_SLOW_LOADING = false;
exports.SKIP_INTRO = false;
exports.FPS_MIN = 1 / 30;


/***/ }),

/***/ "./src/content/Content.ts":
/*!********************************!*\
  !*** ./src/content/Content.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const ajv_1 = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
const _contentManifest = __webpack_require__(/*! ../../content/content.json */ "./content/content.json");
const constants = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const content_1 = __webpack_require__(/*! ../content */ "./src/content/index.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
const utilities = __webpack_require__(/*! ../utilities */ "./src/utilities.ts");
const contentItemLoaders = {
    [enums_1.ContentItemType.Image]: content_1.ImageLoader,
    [enums_1.ContentItemType.Sound]: content_1.SoundLoader,
    [enums_1.ContentItemType.Font]: content_1.FontLoader,
    [enums_1.ContentItemType.EntityData]: content_1.EntityDataLoader,
};
class Content {
    constructor(content) {
        this.items = {};
        this.content = content;
    }
    static initialise() {
        const contentManifest = _contentManifest;
        const validate = new ajv_1.default().compile({
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                            },
                            type: {
                                type: 'string',
                                enum: Object.values(enums_1.ContentItemType),
                            },
                            args: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
            additionalProperties: false,
        });
        if (!validate(contentManifest)) {
            constants.DEBUG && console.log(validate.errors);
            throw new Error('Invalid content manifest');
        }
        Content.instance = new Content(contentManifest.items);
    }
    static getInstance() {
        if (Content.instance === undefined) {
            throw new Error('Content manager not properly initialised');
        }
        return Content.instance;
    }
    static async load() {
        if (Content.loaded) {
            throw new Error('Content already loaded');
        }
        const instance = Content.getInstance();
        if (instance.content.length === 0) {
            throw new Error('No content items to load');
        }
        const progressDelta = 1 / instance.content.length;
        for (const c of instance.content) {
            if (constants.DEBUG && constants.SIMULATE_SLOW_LOADING) {
                await utilities.sleep(Math.randomBetween(100, 1000));
            }
            instance.items[c.name] = await contentItemLoaders[c.type](...c.args);
            Content.progress = Math.clamp(Content.progress + progressDelta, 0, 1);
        }
        Content.loaded = true;
    }
    static get(name) {
        if (!Content.loaded) {
            throw new Error('Content not loaded');
        }
        const instance = Content.getInstance();
        if (!(name in instance.items)) {
            throw new Error(`Content item "${name}" not found`);
        }
        return instance.items[name];
    }
    static testDump() {
        const instance = Content.getInstance();
        console.log(instance.items);
    }
}
exports["default"] = Content;
Content.progress = 0;
Content.loaded = false;


/***/ }),

/***/ "./src/content/EntityDataLoader.ts":
/*!*****************************************!*\
  !*** ./src/content/EntityDataLoader.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityDataLoader = void 0;
const ajv_1 = __webpack_require__(/*! ajv */ "./node_modules/ajv/dist/ajv.js");
const constants = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const Entity_1 = __webpack_require__(/*! ../entities/Entity */ "./src/entities/Entity.ts");
const JSONLoader_1 = __webpack_require__(/*! ./JSONLoader */ "./src/content/JSONLoader.ts");
const EntityDataLoader = async (url) => {
    const data = await (0, JSONLoader_1.JSONLoader)(url);
    const validate = new ajv_1.default().compile(Entity_1.EntityDataSchema);
    if (!validate(data)) {
        constants.DEBUG && console.log(validate.errors);
        throw new Error(`Invalid entity data: ${url}`);
    }
    return data;
};
exports.EntityDataLoader = EntityDataLoader;


/***/ }),

/***/ "./src/content/FontLoader.ts":
/*!***********************************!*\
  !*** ./src/content/FontLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FontLoader = void 0;
const FontLoader = async (url, family) => {
    return new Promise((resolve, reject) => {
        const font = new FontFace(family, `url(${url})`);
        font.load()
            .then(font => {
            document.fonts.add(font);
            resolve(font);
        })
            .catch(() => {
            reject(`Error loading font "${url}"`);
        });
    });
};
exports.FontLoader = FontLoader;


/***/ }),

/***/ "./src/content/ImageLoader.ts":
/*!************************************!*\
  !*** ./src/content/ImageLoader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageLoader = void 0;
const ImageLoader = async (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', () => {
            reject(`Error loading image "${url}"`);
        });
    });
};
exports.ImageLoader = ImageLoader;


/***/ }),

/***/ "./src/content/JSONLoader.ts":
/*!***********************************!*\
  !*** ./src/content/JSONLoader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONLoader = void 0;
const JSONLoader = async (url) => {
    return new Promise((resolve, reject) => {
        window.fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        })
            .then(response => {
            return response.json();
        })
            .then(json => {
            resolve(json);
        })
            .catch(() => {
            reject(`Error loading json "${url}"`);
        });
    });
};
exports.JSONLoader = JSONLoader;


/***/ }),

/***/ "./src/content/SoundLoader.ts":
/*!************************************!*\
  !*** ./src/content/SoundLoader.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoundLoader = void 0;
const SoundLoader = async (url) => {
    return new Promise((resolve, reject) => {
        const sound = new Audio(url);
        sound.addEventListener('loadeddata', () => {
            resolve(sound);
        });
        sound.addEventListener('error', () => {
            reject(`Error loading sound "${url}"`);
        });
    });
};
exports.SoundLoader = SoundLoader;


/***/ }),

/***/ "./src/content/index.ts":
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SoundLoader = exports.ImageLoader = exports.FontLoader = exports.EntityDataLoader = void 0;
var EntityDataLoader_1 = __webpack_require__(/*! ./EntityDataLoader */ "./src/content/EntityDataLoader.ts");
Object.defineProperty(exports, "EntityDataLoader", ({ enumerable: true, get: function () { return EntityDataLoader_1.EntityDataLoader; } }));
var FontLoader_1 = __webpack_require__(/*! ./FontLoader */ "./src/content/FontLoader.ts");
Object.defineProperty(exports, "FontLoader", ({ enumerable: true, get: function () { return FontLoader_1.FontLoader; } }));
var ImageLoader_1 = __webpack_require__(/*! ./ImageLoader */ "./src/content/ImageLoader.ts");
Object.defineProperty(exports, "ImageLoader", ({ enumerable: true, get: function () { return ImageLoader_1.ImageLoader; } }));
var SoundLoader_1 = __webpack_require__(/*! ./SoundLoader */ "./src/content/SoundLoader.ts");
Object.defineProperty(exports, "SoundLoader", ({ enumerable: true, get: function () { return SoundLoader_1.SoundLoader; } }));


/***/ }),

/***/ "./src/entities/Entity.ts":
/*!********************************!*\
  !*** ./src/entities/Entity.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityDataSchema = void 0;
const uuid = __webpack_require__(/*! uuid-random */ "./node_modules/uuid-random/index.js");
const Component_1 = __webpack_require__(/*! ./components/Component */ "./src/entities/components/Component.ts");
exports.EntityDataSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        components: {
            type: 'array',
            items: Component_1.ComponentDataSchema,
        },
    },
    additionalProperties: false,
};
class Entity {
    constructor() {
        this.id = uuid();
        this.components = {};
    }
    static fromData(data) {
        return new Entity();
    }
}
exports["default"] = Entity;


/***/ }),

/***/ "./src/entities/EntityManager.ts":
/*!***************************************!*\
  !*** ./src/entities/EntityManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class EntityManager {
    constructor() {
        this.systems = [];
        this.entities = [];
    }
    initialise() {
    }
    addEntity(entity) {
    }
    removeEntity(entity) {
    }
    update(dt) {
        this.systems.forEach(system => system.update(dt, this.entities));
    }
    draw(context) {
        this.systems.forEach(system => system.draw(context, this.entities));
    }
}
exports["default"] = EntityManager;


/***/ }),

/***/ "./src/entities/components/Component.ts":
/*!**********************************************!*\
  !*** ./src/entities/components/Component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComponentDataSchema = void 0;
exports.ComponentDataSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
    },
};
class Component {
    constructor() { }
}
exports["default"] = Component;


/***/ }),

/***/ "./src/enums.ts":
/*!**********************!*\
  !*** ./src/enums.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Anchor = exports.Key = exports.StateTransitionType = exports.ContentItemType = void 0;
var ContentItemType;
(function (ContentItemType) {
    ContentItemType["Image"] = "image";
    ContentItemType["Sound"] = "sound";
    ContentItemType["Font"] = "font";
    ContentItemType["EntityData"] = "entityData";
})(ContentItemType = exports.ContentItemType || (exports.ContentItemType = {}));
var StateTransitionType;
(function (StateTransitionType) {
    StateTransitionType[StateTransitionType["In"] = 0] = "In";
    StateTransitionType[StateTransitionType["Out"] = 1] = "Out";
    StateTransitionType[StateTransitionType["None"] = 2] = "None";
})(StateTransitionType = exports.StateTransitionType || (exports.StateTransitionType = {}));
var Key;
(function (Key) {
    Key["Up"] = "ArrowUp";
    Key["Down"] = "ArrowDown";
    Key["Left"] = "ArrowLeft";
    Key["Right"] = "ArrowRight";
    Key["Space"] = "Space";
    Key["Enter"] = "Enter";
    Key["Shift"] = "Shift";
    Key["Control"] = "Control";
    Key["Escape"] = "Escape";
    Key["Digit0"] = "Digit0";
    Key["Digit1"] = "Digit1";
    Key["Digit2"] = "Digit2";
    Key["Digit3"] = "Digit3";
    Key["Digit4"] = "Digit4";
    Key["Digit5"] = "Digit5";
    Key["Digit6"] = "Digit6";
    Key["Digit7"] = "Digit7";
    Key["Digit8"] = "Digit8";
    Key["Digit9"] = "Digit9";
})(Key = exports.Key || (exports.Key = {}));
var Anchor;
(function (Anchor) {
    Anchor[Anchor["TopLeft"] = 0] = "TopLeft";
    Anchor[Anchor["TopCenter"] = 1] = "TopCenter";
    Anchor[Anchor["TopRight"] = 2] = "TopRight";
    Anchor[Anchor["CenterLeft"] = 3] = "CenterLeft";
    Anchor[Anchor["Center"] = 4] = "Center";
    Anchor[Anchor["CenterRight"] = 5] = "CenterRight";
    Anchor[Anchor["BottomLeft"] = 6] = "BottomLeft";
    Anchor[Anchor["BottomCenter"] = 7] = "BottomCenter";
    Anchor[Anchor["BottomRight"] = 8] = "BottomRight";
})(Anchor = exports.Anchor || (exports.Anchor = {}));


/***/ }),

/***/ "./src/states/GameState.ts":
/*!*********************************!*\
  !*** ./src/states/GameState.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameState = void 0;
const Content_1 = __webpack_require__(/*! ../content/Content */ "./src/content/Content.ts");
const Entity_1 = __webpack_require__(/*! ../entities/Entity */ "./src/entities/Entity.ts");
const EntityManager_1 = __webpack_require__(/*! ../entities/EntityManager */ "./src/entities/EntityManager.ts");
const State_1 = __webpack_require__(/*! ./State */ "./src/states/State.ts");
class GameState extends State_1.default {
    constructor() {
        super();
        this.entityManager = new EntityManager_1.default();
    }
    initialise() {
        this.entityManager.initialise();
        Content_1.default.testDump();
        const testEntityData = Content_1.default.get('testEntity');
        console.log(testEntityData);
        const testEntity = Entity_1.default.fromData(testEntityData);
        console.log(testEntity);
        this.entityManager.addEntity(testEntity);
    }
    update(dt) {
        this.entityManager.update(dt);
    }
    draw(context) {
        this.entityManager.draw(context);
    }
}
exports.GameState = GameState;


/***/ }),

/***/ "./src/states/IntroState.ts":
/*!**********************************!*\
  !*** ./src/states/IntroState.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntroState = void 0;
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
const Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
const Input_1 = __webpack_require__(/*! ../Input */ "./src/Input.ts");
const components_1 = __webpack_require__(/*! ../ui/components */ "./src/ui/components/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/states/index.ts");
const State_1 = __webpack_require__(/*! ./State */ "./src/states/State.ts");
const StateManager_1 = __webpack_require__(/*! ./StateManager */ "./src/states/StateManager.ts");
class IntroState extends State_1.default {
    constructor() {
        super({
            transitionTime: IntroState.TRANSITION_TIME,
        });
    }
    initialise() {
        this.skipLockTime = IntroState.SKIPLOCK_TIME;
        this.autoSkipTime = IntroState.AUTOSKIP_TIME;
        this.logo = new components_1.Image('logo');
    }
    update(dt) {
        this.logo.position = commonjs_1.vec.map(commonjs_1.vec.mul(Game_1.default.screen, 1 / 2), Math.floor);
        this.logo.update();
        this.skipLockTime -= dt;
        this.autoSkipTime -= dt;
        if ((this.skipLockTime <= 0 && Input_1.default.keyPressed()) ||
            this.autoSkipTime <= 0) {
            StateManager_1.default.pop();
            StateManager_1.default.push(new _1.MainMenuState());
        }
    }
    draw(context) {
        context.save();
        if (this.transitionType !== enums_1.StateTransitionType.None) {
            context.globalAlpha = this.transitionAmount;
        }
        this.logo.draw(context);
        context.restore();
    }
}
exports.IntroState = IntroState;
IntroState.TRANSITION_TIME = 5;
IntroState.SKIPLOCK_TIME = 2;
IntroState.AUTOSKIP_TIME = 10;


/***/ }),

/***/ "./src/states/LoadingState.ts":
/*!************************************!*\
  !*** ./src/states/LoadingState.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoadingState = void 0;
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const constants = __webpack_require__(/*! ../constants */ "./src/constants.ts");
const Content_1 = __webpack_require__(/*! ../content/Content */ "./src/content/Content.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
const Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
const components_1 = __webpack_require__(/*! ../ui/components */ "./src/ui/components/index.ts");
const _1 = __webpack_require__(/*! . */ "./src/states/index.ts");
const State_1 = __webpack_require__(/*! ./State */ "./src/states/State.ts");
const StateManager_1 = __webpack_require__(/*! ./StateManager */ "./src/states/StateManager.ts");
class LoadingState extends State_1.default {
    constructor() {
        super({
            transitionTime: LoadingState.TRANSITION_TIME,
        });
    }
    initialise() {
        this.finishedLoadingContent = false;
        this.progressBar = new components_1.ProgressBar();
        this.cooldownTime = LoadingState.COOLDOWN_TIME;
        Content_1.default.load().then(() => {
            this.finishedLoadingContent = true;
        }).catch((error) => {
            constants.DEBUG && console.log(`Unable to load content: ${error}`);
        });
    }
    update(dt) {
        this.progressBar.position = commonjs_1.vec.map(commonjs_1.vec.mul(Game_1.default.screen, 1 / 2), Math.floor);
        this.progressBar.progress = Content_1.default.progress;
        this.progressBar.update(dt);
        if (this.finishedLoadingContent) {
            this.cooldownTime -= dt;
        }
        if (this.cooldownTime <= 0) {
            StateManager_1.default.pop();
            setTimeout(() => {
                StateManager_1.default.push(new _1.GameState());
            }, LoadingState.INTRO_DELAY * 1000);
        }
    }
    draw(context) {
        context.save();
        if (this.transitionType !== enums_1.StateTransitionType.None) {
            context.globalAlpha = this.transitionAmount;
        }
        this.progressBar.draw(context);
        context.restore();
    }
}
exports.LoadingState = LoadingState;
LoadingState.TRANSITION_TIME = 0.5;
LoadingState.COOLDOWN_TIME = 3;
LoadingState.INTRO_DELAY = 1;


/***/ }),

/***/ "./src/states/MainMenuState.ts":
/*!*************************************!*\
  !*** ./src/states/MainMenuState.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainMenuState = void 0;
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const workers_1 = __webpack_require__(/*! worker-loader!../workers */ "./node_modules/worker-loader/dist/cjs.js!./src/workers/index.ts");
const config = __webpack_require__(/*! ../config.json */ "./src/config.json");
const Content_1 = __webpack_require__(/*! ../content/Content */ "./src/content/Content.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
const Game_1 = __webpack_require__(/*! ../Game */ "./src/Game.ts");
const Input_1 = __webpack_require__(/*! ../Input */ "./src/Input.ts");
const components_1 = __webpack_require__(/*! ../ui/components */ "./src/ui/components/index.ts");
const MenuItem_1 = __webpack_require__(/*! ../ui/MenuItem */ "./src/ui/MenuItem.ts");
const _1 = __webpack_require__(/*! . */ "./src/states/index.ts");
const State_1 = __webpack_require__(/*! ./State */ "./src/states/State.ts");
const StateManager_1 = __webpack_require__(/*! ./StateManager */ "./src/states/StateManager.ts");
class MainMenuState extends State_1.default {
    constructor() {
        super(...arguments);
        this.testTime = 0;
    }
    initialise() {
        this.background = Content_1.default.get('menu_background');
        this.titleBanner = new components_1.Image('menu_title');
        this.testMenuItem = new MenuItem_1.default('Test Button');
        this.testWorker = new workers_1.default();
        this.testWorker.postMessage('menu');
        this.testWorker.postMessage('test');
        this.testWorker.postMessage('monkey');
        this.testWorker.onmessage = event => {
            console.log(event.data);
        };
    }
    update(dt) {
        this.testMenuItem.position = commonjs_1.vec.map(commonjs_1.vec.mul(Game_1.default.screen, 1 / 2), Math.floor);
        this.testMenuItem.update(dt);
        this.testTime += dt;
        this.testMenuItem.selected = Math.sin(this.testTime / 2) > 0;
        if (Input_1.default.keyPressed(enums_1.Key.Space)) {
            StateManager_1.default.pop();
            StateManager_1.default.push(new _1.GameState());
        }
    }
    draw(context) {
        context.save();
        if (this.transitionType !== enums_1.StateTransitionType.None) {
            context.globalAlpha = this.transitionAmount;
        }
        if (!this.backgroundPattern) {
            this.backgroundPattern = context.createPattern(this.background, 'repeat');
        }
        if (this.backgroundPattern) {
            context.fillStyle = this.backgroundPattern;
            context.fillRect(0, 0, context.canvas.width * config.scaleFactor, context.canvas.height * config.scaleFactor);
        }
        this.testMenuItem.draw(context);
        context.restore();
    }
}
exports.MainMenuState = MainMenuState;


/***/ }),

/***/ "./src/states/State.ts":
/*!*****************************!*\
  !*** ./src/states/State.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
class State {
    constructor(options = {}) {
        this.defaultOptions = {
            transitionTime: 2,
        };
        this.transitionType = enums_1.StateTransitionType.None;
        this.transitionAmount = 0;
        this.disposed = false;
        const actualOptions = Object.assign({}, this.defaultOptions, options);
        this.transitionTime = actualOptions.transitionTime;
    }
    dispose() {
        this.disposed = true;
    }
    transitionIn() {
        this.transitionType = enums_1.StateTransitionType.In;
    }
    transitionOut() {
        this.transitionType = enums_1.StateTransitionType.Out;
    }
    updateTransition(dt) {
        const amount = dt / this.transitionTime;
        if (this.transitionType === enums_1.StateTransitionType.In) {
            if (this.transitionAmount < 1) {
                this.transitionAmount = Math.clamp(this.transitionAmount + amount);
            }
            else {
                this.transitionType = enums_1.StateTransitionType.None;
            }
        }
        if (this.transitionType === enums_1.StateTransitionType.Out) {
            if (this.transitionAmount > 0) {
                this.transitionAmount = Math.clamp(this.transitionAmount - amount);
            }
            else {
                this.dispose();
            }
        }
    }
}
exports["default"] = State;


/***/ }),

/***/ "./src/states/StateManager.ts":
/*!************************************!*\
  !*** ./src/states/StateManager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const enums_1 = __webpack_require__(/*! ../enums */ "./src/enums.ts");
class StateManager {
    constructor() {
        this.states = [];
    }
    static initialise() {
        StateManager.instance = new StateManager();
    }
    static getInstance() {
        if (StateManager.instance === undefined) {
            throw new Error('State manager not properly initialised');
        }
        return StateManager.instance;
    }
    static push(state) {
        const instance = StateManager.getInstance();
        instance.states.push(state);
        state.initialise();
        state.transitionIn();
        return state;
    }
    static pop() {
        const instance = StateManager.getInstance();
        if (instance.states.length > 0) {
            let last = instance.states.length - 1;
            while (last > 0 && instance.states[last].transitionType === enums_1.StateTransitionType.Out) {
                last--;
            }
            if (last >= 0) {
                const state = instance.states[last];
                state.transitionOut();
                return state;
            }
        }
        return null;
    }
    static clear() {
        const instance = StateManager.getInstance();
        instance.states.forEach(state => {
            if (state.transitionType !== enums_1.StateTransitionType.Out) {
                state.transitionOut();
            }
        });
    }
    static update(dt) {
        const instance = StateManager.getInstance();
        if (instance.states.length > 0) {
            for (let i = instance.states.length; i--;) {
                if (instance.states[i].transitionType !== enums_1.StateTransitionType.Out) {
                    instance.states[i].update(dt);
                    break;
                }
            }
            instance.states.forEach(state => {
                state.updateTransition(dt);
            });
            instance.states = instance.states.filter(state => !state.disposed);
        }
    }
    static draw(context) {
        const instance = StateManager.getInstance();
        for (const state of instance.states) {
            state.draw(context);
        }
    }
}
exports["default"] = StateManager;


/***/ }),

/***/ "./src/states/index.ts":
/*!*****************************!*\
  !*** ./src/states/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainMenuState = exports.LoadingState = exports.IntroState = exports.GameState = void 0;
var GameState_1 = __webpack_require__(/*! ./GameState */ "./src/states/GameState.ts");
Object.defineProperty(exports, "GameState", ({ enumerable: true, get: function () { return GameState_1.GameState; } }));
var IntroState_1 = __webpack_require__(/*! ./IntroState */ "./src/states/IntroState.ts");
Object.defineProperty(exports, "IntroState", ({ enumerable: true, get: function () { return IntroState_1.IntroState; } }));
var LoadingState_1 = __webpack_require__(/*! ./LoadingState */ "./src/states/LoadingState.ts");
Object.defineProperty(exports, "LoadingState", ({ enumerable: true, get: function () { return LoadingState_1.LoadingState; } }));
var MainMenuState_1 = __webpack_require__(/*! ./MainMenuState */ "./src/states/MainMenuState.ts");
Object.defineProperty(exports, "MainMenuState", ({ enumerable: true, get: function () { return MainMenuState_1.MainMenuState; } }));


/***/ }),

/***/ "./src/ui/MenuItem.ts":
/*!****************************!*\
  !*** ./src/ui/MenuItem.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const components_1 = __webpack_require__(/*! ./components */ "./src/ui/components/index.ts");
class MenuItem {
    constructor(text, position = (0, commonjs_1.vec)(), activationHandler) {
        this.selected = false;
        this.activated = false;
        this.transition = 0;
        this.text = text;
        this.position = position;
        this.activationHandler = activationHandler;
        this.label = new components_1.Text(this.text, this.position, {
            parent: this,
            font: 'aniron-bold',
            size: 12,
            colour: '#ddb',
            strokeWidth: 2,
            strokeColour: '#210',
        });
        this.backgroundImage = new components_1.Image('menu_button', this.position, {
            parent: this,
        });
        this.selectedBackgroundImage = new components_1.Image('menu_button_selected', this.position, {
            parent: this,
        });
    }
    activate() {
        if (this.activationHandler) {
            this.activationHandler();
        }
    }
    update(dt) {
        this.label.text = this.text;
        this.label.update();
        this.label.position = commonjs_1.vec.add(this.label.position, MenuItem.LABEL_OFFSET);
        this.backgroundImage.update();
        this.selectedBackgroundImage.update();
        const amount = dt / MenuItem.TRANSITION_TIME;
        if (this.selected) {
            this.transition += amount;
        }
        else {
            this.transition -= amount;
        }
        this.transition = Math.clamp(this.transition);
    }
    draw(context) {
        this.backgroundImage.draw(context);
        if (this.transition > 0) {
            context.save();
            context.globalAlpha = this.transition;
            this.selectedBackgroundImage.draw(context);
            context.restore();
        }
        this.label.draw(context);
    }
}
exports["default"] = MenuItem;
MenuItem.TRANSITION_TIME = 0.5;
MenuItem.LABEL_OFFSET = (0, commonjs_1.vec)(0, 1);


/***/ }),

/***/ "./src/ui/components/Component.ts":
/*!****************************************!*\
  !*** ./src/ui/components/Component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/enums.ts");
class Component {
    constructor(position = (0, commonjs_1.vec)()) {
        this.position = position;
        this.canvas = document.createElement('canvas');
        const context = this.canvas.getContext('2d');
        if (context !== null) {
            this.context = context;
        }
        else {
            throw new Error("Couldn't get a 2d context.");
        }
    }
    get anchorOffset() {
        switch (this.options.anchor) {
            case enums_1.Anchor.TopLeft:
                return (0, commonjs_1.vec)(0, 0);
            case enums_1.Anchor.TopCenter:
                return (0, commonjs_1.vec)(-this.canvas.width / 2, 0);
            case enums_1.Anchor.TopRight:
                return (0, commonjs_1.vec)(-this.canvas.width, 0);
            case enums_1.Anchor.CenterLeft:
                return (0, commonjs_1.vec)(0, -this.canvas.height / 2);
            case enums_1.Anchor.Center:
                return (0, commonjs_1.vec)(-this.canvas.width / 2, -this.canvas.height / 2);
            case enums_1.Anchor.CenterRight:
                return (0, commonjs_1.vec)(-this.canvas.width, -this.canvas.height / 2);
            case enums_1.Anchor.BottomLeft:
                return (0, commonjs_1.vec)(0, -this.canvas.height);
            case enums_1.Anchor.BottomCenter:
                return (0, commonjs_1.vec)(-this.canvas.width / 2, -this.canvas.height);
            case enums_1.Anchor.BottomRight:
                return (0, commonjs_1.vec)(this.canvas.width / 2, -this.canvas.height);
        }
    }
}
exports["default"] = Component;


/***/ }),

/***/ "./src/ui/components/Image.ts":
/*!************************************!*\
  !*** ./src/ui/components/Image.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Image = void 0;
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const Content_1 = __webpack_require__(/*! ../../content/Content */ "./src/content/Content.ts");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/enums.ts");
const Component_1 = __webpack_require__(/*! ./Component */ "./src/ui/components/Component.ts");
class Image extends Component_1.default {
    constructor(imageName, position = (0, commonjs_1.vec)(), options = {}) {
        super(position);
        this.defaultOptions = {
            anchor: enums_1.Anchor.Center,
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.image = Content_1.default.get(imageName);
        this.canvas.width = this.image.width;
        this.canvas.height = this.image.height;
    }
    update() {
        if (this.options.parent) {
            this.position = this.options.parent.position;
        }
    }
    draw(context) {
        this.drawImage();
        const position = commonjs_1.vec.map(commonjs_1.vec.add(this.position, this.anchorOffset), Math.floor);
        context.drawImage(this.canvas, position.x, position.y);
    }
    drawImage() {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.image, 0, 0);
        this.context.restore();
    }
}
exports.Image = Image;


/***/ }),

/***/ "./src/ui/components/ProgressBar.ts":
/*!******************************************!*\
  !*** ./src/ui/components/ProgressBar.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgressBar = void 0;
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/enums.ts");
const utilities_1 = __webpack_require__(/*! ../../utilities */ "./src/utilities.ts");
const Component_1 = __webpack_require__(/*! ./Component */ "./src/ui/components/Component.ts");
class ProgressBar extends Component_1.default {
    constructor(position = (0, commonjs_1.vec)(), options = {}) {
        super(position);
        this.progress = 0;
        this.actualProgress = 0;
        this.defaultOptions = {
            anchor: enums_1.Anchor.Center,
            size: (0, commonjs_1.vec)(120, 14),
            ease: 0.9,
            padding: 4,
            borderColour: '#b75',
            borderWidth: 2,
            borderRadius: 6,
            barColour: '#fec',
            barRadius: 3,
        };
        this.options = Object.assign({}, this.defaultOptions, options);
        this.canvas.width = this.options.size.x;
        this.canvas.height = this.options.size.y;
    }
    update(dt) {
        const delta = this.progress - this.actualProgress;
        this.actualProgress += delta * dt * this.options.ease;
        if (this.options.parent) {
            this.position = this.options.parent.position;
        }
    }
    draw(context) {
        this.drawProgressBar();
        const position = commonjs_1.vec.map(commonjs_1.vec.add(this.position, this.anchorOffset), Math.floor);
        context.drawImage(this.canvas, position.x, position.y);
    }
    drawProgressBar() {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = this.options.borderColour;
        this.context.lineWidth = this.options.borderWidth;
        (0, utilities_1.roundedRectangle)(this.context, (0, commonjs_1.vec)(0, 0), this.options.size, this.options.borderRadius);
        this.context.stroke();
        this.context.fillStyle = this.options.barColour;
        const width = (this.options.size.x - (2 * this.options.padding)) * this.actualProgress;
        (0, utilities_1.roundedRectangle)(this.context, (0, commonjs_1.vec)(this.options.padding), (0, commonjs_1.vec)(width, this.options.size.y - (2 * this.options.padding)), Math.min(width, this.options.barRadius));
        this.context.fill();
        this.context.restore();
    }
}
exports.ProgressBar = ProgressBar;


/***/ }),

/***/ "./src/ui/components/Text.ts":
/*!***********************************!*\
  !*** ./src/ui/components/Text.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
const commonjs_1 = __webpack_require__(/*! @basementuniverse/commonjs */ "./node_modules/@basementuniverse/commonjs/common.js");
const enums_1 = __webpack_require__(/*! ../../enums */ "./src/enums.ts");
const Component_1 = __webpack_require__(/*! ./Component */ "./src/ui/components/Component.ts");
class Text extends Component_1.default {
    constructor(text, position = (0, commonjs_1.vec)(), options = {}) {
        super(position);
        this.defaultOptions = {
            anchor: enums_1.Anchor.Center,
            size: 30,
            font: 'sans-serif',
            padding: 4,
            colour: '#000',
            strokeWidth: 0,
            strokeColour: '#fff',
        };
        this.text = text;
        this.options = Object.assign({}, this.defaultOptions, options);
        this.context.font = `${this.options.size}px ${this.options.font}`;
        this.context.textBaseline = 'top';
        this.canvas.width = this.context.measureText(text).width + this.options.padding * 2;
        this.canvas.height = this.options.size + this.options.padding * 2;
    }
    update() {
        if (this.options.parent) {
            this.position = this.options.parent.position;
        }
    }
    draw(context) {
        this.drawText();
        const position = commonjs_1.vec.map(commonjs_1.vec.add(this.position, this.anchorOffset), Math.floor);
        context.drawImage(this.canvas, position.x, position.y);
    }
    drawText() {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = `${this.options.size}px ${this.options.font}`;
        this.context.textBaseline = 'top';
        if (this.options.strokeWidth > 0) {
            this.context.lineWidth = this.options.strokeWidth;
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
            this.context.strokeStyle = this.options.strokeColour;
            this.context.strokeText(this.text, this.options.padding, this.options.padding);
        }
        this.context.fillStyle = this.options.colour;
        this.context.fillText(this.text, this.options.padding, this.options.padding);
        this.context.restore();
    }
}
exports.Text = Text;


/***/ }),

/***/ "./src/ui/components/index.ts":
/*!************************************!*\
  !*** ./src/ui/components/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = exports.ProgressBar = exports.Image = void 0;
var Image_1 = __webpack_require__(/*! ./Image */ "./src/ui/components/Image.ts");
Object.defineProperty(exports, "Image", ({ enumerable: true, get: function () { return Image_1.Image; } }));
var ProgressBar_1 = __webpack_require__(/*! ./ProgressBar */ "./src/ui/components/ProgressBar.ts");
Object.defineProperty(exports, "ProgressBar", ({ enumerable: true, get: function () { return ProgressBar_1.ProgressBar; } }));
var Text_1 = __webpack_require__(/*! ./Text */ "./src/ui/components/Text.ts");
Object.defineProperty(exports, "Text", ({ enumerable: true, get: function () { return Text_1.Text; } }));


/***/ }),

/***/ "./src/utilities.ts":
/*!**************************!*\
  !*** ./src/utilities.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roundedRectangle = exports.sleep = void 0;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function roundedRectangle(context, position, size, radius) {
    context.beginPath();
    context.moveTo(position.x + radius, position.y);
    context.lineTo(position.x + size.x - radius, position.y);
    context.quadraticCurveTo(position.x + size.x, position.y, position.x + size.x, position.y + radius);
    context.lineTo(position.x + size.x, position.y + size.y - radius);
    context.quadraticCurveTo(position.x + size.x, position.y + size.y, position.x + size.x - radius, position.y + size.y);
    context.lineTo(position.x + radius, position.y + size.y);
    context.quadraticCurveTo(position.x, position.y + size.y, position.x, position.y + size.y - radius);
    context.lineTo(position.x, position.y + radius);
    context.quadraticCurveTo(position.x, position.y, position.x + radius, position.y);
    context.closePath();
}
exports.roundedRectangle = roundedRectangle;


/***/ }),

/***/ "./node_modules/uri-js/dist/es5/uri.all.js":
/*!*************************************************!*\
  !*** ./node_modules/uri-js/dist/es5/uri.all.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {

/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function (global, factory) {
	 true ? factory(exports) :
	0;
}(this, (function (exports) { 'use strict';

function merge() {
    for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
    }

    if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join('');
    } else {
        return sets[0];
    }
}
function subexp(str) {
    return "(?:" + str + ")";
}
function typeOf(o) {
    return o === undefined ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
}
function toUpperCase(str) {
    return str.toUpperCase();
}
function toArray(obj) {
    return obj !== undefined && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
}
function assign(target, source) {
    var obj = target;
    if (source) {
        for (var key in source) {
            obj[key] = source[key];
        }
    }
    return obj;
}

function buildExps(isIRI) {
    var ALPHA$$ = "[A-Za-z]",
        CR$ = "[\\x0D]",
        DIGIT$$ = "[0-9]",
        DQUOTE$$ = "[\\x22]",
        HEXDIG$$ = merge(DIGIT$$, "[A-Fa-f]"),
        //case-insensitive
    LF$$ = "[\\x0A]",
        SP$$ = "[\\x20]",
        PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)),
        //expanded
    GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]",
        SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",
        RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$),
        UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]",
        //subset, excludes bidi control characters
    IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]",
        //subset
    UNRESERVED$$ = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$),
        SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"),
        USERINFO$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]")) + "*"),
        DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$),
        DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$),
        //relaxed parsing rules
    IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$),
        H16$ = subexp(HEXDIG$$ + "{1,4}"),
        LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$),
        IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$),
        //                           6( h16 ":" ) ls32
    IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$),
        //                      "::" 5( h16 ":" ) ls32
    IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$),
        //[               h16 ] "::" 4( h16 ":" ) ls32
    IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$),
        //[ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
    IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$),
        //[ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
    IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$),
        //[ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
    IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$),
        //[ *4( h16 ":" ) h16 ] "::"              ls32
    IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$),
        //[ *5( h16 ":" ) h16 ] "::"              h16
    IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"),
        //[ *6( h16 ":" ) h16 ] "::"
    IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")),
        ZONEID$ = subexp(subexp(UNRESERVED$$ + "|" + PCT_ENCODED$) + "+"),
        //RFC 6874
    IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$),
        //RFC 6874
    IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + ZONEID$),
        //RFC 6874, with relaxed parsing rules
    IPVFUTURE$ = subexp("[vV]" + HEXDIG$$ + "+\\." + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:]") + "+"),
        IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"),
        //RFC 6874
    REG_NAME$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$)) + "*"),
        HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")" + "|" + REG_NAME$),
        PORT$ = subexp(DIGIT$$ + "*"),
        AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"),
        PCHAR$ = subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@]")),
        SEGMENT$ = subexp(PCHAR$ + "*"),
        SEGMENT_NZ$ = subexp(PCHAR$ + "+"),
        SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$ + "|" + merge(UNRESERVED$$, SUB_DELIMS$$, "[\\@]")) + "+"),
        PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"),
        PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"),
        //simplified
    PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$),
        //simplified
    PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$),
        //simplified
    PATH_EMPTY$ = "(?!" + PCHAR$ + ")",
        PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"),
        FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"),
        HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$),
        URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$),
        RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"),
        URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$),
        ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"),
        GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$",
        SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$",
        AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
    return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$ + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$") //RFC 6874, with relaxed parsing rules
    };
}
var URI_PROTOCOL = buildExps(false);

var IRI_PROTOCOL = buildExps(true);

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/** Highest positive signed 32-bit float value */

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error$1(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	var result = [];
	var length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	var parts = string.split('@');
	var result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	var labels = string.split('.');
	var encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	var output = [];
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			var extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) {
				// Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
var ucs2encode = function ucs2encode(array) {
	return String.fromCodePoint.apply(String, toConsumableArray(array));
};

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
var basicToDigit = function basicToDigit(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
var digitToBasic = function digitToBasic(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
var adapt = function adapt(delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
var decode = function decode(input) {
	// Don't use UCS-2.
	var output = [];
	var inputLength = input.length;
	var i = 0;
	var n = initialN;
	var bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	var basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (var j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error$1('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (var index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		var oldi = i;
		for (var w = 1, k = base;; /* no condition */k += base) {

			if (index >= inputLength) {
				error$1('invalid-input');
			}

			var digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error$1('overflow');
			}

			i += digit * w;
			var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

			if (digit < t) {
				break;
			}

			var baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error$1('overflow');
			}

			w *= baseMinusT;
		}

		var out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error$1('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);
	}

	return String.fromCodePoint.apply(String, output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
var encode = function encode(input) {
	var output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	var inputLength = input.length;

	// Initialize the state.
	var n = initialN;
	var delta = 0;
	var bias = initialBias;

	// Handle the basic code points.
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _currentValue2 = _step.value;

			if (_currentValue2 < 0x80) {
				output.push(stringFromCharCode(_currentValue2));
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	var basicLength = output.length;
	var handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		var m = maxInt;
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var currentValue = _step2.value;

				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		var handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error$1('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _currentValue = _step3.value;

				if (_currentValue < n && ++delta > maxInt) {
					error$1('overflow');
				}
				if (_currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					var q = delta;
					for (var k = base;; /* no condition */k += base) {
						var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						var qMinusT = q - t;
						var baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}

		++delta;
		++n;
	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
var toUnicode = function toUnicode(input) {
	return mapDomain(input, function (string) {
		return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
var toASCII = function toASCII(input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
var punycode = {
	/**
  * A string representing the current Punycode.js version number.
  * @memberOf punycode
  * @type String
  */
	'version': '2.1.0',
	/**
  * An object of methods to convert from JavaScript's internal character
  * representation (UCS-2) to Unicode code points, and back.
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode
  * @type Object
  */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};

/**
 * URI.js
 *
 * @fileoverview An RFC 3986 compliant, scheme extendable URI parsing/validating/resolving library for JavaScript.
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/uri-js
 */
/**
 * Copyright 2011 Gary Court. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice, this list of
 *       conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice, this list
 *       of conditions and the following disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GARY COURT ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GARY COURT OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Gary Court.
 */
var SCHEMES = {};
function pctEncChar(chr) {
    var c = chr.charCodeAt(0);
    var e = void 0;
    if (c < 16) e = "%0" + c.toString(16).toUpperCase();else if (c < 128) e = "%" + c.toString(16).toUpperCase();else if (c < 2048) e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();else e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
    return e;
}
function pctDecChars(str) {
    var newStr = "";
    var i = 0;
    var il = str.length;
    while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
        } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
                var c2 = parseInt(str.substr(i + 4, 2), 16);
                newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
                newStr += str.substr(i, 6);
            }
            i += 6;
        } else if (c >= 224) {
            if (il - i >= 9) {
                var _c = parseInt(str.substr(i + 4, 2), 16);
                var c3 = parseInt(str.substr(i + 7, 2), 16);
                newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
                newStr += str.substr(i, 9);
            }
            i += 9;
        } else {
            newStr += str.substr(i, 3);
            i += 3;
        }
    }
    return newStr;
}
function _normalizeComponentEncoding(components, protocol) {
    function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
    }
    if (components.scheme) components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_SCHEME, "");
    if (components.userinfo !== undefined) components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.host !== undefined) components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.path !== undefined) components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.query !== undefined) components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    if (components.fragment !== undefined) components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
    return components;
}

function _stripLeadingZeros(str) {
    return str.replace(/^0*(.*)/, "$1") || "0";
}
function _normalizeIPv4(host, protocol) {
    var matches = host.match(protocol.IPV4ADDRESS) || [];

    var _matches = slicedToArray(matches, 2),
        address = _matches[1];

    if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
    } else {
        return host;
    }
}
function _normalizeIPv6(host, protocol) {
    var matches = host.match(protocol.IPV6ADDRESS) || [];

    var _matches2 = slicedToArray(matches, 3),
        address = _matches2[1],
        zone = _matches2[2];

    if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split('::').reverse(),
            _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2),
            last = _address$toLowerCase$2[0],
            first = _address$toLowerCase$2[1];

        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || '';
        }
        if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function (acc, field, index) {
            if (!field || field === "0") {
                var lastLongest = acc[acc.length - 1];
                if (lastLongest && lastLongest.index + lastLongest.length === index) {
                    lastLongest.length++;
                } else {
                    acc.push({ index: index, length: 1 });
                }
            }
            return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function (a, b) {
            return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
            newHost = fields.join(":");
        }
        if (zone) {
            newHost += "%" + zone;
        }
        return newHost;
    } else {
        return host;
    }
}
var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
function parse(uriString) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var components = {};
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    if (options.reference === "suffix") uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
    var matches = uriString.match(URI_PARSE);
    if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
            //store each component
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            //fix port number
            if (isNaN(components.port)) {
                components.port = matches[5];
            }
        } else {
            //IE FIX for improper RegExp matching
            //store each component
            components.scheme = matches[1] || undefined;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : undefined;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : undefined;
            //fix port number
            if (isNaN(components.port)) {
                components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : undefined;
            }
        }
        if (components.host) {
            //normalize IP hosts
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        //determine reference type
        if (components.scheme === undefined && components.userinfo === undefined && components.host === undefined && components.port === undefined && !components.path && components.query === undefined) {
            components.reference = "same-document";
        } else if (components.scheme === undefined) {
            components.reference = "relative";
        } else if (components.fragment === undefined) {
            components.reference = "absolute";
        } else {
            components.reference = "uri";
        }
        //check for reference errors
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        //find scheme handler
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        //check if scheme can't handle IRIs
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            //if host component is a domain name
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
                }
            }
            //convert IRI -> URI
            _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
            //normalize encodings
            _normalizeComponentEncoding(components, protocol);
        }
        //perform scheme specific parsing
        if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
        }
    } else {
        components.error = components.error || "URI can not be parsed.";
    }
    return components;
}

function _recomposeAuthority(components, options) {
    var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    if (components.userinfo !== undefined) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
    }
    if (components.host !== undefined) {
        //normalize IP hosts, add brackets and escape zone separator for IPv6
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function (_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
    }
    if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
    }
    return uriTokens.length ? uriTokens.join("") : undefined;
}

var RDS1 = /^\.\.?\//;
var RDS2 = /^\/\.(\/|$)/;
var RDS3 = /^\/\.\.(\/|$)/;
var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
function removeDotSegments(input) {
    var output = [];
    while (input.length) {
        if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
        } else if (input === "." || input === "..") {
            input = "";
        } else {
            var im = input.match(RDS5);
            if (im) {
                var s = im[0];
                input = input.slice(s.length);
                output.push(s);
            } else {
                throw new Error("Unexpected dot segment condition");
            }
        }
    }
    return output.join("");
}

function serialize(components) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
    var uriTokens = [];
    //find scheme handler
    var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
    //perform scheme specific serialization
    if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(components, options);
    if (components.host) {
        //if host component is an IPv6 address
        if (protocol.IPV6ADDRESS.test(components.host)) {}
        //TODO: normalize IPv6 address as per RFC 5952

        //if host component is a domain name
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
                //convert IDN via punycode
                try {
                    components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
                } catch (e) {
                    components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
            }
    }
    //normalize encoding
    _normalizeComponentEncoding(components, protocol);
    if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
    }
    var authority = _recomposeAuthority(components, options);
    if (authority !== undefined) {
        if (options.reference !== "suffix") {
            uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
        }
    }
    if (components.path !== undefined) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
        }
        if (authority === undefined) {
            s = s.replace(/^\/\//, "/%2F"); //don't allow the path to start with "//"
        }
        uriTokens.push(s);
    }
    if (components.query !== undefined) {
        uriTokens.push("?");
        uriTokens.push(components.query);
    }
    if (components.fragment !== undefined) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
    }
    return uriTokens.join(""); //merge tokens into a string
}

function resolveComponents(base, relative) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var skipNormalization = arguments[3];

    var target = {};
    if (!skipNormalization) {
        base = parse(serialize(base, options), options); //normalize base components
        relative = parse(serialize(relative, options), options); //normalize relative components
    }
    options = options || {};
    if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        //target.authority = relative.authority;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
    } else {
        if (relative.userinfo !== undefined || relative.host !== undefined || relative.port !== undefined) {
            //target.authority = relative.authority;
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
        } else {
            if (!relative.path) {
                target.path = base.path;
                if (relative.query !== undefined) {
                    target.query = relative.query;
                } else {
                    target.query = base.query;
                }
            } else {
                if (relative.path.charAt(0) === "/") {
                    target.path = removeDotSegments(relative.path);
                } else {
                    if ((base.userinfo !== undefined || base.host !== undefined || base.port !== undefined) && !base.path) {
                        target.path = "/" + relative.path;
                    } else if (!base.path) {
                        target.path = relative.path;
                    } else {
                        target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
                    }
                    target.path = removeDotSegments(target.path);
                }
                target.query = relative.query;
            }
            //target.authority = base.authority;
            target.userinfo = base.userinfo;
            target.host = base.host;
            target.port = base.port;
        }
        target.scheme = base.scheme;
    }
    target.fragment = relative.fragment;
    return target;
}

function resolve(baseURI, relativeURI, options) {
    var schemelessOptions = assign({ scheme: 'null' }, options);
    return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
}

function normalize(uri, options) {
    if (typeof uri === "string") {
        uri = serialize(parse(uri, options), options);
    } else if (typeOf(uri) === "object") {
        uri = parse(serialize(uri, options), options);
    }
    return uri;
}

function equal(uriA, uriB, options) {
    if (typeof uriA === "string") {
        uriA = serialize(parse(uriA, options), options);
    } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
    }
    if (typeof uriB === "string") {
        uriB = serialize(parse(uriB, options), options);
    } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
    }
    return uriA === uriB;
}

function escapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
}

function unescapeComponent(str, options) {
    return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
}

var handler = {
    scheme: "http",
    domainHost: true,
    parse: function parse(components, options) {
        //report missing host
        if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
    },
    serialize: function serialize(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        //normalize the default port
        if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = undefined;
        }
        //normalize the empty path
        if (!components.path) {
            components.path = "/";
        }
        //NOTE: We do not parse query strings for HTTP URIs
        //as WWW Form Url Encoded query strings are part of the HTML4+ spec,
        //and not the HTTP spec.
        return components;
    }
};

var handler$1 = {
    scheme: "https",
    domainHost: handler.domainHost,
    parse: handler.parse,
    serialize: handler.serialize
};

function isSecure(wsComponents) {
    return typeof wsComponents.secure === 'boolean' ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
}
//RFC 6455
var handler$2 = {
    scheme: "ws",
    domainHost: true,
    parse: function parse(components, options) {
        var wsComponents = components;
        //indicate if the secure flag is set
        wsComponents.secure = isSecure(wsComponents);
        //construct resouce name
        wsComponents.resourceName = (wsComponents.path || '/') + (wsComponents.query ? '?' + wsComponents.query : '');
        wsComponents.path = undefined;
        wsComponents.query = undefined;
        return wsComponents;
    },
    serialize: function serialize(wsComponents, options) {
        //normalize the default port
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = undefined;
        }
        //ensure scheme matches secure flag
        if (typeof wsComponents.secure === 'boolean') {
            wsComponents.scheme = wsComponents.secure ? 'wss' : 'ws';
            wsComponents.secure = undefined;
        }
        //reconstruct path from resource name
        if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split('?'),
                _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2),
                path = _wsComponents$resourc2[0],
                query = _wsComponents$resourc2[1];

            wsComponents.path = path && path !== '/' ? path : undefined;
            wsComponents.query = query;
            wsComponents.resourceName = undefined;
        }
        //forbid fragment component
        wsComponents.fragment = undefined;
        return wsComponents;
    }
};

var handler$3 = {
    scheme: "wss",
    domainHost: handler$2.domainHost,
    parse: handler$2.parse,
    serialize: handler$2.serialize
};

var O = {};
var isIRI = true;
//RFC 3986
var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
var HEXDIG$$ = "[0-9A-Fa-f]"; //case-insensitive
var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$)); //expanded
//RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
//const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
//const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
//const VCHAR$$ = "[\\x21-\\x7E]";
//const WSP$$ = "[\\x20\\x09]";
//const OBS_QP$ = subexp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
//const FWS$ = subexp(subexp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
//const QUOTED_PAIR$ = subexp(subexp("\\\\" + subexp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
//const QUOTED_STRING$ = subexp('\\"' + subexp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
var VCHAR$$ = merge(QTEXT$$, "[\\\"\\\\]");
var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
var UNRESERVED = new RegExp(UNRESERVED$$, "g");
var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
var NOT_HFVALUE = NOT_HFNAME;
function decodeUnreserved(str) {
    var decStr = pctDecChars(str);
    return !decStr.match(UNRESERVED) ? str : decStr;
}
var handler$4 = {
    scheme: "mailto",
    parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = undefined;
        if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
                var hfield = hfields[x].split("=");
                switch (hfield[0]) {
                    case "to":
                        var toAddrs = hfield[1].split(",");
                        for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                            to.push(toAddrs[_x]);
                        }
                        break;
                    case "subject":
                        mailtoComponents.subject = unescapeComponent(hfield[1], options);
                        break;
                    case "body":
                        mailtoComponents.body = unescapeComponent(hfield[1], options);
                        break;
                    default:
                        unknownHeaders = true;
                        headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                        break;
                }
            }
            if (unknownHeaders) mailtoComponents.headers = headers;
        }
        mailtoComponents.query = undefined;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
                //convert Unicode IDN -> ASCII IDN
                try {
                    addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
                } catch (e) {
                    mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
                }
            } else {
                addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
        }
        return mailtoComponents;
    },
    serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
                var toAddr = String(to[x]);
                var atIdx = toAddr.lastIndexOf("@");
                var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
                var domain = toAddr.slice(atIdx + 1);
                //convert IDN via punycode
                try {
                    domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
                } catch (e) {
                    components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
                }
                to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject) headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body) headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
            if (headers[name] !== O[name]) {
                fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
        }
        if (fields.length) {
            components.query = fields.join("&");
        }
        return components;
    }
};

var URN_PARSE = /^([^\:]+)\:(.*)/;
//RFC 2141
var handler$5 = {
    scheme: "urn",
    parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = undefined;
            if (schemeHandler) {
                urnComponents = schemeHandler.parse(urnComponents, options);
            }
        } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
    },
    serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
    }
};

var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
//RFC 4122
var handler$6 = {
    scheme: "urn:uuid",
    parse: function parse(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = undefined;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
    },
    serialize: function serialize(uuidComponents, options) {
        var urnComponents = uuidComponents;
        //normalize UUID
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
    }
};

SCHEMES[handler.scheme] = handler;
SCHEMES[handler$1.scheme] = handler$1;
SCHEMES[handler$2.scheme] = handler$2;
SCHEMES[handler$3.scheme] = handler$3;
SCHEMES[handler$4.scheme] = handler$4;
SCHEMES[handler$5.scheme] = handler$5;
SCHEMES[handler$6.scheme] = handler$6;

exports.SCHEMES = SCHEMES;
exports.pctEncChar = pctEncChar;
exports.pctDecChars = pctDecChars;
exports.parse = parse;
exports.removeDotSegments = removeDotSegments;
exports.serialize = serialize;
exports.resolveComponents = resolveComponents;
exports.resolve = resolve;
exports.normalize = normalize;
exports.equal = equal;
exports.escapeComponent = escapeComponent;
exports.unescapeComponent = unescapeComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=uri.all.js.map


/***/ }),

/***/ "./node_modules/uuid-random/index.js":
/*!*******************************************!*\
  !*** ./node_modules/uuid-random/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


(function(){

  var
    buf,
    bufIdx = 0,
    hexBytes = [],
    i
  ;

  // Pre-calculate toString(16) for speed
  for (i = 0; i < 256; i++) {
    hexBytes[i] = (i + 0x100).toString(16).substr(1);
  }

  // Buffer random numbers for speed
  // Reduce memory usage by decreasing this number (min 16)
  // or improve speed by increasing this number (try 16384)
  uuid.BUFFER_SIZE = 4096;

  // Binary uuids
  uuid.bin = uuidBin;

  // Clear buffer
  uuid.clearBuffer = function() {
    buf = null;
    bufIdx = 0;
  };

  // Test for uuid
  uuid.test = function(uuid) {
    if (typeof uuid === 'string') {
      return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
    }
    return false;
  };

  // Node & Browser support
  var crypt0;
  if (typeof crypto !== 'undefined') {
    crypt0 = crypto;
  } else if( (typeof window !== 'undefined') && (typeof window.msCrypto !== 'undefined')) {
    crypt0 = window.msCrypto; // IE11
  }

  if (true) {
    crypt0 = crypt0 || __webpack_require__(/*! crypto */ "?779a");
    module.exports = uuid;
  } else {}

  // Use best available PRNG
  // Also expose this so you can override it.
  uuid.randomBytes = (function(){
    if (crypt0) {
      if (crypt0.randomBytes) {
        return crypt0.randomBytes;
      }
      if (crypt0.getRandomValues) {
        if (typeof Uint8Array.prototype.slice !== 'function') {
          return function(n) {
            var bytes = new Uint8Array(n);
            crypt0.getRandomValues(bytes);
            return Array.from(bytes);
          };
        }
        return function(n) {
          var bytes = new Uint8Array(n);
          crypt0.getRandomValues(bytes);
          return bytes;
        };
      }
    }
    return function(n) {
      var i, r = [];
      for (i = 0; i < n; i++) {
        r.push(Math.floor(Math.random() * 256));
      }
      return r;
    };
  })();

  // Buffer some random bytes for speed
  function randomBytesBuffered(n) {
    if (!buf || ((bufIdx + n) > uuid.BUFFER_SIZE)) {
      bufIdx = 0;
      buf = uuid.randomBytes(uuid.BUFFER_SIZE);
    }
    return buf.slice(bufIdx, bufIdx += n);
  }

  // uuid.bin
  function uuidBin() {
    var b = randomBytesBuffered(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    return b;
  }

  // String UUIDv4 (Random)
  function uuid() {
    var b = uuidBin();
    return hexBytes[b[0]] + hexBytes[b[1]] +
      hexBytes[b[2]] + hexBytes[b[3]] + '-' +
      hexBytes[b[4]] + hexBytes[b[5]] + '-' +
      hexBytes[b[6]] + hexBytes[b[7]] + '-' +
      hexBytes[b[8]] + hexBytes[b[9]] + '-' +
      hexBytes[b[10]] + hexBytes[b[11]] +
      hexBytes[b[12]] + hexBytes[b[13]] +
      hexBytes[b[14]] + hexBytes[b[15]]
    ;
  }

})();


/***/ }),

/***/ "./node_modules/worker-loader/dist/cjs.js!./src/workers/index.ts":
/*!***********************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js!./src/workers/index.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Worker_fn)
/* harmony export */ });
function Worker_fn() {
  return new Worker(__webpack_require__.p + "game.worker.js");
}


/***/ }),

/***/ "?779a":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "./content/content.json":
/*!******************************!*\
  !*** ./content/content.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"items":[{"name":"error","type":"image","args":["content/images/error.png"]},{"name":"logo","type":"image","args":["content/images/logo.png"]},{"name":"menu_background","type":"image","args":["content/images/parchment.png"]},{"name":"menu_title","type":"image","args":["content/images/banner_large.png"]},{"name":"menu_button","type":"image","args":["content/images/parchment_button.png"]},{"name":"menu_button_selected","type":"image","args":["content/images/parchment_button_white.png"]},{"name":"menu_font","type":"font","args":["content/fonts/aniron.ttf","aniron"]},{"name":"menu_font_bold","type":"font","args":["content/fonts/aniron-bold.ttf","aniron-bold"]},{"name":"testEntity","type":"entityData","args":["content/json/testEntity.json"]}]}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/data.json":
/*!**********************************************!*\
  !*** ./node_modules/ajv/dist/refs/data.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$id":"https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#","description":"Meta-schema for $data reference (JSON AnySchema extension proposal)","type":"object","required":["$data"],"properties":{"$data":{"type":"string","anyOf":[{"format":"relative-json-pointer"},{"format":"json-pointer"}]}},"additionalProperties":false}');

/***/ }),

/***/ "./node_modules/ajv/dist/refs/json-schema-draft-07.json":
/*!**************************************************************!*\
  !*** ./node_modules/ajv/dist/refs/json-schema-draft-07.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"http://json-schema.org/draft-07/schema#","title":"Core schema meta-schema","definitions":{"schemaArray":{"type":"array","minItems":1,"items":{"$ref":"#"}},"nonNegativeInteger":{"type":"integer","minimum":0},"nonNegativeIntegerDefault0":{"allOf":[{"$ref":"#/definitions/nonNegativeInteger"},{"default":0}]},"simpleTypes":{"enum":["array","boolean","integer","null","number","object","string"]},"stringArray":{"type":"array","items":{"type":"string"},"uniqueItems":true,"default":[]}},"type":["object","boolean"],"properties":{"$id":{"type":"string","format":"uri-reference"},"$schema":{"type":"string","format":"uri"},"$ref":{"type":"string","format":"uri-reference"},"$comment":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"default":true,"readOnly":{"type":"boolean","default":false},"examples":{"type":"array","items":true},"multipleOf":{"type":"number","exclusiveMinimum":0},"maximum":{"type":"number"},"exclusiveMaximum":{"type":"number"},"minimum":{"type":"number"},"exclusiveMinimum":{"type":"number"},"maxLength":{"$ref":"#/definitions/nonNegativeInteger"},"minLength":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"pattern":{"type":"string","format":"regex"},"additionalItems":{"$ref":"#"},"items":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/schemaArray"}],"default":true},"maxItems":{"$ref":"#/definitions/nonNegativeInteger"},"minItems":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"uniqueItems":{"type":"boolean","default":false},"contains":{"$ref":"#"},"maxProperties":{"$ref":"#/definitions/nonNegativeInteger"},"minProperties":{"$ref":"#/definitions/nonNegativeIntegerDefault0"},"required":{"$ref":"#/definitions/stringArray"},"additionalProperties":{"$ref":"#"},"definitions":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"properties":{"type":"object","additionalProperties":{"$ref":"#"},"default":{}},"patternProperties":{"type":"object","additionalProperties":{"$ref":"#"},"propertyNames":{"format":"regex"},"default":{}},"dependencies":{"type":"object","additionalProperties":{"anyOf":[{"$ref":"#"},{"$ref":"#/definitions/stringArray"}]}},"propertyNames":{"$ref":"#"},"const":true,"enum":{"type":"array","items":true,"minItems":1,"uniqueItems":true},"type":{"anyOf":[{"$ref":"#/definitions/simpleTypes"},{"type":"array","items":{"$ref":"#/definitions/simpleTypes"},"minItems":1,"uniqueItems":true}]},"format":{"type":"string"},"contentMediaType":{"type":"string"},"contentEncoding":{"type":"string"},"if":{"$ref":"#"},"then":{"$ref":"#"},"else":{"$ref":"#"},"allOf":{"$ref":"#/definitions/schemaArray"},"anyOf":{"$ref":"#/definitions/schemaArray"},"oneOf":{"$ref":"#/definitions/schemaArray"},"not":{"$ref":"#"}},"default":true}');

/***/ }),

/***/ "./src/config.json":
/*!*************************!*\
  !*** ./src/config.json ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"title":"RPG Game","scaleFactor":2,"showFPS":true}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/build/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
window.onload = () => {
    const game = new Game_1.default(document.querySelector('#game'));
    game.initialise();
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUVBQW1FO0FBQzlIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkRBQTJELG1FQUFtRTtBQUM5SDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsK0JBQStCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx5REFBeUQseUhBQXlIO0FBQzFPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0JBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLCtCQUErQix5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsRUFBRTtBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxnQkFBZ0I7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLGdPQUFnTztBQUNoTyxvRUFBb0U7QUFDcEUsNkVBQTZFLE1BQU07QUFDbkY7QUFDQSxrRUFBa0U7QUFDbEUsd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsMERBQTBELE1BQU07QUFDaEU7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxRQUFRO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFVBQVU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFlBQVk7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxRQUFRO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEVBQUUsY0FBYyxHQUFHO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxhQUFhOztBQUU1RCxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7OztBQ2w2Q2E7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHO0FBQ2xGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSiw4QkFBOEI7QUFDOUI7O0FBRUEsTUFBTSxJQUFrRTtBQUN4RSx1QkFBdUIsbUJBQU8sQ0FBQyxxQkFBUTtBQUN2QztBQUNBLElBQUksS0FBSyxFQUVOOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSGM7QUFDZixvQkFBb0IscUJBQXVCO0FBQzNDOzs7Ozs7Ozs7OztBQ0ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7OztBQ0FBLGtFQUEwQjtBQUUxQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9hanYuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL2NvZGUuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9jb2RlZ2VuL2luZGV4LmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvY29kZWdlbi9zY29wZS5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL2luZGV4LmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvbmFtZXMuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9yZWZfZXJyb3IuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS9yZXNvbHZlLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvcnVsZXMuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS91dGlsLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvYXBwbGljYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2Jvb2xTY2hlbWEuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9kYXRhVHlwZS5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9jb21waWxlL3ZhbGlkYXRlL2RlZmF1bHRzLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvY29tcGlsZS92YWxpZGF0ZS9rZXl3b3JkLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvbXBpbGUvdmFsaWRhdGUvc3Vic2NoZW1hLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L2NvcmUuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS9lcXVhbC5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC9ydW50aW1lL3VjczJsZW5ndGguanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3QvcnVudGltZS92YWxpZGF0aW9uX2Vycm9yLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL2FkZGl0aW9uYWxJdGVtcy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hZGRpdGlvbmFsUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbGxPZi5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9hbnlPZi5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9jb250YWlucy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9kZXBlbmRlbmNpZXMuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaWYuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaXRlbXMuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvaXRlbXMyMDIwLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL25vdC5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9vbmVPZi5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wYXR0ZXJuUHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wcmVmaXhJdGVtcy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvYXBwbGljYXRvci9wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9hcHBsaWNhdG9yL3Byb3BlcnR5TmFtZXMuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2FwcGxpY2F0b3IvdGhlbkVsc2UuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvZGUuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvcmUvaWQuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2NvcmUvcmVmLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kaXNjcmltaW5hdG9yL2luZGV4LmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kaXNjcmltaW5hdG9yL3R5cGVzLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy9kcmFmdDcuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Zvcm1hdC9mb3JtYXQuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL2Zvcm1hdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvbWV0YWRhdGEuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vY29uc3QuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vZW51bS5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9saW1pdEl0ZW1zLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0TGVuZ3RoLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0TnVtYmVyLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL2xpbWl0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL25vZGVfbW9kdWxlcy9hanYvZGlzdC92b2NhYnVsYXJpZXMvdmFsaWRhdGlvbi9tdWx0aXBsZU9mLmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Fqdi9kaXN0L3ZvY2FidWxhcmllcy92YWxpZGF0aW9uL3BhdHRlcm4uanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vcmVxdWlyZWQuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvYWp2L2Rpc3Qvdm9jYWJ1bGFyaWVzL3ZhbGlkYXRpb24vdW5pcXVlSXRlbXMuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vbm9kZV9tb2R1bGVzL2pzb24tc2NoZW1hLXRyYXZlcnNlL2luZGV4LmpzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL0RlYnVnLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvSW5wdXQudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL2NvbnRlbnQvQ29udGVudC50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy9jb250ZW50L0VudGl0eURhdGFMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvY29udGVudC9Gb250TG9hZGVyLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL2NvbnRlbnQvSW1hZ2VMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvY29udGVudC9KU09OTG9hZGVyLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL2NvbnRlbnQvU291bmRMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvY29udGVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy9lbnRpdGllcy9FbnRpdHkudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvZW50aXRpZXMvRW50aXR5TWFuYWdlci50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy9lbnRpdGllcy9jb21wb25lbnRzL0NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy9lbnVtcy50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy9zdGF0ZXMvR2FtZVN0YXRlLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3N0YXRlcy9JbnRyb1N0YXRlLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3N0YXRlcy9Mb2FkaW5nU3RhdGUudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvc3RhdGVzL01haW5NZW51U3RhdGUudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvc3RhdGVzL1N0YXRlLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3N0YXRlcy9TdGF0ZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvc3RhdGVzL2luZGV4LnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3VpL01lbnVJdGVtLnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3VpL2NvbXBvbmVudHMvQ29tcG9uZW50LnRzIiwid2VicGFjazovL3JwZy1nYW1lLy4vc3JjL3VpL2NvbXBvbmVudHMvSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvdWkvY29tcG9uZW50cy9Qcm9ncmVzc0Jhci50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy91aS9jb21wb25lbnRzL1RleHQudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvdWkvY29tcG9uZW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS8uL3NyYy91dGlsaXRpZXMudHMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvdXJpLWpzL2Rpc3QvZXM1L3VyaS5hbGwuanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9ub2RlX21vZHVsZXMvdXVpZC1yYW5kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvd29ya2Vycy9pbmRleC50cyIsIndlYnBhY2s6Ly9ycGctZ2FtZS9pZ25vcmVkfC9ob21lL2dvcmRvbi9Qcm9qZWN0cy9ycGctZ2FtZS9ub2RlX21vZHVsZXMvdXVpZC1yYW5kb218Y3J5cHRvIiwid2VicGFjazovL3JwZy1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JwZy1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ycGctZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3JwZy1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcnBnLWdhbWUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAb3ZlcnZpZXcgQSBsaWJyYXJ5IG9mIHVzZWZ1bCBmdW5jdGlvbnNcbiAqIEBhdXRob3IgR29yZG9uIExhcnJpZ2FuXG4gKiBAdmVyc2lvbiAxLjIuOVxuICovXG5cbi8qKiBAY2xhc3MgTWF0aCAqL1xuXG4vKipcbiAqIENoZWNrIGlmIHR3byBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsXG4gKiBAcGFyYW0ge251bWJlcn0gYSBOdW1iZXIgYVxuICogQHBhcmFtIHtudW1iZXJ9IGIgTnVtYmVyIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbcD1OdW1iZXIuRVBTSUxPTl0gVGhlIHByZWNpc2lvbiB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBudW1iZXJzIGEgYW5kIGIgYXJlIGFwcHJveGltYXRlbHkgZXF1YWxcbiAqL1xuTWF0aC5mbG9hdEVxdWFscyA9IChhLCBiLCBwID0gTnVtYmVyLkVQU0lMT04pID0+IE1hdGguYWJzKGEgLSBiKSA8IHA7XG5cbi8qKlxuICogQ2xhbXAgYSBudW1iZXIgYmV0d2VlbiBtaW4gYW5kIG1heFxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG51bWJlciB0byBjbGFtcFxuICogQHBhcmFtIHtudW1iZXJ9IFttaW49MF0gVGhlIG1pbmltdW0gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4PTFdIFRoZSBtYXhpbXVtIHZhbHVlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgY2xhbXBlZCBudW1iZXJcbiAqL1xuTWF0aC5jbGFtcCA9IChhLCBtaW4gPSAwLCBtYXggPSAxKSA9PiBhIDwgbWluID8gbWluIDogKGEgPiBtYXggPyBtYXggOiBhKTtcblxuLyoqXG4gKiBHZXQgdGhlIGZyYWN0aW9uYWwgcGFydCBvZiBhIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG51bWJlciBmcm9tIHdoaWNoIHRvIGdldCB0aGUgZnJhY3Rpb25hbCBwYXJ0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBmcmFjdGlvbmFsIHBhcnQgb2YgdGhlIG51bWJlclxuICovXG5NYXRoLmZyYWMgPSBhID0+IGEgPj0gMCA/IGEgLSBNYXRoLmZsb29yKGEpIDogYSAtIE1hdGguY2VpbChhKTtcblxuLyoqXG4gKiBEbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gYSBhbmQgYlxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlLCBzaG91bGQgYmUgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHJldHVybiB7bnVtYmVyfSBBbiBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICovXG5NYXRoLmxlcnAgPSAoYSwgYiwgaSkgPT4gYSArIChiIC0gYSkgKiBpO1xuXG4vKipcbiAqIEdldCB0aGUgcG9zaXRpb24gb2YgaSBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIHBvc2l0aW9uIG9mIGkgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbk1hdGgudW5sZXJwID0gKGEsIGIsIGkpID0+IChpIC0gYSkgLyAoYiAtIGEpO1xuXG4vKipcbiAqIERvIGEgYmlsaW5lYXIgaW50ZXJwb2xhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGMwMCBUb3AtbGVmdCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGMxMCBUb3AtcmlnaHQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMDEgQm90dG9tLWxlZnQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMTEgQm90dG9tLXJpZ2h0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gaXggSW50ZXJwb2xhdGlvbiB2YWx1ZSBhbG9uZyB4XG4gKiBAcGFyYW0ge251bWJlcn0gaXkgSW50ZXJwb2xhdGlvbiB2YWx1ZSBhbG9uZyB5XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgYmlsaW5lYXIgaW50ZXJwb2xhdGVkIHZhbHVlXG4gKi9cbk1hdGguYmxlcnAgPSAoYzAwLCBjMTAsIGMwMSwgYzExLCBpeCwgaXkpID0+IE1hdGgubGVycChNYXRoLmxlcnAoYzAwLCBjMTAsIGl4KSwgTWF0aC5sZXJwKGMwMSwgYzExLCBpeCksIGl5KTtcblxuLyoqXG4gKiBSZS1tYXAgYSBudW1iZXIgaSBmcm9tIHJhbmdlIGExLi4uYTIgdG8gYjEuLi5iMlxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIG51bWJlciB0byByZS1tYXBcbiAqIEBwYXJhbSB7bnVtYmVyfSBhMVxuICogQHBhcmFtIHtudW1iZXJ9IGEyXG4gKiBAcGFyYW0ge251bWJlcn0gYjFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiMlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5NYXRoLnJlbWFwID0gKGksIGExLCBhMiwgYjEsIGIyKSA9PiBiMSArIChpIC0gYTEpICogKGIyIC0gYjEpIC8gKGEyIC0gYTEpO1xuXG4vKipcbiAqIERvIGEgc21vb3RoIGludGVycG9sYXRpb24gYmV0d2VlbiBhIGFuZCBiXG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbWluaW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFRoZSBtYXhpbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIGludGVycG9sYXRpb24gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuTWF0aC5zbW9vdGhzdGVwID0gKGEsIGIsIGkpID0+IE1hdGgubGVycChhLCBiLCAzICogTWF0aC5wb3coaSwgMikgLSAyICogTWF0aC5wb3coaSwgMykpO1xuXG4vKipcbiAqIEdldCBhbiBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gZGVncmVlcyBUaGUgYW5nbGUgaW4gZGVncmVlc1xuICogQHJldHVybiB7bnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICovXG5NYXRoLnJhZGlhbnMgPSBkZWdyZWVzID0+IChNYXRoLlBJIC8gMTgwKSAqIGRlZ3JlZXM7XG5cbi8qKlxuICogR2V0IGFuIGFuZ2xlIGluIGRlZ3JlZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zIFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBhbmdsZSBpbiBkZWdyZWVzXG4gKi9cbk1hdGguZGVncmVlcyA9IHJhZGlhbnMgPT4gKDE4MCAvIE1hdGguUEkpICogcmFkaWFucztcblxuLyoqXG4gKiBHZXQgYSByYW5kb20gZmxvYXQgaW4gdGhlIGludGVydmFsIFttaW4sIG1heClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gSW5jbHVzaXZlIG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBFeGNsdXNpdmUgbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgcmFuZG9tIGZsb2F0IGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXgpXG4gKi9cbk1hdGgucmFuZG9tQmV0d2VlbiA9IChtaW4sIG1heCkgPT4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuXG4vKipcbiAqIEdldCBhIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXhdXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIEluY2x1c2l2ZSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggSW5jbHVzaXZlIG1heFxuICogQHJldHVybiB7bnVtYmVyfSBBIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXhdXG4gKi9cbk1hdGgucmFuZG9tSW50QmV0d2VlbiA9IChtaW4sIG1heCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcblxuLyoqXG4gKiBHZXQgYSBub3JtYWxseS1kaXN0cmlidXRlZCByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gW211PTAuNV0gVGhlIG1lYW4gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2lnbWE9MC41XSBUaGUgc3RhbmRhcmQgZGV2aWF0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gW3NhbXBsZXM9Ml0gVGhlIG51bWJlciBvZiBzYW1wbGVzXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgbm9ybWFsbHktZGlzdHJpYnV0ZWQgcmFuZG9tIG51bWJlclxuICovXG5NYXRoLmNsdFJhbmRvbSA9IChtdSA9IDAuNSwgc2lnbWEgPSAwLjUsIHNhbXBsZXMgPSAyKSA9PiB7XG4gIGxldCB0b3RhbCA9IDA7XG4gIGZvciAobGV0IGkgPSBzYW1wbGVzOyBpLS07KSB7XG4gICAgdG90YWwgKz0gTWF0aC5yYW5kb20oKTtcbiAgfVxuICByZXR1cm4gbXUgKyAodG90YWwgLSBzYW1wbGVzIC8gMikgLyAoc2FtcGxlcyAvIDIpICogc2lnbWE7XG59O1xuXG4vKipcbiAqIEdldCBhIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXhdXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIEluY2x1c2l2ZSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggSW5jbHVzaXZlIG1heFxuICogQHJldHVybiB7bnVtYmVyfSBBIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBpbnRlZ2VyXG4gKi9cbk1hdGguY2x0UmFuZG9tSW50ID0gKG1pbiwgbWF4KSA9PiBNYXRoLmZsb29yKG1pbiArIE1hdGguY2x0UmFuZG9tKDAuNSwgMC41LCAyKSAqIChtYXggKyAxIC0gbWluKSk7XG5cbi8qKlxuICogUmV0dXJuIGEgd2VpZ2h0ZWQgcmFuZG9tIGludGVnZXJcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gdyBBbiBhcnJheSBvZiB3ZWlnaHRzXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIGluZGV4IGZyb20gd1xuICovXG5NYXRoLndlaWdodGVkUmFuZG9tID0gdyA9PiB7XG4gIGxldCB0b3RhbCA9IHcucmVkdWNlKChhLCBpKSA9PiBhICsgaSwgMCksIG4gPSAwO1xuICBjb25zdCByID0gTWF0aC5yYW5kb20oKSAqIHRvdGFsO1xuICB3aGlsZSAodG90YWwgPiByKSB7XG4gICAgdG90YWwgLT0gd1tuKytdO1xuICB9XG4gIHJldHVybiBuIC0gMTtcbn07XG5cbi8qKlxuICogQW4gaW50ZXJwb2xhdGlvbiBmdW5jdGlvblxuICogQGNhbGxiYWNrIGludGVycG9sYXRpb25DYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlLCBzaG91bGQgYmUgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuXG4vKipcbiAqIFJldHVybiBhbiBpbnRlcnBvbGF0ZWQgdmFsdWUgZnJvbSBhbiBhcnJheVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhIEFuIGFycmF5IG9mIHZhbHVlcyBpbnRlcnBvbGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGkgQSBudW1iZXIgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHBhcmFtIHtpbnRlcnBvbGF0aW9uQ2FsbGJhY2t9IFtmPU1hdGgubGVycF0gVGhlIGludGVycG9sYXRpb24gZnVuY3Rpb24gdG8gdXNlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW21pbihhKSwgbWF4KGEpXVxuICovXG5NYXRoLmxlcnBBcnJheSA9IChhLCBpLCBmID0gTWF0aC5sZXJwKSA9PiB7XG4gIGNvbnN0IHMgPSBpICogKGEubGVuZ3RoIC0gMSk7XG4gIGNvbnN0IHAgPSBNYXRoLmNsYW1wKE1hdGgudHJ1bmMocyksIDAsIGEubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBmKGFbcF0gfHwgMCwgYVtwICsgMV0gfHwgMCwgTWF0aC5mcmFjKHMpKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9yc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge251bWJlcn0gYSDiiJkgYlxuICovXG5NYXRoLmRvdCA9IChhLCBiKSA9PiBhLnJlZHVjZSgobiwgdiwgaSkgPT4gbiArIHYgKiBiW2ldLCAwKTtcblxuLyoqXG4gKiBHZXQgdGhlIGZhY3RvcmlhbCBvZiBhIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGFcbiAqIEByZXR1cm4ge251bWJlcn0gYSFcbiAqL1xuTWF0aC5mYWN0b3JpYWwgPSBhID0+IHtcbiAgbGV0IHJlc3VsdCA9IDE7XG4gIGZvciAobGV0IGkgPSAyOyBpIDw9IGE7IGkrKykge1xuICAgIHJlc3VsdCAqPSBpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgbnVtYmVyIG9mIHBlcm11dGF0aW9ucyBvZiByIGVsZW1lbnRzIGZyb20gYSBzZXQgb2YgbiBlbGVtZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7bnVtYmVyfSByXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG5QclxuICovXG5NYXRoLnBlcm11dGF0aW9uID0gKG4sIHIpID0+IE1hdGguZmFjdG9yaWFsKG4pIC8gTWF0aC5mYWN0b3JpYWwobiAtIHIpO1xuXG4vKipcbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNvbWJpbmF0aW9ucyBvZiByIGVsZW1lbnRzIGZyb20gYSBzZXQgb2YgbiBlbGVtZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7bnVtYmVyfSByXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG5DclxuICovXG5NYXRoLmNvbWJpbmF0aW9uID0gKG4sIHIpID0+IE1hdGguZmFjdG9yaWFsKG4pIC8gKE1hdGguZmFjdG9yaWFsKHIpICogTWF0aC5mYWN0b3JpYWwobiAtIHIpKTtcblxuLyoqIEBjbGFzcyBBcnJheSAqL1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gZm9yIGdlbmVyYXRpbmcgYXJyYXkgdmFsdWVzXG4gKiBAY2FsbGJhY2sgdGltZXNDYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIGFycmF5IGluZGV4XG4gKiBAcmV0dXJuIHsqfSBUaGUgYXJyYXkgdmFsdWVcbiAqL1xuXG4vKipcbiAqIFJldHVybiBhIG5ldyBhcnJheSB3aXRoIGxlbmd0aCBuIGJ5IGNhbGxpbmcgZnVuY3Rpb24gZihpKSBvbiBlYWNoIGVsZW1lbnRcbiAqIEBwYXJhbSB7dGltZXNDYWxsYmFja30gZlxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIHNpemUgb2YgdGhlIGFycmF5XG4gKiBAcmV0dXJuIHtBcnJheTwqPn1cbiAqL1xuQXJyYXkudGltZXMgPSAoZiwgbikgPT4gQXJyYXkobikuZmlsbCgwKS5tYXAoKF8sIGkpID0+IGYoaSkpO1xuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBjb250YWluaW5nIG51bWJlcnMgMC0+KG4gLSAxKVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIHNpemUgb2YgdGhlIGFycmF5XG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBBbiBhcnJheSBvZiBpbnRlZ2VycyAwLT4obiAtIDEpXG4gKi9cbkFycmF5LnJhbmdlID0gbiA9PiBBcnJheS50aW1lcyhpID0+IGksIG4pO1xuXG4vKipcbiAqIFppcCAyIGFycmF5cyB0b2dldGhlciwgaS5lLiAoWzEsIDIsIDNdLCBbYSwgYiwgY10pID0+IFtbMSwgYV0sIFsyLCBiXSwgWzMsIGNdXVxuICogQHBhcmFtIHtBcnJheTwqPn0gYVxuICogQHBhcmFtIHtBcnJheTwqPn0gYlxuICogQHJldHVybiB7QXJyYXk8QXJyYXk8Kj4+fVxuICovXG5BcnJheS56aXAgPSAoYSwgYikgPT4gYS5tYXAoKGssIGkpID0+IFtrLCBiW2ldXSk7XG5cbi8qKlxuICogUmV0dXJuIGFycmF5W2ldIHdpdGggcG9zaXRpdmUgYW5kIG5lZ2F0aXZlIHdyYXBwaW5nXG4gKiBAbmFtZSBhdFxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgQXJyYXkucHJvdG90eXBlXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgcG9zaXRpdmVseS9uZWdhdGl2ZWx5IHdyYXBwZWQgYXJyYXkgaW5kZXhcbiAqIEByZXR1cm4geyp9IEFuIGVsZW1lbnQgZnJvbSB0aGUgYXJyYXlcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ2F0Jywge1xuICB2YWx1ZTogZnVuY3Rpb24gKGkpIHtcbiAgICBjb25zdCBsID0gdGhpcy5sZW5ndGg7XG4gICAgcmV0dXJuIHRoaXNbaSA8IDAgPyBsIC0gKE1hdGguYWJzKGkgKyAxKSAlIGwpIC0gMSA6IGkgJSBsXTtcbiAgfVxufSk7XG5cbi8qKlxuICogQ2hvcCBhbiBhcnJheSBpbnRvIGNodW5rcyBvZiBzaXplIG5cbiAqIEBuYW1lIGNodW5rXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBBcnJheS5wcm90b3R5cGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBjaHVuayBzaXplXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTwqPj59IEFuIGFycmF5IG9mIGFycmF5IGNodW5rc1xuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnY2h1bmsnLCB7XG4gIHZhbHVlOiBmdW5jdGlvbiAobikge1xuICAgIHJldHVybiBBcnJheS50aW1lcyhpID0+IHRoaXMuc2xpY2UoaSAqIG4sIGkgKiBuICsgbiksIE1hdGguY2VpbCh0aGlzLmxlbmd0aCAvIG4pKTtcbiAgfVxufSk7XG5cbi8qKlxuICogUmFuZG9tbHkgc2h1ZmZsZSBhbiBhcnJheSBpbi1wbGFjZVxuICogQG5hbWUgc2h1ZmZsZVxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgQXJyYXkucHJvdG90eXBlXG4gKiBAcmV0dXJuIHtBcnJheTwqPn0gVGhlIHNodWZmbGVkIGFycmF5XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdzaHVmZmxlJywge1xuICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChhID0+IFtNYXRoLnJhbmRvbSgpLCBhXSkuc29ydCgoYSwgYikgPT4gYVswXSAtIGJbMF0pLm1hcChhID0+IGFbMV0pO1xuICB9XG59KTtcblxuLyoqXG4gKiBBIDJkIHZlY3RvclxuICogQHR5cGVkZWYge09iamVjdH0gdmVjXG4gKiBAcHJvcGVydHkge251bWJlcn0geCBUaGUgeCBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHkgVGhlIHkgY29tcG9uZW50IG9mIHRoZSB2ZWN0b3JcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyB2ZWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfHZlY30gW3hdIFRoZSB4IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yLCBvciBhIHZlY3RvciB0byBjb3B5XG4gKiBAcGFyYW0ge251bWJlcn0gW3ldIFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gKiBAcmV0dXJuIHt2ZWN9IEEgbmV3IHZlY3RvclxuICogQGV4YW1wbGUgPGNhcHRpb24+VmFyaW91cyB3YXlzIHRvIGluaXRpYWxpc2UgYSB2ZWN0b3I8L2NhcHRpb24+XG4gKiBsZXQgYSA9IHZlYygzLCAyKTsgIC8vICgzLCAyKVxuICogbGV0IGIgPSB2ZWMoNCk7ICAgICAvLyAoNCwgNClcbiAqIGxldCBjID0gdmVjKGEpOyAgICAgLy8gKDMsIDIpXG4gKiBsZXQgZCA9IHZlYygpOyAgICAgIC8vICgwLCAwKVxuICovXG5jb25zdCB2ZWMgPSAoeCwgeSkgPT4gKCF4ICYmICF5ID9cbiAgeyB4OiAwLCB5OiAwIH0gOiAodHlwZW9mIHggPT09ICdvYmplY3QnID9cbiAgICB7IHg6IHgueCB8fCAwLCB5OiB4LnkgfHwgMCB9IDogKHkgPT09IG51bGwgfHwgeSA9PT0gdW5kZWZpbmVkID9cbiAgICAgIHsgeDogeCwgeTogeCB9IDogeyB4OiB4LCB5OiB5IH0pXG4gIClcbik7XG5cbi8qKlxuICogR2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjdG9yIGFzIGFuIGFycmF5XG4gKiBAcGFyYW0ge3ZlY30gYSBUaGUgdmVjdG9yIHRvIGdldCBjb21wb25lbnRzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IFRoZSB2ZWN0b3IgY29tcG9uZW50cyBhcyBhbiBhcnJheVxuICovXG52ZWMuY29tcG9uZW50cyA9IGEgPT4gW2EueCwgYS55XTtcblxuLyoqXG4gKiBSZXR1cm4gYSB1bml0IHZlY3RvciAoMSwgMClcbiAqIEByZXR1cm4ge3ZlY30gQSB1bml0IHZlY3RvciAoMSwgMClcbiAqL1xudmVjLnV4ID0gKCkgPT4gdmVjKDEsIDApO1xuXG4vKipcbiAqIFJldHVybiBhIHVuaXQgdmVjdG9yICgwLCAxKVxuICogQHJldHVybiB7dmVjfSBBIHVuaXQgdmVjdG9yICgwLCAxKVxuICovXG52ZWMudXkgPSAoKSA9PiB2ZWMoMCwgMSk7XG5cbi8qKlxuICogQWRkIHZlY3RvcnNcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge3ZlY30gYiBWZWN0b3IgYlxuICogQHJldHVybiB7dmVjfSBhICsgYlxuICovXG52ZWMuYWRkID0gKGEsIGIpID0+ICh7IHg6IGEueCArIGIueCwgeTogYS55ICsgYi55IH0pO1xuXG4vKipcbiAqIFNjYWxlIGEgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHtudW1iZXJ9IGIgU2NhbGFyIGJcbiAqIEByZXR1cm4ge3ZlY30gYSAqIGJcbiAqL1xudmVjLm11bCA9IChhLCBiKSA9PiAoeyB4OiBhLnggKiBiLCB5OiBhLnkgKiBiIH0pO1xuXG4vKipcbiAqIFN1YnRyYWN0IHZlY3RvcnNcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcGFyYW0ge3ZlY30gYiBWZWN0b3IgYlxuICogQHJldHVybiB7dmVjfSBhIC0gYlxuICovXG52ZWMuc3ViID0gKGEsIGIpID0+ICh7IHg6IGEueCAtIGIueCwgeTogYS55IC0gYi55IH0pO1xuXG4vKipcbiAqIEdldCB0aGUgbGVuZ3RoIG9mIGEgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHJldHVybiB7bnVtYmVyfSB8YXxcbiAqL1xudmVjLmxlbiA9IGEgPT4gTWF0aC5zcXJ0KGEueCAqIGEueCArIGEueSAqIGEueSk7XG5cbi8qKlxuICogR2V0IHRoZSBsZW5ndGggb2YgYSB2ZWN0b3IgdXNpbmcgdGF4aWNhYiBnZW9tZXRyeVxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gfGF8XG4gKi9cbnZlYy5tYW5oYXR0YW4gPSBhID0+IE1hdGguYWJzKGEueCkgKyBNYXRoLmFicyhhLnkpO1xuXG4vKipcbiAqIE5vcm1hbGlzZSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBub3JtYWxpc2VcbiAqIEByZXR1cm4ge3ZlY30gXmFcbiAqL1xudmVjLm5vciA9IGEgPT4ge1xuICBsZXQgbGVuID0gdmVjLmxlbihhKTtcbiAgcmV0dXJuIGxlbiA/IHsgeDogYS54IC8gbGVuLCB5OiBhLnkgLyBsZW4gfSA6IHZlYygpO1xufTtcblxuLyoqXG4gKiBHZXQgYSBkb3QgcHJvZHVjdCBvZiB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge251bWJlcn0gYSDiiJkgYlxuICovXG52ZWMuZG90ID0gKGEsIGIpID0+IGEueCAqIGIueCArIGEueSAqIGIueTtcblxuLyoqXG4gKiBSb3RhdGUgYSB2ZWN0b3IgYnkgciByYWRpYW5zXG4gKiBAcGFyYW0ge3ZlY30gYSBUaGUgdmVjdG9yIHRvIHJvdGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHIgVGhlIGFuZ2xlIHRvIHJvdGF0ZSBieSwgbWVhc3VyZWQgaW4gcmFkaWFuc1xuICogQHJldHVybiB7dmVjfSBBIHJvdGF0ZWQgdmVjdG9yXG4gKi9cbnZlYy5yb3QgPSAoYSwgcikgPT4ge1xuICBsZXQgcyA9IE1hdGguc2luKHIpLFxuICAgIGMgPSBNYXRoLmNvcyhyKTtcbiAgcmV0dXJuIHsgeDogYyAqIGEueCAtIHMgKiBhLnksIHk6IHMgKiBhLnggKyBjICogYS55IH07XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIHZlY3RvcnMgYXJlIGVxdWFsXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmVjdG9ycyBhIGFuZCBiIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbnZlYy5lcSA9IChhLCBiKSA9PiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueTtcblxuLyoqXG4gKiBHZXQgdGhlIGFuZ2xlIG9mIGEgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgYW5nbGUgb2YgdmVjdG9yIGEgaW4gcmFkaWFuc1xuICovXG52ZWMucmFkID0gYSA9PiBNYXRoLmF0YW4yKGEueSwgYS54KTtcblxuLyoqXG4gKiBDb3B5IGEgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlY30gYSBUaGUgdmVjdG9yIHRvIGNvcHlcbiAqIEByZXR1cm4ge3ZlY30gQSBjb3B5IG9mIHZlY3RvciBhXG4gKi9cbnZlYy5jcHkgPSBhID0+IHZlYyhhKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBjb21wb25lbnQgb2YgYSB2ZWN0b3JcbiAqIEBjYWxsYmFjayB2ZWN0b3JNYXBDYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSBjb21wb25lbnQgdmFsdWVcbiAqIEBwYXJhbSB7J3gnIHwgJ3knfSBsYWJlbCBUaGUgY29tcG9uZW50IGxhYmVsICh4IG9yIHkpXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBtYXBwZWQgY29tcG9uZW50XG4gKi9cblxuLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gb24gZWFjaCBjb21wb25lbnQgb2YgYSB2ZWN0b3IgYW5kIGJ1aWxkIGEgbmV3IHZlY3RvciBmcm9tIHRoZSByZXN1bHRzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN0b3JNYXBDYWxsYmFja30gZiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gKiBAcmV0dXJuIHt2ZWN9IFZlY3RvciBhIG1hcHBlZCB0aHJvdWdoIGZcbiAqL1xudmVjLm1hcCA9IChhLCBmKSA9PiAoeyB4OiBmKGEueCwgJ3gnKSwgeTogZihhLnksICd5JykgfSk7XG5cbi8qKlxuICogQ29udmVydCBhIHZlY3RvciBpbnRvIGEgc3RyaW5nXG4gKiBAcGFyYW0ge3ZlY30gYSBUaGUgdmVjdG9yIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcz0nLCAnXSBUaGUgc2VwYXJhdG9yIHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfSBBIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKi9cbnZlYy5zdHIgPSAoYSwgcyA9ICcsICcpID0+IGAke2EueH0ke3N9JHthLnl9YDtcblxuLyoqXG4gKiBBIG1hdHJpeFxuICogQHR5cGVkZWYge09iamVjdH0gbWF0XG4gKiBAcHJvcGVydHkge251bWJlcn0gbSBUaGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIG1hdHJpeFxuICogQHByb3BlcnR5IHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBtYXRyaXhcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8bnVtYmVyPn0gZW50cmllcyBUaGUgbWF0cml4IHZhbHVlc1xuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IG1hdHJpeFxuICogQHBhcmFtIHtudW1iZXJ9IFttPTRdIFRoZSBudW1iZXIgb2Ygcm93c1xuICogQHBhcmFtIHtudW1iZXJ9IFtuPTRdIFRoZSBudW1iZXIgb2YgY29sdW1uc1xuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBbZW50cmllcz1bXV0gTWF0cml4IHZhbHVlcyBpbiByZWFkaW5nIG9yZGVyXG4gKiBAcmV0dXJuIHttYXR9IEEgbmV3IG1hdHJpeFxuICovXG5jb25zdCBtYXQgPSAobSA9IDQsIG4gPSA0LCBlbnRyaWVzID0gW10pID0+ICh7XG4gIG0sIG4sXG4gIGVudHJpZXM6IGVudHJpZXMuY29uY2F0KEFycmF5KG0gKiBuKS5maWxsKDApKS5zbGljZSgwLCBtICogbilcbn0pO1xuXG4vKipcbiAqIEdldCBhbiBpZGVudGl0eSBtYXRyaXggb2Ygc2l6ZSBuXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgbWF0cml4XG4gKiBAcmV0dXJuIHttYXR9IEFuIGlkZW50aXR5IG1hdHJpeFxuICovXG5tYXQuaWRlbnRpdHkgPSBuID0+IG1hdChuLCBuLCBBcnJheShuICogbikuZmlsbCgwKS5tYXAoKHYsIGkpID0+ICsoTWF0aC5mbG9vcihpIC8gbikgPT09IGkgJSBuKSkpO1xuXG4vKipcbiAqIEdldCBhbiBlbnRyeSBmcm9tIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIHJvdyBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB2YWx1ZSBhdCBwb3NpdGlvbiAoaSwgaikgaW4gbWF0cml4IGFcbiAqL1xubWF0LmdldCA9IChhLCBpLCBqKSA9PiBhLmVudHJpZXNbKGogLSAxKSArIChpIC0gMSkgKiBhLm5dO1xuXG4vKipcbiAqIFNldCBhbiBlbnRyeSBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSByb3cgb2Zmc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gaiBUaGUgY29sdW1uIG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IHYgVGhlIHZhbHVlIHRvIHNldCBpbiBtYXRyaXggYVxuICovXG5tYXQuc2V0ID0gKGEsIGksIGosIHYpID0+IHsgYS5lbnRyaWVzWyhqIC0gMSkgKyAoaSAtIDEpICogYS5uXSA9IHY7IH07XG5cbi8qKlxuICogR2V0IGEgcm93IGZyb20gYSBtYXRyaXggYXMgYW4gYXJyYXlcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gbSBUaGUgcm93IG9mZnNldFxuICogQHJldHVybiB7QXJyYXk8bnVtYmVyPn0gUm93IG0gZnJvbSBtYXRyaXggYVxuICovXG5tYXQucm93ID0gKGEsIG0pID0+IHtcbiAgY29uc3QgcyA9IChtIC0gMSkgKiBhLm47XG4gIHJldHVybiBhLmVudHJpZXMuc2xpY2UocywgcyArIGEubik7XG59O1xuXG4vKipcbiAqIEdldCBhIGNvbHVtbiBmcm9tIGEgbWF0cml4IGFzIGFuIGFycmF5XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIGNvbHVtbiBvZmZzZXRcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IENvbHVtbiBuIGZyb20gbWF0cml4IGFcbiAqL1xubWF0LmNvbCA9IChhLCBuKSA9PiBBcnJheS50aW1lcyhpID0+IG1hdC5nZXQoYSwgKGkgKyAxKSwgbiksIGEubSk7XG5cbi8qKlxuICogQWRkIG1hdHJpY2VzXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXR9IGIgTWF0cml4IGJcbiAqIEByZXR1cm4ge21hdH0gYSArIGJcbiAqL1xubWF0LmFkZCA9IChhLCBiKSA9PiBhLm0gPT09IGIubSAmJiBhLm4gPT09IGIubiAmJiBtYXQubWFwKGEsICh2LCBpKSA9PiB2ICsgYi5lbnRyaWVzW2ldKTtcblxuLyoqXG4gKiBTdWJ0cmFjdCBtYXRyaWNlc1xuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHttYXR9IGEgLSBiXG4gKi9cbm1hdC5zdWIgPSAoYSwgYikgPT4gYS5tID09PSBiLm0gJiYgYS5uID09PSBiLm4gJiYgbWF0Lm1hcChhLCAodiwgaSkgPT4gdiAtIGIuZW50cmllc1tpXSk7XG5cbi8qKlxuICogTXVsdGlwbHkgbWF0cmljZXNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdH0gYiBNYXRyaXggYlxuICogQHJldHVybiB7bWF0fGJvb2xlYW59IGFiIG9yIGZhbHNlIGlmIHRoZSBtYXRyaWNlcyBjYW5ub3QgYmUgbXVsdGlwbGllZFxuICovXG5tYXQubXVsID0gKGEsIGIpID0+IHtcbiAgaWYgKGEubiAhPT0gYi5tKSB7IHJldHVybiBmYWxzZTsgfVxuICBjb25zdCByZXN1bHQgPSBtYXQoYS5tLCBiLm4pO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBhLm07IGkrKykge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IGIubjsgaisrKSB7XG4gICAgICBtYXQuc2V0KHJlc3VsdCwgaSwgaiwgTWF0aC5kb3QobWF0LnJvdyhhLCBpKSwgbWF0LmNvbChiLCBqKSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBTY2FsZSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFNjYWxhciBiXG4gKiBAcmV0dXJuIHttYXR9IGEgKiBiXG4gKi9cbm1hdC5zY2FsZSA9IChhLCBiKSA9PiBtYXQubWFwKGEsIHYgPT4gdiAqIGIpO1xuXG4vKipcbiAqIFRyYW5zcG9zZSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byB0cmFuc3Bvc2VcbiAqIEByZXR1cm4ge21hdH0gQSB0cmFuc3Bvc2VkIG1hdHJpeFxuICovXG5tYXQudHJhbnMgPSBhID0+IG1hdChhLm4sIGEubSwgQXJyYXkudGltZXMoaSA9PiBtYXQuY29sKGEsIChpICsgMSkpLCBhLm4pLmZsYXQoKSk7XG5cbi8qKlxuICogR2V0IHRoZSBtaW5vciBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSByb3cgb2Zmc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gaiBUaGUgY29sdW1uIG9mZnNldFxuICogQHJldHVybiB7bWF0fGJvb2xlYW59IFRoZSAoaSwgaikgbWlub3Igb2YgbWF0cml4IGEgb3IgZmFsc2UgaWYgdGhlIG1hdHJpeCBpcyBub3Qgc3F1YXJlXG4gKi9cbm1hdC5taW5vciA9IChhLCBpLCBqKSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgZW50cmllcyA9IFtdO1xuICBmb3IgKGxldCBpaSA9IDE7IGlpIDw9IGEubTsgaWkrKykge1xuICAgIGlmIChpaSA9PT0gaSkgeyBjb250aW51ZTsgfVxuICAgIGZvciAobGV0IGpqID0gMTsgamogPD0gYS5uOyBqaisrKSB7XG4gICAgICBpZiAoamogPT09IGopIHsgY29udGludWU7IH1cbiAgICAgIGVudHJpZXMucHVzaChtYXQuZ2V0KGEsIGlpLCBqaikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWF0KGEubSAtIDEsIGEubiAtIDEsIGVudHJpZXMpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGRldGVybWluYW50IG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHJldHVybiB7bnVtYmVyfGJvb2xlYW59IHxhfCBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0LmRldCA9IGEgPT4ge1xuICBpZiAoYS5tICE9PSBhLm4pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChhLm0gPT09IDEpIHtcbiAgICByZXR1cm4gYS5lbnRyaWVzWzBdO1xuICB9XG4gIGlmIChhLm0gPT09IDIpIHtcbiAgICByZXR1cm4gYS5lbnRyaWVzWzBdICogYS5lbnRyaWVzWzNdIC0gYS5lbnRyaWVzWzFdICogYS5lbnRyaWVzWzJdO1xuICB9XG4gIGxldCB0b3RhbCA9IDAsIHNpZ24gPSAxO1xuICBmb3IgKGxldCBqID0gMTsgaiA8PSBhLm47IGorKykge1xuICAgIHRvdGFsICs9IHNpZ24gKiBhLmVudHJpZXNbaiAtIDFdICogbWF0LmRldChtYXQubWlub3IoYSwgMSwgaikpO1xuICAgIHNpZ24gKj0gLTE7XG4gIH1cbiAgcmV0dXJuIHRvdGFsO1xufTtcblxuLyoqXG4gKiBOb3JtYWxpc2UgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gbm9ybWFsaXNlXG4gKiBAcmV0dXJuIHttYXR8Ym9vbGVhbn0gXmEgb3IgZmFsc2UgaWYgdGhlIG1hdHJpeCBpcyBub3Qgc3F1YXJlXG4gKi9cbm1hdC5ub3IgPSBhID0+IHtcbiAgaWYgKGEubSAhPT0gYS5uKSB7IHJldHVybiBmYWxzZTsgfVxuICBjb25zdCBkID0gbWF0LmRldChhKTtcbiAgcmV0dXJuIG1hdC5tYXAoYSwgaSA9PiBpICogZCk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgYWRqdWdhdGUgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggZnJvbSB3aGljaCB0byBnZXQgdGhlIGFkanVnYXRlXG4gKiBAcmV0dXJuIHttYXR9IFRoZSBhZGp1Z2F0ZSBvZiBhXG4gKi9cbm1hdC5hZGogPSBhID0+IHtcbiAgY29uc3QgbWlub3JzID0gbWF0KGEubSwgYS5uKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gYS5tOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBhLm47IGorKykge1xuICAgICAgbWF0LnNldChtaW5vcnMsIGksIGosIG1hdC5kZXQobWF0Lm1pbm9yKGEsIGksIGopKSk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGNvZmFjdG9ycyA9IG1hdC5tYXAobWlub3JzLCAodiwgaSkgPT4gdiAqIChpICUgMiA/IC0xIDogMSkpO1xuICByZXR1cm4gbWF0LnRyYW5zKGNvZmFjdG9ycyk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgaW52ZXJzZSBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byBpbnZlcnRcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBhXi0xIG9yIGZhbHNlIGlmIHRoZSBtYXRyaXggaGFzIG5vIGludmVyc2VcbiAqL1xubWF0LmludiA9IGEgPT4ge1xuICBpZiAoYS5tICE9PSBhLm4pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGNvbnN0IGQgPSBtYXQuZGV0KGEpO1xuICBpZiAoZCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgcmV0dXJuIG1hdC5zY2FsZShtYXQuYWRqKGEpLCAxIC8gZCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHR3byBtYXRyaWNlcyBhcmUgZXF1YWxcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdH0gYiBNYXRyaXggYlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtYXRyaWNlcyBhIGFuZCBiIGFyZSBpZGVudGljYWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG5tYXQuZXEgPSAoYSwgYikgPT4gYS5tID09PSBiLm0gJiYgYS5uID09PSBiLm4gJiYgbWF0LnN0cihhKSA9PT0gbWF0LnN0cihiKTtcblxuLyoqXG4gKiBDb3B5IGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIGNvcHlcbiAqIEByZXR1cm4ge21hdH0gQSBjb3B5IG9mIG1hdHJpeCBhXG4gKi9cbm1hdC5jcHkgPSBhID0+IG1hdChhLm0sIGEubiwgWy4uLmEuZW50cmllc10pO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGVudHJ5IG9mIGEgbWF0cml4XG4gKiBAY2FsbGJhY2sgbWF0cml4TWFwQ2FsbGJhY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgZW50cnkgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgZW50cnkgaW5kZXhcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gZW50cmllcyBUaGUgYXJyYXkgb2YgbWF0cml4IGVudHJpZXNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG1hcHBlZCBlbnRyeVxuICovXG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIG9uIGVhY2ggZW50cnkgb2YgYSBtYXRyaXggYW5kIGJ1aWxkIGEgbmV3IG1hdHJpeCBmcm9tIHRoZSByZXN1bHRzXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXRyaXhNYXBDYWxsYmFja30gZiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGVudHJ5IG9mIHRoZSBtYXRyaXhcbiAqIEByZXR1cm4ge21hdH0gTWF0cml4IGEgbWFwcGVkIHRocm91Z2ggZlxuICovXG5tYXQubWFwID0gKGEsIGYpID0+IG1hdChhLm0sIGEubiwgYS5lbnRyaWVzLm1hcChmKSk7XG5cbi8qKlxuICogQ29udmVydCBhIG1hdHJpeCBpbnRvIGEgc3RyaW5nXG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIGNvbnZlcnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbXM9JywgJ10gVGhlIHNlcGFyYXRvciBzdHJpbmcgZm9yIGNvbHVtbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbnM9J1xcbiddIFRoZSBzZXBhcmF0b3Igc3RyaW5nIGZvciByb3dzXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAqL1xubWF0LnN0ciA9IChhLCBtcyA9ICcsICcsIG5zID0gJ1xcbicpID0+IGEuZW50cmllcy5jaHVuayhhLm4pLm1hcChyID0+IHIuam9pbihtcykpLmpvaW4obnMpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7IHZlYywgbWF0IH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IHZvaWQgMDtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoXCIuL2NvcmVcIik7XG5jb25zdCBkcmFmdDdfMSA9IHJlcXVpcmUoXCIuL3ZvY2FidWxhcmllcy9kcmFmdDdcIik7XG5jb25zdCBkaXNjcmltaW5hdG9yXzEgPSByZXF1aXJlKFwiLi92b2NhYnVsYXJpZXMvZGlzY3JpbWluYXRvclwiKTtcbmNvbnN0IGRyYWZ0N01ldGFTY2hlbWEgPSByZXF1aXJlKFwiLi9yZWZzL2pzb24tc2NoZW1hLWRyYWZ0LTA3Lmpzb25cIik7XG5jb25zdCBNRVRBX1NVUFBPUlRfREFUQSA9IFtcIi9wcm9wZXJ0aWVzXCJdO1xuY29uc3QgTUVUQV9TQ0hFTUFfSUQgPSBcImh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvZHJhZnQtMDcvc2NoZW1hXCI7XG5jbGFzcyBBanYgZXh0ZW5kcyBjb3JlXzEuZGVmYXVsdCB7XG4gICAgX2FkZFZvY2FidWxhcmllcygpIHtcbiAgICAgICAgc3VwZXIuX2FkZFZvY2FidWxhcmllcygpO1xuICAgICAgICBkcmFmdDdfMS5kZWZhdWx0LmZvckVhY2goKHYpID0+IHRoaXMuYWRkVm9jYWJ1bGFyeSh2KSk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZGlzY3JpbWluYXRvcilcbiAgICAgICAgICAgIHRoaXMuYWRkS2V5d29yZChkaXNjcmltaW5hdG9yXzEuZGVmYXVsdCk7XG4gICAgfVxuICAgIF9hZGREZWZhdWx0TWV0YVNjaGVtYSgpIHtcbiAgICAgICAgc3VwZXIuX2FkZERlZmF1bHRNZXRhU2NoZW1hKCk7XG4gICAgICAgIGlmICghdGhpcy5vcHRzLm1ldGEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG1ldGFTY2hlbWEgPSB0aGlzLm9wdHMuJGRhdGFcbiAgICAgICAgICAgID8gdGhpcy4kZGF0YU1ldGFTY2hlbWEoZHJhZnQ3TWV0YVNjaGVtYSwgTUVUQV9TVVBQT1JUX0RBVEEpXG4gICAgICAgICAgICA6IGRyYWZ0N01ldGFTY2hlbWE7XG4gICAgICAgIHRoaXMuYWRkTWV0YVNjaGVtYShtZXRhU2NoZW1hLCBNRVRBX1NDSEVNQV9JRCwgZmFsc2UpO1xuICAgICAgICB0aGlzLnJlZnNbXCJodHRwOi8vanNvbi1zY2hlbWEub3JnL3NjaGVtYVwiXSA9IE1FVEFfU0NIRU1BX0lEO1xuICAgIH1cbiAgICBkZWZhdWx0TWV0YSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdHMuZGVmYXVsdE1ldGEgPVxuICAgICAgICAgICAgc3VwZXIuZGVmYXVsdE1ldGEoKSB8fCAodGhpcy5nZXRTY2hlbWEoTUVUQV9TQ0hFTUFfSUQpID8gTUVUQV9TQ0hFTUFfSUQgOiB1bmRlZmluZWQpKTtcbiAgICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBBanY7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBBanY7XG52YXIgdmFsaWRhdGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdmFsaWRhdGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJLZXl3b3JkQ3h0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZV8xLktleXdvcmRDeHQ7IH0gfSk7XG52YXIgY29kZWdlbl8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLl87IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5zdHI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5zdHJpbmdpZnk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJuaWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5uaWw7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuTmFtZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvZGVHZW5cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5Db2RlR2VuOyB9IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YWp2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZWdleHBDb2RlID0gZXhwb3J0cy5nZXRQcm9wZXJ0eSA9IGV4cG9ydHMuc2FmZVN0cmluZ2lmeSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJDb25jYXQgPSBleHBvcnRzLmFkZENvZGVBcmcgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5fQ29kZSA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMuSURFTlRJRklFUiA9IGV4cG9ydHMuX0NvZGVPck5hbWUgPSB2b2lkIDA7XG5jbGFzcyBfQ29kZU9yTmFtZSB7XG59XG5leHBvcnRzLl9Db2RlT3JOYW1lID0gX0NvZGVPck5hbWU7XG5leHBvcnRzLklERU5USUZJRVIgPSAvXlthLXokX11bYS16JF8wLTldKiQvaTtcbmNsYXNzIE5hbWUgZXh0ZW5kcyBfQ29kZU9yTmFtZSB7XG4gICAgY29uc3RydWN0b3Iocykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIWV4cG9ydHMuSURFTlRJRklFUi50ZXN0KHMpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29kZUdlbjogbmFtZSBtdXN0IGJlIGEgdmFsaWQgaWRlbnRpZmllclwiKTtcbiAgICAgICAgdGhpcy5zdHIgPSBzO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbiAgICBlbXB0eVN0cigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiB7IFt0aGlzLnN0cl06IDEgfTtcbiAgICB9XG59XG5leHBvcnRzLk5hbWUgPSBOYW1lO1xuY2xhc3MgX0NvZGUgZXh0ZW5kcyBfQ29kZU9yTmFtZSB7XG4gICAgY29uc3RydWN0b3IoY29kZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pdGVtcyA9IHR5cGVvZiBjb2RlID09PSBcInN0cmluZ1wiID8gW2NvZGVdIDogY29kZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cjtcbiAgICB9XG4gICAgZW1wdHlTdHIoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPiAxKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5faXRlbXNbMF07XG4gICAgICAgIHJldHVybiBpdGVtID09PSBcIlwiIHx8IGl0ZW0gPT09ICdcIlwiJztcbiAgICB9XG4gICAgZ2V0IHN0cigpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKChfYSA9IHRoaXMuX3N0cikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKHRoaXMuX3N0ciA9IHRoaXMuX2l0ZW1zLnJlZHVjZSgocywgYykgPT4gYCR7c30ke2N9YCwgXCJcIikpKTtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoKF9hID0gdGhpcy5fbmFtZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICh0aGlzLl9uYW1lcyA9IHRoaXMuX2l0ZW1zLnJlZHVjZSgobmFtZXMsIGMpID0+IHtcbiAgICAgICAgICAgIGlmIChjIGluc3RhbmNlb2YgTmFtZSlcbiAgICAgICAgICAgICAgICBuYW1lc1tjLnN0cl0gPSAobmFtZXNbYy5zdHJdIHx8IDApICsgMTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lcztcbiAgICAgICAgfSwge30pKSk7XG4gICAgfVxufVxuZXhwb3J0cy5fQ29kZSA9IF9Db2RlO1xuZXhwb3J0cy5uaWwgPSBuZXcgX0NvZGUoXCJcIik7XG5mdW5jdGlvbiBfKHN0cnMsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBjb2RlID0gW3N0cnNbMF1dO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGFkZENvZGVBcmcoY29kZSwgYXJnc1tpXSk7XG4gICAgICAgIGNvZGUucHVzaChzdHJzWysraV0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9Db2RlKGNvZGUpO1xufVxuZXhwb3J0cy5fID0gXztcbmNvbnN0IHBsdXMgPSBuZXcgX0NvZGUoXCIrXCIpO1xuZnVuY3Rpb24gc3RyKHN0cnMsIC4uLmFyZ3MpIHtcbiAgICBjb25zdCBleHByID0gW3NhZmVTdHJpbmdpZnkoc3Ryc1swXSldO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGV4cHIucHVzaChwbHVzKTtcbiAgICAgICAgYWRkQ29kZUFyZyhleHByLCBhcmdzW2ldKTtcbiAgICAgICAgZXhwci5wdXNoKHBsdXMsIHNhZmVTdHJpbmdpZnkoc3Ryc1srK2ldKSk7XG4gICAgfVxuICAgIG9wdGltaXplKGV4cHIpO1xuICAgIHJldHVybiBuZXcgX0NvZGUoZXhwcik7XG59XG5leHBvcnRzLnN0ciA9IHN0cjtcbmZ1bmN0aW9uIGFkZENvZGVBcmcoY29kZSwgYXJnKSB7XG4gICAgaWYgKGFyZyBpbnN0YW5jZW9mIF9Db2RlKVxuICAgICAgICBjb2RlLnB1c2goLi4uYXJnLl9pdGVtcyk7XG4gICAgZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgTmFtZSlcbiAgICAgICAgY29kZS5wdXNoKGFyZyk7XG4gICAgZWxzZVxuICAgICAgICBjb2RlLnB1c2goaW50ZXJwb2xhdGUoYXJnKSk7XG59XG5leHBvcnRzLmFkZENvZGVBcmcgPSBhZGRDb2RlQXJnO1xuZnVuY3Rpb24gb3B0aW1pemUoZXhwcikge1xuICAgIGxldCBpID0gMTtcbiAgICB3aGlsZSAoaSA8IGV4cHIubGVuZ3RoIC0gMSkge1xuICAgICAgICBpZiAoZXhwcltpXSA9PT0gcGx1cykge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gbWVyZ2VFeHBySXRlbXMoZXhwcltpIC0gMV0sIGV4cHJbaSArIDFdKTtcbiAgICAgICAgICAgIGlmIChyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGV4cHIuc3BsaWNlKGkgLSAxLCAzLCByZXMpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhwcltpKytdID0gXCIrXCI7XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1lcmdlRXhwckl0ZW1zKGEsIGIpIHtcbiAgICBpZiAoYiA9PT0gJ1wiXCInKVxuICAgICAgICByZXR1cm4gYTtcbiAgICBpZiAoYSA9PT0gJ1wiXCInKVxuICAgICAgICByZXR1cm4gYjtcbiAgICBpZiAodHlwZW9mIGEgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoYiBpbnN0YW5jZW9mIE5hbWUgfHwgYVthLmxlbmd0aCAtIDFdICE9PSAnXCInKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGIgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBgJHthLnNsaWNlKDAsIC0xKX0ke2J9XCJgO1xuICAgICAgICBpZiAoYlswXSA9PT0gJ1wiJylcbiAgICAgICAgICAgIHJldHVybiBhLnNsaWNlKDAsIC0xKSArIGIuc2xpY2UoMSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBiID09IFwic3RyaW5nXCIgJiYgYlswXSA9PT0gJ1wiJyAmJiAhKGEgaW5zdGFuY2VvZiBOYW1lKSlcbiAgICAgICAgcmV0dXJuIGBcIiR7YX0ke2Iuc2xpY2UoMSl9YDtcbiAgICByZXR1cm47XG59XG5mdW5jdGlvbiBzdHJDb25jYXQoYzEsIGMyKSB7XG4gICAgcmV0dXJuIGMyLmVtcHR5U3RyKCkgPyBjMSA6IGMxLmVtcHR5U3RyKCkgPyBjMiA6IHN0ciBgJHtjMX0ke2MyfWA7XG59XG5leHBvcnRzLnN0ckNvbmNhdCA9IHN0ckNvbmNhdDtcbi8vIFRPRE8gZG8gbm90IGFsbG93IGFycmF5cyBoZXJlXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZSh4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHggPT0gXCJib29sZWFuXCIgfHwgeCA9PT0gbnVsbFxuICAgICAgICA/IHhcbiAgICAgICAgOiBzYWZlU3RyaW5naWZ5KEFycmF5LmlzQXJyYXkoeCkgPyB4LmpvaW4oXCIsXCIpIDogeCk7XG59XG5mdW5jdGlvbiBzdHJpbmdpZnkoeCkge1xuICAgIHJldHVybiBuZXcgX0NvZGUoc2FmZVN0cmluZ2lmeSh4KSk7XG59XG5leHBvcnRzLnN0cmluZ2lmeSA9IHN0cmluZ2lmeTtcbmZ1bmN0aW9uIHNhZmVTdHJpbmdpZnkoeCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh4KVxuICAgICAgICAucmVwbGFjZSgvXFx1MjAyOC9nLCBcIlxcXFx1MjAyOFwiKVxuICAgICAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCBcIlxcXFx1MjAyOVwiKTtcbn1cbmV4cG9ydHMuc2FmZVN0cmluZ2lmeSA9IHNhZmVTdHJpbmdpZnk7XG5mdW5jdGlvbiBnZXRQcm9wZXJ0eShrZXkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGtleSA9PSBcInN0cmluZ1wiICYmIGV4cG9ydHMuSURFTlRJRklFUi50ZXN0KGtleSkgPyBuZXcgX0NvZGUoYC4ke2tleX1gKSA6IF8gYFske2tleX1dYDtcbn1cbmV4cG9ydHMuZ2V0UHJvcGVydHkgPSBnZXRQcm9wZXJ0eTtcbmZ1bmN0aW9uIHJlZ2V4cENvZGUocngpIHtcbiAgICByZXR1cm4gbmV3IF9Db2RlKHJ4LnRvU3RyaW5nKCkpO1xufVxuZXhwb3J0cy5yZWdleHBDb2RlID0gcmVnZXhwQ29kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9yID0gZXhwb3J0cy5hbmQgPSBleHBvcnRzLm5vdCA9IGV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMub3BlcmF0b3JzID0gZXhwb3J0cy52YXJLaW5kcyA9IGV4cG9ydHMuVmFsdWVTY29wZU5hbWUgPSBleHBvcnRzLlZhbHVlU2NvcGUgPSBleHBvcnRzLlNjb3BlID0gZXhwb3J0cy5OYW1lID0gZXhwb3J0cy5yZWdleHBDb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLmdldFByb3BlcnR5ID0gZXhwb3J0cy5uaWwgPSBleHBvcnRzLnN0ckNvbmNhdCA9IGV4cG9ydHMuc3RyID0gZXhwb3J0cy5fID0gdm9pZCAwO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4vY29kZVwiKTtcbmNvbnN0IHNjb3BlXzEgPSByZXF1aXJlKFwiLi9zY29wZVwiKTtcbnZhciBjb2RlXzIgPSByZXF1aXJlKFwiLi9jb2RlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLl87IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5zdHI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJDb25jYXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5zdHJDb25jYXQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJuaWxcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVfMi5uaWw7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRQcm9wZXJ0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLmdldFByb3BlcnR5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwic3RyaW5naWZ5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuc3RyaW5naWZ5OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVnZXhwQ29kZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZV8yLnJlZ2V4cENvZGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlXzIuTmFtZTsgfSB9KTtcbnZhciBzY29wZV8yID0gcmVxdWlyZShcIi4vc2NvcGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTY29wZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NvcGVfMi5TY29wZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZhbHVlU2NvcGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIuVmFsdWVTY29wZTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZhbHVlU2NvcGVOYW1lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY29wZV8yLlZhbHVlU2NvcGVOYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFyS2luZHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjb3BlXzIudmFyS2luZHM7IH0gfSk7XG5leHBvcnRzLm9wZXJhdG9ycyA9IHtcbiAgICBHVDogbmV3IGNvZGVfMS5fQ29kZShcIj5cIiksXG4gICAgR1RFOiBuZXcgY29kZV8xLl9Db2RlKFwiPj1cIiksXG4gICAgTFQ6IG5ldyBjb2RlXzEuX0NvZGUoXCI8XCIpLFxuICAgIExURTogbmV3IGNvZGVfMS5fQ29kZShcIjw9XCIpLFxuICAgIEVROiBuZXcgY29kZV8xLl9Db2RlKFwiPT09XCIpLFxuICAgIE5FUTogbmV3IGNvZGVfMS5fQ29kZShcIiE9PVwiKSxcbiAgICBOT1Q6IG5ldyBjb2RlXzEuX0NvZGUoXCIhXCIpLFxuICAgIE9SOiBuZXcgY29kZV8xLl9Db2RlKFwifHxcIiksXG4gICAgQU5EOiBuZXcgY29kZV8xLl9Db2RlKFwiJiZcIiksXG4gICAgQUREOiBuZXcgY29kZV8xLl9Db2RlKFwiK1wiKSxcbn07XG5jbGFzcyBOb2RlIHtcbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhfbmFtZXMsIF9jb25zdGFudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuY2xhc3MgRGVmIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IodmFyS2luZCwgbmFtZSwgcmhzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFyS2luZCA9IHZhcktpbmQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucmhzID0gcmhzO1xuICAgIH1cbiAgICByZW5kZXIoeyBlczUsIF9uIH0pIHtcbiAgICAgICAgY29uc3QgdmFyS2luZCA9IGVzNSA/IHNjb3BlXzEudmFyS2luZHMudmFyIDogdGhpcy52YXJLaW5kO1xuICAgICAgICBjb25zdCByaHMgPSB0aGlzLnJocyA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGAgPSAke3RoaXMucmhzfWA7XG4gICAgICAgIHJldHVybiBgJHt2YXJLaW5kfSAke3RoaXMubmFtZX0ke3Joc307YCArIF9uO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgaWYgKCFuYW1lc1t0aGlzLm5hbWUuc3RyXSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucmhzKVxuICAgICAgICAgICAgdGhpcy5yaHMgPSBvcHRpbWl6ZUV4cHIodGhpcy5yaHMsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yaHMgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGVPck5hbWUgPyB0aGlzLnJocy5uYW1lcyA6IHt9O1xuICAgIH1cbn1cbmNsYXNzIEFzc2lnbiBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGxocywgcmhzLCBzaWRlRWZmZWN0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxocyA9IGxocztcbiAgICAgICAgdGhpcy5yaHMgPSByaHM7XG4gICAgICAgIHRoaXMuc2lkZUVmZmVjdHMgPSBzaWRlRWZmZWN0cztcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5saHN9ID0gJHt0aGlzLnJoc307YCArIF9uO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICAgICAgaWYgKHRoaXMubGhzIGluc3RhbmNlb2YgY29kZV8xLk5hbWUgJiYgIW5hbWVzW3RoaXMubGhzLnN0cl0gJiYgIXRoaXMuc2lkZUVmZmVjdHMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucmhzID0gb3B0aW1pemVFeHByKHRoaXMucmhzLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSB0aGlzLmxocyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8ge30gOiB7IC4uLnRoaXMubGhzLm5hbWVzIH07XG4gICAgICAgIHJldHVybiBhZGRFeHByTmFtZXMobmFtZXMsIHRoaXMucmhzKTtcbiAgICB9XG59XG5jbGFzcyBBc3NpZ25PcCBleHRlbmRzIEFzc2lnbiB7XG4gICAgY29uc3RydWN0b3IobGhzLCBvcCwgcmhzLCBzaWRlRWZmZWN0cykge1xuICAgICAgICBzdXBlcihsaHMsIHJocywgc2lkZUVmZmVjdHMpO1xuICAgICAgICB0aGlzLm9wID0gb3A7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubGhzfSAke3RoaXMub3B9PSAke3RoaXMucmhzfTtgICsgX247XG4gICAgfVxufVxuY2xhc3MgTGFiZWwgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihsYWJlbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZXMgPSB7fTtcbiAgICB9XG4gICAgcmVuZGVyKHsgX24gfSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5sYWJlbH06YCArIF9uO1xuICAgIH1cbn1cbmNsYXNzIEJyZWFrIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IobGFiZWwpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB0aGlzLm5hbWVzID0ge307XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVsID8gYCAke3RoaXMubGFiZWx9YCA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgYnJlYWske2xhYmVsfTtgICsgX247XG4gICAgfVxufVxuY2xhc3MgVGhyb3cgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuICAgIHJlbmRlcih7IF9uIH0pIHtcbiAgICAgICAgcmV0dXJuIGB0aHJvdyAke3RoaXMuZXJyb3J9O2AgKyBfbjtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lcnJvci5uYW1lcztcbiAgICB9XG59XG5jbGFzcyBBbnlDb2RlIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoY29kZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIH1cbiAgICByZW5kZXIoeyBfbiB9KSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmNvZGV9O2AgKyBfbjtcbiAgICB9XG4gICAgb3B0aW1pemVOb2RlcygpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29kZX1gID8gdGhpcyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIHRoaXMuY29kZSA9IG9wdGltaXplRXhwcih0aGlzLmNvZGUsIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2RlIGluc3RhbmNlb2YgY29kZV8xLl9Db2RlT3JOYW1lID8gdGhpcy5jb2RlLm5hbWVzIDoge307XG4gICAgfVxufVxuY2xhc3MgUGFyZW50Tm9kZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKG5vZGVzID0gW10pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5yZWR1Y2UoKGNvZGUsIG4pID0+IGNvZGUgKyBuLnJlbmRlcihvcHRzKSwgXCJcIik7XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZXMgfSA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBjb25zdCBuID0gbm9kZXNbaV0ub3B0aW1pemVOb2RlcygpO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobikpXG4gICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEsIC4uLm4pO1xuICAgICAgICAgICAgZWxzZSBpZiAobilcbiAgICAgICAgICAgICAgICBub2Rlc1tpXSA9IG47XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2Rlcy5sZW5ndGggPiAwID8gdGhpcyA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZXMgfSA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gbm9kZXMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAvLyBpdGVyYXRpbmcgYmFja3dhcmRzIGltcHJvdmVzIDEtcGFzcyBvcHRpbWl6YXRpb25cbiAgICAgICAgICAgIGNvbnN0IG4gPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChuLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBzdWJ0cmFjdE5hbWVzKG5hbWVzLCBuLm5hbWVzKTtcbiAgICAgICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZXMubGVuZ3RoID4gMCA/IHRoaXMgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMucmVkdWNlKChuYW1lcywgbikgPT4gYWRkTmFtZXMobmFtZXMsIG4ubmFtZXMpLCB7fSk7XG4gICAgfVxufVxuY2xhc3MgQmxvY2tOb2RlIGV4dGVuZHMgUGFyZW50Tm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIFwie1wiICsgb3B0cy5fbiArIHN1cGVyLnJlbmRlcihvcHRzKSArIFwifVwiICsgb3B0cy5fbjtcbiAgICB9XG59XG5jbGFzcyBSb290IGV4dGVuZHMgUGFyZW50Tm9kZSB7XG59XG5jbGFzcyBFbHNlIGV4dGVuZHMgQmxvY2tOb2RlIHtcbn1cbkVsc2Uua2luZCA9IFwiZWxzZVwiO1xuY2xhc3MgSWYgZXh0ZW5kcyBCbG9ja05vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmRpdGlvbiwgbm9kZXMpIHtcbiAgICAgICAgc3VwZXIobm9kZXMpO1xuICAgICAgICB0aGlzLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBgaWYoJHt0aGlzLmNvbmRpdGlvbn0pYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICAgICAgaWYgKHRoaXMuZWxzZSlcbiAgICAgICAgICAgIGNvZGUgKz0gXCJlbHNlIFwiICsgdGhpcy5lbHNlLnJlbmRlcihvcHRzKTtcbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICAgIG9wdGltaXplTm9kZXMoKSB7XG4gICAgICAgIHN1cGVyLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgY29uc3QgY29uZCA9IHRoaXMuY29uZGl0aW9uO1xuICAgICAgICBpZiAoY29uZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzOyAvLyBlbHNlIGlzIGlnbm9yZWQgaGVyZVxuICAgICAgICBsZXQgZSA9IHRoaXMuZWxzZTtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5zID0gZS5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgICAgICBlID0gdGhpcy5lbHNlID0gQXJyYXkuaXNBcnJheShucykgPyBuZXcgRWxzZShucykgOiBucztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgaWYgKGNvbmQgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgSWYgPyBlIDogZS5ub2RlcztcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBuZXcgSWYobm90KGNvbmQpLCBlIGluc3RhbmNlb2YgSWYgPyBbZV0gOiBlLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZCA9PT0gZmFsc2UgfHwgIXRoaXMubm9kZXMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMuZWxzZSA9IChfYSA9IHRoaXMuZWxzZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIGlmICghKHN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykgfHwgdGhpcy5lbHNlKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5jb25kaXRpb24gPSBvcHRpbWl6ZUV4cHIodGhpcy5jb25kaXRpb24sIG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IHN1cGVyLm5hbWVzO1xuICAgICAgICBhZGRFeHByTmFtZXMobmFtZXMsIHRoaXMuY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuZWxzZSlcbiAgICAgICAgICAgIGFkZE5hbWVzKG5hbWVzLCB0aGlzLmVsc2UubmFtZXMpO1xuICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgfVxufVxuSWYua2luZCA9IFwiaWZcIjtcbmNsYXNzIEZvciBleHRlbmRzIEJsb2NrTm9kZSB7XG59XG5Gb3Iua2luZCA9IFwiZm9yXCI7XG5jbGFzcyBGb3JMb29wIGV4dGVuZHMgRm9yIHtcbiAgICBjb25zdHJ1Y3RvcihpdGVyYXRpb24pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pdGVyYXRpb24gPSBpdGVyYXRpb247XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBgZm9yKCR7dGhpcy5pdGVyYXRpb259KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAoIXN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXRlcmF0aW9uID0gb3B0aW1pemVFeHByKHRoaXMuaXRlcmF0aW9uLCBuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIGFkZE5hbWVzKHN1cGVyLm5hbWVzLCB0aGlzLml0ZXJhdGlvbi5uYW1lcyk7XG4gICAgfVxufVxuY2xhc3MgRm9yUmFuZ2UgZXh0ZW5kcyBGb3Ige1xuICAgIGNvbnN0cnVjdG9yKHZhcktpbmQsIG5hbWUsIGZyb20sIHRvKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudmFyS2luZCA9IHZhcktpbmQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgICAgIHRoaXMudG8gPSB0bztcbiAgICB9XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgY29uc3QgdmFyS2luZCA9IG9wdHMuZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiB0aGlzLnZhcktpbmQ7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgZnJvbSwgdG8gfSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBgZm9yKCR7dmFyS2luZH0gJHtuYW1lfT0ke2Zyb219OyAke25hbWV9PCR7dG99OyAke25hbWV9KyspYCArIHN1cGVyLnJlbmRlcihvcHRzKTtcbiAgICB9XG4gICAgZ2V0IG5hbWVzKCkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IGFkZEV4cHJOYW1lcyhzdXBlci5uYW1lcywgdGhpcy5mcm9tKTtcbiAgICAgICAgcmV0dXJuIGFkZEV4cHJOYW1lcyhuYW1lcywgdGhpcy50byk7XG4gICAgfVxufVxuY2xhc3MgRm9ySXRlciBleHRlbmRzIEZvciB7XG4gICAgY29uc3RydWN0b3IobG9vcCwgdmFyS2luZCwgbmFtZSwgaXRlcmFibGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcbiAgICAgICAgdGhpcy52YXJLaW5kID0gdmFyS2luZDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pdGVyYWJsZSA9IGl0ZXJhYmxlO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gYGZvcigke3RoaXMudmFyS2luZH0gJHt0aGlzLm5hbWV9ICR7dGhpcy5sb29wfSAke3RoaXMuaXRlcmFibGV9KWAgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICBpZiAoIXN1cGVyLm9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXRlcmFibGUgPSBvcHRpbWl6ZUV4cHIodGhpcy5pdGVyYWJsZSwgbmFtZXMsIGNvbnN0YW50cyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXQgbmFtZXMoKSB7XG4gICAgICAgIHJldHVybiBhZGROYW1lcyhzdXBlci5uYW1lcywgdGhpcy5pdGVyYWJsZS5uYW1lcyk7XG4gICAgfVxufVxuY2xhc3MgRnVuYyBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgYXJncywgYXN5bmMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncztcbiAgICAgICAgdGhpcy5hc3luYyA9IGFzeW5jO1xuICAgIH1cbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICBjb25zdCBfYXN5bmMgPSB0aGlzLmFzeW5jID8gXCJhc3luYyBcIiA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgJHtfYXN5bmN9ZnVuY3Rpb24gJHt0aGlzLm5hbWV9KCR7dGhpcy5hcmdzfSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cbkZ1bmMua2luZCA9IFwiZnVuY1wiO1xuY2xhc3MgUmV0dXJuIGV4dGVuZHMgUGFyZW50Tm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIFwicmV0dXJuIFwiICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cblJldHVybi5raW5kID0gXCJyZXR1cm5cIjtcbmNsYXNzIFRyeSBleHRlbmRzIEJsb2NrTm9kZSB7XG4gICAgcmVuZGVyKG9wdHMpIHtcbiAgICAgICAgbGV0IGNvZGUgPSBcInRyeVwiICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5jYXRjaClcbiAgICAgICAgICAgIGNvZGUgKz0gdGhpcy5jYXRjaC5yZW5kZXIob3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmZpbmFsbHkpXG4gICAgICAgICAgICBjb2RlICs9IHRoaXMuZmluYWxseS5yZW5kZXIob3B0cyk7XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgICBvcHRpbWl6ZU5vZGVzKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzdXBlci5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgIChfYSA9IHRoaXMuY2F0Y2gpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgIChfYiA9IHRoaXMuZmluYWxseSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm9wdGltaXplTm9kZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9wdGltaXplTmFtZXMobmFtZXMsIGNvbnN0YW50cykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzdXBlci5vcHRpbWl6ZU5hbWVzKG5hbWVzLCBjb25zdGFudHMpO1xuICAgICAgICAoX2EgPSB0aGlzLmNhdGNoKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgKF9iID0gdGhpcy5maW5hbGx5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iub3B0aW1pemVOYW1lcyhuYW1lcywgY29uc3RhbnRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldCBuYW1lcygpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBzdXBlci5uYW1lcztcbiAgICAgICAgaWYgKHRoaXMuY2F0Y2gpXG4gICAgICAgICAgICBhZGROYW1lcyhuYW1lcywgdGhpcy5jYXRjaC5uYW1lcyk7XG4gICAgICAgIGlmICh0aGlzLmZpbmFsbHkpXG4gICAgICAgICAgICBhZGROYW1lcyhuYW1lcywgdGhpcy5maW5hbGx5Lm5hbWVzKTtcbiAgICAgICAgcmV0dXJuIG5hbWVzO1xuICAgIH1cbn1cbmNsYXNzIENhdGNoIGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuICAgIHJlbmRlcihvcHRzKSB7XG4gICAgICAgIHJldHVybiBgY2F0Y2goJHt0aGlzLmVycm9yfSlgICsgc3VwZXIucmVuZGVyKG9wdHMpO1xuICAgIH1cbn1cbkNhdGNoLmtpbmQgPSBcImNhdGNoXCI7XG5jbGFzcyBGaW5hbGx5IGV4dGVuZHMgQmxvY2tOb2RlIHtcbiAgICByZW5kZXIob3B0cykge1xuICAgICAgICByZXR1cm4gXCJmaW5hbGx5XCIgKyBzdXBlci5yZW5kZXIob3B0cyk7XG4gICAgfVxufVxuRmluYWxseS5raW5kID0gXCJmaW5hbGx5XCI7XG5jbGFzcyBDb2RlR2VuIHtcbiAgICBjb25zdHJ1Y3RvcihleHRTY29wZSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuICAgICAgICB0aGlzLl9ibG9ja1N0YXJ0cyA9IFtdO1xuICAgICAgICB0aGlzLl9jb25zdGFudHMgPSB7fTtcbiAgICAgICAgdGhpcy5vcHRzID0geyAuLi5vcHRzLCBfbjogb3B0cy5saW5lcyA/IFwiXFxuXCIgOiBcIlwiIH07XG4gICAgICAgIHRoaXMuX2V4dFNjb3BlID0gZXh0U2NvcGU7XG4gICAgICAgIHRoaXMuX3Njb3BlID0gbmV3IHNjb3BlXzEuU2NvcGUoeyBwYXJlbnQ6IGV4dFNjb3BlIH0pO1xuICAgICAgICB0aGlzLl9ub2RlcyA9IFtuZXcgUm9vdCgpXTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290LnJlbmRlcih0aGlzLm9wdHMpO1xuICAgIH1cbiAgICAvLyByZXR1cm5zIHVuaXF1ZSBuYW1lIGluIHRoZSBpbnRlcm5hbCBzY29wZVxuICAgIG5hbWUocHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZS5uYW1lKHByZWZpeCk7XG4gICAgfVxuICAgIC8vIHJlc2VydmVzIHVuaXF1ZSBuYW1lIGluIHRoZSBleHRlcm5hbCBzY29wZVxuICAgIHNjb3BlTmFtZShwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLm5hbWUocHJlZml4KTtcbiAgICB9XG4gICAgLy8gcmVzZXJ2ZXMgdW5pcXVlIG5hbWUgaW4gdGhlIGV4dGVybmFsIHNjb3BlIGFuZCBhc3NpZ25zIHZhbHVlIHRvIGl0XG4gICAgc2NvcGVWYWx1ZShwcmVmaXhPck5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9leHRTY29wZS52YWx1ZShwcmVmaXhPck5hbWUsIHZhbHVlKTtcbiAgICAgICAgY29uc3QgdnMgPSB0aGlzLl92YWx1ZXNbbmFtZS5wcmVmaXhdIHx8ICh0aGlzLl92YWx1ZXNbbmFtZS5wcmVmaXhdID0gbmV3IFNldCgpKTtcbiAgICAgICAgdnMuYWRkKG5hbWUpO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG4gICAgZ2V0U2NvcGVWYWx1ZShwcmVmaXgsIGtleU9yUmVmKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHRTY29wZS5nZXRWYWx1ZShwcmVmaXgsIGtleU9yUmVmKTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGNvZGUgdGhhdCBhc3NpZ25zIHZhbHVlcyBpbiB0aGUgZXh0ZXJuYWwgc2NvcGUgdG8gdGhlIG5hbWVzIHRoYXQgYXJlIHVzZWQgaW50ZXJuYWxseVxuICAgIC8vIChzYW1lIG5hbWVzIHRoYXQgd2VyZSByZXR1cm5lZCBieSBnZW4uc2NvcGVOYW1lIG9yIGdlbi5zY29wZVZhbHVlKVxuICAgIHNjb3BlUmVmcyhzY29wZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLnNjb3BlUmVmcyhzY29wZU5hbWUsIHRoaXMuX3ZhbHVlcyk7XG4gICAgfVxuICAgIHNjb3BlQ29kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4dFNjb3BlLnNjb3BlQ29kZSh0aGlzLl92YWx1ZXMpO1xuICAgIH1cbiAgICBfZGVmKHZhcktpbmQsIG5hbWVPclByZWZpeCwgcmhzLCBjb25zdGFudCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIGlmIChyaHMgIT09IHVuZGVmaW5lZCAmJiBjb25zdGFudClcbiAgICAgICAgICAgIHRoaXMuX2NvbnN0YW50c1tuYW1lLnN0cl0gPSByaHM7XG4gICAgICAgIHRoaXMuX2xlYWZOb2RlKG5ldyBEZWYodmFyS2luZCwgbmFtZSwgcmhzKSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICAvLyBgY29uc3RgIGRlY2xhcmF0aW9uIChgdmFyYCBpbiBlczUgbW9kZSlcbiAgICBjb25zdChuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYoc2NvcGVfMS52YXJLaW5kcy5jb25zdCwgbmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCk7XG4gICAgfVxuICAgIC8vIGBsZXRgIGRlY2xhcmF0aW9uIHdpdGggb3B0aW9uYWwgYXNzaWdubWVudCAoYHZhcmAgaW4gZXM1IG1vZGUpXG4gICAgbGV0KG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZihzY29wZV8xLnZhcktpbmRzLmxldCwgbmFtZU9yUHJlZml4LCByaHMsIF9jb25zdGFudCk7XG4gICAgfVxuICAgIC8vIGB2YXJgIGRlY2xhcmF0aW9uIHdpdGggb3B0aW9uYWwgYXNzaWdubWVudFxuICAgIHZhcihuYW1lT3JQcmVmaXgsIHJocywgX2NvbnN0YW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWYoc2NvcGVfMS52YXJLaW5kcy52YXIsIG5hbWVPclByZWZpeCwgcmhzLCBfY29uc3RhbnQpO1xuICAgIH1cbiAgICAvLyBhc3NpZ25tZW50IGNvZGVcbiAgICBhc3NpZ24obGhzLCByaHMsIHNpZGVFZmZlY3RzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgQXNzaWduKGxocywgcmhzLCBzaWRlRWZmZWN0cykpO1xuICAgIH1cbiAgICAvLyBgKz1gIGNvZGVcbiAgICBhZGQobGhzLCByaHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBBc3NpZ25PcChsaHMsIGV4cG9ydHMub3BlcmF0b3JzLkFERCwgcmhzKSk7XG4gICAgfVxuICAgIC8vIGFwcGVuZHMgcGFzc2VkIFNhZmVFeHByIHRvIGNvZGUgb3IgZXhlY3V0ZXMgQmxvY2tcbiAgICBjb2RlKGMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjID09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIGMoKTtcbiAgICAgICAgZWxzZSBpZiAoYyAhPT0gY29kZV8xLm5pbClcbiAgICAgICAgICAgIHRoaXMuX2xlYWZOb2RlKG5ldyBBbnlDb2RlKGMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIHJldHVybnMgY29kZSBmb3Igb2JqZWN0IGxpdGVyYWwgZm9yIHRoZSBwYXNzZWQgYXJndW1lbnQgbGlzdCBvZiBrZXktdmFsdWUgcGFpcnNcbiAgICBvYmplY3QoLi4ua2V5VmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBbXCJ7XCJdO1xuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBrZXlWYWx1ZXMpIHtcbiAgICAgICAgICAgIGlmIChjb2RlLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgY29kZS5wdXNoKFwiLFwiKTtcbiAgICAgICAgICAgIGNvZGUucHVzaChrZXkpO1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gdmFsdWUgfHwgdGhpcy5vcHRzLmVzNSkge1xuICAgICAgICAgICAgICAgIGNvZGUucHVzaChcIjpcIik7XG4gICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5hZGRDb2RlQXJnKShjb2RlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29kZS5wdXNoKFwifVwiKTtcbiAgICAgICAgcmV0dXJuIG5ldyBjb2RlXzEuX0NvZGUoY29kZSk7XG4gICAgfVxuICAgIC8vIGBpZmAgY2xhdXNlIChvciBzdGF0ZW1lbnQgaWYgYHRoZW5Cb2R5YCBhbmQsIG9wdGlvbmFsbHksIGBlbHNlQm9keWAgYXJlIHBhc3NlZClcbiAgICBpZihjb25kaXRpb24sIHRoZW5Cb2R5LCBlbHNlQm9keSkge1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobmV3IElmKGNvbmRpdGlvbikpO1xuICAgICAgICBpZiAodGhlbkJvZHkgJiYgZWxzZUJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZSh0aGVuQm9keSkuZWxzZSgpLmNvZGUoZWxzZUJvZHkpLmVuZElmKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhlbkJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuY29kZSh0aGVuQm9keSkuZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbHNlQm9keSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcImVsc2VcIiBib2R5IHdpdGhvdXQgXCJ0aGVuXCIgYm9keScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBgZWxzZSBpZmAgY2xhdXNlIC0gaW52YWxpZCB3aXRob3V0IGBpZmAgb3IgYWZ0ZXIgYGVsc2VgIGNsYXVzZXNcbiAgICBlbHNlSWYoY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbHNlTm9kZShuZXcgSWYoY29uZGl0aW9uKSk7XG4gICAgfVxuICAgIC8vIGBlbHNlYCBjbGF1c2UgLSBvbmx5IHZhbGlkIGFmdGVyIGBpZmAgb3IgYGVsc2UgaWZgIGNsYXVzZXNcbiAgICBlbHNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxzZU5vZGUobmV3IEVsc2UoKSk7XG4gICAgfVxuICAgIC8vIGVuZCBgaWZgIHN0YXRlbWVudCAobmVlZGVkIGlmIGdlbi5pZiB3YXMgdXNlZCBvbmx5IHdpdGggY29uZGl0aW9uKVxuICAgIGVuZElmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKElmLCBFbHNlKTtcbiAgICB9XG4gICAgX2Zvcihub2RlLCBmb3JCb2R5KSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShub2RlKTtcbiAgICAgICAgaWYgKGZvckJvZHkpXG4gICAgICAgICAgICB0aGlzLmNvZGUoZm9yQm9keSkuZW5kRm9yKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBhIGdlbmVyaWMgYGZvcmAgY2xhdXNlIChvciBzdGF0ZW1lbnQgaWYgYGZvckJvZHlgIGlzIHBhc3NlZClcbiAgICBmb3IoaXRlcmF0aW9uLCBmb3JCb2R5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3IobmV3IEZvckxvb3AoaXRlcmF0aW9uKSwgZm9yQm9keSk7XG4gICAgfVxuICAgIC8vIGBmb3JgIHN0YXRlbWVudCBmb3IgYSByYW5nZSBvZiB2YWx1ZXNcbiAgICBmb3JSYW5nZShuYW1lT3JQcmVmaXgsIGZyb20sIHRvLCBmb3JCb2R5LCB2YXJLaW5kID0gdGhpcy5vcHRzLmVzNSA/IHNjb3BlXzEudmFyS2luZHMudmFyIDogc2NvcGVfMS52YXJLaW5kcy5sZXQpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX3Njb3BlLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JSYW5nZSh2YXJLaW5kLCBuYW1lLCBmcm9tLCB0byksICgpID0+IGZvckJvZHkobmFtZSkpO1xuICAgIH1cbiAgICAvLyBgZm9yLW9mYCBzdGF0ZW1lbnQgKGluIGVzNSBtb2RlIHJlcGxhY2Ugd2l0aCBhIG5vcm1hbCBmb3IgbG9vcClcbiAgICBmb3JPZihuYW1lT3JQcmVmaXgsIGl0ZXJhYmxlLCBmb3JCb2R5LCB2YXJLaW5kID0gc2NvcGVfMS52YXJLaW5kcy5jb25zdCkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fc2NvcGUudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZXM1KSB7XG4gICAgICAgICAgICBjb25zdCBhcnIgPSBpdGVyYWJsZSBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lID8gaXRlcmFibGUgOiB0aGlzLnZhcihcIl9hcnJcIiwgaXRlcmFibGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yUmFuZ2UoXCJfaVwiLCAwLCAoMCwgY29kZV8xLl8pIGAke2Fycn0ubGVuZ3RoYCwgKGkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhcihuYW1lLCAoMCwgY29kZV8xLl8pIGAke2Fycn1bJHtpfV1gKTtcbiAgICAgICAgICAgICAgICBmb3JCb2R5KG5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcihuZXcgRm9ySXRlcihcIm9mXCIsIHZhcktpbmQsIG5hbWUsIGl0ZXJhYmxlKSwgKCkgPT4gZm9yQm9keShuYW1lKSk7XG4gICAgfVxuICAgIC8vIGBmb3ItaW5gIHN0YXRlbWVudC5cbiAgICAvLyBXaXRoIG9wdGlvbiBgb3duUHJvcGVydGllc2AgcmVwbGFjZWQgd2l0aCBhIGBmb3Itb2ZgIGxvb3AgZm9yIG9iamVjdCBrZXlzXG4gICAgZm9ySW4obmFtZU9yUHJlZml4LCBvYmosIGZvckJvZHksIHZhcktpbmQgPSB0aGlzLm9wdHMuZXM1ID8gc2NvcGVfMS52YXJLaW5kcy52YXIgOiBzY29wZV8xLnZhcktpbmRzLmNvbnN0KSB7XG4gICAgICAgIGlmICh0aGlzLm9wdHMub3duUHJvcGVydGllcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yT2YobmFtZU9yUHJlZml4LCAoMCwgY29kZV8xLl8pIGBPYmplY3Qua2V5cygke29ian0pYCwgZm9yQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuX3Njb3BlLnRvTmFtZShuYW1lT3JQcmVmaXgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9yKG5ldyBGb3JJdGVyKFwiaW5cIiwgdmFyS2luZCwgbmFtZSwgb2JqKSwgKCkgPT4gZm9yQm9keShuYW1lKSk7XG4gICAgfVxuICAgIC8vIGVuZCBgZm9yYCBsb29wXG4gICAgZW5kRm9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKEZvcik7XG4gICAgfVxuICAgIC8vIGBsYWJlbGAgc3RhdGVtZW50XG4gICAgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlYWZOb2RlKG5ldyBMYWJlbChsYWJlbCkpO1xuICAgIH1cbiAgICAvLyBgYnJlYWtgIHN0YXRlbWVudFxuICAgIGJyZWFrKGxhYmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgQnJlYWsobGFiZWwpKTtcbiAgICB9XG4gICAgLy8gYHJldHVybmAgc3RhdGVtZW50XG4gICAgcmV0dXJuKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBuZXcgUmV0dXJuKCk7XG4gICAgICAgIHRoaXMuX2Jsb2NrTm9kZShub2RlKTtcbiAgICAgICAgdGhpcy5jb2RlKHZhbHVlKTtcbiAgICAgICAgaWYgKG5vZGUubm9kZXMubGVuZ3RoICE9PSAxKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcInJldHVyblwiIHNob3VsZCBoYXZlIG9uZSBub2RlJyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoUmV0dXJuKTtcbiAgICB9XG4gICAgLy8gYHRyeWAgc3RhdGVtZW50XG4gICAgdHJ5KHRyeUJvZHksIGNhdGNoQ29kZSwgZmluYWxseUNvZGUpIHtcbiAgICAgICAgaWYgKCFjYXRjaENvZGUgJiYgIWZpbmFsbHlDb2RlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb2RlR2VuOiBcInRyeVwiIHdpdGhvdXQgXCJjYXRjaFwiIGFuZCBcImZpbmFsbHlcIicpO1xuICAgICAgICBjb25zdCBub2RlID0gbmV3IFRyeSgpO1xuICAgICAgICB0aGlzLl9ibG9ja05vZGUobm9kZSk7XG4gICAgICAgIHRoaXMuY29kZSh0cnlCb2R5KTtcbiAgICAgICAgaWYgKGNhdGNoQ29kZSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLm5hbWUoXCJlXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3Vyck5vZGUgPSBub2RlLmNhdGNoID0gbmV3IENhdGNoKGVycm9yKTtcbiAgICAgICAgICAgIGNhdGNoQ29kZShlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsbHlDb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyTm9kZSA9IG5vZGUuZmluYWxseSA9IG5ldyBGaW5hbGx5KCk7XG4gICAgICAgICAgICB0aGlzLmNvZGUoZmluYWxseUNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmRCbG9ja05vZGUoQ2F0Y2gsIEZpbmFsbHkpO1xuICAgIH1cbiAgICAvLyBgdGhyb3dgIHN0YXRlbWVudFxuICAgIHRocm93KGVycm9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWFmTm9kZShuZXcgVGhyb3coZXJyb3IpKTtcbiAgICB9XG4gICAgLy8gc3RhcnQgc2VsZi1iYWxhbmNpbmcgYmxvY2tcbiAgICBibG9jayhib2R5LCBub2RlQ291bnQpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tTdGFydHMucHVzaCh0aGlzLl9ub2Rlcy5sZW5ndGgpO1xuICAgICAgICBpZiAoYm9keSlcbiAgICAgICAgICAgIHRoaXMuY29kZShib2R5KS5lbmRCbG9jayhub2RlQ291bnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gZW5kIHRoZSBjdXJyZW50IHNlbGYtYmFsYW5jaW5nIGJsb2NrXG4gICAgZW5kQmxvY2sobm9kZUNvdW50KSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHRoaXMuX2Jsb2NrU3RhcnRzLnBvcCgpO1xuICAgICAgICBpZiAobGVuID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb2RlR2VuOiBub3QgaW4gc2VsZi1iYWxhbmNpbmcgYmxvY2tcIik7XG4gICAgICAgIGNvbnN0IHRvQ2xvc2UgPSB0aGlzLl9ub2Rlcy5sZW5ndGggLSBsZW47XG4gICAgICAgIGlmICh0b0Nsb3NlIDwgMCB8fCAobm9kZUNvdW50ICE9PSB1bmRlZmluZWQgJiYgdG9DbG9zZSAhPT0gbm9kZUNvdW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiB3cm9uZyBudW1iZXIgb2Ygbm9kZXM6ICR7dG9DbG9zZX0gdnMgJHtub2RlQ291bnR9IGV4cGVjdGVkYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZXMubGVuZ3RoID0gbGVuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gYGZ1bmN0aW9uYCBoZWFkaW5nIChvciBkZWZpbml0aW9uIGlmIGZ1bmNCb2R5IGlzIHBhc3NlZClcbiAgICBmdW5jKG5hbWUsIGFyZ3MgPSBjb2RlXzEubmlsLCBhc3luYywgZnVuY0JvZHkpIHtcbiAgICAgICAgdGhpcy5fYmxvY2tOb2RlKG5ldyBGdW5jKG5hbWUsIGFyZ3MsIGFzeW5jKSk7XG4gICAgICAgIGlmIChmdW5jQm9keSlcbiAgICAgICAgICAgIHRoaXMuY29kZShmdW5jQm9keSkuZW5kRnVuYygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gZW5kIGZ1bmN0aW9uIGRlZmluaXRpb25cbiAgICBlbmRGdW5jKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5kQmxvY2tOb2RlKEZ1bmMpO1xuICAgIH1cbiAgICBvcHRpbWl6ZShuID0gMSkge1xuICAgICAgICB3aGlsZSAobi0tID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdC5vcHRpbWl6ZU5vZGVzKCk7XG4gICAgICAgICAgICB0aGlzLl9yb290Lm9wdGltaXplTmFtZXModGhpcy5fcm9vdC5uYW1lcywgdGhpcy5fY29uc3RhbnRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfbGVhZk5vZGUobm9kZSkge1xuICAgICAgICB0aGlzLl9jdXJyTm9kZS5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2Jsb2NrTm9kZShub2RlKSB7XG4gICAgICAgIHRoaXMuX2N1cnJOb2RlLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIHRoaXMuX25vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICAgIF9lbmRCbG9ja05vZGUoTjEsIE4yKSB7XG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLl9jdXJyTm9kZTtcbiAgICAgICAgaWYgKG4gaW5zdGFuY2VvZiBOMSB8fCAoTjIgJiYgbiBpbnN0YW5jZW9mIE4yKSkge1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMucG9wKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IG5vdCBpbiBibG9jayBcIiR7TjIgPyBgJHtOMS5raW5kfS8ke04yLmtpbmR9YCA6IE4xLmtpbmR9XCJgKTtcbiAgICB9XG4gICAgX2Vsc2VOb2RlKG5vZGUpIHtcbiAgICAgICAgY29uc3QgbiA9IHRoaXMuX2N1cnJOb2RlO1xuICAgICAgICBpZiAoIShuIGluc3RhbmNlb2YgSWYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvZGVHZW46IFwiZWxzZVwiIHdpdGhvdXQgXCJpZlwiJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3Vyck5vZGUgPSBuLmVsc2UgPSBub2RlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0IF9yb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZXNbMF07XG4gICAgfVxuICAgIGdldCBfY3Vyck5vZGUoKSB7XG4gICAgICAgIGNvbnN0IG5zID0gdGhpcy5fbm9kZXM7XG4gICAgICAgIHJldHVybiBuc1tucy5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgc2V0IF9jdXJyTm9kZShub2RlKSB7XG4gICAgICAgIGNvbnN0IG5zID0gdGhpcy5fbm9kZXM7XG4gICAgICAgIG5zW25zLmxlbmd0aCAtIDFdID0gbm9kZTtcbiAgICB9XG59XG5leHBvcnRzLkNvZGVHZW4gPSBDb2RlR2VuO1xuZnVuY3Rpb24gYWRkTmFtZXMobmFtZXMsIGZyb20pIHtcbiAgICBmb3IgKGNvbnN0IG4gaW4gZnJvbSlcbiAgICAgICAgbmFtZXNbbl0gPSAobmFtZXNbbl0gfHwgMCkgKyAoZnJvbVtuXSB8fCAwKTtcbiAgICByZXR1cm4gbmFtZXM7XG59XG5mdW5jdGlvbiBhZGRFeHByTmFtZXMobmFtZXMsIGZyb20pIHtcbiAgICByZXR1cm4gZnJvbSBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZU9yTmFtZSA/IGFkZE5hbWVzKG5hbWVzLCBmcm9tLm5hbWVzKSA6IG5hbWVzO1xufVxuZnVuY3Rpb24gb3B0aW1pemVFeHByKGV4cHIsIG5hbWVzLCBjb25zdGFudHMpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lKVxuICAgICAgICByZXR1cm4gcmVwbGFjZU5hbWUoZXhwcik7XG4gICAgaWYgKCFjYW5PcHRpbWl6ZShleHByKSlcbiAgICAgICAgcmV0dXJuIGV4cHI7XG4gICAgcmV0dXJuIG5ldyBjb2RlXzEuX0NvZGUoZXhwci5faXRlbXMucmVkdWNlKChpdGVtcywgYykgPT4ge1xuICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIGNvZGVfMS5OYW1lKVxuICAgICAgICAgICAgYyA9IHJlcGxhY2VOYW1lKGMpO1xuICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIGNvZGVfMS5fQ29kZSlcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goLi4uYy5faXRlbXMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGMpO1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSwgW10pKTtcbiAgICBmdW5jdGlvbiByZXBsYWNlTmFtZShuKSB7XG4gICAgICAgIGNvbnN0IGMgPSBjb25zdGFudHNbbi5zdHJdO1xuICAgICAgICBpZiAoYyA9PT0gdW5kZWZpbmVkIHx8IG5hbWVzW24uc3RyXSAhPT0gMSlcbiAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICBkZWxldGUgbmFtZXNbbi5zdHJdO1xuICAgICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuT3B0aW1pemUoZSkge1xuICAgICAgICByZXR1cm4gKGUgaW5zdGFuY2VvZiBjb2RlXzEuX0NvZGUgJiZcbiAgICAgICAgICAgIGUuX2l0ZW1zLnNvbWUoKGMpID0+IGMgaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSAmJiBuYW1lc1tjLnN0cl0gPT09IDEgJiYgY29uc3RhbnRzW2Muc3RyXSAhPT0gdW5kZWZpbmVkKSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc3VidHJhY3ROYW1lcyhuYW1lcywgZnJvbSkge1xuICAgIGZvciAoY29uc3QgbiBpbiBmcm9tKVxuICAgICAgICBuYW1lc1tuXSA9IChuYW1lc1tuXSB8fCAwKSAtIChmcm9tW25dIHx8IDApO1xufVxuZnVuY3Rpb24gbm90KHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIHggPT0gXCJudW1iZXJcIiB8fCB4ID09PSBudWxsID8gIXggOiAoMCwgY29kZV8xLl8pIGAhJHtwYXIoeCl9YDtcbn1cbmV4cG9ydHMubm90ID0gbm90O1xuY29uc3QgYW5kQ29kZSA9IG1hcHBlbmQoZXhwb3J0cy5vcGVyYXRvcnMuQU5EKTtcbi8vIGJvb2xlYW4gQU5EICgmJikgZXhwcmVzc2lvbiB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXG5mdW5jdGlvbiBhbmQoLi4uYXJncykge1xuICAgIHJldHVybiBhcmdzLnJlZHVjZShhbmRDb2RlKTtcbn1cbmV4cG9ydHMuYW5kID0gYW5kO1xuY29uc3Qgb3JDb2RlID0gbWFwcGVuZChleHBvcnRzLm9wZXJhdG9ycy5PUik7XG4vLyBib29sZWFuIE9SICh8fCkgZXhwcmVzc2lvbiB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXG5mdW5jdGlvbiBvciguLi5hcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MucmVkdWNlKG9yQ29kZSk7XG59XG5leHBvcnRzLm9yID0gb3I7XG5mdW5jdGlvbiBtYXBwZW5kKG9wKSB7XG4gICAgcmV0dXJuICh4LCB5KSA9PiAoeCA9PT0gY29kZV8xLm5pbCA/IHkgOiB5ID09PSBjb2RlXzEubmlsID8geCA6ICgwLCBjb2RlXzEuXykgYCR7cGFyKHgpfSAke29wfSAke3Bhcih5KX1gKTtcbn1cbmZ1bmN0aW9uIHBhcih4KSB7XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSA/IHggOiAoMCwgY29kZV8xLl8pIGAoJHt4fSlgO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZhbHVlU2NvcGUgPSBleHBvcnRzLlZhbHVlU2NvcGVOYW1lID0gZXhwb3J0cy5TY29wZSA9IGV4cG9ydHMudmFyS2luZHMgPSBleHBvcnRzLlVzZWRWYWx1ZVN0YXRlID0gdm9pZCAwO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4vY29kZVwiKTtcbmNsYXNzIFZhbHVlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICBzdXBlcihgQ29kZUdlbjogXCJjb2RlXCIgZm9yICR7bmFtZX0gbm90IGRlZmluZWRgKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5hbWUudmFsdWU7XG4gICAgfVxufVxudmFyIFVzZWRWYWx1ZVN0YXRlO1xuKGZ1bmN0aW9uIChVc2VkVmFsdWVTdGF0ZSkge1xuICAgIFVzZWRWYWx1ZVN0YXRlW1VzZWRWYWx1ZVN0YXRlW1wiU3RhcnRlZFwiXSA9IDBdID0gXCJTdGFydGVkXCI7XG4gICAgVXNlZFZhbHVlU3RhdGVbVXNlZFZhbHVlU3RhdGVbXCJDb21wbGV0ZWRcIl0gPSAxXSA9IFwiQ29tcGxldGVkXCI7XG59KShVc2VkVmFsdWVTdGF0ZSA9IGV4cG9ydHMuVXNlZFZhbHVlU3RhdGUgfHwgKGV4cG9ydHMuVXNlZFZhbHVlU3RhdGUgPSB7fSkpO1xuZXhwb3J0cy52YXJLaW5kcyA9IHtcbiAgICBjb25zdDogbmV3IGNvZGVfMS5OYW1lKFwiY29uc3RcIiksXG4gICAgbGV0OiBuZXcgY29kZV8xLk5hbWUoXCJsZXRcIiksXG4gICAgdmFyOiBuZXcgY29kZV8xLk5hbWUoXCJ2YXJcIiksXG59O1xuY2xhc3MgU2NvcGUge1xuICAgIGNvbnN0cnVjdG9yKHsgcHJlZml4ZXMsIHBhcmVudCB9ID0ge30pIHtcbiAgICAgICAgdGhpcy5fbmFtZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fcHJlZml4ZXMgPSBwcmVmaXhlcztcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgIH1cbiAgICB0b05hbWUobmFtZU9yUHJlZml4KSB7XG4gICAgICAgIHJldHVybiBuYW1lT3JQcmVmaXggaW5zdGFuY2VvZiBjb2RlXzEuTmFtZSA/IG5hbWVPclByZWZpeCA6IHRoaXMubmFtZShuYW1lT3JQcmVmaXgpO1xuICAgIH1cbiAgICBuYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gbmV3IGNvZGVfMS5OYW1lKHRoaXMuX25ld05hbWUocHJlZml4KSk7XG4gICAgfVxuICAgIF9uZXdOYW1lKHByZWZpeCkge1xuICAgICAgICBjb25zdCBuZyA9IHRoaXMuX25hbWVzW3ByZWZpeF0gfHwgdGhpcy5fbmFtZUdyb3VwKHByZWZpeCk7XG4gICAgICAgIHJldHVybiBgJHtwcmVmaXh9JHtuZy5pbmRleCsrfWA7XG4gICAgfVxuICAgIF9uYW1lR3JvdXAocHJlZml4KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICgoKF9iID0gKF9hID0gdGhpcy5fcGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuX3ByZWZpeGVzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGFzKHByZWZpeCkpIHx8ICh0aGlzLl9wcmVmaXhlcyAmJiAhdGhpcy5fcHJlZml4ZXMuaGFzKHByZWZpeCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IHByZWZpeCBcIiR7cHJlZml4fVwiIGlzIG5vdCBhbGxvd2VkIGluIHRoaXMgc2NvcGVgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX25hbWVzW3ByZWZpeF0gPSB7IHByZWZpeCwgaW5kZXg6IDAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5TY29wZSA9IFNjb3BlO1xuY2xhc3MgVmFsdWVTY29wZU5hbWUgZXh0ZW5kcyBjb2RlXzEuTmFtZSB7XG4gICAgY29uc3RydWN0b3IocHJlZml4LCBuYW1lU3RyKSB7XG4gICAgICAgIHN1cGVyKG5hbWVTdHIpO1xuICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUsIHsgcHJvcGVydHksIGl0ZW1JbmRleCB9KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zY29wZVBhdGggPSAoMCwgY29kZV8xLl8pIGAuJHtuZXcgY29kZV8xLk5hbWUocHJvcGVydHkpfVske2l0ZW1JbmRleH1dYDtcbiAgICB9XG59XG5leHBvcnRzLlZhbHVlU2NvcGVOYW1lID0gVmFsdWVTY29wZU5hbWU7XG5jb25zdCBsaW5lID0gKDAsIGNvZGVfMS5fKSBgXFxuYDtcbmNsYXNzIFZhbHVlU2NvcGUgZXh0ZW5kcyBTY29wZSB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuX3Njb3BlID0gb3B0cy5zY29wZTtcbiAgICAgICAgdGhpcy5vcHRzID0geyAuLi5vcHRzLCBfbjogb3B0cy5saW5lcyA/IGxpbmUgOiBjb2RlXzEubmlsIH07XG4gICAgfVxuICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3BlO1xuICAgIH1cbiAgICBuYW1lKHByZWZpeCkge1xuICAgICAgICByZXR1cm4gbmV3IFZhbHVlU2NvcGVOYW1lKHByZWZpeCwgdGhpcy5fbmV3TmFtZShwcmVmaXgpKTtcbiAgICB9XG4gICAgdmFsdWUobmFtZU9yUHJlZml4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2YWx1ZS5yZWYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvZGVHZW46IHJlZiBtdXN0IGJlIHBhc3NlZCBpbiB2YWx1ZVwiKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMudG9OYW1lKG5hbWVPclByZWZpeCk7XG4gICAgICAgIGNvbnN0IHsgcHJlZml4IH0gPSBuYW1lO1xuICAgICAgICBjb25zdCB2YWx1ZUtleSA9IChfYSA9IHZhbHVlLmtleSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsdWUucmVmO1xuICAgICAgICBsZXQgdnMgPSB0aGlzLl92YWx1ZXNbcHJlZml4XTtcbiAgICAgICAgaWYgKHZzKSB7XG4gICAgICAgICAgICBjb25zdCBfbmFtZSA9IHZzLmdldCh2YWx1ZUtleSk7XG4gICAgICAgICAgICBpZiAoX25hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdnMgPSB0aGlzLl92YWx1ZXNbcHJlZml4XSA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICB2cy5zZXQodmFsdWVLZXksIG5hbWUpO1xuICAgICAgICBjb25zdCBzID0gdGhpcy5fc2NvcGVbcHJlZml4XSB8fCAodGhpcy5fc2NvcGVbcHJlZml4XSA9IFtdKTtcbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gcy5sZW5ndGg7XG4gICAgICAgIHNbaXRlbUluZGV4XSA9IHZhbHVlLnJlZjtcbiAgICAgICAgbmFtZS5zZXRWYWx1ZSh2YWx1ZSwgeyBwcm9wZXJ0eTogcHJlZml4LCBpdGVtSW5kZXggfSk7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbiAgICBnZXRWYWx1ZShwcmVmaXgsIGtleU9yUmVmKSB7XG4gICAgICAgIGNvbnN0IHZzID0gdGhpcy5fdmFsdWVzW3ByZWZpeF07XG4gICAgICAgIGlmICghdnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiB2cy5nZXQoa2V5T3JSZWYpO1xuICAgIH1cbiAgICBzY29wZVJlZnMoc2NvcGVOYW1lLCB2YWx1ZXMgPSB0aGlzLl92YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZHVjZVZhbHVlcyh2YWx1ZXMsIChuYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAobmFtZS5zY29wZVBhdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvZGVHZW46IG5hbWUgXCIke25hbWV9XCIgaGFzIG5vIHZhbHVlYCk7XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvZGVfMS5fKSBgJHtzY29wZU5hbWV9JHtuYW1lLnNjb3BlUGF0aH1gO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2NvcGVDb2RlKHZhbHVlcyA9IHRoaXMuX3ZhbHVlcywgdXNlZFZhbHVlcywgZ2V0Q29kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVkdWNlVmFsdWVzKHZhbHVlcywgKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChuYW1lLnZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb2RlR2VuOiBuYW1lIFwiJHtuYW1lfVwiIGhhcyBubyB2YWx1ZWApO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUudmFsdWUuY29kZTtcbiAgICAgICAgfSwgdXNlZFZhbHVlcywgZ2V0Q29kZSk7XG4gICAgfVxuICAgIF9yZWR1Y2VWYWx1ZXModmFsdWVzLCB2YWx1ZUNvZGUsIHVzZWRWYWx1ZXMgPSB7fSwgZ2V0Q29kZSkge1xuICAgICAgICBsZXQgY29kZSA9IGNvZGVfMS5uaWw7XG4gICAgICAgIGZvciAoY29uc3QgcHJlZml4IGluIHZhbHVlcykge1xuICAgICAgICAgICAgY29uc3QgdnMgPSB2YWx1ZXNbcHJlZml4XTtcbiAgICAgICAgICAgIGlmICghdnMpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBuYW1lU2V0ID0gKHVzZWRWYWx1ZXNbcHJlZml4XSA9IHVzZWRWYWx1ZXNbcHJlZml4XSB8fCBuZXcgTWFwKCkpO1xuICAgICAgICAgICAgdnMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuYW1lU2V0LmhhcyhuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG5hbWVTZXQuc2V0KG5hbWUsIFVzZWRWYWx1ZVN0YXRlLlN0YXJ0ZWQpO1xuICAgICAgICAgICAgICAgIGxldCBjID0gdmFsdWVDb2RlKG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZiA9IHRoaXMub3B0cy5lczUgPyBleHBvcnRzLnZhcktpbmRzLnZhciA6IGV4cG9ydHMudmFyS2luZHMuY29uc3Q7XG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSAoMCwgY29kZV8xLl8pIGAke2NvZGV9JHtkZWZ9ICR7bmFtZX0gPSAke2N9OyR7dGhpcy5vcHRzLl9ufWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChjID0gZ2V0Q29kZSA9PT0gbnVsbCB8fCBnZXRDb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnZXRDb2RlKG5hbWUpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb2RlID0gKDAsIGNvZGVfMS5fKSBgJHtjb2RlfSR7Y30ke3RoaXMub3B0cy5fbn1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFZhbHVlRXJyb3IobmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5hbWVTZXQuc2V0KG5hbWUsIFVzZWRWYWx1ZVN0YXRlLkNvbXBsZXRlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5leHBvcnRzLlZhbHVlU2NvcGUgPSBWYWx1ZVNjb3BlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NvcGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4dGVuZEVycm9ycyA9IGV4cG9ydHMucmVzZXRFcnJvcnNDb3VudCA9IGV4cG9ydHMucmVwb3J0RXh0cmFFcnJvciA9IGV4cG9ydHMucmVwb3J0RXJyb3IgPSBleHBvcnRzLmtleXdvcmQkRGF0YUVycm9yID0gZXhwb3J0cy5rZXl3b3JkRXJyb3IgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IG5hbWVzXzEgPSByZXF1aXJlKFwiLi9uYW1lc1wiKTtcbmV4cG9ydHMua2V5d29yZEVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IGtleXdvcmQgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IHBhc3MgXCIke2tleXdvcmR9XCIga2V5d29yZCB2YWxpZGF0aW9uYCxcbn07XG5leHBvcnRzLmtleXdvcmQkRGF0YUVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IGtleXdvcmQsIHNjaGVtYVR5cGUgfSkgPT4gc2NoZW1hVHlwZVxuICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuc3RyKSBgXCIke2tleXdvcmR9XCIga2V5d29yZCBtdXN0IGJlICR7c2NoZW1hVHlwZX0gKCRkYXRhKWBcbiAgICAgICAgOiAoMCwgY29kZWdlbl8xLnN0cikgYFwiJHtrZXl3b3JkfVwiIGtleXdvcmQgaXMgaW52YWxpZCAoJGRhdGEpYCxcbn07XG5mdW5jdGlvbiByZXBvcnRFcnJvcihjeHQsIGVycm9yID0gZXhwb3J0cy5rZXl3b3JkRXJyb3IsIGVycm9yUGF0aHMsIG92ZXJyaWRlQWxsRXJyb3JzKSB7XG4gICAgY29uc3QgeyBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHsgZ2VuLCBjb21wb3NpdGVSdWxlLCBhbGxFcnJvcnMgfSA9IGl0O1xuICAgIGNvbnN0IGVyck9iaiA9IGVycm9yT2JqZWN0Q29kZShjeHQsIGVycm9yLCBlcnJvclBhdGhzKTtcbiAgICBpZiAob3ZlcnJpZGVBbGxFcnJvcnMgIT09IG51bGwgJiYgb3ZlcnJpZGVBbGxFcnJvcnMgIT09IHZvaWQgMCA/IG92ZXJyaWRlQWxsRXJyb3JzIDogKGNvbXBvc2l0ZVJ1bGUgfHwgYWxsRXJyb3JzKSkge1xuICAgICAgICBhZGRFcnJvcihnZW4sIGVyck9iaik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm5FcnJvcnMoaXQsICgwLCBjb2RlZ2VuXzEuXykgYFske2Vyck9ian1dYCk7XG4gICAgfVxufVxuZXhwb3J0cy5yZXBvcnRFcnJvciA9IHJlcG9ydEVycm9yO1xuZnVuY3Rpb24gcmVwb3J0RXh0cmFFcnJvcihjeHQsIGVycm9yID0gZXhwb3J0cy5rZXl3b3JkRXJyb3IsIGVycm9yUGF0aHMpIHtcbiAgICBjb25zdCB7IGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBnZW4sIGNvbXBvc2l0ZVJ1bGUsIGFsbEVycm9ycyB9ID0gaXQ7XG4gICAgY29uc3QgZXJyT2JqID0gZXJyb3JPYmplY3RDb2RlKGN4dCwgZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIGFkZEVycm9yKGdlbiwgZXJyT2JqKTtcbiAgICBpZiAoIShjb21wb3NpdGVSdWxlIHx8IGFsbEVycm9ycykpIHtcbiAgICAgICAgcmV0dXJuRXJyb3JzKGl0LCBuYW1lc18xLmRlZmF1bHQudkVycm9ycyk7XG4gICAgfVxufVxuZXhwb3J0cy5yZXBvcnRFeHRyYUVycm9yID0gcmVwb3J0RXh0cmFFcnJvcjtcbmZ1bmN0aW9uIHJlc2V0RXJyb3JzQ291bnQoZ2VuLCBlcnJzQ291bnQpIHtcbiAgICBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsIGVycnNDb3VudCk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZFcnJvcnN9ICE9PSBudWxsYCwgKCkgPT4gZ2VuLmlmKGVycnNDb3VudCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5sZW5ndGhgLCBlcnJzQ291bnQpLCAoKSA9PiBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCBudWxsKSkpO1xufVxuZXhwb3J0cy5yZXNldEVycm9yc0NvdW50ID0gcmVzZXRFcnJvcnNDb3VudDtcbmZ1bmN0aW9uIGV4dGVuZEVycm9ycyh7IGdlbiwga2V5d29yZCwgc2NoZW1hVmFsdWUsIGRhdGEsIGVycnNDb3VudCwgaXQsIH0pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoZXJyc0NvdW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICBjb25zdCBlcnIgPSBnZW4ubmFtZShcImVyclwiKTtcbiAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIGVycnNDb3VudCwgbmFtZXNfMS5kZWZhdWx0LmVycm9ycywgKGkpID0+IHtcbiAgICAgICAgZ2VuLmNvbnN0KGVyciwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc31bJHtpfV1gKTtcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5pbnN0YW5jZVBhdGggPT09IHVuZGVmaW5lZGAsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9Lmluc3RhbmNlUGF0aGAsICgwLCBjb2RlZ2VuXzEuc3RyQ29uY2F0KShuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCBpdC5lcnJvclBhdGgpKSk7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJ9LnNjaGVtYVBhdGhgLCAoMCwgY29kZWdlbl8xLnN0cikgYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWApO1xuICAgICAgICBpZiAoaXQub3B0cy52ZXJib3NlKSB7XG4gICAgICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5zY2hlbWFgLCBzY2hlbWFWYWx1ZSk7XG4gICAgICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXJyfS5kYXRhYCwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZXh0ZW5kRXJyb3JzID0gZXh0ZW5kRXJyb3JzO1xuZnVuY3Rpb24gYWRkRXJyb3IoZ2VuLCBlcnJPYmopIHtcbiAgICBjb25zdCBlcnIgPSBnZW4uY29uc3QoXCJlcnJcIiwgZXJyT2JqKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gPT09IG51bGxgLCAoKSA9PiBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGBbJHtlcnJ9XWApLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5wdXNoKCR7ZXJyfSlgKTtcbiAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9KytgKTtcbn1cbmZ1bmN0aW9uIHJldHVybkVycm9ycyhpdCwgZXJycykge1xuICAgIGNvbnN0IHsgZ2VuLCB2YWxpZGF0ZU5hbWUsIHNjaGVtYUVudiB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYUVudi4kYXN5bmMpIHtcbiAgICAgICAgZ2VuLnRocm93KCgwLCBjb2RlZ2VuXzEuXykgYG5ldyAke2l0LlZhbGlkYXRpb25FcnJvcn0oJHtlcnJzfSlgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHt2YWxpZGF0ZU5hbWV9LmVycm9yc2AsIGVycnMpO1xuICAgICAgICBnZW4ucmV0dXJuKGZhbHNlKTtcbiAgICB9XG59XG5jb25zdCBFID0ge1xuICAgIGtleXdvcmQ6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImtleXdvcmRcIiksXG4gICAgc2NoZW1hUGF0aDogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2NoZW1hUGF0aFwiKSxcbiAgICBwYXJhbXM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInBhcmFtc1wiKSxcbiAgICBwcm9wZXJ0eU5hbWU6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInByb3BlcnR5TmFtZVwiKSxcbiAgICBtZXNzYWdlOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJtZXNzYWdlXCIpLFxuICAgIHNjaGVtYTogbmV3IGNvZGVnZW5fMS5OYW1lKFwic2NoZW1hXCIpLFxuICAgIHBhcmVudFNjaGVtYTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyZW50U2NoZW1hXCIpLFxufTtcbmZ1bmN0aW9uIGVycm9yT2JqZWN0Q29kZShjeHQsIGVycm9yLCBlcnJvclBhdGhzKSB7XG4gICAgY29uc3QgeyBjcmVhdGVFcnJvcnMgfSA9IGN4dC5pdDtcbiAgICBpZiAoY3JlYXRlRXJyb3JzID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYHt9YDtcbiAgICByZXR1cm4gZXJyb3JPYmplY3QoY3h0LCBlcnJvciwgZXJyb3JQYXRocyk7XG59XG5mdW5jdGlvbiBlcnJvck9iamVjdChjeHQsIGVycm9yLCBlcnJvclBhdGhzID0ge30pIHtcbiAgICBjb25zdCB7IGdlbiwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCBrZXlWYWx1ZXMgPSBbXG4gICAgICAgIGVycm9ySW5zdGFuY2VQYXRoKGl0LCBlcnJvclBhdGhzKSxcbiAgICAgICAgZXJyb3JTY2hlbWFQYXRoKGN4dCwgZXJyb3JQYXRocyksXG4gICAgXTtcbiAgICBleHRyYUVycm9yUHJvcHMoY3h0LCBlcnJvciwga2V5VmFsdWVzKTtcbiAgICByZXR1cm4gZ2VuLm9iamVjdCguLi5rZXlWYWx1ZXMpO1xufVxuZnVuY3Rpb24gZXJyb3JJbnN0YW5jZVBhdGgoeyBlcnJvclBhdGggfSwgeyBpbnN0YW5jZVBhdGggfSkge1xuICAgIGNvbnN0IGluc3RQYXRoID0gaW5zdGFuY2VQYXRoXG4gICAgICAgID8gKDAsIGNvZGVnZW5fMS5zdHIpIGAke2Vycm9yUGF0aH0keygwLCB1dGlsXzEuZ2V0RXJyb3JQYXRoKShpbnN0YW5jZVBhdGgsIHV0aWxfMS5UeXBlLlN0cil9YFxuICAgICAgICA6IGVycm9yUGF0aDtcbiAgICByZXR1cm4gW25hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsICgwLCBjb2RlZ2VuXzEuc3RyQ29uY2F0KShuYW1lc18xLmRlZmF1bHQuaW5zdGFuY2VQYXRoLCBpbnN0UGF0aCldO1xufVxuZnVuY3Rpb24gZXJyb3JTY2hlbWFQYXRoKHsga2V5d29yZCwgaXQ6IHsgZXJyU2NoZW1hUGF0aCB9IH0sIHsgc2NoZW1hUGF0aCwgcGFyZW50U2NoZW1hIH0pIHtcbiAgICBsZXQgc2NoUGF0aCA9IHBhcmVudFNjaGVtYSA/IGVyclNjaGVtYVBhdGggOiAoMCwgY29kZWdlbl8xLnN0cikgYCR7ZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWA7XG4gICAgaWYgKHNjaGVtYVBhdGgpIHtcbiAgICAgICAgc2NoUGF0aCA9ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtzY2hQYXRofSR7KDAsIHV0aWxfMS5nZXRFcnJvclBhdGgpKHNjaGVtYVBhdGgsIHV0aWxfMS5UeXBlLlN0cil9YDtcbiAgICB9XG4gICAgcmV0dXJuIFtFLnNjaGVtYVBhdGgsIHNjaFBhdGhdO1xufVxuZnVuY3Rpb24gZXh0cmFFcnJvclByb3BzKGN4dCwgeyBwYXJhbXMsIG1lc3NhZ2UgfSwga2V5VmFsdWVzKSB7XG4gICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFWYWx1ZSwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCB7IG9wdHMsIHByb3BlcnR5TmFtZSwgdG9wU2NoZW1hUmVmLCBzY2hlbWFQYXRoIH0gPSBpdDtcbiAgICBrZXlWYWx1ZXMucHVzaChbRS5rZXl3b3JkLCBrZXl3b3JkXSwgW0UucGFyYW1zLCB0eXBlb2YgcGFyYW1zID09IFwiZnVuY3Rpb25cIiA/IHBhcmFtcyhjeHQpIDogcGFyYW1zIHx8ICgwLCBjb2RlZ2VuXzEuXykgYHt9YF0pO1xuICAgIGlmIChvcHRzLm1lc3NhZ2VzKSB7XG4gICAgICAgIGtleVZhbHVlcy5wdXNoKFtFLm1lc3NhZ2UsIHR5cGVvZiBtZXNzYWdlID09IFwiZnVuY3Rpb25cIiA/IG1lc3NhZ2UoY3h0KSA6IG1lc3NhZ2VdKTtcbiAgICB9XG4gICAgaWYgKG9wdHMudmVyYm9zZSkge1xuICAgICAgICBrZXlWYWx1ZXMucHVzaChbRS5zY2hlbWEsIHNjaGVtYVZhbHVlXSwgW0UucGFyZW50U2NoZW1hLCAoMCwgY29kZWdlbl8xLl8pIGAke3RvcFNjaGVtYVJlZn0ke3NjaGVtYVBhdGh9YF0sIFtuYW1lc18xLmRlZmF1bHQuZGF0YSwgZGF0YV0pO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHlOYW1lKVxuICAgICAgICBrZXlWYWx1ZXMucHVzaChbRS5wcm9wZXJ0eU5hbWUsIHByb3BlcnR5TmFtZV0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXNvbHZlU2NoZW1hID0gZXhwb3J0cy5nZXRDb21waWxpbmdTY2hlbWEgPSBleHBvcnRzLnJlc29sdmVSZWYgPSBleHBvcnRzLmNvbXBpbGVTY2hlbWEgPSBleHBvcnRzLlNjaGVtYUVudiA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi4vcnVudGltZS92YWxpZGF0aW9uX2Vycm9yXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuL25hbWVzXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4vcmVzb2x2ZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGVcIik7XG5jb25zdCBVUkkgPSByZXF1aXJlKFwidXJpLWpzXCIpO1xuY2xhc3MgU2NoZW1hRW52IHtcbiAgICBjb25zdHJ1Y3RvcihlbnYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5keW5hbWljQW5jaG9ycyA9IHt9O1xuICAgICAgICBsZXQgc2NoZW1hO1xuICAgICAgICBpZiAodHlwZW9mIGVudi5zY2hlbWEgPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHNjaGVtYSA9IGVudi5zY2hlbWE7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gZW52LnNjaGVtYTtcbiAgICAgICAgdGhpcy5zY2hlbWFJZCA9IGVudi5zY2hlbWFJZDtcbiAgICAgICAgdGhpcy5yb290ID0gZW52LnJvb3QgfHwgdGhpcztcbiAgICAgICAgdGhpcy5iYXNlSWQgPSAoX2EgPSBlbnYuYmFzZUlkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShzY2hlbWEgPT09IG51bGwgfHwgc2NoZW1hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hlbWFbZW52LnNjaGVtYUlkIHx8IFwiJGlkXCJdKTtcbiAgICAgICAgdGhpcy5zY2hlbWFQYXRoID0gZW52LnNjaGVtYVBhdGg7XG4gICAgICAgIHRoaXMubG9jYWxSZWZzID0gZW52LmxvY2FsUmVmcztcbiAgICAgICAgdGhpcy5tZXRhID0gZW52Lm1ldGE7XG4gICAgICAgIHRoaXMuJGFzeW5jID0gc2NoZW1hID09PSBudWxsIHx8IHNjaGVtYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoZW1hLiRhc3luYztcbiAgICAgICAgdGhpcy5yZWZzID0ge307XG4gICAgfVxufVxuZXhwb3J0cy5TY2hlbWFFbnYgPSBTY2hlbWFFbnY7XG4vLyBsZXQgY29kZVNpemUgPSAwXG4vLyBsZXQgbm9kZUNvdW50ID0gMFxuLy8gQ29tcGlsZXMgc2NoZW1hIGluIFNjaGVtYUVudlxuZnVuY3Rpb24gY29tcGlsZVNjaGVtYShzY2gpIHtcbiAgICAvLyBUT0RPIHJlZmFjdG9yIC0gcmVtb3ZlIGNvbXBpbGF0aW9uc1xuICAgIGNvbnN0IF9zY2ggPSBnZXRDb21waWxpbmdTY2hlbWEuY2FsbCh0aGlzLCBzY2gpO1xuICAgIGlmIChfc2NoKVxuICAgICAgICByZXR1cm4gX3NjaDtcbiAgICBjb25zdCByb290SWQgPSAoMCwgcmVzb2x2ZV8xLmdldEZ1bGxQYXRoKShzY2gucm9vdC5iYXNlSWQpOyAvLyBUT0RPIGlmIGdldEZ1bGxQYXRoIHJlbW92ZWQgMSB0ZXN0cyBmYWlsc1xuICAgIGNvbnN0IHsgZXM1LCBsaW5lcyB9ID0gdGhpcy5vcHRzLmNvZGU7XG4gICAgY29uc3QgeyBvd25Qcm9wZXJ0aWVzIH0gPSB0aGlzLm9wdHM7XG4gICAgY29uc3QgZ2VuID0gbmV3IGNvZGVnZW5fMS5Db2RlR2VuKHRoaXMuc2NvcGUsIHsgZXM1LCBsaW5lcywgb3duUHJvcGVydGllcyB9KTtcbiAgICBsZXQgX1ZhbGlkYXRpb25FcnJvcjtcbiAgICBpZiAoc2NoLiRhc3luYykge1xuICAgICAgICBfVmFsaWRhdGlvbkVycm9yID0gZ2VuLnNjb3BlVmFsdWUoXCJFcnJvclwiLCB7XG4gICAgICAgICAgICByZWY6IHZhbGlkYXRpb25fZXJyb3JfMS5kZWZhdWx0LFxuICAgICAgICAgICAgY29kZTogKDAsIGNvZGVnZW5fMS5fKSBgcmVxdWlyZShcImFqdi9kaXN0L3J1bnRpbWUvdmFsaWRhdGlvbl9lcnJvclwiKS5kZWZhdWx0YCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkYXRlTmFtZSA9IGdlbi5zY29wZU5hbWUoXCJ2YWxpZGF0ZVwiKTtcbiAgICBzY2gudmFsaWRhdGVOYW1lID0gdmFsaWRhdGVOYW1lO1xuICAgIGNvbnN0IHNjaGVtYUN4dCA9IHtcbiAgICAgICAgZ2VuLFxuICAgICAgICBhbGxFcnJvcnM6IHRoaXMub3B0cy5hbGxFcnJvcnMsXG4gICAgICAgIGRhdGE6IG5hbWVzXzEuZGVmYXVsdC5kYXRhLFxuICAgICAgICBwYXJlbnREYXRhOiBuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YSxcbiAgICAgICAgcGFyZW50RGF0YVByb3BlcnR5OiBuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LFxuICAgICAgICBkYXRhTmFtZXM6IFtuYW1lc18xLmRlZmF1bHQuZGF0YV0sXG4gICAgICAgIGRhdGFQYXRoQXJyOiBbY29kZWdlbl8xLm5pbF0sXG4gICAgICAgIGRhdGFMZXZlbDogMCxcbiAgICAgICAgZGF0YVR5cGVzOiBbXSxcbiAgICAgICAgZGVmaW5lZFByb3BlcnRpZXM6IG5ldyBTZXQoKSxcbiAgICAgICAgdG9wU2NoZW1hUmVmOiBnZW4uc2NvcGVWYWx1ZShcInNjaGVtYVwiLCB0aGlzLm9wdHMuY29kZS5zb3VyY2UgPT09IHRydWVcbiAgICAgICAgICAgID8geyByZWY6IHNjaC5zY2hlbWEsIGNvZGU6ICgwLCBjb2RlZ2VuXzEuc3RyaW5naWZ5KShzY2guc2NoZW1hKSB9XG4gICAgICAgICAgICA6IHsgcmVmOiBzY2guc2NoZW1hIH0pLFxuICAgICAgICB2YWxpZGF0ZU5hbWUsXG4gICAgICAgIFZhbGlkYXRpb25FcnJvcjogX1ZhbGlkYXRpb25FcnJvcixcbiAgICAgICAgc2NoZW1hOiBzY2guc2NoZW1hLFxuICAgICAgICBzY2hlbWFFbnY6IHNjaCxcbiAgICAgICAgcm9vdElkLFxuICAgICAgICBiYXNlSWQ6IHNjaC5iYXNlSWQgfHwgcm9vdElkLFxuICAgICAgICBzY2hlbWFQYXRoOiBjb2RlZ2VuXzEubmlsLFxuICAgICAgICBlcnJTY2hlbWFQYXRoOiBzY2guc2NoZW1hUGF0aCB8fCAodGhpcy5vcHRzLmp0ZCA/IFwiXCIgOiBcIiNcIiksXG4gICAgICAgIGVycm9yUGF0aDogKDAsIGNvZGVnZW5fMS5fKSBgXCJcImAsXG4gICAgICAgIG9wdHM6IHRoaXMub3B0cyxcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICB9O1xuICAgIGxldCBzb3VyY2VDb2RlO1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX2NvbXBpbGF0aW9ucy5hZGQoc2NoKTtcbiAgICAgICAgKDAsIHZhbGlkYXRlXzEudmFsaWRhdGVGdW5jdGlvbkNvZGUpKHNjaGVtYUN4dCk7XG4gICAgICAgIGdlbi5vcHRpbWl6ZSh0aGlzLm9wdHMuY29kZS5vcHRpbWl6ZSk7XG4gICAgICAgIC8vIGdlbi5vcHRpbWl6ZSgxKVxuICAgICAgICBjb25zdCB2YWxpZGF0ZUNvZGUgPSBnZW4udG9TdHJpbmcoKTtcbiAgICAgICAgc291cmNlQ29kZSA9IGAke2dlbi5zY29wZVJlZnMobmFtZXNfMS5kZWZhdWx0LnNjb3BlKX1yZXR1cm4gJHt2YWxpZGF0ZUNvZGV9YDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coKGNvZGVTaXplICs9IHNvdXJjZUNvZGUubGVuZ3RoKSwgKG5vZGVDb3VudCArPSBnZW4ubm9kZUNvdW50KSlcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2RlLnByb2Nlc3MpXG4gICAgICAgICAgICBzb3VyY2VDb2RlID0gdGhpcy5vcHRzLmNvZGUucHJvY2Vzcyhzb3VyY2VDb2RlLCBzY2gpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlxcblxcblxcbiAqKiogXFxuXCIsIHNvdXJjZUNvZGUpXG4gICAgICAgIGNvbnN0IG1ha2VWYWxpZGF0ZSA9IG5ldyBGdW5jdGlvbihgJHtuYW1lc18xLmRlZmF1bHQuc2VsZn1gLCBgJHtuYW1lc18xLmRlZmF1bHQuc2NvcGV9YCwgc291cmNlQ29kZSk7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlID0gbWFrZVZhbGlkYXRlKHRoaXMsIHRoaXMuc2NvcGUuZ2V0KCkpO1xuICAgICAgICB0aGlzLnNjb3BlLnZhbHVlKHZhbGlkYXRlTmFtZSwgeyByZWY6IHZhbGlkYXRlIH0pO1xuICAgICAgICB2YWxpZGF0ZS5lcnJvcnMgPSBudWxsO1xuICAgICAgICB2YWxpZGF0ZS5zY2hlbWEgPSBzY2guc2NoZW1hO1xuICAgICAgICB2YWxpZGF0ZS5zY2hlbWFFbnYgPSBzY2g7XG4gICAgICAgIGlmIChzY2guJGFzeW5jKVxuICAgICAgICAgICAgdmFsaWRhdGUuJGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5jb2RlLnNvdXJjZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFsaWRhdGUuc291cmNlID0geyB2YWxpZGF0ZU5hbWUsIHZhbGlkYXRlQ29kZSwgc2NvcGVWYWx1ZXM6IGdlbi5fdmFsdWVzIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0cy51bmV2YWx1YXRlZCkge1xuICAgICAgICAgICAgY29uc3QgeyBwcm9wcywgaXRlbXMgfSA9IHNjaGVtYUN4dDtcbiAgICAgICAgICAgIHZhbGlkYXRlLmV2YWx1YXRlZCA9IHtcbiAgICAgICAgICAgICAgICBwcm9wczogcHJvcHMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSA/IHVuZGVmaW5lZCA6IHByb3BzLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBpdGVtcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gdW5kZWZpbmVkIDogaXRlbXMsXG4gICAgICAgICAgICAgICAgZHluYW1pY1Byb3BzOiBwcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lLFxuICAgICAgICAgICAgICAgIGR5bmFtaWNJdGVtczogaXRlbXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodmFsaWRhdGUuc291cmNlKVxuICAgICAgICAgICAgICAgIHZhbGlkYXRlLnNvdXJjZS5ldmFsdWF0ZWQgPSAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkodmFsaWRhdGUuZXZhbHVhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICBzY2gudmFsaWRhdGUgPSB2YWxpZGF0ZTtcbiAgICAgICAgcmV0dXJuIHNjaDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZGVsZXRlIHNjaC52YWxpZGF0ZTtcbiAgICAgICAgZGVsZXRlIHNjaC52YWxpZGF0ZU5hbWU7XG4gICAgICAgIGlmIChzb3VyY2VDb2RlKVxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJFcnJvciBjb21waWxpbmcgc2NoZW1hLCBmdW5jdGlvbiBjb2RlOlwiLCBzb3VyY2VDb2RlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJcXG5cXG5cXG4gKioqIFxcblwiLCBzb3VyY2VDb2RlLCB0aGlzLm9wdHMpXG4gICAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0aGlzLl9jb21waWxhdGlvbnMuZGVsZXRlKHNjaCk7XG4gICAgfVxufVxuZXhwb3J0cy5jb21waWxlU2NoZW1hID0gY29tcGlsZVNjaGVtYTtcbmZ1bmN0aW9uIHJlc29sdmVSZWYocm9vdCwgYmFzZUlkLCByZWYpIHtcbiAgICB2YXIgX2E7XG4gICAgcmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKShiYXNlSWQsIHJlZik7XG4gICAgY29uc3Qgc2NoT3JGdW5jID0gcm9vdC5yZWZzW3JlZl07XG4gICAgaWYgKHNjaE9yRnVuYylcbiAgICAgICAgcmV0dXJuIHNjaE9yRnVuYztcbiAgICBsZXQgX3NjaCA9IHJlc29sdmUuY2FsbCh0aGlzLCByb290LCByZWYpO1xuICAgIGlmIChfc2NoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gKF9hID0gcm9vdC5sb2NhbFJlZnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtyZWZdOyAvLyBUT0RPIG1heWJlIGxvY2FsUmVmcyBzaG91bGQgaG9sZCBTY2hlbWFFbnZcbiAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBpZiAoc2NoZW1hKVxuICAgICAgICAgICAgX3NjaCA9IG5ldyBTY2hlbWFFbnYoeyBzY2hlbWEsIHNjaGVtYUlkLCByb290LCBiYXNlSWQgfSk7XG4gICAgfVxuICAgIGlmIChfc2NoID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybjtcbiAgICByZXR1cm4gKHJvb3QucmVmc1tyZWZdID0gaW5saW5lT3JDb21waWxlLmNhbGwodGhpcywgX3NjaCkpO1xufVxuZXhwb3J0cy5yZXNvbHZlUmVmID0gcmVzb2x2ZVJlZjtcbmZ1bmN0aW9uIGlubGluZU9yQ29tcGlsZShzY2gpIHtcbiAgICBpZiAoKDAsIHJlc29sdmVfMS5pbmxpbmVSZWYpKHNjaC5zY2hlbWEsIHRoaXMub3B0cy5pbmxpbmVSZWZzKSlcbiAgICAgICAgcmV0dXJuIHNjaC5zY2hlbWE7XG4gICAgcmV0dXJuIHNjaC52YWxpZGF0ZSA/IHNjaCA6IGNvbXBpbGVTY2hlbWEuY2FsbCh0aGlzLCBzY2gpO1xufVxuLy8gSW5kZXggb2Ygc2NoZW1hIGNvbXBpbGF0aW9uIGluIHRoZSBjdXJyZW50bHkgY29tcGlsZWQgbGlzdFxuZnVuY3Rpb24gZ2V0Q29tcGlsaW5nU2NoZW1hKHNjaEVudikge1xuICAgIGZvciAoY29uc3Qgc2NoIG9mIHRoaXMuX2NvbXBpbGF0aW9ucykge1xuICAgICAgICBpZiAoc2FtZVNjaGVtYUVudihzY2gsIHNjaEVudikpXG4gICAgICAgICAgICByZXR1cm4gc2NoO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q29tcGlsaW5nU2NoZW1hID0gZ2V0Q29tcGlsaW5nU2NoZW1hO1xuZnVuY3Rpb24gc2FtZVNjaGVtYUVudihzMSwgczIpIHtcbiAgICByZXR1cm4gczEuc2NoZW1hID09PSBzMi5zY2hlbWEgJiYgczEucm9vdCA9PT0gczIucm9vdCAmJiBzMS5iYXNlSWQgPT09IHMyLmJhc2VJZDtcbn1cbi8vIHJlc29sdmUgYW5kIGNvbXBpbGUgdGhlIHJlZmVyZW5jZXMgKCRyZWYpXG4vLyBUT0RPIHJldHVybnMgQW55U2NoZW1hT2JqZWN0IChpZiB0aGUgc2NoZW1hIGNhbiBiZSBpbmxpbmVkKSBvciB2YWxpZGF0aW9uIGZ1bmN0aW9uXG5mdW5jdGlvbiByZXNvbHZlKHJvb3QsIC8vIGluZm9ybWF0aW9uIGFib3V0IHRoZSByb290IHNjaGVtYSBmb3IgdGhlIGN1cnJlbnQgc2NoZW1hXG5yZWYgLy8gcmVmZXJlbmNlIHRvIHJlc29sdmVcbikge1xuICAgIGxldCBzY2g7XG4gICAgd2hpbGUgKHR5cGVvZiAoc2NoID0gdGhpcy5yZWZzW3JlZl0pID09IFwic3RyaW5nXCIpXG4gICAgICAgIHJlZiA9IHNjaDtcbiAgICByZXR1cm4gc2NoIHx8IHRoaXMuc2NoZW1hc1tyZWZdIHx8IHJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCByZWYpO1xufVxuLy8gUmVzb2x2ZSBzY2hlbWEsIGl0cyByb290IGFuZCBiYXNlSWRcbmZ1bmN0aW9uIHJlc29sdmVTY2hlbWEocm9vdCwgLy8gcm9vdCBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHNjaGVtYSwgcmVmcyBUT0RPIGJlbG93IFNjaGVtYUVudiBpcyBhc3NpZ25lZCB0byBpdFxucmVmIC8vIHJlZmVyZW5jZSB0byByZXNvbHZlXG4pIHtcbiAgICBjb25zdCBwID0gVVJJLnBhcnNlKHJlZik7XG4gICAgY29uc3QgcmVmUGF0aCA9ICgwLCByZXNvbHZlXzEuX2dldEZ1bGxQYXRoKShwKTtcbiAgICBsZXQgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5nZXRGdWxsUGF0aCkocm9vdC5iYXNlSWQpO1xuICAgIC8vIFRPRE8gYE9iamVjdC5rZXlzKHJvb3Quc2NoZW1hKS5sZW5ndGggPiAwYCBzaG91bGQgbm90IGJlIG5lZWRlZCAtIGJ1dCByZW1vdmluZyBicmVha3MgMiB0ZXN0c1xuICAgIGlmIChPYmplY3Qua2V5cyhyb290LnNjaGVtYSkubGVuZ3RoID4gMCAmJiByZWZQYXRoID09PSBiYXNlSWQpIHtcbiAgICAgICAgcmV0dXJuIGdldEpzb25Qb2ludGVyLmNhbGwodGhpcywgcCwgcm9vdCk7XG4gICAgfVxuICAgIGNvbnN0IGlkID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkocmVmUGF0aCk7XG4gICAgY29uc3Qgc2NoT3JSZWYgPSB0aGlzLnJlZnNbaWRdIHx8IHRoaXMuc2NoZW1hc1tpZF07XG4gICAgaWYgKHR5cGVvZiBzY2hPclJlZiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IHNjaCA9IHJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCBzY2hPclJlZik7XG4gICAgICAgIGlmICh0eXBlb2YgKHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC5zY2hlbWEpICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByZXR1cm4gZ2V0SnNvblBvaW50ZXIuY2FsbCh0aGlzLCBwLCBzY2gpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIChzY2hPclJlZiA9PT0gbnVsbCB8fCBzY2hPclJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoT3JSZWYuc2NoZW1hKSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICghc2NoT3JSZWYudmFsaWRhdGUpXG4gICAgICAgIGNvbXBpbGVTY2hlbWEuY2FsbCh0aGlzLCBzY2hPclJlZik7XG4gICAgaWYgKGlkID09PSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShyZWYpKSB7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hIH0gPSBzY2hPclJlZjtcbiAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBjb25zdCBzY2hJZCA9IHNjaGVtYVtzY2hlbWFJZF07XG4gICAgICAgIGlmIChzY2hJZClcbiAgICAgICAgICAgIGJhc2VJZCA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkoYmFzZUlkLCBzY2hJZCk7XG4gICAgICAgIHJldHVybiBuZXcgU2NoZW1hRW52KHsgc2NoZW1hLCBzY2hlbWFJZCwgcm9vdCwgYmFzZUlkIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0SnNvblBvaW50ZXIuY2FsbCh0aGlzLCBwLCBzY2hPclJlZik7XG59XG5leHBvcnRzLnJlc29sdmVTY2hlbWEgPSByZXNvbHZlU2NoZW1hO1xuY29uc3QgUFJFVkVOVF9TQ09QRV9DSEFOR0UgPSBuZXcgU2V0KFtcbiAgICBcInByb3BlcnRpZXNcIixcbiAgICBcInBhdHRlcm5Qcm9wZXJ0aWVzXCIsXG4gICAgXCJlbnVtXCIsXG4gICAgXCJkZXBlbmRlbmNpZXNcIixcbiAgICBcImRlZmluaXRpb25zXCIsXG5dKTtcbmZ1bmN0aW9uIGdldEpzb25Qb2ludGVyKHBhcnNlZFJlZiwgeyBiYXNlSWQsIHNjaGVtYSwgcm9vdCB9KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICgoKF9hID0gcGFyc2VkUmVmLmZyYWdtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbMF0pICE9PSBcIi9cIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGZvciAoY29uc3QgcGFydCBvZiBwYXJzZWRSZWYuZnJhZ21lbnQuc2xpY2UoMSkuc3BsaXQoXCIvXCIpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09PSBcImJvb2xlYW5cIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgcGFydFNjaGVtYSA9IHNjaGVtYVsoMCwgdXRpbF8xLnVuZXNjYXBlRnJhZ21lbnQpKHBhcnQpXTtcbiAgICAgICAgaWYgKHBhcnRTY2hlbWEgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2NoZW1hID0gcGFydFNjaGVtYTtcbiAgICAgICAgLy8gVE9ETyBQUkVWRU5UX1NDT1BFX0NIQU5HRSBjb3VsZCBiZSBkZWZpbmVkIGluIGtleXdvcmQgZGVmP1xuICAgICAgICBjb25zdCBzY2hJZCA9IHR5cGVvZiBzY2hlbWEgPT09IFwib2JqZWN0XCIgJiYgc2NoZW1hW3RoaXMub3B0cy5zY2hlbWFJZF07XG4gICAgICAgIGlmICghUFJFVkVOVF9TQ09QRV9DSEFOR0UuaGFzKHBhcnQpICYmIHNjaElkKSB7XG4gICAgICAgICAgICBiYXNlSWQgPSAoMCwgcmVzb2x2ZV8xLnJlc29sdmVVcmwpKGJhc2VJZCwgc2NoSWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBlbnY7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgIT0gXCJib29sZWFuXCIgJiYgc2NoZW1hLiRyZWYgJiYgISgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgdGhpcy5SVUxFUykpIHtcbiAgICAgICAgY29uc3QgJHJlZiA9ICgwLCByZXNvbHZlXzEucmVzb2x2ZVVybCkoYmFzZUlkLCBzY2hlbWEuJHJlZik7XG4gICAgICAgIGVudiA9IHJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCAkcmVmKTtcbiAgICB9XG4gICAgLy8gZXZlbiB0aG91Z2ggcmVzb2x1dGlvbiBmYWlsZWQgd2UgbmVlZCB0byByZXR1cm4gU2NoZW1hRW52IHRvIHRocm93IGV4Y2VwdGlvblxuICAgIC8vIHNvIHRoYXQgY29tcGlsZUFzeW5jIGxvYWRzIG1pc3Npbmcgc2NoZW1hLlxuICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICBlbnYgPSBlbnYgfHwgbmV3IFNjaGVtYUVudih7IHNjaGVtYSwgc2NoZW1hSWQsIHJvb3QsIGJhc2VJZCB9KTtcbiAgICBpZiAoZW52LnNjaGVtYSAhPT0gZW52LnJvb3Quc2NoZW1hKVxuICAgICAgICByZXR1cm4gZW52O1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lcyA9IHtcbiAgICAvLyB2YWxpZGF0aW9uIGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgIGRhdGE6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImRhdGFcIiksXG4gICAgLy8gYXJncyBwYXNzZWQgZnJvbSByZWZlcmVuY2luZyBzY2hlbWFcbiAgICB2YWxDeHQ6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInZhbEN4dFwiKSxcbiAgICBpbnN0YW5jZVBhdGg6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImluc3RhbmNlUGF0aFwiKSxcbiAgICBwYXJlbnREYXRhOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJwYXJlbnREYXRhXCIpLFxuICAgIHBhcmVudERhdGFQcm9wZXJ0eTogbmV3IGNvZGVnZW5fMS5OYW1lKFwicGFyZW50RGF0YVByb3BlcnR5XCIpLFxuICAgIHJvb3REYXRhOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJyb290RGF0YVwiKSxcbiAgICBkeW5hbWljQW5jaG9yczogbmV3IGNvZGVnZW5fMS5OYW1lKFwiZHluYW1pY0FuY2hvcnNcIiksXG4gICAgLy8gZnVuY3Rpb24gc2NvcGVkIHZhcmlhYmxlc1xuICAgIHZFcnJvcnM6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInZFcnJvcnNcIiksXG4gICAgZXJyb3JzOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJlcnJvcnNcIiksXG4gICAgdGhpczogbmV3IGNvZGVnZW5fMS5OYW1lKFwidGhpc1wiKSxcbiAgICAvLyBcImdsb2JhbHNcIlxuICAgIHNlbGY6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInNlbGZcIiksXG4gICAgc2NvcGU6IG5ldyBjb2RlZ2VuXzEuTmFtZShcInNjb3BlXCIpLFxuICAgIC8vIEpURCBzZXJpYWxpemUvcGFyc2UgbmFtZSBmb3IgSlNPTiBzdHJpbmcgYW5kIHBvc2l0aW9uXG4gICAganNvbjogbmV3IGNvZGVnZW5fMS5OYW1lKFwianNvblwiKSxcbiAgICBqc29uUG9zOiBuZXcgY29kZWdlbl8xLk5hbWUoXCJqc29uUG9zXCIpLFxuICAgIGpzb25MZW46IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25MZW5cIiksXG4gICAganNvblBhcnQ6IG5ldyBjb2RlZ2VuXzEuTmFtZShcImpzb25QYXJ0XCIpLFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IG5hbWVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmFtZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZXNvbHZlXzEgPSByZXF1aXJlKFwiLi9yZXNvbHZlXCIpO1xuY2xhc3MgTWlzc2luZ1JlZkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGJhc2VJZCwgcmVmLCBtc2cpIHtcbiAgICAgICAgc3VwZXIobXNnIHx8IGBjYW4ndCByZXNvbHZlIHJlZmVyZW5jZSAke3JlZn0gZnJvbSBpZCAke2Jhc2VJZH1gKTtcbiAgICAgICAgdGhpcy5taXNzaW5nUmVmID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKShiYXNlSWQsIHJlZik7XG4gICAgICAgIHRoaXMubWlzc2luZ1NjaGVtYSA9ICgwLCByZXNvbHZlXzEubm9ybWFsaXplSWQpKCgwLCByZXNvbHZlXzEuZ2V0RnVsbFBhdGgpKHRoaXMubWlzc2luZ1JlZikpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IE1pc3NpbmdSZWZFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZl9lcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0U2NoZW1hUmVmcyA9IGV4cG9ydHMucmVzb2x2ZVVybCA9IGV4cG9ydHMubm9ybWFsaXplSWQgPSBleHBvcnRzLl9nZXRGdWxsUGF0aCA9IGV4cG9ydHMuZ2V0RnVsbFBhdGggPSBleHBvcnRzLmlubGluZVJlZiA9IHZvaWQgMDtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBlcXVhbCA9IHJlcXVpcmUoXCJmYXN0LWRlZXAtZXF1YWxcIik7XG5jb25zdCB0cmF2ZXJzZSA9IHJlcXVpcmUoXCJqc29uLXNjaGVtYS10cmF2ZXJzZVwiKTtcbmNvbnN0IFVSSSA9IHJlcXVpcmUoXCJ1cmktanNcIik7XG4vLyBUT0RPIHJlZmFjdG9yIHRvIHVzZSBrZXl3b3JkIGRlZmluaXRpb25zXG5jb25zdCBTSU1QTEVfSU5MSU5FRCA9IG5ldyBTZXQoW1xuICAgIFwidHlwZVwiLFxuICAgIFwiZm9ybWF0XCIsXG4gICAgXCJwYXR0ZXJuXCIsXG4gICAgXCJtYXhMZW5ndGhcIixcbiAgICBcIm1pbkxlbmd0aFwiLFxuICAgIFwibWF4UHJvcGVydGllc1wiLFxuICAgIFwibWluUHJvcGVydGllc1wiLFxuICAgIFwibWF4SXRlbXNcIixcbiAgICBcIm1pbkl0ZW1zXCIsXG4gICAgXCJtYXhpbXVtXCIsXG4gICAgXCJtaW5pbXVtXCIsXG4gICAgXCJ1bmlxdWVJdGVtc1wiLFxuICAgIFwibXVsdGlwbGVPZlwiLFxuICAgIFwicmVxdWlyZWRcIixcbiAgICBcImVudW1cIixcbiAgICBcImNvbnN0XCIsXG5dKTtcbmZ1bmN0aW9uIGlubGluZVJlZihzY2hlbWEsIGxpbWl0ID0gdHJ1ZSkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobGltaXQgPT09IHRydWUpXG4gICAgICAgIHJldHVybiAhaGFzUmVmKHNjaGVtYSk7XG4gICAgaWYgKCFsaW1pdClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjb3VudEtleXMoc2NoZW1hKSA8PSBsaW1pdDtcbn1cbmV4cG9ydHMuaW5saW5lUmVmID0gaW5saW5lUmVmO1xuY29uc3QgUkVGX0tFWVdPUkRTID0gbmV3IFNldChbXG4gICAgXCIkcmVmXCIsXG4gICAgXCIkcmVjdXJzaXZlUmVmXCIsXG4gICAgXCIkcmVjdXJzaXZlQW5jaG9yXCIsXG4gICAgXCIkZHluYW1pY1JlZlwiLFxuICAgIFwiJGR5bmFtaWNBbmNob3JcIixcbl0pO1xuZnVuY3Rpb24gaGFzUmVmKHNjaGVtYSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoUkVGX0tFWVdPUkRTLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHNjaCA9IHNjaGVtYVtrZXldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzY2gpICYmIHNjaC5zb21lKGhhc1JlZikpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2ggPT0gXCJvYmplY3RcIiAmJiBoYXNSZWYoc2NoKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBjb3VudEtleXMoc2NoZW1hKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCIkcmVmXCIpXG4gICAgICAgICAgICByZXR1cm4gSW5maW5pdHk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIGlmIChTSU1QTEVfSU5MSU5FRC5oYXMoa2V5KSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYVtrZXldID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuZWFjaEl0ZW0pKHNjaGVtYVtrZXldLCAoc2NoKSA9PiAoY291bnQgKz0gY291bnRLZXlzKHNjaCkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPT09IEluZmluaXR5KVxuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cbiAgICByZXR1cm4gY291bnQ7XG59XG5mdW5jdGlvbiBnZXRGdWxsUGF0aChpZCA9IFwiXCIsIG5vcm1hbGl6ZSkge1xuICAgIGlmIChub3JtYWxpemUgIT09IGZhbHNlKVxuICAgICAgICBpZCA9IG5vcm1hbGl6ZUlkKGlkKTtcbiAgICBjb25zdCBwID0gVVJJLnBhcnNlKGlkKTtcbiAgICByZXR1cm4gX2dldEZ1bGxQYXRoKHApO1xufVxuZXhwb3J0cy5nZXRGdWxsUGF0aCA9IGdldEZ1bGxQYXRoO1xuZnVuY3Rpb24gX2dldEZ1bGxQYXRoKHApIHtcbiAgICByZXR1cm4gVVJJLnNlcmlhbGl6ZShwKS5zcGxpdChcIiNcIilbMF0gKyBcIiNcIjtcbn1cbmV4cG9ydHMuX2dldEZ1bGxQYXRoID0gX2dldEZ1bGxQYXRoO1xuY29uc3QgVFJBSUxJTkdfU0xBU0hfSEFTSCA9IC8jXFwvPyQvO1xuZnVuY3Rpb24gbm9ybWFsaXplSWQoaWQpIHtcbiAgICByZXR1cm4gaWQgPyBpZC5yZXBsYWNlKFRSQUlMSU5HX1NMQVNIX0hBU0gsIFwiXCIpIDogXCJcIjtcbn1cbmV4cG9ydHMubm9ybWFsaXplSWQgPSBub3JtYWxpemVJZDtcbmZ1bmN0aW9uIHJlc29sdmVVcmwoYmFzZUlkLCBpZCkge1xuICAgIGlkID0gbm9ybWFsaXplSWQoaWQpO1xuICAgIHJldHVybiBVUkkucmVzb2x2ZShiYXNlSWQsIGlkKTtcbn1cbmV4cG9ydHMucmVzb2x2ZVVybCA9IHJlc29sdmVVcmw7XG5jb25zdCBBTkNIT1IgPSAvXlthLXpfXVstYS16MC05Ll9dKiQvaTtcbmZ1bmN0aW9uIGdldFNjaGVtYVJlZnMoc2NoZW1hLCBiYXNlSWQpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICBjb25zdCBzY2hJZCA9IG5vcm1hbGl6ZUlkKHNjaGVtYVtzY2hlbWFJZF0gfHwgYmFzZUlkKTtcbiAgICBjb25zdCBiYXNlSWRzID0geyBcIlwiOiBzY2hJZCB9O1xuICAgIGNvbnN0IHBhdGhQcmVmaXggPSBnZXRGdWxsUGF0aChzY2hJZCwgZmFsc2UpO1xuICAgIGNvbnN0IGxvY2FsUmVmcyA9IHt9O1xuICAgIGNvbnN0IHNjaGVtYVJlZnMgPSBuZXcgU2V0KCk7XG4gICAgdHJhdmVyc2Uoc2NoZW1hLCB7IGFsbEtleXM6IHRydWUgfSwgKHNjaCwganNvblB0ciwgXywgcGFyZW50SnNvblB0cikgPT4ge1xuICAgICAgICBpZiAocGFyZW50SnNvblB0ciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IHBhdGhQcmVmaXggKyBqc29uUHRyO1xuICAgICAgICBsZXQgYmFzZUlkID0gYmFzZUlkc1twYXJlbnRKc29uUHRyXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hbc2NoZW1hSWRdID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBiYXNlSWQgPSBhZGRSZWYuY2FsbCh0aGlzLCBzY2hbc2NoZW1hSWRdKTtcbiAgICAgICAgYWRkQW5jaG9yLmNhbGwodGhpcywgc2NoLiRhbmNob3IpO1xuICAgICAgICBhZGRBbmNob3IuY2FsbCh0aGlzLCBzY2guJGR5bmFtaWNBbmNob3IpO1xuICAgICAgICBiYXNlSWRzW2pzb25QdHJdID0gYmFzZUlkO1xuICAgICAgICBmdW5jdGlvbiBhZGRSZWYocmVmKSB7XG4gICAgICAgICAgICByZWYgPSBub3JtYWxpemVJZChiYXNlSWQgPyBVUkkucmVzb2x2ZShiYXNlSWQsIHJlZikgOiByZWYpO1xuICAgICAgICAgICAgaWYgKHNjaGVtYVJlZnMuaGFzKHJlZikpXG4gICAgICAgICAgICAgICAgdGhyb3cgYW1iaWd1b3MocmVmKTtcbiAgICAgICAgICAgIHNjaGVtYVJlZnMuYWRkKHJlZik7XG4gICAgICAgICAgICBsZXQgc2NoT3JSZWYgPSB0aGlzLnJlZnNbcmVmXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoT3JSZWYgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBzY2hPclJlZiA9IHRoaXMucmVmc1tzY2hPclJlZl07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjaE9yUmVmID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBjaGVja0FtYmlndW9zUmVmKHNjaCwgc2NoT3JSZWYuc2NoZW1hLCByZWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVmICE9PSBub3JtYWxpemVJZChmdWxsUGF0aCkpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVmWzBdID09PSBcIiNcIikge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0FtYmlndW9zUmVmKHNjaCwgbG9jYWxSZWZzW3JlZl0sIHJlZik7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsUmVmc1tyZWZdID0gc2NoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzW3JlZl0gPSBmdWxsUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFkZEFuY2hvcihhbmNob3IpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYW5jaG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUFOQ0hPUi50ZXN0KGFuY2hvcikpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBhbmNob3IgXCIke2FuY2hvcn1cImApO1xuICAgICAgICAgICAgICAgIGFkZFJlZi5jYWxsKHRoaXMsIGAjJHthbmNob3J9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbG9jYWxSZWZzO1xuICAgIGZ1bmN0aW9uIGNoZWNrQW1iaWd1b3NSZWYoc2NoMSwgc2NoMiwgcmVmKSB7XG4gICAgICAgIGlmIChzY2gyICE9PSB1bmRlZmluZWQgJiYgIWVxdWFsKHNjaDEsIHNjaDIpKVxuICAgICAgICAgICAgdGhyb3cgYW1iaWd1b3MocmVmKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYW1iaWd1b3MocmVmKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoYHJlZmVyZW5jZSBcIiR7cmVmfVwiIHJlc29sdmVzIHRvIG1vcmUgdGhhbiBvbmUgc2NoZW1hYCk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRTY2hlbWFSZWZzID0gZ2V0U2NoZW1hUmVmcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc29sdmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFJ1bGVzID0gZXhwb3J0cy5pc0pTT05UeXBlID0gdm9pZCAwO1xuY29uc3QgX2pzb25UeXBlcyA9IFtcInN0cmluZ1wiLCBcIm51bWJlclwiLCBcImludGVnZXJcIiwgXCJib29sZWFuXCIsIFwibnVsbFwiLCBcIm9iamVjdFwiLCBcImFycmF5XCJdO1xuY29uc3QganNvblR5cGVzID0gbmV3IFNldChfanNvblR5cGVzKTtcbmZ1bmN0aW9uIGlzSlNPTlR5cGUoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PSBcInN0cmluZ1wiICYmIGpzb25UeXBlcy5oYXMoeCk7XG59XG5leHBvcnRzLmlzSlNPTlR5cGUgPSBpc0pTT05UeXBlO1xuZnVuY3Rpb24gZ2V0UnVsZXMoKSB7XG4gICAgY29uc3QgZ3JvdXBzID0ge1xuICAgICAgICBudW1iZXI6IHsgdHlwZTogXCJudW1iZXJcIiwgcnVsZXM6IFtdIH0sXG4gICAgICAgIHN0cmluZzogeyB0eXBlOiBcInN0cmluZ1wiLCBydWxlczogW10gfSxcbiAgICAgICAgYXJyYXk6IHsgdHlwZTogXCJhcnJheVwiLCBydWxlczogW10gfSxcbiAgICAgICAgb2JqZWN0OiB7IHR5cGU6IFwib2JqZWN0XCIsIHJ1bGVzOiBbXSB9LFxuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZXM6IHsgLi4uZ3JvdXBzLCBpbnRlZ2VyOiB0cnVlLCBib29sZWFuOiB0cnVlLCBudWxsOiB0cnVlIH0sXG4gICAgICAgIHJ1bGVzOiBbeyBydWxlczogW10gfSwgZ3JvdXBzLm51bWJlciwgZ3JvdXBzLnN0cmluZywgZ3JvdXBzLmFycmF5LCBncm91cHMub2JqZWN0XSxcbiAgICAgICAgcG9zdDogeyBydWxlczogW10gfSxcbiAgICAgICAgYWxsOiB7fSxcbiAgICAgICAga2V5d29yZHM6IHt9LFxuICAgIH07XG59XG5leHBvcnRzLmdldFJ1bGVzID0gZ2V0UnVsZXM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ydWxlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2hlY2tTdHJpY3RNb2RlID0gZXhwb3J0cy5nZXRFcnJvclBhdGggPSBleHBvcnRzLlR5cGUgPSBleHBvcnRzLnVzZUZ1bmMgPSBleHBvcnRzLnNldEV2YWx1YXRlZCA9IGV4cG9ydHMuZXZhbHVhdGVkUHJvcHNUb05hbWUgPSBleHBvcnRzLm1lcmdlRXZhbHVhdGVkID0gZXhwb3J0cy5lYWNoSXRlbSA9IGV4cG9ydHMudW5lc2NhcGVKc29uUG9pbnRlciA9IGV4cG9ydHMuZXNjYXBlSnNvblBvaW50ZXIgPSBleHBvcnRzLmVzY2FwZUZyYWdtZW50ID0gZXhwb3J0cy51bmVzY2FwZUZyYWdtZW50ID0gZXhwb3J0cy5zY2hlbWFSZWZPclZhbCA9IGV4cG9ydHMuc2NoZW1hSGFzUnVsZXNCdXRSZWYgPSBleHBvcnRzLnNjaGVtYUhhc1J1bGVzID0gZXhwb3J0cy5jaGVja1Vua25vd25SdWxlcyA9IGV4cG9ydHMuYWx3YXlzVmFsaWRTY2hlbWEgPSBleHBvcnRzLnRvSGFzaCA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuL2NvZGVnZW5cIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi9jb2RlZ2VuL2NvZGVcIik7XG4vLyBUT0RPIHJlZmFjdG9yIHRvIHVzZSBTZXRcbmZ1bmN0aW9uIHRvSGFzaChhcnIpIHtcbiAgICBjb25zdCBoYXNoID0ge307XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGFycilcbiAgICAgICAgaGFzaFtpdGVtXSA9IHRydWU7XG4gICAgcmV0dXJuIGhhc2g7XG59XG5leHBvcnRzLnRvSGFzaCA9IHRvSGFzaDtcbmZ1bmN0aW9uIGFsd2F5c1ZhbGlkU2NoZW1hKGl0LCBzY2hlbWEpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcImJvb2xlYW5cIilcbiAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICBpZiAoT2JqZWN0LmtleXMoc2NoZW1hKS5sZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIGNoZWNrVW5rbm93blJ1bGVzKGl0LCBzY2hlbWEpO1xuICAgIHJldHVybiAhc2NoZW1hSGFzUnVsZXMoc2NoZW1hLCBpdC5zZWxmLlJVTEVTLmFsbCk7XG59XG5leHBvcnRzLmFsd2F5c1ZhbGlkU2NoZW1hID0gYWx3YXlzVmFsaWRTY2hlbWE7XG5mdW5jdGlvbiBjaGVja1Vua25vd25SdWxlcyhpdCwgc2NoZW1hID0gaXQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBvcHRzLCBzZWxmIH0gPSBpdDtcbiAgICBpZiAoIW9wdHMuc3RyaWN0U2NoZW1hKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgcnVsZXMgPSBzZWxmLlJVTEVTLmtleXdvcmRzO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSkge1xuICAgICAgICBpZiAoIXJ1bGVzW2tleV0pXG4gICAgICAgICAgICBjaGVja1N0cmljdE1vZGUoaXQsIGB1bmtub3duIGtleXdvcmQ6IFwiJHtrZXl9XCJgKTtcbiAgICB9XG59XG5leHBvcnRzLmNoZWNrVW5rbm93blJ1bGVzID0gY2hlY2tVbmtub3duUnVsZXM7XG5mdW5jdGlvbiBzY2hlbWFIYXNSdWxlcyhzY2hlbWEsIHJ1bGVzKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiAhc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSlcbiAgICAgICAgaWYgKHJ1bGVzW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLnNjaGVtYUhhc1J1bGVzID0gc2NoZW1hSGFzUnVsZXM7XG5mdW5jdGlvbiBzY2hlbWFIYXNSdWxlc0J1dFJlZihzY2hlbWEsIFJVTEVTKSB7XG4gICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgIHJldHVybiAhc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHNjaGVtYSlcbiAgICAgICAgaWYgKGtleSAhPT0gXCIkcmVmXCIgJiYgUlVMRVMuYWxsW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5leHBvcnRzLnNjaGVtYUhhc1J1bGVzQnV0UmVmID0gc2NoZW1hSGFzUnVsZXNCdXRSZWY7XG5mdW5jdGlvbiBzY2hlbWFSZWZPclZhbCh7IHRvcFNjaGVtYVJlZiwgc2NoZW1hUGF0aCB9LCBzY2hlbWEsIGtleXdvcmQsICRkYXRhKSB7XG4gICAgaWYgKCEkZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hfWA7XG4gICAgfVxuICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke3RvcFNjaGVtYVJlZn0ke3NjaGVtYVBhdGh9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShrZXl3b3JkKX1gO1xufVxuZXhwb3J0cy5zY2hlbWFSZWZPclZhbCA9IHNjaGVtYVJlZk9yVmFsO1xuZnVuY3Rpb24gdW5lc2NhcGVGcmFnbWVudChzdHIpIHtcbiAgICByZXR1cm4gdW5lc2NhcGVKc29uUG9pbnRlcihkZWNvZGVVUklDb21wb25lbnQoc3RyKSk7XG59XG5leHBvcnRzLnVuZXNjYXBlRnJhZ21lbnQgPSB1bmVzY2FwZUZyYWdtZW50O1xuZnVuY3Rpb24gZXNjYXBlRnJhZ21lbnQoc3RyKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChlc2NhcGVKc29uUG9pbnRlcihzdHIpKTtcbn1cbmV4cG9ydHMuZXNjYXBlRnJhZ21lbnQgPSBlc2NhcGVGcmFnbWVudDtcbmZ1bmN0aW9uIGVzY2FwZUpzb25Qb2ludGVyKHN0cikge1xuICAgIGlmICh0eXBlb2Ygc3RyID09IFwibnVtYmVyXCIpXG4gICAgICAgIHJldHVybiBgJHtzdHJ9YDtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL34vZywgXCJ+MFwiKS5yZXBsYWNlKC9cXC8vZywgXCJ+MVwiKTtcbn1cbmV4cG9ydHMuZXNjYXBlSnNvblBvaW50ZXIgPSBlc2NhcGVKc29uUG9pbnRlcjtcbmZ1bmN0aW9uIHVuZXNjYXBlSnNvblBvaW50ZXIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9+MS9nLCBcIi9cIikucmVwbGFjZSgvfjAvZywgXCJ+XCIpO1xufVxuZXhwb3J0cy51bmVzY2FwZUpzb25Qb2ludGVyID0gdW5lc2NhcGVKc29uUG9pbnRlcjtcbmZ1bmN0aW9uIGVhY2hJdGVtKHhzLCBmKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoeHMpKSB7XG4gICAgICAgIGZvciAoY29uc3QgeCBvZiB4cylcbiAgICAgICAgICAgIGYoeCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmKHhzKTtcbiAgICB9XG59XG5leHBvcnRzLmVhY2hJdGVtID0gZWFjaEl0ZW07XG5mdW5jdGlvbiBtYWtlTWVyZ2VFdmFsdWF0ZWQoeyBtZXJnZU5hbWVzLCBtZXJnZVRvTmFtZSwgbWVyZ2VWYWx1ZXMsIHJlc3VsdFRvTmFtZSwgfSkge1xuICAgIHJldHVybiAoZ2VuLCBmcm9tLCB0bywgdG9OYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHRvID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gZnJvbVxuICAgICAgICAgICAgOiB0byBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lXG4gICAgICAgICAgICAgICAgPyAoZnJvbSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gbWVyZ2VOYW1lcyhnZW4sIGZyb20sIHRvKSA6IG1lcmdlVG9OYW1lKGdlbiwgZnJvbSwgdG8pLCB0bylcbiAgICAgICAgICAgICAgICA6IGZyb20gaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IChtZXJnZVRvTmFtZShnZW4sIHRvLCBmcm9tKSwgZnJvbSlcbiAgICAgICAgICAgICAgICAgICAgOiBtZXJnZVZhbHVlcyhmcm9tLCB0byk7XG4gICAgICAgIHJldHVybiB0b05hbWUgPT09IGNvZGVnZW5fMS5OYW1lICYmICEocmVzIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpID8gcmVzdWx0VG9OYW1lKGdlbiwgcmVzKSA6IHJlcztcbiAgICB9O1xufVxuZXhwb3J0cy5tZXJnZUV2YWx1YXRlZCA9IHtcbiAgICBwcm9wczogbWFrZU1lcmdlRXZhbHVhdGVkKHtcbiAgICAgICAgbWVyZ2VOYW1lczogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZSAmJiAke2Zyb219ICE9PSB1bmRlZmluZWRgLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtmcm9tfSA9PT0gdHJ1ZWAsICgpID0+IGdlbi5hc3NpZ24odG8sIHRydWUpLCAoKSA9PiBnZW4uYXNzaWduKHRvLCAoMCwgY29kZWdlbl8xLl8pIGAke3RvfSB8fCB7fWApLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgT2JqZWN0LmFzc2lnbigke3RvfSwgJHtmcm9tfSlgKSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtZXJnZVRvTmFtZTogKGdlbiwgZnJvbSwgdG8pID0+IGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3RvfSAhPT0gdHJ1ZWAsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChmcm9tID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih0bywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHRvLCAoMCwgY29kZWdlbl8xLl8pIGAke3RvfSB8fCB7fWApO1xuICAgICAgICAgICAgICAgIHNldEV2YWx1YXRlZChnZW4sIHRvLCBmcm9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG1lcmdlVmFsdWVzOiAoZnJvbSwgdG8pID0+IChmcm9tID09PSB0cnVlID8gdHJ1ZSA6IHsgLi4uZnJvbSwgLi4udG8gfSksXG4gICAgICAgIHJlc3VsdFRvTmFtZTogZXZhbHVhdGVkUHJvcHNUb05hbWUsXG4gICAgfSksXG4gICAgaXRlbXM6IG1ha2VNZXJnZUV2YWx1YXRlZCh7XG4gICAgICAgIG1lcmdlTmFtZXM6IChnZW4sIGZyb20sIHRvKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHt0b30gIT09IHRydWUgJiYgJHtmcm9tfSAhPT0gdW5kZWZpbmVkYCwgKCkgPT4gZ2VuLmFzc2lnbih0bywgKDAsIGNvZGVnZW5fMS5fKSBgJHtmcm9tfSA9PT0gdHJ1ZSA/IHRydWUgOiAke3RvfSA+ICR7ZnJvbX0gPyAke3RvfSA6ICR7ZnJvbX1gKSksXG4gICAgICAgIG1lcmdlVG9OYW1lOiAoZ2VuLCBmcm9tLCB0bykgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7dG99ICE9PSB0cnVlYCwgKCkgPT4gZ2VuLmFzc2lnbih0bywgZnJvbSA9PT0gdHJ1ZSA/IHRydWUgOiAoMCwgY29kZWdlbl8xLl8pIGAke3RvfSA+ICR7ZnJvbX0gPyAke3RvfSA6ICR7ZnJvbX1gKSksXG4gICAgICAgIG1lcmdlVmFsdWVzOiAoZnJvbSwgdG8pID0+IChmcm9tID09PSB0cnVlID8gdHJ1ZSA6IE1hdGgubWF4KGZyb20sIHRvKSksXG4gICAgICAgIHJlc3VsdFRvTmFtZTogKGdlbiwgaXRlbXMpID0+IGdlbi52YXIoXCJpdGVtc1wiLCBpdGVtcyksXG4gICAgfSksXG59O1xuZnVuY3Rpb24gZXZhbHVhdGVkUHJvcHNUb05hbWUoZ2VuLCBwcykge1xuICAgIGlmIChwcyA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIGdlbi52YXIoXCJwcm9wc1wiLCB0cnVlKTtcbiAgICBjb25zdCBwcm9wcyA9IGdlbi52YXIoXCJwcm9wc1wiLCAoMCwgY29kZWdlbl8xLl8pIGB7fWApO1xuICAgIGlmIChwcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzZXRFdmFsdWF0ZWQoZ2VuLCBwcm9wcywgcHMpO1xuICAgIHJldHVybiBwcm9wcztcbn1cbmV4cG9ydHMuZXZhbHVhdGVkUHJvcHNUb05hbWUgPSBldmFsdWF0ZWRQcm9wc1RvTmFtZTtcbmZ1bmN0aW9uIHNldEV2YWx1YXRlZChnZW4sIHByb3BzLCBwcykge1xuICAgIE9iamVjdC5rZXlzKHBzKS5mb3JFYWNoKChwKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcHN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShwKX1gLCB0cnVlKSk7XG59XG5leHBvcnRzLnNldEV2YWx1YXRlZCA9IHNldEV2YWx1YXRlZDtcbmNvbnN0IHNuaXBwZXRzID0ge307XG5mdW5jdGlvbiB1c2VGdW5jKGdlbiwgZikge1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImZ1bmNcIiwge1xuICAgICAgICByZWY6IGYsXG4gICAgICAgIGNvZGU6IHNuaXBwZXRzW2YuY29kZV0gfHwgKHNuaXBwZXRzW2YuY29kZV0gPSBuZXcgY29kZV8xLl9Db2RlKGYuY29kZSkpLFxuICAgIH0pO1xufVxuZXhwb3J0cy51c2VGdW5jID0gdXNlRnVuYztcbnZhciBUeXBlO1xuKGZ1bmN0aW9uIChUeXBlKSB7XG4gICAgVHlwZVtUeXBlW1wiTnVtXCJdID0gMF0gPSBcIk51bVwiO1xuICAgIFR5cGVbVHlwZVtcIlN0clwiXSA9IDFdID0gXCJTdHJcIjtcbn0pKFR5cGUgPSBleHBvcnRzLlR5cGUgfHwgKGV4cG9ydHMuVHlwZSA9IHt9KSk7XG5mdW5jdGlvbiBnZXRFcnJvclBhdGgoZGF0YVByb3AsIGRhdGFQcm9wVHlwZSwganNQcm9wZXJ0eVN5bnRheCkge1xuICAgIC8vIGxldCBwYXRoXG4gICAgaWYgKGRhdGFQcm9wIGluc3RhbmNlb2YgY29kZWdlbl8xLk5hbWUpIHtcbiAgICAgICAgY29uc3QgaXNOdW1iZXIgPSBkYXRhUHJvcFR5cGUgPT09IFR5cGUuTnVtO1xuICAgICAgICByZXR1cm4ganNQcm9wZXJ0eVN5bnRheFxuICAgICAgICAgICAgPyBpc051bWJlclxuICAgICAgICAgICAgICAgID8gKDAsIGNvZGVnZW5fMS5fKSBgXCJbXCIgKyAke2RhdGFQcm9wfSArIFwiXVwiYFxuICAgICAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgXCJbJ1wiICsgJHtkYXRhUHJvcH0gKyBcIiddXCJgXG4gICAgICAgICAgICA6IGlzTnVtYmVyXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGBcIi9cIiArICR7ZGF0YVByb3B9YFxuICAgICAgICAgICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgXCIvXCIgKyAke2RhdGFQcm9wfS5yZXBsYWNlKC9+L2csIFwifjBcIikucmVwbGFjZSgvXFxcXC8vZywgXCJ+MVwiKWA7IC8vIFRPRE8gbWF5YmUgdXNlIGdsb2JhbCBlc2NhcGVQb2ludGVyXG4gICAgfVxuICAgIHJldHVybiBqc1Byb3BlcnR5U3ludGF4ID8gKDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoZGF0YVByb3ApLnRvU3RyaW5nKCkgOiBcIi9cIiArIGVzY2FwZUpzb25Qb2ludGVyKGRhdGFQcm9wKTtcbn1cbmV4cG9ydHMuZ2V0RXJyb3JQYXRoID0gZ2V0RXJyb3JQYXRoO1xuZnVuY3Rpb24gY2hlY2tTdHJpY3RNb2RlKGl0LCBtc2csIG1vZGUgPSBpdC5vcHRzLnN0cmljdFNjaGVtYSkge1xuICAgIGlmICghbW9kZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIG1zZyA9IGBzdHJpY3QgbW9kZTogJHttc2d9YDtcbiAgICBpZiAobW9kZSA9PT0gdHJ1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgaXQuc2VsZi5sb2dnZXIud2Fybihtc2cpO1xufVxuZXhwb3J0cy5jaGVja1N0cmljdE1vZGUgPSBjaGVja1N0cmljdE1vZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaG91bGRVc2VSdWxlID0gZXhwb3J0cy5zaG91bGRVc2VHcm91cCA9IGV4cG9ydHMuc2NoZW1hSGFzUnVsZXNGb3JUeXBlID0gdm9pZCAwO1xuZnVuY3Rpb24gc2NoZW1hSGFzUnVsZXNGb3JUeXBlKHsgc2NoZW1hLCBzZWxmIH0sIHR5cGUpIHtcbiAgICBjb25zdCBncm91cCA9IHNlbGYuUlVMRVMudHlwZXNbdHlwZV07XG4gICAgcmV0dXJuIGdyb3VwICYmIGdyb3VwICE9PSB0cnVlICYmIHNob3VsZFVzZUdyb3VwKHNjaGVtYSwgZ3JvdXApO1xufVxuZXhwb3J0cy5zY2hlbWFIYXNSdWxlc0ZvclR5cGUgPSBzY2hlbWFIYXNSdWxlc0ZvclR5cGU7XG5mdW5jdGlvbiBzaG91bGRVc2VHcm91cChzY2hlbWEsIGdyb3VwKSB7XG4gICAgcmV0dXJuIGdyb3VwLnJ1bGVzLnNvbWUoKHJ1bGUpID0+IHNob3VsZFVzZVJ1bGUoc2NoZW1hLCBydWxlKSk7XG59XG5leHBvcnRzLnNob3VsZFVzZUdyb3VwID0gc2hvdWxkVXNlR3JvdXA7XG5mdW5jdGlvbiBzaG91bGRVc2VSdWxlKHNjaGVtYSwgcnVsZSkge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKHNjaGVtYVtydWxlLmtleXdvcmRdICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgKChfYSA9IHJ1bGUuZGVmaW5pdGlvbi5pbXBsZW1lbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc29tZSgoa3dkKSA9PiBzY2hlbWFba3dkXSAhPT0gdW5kZWZpbmVkKSkpO1xufVxuZXhwb3J0cy5zaG91bGRVc2VSdWxlID0gc2hvdWxkVXNlUnVsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcGxpY2FiaWxpdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJvb2xPckVtcHR5U2NoZW1hID0gZXhwb3J0cy50b3BCb29sT3JFbXB0eVNjaGVtYSA9IHZvaWQgMDtcbmNvbnN0IGVycm9yc18xID0gcmVxdWlyZShcIi4uL2Vycm9yc1wiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9uYW1lc1wiKTtcbmNvbnN0IGJvb2xFcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcImJvb2xlYW4gc2NoZW1hIGlzIGZhbHNlXCIsXG59O1xuZnVuY3Rpb24gdG9wQm9vbE9yRW1wdHlTY2hlbWEoaXQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCB2YWxpZGF0ZU5hbWUgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGZhbHNlU2NoZW1hRXJyb3IoaXQsIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmIHNjaGVtYS4kYXN5bmMgPT09IHRydWUpIHtcbiAgICAgICAgZ2VuLnJldHVybihuYW1lc18xLmRlZmF1bHQuZGF0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5lcnJvcnNgLCBudWxsKTtcbiAgICAgICAgZ2VuLnJldHVybih0cnVlKTtcbiAgICB9XG59XG5leHBvcnRzLnRvcEJvb2xPckVtcHR5U2NoZW1hID0gdG9wQm9vbE9yRW1wdHlTY2hlbWE7XG5mdW5jdGlvbiBib29sT3JFbXB0eVNjaGVtYShpdCwgdmFsaWQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hIH0gPSBpdDtcbiAgICBpZiAoc2NoZW1hID09PSBmYWxzZSkge1xuICAgICAgICBnZW4udmFyKHZhbGlkLCBmYWxzZSk7IC8vIFRPRE8gdmFyXG4gICAgICAgIGZhbHNlU2NoZW1hRXJyb3IoaXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLnZhcih2YWxpZCwgdHJ1ZSk7IC8vIFRPRE8gdmFyXG4gICAgfVxufVxuZXhwb3J0cy5ib29sT3JFbXB0eVNjaGVtYSA9IGJvb2xPckVtcHR5U2NoZW1hO1xuZnVuY3Rpb24gZmFsc2VTY2hlbWFFcnJvcihpdCwgb3ZlcnJpZGVBbGxFcnJvcnMpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSB9ID0gaXQ7XG4gICAgLy8gVE9ETyBtYXliZSBzb21lIG90aGVyIGludGVyZmFjZSBzaG91bGQgYmUgdXNlZCBmb3Igbm9uLWtleXdvcmQgdmFsaWRhdGlvbiBlcnJvcnMuLi5cbiAgICBjb25zdCBjeHQgPSB7XG4gICAgICAgIGdlbixcbiAgICAgICAga2V5d29yZDogXCJmYWxzZSBzY2hlbWFcIixcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc2NoZW1hOiBmYWxzZSxcbiAgICAgICAgc2NoZW1hQ29kZTogZmFsc2UsXG4gICAgICAgIHNjaGVtYVZhbHVlOiBmYWxzZSxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgaXQsXG4gICAgfTtcbiAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKGN4dCwgYm9vbEVycm9yLCB1bmRlZmluZWQsIG92ZXJyaWRlQWxsRXJyb3JzKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJvb2xTY2hlbWEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlcG9ydFR5cGVFcnJvciA9IGV4cG9ydHMuY2hlY2tEYXRhVHlwZXMgPSBleHBvcnRzLmNoZWNrRGF0YVR5cGUgPSBleHBvcnRzLmNvZXJjZUFuZENoZWNrRGF0YVR5cGUgPSBleHBvcnRzLmdldEpTT05UeXBlcyA9IGV4cG9ydHMuZ2V0U2NoZW1hVHlwZXMgPSBleHBvcnRzLkRhdGFUeXBlID0gdm9pZCAwO1xuY29uc3QgcnVsZXNfMSA9IHJlcXVpcmUoXCIuLi9ydWxlc1wiKTtcbmNvbnN0IGFwcGxpY2FiaWxpdHlfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2FiaWxpdHlcIik7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xudmFyIERhdGFUeXBlO1xuKGZ1bmN0aW9uIChEYXRhVHlwZSkge1xuICAgIERhdGFUeXBlW0RhdGFUeXBlW1wiQ29ycmVjdFwiXSA9IDBdID0gXCJDb3JyZWN0XCI7XG4gICAgRGF0YVR5cGVbRGF0YVR5cGVbXCJXcm9uZ1wiXSA9IDFdID0gXCJXcm9uZ1wiO1xufSkoRGF0YVR5cGUgPSBleHBvcnRzLkRhdGFUeXBlIHx8IChleHBvcnRzLkRhdGFUeXBlID0ge30pKTtcbmZ1bmN0aW9uIGdldFNjaGVtYVR5cGVzKHNjaGVtYSkge1xuICAgIGNvbnN0IHR5cGVzID0gZ2V0SlNPTlR5cGVzKHNjaGVtYS50eXBlKTtcbiAgICBjb25zdCBoYXNOdWxsID0gdHlwZXMuaW5jbHVkZXMoXCJudWxsXCIpO1xuICAgIGlmIChoYXNOdWxsKSB7XG4gICAgICAgIGlmIChzY2hlbWEubnVsbGFibGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZTogbnVsbCBjb250cmFkaWN0cyBudWxsYWJsZTogZmFsc2VcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIXR5cGVzLmxlbmd0aCAmJiBzY2hlbWEubnVsbGFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIm51bGxhYmxlXCIgY2Fubm90IGJlIHVzZWQgd2l0aG91dCBcInR5cGVcIicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlbWEubnVsbGFibGUgPT09IHRydWUpXG4gICAgICAgICAgICB0eXBlcy5wdXNoKFwibnVsbFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVzO1xufVxuZXhwb3J0cy5nZXRTY2hlbWFUeXBlcyA9IGdldFNjaGVtYVR5cGVzO1xuZnVuY3Rpb24gZ2V0SlNPTlR5cGVzKHRzKSB7XG4gICAgY29uc3QgdHlwZXMgPSBBcnJheS5pc0FycmF5KHRzKSA/IHRzIDogdHMgPyBbdHNdIDogW107XG4gICAgaWYgKHR5cGVzLmV2ZXJ5KHJ1bGVzXzEuaXNKU09OVHlwZSkpXG4gICAgICAgIHJldHVybiB0eXBlcztcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0eXBlIG11c3QgYmUgSlNPTlR5cGUgb3IgSlNPTlR5cGVbXTogXCIgKyB0eXBlcy5qb2luKFwiLFwiKSk7XG59XG5leHBvcnRzLmdldEpTT05UeXBlcyA9IGdldEpTT05UeXBlcztcbmZ1bmN0aW9uIGNvZXJjZUFuZENoZWNrRGF0YVR5cGUoaXQsIHR5cGVzKSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIG9wdHMgfSA9IGl0O1xuICAgIGNvbnN0IGNvZXJjZVRvID0gY29lcmNlVG9UeXBlcyh0eXBlcywgb3B0cy5jb2VyY2VUeXBlcyk7XG4gICAgY29uc3QgY2hlY2tUeXBlcyA9IHR5cGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgIShjb2VyY2VUby5sZW5ndGggPT09IDAgJiYgdHlwZXMubGVuZ3RoID09PSAxICYmICgwLCBhcHBsaWNhYmlsaXR5XzEuc2NoZW1hSGFzUnVsZXNGb3JUeXBlKShpdCwgdHlwZXNbMF0pKTtcbiAgICBpZiAoY2hlY2tUeXBlcykge1xuICAgICAgICBjb25zdCB3cm9uZ1R5cGUgPSBjaGVja0RhdGFUeXBlcyh0eXBlcywgZGF0YSwgb3B0cy5zdHJpY3ROdW1iZXJzLCBEYXRhVHlwZS5Xcm9uZyk7XG4gICAgICAgIGdlbi5pZih3cm9uZ1R5cGUsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChjb2VyY2VUby5sZW5ndGgpXG4gICAgICAgICAgICAgICAgY29lcmNlRGF0YShpdCwgdHlwZXMsIGNvZXJjZVRvKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXBvcnRUeXBlRXJyb3IoaXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrVHlwZXM7XG59XG5leHBvcnRzLmNvZXJjZUFuZENoZWNrRGF0YVR5cGUgPSBjb2VyY2VBbmRDaGVja0RhdGFUeXBlO1xuY29uc3QgQ09FUkNJQkxFID0gbmV3IFNldChbXCJzdHJpbmdcIiwgXCJudW1iZXJcIiwgXCJpbnRlZ2VyXCIsIFwiYm9vbGVhblwiLCBcIm51bGxcIl0pO1xuZnVuY3Rpb24gY29lcmNlVG9UeXBlcyh0eXBlcywgY29lcmNlVHlwZXMpIHtcbiAgICByZXR1cm4gY29lcmNlVHlwZXNcbiAgICAgICAgPyB0eXBlcy5maWx0ZXIoKHQpID0+IENPRVJDSUJMRS5oYXModCkgfHwgKGNvZXJjZVR5cGVzID09PSBcImFycmF5XCIgJiYgdCA9PT0gXCJhcnJheVwiKSlcbiAgICAgICAgOiBbXTtcbn1cbmZ1bmN0aW9uIGNvZXJjZURhdGEoaXQsIHR5cGVzLCBjb2VyY2VUbykge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBvcHRzIH0gPSBpdDtcbiAgICBjb25zdCBkYXRhVHlwZSA9IGdlbi5sZXQoXCJkYXRhVHlwZVwiLCAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfWApO1xuICAgIGNvbnN0IGNvZXJjZWQgPSBnZW4ubGV0KFwiY29lcmNlZFwiLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKTtcbiAgICBpZiAob3B0cy5jb2VyY2VUeXBlcyA9PT0gXCJhcnJheVwiKSB7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KCR7ZGF0YX0pICYmICR7ZGF0YX0ubGVuZ3RoID09IDFgLCAoKSA9PiBnZW5cbiAgICAgICAgICAgIC5hc3NpZ24oZGF0YSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfVswXWApXG4gICAgICAgICAgICAuYXNzaWduKGRhdGFUeXBlLCAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfWApXG4gICAgICAgICAgICAuaWYoY2hlY2tEYXRhVHlwZXModHlwZXMsIGRhdGEsIG9wdHMuc3RyaWN0TnVtYmVycyksICgpID0+IGdlbi5hc3NpZ24oY29lcmNlZCwgZGF0YSkpKTtcbiAgICB9XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y29lcmNlZH0gIT09IHVuZGVmaW5lZGApO1xuICAgIGZvciAoY29uc3QgdCBvZiBjb2VyY2VUbykge1xuICAgICAgICBpZiAoQ09FUkNJQkxFLmhhcyh0KSB8fCAodCA9PT0gXCJhcnJheVwiICYmIG9wdHMuY29lcmNlVHlwZXMgPT09IFwiYXJyYXlcIikpIHtcbiAgICAgICAgICAgIGNvZXJjZVNwZWNpZmljVHlwZSh0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW4uZWxzZSgpO1xuICAgIHJlcG9ydFR5cGVFcnJvcihpdCk7XG4gICAgZ2VuLmVuZElmKCk7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y29lcmNlZH0gIT09IHVuZGVmaW5lZGAsICgpID0+IHtcbiAgICAgICAgZ2VuLmFzc2lnbihkYXRhLCBjb2VyY2VkKTtcbiAgICAgICAgYXNzaWduUGFyZW50RGF0YShpdCwgY29lcmNlZCk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gY29lcmNlU3BlY2lmaWNUeXBlKHQpIHtcbiAgICAgICAgc3dpdGNoICh0KSB7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT0gXCJudW1iZXJcIiB8fCAke2RhdGFUeXBlfSA9PSBcImJvb2xlYW5cImApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgXCJcIiArICR7ZGF0YX1gKVxuICAgICAgICAgICAgICAgICAgICAuZWxzZUlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0gPT09IG51bGxgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYFwiXCJgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT0gXCJib29sZWFuXCIgfHwgJHtkYXRhfSA9PT0gbnVsbFxuICAgICAgICAgICAgICB8fCAoJHtkYXRhVHlwZX0gPT0gXCJzdHJpbmdcIiAmJiAke2RhdGF9ICYmICR7ZGF0YX0gPT0gKyR7ZGF0YX0pYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCAoMCwgY29kZWdlbl8xLl8pIGArJHtkYXRhfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhVHlwZX0gPT09IFwiYm9vbGVhblwiIHx8ICR7ZGF0YX0gPT09IG51bGxcbiAgICAgICAgICAgICAgfHwgKCR7ZGF0YVR5cGV9ID09PSBcInN0cmluZ1wiICYmICR7ZGF0YX0gJiYgJHtkYXRhfSA9PSArJHtkYXRhfSAmJiAhKCR7ZGF0YX0gJSAxKSlgKVxuICAgICAgICAgICAgICAgICAgICAuYXNzaWduKGNvZXJjZWQsICgwLCBjb2RlZ2VuXzEuXykgYCske2RhdGF9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBcImZhbHNlXCIgfHwgJHtkYXRhfSA9PT0gMCB8fCAke2RhdGF9ID09PSBudWxsYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSBcInRydWVcIiB8fCAke2RhdGF9ID09PSAxYClcbiAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihjb2VyY2VkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwibnVsbFwiOlxuICAgICAgICAgICAgICAgIGdlbi5lbHNlSWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSA9PT0gXCJcIiB8fCAke2RhdGF9ID09PSAwIHx8ICR7ZGF0YX0gPT09IGZhbHNlYCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihjb2VyY2VkLCBudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgICAgICAgICBnZW5cbiAgICAgICAgICAgICAgICAgICAgLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFUeXBlfSA9PT0gXCJzdHJpbmdcIiB8fCAke2RhdGFUeXBlfSA9PT0gXCJudW1iZXJcIlxuICAgICAgICAgICAgICB8fCAke2RhdGFUeXBlfSA9PT0gXCJib29sZWFuXCIgfHwgJHtkYXRhfSA9PT0gbnVsbGApXG4gICAgICAgICAgICAgICAgICAgIC5hc3NpZ24oY29lcmNlZCwgKDAsIGNvZGVnZW5fMS5fKSBgWyR7ZGF0YX1dYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBhc3NpZ25QYXJlbnREYXRhKHsgZ2VuLCBwYXJlbnREYXRhLCBwYXJlbnREYXRhUHJvcGVydHkgfSwgZXhwcikge1xuICAgIC8vIFRPRE8gdXNlIGdlbi5wcm9wZXJ0eVxuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke3BhcmVudERhdGF9ICE9PSB1bmRlZmluZWRgLCAoKSA9PiBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7cGFyZW50RGF0YX1bJHtwYXJlbnREYXRhUHJvcGVydHl9XWAsIGV4cHIpKTtcbn1cbmZ1bmN0aW9uIGNoZWNrRGF0YVR5cGUoZGF0YVR5cGUsIGRhdGEsIHN0cmljdE51bXMsIGNvcnJlY3QgPSBEYXRhVHlwZS5Db3JyZWN0KSB7XG4gICAgY29uc3QgRVEgPSBjb3JyZWN0ID09PSBEYXRhVHlwZS5Db3JyZWN0ID8gY29kZWdlbl8xLm9wZXJhdG9ycy5FUSA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTkVRO1xuICAgIGxldCBjb25kO1xuICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcbiAgICAgICAgY2FzZSBcIm51bGxcIjpcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICR7RVF9IG51bGxgO1xuICAgICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGBBcnJheS5pc0FycmF5KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSAmJiB0eXBlb2YgJHtkYXRhfSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KCR7ZGF0YX0pYDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxuICAgICAgICAgICAgY29uZCA9IG51bUNvbmQoKDAsIGNvZGVnZW5fMS5fKSBgISgke2RhdGF9ICUgMSkgJiYgIWlzTmFOKCR7ZGF0YX0pYCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgY29uZCA9IG51bUNvbmQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2RhdGF9ICR7RVF9ICR7ZGF0YVR5cGV9YDtcbiAgICB9XG4gICAgcmV0dXJuIGNvcnJlY3QgPT09IERhdGFUeXBlLkNvcnJlY3QgPyBjb25kIDogKDAsIGNvZGVnZW5fMS5ub3QpKGNvbmQpO1xuICAgIGZ1bmN0aW9uIG51bUNvbmQoX2NvbmQgPSBjb2RlZ2VuXzEubmlsKSB7XG4gICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLmFuZCkoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZGF0YX0gPT0gXCJudW1iZXJcImAsIF9jb25kLCBzdHJpY3ROdW1zID8gKDAsIGNvZGVnZW5fMS5fKSBgaXNGaW5pdGUoJHtkYXRhfSlgIDogY29kZWdlbl8xLm5pbCk7XG4gICAgfVxufVxuZXhwb3J0cy5jaGVja0RhdGFUeXBlID0gY2hlY2tEYXRhVHlwZTtcbmZ1bmN0aW9uIGNoZWNrRGF0YVR5cGVzKGRhdGFUeXBlcywgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCkge1xuICAgIGlmIChkYXRhVHlwZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBjaGVja0RhdGFUeXBlKGRhdGFUeXBlc1swXSwgZGF0YSwgc3RyaWN0TnVtcywgY29ycmVjdCk7XG4gICAgfVxuICAgIGxldCBjb25kO1xuICAgIGNvbnN0IHR5cGVzID0gKDAsIHV0aWxfMS50b0hhc2gpKGRhdGFUeXBlcyk7XG4gICAgaWYgKHR5cGVzLmFycmF5ICYmIHR5cGVzLm9iamVjdCkge1xuICAgICAgICBjb25zdCBub3RPYmogPSAoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtkYXRhfSAhPSBcIm9iamVjdFwiYDtcbiAgICAgICAgY29uZCA9IHR5cGVzLm51bGwgPyBub3RPYmogOiAoMCwgY29kZWdlbl8xLl8pIGAhJHtkYXRhfSB8fCAke25vdE9ian1gO1xuICAgICAgICBkZWxldGUgdHlwZXMubnVsbDtcbiAgICAgICAgZGVsZXRlIHR5cGVzLmFycmF5O1xuICAgICAgICBkZWxldGUgdHlwZXMub2JqZWN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uZCA9IGNvZGVnZW5fMS5uaWw7XG4gICAgfVxuICAgIGlmICh0eXBlcy5udW1iZXIpXG4gICAgICAgIGRlbGV0ZSB0eXBlcy5pbnRlZ2VyO1xuICAgIGZvciAoY29uc3QgdCBpbiB0eXBlcylcbiAgICAgICAgY29uZCA9ICgwLCBjb2RlZ2VuXzEuYW5kKShjb25kLCBjaGVja0RhdGFUeXBlKHQsIGRhdGEsIHN0cmljdE51bXMsIGNvcnJlY3QpKTtcbiAgICByZXR1cm4gY29uZDtcbn1cbmV4cG9ydHMuY2hlY2tEYXRhVHlwZXMgPSBjaGVja0RhdGFUeXBlcztcbmNvbnN0IHR5cGVFcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWEgfSkgPT4gYG11c3QgYmUgJHtzY2hlbWF9YCxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYSwgc2NoZW1hVmFsdWUgfSkgPT4gdHlwZW9mIHNjaGVtYSA9PSBcInN0cmluZ1wiID8gKDAsIGNvZGVnZW5fMS5fKSBge3R5cGU6ICR7c2NoZW1hfX1gIDogKDAsIGNvZGVnZW5fMS5fKSBge3R5cGU6ICR7c2NoZW1hVmFsdWV9fWAsXG59O1xuZnVuY3Rpb24gcmVwb3J0VHlwZUVycm9yKGl0KSB7XG4gICAgY29uc3QgY3h0ID0gZ2V0VHlwZUVycm9yQ29udGV4dChpdCk7XG4gICAgKDAsIGVycm9yc18xLnJlcG9ydEVycm9yKShjeHQsIHR5cGVFcnJvcik7XG59XG5leHBvcnRzLnJlcG9ydFR5cGVFcnJvciA9IHJlcG9ydFR5cGVFcnJvcjtcbmZ1bmN0aW9uIGdldFR5cGVFcnJvckNvbnRleHQoaXQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgc2NoZW1hIH0gPSBpdDtcbiAgICBjb25zdCBzY2hlbWFDb2RlID0gKDAsIHV0aWxfMS5zY2hlbWFSZWZPclZhbCkoaXQsIHNjaGVtYSwgXCJ0eXBlXCIpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdlbixcbiAgICAgICAga2V5d29yZDogXCJ0eXBlXCIsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHNjaGVtYTogc2NoZW1hLnR5cGUsXG4gICAgICAgIHNjaGVtYUNvZGUsXG4gICAgICAgIHNjaGVtYVZhbHVlOiBzY2hlbWFDb2RlLFxuICAgICAgICBwYXJlbnRTY2hlbWE6IHNjaGVtYSxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgaXQsXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFUeXBlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hc3NpZ25EZWZhdWx0cyA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5mdW5jdGlvbiBhc3NpZ25EZWZhdWx0cyhpdCwgdHkpIHtcbiAgICBjb25zdCB7IHByb3BlcnRpZXMsIGl0ZW1zIH0gPSBpdC5zY2hlbWE7XG4gICAgaWYgKHR5ID09PSBcIm9iamVjdFwiICYmIHByb3BlcnRpZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgYXNzaWduRGVmYXVsdChpdCwga2V5LCBwcm9wZXJ0aWVzW2tleV0uZGVmYXVsdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHkgPT09IFwiYXJyYXlcIiAmJiBBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICBpdGVtcy5mb3JFYWNoKChzY2gsIGkpID0+IGFzc2lnbkRlZmF1bHQoaXQsIGksIHNjaC5kZWZhdWx0KSk7XG4gICAgfVxufVxuZXhwb3J0cy5hc3NpZ25EZWZhdWx0cyA9IGFzc2lnbkRlZmF1bHRzO1xuZnVuY3Rpb24gYXNzaWduRGVmYXVsdChpdCwgcHJvcCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgY29uc3QgeyBnZW4sIGNvbXBvc2l0ZVJ1bGUsIGRhdGEsIG9wdHMgfSA9IGl0O1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGNoaWxkRGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHByb3ApfWA7XG4gICAgaWYgKGNvbXBvc2l0ZVJ1bGUpIHtcbiAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgZGVmYXVsdCBpcyBpZ25vcmVkIGZvcjogJHtjaGlsZERhdGF9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGNvbmRpdGlvbiA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y2hpbGREYXRhfSA9PT0gdW5kZWZpbmVkYDtcbiAgICBpZiAob3B0cy51c2VEZWZhdWx0cyA9PT0gXCJlbXB0eVwiKSB7XG4gICAgICAgIGNvbmRpdGlvbiA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y29uZGl0aW9ufSB8fCAke2NoaWxkRGF0YX0gPT09IG51bGwgfHwgJHtjaGlsZERhdGF9ID09PSBcIlwiYDtcbiAgICB9XG4gICAgLy8gYCR7Y2hpbGREYXRhfSA9PT0gdW5kZWZpbmVkYCArXG4gICAgLy8gKG9wdHMudXNlRGVmYXVsdHMgPT09IFwiZW1wdHlcIiA/IGAgfHwgJHtjaGlsZERhdGF9ID09PSBudWxsIHx8ICR7Y2hpbGREYXRhfSA9PT0gXCJcImAgOiBcIlwiKVxuICAgIGdlbi5pZihjb25kaXRpb24sICgwLCBjb2RlZ2VuXzEuXykgYCR7Y2hpbGREYXRhfSA9ICR7KDAsIGNvZGVnZW5fMS5zdHJpbmdpZnkpKGRlZmF1bHRWYWx1ZSl9YCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0RGF0YSA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IGV4cG9ydHMudmFsaWRhdGVGdW5jdGlvbkNvZGUgPSB2b2lkIDA7XG5jb25zdCBib29sU2NoZW1hXzEgPSByZXF1aXJlKFwiLi9ib29sU2NoZW1hXCIpO1xuY29uc3QgZGF0YVR5cGVfMSA9IHJlcXVpcmUoXCIuL2RhdGFUeXBlXCIpO1xuY29uc3QgYXBwbGljYWJpbGl0eV8xID0gcmVxdWlyZShcIi4vYXBwbGljYWJpbGl0eVwiKTtcbmNvbnN0IGRhdGFUeXBlXzIgPSByZXF1aXJlKFwiLi9kYXRhVHlwZVwiKTtcbmNvbnN0IGRlZmF1bHRzXzEgPSByZXF1aXJlKFwiLi9kZWZhdWx0c1wiKTtcbmNvbnN0IGtleXdvcmRfMSA9IHJlcXVpcmUoXCIuL2tleXdvcmRcIik7XG5jb25zdCBzdWJzY2hlbWFfMSA9IHJlcXVpcmUoXCIuL3N1YnNjaGVtYVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi9jb2RlZ2VuXCIpO1xuY29uc3QgbmFtZXNfMSA9IHJlcXVpcmUoXCIuLi9uYW1lc1wiKTtcbmNvbnN0IHJlc29sdmVfMSA9IHJlcXVpcmUoXCIuLi9yZXNvbHZlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5jb25zdCBlcnJvcnNfMSA9IHJlcXVpcmUoXCIuLi9lcnJvcnNcIik7XG4vLyBzY2hlbWEgY29tcGlsYXRpb24gLSBnZW5lcmF0ZXMgdmFsaWRhdGlvbiBmdW5jdGlvbiwgc3Vic2NoZW1hQ29kZSAoYmVsb3cpIGlzIHVzZWQgZm9yIHN1YnNjaGVtYXNcbmZ1bmN0aW9uIHZhbGlkYXRlRnVuY3Rpb25Db2RlKGl0KSB7XG4gICAgaWYgKGlzU2NoZW1hT2JqKGl0KSkge1xuICAgICAgICBjaGVja0tleXdvcmRzKGl0KTtcbiAgICAgICAgaWYgKHNjaGVtYUN4dEhhc1J1bGVzKGl0KSkge1xuICAgICAgICAgICAgdG9wU2NoZW1hT2JqQ29kZShpdCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVGdW5jdGlvbihpdCwgKCkgPT4gKDAsIGJvb2xTY2hlbWFfMS50b3BCb29sT3JFbXB0eVNjaGVtYSkoaXQpKTtcbn1cbmV4cG9ydHMudmFsaWRhdGVGdW5jdGlvbkNvZGUgPSB2YWxpZGF0ZUZ1bmN0aW9uQ29kZTtcbmZ1bmN0aW9uIHZhbGlkYXRlRnVuY3Rpb24oeyBnZW4sIHZhbGlkYXRlTmFtZSwgc2NoZW1hLCBzY2hlbWFFbnYsIG9wdHMgfSwgYm9keSkge1xuICAgIGlmIChvcHRzLmNvZGUuZXM1KSB7XG4gICAgICAgIGdlbi5mdW5jKHZhbGlkYXRlTmFtZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZGF0YX0sICR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH1gLCBzY2hlbWFFbnYuJGFzeW5jLCAoKSA9PiB7XG4gICAgICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGBcInVzZSBzdHJpY3RcIjsgJHtmdW5jU291cmNlVXJsKHNjaGVtYSwgb3B0cyl9YCk7XG4gICAgICAgICAgICBkZXN0cnVjdHVyZVZhbEN4dEVTNShnZW4sIG9wdHMpO1xuICAgICAgICAgICAgZ2VuLmNvZGUoYm9keSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmZ1bmModmFsaWRhdGVOYW1lLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5kYXRhfSwgJHtkZXN0cnVjdHVyZVZhbEN4dChvcHRzKX1gLCBzY2hlbWFFbnYuJGFzeW5jLCAoKSA9PiBnZW4uY29kZShmdW5jU291cmNlVXJsKHNjaGVtYSwgb3B0cykpLmNvZGUoYm9keSkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlc3RydWN0dXJlVmFsQ3h0KG9wdHMpIHtcbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5fKSBgeyR7bmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aH09XCJcIiwgJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YX0sICR7bmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eX0sICR7bmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhfT0ke25hbWVzXzEuZGVmYXVsdC5kYXRhfSR7b3B0cy5keW5hbWljUmVmID8gKDAsIGNvZGVnZW5fMS5fKSBgLCAke25hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9yc309e31gIDogY29kZWdlbl8xLm5pbH19PXt9YDtcbn1cbmZ1bmN0aW9uIGRlc3RydWN0dXJlVmFsQ3h0RVM1KGdlbiwgb3B0cykge1xuICAgIGdlbi5pZihuYW1lc18xLmRlZmF1bHQudmFsQ3h0LCAoKSA9PiB7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGh9YCk7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YX1gKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52YWxDeHR9LiR7bmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eX1gKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucm9vdERhdGEsICgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LnZhbEN4dH0uJHtuYW1lc18xLmRlZmF1bHQucm9vdERhdGF9YCk7XG4gICAgICAgIGlmIChvcHRzLmR5bmFtaWNSZWYpXG4gICAgICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudmFsQ3h0fS4ke25hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9yc31gKTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5fKSBgXCJcImApO1xuICAgICAgICBnZW4udmFyKG5hbWVzXzEuZGVmYXVsdC5wYXJlbnREYXRhLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucGFyZW50RGF0YVByb3BlcnR5LCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKTtcbiAgICAgICAgZ2VuLnZhcihuYW1lc18xLmRlZmF1bHQucm9vdERhdGEsIG5hbWVzXzEuZGVmYXVsdC5kYXRhKTtcbiAgICAgICAgaWYgKG9wdHMuZHluYW1pY1JlZilcbiAgICAgICAgICAgIGdlbi52YXIobmFtZXNfMS5kZWZhdWx0LmR5bmFtaWNBbmNob3JzLCAoMCwgY29kZWdlbl8xLl8pIGB7fWApO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdG9wU2NoZW1hT2JqQ29kZShpdCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBvcHRzLCBnZW4gfSA9IGl0O1xuICAgIHZhbGlkYXRlRnVuY3Rpb24oaXQsICgpID0+IHtcbiAgICAgICAgaWYgKG9wdHMuJGNvbW1lbnQgJiYgc2NoZW1hLiRjb21tZW50KVxuICAgICAgICAgICAgY29tbWVudEtleXdvcmQoaXQpO1xuICAgICAgICBjaGVja05vRGVmYXVsdChpdCk7XG4gICAgICAgIGdlbi5sZXQobmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMsIG51bGwpO1xuICAgICAgICBnZW4ubGV0KG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMsIDApO1xuICAgICAgICBpZiAob3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgICAgIHJlc2V0RXZhbHVhdGVkKGl0KTtcbiAgICAgICAgdHlwZUFuZEtleXdvcmRzKGl0KTtcbiAgICAgICAgcmV0dXJuUmVzdWx0cyhpdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xufVxuZnVuY3Rpb24gcmVzZXRFdmFsdWF0ZWQoaXQpIHtcbiAgICAvLyBUT0RPIG1heWJlIHNvbWUgaG9vayB0byBleGVjdXRlIGl0IGluIHRoZSBlbmQgdG8gY2hlY2sgd2hldGhlciBwcm9wcy9pdGVtcyBhcmUgTmFtZSwgYXMgaW4gYXNzaWduRXZhbHVhdGVkXG4gICAgY29uc3QgeyBnZW4sIHZhbGlkYXRlTmFtZSB9ID0gaXQ7XG4gICAgaXQuZXZhbHVhdGVkID0gZ2VuLmNvbnN0KFwiZXZhbHVhdGVkXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7dmFsaWRhdGVOYW1lfS5ldmFsdWF0ZWRgKTtcbiAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5ldmFsdWF0ZWR9LmR5bmFtaWNQcm9wc2AsICgpID0+IGdlbi5hc3NpZ24oKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5ldmFsdWF0ZWR9LnByb3BzYCwgKDAsIGNvZGVnZW5fMS5fKSBgdW5kZWZpbmVkYCkpO1xuICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0uZHluYW1pY0l0ZW1zYCwgKCkgPT4gZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2l0LmV2YWx1YXRlZH0uaXRlbXNgLCAoMCwgY29kZWdlbl8xLl8pIGB1bmRlZmluZWRgKSk7XG59XG5mdW5jdGlvbiBmdW5jU291cmNlVXJsKHNjaGVtYSwgb3B0cykge1xuICAgIGNvbnN0IHNjaElkID0gdHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmIHNjaGVtYVtvcHRzLnNjaGVtYUlkXTtcbiAgICByZXR1cm4gc2NoSWQgJiYgKG9wdHMuY29kZS5zb3VyY2UgfHwgb3B0cy5jb2RlLnByb2Nlc3MpID8gKDAsIGNvZGVnZW5fMS5fKSBgLyojIHNvdXJjZVVSTD0ke3NjaElkfSAqL2AgOiBjb2RlZ2VuXzEubmlsO1xufVxuLy8gc2NoZW1hIGNvbXBpbGF0aW9uIC0gdGhpcyBmdW5jdGlvbiBpcyB1c2VkIHJlY3Vyc2l2ZWx5IHRvIGdlbmVyYXRlIGNvZGUgZm9yIHN1Yi1zY2hlbWFzXG5mdW5jdGlvbiBzdWJzY2hlbWFDb2RlKGl0LCB2YWxpZCkge1xuICAgIGlmIChpc1NjaGVtYU9iaihpdCkpIHtcbiAgICAgICAgY2hlY2tLZXl3b3JkcyhpdCk7XG4gICAgICAgIGlmIChzY2hlbWFDeHRIYXNSdWxlcyhpdCkpIHtcbiAgICAgICAgICAgIHN1YlNjaGVtYU9iakNvZGUoaXQsIHZhbGlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAoMCwgYm9vbFNjaGVtYV8xLmJvb2xPckVtcHR5U2NoZW1hKShpdCwgdmFsaWQpO1xufVxuZnVuY3Rpb24gc2NoZW1hQ3h0SGFzUnVsZXMoeyBzY2hlbWEsIHNlbGYgfSkge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09IFwiYm9vbGVhblwiKVxuICAgICAgICByZXR1cm4gIXNjaGVtYTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzY2hlbWEpXG4gICAgICAgIGlmIChzZWxmLlJVTEVTLmFsbFtrZXldKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNTY2hlbWFPYmooaXQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGl0LnNjaGVtYSAhPSBcImJvb2xlYW5cIjtcbn1cbmZ1bmN0aW9uIHN1YlNjaGVtYU9iakNvZGUoaXQsIHZhbGlkKSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIGdlbiwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKG9wdHMuJGNvbW1lbnQgJiYgc2NoZW1hLiRjb21tZW50KVxuICAgICAgICBjb21tZW50S2V5d29yZChpdCk7XG4gICAgdXBkYXRlQ29udGV4dChpdCk7XG4gICAgY2hlY2tBc3luY1NjaGVtYShpdCk7XG4gICAgY29uc3QgZXJyc0NvdW50ID0gZ2VuLmNvbnN0KFwiX2VycnNcIiwgbmFtZXNfMS5kZWZhdWx0LmVycm9ycyk7XG4gICAgdHlwZUFuZEtleXdvcmRzKGl0LCBlcnJzQ291bnQpO1xuICAgIC8vIFRPRE8gdmFyXG4gICAgZ2VuLnZhcih2YWxpZCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJzQ291bnR9ID09PSAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9YCk7XG59XG5mdW5jdGlvbiBjaGVja0tleXdvcmRzKGl0KSB7XG4gICAgKDAsIHV0aWxfMS5jaGVja1Vua25vd25SdWxlcykoaXQpO1xuICAgIGNoZWNrUmVmc0FuZEtleXdvcmRzKGl0KTtcbn1cbmZ1bmN0aW9uIHR5cGVBbmRLZXl3b3JkcyhpdCwgZXJyc0NvdW50KSB7XG4gICAgaWYgKGl0Lm9wdHMuanRkKVxuICAgICAgICByZXR1cm4gc2NoZW1hS2V5d29yZHMoaXQsIFtdLCBmYWxzZSwgZXJyc0NvdW50KTtcbiAgICBjb25zdCB0eXBlcyA9ICgwLCBkYXRhVHlwZV8xLmdldFNjaGVtYVR5cGVzKShpdC5zY2hlbWEpO1xuICAgIGNvbnN0IGNoZWNrZWRUeXBlcyA9ICgwLCBkYXRhVHlwZV8xLmNvZXJjZUFuZENoZWNrRGF0YVR5cGUpKGl0LCB0eXBlcyk7XG4gICAgc2NoZW1hS2V5d29yZHMoaXQsIHR5cGVzLCAhY2hlY2tlZFR5cGVzLCBlcnJzQ291bnQpO1xufVxuZnVuY3Rpb24gY2hlY2tSZWZzQW5kS2V5d29yZHMoaXQpIHtcbiAgICBjb25zdCB7IHNjaGVtYSwgZXJyU2NoZW1hUGF0aCwgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYS4kcmVmICYmIG9wdHMuaWdub3JlS2V5d29yZHNXaXRoUmVmICYmICgwLCB1dGlsXzEuc2NoZW1hSGFzUnVsZXNCdXRSZWYpKHNjaGVtYSwgc2VsZi5SVUxFUykpIHtcbiAgICAgICAgc2VsZi5sb2dnZXIud2FybihgJHJlZjoga2V5d29yZHMgaWdub3JlZCBpbiBzY2hlbWEgYXQgcGF0aCBcIiR7ZXJyU2NoZW1hUGF0aH1cImApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNoZWNrTm9EZWZhdWx0KGl0KSB7XG4gICAgY29uc3QgeyBzY2hlbWEsIG9wdHMgfSA9IGl0O1xuICAgIGlmIChzY2hlbWEuZGVmYXVsdCAhPT0gdW5kZWZpbmVkICYmIG9wdHMudXNlRGVmYXVsdHMgJiYgb3B0cy5zdHJpY3RTY2hlbWEpIHtcbiAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBcImRlZmF1bHQgaXMgaWdub3JlZCBpbiB0aGUgc2NoZW1hIHJvb3RcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQ29udGV4dChpdCkge1xuICAgIGNvbnN0IHNjaElkID0gaXQuc2NoZW1hW2l0Lm9wdHMuc2NoZW1hSWRdO1xuICAgIGlmIChzY2hJZClcbiAgICAgICAgaXQuYmFzZUlkID0gKDAsIHJlc29sdmVfMS5yZXNvbHZlVXJsKShpdC5iYXNlSWQsIHNjaElkKTtcbn1cbmZ1bmN0aW9uIGNoZWNrQXN5bmNTY2hlbWEoaXQpIHtcbiAgICBpZiAoaXQuc2NoZW1hLiRhc3luYyAmJiAhaXQuc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMgc2NoZW1hIGluIHN5bmMgc2NoZW1hXCIpO1xufVxuZnVuY3Rpb24gY29tbWVudEtleXdvcmQoeyBnZW4sIHNjaGVtYUVudiwgc2NoZW1hLCBlcnJTY2hlbWFQYXRoLCBvcHRzIH0pIHtcbiAgICBjb25zdCBtc2cgPSBzY2hlbWEuJGNvbW1lbnQ7XG4gICAgaWYgKG9wdHMuJGNvbW1lbnQgPT09IHRydWUpIHtcbiAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuc2VsZn0ubG9nZ2VyLmxvZygke21zZ30pYCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzLiRjb21tZW50ID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb25zdCBzY2hlbWFQYXRoID0gKDAsIGNvZGVnZW5fMS5zdHIpIGAke2VyclNjaGVtYVBhdGh9LyRjb21tZW50YDtcbiAgICAgICAgY29uc3Qgcm9vdE5hbWUgPSBnZW4uc2NvcGVWYWx1ZShcInJvb3RcIiwgeyByZWY6IHNjaGVtYUVudi5yb290IH0pO1xuICAgICAgICBnZW4uY29kZSgoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC5zZWxmfS5vcHRzLiRjb21tZW50KCR7bXNnfSwgJHtzY2hlbWFQYXRofSwgJHtyb290TmFtZX0uc2NoZW1hKWApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJldHVyblJlc3VsdHMoaXQpIHtcbiAgICBjb25zdCB7IGdlbiwgc2NoZW1hRW52LCB2YWxpZGF0ZU5hbWUsIFZhbGlkYXRpb25FcnJvciwgb3B0cyB9ID0gaXQ7XG4gICAgaWYgKHNjaGVtYUVudi4kYXN5bmMpIHtcbiAgICAgICAgLy8gVE9ETyBhc3NpZ24gdW5ldmFsdWF0ZWRcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7bmFtZXNfMS5kZWZhdWx0LmVycm9yc30gPT09IDBgLCAoKSA9PiBnZW4ucmV0dXJuKG5hbWVzXzEuZGVmYXVsdC5kYXRhKSwgKCkgPT4gZ2VuLnRocm93KCgwLCBjb2RlZ2VuXzEuXykgYG5ldyAke1ZhbGlkYXRpb25FcnJvcn0oJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30pYCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlTmFtZX0uZXJyb3JzYCwgbmFtZXNfMS5kZWZhdWx0LnZFcnJvcnMpO1xuICAgICAgICBpZiAob3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgICAgIGFzc2lnbkV2YWx1YXRlZChpdCk7XG4gICAgICAgIGdlbi5yZXR1cm4oKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSA9PT0gMGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2lnbkV2YWx1YXRlZCh7IGdlbiwgZXZhbHVhdGVkLCBwcm9wcywgaXRlbXMgfSkge1xuICAgIGlmIChwcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKVxuICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXZhbHVhdGVkfS5wcm9wc2AsIHByb3BzKTtcbiAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSlcbiAgICAgICAgZ2VuLmFzc2lnbigoMCwgY29kZWdlbl8xLl8pIGAke2V2YWx1YXRlZH0uaXRlbXNgLCBpdGVtcyk7XG59XG5mdW5jdGlvbiBzY2hlbWFLZXl3b3JkcyhpdCwgdHlwZXMsIHR5cGVFcnJvcnMsIGVycnNDb3VudCkge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGFsbEVycm9ycywgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgY29uc3QgeyBSVUxFUyB9ID0gc2VsZjtcbiAgICBpZiAoc2NoZW1hLiRyZWYgJiYgKG9wdHMuaWdub3JlS2V5d29yZHNXaXRoUmVmIHx8ICEoMCwgdXRpbF8xLnNjaGVtYUhhc1J1bGVzQnV0UmVmKShzY2hlbWEsIFJVTEVTKSkpIHtcbiAgICAgICAgZ2VuLmJsb2NrKCgpID0+IGtleXdvcmRDb2RlKGl0LCBcIiRyZWZcIiwgUlVMRVMuYWxsLiRyZWYuZGVmaW5pdGlvbikpOyAvLyBUT0RPIHR5cGVjYXN0XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFvcHRzLmp0ZClcbiAgICAgICAgY2hlY2tTdHJpY3RUeXBlcyhpdCwgdHlwZXMpO1xuICAgIGdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZ3JvdXAgb2YgUlVMRVMucnVsZXMpXG4gICAgICAgICAgICBncm91cEtleXdvcmRzKGdyb3VwKTtcbiAgICAgICAgZ3JvdXBLZXl3b3JkcyhSVUxFUy5wb3N0KTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBncm91cEtleXdvcmRzKGdyb3VwKSB7XG4gICAgICAgIGlmICghKDAsIGFwcGxpY2FiaWxpdHlfMS5zaG91bGRVc2VHcm91cCkoc2NoZW1hLCBncm91cCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChncm91cC50eXBlKSB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGRhdGFUeXBlXzIuY2hlY2tEYXRhVHlwZSkoZ3JvdXAudHlwZSwgZGF0YSwgb3B0cy5zdHJpY3ROdW1iZXJzKSk7XG4gICAgICAgICAgICBpdGVyYXRlS2V5d29yZHMoaXQsIGdyb3VwKTtcbiAgICAgICAgICAgIGlmICh0eXBlcy5sZW5ndGggPT09IDEgJiYgdHlwZXNbMF0gPT09IGdyb3VwLnR5cGUgJiYgdHlwZUVycm9ycykge1xuICAgICAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgICAgICAgICAgKDAsIGRhdGFUeXBlXzIucmVwb3J0VHlwZUVycm9yKShpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZW4uZW5kSWYoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdGVLZXl3b3JkcyhpdCwgZ3JvdXApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8gbWFrZSBpdCBcIm9rXCIgY2FsbD9cbiAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQuZXJyb3JzfSA9PT0gJHtlcnJzQ291bnQgfHwgMH1gKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpdGVyYXRlS2V5d29yZHMoaXQsIGdyb3VwKSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgb3B0czogeyB1c2VEZWZhdWx0cyB9LCB9ID0gaXQ7XG4gICAgaWYgKHVzZURlZmF1bHRzKVxuICAgICAgICAoMCwgZGVmYXVsdHNfMS5hc3NpZ25EZWZhdWx0cykoaXQsIGdyb3VwLnR5cGUpO1xuICAgIGdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBncm91cC5ydWxlcykge1xuICAgICAgICAgICAgaWYgKCgwLCBhcHBsaWNhYmlsaXR5XzEuc2hvdWxkVXNlUnVsZSkoc2NoZW1hLCBydWxlKSkge1xuICAgICAgICAgICAgICAgIGtleXdvcmRDb2RlKGl0LCBydWxlLmtleXdvcmQsIHJ1bGUuZGVmaW5pdGlvbiwgZ3JvdXAudHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNoZWNrU3RyaWN0VHlwZXMoaXQsIHR5cGVzKSB7XG4gICAgaWYgKGl0LnNjaGVtYUVudi5tZXRhIHx8ICFpdC5vcHRzLnN0cmljdFR5cGVzKVxuICAgICAgICByZXR1cm47XG4gICAgY2hlY2tDb250ZXh0VHlwZXMoaXQsIHR5cGVzKTtcbiAgICBpZiAoIWl0Lm9wdHMuYWxsb3dVbmlvblR5cGVzKVxuICAgICAgICBjaGVja011bHRpcGxlVHlwZXMoaXQsIHR5cGVzKTtcbiAgICBjaGVja0tleXdvcmRUeXBlcyhpdCwgaXQuZGF0YVR5cGVzKTtcbn1cbmZ1bmN0aW9uIGNoZWNrQ29udGV4dFR5cGVzKGl0LCB0eXBlcykge1xuICAgIGlmICghdHlwZXMubGVuZ3RoKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFpdC5kYXRhVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgIGl0LmRhdGFUeXBlcyA9IHR5cGVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgaWYgKCFpbmNsdWRlc1R5cGUoaXQuZGF0YVR5cGVzLCB0KSkge1xuICAgICAgICAgICAgc3RyaWN0VHlwZXNFcnJvcihpdCwgYHR5cGUgXCIke3R9XCIgbm90IGFsbG93ZWQgYnkgY29udGV4dCBcIiR7aXQuZGF0YVR5cGVzLmpvaW4oXCIsXCIpfVwiYCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpdC5kYXRhVHlwZXMgPSBpdC5kYXRhVHlwZXMuZmlsdGVyKCh0KSA9PiBpbmNsdWRlc1R5cGUodHlwZXMsIHQpKTtcbn1cbmZ1bmN0aW9uIGNoZWNrTXVsdGlwbGVUeXBlcyhpdCwgdHMpIHtcbiAgICBpZiAodHMubGVuZ3RoID4gMSAmJiAhKHRzLmxlbmd0aCA9PT0gMiAmJiB0cy5pbmNsdWRlcyhcIm51bGxcIikpKSB7XG4gICAgICAgIHN0cmljdFR5cGVzRXJyb3IoaXQsIFwidXNlIGFsbG93VW5pb25UeXBlcyB0byBhbGxvdyB1bmlvbiB0eXBlIGtleXdvcmRcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tLZXl3b3JkVHlwZXMoaXQsIHRzKSB7XG4gICAgY29uc3QgcnVsZXMgPSBpdC5zZWxmLlJVTEVTLmFsbDtcbiAgICBmb3IgKGNvbnN0IGtleXdvcmQgaW4gcnVsZXMpIHtcbiAgICAgICAgY29uc3QgcnVsZSA9IHJ1bGVzW2tleXdvcmRdO1xuICAgICAgICBpZiAodHlwZW9mIHJ1bGUgPT0gXCJvYmplY3RcIiAmJiAoMCwgYXBwbGljYWJpbGl0eV8xLnNob3VsZFVzZVJ1bGUpKGl0LnNjaGVtYSwgcnVsZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gcnVsZS5kZWZpbml0aW9uO1xuICAgICAgICAgICAgaWYgKHR5cGUubGVuZ3RoICYmICF0eXBlLnNvbWUoKHQpID0+IGhhc0FwcGxpY2FibGVUeXBlKHRzLCB0KSkpIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RUeXBlc0Vycm9yKGl0LCBgbWlzc2luZyB0eXBlIFwiJHt0eXBlLmpvaW4oXCIsXCIpfVwiIGZvciBrZXl3b3JkIFwiJHtrZXl3b3JkfVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBoYXNBcHBsaWNhYmxlVHlwZShzY2hUcywga3dkVCkge1xuICAgIHJldHVybiBzY2hUcy5pbmNsdWRlcyhrd2RUKSB8fCAoa3dkVCA9PT0gXCJudW1iZXJcIiAmJiBzY2hUcy5pbmNsdWRlcyhcImludGVnZXJcIikpO1xufVxuZnVuY3Rpb24gaW5jbHVkZXNUeXBlKHRzLCB0KSB7XG4gICAgcmV0dXJuIHRzLmluY2x1ZGVzKHQpIHx8ICh0ID09PSBcImludGVnZXJcIiAmJiB0cy5pbmNsdWRlcyhcIm51bWJlclwiKSk7XG59XG5mdW5jdGlvbiBzdHJpY3RUeXBlc0Vycm9yKGl0LCBtc2cpIHtcbiAgICBjb25zdCBzY2hlbWFQYXRoID0gaXQuc2NoZW1hRW52LmJhc2VJZCArIGl0LmVyclNjaGVtYVBhdGg7XG4gICAgbXNnICs9IGAgYXQgXCIke3NjaGVtYVBhdGh9XCIgKHN0cmljdFR5cGVzKWA7XG4gICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIGl0Lm9wdHMuc3RyaWN0VHlwZXMpO1xufVxuY2xhc3MgS2V5d29yZEN4dCB7XG4gICAgY29uc3RydWN0b3IoaXQsIGRlZiwga2V5d29yZCkge1xuICAgICAgICAoMCwga2V5d29yZF8xLnZhbGlkYXRlS2V5d29yZFVzYWdlKShpdCwgZGVmLCBrZXl3b3JkKTtcbiAgICAgICAgdGhpcy5nZW4gPSBpdC5nZW47XG4gICAgICAgIHRoaXMuYWxsRXJyb3JzID0gaXQuYWxsRXJyb3JzO1xuICAgICAgICB0aGlzLmtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICB0aGlzLmRhdGEgPSBpdC5kYXRhO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGl0LnNjaGVtYVtrZXl3b3JkXTtcbiAgICAgICAgdGhpcy4kZGF0YSA9IGRlZi4kZGF0YSAmJiBpdC5vcHRzLiRkYXRhICYmIHRoaXMuc2NoZW1hICYmIHRoaXMuc2NoZW1hLiRkYXRhO1xuICAgICAgICB0aGlzLnNjaGVtYVZhbHVlID0gKDAsIHV0aWxfMS5zY2hlbWFSZWZPclZhbCkoaXQsIHRoaXMuc2NoZW1hLCBrZXl3b3JkLCB0aGlzLiRkYXRhKTtcbiAgICAgICAgdGhpcy5zY2hlbWFUeXBlID0gZGVmLnNjaGVtYVR5cGU7XG4gICAgICAgIHRoaXMucGFyZW50U2NoZW1hID0gaXQuc2NoZW1hO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHt9O1xuICAgICAgICB0aGlzLml0ID0gaXQ7XG4gICAgICAgIHRoaXMuZGVmID0gZGVmO1xuICAgICAgICBpZiAodGhpcy4kZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlbWFDb2RlID0gaXQuZ2VuLmNvbnN0KFwidlNjaGVtYVwiLCBnZXREYXRhKHRoaXMuJGRhdGEsIGl0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVtYUNvZGUgPSB0aGlzLnNjaGVtYVZhbHVlO1xuICAgICAgICAgICAgaWYgKCEoMCwga2V5d29yZF8xLnZhbGlkU2NoZW1hVHlwZSkodGhpcy5zY2hlbWEsIGRlZi5zY2hlbWFUeXBlLCBkZWYuYWxsb3dVbmRlZmluZWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2tleXdvcmR9IHZhbHVlIG11c3QgYmUgJHtKU09OLnN0cmluZ2lmeShkZWYuc2NoZW1hVHlwZSl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY29kZVwiIGluIGRlZiA/IGRlZi50cmFja0Vycm9ycyA6IGRlZi5lcnJvcnMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmVycnNDb3VudCA9IGl0Lmdlbi5jb25zdChcIl9lcnJzXCIsIG5hbWVzXzEuZGVmYXVsdC5lcnJvcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdChjb25kaXRpb24sIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5mYWlsUmVzdWx0KCgwLCBjb2RlZ2VuXzEubm90KShjb25kaXRpb24pLCBzdWNjZXNzQWN0aW9uLCBmYWlsQWN0aW9uKTtcbiAgICB9XG4gICAgZmFpbFJlc3VsdChjb25kaXRpb24sIHN1Y2Nlc3NBY3Rpb24sIGZhaWxBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5nZW4uaWYoY29uZGl0aW9uKTtcbiAgICAgICAgaWYgKGZhaWxBY3Rpb24pXG4gICAgICAgICAgICBmYWlsQWN0aW9uKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgaWYgKHN1Y2Nlc3NBY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuLmVsc2UoKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NBY3Rpb24oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICB0aGlzLmdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmVuZElmKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhc3MoY29uZGl0aW9uLCBmYWlsQWN0aW9uKSB7XG4gICAgICAgIHRoaXMuZmFpbFJlc3VsdCgoMCwgY29kZWdlbl8xLm5vdCkoY29uZGl0aW9uKSwgdW5kZWZpbmVkLCBmYWlsQWN0aW9uKTtcbiAgICB9XG4gICAgZmFpbChjb25kaXRpb24pIHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuLmlmKGZhbHNlKTsgLy8gdGhpcyBicmFuY2ggd2lsbCBiZSByZW1vdmVkIGJ5IGdlbi5vcHRpbWl6ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2VuLmlmKGNvbmRpdGlvbik7XG4gICAgICAgIHRoaXMuZXJyb3IoKTtcbiAgICAgICAgaWYgKHRoaXMuYWxsRXJyb3JzKVxuICAgICAgICAgICAgdGhpcy5nZW4uZW5kSWYoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5nZW4uZWxzZSgpO1xuICAgIH1cbiAgICBmYWlsJGRhdGEoY29uZGl0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy4kZGF0YSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZhaWwoY29uZGl0aW9uKTtcbiAgICAgICAgY29uc3QgeyBzY2hlbWFDb2RlIH0gPSB0aGlzO1xuICAgICAgICB0aGlzLmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSAhPT0gdW5kZWZpbmVkICYmICgkeygwLCBjb2RlZ2VuXzEub3IpKHRoaXMuaW52YWxpZCRkYXRhKCksIGNvbmRpdGlvbil9KWApO1xuICAgIH1cbiAgICBlcnJvcihhcHBlbmQsIGVycm9yUGFyYW1zLCBlcnJvclBhdGhzKSB7XG4gICAgICAgIGlmIChlcnJvclBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbXMoZXJyb3JQYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoYXBwZW5kLCBlcnJvclBhdGhzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1zKHt9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lcnJvcihhcHBlbmQsIGVycm9yUGF0aHMpO1xuICAgIH1cbiAgICBfZXJyb3IoYXBwZW5kLCBlcnJvclBhdGhzKSB7XG4gICAgICAgIDtcbiAgICAgICAgKGFwcGVuZCA/IGVycm9yc18xLnJlcG9ydEV4dHJhRXJyb3IgOiBlcnJvcnNfMS5yZXBvcnRFcnJvcikodGhpcywgdGhpcy5kZWYuZXJyb3IsIGVycm9yUGF0aHMpO1xuICAgIH1cbiAgICAkZGF0YUVycm9yKCkge1xuICAgICAgICAoMCwgZXJyb3JzXzEucmVwb3J0RXJyb3IpKHRoaXMsIHRoaXMuZGVmLiRkYXRhRXJyb3IgfHwgZXJyb3JzXzEua2V5d29yZCREYXRhRXJyb3IpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyc0NvdW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZCBcInRyYWNrRXJyb3JzXCIgdG8ga2V5d29yZCBkZWZpbml0aW9uJyk7XG4gICAgICAgICgwLCBlcnJvcnNfMS5yZXNldEVycm9yc0NvdW50KSh0aGlzLmdlbiwgdGhpcy5lcnJzQ291bnQpO1xuICAgIH1cbiAgICBvayhjb25kKSB7XG4gICAgICAgIGlmICghdGhpcy5hbGxFcnJvcnMpXG4gICAgICAgICAgICB0aGlzLmdlbi5pZihjb25kKTtcbiAgICB9XG4gICAgc2V0UGFyYW1zKG9iaiwgYXNzaWduKSB7XG4gICAgICAgIGlmIChhc3NpZ24pXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMucGFyYW1zLCBvYmopO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9IG9iajtcbiAgICB9XG4gICAgYmxvY2skZGF0YSh2YWxpZCwgY29kZUJsb2NrLCAkZGF0YVZhbGlkID0gY29kZWdlbl8xLm5pbCkge1xuICAgICAgICB0aGlzLmdlbi5ibG9jaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrJGRhdGEodmFsaWQsICRkYXRhVmFsaWQpO1xuICAgICAgICAgICAgY29kZUJsb2NrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVjayRkYXRhKHZhbGlkID0gY29kZWdlbl8xLm5pbCwgJGRhdGFWYWxpZCA9IGNvZGVnZW5fMS5uaWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRkYXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hQ29kZSwgc2NoZW1hVHlwZSwgZGVmIH0gPSB0aGlzO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5vcikoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWFDb2RlfSA9PT0gdW5kZWZpbmVkYCwgJGRhdGFWYWxpZCkpO1xuICAgICAgICBpZiAodmFsaWQgIT09IGNvZGVnZW5fMS5uaWwpXG4gICAgICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCB0cnVlKTtcbiAgICAgICAgaWYgKHNjaGVtYVR5cGUubGVuZ3RoIHx8IGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICAgICAgZ2VuLmVsc2VJZih0aGlzLmludmFsaWQkZGF0YSgpKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGFFcnJvcigpO1xuICAgICAgICAgICAgaWYgKHZhbGlkICE9PSBjb2RlZ2VuXzEubmlsKVxuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBnZW4uZWxzZSgpO1xuICAgIH1cbiAgICBpbnZhbGlkJGRhdGEoKSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWFDb2RlLCBzY2hlbWFUeXBlLCBkZWYsIGl0IH0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5vcikod3JvbmckRGF0YVR5cGUoKSwgaW52YWxpZCREYXRhU2NoZW1hKCkpO1xuICAgICAgICBmdW5jdGlvbiB3cm9uZyREYXRhVHlwZSgpIHtcbiAgICAgICAgICAgIGlmIChzY2hlbWFUeXBlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgICAgIGlmICghKHNjaGVtYUNvZGUgaW5zdGFuY2VvZiBjb2RlZ2VuXzEuTmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdiBpbXBsZW1lbnRhdGlvbiBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hVHlwZSkgPyBzY2hlbWFUeXBlIDogW3NjaGVtYVR5cGVdO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBkYXRhVHlwZV8yLmNoZWNrRGF0YVR5cGVzKShzdCwgc2NoZW1hQ29kZSwgaXQub3B0cy5zdHJpY3ROdW1iZXJzLCBkYXRhVHlwZV8yLkRhdGFUeXBlLldyb25nKX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaW52YWxpZCREYXRhU2NoZW1hKCkge1xuICAgICAgICAgICAgaWYgKGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRlU2NoZW1hUmVmID0gZ2VuLnNjb3BlVmFsdWUoXCJ2YWxpZGF0ZSRkYXRhXCIsIHsgcmVmOiBkZWYudmFsaWRhdGVTY2hlbWEgfSk7IC8vIFRPRE8gdmFsdWUuY29kZSBmb3Igc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAhJHt2YWxpZGF0ZVNjaGVtYVJlZn0oJHtzY2hlbWFDb2RlfSlgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvZGVnZW5fMS5uaWw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3Vic2NoZW1hKGFwcGwsIHZhbGlkKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjaGVtYSA9ICgwLCBzdWJzY2hlbWFfMS5nZXRTdWJzY2hlbWEpKHRoaXMuaXQsIGFwcGwpO1xuICAgICAgICAoMCwgc3Vic2NoZW1hXzEuZXh0ZW5kU3Vic2NoZW1hRGF0YSkoc3Vic2NoZW1hLCB0aGlzLml0LCBhcHBsKTtcbiAgICAgICAgKDAsIHN1YnNjaGVtYV8xLmV4dGVuZFN1YnNjaGVtYU1vZGUpKHN1YnNjaGVtYSwgYXBwbCk7XG4gICAgICAgIGNvbnN0IG5leHRDb250ZXh0ID0geyAuLi50aGlzLml0LCAuLi5zdWJzY2hlbWEsIGl0ZW1zOiB1bmRlZmluZWQsIHByb3BzOiB1bmRlZmluZWQgfTtcbiAgICAgICAgc3Vic2NoZW1hQ29kZShuZXh0Q29udGV4dCwgdmFsaWQpO1xuICAgICAgICByZXR1cm4gbmV4dENvbnRleHQ7XG4gICAgfVxuICAgIG1lcmdlRXZhbHVhdGVkKHNjaGVtYUN4dCwgdG9OYW1lKSB7XG4gICAgICAgIGNvbnN0IHsgaXQsIGdlbiB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFpdC5vcHRzLnVuZXZhbHVhdGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUgJiYgc2NoZW1hQ3h0LnByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgc2NoZW1hQ3h0LnByb3BzLCBpdC5wcm9wcywgdG9OYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQuaXRlbXMgIT09IHRydWUgJiYgc2NoZW1hQ3h0Lml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGl0Lml0ZW1zID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLml0ZW1zKGdlbiwgc2NoZW1hQ3h0Lml0ZW1zLCBpdC5pdGVtcywgdG9OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtZXJnZVZhbGlkRXZhbHVhdGVkKHNjaGVtYUN4dCwgdmFsaWQpIHtcbiAgICAgICAgY29uc3QgeyBpdCwgZ2VuIH0gPSB0aGlzO1xuICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiAoaXQucHJvcHMgIT09IHRydWUgfHwgaXQuaXRlbXMgIT09IHRydWUpKSB7XG4gICAgICAgICAgICBnZW4uaWYodmFsaWQsICgpID0+IHRoaXMubWVyZ2VFdmFsdWF0ZWQoc2NoZW1hQ3h0LCBjb2RlZ2VuXzEuTmFtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLktleXdvcmRDeHQgPSBLZXl3b3JkQ3h0O1xuZnVuY3Rpb24ga2V5d29yZENvZGUoaXQsIGtleXdvcmQsIGRlZiwgcnVsZVR5cGUpIHtcbiAgICBjb25zdCBjeHQgPSBuZXcgS2V5d29yZEN4dChpdCwgZGVmLCBrZXl3b3JkKTtcbiAgICBpZiAoXCJjb2RlXCIgaW4gZGVmKSB7XG4gICAgICAgIGRlZi5jb2RlKGN4dCwgcnVsZVR5cGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjeHQuJGRhdGEgJiYgZGVmLnZhbGlkYXRlKSB7XG4gICAgICAgICgwLCBrZXl3b3JkXzEuZnVuY0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKFwibWFjcm9cIiBpbiBkZWYpIHtcbiAgICAgICAgKDAsIGtleXdvcmRfMS5tYWNyb0tleXdvcmRDb2RlKShjeHQsIGRlZik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRlZi5jb21waWxlIHx8IGRlZi52YWxpZGF0ZSkge1xuICAgICAgICAoMCwga2V5d29yZF8xLmZ1bmNLZXl3b3JkQ29kZSkoY3h0LCBkZWYpO1xuICAgIH1cbn1cbmNvbnN0IEpTT05fUE9JTlRFUiA9IC9eXFwvKD86W15+XXx+MHx+MSkqJC87XG5jb25zdCBSRUxBVElWRV9KU09OX1BPSU5URVIgPSAvXihbMC05XSspKCN8XFwvKD86W15+XXx+MHx+MSkqKT8kLztcbmZ1bmN0aW9uIGdldERhdGEoJGRhdGEsIHsgZGF0YUxldmVsLCBkYXRhTmFtZXMsIGRhdGFQYXRoQXJyIH0pIHtcbiAgICBsZXQganNvblBvaW50ZXI7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKCRkYXRhID09PSBcIlwiKVxuICAgICAgICByZXR1cm4gbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhO1xuICAgIGlmICgkZGF0YVswXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgaWYgKCFKU09OX1BPSU5URVIudGVzdCgkZGF0YSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgSlNPTi1wb2ludGVyOiAkeyRkYXRhfWApO1xuICAgICAgICBqc29uUG9pbnRlciA9ICRkYXRhO1xuICAgICAgICBkYXRhID0gbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFJFTEFUSVZFX0pTT05fUE9JTlRFUi5leGVjKCRkYXRhKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEpTT04tcG9pbnRlcjogJHskZGF0YX1gKTtcbiAgICAgICAgY29uc3QgdXAgPSArbWF0Y2hlc1sxXTtcbiAgICAgICAganNvblBvaW50ZXIgPSBtYXRjaGVzWzJdO1xuICAgICAgICBpZiAoanNvblBvaW50ZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAodXAgPj0gZGF0YUxldmVsKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyhcInByb3BlcnR5L2luZGV4XCIsIHVwKSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVBhdGhBcnJbZGF0YUxldmVsIC0gdXBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cCA+IGRhdGFMZXZlbClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyhcImRhdGFcIiwgdXApKTtcbiAgICAgICAgZGF0YSA9IGRhdGFOYW1lc1tkYXRhTGV2ZWwgLSB1cF07XG4gICAgICAgIGlmICghanNvblBvaW50ZXIpXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgbGV0IGV4cHIgPSBkYXRhO1xuICAgIGNvbnN0IHNlZ21lbnRzID0ganNvblBvaW50ZXIuc3BsaXQoXCIvXCIpO1xuICAgIGZvciAoY29uc3Qgc2VnbWVudCBvZiBzZWdtZW50cykge1xuICAgICAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICAgICAgZGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKCgwLCB1dGlsXzEudW5lc2NhcGVKc29uUG9pbnRlcikoc2VnbWVudCkpfWA7XG4gICAgICAgICAgICBleHByID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtleHByfSAmJiAke2RhdGF9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXhwcjtcbiAgICBmdW5jdGlvbiBlcnJvck1zZyhwb2ludGVyVHlwZSwgdXApIHtcbiAgICAgICAgcmV0dXJuIGBDYW5ub3QgYWNjZXNzICR7cG9pbnRlclR5cGV9ICR7dXB9IGxldmVscyB1cCwgY3VycmVudCBsZXZlbCBpcyAke2RhdGFMZXZlbH1gO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RGF0YSA9IGdldERhdGE7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVLZXl3b3JkVXNhZ2UgPSBleHBvcnRzLnZhbGlkU2NoZW1hVHlwZSA9IGV4cG9ydHMuZnVuY0tleXdvcmRDb2RlID0gZXhwb3J0cy5tYWNyb0tleXdvcmRDb2RlID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL25hbWVzXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uLy4uL3ZvY2FidWxhcmllcy9jb2RlXCIpO1xuY29uc3QgZXJyb3JzXzEgPSByZXF1aXJlKFwiLi4vZXJyb3JzXCIpO1xuZnVuY3Rpb24gbWFjcm9LZXl3b3JkQ29kZShjeHQsIGRlZikge1xuICAgIGNvbnN0IHsgZ2VuLCBrZXl3b3JkLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICBjb25zdCBtYWNyb1NjaGVtYSA9IGRlZi5tYWNyby5jYWxsKGl0LnNlbGYsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBpdCk7XG4gICAgY29uc3Qgc2NoZW1hUmVmID0gdXNlS2V5d29yZChnZW4sIGtleXdvcmQsIG1hY3JvU2NoZW1hKTtcbiAgICBpZiAoaXQub3B0cy52YWxpZGF0ZVNjaGVtYSAhPT0gZmFsc2UpXG4gICAgICAgIGl0LnNlbGYudmFsaWRhdGVTY2hlbWEobWFjcm9TY2hlbWEsIHRydWUpO1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgc2NoZW1hOiBtYWNyb1NjaGVtYSxcbiAgICAgICAgc2NoZW1hUGF0aDogY29kZWdlbl8xLm5pbCxcbiAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWAsXG4gICAgICAgIHRvcFNjaGVtYVJlZjogc2NoZW1hUmVmLFxuICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgIH0sIHZhbGlkKTtcbiAgICBjeHQucGFzcyh2YWxpZCwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbn1cbmV4cG9ydHMubWFjcm9LZXl3b3JkQ29kZSA9IG1hY3JvS2V5d29yZENvZGU7XG5mdW5jdGlvbiBmdW5jS2V5d29yZENvZGUoY3h0LCBkZWYpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgeyBnZW4sIGtleXdvcmQsIHNjaGVtYSwgcGFyZW50U2NoZW1hLCAkZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBjaGVja0FzeW5jS2V5d29yZChpdCwgZGVmKTtcbiAgICBjb25zdCB2YWxpZGF0ZSA9ICEkZGF0YSAmJiBkZWYuY29tcGlsZSA/IGRlZi5jb21waWxlLmNhbGwoaXQuc2VsZiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0KSA6IGRlZi52YWxpZGF0ZTtcbiAgICBjb25zdCB2YWxpZGF0ZVJlZiA9IHVzZUtleXdvcmQoZ2VuLCBrZXl3b3JkLCB2YWxpZGF0ZSk7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIHZhbGlkYXRlS2V5d29yZCk7XG4gICAgY3h0Lm9rKChfYSA9IGRlZi52YWxpZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsaWQpO1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlS2V5d29yZCgpIHtcbiAgICAgICAgaWYgKGRlZi5lcnJvcnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhc3NpZ25WYWxpZCgpO1xuICAgICAgICAgICAgaWYgKGRlZi5tb2RpZnlpbmcpXG4gICAgICAgICAgICAgICAgbW9kaWZ5RGF0YShjeHQpO1xuICAgICAgICAgICAgcmVwb3J0RXJycygoKSA9PiBjeHQuZXJyb3IoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBydWxlRXJycyA9IGRlZi5hc3luYyA/IHZhbGlkYXRlQXN5bmMoKSA6IHZhbGlkYXRlU3luYygpO1xuICAgICAgICAgICAgaWYgKGRlZi5tb2RpZnlpbmcpXG4gICAgICAgICAgICAgICAgbW9kaWZ5RGF0YShjeHQpO1xuICAgICAgICAgICAgcmVwb3J0RXJycygoKSA9PiBhZGRFcnJzKGN4dCwgcnVsZUVycnMpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUFzeW5jKCkge1xuICAgICAgICBjb25zdCBydWxlRXJycyA9IGdlbi5sZXQoXCJydWxlRXJyc1wiLCBudWxsKTtcbiAgICAgICAgZ2VuLnRyeSgoKSA9PiBhc3NpZ25WYWxpZCgoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCBgKSwgKGUpID0+IGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5pZigoMCwgY29kZWdlbl8xLl8pIGAke2V9IGluc3RhbmNlb2YgJHtpdC5WYWxpZGF0aW9uRXJyb3J9YCwgKCkgPT4gZ2VuLmFzc2lnbihydWxlRXJycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtlfS5lcnJvcnNgKSwgKCkgPT4gZ2VuLnRocm93KGUpKSk7XG4gICAgICAgIHJldHVybiBydWxlRXJycztcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTeW5jKCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUVycnMgPSAoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkYXRlUmVmfS5lcnJvcnNgO1xuICAgICAgICBnZW4uYXNzaWduKHZhbGlkYXRlRXJycywgbnVsbCk7XG4gICAgICAgIGFzc2lnblZhbGlkKGNvZGVnZW5fMS5uaWwpO1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVFcnJzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhc3NpZ25WYWxpZChfYXdhaXQgPSBkZWYuYXN5bmMgPyAoMCwgY29kZWdlbl8xLl8pIGBhd2FpdCBgIDogY29kZWdlbl8xLm5pbCkge1xuICAgICAgICBjb25zdCBwYXNzQ3h0ID0gaXQub3B0cy5wYXNzQ29udGV4dCA/IG5hbWVzXzEuZGVmYXVsdC50aGlzIDogbmFtZXNfMS5kZWZhdWx0LnNlbGY7XG4gICAgICAgIGNvbnN0IHBhc3NTY2hlbWEgPSAhKChcImNvbXBpbGVcIiBpbiBkZWYgJiYgISRkYXRhKSB8fCBkZWYuc2NoZW1hID09PSBmYWxzZSk7XG4gICAgICAgIGdlbi5hc3NpZ24odmFsaWQsICgwLCBjb2RlZ2VuXzEuXykgYCR7X2F3YWl0fSR7KDAsIGNvZGVfMS5jYWxsVmFsaWRhdGVDb2RlKShjeHQsIHZhbGlkYXRlUmVmLCBwYXNzQ3h0LCBwYXNzU2NoZW1hKX1gLCBkZWYubW9kaWZ5aW5nKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwb3J0RXJycyhlcnJvcnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKChfYSA9IGRlZi52YWxpZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdmFsaWQpLCBlcnJvcnMpO1xuICAgIH1cbn1cbmV4cG9ydHMuZnVuY0tleXdvcmRDb2RlID0gZnVuY0tleXdvcmRDb2RlO1xuZnVuY3Rpb24gbW9kaWZ5RGF0YShjeHQpIHtcbiAgICBjb25zdCB7IGdlbiwgZGF0YSwgaXQgfSA9IGN4dDtcbiAgICBnZW4uaWYoaXQucGFyZW50RGF0YSwgKCkgPT4gZ2VuLmFzc2lnbihkYXRhLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0LnBhcmVudERhdGF9WyR7aXQucGFyZW50RGF0YVByb3BlcnR5fV1gKSk7XG59XG5mdW5jdGlvbiBhZGRFcnJzKGN4dCwgZXJycykge1xuICAgIGNvbnN0IHsgZ2VuIH0gPSBjeHQ7XG4gICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYEFycmF5LmlzQXJyYXkoJHtlcnJzfSlgLCAoKSA9PiB7XG4gICAgICAgIGdlblxuICAgICAgICAgICAgLmFzc2lnbihuYW1lc18xLmRlZmF1bHQudkVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30gPT09IG51bGwgPyAke2VycnN9IDogJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30uY29uY2F0KCR7ZXJyc30pYClcbiAgICAgICAgICAgIC5hc3NpZ24obmFtZXNfMS5kZWZhdWx0LmVycm9ycywgKDAsIGNvZGVnZW5fMS5fKSBgJHtuYW1lc18xLmRlZmF1bHQudkVycm9yc30ubGVuZ3RoYCk7XG4gICAgICAgICgwLCBlcnJvcnNfMS5leHRlbmRFcnJvcnMpKGN4dCk7XG4gICAgfSwgKCkgPT4gY3h0LmVycm9yKCkpO1xufVxuZnVuY3Rpb24gY2hlY2tBc3luY0tleXdvcmQoeyBzY2hlbWFFbnYgfSwgZGVmKSB7XG4gICAgaWYgKGRlZi5hc3luYyAmJiAhc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXN5bmMga2V5d29yZCBpbiBzeW5jIHNjaGVtYVwiKTtcbn1cbmZ1bmN0aW9uIHVzZUtleXdvcmQoZ2VuLCBrZXl3b3JkLCByZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihga2V5d29yZCBcIiR7a2V5d29yZH1cIiBmYWlsZWQgdG8gY29tcGlsZWApO1xuICAgIHJldHVybiBnZW4uc2NvcGVWYWx1ZShcImtleXdvcmRcIiwgdHlwZW9mIHJlc3VsdCA9PSBcImZ1bmN0aW9uXCIgPyB7IHJlZjogcmVzdWx0IH0gOiB7IHJlZjogcmVzdWx0LCBjb2RlOiAoMCwgY29kZWdlbl8xLnN0cmluZ2lmeSkocmVzdWx0KSB9KTtcbn1cbmZ1bmN0aW9uIHZhbGlkU2NoZW1hVHlwZShzY2hlbWEsIHNjaGVtYVR5cGUsIGFsbG93VW5kZWZpbmVkID0gZmFsc2UpIHtcbiAgICAvLyBUT0RPIGFkZCB0ZXN0c1xuICAgIHJldHVybiAoIXNjaGVtYVR5cGUubGVuZ3RoIHx8XG4gICAgICAgIHNjaGVtYVR5cGUuc29tZSgoc3QpID0+IHN0ID09PSBcImFycmF5XCJcbiAgICAgICAgICAgID8gQXJyYXkuaXNBcnJheShzY2hlbWEpXG4gICAgICAgICAgICA6IHN0ID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICAgICAgPyBzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSlcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBzY2hlbWEgPT0gc3QgfHwgKGFsbG93VW5kZWZpbmVkICYmIHR5cGVvZiBzY2hlbWEgPT0gXCJ1bmRlZmluZWRcIikpKTtcbn1cbmV4cG9ydHMudmFsaWRTY2hlbWFUeXBlID0gdmFsaWRTY2hlbWFUeXBlO1xuZnVuY3Rpb24gdmFsaWRhdGVLZXl3b3JkVXNhZ2UoeyBzY2hlbWEsIG9wdHMsIHNlbGYsIGVyclNjaGVtYVBhdGggfSwgZGVmLCBrZXl3b3JkKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVmLmtleXdvcmQpID8gIWRlZi5rZXl3b3JkLmluY2x1ZGVzKGtleXdvcmQpIDogZGVmLmtleXdvcmQgIT09IGtleXdvcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIH1cbiAgICBjb25zdCBkZXBzID0gZGVmLmRlcGVuZGVuY2llcztcbiAgICBpZiAoZGVwcyA9PT0gbnVsbCB8fCBkZXBzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZXBzLnNvbWUoKGt3ZCkgPT4gIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzY2hlbWEsIGt3ZCkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgcGFyZW50IHNjaGVtYSBtdXN0IGhhdmUgZGVwZW5kZW5jaWVzIG9mICR7a2V5d29yZH06ICR7ZGVwcy5qb2luKFwiLFwiKX1gKTtcbiAgICB9XG4gICAgaWYgKGRlZi52YWxpZGF0ZVNjaGVtYSkge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGRlZi52YWxpZGF0ZVNjaGVtYShzY2hlbWFba2V5d29yZF0pO1xuICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBga2V5d29yZCBcIiR7a2V5d29yZH1cIiB2YWx1ZSBpcyBpbnZhbGlkIGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCI6IGAgK1xuICAgICAgICAgICAgICAgIHNlbGYuZXJyb3JzVGV4dChkZWYudmFsaWRhdGVTY2hlbWEuZXJyb3JzKTtcbiAgICAgICAgICAgIGlmIChvcHRzLnZhbGlkYXRlU2NoZW1hID09PSBcImxvZ1wiKVxuICAgICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmVycm9yKG1zZyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlS2V5d29yZFVzYWdlID0gdmFsaWRhdGVLZXl3b3JkVXNhZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXl3b3JkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFNb2RlID0gZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFEYXRhID0gZXhwb3J0cy5nZXRTdWJzY2hlbWEgPSB2b2lkIDA7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuZnVuY3Rpb24gZ2V0U3Vic2NoZW1hKGl0LCB7IGtleXdvcmQsIHNjaGVtYVByb3AsIHNjaGVtYSwgc2NoZW1hUGF0aCwgZXJyU2NoZW1hUGF0aCwgdG9wU2NoZW1hUmVmIH0pIHtcbiAgICBpZiAoa2V5d29yZCAhPT0gdW5kZWZpbmVkICYmIHNjaGVtYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYm90aCBcImtleXdvcmRcIiBhbmQgXCJzY2hlbWFcIiBwYXNzZWQsIG9ubHkgb25lIGFsbG93ZWQnKTtcbiAgICB9XG4gICAgaWYgKGtleXdvcmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBzY2ggPSBpdC5zY2hlbWFba2V5d29yZF07XG4gICAgICAgIHJldHVybiBzY2hlbWFQcm9wID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6ICgwLCBjb2RlZ2VuXzEuXykgYCR7aXQuc2NoZW1hUGF0aH0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKGtleXdvcmQpfWAsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfWAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHNjaFtzY2hlbWFQcm9wXSxcbiAgICAgICAgICAgICAgICBzY2hlbWFQYXRoOiAoMCwgY29kZWdlbl8xLl8pIGAke2l0LnNjaGVtYVBhdGh9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShrZXl3b3JkKX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHNjaGVtYVByb3ApfWAsXG4gICAgICAgICAgICAgICAgZXJyU2NoZW1hUGF0aDogYCR7aXQuZXJyU2NoZW1hUGF0aH0vJHtrZXl3b3JkfS8keygwLCB1dGlsXzEuZXNjYXBlRnJhZ21lbnQpKHNjaGVtYVByb3ApfWAsXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoc2NoZW1hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNjaGVtYVBhdGggPT09IHVuZGVmaW5lZCB8fCBlcnJTY2hlbWFQYXRoID09PSB1bmRlZmluZWQgfHwgdG9wU2NoZW1hUmVmID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJzY2hlbWFQYXRoXCIsIFwiZXJyU2NoZW1hUGF0aFwiIGFuZCBcInRvcFNjaGVtYVJlZlwiIGFyZSByZXF1aXJlZCB3aXRoIFwic2NoZW1hXCInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgc2NoZW1hUGF0aCxcbiAgICAgICAgICAgIHRvcFNjaGVtYVJlZixcbiAgICAgICAgICAgIGVyclNjaGVtYVBhdGgsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignZWl0aGVyIFwia2V5d29yZFwiIG9yIFwic2NoZW1hXCIgbXVzdCBiZSBwYXNzZWQnKTtcbn1cbmV4cG9ydHMuZ2V0U3Vic2NoZW1hID0gZ2V0U3Vic2NoZW1hO1xuZnVuY3Rpb24gZXh0ZW5kU3Vic2NoZW1hRGF0YShzdWJzY2hlbWEsIGl0LCB7IGRhdGFQcm9wLCBkYXRhUHJvcFR5cGU6IGRwVHlwZSwgZGF0YSwgZGF0YVR5cGVzLCBwcm9wZXJ0eU5hbWUgfSkge1xuICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YVByb3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JvdGggXCJkYXRhXCIgYW5kIFwiZGF0YVByb3BcIiBwYXNzZWQsIG9ubHkgb25lIGFsbG93ZWQnKTtcbiAgICB9XG4gICAgY29uc3QgeyBnZW4gfSA9IGl0O1xuICAgIGlmIChkYXRhUHJvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHsgZXJyb3JQYXRoLCBkYXRhUGF0aEFyciwgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IG5leHREYXRhID0gZ2VuLmxldChcImRhdGFcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtpdC5kYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkoZGF0YVByb3ApfWAsIHRydWUpO1xuICAgICAgICBkYXRhQ29udGV4dFByb3BzKG5leHREYXRhKTtcbiAgICAgICAgc3Vic2NoZW1hLmVycm9yUGF0aCA9ICgwLCBjb2RlZ2VuXzEuc3RyKSBgJHtlcnJvclBhdGh9JHsoMCwgdXRpbF8xLmdldEVycm9yUGF0aCkoZGF0YVByb3AsIGRwVHlwZSwgb3B0cy5qc1Byb3BlcnR5U3ludGF4KX1gO1xuICAgICAgICBzdWJzY2hlbWEucGFyZW50RGF0YVByb3BlcnR5ID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhUHJvcH1gO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YVBhdGhBcnIgPSBbLi4uZGF0YVBhdGhBcnIsIHN1YnNjaGVtYS5wYXJlbnREYXRhUHJvcGVydHldO1xuICAgIH1cbiAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IG5leHREYXRhID0gZGF0YSBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lID8gZGF0YSA6IGdlbi5sZXQoXCJkYXRhXCIsIGRhdGEsIHRydWUpOyAvLyByZXBsYWNlYWJsZSBpZiB1c2VkIG9uY2U/XG4gICAgICAgIGRhdGFDb250ZXh0UHJvcHMobmV4dERhdGEpO1xuICAgICAgICBpZiAocHJvcGVydHlOYW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzdWJzY2hlbWEucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAvLyBUT0RPIHNvbWV0aGluZyBpcyBwb3NzaWJseSB3cm9uZyBoZXJlIHdpdGggbm90IGNoYW5naW5nIHBhcmVudERhdGFQcm9wZXJ0eSBhbmQgbm90IGFwcGVuZGluZyBkYXRhUGF0aEFyclxuICAgIH1cbiAgICBpZiAoZGF0YVR5cGVzKVxuICAgICAgICBzdWJzY2hlbWEuZGF0YVR5cGVzID0gZGF0YVR5cGVzO1xuICAgIGZ1bmN0aW9uIGRhdGFDb250ZXh0UHJvcHMoX25leHREYXRhKSB7XG4gICAgICAgIHN1YnNjaGVtYS5kYXRhID0gX25leHREYXRhO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YUxldmVsID0gaXQuZGF0YUxldmVsICsgMTtcbiAgICAgICAgc3Vic2NoZW1hLmRhdGFUeXBlcyA9IFtdO1xuICAgICAgICBpdC5kZWZpbmVkUHJvcGVydGllcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgc3Vic2NoZW1hLnBhcmVudERhdGEgPSBpdC5kYXRhO1xuICAgICAgICBzdWJzY2hlbWEuZGF0YU5hbWVzID0gWy4uLml0LmRhdGFOYW1lcywgX25leHREYXRhXTtcbiAgICB9XG59XG5leHBvcnRzLmV4dGVuZFN1YnNjaGVtYURhdGEgPSBleHRlbmRTdWJzY2hlbWFEYXRhO1xuZnVuY3Rpb24gZXh0ZW5kU3Vic2NoZW1hTW9kZShzdWJzY2hlbWEsIHsganRkRGlzY3JpbWluYXRvciwganRkTWV0YWRhdGEsIGNvbXBvc2l0ZVJ1bGUsIGNyZWF0ZUVycm9ycywgYWxsRXJyb3JzIH0pIHtcbiAgICBpZiAoY29tcG9zaXRlUnVsZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuY29tcG9zaXRlUnVsZSA9IGNvbXBvc2l0ZVJ1bGU7XG4gICAgaWYgKGNyZWF0ZUVycm9ycyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBzdWJzY2hlbWEuY3JlYXRlRXJyb3JzID0gY3JlYXRlRXJyb3JzO1xuICAgIGlmIChhbGxFcnJvcnMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgc3Vic2NoZW1hLmFsbEVycm9ycyA9IGFsbEVycm9ycztcbiAgICBzdWJzY2hlbWEuanRkRGlzY3JpbWluYXRvciA9IGp0ZERpc2NyaW1pbmF0b3I7IC8vIG5vdCBpbmhlcml0ZWRcbiAgICBzdWJzY2hlbWEuanRkTWV0YWRhdGEgPSBqdGRNZXRhZGF0YTsgLy8gbm90IGluaGVyaXRlZFxufVxuZXhwb3J0cy5leHRlbmRTdWJzY2hlbWFNb2RlID0gZXh0ZW5kU3Vic2NoZW1hTW9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjaGVtYS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29kZUdlbiA9IGV4cG9ydHMuTmFtZSA9IGV4cG9ydHMubmlsID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBleHBvcnRzLnN0ciA9IGV4cG9ydHMuXyA9IGV4cG9ydHMuS2V5d29yZEN4dCA9IHZvaWQgMDtcbnZhciB2YWxpZGF0ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS92YWxpZGF0ZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIktleXdvcmRDeHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRlXzEuS2V5d29yZEN4dDsgfSB9KTtcbnZhciBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL2NvZGVnZW5cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb2RlZ2VuXzEuXzsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0clwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInN0cmluZ2lmeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLnN0cmluZ2lmeTsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5pbFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLm5pbDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5hbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvZGVnZW5fMS5OYW1lOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQ29kZUdlblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29kZWdlbl8xLkNvZGVHZW47IH0gfSk7XG5jb25zdCB2YWxpZGF0aW9uX2Vycm9yXzEgPSByZXF1aXJlKFwiLi9ydW50aW1lL3ZhbGlkYXRpb25fZXJyb3JcIik7XG5jb25zdCByZWZfZXJyb3JfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvcmVmX2Vycm9yXCIpO1xuY29uc3QgcnVsZXNfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvcnVsZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi9jb21waWxlXCIpO1xuY29uc3QgY29kZWdlbl8yID0gcmVxdWlyZShcIi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgcmVzb2x2ZV8xID0gcmVxdWlyZShcIi4vY29tcGlsZS9yZXNvbHZlXCIpO1xuY29uc3QgZGF0YVR5cGVfMSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUvdmFsaWRhdGUvZGF0YVR5cGVcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCAkZGF0YVJlZlNjaGVtYSA9IHJlcXVpcmUoXCIuL3JlZnMvZGF0YS5qc29uXCIpO1xuY29uc3QgTUVUQV9JR05PUkVfT1BUSU9OUyA9IFtcInJlbW92ZUFkZGl0aW9uYWxcIiwgXCJ1c2VEZWZhdWx0c1wiLCBcImNvZXJjZVR5cGVzXCJdO1xuY29uc3QgRVhUX1NDT1BFX05BTUVTID0gbmV3IFNldChbXG4gICAgXCJ2YWxpZGF0ZVwiLFxuICAgIFwic2VyaWFsaXplXCIsXG4gICAgXCJwYXJzZVwiLFxuICAgIFwid3JhcHBlclwiLFxuICAgIFwicm9vdFwiLFxuICAgIFwic2NoZW1hXCIsXG4gICAgXCJrZXl3b3JkXCIsXG4gICAgXCJwYXR0ZXJuXCIsXG4gICAgXCJmb3JtYXRzXCIsXG4gICAgXCJ2YWxpZGF0ZSRkYXRhXCIsXG4gICAgXCJmdW5jXCIsXG4gICAgXCJvYmpcIixcbiAgICBcIkVycm9yXCIsXG5dKTtcbmNvbnN0IHJlbW92ZWRPcHRpb25zID0ge1xuICAgIGVycm9yRGF0YVBhdGg6IFwiXCIsXG4gICAgZm9ybWF0OiBcImB2YWxpZGF0ZUZvcm1hdHM6IGZhbHNlYCBjYW4gYmUgdXNlZCBpbnN0ZWFkLlwiLFxuICAgIG51bGxhYmxlOiAnXCJudWxsYWJsZVwiIGtleXdvcmQgaXMgc3VwcG9ydGVkIGJ5IGRlZmF1bHQuJyxcbiAgICBqc29uUG9pbnRlcnM6IFwiRGVwcmVjYXRlZCBqc1Byb3BlcnR5U3ludGF4IGNhbiBiZSB1c2VkIGluc3RlYWQuXCIsXG4gICAgZXh0ZW5kUmVmczogXCJEZXByZWNhdGVkIGlnbm9yZUtleXdvcmRzV2l0aFJlZiBjYW4gYmUgdXNlZCBpbnN0ZWFkLlwiLFxuICAgIG1pc3NpbmdSZWZzOiBcIlBhc3MgZW1wdHkgc2NoZW1hIHdpdGggJGlkIHRoYXQgc2hvdWxkIGJlIGlnbm9yZWQgdG8gYWp2LmFkZFNjaGVtYS5cIixcbiAgICBwcm9jZXNzQ29kZTogXCJVc2Ugb3B0aW9uIGBjb2RlOiB7cHJvY2VzczogKGNvZGUsIHNjaGVtYUVudjogb2JqZWN0KSA9PiBzdHJpbmd9YFwiLFxuICAgIHNvdXJjZUNvZGU6IFwiVXNlIG9wdGlvbiBgY29kZToge3NvdXJjZTogdHJ1ZX1gXCIsXG4gICAgc3RyaWN0RGVmYXVsdHM6IFwiSXQgaXMgZGVmYXVsdCBub3csIHNlZSBvcHRpb24gYHN0cmljdGAuXCIsXG4gICAgc3RyaWN0S2V5d29yZHM6IFwiSXQgaXMgZGVmYXVsdCBub3csIHNlZSBvcHRpb24gYHN0cmljdGAuXCIsXG4gICAgdW5pcXVlSXRlbXM6ICdcInVuaXF1ZUl0ZW1zXCIga2V5d29yZCBpcyBhbHdheXMgdmFsaWRhdGVkLicsXG4gICAgdW5rbm93bkZvcm1hdHM6IFwiRGlzYWJsZSBzdHJpY3QgbW9kZSBvciBwYXNzIGB0cnVlYCB0byBgYWp2LmFkZEZvcm1hdGAgKG9yIGBmb3JtYXRzYCBvcHRpb24pLlwiLFxuICAgIGNhY2hlOiBcIk1hcCBpcyB1c2VkIGFzIGNhY2hlLCBzY2hlbWEgb2JqZWN0IGFzIGtleS5cIixcbiAgICBzZXJpYWxpemU6IFwiTWFwIGlzIHVzZWQgYXMgY2FjaGUsIHNjaGVtYSBvYmplY3QgYXMga2V5LlwiLFxuICAgIGFqdkVycm9yczogXCJJdCBpcyBkZWZhdWx0IG5vdy5cIixcbn07XG5jb25zdCBkZXByZWNhdGVkT3B0aW9ucyA9IHtcbiAgICBpZ25vcmVLZXl3b3Jkc1dpdGhSZWY6IFwiXCIsXG4gICAganNQcm9wZXJ0eVN5bnRheDogXCJcIixcbiAgICB1bmljb2RlOiAnXCJtaW5MZW5ndGhcIi9cIm1heExlbmd0aFwiIGFjY291bnQgZm9yIHVuaWNvZGUgY2hhcmFjdGVycyBieSBkZWZhdWx0LicsXG59O1xuY29uc3QgTUFYX0VYUFJFU1NJT04gPSAyMDA7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gcmVxdWlyZWRPcHRpb25zKG8pIHtcbiAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdCwgX3UsIF92LCBfdywgX3g7XG4gICAgY29uc3QgcyA9IG8uc3RyaWN0O1xuICAgIGNvbnN0IF9vcHR6ID0gKF9hID0gby5jb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3B0aW1pemU7XG4gICAgY29uc3Qgb3B0aW1pemUgPSBfb3B0eiA9PT0gdHJ1ZSB8fCBfb3B0eiA9PT0gdW5kZWZpbmVkID8gMSA6IF9vcHR6IHx8IDA7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RyaWN0U2NoZW1hOiAoX2MgPSAoX2IgPSBvLnN0cmljdFNjaGVtYSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogcykgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogdHJ1ZSxcbiAgICAgICAgc3RyaWN0TnVtYmVyczogKF9lID0gKF9kID0gby5zdHJpY3ROdW1iZXJzKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiBzKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiB0cnVlLFxuICAgICAgICBzdHJpY3RUeXBlczogKF9nID0gKF9mID0gby5zdHJpY3RUeXBlcykgIT09IG51bGwgJiYgX2YgIT09IHZvaWQgMCA/IF9mIDogcykgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogXCJsb2dcIixcbiAgICAgICAgc3RyaWN0VHVwbGVzOiAoX2ogPSAoX2ggPSBvLnN0cmljdFR1cGxlcykgIT09IG51bGwgJiYgX2ggIT09IHZvaWQgMCA/IF9oIDogcykgIT09IG51bGwgJiYgX2ogIT09IHZvaWQgMCA/IF9qIDogXCJsb2dcIixcbiAgICAgICAgc3RyaWN0UmVxdWlyZWQ6IChfbCA9IChfayA9IG8uc3RyaWN0UmVxdWlyZWQpICE9PSBudWxsICYmIF9rICE9PSB2b2lkIDAgPyBfayA6IHMpICE9PSBudWxsICYmIF9sICE9PSB2b2lkIDAgPyBfbCA6IGZhbHNlLFxuICAgICAgICBjb2RlOiBvLmNvZGUgPyB7IC4uLm8uY29kZSwgb3B0aW1pemUgfSA6IHsgb3B0aW1pemUgfSxcbiAgICAgICAgbG9vcFJlcXVpcmVkOiAoX20gPSBvLmxvb3BSZXF1aXJlZCkgIT09IG51bGwgJiYgX20gIT09IHZvaWQgMCA/IF9tIDogTUFYX0VYUFJFU1NJT04sXG4gICAgICAgIGxvb3BFbnVtOiAoX28gPSBvLmxvb3BFbnVtKSAhPT0gbnVsbCAmJiBfbyAhPT0gdm9pZCAwID8gX28gOiBNQVhfRVhQUkVTU0lPTixcbiAgICAgICAgbWV0YTogKF9wID0gby5tZXRhKSAhPT0gbnVsbCAmJiBfcCAhPT0gdm9pZCAwID8gX3AgOiB0cnVlLFxuICAgICAgICBtZXNzYWdlczogKF9xID0gby5tZXNzYWdlcykgIT09IG51bGwgJiYgX3EgIT09IHZvaWQgMCA/IF9xIDogdHJ1ZSxcbiAgICAgICAgaW5saW5lUmVmczogKF9yID0gby5pbmxpbmVSZWZzKSAhPT0gbnVsbCAmJiBfciAhPT0gdm9pZCAwID8gX3IgOiB0cnVlLFxuICAgICAgICBzY2hlbWFJZDogKF9zID0gby5zY2hlbWFJZCkgIT09IG51bGwgJiYgX3MgIT09IHZvaWQgMCA/IF9zIDogXCIkaWRcIixcbiAgICAgICAgYWRkVXNlZFNjaGVtYTogKF90ID0gby5hZGRVc2VkU2NoZW1hKSAhPT0gbnVsbCAmJiBfdCAhPT0gdm9pZCAwID8gX3QgOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZVNjaGVtYTogKF91ID0gby52YWxpZGF0ZVNjaGVtYSkgIT09IG51bGwgJiYgX3UgIT09IHZvaWQgMCA/IF91IDogdHJ1ZSxcbiAgICAgICAgdmFsaWRhdGVGb3JtYXRzOiAoX3YgPSBvLnZhbGlkYXRlRm9ybWF0cykgIT09IG51bGwgJiYgX3YgIT09IHZvaWQgMCA/IF92IDogdHJ1ZSxcbiAgICAgICAgdW5pY29kZVJlZ0V4cDogKF93ID0gby51bmljb2RlUmVnRXhwKSAhPT0gbnVsbCAmJiBfdyAhPT0gdm9pZCAwID8gX3cgOiB0cnVlLFxuICAgICAgICBpbnQzMnJhbmdlOiAoX3ggPSBvLmludDMycmFuZ2UpICE9PSBudWxsICYmIF94ICE9PSB2b2lkIDAgPyBfeCA6IHRydWUsXG4gICAgfTtcbn1cbmNsYXNzIEFqdiB7XG4gICAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgICAgIHRoaXMuc2NoZW1hcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZnMgPSB7fTtcbiAgICAgICAgdGhpcy5mb3JtYXRzID0ge307XG4gICAgICAgIHRoaXMuX2NvbXBpbGF0aW9ucyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fbG9hZGluZyA9IHt9O1xuICAgICAgICB0aGlzLl9jYWNoZSA9IG5ldyBNYXAoKTtcbiAgICAgICAgb3B0cyA9IHRoaXMub3B0cyA9IHsgLi4ub3B0cywgLi4ucmVxdWlyZWRPcHRpb25zKG9wdHMpIH07XG4gICAgICAgIGNvbnN0IHsgZXM1LCBsaW5lcyB9ID0gdGhpcy5vcHRzLmNvZGU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBuZXcgY29kZWdlbl8yLlZhbHVlU2NvcGUoeyBzY29wZToge30sIHByZWZpeGVzOiBFWFRfU0NPUEVfTkFNRVMsIGVzNSwgbGluZXMgfSk7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gZ2V0TG9nZ2VyKG9wdHMubG9nZ2VyKTtcbiAgICAgICAgY29uc3QgZm9ybWF0T3B0ID0gb3B0cy52YWxpZGF0ZUZvcm1hdHM7XG4gICAgICAgIG9wdHMudmFsaWRhdGVGb3JtYXRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuUlVMRVMgPSAoMCwgcnVsZXNfMS5nZXRSdWxlcykoKTtcbiAgICAgICAgY2hlY2tPcHRpb25zLmNhbGwodGhpcywgcmVtb3ZlZE9wdGlvbnMsIG9wdHMsIFwiTk9UIFNVUFBPUlRFRFwiKTtcbiAgICAgICAgY2hlY2tPcHRpb25zLmNhbGwodGhpcywgZGVwcmVjYXRlZE9wdGlvbnMsIG9wdHMsIFwiREVQUkVDQVRFRFwiLCBcIndhcm5cIik7XG4gICAgICAgIHRoaXMuX21ldGFPcHRzID0gZ2V0TWV0YVNjaGVtYU9wdGlvbnMuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKG9wdHMuZm9ybWF0cylcbiAgICAgICAgICAgIGFkZEluaXRpYWxGb3JtYXRzLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX2FkZFZvY2FidWxhcmllcygpO1xuICAgICAgICB0aGlzLl9hZGREZWZhdWx0TWV0YVNjaGVtYSgpO1xuICAgICAgICBpZiAob3B0cy5rZXl3b3JkcylcbiAgICAgICAgICAgIGFkZEluaXRpYWxLZXl3b3Jkcy5jYWxsKHRoaXMsIG9wdHMua2V5d29yZHMpO1xuICAgICAgICBpZiAodHlwZW9mIG9wdHMubWV0YSA9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgdGhpcy5hZGRNZXRhU2NoZW1hKG9wdHMubWV0YSk7XG4gICAgICAgIGFkZEluaXRpYWxTY2hlbWFzLmNhbGwodGhpcyk7XG4gICAgICAgIG9wdHMudmFsaWRhdGVGb3JtYXRzID0gZm9ybWF0T3B0O1xuICAgIH1cbiAgICBfYWRkVm9jYWJ1bGFyaWVzKCkge1xuICAgICAgICB0aGlzLmFkZEtleXdvcmQoXCIkYXN5bmNcIik7XG4gICAgfVxuICAgIF9hZGREZWZhdWx0TWV0YVNjaGVtYSgpIHtcbiAgICAgICAgY29uc3QgeyAkZGF0YSwgbWV0YSwgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgbGV0IF9kYXRhUmVmU2NoZW1hID0gJGRhdGFSZWZTY2hlbWE7XG4gICAgICAgIGlmIChzY2hlbWFJZCA9PT0gXCJpZFwiKSB7XG4gICAgICAgICAgICBfZGF0YVJlZlNjaGVtYSA9IHsgLi4uJGRhdGFSZWZTY2hlbWEgfTtcbiAgICAgICAgICAgIF9kYXRhUmVmU2NoZW1hLmlkID0gX2RhdGFSZWZTY2hlbWEuJGlkO1xuICAgICAgICAgICAgZGVsZXRlIF9kYXRhUmVmU2NoZW1hLiRpZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0YSAmJiAkZGF0YSlcbiAgICAgICAgICAgIHRoaXMuYWRkTWV0YVNjaGVtYShfZGF0YVJlZlNjaGVtYSwgX2RhdGFSZWZTY2hlbWFbc2NoZW1hSWRdLCBmYWxzZSk7XG4gICAgfVxuICAgIGRlZmF1bHRNZXRhKCkge1xuICAgICAgICBjb25zdCB7IG1ldGEsIHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRzLmRlZmF1bHRNZXRhID0gdHlwZW9mIG1ldGEgPT0gXCJvYmplY3RcIiA/IG1ldGFbc2NoZW1hSWRdIHx8IG1ldGEgOiB1bmRlZmluZWQpO1xuICAgIH1cbiAgICB2YWxpZGF0ZShzY2hlbWFLZXlSZWYsIC8vIGtleSwgcmVmIG9yIHNjaGVtYSBvYmplY3RcbiAgICBkYXRhIC8vIHRvIGJlIHZhbGlkYXRlZFxuICAgICkge1xuICAgICAgICBsZXQgdjtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWFLZXlSZWYgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdiA9IHRoaXMuZ2V0U2NoZW1hKHNjaGVtYUtleVJlZik7XG4gICAgICAgICAgICBpZiAoIXYpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBubyBzY2hlbWEgd2l0aCBrZXkgb3IgcmVmIFwiJHtzY2hlbWFLZXlSZWZ9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHYgPSB0aGlzLmNvbXBpbGUoc2NoZW1hS2V5UmVmKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWxpZCA9IHYoZGF0YSk7XG4gICAgICAgIGlmICghKFwiJGFzeW5jXCIgaW4gdikpXG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IHYuZXJyb3JzO1xuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuICAgIGNvbXBpbGUoc2NoZW1hLCBfbWV0YSkge1xuICAgICAgICBjb25zdCBzY2ggPSB0aGlzLl9hZGRTY2hlbWEoc2NoZW1hLCBfbWV0YSk7XG4gICAgICAgIHJldHVybiAoc2NoLnZhbGlkYXRlIHx8IHRoaXMuX2NvbXBpbGVTY2hlbWFFbnYoc2NoKSk7XG4gICAgfVxuICAgIGNvbXBpbGVBc3luYyhzY2hlbWEsIG1ldGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMubG9hZFNjaGVtYSAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMubG9hZFNjaGVtYSBzaG91bGQgYmUgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGxvYWRTY2hlbWEgfSA9IHRoaXMub3B0cztcbiAgICAgICAgcmV0dXJuIHJ1bkNvbXBpbGVBc3luYy5jYWxsKHRoaXMsIHNjaGVtYSwgbWV0YSk7XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIHJ1bkNvbXBpbGVBc3luYyhfc2NoZW1hLCBfbWV0YSkge1xuICAgICAgICAgICAgYXdhaXQgbG9hZE1ldGFTY2hlbWEuY2FsbCh0aGlzLCBfc2NoZW1hLiRzY2hlbWEpO1xuICAgICAgICAgICAgY29uc3Qgc2NoID0gdGhpcy5fYWRkU2NoZW1hKF9zY2hlbWEsIF9tZXRhKTtcbiAgICAgICAgICAgIHJldHVybiBzY2gudmFsaWRhdGUgfHwgX2NvbXBpbGVBc3luYy5jYWxsKHRoaXMsIHNjaCk7XG4gICAgICAgIH1cbiAgICAgICAgYXN5bmMgZnVuY3Rpb24gbG9hZE1ldGFTY2hlbWEoJHJlZikge1xuICAgICAgICAgICAgaWYgKCRyZWYgJiYgIXRoaXMuZ2V0U2NoZW1hKCRyZWYpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcnVuQ29tcGlsZUFzeW5jLmNhbGwodGhpcywgeyAkcmVmIH0sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIF9jb21waWxlQXN5bmMoc2NoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21waWxlU2NoZW1hRW52KHNjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiByZWZfZXJyb3JfMS5kZWZhdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICBjaGVja0xvYWRlZC5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGxvYWRNaXNzaW5nU2NoZW1hLmNhbGwodGhpcywgZS5taXNzaW5nU2NoZW1hKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbXBpbGVBc3luYy5jYWxsKHRoaXMsIHNjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2hlY2tMb2FkZWQoeyBtaXNzaW5nU2NoZW1hOiByZWYsIG1pc3NpbmdSZWYgfSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVmc1tyZWZdKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbnlTY2hlbWEgJHtyZWZ9IGlzIGxvYWRlZCBidXQgJHttaXNzaW5nUmVmfSBjYW5ub3QgYmUgcmVzb2x2ZWRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiBsb2FkTWlzc2luZ1NjaGVtYShyZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IF9zY2hlbWEgPSBhd2FpdCBfbG9hZFNjaGVtYS5jYWxsKHRoaXMsIHJlZik7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVmc1tyZWZdKVxuICAgICAgICAgICAgICAgIGF3YWl0IGxvYWRNZXRhU2NoZW1hLmNhbGwodGhpcywgX3NjaGVtYS4kc2NoZW1hKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWZzW3JlZl0pXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTY2hlbWEoX3NjaGVtYSwgcmVmLCBtZXRhKTtcbiAgICAgICAgfVxuICAgICAgICBhc3luYyBmdW5jdGlvbiBfbG9hZFNjaGVtYShyZWYpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSB0aGlzLl9sb2FkaW5nW3JlZl07XG4gICAgICAgICAgICBpZiAocClcbiAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0ICh0aGlzLl9sb2FkaW5nW3JlZl0gPSBsb2FkU2NoZW1hKHJlZikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xvYWRpbmdbcmVmXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBZGRzIHNjaGVtYSB0byB0aGUgaW5zdGFuY2VcbiAgICBhZGRTY2hlbWEoc2NoZW1hLCAvLyBJZiBhcnJheSBpcyBwYXNzZWQsIGBrZXlgIHdpbGwgYmUgaWdub3JlZFxuICAgIGtleSwgLy8gT3B0aW9uYWwgc2NoZW1hIGtleS4gQ2FuIGJlIHBhc3NlZCB0byBgdmFsaWRhdGVgIG1ldGhvZCBpbnN0ZWFkIG9mIHNjaGVtYSBvYmplY3Qgb3IgaWQvcmVmLiBPbmUgc2NoZW1hIHBlciBpbnN0YW5jZSBjYW4gaGF2ZSBlbXB0eSBgaWRgIGFuZCBga2V5YC5cbiAgICBfbWV0YSwgLy8gdHJ1ZSBpZiBzY2hlbWEgaXMgYSBtZXRhLXNjaGVtYS4gVXNlZCBpbnRlcm5hbGx5LCBhZGRNZXRhU2NoZW1hIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gICAgX3ZhbGlkYXRlU2NoZW1hID0gdGhpcy5vcHRzLnZhbGlkYXRlU2NoZW1hIC8vIGZhbHNlIHRvIHNraXAgc2NoZW1hIHZhbGlkYXRpb24uIFVzZWQgaW50ZXJuYWxseSwgb3B0aW9uIHZhbGlkYXRlU2NoZW1hIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gICAgKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc2NoIG9mIHNjaGVtYSlcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjaGVtYShzY2gsIHVuZGVmaW5lZCwgX21ldGEsIF92YWxpZGF0ZVNjaGVtYSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBsZXQgaWQ7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NoZW1hID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBjb25zdCB7IHNjaGVtYUlkIH0gPSB0aGlzLm9wdHM7XG4gICAgICAgICAgICBpZCA9IHNjaGVtYVtzY2hlbWFJZF07XG4gICAgICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgaWQgIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgc2NoZW1hICR7c2NoZW1hSWR9IG11c3QgYmUgc3RyaW5nYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5ID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoa2V5IHx8IGlkKTtcbiAgICAgICAgdGhpcy5fY2hlY2tVbmlxdWUoa2V5KTtcbiAgICAgICAgdGhpcy5zY2hlbWFzW2tleV0gPSB0aGlzLl9hZGRTY2hlbWEoc2NoZW1hLCBfbWV0YSwga2V5LCBfdmFsaWRhdGVTY2hlbWEsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gQWRkIHNjaGVtYSB0aGF0IHdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBvdGhlciBzY2hlbWFzXG4gICAgLy8gb3B0aW9ucyBpbiBNRVRBX0lHTk9SRV9PUFRJT05TIGFyZSBhbHdheSBzZXQgdG8gZmFsc2VcbiAgICBhZGRNZXRhU2NoZW1hKHNjaGVtYSwga2V5LCAvLyBzY2hlbWEga2V5XG4gICAgX3ZhbGlkYXRlU2NoZW1hID0gdGhpcy5vcHRzLnZhbGlkYXRlU2NoZW1hIC8vIGZhbHNlIHRvIHNraXAgc2NoZW1hIHZhbGlkYXRpb24sIGNhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHZhbGlkYXRlU2NoZW1hIG9wdGlvbiBmb3IgbWV0YS1zY2hlbWFcbiAgICApIHtcbiAgICAgICAgdGhpcy5hZGRTY2hlbWEoc2NoZW1hLCBrZXksIHRydWUsIF92YWxpZGF0ZVNjaGVtYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyAgVmFsaWRhdGUgc2NoZW1hIGFnYWluc3QgaXRzIG1ldGEtc2NoZW1hXG4gICAgdmFsaWRhdGVTY2hlbWEoc2NoZW1hLCB0aHJvd09yTG9nRXJyb3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gXCJib29sZWFuXCIpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgbGV0ICRzY2hlbWE7XG4gICAgICAgICRzY2hlbWEgPSBzY2hlbWEuJHNjaGVtYTtcbiAgICAgICAgaWYgKCRzY2hlbWEgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgJHNjaGVtYSAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIkc2NoZW1hIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgJHNjaGVtYSA9ICRzY2hlbWEgfHwgdGhpcy5vcHRzLmRlZmF1bHRNZXRhIHx8IHRoaXMuZGVmYXVsdE1ldGEoKTtcbiAgICAgICAgaWYgKCEkc2NoZW1hKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwibWV0YS1zY2hlbWEgbm90IGF2YWlsYWJsZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy52YWxpZGF0ZSgkc2NoZW1hLCBzY2hlbWEpO1xuICAgICAgICBpZiAoIXZhbGlkICYmIHRocm93T3JMb2dFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IFwic2NoZW1hIGlzIGludmFsaWQ6IFwiICsgdGhpcy5lcnJvcnNUZXh0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnZhbGlkYXRlU2NoZW1hID09PSBcImxvZ1wiKVxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuICAgIC8vIEdldCBjb21waWxlZCBzY2hlbWEgYnkgYGtleWAgb3IgYHJlZmAuXG4gICAgLy8gKGBrZXlgIHRoYXQgd2FzIHBhc3NlZCB0byBgYWRkU2NoZW1hYCBvciBmdWxsIHNjaGVtYSByZWZlcmVuY2UgLSBgc2NoZW1hLiRpZGAgb3IgcmVzb2x2ZWQgaWQpXG4gICAgZ2V0U2NoZW1hKGtleVJlZikge1xuICAgICAgICBsZXQgc2NoO1xuICAgICAgICB3aGlsZSAodHlwZW9mIChzY2ggPSBnZXRTY2hFbnYuY2FsbCh0aGlzLCBrZXlSZWYpKSA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAga2V5UmVmID0gc2NoO1xuICAgICAgICBpZiAoc2NoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2NoZW1hSWQgfSA9IHRoaXMub3B0cztcbiAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBuZXcgY29tcGlsZV8xLlNjaGVtYUVudih7IHNjaGVtYToge30sIHNjaGVtYUlkIH0pO1xuICAgICAgICAgICAgc2NoID0gY29tcGlsZV8xLnJlc29sdmVTY2hlbWEuY2FsbCh0aGlzLCByb290LCBrZXlSZWYpO1xuICAgICAgICAgICAgaWYgKCFzY2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5yZWZzW2tleVJlZl0gPSBzY2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChzY2gudmFsaWRhdGUgfHwgdGhpcy5fY29tcGlsZVNjaGVtYUVudihzY2gpKTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIGNhY2hlZCBzY2hlbWEocykuXG4gICAgLy8gSWYgbm8gcGFyYW1ldGVyIGlzIHBhc3NlZCBhbGwgc2NoZW1hcyBidXQgbWV0YS1zY2hlbWFzIGFyZSByZW1vdmVkLlxuICAgIC8vIElmIFJlZ0V4cCBpcyBwYXNzZWQgYWxsIHNjaGVtYXMgd2l0aCBrZXkvaWQgbWF0Y2hpbmcgcGF0dGVybiBidXQgbWV0YS1zY2hlbWFzIGFyZSByZW1vdmVkLlxuICAgIC8vIEV2ZW4gaWYgc2NoZW1hIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgc2NoZW1hcyBpdCBzdGlsbCBjYW4gYmUgcmVtb3ZlZCBhcyBvdGhlciBzY2hlbWFzIGhhdmUgbG9jYWwgcmVmZXJlbmNlcy5cbiAgICByZW1vdmVTY2hlbWEoc2NoZW1hS2V5UmVmKSB7XG4gICAgICAgIGlmIChzY2hlbWFLZXlSZWYgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFsbFNjaGVtYXModGhpcy5zY2hlbWFzLCBzY2hlbWFLZXlSZWYpO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsU2NoZW1hcyh0aGlzLnJlZnMsIHNjaGVtYUtleVJlZik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBzY2hlbWFLZXlSZWYpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxTY2hlbWFzKHRoaXMuc2NoZW1hcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQWxsU2NoZW1hcyh0aGlzLnJlZnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2ggPSBnZXRTY2hFbnYuY2FsbCh0aGlzLCBzY2hlbWFLZXlSZWYpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NoID09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShzY2guc2NoZW1hKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zY2hlbWFzW3NjaGVtYUtleVJlZl07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMucmVmc1tzY2hlbWFLZXlSZWZdO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FjaGVLZXkgPSBzY2hlbWFLZXlSZWY7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKGNhY2hlS2V5KTtcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBzY2hlbWFLZXlSZWZbdGhpcy5vcHRzLnNjaGVtYUlkXTtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShpZCk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNjaGVtYXNbaWRdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZWZzW2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFqdi5yZW1vdmVTY2hlbWE6IGludmFsaWQgcGFyYW1ldGVyXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGFkZCBcInZvY2FidWxhcnlcIiAtIGEgY29sbGVjdGlvbiBvZiBrZXl3b3Jkc1xuICAgIGFkZFZvY2FidWxhcnkoZGVmaW5pdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBkZWYgb2YgZGVmaW5pdGlvbnMpXG4gICAgICAgICAgICB0aGlzLmFkZEtleXdvcmQoZGVmKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZEtleXdvcmQoa3dkT3JEZWYsIGRlZiAvLyBkZXByZWNhdGVkXG4gICAgKSB7XG4gICAgICAgIGxldCBrZXl3b3JkO1xuICAgICAgICBpZiAodHlwZW9mIGt3ZE9yRGVmID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGtleXdvcmQgPSBrd2RPckRlZjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwidGhlc2UgcGFyYW1ldGVycyBhcmUgZGVwcmVjYXRlZCwgc2VlIGRvY3MgZm9yIGFkZEtleXdvcmRcIik7XG4gICAgICAgICAgICAgICAgZGVmLmtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBrd2RPckRlZiA9PSBcIm9iamVjdFwiICYmIGRlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWYgPSBrd2RPckRlZjtcbiAgICAgICAgICAgIGtleXdvcmQgPSBkZWYua2V5d29yZDtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGtleXdvcmQpICYmICFrZXl3b3JkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFkZEtleXdvcmRzOiBrZXl3b3JkIG11c3QgYmUgc3RyaW5nIG9yIG5vbi1lbXB0eSBhcnJheVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgYWRkS2V5d29yZHMgcGFyYW1ldGVyc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja0tleXdvcmQuY2FsbCh0aGlzLCBrZXl3b3JkLCBkZWYpO1xuICAgICAgICBpZiAoIWRlZikge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5lYWNoSXRlbSkoa2V5d29yZCwgKGt3ZCkgPT4gYWRkUnVsZS5jYWxsKHRoaXMsIGt3ZCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAga2V5d29yZE1ldGFzY2hlbWEuY2FsbCh0aGlzLCBkZWYpO1xuICAgICAgICBjb25zdCBkZWZpbml0aW9uID0ge1xuICAgICAgICAgICAgLi4uZGVmLFxuICAgICAgICAgICAgdHlwZTogKDAsIGRhdGFUeXBlXzEuZ2V0SlNPTlR5cGVzKShkZWYudHlwZSksXG4gICAgICAgICAgICBzY2hlbWFUeXBlOiAoMCwgZGF0YVR5cGVfMS5nZXRKU09OVHlwZXMpKGRlZi5zY2hlbWFUeXBlKSxcbiAgICAgICAgfTtcbiAgICAgICAgKDAsIHV0aWxfMS5lYWNoSXRlbSkoa2V5d29yZCwgZGVmaW5pdGlvbi50eXBlLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyAoaykgPT4gYWRkUnVsZS5jYWxsKHRoaXMsIGssIGRlZmluaXRpb24pXG4gICAgICAgICAgICA6IChrKSA9PiBkZWZpbml0aW9uLnR5cGUuZm9yRWFjaCgodCkgPT4gYWRkUnVsZS5jYWxsKHRoaXMsIGssIGRlZmluaXRpb24sIHQpKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRLZXl3b3JkKGtleXdvcmQpIHtcbiAgICAgICAgY29uc3QgcnVsZSA9IHRoaXMuUlVMRVMuYWxsW2tleXdvcmRdO1xuICAgICAgICByZXR1cm4gdHlwZW9mIHJ1bGUgPT0gXCJvYmplY3RcIiA/IHJ1bGUuZGVmaW5pdGlvbiA6ICEhcnVsZTtcbiAgICB9XG4gICAgLy8gUmVtb3ZlIGtleXdvcmRcbiAgICByZW1vdmVLZXl3b3JkKGtleXdvcmQpIHtcbiAgICAgICAgLy8gVE9ETyByZXR1cm4gdHlwZSBzaG91bGQgYmUgQWp2XG4gICAgICAgIGNvbnN0IHsgUlVMRVMgfSA9IHRoaXM7XG4gICAgICAgIGRlbGV0ZSBSVUxFUy5rZXl3b3Jkc1trZXl3b3JkXTtcbiAgICAgICAgZGVsZXRlIFJVTEVTLmFsbFtrZXl3b3JkXTtcbiAgICAgICAgZm9yIChjb25zdCBncm91cCBvZiBSVUxFUy5ydWxlcykge1xuICAgICAgICAgICAgY29uc3QgaSA9IGdyb3VwLnJ1bGVzLmZpbmRJbmRleCgocnVsZSkgPT4gcnVsZS5rZXl3b3JkID09PSBrZXl3b3JkKTtcbiAgICAgICAgICAgIGlmIChpID49IDApXG4gICAgICAgICAgICAgICAgZ3JvdXAucnVsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyBBZGQgZm9ybWF0XG4gICAgYWRkRm9ybWF0KG5hbWUsIGZvcm1hdCkge1xuICAgICAgICBpZiAodHlwZW9mIGZvcm1hdCA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgZm9ybWF0ID0gbmV3IFJlZ0V4cChmb3JtYXQpO1xuICAgICAgICB0aGlzLmZvcm1hdHNbbmFtZV0gPSBmb3JtYXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlcnJvcnNUZXh0KGVycm9ycyA9IHRoaXMuZXJyb3JzLCAvLyBvcHRpb25hbCBhcnJheSBvZiB2YWxpZGF0aW9uIGVycm9yc1xuICAgIHsgc2VwYXJhdG9yID0gXCIsIFwiLCBkYXRhVmFyID0gXCJkYXRhXCIgfSA9IHt9IC8vIG9wdGlvbmFsIG9wdGlvbnMgd2l0aCBwcm9wZXJ0aWVzIGBzZXBhcmF0b3JgIGFuZCBgZGF0YVZhcmBcbiAgICApIHtcbiAgICAgICAgaWYgKCFlcnJvcnMgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBcIk5vIGVycm9yc1wiO1xuICAgICAgICByZXR1cm4gZXJyb3JzXG4gICAgICAgICAgICAubWFwKChlKSA9PiBgJHtkYXRhVmFyfSR7ZS5pbnN0YW5jZVBhdGh9ICR7ZS5tZXNzYWdlfWApXG4gICAgICAgICAgICAucmVkdWNlKCh0ZXh0LCBtc2cpID0+IHRleHQgKyBzZXBhcmF0b3IgKyBtc2cpO1xuICAgIH1cbiAgICAkZGF0YU1ldGFTY2hlbWEobWV0YVNjaGVtYSwga2V5d29yZHNKc29uUG9pbnRlcnMpIHtcbiAgICAgICAgY29uc3QgcnVsZXMgPSB0aGlzLlJVTEVTLmFsbDtcbiAgICAgICAgbWV0YVNjaGVtYSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWV0YVNjaGVtYSkpO1xuICAgICAgICBmb3IgKGNvbnN0IGpzb25Qb2ludGVyIG9mIGtleXdvcmRzSnNvblBvaW50ZXJzKSB7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IGpzb25Qb2ludGVyLnNwbGl0KFwiL1wiKS5zbGljZSgxKTsgLy8gZmlyc3Qgc2VnbWVudCBpcyBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgIGxldCBrZXl3b3JkcyA9IG1ldGFTY2hlbWE7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlZyBvZiBzZWdtZW50cylcbiAgICAgICAgICAgICAgICBrZXl3b3JkcyA9IGtleXdvcmRzW3NlZ107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBydWxlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJ1bGUgPSBydWxlc1trZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcnVsZSAhPSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB7ICRkYXRhIH0gPSBydWxlLmRlZmluaXRpb247XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoZW1hID0ga2V5d29yZHNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoJGRhdGEgJiYgc2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICBrZXl3b3Jkc1trZXldID0gc2NoZW1hT3JEYXRhKHNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1ldGFTY2hlbWE7XG4gICAgfVxuICAgIF9yZW1vdmVBbGxTY2hlbWFzKHNjaGVtYXMsIHJlZ2V4KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5UmVmIGluIHNjaGVtYXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaCA9IHNjaGVtYXNba2V5UmVmXTtcbiAgICAgICAgICAgIGlmICghcmVnZXggfHwgcmVnZXgudGVzdChrZXlSZWYpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzY2ggPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc2NoZW1hc1trZXlSZWZdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY2ggJiYgIXNjaC5tZXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShzY2guc2NoZW1hKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNjaGVtYXNba2V5UmVmXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FkZFNjaGVtYShzY2hlbWEsIG1ldGEsIGJhc2VJZCwgdmFsaWRhdGVTY2hlbWEgPSB0aGlzLm9wdHMudmFsaWRhdGVTY2hlbWEsIGFkZFNjaGVtYSA9IHRoaXMub3B0cy5hZGRVc2VkU2NoZW1hKSB7XG4gICAgICAgIGxldCBpZDtcbiAgICAgICAgY29uc3QgeyBzY2hlbWFJZCB9ID0gdGhpcy5vcHRzO1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZCA9IHNjaGVtYVtzY2hlbWFJZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmp0ZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY2hlbWEgbXVzdCBiZSBvYmplY3RcIik7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hICE9IFwiYm9vbGVhblwiKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNjaGVtYSBtdXN0IGJlIG9iamVjdCBvciBib29sZWFuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzY2ggPSB0aGlzLl9jYWNoZS5nZXQoc2NoZW1hKTtcbiAgICAgICAgaWYgKHNjaCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHNjaDtcbiAgICAgICAgYmFzZUlkID0gKDAsIHJlc29sdmVfMS5ub3JtYWxpemVJZCkoaWQgfHwgYmFzZUlkKTtcbiAgICAgICAgY29uc3QgbG9jYWxSZWZzID0gcmVzb2x2ZV8xLmdldFNjaGVtYVJlZnMuY2FsbCh0aGlzLCBzY2hlbWEsIGJhc2VJZCk7XG4gICAgICAgIHNjaCA9IG5ldyBjb21waWxlXzEuU2NoZW1hRW52KHsgc2NoZW1hLCBzY2hlbWFJZCwgbWV0YSwgYmFzZUlkLCBsb2NhbFJlZnMgfSk7XG4gICAgICAgIHRoaXMuX2NhY2hlLnNldChzY2guc2NoZW1hLCBzY2gpO1xuICAgICAgICBpZiAoYWRkU2NoZW1hICYmICFiYXNlSWQuc3RhcnRzV2l0aChcIiNcIikpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXRtIGl0IGlzIGFsbG93ZWQgdG8gb3ZlcndyaXRlIHNjaGVtYXMgd2l0aG91dCBpZCAoaW5zdGVhZCBvZiBub3QgYWRkaW5nIHRoZW0pXG4gICAgICAgICAgICBpZiAoYmFzZUlkKVxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrVW5pcXVlKGJhc2VJZCk7XG4gICAgICAgICAgICB0aGlzLnJlZnNbYmFzZUlkXSA9IHNjaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsaWRhdGVTY2hlbWEpXG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlU2NoZW1hKHNjaGVtYSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBzY2g7XG4gICAgfVxuICAgIF9jaGVja1VuaXF1ZShpZCkge1xuICAgICAgICBpZiAodGhpcy5zY2hlbWFzW2lkXSB8fCB0aGlzLnJlZnNbaWRdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHNjaGVtYSB3aXRoIGtleSBvciBpZCBcIiR7aWR9XCIgYWxyZWFkeSBleGlzdHNgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29tcGlsZVNjaGVtYUVudihzY2gpIHtcbiAgICAgICAgaWYgKHNjaC5tZXRhKVxuICAgICAgICAgICAgdGhpcy5fY29tcGlsZU1ldGFTY2hlbWEoc2NoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29tcGlsZV8xLmNvbXBpbGVTY2hlbWEuY2FsbCh0aGlzLCBzY2gpO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFzY2gudmFsaWRhdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIHJldHVybiBzY2gudmFsaWRhdGU7XG4gICAgfVxuICAgIF9jb21waWxlTWV0YVNjaGVtYShzY2gpIHtcbiAgICAgICAgY29uc3QgY3VycmVudE9wdHMgPSB0aGlzLm9wdHM7XG4gICAgICAgIHRoaXMub3B0cyA9IHRoaXMuX21ldGFPcHRzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29tcGlsZV8xLmNvbXBpbGVTY2hlbWEuY2FsbCh0aGlzLCBzY2gpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5vcHRzID0gY3VycmVudE9wdHM7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBBanY7XG5BanYuVmFsaWRhdGlvbkVycm9yID0gdmFsaWRhdGlvbl9lcnJvcl8xLmRlZmF1bHQ7XG5BanYuTWlzc2luZ1JlZkVycm9yID0gcmVmX2Vycm9yXzEuZGVmYXVsdDtcbmZ1bmN0aW9uIGNoZWNrT3B0aW9ucyhjaGVja09wdHMsIG9wdGlvbnMsIG1zZywgbG9nID0gXCJlcnJvclwiKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hlY2tPcHRzKSB7XG4gICAgICAgIGNvbnN0IG9wdCA9IGtleTtcbiAgICAgICAgaWYgKG9wdCBpbiBvcHRpb25zKVxuICAgICAgICAgICAgdGhpcy5sb2dnZXJbbG9nXShgJHttc2d9OiBvcHRpb24gJHtrZXl9LiAke2NoZWNrT3B0c1tvcHRdfWApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFNjaEVudihrZXlSZWYpIHtcbiAgICBrZXlSZWYgPSAoMCwgcmVzb2x2ZV8xLm5vcm1hbGl6ZUlkKShrZXlSZWYpOyAvLyBUT0RPIHRlc3RzIGZhaWwgd2l0aG91dCB0aGlzIGxpbmVcbiAgICByZXR1cm4gdGhpcy5zY2hlbWFzW2tleVJlZl0gfHwgdGhpcy5yZWZzW2tleVJlZl07XG59XG5mdW5jdGlvbiBhZGRJbml0aWFsU2NoZW1hcygpIHtcbiAgICBjb25zdCBvcHRzU2NoZW1hcyA9IHRoaXMub3B0cy5zY2hlbWFzO1xuICAgIGlmICghb3B0c1NjaGVtYXMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRzU2NoZW1hcykpXG4gICAgICAgIHRoaXMuYWRkU2NoZW1hKG9wdHNTY2hlbWFzKTtcbiAgICBlbHNlXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9wdHNTY2hlbWFzKVxuICAgICAgICAgICAgdGhpcy5hZGRTY2hlbWEob3B0c1NjaGVtYXNba2V5XSwga2V5KTtcbn1cbmZ1bmN0aW9uIGFkZEluaXRpYWxGb3JtYXRzKCkge1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLm9wdHMuZm9ybWF0cykge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLm9wdHMuZm9ybWF0c1tuYW1lXTtcbiAgICAgICAgaWYgKGZvcm1hdClcbiAgICAgICAgICAgIHRoaXMuYWRkRm9ybWF0KG5hbWUsIGZvcm1hdCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkSW5pdGlhbEtleXdvcmRzKGRlZnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkZWZzKSkge1xuICAgICAgICB0aGlzLmFkZFZvY2FidWxhcnkoZGVmcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sb2dnZXIud2FybihcImtleXdvcmRzIG9wdGlvbiBhcyBtYXAgaXMgZGVwcmVjYXRlZCwgcGFzcyBhcnJheVwiKTtcbiAgICBmb3IgKGNvbnN0IGtleXdvcmQgaW4gZGVmcykge1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzW2tleXdvcmRdO1xuICAgICAgICBpZiAoIWRlZi5rZXl3b3JkKVxuICAgICAgICAgICAgZGVmLmtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICB0aGlzLmFkZEtleXdvcmQoZGVmKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNZXRhU2NoZW1hT3B0aW9ucygpIHtcbiAgICBjb25zdCBtZXRhT3B0cyA9IHsgLi4udGhpcy5vcHRzIH07XG4gICAgZm9yIChjb25zdCBvcHQgb2YgTUVUQV9JR05PUkVfT1BUSU9OUylcbiAgICAgICAgZGVsZXRlIG1ldGFPcHRzW29wdF07XG4gICAgcmV0dXJuIG1ldGFPcHRzO1xufVxuY29uc3Qgbm9Mb2dzID0geyBsb2coKSB7IH0sIHdhcm4oKSB7IH0sIGVycm9yKCkgeyB9IH07XG5mdW5jdGlvbiBnZXRMb2dnZXIobG9nZ2VyKSB7XG4gICAgaWYgKGxvZ2dlciA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybiBub0xvZ3M7XG4gICAgaWYgKGxvZ2dlciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gY29uc29sZTtcbiAgICBpZiAobG9nZ2VyLmxvZyAmJiBsb2dnZXIud2FybiAmJiBsb2dnZXIuZXJyb3IpXG4gICAgICAgIHJldHVybiBsb2dnZXI7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibG9nZ2VyIG11c3QgaW1wbGVtZW50IGxvZywgd2FybiBhbmQgZXJyb3IgbWV0aG9kc1wiKTtcbn1cbmNvbnN0IEtFWVdPUkRfTkFNRSA9IC9eW2Etel8kXVthLXowLTlfJDotXSokL2k7XG5mdW5jdGlvbiBjaGVja0tleXdvcmQoa2V5d29yZCwgZGVmKSB7XG4gICAgY29uc3QgeyBSVUxFUyB9ID0gdGhpcztcbiAgICAoMCwgdXRpbF8xLmVhY2hJdGVtKShrZXl3b3JkLCAoa3dkKSA9PiB7XG4gICAgICAgIGlmIChSVUxFUy5rZXl3b3Jkc1trd2RdKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBLZXl3b3JkICR7a3dkfSBpcyBhbHJlYWR5IGRlZmluZWRgKTtcbiAgICAgICAgaWYgKCFLRVlXT1JEX05BTUUudGVzdChrd2QpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBLZXl3b3JkICR7a3dkfSBoYXMgaW52YWxpZCBuYW1lYCk7XG4gICAgfSk7XG4gICAgaWYgKCFkZWYpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZGVmLiRkYXRhICYmICEoXCJjb2RlXCIgaW4gZGVmIHx8IFwidmFsaWRhdGVcIiBpbiBkZWYpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignJGRhdGEga2V5d29yZCBtdXN0IGhhdmUgXCJjb2RlXCIgb3IgXCJ2YWxpZGF0ZVwiIGZ1bmN0aW9uJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkUnVsZShrZXl3b3JkLCBkZWZpbml0aW9uLCBkYXRhVHlwZSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBwb3N0ID0gZGVmaW5pdGlvbiA9PT0gbnVsbCB8fCBkZWZpbml0aW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWZpbml0aW9uLnBvc3Q7XG4gICAgaWYgKGRhdGFUeXBlICYmIHBvc3QpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5d29yZCB3aXRoIFwicG9zdFwiIGZsYWcgY2Fubm90IGhhdmUgXCJ0eXBlXCInKTtcbiAgICBjb25zdCB7IFJVTEVTIH0gPSB0aGlzO1xuICAgIGxldCBydWxlR3JvdXAgPSBwb3N0ID8gUlVMRVMucG9zdCA6IFJVTEVTLnJ1bGVzLmZpbmQoKHsgdHlwZTogdCB9KSA9PiB0ID09PSBkYXRhVHlwZSk7XG4gICAgaWYgKCFydWxlR3JvdXApIHtcbiAgICAgICAgcnVsZUdyb3VwID0geyB0eXBlOiBkYXRhVHlwZSwgcnVsZXM6IFtdIH07XG4gICAgICAgIFJVTEVTLnJ1bGVzLnB1c2gocnVsZUdyb3VwKTtcbiAgICB9XG4gICAgUlVMRVMua2V5d29yZHNba2V5d29yZF0gPSB0cnVlO1xuICAgIGlmICghZGVmaW5pdGlvbilcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHJ1bGUgPSB7XG4gICAgICAgIGtleXdvcmQsXG4gICAgICAgIGRlZmluaXRpb246IHtcbiAgICAgICAgICAgIC4uLmRlZmluaXRpb24sXG4gICAgICAgICAgICB0eXBlOiAoMCwgZGF0YVR5cGVfMS5nZXRKU09OVHlwZXMpKGRlZmluaXRpb24udHlwZSksXG4gICAgICAgICAgICBzY2hlbWFUeXBlOiAoMCwgZGF0YVR5cGVfMS5nZXRKU09OVHlwZXMpKGRlZmluaXRpb24uc2NoZW1hVHlwZSksXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBpZiAoZGVmaW5pdGlvbi5iZWZvcmUpXG4gICAgICAgIGFkZEJlZm9yZVJ1bGUuY2FsbCh0aGlzLCBydWxlR3JvdXAsIHJ1bGUsIGRlZmluaXRpb24uYmVmb3JlKTtcbiAgICBlbHNlXG4gICAgICAgIHJ1bGVHcm91cC5ydWxlcy5wdXNoKHJ1bGUpO1xuICAgIFJVTEVTLmFsbFtrZXl3b3JkXSA9IHJ1bGU7XG4gICAgKF9hID0gZGVmaW5pdGlvbi5pbXBsZW1lbnRzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaCgoa3dkKSA9PiB0aGlzLmFkZEtleXdvcmQoa3dkKSk7XG59XG5mdW5jdGlvbiBhZGRCZWZvcmVSdWxlKHJ1bGVHcm91cCwgcnVsZSwgYmVmb3JlKSB7XG4gICAgY29uc3QgaSA9IHJ1bGVHcm91cC5ydWxlcy5maW5kSW5kZXgoKF9ydWxlKSA9PiBfcnVsZS5rZXl3b3JkID09PSBiZWZvcmUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgICAgcnVsZUdyb3VwLnJ1bGVzLnNwbGljZShpLCAwLCBydWxlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJ1bGVHcm91cC5ydWxlcy5wdXNoKHJ1bGUpO1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBydWxlICR7YmVmb3JlfSBpcyBub3QgZGVmaW5lZGApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGtleXdvcmRNZXRhc2NoZW1hKGRlZikge1xuICAgIGxldCB7IG1ldGFTY2hlbWEgfSA9IGRlZjtcbiAgICBpZiAobWV0YVNjaGVtYSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGRlZi4kZGF0YSAmJiB0aGlzLm9wdHMuJGRhdGEpXG4gICAgICAgIG1ldGFTY2hlbWEgPSBzY2hlbWFPckRhdGEobWV0YVNjaGVtYSk7XG4gICAgZGVmLnZhbGlkYXRlU2NoZW1hID0gdGhpcy5jb21waWxlKG1ldGFTY2hlbWEsIHRydWUpO1xufVxuY29uc3QgJGRhdGFSZWYgPSB7XG4gICAgJHJlZjogXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vYWp2LXZhbGlkYXRvci9hanYvbWFzdGVyL2xpYi9yZWZzL2RhdGEuanNvbiNcIixcbn07XG5mdW5jdGlvbiBzY2hlbWFPckRhdGEoc2NoZW1hKSB7XG4gICAgcmV0dXJuIHsgYW55T2Y6IFtzY2hlbWEsICRkYXRhUmVmXSB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hanYtdmFsaWRhdG9yL2Fqdi9pc3N1ZXMvODg5XG5jb25zdCBlcXVhbCA9IHJlcXVpcmUoXCJmYXN0LWRlZXAtZXF1YWxcIik7XG5lcXVhbC5jb2RlID0gJ3JlcXVpcmUoXCJhanYvZGlzdC9ydW50aW1lL2VxdWFsXCIpLmRlZmF1bHQnO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXF1YWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcXVhbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvcHVueWNvZGUuanMgLSBwdW55Y29kZS51Y3MyLmRlY29kZVxuZnVuY3Rpb24gdWNzMmxlbmd0aChzdHIpIHtcbiAgICBjb25zdCBsZW4gPSBzdHIubGVuZ3RoO1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBwb3MgPSAwO1xuICAgIGxldCB2YWx1ZTtcbiAgICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgICAgIGxlbmd0aCsrO1xuICAgICAgICB2YWx1ZSA9IHN0ci5jaGFyQ29kZUF0KHBvcysrKTtcbiAgICAgICAgaWYgKHZhbHVlID49IDB4ZDgwMCAmJiB2YWx1ZSA8PSAweGRiZmYgJiYgcG9zIDwgbGVuKSB7XG4gICAgICAgICAgICAvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHZhbHVlID0gc3RyLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgICAgIGlmICgodmFsdWUgJiAweGZjMDApID09PSAweGRjMDApXG4gICAgICAgICAgICAgICAgcG9zKys7IC8vIGxvdyBzdXJyb2dhdGVcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gdWNzMmxlbmd0aDtcbnVjczJsZW5ndGguY29kZSA9ICdyZXF1aXJlKFwiYWp2L2Rpc3QvcnVudGltZS91Y3MybGVuZ3RoXCIpLmRlZmF1bHQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dWNzMmxlbmd0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFZhbGlkYXRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihlcnJvcnMpIHtcbiAgICAgICAgc3VwZXIoXCJ2YWxpZGF0aW9uIGZhaWxlZFwiKTtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBlcnJvcnM7XG4gICAgICAgIHRoaXMuYWp2ID0gdGhpcy52YWxpZGF0aW9uID0gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWYWxpZGF0aW9uRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0aW9uX2Vycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcyA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGxlbiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSBtb3JlIHRoYW4gJHtsZW59IGl0ZW1zYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7bGVufX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxJdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IGl0ZW1zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgJ1wiYWRkaXRpb25hbEl0ZW1zXCIgaXMgaWdub3JlZCB3aGVuIFwiaXRlbXNcIiBpcyBub3QgYW4gYXJyYXkgb2Ygc2NoZW1hcycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zKGN4dCwgaXRlbXMpO1xuICAgIH0sXG59O1xuZnVuY3Rpb24gdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXMoY3h0LCBpdGVtcykge1xuICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBsZW46IGl0ZW1zLmxlbmd0aCB9KTtcbiAgICAgICAgY3h0LnBhc3MoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59IDw9ICR7aXRlbXMubGVuZ3RofWApO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIgJiYgISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLnZhcihcInZhbGlkXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA8PSAke2l0ZW1zLmxlbmd0aH1gKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHZhbGlkYXRlSXRlbXModmFsaWQpKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyh2YWxpZCkge1xuICAgICAgICBnZW4uZm9yUmFuZ2UoXCJpXCIsIGl0ZW1zLmxlbmd0aCwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7IGtleXdvcmQsIGRhdGFQcm9wOiBpLCBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLk51bSB9LCB2YWxpZCk7XG4gICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4gZ2VuLmJyZWFrKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlQWRkaXRpb25hbEl0ZW1zID0gdmFsaWRhdGVBZGRpdGlvbmFsSXRlbXM7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRpdGlvbmFsSXRlbXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJtdXN0IE5PVCBoYXZlIGFkZGl0aW9uYWwgcHJvcGVydGllc1wiLFxuICAgIHBhcmFtczogKHsgcGFyYW1zIH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHthZGRpdGlvbmFsUHJvcGVydHk6ICR7cGFyYW1zLmFkZGl0aW9uYWxQcm9wZXJ0eX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFtcIm9iamVjdFwiXSxcbiAgICBzY2hlbWFUeXBlOiBbXCJib29sZWFuXCIsIFwib2JqZWN0XCJdLFxuICAgIGFsbG93VW5kZWZpbmVkOiB0cnVlLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgZGF0YSwgZXJyc0NvdW50LCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFlcnJzQ291bnQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGNvbnN0IHsgYWxsRXJyb3JzLCBvcHRzIH0gPSBpdDtcbiAgICAgICAgaXQucHJvcHMgPSB0cnVlO1xuICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsICE9PSBcImFsbFwiICYmICgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBwcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykocGFyZW50U2NoZW1hLnByb3BlcnRpZXMpO1xuICAgICAgICBjb25zdCBwYXRQcm9wcyA9ICgwLCBjb2RlXzEuYWxsU2NoZW1hUHJvcGVydGllcykocGFyZW50U2NoZW1hLnBhdHRlcm5Qcm9wZXJ0aWVzKTtcbiAgICAgICAgY2hlY2tBZGRpdGlvbmFsUHJvcGVydGllcygpO1xuICAgICAgICBjeHQub2soKDAsIGNvZGVnZW5fMS5fKSBgJHtlcnJzQ291bnR9ID09PSAke25hbWVzXzEuZGVmYXVsdC5lcnJvcnN9YCk7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQWRkaXRpb25hbFByb3BlcnRpZXMoKSB7XG4gICAgICAgICAgICBnZW4uZm9ySW4oXCJrZXlcIiwgZGF0YSwgKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJvcHMubGVuZ3RoICYmICFwYXRQcm9wcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0eUNvZGUoa2V5KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZihpc0FkZGl0aW9uYWwoa2V5KSwgKCkgPT4gYWRkaXRpb25hbFByb3BlcnR5Q29kZShrZXkpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzQWRkaXRpb25hbChrZXkpIHtcbiAgICAgICAgICAgIGxldCBkZWZpbmVkUHJvcDtcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggPiA4KSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBtYXliZSBhbiBvcHRpb24gaW5zdGVhZCBvZiBoYXJkLWNvZGVkIDg/XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHNTY2hlbWEgPSAoMCwgdXRpbF8xLnNjaGVtYVJlZk9yVmFsKShpdCwgcGFyZW50U2NoZW1hLnByb3BlcnRpZXMsIFwicHJvcGVydGllc1wiKTtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9ICgwLCBjb2RlXzEuaXNPd25Qcm9wZXJ0eSkoZ2VuLCBwcm9wc1NjaGVtYSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRlZmluZWRQcm9wID0gKDAsIGNvZGVnZW5fMS5vcikoLi4ucHJvcHMubWFwKChwKSA9PiAoMCwgY29kZWdlbl8xLl8pIGAke2tleX0gPT09ICR7cH1gKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVkUHJvcCA9IGNvZGVnZW5fMS5uaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0UHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lZFByb3AgPSAoMCwgY29kZWdlbl8xLm9yKShkZWZpbmVkUHJvcCwgLi4ucGF0UHJvcHMubWFwKChwKSA9PiAoMCwgY29kZWdlbl8xLl8pIGAkeygwLCBjb2RlXzEudXNlUGF0dGVybikoY3h0LCBwKX0udGVzdCgke2tleX0pYCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEubm90KShkZWZpbmVkUHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlQWRkaXRpb25hbChrZXkpIHtcbiAgICAgICAgICAgIGdlbi5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYGRlbGV0ZSAke2RhdGF9WyR7a2V5fV1gKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhZGRpdGlvbmFsUHJvcGVydHlDb2RlKGtleSkge1xuICAgICAgICAgICAgaWYgKG9wdHMucmVtb3ZlQWRkaXRpb25hbCA9PT0gXCJhbGxcIiB8fCAob3B0cy5yZW1vdmVBZGRpdGlvbmFsICYmIHNjaGVtYSA9PT0gZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlQWRkaXRpb25hbChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY2hlbWEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGFkZGl0aW9uYWxQcm9wZXJ0eToga2V5IH0pO1xuICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghYWxsRXJyb3JzKVxuICAgICAgICAgICAgICAgICAgICBnZW4uYnJlYWsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PSBcIm9iamVjdFwiICYmICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5yZW1vdmVBZGRpdGlvbmFsID09PSBcImZhaWxpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUFkZGl0aW9uYWxTY2hlbWEoa2V5LCB2YWxpZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3h0LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVBZGRpdGlvbmFsKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlBZGRpdGlvbmFsU2NoZW1hKGtleSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5QWRkaXRpb25hbFNjaGVtYShrZXksIHZhbGlkLCBlcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnNjaGVtYSA9IHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgZGF0YVByb3A6IGtleSxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLlN0cixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZXJyb3JzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3Vic2NoZW1hLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFsbEVycm9yczogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHN1YnNjaGVtYSwgdmFsaWQpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGRpdGlvbmFsUHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhbGxPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhanYgaW1wbGVtZW50YXRpb24gZXJyb3JcIik7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgc2NoZW1hLmZvckVhY2goKHNjaCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkOiBcImFsbE9mXCIsIHNjaGVtYVByb3A6IGkgfSwgdmFsaWQpO1xuICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZUV2YWx1YXRlZChzY2hDeHQpO1xuICAgICAgICB9KTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFsbE9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJhbnlPZlwiLFxuICAgIHNjaGVtYVR5cGU6IFwiYXJyYXlcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBjb2RlOiBjb2RlXzEudmFsaWRhdGVVbmlvbixcbiAgICBlcnJvcjogeyBtZXNzYWdlOiBcIm11c3QgbWF0Y2ggYSBzY2hlbWEgaW4gYW55T2ZcIiB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFueU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbWluLCBtYXggfSB9KSA9PiBtYXggPT09IHVuZGVmaW5lZFxuICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bWlufSB2YWxpZCBpdGVtKHMpYFxuICAgICAgICA6ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bWlufSBhbmQgbm8gbW9yZSB0aGFuICR7bWF4fSB2YWxpZCBpdGVtKHMpYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtczogeyBtaW4sIG1heCB9IH0pID0+IG1heCA9PT0gdW5kZWZpbmVkID8gKDAsIGNvZGVnZW5fMS5fKSBge21pbkNvbnRhaW5zOiAke21pbn19YCA6ICgwLCBjb2RlZ2VuXzEuXykgYHttaW5Db250YWluczogJHttaW59LCBtYXhDb250YWluczogJHttYXh9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiY29udGFpbnNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBiZWZvcmU6IFwidW5pcXVlSXRlbXNcIixcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGxldCBtaW47XG4gICAgICAgIGxldCBtYXg7XG4gICAgICAgIGNvbnN0IHsgbWluQ29udGFpbnMsIG1heENvbnRhaW5zIH0gPSBwYXJlbnRTY2hlbWE7XG4gICAgICAgIGlmIChpdC5vcHRzLm5leHQpIHtcbiAgICAgICAgICAgIG1pbiA9IG1pbkNvbnRhaW5zID09PSB1bmRlZmluZWQgPyAxIDogbWluQ29udGFpbnM7XG4gICAgICAgICAgICBtYXggPSBtYXhDb250YWlucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1pbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGVuID0gZ2VuLmNvbnN0KFwibGVuXCIsICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0ubGVuZ3RoYCk7XG4gICAgICAgIGN4dC5zZXRQYXJhbXMoeyBtaW4sIG1heCB9KTtcbiAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkICYmIG1pbiA9PT0gMCkge1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBgXCJtaW5Db250YWluc1wiID09IDAgd2l0aG91dCBcIm1heENvbnRhaW5zXCI6IFwiY29udGFpbnNcIiBrZXl3b3JkIGlnbm9yZWRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4ICE9PSB1bmRlZmluZWQgJiYgbWluID4gbWF4KSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBcIm1pbkNvbnRhaW5zXCIgPiBcIm1heENvbnRhaW5zXCIgaXMgYWx3YXlzIGludmFsaWRgKTtcbiAgICAgICAgICAgIGN4dC5mYWlsKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICBsZXQgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSA+PSAke21pbn1gO1xuICAgICAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGNvbmQgPSAoMCwgY29kZWdlbl8xLl8pIGAke2NvbmR9ICYmICR7bGVufSA8PSAke21heH1gO1xuICAgICAgICAgICAgY3h0LnBhc3MoY29uZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgIGlmIChtYXggPT09IHVuZGVmaW5lZCAmJiBtaW4gPT09IDEpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXModmFsaWQsICgpID0+IGdlbi5pZih2YWxpZCwgKCkgPT4gZ2VuLmJyZWFrKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5sZXQodmFsaWQsIGZhbHNlKTtcbiAgICAgICAgICAgIGNvbnN0IHNjaFZhbGlkID0gZ2VuLm5hbWUoXCJfdmFsaWRcIik7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGdlbi5sZXQoXCJjb3VudFwiLCAwKTtcbiAgICAgICAgICAgIHZhbGlkYXRlSXRlbXMoc2NoVmFsaWQsICgpID0+IGdlbi5pZihzY2hWYWxpZCwgKCkgPT4gY2hlY2tMaW1pdHMoY291bnQpKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3h0LnJlc3VsdCh2YWxpZCwgKCkgPT4gY3h0LnJlc2V0KCkpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUl0ZW1zKF92YWxpZCwgYmxvY2spIHtcbiAgICAgICAgICAgIGdlbi5mb3JSYW5nZShcImlcIiwgMCwgbGVuLCAoaSkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImNvbnRhaW5zXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcFR5cGU6IHV0aWxfMS5UeXBlLk51bSxcbiAgICAgICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LCBfdmFsaWQpO1xuICAgICAgICAgICAgICAgIGJsb2NrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjaGVja0xpbWl0cyhjb3VudCkge1xuICAgICAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgJHtjb3VudH0rK2ApO1xuICAgICAgICAgICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9ID49ICR7bWlufWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpLmJyZWFrKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9ID4gJHttYXh9YCwgKCkgPT4gZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpLmJyZWFrKCkpO1xuICAgICAgICAgICAgICAgIGlmIChtaW4gPT09IDEpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7Y291bnR9ID49ICR7bWlufWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGFpbnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZhbGlkYXRlU2NoZW1hRGVwcyA9IGV4cG9ydHMudmFsaWRhdGVQcm9wZXJ0eURlcHMgPSBleHBvcnRzLmVycm9yID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmV4cG9ydHMuZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IHByb3BlcnR5LCBkZXBzQ291bnQsIGRlcHMgfSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5X2llcyA9IGRlcHNDb3VudCA9PT0gMSA/IFwicHJvcGVydHlcIiA6IFwicHJvcGVydGllc1wiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGhhdmUgJHtwcm9wZXJ0eV9pZXN9ICR7ZGVwc30gd2hlbiBwcm9wZXJ0eSAke3Byb3BlcnR5fSBpcyBwcmVzZW50YDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IHByb3BlcnR5LCBkZXBzQ291bnQsIGRlcHMsIG1pc3NpbmdQcm9wZXJ0eSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtwcm9wZXJ0eTogJHtwcm9wZXJ0eX0sXG4gICAgbWlzc2luZ1Byb3BlcnR5OiAke21pc3NpbmdQcm9wZXJ0eX0sXG4gICAgZGVwc0NvdW50OiAke2RlcHNDb3VudH0sXG4gICAgZGVwczogJHtkZXBzfX1gLCAvLyBUT0RPIGNoYW5nZSB0byByZWZlcmVuY2Vcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJkZXBlbmRlbmNpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgZXJyb3I6IGV4cG9ydHMuZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgW3Byb3BEZXBzLCBzY2hEZXBzXSA9IHNwbGl0RGVwZW5kZW5jaWVzKGN4dCk7XG4gICAgICAgIHZhbGlkYXRlUHJvcGVydHlEZXBzKGN4dCwgcHJvcERlcHMpO1xuICAgICAgICB2YWxpZGF0ZVNjaGVtYURlcHMoY3h0LCBzY2hEZXBzKTtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHNwbGl0RGVwZW5kZW5jaWVzKHsgc2NoZW1hIH0pIHtcbiAgICBjb25zdCBwcm9wZXJ0eURlcHMgPSB7fTtcbiAgICBjb25zdCBzY2hlbWFEZXBzID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgIGlmIChrZXkgPT09IFwiX19wcm90b19fXCIpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgZGVwcyA9IEFycmF5LmlzQXJyYXkoc2NoZW1hW2tleV0pID8gcHJvcGVydHlEZXBzIDogc2NoZW1hRGVwcztcbiAgICAgICAgZGVwc1trZXldID0gc2NoZW1hW2tleV07XG4gICAgfVxuICAgIHJldHVybiBbcHJvcGVydHlEZXBzLCBzY2hlbWFEZXBzXTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydHlEZXBzKGN4dCwgcHJvcGVydHlEZXBzID0gY3h0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGlmIChPYmplY3Qua2V5cyhwcm9wZXJ0eURlcHMpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IG1pc3NpbmcgPSBnZW4ubGV0KFwibWlzc2luZ1wiKTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcGVydHlEZXBzKSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSBwcm9wZXJ0eURlcHNbcHJvcF07XG4gICAgICAgIGlmIChkZXBzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBoYXNQcm9wZXJ0eSA9ICgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKTtcbiAgICAgICAgY3h0LnNldFBhcmFtcyh7XG4gICAgICAgICAgICBwcm9wZXJ0eTogcHJvcCxcbiAgICAgICAgICAgIGRlcHNDb3VudDogZGVwcy5sZW5ndGgsXG4gICAgICAgICAgICBkZXBzOiBkZXBzLmpvaW4oXCIsIFwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgICAgIGdlbi5pZihoYXNQcm9wZXJ0eSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGVwUHJvcCBvZiBkZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICgwLCBjb2RlXzEuY2hlY2tSZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBkZXBQcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGAke2hhc1Byb3BlcnR5fSAmJiAoJHsoMCwgY29kZV8xLmNoZWNrTWlzc2luZ1Byb3ApKGN4dCwgZGVwcywgbWlzc2luZyl9KWApO1xuICAgICAgICAgICAgKDAsIGNvZGVfMS5yZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBtaXNzaW5nKTtcbiAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLnZhbGlkYXRlUHJvcGVydHlEZXBzID0gdmFsaWRhdGVQcm9wZXJ0eURlcHM7XG5mdW5jdGlvbiB2YWxpZGF0ZVNjaGVtYURlcHMoY3h0LCBzY2hlbWFEZXBzID0gY3h0LnNjaGVtYSkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBrZXl3b3JkLCBpdCB9ID0gY3h0O1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gc2NoZW1hRGVwcykge1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYURlcHNbcHJvcF0pKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZV8xLnByb3BlcnR5SW5EYXRhKShnZW4sIGRhdGEsIHByb3AsIGl0Lm9wdHMub3duUHJvcGVydGllcyksICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoeyBrZXl3b3JkLCBzY2hlbWFQcm9wOiBwcm9wIH0sIHZhbGlkKTtcbiAgICAgICAgICAgIGN4dC5tZXJnZVZhbGlkRXZhbHVhdGVkKHNjaEN4dCwgdmFsaWQpO1xuICAgICAgICB9LCAoKSA9PiBnZW4udmFyKHZhbGlkLCB0cnVlKSAvLyBUT0RPIHZhclxuICAgICAgICApO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVTY2hlbWFEZXBzID0gdmFsaWRhdGVTY2hlbWFEZXBzO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVwZW5kZW5jaWVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IG1hdGNoIFwiJHtwYXJhbXMuaWZDbGF1c2V9XCIgc2NoZW1hYCxcbiAgICBwYXJhbXM6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7ZmFpbGluZ0tleXdvcmQ6ICR7cGFyYW1zLmlmQ2xhdXNlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImlmXCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICB0cmFja0Vycm9yczogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgcGFyZW50U2NoZW1hLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAocGFyZW50U2NoZW1hLnRoZW4gPT09IHVuZGVmaW5lZCAmJiBwYXJlbnRTY2hlbWEuZWxzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsICdcImlmXCIgd2l0aG91dCBcInRoZW5cIiBhbmQgXCJlbHNlXCIgaXMgaWdub3JlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhc1RoZW4gPSBoYXNTY2hlbWEoaXQsIFwidGhlblwiKTtcbiAgICAgICAgY29uc3QgaGFzRWxzZSA9IGhhc1NjaGVtYShpdCwgXCJlbHNlXCIpO1xuICAgICAgICBpZiAoIWhhc1RoZW4gJiYgIWhhc0Vsc2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIHRydWUpO1xuICAgICAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgICAgICB2YWxpZGF0ZUlmKCk7XG4gICAgICAgIGN4dC5yZXNldCgpO1xuICAgICAgICBpZiAoaGFzVGhlbiAmJiBoYXNFbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBpZkNsYXVzZSA9IGdlbi5sZXQoXCJpZkNsYXVzZVwiKTtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBpZkNsYXVzZSB9KTtcbiAgICAgICAgICAgIGdlbi5pZihzY2hWYWxpZCwgdmFsaWRhdGVDbGF1c2UoXCJ0aGVuXCIsIGlmQ2xhdXNlKSwgdmFsaWRhdGVDbGF1c2UoXCJlbHNlXCIsIGlmQ2xhdXNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzVGhlbikge1xuICAgICAgICAgICAgZ2VuLmlmKHNjaFZhbGlkLCB2YWxpZGF0ZUNsYXVzZShcInRoZW5cIikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KShzY2hWYWxpZCksIHZhbGlkYXRlQ2xhdXNlKFwiZWxzZVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3h0LnBhc3ModmFsaWQsICgpID0+IGN4dC5lcnJvcih0cnVlKSk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlSWYoKSB7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImlmXCIsXG4gICAgICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVFcnJvcnM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFsbEVycm9yczogZmFsc2UsXG4gICAgICAgICAgICB9LCBzY2hWYWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUNsYXVzZShrZXl3b3JkLCBpZkNsYXVzZSkge1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHsga2V5d29yZCB9LCBzY2hWYWxpZCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgc2NoVmFsaWQpO1xuICAgICAgICAgICAgICAgIGN4dC5tZXJnZVZhbGlkRXZhbHVhdGVkKHNjaEN4dCwgdmFsaWQpO1xuICAgICAgICAgICAgICAgIGlmIChpZkNsYXVzZSlcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmFzc2lnbihpZkNsYXVzZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtrZXl3b3JkfWApO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IGlmQ2xhdXNlOiBrZXl3b3JkIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZnVuY3Rpb24gaGFzU2NoZW1hKGl0LCBrZXl3b3JkKSB7XG4gICAgY29uc3Qgc2NoZW1hID0gaXQuc2NoZW1hW2tleXdvcmRdO1xuICAgIHJldHVybiBzY2hlbWEgIT09IHVuZGVmaW5lZCAmJiAhKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFkZGl0aW9uYWxJdGVtc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbEl0ZW1zXCIpO1xuY29uc3QgcHJlZml4SXRlbXNfMSA9IHJlcXVpcmUoXCIuL3ByZWZpeEl0ZW1zXCIpO1xuY29uc3QgaXRlbXNfMSA9IHJlcXVpcmUoXCIuL2l0ZW1zXCIpO1xuY29uc3QgaXRlbXMyMDIwXzEgPSByZXF1aXJlKFwiLi9pdGVtczIwMjBcIik7XG5jb25zdCBjb250YWluc18xID0gcmVxdWlyZShcIi4vY29udGFpbnNcIik7XG5jb25zdCBkZXBlbmRlbmNpZXNfMSA9IHJlcXVpcmUoXCIuL2RlcGVuZGVuY2llc1wiKTtcbmNvbnN0IHByb3BlcnR5TmFtZXNfMSA9IHJlcXVpcmUoXCIuL3Byb3BlcnR5TmFtZXNcIik7XG5jb25zdCBhZGRpdGlvbmFsUHJvcGVydGllc18xID0gcmVxdWlyZShcIi4vYWRkaXRpb25hbFByb3BlcnRpZXNcIik7XG5jb25zdCBwcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9wcm9wZXJ0aWVzXCIpO1xuY29uc3QgcGF0dGVyblByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL3BhdHRlcm5Qcm9wZXJ0aWVzXCIpO1xuY29uc3Qgbm90XzEgPSByZXF1aXJlKFwiLi9ub3RcIik7XG5jb25zdCBhbnlPZl8xID0gcmVxdWlyZShcIi4vYW55T2ZcIik7XG5jb25zdCBvbmVPZl8xID0gcmVxdWlyZShcIi4vb25lT2ZcIik7XG5jb25zdCBhbGxPZl8xID0gcmVxdWlyZShcIi4vYWxsT2ZcIik7XG5jb25zdCBpZl8xID0gcmVxdWlyZShcIi4vaWZcIik7XG5jb25zdCB0aGVuRWxzZV8xID0gcmVxdWlyZShcIi4vdGhlbkVsc2VcIik7XG5mdW5jdGlvbiBnZXRBcHBsaWNhdG9yKGRyYWZ0MjAyMCA9IGZhbHNlKSB7XG4gICAgY29uc3QgYXBwbGljYXRvciA9IFtcbiAgICAgICAgLy8gYW55XG4gICAgICAgIG5vdF8xLmRlZmF1bHQsXG4gICAgICAgIGFueU9mXzEuZGVmYXVsdCxcbiAgICAgICAgb25lT2ZfMS5kZWZhdWx0LFxuICAgICAgICBhbGxPZl8xLmRlZmF1bHQsXG4gICAgICAgIGlmXzEuZGVmYXVsdCxcbiAgICAgICAgdGhlbkVsc2VfMS5kZWZhdWx0LFxuICAgICAgICAvLyBvYmplY3RcbiAgICAgICAgcHJvcGVydHlOYW1lc18xLmRlZmF1bHQsXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICAgICAgZGVwZW5kZW5jaWVzXzEuZGVmYXVsdCxcbiAgICAgICAgcHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgICAgIHBhdHRlcm5Qcm9wZXJ0aWVzXzEuZGVmYXVsdCxcbiAgICBdO1xuICAgIC8vIGFycmF5XG4gICAgaWYgKGRyYWZ0MjAyMClcbiAgICAgICAgYXBwbGljYXRvci5wdXNoKHByZWZpeEl0ZW1zXzEuZGVmYXVsdCwgaXRlbXMyMDIwXzEuZGVmYXVsdCk7XG4gICAgZWxzZVxuICAgICAgICBhcHBsaWNhdG9yLnB1c2goYWRkaXRpb25hbEl0ZW1zXzEuZGVmYXVsdCwgaXRlbXNfMS5kZWZhdWx0KTtcbiAgICBhcHBsaWNhdG9yLnB1c2goY29udGFpbnNfMS5kZWZhdWx0KTtcbiAgICByZXR1cm4gYXBwbGljYXRvcjtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGdldEFwcGxpY2F0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmFsaWRhdGVUdXBsZSA9IHZvaWQgMDtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJhcnJheVwiLCBcImJvb2xlYW5cIl0sXG4gICAgYmVmb3JlOiBcInVuaXF1ZUl0ZW1zXCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBzY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVUdXBsZShjeHQsIFwiYWRkaXRpb25hbEl0ZW1zXCIsIHNjaGVtYSk7XG4gICAgICAgIGl0Lml0ZW1zID0gdHJ1ZTtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjeHQub2soKDAsIGNvZGVfMS52YWxpZGF0ZUFycmF5KShjeHQpKTtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHZhbGlkYXRlVHVwbGUoY3h0LCBleHRyYUl0ZW1zLCBzY2hBcnIgPSBjeHQuc2NoZW1hKSB7XG4gICAgY29uc3QgeyBnZW4sIHBhcmVudFNjaGVtYSwgZGF0YSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICBjaGVja1N0cmljdFR1cGxlKHBhcmVudFNjaGVtYSk7XG4gICAgaWYgKGl0Lm9wdHMudW5ldmFsdWF0ZWQgJiYgc2NoQXJyLmxlbmd0aCAmJiBpdC5pdGVtcyAhPT0gdHJ1ZSkge1xuICAgICAgICBpdC5pdGVtcyA9IHV0aWxfMS5tZXJnZUV2YWx1YXRlZC5pdGVtcyhnZW4sIHNjaEFyci5sZW5ndGgsIGl0Lml0ZW1zKTtcbiAgICB9XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGNvbnN0IGxlbiA9IGdlbi5jb25zdChcImxlblwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9Lmxlbmd0aGApO1xuICAgIHNjaEFyci5mb3JFYWNoKChzY2gsIGkpID0+IHtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2gpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtsZW59ID4gJHtpfWAsICgpID0+IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAga2V5d29yZCxcbiAgICAgICAgICAgIHNjaGVtYVByb3A6IGksXG4gICAgICAgICAgICBkYXRhUHJvcDogaSxcbiAgICAgICAgfSwgdmFsaWQpKTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBjaGVja1N0cmljdFR1cGxlKHNjaCkge1xuICAgICAgICBjb25zdCB7IG9wdHMsIGVyclNjaGVtYVBhdGggfSA9IGl0O1xuICAgICAgICBjb25zdCBsID0gc2NoQXJyLmxlbmd0aDtcbiAgICAgICAgY29uc3QgZnVsbFR1cGxlID0gbCA9PT0gc2NoLm1pbkl0ZW1zICYmIChsID09PSBzY2gubWF4SXRlbXMgfHwgc2NoW2V4dHJhSXRlbXNdID09PSBmYWxzZSk7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdFR1cGxlcyAmJiAhZnVsbFR1cGxlKSB7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSBgXCIke2tleXdvcmR9XCIgaXMgJHtsfS10dXBsZSwgYnV0IG1pbkl0ZW1zIG9yIG1heEl0ZW1zLyR7ZXh0cmFJdGVtc30gYXJlIG5vdCBzcGVjaWZpZWQgb3IgZGlmZmVyZW50IGF0IHBhdGggXCIke2VyclNjaGVtYVBhdGh9XCJgO1xuICAgICAgICAgICAgKDAsIHV0aWxfMS5jaGVja1N0cmljdE1vZGUpKGl0LCBtc2csIG9wdHMuc3RyaWN0VHVwbGVzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMudmFsaWRhdGVUdXBsZSA9IHZhbGlkYXRlVHVwbGU7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBhZGRpdGlvbmFsSXRlbXNfMSA9IHJlcXVpcmUoXCIuL2FkZGl0aW9uYWxJdGVtc1wiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBsZW4gfSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgTk9UIGhhdmUgbW9yZSB0aGFuICR7bGVufSBpdGVtc2AsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgbGVuIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke2xlbn19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpdGVtc1wiLFxuICAgIHR5cGU6IFwiYXJyYXlcIixcbiAgICBzY2hlbWFUeXBlOiBbXCJvYmplY3RcIiwgXCJib29sZWFuXCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgcHJlZml4SXRlbXMgfSA9IHBhcmVudFNjaGVtYTtcbiAgICAgICAgaXQuaXRlbXMgPSB0cnVlO1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChwcmVmaXhJdGVtcylcbiAgICAgICAgICAgICgwLCBhZGRpdGlvbmFsSXRlbXNfMS52YWxpZGF0ZUFkZGl0aW9uYWxJdGVtcykoY3h0LCBwcmVmaXhJdGVtcyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGN4dC5vaygoMCwgY29kZV8xLnZhbGlkYXRlQXJyYXkpKGN4dCkpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlbXMyMDIwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIm5vdFwiLFxuICAgIHNjaGVtYVR5cGU6IFtcIm9iamVjdFwiLCBcImJvb2xlYW5cIl0sXG4gICAgdHJhY2tFcnJvcnM6IHRydWUsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWEpKSB7XG4gICAgICAgICAgICBjeHQuZmFpbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICBrZXl3b3JkOiBcIm5vdFwiLFxuICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNyZWF0ZUVycm9yczogZmFsc2UsXG4gICAgICAgICAgICBhbGxFcnJvcnM6IGZhbHNlLFxuICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgIGN4dC5mYWlsUmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSwgKCkgPT4gY3h0LmVycm9yKCkpO1xuICAgIH0sXG4gICAgZXJyb3I6IHsgbWVzc2FnZTogXCJtdXN0IE5PVCBiZSB2YWxpZFwiIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm90LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgbWF0Y2ggZXhhY3RseSBvbmUgc2NoZW1hIGluIG9uZU9mXCIsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXMgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge3Bhc3NpbmdTY2hlbWFzOiAke3BhcmFtcy5wYXNzaW5nfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcIm9uZU9mXCIsXG4gICAgc2NoZW1hVHlwZTogXCJhcnJheVwiLFxuICAgIHRyYWNrRXJyb3JzOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQgfSA9IGN4dDtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzY2hlbWEpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICBpZiAoaXQub3B0cy5kaXNjcmltaW5hdG9yICYmIHBhcmVudFNjaGVtYS5kaXNjcmltaW5hdG9yKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBzY2hBcnIgPSBzY2hlbWE7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgcGFzc2luZyA9IGdlbi5sZXQoXCJwYXNzaW5nXCIsIG51bGwpO1xuICAgICAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHsgcGFzc2luZyB9KTtcbiAgICAgICAgLy8gVE9ETyBwb3NzaWJseSBmYWlsIHN0cmFpZ2h0IGF3YXkgKHdpdGggd2FybmluZyBvciBleGNlcHRpb24pIGlmIHRoZXJlIGFyZSB0d28gZW1wdHkgYWx3YXlzIHZhbGlkIHNjaGVtYXNcbiAgICAgICAgZ2VuLmJsb2NrKHZhbGlkYXRlT25lT2YpO1xuICAgICAgICBjeHQucmVzdWx0KHZhbGlkLCAoKSA9PiBjeHQucmVzZXQoKSwgKCkgPT4gY3h0LmVycm9yKHRydWUpKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVPbmVPZigpIHtcbiAgICAgICAgICAgIHNjaEFyci5mb3JFYWNoKChzY2gsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2NoQ3h0O1xuICAgICAgICAgICAgICAgIGlmICgoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoKSkge1xuICAgICAgICAgICAgICAgICAgICBnZW4udmFyKHNjaFZhbGlkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaEN4dCA9IGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5d29yZDogXCJvbmVPZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hUHJvcDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2l0ZVJ1bGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0sIHNjaFZhbGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlblxuICAgICAgICAgICAgICAgICAgICAgICAgLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoVmFsaWR9ICYmICR7dmFsaWR9YClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hc3NpZ24odmFsaWQsIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFzc2lnbihwYXNzaW5nLCAoMCwgY29kZWdlbl8xLl8pIGBbJHtwYXNzaW5nfSwgJHtpfV1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVsc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2VuLmlmKHNjaFZhbGlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKHBhc3NpbmcsIGkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoQ3h0KVxuICAgICAgICAgICAgICAgICAgICAgICAgY3h0Lm1lcmdlRXZhbHVhdGVkKHNjaEN4dCwgY29kZWdlbl8xLk5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9uZU9mLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZV8xID0gcmVxdWlyZShcIi4uL2NvZGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IHV0aWxfMiA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJwYXR0ZXJuUHJvcGVydGllc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IHBhdHRlcm5zID0gKDAsIGNvZGVfMS5hbGxTY2hlbWFQcm9wZXJ0aWVzKShzY2hlbWEpO1xuICAgICAgICBjb25zdCBhbHdheXNWYWxpZFBhdHRlcm5zID0gcGF0dGVybnMuZmlsdGVyKChwKSA9PiAoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hW3BdKSk7XG4gICAgICAgIGlmIChwYXR0ZXJucy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgIChhbHdheXNWYWxpZFBhdHRlcm5zLmxlbmd0aCA9PT0gcGF0dGVybnMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgKCFpdC5vcHRzLnVuZXZhbHVhdGVkIHx8IGl0LnByb3BzID09PSB0cnVlKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGVja1Byb3BlcnRpZXMgPSBvcHRzLnN0cmljdFNjaGVtYSAmJiAhb3B0cy5hbGxvd01hdGNoaW5nUHJvcGVydGllcyAmJiBwYXJlbnRTY2hlbWEucHJvcGVydGllcztcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUgJiYgIShpdC5wcm9wcyBpbnN0YW5jZW9mIGNvZGVnZW5fMS5OYW1lKSkge1xuICAgICAgICAgICAgaXQucHJvcHMgPSAoMCwgdXRpbF8yLmV2YWx1YXRlZFByb3BzVG9OYW1lKShnZW4sIGl0LnByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHByb3BzIH0gPSBpdDtcbiAgICAgICAgdmFsaWRhdGVQYXR0ZXJuUHJvcGVydGllcygpO1xuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZVBhdHRlcm5Qcm9wZXJ0aWVzKCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXQgb2YgcGF0dGVybnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgICAgICBjaGVja01hdGNoaW5nUHJvcGVydGllcyhwYXQpO1xuICAgICAgICAgICAgICAgIGlmIChpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzKHBhdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZW4udmFyKHZhbGlkLCB0cnVlKTsgLy8gVE9ETyB2YXJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzKHBhdCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5pZih2YWxpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrTWF0Y2hpbmdQcm9wZXJ0aWVzKHBhdCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGNoZWNrUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGlmIChuZXcgUmVnRXhwKHBhdCkudGVzdChwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgdXRpbF8xLmNoZWNrU3RyaWN0TW9kZSkoaXQsIGBwcm9wZXJ0eSAke3Byb3B9IG1hdGNoZXMgcGF0dGVybiAke3BhdH0gKHVzZSBhbGxvd01hdGNoaW5nUHJvcGVydGllcylgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0aWVzKHBhdCkge1xuICAgICAgICAgICAgZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHsoMCwgY29kZV8xLnVzZVBhdHRlcm4pKGN4dCwgcGF0KX0udGVzdCgke2tleX0pYCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbHdheXNWYWxpZCA9IGFsd2F5c1ZhbGlkUGF0dGVybnMuaW5jbHVkZXMocGF0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbHdheXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5d29yZDogXCJwYXR0ZXJuUHJvcGVydGllc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYVByb3A6IHBhdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUHJvcDoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8yLlR5cGUuU3RyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdC5vcHRzLnVuZXZhbHVhdGVkICYmIHByb3BzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKCgwLCBjb2RlZ2VuXzEuXykgYCR7cHJvcHN9WyR7a2V5fV1gLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghYWx3YXlzVmFsaWQgJiYgIWl0LmFsbEVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FuIHNob3J0LWNpcmN1aXQgaWYgYHVuZXZhbHVhdGVkUHJvcGVydGllc2AgaXMgbm90IHN1cHBvcnRlZCAob3B0cy5uZXh0ID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9yIGlmIGFsbCBwcm9wZXJ0aWVzIHdlcmUgZXZhbHVhdGVkIChwcm9wcyA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLm5vdCkodmFsaWQpLCAoKSA9PiBnZW4uYnJlYWsoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXR0ZXJuUHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGl0ZW1zXzEgPSByZXF1aXJlKFwiLi9pdGVtc1wiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInByZWZpeEl0ZW1zXCIsXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFtcImFycmF5XCJdLFxuICAgIGJlZm9yZTogXCJ1bmlxdWVJdGVtc1wiLFxuICAgIGNvZGU6IChjeHQpID0+ICgwLCBpdGVtc18xLnZhbGlkYXRlVHVwbGUpKGN4dCwgXCJpdGVtc1wiKSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVmaXhJdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZhbGlkYXRlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS92YWxpZGF0ZVwiKTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzXzEgPSByZXF1aXJlKFwiLi9hZGRpdGlvbmFsUHJvcGVydGllc1wiKTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInByb3BlcnRpZXNcIixcbiAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgIHNjaGVtYVR5cGU6IFwib2JqZWN0XCIsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgcGFyZW50U2NoZW1hLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoaXQub3B0cy5yZW1vdmVBZGRpdGlvbmFsID09PSBcImFsbFwiICYmIHBhcmVudFNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllc18xLmRlZmF1bHQuY29kZShuZXcgdmFsaWRhdGVfMS5LZXl3b3JkQ3h0KGl0LCBhZGRpdGlvbmFsUHJvcGVydGllc18xLmRlZmF1bHQsIFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbFByb3BzID0gKDAsIGNvZGVfMS5hbGxTY2hlbWFQcm9wZXJ0aWVzKShzY2hlbWEpO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgYWxsUHJvcHMpIHtcbiAgICAgICAgICAgIGl0LmRlZmluZWRQcm9wZXJ0aWVzLmFkZChwcm9wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQub3B0cy51bmV2YWx1YXRlZCAmJiBhbGxQcm9wcy5sZW5ndGggJiYgaXQucHJvcHMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGl0LnByb3BzID0gdXRpbF8xLm1lcmdlRXZhbHVhdGVkLnByb3BzKGdlbiwgKDAsIHV0aWxfMS50b0hhc2gpKGFsbFByb3BzKSwgaXQucHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhbGxQcm9wcy5maWx0ZXIoKHApID0+ICEoMCwgdXRpbF8xLmFsd2F5c1ZhbGlkU2NoZW1hKShpdCwgc2NoZW1hW3BdKSk7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKGhhc0RlZmF1bHQocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBhcHBseVByb3BlcnR5U2NoZW1hKHByb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlXzEucHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKSk7XG4gICAgICAgICAgICAgICAgYXBwbHlQcm9wZXJ0eVNjaGVtYShwcm9wKTtcbiAgICAgICAgICAgICAgICBpZiAoIWl0LmFsbEVycm9ycylcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmVsc2UoKS52YXIodmFsaWQsIHRydWUpO1xuICAgICAgICAgICAgICAgIGdlbi5lbmRJZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3h0Lml0LmRlZmluZWRQcm9wZXJ0aWVzLmFkZChwcm9wKTtcbiAgICAgICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFzRGVmYXVsdChwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gaXQub3B0cy51c2VEZWZhdWx0cyAmJiAhaXQuY29tcG9zaXRlUnVsZSAmJiBzY2hlbWFbcHJvcF0uZGVmYXVsdCAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5UHJvcGVydHlTY2hlbWEocHJvcCkge1xuICAgICAgICAgICAgY3h0LnN1YnNjaGVtYSh7XG4gICAgICAgICAgICAgICAga2V5d29yZDogXCJwcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICAgICAgc2NoZW1hUHJvcDogcHJvcCxcbiAgICAgICAgICAgICAgICBkYXRhUHJvcDogcHJvcCxcbiAgICAgICAgICAgIH0sIHZhbGlkKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogXCJwcm9wZXJ0eSBuYW1lIG11c3QgYmUgdmFsaWRcIixcbiAgICBwYXJhbXM6ICh7IHBhcmFtcyB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7cHJvcGVydHlOYW1lOiAke3BhcmFtcy5wcm9wZXJ0eU5hbWV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwicHJvcGVydHlOYW1lc1wiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgICAgICBpZiAoKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaGVtYSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLm5hbWUoXCJ2YWxpZFwiKTtcbiAgICAgICAgZ2VuLmZvckluKFwia2V5XCIsIGRhdGEsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBwcm9wZXJ0eU5hbWU6IGtleSB9KTtcbiAgICAgICAgICAgIGN4dC5zdWJzY2hlbWEoe1xuICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwicHJvcGVydHlOYW1lc1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGtleSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZXM6IFtcInN0cmluZ1wiXSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICBjb21wb3NpdGVSdWxlOiB0cnVlLFxuICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksICgpID0+IHtcbiAgICAgICAgICAgICAgICBjeHQuZXJyb3IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgICAgIGdlbi5icmVhaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjeHQub2sodmFsaWQpO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvcGVydHlOYW1lcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1widGhlblwiLCBcImVsc2VcIl0sXG4gICAgc2NoZW1hVHlwZTogW1wib2JqZWN0XCIsIFwiYm9vbGVhblwiXSxcbiAgICBjb2RlKHsga2V5d29yZCwgcGFyZW50U2NoZW1hLCBpdCB9KSB7XG4gICAgICAgIGlmIChwYXJlbnRTY2hlbWEuaWYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgYFwiJHtrZXl3b3JkfVwiIHdpdGhvdXQgXCJpZlwiIGlzIGlnbm9yZWRgKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRoZW5FbHNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52YWxpZGF0ZVVuaW9uID0gZXhwb3J0cy52YWxpZGF0ZUFycmF5ID0gZXhwb3J0cy51c2VQYXR0ZXJuID0gZXhwb3J0cy5jYWxsVmFsaWRhdGVDb2RlID0gZXhwb3J0cy5zY2hlbWFQcm9wZXJ0aWVzID0gZXhwb3J0cy5hbGxTY2hlbWFQcm9wZXJ0aWVzID0gZXhwb3J0cy5ub1Byb3BlcnR5SW5EYXRhID0gZXhwb3J0cy5wcm9wZXJ0eUluRGF0YSA9IGV4cG9ydHMuaXNPd25Qcm9wZXJ0eSA9IGV4cG9ydHMuaGFzUHJvcEZ1bmMgPSBleHBvcnRzLnJlcG9ydE1pc3NpbmdQcm9wID0gZXhwb3J0cy5jaGVja01pc3NpbmdQcm9wID0gZXhwb3J0cy5jaGVja1JlcG9ydE1pc3NpbmdQcm9wID0gdm9pZCAwO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uL2NvbXBpbGUvbmFtZXNcIik7XG5mdW5jdGlvbiBjaGVja1JlcG9ydE1pc3NpbmdQcm9wKGN4dCwgcHJvcCkge1xuICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBpdCB9ID0gY3h0O1xuICAgIGdlbi5pZihub1Byb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcCwgaXQub3B0cy5vd25Qcm9wZXJ0aWVzKSwgKCkgPT4ge1xuICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiAoMCwgY29kZWdlbl8xLl8pIGAke3Byb3B9YCB9LCB0cnVlKTtcbiAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmNoZWNrUmVwb3J0TWlzc2luZ1Byb3AgPSBjaGVja1JlcG9ydE1pc3NpbmdQcm9wO1xuZnVuY3Rpb24gY2hlY2tNaXNzaW5nUHJvcCh7IGdlbiwgZGF0YSwgaXQ6IHsgb3B0cyB9IH0sIHByb3BlcnRpZXMsIG1pc3NpbmcpIHtcbiAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5vcikoLi4ucHJvcGVydGllcy5tYXAoKHByb3ApID0+ICgwLCBjb2RlZ2VuXzEuYW5kKShub1Byb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcCwgb3B0cy5vd25Qcm9wZXJ0aWVzKSwgKDAsIGNvZGVnZW5fMS5fKSBgJHttaXNzaW5nfSA9ICR7cHJvcH1gKSkpO1xufVxuZXhwb3J0cy5jaGVja01pc3NpbmdQcm9wID0gY2hlY2tNaXNzaW5nUHJvcDtcbmZ1bmN0aW9uIHJlcG9ydE1pc3NpbmdQcm9wKGN4dCwgbWlzc2luZykge1xuICAgIGN4dC5zZXRQYXJhbXMoeyBtaXNzaW5nUHJvcGVydHk6IG1pc3NpbmcgfSwgdHJ1ZSk7XG4gICAgY3h0LmVycm9yKCk7XG59XG5leHBvcnRzLnJlcG9ydE1pc3NpbmdQcm9wID0gcmVwb3J0TWlzc2luZ1Byb3A7XG5mdW5jdGlvbiBoYXNQcm9wRnVuYyhnZW4pIHtcbiAgICByZXR1cm4gZ2VuLnNjb3BlVmFsdWUoXCJmdW5jXCIsIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmJvdW5kLW1ldGhvZFxuICAgICAgICByZWY6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICAgIGNvZGU6ICgwLCBjb2RlZ2VuXzEuXykgYE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlgLFxuICAgIH0pO1xufVxuZXhwb3J0cy5oYXNQcm9wRnVuYyA9IGhhc1Byb3BGdW5jO1xuZnVuY3Rpb24gaXNPd25Qcm9wZXJ0eShnZW4sIGRhdGEsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYCR7aGFzUHJvcEZ1bmMoZ2VuKX0uY2FsbCgke2RhdGF9LCAke3Byb3BlcnR5fSlgO1xufVxuZXhwb3J0cy5pc093blByb3BlcnR5ID0gaXNPd25Qcm9wZXJ0eTtcbmZ1bmN0aW9uIHByb3BlcnR5SW5EYXRhKGdlbiwgZGF0YSwgcHJvcGVydHksIG93blByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBjb25kID0gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkocHJvcGVydHkpfSAhPT0gdW5kZWZpbmVkYDtcbiAgICByZXR1cm4gb3duUHJvcGVydGllcyA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7Y29uZH0gJiYgJHtpc093blByb3BlcnR5KGdlbiwgZGF0YSwgcHJvcGVydHkpfWAgOiBjb25kO1xufVxuZXhwb3J0cy5wcm9wZXJ0eUluRGF0YSA9IHByb3BlcnR5SW5EYXRhO1xuZnVuY3Rpb24gbm9Qcm9wZXJ0eUluRGF0YShnZW4sIGRhdGEsIHByb3BlcnR5LCBvd25Qcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgY29uZCA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX0keygwLCBjb2RlZ2VuXzEuZ2V0UHJvcGVydHkpKHByb3BlcnR5KX0gPT09IHVuZGVmaW5lZGA7XG4gICAgcmV0dXJuIG93blByb3BlcnRpZXMgPyAoMCwgY29kZWdlbl8xLm9yKShjb25kLCAoMCwgY29kZWdlbl8xLm5vdCkoaXNPd25Qcm9wZXJ0eShnZW4sIGRhdGEsIHByb3BlcnR5KSkpIDogY29uZDtcbn1cbmV4cG9ydHMubm9Qcm9wZXJ0eUluRGF0YSA9IG5vUHJvcGVydHlJbkRhdGE7XG5mdW5jdGlvbiBhbGxTY2hlbWFQcm9wZXJ0aWVzKHNjaGVtYU1hcCkge1xuICAgIHJldHVybiBzY2hlbWFNYXAgPyBPYmplY3Qua2V5cyhzY2hlbWFNYXApLmZpbHRlcigocCkgPT4gcCAhPT0gXCJfX3Byb3RvX19cIikgOiBbXTtcbn1cbmV4cG9ydHMuYWxsU2NoZW1hUHJvcGVydGllcyA9IGFsbFNjaGVtYVByb3BlcnRpZXM7XG5mdW5jdGlvbiBzY2hlbWFQcm9wZXJ0aWVzKGl0LCBzY2hlbWFNYXApIHtcbiAgICByZXR1cm4gYWxsU2NoZW1hUHJvcGVydGllcyhzY2hlbWFNYXApLmZpbHRlcigocCkgPT4gISgwLCB1dGlsXzEuYWx3YXlzVmFsaWRTY2hlbWEpKGl0LCBzY2hlbWFNYXBbcF0pKTtcbn1cbmV4cG9ydHMuc2NoZW1hUHJvcGVydGllcyA9IHNjaGVtYVByb3BlcnRpZXM7XG5mdW5jdGlvbiBjYWxsVmFsaWRhdGVDb2RlKHsgc2NoZW1hQ29kZSwgZGF0YSwgaXQ6IHsgZ2VuLCB0b3BTY2hlbWFSZWYsIHNjaGVtYVBhdGgsIGVycm9yUGF0aCB9LCBpdCB9LCBmdW5jLCBjb250ZXh0LCBwYXNzU2NoZW1hKSB7XG4gICAgY29uc3QgZGF0YUFuZFNjaGVtYSA9IHBhc3NTY2hlbWEgPyAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9LCAke2RhdGF9LCAke3RvcFNjaGVtYVJlZn0ke3NjaGVtYVBhdGh9YCA6IGRhdGE7XG4gICAgY29uc3QgdmFsQ3h0ID0gW1xuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0Lmluc3RhbmNlUGF0aCwgKDAsIGNvZGVnZW5fMS5zdHJDb25jYXQpKG5hbWVzXzEuZGVmYXVsdC5pbnN0YW5jZVBhdGgsIGVycm9yUGF0aCldLFxuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGEsIGl0LnBhcmVudERhdGFdLFxuICAgICAgICBbbmFtZXNfMS5kZWZhdWx0LnBhcmVudERhdGFQcm9wZXJ0eSwgaXQucGFyZW50RGF0YVByb3BlcnR5XSxcbiAgICAgICAgW25hbWVzXzEuZGVmYXVsdC5yb290RGF0YSwgbmFtZXNfMS5kZWZhdWx0LnJvb3REYXRhXSxcbiAgICBdO1xuICAgIGlmIChpdC5vcHRzLmR5bmFtaWNSZWYpXG4gICAgICAgIHZhbEN4dC5wdXNoKFtuYW1lc18xLmRlZmF1bHQuZHluYW1pY0FuY2hvcnMsIG5hbWVzXzEuZGVmYXVsdC5keW5hbWljQW5jaG9yc10pO1xuICAgIGNvbnN0IGFyZ3MgPSAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGFBbmRTY2hlbWF9LCAke2dlbi5vYmplY3QoLi4udmFsQ3h0KX1gO1xuICAgIHJldHVybiBjb250ZXh0ICE9PSBjb2RlZ2VuXzEubmlsID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtmdW5jfS5jYWxsKCR7Y29udGV4dH0sICR7YXJnc30pYCA6ICgwLCBjb2RlZ2VuXzEuXykgYCR7ZnVuY30oJHthcmdzfSlgO1xufVxuZXhwb3J0cy5jYWxsVmFsaWRhdGVDb2RlID0gY2FsbFZhbGlkYXRlQ29kZTtcbmZ1bmN0aW9uIHVzZVBhdHRlcm4oeyBnZW4sIGl0OiB7IG9wdHMgfSB9LCBwYXR0ZXJuKSB7XG4gICAgY29uc3QgdSA9IG9wdHMudW5pY29kZVJlZ0V4cCA/IFwidVwiIDogXCJcIjtcbiAgICByZXR1cm4gZ2VuLnNjb3BlVmFsdWUoXCJwYXR0ZXJuXCIsIHtcbiAgICAgICAga2V5OiBwYXR0ZXJuLFxuICAgICAgICByZWY6IG5ldyBSZWdFeHAocGF0dGVybiwgdSksXG4gICAgICAgIGNvZGU6ICgwLCBjb2RlZ2VuXzEuXykgYG5ldyBSZWdFeHAoJHtwYXR0ZXJufSwgJHt1fSlgLFxuICAgIH0pO1xufVxuZXhwb3J0cy51c2VQYXR0ZXJuID0gdXNlUGF0dGVybjtcbmZ1bmN0aW9uIHZhbGlkYXRlQXJyYXkoY3h0KSB7XG4gICAgY29uc3QgeyBnZW4sIGRhdGEsIGtleXdvcmQsIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgdmFsaWQgPSBnZW4ubmFtZShcInZhbGlkXCIpO1xuICAgIGlmIChpdC5hbGxFcnJvcnMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRBcnIgPSBnZW4ubGV0KFwidmFsaWRcIiwgdHJ1ZSk7XG4gICAgICAgIHZhbGlkYXRlSXRlbXMoKCkgPT4gZ2VuLmFzc2lnbih2YWxpZEFyciwgZmFsc2UpKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkQXJyO1xuICAgIH1cbiAgICBnZW4udmFyKHZhbGlkLCB0cnVlKTtcbiAgICB2YWxpZGF0ZUl0ZW1zKCgpID0+IGdlbi5icmVhaygpKTtcbiAgICByZXR1cm4gdmFsaWQ7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVJdGVtcyhub3RWYWxpZCkge1xuICAgICAgICBjb25zdCBsZW4gPSBnZW4uY29uc3QoXCJsZW5cIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICAgICAgZ2VuLmZvclJhbmdlKFwiaVwiLCAwLCBsZW4sIChpKSA9PiB7XG4gICAgICAgICAgICBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBrZXl3b3JkLFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wOiBpLFxuICAgICAgICAgICAgICAgIGRhdGFQcm9wVHlwZTogdXRpbF8xLlR5cGUuTnVtLFxuICAgICAgICAgICAgfSwgdmFsaWQpO1xuICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEubm90KSh2YWxpZCksIG5vdFZhbGlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy52YWxpZGF0ZUFycmF5ID0gdmFsaWRhdGVBcnJheTtcbmZ1bmN0aW9uIHZhbGlkYXRlVW5pb24oY3h0KSB7XG4gICAgY29uc3QgeyBnZW4sIHNjaGVtYSwga2V5d29yZCwgaXQgfSA9IGN4dDtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2NoZW1hKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgIGNvbnN0IGFsd2F5c1ZhbGlkID0gc2NoZW1hLnNvbWUoKHNjaCkgPT4gKDAsIHV0aWxfMS5hbHdheXNWYWxpZFNjaGVtYSkoaXQsIHNjaCkpO1xuICAgIGlmIChhbHdheXNWYWxpZCAmJiAhaXQub3B0cy51bmV2YWx1YXRlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIGZhbHNlKTtcbiAgICBjb25zdCBzY2hWYWxpZCA9IGdlbi5uYW1lKFwiX3ZhbGlkXCIpO1xuICAgIGdlbi5ibG9jaygoKSA9PiBzY2hlbWEuZm9yRWFjaCgoX3NjaCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgIGtleXdvcmQsXG4gICAgICAgICAgICBzY2hlbWFQcm9wOiBpLFxuICAgICAgICAgICAgY29tcG9zaXRlUnVsZTogdHJ1ZSxcbiAgICAgICAgfSwgc2NoVmFsaWQpO1xuICAgICAgICBnZW4uYXNzaWduKHZhbGlkLCAoMCwgY29kZWdlbl8xLl8pIGAke3ZhbGlkfSB8fCAke3NjaFZhbGlkfWApO1xuICAgICAgICBjb25zdCBtZXJnZWQgPSBjeHQubWVyZ2VWYWxpZEV2YWx1YXRlZChzY2hDeHQsIHNjaFZhbGlkKTtcbiAgICAgICAgLy8gY2FuIHNob3J0LWNpcmN1aXQgaWYgYHVuZXZhbHVhdGVkUHJvcGVydGllcy9JdGVtc2Agbm90IHN1cHBvcnRlZCAob3B0cy51bmV2YWx1YXRlZCAhPT0gdHJ1ZSlcbiAgICAgICAgLy8gb3IgaWYgYWxsIHByb3BlcnRpZXMgYW5kIGl0ZW1zIHdlcmUgZXZhbHVhdGVkIChpdC5wcm9wcyA9PT0gdHJ1ZSAmJiBpdC5pdGVtcyA9PT0gdHJ1ZSlcbiAgICAgICAgaWYgKCFtZXJnZWQpXG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSk7XG4gICAgfSkpO1xuICAgIGN4dC5yZXN1bHQodmFsaWQsICgpID0+IGN4dC5yZXNldCgpLCAoKSA9PiBjeHQuZXJyb3IodHJ1ZSkpO1xufVxuZXhwb3J0cy52YWxpZGF0ZVVuaW9uID0gdmFsaWRhdGVVbmlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJpZFwiLFxuICAgIGNvZGUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTk9UIFNVUFBPUlRFRDoga2V5d29yZCBcImlkXCIsIHVzZSBcIiRpZFwiIGZvciBzY2hlbWEgSUQnKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaWRfMSA9IHJlcXVpcmUoXCIuL2lkXCIpO1xuY29uc3QgcmVmXzEgPSByZXF1aXJlKFwiLi9yZWZcIik7XG5jb25zdCBjb3JlID0gW1xuICAgIFwiJHNjaGVtYVwiLFxuICAgIFwiJGlkXCIsXG4gICAgXCIkZGVmc1wiLFxuICAgIFwiJHZvY2FidWxhcnlcIixcbiAgICB7IGtleXdvcmQ6IFwiJGNvbW1lbnRcIiB9LFxuICAgIFwiZGVmaW5pdGlvbnNcIixcbiAgICBpZF8xLmRlZmF1bHQsXG4gICAgcmVmXzEuZGVmYXVsdCxcbl07XG5leHBvcnRzLmRlZmF1bHQgPSBjb3JlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNhbGxSZWYgPSBleHBvcnRzLmdldFZhbGlkYXRlID0gdm9pZCAwO1xuY29uc3QgcmVmX2Vycm9yXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9yZWZfZXJyb3JcIik7XG5jb25zdCBjb2RlXzEgPSByZXF1aXJlKFwiLi4vY29kZVwiKTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBuYW1lc18xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvbmFtZXNcIik7XG5jb25zdCBjb21waWxlXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZVwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCIkcmVmXCIsXG4gICAgc2NoZW1hVHlwZTogXCJzdHJpbmdcIixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgc2NoZW1hOiAkcmVmLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IGJhc2VJZCwgc2NoZW1hRW52OiBlbnYsIHZhbGlkYXRlTmFtZSwgb3B0cywgc2VsZiB9ID0gaXQ7XG4gICAgICAgIGNvbnN0IHsgcm9vdCB9ID0gZW52O1xuICAgICAgICBpZiAoKCRyZWYgPT09IFwiI1wiIHx8ICRyZWYgPT09IFwiIy9cIikgJiYgYmFzZUlkID09PSByb290LmJhc2VJZClcbiAgICAgICAgICAgIHJldHVybiBjYWxsUm9vdFJlZigpO1xuICAgICAgICBjb25zdCBzY2hPckVudiA9IGNvbXBpbGVfMS5yZXNvbHZlUmVmLmNhbGwoc2VsZiwgcm9vdCwgYmFzZUlkLCAkcmVmKTtcbiAgICAgICAgaWYgKHNjaE9yRW52ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgcmVmX2Vycm9yXzEuZGVmYXVsdChiYXNlSWQsICRyZWYpO1xuICAgICAgICBpZiAoc2NoT3JFbnYgaW5zdGFuY2VvZiBjb21waWxlXzEuU2NoZW1hRW52KVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxWYWxpZGF0ZShzY2hPckVudik7XG4gICAgICAgIHJldHVybiBpbmxpbmVSZWZTY2hlbWEoc2NoT3JFbnYpO1xuICAgICAgICBmdW5jdGlvbiBjYWxsUm9vdFJlZigpIHtcbiAgICAgICAgICAgIGlmIChlbnYgPT09IHJvb3QpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxSZWYoY3h0LCB2YWxpZGF0ZU5hbWUsIGVudiwgZW52LiRhc3luYyk7XG4gICAgICAgICAgICBjb25zdCByb290TmFtZSA9IGdlbi5zY29wZVZhbHVlKFwicm9vdFwiLCB7IHJlZjogcm9vdCB9KTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsUmVmKGN4dCwgKDAsIGNvZGVnZW5fMS5fKSBgJHtyb290TmFtZX0udmFsaWRhdGVgLCByb290LCByb290LiRhc3luYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FsbFZhbGlkYXRlKHNjaCkge1xuICAgICAgICAgICAgY29uc3QgdiA9IGdldFZhbGlkYXRlKGN4dCwgc2NoKTtcbiAgICAgICAgICAgIGNhbGxSZWYoY3h0LCB2LCBzY2gsIHNjaC4kYXN5bmMpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlubGluZVJlZlNjaGVtYShzY2gpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaE5hbWUgPSBnZW4uc2NvcGVWYWx1ZShcInNjaGVtYVwiLCBvcHRzLmNvZGUuc291cmNlID09PSB0cnVlID8geyByZWY6IHNjaCwgY29kZTogKDAsIGNvZGVnZW5fMS5zdHJpbmdpZnkpKHNjaCkgfSA6IHsgcmVmOiBzY2ggfSk7XG4gICAgICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHtcbiAgICAgICAgICAgICAgICBzY2hlbWE6IHNjaCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZXM6IFtdLFxuICAgICAgICAgICAgICAgIHNjaGVtYVBhdGg6IGNvZGVnZW5fMS5uaWwsXG4gICAgICAgICAgICAgICAgdG9wU2NoZW1hUmVmOiBzY2hOYW1lLFxuICAgICAgICAgICAgICAgIGVyclNjaGVtYVBhdGg6ICRyZWYsXG4gICAgICAgICAgICB9LCB2YWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0KTtcbiAgICAgICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmZ1bmN0aW9uIGdldFZhbGlkYXRlKGN4dCwgc2NoKSB7XG4gICAgY29uc3QgeyBnZW4gfSA9IGN4dDtcbiAgICByZXR1cm4gc2NoLnZhbGlkYXRlXG4gICAgICAgID8gZ2VuLnNjb3BlVmFsdWUoXCJ2YWxpZGF0ZVwiLCB7IHJlZjogc2NoLnZhbGlkYXRlIH0pXG4gICAgICAgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHtnZW4uc2NvcGVWYWx1ZShcIndyYXBwZXJcIiwgeyByZWY6IHNjaCB9KX0udmFsaWRhdGVgO1xufVxuZXhwb3J0cy5nZXRWYWxpZGF0ZSA9IGdldFZhbGlkYXRlO1xuZnVuY3Rpb24gY2FsbFJlZihjeHQsIHYsIHNjaCwgJGFzeW5jKSB7XG4gICAgY29uc3QgeyBnZW4sIGl0IH0gPSBjeHQ7XG4gICAgY29uc3QgeyBhbGxFcnJvcnMsIHNjaGVtYUVudjogZW52LCBvcHRzIH0gPSBpdDtcbiAgICBjb25zdCBwYXNzQ3h0ID0gb3B0cy5wYXNzQ29udGV4dCA/IG5hbWVzXzEuZGVmYXVsdC50aGlzIDogY29kZWdlbl8xLm5pbDtcbiAgICBpZiAoJGFzeW5jKVxuICAgICAgICBjYWxsQXN5bmNSZWYoKTtcbiAgICBlbHNlXG4gICAgICAgIGNhbGxTeW5jUmVmKCk7XG4gICAgZnVuY3Rpb24gY2FsbEFzeW5jUmVmKCkge1xuICAgICAgICBpZiAoIWVudi4kYXN5bmMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhc3luYyBzY2hlbWEgcmVmZXJlbmNlZCBieSBzeW5jIHNjaGVtYVwiKTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIik7XG4gICAgICAgIGdlbi50cnkoKCkgPT4ge1xuICAgICAgICAgICAgZ2VuLmNvZGUoKDAsIGNvZGVnZW5fMS5fKSBgYXdhaXQgJHsoMCwgY29kZV8xLmNhbGxWYWxpZGF0ZUNvZGUpKGN4dCwgdiwgcGFzc0N4dCl9YCk7XG4gICAgICAgICAgICBhZGRFdmFsdWF0ZWRGcm9tKHYpOyAvLyBUT0RPIHdpbGwgbm90IHdvcmsgd2l0aCBhc3luYywgaXQgaGFzIHRvIGJlIHJldHVybmVkIHdpdGggdGhlIHJlc3VsdFxuICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgISgke2V9IGluc3RhbmNlb2YgJHtpdC5WYWxpZGF0aW9uRXJyb3J9KWAsICgpID0+IGdlbi50aHJvdyhlKSk7XG4gICAgICAgICAgICBhZGRFcnJvcnNGcm9tKGUpO1xuICAgICAgICAgICAgaWYgKCFhbGxFcnJvcnMpXG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FsbFN5bmNSZWYoKSB7XG4gICAgICAgIGN4dC5yZXN1bHQoKDAsIGNvZGVfMS5jYWxsVmFsaWRhdGVDb2RlKShjeHQsIHYsIHBhc3NDeHQpLCAoKSA9PiBhZGRFdmFsdWF0ZWRGcm9tKHYpLCAoKSA9PiBhZGRFcnJvcnNGcm9tKHYpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRXJyb3JzRnJvbShzb3VyY2UpIHtcbiAgICAgICAgY29uc3QgZXJycyA9ICgwLCBjb2RlZ2VuXzEuXykgYCR7c291cmNlfS5lcnJvcnNgO1xuICAgICAgICBnZW4uYXNzaWduKG5hbWVzXzEuZGVmYXVsdC52RXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfSA9PT0gbnVsbCA/ICR7ZXJyc30gOiAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5jb25jYXQoJHtlcnJzfSlgKTsgLy8gVE9ETyB0YWdnZWRcbiAgICAgICAgZ2VuLmFzc2lnbihuYW1lc18xLmRlZmF1bHQuZXJyb3JzLCAoMCwgY29kZWdlbl8xLl8pIGAke25hbWVzXzEuZGVmYXVsdC52RXJyb3JzfS5sZW5ndGhgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRXZhbHVhdGVkRnJvbShzb3VyY2UpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIWl0Lm9wdHMudW5ldmFsdWF0ZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHNjaEV2YWx1YXRlZCA9IChfYSA9IHNjaCA9PT0gbnVsbCB8fCBzY2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaC52YWxpZGF0ZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmV2YWx1YXRlZDtcbiAgICAgICAgLy8gVE9ETyByZWZhY3RvclxuICAgICAgICBpZiAoaXQucHJvcHMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQgJiYgIXNjaEV2YWx1YXRlZC5keW5hbWljUHJvcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoRXZhbHVhdGVkLnByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCBzY2hFdmFsdWF0ZWQucHJvcHMsIGl0LnByb3BzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IGdlbi52YXIoXCJwcm9wc1wiLCAoMCwgY29kZWdlbl8xLl8pIGAke3NvdXJjZX0uZXZhbHVhdGVkLnByb3BzYCk7XG4gICAgICAgICAgICAgICAgaXQucHJvcHMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQucHJvcHMoZ2VuLCBwcm9wcywgaXQucHJvcHMsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXQuaXRlbXMgIT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChzY2hFdmFsdWF0ZWQgJiYgIXNjaEV2YWx1YXRlZC5keW5hbWljSXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoRXZhbHVhdGVkLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBzY2hFdmFsdWF0ZWQuaXRlbXMsIGl0Lml0ZW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IGdlbi52YXIoXCJpdGVtc1wiLCAoMCwgY29kZWdlbl8xLl8pIGAke3NvdXJjZX0uZXZhbHVhdGVkLml0ZW1zYCk7XG4gICAgICAgICAgICAgICAgaXQuaXRlbXMgPSB1dGlsXzEubWVyZ2VFdmFsdWF0ZWQuaXRlbXMoZ2VuLCBpdGVtcywgaXQuaXRlbXMsIGNvZGVnZW5fMS5OYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuY2FsbFJlZiA9IGNhbGxSZWY7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWYuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdHlwZXNfMSA9IHJlcXVpcmUoXCIuLi9kaXNjcmltaW5hdG9yL3R5cGVzXCIpO1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsgcGFyYW1zOiB7IGRpc2NyRXJyb3IsIHRhZ05hbWUgfSB9KSA9PiBkaXNjckVycm9yID09PSB0eXBlc18xLkRpc2NyRXJyb3IuVGFnXG4gICAgICAgID8gYHRhZyBcIiR7dGFnTmFtZX1cIiBtdXN0IGJlIHN0cmluZ2BcbiAgICAgICAgOiBgdmFsdWUgb2YgdGFnIFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgaW4gb25lT2ZgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IGRpc2NyRXJyb3IsIHRhZywgdGFnTmFtZSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtlcnJvcjogJHtkaXNjckVycm9yfSwgdGFnOiAke3RhZ05hbWV9LCB0YWdWYWx1ZTogJHt0YWd9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZGlzY3JpbWluYXRvclwiLFxuICAgIHR5cGU6IFwib2JqZWN0XCIsXG4gICAgc2NoZW1hVHlwZTogXCJvYmplY3RcIixcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgc2NoZW1hLCBwYXJlbnRTY2hlbWEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb25lT2YgfSA9IHBhcmVudFNjaGVtYTtcbiAgICAgICAgaWYgKCFpdC5vcHRzLmRpc2NyaW1pbmF0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRpc2NyaW1pbmF0b3I6IHJlcXVpcmVzIGRpc2NyaW1pbmF0b3Igb3B0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBzY2hlbWEucHJvcGVydHlOYW1lO1xuICAgICAgICBpZiAodHlwZW9mIHRhZ05hbWUgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImRpc2NyaW1pbmF0b3I6IHJlcXVpcmVzIHByb3BlcnR5TmFtZVwiKTtcbiAgICAgICAgaWYgKHNjaGVtYS5tYXBwaW5nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogbWFwcGluZyBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICBpZiAoIW9uZU9mKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGlzY3JpbWluYXRvcjogcmVxdWlyZXMgb25lT2Yga2V5d29yZFwiKTtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBnZW4ubGV0KFwidmFsaWRcIiwgZmFsc2UpO1xuICAgICAgICBjb25zdCB0YWcgPSBnZW4uY29uc3QoXCJ0YWdcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfSR7KDAsIGNvZGVnZW5fMS5nZXRQcm9wZXJ0eSkodGFnTmFtZSl9YCk7XG4gICAgICAgIGdlbi5pZigoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHt0YWd9ID09IFwic3RyaW5nXCJgLCAoKSA9PiB2YWxpZGF0ZU1hcHBpbmcoKSwgKCkgPT4gY3h0LmVycm9yKGZhbHNlLCB7IGRpc2NyRXJyb3I6IHR5cGVzXzEuRGlzY3JFcnJvci5UYWcsIHRhZywgdGFnTmFtZSB9KSk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlTWFwcGluZygpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcHBpbmcgPSBnZXRNYXBwaW5nKCk7XG4gICAgICAgICAgICBnZW4uaWYoZmFsc2UpO1xuICAgICAgICAgICAgZm9yIChjb25zdCB0YWdWYWx1ZSBpbiBtYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgZ2VuLmVsc2VJZigoMCwgY29kZWdlbl8xLl8pIGAke3RhZ30gPT09ICR7dGFnVmFsdWV9YCk7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgYXBwbHlUYWdTY2hlbWEobWFwcGluZ1t0YWdWYWx1ZV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlbi5lbHNlKCk7XG4gICAgICAgICAgICBjeHQuZXJyb3IoZmFsc2UsIHsgZGlzY3JFcnJvcjogdHlwZXNfMS5EaXNjckVycm9yLk1hcHBpbmcsIHRhZywgdGFnTmFtZSB9KTtcbiAgICAgICAgICAgIGdlbi5lbmRJZigpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5VGFnU2NoZW1hKHNjaGVtYVByb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IF92YWxpZCA9IGdlbi5uYW1lKFwidmFsaWRcIik7XG4gICAgICAgICAgICBjb25zdCBzY2hDeHQgPSBjeHQuc3Vic2NoZW1hKHsga2V5d29yZDogXCJvbmVPZlwiLCBzY2hlbWFQcm9wIH0sIF92YWxpZCk7XG4gICAgICAgICAgICBjeHQubWVyZ2VFdmFsdWF0ZWQoc2NoQ3h0LCBjb2RlZ2VuXzEuTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gX3ZhbGlkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldE1hcHBpbmcoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBvbmVPZk1hcHBpbmcgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IHRvcFJlcXVpcmVkID0gaGFzUmVxdWlyZWQocGFyZW50U2NoZW1hKTtcbiAgICAgICAgICAgIGxldCB0YWdSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9uZU9mLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NoID0gb25lT2ZbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcFNjaCA9IChfYSA9IHNjaC5wcm9wZXJ0aWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbdGFnTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wU2NoICE9IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBvbmVPZiBzY2hlbWFzIG11c3QgaGF2ZSBcInByb3BlcnRpZXMvJHt0YWdOYW1lfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhZ1JlcXVpcmVkID0gdGFnUmVxdWlyZWQgJiYgKHRvcFJlcXVpcmVkIHx8IGhhc1JlcXVpcmVkKHNjaCkpO1xuICAgICAgICAgICAgICAgIGFkZE1hcHBpbmdzKHByb3BTY2gsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0YWdSZXF1aXJlZClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc2NyaW1pbmF0b3I6IFwiJHt0YWdOYW1lfVwiIG11c3QgYmUgcmVxdWlyZWRgKTtcbiAgICAgICAgICAgIHJldHVybiBvbmVPZk1hcHBpbmc7XG4gICAgICAgICAgICBmdW5jdGlvbiBoYXNSZXF1aXJlZCh7IHJlcXVpcmVkIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShyZXF1aXJlZCkgJiYgcmVxdWlyZWQuaW5jbHVkZXModGFnTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRNYXBwaW5ncyhzY2gsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NoLmNvbnN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZE1hcHBpbmcoc2NoLmNvbnN0LCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2NoLmVudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YWdWYWx1ZSBvZiBzY2guZW51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTWFwcGluZyh0YWdWYWx1ZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZGlzY3JpbWluYXRvcjogXCJwcm9wZXJ0aWVzLyR7dGFnTmFtZX1cIiBtdXN0IGhhdmUgXCJjb25zdFwiIG9yIFwiZW51bVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTWFwcGluZyh0YWdWYWx1ZSwgaSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFnVmFsdWUgIT0gXCJzdHJpbmdcIiB8fCB0YWdWYWx1ZSBpbiBvbmVPZk1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNjcmltaW5hdG9yOiBcIiR7dGFnTmFtZX1cIiB2YWx1ZXMgbXVzdCBiZSB1bmlxdWUgc3RyaW5nc2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbmVPZk1hcHBpbmdbdGFnVmFsdWVdID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRpc2NyRXJyb3IgPSB2b2lkIDA7XG52YXIgRGlzY3JFcnJvcjtcbihmdW5jdGlvbiAoRGlzY3JFcnJvcikge1xuICAgIERpc2NyRXJyb3JbXCJUYWdcIl0gPSBcInRhZ1wiO1xuICAgIERpc2NyRXJyb3JbXCJNYXBwaW5nXCJdID0gXCJtYXBwaW5nXCI7XG59KShEaXNjckVycm9yID0gZXhwb3J0cy5EaXNjckVycm9yIHx8IChleHBvcnRzLkRpc2NyRXJyb3IgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKFwiLi9jb3JlXCIpO1xuY29uc3QgdmFsaWRhdGlvbl8xID0gcmVxdWlyZShcIi4vdmFsaWRhdGlvblwiKTtcbmNvbnN0IGFwcGxpY2F0b3JfMSA9IHJlcXVpcmUoXCIuL2FwcGxpY2F0b3JcIik7XG5jb25zdCBmb3JtYXRfMSA9IHJlcXVpcmUoXCIuL2Zvcm1hdFwiKTtcbmNvbnN0IG1ldGFkYXRhXzEgPSByZXF1aXJlKFwiLi9tZXRhZGF0YVwiKTtcbmNvbnN0IGRyYWZ0N1ZvY2FidWxhcmllcyA9IFtcbiAgICBjb3JlXzEuZGVmYXVsdCxcbiAgICB2YWxpZGF0aW9uXzEuZGVmYXVsdCxcbiAgICAoMCwgYXBwbGljYXRvcl8xLmRlZmF1bHQpKCksXG4gICAgZm9ybWF0XzEuZGVmYXVsdCxcbiAgICBtZXRhZGF0YV8xLm1ldGFkYXRhVm9jYWJ1bGFyeSxcbiAgICBtZXRhZGF0YV8xLmNvbnRlbnRWb2NhYnVsYXJ5LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRyYWZ0N1ZvY2FidWxhcmllcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRyYWZ0Ny5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBtYXRjaCBmb3JtYXQgXCIke3NjaGVtYUNvZGV9XCJgLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7Zm9ybWF0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiZm9ybWF0XCIsXG4gICAgdHlwZTogW1wibnVtYmVyXCIsIFwic3RyaW5nXCJdLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQsIHJ1bGVUeXBlKSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCAkZGF0YSwgc2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICBjb25zdCB7IG9wdHMsIGVyclNjaGVtYVBhdGgsIHNjaGVtYUVudiwgc2VsZiB9ID0gaXQ7XG4gICAgICAgIGlmICghb3B0cy52YWxpZGF0ZUZvcm1hdHMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICgkZGF0YSlcbiAgICAgICAgICAgIHZhbGlkYXRlJERhdGFGb3JtYXQoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdmFsaWRhdGVGb3JtYXQoKTtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGUkRGF0YUZvcm1hdCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZtdHMgPSBnZW4uc2NvcGVWYWx1ZShcImZvcm1hdHNcIiwge1xuICAgICAgICAgICAgICAgIHJlZjogc2VsZi5mb3JtYXRzLFxuICAgICAgICAgICAgICAgIGNvZGU6IG9wdHMuY29kZS5mb3JtYXRzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBmRGVmID0gZ2VuLmNvbnN0KFwiZkRlZlwiLCAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdHN9WyR7c2NoZW1hQ29kZX1dYCk7XG4gICAgICAgICAgICBjb25zdCBmVHlwZSA9IGdlbi5sZXQoXCJmVHlwZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdCA9IGdlbi5sZXQoXCJmb3JtYXRcIik7XG4gICAgICAgICAgICAvLyBUT0RPIHNpbXBsaWZ5XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgdHlwZW9mICR7ZkRlZn0gPT0gXCJvYmplY3RcIiAmJiAhKCR7ZkRlZn0gaW5zdGFuY2VvZiBSZWdFeHApYCwgKCkgPT4gZ2VuLmFzc2lnbihmVHlwZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmRGVmfS50eXBlIHx8IFwic3RyaW5nXCJgKS5hc3NpZ24oZm9ybWF0LCAoMCwgY29kZWdlbl8xLl8pIGAke2ZEZWZ9LnZhbGlkYXRlYCksICgpID0+IGdlbi5hc3NpZ24oZlR5cGUsICgwLCBjb2RlZ2VuXzEuXykgYFwic3RyaW5nXCJgKS5hc3NpZ24oZm9ybWF0LCBmRGVmKSk7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEub3IpKHVua25vd25GbXQoKSwgaW52YWxpZEZtdCgpKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRm10KCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0cmljdFNjaGVtYSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlZ2VuXzEubmlsO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke3NjaGVtYUNvZGV9ICYmICEke2Zvcm1hdH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gaW52YWxpZEZtdCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsRm9ybWF0ID0gc2NoZW1hRW52LiRhc3luY1xuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCgke2ZEZWZ9LmFzeW5jID8gYXdhaXQgJHtmb3JtYXR9KCR7ZGF0YX0pIDogJHtmb3JtYXR9KCR7ZGF0YX0pKWBcbiAgICAgICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2Zvcm1hdH0oJHtkYXRhfSlgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRGF0YSA9ICgwLCBjb2RlZ2VuXzEuXykgYCh0eXBlb2YgJHtmb3JtYXR9ID09IFwiZnVuY3Rpb25cIiA/ICR7Y2FsbEZvcm1hdH0gOiAke2Zvcm1hdH0udGVzdCgke2RhdGF9KSlgO1xuICAgICAgICAgICAgICAgIHJldHVybiAoMCwgY29kZWdlbl8xLl8pIGAke2Zvcm1hdH0gJiYgJHtmb3JtYXR9ICE9PSB0cnVlICYmICR7ZlR5cGV9ID09PSAke3J1bGVUeXBlfSAmJiAhJHt2YWxpZERhdGF9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdERlZiA9IHNlbGYuZm9ybWF0c1tzY2hlbWFdO1xuICAgICAgICAgICAgaWYgKCFmb3JtYXREZWYpIHtcbiAgICAgICAgICAgICAgICB1bmtub3duRm9ybWF0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvcm1hdERlZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBbZm10VHlwZSwgZm9ybWF0LCBmbXRSZWZdID0gZ2V0Rm9ybWF0KGZvcm1hdERlZik7XG4gICAgICAgICAgICBpZiAoZm10VHlwZSA9PT0gcnVsZVR5cGUpXG4gICAgICAgICAgICAgICAgY3h0LnBhc3ModmFsaWRDb25kaXRpb24oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRm9ybWF0KCkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLnN0cmljdFNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dnZXIud2Fybih1bmtub3duTXNnKCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih1bmtub3duTXNnKCkpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHVua25vd25Nc2coKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgdW5rbm93biBmb3JtYXQgXCIke3NjaGVtYX1cIiBpZ25vcmVkIGluIHNjaGVtYSBhdCBwYXRoIFwiJHtlcnJTY2hlbWFQYXRofVwiYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGb3JtYXQoZm10RGVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGZtdERlZiBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEucmVnZXhwQ29kZSkoZm10RGVmKVxuICAgICAgICAgICAgICAgICAgICA6IG9wdHMuY29kZS5mb3JtYXRzXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7b3B0cy5jb2RlLmZvcm1hdHN9JHsoMCwgY29kZWdlbl8xLmdldFByb3BlcnR5KShzY2hlbWEpfWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZtdCA9IGdlbi5zY29wZVZhbHVlKFwiZm9ybWF0c1wiLCB7IGtleTogc2NoZW1hLCByZWY6IGZtdERlZiwgY29kZSB9KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZtdERlZiA9PSBcIm9iamVjdFwiICYmICEoZm10RGVmIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2ZtdERlZi50eXBlIHx8IFwic3RyaW5nXCIsIGZtdERlZi52YWxpZGF0ZSwgKDAsIGNvZGVnZW5fMS5fKSBgJHtmbXR9LnZhbGlkYXRlYF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdHJpbmdcIiwgZm10RGVmLCBmbXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gdmFsaWRDb25kaXRpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtYXREZWYgPT0gXCJvYmplY3RcIiAmJiAhKGZvcm1hdERlZiBpbnN0YW5jZW9mIFJlZ0V4cCkgJiYgZm9ybWF0RGVmLmFzeW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2NoZW1hRW52LiRhc3luYylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImFzeW5jIGZvcm1hdCBpbiBzeW5jIHNjaGVtYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuXykgYGF3YWl0ICR7Zm10UmVmfSgke2RhdGF9KWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZm9ybWF0ID09IFwiZnVuY3Rpb25cIiA/ICgwLCBjb2RlZ2VuXzEuXykgYCR7Zm10UmVmfSgke2RhdGF9KWAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2ZtdFJlZn0udGVzdCgke2RhdGF9KWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvcm1hdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZvcm1hdF8xID0gcmVxdWlyZShcIi4vZm9ybWF0XCIpO1xuY29uc3QgZm9ybWF0ID0gW2Zvcm1hdF8xLmRlZmF1bHRdO1xuZXhwb3J0cy5kZWZhdWx0ID0gZm9ybWF0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnRlbnRWb2NhYnVsYXJ5ID0gZXhwb3J0cy5tZXRhZGF0YVZvY2FidWxhcnkgPSB2b2lkIDA7XG5leHBvcnRzLm1ldGFkYXRhVm9jYWJ1bGFyeSA9IFtcbiAgICBcInRpdGxlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiLFxuICAgIFwiZGVmYXVsdFwiLFxuICAgIFwiZGVwcmVjYXRlZFwiLFxuICAgIFwicmVhZE9ubHlcIixcbiAgICBcIndyaXRlT25seVwiLFxuICAgIFwiZXhhbXBsZXNcIixcbl07XG5leHBvcnRzLmNvbnRlbnRWb2NhYnVsYXJ5ID0gW1xuICAgIFwiY29udGVudE1lZGlhVHlwZVwiLFxuICAgIFwiY29udGVudEVuY29kaW5nXCIsXG4gICAgXCJjb250ZW50U2NoZW1hXCIsXG5dO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWV0YWRhdGEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVxdWFsXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9lcXVhbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBlcXVhbCB0byBjb25zdGFudFwiLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWxsb3dlZFZhbHVlOiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwiY29uc3RcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGdlbiwgZGF0YSwgJGRhdGEsIHNjaGVtYUNvZGUsIHNjaGVtYSB9ID0gY3h0O1xuICAgICAgICBpZiAoJGRhdGEgfHwgKHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09IFwib2JqZWN0XCIpKSB7XG4gICAgICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCEkeygwLCB1dGlsXzEudXNlRnVuYykoZ2VuLCBlcXVhbF8xLmRlZmF1bHQpfSgke2RhdGF9LCAke3NjaGVtYUNvZGV9KWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3h0LmZhaWwoKDAsIGNvZGVnZW5fMS5fKSBgJHtzY2hlbWF9ICE9PSAke2RhdGF9YCk7XG4gICAgICAgIH1cbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcXVhbF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvZXF1YWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiBcIm11c3QgYmUgZXF1YWwgdG8gb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlc1wiLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7YWxsb3dlZFZhbHVlczogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcImVudW1cIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGlmICghJGRhdGEgJiYgc2NoZW1hLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImVudW0gbXVzdCBoYXZlIG5vbi1lbXB0eSBhcnJheVwiKTtcbiAgICAgICAgY29uc3QgdXNlTG9vcCA9IHNjaGVtYS5sZW5ndGggPj0gaXQub3B0cy5sb29wRW51bTtcbiAgICAgICAgY29uc3QgZXFsID0gKDAsIHV0aWxfMS51c2VGdW5jKShnZW4sIGVxdWFsXzEuZGVmYXVsdCk7XG4gICAgICAgIGxldCB2YWxpZDtcbiAgICAgICAgaWYgKHVzZUxvb3AgfHwgJGRhdGEpIHtcbiAgICAgICAgICAgIHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIpO1xuICAgICAgICAgICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIGxvb3BFbnVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYSkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWp2IGltcGxlbWVudGF0aW9uIGVycm9yXCIpO1xuICAgICAgICAgICAgY29uc3QgdlNjaGVtYSA9IGdlbi5jb25zdChcInZTY2hlbWFcIiwgc2NoZW1hQ29kZSk7XG4gICAgICAgICAgICB2YWxpZCA9ICgwLCBjb2RlZ2VuXzEub3IpKC4uLnNjaGVtYS5tYXAoKF94LCBpKSA9PiBlcXVhbENvZGUodlNjaGVtYSwgaSkpKTtcbiAgICAgICAgfVxuICAgICAgICBjeHQucGFzcyh2YWxpZCk7XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BFbnVtKCkge1xuICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgZmFsc2UpO1xuICAgICAgICAgICAgZ2VuLmZvck9mKFwidlwiLCBzY2hlbWFDb2RlLCAodikgPT4gZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYCR7ZXFsfSgke2RhdGF9LCAke3Z9KWAsICgpID0+IGdlbi5hc3NpZ24odmFsaWQsIHRydWUpLmJyZWFrKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBlcXVhbENvZGUodlNjaGVtYSwgaSkge1xuICAgICAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBzY2ggPT09IFwib2JqZWN0XCIgJiYgc2NoICE9PSBudWxsXG4gICAgICAgICAgICAgICAgPyAoMCwgY29kZWdlbl8xLl8pIGAke2VxbH0oJHtkYXRhfSwgJHt2U2NoZW1hfVske2l9XSlgXG4gICAgICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ID09PSAke3NjaH1gO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnVtLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbGltaXROdW1iZXJfMSA9IHJlcXVpcmUoXCIuL2xpbWl0TnVtYmVyXCIpO1xuY29uc3QgbXVsdGlwbGVPZl8xID0gcmVxdWlyZShcIi4vbXVsdGlwbGVPZlwiKTtcbmNvbnN0IGxpbWl0TGVuZ3RoXzEgPSByZXF1aXJlKFwiLi9saW1pdExlbmd0aFwiKTtcbmNvbnN0IHBhdHRlcm5fMSA9IHJlcXVpcmUoXCIuL3BhdHRlcm5cIik7XG5jb25zdCBsaW1pdFByb3BlcnRpZXNfMSA9IHJlcXVpcmUoXCIuL2xpbWl0UHJvcGVydGllc1wiKTtcbmNvbnN0IHJlcXVpcmVkXzEgPSByZXF1aXJlKFwiLi9yZXF1aXJlZFwiKTtcbmNvbnN0IGxpbWl0SXRlbXNfMSA9IHJlcXVpcmUoXCIuL2xpbWl0SXRlbXNcIik7XG5jb25zdCB1bmlxdWVJdGVtc18xID0gcmVxdWlyZShcIi4vdW5pcXVlSXRlbXNcIik7XG5jb25zdCBjb25zdF8xID0gcmVxdWlyZShcIi4vY29uc3RcIik7XG5jb25zdCBlbnVtXzEgPSByZXF1aXJlKFwiLi9lbnVtXCIpO1xuY29uc3QgdmFsaWRhdGlvbiA9IFtcbiAgICAvLyBudW1iZXJcbiAgICBsaW1pdE51bWJlcl8xLmRlZmF1bHQsXG4gICAgbXVsdGlwbGVPZl8xLmRlZmF1bHQsXG4gICAgLy8gc3RyaW5nXG4gICAgbGltaXRMZW5ndGhfMS5kZWZhdWx0LFxuICAgIHBhdHRlcm5fMS5kZWZhdWx0LFxuICAgIC8vIG9iamVjdFxuICAgIGxpbWl0UHJvcGVydGllc18xLmRlZmF1bHQsXG4gICAgcmVxdWlyZWRfMS5kZWZhdWx0LFxuICAgIC8vIGFycmF5XG4gICAgbGltaXRJdGVtc18xLmRlZmF1bHQsXG4gICAgdW5pcXVlSXRlbXNfMS5kZWZhdWx0LFxuICAgIC8vIGFueVxuICAgIHsga2V5d29yZDogXCJ0eXBlXCIsIHNjaGVtYVR5cGU6IFtcInN0cmluZ1wiLCBcImFycmF5XCJdIH0sXG4gICAgeyBrZXl3b3JkOiBcIm51bGxhYmxlXCIsIHNjaGVtYVR5cGU6IFwiYm9vbGVhblwiIH0sXG4gICAgY29uc3RfMS5kZWZhdWx0LFxuICAgIGVudW1fMS5kZWZhdWx0LFxuXTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZhbGlkYXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heEl0ZW1zXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBpdGVtc2A7XG4gICAgfSxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2xpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFtcIm1heEl0ZW1zXCIsIFwibWluSXRlbXNcIl0sXG4gICAgdHlwZTogXCJhcnJheVwiLFxuICAgIHNjaGVtYVR5cGU6IFwibnVtYmVyXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBrZXl3b3JkLCBkYXRhLCBzY2hlbWFDb2RlIH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhJdGVtc1wiID8gY29kZWdlbl8xLm9wZXJhdG9ycy5HVCA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTFQ7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGggJHtvcH0gJHtzY2hlbWFDb2RlfWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGltaXRJdGVtcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS91dGlsXCIpO1xuY29uc3QgdWNzMmxlbmd0aF8xID0gcmVxdWlyZShcIi4uLy4uL3J1bnRpbWUvdWNzMmxlbmd0aFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2UoeyBrZXl3b3JkLCBzY2hlbWFDb2RlIH0pIHtcbiAgICAgICAgY29uc3QgY29tcCA9IGtleXdvcmQgPT09IFwibWF4TGVuZ3RoXCIgPyBcIm1vcmVcIiA6IFwiZmV3ZXJcIjtcbiAgICAgICAgcmV0dXJuICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBOT1QgaGF2ZSAke2NvbXB9IHRoYW4gJHtzY2hlbWFDb2RlfSBjaGFyYWN0ZXJzYDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1wibWF4TGVuZ3RoXCIsIFwibWluTGVuZ3RoXCJdLFxuICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IG9wID0ga2V5d29yZCA9PT0gXCJtYXhMZW5ndGhcIiA/IGNvZGVnZW5fMS5vcGVyYXRvcnMuR1QgOiBjb2RlZ2VuXzEub3BlcmF0b3JzLkxUO1xuICAgICAgICBjb25zdCBsZW4gPSBpdC5vcHRzLnVuaWNvZGUgPT09IGZhbHNlID8gKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgIDogKDAsIGNvZGVnZW5fMS5fKSBgJHsoMCwgdXRpbF8xLnVzZUZ1bmMpKGN4dC5nZW4sIHVjczJsZW5ndGhfMS5kZWZhdWx0KX0oJHtkYXRhfSlgO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCR7bGVufSAke29wfSAke3NjaGVtYUNvZGV9YCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdExlbmd0aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBvcHMgPSBjb2RlZ2VuXzEub3BlcmF0b3JzO1xuY29uc3QgS1dEcyA9IHtcbiAgICBtYXhpbXVtOiB7IG9rU3RyOiBcIjw9XCIsIG9rOiBvcHMuTFRFLCBmYWlsOiBvcHMuR1QgfSxcbiAgICBtaW5pbXVtOiB7IG9rU3RyOiBcIj49XCIsIG9rOiBvcHMuR1RFLCBmYWlsOiBvcHMuTFQgfSxcbiAgICBleGNsdXNpdmVNYXhpbXVtOiB7IG9rU3RyOiBcIjxcIiwgb2s6IG9wcy5MVCwgZmFpbDogb3BzLkdURSB9LFxuICAgIGV4Y2x1c2l2ZU1pbmltdW06IHsgb2tTdHI6IFwiPlwiLCBvazogb3BzLkdULCBmYWlsOiBvcHMuTFRFIH0sXG59O1xuY29uc3QgZXJyb3IgPSB7XG4gICAgbWVzc2FnZTogKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLnN0cikgYG11c3QgYmUgJHtLV0RzW2tleXdvcmRdLm9rU3RyfSAke3NjaGVtYUNvZGV9YCxcbiAgICBwYXJhbXM6ICh7IGtleXdvcmQsIHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge2NvbXBhcmlzb246ICR7S1dEc1trZXl3b3JkXS5va1N0cn0sIGxpbWl0OiAke3NjaGVtYUNvZGV9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IE9iamVjdC5rZXlzKEtXRHMpLFxuICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgc2NoZW1hVHlwZTogXCJudW1iZXJcIixcbiAgICAkZGF0YTogdHJ1ZSxcbiAgICBlcnJvcixcbiAgICBjb2RlKGN4dCkge1xuICAgICAgICBjb25zdCB7IGtleXdvcmQsIGRhdGEsIHNjaGVtYUNvZGUgfSA9IGN4dDtcbiAgICAgICAgY3h0LmZhaWwkZGF0YSgoMCwgY29kZWdlbl8xLl8pIGAke2RhdGF9ICR7S1dEc1trZXl3b3JkXS5mYWlsfSAke3NjaGVtYUNvZGV9IHx8IGlzTmFOKCR7ZGF0YX0pYCk7XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW1pdE51bWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlKHsga2V5d29yZCwgc2NoZW1hQ29kZSB9KSB7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBrZXl3b3JkID09PSBcIm1heFByb3BlcnRpZXNcIiA/IFwibW9yZVwiIDogXCJmZXdlclwiO1xuICAgICAgICByZXR1cm4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlICR7Y29tcH0gdGhhbiAke3NjaGVtYUNvZGV9IGl0ZW1zYDtcbiAgICB9LFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7bGltaXQ6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogW1wibWF4UHJvcGVydGllc1wiLCBcIm1pblByb3BlcnRpZXNcIl0sXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsga2V5d29yZCwgZGF0YSwgc2NoZW1hQ29kZSB9ID0gY3h0O1xuICAgICAgICBjb25zdCBvcCA9IGtleXdvcmQgPT09IFwibWF4UHJvcGVydGllc1wiID8gY29kZWdlbl8xLm9wZXJhdG9ycy5HVCA6IGNvZGVnZW5fMS5vcGVyYXRvcnMuTFQ7XG4gICAgICAgIGN4dC5mYWlsJGRhdGEoKDAsIGNvZGVnZW5fMS5fKSBgT2JqZWN0LmtleXMoJHtkYXRhfSkubGVuZ3RoICR7b3B9ICR7c2NoZW1hQ29kZX1gKTtcbiAgICB9LFxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbWl0UHJvcGVydGllcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVnZW5fMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL2NvZGVnZW5cIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBzY2hlbWFDb2RlIH0pID0+ICgwLCBjb2RlZ2VuXzEuc3RyKSBgbXVzdCBiZSBtdWx0aXBsZSBvZiAke3NjaGVtYUNvZGV9YCxcbiAgICBwYXJhbXM6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5fKSBge211bHRpcGxlT2Y6ICR7c2NoZW1hQ29kZX19YCxcbn07XG5jb25zdCBkZWYgPSB7XG4gICAga2V5d29yZDogXCJtdWx0aXBsZU9mXCIsXG4gICAgdHlwZTogXCJudW1iZXJcIixcbiAgICBzY2hlbWFUeXBlOiBcIm51bWJlclwiLFxuICAgICRkYXRhOiB0cnVlLFxuICAgIGVycm9yLFxuICAgIGNvZGUoY3h0KSB7XG4gICAgICAgIGNvbnN0IHsgZ2VuLCBkYXRhLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICAvLyBjb25zdCBiZHQgPSBiYWQkRGF0YVR5cGUoc2NoZW1hQ29kZSwgPHN0cmluZz5kZWYuc2NoZW1hVHlwZSwgJGRhdGEpXG4gICAgICAgIGNvbnN0IHByZWMgPSBpdC5vcHRzLm11bHRpcGxlT2ZQcmVjaXNpb247XG4gICAgICAgIGNvbnN0IHJlcyA9IGdlbi5sZXQoXCJyZXNcIik7XG4gICAgICAgIGNvbnN0IGludmFsaWQgPSBwcmVjXG4gICAgICAgICAgICA/ICgwLCBjb2RlZ2VuXzEuXykgYE1hdGguYWJzKE1hdGgucm91bmQoJHtyZXN9KSAtICR7cmVzfSkgPiAxZS0ke3ByZWN9YFxuICAgICAgICAgICAgOiAoMCwgY29kZWdlbl8xLl8pIGAke3Jlc30gIT09IHBhcnNlSW50KCR7cmVzfSlgO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCgke3NjaGVtYUNvZGV9ID09PSAwIHx8ICgke3Jlc30gPSAke2RhdGF9LyR7c2NoZW1hQ29kZX0sICR7aW52YWxpZH0pKWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bXVsdGlwbGVPZi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHNjaGVtYUNvZGUgfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IG1hdGNoIHBhdHRlcm4gXCIke3NjaGVtYUNvZGV9XCJgLFxuICAgIHBhcmFtczogKHsgc2NoZW1hQ29kZSB9KSA9PiAoMCwgY29kZWdlbl8xLl8pIGB7cGF0dGVybjogJHtzY2hlbWFDb2RlfX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInBhdHRlcm5cIixcbiAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgIHNjaGVtYVR5cGU6IFwic3RyaW5nXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBkYXRhLCAkZGF0YSwgc2NoZW1hLCBzY2hlbWFDb2RlLCBpdCB9ID0gY3h0O1xuICAgICAgICAvLyBUT0RPIHJlZ2V4cCBzaG91bGQgYmUgd3JhcHBlZCBpbiB0cnkvY2F0Y2hzXG4gICAgICAgIGNvbnN0IHUgPSBpdC5vcHRzLnVuaWNvZGVSZWdFeHAgPyBcInVcIiA6IFwiXCI7XG4gICAgICAgIGNvbnN0IHJlZ0V4cCA9ICRkYXRhID8gKDAsIGNvZGVnZW5fMS5fKSBgKG5ldyBSZWdFeHAoJHtzY2hlbWFDb2RlfSwgJHt1fSkpYCA6ICgwLCBjb2RlXzEudXNlUGF0dGVybikoY3h0LCBzY2hlbWEpO1xuICAgICAgICBjeHQuZmFpbCRkYXRhKCgwLCBjb2RlZ2VuXzEuXykgYCEke3JlZ0V4cH0udGVzdCgke2RhdGF9KWApO1xuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0dGVybi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvZGVfMSA9IHJlcXVpcmUoXCIuLi9jb2RlXCIpO1xuY29uc3QgY29kZWdlbl8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvY29kZWdlblwiKTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb21waWxlL3V0aWxcIik7XG5jb25zdCBlcnJvciA9IHtcbiAgICBtZXNzYWdlOiAoeyBwYXJhbXM6IHsgbWlzc2luZ1Byb3BlcnR5IH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IGhhdmUgcmVxdWlyZWQgcHJvcGVydHkgJyR7bWlzc2luZ1Byb3BlcnR5fSdgLFxuICAgIHBhcmFtczogKHsgcGFyYW1zOiB7IG1pc3NpbmdQcm9wZXJ0eSB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHttaXNzaW5nUHJvcGVydHk6ICR7bWlzc2luZ1Byb3BlcnR5fX1gLFxufTtcbmNvbnN0IGRlZiA9IHtcbiAgICBrZXl3b3JkOiBcInJlcXVpcmVkXCIsXG4gICAgdHlwZTogXCJvYmplY3RcIixcbiAgICBzY2hlbWFUeXBlOiBcImFycmF5XCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIHNjaGVtYSwgc2NoZW1hQ29kZSwgZGF0YSwgJGRhdGEsIGl0IH0gPSBjeHQ7XG4gICAgICAgIGNvbnN0IHsgb3B0cyB9ID0gaXQ7XG4gICAgICAgIGlmICghJGRhdGEgJiYgc2NoZW1hLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgdXNlTG9vcCA9IHNjaGVtYS5sZW5ndGggPj0gb3B0cy5sb29wUmVxdWlyZWQ7XG4gICAgICAgIGlmIChpdC5hbGxFcnJvcnMpXG4gICAgICAgICAgICBhbGxFcnJvcnNNb2RlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGV4aXRPbkVycm9yTW9kZSgpO1xuICAgICAgICBpZiAob3B0cy5zdHJpY3RSZXF1aXJlZCkge1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBjeHQucGFyZW50U2NoZW1hLnByb3BlcnRpZXM7XG4gICAgICAgICAgICBjb25zdCB7IGRlZmluZWRQcm9wZXJ0aWVzIH0gPSBjeHQuaXQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlcXVpcmVkS2V5IG9mIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgIGlmICgocHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzW3JlcXVpcmVkS2V5XSkgPT09IHVuZGVmaW5lZCAmJiAhZGVmaW5lZFByb3BlcnRpZXMuaGFzKHJlcXVpcmVkS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFQYXRoID0gaXQuc2NoZW1hRW52LmJhc2VJZCArIGl0LmVyclNjaGVtYVBhdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGByZXF1aXJlZCBwcm9wZXJ0eSBcIiR7cmVxdWlyZWRLZXl9XCIgaXMgbm90IGRlZmluZWQgYXQgXCIke3NjaGVtYVBhdGh9XCIgKHN0cmljdFJlcXVpcmVkKWA7XG4gICAgICAgICAgICAgICAgICAgICgwLCB1dGlsXzEuY2hlY2tTdHJpY3RNb2RlKShpdCwgbXNnLCBpdC5vcHRzLnN0cmljdFJlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gYWxsRXJyb3JzTW9kZSgpIHtcbiAgICAgICAgICAgIGlmICh1c2VMb29wIHx8ICRkYXRhKSB7XG4gICAgICAgICAgICAgICAgY3h0LmJsb2NrJGRhdGEoY29kZWdlbl8xLm5pbCwgbG9vcEFsbFJlcXVpcmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBzY2hlbWEpIHtcbiAgICAgICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5jaGVja1JlcG9ydE1pc3NpbmdQcm9wKShjeHQsIHByb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBleGl0T25FcnJvck1vZGUoKSB7XG4gICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gZ2VuLmxldChcIm1pc3NpbmdcIik7XG4gICAgICAgICAgICBpZiAodXNlTG9vcCB8fCAkZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gZ2VuLmxldChcInZhbGlkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIGN4dC5ibG9jayRkYXRhKHZhbGlkLCAoKSA9PiBsb29wVW50aWxNaXNzaW5nKG1pc3NpbmcsIHZhbGlkKSk7XG4gICAgICAgICAgICAgICAgY3h0Lm9rKHZhbGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZV8xLmNoZWNrTWlzc2luZ1Byb3ApKGN4dCwgc2NoZW1hLCBtaXNzaW5nKSk7XG4gICAgICAgICAgICAgICAgKDAsIGNvZGVfMS5yZXBvcnRNaXNzaW5nUHJvcCkoY3h0LCBtaXNzaW5nKTtcbiAgICAgICAgICAgICAgICBnZW4uZWxzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGxvb3BBbGxSZXF1aXJlZCgpIHtcbiAgICAgICAgICAgIGdlbi5mb3JPZihcInByb3BcIiwgc2NoZW1hQ29kZSwgKHByb3ApID0+IHtcbiAgICAgICAgICAgICAgICBjeHQuc2V0UGFyYW1zKHsgbWlzc2luZ1Byb3BlcnR5OiBwcm9wIH0pO1xuICAgICAgICAgICAgICAgIGdlbi5pZigoMCwgY29kZV8xLm5vUHJvcGVydHlJbkRhdGEpKGdlbiwgZGF0YSwgcHJvcCwgb3B0cy5vd25Qcm9wZXJ0aWVzKSwgKCkgPT4gY3h0LmVycm9yKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcFVudGlsTWlzc2luZyhtaXNzaW5nLCB2YWxpZCkge1xuICAgICAgICAgICAgY3h0LnNldFBhcmFtcyh7IG1pc3NpbmdQcm9wZXJ0eTogbWlzc2luZyB9KTtcbiAgICAgICAgICAgIGdlbi5mb3JPZihtaXNzaW5nLCBzY2hlbWFDb2RlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgKDAsIGNvZGVfMS5wcm9wZXJ0eUluRGF0YSkoZ2VuLCBkYXRhLCBtaXNzaW5nLCBvcHRzLm93blByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5ub3QpKHZhbGlkKSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjeHQuZXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBjb2RlZ2VuXzEubmlsKTtcbiAgICAgICAgfVxuICAgIH0sXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWlyZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkYXRhVHlwZV8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdmFsaWRhdGUvZGF0YVR5cGVcIik7XG5jb25zdCBjb2RlZ2VuXzEgPSByZXF1aXJlKFwiLi4vLi4vY29tcGlsZS9jb2RlZ2VuXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4uLy4uL2NvbXBpbGUvdXRpbFwiKTtcbmNvbnN0IGVxdWFsXzEgPSByZXF1aXJlKFwiLi4vLi4vcnVudGltZS9lcXVhbFwiKTtcbmNvbnN0IGVycm9yID0ge1xuICAgIG1lc3NhZ2U6ICh7IHBhcmFtczogeyBpLCBqIH0gfSkgPT4gKDAsIGNvZGVnZW5fMS5zdHIpIGBtdXN0IE5PVCBoYXZlIGR1cGxpY2F0ZSBpdGVtcyAoaXRlbXMgIyMgJHtqfSBhbmQgJHtpfSBhcmUgaWRlbnRpY2FsKWAsXG4gICAgcGFyYW1zOiAoeyBwYXJhbXM6IHsgaSwgaiB9IH0pID0+ICgwLCBjb2RlZ2VuXzEuXykgYHtpOiAke2l9LCBqOiAke2p9fWAsXG59O1xuY29uc3QgZGVmID0ge1xuICAgIGtleXdvcmQ6IFwidW5pcXVlSXRlbXNcIixcbiAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgc2NoZW1hVHlwZTogXCJib29sZWFuXCIsXG4gICAgJGRhdGE6IHRydWUsXG4gICAgZXJyb3IsXG4gICAgY29kZShjeHQpIHtcbiAgICAgICAgY29uc3QgeyBnZW4sIGRhdGEsICRkYXRhLCBzY2hlbWEsIHBhcmVudFNjaGVtYSwgc2NoZW1hQ29kZSwgaXQgfSA9IGN4dDtcbiAgICAgICAgaWYgKCEkZGF0YSAmJiAhc2NoZW1hKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGdlbi5sZXQoXCJ2YWxpZFwiKTtcbiAgICAgICAgY29uc3QgaXRlbVR5cGVzID0gcGFyZW50U2NoZW1hLml0ZW1zID8gKDAsIGRhdGFUeXBlXzEuZ2V0U2NoZW1hVHlwZXMpKHBhcmVudFNjaGVtYS5pdGVtcykgOiBbXTtcbiAgICAgICAgY3h0LmJsb2NrJGRhdGEodmFsaWQsIHZhbGlkYXRlVW5pcXVlSXRlbXMsICgwLCBjb2RlZ2VuXzEuXykgYCR7c2NoZW1hQ29kZX0gPT09IGZhbHNlYCk7XG4gICAgICAgIGN4dC5vayh2YWxpZCk7XG4gICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlVW5pcXVlSXRlbXMoKSB7XG4gICAgICAgICAgICBjb25zdCBpID0gZ2VuLmxldChcImlcIiwgKDAsIGNvZGVnZW5fMS5fKSBgJHtkYXRhfS5sZW5ndGhgKTtcbiAgICAgICAgICAgIGNvbnN0IGogPSBnZW4ubGV0KFwialwiKTtcbiAgICAgICAgICAgIGN4dC5zZXRQYXJhbXMoeyBpLCBqIH0pO1xuICAgICAgICAgICAgZ2VuLmFzc2lnbih2YWxpZCwgdHJ1ZSk7XG4gICAgICAgICAgICBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtpfSA+IDFgLCAoKSA9PiAoY2FuT3B0aW1pemUoKSA/IGxvb3BOIDogbG9vcE4yKShpLCBqKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2FuT3B0aW1pemUoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVR5cGVzLmxlbmd0aCA+IDAgJiYgIWl0ZW1UeXBlcy5zb21lKCh0KSA9PiB0ID09PSBcIm9iamVjdFwiIHx8IHQgPT09IFwiYXJyYXlcIik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbG9vcE4oaSwgaikge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGdlbi5uYW1lKFwiaXRlbVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHdyb25nVHlwZSA9ICgwLCBkYXRhVHlwZV8xLmNoZWNrRGF0YVR5cGVzKShpdGVtVHlwZXMsIGl0ZW0sIGl0Lm9wdHMuc3RyaWN0TnVtYmVycywgZGF0YVR5cGVfMS5EYXRhVHlwZS5Xcm9uZyk7XG4gICAgICAgICAgICBjb25zdCBpbmRpY2VzID0gZ2VuLmNvbnN0KFwiaW5kaWNlc1wiLCAoMCwgY29kZWdlbl8xLl8pIGB7fWApO1xuICAgICAgICAgICAgZ2VuLmZvcigoMCwgY29kZWdlbl8xLl8pIGA7JHtpfS0tO2AsICgpID0+IHtcbiAgICAgICAgICAgICAgICBnZW4ubGV0KGl0ZW0sICgwLCBjb2RlZ2VuXzEuXykgYCR7ZGF0YX1bJHtpfV1gKTtcbiAgICAgICAgICAgICAgICBnZW4uaWYod3JvbmdUeXBlLCAoMCwgY29kZWdlbl8xLl8pIGBjb250aW51ZWApO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtVHlwZXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICAgICAgZ2VuLmlmKCgwLCBjb2RlZ2VuXzEuXykgYHR5cGVvZiAke2l0ZW19ID09IFwic3RyaW5nXCJgLCAoMCwgY29kZWdlbl8xLl8pIGAke2l0ZW19ICs9IFwiX1wiYCk7XG4gICAgICAgICAgICAgICAgZ2VuXG4gICAgICAgICAgICAgICAgICAgIC5pZigoMCwgY29kZWdlbl8xLl8pIGB0eXBlb2YgJHtpbmRpY2VzfVske2l0ZW19XSA9PSBcIm51bWJlclwiYCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBnZW4uYXNzaWduKGosICgwLCBjb2RlZ2VuXzEuXykgYCR7aW5kaWNlc31bJHtpdGVtfV1gKTtcbiAgICAgICAgICAgICAgICAgICAgY3h0LmVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5icmVhaygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jb2RlKCgwLCBjb2RlZ2VuXzEuXykgYCR7aW5kaWNlc31bJHtpdGVtfV0gPSAke2l9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb29wTjIoaSwgaikge1xuICAgICAgICAgICAgY29uc3QgZXFsID0gKDAsIHV0aWxfMS51c2VGdW5jKShnZW4sIGVxdWFsXzEuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zdCBvdXRlciA9IGdlbi5uYW1lKFwib3V0ZXJcIik7XG4gICAgICAgICAgICBnZW4ubGFiZWwob3V0ZXIpLmZvcigoMCwgY29kZWdlbl8xLl8pIGA7JHtpfS0tO2AsICgpID0+IGdlbi5mb3IoKDAsIGNvZGVnZW5fMS5fKSBgJHtqfSA9ICR7aX07ICR7an0tLTtgLCAoKSA9PiBnZW4uaWYoKDAsIGNvZGVnZW5fMS5fKSBgJHtlcWx9KCR7ZGF0YX1bJHtpfV0sICR7ZGF0YX1bJHtqfV0pYCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN4dC5lcnJvcigpO1xuICAgICAgICAgICAgICAgIGdlbi5hc3NpZ24odmFsaWQsIGZhbHNlKS5icmVhayhvdXRlcik7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBkZWY7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmlxdWVJdGVtcy5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbi8vIGRvIG5vdCBlZGl0IC5qcyBmaWxlcyBkaXJlY3RseSAtIGVkaXQgc3JjL2luZGV4LmpzdFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBsZW5ndGgsIGksIGtleXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuXG4gICAgaWYgKGEuY29uc3RydWN0b3IgPT09IFJlZ0V4cCkgcmV0dXJuIGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmZsYWdzID09PSBiLmZsYWdzO1xuICAgIGlmIChhLnZhbHVlT2YgIT09IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZikgcmV0dXJuIGEudmFsdWVPZigpID09PSBiLnZhbHVlT2YoKTtcbiAgICBpZiAoYS50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZykgcmV0dXJuIGEudG9TdHJpbmcoKSA9PT0gYi50b1N0cmluZygpO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG5cbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyB0cnVlIGlmIGJvdGggTmFOLCBmYWxzZSBvdGhlcndpc2VcbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyYXZlcnNlID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2NoZW1hLCBvcHRzLCBjYikge1xuICAvLyBMZWdhY3kgc3VwcG9ydCBmb3IgdjAuMy4xIGFuZCBlYXJsaWVyLlxuICBpZiAodHlwZW9mIG9wdHMgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0cztcbiAgICBvcHRzID0ge307XG4gIH1cblxuICBjYiA9IG9wdHMuY2IgfHwgY2I7XG4gIHZhciBwcmUgPSAodHlwZW9mIGNiID09ICdmdW5jdGlvbicpID8gY2IgOiBjYi5wcmUgfHwgZnVuY3Rpb24oKSB7fTtcbiAgdmFyIHBvc3QgPSBjYi5wb3N0IHx8IGZ1bmN0aW9uKCkge307XG5cbiAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoZW1hLCAnJywgc2NoZW1hKTtcbn07XG5cblxudHJhdmVyc2Uua2V5d29yZHMgPSB7XG4gIGFkZGl0aW9uYWxJdGVtczogdHJ1ZSxcbiAgaXRlbXM6IHRydWUsXG4gIGNvbnRhaW5zOiB0cnVlLFxuICBhZGRpdGlvbmFsUHJvcGVydGllczogdHJ1ZSxcbiAgcHJvcGVydHlOYW1lczogdHJ1ZSxcbiAgbm90OiB0cnVlLFxuICBpZjogdHJ1ZSxcbiAgdGhlbjogdHJ1ZSxcbiAgZWxzZTogdHJ1ZVxufTtcblxudHJhdmVyc2UuYXJyYXlLZXl3b3JkcyA9IHtcbiAgaXRlbXM6IHRydWUsXG4gIGFsbE9mOiB0cnVlLFxuICBhbnlPZjogdHJ1ZSxcbiAgb25lT2Y6IHRydWVcbn07XG5cbnRyYXZlcnNlLnByb3BzS2V5d29yZHMgPSB7XG4gICRkZWZzOiB0cnVlLFxuICBkZWZpbml0aW9uczogdHJ1ZSxcbiAgcHJvcGVydGllczogdHJ1ZSxcbiAgcGF0dGVyblByb3BlcnRpZXM6IHRydWUsXG4gIGRlcGVuZGVuY2llczogdHJ1ZVxufTtcblxudHJhdmVyc2Uuc2tpcEtleXdvcmRzID0ge1xuICBkZWZhdWx0OiB0cnVlLFxuICBlbnVtOiB0cnVlLFxuICBjb25zdDogdHJ1ZSxcbiAgcmVxdWlyZWQ6IHRydWUsXG4gIG1heGltdW06IHRydWUsXG4gIG1pbmltdW06IHRydWUsXG4gIGV4Y2x1c2l2ZU1heGltdW06IHRydWUsXG4gIGV4Y2x1c2l2ZU1pbmltdW06IHRydWUsXG4gIG11bHRpcGxlT2Y6IHRydWUsXG4gIG1heExlbmd0aDogdHJ1ZSxcbiAgbWluTGVuZ3RoOiB0cnVlLFxuICBwYXR0ZXJuOiB0cnVlLFxuICBmb3JtYXQ6IHRydWUsXG4gIG1heEl0ZW1zOiB0cnVlLFxuICBtaW5JdGVtczogdHJ1ZSxcbiAgdW5pcXVlSXRlbXM6IHRydWUsXG4gIG1heFByb3BlcnRpZXM6IHRydWUsXG4gIG1pblByb3BlcnRpZXM6IHRydWVcbn07XG5cblxuZnVuY3Rpb24gX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoZW1hLCBqc29uUHRyLCByb290U2NoZW1hLCBwYXJlbnRKc29uUHRyLCBwYXJlbnRLZXl3b3JkLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KSB7XG4gIGlmIChzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgcHJlKHNjaGVtYSwganNvblB0ciwgcm9vdFNjaGVtYSwgcGFyZW50SnNvblB0ciwgcGFyZW50S2V5d29yZCwgcGFyZW50U2NoZW1hLCBrZXlJbmRleCk7XG4gICAgZm9yICh2YXIga2V5IGluIHNjaGVtYSkge1xuICAgICAgdmFyIHNjaCA9IHNjaGVtYVtrZXldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoKSkge1xuICAgICAgICBpZiAoa2V5IGluIHRyYXZlcnNlLmFycmF5S2V5d29yZHMpIHtcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2NoLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoW2ldLCBqc29uUHRyICsgJy8nICsga2V5ICsgJy8nICsgaSwgcm9vdFNjaGVtYSwganNvblB0ciwga2V5LCBzY2hlbWEsIGkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSBpbiB0cmF2ZXJzZS5wcm9wc0tleXdvcmRzKSB7XG4gICAgICAgIGlmIChzY2ggJiYgdHlwZW9mIHNjaCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gc2NoKVxuICAgICAgICAgICAgX3RyYXZlcnNlKG9wdHMsIHByZSwgcG9zdCwgc2NoW3Byb3BdLCBqc29uUHRyICsgJy8nICsga2V5ICsgJy8nICsgZXNjYXBlSnNvblB0cihwcm9wKSwgcm9vdFNjaGVtYSwganNvblB0ciwga2V5LCBzY2hlbWEsIHByb3ApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGtleSBpbiB0cmF2ZXJzZS5rZXl3b3JkcyB8fCAob3B0cy5hbGxLZXlzICYmICEoa2V5IGluIHRyYXZlcnNlLnNraXBLZXl3b3JkcykpKSB7XG4gICAgICAgIF90cmF2ZXJzZShvcHRzLCBwcmUsIHBvc3QsIHNjaCwganNvblB0ciArICcvJyArIGtleSwgcm9vdFNjaGVtYSwganNvblB0ciwga2V5LCBzY2hlbWEpO1xuICAgICAgfVxuICAgIH1cbiAgICBwb3N0KHNjaGVtYSwganNvblB0ciwgcm9vdFNjaGVtYSwgcGFyZW50SnNvblB0ciwgcGFyZW50S2V5d29yZCwgcGFyZW50U2NoZW1hLCBrZXlJbmRleCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlc2NhcGVKc29uUHRyKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL34vZywgJ34wJykucmVwbGFjZSgvXFwvL2csICd+MScpO1xufVxuIiwiaW1wb3J0IHsgdmVjIH0gZnJvbSAnQGJhc2VtZW50dW5pdmVyc2UvY29tbW9uanMnO1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnLmpzb24nO1xuXG50eXBlIERlYnVnT3B0aW9ucyA9IHtcbiAgbWFyZ2luOiBudW1iZXIsXG4gIHBhZGRpbmc6IG51bWJlcixcbiAgZm9udDogc3RyaW5nLFxuICBsaW5lSGVpZ2h0OiBudW1iZXIsXG4gIGZvcmVncm91bmRDb2xvdXI6IENvbG91cixcbiAgYmFja2dyb3VuZENvbG91cjogQ29sb3VyLFxuICBkZWZhdWx0VmFsdWU6IERlYnVnVmFsdWUsXG4gIGRlZmF1bHRNYXJrZXI6IERlYnVnTWFya2VyXG59O1xuXG50eXBlIERlYnVnVmFsdWUgPSB7XG4gIGxhYmVsPzogc3RyaW5nLFxuICB2YWx1ZT86IG51bWJlciB8IHN0cmluZyxcbiAgYWxpZ246ICdsZWZ0JyB8ICdyaWdodCcsXG4gIHNob3dMYWJlbDogYm9vbGVhbixcbiAgcGFkZGluZz86IG51bWJlcixcbiAgZm9udD86IHN0cmluZyxcbiAgZm9yZWdyb3VuZENvbG91cj86IENvbG91cixcbiAgYmFja2dyb3VuZENvbG91cj86IENvbG91clxufTtcblxudHlwZSBEZWJ1Z01hcmtlciA9IHtcbiAgbGFiZWw/OiBzdHJpbmcsXG4gIHZhbHVlPzogbnVtYmVyIHwgc3RyaW5nLFxuICBwb3NpdGlvbj86IHZlYyxcbiAgc2hvd0xhYmVsOiBib29sZWFuLFxuICBzaG93VmFsdWU6IGJvb2xlYW4sXG4gIHNob3dNYXJrZXI6IGJvb2xlYW4sXG4gIG1hcmtlclNpemU6IG51bWJlcixcbiAgbWFya2VyU3R5bGU6ICd4JyB8ICcrJyB8ICcuJyxcbiAgbWFya2VyQ29sb3VyOiBDb2xvdXIsXG4gIHNwYWNlOiAnd29ybGQnIHwgJ3NjcmVlbicsXG4gIHBhZGRpbmc/OiBudW1iZXIsXG4gIGZvbnQ/OiBzdHJpbmcsXG4gIGxhYmVsT2Zmc2V0OiB2ZWMsXG4gIGZvcmVncm91bmRDb2xvdXI/OiBDb2xvdXIsXG4gIGJhY2tncm91bmRDb2xvdXI/OiBDb2xvdXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlYnVnIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IERlYnVnO1xuICBwcml2YXRlIHZhbHVlczogTWFwPHN0cmluZywgRGVidWdWYWx1ZT47XG4gIHByaXZhdGUgbWFya2VyczogTWFwPHN0cmluZywgRGVidWdNYXJrZXI+O1xuICBwcml2YXRlIG9wdGlvbnM6IERlYnVnT3B0aW9ucztcbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0T3B0aW9uczogRGVidWdPcHRpb25zID0ge1xuICAgIG1hcmdpbjogMTAsXG4gICAgcGFkZGluZzogNCxcbiAgICBmb250OiAnMTBwdCBMdWNpZGEgQ29uc29sZSwgbW9ub3NwYWNlJyxcbiAgICBsaW5lSGVpZ2h0OiAxMixcbiAgICBmb3JlZ3JvdW5kQ29sb3VyOiAnI2ZmZicsXG4gICAgYmFja2dyb3VuZENvbG91cjogJyMzMzM4JyxcbiAgICBkZWZhdWx0VmFsdWU6IHtcbiAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICBzaG93TGFiZWw6IHRydWUsXG4gICAgfSxcbiAgICBkZWZhdWx0TWFya2VyOiB7XG4gICAgICBzaG93TGFiZWw6IHRydWUsXG4gICAgICBzaG93VmFsdWU6IHRydWUsXG4gICAgICBzaG93TWFya2VyOiB0cnVlLFxuICAgICAgbWFya2VyU2l6ZTogNixcbiAgICAgIG1hcmtlclN0eWxlOiAneCcsXG4gICAgICBtYXJrZXJDb2xvdXI6ICcjY2NjJyxcbiAgICAgIHNwYWNlOiAnd29ybGQnLFxuICAgICAgbGFiZWxPZmZzZXQ6IHZlYygxMCksXG4gICAgfSxcbiAgfTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFBhcnRpYWw8RGVidWdPcHRpb25zPiA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy52YWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgRGVidWdWYWx1ZT4oKTtcbiAgICB0aGlzLm1hcmtlcnMgPSBuZXcgTWFwPHN0cmluZywgRGVidWdNYXJrZXI+KCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgZGVidWcgcmVuZGVyZXIgZm9yIGRpc3BsYXlpbmcgdmFsdWVzIGFuZCBtYXJrZXJzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpc2Uob3B0aW9uczogUGFydGlhbDxEZWJ1Z09wdGlvbnM+ID0ge30pOiB2b2lkIHtcbiAgICBEZWJ1Zy5pbnN0YW5jZSA9IG5ldyBEZWJ1ZyhvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldEluc3RhbmNlKCk6IERlYnVnIHtcbiAgICBpZiAoRGVidWcuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgRGVidWcuaW5pdGlhbGlzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gRGVidWcuaW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBhIGRlYnVnIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHZhbHVlKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIsIG9wdGlvbnM6IFBhcnRpYWw8RGVidWdWYWx1ZT4gPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IGRlYnVnID0gRGVidWcuZ2V0SW5zdGFuY2UoKTtcbiAgICBkZWJ1Zy52YWx1ZXMuc2V0KGxhYmVsLCBPYmplY3QuYXNzaWduKFxuICAgICAgeyBsYWJlbCwgdmFsdWUgfSxcbiAgICAgIGRlYnVnLmRlZmF1bHRPcHRpb25zLmRlZmF1bHRWYWx1ZSxcbiAgICAgIG9wdGlvbnNcbiAgICApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IGEgbWFya2VyIGluIHdvcmxkIG9yIHNjcmVlbiBzcGFjZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtYXJrZXIobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IG51bWJlciwgcG9zaXRpb246IHZlYywgb3B0aW9uczogUGFydGlhbDxEZWJ1Z01hcmtlcj4gPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IGRlYnVnID0gRGVidWcuZ2V0SW5zdGFuY2UoKTtcbiAgICBkZWJ1Zy5tYXJrZXJzLnNldChsYWJlbCwgT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgbGFiZWwsIHZhbHVlLCBwb3NpdGlvbiB9LFxuICAgICAgZGVidWcuZGVmYXVsdE9wdGlvbnMuZGVmYXVsdE1hcmtlcixcbiAgICAgIG9wdGlvbnNcbiAgICApKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb25zdCBkZWJ1ZyA9IERlYnVnLmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBEcmF3IHdvcmxkLXNwYWNlIG1hcmtlcnNcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LnNjYWxlKDEgLyBjb25maWcuc2NhbGVGYWN0b3IsIDEgLyBjb25maWcuc2NhbGVGYWN0b3IpO1xuICAgIGRlYnVnLm1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgaWYgKG1hcmtlci5zcGFjZSA9PT0gJ3dvcmxkJykge1xuICAgICAgICBkZWJ1Zy5kcmF3TWFya2VyKGNvbnRleHQsIG1hcmtlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAvLyBEcmF3IHZhbHVlcyBhbmQgc2NyZWVuLXNwYWNlIG1hcmtlcnNcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBsZXQgcG9zaXRpb246IHZlYztcbiAgICBsZXQgbGVmdFkgPSBkZWJ1Zy5vcHRpb25zLm1hcmdpbjtcbiAgICBsZXQgcmlnaHRZID0gZGVidWcub3B0aW9ucy5tYXJnaW47XG4gICAgY29uc3QgbGluZUhlaWdodCA9IChkZWJ1Zy5vcHRpb25zLmxpbmVIZWlnaHQgKyBkZWJ1Zy5vcHRpb25zLnBhZGRpbmcgKiAyKTtcbiAgICBkZWJ1Zy52YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBzd2l0Y2ggKHZhbHVlLmFsaWduKSB7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIHBvc2l0aW9uID0gdmVjKGRlYnVnLm9wdGlvbnMubWFyZ2luLCBsZWZ0WSk7XG4gICAgICAgICAgbGVmdFkgKz0gbGluZUhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgIHBvc2l0aW9uID0gdmVjKGNvbnRleHQuY2FudmFzLmNsaWVudFdpZHRoIC0gZGVidWcub3B0aW9ucy5tYXJnaW4sIHJpZ2h0WSk7XG4gICAgICAgICAgcmlnaHRZICs9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWJ1Zy5kcmF3TGFiZWwoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgICh2YWx1ZS5zaG93TGFiZWwgPyBgJHt2YWx1ZS5sYWJlbH06IGAgOiAnJykgKyBgJHt2YWx1ZS52YWx1ZX1gLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgdmFsdWUuYWxpZ24sXG4gICAgICAgIHZhbHVlLnBhZGRpbmcgPz8gZGVidWcub3B0aW9ucy5wYWRkaW5nLFxuICAgICAgICB2YWx1ZS5mb250ID8/IGRlYnVnLm9wdGlvbnMuZm9udCxcbiAgICAgICAgdmFsdWUuZm9yZWdyb3VuZENvbG91ciA/PyBkZWJ1Zy5vcHRpb25zLmZvcmVncm91bmRDb2xvdXIsXG4gICAgICAgIHZhbHVlLmJhY2tncm91bmRDb2xvdXIgPz8gZGVidWcub3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3VyXG4gICAgICApO1xuICAgIH0pO1xuICAgIGRlYnVnLm1hcmtlcnMuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgaWYgKG1hcmtlci5zcGFjZSA9PT0gJ3NjcmVlbicpIHtcbiAgICAgICAgZGVidWcuZHJhd01hcmtlcihjb250ZXh0LCBtYXJrZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgLy8gQ2xlYXIgdmFsdWVzIGFuZCBtYXJrZXJzIHJlYWR5IGZvciBuZXh0IGZyYW1lXG4gICAgZGVidWcudmFsdWVzLmNsZWFyKCk7XG4gICAgZGVidWcubWFya2Vycy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TWFya2VyKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbWFya2VyOiBEZWJ1Z01hcmtlcik6IHZvaWQge1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdmVjLm11bChtYXJrZXIucG9zaXRpb24gPz8gdmVjKCksIGNvbmZpZy5zY2FsZUZhY3Rvcik7XG4gICAgaWYgKG1hcmtlci5zaG93TGFiZWwgfHwgbWFya2VyLnNob3dWYWx1ZSkge1xuICAgICAgdGhpcy5kcmF3TGFiZWwoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIChtYXJrZXIuc2hvd0xhYmVsID8gYCR7bWFya2VyLmxhYmVsfTogYCA6ICcnKSArIChtYXJrZXIuc2hvd1ZhbHVlID8gYCR7bWFya2VyLnZhbHVlfWAgOiAnJyksXG4gICAgICAgIHZlYy5hZGQocG9zaXRpb24gPz8gdmVjKCksIG1hcmtlci5sYWJlbE9mZnNldCksXG4gICAgICAgICdsZWZ0JyxcbiAgICAgICAgbWFya2VyLnBhZGRpbmcgPz8gdGhpcy5vcHRpb25zLnBhZGRpbmcsXG4gICAgICAgIG1hcmtlci5mb250ID8/IHRoaXMub3B0aW9ucy5mb250LFxuICAgICAgICBtYXJrZXIuZm9yZWdyb3VuZENvbG91ciA/PyB0aGlzLm9wdGlvbnMuZm9yZWdyb3VuZENvbG91cixcbiAgICAgICAgbWFya2VyLmJhY2tncm91bmRDb2xvdXIgPz8gdGhpcy5vcHRpb25zLmJhY2tncm91bmRDb2xvdXJcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChtYXJrZXIuc2hvd01hcmtlcikge1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSAyO1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbnRleHQuZmlsbFN0eWxlID0gbWFya2VyLm1hcmtlckNvbG91cjtcbiAgICAgIHN3aXRjaCAobWFya2VyLm1hcmtlclN0eWxlKSB7XG4gICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgIHRoaXMuZHJhd0Nyb3NzKGNvbnRleHQsIHBvc2l0aW9uLCBtYXJrZXIubWFya2VyU2l6ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgIHRoaXMuZHJhd1BsdXMoY29udGV4dCwgcG9zaXRpb24sIG1hcmtlci5tYXJrZXJTaXplKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgdGhpcy5kcmF3RG90KGNvbnRleHQsIHBvc2l0aW9uLCBtYXJrZXIubWFya2VyU2l6ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3TGFiZWwoXG4gICAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBwb3NpdGlvbjogdmVjLFxuICAgIGFsaWduOiAnbGVmdCcgfCAncmlnaHQnLFxuICAgIHBhZGRpbmc6IG51bWJlcixcbiAgICBmb250OiBzdHJpbmcsXG4gICAgZm9yZWdyb3VuZENvbG91cjogQ29sb3VyLFxuICAgIGJhY2tncm91bmRDb2xvdXI6IENvbG91clxuICApOiB2b2lkIHtcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBjb250ZXh0LmZvbnQgPSBmb250O1xuICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgY29uc3QgYmFja2dyb3VuZFNpemUgPSB7XG4gICAgICB3aWR0aDogY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCArIHBhZGRpbmcgKiAyLFxuICAgICAgaGVpZ2h0OiB0aGlzLm9wdGlvbnMubGluZUhlaWdodCArIHBhZGRpbmcgKiAyLFxuICAgIH07XG4gICAgY29uc3QgeCA9IGFsaWduID09PSAncmlnaHQnID8gKHBvc2l0aW9uLnggLSBiYWNrZ3JvdW5kU2l6ZS53aWR0aCkgOiBwb3NpdGlvbi54O1xuXG4gICAgLy8gRHJhdyBiYWNrZ3JvdW5kXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kQ29sb3VyO1xuICAgIGNvbnRleHQuZmlsbFJlY3QoXG4gICAgICB4IC0gcGFkZGluZyxcbiAgICAgIHBvc2l0aW9uLnkgLSBwYWRkaW5nLFxuICAgICAgYmFja2dyb3VuZFNpemUud2lkdGgsXG4gICAgICBiYWNrZ3JvdW5kU2l6ZS5oZWlnaHRcbiAgICApO1xuXG4gICAgLy8gRHJhdyB0ZXh0XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kQ29sb3VyO1xuICAgIGNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgcG9zaXRpb24ueSk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdDcm9zcyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHBvc2l0aW9uOiB2ZWMsIHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29uc3QgaGFsZlNpemUgPSBzaXplIC8gMjtcbiAgICBjb250ZXh0Lm1vdmVUbyhwb3NpdGlvbi54IC0gaGFsZlNpemUsIHBvc2l0aW9uLnkgLSBoYWxmU2l6ZSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIGhhbGZTaXplLCBwb3NpdGlvbi55ICsgaGFsZlNpemUpO1xuICAgIGNvbnRleHQubW92ZVRvKHBvc2l0aW9uLnggLSBoYWxmU2l6ZSwgcG9zaXRpb24ueSArIGhhbGZTaXplKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb3NpdGlvbi54ICsgaGFsZlNpemUsIHBvc2l0aW9uLnkgLSBoYWxmU2l6ZSk7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd1BsdXMoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBwb3NpdGlvbjogdmVjLCBzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnN0IGhhbGZTaXplID0gc2l6ZSAvIDI7XG4gICAgY29udGV4dC5tb3ZlVG8ocG9zaXRpb24ueCwgcG9zaXRpb24ueSAtIGhhbGZTaXplKTtcbiAgICBjb250ZXh0LmxpbmVUbyhwb3NpdGlvbi54LCBwb3NpdGlvbi55ICsgaGFsZlNpemUpO1xuICAgIGNvbnRleHQubW92ZVRvKHBvc2l0aW9uLnggLSBoYWxmU2l6ZSwgcG9zaXRpb24ueSk7XG4gICAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIGhhbGZTaXplLCBwb3NpdGlvbi55KTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3RG90KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcG9zaXRpb246IHZlYywgc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmFyYyhwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBzaXplIC8gMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGNvbnRleHQuZmlsbCgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyB2ZWMgfSBmcm9tICdAYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcuanNvbic7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IENvbnRlbnQgZnJvbSAnLi9jb250ZW50L0NvbnRlbnQnO1xuaW1wb3J0IERlYnVnIGZyb20gJy4vRGVidWcnO1xuaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xuaW1wb3J0IHsgTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi9zdGF0ZXMnO1xuaW1wb3J0IFN0YXRlTWFuYWdlciBmcm9tICcuL3N0YXRlcy9TdGF0ZU1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBsYXN0RnJhbWVUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgbGFzdEZyYW1lQ291bnRUaW1lOiBudW1iZXI7XG4gIHByaXZhdGUgZnJhbWVSYXRlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGZyYW1lQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIHN0YXRpYyBzY3JlZW46IHZlYztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgICBpZiAoY29udGFpbmVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdmFsaWQgY29udGFpbmVyIGVsZW1lbnQgbXVzdCBiZSBzcGVjaWZpZWQuJyk7XG4gICAgfVxuICAgIGlmIChjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnY2FudmFzJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgZWxlbWVudCBtdXN0IGJlIGEgY2FudmFzLicpO1xuICAgIH1cbiAgICB0aGlzLmNhbnZhcyA9IGNvbnRhaW5lciBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIC8vIEdldCBhIDJkIGNvbnRleHRcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY29udGV4dCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZ2V0IGEgMmQgY29udGV4dC5cIik7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHJlc2l6ZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgLy8gRGlzYWJsZSBpbWFnZSBzbW9vdGhpbmcgZm9yIHBpeGVsYXRlZCBncmFwaGljc1xuICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBnYW1lIGFuZCBzdGFydCBwbGF5aW5nXG4gICAqL1xuICBwdWJsaWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcblxuICAgIC8vIEluaXRpYWxpc2Ugc3Vic3lzdGVtc1xuICAgIERlYnVnLmluaXRpYWxpc2UoKTtcbiAgICBJbnB1dC5pbml0aWFsaXNlKCk7XG4gICAgQ29udGVudC5pbml0aWFsaXNlKCk7XG4gICAgU3RhdGVNYW5hZ2VyLmluaXRpYWxpc2UoKTtcblxuICAgIC8vIFN0YXJ0IGdhbWUgbG9vcFxuICAgIHRoaXMubGFzdEZyYW1lVGltZSA9IHRoaXMubGFzdEZyYW1lQ291bnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgdGhpcy5sb29wKCk7XG5cbiAgICAvLyBQdXNoIHRoZSBpbml0aWFsIGxvYWRpbmcgc3RhdGVcbiAgICBTdGF0ZU1hbmFnZXIucHVzaChuZXcgTG9hZGluZ1N0YXRlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb29wKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gTWF0aC5taW4obm93IC0gdGhpcy5sYXN0RnJhbWVUaW1lLCBjb25zdGFudHMuRlBTX01JTik7XG5cbiAgICAvLyBDYWxjdWxhdGUgZnJhbWVyYXRlXG4gICAgaWYgKG5vdyAtIHRoaXMubGFzdEZyYW1lQ291bnRUaW1lID49IDEwMDApIHtcbiAgICAgIHRoaXMubGFzdEZyYW1lQ291bnRUaW1lID0gbm93O1xuICAgICAgdGhpcy5mcmFtZVJhdGUgPSB0aGlzLmZyYW1lQ291bnQ7XG4gICAgICB0aGlzLmZyYW1lQ291bnQgPSAwO1xuICAgIH1cbiAgICB0aGlzLmZyYW1lQ291bnQrKztcbiAgICB0aGlzLmxhc3RGcmFtZVRpbWUgPSBub3c7XG4gICAgaWYgKGNvbmZpZy5zaG93RlBTKSB7XG4gICAgICBEZWJ1Zy52YWx1ZSgnRlBTJywgdGhpcy5mcmFtZVJhdGUsIHsgYWxpZ246ICdyaWdodCcgfSk7XG4gICAgfVxuXG4gICAgLy8gRG8gZ2FtZSBsb29wXG4gICAgdGhpcy51cGRhdGUoZWxhcHNlZFRpbWUpO1xuICAgIHRoaXMuZHJhdygpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgIEdhbWUuc2NyZWVuID0gdmVjLm11bChcbiAgICAgIHZlYyh0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KSxcbiAgICAgIDEgLyBjb25maWcuc2NhbGVGYWN0b3JcbiAgICApO1xuICAgIFN0YXRlTWFuYWdlci51cGRhdGUoZHQpO1xuICAgIElucHV0LnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0LnNldFRyYW5zZm9ybShjb25maWcuc2NhbGVGYWN0b3IsIDAsIDAsIGNvbmZpZy5zY2FsZUZhY3RvciwgMCwgMCk7XG4gICAgU3RhdGVNYW5hZ2VyLmRyYXcodGhpcy5jb250ZXh0KTtcbiAgICBEZWJ1Zy5kcmF3KHRoaXMuY29udGV4dCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHZlYyB9IGZyb20gJ0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzJztcbmltcG9ydCB7IEtleSB9IGZyb20gJy4vZW51bXMnO1xuXG50eXBlIE1vdXNlU3RhdGUgPSB7XG4gIGJ1dHRvbjogYm9vbGVhbixcbiAgcG9zaXRpb246IHZlYyxcbiAgd2hlZWw6IG51bWJlclxufTtcblxudHlwZSBLZXlib2FyZFN0YXRlID0ge1xuICBba2V5IGluIEtleV0/OiBib29sZWFuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dCB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBJbnB1dDtcbiAgcHJpdmF0ZSBrZXlib2FyZFN0YXRlOiBLZXlib2FyZFN0YXRlID0ge307XG4gIHByaXZhdGUgcHJldmlvdXNLZXlib2FyZFN0YXRlOiBLZXlib2FyZFN0YXRlID0ge307XG4gIHByaXZhdGUgbW91c2VTdGF0ZTogTW91c2VTdGF0ZSA9IHsgYnV0dG9uOiBmYWxzZSwgcG9zaXRpb246IHZlYygpLCB3aGVlbDogMCB9O1xuICBwcml2YXRlIHByZXZpb3VzTW91c2VTdGF0ZTogTW91c2VTdGF0ZSA9IHsgYnV0dG9uOiBmYWxzZSwgcG9zaXRpb246IHZlYygpLCB3aGVlbDogMCB9O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIHRoaXMubW91c2VTdGF0ZS5idXR0b24gPSB0cnVlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IHRydWU7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IGZhbHNlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgIHRoaXMubW91c2VTdGF0ZS5wb3NpdGlvbi54ID0gZS5vZmZzZXRYO1xuICAgICAgdGhpcy5tb3VzZVN0YXRlLnBvc2l0aW9uLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgIHRoaXMua2V5Ym9hcmRTdGF0ZVtlLmNvZGUgYXMgS2V5XSA9IHRydWU7XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZSA9PiB7XG4gICAgICB0aGlzLmtleWJvYXJkU3RhdGVbZS5jb2RlIGFzIEtleV0gPSBmYWxzZTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBlID0+IHtcbiAgICAgIHRoaXMubW91c2VTdGF0ZS53aGVlbCA9IGUuZGVsdGFZID4gMCA/IDEgOiAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBpbnB1dCBtYW5hZ2VyIGZvciBtYW5hZ2luZyBtb3VzZSBhbmQga2V5Ym9hcmQgaW5wdXRcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICBJbnB1dC5pbnN0YW5jZSA9IG5ldyBJbnB1dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogSW5wdXQge1xuICAgIGlmIChJbnB1dC5pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IG1hbmFnZXIgbm90IHByb3Blcmx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIHJldHVybiBJbnB1dC5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoZSBpbnB1dCBkZXZpY2VzXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZSk7XG4gICAgaW5zdGFuY2UucHJldmlvdXNNb3VzZVN0YXRlID0ge1xuICAgICAgYnV0dG9uOiBpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbixcbiAgICAgIHBvc2l0aW9uOiB2ZWMuY3B5KGluc3RhbmNlLm1vdXNlU3RhdGUucG9zaXRpb24pLFxuICAgICAgd2hlZWw6IDAsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGtleSBpcyBjdXJyZW50bHkgcHJlc3NlZCBkb3duXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGtleURvd24oa2V5PzogS2V5KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuXG4gICAgLy8gQ2hlY2sgaWYgYW55IGtleSBpcyBkb3duXG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGsgaW4gaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZSkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtrIGFzIEtleV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gISFpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2tleV07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBrZXkgaGFzIGJlZW4gcHJlc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBrZXlQcmVzc2VkKGtleT86IEtleSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcblxuICAgIC8vIENoZWNrIGlmIGFueSBrZXkgd2FzIHByZXNzZWRcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIGZvciAoY29uc3QgayBpbiBpbnN0YW5jZS5rZXlib2FyZFN0YXRlKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2sgYXMgS2V5XSAmJlxuICAgICAgICAgIChcbiAgICAgICAgICAgICEoayBpbiBpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGUpIHx8XG4gICAgICAgICAgICAhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2sgYXMgS2V5XVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICEhaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtrZXldICYmICFpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGVba2V5XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGtleSBoYXMgYmVlbiByZWxlYXNlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBrZXlSZWxlYXNlZChrZXk/OiBLZXkpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG5cbiAgICAvLyBDaGVjayBpZiBhbnkga2V5IHdhcyByZWxlYXNlZFxuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAgZm9yIChjb25zdCBrIGluIGluc3RhbmNlLmtleWJvYXJkU3RhdGUpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFpbnN0YW5jZS5rZXlib2FyZFN0YXRlW2sgYXMgS2V5XSAmJlxuICAgICAgICAgICEhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2sgYXMgS2V5XVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gIWluc3RhbmNlLmtleWJvYXJkU3RhdGVba2V5XSAmJiAhIWluc3RhbmNlLnByZXZpb3VzS2V5Ym9hcmRTdGF0ZVtrZXldO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbW91c2UgYnV0dG9uIGlzIGN1cnJlbnRseSBwcmVzc2VkIGRvd25cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VEb3duKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gISFpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG1vdXNlIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlUHJlc3NlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuICEhaW5zdGFuY2UubW91c2VTdGF0ZS5idXR0b24gJiYgIWluc3RhbmNlLnByZXZpb3VzTW91c2VTdGF0ZS5idXR0b247XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBtb3VzZSBidXR0b24gaGFzIGJlZW4gcmVsZWFzZWQgc2luY2UgdGhlIGxhc3QgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbW91c2VSZWxlYXNlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuICFpbnN0YW5jZS5tb3VzZVN0YXRlLmJ1dHRvbiAmJiAhIWluc3RhbmNlLnByZXZpb3VzTW91c2VTdGF0ZS5idXR0b247XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG1vdXNld2hlZWwgaXMgc2Nyb2xsaW5nIHVwXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlV2hlZWxVcCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0LmdldEluc3RhbmNlKCk7XG4gICAgcmV0dXJuIGluc3RhbmNlLm1vdXNlU3RhdGUud2hlZWwgPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBtb3VzZXdoZWVsIGlzIHNjcm9sbGluZyBkb3duXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIG1vdXNlV2hlZWxEb3duKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXQuZ2V0SW5zdGFuY2UoKTtcbiAgICByZXR1cm4gaW5zdGFuY2UubW91c2VTdGF0ZS53aGVlbCA8IDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IG1vdXNlIHBvc2l0aW9uIGluIHNjcmVlbi1zcGFjZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBtb3VzZVBvc2l0aW9uKCk6IHZlYyB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dC5nZXRJbnN0YW5jZSgpO1xuICAgIHJldHVybiBpbnN0YW5jZS5tb3VzZVN0YXRlLnBvc2l0aW9uO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgREVCVUcgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IFNJTVVMQVRFX1NMT1dfTE9BRElORyA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IFNLSVBfSU5UUk8gPSBmYWxzZTtcbmV4cG9ydCBjb25zdCBGUFNfTUlOID0gMSAvIDMwO1xuIiwiaW1wb3J0IEpTT05TY2hlbWFWYWxpZGF0b3IgZnJvbSAnYWp2JztcbmltcG9ydCAqIGFzIF9jb250ZW50TWFuaWZlc3QgZnJvbSAnLi4vLi4vY29udGVudC9jb250ZW50Lmpzb24nO1xuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFbnRpdHlEYXRhTG9hZGVyLCBGb250TG9hZGVyLCBJbWFnZUxvYWRlciwgU291bmRMb2FkZXIgfSBmcm9tICcuLi9jb250ZW50JztcbmltcG9ydCB7IENvbnRlbnRJdGVtVHlwZSB9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCAqIGFzIHV0aWxpdGllcyBmcm9tICcuLi91dGlsaXRpZXMnO1xuXG50eXBlIENvbnRlbnRJdGVtID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IENvbnRlbnRJdGVtVHlwZTtcbiAgYXJnczogc3RyaW5nW107XG59O1xuXG50eXBlIENvbnRlbnRNYW5pZmVzdCA9IHtcbiAgaXRlbXM6IENvbnRlbnRJdGVtW107XG59O1xuXG5leHBvcnQgdHlwZSBDb250ZW50SXRlbUxvYWRlciA9IDxUPiguLi5hcmdzOiBzdHJpbmdbXSkgPT4gUHJvbWlzZTxUPjtcblxuY29uc3QgY29udGVudEl0ZW1Mb2FkZXJzOiB7XG4gIFtrZXkgaW4gQ29udGVudEl0ZW1UeXBlXTogQ29udGVudEl0ZW1Mb2FkZXI7XG59ID0ge1xuICBbQ29udGVudEl0ZW1UeXBlLkltYWdlXTogSW1hZ2VMb2FkZXIsXG4gIFtDb250ZW50SXRlbVR5cGUuU291bmRdOiBTb3VuZExvYWRlcixcbiAgW0NvbnRlbnRJdGVtVHlwZS5Gb250XTogRm9udExvYWRlcixcbiAgW0NvbnRlbnRJdGVtVHlwZS5FbnRpdHlEYXRhXTogRW50aXR5RGF0YUxvYWRlcixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlbnQge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogQ29udGVudDtcbiAgcHJpdmF0ZSBjb250ZW50OiBDb250ZW50SXRlbVtdO1xuICBwcml2YXRlIGl0ZW1zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG4gIHB1YmxpYyBzdGF0aWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBzdGF0aWMgbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihjb250ZW50OiBDb250ZW50SXRlbVtdKSB7XG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBjb250ZW50IG1hbmFnZXIgZm9yIGxvYWRpbmcgY29udGVudCBhc3NldHNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZW50TWFuaWZlc3QgPSBfY29udGVudE1hbmlmZXN0IGFzIENvbnRlbnRNYW5pZmVzdDtcbiAgICBjb25zdCB2YWxpZGF0ZSA9IG5ldyBKU09OU2NoZW1hVmFsaWRhdG9yKCkuY29tcGlsZSh7XG4gICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaXRlbXM6IHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgZW51bTogT2JqZWN0LnZhbHVlcyhDb250ZW50SXRlbVR5cGUpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgICAgICBpdGVtczoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgfSk7XG4gICAgaWYgKCF2YWxpZGF0ZShjb250ZW50TWFuaWZlc3QpKSB7XG4gICAgICBjb25zdGFudHMuREVCVUcgJiYgY29uc29sZS5sb2codmFsaWRhdGUuZXJyb3JzKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250ZW50IG1hbmlmZXN0Jyk7XG4gICAgfVxuICAgIENvbnRlbnQuaW5zdGFuY2UgPSBuZXcgQ29udGVudChjb250ZW50TWFuaWZlc3QuaXRlbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogQ29udGVudCB7XG4gICAgaWYgKENvbnRlbnQuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IG1hbmFnZXIgbm90IHByb3Blcmx5IGluaXRpYWxpc2VkJyk7XG4gICAgfVxuICAgIHJldHVybiBDb250ZW50Lmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChDb250ZW50LmxvYWRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IGFscmVhZHkgbG9hZGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gQ29udGVudC5nZXRJbnN0YW5jZSgpO1xuICAgIGlmIChpbnN0YW5jZS5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb250ZW50IGl0ZW1zIHRvIGxvYWQnKTtcbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3NEZWx0YSA9IDEgLyBpbnN0YW5jZS5jb250ZW50Lmxlbmd0aDtcbiAgICBmb3IgKGNvbnN0IGMgb2YgaW5zdGFuY2UuY29udGVudCkge1xuICAgICAgaWYgKGNvbnN0YW50cy5ERUJVRyAmJiBjb25zdGFudHMuU0lNVUxBVEVfU0xPV19MT0FESU5HKSB7XG4gICAgICAgIGF3YWl0IHV0aWxpdGllcy5zbGVlcChNYXRoLnJhbmRvbUJldHdlZW4oMTAwLCAxMDAwKSk7XG4gICAgICB9XG4gICAgICBpbnN0YW5jZS5pdGVtc1tjLm5hbWVdID0gYXdhaXQgY29udGVudEl0ZW1Mb2FkZXJzW2MudHlwZV0oLi4uYy5hcmdzKTtcbiAgICAgIENvbnRlbnQucHJvZ3Jlc3MgPSBNYXRoLmNsYW1wKENvbnRlbnQucHJvZ3Jlc3MgKyBwcm9ncmVzc0RlbHRhLCAwLCAxKTtcbiAgICB9XG4gICAgQ29udGVudC5sb2FkZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQ8VD4obmFtZTogc3RyaW5nKTogVCB7XG4gICAgaWYgKCFDb250ZW50LmxvYWRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250ZW50IG5vdCBsb2FkZWQnKTtcbiAgICB9XG4gICAgY29uc3QgaW5zdGFuY2UgPSBDb250ZW50LmdldEluc3RhbmNlKCk7XG4gICAgaWYgKCEobmFtZSBpbiBpbnN0YW5jZS5pdGVtcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ29udGVudCBpdGVtIFwiJHtuYW1lfVwiIG5vdCBmb3VuZGApO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2UuaXRlbXNbbmFtZV0gYXMgVDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgdGVzdER1bXAoKTogdm9pZCB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBDb250ZW50LmdldEluc3RhbmNlKCk7XG4gICAgY29uc29sZS5sb2coaW5zdGFuY2UuaXRlbXMpO1xuICB9XG59XG4iLCJpbXBvcnQgSlNPTlNjaGVtYVZhbGlkYXRvciBmcm9tICdhanYnO1xuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFbnRpdHlEYXRhU2NoZW1hIH0gZnJvbSAnLi4vZW50aXRpZXMvRW50aXR5JztcbmltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcbmltcG9ydCB7IEpTT05Mb2FkZXIgfSBmcm9tICcuL0pTT05Mb2FkZXInO1xuXG5leHBvcnQgY29uc3QgRW50aXR5RGF0YUxvYWRlcjogQ29udGVudEl0ZW1Mb2FkZXIgPSBhc3luYyA8RW50aXR5RGF0YT4oXG4gIHVybDogc3RyaW5nXG4pOiBQcm9taXNlPEVudGl0eURhdGE+ID0+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IEpTT05Mb2FkZXI8RW50aXR5RGF0YT4odXJsKTtcbiAgY29uc3QgdmFsaWRhdGUgPSBuZXcgSlNPTlNjaGVtYVZhbGlkYXRvcigpLmNvbXBpbGUoRW50aXR5RGF0YVNjaGVtYSk7XG4gIGlmICghdmFsaWRhdGUoZGF0YSkpIHtcbiAgICBjb25zdGFudHMuREVCVUcgJiYgY29uc29sZS5sb2codmFsaWRhdGUuZXJyb3JzKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZW50aXR5IGRhdGE6ICR7dXJsfWApO1xuICB9XG4gIHJldHVybiBkYXRhO1xufTtcbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IEZvbnRMb2FkZXI6IENvbnRlbnRJdGVtTG9hZGVyID0gYXN5bmMgPEZvbnRGYWNlPihcbiAgdXJsOiBzdHJpbmcsXG4gIGZhbWlseTogc3RyaW5nXG4pOiBQcm9taXNlPEZvbnRGYWNlPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxGb250RmFjZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZvbnQgPSBuZXcgRm9udEZhY2UoZmFtaWx5LCBgdXJsKCR7dXJsfSlgKTtcbiAgICBmb250LmxvYWQoKVxuICAgICAgLnRoZW4oZm9udCA9PiB7XG4gICAgICAgIGRvY3VtZW50LmZvbnRzLmFkZChmb250KTtcbiAgICAgICAgcmVzb2x2ZShmb250IGFzIGFueSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KGBFcnJvciBsb2FkaW5nIGZvbnQgXCIke3VybH1cImApO1xuICAgICAgfSk7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IEltYWdlTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIDxIVE1MSW1hZ2VFbGVtZW50PihcbiAgdXJsOiBzdHJpbmdcbik6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICByZXNvbHZlKGltYWdlIGFzIGFueSk7XG4gICAgfSk7XG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiB7XG4gICAgICByZWplY3QoYEVycm9yIGxvYWRpbmcgaW1hZ2UgXCIke3VybH1cImApO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgeyBDb250ZW50SXRlbUxvYWRlciB9IGZyb20gJy4vQ29udGVudCc7XG5cbmV4cG9ydCBjb25zdCBKU09OTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIDxUPihcbiAgdXJsOiBzdHJpbmcgXG4pOiBQcm9taXNlPFQ+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB3aW5kb3cuZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcsXG4gICAgICB9LFxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgIHJlc29sdmUoanNvbik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KGBFcnJvciBsb2FkaW5nIGpzb24gXCIke3VybH1cImApO1xuICAgICAgfSk7XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IENvbnRlbnRJdGVtTG9hZGVyIH0gZnJvbSAnLi9Db250ZW50JztcblxuZXhwb3J0IGNvbnN0IFNvdW5kTG9hZGVyOiBDb250ZW50SXRlbUxvYWRlciA9IGFzeW5jIDxIVE1MQXVkaW9FbGVtZW50PihcbiAgdXJsOiBzdHJpbmdcbik6IFByb21pc2U8SFRNTEF1ZGlvRWxlbWVudD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEF1ZGlvRWxlbWVudD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHNvdW5kID0gbmV3IEF1ZGlvKHVybCk7XG4gICAgc291bmQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsICgpID0+IHtcbiAgICAgIHJlc29sdmUoc291bmQgYXMgYW55KTtcbiAgICB9KTtcbiAgICBzb3VuZC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHtcbiAgICAgIHJlamVjdChgRXJyb3IgbG9hZGluZyBzb3VuZCBcIiR7dXJsfVwiYCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCB7IEVudGl0eURhdGFMb2FkZXIgfSBmcm9tICcuL0VudGl0eURhdGFMb2FkZXInO1xuZXhwb3J0IHsgRm9udExvYWRlciB9IGZyb20gJy4vRm9udExvYWRlcic7XG5leHBvcnQgeyBJbWFnZUxvYWRlciB9IGZyb20gJy4vSW1hZ2VMb2FkZXInO1xuZXhwb3J0IHsgU291bmRMb2FkZXIgfSBmcm9tICcuL1NvdW5kTG9hZGVyJztcbiIsImltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZC1yYW5kb20nO1xuaW1wb3J0IENvbXBvbmVudCwgeyBDb21wb25lbnREYXRhLCBDb21wb25lbnREYXRhU2NoZW1hIH0gZnJvbSAnLi9jb21wb25lbnRzL0NvbXBvbmVudCc7XG5cbmV4cG9ydCB0eXBlIEVudGl0eURhdGEgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgY29tcG9uZW50czogQ29tcG9uZW50RGF0YVtdO1xufTtcblxuZXhwb3J0IGNvbnN0IEVudGl0eURhdGFTY2hlbWEgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgaWQ6IHtcbiAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgaXRlbXM6IENvbXBvbmVudERhdGFTY2hlbWEsXG4gICAgfSxcbiAgfSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IGZhbHNlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcbiAgcHJpdmF0ZSBpZDogc3RyaW5nO1xuICBwcml2YXRlIGNvbXBvbmVudHM6IFJlY29yZDxzdHJpbmcsIENvbXBvbmVudD47XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIC8vIGlkOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcbiAgICB0aGlzLmNvbXBvbmVudHMgPSB7fTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZnJvbURhdGEoZGF0YTogRW50aXR5RGF0YSk6IEVudGl0eSB7XG4gICAgLy8gVE9ET1xuICAgIHJldHVybiBuZXcgRW50aXR5KCk7XG4gIH1cblxuICAvLyBwdWJsaWMgYWRkQ29tcG9uZW50KGNvbXBvbmVudDogQ29tcG9uZW50KTogdm9pZCB7XG4gIC8vICAgLy8gY29tcG9uZW50LmVudGl0eSA9IHRoaXM7XG4gIC8vICAgLy8gcHVzaCBjb21wb25lbnQgaWYgbm90IGV4aXN0c1xuICAvLyB9XG5cbiAgLy8gcHVibGljIHJlbW92ZUNvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAvLyAgIC8vIHNwbGljZSBjb21wb25lbnQgaWYgZXhpc3RzXG4gIC8vIH1cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9FbnRpdHknO1xuaW1wb3J0IFN5c3RlbSBmcm9tICcuL3N5c3RlbXMvU3lzdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gIHByaXZhdGUgc3lzdGVtczogU3lzdGVtW107XG4gIHByaXZhdGUgZW50aXRpZXM6IEVudGl0eVtdO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN5c3RlbXMgPSBbXTtcbiAgICB0aGlzLmVudGl0aWVzID0gW107XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICAvLyBpbml0aWFsaXNlIHN5c3RlbXMuLi5cbiAgfVxuXG4gIHB1YmxpYyBhZGRFbnRpdHkoZW50aXR5OiBFbnRpdHkpOiB2b2lkIHtcbiAgICAvLyBwdXNoIGVudGl0eSBpZiBub3QgZXhpc3RzXG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRW50aXR5KGVudGl0eTogRW50aXR5KTogdm9pZCB7XG4gICAgLy8gc3BsaWNlIGVudGl0eSBpZiBleGlzdHNcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc3lzdGVtcy5mb3JFYWNoKHN5c3RlbSA9PiBzeXN0ZW0udXBkYXRlKGR0LCB0aGlzLmVudGl0aWVzKSk7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICB0aGlzLnN5c3RlbXMuZm9yRWFjaChzeXN0ZW0gPT4gc3lzdGVtLmRyYXcoY29udGV4dCwgdGhpcy5lbnRpdGllcykpO1xuICB9XG59XG4iLCJleHBvcnQgdHlwZSBDb21wb25lbnREYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgQ29tcG9uZW50RGF0YVNjaGVtYSA9IHtcbiAgdHlwZTogJ29iamVjdCcsXG4gIHByb3BlcnRpZXM6IHtcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cbn1cbiIsImV4cG9ydCBlbnVtIENvbnRlbnRJdGVtVHlwZSB7XG4gIEltYWdlID0gJ2ltYWdlJyxcbiAgU291bmQgPSAnc291bmQnLFxuICBGb250ID0gJ2ZvbnQnLFxuICBFbnRpdHlEYXRhID0gJ2VudGl0eURhdGEnLFxufVxuXG5leHBvcnQgZW51bSBTdGF0ZVRyYW5zaXRpb25UeXBlIHtcbiAgSW4sXG4gIE91dCxcbiAgTm9uZSxcbn1cblxuZXhwb3J0IGVudW0gS2V5IHtcbiAgVXAgPSAnQXJyb3dVcCcsXG4gIERvd24gPSAnQXJyb3dEb3duJyxcbiAgTGVmdCA9ICdBcnJvd0xlZnQnLFxuICBSaWdodCA9ICdBcnJvd1JpZ2h0JyxcbiAgU3BhY2UgPSAnU3BhY2UnLFxuICBFbnRlciA9ICdFbnRlcicsXG4gIFNoaWZ0ID0gJ1NoaWZ0JyxcbiAgQ29udHJvbCA9ICdDb250cm9sJyxcbiAgRXNjYXBlID0gJ0VzY2FwZScsXG4gIERpZ2l0MCA9ICdEaWdpdDAnLFxuICBEaWdpdDEgPSAnRGlnaXQxJyxcbiAgRGlnaXQyID0gJ0RpZ2l0MicsXG4gIERpZ2l0MyA9ICdEaWdpdDMnLFxuICBEaWdpdDQgPSAnRGlnaXQ0JyxcbiAgRGlnaXQ1ID0gJ0RpZ2l0NScsXG4gIERpZ2l0NiA9ICdEaWdpdDYnLFxuICBEaWdpdDcgPSAnRGlnaXQ3JyxcbiAgRGlnaXQ4ID0gJ0RpZ2l0OCcsXG4gIERpZ2l0OSA9ICdEaWdpdDknLFxufVxuXG5leHBvcnQgZW51bSBBbmNob3Ige1xuICBUb3BMZWZ0LFxuICBUb3BDZW50ZXIsXG4gIFRvcFJpZ2h0LFxuICBDZW50ZXJMZWZ0LFxuICBDZW50ZXIsXG4gIENlbnRlclJpZ2h0LFxuICBCb3R0b21MZWZ0LFxuICBCb3R0b21DZW50ZXIsXG4gIEJvdHRvbVJpZ2h0LFxufVxuIiwiaW1wb3J0IENvbnRlbnQgZnJvbSAnLi4vY29udGVudC9Db250ZW50JztcbmltcG9ydCBFbnRpdHksIHsgRW50aXR5RGF0YSB9IGZyb20gJy4uL2VudGl0aWVzL0VudGl0eSc7XG5pbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuLi9lbnRpdGllcy9FbnRpdHlNYW5hZ2VyJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL1N0YXRlJztcblxuZXhwb3J0IGNsYXNzIEdhbWVTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgcHJpdmF0ZSBlbnRpdHlNYW5hZ2VyOiBFbnRpdHlNYW5hZ2VyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZW50aXR5TWFuYWdlciA9IG5ldyBFbnRpdHlNYW5hZ2VyKCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVudGl0eU1hbmFnZXIuaW5pdGlhbGlzZSgpO1xuXG4gICAgQ29udGVudC50ZXN0RHVtcCgpO1xuXG4gICAgLy8gdHJ5aW5nIG91dCBhIHRlc3QgZW50aXR5Li4uXG4gICAgY29uc3QgdGVzdEVudGl0eURhdGEgPSBDb250ZW50LmdldDxFbnRpdHlEYXRhPigndGVzdEVudGl0eScpO1xuICAgIGNvbnNvbGUubG9nKHRlc3RFbnRpdHlEYXRhKTtcbiAgICBjb25zdCB0ZXN0RW50aXR5ID0gRW50aXR5LmZyb21EYXRhKHRlc3RFbnRpdHlEYXRhKTtcbiAgICBjb25zb2xlLmxvZyh0ZXN0RW50aXR5KTtcbiAgICB0aGlzLmVudGl0eU1hbmFnZXIuYWRkRW50aXR5KHRlc3RFbnRpdHkpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnVwZGF0ZShkdCk7XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICB0aGlzLmVudGl0eU1hbmFnZXIuZHJhdyhjb250ZXh0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgdmVjIH0gZnJvbSAnQGJhc2VtZW50dW5pdmVyc2UvY29tbW9uanMnO1xuaW1wb3J0IHsgU3RhdGVUcmFuc2l0aW9uVHlwZSB9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xuaW1wb3J0IElucHV0IGZyb20gJy4uL0lucHV0JztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vdWkvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBNYWluTWVudVN0YXRlIH0gZnJvbSAnLic7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQgU3RhdGVNYW5hZ2VyIGZyb20gJy4vU3RhdGVNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIEludHJvU3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRSQU5TSVRJT05fVElNRTogbnVtYmVyID0gNTtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgU0tJUExPQ0tfVElNRTogbnVtYmVyID0gMjtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQVVUT1NLSVBfVElNRTogbnVtYmVyID0gMTA7XG5cbiAgcHJpdmF0ZSBsb2dvOiBJbWFnZTtcbiAgcHJpdmF0ZSBza2lwTG9ja1RpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBhdXRvU2tpcFRpbWU6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgdHJhbnNpdGlvblRpbWU6IEludHJvU3RhdGUuVFJBTlNJVElPTl9USU1FLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgdGhpcy5za2lwTG9ja1RpbWUgPSBJbnRyb1N0YXRlLlNLSVBMT0NLX1RJTUU7XG4gICAgdGhpcy5hdXRvU2tpcFRpbWUgPSBJbnRyb1N0YXRlLkFVVE9TS0lQX1RJTUU7XG4gICAgdGhpcy5sb2dvID0gbmV3IEltYWdlKCdsb2dvJyk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvZ28ucG9zaXRpb24gPSB2ZWMubWFwKHZlYy5tdWwoR2FtZS5zY3JlZW4sIDEgLyAyKSwgTWF0aC5mbG9vcik7XG4gICAgdGhpcy5sb2dvLnVwZGF0ZSgpO1xuICAgIHRoaXMuc2tpcExvY2tUaW1lIC09IGR0O1xuICAgIHRoaXMuYXV0b1NraXBUaW1lIC09IGR0O1xuICAgIGlmIChcbiAgICAgICh0aGlzLnNraXBMb2NrVGltZSA8PSAwICYmIElucHV0LmtleVByZXNzZWQoKSkgfHxcbiAgICAgIHRoaXMuYXV0b1NraXBUaW1lIDw9IDBcbiAgICApIHtcbiAgICAgIFN0YXRlTWFuYWdlci5wb3AoKTtcbiAgICAgIFN0YXRlTWFuYWdlci5wdXNoKG5ldyBNYWluTWVudVN0YXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25UeXBlICE9PSBTdGF0ZVRyYW5zaXRpb25UeXBlLk5vbmUpIHtcbiAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLnRyYW5zaXRpb25BbW91bnQ7XG4gICAgfVxuICAgIHRoaXMubG9nby5kcmF3KGNvbnRleHQpO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyB2ZWMgfSBmcm9tICdAYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcyc7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCBDb250ZW50IGZyb20gJy4uL2NvbnRlbnQvQ29udGVudCc7XG5pbXBvcnQgeyBTdGF0ZVRyYW5zaXRpb25UeXBlIH0gZnJvbSAnLi4vZW51bXMnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi4vR2FtZSc7XG5pbXBvcnQgeyBQcm9ncmVzc0JhciB9IGZyb20gJy4uL3VpL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgR2FtZVN0YXRlLCBJbnRyb1N0YXRlLCBNYWluTWVudVN0YXRlIH0gZnJvbSAnLic7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQgU3RhdGVNYW5hZ2VyIGZyb20gJy4vU3RhdGVNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIExvYWRpbmdTdGF0ZSBleHRlbmRzIFN0YXRlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVFJBTlNJVElPTl9USU1FOiBudW1iZXIgPSAwLjU7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENPT0xET1dOX1RJTUU6IG51bWJlciA9IDM7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOVFJPX0RFTEFZOiBudW1iZXIgPSAxO1xuXG4gIHByaXZhdGUgZmluaXNoZWRMb2FkaW5nQ29udGVudDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwcm9ncmVzc0JhcjogUHJvZ3Jlc3NCYXI7XG4gIHByaXZhdGUgY29vbGRvd25UaW1lOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIHRyYW5zaXRpb25UaW1lOiBMb2FkaW5nU3RhdGUuVFJBTlNJVElPTl9USU1FLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgdGhpcy5maW5pc2hlZExvYWRpbmdDb250ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0JhcigpO1xuICAgIHRoaXMuY29vbGRvd25UaW1lID0gTG9hZGluZ1N0YXRlLkNPT0xET1dOX1RJTUU7XG4gICAgQ29udGVudC5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmZpbmlzaGVkTG9hZGluZ0NvbnRlbnQgPSB0cnVlO1xuICAgIH0pLmNhdGNoKChlcnJvcjogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdGFudHMuREVCVUcgJiYgY29uc29sZS5sb2coYFVuYWJsZSB0byBsb2FkIGNvbnRlbnQ6ICR7ZXJyb3J9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnByb2dyZXNzQmFyLnBvc2l0aW9uID0gdmVjLm1hcCh2ZWMubXVsKEdhbWUuc2NyZWVuLCAxIC8gMiksIE1hdGguZmxvb3IpO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSBDb250ZW50LnByb2dyZXNzO1xuICAgIHRoaXMucHJvZ3Jlc3NCYXIudXBkYXRlKGR0KTtcbiAgICBpZiAodGhpcy5maW5pc2hlZExvYWRpbmdDb250ZW50KSB7XG4gICAgICB0aGlzLmNvb2xkb3duVGltZSAtPSBkdDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29vbGRvd25UaW1lIDw9IDApIHtcbiAgICAgIFN0YXRlTWFuYWdlci5wb3AoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBUT0RPIGxvYWRpbmcgc3RhdGUgZ29lcyB0byBpbnRybyBvciBtYWluIG1lbnUgc3RhdGVcbiAgICAgICAgLy8gY29uc3QgbmV4dFN0YXRlID0gY29uc3RhbnRzLlNLSVBfSU5UUk9cbiAgICAgICAgLy8gICA/IG5ldyBNYWluTWVudVN0YXRlKClcbiAgICAgICAgLy8gICA6IG5ldyBJbnRyb1N0YXRlKCk7XG4gICAgICAgIC8vIFN0YXRlTWFuYWdlci5wdXNoKG5leHRTdGF0ZSk7XG4gICAgICAgIFN0YXRlTWFuYWdlci5wdXNoKG5ldyBHYW1lU3RhdGUoKSk7XG4gICAgICB9LCBMb2FkaW5nU3RhdGUuSU5UUk9fREVMQVkgKiAxMDAwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uVHlwZSAhPT0gU3RhdGVUcmFuc2l0aW9uVHlwZS5Ob25lKSB7XG4gICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy50cmFuc2l0aW9uQW1vdW50O1xuICAgIH1cbiAgICB0aGlzLnByb2dyZXNzQmFyLmRyYXcoY29udGV4dCk7XG4gICAgY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHZlYyB9IGZyb20gJ0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzJztcbmltcG9ydCBHYW1lV29ya2VyIGZyb20gJ3dvcmtlci1sb2FkZXIhLi4vd29ya2Vycyc7XG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi4vY29uZmlnLmpzb24nO1xuaW1wb3J0IENvbnRlbnQgZnJvbSAnLi4vY29udGVudC9Db250ZW50JztcbmltcG9ydCB7IEtleSwgU3RhdGVUcmFuc2l0aW9uVHlwZSB9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCBHYW1lIGZyb20gJy4uL0dhbWUnO1xuaW1wb3J0IElucHV0IGZyb20gJy4uL0lucHV0JztcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnLi4vdWkvY29tcG9uZW50cyc7XG5pbXBvcnQgTWVudUl0ZW0gZnJvbSAnLi4vdWkvTWVudUl0ZW0nO1xuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSAnLic7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9TdGF0ZSc7XG5pbXBvcnQgU3RhdGVNYW5hZ2VyIGZyb20gJy4vU3RhdGVNYW5hZ2VyJztcblxuZXhwb3J0IGNsYXNzIE1haW5NZW51U3RhdGUgZXh0ZW5kcyBTdGF0ZSB7XG4gIHByaXZhdGUgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kUGF0dGVybjogQ2FudmFzUGF0dGVybiB8IG51bGw7XG4gIHByaXZhdGUgdGl0bGVCYW5uZXI6IEltYWdlO1xuXG4gIHByaXZhdGUgdGVzdE1lbnVJdGVtOiBNZW51SXRlbTtcbiAgcHJpdmF0ZSB0ZXN0VGltZTogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIHRlc3RXb3JrZXI6IEdhbWVXb3JrZXI7XG5cbiAgcHVibGljIGluaXRpYWxpc2UoKTogdm9pZCB7XG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gQ29udGVudC5nZXQ8SFRNTEltYWdlRWxlbWVudD4oJ21lbnVfYmFja2dyb3VuZCcpO1xuICAgIHRoaXMudGl0bGVCYW5uZXIgPSBuZXcgSW1hZ2UoJ21lbnVfdGl0bGUnKTtcbiAgICB0aGlzLnRlc3RNZW51SXRlbSA9IG5ldyBNZW51SXRlbSgnVGVzdCBCdXR0b24nKTtcblxuICAgIHRoaXMudGVzdFdvcmtlciA9IG5ldyBHYW1lV29ya2VyKCk7XG4gICAgdGhpcy50ZXN0V29ya2VyLnBvc3RNZXNzYWdlKCdtZW51Jyk7XG4gICAgdGhpcy50ZXN0V29ya2VyLnBvc3RNZXNzYWdlKCd0ZXN0Jyk7XG4gICAgdGhpcy50ZXN0V29ya2VyLnBvc3RNZXNzYWdlKCdtb25rZXknKTtcbiAgICB0aGlzLnRlc3RXb3JrZXIub25tZXNzYWdlID0gZXZlbnQgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXZlbnQuZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudGVzdE1lbnVJdGVtLnBvc2l0aW9uID0gdmVjLm1hcCh2ZWMubXVsKEdhbWUuc2NyZWVuLCAxIC8gMiksIE1hdGguZmxvb3IpO1xuICAgIHRoaXMudGVzdE1lbnVJdGVtLnVwZGF0ZShkdCk7XG4gICAgdGhpcy50ZXN0VGltZSArPSBkdDtcbiAgICB0aGlzLnRlc3RNZW51SXRlbS5zZWxlY3RlZCA9IE1hdGguc2luKHRoaXMudGVzdFRpbWUgLyAyKSA+IDA7XG4gICAgaWYgKElucHV0LmtleVByZXNzZWQoS2V5LlNwYWNlKSkge1xuICAgICAgU3RhdGVNYW5hZ2VyLnBvcCgpO1xuICAgICAgU3RhdGVNYW5hZ2VyLnB1c2gobmV3IEdhbWVTdGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb250ZXh0LnNhdmUoKTtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uVHlwZSAhPT0gU3RhdGVUcmFuc2l0aW9uVHlwZS5Ob25lKSB7XG4gICAgICBjb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy50cmFuc2l0aW9uQW1vdW50O1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYmFja2dyb3VuZFBhdHRlcm4pIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZFBhdHRlcm4gPSBjb250ZXh0LmNyZWF0ZVBhdHRlcm4odGhpcy5iYWNrZ3JvdW5kLCAncmVwZWF0Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmJhY2tncm91bmRQYXR0ZXJuKSB7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZFBhdHRlcm47XG4gICAgICBjb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBjb250ZXh0LmNhbnZhcy53aWR0aCAqIGNvbmZpZy5zY2FsZUZhY3RvcixcbiAgICAgICAgY29udGV4dC5jYW52YXMuaGVpZ2h0ICogY29uZmlnLnNjYWxlRmFjdG9yXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLnRlc3RNZW51SXRlbS5kcmF3KGNvbnRleHQpO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdGF0ZVRyYW5zaXRpb25UeXBlIH0gZnJvbSAnLi4vZW51bXMnO1xuXG5leHBvcnQgdHlwZSBTdGF0ZU9wdGlvbnMgPSB7XG4gIHRyYW5zaXRpb25UaW1lOiBudW1iZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTdGF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdE9wdGlvbnM6IFN0YXRlT3B0aW9ucyA9IHtcbiAgICB0cmFuc2l0aW9uVGltZTogMixcbiAgfTtcblxuICBwdWJsaWMgdHJhbnNpdGlvblR5cGU6IFN0YXRlVHJhbnNpdGlvblR5cGUgPSBTdGF0ZVRyYW5zaXRpb25UeXBlLk5vbmU7XG4gIHB1YmxpYyB0cmFuc2l0aW9uQW1vdW50OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgdHJhbnNpdGlvblRpbWU6IG51bWJlcjtcbiAgcHVibGljIHRyYW5zcGFyZW50OiBib29sZWFuO1xuICBwdWJsaWMgZGlzcG9zZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogUGFydGlhbDxTdGF0ZU9wdGlvbnM+ID0ge30pIHtcbiAgICBjb25zdCBhY3R1YWxPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgdGhpcy50cmFuc2l0aW9uVGltZSA9IGFjdHVhbE9wdGlvbnMudHJhbnNpdGlvblRpbWU7XG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2l0aW9uSW4oKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2l0aW9uVHlwZSA9IFN0YXRlVHJhbnNpdGlvblR5cGUuSW47XG4gIH1cblxuICBwdWJsaWMgdHJhbnNpdGlvbk91dCgpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zaXRpb25UeXBlID0gU3RhdGVUcmFuc2l0aW9uVHlwZS5PdXQ7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlVHJhbnNpdGlvbihkdDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYW1vdW50OiBudW1iZXIgPSBkdCAvIHRoaXMudHJhbnNpdGlvblRpbWU7XG5cbiAgICAvLyBUcmFuc2l0aW9uaW5nIGluXG4gICAgaWYgKHRoaXMudHJhbnNpdGlvblR5cGUgPT09IFN0YXRlVHJhbnNpdGlvblR5cGUuSW4pIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25BbW91bnQgPCAxKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkFtb3VudCA9IE1hdGguY2xhbXAodGhpcy50cmFuc2l0aW9uQW1vdW50ICsgYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvblR5cGUgPSBTdGF0ZVRyYW5zaXRpb25UeXBlLk5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhbnNpdGlvbmluZyBvdXRcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uVHlwZSA9PT0gU3RhdGVUcmFuc2l0aW9uVHlwZS5PdXQpIHtcbiAgICAgIGlmICh0aGlzLnRyYW5zaXRpb25BbW91bnQgPiAwKSB7XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkFtb3VudCA9IE1hdGguY2xhbXAodGhpcy50cmFuc2l0aW9uQW1vdW50IC0gYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBpbml0aWFsaXNlKCk6IHZvaWQ7XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZDtcblxuICBwdWJsaWMgYWJzdHJhY3QgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHsgU3RhdGVUcmFuc2l0aW9uVHlwZSB9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuLi9zdGF0ZXMvU3RhdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZU1hbmFnZXIge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogU3RhdGVNYW5hZ2VyO1xuICBwcml2YXRlIHN0YXRlczogU3RhdGVbXSA9IFtdO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGlzZSgpOiB2b2lkIHtcbiAgICBTdGF0ZU1hbmFnZXIuaW5zdGFuY2UgPSBuZXcgU3RhdGVNYW5hZ2VyKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTdGF0ZU1hbmFnZXIge1xuICAgIGlmIChTdGF0ZU1hbmFnZXIuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdGF0ZSBtYW5hZ2VyIG5vdCBwcm9wZXJseSBpbml0aWFsaXNlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gU3RhdGVNYW5hZ2VyLmluc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBwdXNoKHN0YXRlOiBTdGF0ZSk6IFN0YXRlIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IFN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgIGluc3RhbmNlLnN0YXRlcy5wdXNoKHN0YXRlKTtcblxuICAgIC8vIEluaXRpYWxpc2UgdGhlIHN0YXRlIGFuZCBzdGFydCB0cmFuc2l0aW9uaW5nIGluXG4gICAgc3RhdGUuaW5pdGlhbGlzZSgpO1xuICAgIHN0YXRlLnRyYW5zaXRpb25JbigpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgcG9wKCk6IFN0YXRlIHwgbnVsbCB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBpZiAoaW5zdGFuY2Uuc3RhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBsYXN0OiBudW1iZXIgPSBpbnN0YW5jZS5zdGF0ZXMubGVuZ3RoIC0gMTtcblxuICAgICAgLy8gUmVtb3ZlIHRoZSB0b3AtbW9zdCBzdGF0ZSB0aGF0IGlzbid0IGN1cnJlbnRseSB0cmFuc2l0aW9uaW5nIG91dFxuICAgICAgd2hpbGUgKGxhc3QgPiAwICYmIGluc3RhbmNlLnN0YXRlc1tsYXN0XS50cmFuc2l0aW9uVHlwZSA9PT0gU3RhdGVUcmFuc2l0aW9uVHlwZS5PdXQpIHtcbiAgICAgICAgbGFzdC0tO1xuICAgICAgfVxuICAgICAgaWYgKGxhc3QgPj0gMCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGluc3RhbmNlLnN0YXRlc1tsYXN0XTtcblxuICAgICAgICAvLyBTdGFydCB0cmFuc2l0aW9uaW5nIG91dFxuICAgICAgICBzdGF0ZS50cmFuc2l0aW9uT3V0KCk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNsZWFyKCk6IHZvaWQge1xuICAgIGNvbnN0IGluc3RhbmNlID0gU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgaW5zdGFuY2Uuc3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgaWYgKHN0YXRlLnRyYW5zaXRpb25UeXBlICE9PSBTdGF0ZVRyYW5zaXRpb25UeXBlLk91dCkge1xuICAgICAgICBzdGF0ZS50cmFuc2l0aW9uT3V0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBpZiAoaW5zdGFuY2Uuc3RhdGVzLmxlbmd0aCA+IDApIHtcblxuICAgICAgLy8gT25seSB1cGRhdGUgdGhlIHRvcC1tb3N0IHN0YXRlIHRoYXQgaXNuJ3QgY3VycmVudGx5IHRyYW5zaXRpb25pbmcgb3V0XG4gICAgICBmb3IgKGxldCBpID0gaW5zdGFuY2Uuc3RhdGVzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICBpZiAoaW5zdGFuY2Uuc3RhdGVzW2ldLnRyYW5zaXRpb25UeXBlICE9PSBTdGF0ZVRyYW5zaXRpb25UeXBlLk91dCkge1xuICAgICAgICAgIGluc3RhbmNlLnN0YXRlc1tpXS51cGRhdGUoZHQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBhbGwgc3RhdGUgdHJhbnNpdGlvbnNcbiAgICAgIGluc3RhbmNlLnN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgc3RhdGUudXBkYXRlVHJhbnNpdGlvbihkdCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gUmVtb3ZlIGFueSBkaXNwb3NlZCBzdGF0ZXNcbiAgICAgIGluc3RhbmNlLnN0YXRlcyA9IGluc3RhbmNlLnN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gIXN0YXRlLmRpc3Bvc2VkKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIGluc3RhbmNlLnN0YXRlcykge1xuICAgICAgc3RhdGUuZHJhdyhjb250ZXh0KTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gJy4vR2FtZVN0YXRlJztcbmV4cG9ydCB7IEludHJvU3RhdGUgfSBmcm9tICcuL0ludHJvU3RhdGUnO1xuZXhwb3J0IHsgTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi9Mb2FkaW5nU3RhdGUnO1xuZXhwb3J0IHsgTWFpbk1lbnVTdGF0ZSB9IGZyb20gJy4vTWFpbk1lbnVTdGF0ZSc7XG4iLCJpbXBvcnQgeyB2ZWMgfSBmcm9tICdAYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcyc7XG5pbXBvcnQgeyBJbWFnZSwgVGV4dCB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgSGFzVHJhbnNmb3JtcyBmcm9tICcuL2NvbnRyYWN0cy9IYXNUcmFuc2Zvcm1zJztcblxudHlwZSBNZW51SXRlbUFjdGl2YXRpb25IYW5kbGVyID0gKCkgPT4gdm9pZDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudUl0ZW0gaW1wbGVtZW50cyBIYXNUcmFuc2Zvcm1zIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVFJBTlNJVElPTl9USU1FOiBudW1iZXIgPSAwLjU7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IExBQkVMX09GRlNFVDogdmVjID0gdmVjKDAsIDEpO1xuXG4gIHB1YmxpYyB0ZXh0OiBzdHJpbmc7XG4gIHB1YmxpYyBwb3NpdGlvbjogdmVjO1xuICBwdWJsaWMgc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFjdGl2YXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgYWN0aXZhdGlvbkhhbmRsZXI6IE1lbnVJdGVtQWN0aXZhdGlvbkhhbmRsZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbGFiZWw6IFRleHQ7XG4gIHByaXZhdGUgYmFja2dyb3VuZEltYWdlOiBJbWFnZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZEJhY2tncm91bmRJbWFnZTogSW1hZ2U7XG4gIHByaXZhdGUgdHJhbnNpdGlvbjogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgdGV4dDogc3RyaW5nLFxuICAgIHBvc2l0aW9uOiB2ZWMgPSB2ZWMoKSxcbiAgICBhY3RpdmF0aW9uSGFuZGxlcj86IE1lbnVJdGVtQWN0aXZhdGlvbkhhbmRsZXJcbiAgKSB7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5hY3RpdmF0aW9uSGFuZGxlciA9IGFjdGl2YXRpb25IYW5kbGVyO1xuICAgIHRoaXMubGFiZWwgPSBuZXcgVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24sIHtcbiAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgIGZvbnQ6ICdhbmlyb24tYm9sZCcsXG4gICAgICBzaXplOiAxMixcbiAgICAgIGNvbG91cjogJyNkZGInLFxuICAgICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgICBzdHJva2VDb2xvdXI6ICcjMjEwJyxcbiAgICB9KTtcbiAgICB0aGlzLmJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgnbWVudV9idXR0b24nLCB0aGlzLnBvc2l0aW9uLCB7XG4gICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgfSk7XG4gICAgdGhpcy5zZWxlY3RlZEJhY2tncm91bmRJbWFnZSA9IG5ldyBJbWFnZSgnbWVudV9idXR0b25fc2VsZWN0ZWQnLCB0aGlzLnBvc2l0aW9uLCB7XG4gICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWN0aXZhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvbkhhbmRsZXIpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkhhbmRsZXIoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxhYmVsLnRleHQgPSB0aGlzLnRleHQ7XG4gICAgdGhpcy5sYWJlbC51cGRhdGUoKTtcbiAgICB0aGlzLmxhYmVsLnBvc2l0aW9uID0gdmVjLmFkZCh0aGlzLmxhYmVsLnBvc2l0aW9uLCBNZW51SXRlbS5MQUJFTF9PRkZTRVQpO1xuICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLnVwZGF0ZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWRCYWNrZ3JvdW5kSW1hZ2UudXBkYXRlKCk7XG4gICAgY29uc3QgYW1vdW50ID0gZHQgLyBNZW51SXRlbS5UUkFOU0lUSU9OX1RJTUU7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbiArPSBhbW91bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbiAtPSBhbW91bnQ7XG4gICAgfVxuICAgIHRoaXMudHJhbnNpdGlvbiA9IE1hdGguY2xhbXAodGhpcy50cmFuc2l0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIHRoaXMuYmFja2dyb3VuZEltYWdlLmRyYXcoY29udGV4dCk7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbiA+IDApIHtcbiAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMudHJhbnNpdGlvbjtcbiAgICAgIHRoaXMuc2VsZWN0ZWRCYWNrZ3JvdW5kSW1hZ2UuZHJhdyhjb250ZXh0KTtcbiAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbiAgICB0aGlzLmxhYmVsLmRyYXcoY29udGV4dCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHZlYyB9IGZyb20gJ0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzJztcbmltcG9ydCB7IEFuY2hvciB9IGZyb20gJy4uLy4uL2VudW1zJztcbmltcG9ydCBIYXNUcmFuc2Zvcm1zIGZyb20gJy4uL2NvbnRyYWN0cy9IYXNUcmFuc2Zvcm1zJztcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50T3B0aW9ucyA9IHtcbiAgcGFyZW50PzogSGFzVHJhbnNmb3JtcztcbiAgYW5jaG9yOiBBbmNob3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQgaW1wbGVtZW50cyBIYXNUcmFuc2Zvcm1zIHtcbiAgcHVibGljIHBvc2l0aW9uOiB2ZWM7XG4gIHB1YmxpYyBvcHRpb25zOiBDb21wb25lbnRPcHRpb25zICYgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIHByb3RlY3RlZCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcm90ZWN0ZWQgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogdmVjID0gdmVjKCkpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY29udGV4dCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZ2V0IGEgMmQgY29udGV4dC5cIik7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBhbmNob3JPZmZzZXQoKTogdmVjIHtcbiAgICBzd2l0Y2ggKHRoaXMub3B0aW9ucy5hbmNob3IpIHtcbiAgICAgIGNhc2UgQW5jaG9yLlRvcExlZnQ6XG4gICAgICAgIHJldHVybiB2ZWMoMCwgMCk7XG4gICAgICBjYXNlIEFuY2hvci5Ub3BDZW50ZXI6XG4gICAgICAgIHJldHVybiB2ZWMoLXRoaXMuY2FudmFzLndpZHRoIC8gMiwgMCk7XG4gICAgICBjYXNlIEFuY2hvci5Ub3BSaWdodDpcbiAgICAgICAgcmV0dXJuIHZlYygtdGhpcy5jYW52YXMud2lkdGgsIDApO1xuICAgICAgY2FzZSBBbmNob3IuQ2VudGVyTGVmdDpcbiAgICAgICAgcmV0dXJuIHZlYygwLCAtdGhpcy5jYW52YXMuaGVpZ2h0IC8gMik7XG4gICAgICBjYXNlIEFuY2hvci5DZW50ZXI6XG4gICAgICAgIHJldHVybiB2ZWMoLXRoaXMuY2FudmFzLndpZHRoIC8gMiwgLXRoaXMuY2FudmFzLmhlaWdodCAvIDIpO1xuICAgICAgY2FzZSBBbmNob3IuQ2VudGVyUmlnaHQ6XG4gICAgICAgIHJldHVybiB2ZWMoLXRoaXMuY2FudmFzLndpZHRoLCAtdGhpcy5jYW52YXMuaGVpZ2h0IC8gMik7XG4gICAgICBjYXNlIEFuY2hvci5Cb3R0b21MZWZ0OlxuICAgICAgICByZXR1cm4gdmVjKDAsIC10aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgY2FzZSBBbmNob3IuQm90dG9tQ2VudGVyOlxuICAgICAgICByZXR1cm4gdmVjKC10aGlzLmNhbnZhcy53aWR0aCAvIDIsIC10aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgY2FzZSBBbmNob3IuQm90dG9tUmlnaHQ6XG4gICAgICAgIHJldHVybiB2ZWModGhpcy5jYW52YXMud2lkdGggLyAyLCAtdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkO1xuXG4gIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XG59XG4iLCJpbXBvcnQgeyB2ZWMgfSBmcm9tICdAYmFzZW1lbnR1bml2ZXJzZS9jb21tb25qcyc7XG5pbXBvcnQgQ29udGVudCBmcm9tICcuLi8uLi9jb250ZW50L0NvbnRlbnQnO1xuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi4vLi4vZW51bXMnO1xuaW1wb3J0IENvbXBvbmVudCwgeyBDb21wb25lbnRPcHRpb25zIH0gZnJvbSAnLi9Db21wb25lbnQnO1xuXG50eXBlIEltYWdlT3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnM7XG5cbmV4cG9ydCBjbGFzcyBJbWFnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHByaXZhdGUgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIHB1YmxpYyBvcHRpb25zOiBJbWFnZU9wdGlvbnM7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZWZhdWx0T3B0aW9uczogSW1hZ2VPcHRpb25zID0ge1xuICAgIGFuY2hvcjogQW5jaG9yLkNlbnRlcixcbiAgfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgaW1hZ2VOYW1lOiBzdHJpbmcsXG4gICAgcG9zaXRpb246IHZlYyA9IHZlYygpLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8SW1hZ2VPcHRpb25zPiA9IHt9XG4gICkge1xuICAgIHN1cGVyKHBvc2l0aW9uKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLmltYWdlID0gQ29udGVudC5nZXQ8SFRNTEltYWdlRWxlbWVudD4oaW1hZ2VOYW1lKTtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuaW1hZ2Uud2lkdGg7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5vcHRpb25zLnBhcmVudC5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdJbWFnZSgpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdmVjLm1hcCh2ZWMuYWRkKHRoaXMucG9zaXRpb24sIHRoaXMuYW5jaG9yT2Zmc2V0KSwgTWF0aC5mbG9vcik7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jYW52YXMsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3SW1hZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCk7XG4gICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgdmVjIH0gZnJvbSAnQGJhc2VtZW50dW5pdmVyc2UvY29tbW9uanMnO1xuaW1wb3J0IHsgQW5jaG9yIH0gZnJvbSAnLi4vLi4vZW51bXMnO1xuaW1wb3J0IHsgcm91bmRlZFJlY3RhbmdsZSB9IGZyb20gJy4uLy4uL3V0aWxpdGllcyc7XG5pbXBvcnQgQ29tcG9uZW50LCB7IENvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuL0NvbXBvbmVudCc7XG5cbnR5cGUgUHJvZ3Jlc3NCYXJPcHRpb25zID0gQ29tcG9uZW50T3B0aW9ucyAmIHtcbiAgc2l6ZTogdmVjO1xuICBlYXNlOiBudW1iZXIsXG4gIHBhZGRpbmc6IG51bWJlcjtcbiAgYm9yZGVyQ29sb3VyOiBDb2xvdXI7XG4gIGJvcmRlcldpZHRoOiBudW1iZXI7XG4gIGJvcmRlclJhZGl1czogbnVtYmVyO1xuICBiYXJDb2xvdXI6IENvbG91cjtcbiAgYmFyUmFkaXVzOiBudW1iZXI7XG59O1xuXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBwdWJsaWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgYWN0dWFsUHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBvcHRpb25zOiBQcm9ncmVzc0Jhck9wdGlvbnM7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZWZhdWx0T3B0aW9uczogUHJvZ3Jlc3NCYXJPcHRpb25zID0ge1xuICAgIGFuY2hvcjogQW5jaG9yLkNlbnRlcixcbiAgICBzaXplOiB2ZWMoMTIwLCAxNCksXG4gICAgZWFzZTogMC45LFxuICAgIHBhZGRpbmc6IDQsXG4gICAgYm9yZGVyQ29sb3VyOiAnI2I3NScsXG4gICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgYm9yZGVyUmFkaXVzOiA2LFxuICAgIGJhckNvbG91cjogJyNmZWMnLFxuICAgIGJhclJhZGl1czogMyxcbiAgfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcG9zaXRpb246IHZlYyA9IHZlYygpLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8UHJvZ3Jlc3NCYXJPcHRpb25zPiA9IHt9XG4gICkge1xuICAgIHN1cGVyKHBvc2l0aW9uKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMub3B0aW9ucy5zaXplLng7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLnNpemUueTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5wcm9ncmVzcyAtIHRoaXMuYWN0dWFsUHJvZ3Jlc3M7XG4gICAgdGhpcy5hY3R1YWxQcm9ncmVzcyArPSBkZWx0YSAqIGR0ICogdGhpcy5vcHRpb25zLmVhc2U7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9wdGlvbnMucGFyZW50LnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIHRoaXMuZHJhd1Byb2dyZXNzQmFyKCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSB2ZWMubWFwKHZlYy5hZGQodGhpcy5wb3NpdGlvbiwgdGhpcy5hbmNob3JPZmZzZXQpLCBNYXRoLmZsb29yKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgcG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdQcm9ncmVzc0JhcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBEcmF3IGJvcmRlclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMub3B0aW9ucy5ib3JkZXJDb2xvdXI7XG4gICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMub3B0aW9ucy5ib3JkZXJXaWR0aDtcbiAgICByb3VuZGVkUmVjdGFuZ2xlKFxuICAgICAgdGhpcy5jb250ZXh0LFxuICAgICAgdmVjKDAsIDApLFxuICAgICAgdGhpcy5vcHRpb25zLnNpemUsXG4gICAgICB0aGlzLm9wdGlvbnMuYm9yZGVyUmFkaXVzXG4gICAgKTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAvLyBEcmF3IHByb2dyZXNzIGJhclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuYmFyQ29sb3VyO1xuICAgIGNvbnN0IHdpZHRoID0gKHRoaXMub3B0aW9ucy5zaXplLnggLSAoMiAqIHRoaXMub3B0aW9ucy5wYWRkaW5nKSkgKiB0aGlzLmFjdHVhbFByb2dyZXNzO1xuICAgIHJvdW5kZWRSZWN0YW5nbGUoXG4gICAgICB0aGlzLmNvbnRleHQsXG4gICAgICB2ZWModGhpcy5vcHRpb25zLnBhZGRpbmcpLFxuICAgICAgdmVjKFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgdGhpcy5vcHRpb25zLnNpemUueSAtICgyICogdGhpcy5vcHRpb25zLnBhZGRpbmcpXG4gICAgICApLFxuICAgICAgTWF0aC5taW4od2lkdGgsIHRoaXMub3B0aW9ucy5iYXJSYWRpdXMpXG4gICAgKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHZlYyB9IGZyb20gJ0BiYXNlbWVudHVuaXZlcnNlL2NvbW1vbmpzJztcbmltcG9ydCB7IEFuY2hvciB9IGZyb20gJy4uLy4uL2VudW1zJztcbmltcG9ydCBDb21wb25lbnQsIHsgQ29tcG9uZW50T3B0aW9ucyB9IGZyb20gJy4vQ29tcG9uZW50JztcblxudHlwZSBUZXh0T3B0aW9ucyA9IENvbXBvbmVudE9wdGlvbnMgJiB7XG4gIHNpemU6IG51bWJlcjtcbiAgZm9udDogc3RyaW5nO1xuICBwYWRkaW5nOiBudW1iZXI7XG4gIGNvbG91cjogQ29sb3VyO1xuICBzdHJva2VXaWR0aDogbnVtYmVyO1xuICBzdHJva2VDb2xvdXI6IENvbG91cjtcbn07XG5cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHRleHQ6IHN0cmluZztcbiAgcHVibGljIG9wdGlvbnM6IFRleHRPcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRPcHRpb25zOiBUZXh0T3B0aW9ucyA9IHtcbiAgICBhbmNob3I6IEFuY2hvci5DZW50ZXIsXG4gICAgc2l6ZTogMzAsXG4gICAgZm9udDogJ3NhbnMtc2VyaWYnLFxuICAgIHBhZGRpbmc6IDQsXG4gICAgY29sb3VyOiAnIzAwMCcsXG4gICAgc3Ryb2tlV2lkdGg6IDAsXG4gICAgc3Ryb2tlQ29sb3VyOiAnI2ZmZicsXG4gIH07XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBwb3NpdGlvbjogdmVjID0gdmVjKCksXG4gICAgb3B0aW9uczogUGFydGlhbDxUZXh0T3B0aW9ucz4gPSB7fVxuICApIHtcbiAgICBzdXBlcihwb3NpdGlvbik7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke3RoaXMub3B0aW9ucy5zaXplfXB4ICR7dGhpcy5vcHRpb25zLmZvbnR9YDtcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGV4dCkud2lkdGggKyB0aGlzLm9wdGlvbnMucGFkZGluZyAqIDI7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5vcHRpb25zLnNpemUgKyB0aGlzLm9wdGlvbnMucGFkZGluZyAqIDI7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5vcHRpb25zLnBhcmVudC5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXdUZXh0KCk7XG4gICAgY29uc3QgcG9zaXRpb24gPSB2ZWMubWFwKHZlYy5hZGQodGhpcy5wb3NpdGlvbiwgdGhpcy5hbmNob3JPZmZzZXQpLCBNYXRoLmZsb29yKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgcG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdUZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke3RoaXMub3B0aW9ucy5zaXplfXB4ICR7dGhpcy5vcHRpb25zLmZvbnR9YDtcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdHJva2VXaWR0aCA+IDApIHtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLm9wdGlvbnMuc3Ryb2tlV2lkdGg7XG4gICAgICB0aGlzLmNvbnRleHQubGluZUNhcCA9ICdyb3VuZCc7XG4gICAgICB0aGlzLmNvbnRleHQubGluZUpvaW4gPSAncm91bmQnO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5vcHRpb25zLnN0cm9rZUNvbG91cjtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VUZXh0KHRoaXMudGV4dCwgdGhpcy5vcHRpb25zLnBhZGRpbmcsIHRoaXMub3B0aW9ucy5wYWRkaW5nKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5jb2xvdXI7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy5vcHRpb25zLnBhZGRpbmcsIHRoaXMub3B0aW9ucy5wYWRkaW5nKTtcbiAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG59XG4iLCJleHBvcnQgeyBJbWFnZSB9IGZyb20gJy4vSW1hZ2UnO1xuZXhwb3J0IHsgUHJvZ3Jlc3NCYXIgfSBmcm9tICcuL1Byb2dyZXNzQmFyJztcbmV4cG9ydCB7IFRleHQgfSBmcm9tICcuL1RleHQnO1xuIiwiaW1wb3J0IHsgdmVjIH0gZnJvbSAnQGJhc2VtZW50dW5pdmVyc2UvY29tbW9uanMnO1xuXG4vKipcbiAqIFBhdXNlIGV4ZWN1dGlvbiBmb3Igc29tZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuLyoqXG4gKiBEcmF3IGEgcm91bmRlZCByZWN0YW5nbGUgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmRlZFJlY3RhbmdsZShcbiAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICBwb3NpdGlvbjogdmVjLFxuICBzaXplOiB2ZWMsXG4gIHJhZGl1czogbnVtYmVyXG4pOiB2b2lkIHtcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcblxuICAvLyBUb3AgZWRnZVxuICBjb250ZXh0Lm1vdmVUbyhwb3NpdGlvbi54ICsgcmFkaXVzLCBwb3NpdGlvbi55KTtcbiAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIHNpemUueCAtIHJhZGl1cywgcG9zaXRpb24ueSk7XG4gIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyggLy8gVG9wIHJpZ2h0IGNvcm5lclxuICAgIHBvc2l0aW9uLnggKyBzaXplLngsXG4gICAgcG9zaXRpb24ueSxcbiAgICBwb3NpdGlvbi54ICsgc2l6ZS54LFxuICAgIHBvc2l0aW9uLnkgKyByYWRpdXNcbiAgKTtcblxuICAvLyBSaWdodCBlZGdlXG4gIGNvbnRleHQubGluZVRvKHBvc2l0aW9uLnggKyBzaXplLngsIHBvc2l0aW9uLnkgKyBzaXplLnkgLSByYWRpdXMpO1xuICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8oIC8vIEJvdHRvbSByaWdodCBjb3JuZXJcbiAgICBwb3NpdGlvbi54ICsgc2l6ZS54LFxuICAgIHBvc2l0aW9uLnkgKyBzaXplLnksXG4gICAgcG9zaXRpb24ueCArIHNpemUueCAtIHJhZGl1cyxcbiAgICBwb3NpdGlvbi55ICsgc2l6ZS55XG4gICk7XG5cbiAgLy8gQm90dG9tIGVkZ2VcbiAgY29udGV4dC5saW5lVG8ocG9zaXRpb24ueCArIHJhZGl1cywgcG9zaXRpb24ueSArIHNpemUueSk7XG4gIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyggLy8gQm90dG9tIGxlZnQgY29ybmVyXG4gICAgcG9zaXRpb24ueCxcbiAgICBwb3NpdGlvbi55ICsgc2l6ZS55LFxuICAgIHBvc2l0aW9uLngsXG4gICAgcG9zaXRpb24ueSArIHNpemUueSAtIHJhZGl1c1xuICApO1xuXG4gIC8vIExlZnQgZWRnZVxuICBjb250ZXh0LmxpbmVUbyhwb3NpdGlvbi54LCBwb3NpdGlvbi55ICsgcmFkaXVzKTtcbiAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKCAvLyBUb3AgbGVmdCBjb3JuZXJcbiAgICBwb3NpdGlvbi54LFxuICAgIHBvc2l0aW9uLnksXG4gICAgcG9zaXRpb24ueCArIHJhZGl1cyxcbiAgICBwb3NpdGlvbi55XG4gICk7XG4gIGNvbnRleHQuY2xvc2VQYXRoKCk7XG59XG4iLCIvKiogQGxpY2Vuc2UgVVJJLmpzIHY0LjQuMSAoYykgMjAxMSBHYXJ5IENvdXJ0LiBMaWNlbnNlOiBodHRwOi8vZ2l0aHViLmNvbS9nYXJ5Y291cnQvdXJpLWpzICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuVVJJID0gZ2xvYmFsLlVSSSB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHNldHMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgc2V0c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoc2V0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHNldHNbMF0gPSBzZXRzWzBdLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgdmFyIHhsID0gc2V0cy5sZW5ndGggLSAxO1xuICAgICAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHhsOyArK3gpIHtcbiAgICAgICAgICAgIHNldHNbeF0gPSBzZXRzW3hdLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRzW3hsXSA9IHNldHNbeGxdLnNsaWNlKDEpO1xuICAgICAgICByZXR1cm4gc2V0cy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0c1swXTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJleHAoc3RyKSB7XG4gICAgcmV0dXJuIFwiKD86XCIgKyBzdHIgKyBcIilcIjtcbn1cbmZ1bmN0aW9uIHR5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8gPT09IHVuZGVmaW5lZCA/IFwidW5kZWZpbmVkXCIgOiBvID09PSBudWxsID8gXCJudWxsXCIgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc3BsaXQoXCIgXCIpLnBvcCgpLnNwbGl0KFwiXVwiKS5zaGlmdCgpLnRvTG93ZXJDYXNlKCk7XG59XG5mdW5jdGlvbiB0b1VwcGVyQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKCk7XG59XG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGwgPyBvYmogaW5zdGFuY2VvZiBBcnJheSA/IG9iaiA6IHR5cGVvZiBvYmoubGVuZ3RoICE9PSBcIm51bWJlclwiIHx8IG9iai5zcGxpdCB8fCBvYmouc2V0SW50ZXJ2YWwgfHwgb2JqLmNhbGwgPyBbb2JqXSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaikgOiBbXTtcbn1cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciBvYmogPSB0YXJnZXQ7XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRXhwcyhpc0lSSSkge1xuICAgIHZhciBBTFBIQSQkID0gXCJbQS1aYS16XVwiLFxuICAgICAgICBDUiQgPSBcIltcXFxceDBEXVwiLFxuICAgICAgICBESUdJVCQkID0gXCJbMC05XVwiLFxuICAgICAgICBEUVVPVEUkJCA9IFwiW1xcXFx4MjJdXCIsXG4gICAgICAgIEhFWERJRyQkID0gbWVyZ2UoRElHSVQkJCwgXCJbQS1GYS1mXVwiKSxcbiAgICAgICAgLy9jYXNlLWluc2Vuc2l0aXZlXG4gICAgTEYkJCA9IFwiW1xcXFx4MEFdXCIsXG4gICAgICAgIFNQJCQgPSBcIltcXFxceDIwXVwiLFxuICAgICAgICBQQ1RfRU5DT0RFRCQgPSBzdWJleHAoc3ViZXhwKFwiJVtFRmVmXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlWzg5QS1GYS1mXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSksXG4gICAgICAgIC8vZXhwYW5kZWRcbiAgICBHRU5fREVMSU1TJCQgPSBcIltcXFxcOlxcXFwvXFxcXD9cXFxcI1xcXFxbXFxcXF1cXFxcQF1cIixcbiAgICAgICAgU1VCX0RFTElNUyQkID0gXCJbXFxcXCFcXFxcJFxcXFwmXFxcXCdcXFxcKFxcXFwpXFxcXCpcXFxcK1xcXFwsXFxcXDtcXFxcPV1cIixcbiAgICAgICAgUkVTRVJWRUQkJCA9IG1lcmdlKEdFTl9ERUxJTVMkJCwgU1VCX0RFTElNUyQkKSxcbiAgICAgICAgVUNTQ0hBUiQkID0gaXNJUkkgPyBcIltcXFxceEEwLVxcXFx1MjAwRFxcXFx1MjAxMC1cXFxcdTIwMjlcXFxcdTIwMkYtXFxcXHVEN0ZGXFxcXHVGOTAwLVxcXFx1RkRDRlxcXFx1RkRGMC1cXFxcdUZGRUZdXCIgOiBcIltdXCIsXG4gICAgICAgIC8vc3Vic2V0LCBleGNsdWRlcyBiaWRpIGNvbnRyb2wgY2hhcmFjdGVyc1xuICAgIElQUklWQVRFJCQgPSBpc0lSSSA/IFwiW1xcXFx1RTAwMC1cXFxcdUY4RkZdXCIgOiBcIltdXCIsXG4gICAgICAgIC8vc3Vic2V0XG4gICAgVU5SRVNFUlZFRCQkID0gbWVyZ2UoQUxQSEEkJCwgRElHSVQkJCwgXCJbXFxcXC1cXFxcLlxcXFxfXFxcXH5dXCIsIFVDU0NIQVIkJCksXG4gICAgICAgIFNDSEVNRSQgPSBzdWJleHAoQUxQSEEkJCArIG1lcmdlKEFMUEhBJCQsIERJR0lUJCQsIFwiW1xcXFwrXFxcXC1cXFxcLl1cIikgKyBcIipcIiksXG4gICAgICAgIFVTRVJJTkZPJCA9IHN1YmV4cChzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpdXCIpKSArIFwiKlwiKSxcbiAgICAgICAgREVDX09DVEVUJCA9IHN1YmV4cChzdWJleHAoXCIyNVswLTVdXCIpICsgXCJ8XCIgKyBzdWJleHAoXCIyWzAtNF1cIiArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIxXCIgKyBESUdJVCQkICsgRElHSVQkJCkgKyBcInxcIiArIHN1YmV4cChcIlsxLTldXCIgKyBESUdJVCQkKSArIFwifFwiICsgRElHSVQkJCksXG4gICAgICAgIERFQ19PQ1RFVF9SRUxBWEVEJCA9IHN1YmV4cChzdWJleHAoXCIyNVswLTVdXCIpICsgXCJ8XCIgKyBzdWJleHAoXCIyWzAtNF1cIiArIERJR0lUJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIxXCIgKyBESUdJVCQkICsgRElHSVQkJCkgKyBcInxcIiArIHN1YmV4cChcIjA/WzEtOV1cIiArIERJR0lUJCQpICsgXCJ8MD8wP1wiICsgRElHSVQkJCksXG4gICAgICAgIC8vcmVsYXhlZCBwYXJzaW5nIHJ1bGVzXG4gICAgSVBWNEFERFJFU1MkID0gc3ViZXhwKERFQ19PQ1RFVF9SRUxBWEVEJCArIFwiXFxcXC5cIiArIERFQ19PQ1RFVF9SRUxBWEVEJCArIFwiXFxcXC5cIiArIERFQ19PQ1RFVF9SRUxBWEVEJCArIFwiXFxcXC5cIiArIERFQ19PQ1RFVF9SRUxBWEVEJCksXG4gICAgICAgIEgxNiQgPSBzdWJleHAoSEVYRElHJCQgKyBcInsxLDR9XCIpLFxuICAgICAgICBMUzMyJCA9IHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIiArIEgxNiQpICsgXCJ8XCIgKyBJUFY0QUREUkVTUyQpLFxuICAgICAgICBJUFY2QUREUkVTUzEkID0gc3ViZXhwKHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezZ9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgNiggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTMiQgPSBzdWJleHAoXCJcXFxcOlxcXFw6XCIgKyBzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcIns1fVwiICsgTFMzMiQpLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICBcIjo6XCIgNSggaDE2IFwiOlwiICkgbHMzMlxuICAgIElQVjZBRERSRVNTMyQgPSBzdWJleHAoc3ViZXhwKEgxNiQpICsgXCI/XFxcXDpcXFxcOlwiICsgc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7NH1cIiArIExTMzIkKSxcbiAgICAgICAgLy9bICAgICAgICAgICAgICAgaDE2IF0gXCI6OlwiIDQoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzQkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDF9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezN9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqMSggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiIDMoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzUkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDJ9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIHN1YmV4cChIMTYkICsgXCJcXFxcOlwiKSArIFwiezJ9XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqMiggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiIDIoIGgxNiBcIjpcIiApIGxzMzJcbiAgICBJUFY2QUREUkVTUzYkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDN9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIEgxNiQgKyBcIlxcXFw6XCIgKyBMUzMyJCksXG4gICAgICAgIC8vWyAqMyggaDE2IFwiOlwiICkgaDE2IF0gXCI6OlwiICAgIGgxNiBcIjpcIiAgIGxzMzJcbiAgICBJUFY2QUREUkVTUzckID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDR9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIExTMzIkKSxcbiAgICAgICAgLy9bICo0KCBoMTYgXCI6XCIgKSBoMTYgXSBcIjo6XCIgICAgICAgICAgICAgIGxzMzJcbiAgICBJUFY2QUREUkVTUzgkID0gc3ViZXhwKHN1YmV4cChzdWJleHAoSDE2JCArIFwiXFxcXDpcIikgKyBcInswLDV9XCIgKyBIMTYkKSArIFwiP1xcXFw6XFxcXDpcIiArIEgxNiQpLFxuICAgICAgICAvL1sgKjUoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIiAgICAgICAgICAgICAgaDE2XG4gICAgSVBWNkFERFJFU1M5JCA9IHN1YmV4cChzdWJleHAoc3ViZXhwKEgxNiQgKyBcIlxcXFw6XCIpICsgXCJ7MCw2fVwiICsgSDE2JCkgKyBcIj9cXFxcOlxcXFw6XCIpLFxuICAgICAgICAvL1sgKjYoIGgxNiBcIjpcIiApIGgxNiBdIFwiOjpcIlxuICAgIElQVjZBRERSRVNTJCA9IHN1YmV4cChbSVBWNkFERFJFU1MxJCwgSVBWNkFERFJFU1MyJCwgSVBWNkFERFJFU1MzJCwgSVBWNkFERFJFU1M0JCwgSVBWNkFERFJFU1M1JCwgSVBWNkFERFJFU1M2JCwgSVBWNkFERFJFU1M3JCwgSVBWNkFERFJFU1M4JCwgSVBWNkFERFJFU1M5JF0uam9pbihcInxcIikpLFxuICAgICAgICBaT05FSUQkID0gc3ViZXhwKHN1YmV4cChVTlJFU0VSVkVEJCQgKyBcInxcIiArIFBDVF9FTkNPREVEJCkgKyBcIitcIiksXG4gICAgICAgIC8vUkZDIDY4NzRcbiAgICBJUFY2QUREUlokID0gc3ViZXhwKElQVjZBRERSRVNTJCArIFwiXFxcXCUyNVwiICsgWk9ORUlEJCksXG4gICAgICAgIC8vUkZDIDY4NzRcbiAgICBJUFY2QUREUlpfUkVMQVhFRCQgPSBzdWJleHAoSVBWNkFERFJFU1MkICsgc3ViZXhwKFwiXFxcXCUyNXxcXFxcJSg/IVwiICsgSEVYRElHJCQgKyBcInsyfSlcIikgKyBaT05FSUQkKSxcbiAgICAgICAgLy9SRkMgNjg3NCwgd2l0aCByZWxheGVkIHBhcnNpbmcgcnVsZXNcbiAgICBJUFZGVVRVUkUkID0gc3ViZXhwKFwiW3ZWXVwiICsgSEVYRElHJCQgKyBcIitcXFxcLlwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQsIFwiW1xcXFw6XVwiKSArIFwiK1wiKSxcbiAgICAgICAgSVBfTElURVJBTCQgPSBzdWJleHAoXCJcXFxcW1wiICsgc3ViZXhwKElQVjZBRERSWl9SRUxBWEVEJCArIFwifFwiICsgSVBWNkFERFJFU1MkICsgXCJ8XCIgKyBJUFZGVVRVUkUkKSArIFwiXFxcXF1cIiksXG4gICAgICAgIC8vUkZDIDY4NzRcbiAgICBSRUdfTkFNRSQgPSBzdWJleHAoc3ViZXhwKFBDVF9FTkNPREVEJCArIFwifFwiICsgbWVyZ2UoVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpKSArIFwiKlwiKSxcbiAgICAgICAgSE9TVCQgPSBzdWJleHAoSVBfTElURVJBTCQgKyBcInxcIiArIElQVjRBRERSRVNTJCArIFwiKD8hXCIgKyBSRUdfTkFNRSQgKyBcIilcIiArIFwifFwiICsgUkVHX05BTUUkKSxcbiAgICAgICAgUE9SVCQgPSBzdWJleHAoRElHSVQkJCArIFwiKlwiKSxcbiAgICAgICAgQVVUSE9SSVRZJCA9IHN1YmV4cChzdWJleHAoVVNFUklORk8kICsgXCJAXCIpICsgXCI/XCIgKyBIT1NUJCArIHN1YmV4cChcIlxcXFw6XCIgKyBQT1JUJCkgKyBcIj9cIiksXG4gICAgICAgIFBDSEFSJCA9IHN1YmV4cChQQ1RfRU5DT0RFRCQgKyBcInxcIiArIG1lcmdlKFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOlxcXFxAXVwiKSksXG4gICAgICAgIFNFR01FTlQkID0gc3ViZXhwKFBDSEFSJCArIFwiKlwiKSxcbiAgICAgICAgU0VHTUVOVF9OWiQgPSBzdWJleHAoUENIQVIkICsgXCIrXCIpLFxuICAgICAgICBTRUdNRU5UX05aX05DJCA9IHN1YmV4cChzdWJleHAoUENUX0VOQ09ERUQkICsgXCJ8XCIgKyBtZXJnZShVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXEBdXCIpKSArIFwiK1wiKSxcbiAgICAgICAgUEFUSF9BQkVNUFRZJCA9IHN1YmV4cChzdWJleHAoXCJcXFxcL1wiICsgU0VHTUVOVCQpICsgXCIqXCIpLFxuICAgICAgICBQQVRIX0FCU09MVVRFJCA9IHN1YmV4cChcIlxcXFwvXCIgKyBzdWJleHAoU0VHTUVOVF9OWiQgKyBQQVRIX0FCRU1QVFkkKSArIFwiP1wiKSxcbiAgICAgICAgLy9zaW1wbGlmaWVkXG4gICAgUEFUSF9OT1NDSEVNRSQgPSBzdWJleHAoU0VHTUVOVF9OWl9OQyQgKyBQQVRIX0FCRU1QVFkkKSxcbiAgICAgICAgLy9zaW1wbGlmaWVkXG4gICAgUEFUSF9ST09UTEVTUyQgPSBzdWJleHAoU0VHTUVOVF9OWiQgKyBQQVRIX0FCRU1QVFkkKSxcbiAgICAgICAgLy9zaW1wbGlmaWVkXG4gICAgUEFUSF9FTVBUWSQgPSBcIig/IVwiICsgUENIQVIkICsgXCIpXCIsXG4gICAgICAgIFBBVEgkID0gc3ViZXhwKFBBVEhfQUJFTVBUWSQgKyBcInxcIiArIFBBVEhfQUJTT0xVVEUkICsgXCJ8XCIgKyBQQVRIX05PU0NIRU1FJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkKSxcbiAgICAgICAgUVVFUlkkID0gc3ViZXhwKHN1YmV4cChQQ0hBUiQgKyBcInxcIiArIG1lcmdlKFwiW1xcXFwvXFxcXD9dXCIsIElQUklWQVRFJCQpKSArIFwiKlwiKSxcbiAgICAgICAgRlJBR01FTlQkID0gc3ViZXhwKHN1YmV4cChQQ0hBUiQgKyBcInxbXFxcXC9cXFxcP11cIikgKyBcIipcIiksXG4gICAgICAgIEhJRVJfUEFSVCQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcL1wiICsgQVVUSE9SSVRZJCArIFBBVEhfQUJFTVBUWSQpICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkKSxcbiAgICAgICAgVVJJJCA9IHN1YmV4cChTQ0hFTUUkICsgXCJcXFxcOlwiICsgSElFUl9QQVJUJCArIHN1YmV4cChcIlxcXFw/XCIgKyBRVUVSWSQpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcI1wiICsgRlJBR01FTlQkKSArIFwiP1wiKSxcbiAgICAgICAgUkVMQVRJVkVfUEFSVCQgPSBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcL1wiICsgQVVUSE9SSVRZJCArIFBBVEhfQUJFTVBUWSQpICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9OT1NDSEVNRSQgKyBcInxcIiArIFBBVEhfRU1QVFkkKSxcbiAgICAgICAgUkVMQVRJVkUkID0gc3ViZXhwKFJFTEFUSVZFX1BBUlQkICsgc3ViZXhwKFwiXFxcXD9cIiArIFFVRVJZJCkgKyBcIj9cIiArIHN1YmV4cChcIlxcXFwjXCIgKyBGUkFHTUVOVCQpICsgXCI/XCIpLFxuICAgICAgICBVUklfUkVGRVJFTkNFJCA9IHN1YmV4cChVUkkkICsgXCJ8XCIgKyBSRUxBVElWRSQpLFxuICAgICAgICBBQlNPTFVURV9VUkkkID0gc3ViZXhwKFNDSEVNRSQgKyBcIlxcXFw6XCIgKyBISUVSX1BBUlQkICsgc3ViZXhwKFwiXFxcXD9cIiArIFFVRVJZJCkgKyBcIj9cIiksXG4gICAgICAgIEdFTkVSSUNfUkVGJCA9IFwiXihcIiArIFNDSEVNRSQgKyBcIilcXFxcOlwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwvXFxcXC8oXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8pXCIpICsgXCI/KFwiICsgUEFUSF9BQkVNUFRZJCArIFwifFwiICsgUEFUSF9BQlNPTFVURSQgKyBcInxcIiArIFBBVEhfUk9PVExFU1MkICsgXCJ8XCIgKyBQQVRIX0VNUFRZJCArIFwiKVwiKSArIHN1YmV4cChcIlxcXFw/KFwiICsgUVVFUlkkICsgXCIpXCIpICsgXCI/XCIgKyBzdWJleHAoXCJcXFxcIyhcIiArIEZSQUdNRU5UJCArIFwiKVwiKSArIFwiPyRcIixcbiAgICAgICAgUkVMQVRJVkVfUkVGJCA9IFwiXigpezB9XCIgKyBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcLyhcIiArIHN1YmV4cChcIihcIiArIFVTRVJJTkZPJCArIFwiKUBcIikgKyBcIj8oXCIgKyBIT1NUJCArIFwiKVwiICsgc3ViZXhwKFwiXFxcXDooXCIgKyBQT1JUJCArIFwiKVwiKSArIFwiPylcIikgKyBcIj8oXCIgKyBQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9OT1NDSEVNRSQgKyBcInxcIiArIFBBVEhfRU1QVFkkICsgXCIpXCIpICsgc3ViZXhwKFwiXFxcXD8oXCIgKyBRVUVSWSQgKyBcIilcIikgKyBcIj9cIiArIHN1YmV4cChcIlxcXFwjKFwiICsgRlJBR01FTlQkICsgXCIpXCIpICsgXCI/JFwiLFxuICAgICAgICBBQlNPTFVURV9SRUYkID0gXCJeKFwiICsgU0NIRU1FJCArIFwiKVxcXFw6XCIgKyBzdWJleHAoc3ViZXhwKFwiXFxcXC9cXFxcLyhcIiArIHN1YmV4cChcIihcIiArIFVTRVJJTkZPJCArIFwiKUBcIikgKyBcIj8oXCIgKyBIT1NUJCArIFwiKVwiICsgc3ViZXhwKFwiXFxcXDooXCIgKyBQT1JUJCArIFwiKVwiKSArIFwiPylcIikgKyBcIj8oXCIgKyBQQVRIX0FCRU1QVFkkICsgXCJ8XCIgKyBQQVRIX0FCU09MVVRFJCArIFwifFwiICsgUEFUSF9ST09UTEVTUyQgKyBcInxcIiArIFBBVEhfRU1QVFkkICsgXCIpXCIpICsgc3ViZXhwKFwiXFxcXD8oXCIgKyBRVUVSWSQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIFNBTUVET0NfUkVGJCA9IFwiXlwiICsgc3ViZXhwKFwiXFxcXCMoXCIgKyBGUkFHTUVOVCQgKyBcIilcIikgKyBcIj8kXCIsXG4gICAgICAgIEFVVEhPUklUWV9SRUYkID0gXCJeXCIgKyBzdWJleHAoXCIoXCIgKyBVU0VSSU5GTyQgKyBcIilAXCIpICsgXCI/KFwiICsgSE9TVCQgKyBcIilcIiArIHN1YmV4cChcIlxcXFw6KFwiICsgUE9SVCQgKyBcIilcIikgKyBcIj8kXCI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgTk9UX1NDSEVNRTogbmV3IFJlZ0V4cChtZXJnZShcIlteXVwiLCBBTFBIQSQkLCBESUdJVCQkLCBcIltcXFxcK1xcXFwtXFxcXC5dXCIpLCBcImdcIiksXG4gICAgICAgIE5PVF9VU0VSSU5GTzogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVcXFxcOl1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9IT1NUOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFxbXFxcXF1cXFxcOl1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9QQVRIOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFwvXFxcXDpcXFxcQF1cIiwgVU5SRVNFUlZFRCQkLCBTVUJfREVMSU1TJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9QQVRIX05PU0NIRU1FOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15cXFxcJVxcXFwvXFxcXEBdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBOT1RfUVVFUlk6IG5ldyBSZWdFeHAobWVyZ2UoXCJbXlxcXFwlXVwiLCBVTlJFU0VSVkVEJCQsIFNVQl9ERUxJTVMkJCwgXCJbXFxcXDpcXFxcQFxcXFwvXFxcXD9dXCIsIElQUklWQVRFJCQpLCBcImdcIiksXG4gICAgICAgIE5PVF9GUkFHTUVOVDogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVdXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkLCBcIltcXFxcOlxcXFxAXFxcXC9cXFxcP11cIiksIFwiZ1wiKSxcbiAgICAgICAgRVNDQVBFOiBuZXcgUmVnRXhwKG1lcmdlKFwiW15dXCIsIFVOUkVTRVJWRUQkJCwgU1VCX0RFTElNUyQkKSwgXCJnXCIpLFxuICAgICAgICBVTlJFU0VSVkVEOiBuZXcgUmVnRXhwKFVOUkVTRVJWRUQkJCwgXCJnXCIpLFxuICAgICAgICBPVEhFUl9DSEFSUzogbmV3IFJlZ0V4cChtZXJnZShcIlteXFxcXCVdXCIsIFVOUkVTRVJWRUQkJCwgUkVTRVJWRUQkJCksIFwiZ1wiKSxcbiAgICAgICAgUENUX0VOQ09ERUQ6IG5ldyBSZWdFeHAoUENUX0VOQ09ERUQkLCBcImdcIiksXG4gICAgICAgIElQVjRBRERSRVNTOiBuZXcgUmVnRXhwKFwiXihcIiArIElQVjRBRERSRVNTJCArIFwiKSRcIiksXG4gICAgICAgIElQVjZBRERSRVNTOiBuZXcgUmVnRXhwKFwiXlxcXFxbPyhcIiArIElQVjZBRERSRVNTJCArIFwiKVwiICsgc3ViZXhwKHN1YmV4cChcIlxcXFwlMjV8XFxcXCUoPyFcIiArIEhFWERJRyQkICsgXCJ7Mn0pXCIpICsgXCIoXCIgKyBaT05FSUQkICsgXCIpXCIpICsgXCI/XFxcXF0/JFwiKSAvL1JGQyA2ODc0LCB3aXRoIHJlbGF4ZWQgcGFyc2luZyBydWxlc1xuICAgIH07XG59XG52YXIgVVJJX1BST1RPQ09MID0gYnVpbGRFeHBzKGZhbHNlKTtcblxudmFyIElSSV9QUk9UT0NPTCA9IGJ1aWxkRXhwcyh0cnVlKTtcblxudmFyIHNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbnZhciB0b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59O1xuXG4vKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cbnZhciBtYXhJbnQgPSAyMTQ3NDgzNjQ3OyAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cbi8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cbnZhciBiYXNlID0gMzY7XG52YXIgdE1pbiA9IDE7XG52YXIgdE1heCA9IDI2O1xudmFyIHNrZXcgPSAzODtcbnZhciBkYW1wID0gNzAwO1xudmFyIGluaXRpYWxCaWFzID0gNzI7XG52YXIgaW5pdGlhbE4gPSAxMjg7IC8vIDB4ODBcbnZhciBkZWxpbWl0ZXIgPSAnLSc7IC8vICdcXHgyRCdcblxuLyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cbnZhciByZWdleFB1bnljb2RlID0gL154bi0tLztcbnZhciByZWdleE5vbkFTQ0lJID0gL1teXFwwLVxceDdFXS87IC8vIG5vbi1BU0NJSSBjaGFyc1xudmFyIHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2c7IC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuLyoqIEVycm9yIG1lc3NhZ2VzICovXG52YXIgZXJyb3JzID0ge1xuXHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xufTtcblxuLyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xudmFyIGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbjtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKlxuICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIGVycm9yJDEodHlwZSkge1xuXHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xufVxuXG4vKipcbiAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcbiAqIGl0ZW0uXG4gKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRyZXN1bHRbbGVuZ3RoXSA9IGZuKGFycmF5W2xlbmd0aF0pO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG4gKiBhZGRyZXNzZXMuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuICogY2hhcmFjdGVyLlxuICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcbiAqIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHR2YXIgcGFydHMgPSBzdHJpbmcuc3BsaXQoJ0AnKTtcblx0dmFyIHJlc3VsdCA9ICcnO1xuXHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdC8vIEluIGVtYWlsIGFkZHJlc3Nlcywgb25seSB0aGUgZG9tYWluIG5hbWUgc2hvdWxkIGJlIHB1bnljb2RlZC4gTGVhdmVcblx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdHN0cmluZyA9IHBhcnRzWzFdO1xuXHR9XG5cdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXhTZXBhcmF0b3JzLCAnXFx4MkUnKTtcblx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdHJldHVybiByZXN1bHQgKyBlbmNvZGVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcbiAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcbiAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG4gKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcbiAqIG1hdGNoaW5nIFVURi0xNi5cbiAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG4gKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuICogQG5hbWUgZGVjb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuICovXG5mdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHR2YXIgb3V0cHV0ID0gW107XG5cdHZhciBjb3VudGVyID0gMDtcblx0dmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0dmFyIHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBJdCdzIGEgaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyLlxuXHRcdFx0dmFyIGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkge1xuXHRcdFx0XHQvLyBMb3cgc3Vycm9nYXRlLlxuXHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSXQncyBhbiB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGVcblx0XHRcdFx0Ly8gbmV4dCBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXIuXG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXRwdXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG4gKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuICogQG5hbWUgZW5jb2RlXG4gKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuICovXG52YXIgdWNzMmVuY29kZSA9IGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0cmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50LmFwcGx5KFN0cmluZywgdG9Db25zdW1hYmxlQXJyYXkoYXJyYXkpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG4gKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG4gKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cbiAqL1xudmFyIGJhc2ljVG9EaWdpdCA9IGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0aWYgKGNvZGVQb2ludCAtIDB4MzAgPCAweDBBKSB7XG5cdFx0cmV0dXJuIGNvZGVQb2ludCAtIDB4MTY7XG5cdH1cblx0aWYgKGNvZGVQb2ludCAtIDB4NDEgPCAweDFBKSB7XG5cdFx0cmV0dXJuIGNvZGVQb2ludCAtIDB4NDE7XG5cdH1cblx0aWYgKGNvZGVQb2ludCAtIDB4NjEgPCAweDFBKSB7XG5cdFx0cmV0dXJuIGNvZGVQb2ludCAtIDB4NjE7XG5cdH1cblx0cmV0dXJuIGJhc2U7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cbiAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2VcbiAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcbiAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG4gKi9cbnZhciBkaWdpdFRvQmFzaWMgPSBmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG59O1xuXG4vKipcbiAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuICogQHByaXZhdGVcbiAqL1xudmFyIGFkYXB0ID0gZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdHZhciBrID0gMDtcblx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRmb3IgKDsgLyogbm8gaW5pdGlhbGl6YXRpb24gKi9kZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0fVxuXHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcbiAqIHN5bWJvbHMuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cbiAqL1xudmFyIGRlY29kZSA9IGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHQvLyBEb24ndCB1c2UgVUNTLTIuXG5cdHZhciBvdXRwdXQgPSBbXTtcblx0dmFyIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHR2YXIgaSA9IDA7XG5cdHZhciBuID0gaW5pdGlhbE47XG5cdHZhciBiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdHZhciBiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdGlmIChiYXNpYyA8IDApIHtcblx0XHRiYXNpYyA9IDA7XG5cdH1cblxuXHRmb3IgKHZhciBqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRlcnJvciQxKCdub3QtYmFzaWMnKTtcblx0XHR9XG5cdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdH1cblxuXHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0Zm9yICh2YXIgaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOykgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqL3tcblxuXHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0dmFyIG9sZGkgPSBpO1xuXHRcdGZvciAodmFyIHcgPSAxLCBrID0gYmFzZTs7IC8qIG5vIGNvbmRpdGlvbiAqL2sgKz0gYmFzZSkge1xuXG5cdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0ZXJyb3IkMSgnaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHR2YXIgdCA9IGsgPD0gYmlhcyA/IHRNaW4gOiBrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzO1xuXG5cdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgYmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRlcnJvciQxKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cdFx0fVxuXG5cdFx0dmFyIG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0fVxuXG5cdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRpICU9IG91dDtcblxuXHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXQuXG5cdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXHR9XG5cblx0cmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50LmFwcGx5KFN0cmluZywgb3V0cHV0KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcbiAqIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cbiAqL1xudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHR2YXIgb3V0cHV0ID0gW107XG5cblx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gYW4gYXJyYXkgb2YgVW5pY29kZSBjb2RlIHBvaW50cy5cblx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHQvLyBDYWNoZSB0aGUgbGVuZ3RoLlxuXHR2YXIgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGUuXG5cdHZhciBuID0gaW5pdGlhbE47XG5cdHZhciBkZWx0YSA9IDA7XG5cdHZhciBiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50cy5cblx0dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuXHR2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcblx0dmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG5cdHRyeSB7XG5cdFx0Zm9yICh2YXIgX2l0ZXJhdG9yID0gaW5wdXRbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG5cdFx0XHR2YXIgX2N1cnJlbnRWYWx1ZTIgPSBfc3RlcC52YWx1ZTtcblxuXHRcdFx0aWYgKF9jdXJyZW50VmFsdWUyIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoX2N1cnJlbnRWYWx1ZTIpKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcblx0XHRfaXRlcmF0b3JFcnJvciA9IGVycjtcblx0fSBmaW5hbGx5IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcblx0XHRcdFx0X2l0ZXJhdG9yLnJldHVybigpO1xuXHRcdFx0fVxuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcblx0XHRcdFx0dGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dmFyIGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblx0dmFyIGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGg7XG5cblx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyB3aXRoIGEgZGVsaW1pdGVyIHVubGVzcyBpdCdzIGVtcHR5LlxuXHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHR9XG5cblx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0dmFyIG0gPSBtYXhJbnQ7XG5cdFx0dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcblx0XHR2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG5cdFx0dmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuXHRcdHRyeSB7XG5cdFx0XHRmb3IgKHZhciBfaXRlcmF0b3IyID0gaW5wdXRbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRWYWx1ZSA9IF9zdGVwMi52YWx1ZTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3cuXG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuXHRcdFx0X2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yMi5yZXR1cm4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0aWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuXHRcdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yMjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdGVycm9yJDEoJ292ZXJmbG93Jyk7XG5cdFx0fVxuXG5cdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRuID0gbTtcblxuXHRcdHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG5cdFx0dmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuXHRcdHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cblx0XHR0cnkge1xuXHRcdFx0Zm9yICh2YXIgX2l0ZXJhdG9yMyA9IGlucHV0W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG5cdFx0XHRcdHZhciBfY3VycmVudFZhbHVlID0gX3N0ZXAzLnZhbHVlO1xuXG5cdFx0XHRcdGlmIChfY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IkMSgnb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoX2N1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXG5cdFx0XHRcdFx0dmFyIHEgPSBkZWx0YTtcblx0XHRcdFx0XHRmb3IgKHZhciBrID0gYmFzZTs7IC8qIG5vIGNvbmRpdGlvbiAqL2sgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dmFyIHQgPSBrIDw9IGJpYXMgPyB0TWluIDogayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcztcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHR2YXIgYmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKSk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuXHRcdFx0X2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG5cdFx0XHRcdFx0X2l0ZXJhdG9yMy5yZXR1cm4oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0aWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuXHRcdFx0XHRcdHRocm93IF9pdGVyYXRvckVycm9yMztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCsrZGVsdGE7XG5cdFx0KytuO1xuXHR9XG5cdHJldHVybiBvdXRwdXQuam9pbignJyk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3NcbiAqIHRvIFVuaWNvZGUuIE9ubHkgdGhlIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgaW5wdXQgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS5cbiAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuICogY29udmVydGVkIHRvIFVuaWNvZGUuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cbiAqIGNvbnZlcnQgdG8gVW5pY29kZS5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVbmljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBQdW55Y29kZVxuICogc3RyaW5nLlxuICovXG52YXIgdG9Vbmljb2RlID0gZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uIChzdHJpbmcpIHtcblx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZykgPyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpIDogc3RyaW5nO1xuXHR9KTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzIHRvXG4gKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcbiAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuICogQVNDSUkuXG4gKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG4gKiBVbmljb2RlIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3JcbiAqIGVtYWlsIGFkZHJlc3MuXG4gKi9cbnZhciB0b0FTQ0lJID0gZnVuY3Rpb24gdG9BU0NJSShpbnB1dCkge1xuXHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpID8gJ3huLS0nICsgZW5jb2RlKHN0cmluZykgOiBzdHJpbmc7XG5cdH0pO1xufTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbi8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cbnZhciBwdW55Y29kZSA9IHtcblx0LyoqXG4gICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuICAqIEBtZW1iZXJPZiBwdW55Y29kZVxuICAqIEB0eXBlIFN0cmluZ1xuICAqL1xuXHQndmVyc2lvbic6ICcyLjEuMCcsXG5cdC8qKlxuICAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG4gICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cbiAgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cbiAgKiBAbWVtYmVyT2YgcHVueWNvZGVcbiAgKiBAdHlwZSBPYmplY3RcbiAgKi9cblx0J3VjczInOiB7XG5cdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0fSxcblx0J2RlY29kZSc6IGRlY29kZSxcblx0J2VuY29kZSc6IGVuY29kZSxcblx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG59O1xuXG4vKipcbiAqIFVSSS5qc1xuICpcbiAqIEBmaWxlb3ZlcnZpZXcgQW4gUkZDIDM5ODYgY29tcGxpYW50LCBzY2hlbWUgZXh0ZW5kYWJsZSBVUkkgcGFyc2luZy92YWxpZGF0aW5nL3Jlc29sdmluZyBsaWJyYXJ5IGZvciBKYXZhU2NyaXB0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmdhcnkuY291cnRAZ21haWwuY29tXCI+R2FyeSBDb3VydDwvYT5cbiAqIEBzZWUgaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L3VyaS1qc1xuICovXG4vKipcbiAqIENvcHlyaWdodCAyMDExIEdhcnkgQ291cnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbiwgYXJlXG4gKiBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqXG4gKiAgICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXMgbGlzdCBvZlxuICogICAgICAgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICpcbiAqICAgIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0XG4gKiAgICAgICBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFsc1xuICogICAgICAgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgR0FSWSBDT1VSVCBgYEFTIElTJycgQU5EIEFOWSBFWFBSRVNTIE9SIElNUExJRURcbiAqIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkRcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRSBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBHQVJZIENPVVJUIE9SXG4gKiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUlxuICogQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUlxuICogU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTlxuICogQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlQgKElOQ0xVRElOR1xuICogTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGXG4gKiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiBUaGUgdmlld3MgYW5kIGNvbmNsdXNpb25zIGNvbnRhaW5lZCBpbiB0aGUgc29mdHdhcmUgYW5kIGRvY3VtZW50YXRpb24gYXJlIHRob3NlIG9mIHRoZVxuICogYXV0aG9ycyBhbmQgc2hvdWxkIG5vdCBiZSBpbnRlcnByZXRlZCBhcyByZXByZXNlbnRpbmcgb2ZmaWNpYWwgcG9saWNpZXMsIGVpdGhlciBleHByZXNzZWRcbiAqIG9yIGltcGxpZWQsIG9mIEdhcnkgQ291cnQuXG4gKi9cbnZhciBTQ0hFTUVTID0ge307XG5mdW5jdGlvbiBwY3RFbmNDaGFyKGNocikge1xuICAgIHZhciBjID0gY2hyLmNoYXJDb2RlQXQoMCk7XG4gICAgdmFyIGUgPSB2b2lkIDA7XG4gICAgaWYgKGMgPCAxNikgZSA9IFwiJTBcIiArIGMudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7ZWxzZSBpZiAoYyA8IDEyOCkgZSA9IFwiJVwiICsgYy50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtlbHNlIGlmIChjIDwgMjA0OCkgZSA9IFwiJVwiICsgKGMgPj4gNiB8IDE5MikudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIiVcIiArIChjICYgNjMgfCAxMjgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO2Vsc2UgZSA9IFwiJVwiICsgKGMgPj4gMTIgfCAyMjQpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCIlXCIgKyAoYyA+PiA2ICYgNjMgfCAxMjgpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgXCIlXCIgKyAoYyAmIDYzIHwgMTI4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHBjdERlY0NoYXJzKHN0cikge1xuICAgIHZhciBuZXdTdHIgPSBcIlwiO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgaWwgPSBzdHIubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgaWwpIHtcbiAgICAgICAgdmFyIGMgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyAxLCAyKSwgMTYpO1xuICAgICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICAgICAgbmV3U3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgIH0gZWxzZSBpZiAoYyA+PSAxOTQgJiYgYyA8IDIyNCkge1xuICAgICAgICAgICAgaWYgKGlsIC0gaSA+PSA2KSB7XG4gICAgICAgICAgICAgICAgdmFyIGMyID0gcGFyc2VJbnQoc3RyLnN1YnN0cihpICsgNCwgMiksIDE2KTtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDMxKSA8PCA2IHwgYzIgJiA2Myk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0ciArPSBzdHIuc3Vic3RyKGksIDYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSArPSA2O1xuICAgICAgICB9IGVsc2UgaWYgKGMgPj0gMjI0KSB7XG4gICAgICAgICAgICBpZiAoaWwgLSBpID49IDkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2MgPSBwYXJzZUludChzdHIuc3Vic3RyKGkgKyA0LCAyKSwgMTYpO1xuICAgICAgICAgICAgICAgIHZhciBjMyA9IHBhcnNlSW50KHN0ci5zdWJzdHIoaSArIDcsIDIpLCAxNik7XG4gICAgICAgICAgICAgICAgbmV3U3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAxNSkgPDwgMTIgfCAoX2MgJiA2MykgPDwgNiB8IGMzICYgNjMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdHIgKz0gc3RyLnN1YnN0cihpLCA5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkgKz0gOTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1N0ciArPSBzdHIuc3Vic3RyKGksIDMpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdTdHI7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgcHJvdG9jb2wpIHtcbiAgICBmdW5jdGlvbiBkZWNvZGVVbnJlc2VydmVkKHN0cikge1xuICAgICAgICB2YXIgZGVjU3RyID0gcGN0RGVjQ2hhcnMoc3RyKTtcbiAgICAgICAgcmV0dXJuICFkZWNTdHIubWF0Y2gocHJvdG9jb2wuVU5SRVNFUlZFRCkgPyBzdHIgOiBkZWNTdHI7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLnNjaGVtZSkgY29tcG9uZW50cy5zY2hlbWUgPSBTdHJpbmcoY29tcG9uZW50cy5zY2hlbWUpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnRvTG93ZXJDYXNlKCkucmVwbGFjZShwcm90b2NvbC5OT1RfU0NIRU1FLCBcIlwiKTtcbiAgICBpZiAoY29tcG9uZW50cy51c2VyaW5mbyAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLnVzZXJpbmZvID0gU3RyaW5nKGNvbXBvbmVudHMudXNlcmluZm8pLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UocHJvdG9jb2wuTk9UX1VTRVJJTkZPLCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMuaG9zdCAhPT0gdW5kZWZpbmVkKSBjb21wb25lbnRzLmhvc3QgPSBTdHJpbmcoY29tcG9uZW50cy5ob3N0KS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UocHJvdG9jb2wuTk9UX0hPU1QsIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICBpZiAoY29tcG9uZW50cy5wYXRoICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMucGF0aCA9IFN0cmluZyhjb21wb25lbnRzLnBhdGgpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UoY29tcG9uZW50cy5zY2hlbWUgPyBwcm90b2NvbC5OT1RfUEFUSCA6IHByb3RvY29sLk5PVF9QQVRIX05PU0NIRU1FLCBwY3RFbmNDaGFyKS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSk7XG4gICAgaWYgKGNvbXBvbmVudHMucXVlcnkgIT09IHVuZGVmaW5lZCkgY29tcG9uZW50cy5xdWVyeSA9IFN0cmluZyhjb21wb25lbnRzLnF1ZXJ5KS5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKHByb3RvY29sLk5PVF9RVUVSWSwgcGN0RW5jQ2hhcikucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgdG9VcHBlckNhc2UpO1xuICAgIGlmIChjb21wb25lbnRzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIGNvbXBvbmVudHMuZnJhZ21lbnQgPSBTdHJpbmcoY29tcG9uZW50cy5mcmFnbWVudCkucmVwbGFjZShwcm90b2NvbC5QQ1RfRU5DT0RFRCwgZGVjb2RlVW5yZXNlcnZlZCkucmVwbGFjZShwcm90b2NvbC5OT1RfRlJBR01FTlQsIHBjdEVuY0NoYXIpLnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKTtcbiAgICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuZnVuY3Rpb24gX3N0cmlwTGVhZGluZ1plcm9zKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXjAqKC4qKS8sIFwiJDFcIikgfHwgXCIwXCI7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplSVB2NChob3N0LCBwcm90b2NvbCkge1xuICAgIHZhciBtYXRjaGVzID0gaG9zdC5tYXRjaChwcm90b2NvbC5JUFY0QUREUkVTUykgfHwgW107XG5cbiAgICB2YXIgX21hdGNoZXMgPSBzbGljZWRUb0FycmF5KG1hdGNoZXMsIDIpLFxuICAgICAgICBhZGRyZXNzID0gX21hdGNoZXNbMV07XG5cbiAgICBpZiAoYWRkcmVzcykge1xuICAgICAgICByZXR1cm4gYWRkcmVzcy5zcGxpdChcIi5cIikubWFwKF9zdHJpcExlYWRpbmdaZXJvcykuam9pbihcIi5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxufVxuZnVuY3Rpb24gX25vcm1hbGl6ZUlQdjYoaG9zdCwgcHJvdG9jb2wpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IGhvc3QubWF0Y2gocHJvdG9jb2wuSVBWNkFERFJFU1MpIHx8IFtdO1xuXG4gICAgdmFyIF9tYXRjaGVzMiA9IHNsaWNlZFRvQXJyYXkobWF0Y2hlcywgMyksXG4gICAgICAgIGFkZHJlc3MgPSBfbWF0Y2hlczJbMV0sXG4gICAgICAgIHpvbmUgPSBfbWF0Y2hlczJbMl07XG5cbiAgICBpZiAoYWRkcmVzcykge1xuICAgICAgICB2YXIgX2FkZHJlc3MkdG9Mb3dlckNhc2UkID0gYWRkcmVzcy50b0xvd2VyQ2FzZSgpLnNwbGl0KCc6OicpLnJldmVyc2UoKSxcbiAgICAgICAgICAgIF9hZGRyZXNzJHRvTG93ZXJDYXNlJDIgPSBzbGljZWRUb0FycmF5KF9hZGRyZXNzJHRvTG93ZXJDYXNlJCwgMiksXG4gICAgICAgICAgICBsYXN0ID0gX2FkZHJlc3MkdG9Mb3dlckNhc2UkMlswXSxcbiAgICAgICAgICAgIGZpcnN0ID0gX2FkZHJlc3MkdG9Mb3dlckNhc2UkMlsxXTtcblxuICAgICAgICB2YXIgZmlyc3RGaWVsZHMgPSBmaXJzdCA/IGZpcnN0LnNwbGl0KFwiOlwiKS5tYXAoX3N0cmlwTGVhZGluZ1plcm9zKSA6IFtdO1xuICAgICAgICB2YXIgbGFzdEZpZWxkcyA9IGxhc3Quc3BsaXQoXCI6XCIpLm1hcChfc3RyaXBMZWFkaW5nWmVyb3MpO1xuICAgICAgICB2YXIgaXNMYXN0RmllbGRJUHY0QWRkcmVzcyA9IHByb3RvY29sLklQVjRBRERSRVNTLnRlc3QobGFzdEZpZWxkc1tsYXN0RmllbGRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgdmFyIGZpZWxkQ291bnQgPSBpc0xhc3RGaWVsZElQdjRBZGRyZXNzID8gNyA6IDg7XG4gICAgICAgIHZhciBsYXN0RmllbGRzU3RhcnQgPSBsYXN0RmllbGRzLmxlbmd0aCAtIGZpZWxkQ291bnQ7XG4gICAgICAgIHZhciBmaWVsZHMgPSBBcnJheShmaWVsZENvdW50KTtcbiAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBmaWVsZENvdW50OyArK3gpIHtcbiAgICAgICAgICAgIGZpZWxkc1t4XSA9IGZpcnN0RmllbGRzW3hdIHx8IGxhc3RGaWVsZHNbbGFzdEZpZWxkc1N0YXJ0ICsgeF0gfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTGFzdEZpZWxkSVB2NEFkZHJlc3MpIHtcbiAgICAgICAgICAgIGZpZWxkc1tmaWVsZENvdW50IC0gMV0gPSBfbm9ybWFsaXplSVB2NChmaWVsZHNbZmllbGRDb3VudCAtIDFdLCBwcm90b2NvbCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFsbFplcm9GaWVsZHMgPSBmaWVsZHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKCFmaWVsZCB8fCBmaWVsZCA9PT0gXCIwXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdExvbmdlc3QgPSBhY2NbYWNjLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0TG9uZ2VzdCAmJiBsYXN0TG9uZ2VzdC5pbmRleCArIGxhc3RMb25nZXN0Lmxlbmd0aCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdExvbmdlc3QubGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjLnB1c2goeyBpbmRleDogaW5kZXgsIGxlbmd0aDogMSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIHZhciBsb25nZXN0WmVyb0ZpZWxkcyA9IGFsbFplcm9GaWVsZHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG4gICAgICAgIH0pWzBdO1xuICAgICAgICB2YXIgbmV3SG9zdCA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGxvbmdlc3RaZXJvRmllbGRzICYmIGxvbmdlc3RaZXJvRmllbGRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhciBuZXdGaXJzdCA9IGZpZWxkcy5zbGljZSgwLCBsb25nZXN0WmVyb0ZpZWxkcy5pbmRleCk7XG4gICAgICAgICAgICB2YXIgbmV3TGFzdCA9IGZpZWxkcy5zbGljZShsb25nZXN0WmVyb0ZpZWxkcy5pbmRleCArIGxvbmdlc3RaZXJvRmllbGRzLmxlbmd0aCk7XG4gICAgICAgICAgICBuZXdIb3N0ID0gbmV3Rmlyc3Quam9pbihcIjpcIikgKyBcIjo6XCIgKyBuZXdMYXN0LmpvaW4oXCI6XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SG9zdCA9IGZpZWxkcy5qb2luKFwiOlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoem9uZSkge1xuICAgICAgICAgICAgbmV3SG9zdCArPSBcIiVcIiArIHpvbmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0hvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhvc3Q7XG4gICAgfVxufVxudmFyIFVSSV9QQVJTRSA9IC9eKD86KFteOlxcLz8jXSspOik/KD86XFwvXFwvKCg/OihbXlxcLz8jQF0qKUApPyhcXFtbXlxcLz8jXFxdXStcXF18W15cXC8/IzpdKikoPzpcXDooXFxkKikpPykpPyhbXj8jXSopKD86XFw/KFteI10qKSk/KD86IygoPzoufFxcbnxcXHIpKikpPy9pO1xudmFyIE5PX01BVENIX0lTX1VOREVGSU5FRCA9IFwiXCIubWF0Y2goLygpezB9LylbMV0gPT09IHVuZGVmaW5lZDtcbmZ1bmN0aW9uIHBhcnNlKHVyaVN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHZhciBjb21wb25lbnRzID0ge307XG4gICAgdmFyIHByb3RvY29sID0gb3B0aW9ucy5pcmkgIT09IGZhbHNlID8gSVJJX1BST1RPQ09MIDogVVJJX1BST1RPQ09MO1xuICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSA9PT0gXCJzdWZmaXhcIikgdXJpU3RyaW5nID0gKG9wdGlvbnMuc2NoZW1lID8gb3B0aW9ucy5zY2hlbWUgKyBcIjpcIiA6IFwiXCIpICsgXCIvL1wiICsgdXJpU3RyaW5nO1xuICAgIHZhciBtYXRjaGVzID0gdXJpU3RyaW5nLm1hdGNoKFVSSV9QQVJTRSk7XG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgaWYgKE5PX01BVENIX0lTX1VOREVGSU5FRCkge1xuICAgICAgICAgICAgLy9zdG9yZSBlYWNoIGNvbXBvbmVudFxuICAgICAgICAgICAgY29tcG9uZW50cy5zY2hlbWUgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29tcG9uZW50cy51c2VyaW5mbyA9IG1hdGNoZXNbM107XG4gICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSBtYXRjaGVzWzRdO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gcGFyc2VJbnQobWF0Y2hlc1s1XSwgMTApO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gbWF0Y2hlc1s2XSB8fCBcIlwiO1xuICAgICAgICAgICAgY29tcG9uZW50cy5xdWVyeSA9IG1hdGNoZXNbN107XG4gICAgICAgICAgICBjb21wb25lbnRzLmZyYWdtZW50ID0gbWF0Y2hlc1s4XTtcbiAgICAgICAgICAgIC8vZml4IHBvcnQgbnVtYmVyXG4gICAgICAgICAgICBpZiAoaXNOYU4oY29tcG9uZW50cy5wb3J0KSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IG1hdGNoZXNbNV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL0lFIEZJWCBmb3IgaW1wcm9wZXIgUmVnRXhwIG1hdGNoaW5nXG4gICAgICAgICAgICAvL3N0b3JlIGVhY2ggY29tcG9uZW50XG4gICAgICAgICAgICBjb21wb25lbnRzLnNjaGVtZSA9IG1hdGNoZXNbMV0gfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy51c2VyaW5mbyA9IHVyaVN0cmluZy5pbmRleE9mKFwiQFwiKSAhPT0gLTEgPyBtYXRjaGVzWzNdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy5ob3N0ID0gdXJpU3RyaW5nLmluZGV4T2YoXCIvL1wiKSAhPT0gLTEgPyBtYXRjaGVzWzRdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gcGFyc2VJbnQobWF0Y2hlc1s1XSwgMTApO1xuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gbWF0Y2hlc1s2XSB8fCBcIlwiO1xuICAgICAgICAgICAgY29tcG9uZW50cy5xdWVyeSA9IHVyaVN0cmluZy5pbmRleE9mKFwiP1wiKSAhPT0gLTEgPyBtYXRjaGVzWzddIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29tcG9uZW50cy5mcmFnbWVudCA9IHVyaVN0cmluZy5pbmRleE9mKFwiI1wiKSAhPT0gLTEgPyBtYXRjaGVzWzhdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgLy9maXggcG9ydCBudW1iZXJcbiAgICAgICAgICAgIGlmIChpc05hTihjb21wb25lbnRzLnBvcnQpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gdXJpU3RyaW5nLm1hdGNoKC9cXC9cXC8oPzoufFxcbikqXFw6KD86XFwvfFxcP3xcXCN8JCkvKSA/IG1hdGNoZXNbNF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvbmVudHMuaG9zdCkge1xuICAgICAgICAgICAgLy9ub3JtYWxpemUgSVAgaG9zdHNcbiAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IF9ub3JtYWxpemVJUHY2KF9ub3JtYWxpemVJUHY0KGNvbXBvbmVudHMuaG9zdCwgcHJvdG9jb2wpLCBwcm90b2NvbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9kZXRlcm1pbmUgcmVmZXJlbmNlIHR5cGVcbiAgICAgICAgaWYgKGNvbXBvbmVudHMuc2NoZW1lID09PSB1bmRlZmluZWQgJiYgY29tcG9uZW50cy51c2VyaW5mbyA9PT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudHMuaG9zdCA9PT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudHMucG9ydCA9PT0gdW5kZWZpbmVkICYmICFjb21wb25lbnRzLnBhdGggJiYgY29tcG9uZW50cy5xdWVyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwic2FtZS1kb2N1bWVudFwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudHMuc2NoZW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucmVmZXJlbmNlID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudHMuZnJhZ21lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5yZWZlcmVuY2UgPSBcImFic29sdXRlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnJlZmVyZW5jZSA9IFwidXJpXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9jaGVjayBmb3IgcmVmZXJlbmNlIGVycm9yc1xuICAgICAgICBpZiAob3B0aW9ucy5yZWZlcmVuY2UgJiYgb3B0aW9ucy5yZWZlcmVuY2UgIT09IFwic3VmZml4XCIgJiYgb3B0aW9ucy5yZWZlcmVuY2UgIT09IGNvbXBvbmVudHMucmVmZXJlbmNlKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIlVSSSBpcyBub3QgYSBcIiArIG9wdGlvbnMucmVmZXJlbmNlICsgXCIgcmVmZXJlbmNlLlwiO1xuICAgICAgICB9XG4gICAgICAgIC8vZmluZCBzY2hlbWUgaGFuZGxlclxuICAgICAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbKG9wdGlvbnMuc2NoZW1lIHx8IGNvbXBvbmVudHMuc2NoZW1lIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAvL2NoZWNrIGlmIHNjaGVtZSBjYW4ndCBoYW5kbGUgSVJJc1xuICAgICAgICBpZiAoIW9wdGlvbnMudW5pY29kZVN1cHBvcnQgJiYgKCFzY2hlbWVIYW5kbGVyIHx8ICFzY2hlbWVIYW5kbGVyLnVuaWNvZGVTdXBwb3J0KSkge1xuICAgICAgICAgICAgLy9pZiBob3N0IGNvbXBvbmVudCBpcyBhIGRvbWFpbiBuYW1lXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cy5ob3N0ICYmIChvcHRpb25zLmRvbWFpbkhvc3QgfHwgc2NoZW1lSGFuZGxlciAmJiBzY2hlbWVIYW5kbGVyLmRvbWFpbkhvc3QpKSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IFVuaWNvZGUgSUROIC0+IEFTQ0lJIElETlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuaG9zdCA9IHB1bnljb2RlLnRvQVNDSUkoY29tcG9uZW50cy5ob3N0LnJlcGxhY2UocHJvdG9jb2wuUENUX0VOQ09ERUQsIHBjdERlY0NoYXJzKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiSG9zdCdzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIEFTQ0lJIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29udmVydCBJUkkgLT4gVVJJXG4gICAgICAgICAgICBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgVVJJX1BST1RPQ09MKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vbm9ybWFsaXplIGVuY29kaW5nc1xuICAgICAgICAgICAgX25vcm1hbGl6ZUNvbXBvbmVudEVuY29kaW5nKGNvbXBvbmVudHMsIHByb3RvY29sKTtcbiAgICAgICAgfVxuICAgICAgICAvL3BlcmZvcm0gc2NoZW1lIHNwZWNpZmljIHBhcnNpbmdcbiAgICAgICAgaWYgKHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5wYXJzZSkge1xuICAgICAgICAgICAgc2NoZW1lSGFuZGxlci5wYXJzZShjb21wb25lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiVVJJIGNhbiBub3QgYmUgcGFyc2VkLlwiO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuZnVuY3Rpb24gX3JlY29tcG9zZUF1dGhvcml0eShjb21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgdmFyIHByb3RvY29sID0gb3B0aW9ucy5pcmkgIT09IGZhbHNlID8gSVJJX1BST1RPQ09MIDogVVJJX1BST1RPQ09MO1xuICAgIHZhciB1cmlUb2tlbnMgPSBbXTtcbiAgICBpZiAoY29tcG9uZW50cy51c2VyaW5mbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGNvbXBvbmVudHMudXNlcmluZm8pO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIkBcIik7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLmhvc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvL25vcm1hbGl6ZSBJUCBob3N0cywgYWRkIGJyYWNrZXRzIGFuZCBlc2NhcGUgem9uZSBzZXBhcmF0b3IgZm9yIElQdjZcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goX25vcm1hbGl6ZUlQdjYoX25vcm1hbGl6ZUlQdjQoU3RyaW5nKGNvbXBvbmVudHMuaG9zdCksIHByb3RvY29sKSwgcHJvdG9jb2wpLnJlcGxhY2UocHJvdG9jb2wuSVBWNkFERFJFU1MsIGZ1bmN0aW9uIChfLCAkMSwgJDIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIltcIiArICQxICsgKCQyID8gXCIlMjVcIiArICQyIDogXCJcIikgKyBcIl1cIjtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMucG9ydCA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgY29tcG9uZW50cy5wb3J0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiOlwiKTtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goU3RyaW5nKGNvbXBvbmVudHMucG9ydCkpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpVG9rZW5zLmxlbmd0aCA/IHVyaVRva2Vucy5qb2luKFwiXCIpIDogdW5kZWZpbmVkO1xufVxuXG52YXIgUkRTMSA9IC9eXFwuXFwuP1xcLy87XG52YXIgUkRTMiA9IC9eXFwvXFwuKFxcL3wkKS87XG52YXIgUkRTMyA9IC9eXFwvXFwuXFwuKFxcL3wkKS87XG52YXIgUkRTNSA9IC9eXFwvPyg/Oi58XFxuKSo/KD89XFwvfCQpLztcbmZ1bmN0aW9uIHJlbW92ZURvdFNlZ21lbnRzKGlucHV0KSB7XG4gICAgdmFyIG91dHB1dCA9IFtdO1xuICAgIHdoaWxlIChpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKFJEUzEpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoUkRTMSwgXCJcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQubWF0Y2goUkRTMikpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShSRFMyLCBcIi9cIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQubWF0Y2goUkRTMykpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZShSRFMzLCBcIi9cIik7XG4gICAgICAgICAgICBvdXRwdXQucG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQgPT09IFwiLlwiIHx8IGlucHV0ID09PSBcIi4uXCIpIHtcbiAgICAgICAgICAgIGlucHV0ID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbSA9IGlucHV0Lm1hdGNoKFJEUzUpO1xuICAgICAgICAgICAgaWYgKGltKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBpbVswXTtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGlucHV0LnNsaWNlKHMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaChzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBkb3Qgc2VnbWVudCBjb25kaXRpb25cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5qb2luKFwiXCIpO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemUoY29tcG9uZW50cykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIHZhciBwcm90b2NvbCA9IG9wdGlvbnMuaXJpID8gSVJJX1BST1RPQ09MIDogVVJJX1BST1RPQ09MO1xuICAgIHZhciB1cmlUb2tlbnMgPSBbXTtcbiAgICAvL2ZpbmQgc2NoZW1lIGhhbmRsZXJcbiAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbKG9wdGlvbnMuc2NoZW1lIHx8IGNvbXBvbmVudHMuc2NoZW1lIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCldO1xuICAgIC8vcGVyZm9ybSBzY2hlbWUgc3BlY2lmaWMgc2VyaWFsaXphdGlvblxuICAgIGlmIChzY2hlbWVIYW5kbGVyICYmIHNjaGVtZUhhbmRsZXIuc2VyaWFsaXplKSBzY2hlbWVIYW5kbGVyLnNlcmlhbGl6ZShjb21wb25lbnRzLCBvcHRpb25zKTtcbiAgICBpZiAoY29tcG9uZW50cy5ob3N0KSB7XG4gICAgICAgIC8vaWYgaG9zdCBjb21wb25lbnQgaXMgYW4gSVB2NiBhZGRyZXNzXG4gICAgICAgIGlmIChwcm90b2NvbC5JUFY2QUREUkVTUy50ZXN0KGNvbXBvbmVudHMuaG9zdCkpIHt9XG4gICAgICAgIC8vVE9ETzogbm9ybWFsaXplIElQdjYgYWRkcmVzcyBhcyBwZXIgUkZDIDU5NTJcblxuICAgICAgICAvL2lmIGhvc3QgY29tcG9uZW50IGlzIGEgZG9tYWluIG5hbWVcbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kb21haW5Ib3N0IHx8IHNjaGVtZUhhbmRsZXIgJiYgc2NoZW1lSGFuZGxlci5kb21haW5Ib3N0KSB7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IElETiB2aWEgcHVueWNvZGVcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzLmhvc3QgPSAhb3B0aW9ucy5pcmkgPyBwdW55Y29kZS50b0FTQ0lJKGNvbXBvbmVudHMuaG9zdC5yZXBsYWNlKHByb3RvY29sLlBDVF9FTkNPREVELCBwY3REZWNDaGFycykudG9Mb3dlckNhc2UoKSkgOiBwdW55Y29kZS50b1VuaWNvZGUoY29tcG9uZW50cy5ob3N0KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiSG9zdCdzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIFwiICsgKCFvcHRpb25zLmlyaSA/IFwiQVNDSUlcIiA6IFwiVW5pY29kZVwiKSArIFwiIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG4gICAgLy9ub3JtYWxpemUgZW5jb2RpbmdcbiAgICBfbm9ybWFsaXplQ29tcG9uZW50RW5jb2RpbmcoY29tcG9uZW50cywgcHJvdG9jb2wpO1xuICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSAhPT0gXCJzdWZmaXhcIiAmJiBjb21wb25lbnRzLnNjaGVtZSkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLnNjaGVtZSk7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKFwiOlwiKTtcbiAgICB9XG4gICAgdmFyIGF1dGhvcml0eSA9IF9yZWNvbXBvc2VBdXRob3JpdHkoY29tcG9uZW50cywgb3B0aW9ucyk7XG4gICAgaWYgKGF1dGhvcml0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSAhPT0gXCJzdWZmaXhcIikge1xuICAgICAgICAgICAgdXJpVG9rZW5zLnB1c2goXCIvL1wiKTtcbiAgICAgICAgfVxuICAgICAgICB1cmlUb2tlbnMucHVzaChhdXRob3JpdHkpO1xuICAgICAgICBpZiAoY29tcG9uZW50cy5wYXRoICYmIGNvbXBvbmVudHMucGF0aC5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICAgICAgICB1cmlUb2tlbnMucHVzaChcIi9cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMucGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBzID0gY29tcG9uZW50cy5wYXRoO1xuICAgICAgICBpZiAoIW9wdGlvbnMuYWJzb2x1dGVQYXRoICYmICghc2NoZW1lSGFuZGxlciB8fCAhc2NoZW1lSGFuZGxlci5hYnNvbHV0ZVBhdGgpKSB7XG4gICAgICAgICAgICBzID0gcmVtb3ZlRG90U2VnbWVudHMocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF1dGhvcml0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzID0gcy5yZXBsYWNlKC9eXFwvXFwvLywgXCIvJTJGXCIpOyAvL2Rvbid0IGFsbG93IHRoZSBwYXRoIHRvIHN0YXJ0IHdpdGggXCIvL1wiXG4gICAgICAgIH1cbiAgICAgICAgdXJpVG9rZW5zLnB1c2gocyk7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnRzLnF1ZXJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXJpVG9rZW5zLnB1c2goXCI/XCIpO1xuICAgICAgICB1cmlUb2tlbnMucHVzaChjb21wb25lbnRzLnF1ZXJ5KTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudHMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cmlUb2tlbnMucHVzaChcIiNcIik7XG4gICAgICAgIHVyaVRva2Vucy5wdXNoKGNvbXBvbmVudHMuZnJhZ21lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gdXJpVG9rZW5zLmpvaW4oXCJcIik7IC8vbWVyZ2UgdG9rZW5zIGludG8gYSBzdHJpbmdcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUNvbXBvbmVudHMoYmFzZSwgcmVsYXRpdmUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgdmFyIHNraXBOb3JtYWxpemF0aW9uID0gYXJndW1lbnRzWzNdO1xuXG4gICAgdmFyIHRhcmdldCA9IHt9O1xuICAgIGlmICghc2tpcE5vcm1hbGl6YXRpb24pIHtcbiAgICAgICAgYmFzZSA9IHBhcnNlKHNlcmlhbGl6ZShiYXNlLCBvcHRpb25zKSwgb3B0aW9ucyk7IC8vbm9ybWFsaXplIGJhc2UgY29tcG9uZW50c1xuICAgICAgICByZWxhdGl2ZSA9IHBhcnNlKHNlcmlhbGl6ZShyZWxhdGl2ZSwgb3B0aW9ucyksIG9wdGlvbnMpOyAvL25vcm1hbGl6ZSByZWxhdGl2ZSBjb21wb25lbnRzXG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICghb3B0aW9ucy50b2xlcmFudCAmJiByZWxhdGl2ZS5zY2hlbWUpIHtcbiAgICAgICAgdGFyZ2V0LnNjaGVtZSA9IHJlbGF0aXZlLnNjaGVtZTtcbiAgICAgICAgLy90YXJnZXQuYXV0aG9yaXR5ID0gcmVsYXRpdmUuYXV0aG9yaXR5O1xuICAgICAgICB0YXJnZXQudXNlcmluZm8gPSByZWxhdGl2ZS51c2VyaW5mbztcbiAgICAgICAgdGFyZ2V0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICB0YXJnZXQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVsYXRpdmUucGF0aCB8fCBcIlwiKTtcbiAgICAgICAgdGFyZ2V0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlbGF0aXZlLnVzZXJpbmZvICE9PSB1bmRlZmluZWQgfHwgcmVsYXRpdmUuaG9zdCAhPT0gdW5kZWZpbmVkIHx8IHJlbGF0aXZlLnBvcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy90YXJnZXQuYXV0aG9yaXR5ID0gcmVsYXRpdmUuYXV0aG9yaXR5O1xuICAgICAgICAgICAgdGFyZ2V0LnVzZXJpbmZvID0gcmVsYXRpdmUudXNlcmluZm87XG4gICAgICAgICAgICB0YXJnZXQuaG9zdCA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgICAgICB0YXJnZXQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgICAgICAgICB0YXJnZXQucGF0aCA9IHJlbW92ZURvdFNlZ21lbnRzKHJlbGF0aXZlLnBhdGggfHwgXCJcIik7XG4gICAgICAgICAgICB0YXJnZXQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghcmVsYXRpdmUucGF0aCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gYmFzZS5wYXRoO1xuICAgICAgICAgICAgICAgIGlmIChyZWxhdGl2ZS5xdWVyeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUucGF0aC5jaGFyQXQoMCkgPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVtb3ZlRG90U2VnbWVudHMocmVsYXRpdmUucGF0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChiYXNlLnVzZXJpbmZvICE9PSB1bmRlZmluZWQgfHwgYmFzZS5ob3N0ICE9PSB1bmRlZmluZWQgfHwgYmFzZS5wb3J0ICE9PSB1bmRlZmluZWQpICYmICFiYXNlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gXCIvXCIgKyByZWxhdGl2ZS5wYXRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFiYXNlLnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gcmVsYXRpdmUucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5wYXRoID0gYmFzZS5wYXRoLnNsaWNlKDAsIGJhc2UucGF0aC5sYXN0SW5kZXhPZihcIi9cIikgKyAxKSArIHJlbGF0aXZlLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnBhdGggPSByZW1vdmVEb3RTZWdtZW50cyh0YXJnZXQucGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhcmdldC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90YXJnZXQuYXV0aG9yaXR5ID0gYmFzZS5hdXRob3JpdHk7XG4gICAgICAgICAgICB0YXJnZXQudXNlcmluZm8gPSBiYXNlLnVzZXJpbmZvO1xuICAgICAgICAgICAgdGFyZ2V0Lmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB0YXJnZXQucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuc2NoZW1lID0gYmFzZS5zY2hlbWU7XG4gICAgfVxuICAgIHRhcmdldC5mcmFnbWVudCA9IHJlbGF0aXZlLmZyYWdtZW50O1xuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmUoYmFzZVVSSSwgcmVsYXRpdmVVUkksIG9wdGlvbnMpIHtcbiAgICB2YXIgc2NoZW1lbGVzc09wdGlvbnMgPSBhc3NpZ24oeyBzY2hlbWU6ICdudWxsJyB9LCBvcHRpb25zKTtcbiAgICByZXR1cm4gc2VyaWFsaXplKHJlc29sdmVDb21wb25lbnRzKHBhcnNlKGJhc2VVUkksIHNjaGVtZWxlc3NPcHRpb25zKSwgcGFyc2UocmVsYXRpdmVVUkksIHNjaGVtZWxlc3NPcHRpb25zKSwgc2NoZW1lbGVzc09wdGlvbnMsIHRydWUpLCBzY2hlbWVsZXNzT3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh1cmksIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB1cmkgPSBzZXJpYWxpemUocGFyc2UodXJpLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlT2YodXJpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB1cmkgPSBwYXJzZShzZXJpYWxpemUodXJpLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB1cmk7XG59XG5cbmZ1bmN0aW9uIGVxdWFsKHVyaUEsIHVyaUIsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHVyaUEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdXJpQSA9IHNlcmlhbGl6ZShwYXJzZSh1cmlBLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlT2YodXJpQSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdXJpQSA9IHNlcmlhbGl6ZSh1cmlBLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1cmlCID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHVyaUIgPSBzZXJpYWxpemUocGFyc2UodXJpQiwgb3B0aW9ucyksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZU9mKHVyaUIpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHVyaUIgPSBzZXJpYWxpemUodXJpQiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB1cmlBID09PSB1cmlCO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVDb21wb25lbnQoc3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHN0ciAmJiBzdHIudG9TdHJpbmcoKS5yZXBsYWNlKCFvcHRpb25zIHx8ICFvcHRpb25zLmlyaSA/IFVSSV9QUk9UT0NPTC5FU0NBUEUgOiBJUklfUFJPVE9DT0wuRVNDQVBFLCBwY3RFbmNDaGFyKTtcbn1cblxuZnVuY3Rpb24gdW5lc2NhcGVDb21wb25lbnQoc3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHN0ciAmJiBzdHIudG9TdHJpbmcoKS5yZXBsYWNlKCFvcHRpb25zIHx8ICFvcHRpb25zLmlyaSA/IFVSSV9QUk9UT0NPTC5QQ1RfRU5DT0RFRCA6IElSSV9QUk9UT0NPTC5QQ1RfRU5DT0RFRCwgcGN0RGVjQ2hhcnMpO1xufVxuXG52YXIgaGFuZGxlciA9IHtcbiAgICBzY2hlbWU6IFwiaHR0cFwiLFxuICAgIGRvbWFpbkhvc3Q6IHRydWUsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgLy9yZXBvcnQgbWlzc2luZyBob3N0XG4gICAgICAgIGlmICghY29tcG9uZW50cy5ob3N0KSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLmVycm9yID0gY29tcG9uZW50cy5lcnJvciB8fCBcIkhUVFAgVVJJcyBtdXN0IGhhdmUgYSBob3N0LlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH0sXG4gICAgc2VyaWFsaXplOiBmdW5jdGlvbiBzZXJpYWxpemUoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgc2VjdXJlID0gU3RyaW5nKGNvbXBvbmVudHMuc2NoZW1lKS50b0xvd2VyQ2FzZSgpID09PSBcImh0dHBzXCI7XG4gICAgICAgIC8vbm9ybWFsaXplIHRoZSBkZWZhdWx0IHBvcnRcbiAgICAgICAgaWYgKGNvbXBvbmVudHMucG9ydCA9PT0gKHNlY3VyZSA/IDQ0MyA6IDgwKSB8fCBjb21wb25lbnRzLnBvcnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvL25vcm1hbGl6ZSB0aGUgZW1wdHkgcGF0aFxuICAgICAgICBpZiAoIWNvbXBvbmVudHMucGF0aCkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gXCIvXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9OT1RFOiBXZSBkbyBub3QgcGFyc2UgcXVlcnkgc3RyaW5ncyBmb3IgSFRUUCBVUklzXG4gICAgICAgIC8vYXMgV1dXIEZvcm0gVXJsIEVuY29kZWQgcXVlcnkgc3RyaW5ncyBhcmUgcGFydCBvZiB0aGUgSFRNTDQrIHNwZWMsXG4gICAgICAgIC8vYW5kIG5vdCB0aGUgSFRUUCBzcGVjLlxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgaGFuZGxlciQxID0ge1xuICAgIHNjaGVtZTogXCJodHRwc1wiLFxuICAgIGRvbWFpbkhvc3Q6IGhhbmRsZXIuZG9tYWluSG9zdCxcbiAgICBwYXJzZTogaGFuZGxlci5wYXJzZSxcbiAgICBzZXJpYWxpemU6IGhhbmRsZXIuc2VyaWFsaXplXG59O1xuXG5mdW5jdGlvbiBpc1NlY3VyZSh3c0NvbXBvbmVudHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdzQ29tcG9uZW50cy5zZWN1cmUgPT09ICdib29sZWFuJyA/IHdzQ29tcG9uZW50cy5zZWN1cmUgOiBTdHJpbmcod3NDb21wb25lbnRzLnNjaGVtZSkudG9Mb3dlckNhc2UoKSA9PT0gXCJ3c3NcIjtcbn1cbi8vUkZDIDY0NTVcbnZhciBoYW5kbGVyJDIgPSB7XG4gICAgc2NoZW1lOiBcIndzXCIsXG4gICAgZG9tYWluSG9zdDogdHJ1ZSxcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgd3NDb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgLy9pbmRpY2F0ZSBpZiB0aGUgc2VjdXJlIGZsYWcgaXMgc2V0XG4gICAgICAgIHdzQ29tcG9uZW50cy5zZWN1cmUgPSBpc1NlY3VyZSh3c0NvbXBvbmVudHMpO1xuICAgICAgICAvL2NvbnN0cnVjdCByZXNvdWNlIG5hbWVcbiAgICAgICAgd3NDb21wb25lbnRzLnJlc291cmNlTmFtZSA9ICh3c0NvbXBvbmVudHMucGF0aCB8fCAnLycpICsgKHdzQ29tcG9uZW50cy5xdWVyeSA/ICc/JyArIHdzQ29tcG9uZW50cy5xdWVyeSA6ICcnKTtcbiAgICAgICAgd3NDb21wb25lbnRzLnBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIHdzQ29tcG9uZW50cy5xdWVyeSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHdzQ29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKHdzQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICAvL25vcm1hbGl6ZSB0aGUgZGVmYXVsdCBwb3J0XG4gICAgICAgIGlmICh3c0NvbXBvbmVudHMucG9ydCA9PT0gKGlzU2VjdXJlKHdzQ29tcG9uZW50cykgPyA0NDMgOiA4MCkgfHwgd3NDb21wb25lbnRzLnBvcnQgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5wb3J0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vZW5zdXJlIHNjaGVtZSBtYXRjaGVzIHNlY3VyZSBmbGFnXG4gICAgICAgIGlmICh0eXBlb2Ygd3NDb21wb25lbnRzLnNlY3VyZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMuc2NoZW1lID0gd3NDb21wb25lbnRzLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5zZWN1cmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9yZWNvbnN0cnVjdCBwYXRoIGZyb20gcmVzb3VyY2UgbmFtZVxuICAgICAgICBpZiAod3NDb21wb25lbnRzLnJlc291cmNlTmFtZSkge1xuICAgICAgICAgICAgdmFyIF93c0NvbXBvbmVudHMkcmVzb3VyYyA9IHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUuc3BsaXQoJz8nKSxcbiAgICAgICAgICAgICAgICBfd3NDb21wb25lbnRzJHJlc291cmMyID0gc2xpY2VkVG9BcnJheShfd3NDb21wb25lbnRzJHJlc291cmMsIDIpLFxuICAgICAgICAgICAgICAgIHBhdGggPSBfd3NDb21wb25lbnRzJHJlc291cmMyWzBdLFxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gX3dzQ29tcG9uZW50cyRyZXNvdXJjMlsxXTtcblxuICAgICAgICAgICAgd3NDb21wb25lbnRzLnBhdGggPSBwYXRoICYmIHBhdGggIT09ICcvJyA/IHBhdGggOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB3c0NvbXBvbmVudHMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgICAgIHdzQ29tcG9uZW50cy5yZXNvdXJjZU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy9mb3JiaWQgZnJhZ21lbnQgY29tcG9uZW50XG4gICAgICAgIHdzQ29tcG9uZW50cy5mcmFnbWVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHdzQ29tcG9uZW50cztcbiAgICB9XG59O1xuXG52YXIgaGFuZGxlciQzID0ge1xuICAgIHNjaGVtZTogXCJ3c3NcIixcbiAgICBkb21haW5Ib3N0OiBoYW5kbGVyJDIuZG9tYWluSG9zdCxcbiAgICBwYXJzZTogaGFuZGxlciQyLnBhcnNlLFxuICAgIHNlcmlhbGl6ZTogaGFuZGxlciQyLnNlcmlhbGl6ZVxufTtcblxudmFyIE8gPSB7fTtcbnZhciBpc0lSSSA9IHRydWU7XG4vL1JGQyAzOTg2XG52YXIgVU5SRVNFUlZFRCQkID0gXCJbQS1aYS16MC05XFxcXC1cXFxcLlxcXFxfXFxcXH5cIiArIChpc0lSSSA/IFwiXFxcXHhBMC1cXFxcdTIwMERcXFxcdTIwMTAtXFxcXHUyMDI5XFxcXHUyMDJGLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkVGXCIgOiBcIlwiKSArIFwiXVwiO1xudmFyIEhFWERJRyQkID0gXCJbMC05QS1GYS1mXVwiOyAvL2Nhc2UtaW5zZW5zaXRpdmVcbnZhciBQQ1RfRU5DT0RFRCQgPSBzdWJleHAoc3ViZXhwKFwiJVtFRmVmXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlWzg5QS1GYS1mXVwiICsgSEVYRElHJCQgKyBcIiVcIiArIEhFWERJRyQkICsgSEVYRElHJCQpICsgXCJ8XCIgKyBzdWJleHAoXCIlXCIgKyBIRVhESUckJCArIEhFWERJRyQkKSk7IC8vZXhwYW5kZWRcbi8vUkZDIDUzMjIsIGV4Y2VwdCB0aGVzZSBzeW1ib2xzIGFzIHBlciBSRkMgNjA2ODogQCA6IC8gPyAjIFsgXSAmIDsgPVxuLy9jb25zdCBBVEVYVCQkID0gXCJbQS1aYS16MC05XFxcXCFcXFxcI1xcXFwkXFxcXCVcXFxcJlxcXFwnXFxcXCpcXFxcK1xcXFwtXFxcXC9cXFxcPVxcXFw/XFxcXF5cXFxcX1xcXFxgXFxcXHtcXFxcfFxcXFx9XFxcXH5dXCI7XG4vL2NvbnN0IFdTUCQkID0gXCJbXFxcXHgyMFxcXFx4MDldXCI7XG4vL2NvbnN0IE9CU19RVEVYVCQkID0gXCJbXFxcXHgwMS1cXFxceDA4XFxcXHgwQlxcXFx4MENcXFxceDBFLVxcXFx4MUZcXFxceDdGXVwiOyAgLy8oJWQxLTggLyAlZDExLTEyIC8gJWQxNC0zMSAvICVkMTI3KVxuLy9jb25zdCBRVEVYVCQkID0gbWVyZ2UoXCJbXFxcXHgyMVxcXFx4MjMtXFxcXHg1QlxcXFx4NUQtXFxcXHg3RV1cIiwgT0JTX1FURVhUJCQpOyAgLy8lZDMzIC8gJWQzNS05MSAvICVkOTMtMTI2IC8gb2JzLXF0ZXh0XG4vL2NvbnN0IFZDSEFSJCQgPSBcIltcXFxceDIxLVxcXFx4N0VdXCI7XG4vL2NvbnN0IFdTUCQkID0gXCJbXFxcXHgyMFxcXFx4MDldXCI7XG4vL2NvbnN0IE9CU19RUCQgPSBzdWJleHAoXCJcXFxcXFxcXFwiICsgbWVyZ2UoXCJbXFxcXHgwMFxcXFx4MERcXFxceDBBXVwiLCBPQlNfUVRFWFQkJCkpOyAgLy8lZDAgLyBDUiAvIExGIC8gb2JzLXF0ZXh0XG4vL2NvbnN0IEZXUyQgPSBzdWJleHAoc3ViZXhwKFdTUCQkICsgXCIqXCIgKyBcIlxcXFx4MERcXFxceDBBXCIpICsgXCI/XCIgKyBXU1AkJCArIFwiK1wiKTtcbi8vY29uc3QgUVVPVEVEX1BBSVIkID0gc3ViZXhwKHN1YmV4cChcIlxcXFxcXFxcXCIgKyBzdWJleHAoVkNIQVIkJCArIFwifFwiICsgV1NQJCQpKSArIFwifFwiICsgT0JTX1FQJCk7XG4vL2NvbnN0IFFVT1RFRF9TVFJJTkckID0gc3ViZXhwKCdcXFxcXCInICsgc3ViZXhwKEZXUyQgKyBcIj9cIiArIFFDT05URU5UJCkgKyBcIipcIiArIEZXUyQgKyBcIj9cIiArICdcXFxcXCInKTtcbnZhciBBVEVYVCQkID0gXCJbQS1aYS16MC05XFxcXCFcXFxcJFxcXFwlXFxcXCdcXFxcKlxcXFwrXFxcXC1cXFxcXlxcXFxfXFxcXGBcXFxce1xcXFx8XFxcXH1cXFxcfl1cIjtcbnZhciBRVEVYVCQkID0gXCJbXFxcXCFcXFxcJFxcXFwlXFxcXCdcXFxcKFxcXFwpXFxcXCpcXFxcK1xcXFwsXFxcXC1cXFxcLjAtOVxcXFw8XFxcXD5BLVpcXFxceDVFLVxcXFx4N0VdXCI7XG52YXIgVkNIQVIkJCA9IG1lcmdlKFFURVhUJCQsIFwiW1xcXFxcXFwiXFxcXFxcXFxdXCIpO1xudmFyIFNPTUVfREVMSU1TJCQgPSBcIltcXFxcIVxcXFwkXFxcXCdcXFxcKFxcXFwpXFxcXCpcXFxcK1xcXFwsXFxcXDtcXFxcOlxcXFxAXVwiO1xudmFyIFVOUkVTRVJWRUQgPSBuZXcgUmVnRXhwKFVOUkVTRVJWRUQkJCwgXCJnXCIpO1xudmFyIFBDVF9FTkNPREVEID0gbmV3IFJlZ0V4cChQQ1RfRU5DT0RFRCQsIFwiZ1wiKTtcbnZhciBOT1RfTE9DQUxfUEFSVCA9IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgQVRFWFQkJCwgXCJbXFxcXC5dXCIsICdbXFxcXFwiXScsIFZDSEFSJCQpLCBcImdcIik7XG52YXIgTk9UX0hGTkFNRSA9IG5ldyBSZWdFeHAobWVyZ2UoXCJbXl1cIiwgVU5SRVNFUlZFRCQkLCBTT01FX0RFTElNUyQkKSwgXCJnXCIpO1xudmFyIE5PVF9IRlZBTFVFID0gTk9UX0hGTkFNRTtcbmZ1bmN0aW9uIGRlY29kZVVucmVzZXJ2ZWQoc3RyKSB7XG4gICAgdmFyIGRlY1N0ciA9IHBjdERlY0NoYXJzKHN0cik7XG4gICAgcmV0dXJuICFkZWNTdHIubWF0Y2goVU5SRVNFUlZFRCkgPyBzdHIgOiBkZWNTdHI7XG59XG52YXIgaGFuZGxlciQ0ID0ge1xuICAgIHNjaGVtZTogXCJtYWlsdG9cIixcbiAgICBwYXJzZTogZnVuY3Rpb24gcGFyc2UkJDEoY29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgbWFpbHRvQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIHZhciB0byA9IG1haWx0b0NvbXBvbmVudHMudG8gPSBtYWlsdG9Db21wb25lbnRzLnBhdGggPyBtYWlsdG9Db21wb25lbnRzLnBhdGguc3BsaXQoXCIsXCIpIDogW107XG4gICAgICAgIG1haWx0b0NvbXBvbmVudHMucGF0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKG1haWx0b0NvbXBvbmVudHMucXVlcnkpIHtcbiAgICAgICAgICAgIHZhciB1bmtub3duSGVhZGVycyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBoZmllbGRzID0gbWFpbHRvQ29tcG9uZW50cy5xdWVyeS5zcGxpdChcIiZcIik7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMCwgeGwgPSBoZmllbGRzLmxlbmd0aDsgeCA8IHhsOyArK3gpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGZpZWxkID0gaGZpZWxkc1t4XS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChoZmllbGRbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9BZGRycyA9IGhmaWVsZFsxXS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfeCA9IDAsIF94bCA9IHRvQWRkcnMubGVuZ3RoOyBfeCA8IF94bDsgKytfeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvLnB1c2godG9BZGRyc1tfeF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzdWJqZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsdG9Db21wb25lbnRzLnN1YmplY3QgPSB1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJib2R5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWlsdG9Db21wb25lbnRzLmJvZHkgPSB1bmVzY2FwZUNvbXBvbmVudChoZmllbGRbMV0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmtub3duSGVhZGVycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW3VuZXNjYXBlQ29tcG9uZW50KGhmaWVsZFswXSwgb3B0aW9ucyldID0gdW5lc2NhcGVDb21wb25lbnQoaGZpZWxkWzFdLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1bmtub3duSGVhZGVycykgbWFpbHRvQ29tcG9uZW50cy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICBtYWlsdG9Db21wb25lbnRzLnF1ZXJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKHZhciBfeDIgPSAwLCBfeGwyID0gdG8ubGVuZ3RoOyBfeDIgPCBfeGwyOyArK194Mikge1xuICAgICAgICAgICAgdmFyIGFkZHIgPSB0b1tfeDJdLnNwbGl0KFwiQFwiKTtcbiAgICAgICAgICAgIGFkZHJbMF0gPSB1bmVzY2FwZUNvbXBvbmVudChhZGRyWzBdKTtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy51bmljb2RlU3VwcG9ydCkge1xuICAgICAgICAgICAgICAgIC8vY29udmVydCBVbmljb2RlIElETiAtPiBBU0NJSSBJRE5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhZGRyWzFdID0gcHVueWNvZGUudG9BU0NJSSh1bmVzY2FwZUNvbXBvbmVudChhZGRyWzFdLCBvcHRpb25zKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haWx0b0NvbXBvbmVudHMuZXJyb3IgPSBtYWlsdG9Db21wb25lbnRzLmVycm9yIHx8IFwiRW1haWwgYWRkcmVzcydzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIEFTQ0lJIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkclsxXSA9IHVuZXNjYXBlQ29tcG9uZW50KGFkZHJbMV0sIG9wdGlvbnMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b1tfeDJdID0gYWRkci5qb2luKFwiQFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFpbHRvQ29tcG9uZW50cztcbiAgICB9LFxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplJCQxKG1haWx0b0NvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBtYWlsdG9Db21wb25lbnRzO1xuICAgICAgICB2YXIgdG8gPSB0b0FycmF5KG1haWx0b0NvbXBvbmVudHMudG8pO1xuICAgICAgICBpZiAodG8pIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwLCB4bCA9IHRvLmxlbmd0aDsgeCA8IHhsOyArK3gpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRyID0gU3RyaW5nKHRvW3hdKTtcbiAgICAgICAgICAgICAgICB2YXIgYXRJZHggPSB0b0FkZHIubGFzdEluZGV4T2YoXCJAXCIpO1xuICAgICAgICAgICAgICAgIHZhciBsb2NhbFBhcnQgPSB0b0FkZHIuc2xpY2UoMCwgYXRJZHgpLnJlcGxhY2UoUENUX0VOQ09ERUQsIGRlY29kZVVucmVzZXJ2ZWQpLnJlcGxhY2UoUENUX0VOQ09ERUQsIHRvVXBwZXJDYXNlKS5yZXBsYWNlKE5PVF9MT0NBTF9QQVJULCBwY3RFbmNDaGFyKTtcbiAgICAgICAgICAgICAgICB2YXIgZG9tYWluID0gdG9BZGRyLnNsaWNlKGF0SWR4ICsgMSk7XG4gICAgICAgICAgICAgICAgLy9jb252ZXJ0IElETiB2aWEgcHVueWNvZGVcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkb21haW4gPSAhb3B0aW9ucy5pcmkgPyBwdW55Y29kZS50b0FTQ0lJKHVuZXNjYXBlQ29tcG9uZW50KGRvbWFpbiwgb3B0aW9ucykudG9Mb3dlckNhc2UoKSkgOiBwdW55Y29kZS50b1VuaWNvZGUoZG9tYWluKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMuZXJyb3IgPSBjb21wb25lbnRzLmVycm9yIHx8IFwiRW1haWwgYWRkcmVzcydzIGRvbWFpbiBuYW1lIGNhbiBub3QgYmUgY29udmVydGVkIHRvIFwiICsgKCFvcHRpb25zLmlyaSA/IFwiQVNDSUlcIiA6IFwiVW5pY29kZVwiKSArIFwiIHZpYSBwdW55Y29kZTogXCIgKyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b1t4XSA9IGxvY2FsUGFydCArIFwiQFwiICsgZG9tYWluO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50cy5wYXRoID0gdG8uam9pbihcIixcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhlYWRlcnMgPSBtYWlsdG9Db21wb25lbnRzLmhlYWRlcnMgPSBtYWlsdG9Db21wb25lbnRzLmhlYWRlcnMgfHwge307XG4gICAgICAgIGlmIChtYWlsdG9Db21wb25lbnRzLnN1YmplY3QpIGhlYWRlcnNbXCJzdWJqZWN0XCJdID0gbWFpbHRvQ29tcG9uZW50cy5zdWJqZWN0O1xuICAgICAgICBpZiAobWFpbHRvQ29tcG9uZW50cy5ib2R5KSBoZWFkZXJzW1wiYm9keVwiXSA9IG1haWx0b0NvbXBvbmVudHMuYm9keTtcbiAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJzW25hbWVdICE9PSBPW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgZmllbGRzLnB1c2gobmFtZS5yZXBsYWNlKFBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKFBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSkucmVwbGFjZShOT1RfSEZOQU1FLCBwY3RFbmNDaGFyKSArIFwiPVwiICsgaGVhZGVyc1tuYW1lXS5yZXBsYWNlKFBDVF9FTkNPREVELCBkZWNvZGVVbnJlc2VydmVkKS5yZXBsYWNlKFBDVF9FTkNPREVELCB0b1VwcGVyQ2FzZSkucmVwbGFjZShOT1RfSEZWQUxVRSwgcGN0RW5jQ2hhcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnF1ZXJ5ID0gZmllbGRzLmpvaW4oXCImXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRzO1xuICAgIH1cbn07XG5cbnZhciBVUk5fUEFSU0UgPSAvXihbXlxcOl0rKVxcOiguKikvO1xuLy9SRkMgMjE0MVxudmFyIGhhbmRsZXIkNSA9IHtcbiAgICBzY2hlbWU6IFwidXJuXCIsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIHBhcnNlJCQxKGNvbXBvbmVudHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBjb21wb25lbnRzLnBhdGggJiYgY29tcG9uZW50cy5wYXRoLm1hdGNoKFVSTl9QQVJTRSk7XG4gICAgICAgIHZhciB1cm5Db21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAgIHZhciBzY2hlbWUgPSBvcHRpb25zLnNjaGVtZSB8fCB1cm5Db21wb25lbnRzLnNjaGVtZSB8fCBcInVyblwiO1xuICAgICAgICAgICAgdmFyIG5pZCA9IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBuc3MgPSBtYXRjaGVzWzJdO1xuICAgICAgICAgICAgdmFyIHVyblNjaGVtZSA9IHNjaGVtZSArIFwiOlwiICsgKG9wdGlvbnMubmlkIHx8IG5pZCk7XG4gICAgICAgICAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbdXJuU2NoZW1lXTtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMubmlkID0gbmlkO1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5uc3MgPSBuc3M7XG4gICAgICAgICAgICB1cm5Db21wb25lbnRzLnBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoc2NoZW1lSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHVybkNvbXBvbmVudHMgPSBzY2hlbWVIYW5kbGVyLnBhcnNlKHVybkNvbXBvbmVudHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJuQ29tcG9uZW50cy5lcnJvciA9IHVybkNvbXBvbmVudHMuZXJyb3IgfHwgXCJVUk4gY2FuIG5vdCBiZSBwYXJzZWQuXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybkNvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSQkMSh1cm5Db21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBzY2hlbWUgPSBvcHRpb25zLnNjaGVtZSB8fCB1cm5Db21wb25lbnRzLnNjaGVtZSB8fCBcInVyblwiO1xuICAgICAgICB2YXIgbmlkID0gdXJuQ29tcG9uZW50cy5uaWQ7XG4gICAgICAgIHZhciB1cm5TY2hlbWUgPSBzY2hlbWUgKyBcIjpcIiArIChvcHRpb25zLm5pZCB8fCBuaWQpO1xuICAgICAgICB2YXIgc2NoZW1lSGFuZGxlciA9IFNDSEVNRVNbdXJuU2NoZW1lXTtcbiAgICAgICAgaWYgKHNjaGVtZUhhbmRsZXIpIHtcbiAgICAgICAgICAgIHVybkNvbXBvbmVudHMgPSBzY2hlbWVIYW5kbGVyLnNlcmlhbGl6ZSh1cm5Db21wb25lbnRzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJpQ29tcG9uZW50cyA9IHVybkNvbXBvbmVudHM7XG4gICAgICAgIHZhciBuc3MgPSB1cm5Db21wb25lbnRzLm5zcztcbiAgICAgICAgdXJpQ29tcG9uZW50cy5wYXRoID0gKG5pZCB8fCBvcHRpb25zLm5pZCkgKyBcIjpcIiArIG5zcztcbiAgICAgICAgcmV0dXJuIHVyaUNvbXBvbmVudHM7XG4gICAgfVxufTtcblxudmFyIFVVSUQgPSAvXlswLTlBLUZhLWZdezh9KD86XFwtWzAtOUEtRmEtZl17NH0pezN9XFwtWzAtOUEtRmEtZl17MTJ9JC87XG4vL1JGQyA0MTIyXG52YXIgaGFuZGxlciQ2ID0ge1xuICAgIHNjaGVtZTogXCJ1cm46dXVpZFwiLFxuICAgIHBhcnNlOiBmdW5jdGlvbiBwYXJzZSh1cm5Db21wb25lbnRzLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB1dWlkQ29tcG9uZW50cyA9IHVybkNvbXBvbmVudHM7XG4gICAgICAgIHV1aWRDb21wb25lbnRzLnV1aWQgPSB1dWlkQ29tcG9uZW50cy5uc3M7XG4gICAgICAgIHV1aWRDb21wb25lbnRzLm5zcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFvcHRpb25zLnRvbGVyYW50ICYmICghdXVpZENvbXBvbmVudHMudXVpZCB8fCAhdXVpZENvbXBvbmVudHMudXVpZC5tYXRjaChVVUlEKSkpIHtcbiAgICAgICAgICAgIHV1aWRDb21wb25lbnRzLmVycm9yID0gdXVpZENvbXBvbmVudHMuZXJyb3IgfHwgXCJVVUlEIGlzIG5vdCB2YWxpZC5cIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXVpZENvbXBvbmVudHM7XG4gICAgfSxcbiAgICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSh1dWlkQ29tcG9uZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgdXJuQ29tcG9uZW50cyA9IHV1aWRDb21wb25lbnRzO1xuICAgICAgICAvL25vcm1hbGl6ZSBVVUlEXG4gICAgICAgIHVybkNvbXBvbmVudHMubnNzID0gKHV1aWRDb21wb25lbnRzLnV1aWQgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHVybkNvbXBvbmVudHM7XG4gICAgfVxufTtcblxuU0NIRU1FU1toYW5kbGVyLnNjaGVtZV0gPSBoYW5kbGVyO1xuU0NIRU1FU1toYW5kbGVyJDEuc2NoZW1lXSA9IGhhbmRsZXIkMTtcblNDSEVNRVNbaGFuZGxlciQyLnNjaGVtZV0gPSBoYW5kbGVyJDI7XG5TQ0hFTUVTW2hhbmRsZXIkMy5zY2hlbWVdID0gaGFuZGxlciQzO1xuU0NIRU1FU1toYW5kbGVyJDQuc2NoZW1lXSA9IGhhbmRsZXIkNDtcblNDSEVNRVNbaGFuZGxlciQ1LnNjaGVtZV0gPSBoYW5kbGVyJDU7XG5TQ0hFTUVTW2hhbmRsZXIkNi5zY2hlbWVdID0gaGFuZGxlciQ2O1xuXG5leHBvcnRzLlNDSEVNRVMgPSBTQ0hFTUVTO1xuZXhwb3J0cy5wY3RFbmNDaGFyID0gcGN0RW5jQ2hhcjtcbmV4cG9ydHMucGN0RGVjQ2hhcnMgPSBwY3REZWNDaGFycztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmV4cG9ydHMucmVtb3ZlRG90U2VnbWVudHMgPSByZW1vdmVEb3RTZWdtZW50cztcbmV4cG9ydHMuc2VyaWFsaXplID0gc2VyaWFsaXplO1xuZXhwb3J0cy5yZXNvbHZlQ29tcG9uZW50cyA9IHJlc29sdmVDb21wb25lbnRzO1xuZXhwb3J0cy5yZXNvbHZlID0gcmVzb2x2ZTtcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xuZXhwb3J0cy5lcXVhbCA9IGVxdWFsO1xuZXhwb3J0cy5lc2NhcGVDb21wb25lbnQgPSBlc2NhcGVDb21wb25lbnQ7XG5leHBvcnRzLnVuZXNjYXBlQ29tcG9uZW50ID0gdW5lc2NhcGVDb21wb25lbnQ7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11cmkuYWxsLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbigpe1xuXG4gIHZhclxuICAgIGJ1ZixcbiAgICBidWZJZHggPSAwLFxuICAgIGhleEJ5dGVzID0gW10sXG4gICAgaVxuICA7XG5cbiAgLy8gUHJlLWNhbGN1bGF0ZSB0b1N0cmluZygxNikgZm9yIHNwZWVkXG4gIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgIGhleEJ5dGVzW2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbiAgfVxuXG4gIC8vIEJ1ZmZlciByYW5kb20gbnVtYmVycyBmb3Igc3BlZWRcbiAgLy8gUmVkdWNlIG1lbW9yeSB1c2FnZSBieSBkZWNyZWFzaW5nIHRoaXMgbnVtYmVyIChtaW4gMTYpXG4gIC8vIG9yIGltcHJvdmUgc3BlZWQgYnkgaW5jcmVhc2luZyB0aGlzIG51bWJlciAodHJ5IDE2Mzg0KVxuICB1dWlkLkJVRkZFUl9TSVpFID0gNDA5NjtcblxuICAvLyBCaW5hcnkgdXVpZHNcbiAgdXVpZC5iaW4gPSB1dWlkQmluO1xuXG4gIC8vIENsZWFyIGJ1ZmZlclxuICB1dWlkLmNsZWFyQnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgYnVmID0gbnVsbDtcbiAgICBidWZJZHggPSAwO1xuICB9O1xuXG4gIC8vIFRlc3QgZm9yIHV1aWRcbiAgdXVpZC50ZXN0ID0gZnVuY3Rpb24odXVpZCkge1xuICAgIGlmICh0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LTRbMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2kudGVzdCh1dWlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIE5vZGUgJiBCcm93c2VyIHN1cHBvcnRcbiAgdmFyIGNyeXB0MDtcbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3J5cHQwID0gY3J5cHRvO1xuICB9IGVsc2UgaWYoICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgJiYgKHR5cGVvZiB3aW5kb3cubXNDcnlwdG8gIT09ICd1bmRlZmluZWQnKSkge1xuICAgIGNyeXB0MCA9IHdpbmRvdy5tc0NyeXB0bzsgLy8gSUUxMVxuICB9XG5cbiAgaWYgKCh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgJiYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSkge1xuICAgIGNyeXB0MCA9IGNyeXB0MCB8fCByZXF1aXJlKCdjcnlwdG8nKTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cudXVpZCA9IHV1aWQ7XG4gIH1cblxuICAvLyBVc2UgYmVzdCBhdmFpbGFibGUgUFJOR1xuICAvLyBBbHNvIGV4cG9zZSB0aGlzIHNvIHlvdSBjYW4gb3ZlcnJpZGUgaXQuXG4gIHV1aWQucmFuZG9tQnl0ZXMgPSAoZnVuY3Rpb24oKXtcbiAgICBpZiAoY3J5cHQwKSB7XG4gICAgICBpZiAoY3J5cHQwLnJhbmRvbUJ5dGVzKSB7XG4gICAgICAgIHJldHVybiBjcnlwdDAucmFuZG9tQnl0ZXM7XG4gICAgICB9XG4gICAgICBpZiAoY3J5cHQwLmdldFJhbmRvbVZhbHVlcykge1xuICAgICAgICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KG4pO1xuICAgICAgICAgICAgY3J5cHQwLmdldFJhbmRvbVZhbHVlcyhieXRlcyk7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShieXRlcyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24obikge1xuICAgICAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KG4pO1xuICAgICAgICAgIGNyeXB0MC5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpO1xuICAgICAgICAgIHJldHVybiBieXRlcztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG4pIHtcbiAgICAgIHZhciBpLCByID0gW107XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgLy8gQnVmZmVyIHNvbWUgcmFuZG9tIGJ5dGVzIGZvciBzcGVlZFxuICBmdW5jdGlvbiByYW5kb21CeXRlc0J1ZmZlcmVkKG4pIHtcbiAgICBpZiAoIWJ1ZiB8fCAoKGJ1ZklkeCArIG4pID4gdXVpZC5CVUZGRVJfU0laRSkpIHtcbiAgICAgIGJ1ZklkeCA9IDA7XG4gICAgICBidWYgPSB1dWlkLnJhbmRvbUJ5dGVzKHV1aWQuQlVGRkVSX1NJWkUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmLnNsaWNlKGJ1ZklkeCwgYnVmSWR4ICs9IG4pO1xuICB9XG5cbiAgLy8gdXVpZC5iaW5cbiAgZnVuY3Rpb24gdXVpZEJpbigpIHtcbiAgICB2YXIgYiA9IHJhbmRvbUJ5dGVzQnVmZmVyZWQoMTYpO1xuICAgIGJbNl0gPSAoYls2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICBiWzhdID0gKGJbOF0gJiAweDNmKSB8IDB4ODA7XG4gICAgcmV0dXJuIGI7XG4gIH1cblxuICAvLyBTdHJpbmcgVVVJRHY0IChSYW5kb20pXG4gIGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgdmFyIGIgPSB1dWlkQmluKCk7XG4gICAgcmV0dXJuIGhleEJ5dGVzW2JbMF1dICsgaGV4Qnl0ZXNbYlsxXV0gK1xuICAgICAgaGV4Qnl0ZXNbYlsyXV0gKyBoZXhCeXRlc1tiWzNdXSArICctJyArXG4gICAgICBoZXhCeXRlc1tiWzRdXSArIGhleEJ5dGVzW2JbNV1dICsgJy0nICtcbiAgICAgIGhleEJ5dGVzW2JbNl1dICsgaGV4Qnl0ZXNbYls3XV0gKyAnLScgK1xuICAgICAgaGV4Qnl0ZXNbYls4XV0gKyBoZXhCeXRlc1tiWzldXSArICctJyArXG4gICAgICBoZXhCeXRlc1tiWzEwXV0gKyBoZXhCeXRlc1tiWzExXV0gK1xuICAgICAgaGV4Qnl0ZXNbYlsxMl1dICsgaGV4Qnl0ZXNbYlsxM11dICtcbiAgICAgIGhleEJ5dGVzW2JbMTRdXSArIGhleEJ5dGVzW2JbMTVdXVxuICAgIDtcbiAgfVxuXG59KSgpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV29ya2VyX2ZuKCkge1xuICByZXR1cm4gbmV3IFdvcmtlcihfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZ2FtZS53b3JrZXIuanNcIik7XG59XG4iLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiOyIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpKTtcbiAgZ2FtZS5pbml0aWFsaXNlKCk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9