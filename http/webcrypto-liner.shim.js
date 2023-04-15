var _excluded = ["name", "optional", "primitiveSchema"],
  _excluded2 = ["value"],
  _excluded3 = ["isHexOnly"],
  _excluded4 = ["value", "isIndefiniteForm"],
  _excluded5 = ["value"],
  _excluded6 = ["isConstructed"],
  _excluded7 = ["idBlock", "lenBlock"],
  _excluded8 = ["unusedBits", "isConstructed"],
  _excluded9 = ["idBlock", "lenBlock"],
  _excluded10 = ["value"],
  _excluded11 = ["valueDec", "isFirstSid"],
  _excluded12 = ["value"],
  _excluded13 = ["valueDec"],
  _excluded14 = ["value"],
  _excluded15 = ["value", "valueDate"],
  _excluded16 = ["value"],
  _excluded17 = ["value", "local"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var liner = function (exports, elliptic) {
  'use strict';

  var _edOIDs;
  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function get() {
              return e[k];
            }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }
  function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
      e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
        if (k !== 'default' && !(k in n)) {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function get() {
              return e[k];
            }
          });
        }
      });
    });
    return Object.freeze(n);
  }
  var elliptic__namespace = _interopNamespaceDefault(elliptic);
  var window$2 = {};
  if (typeof self !== "undefined") {
    window$2 = self;
  }
  exports.nativeCrypto = window$2["msCrypto"] || window$2.crypto || {};
  exports.nativeSubtle = null;
  try {
    exports.nativeSubtle = (exports.nativeCrypto === null || exports.nativeCrypto === void 0 ? void 0 : exports.nativeCrypto.subtle) || (exports.nativeCrypto === null || exports.nativeCrypto === void 0 ? void 0 : exports.nativeCrypto["webkitSubtle"]) || null;
  } catch (err) {
    console.warn("Cannot get subtle from crypto", err);
  }
  function setCrypto(crypto) {
    exports.nativeCrypto = crypto;
    exports.nativeSubtle = crypto.subtle;
  }
  var ARRAY_BUFFER_NAME = "[object ArrayBuffer]";
  var BufferSourceConverter = function () {
    function BufferSourceConverter() {
      _classCallCheck(this, BufferSourceConverter);
    }
    _createClass(BufferSourceConverter, null, [{
      key: "isArrayBuffer",
      value: function isArrayBuffer(data) {
        return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;
      }
    }, {
      key: "toArrayBuffer",
      value: function toArrayBuffer(data) {
        if (this.isArrayBuffer(data)) {
          return data;
        }
        if (data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        return this.toUint8Array(data).slice().buffer;
      }
    }, {
      key: "toUint8Array",
      value: function toUint8Array(data) {
        return this.toView(data, Uint8Array);
      }
    }, {
      key: "toView",
      value: function toView(data, type) {
        if (data.constructor === type) {
          return data;
        }
        if (this.isArrayBuffer(data)) {
          return new type(data);
        }
        if (this.isArrayBufferView(data)) {
          return new type(data.buffer, data.byteOffset, data.byteLength);
        }
        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      }
    }, {
      key: "isBufferSource",
      value: function isBufferSource(data) {
        return this.isArrayBufferView(data) || this.isArrayBuffer(data);
      }
    }, {
      key: "isArrayBufferView",
      value: function isArrayBufferView(data) {
        return ArrayBuffer.isView(data) || data && this.isArrayBuffer(data.buffer);
      }
    }, {
      key: "isEqual",
      value: function isEqual(a, b) {
        var aView = BufferSourceConverter.toUint8Array(a);
        var bView = BufferSourceConverter.toUint8Array(b);
        if (aView.length !== bView.byteLength) {
          return false;
        }
        for (var i = 0; i < aView.length; i++) {
          if (aView[i] !== bView[i]) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: "concat",
      value: function concat() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (Array.isArray(args[0])) {
          var buffers = args[0];
          var size = 0;
          var _iterator = _createForOfIteratorHelper(buffers),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var buffer = _step.value;
              size += buffer.byteLength;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var res = new Uint8Array(size);
          var offset = 0;
          var _iterator2 = _createForOfIteratorHelper(buffers),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _buffer2 = _step2.value;
              var view = this.toUint8Array(_buffer2);
              res.set(view, offset);
              offset += view.length;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (args[1]) {
            return this.toView(res, args[1]);
          }
          return res.buffer;
        } else {
          return this.concat(args);
        }
      }
    }]);
    return BufferSourceConverter;
  }();
  var Utf8Converter = function () {
    function Utf8Converter() {
      _classCallCheck(this, Utf8Converter);
    }
    _createClass(Utf8Converter, null, [{
      key: "fromString",
      value: function fromString(text) {
        var s = unescape(encodeURIComponent(text));
        var uintArray = new Uint8Array(s.length);
        for (var i = 0; i < s.length; i++) {
          uintArray[i] = s.charCodeAt(i);
        }
        return uintArray.buffer;
      }
    }, {
      key: "toString",
      value: function toString(buffer) {
        var buf = BufferSourceConverter.toUint8Array(buffer);
        var encodedString = "";
        for (var i = 0; i < buf.length; i++) {
          encodedString += String.fromCharCode(buf[i]);
        }
        var decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
      }
    }]);
    return Utf8Converter;
  }();
  var Utf16Converter = function () {
    function Utf16Converter() {
      _classCallCheck(this, Utf16Converter);
    }
    _createClass(Utf16Converter, null, [{
      key: "toString",
      value: function toString(buffer) {
        var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var arrayBuffer = BufferSourceConverter.toArrayBuffer(buffer);
        var dataView = new DataView(arrayBuffer);
        var res = "";
        for (var i = 0; i < arrayBuffer.byteLength; i += 2) {
          var code = dataView.getUint16(i, littleEndian);
          res += String.fromCharCode(code);
        }
        return res;
      }
    }, {
      key: "fromString",
      value: function fromString(text) {
        var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var res = new ArrayBuffer(text.length * 2);
        var dataView = new DataView(res);
        for (var i = 0; i < text.length; i++) {
          dataView.setUint16(i * 2, text.charCodeAt(i), littleEndian);
        }
        return res;
      }
    }]);
    return Utf16Converter;
  }();
  var Convert = function () {
    function Convert() {
      _classCallCheck(this, Convert);
    }
    _createClass(Convert, null, [{
      key: "isHex",
      value: function isHex(data) {
        return typeof data === "string" && /^[a-z0-9]+$/i.test(data);
      }
    }, {
      key: "isBase64",
      value: function isBase64(data) {
        return typeof data === "string" && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(data);
      }
    }, {
      key: "isBase64Url",
      value: function isBase64Url(data) {
        return typeof data === "string" && /^[a-zA-Z0-9-_]+$/i.test(data);
      }
    }, {
      key: "ToString",
      value: function ToString(buffer) {
        var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
        var buf = BufferSourceConverter.toUint8Array(buffer);
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.ToUtf8String(buf);
          case "binary":
            return this.ToBinary(buf);
          case "hex":
            return this.ToHex(buf);
          case "base64":
            return this.ToBase64(buf);
          case "base64url":
            return this.ToBase64Url(buf);
          case "utf16le":
            return Utf16Converter.toString(buf, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buf);
          default:
            throw new Error("Unknown type of encoding '".concat(enc, "'"));
        }
      }
    }, {
      key: "FromString",
      value: function FromString(str) {
        var enc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "utf8";
        if (!str) {
          return new ArrayBuffer(0);
        }
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.FromUtf8String(str);
          case "binary":
            return this.FromBinary(str);
          case "hex":
            return this.FromHex(str);
          case "base64":
            return this.FromBase64(str);
          case "base64url":
            return this.FromBase64Url(str);
          case "utf16le":
            return Utf16Converter.fromString(str, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(str);
          default:
            throw new Error("Unknown type of encoding '".concat(enc, "'"));
        }
      }
    }, {
      key: "ToBase64",
      value: function ToBase64(buffer) {
        var buf = BufferSourceConverter.toUint8Array(buffer);
        if (typeof btoa !== "undefined") {
          var _binary = this.ToString(buf, "binary");
          return btoa(_binary);
        } else {
          return Buffer.from(buf).toString("base64");
        }
      }
    }, {
      key: "FromBase64",
      value: function FromBase64(base64) {
        var formatted = this.formatString(base64);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!Convert.isBase64(formatted)) {
          throw new TypeError("Argument 'base64Text' is not Base64 encoded");
        }
        if (typeof atob !== "undefined") {
          return this.FromBinary(atob(formatted));
        } else {
          return new Uint8Array(Buffer.from(formatted, "base64")).buffer;
        }
      }
    }, {
      key: "FromBase64Url",
      value: function FromBase64Url(base64url) {
        var formatted = this.formatString(base64url);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!Convert.isBase64Url(formatted)) {
          throw new TypeError("Argument 'base64url' is not Base64Url encoded");
        }
        return this.FromBase64(this.Base64Padding(formatted.replace(/\-/g, "+").replace(/\_/g, "/")));
      }
    }, {
      key: "ToBase64Url",
      value: function ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
      }
    }, {
      key: "FromUtf8String",
      value: function FromUtf8String(text) {
        var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Convert.DEFAULT_UTF8_ENCODING;
        switch (encoding) {
          case "ascii":
            return this.FromBinary(text);
          case "utf8":
            return Utf8Converter.fromString(text);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(text);
          case "utf16le":
          case "usc2":
            return Utf16Converter.fromString(text, true);
          default:
            throw new Error("Unknown type of encoding '".concat(encoding, "'"));
        }
      }
    }, {
      key: "ToUtf8String",
      value: function ToUtf8String(buffer) {
        var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Convert.DEFAULT_UTF8_ENCODING;
        switch (encoding) {
          case "ascii":
            return this.ToBinary(buffer);
          case "utf8":
            return Utf8Converter.toString(buffer);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buffer);
          case "utf16le":
          case "usc2":
            return Utf16Converter.toString(buffer, true);
          default:
            throw new Error("Unknown type of encoding '".concat(encoding, "'"));
        }
      }
    }, {
      key: "FromBinary",
      value: function FromBinary(text) {
        var stringLength = text.length;
        var resultView = new Uint8Array(stringLength);
        for (var i = 0; i < stringLength; i++) {
          resultView[i] = text.charCodeAt(i);
        }
        return resultView.buffer;
      }
    }, {
      key: "ToBinary",
      value: function ToBinary(buffer) {
        var buf = BufferSourceConverter.toUint8Array(buffer);
        var res = "";
        for (var i = 0; i < buf.length; i++) {
          res += String.fromCharCode(buf[i]);
        }
        return res;
      }
    }, {
      key: "ToHex",
      value: function ToHex(buffer) {
        var buf = BufferSourceConverter.toUint8Array(buffer);
        var splitter = "";
        var res = [];
        var len = buf.length;
        for (var i = 0; i < len; i++) {
          var char = buf[i].toString(16).padStart(2, "0");
          res.push(char);
        }
        return res.join(splitter);
      }
    }, {
      key: "FromHex",
      value: function FromHex(hexString) {
        var formatted = this.formatString(hexString);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!Convert.isHex(formatted)) {
          throw new TypeError("Argument 'hexString' is not HEX encoded");
        }
        if (formatted.length % 2) {
          formatted = "0".concat(formatted);
        }
        var res = new Uint8Array(formatted.length / 2);
        for (var i = 0; i < formatted.length; i = i + 2) {
          var c = formatted.slice(i, i + 2);
          res[i / 2] = parseInt(c, 16);
        }
        return res.buffer;
      }
    }, {
      key: "ToUtf16String",
      value: function ToUtf16String(buffer) {
        var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return Utf16Converter.toString(buffer, littleEndian);
      }
    }, {
      key: "FromUtf16String",
      value: function FromUtf16String(text) {
        var littleEndian = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return Utf16Converter.fromString(text, littleEndian);
      }
    }, {
      key: "Base64Padding",
      value: function Base64Padding(base64) {
        var padCount = 4 - base64.length % 4;
        if (padCount < 4) {
          for (var i = 0; i < padCount; i++) {
            base64 += "=";
          }
        }
        return base64;
      }
    }, {
      key: "formatString",
      value: function formatString(data) {
        return (data === null || data === void 0 ? void 0 : data.replace(/[\n\r\t ]/g, "")) || "";
      }
    }]);
    return Convert;
  }();
  Convert.DEFAULT_UTF8_ENCODING = "utf8";
  function combine() {
    for (var _len2 = arguments.length, buf = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      buf[_key2] = arguments[_key2];
    }
    var totalByteLength = buf.map(function (item) {
      return item.byteLength;
    }).reduce(function (prev, cur) {
      return prev + cur;
    });
    var res = new Uint8Array(totalByteLength);
    var currentPos = 0;
    buf.map(function (item) {
      return new Uint8Array(item);
    }).forEach(function (arr) {
      var _iterator3 = _createForOfIteratorHelper(arr),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item2 = _step3.value;
          res[currentPos++] = item2;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    });
    return res.buffer;
  }
  function utilFromBase(inputBuffer, inputBase) {
    var result = 0;
    if (inputBuffer.length === 1) {
      return inputBuffer[0];
    }
    for (var i = inputBuffer.length - 1; i >= 0; i--) {
      result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
    }
    return result;
  }
  function utilToBase(value, base) {
    var reserved = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    var internalReserved = reserved;
    var internalValue = value;
    var result = 0;
    var biggest = Math.pow(2, base);
    for (var i = 1; i < 8; i++) {
      if (value < biggest) {
        var retBuf = void 0;
        if (internalReserved < 0) {
          retBuf = new ArrayBuffer(i);
          result = i;
        } else {
          if (internalReserved < i) {
            return new ArrayBuffer(0);
          }
          retBuf = new ArrayBuffer(internalReserved);
          result = internalReserved;
        }
        var retView = new Uint8Array(retBuf);
        for (var j = i - 1; j >= 0; j--) {
          var basis = Math.pow(2, j * base);
          retView[result - j - 1] = Math.floor(internalValue / basis);
          internalValue -= retView[result - j - 1] * basis;
        }
        return retBuf;
      }
      biggest *= Math.pow(2, base);
    }
    return new ArrayBuffer(0);
  }
  function utilConcatView() {
    var outputLength = 0;
    var prevLength = 0;
    for (var _len3 = arguments.length, views = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      views[_key3] = arguments[_key3];
    }
    for (var _i = 0, _views = views; _i < _views.length; _i++) {
      var view = _views[_i];
      outputLength += view.length;
    }
    var retBuf = new ArrayBuffer(outputLength);
    var retView = new Uint8Array(retBuf);
    for (var _i2 = 0, _views2 = views; _i2 < _views2.length; _i2++) {
      var _view = _views2[_i2];
      retView.set(_view, prevLength);
      prevLength += _view.length;
    }
    return retView;
  }
  function utilDecodeTC() {
    var buf = new Uint8Array(this.valueHex);
    if (this.valueHex.byteLength >= 2) {
      var condition1 = buf[0] === 0xFF && buf[1] & 0x80;
      var condition2 = buf[0] === 0x00 && (buf[1] & 0x80) === 0x00;
      if (condition1 || condition2) {
        this.warnings.push("Needlessly long format");
      }
    }
    var bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
    var bigIntView = new Uint8Array(bigIntBuffer);
    for (var i = 0; i < this.valueHex.byteLength; i++) {
      bigIntView[i] = 0;
    }
    bigIntView[0] = buf[0] & 0x80;
    var bigInt = utilFromBase(bigIntView, 8);
    var smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
    var smallIntView = new Uint8Array(smallIntBuffer);
    for (var j = 0; j < this.valueHex.byteLength; j++) {
      smallIntView[j] = buf[j];
    }
    smallIntView[0] &= 0x7F;
    var smallInt = utilFromBase(smallIntView, 8);
    return smallInt - bigInt;
  }
  function utilEncodeTC(value) {
    var modValue = value < 0 ? value * -1 : value;
    var bigInt = 128;
    for (var i = 1; i < 8; i++) {
      if (modValue <= bigInt) {
        if (value < 0) {
          var smallInt = bigInt - modValue;
          var _retBuf = utilToBase(smallInt, 8, i);
          var _retView = new Uint8Array(_retBuf);
          _retView[0] |= 0x80;
          return _retBuf;
        }
        var retBuf = utilToBase(modValue, 8, i);
        var retView = new Uint8Array(retBuf);
        if (retView[0] & 0x80) {
          var tempBuf = retBuf.slice(0);
          var tempView = new Uint8Array(tempBuf);
          retBuf = new ArrayBuffer(retBuf.byteLength + 1);
          retView = new Uint8Array(retBuf);
          for (var k = 0; k < tempBuf.byteLength; k++) {
            retView[k + 1] = tempView[k];
          }
          retView[0] = 0x00;
        }
        return retBuf;
      }
      bigInt *= Math.pow(2, 8);
    }
    return new ArrayBuffer(0);
  }
  function isEqualBuffer(inputBuffer1, inputBuffer2) {
    if (inputBuffer1.byteLength !== inputBuffer2.byteLength) {
      return false;
    }
    var view1 = new Uint8Array(inputBuffer1);
    var view2 = new Uint8Array(inputBuffer2);
    for (var i = 0; i < view1.length; i++) {
      if (view1[i] !== view2[i]) {
        return false;
      }
    }
    return true;
  }
  function padNumber(inputNumber, fullLength) {
    var str = inputNumber.toString(10);
    if (fullLength < str.length) {
      return "";
    }
    var dif = fullLength - str.length;
    var padding = new Array(dif);
    for (var i = 0; i < dif; i++) {
      padding[i] = "0";
    }
    var paddingString = padding.join("");
    return paddingString.concat(str);
  }
  function assertBigInt() {
    if (typeof BigInt === "undefined") {
      throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
    }
  }
  function concat$1(buffers) {
    var outputLength = 0;
    var prevLength = 0;
    for (var i = 0; i < buffers.length; i++) {
      var buffer = buffers[i];
      outputLength += buffer.byteLength;
    }
    var retView = new Uint8Array(outputLength);
    for (var _i3 = 0; _i3 < buffers.length; _i3++) {
      var _buffer3 = buffers[_i3];
      retView.set(new Uint8Array(_buffer3), prevLength);
      prevLength += _buffer3.byteLength;
    }
    return retView.buffer;
  }
  function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
    if (!(inputBuffer instanceof Uint8Array)) {
      baseBlock.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
      return false;
    }
    if (!inputBuffer.byteLength) {
      baseBlock.error = "Wrong parameter: inputBuffer has zero length";
      return false;
    }
    if (inputOffset < 0) {
      baseBlock.error = "Wrong parameter: inputOffset less than zero";
      return false;
    }
    if (inputLength < 0) {
      baseBlock.error = "Wrong parameter: inputLength less than zero";
      return false;
    }
    if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
      baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
      return false;
    }
    return true;
  }
  var ViewWriter = function () {
    function ViewWriter() {
      _classCallCheck(this, ViewWriter);
      this.items = [];
    }
    _createClass(ViewWriter, [{
      key: "write",
      value: function write(buf) {
        this.items.push(buf);
      }
    }, {
      key: "final",
      value: function final() {
        return concat$1(this.items);
      }
    }]);
    return ViewWriter;
  }();
  var powers2 = [new Uint8Array([1])];
  var digitsString = "0123456789";
  var NAME = "name";
  var VALUE_HEX_VIEW = "valueHexView";
  var IS_HEX_ONLY = "isHexOnly";
  var ID_BLOCK = "idBlock";
  var TAG_CLASS = "tagClass";
  var TAG_NUMBER = "tagNumber";
  var IS_CONSTRUCTED = "isConstructed";
  var FROM_BER = "fromBER";
  var TO_BER = "toBER";
  var LOCAL = "local";
  var EMPTY_STRING = "";
  var EMPTY_BUFFER = new ArrayBuffer(0);
  var EMPTY_VIEW = new Uint8Array(0);
  var END_OF_CONTENT_NAME = "EndOfContent";
  var OCTET_STRING_NAME = "OCTET STRING";
  var BIT_STRING_NAME = "BIT STRING";
  function HexBlock(BaseClass) {
    var _a;
    return _a = function (_BaseClass) {
      _inherits(Some, _BaseClass);
      var _super2 = _createSuper(Some);
      function Some() {
        var _this2;
        _classCallCheck(this, Some);
        var _a;
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        _this2 = _super2.call.apply(_super2, [this].concat(args));
        var params = args[0] || {};
        _this2.isHexOnly = (_a = params.isHexOnly) !== null && _a !== void 0 ? _a : false;
        _this2.valueHexView = params.valueHex ? BufferSourceConverter.toUint8Array(params.valueHex) : EMPTY_VIEW;
        return _this2;
      }
      _createClass(Some, [{
        key: "valueHex",
        get: function get() {
          return this.valueHexView.slice().buffer;
        },
        set: function set(value) {
          this.valueHexView = new Uint8Array(value);
        }
      }, {
        key: "fromBER",
        value: function fromBER(inputBuffer, inputOffset, inputLength) {
          var view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
          if (!checkBufferParams(this, view, inputOffset, inputLength)) {
            return -1;
          }
          var endLength = inputOffset + inputLength;
          this.valueHexView = view.subarray(inputOffset, endLength);
          if (!this.valueHexView.length) {
            this.warnings.push("Zero buffer length");
            return inputOffset;
          }
          this.blockLength = inputLength;
          return endLength;
        }
      }, {
        key: "toBER",
        value: function toBER() {
          var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          if (!this.isHexOnly) {
            this.error = "Flag 'isHexOnly' is not set, abort";
            return EMPTY_BUFFER;
          }
          if (sizeOnly) {
            return new ArrayBuffer(this.valueHexView.byteLength);
          }
          return this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer;
        }
      }, {
        key: "toJSON",
        value: function toJSON() {
          return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(Some.prototype), "toJSON", this).call(this)), {}, {
            isHexOnly: this.isHexOnly,
            valueHex: Convert.ToHex(this.valueHexView)
          });
        }
      }]);
      return Some;
    }(BaseClass), _a.NAME = "hexBlock", _a;
  }
  var LocalBaseBlock = function () {
    function LocalBaseBlock() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$blockLength = _ref.blockLength,
        blockLength = _ref$blockLength === void 0 ? 0 : _ref$blockLength,
        _ref$error = _ref.error,
        error = _ref$error === void 0 ? EMPTY_STRING : _ref$error,
        _ref$warnings = _ref.warnings,
        warnings = _ref$warnings === void 0 ? [] : _ref$warnings,
        _ref$valueBeforeDecod = _ref.valueBeforeDecode,
        valueBeforeDecode = _ref$valueBeforeDecod === void 0 ? EMPTY_VIEW : _ref$valueBeforeDecod;
      _classCallCheck(this, LocalBaseBlock);
      this.blockLength = blockLength;
      this.error = error;
      this.warnings = warnings;
      this.valueBeforeDecodeView = BufferSourceConverter.toUint8Array(valueBeforeDecode);
    }
    _createClass(LocalBaseBlock, [{
      key: "valueBeforeDecode",
      get: function get() {
        return this.valueBeforeDecodeView.slice().buffer;
      },
      set: function set(value) {
        this.valueBeforeDecodeView = new Uint8Array(value);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return {
          blockName: this.constructor.NAME,
          blockLength: this.blockLength,
          error: this.error,
          warnings: this.warnings,
          valueBeforeDecode: Convert.ToHex(this.valueBeforeDecodeView)
        };
      }
    }], [{
      key: "blockName",
      value: function blockName() {
        return this.NAME;
      }
    }]);
    return LocalBaseBlock;
  }();
  LocalBaseBlock.NAME = "baseBlock";
  var ValueBlock = function (_LocalBaseBlock) {
    _inherits(ValueBlock, _LocalBaseBlock);
    var _super3 = _createSuper(ValueBlock);
    function ValueBlock() {
      _classCallCheck(this, ValueBlock);
      return _super3.apply(this, arguments);
    }
    _createClass(ValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
      }
    }]);
    return ValueBlock;
  }(LocalBaseBlock);
  ValueBlock.NAME = "valueBlock";
  var LocalIdentificationBlock = function (_HexBlock) {
    _inherits(LocalIdentificationBlock, _HexBlock);
    var _super4 = _createSuper(LocalIdentificationBlock);
    function LocalIdentificationBlock() {
      var _this3;
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$idBlock = _ref2.idBlock,
        idBlock = _ref2$idBlock === void 0 ? {} : _ref2$idBlock;
      _classCallCheck(this, LocalIdentificationBlock);
      var _a, _b, _c, _d;
      _this3 = _super4.call(this);
      if (idBlock) {
        _this3.isHexOnly = (_a = idBlock.isHexOnly) !== null && _a !== void 0 ? _a : false;
        _this3.valueHexView = idBlock.valueHex ? BufferSourceConverter.toUint8Array(idBlock.valueHex) : EMPTY_VIEW;
        _this3.tagClass = (_b = idBlock.tagClass) !== null && _b !== void 0 ? _b : -1;
        _this3.tagNumber = (_c = idBlock.tagNumber) !== null && _c !== void 0 ? _c : -1;
        _this3.isConstructed = (_d = idBlock.isConstructed) !== null && _d !== void 0 ? _d : false;
      } else {
        _this3.tagClass = -1;
        _this3.tagNumber = -1;
        _this3.isConstructed = false;
      }
      return _this3;
    }
    _createClass(LocalIdentificationBlock, [{
      key: "toBER",
      value: function toBER() {
        var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var firstOctet = 0;
        switch (this.tagClass) {
          case 1:
            firstOctet |= 0x00;
            break;
          case 2:
            firstOctet |= 0x40;
            break;
          case 3:
            firstOctet |= 0x80;
            break;
          case 4:
            firstOctet |= 0xC0;
            break;
          default:
            this.error = "Unknown tag class";
            return EMPTY_BUFFER;
        }
        if (this.isConstructed) firstOctet |= 0x20;
        if (this.tagNumber < 31 && !this.isHexOnly) {
          var _retView2 = new Uint8Array(1);
          if (!sizeOnly) {
            var number = this.tagNumber;
            number &= 0x1F;
            firstOctet |= number;
            _retView2[0] = firstOctet;
          }
          return _retView2.buffer;
        }
        if (!this.isHexOnly) {
          var encodedBuf = utilToBase(this.tagNumber, 7);
          var encodedView = new Uint8Array(encodedBuf);
          var size = encodedBuf.byteLength;
          var _retView3 = new Uint8Array(size + 1);
          _retView3[0] = firstOctet | 0x1F;
          if (!sizeOnly) {
            for (var i = 0; i < size - 1; i++) _retView3[i + 1] = encodedView[i] | 0x80;
            _retView3[size] = encodedView[size - 1];
          }
          return _retView3.buffer;
        }
        var retView = new Uint8Array(this.valueHexView.byteLength + 1);
        retView[0] = firstOctet | 0x1F;
        if (!sizeOnly) {
          var curView = this.valueHexView;
          for (var _i4 = 0; _i4 < curView.length - 1; _i4++) retView[_i4 + 1] = curView[_i4] | 0x80;
          retView[this.valueHexView.byteLength] = curView[curView.length - 1];
        }
        return retView.buffer;
      }
    }, {
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var inputView = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
          return -1;
        }
        var intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        if (intBuffer.length === 0) {
          this.error = "Zero buffer length";
          return -1;
        }
        var tagClassMask = intBuffer[0] & 0xC0;
        switch (tagClassMask) {
          case 0x00:
            this.tagClass = 1;
            break;
          case 0x40:
            this.tagClass = 2;
            break;
          case 0x80:
            this.tagClass = 3;
            break;
          case 0xC0:
            this.tagClass = 4;
            break;
          default:
            this.error = "Unknown tag class";
            return -1;
        }
        this.isConstructed = (intBuffer[0] & 0x20) === 0x20;
        this.isHexOnly = false;
        var tagNumberMask = intBuffer[0] & 0x1F;
        if (tagNumberMask !== 0x1F) {
          this.tagNumber = tagNumberMask;
          this.blockLength = 1;
        } else {
          var count = 1;
          var intTagNumberBuffer = this.valueHexView = new Uint8Array(255);
          var tagNumberBufferMaxLength = 255;
          while (intBuffer[count] & 0x80) {
            intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F;
            count++;
            if (count >= intBuffer.length) {
              this.error = "End of input reached before message was fully decoded";
              return -1;
            }
            if (count === tagNumberBufferMaxLength) {
              tagNumberBufferMaxLength += 255;
              var _tempBufferView = new Uint8Array(tagNumberBufferMaxLength);
              for (var i = 0; i < intTagNumberBuffer.length; i++) _tempBufferView[i] = intTagNumberBuffer[i];
              intTagNumberBuffer = this.valueHexView = new Uint8Array(tagNumberBufferMaxLength);
            }
          }
          this.blockLength = count + 1;
          intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F;
          var tempBufferView = new Uint8Array(count);
          for (var _i5 = 0; _i5 < count; _i5++) tempBufferView[_i5] = intTagNumberBuffer[_i5];
          intTagNumberBuffer = this.valueHexView = new Uint8Array(count);
          intTagNumberBuffer.set(tempBufferView);
          if (this.blockLength <= 9) this.tagNumber = utilFromBase(intTagNumberBuffer, 7);else {
            this.isHexOnly = true;
            this.warnings.push("Tag too long, represented as hex-coded");
          }
        }
        if (this.tagClass === 1 && this.isConstructed) {
          switch (this.tagNumber) {
            case 1:
            case 2:
            case 5:
            case 6:
            case 9:
            case 13:
            case 14:
            case 23:
            case 24:
            case 31:
            case 32:
            case 33:
            case 34:
              this.error = "Constructed encoding used for primitive type";
              return -1;
          }
        }
        return inputOffset + this.blockLength;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalIdentificationBlock.prototype), "toJSON", this).call(this)), {}, {
          tagClass: this.tagClass,
          tagNumber: this.tagNumber,
          isConstructed: this.isConstructed
        });
      }
    }]);
    return LocalIdentificationBlock;
  }(HexBlock(LocalBaseBlock));
  LocalIdentificationBlock.NAME = "identificationBlock";
  var LocalLengthBlock = function (_LocalBaseBlock2) {
    _inherits(LocalLengthBlock, _LocalBaseBlock2);
    var _super5 = _createSuper(LocalLengthBlock);
    function LocalLengthBlock() {
      var _this4;
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$lenBlock = _ref3.lenBlock,
        lenBlock = _ref3$lenBlock === void 0 ? {} : _ref3$lenBlock;
      _classCallCheck(this, LocalLengthBlock);
      var _a, _b, _c;
      _this4 = _super5.call(this);
      _this4.isIndefiniteForm = (_a = lenBlock.isIndefiniteForm) !== null && _a !== void 0 ? _a : false;
      _this4.longFormUsed = (_b = lenBlock.longFormUsed) !== null && _b !== void 0 ? _b : false;
      _this4.length = (_c = lenBlock.length) !== null && _c !== void 0 ? _c : 0;
      return _this4;
    }
    _createClass(LocalLengthBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var view = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, view, inputOffset, inputLength)) {
          return -1;
        }
        var intBuffer = view.subarray(inputOffset, inputOffset + inputLength);
        if (intBuffer.length === 0) {
          this.error = "Zero buffer length";
          return -1;
        }
        if (intBuffer[0] === 0xFF) {
          this.error = "Length block 0xFF is reserved by standard";
          return -1;
        }
        this.isIndefiniteForm = intBuffer[0] === 0x80;
        if (this.isIndefiniteForm) {
          this.blockLength = 1;
          return inputOffset + this.blockLength;
        }
        this.longFormUsed = !!(intBuffer[0] & 0x80);
        if (this.longFormUsed === false) {
          this.length = intBuffer[0];
          this.blockLength = 1;
          return inputOffset + this.blockLength;
        }
        var count = intBuffer[0] & 0x7F;
        if (count > 8) {
          this.error = "Too big integer";
          return -1;
        }
        if (count + 1 > intBuffer.length) {
          this.error = "End of input reached before message was fully decoded";
          return -1;
        }
        var lenOffset = inputOffset + 1;
        var lengthBufferView = view.subarray(lenOffset, lenOffset + count);
        if (lengthBufferView[count - 1] === 0x00) this.warnings.push("Needlessly long encoded length");
        this.length = utilFromBase(lengthBufferView, 8);
        if (this.longFormUsed && this.length <= 127) this.warnings.push("Unnecessary usage of long length form");
        this.blockLength = count + 1;
        return inputOffset + this.blockLength;
      }
    }, {
      key: "toBER",
      value: function toBER() {
        var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var retBuf;
        var retView;
        if (this.length > 127) this.longFormUsed = true;
        if (this.isIndefiniteForm) {
          retBuf = new ArrayBuffer(1);
          if (sizeOnly === false) {
            retView = new Uint8Array(retBuf);
            retView[0] = 0x80;
          }
          return retBuf;
        }
        if (this.longFormUsed) {
          var encodedBuf = utilToBase(this.length, 8);
          if (encodedBuf.byteLength > 127) {
            this.error = "Too big length";
            return EMPTY_BUFFER;
          }
          retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);
          if (sizeOnly) return retBuf;
          var encodedView = new Uint8Array(encodedBuf);
          retView = new Uint8Array(retBuf);
          retView[0] = encodedBuf.byteLength | 0x80;
          for (var i = 0; i < encodedBuf.byteLength; i++) retView[i + 1] = encodedView[i];
          return retBuf;
        }
        retBuf = new ArrayBuffer(1);
        if (sizeOnly === false) {
          retView = new Uint8Array(retBuf);
          retView[0] = this.length;
        }
        return retBuf;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalLengthBlock.prototype), "toJSON", this).call(this)), {}, {
          isIndefiniteForm: this.isIndefiniteForm,
          longFormUsed: this.longFormUsed,
          length: this.length
        });
      }
    }]);
    return LocalLengthBlock;
  }(LocalBaseBlock);
  LocalLengthBlock.NAME = "lengthBlock";
  var typeStore = {};
  var BaseBlock = function (_LocalBaseBlock3) {
    _inherits(BaseBlock, _LocalBaseBlock3);
    var _super6 = _createSuper(BaseBlock);
    function BaseBlock() {
      var _this5;
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$name = _ref4.name,
        name = _ref4$name === void 0 ? EMPTY_STRING : _ref4$name,
        _ref4$optional = _ref4.optional,
        optional = _ref4$optional === void 0 ? false : _ref4$optional,
        primitiveSchema = _ref4.primitiveSchema,
        parameters = _objectWithoutProperties(_ref4, _excluded);
      var valueBlockType = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, BaseBlock);
      _this5 = _super6.call(this, parameters);
      _this5.name = name;
      _this5.optional = optional;
      if (primitiveSchema) {
        _this5.primitiveSchema = primitiveSchema;
      }
      _this5.idBlock = new LocalIdentificationBlock(parameters);
      _this5.lenBlock = new LocalLengthBlock(parameters);
      _this5.valueBlock = valueBlockType ? new valueBlockType(parameters) : new ValueBlock(parameters);
      return _this5;
    }
    _createClass(BaseBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
        if (resultOffset === -1) {
          this.error = this.valueBlock.error;
          return resultOffset;
        }
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
        return resultOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        var _writer = writer || new ViewWriter();
        if (!writer) {
          prepareIndefiniteForm(this);
        }
        var idBlockBuf = this.idBlock.toBER(sizeOnly);
        _writer.write(idBlockBuf);
        if (this.lenBlock.isIndefiniteForm) {
          _writer.write(new Uint8Array([0x80]).buffer);
          this.valueBlock.toBER(sizeOnly, _writer);
          _writer.write(new ArrayBuffer(2));
        } else {
          var valueBlockBuf = this.valueBlock.toBER(sizeOnly);
          this.lenBlock.length = valueBlockBuf.byteLength;
          var lenBlockBuf = this.lenBlock.toBER(sizeOnly);
          _writer.write(lenBlockBuf);
          _writer.write(valueBlockBuf);
        }
        if (!writer) {
          return _writer.final();
        }
        return EMPTY_BUFFER;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var object = _objectSpread(_objectSpread({}, _get(_getPrototypeOf(BaseBlock.prototype), "toJSON", this).call(this)), {}, {
          idBlock: this.idBlock.toJSON(),
          lenBlock: this.lenBlock.toJSON(),
          valueBlock: this.valueBlock.toJSON(),
          name: this.name,
          optional: this.optional
        });
        if (this.primitiveSchema) object.primitiveSchema = this.primitiveSchema.toJSON();
        return object;
      }
    }, {
      key: "toString",
      value: function toString() {
        var encoding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ascii";
        if (encoding === "ascii") {
          return this.onAsciiEncoding();
        }
        return Convert.ToHex(this.toBER());
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : ").concat(Convert.ToHex(this.valueBlock.valueBeforeDecodeView));
      }
    }, {
      key: "isEqual",
      value: function isEqual(other) {
        if (this === other) {
          return true;
        }
        if (!(other instanceof this.constructor)) {
          return false;
        }
        var thisRaw = this.toBER();
        var otherRaw = other.toBER();
        return isEqualBuffer(thisRaw, otherRaw);
      }
    }]);
    return BaseBlock;
  }(LocalBaseBlock);
  BaseBlock.NAME = "BaseBlock";
  function prepareIndefiniteForm(baseBlock) {
    if (baseBlock instanceof typeStore.Constructed) {
      var _iterator4 = _createForOfIteratorHelper(baseBlock.valueBlock.value),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var value = _step4.value;
          if (prepareIndefiniteForm(value)) {
            baseBlock.lenBlock.isIndefiniteForm = true;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    return !!baseBlock.lenBlock.isIndefiniteForm;
  }
  var BaseStringBlock = function (_BaseBlock) {
    _inherits(BaseStringBlock, _BaseBlock);
    var _super7 = _createSuper(BaseStringBlock);
    function BaseStringBlock() {
      var _this6;
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$value = _ref5.value,
        value = _ref5$value === void 0 ? EMPTY_STRING : _ref5$value,
        parameters = _objectWithoutProperties(_ref5, _excluded2);
      var stringValueBlockType = arguments.length > 1 ? arguments[1] : undefined;
      _classCallCheck(this, BaseStringBlock);
      _this6 = _super7.call(this, parameters, stringValueBlockType);
      if (value) {
        _this6.fromString(value);
      }
      return _this6;
    }
    _createClass(BaseStringBlock, [{
      key: "getValue",
      value: function getValue() {
        return this.valueBlock.value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.valueBlock.value = value;
      }
    }, {
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
        if (resultOffset === -1) {
          this.error = this.valueBlock.error;
          return resultOffset;
        }
        this.fromBuffer(this.valueBlock.valueHexView);
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
        return resultOffset;
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : '").concat(this.valueBlock.value, "'");
      }
    }]);
    return BaseStringBlock;
  }(BaseBlock);
  BaseStringBlock.NAME = "BaseStringBlock";
  var LocalPrimitiveValueBlock = function (_HexBlock2) {
    _inherits(LocalPrimitiveValueBlock, _HexBlock2);
    var _super8 = _createSuper(LocalPrimitiveValueBlock);
    function LocalPrimitiveValueBlock() {
      var _this7;
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$isHexOnly = _ref6.isHexOnly,
        isHexOnly = _ref6$isHexOnly === void 0 ? true : _ref6$isHexOnly,
        parameters = _objectWithoutProperties(_ref6, _excluded3);
      _classCallCheck(this, LocalPrimitiveValueBlock);
      _this7 = _super8.call(this, parameters);
      _this7.isHexOnly = isHexOnly;
      return _this7;
    }
    return _createClass(LocalPrimitiveValueBlock);
  }(HexBlock(ValueBlock));
  LocalPrimitiveValueBlock.NAME = "PrimitiveValueBlock";
  var _a$w;
  var Primitive = function (_BaseBlock2) {
    _inherits(Primitive, _BaseBlock2);
    var _super9 = _createSuper(Primitive);
    function Primitive() {
      var _this8;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Primitive);
      _this8 = _super9.call(this, parameters, LocalPrimitiveValueBlock);
      _this8.idBlock.isConstructed = false;
      return _this8;
    }
    return _createClass(Primitive);
  }(BaseBlock);
  _a$w = Primitive;
  (function () {
    typeStore.Primitive = _a$w;
  })();
  Primitive.NAME = "PRIMITIVE";
  function localChangeType(inputObject, newType) {
    if (inputObject instanceof newType) {
      return inputObject;
    }
    var newObject = new newType();
    newObject.idBlock = inputObject.idBlock;
    newObject.lenBlock = inputObject.lenBlock;
    newObject.warnings = inputObject.warnings;
    newObject.valueBeforeDecodeView = inputObject.valueBeforeDecodeView;
    return newObject;
  }
  function localFromBER(inputBuffer) {
    var inputOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var inputLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : inputBuffer.length;
    var incomingOffset = inputOffset;
    var returnObject = new BaseBlock({}, ValueBlock);
    var baseBlock = new LocalBaseBlock();
    if (!checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)) {
      returnObject.error = baseBlock.error;
      return {
        offset: -1,
        result: returnObject
      };
    }
    var intBuffer = inputBuffer.subarray(inputOffset, inputOffset + inputLength);
    if (!intBuffer.length) {
      returnObject.error = "Zero buffer length";
      return {
        offset: -1,
        result: returnObject
      };
    }
    var resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
    if (returnObject.idBlock.warnings.length) {
      returnObject.warnings.concat(returnObject.idBlock.warnings);
    }
    if (resultOffset === -1) {
      returnObject.error = returnObject.idBlock.error;
      return {
        offset: -1,
        result: returnObject
      };
    }
    inputOffset = resultOffset;
    inputLength -= returnObject.idBlock.blockLength;
    resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
    if (returnObject.lenBlock.warnings.length) {
      returnObject.warnings.concat(returnObject.lenBlock.warnings);
    }
    if (resultOffset === -1) {
      returnObject.error = returnObject.lenBlock.error;
      return {
        offset: -1,
        result: returnObject
      };
    }
    inputOffset = resultOffset;
    inputLength -= returnObject.lenBlock.blockLength;
    if (!returnObject.idBlock.isConstructed && returnObject.lenBlock.isIndefiniteForm) {
      returnObject.error = "Indefinite length form used for primitive encoding form";
      return {
        offset: -1,
        result: returnObject
      };
    }
    var newASN1Type = BaseBlock;
    switch (returnObject.idBlock.tagClass) {
      case 1:
        if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
          returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
          return {
            offset: -1,
            result: returnObject
          };
        }
        switch (returnObject.idBlock.tagNumber) {
          case 0:
            if (returnObject.idBlock.isConstructed && returnObject.lenBlock.length > 0) {
              returnObject.error = "Type [UNIVERSAL 0] is reserved";
              return {
                offset: -1,
                result: returnObject
              };
            }
            newASN1Type = typeStore.EndOfContent;
            break;
          case 1:
            newASN1Type = typeStore.Boolean;
            break;
          case 2:
            newASN1Type = typeStore.Integer;
            break;
          case 3:
            newASN1Type = typeStore.BitString;
            break;
          case 4:
            newASN1Type = typeStore.OctetString;
            break;
          case 5:
            newASN1Type = typeStore.Null;
            break;
          case 6:
            newASN1Type = typeStore.ObjectIdentifier;
            break;
          case 10:
            newASN1Type = typeStore.Enumerated;
            break;
          case 12:
            newASN1Type = typeStore.Utf8String;
            break;
          case 13:
            newASN1Type = typeStore.RelativeObjectIdentifier;
            break;
          case 14:
            newASN1Type = typeStore.TIME;
            break;
          case 15:
            returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
            return {
              offset: -1,
              result: returnObject
            };
          case 16:
            newASN1Type = typeStore.Sequence;
            break;
          case 17:
            newASN1Type = typeStore.Set;
            break;
          case 18:
            newASN1Type = typeStore.NumericString;
            break;
          case 19:
            newASN1Type = typeStore.PrintableString;
            break;
          case 20:
            newASN1Type = typeStore.TeletexString;
            break;
          case 21:
            newASN1Type = typeStore.VideotexString;
            break;
          case 22:
            newASN1Type = typeStore.IA5String;
            break;
          case 23:
            newASN1Type = typeStore.UTCTime;
            break;
          case 24:
            newASN1Type = typeStore.GeneralizedTime;
            break;
          case 25:
            newASN1Type = typeStore.GraphicString;
            break;
          case 26:
            newASN1Type = typeStore.VisibleString;
            break;
          case 27:
            newASN1Type = typeStore.GeneralString;
            break;
          case 28:
            newASN1Type = typeStore.UniversalString;
            break;
          case 29:
            newASN1Type = typeStore.CharacterString;
            break;
          case 30:
            newASN1Type = typeStore.BmpString;
            break;
          case 31:
            newASN1Type = typeStore.DATE;
            break;
          case 32:
            newASN1Type = typeStore.TimeOfDay;
            break;
          case 33:
            newASN1Type = typeStore.DateTime;
            break;
          case 34:
            newASN1Type = typeStore.Duration;
            break;
          default:
            {
              var newObject = returnObject.idBlock.isConstructed ? new typeStore.Constructed() : new typeStore.Primitive();
              newObject.idBlock = returnObject.idBlock;
              newObject.lenBlock = returnObject.lenBlock;
              newObject.warnings = returnObject.warnings;
              returnObject = newObject;
            }
        }
        break;
      case 2:
      case 3:
      case 4:
      default:
        {
          newASN1Type = returnObject.idBlock.isConstructed ? typeStore.Constructed : typeStore.Primitive;
        }
    }
    returnObject = localChangeType(returnObject, newASN1Type);
    resultOffset = returnObject.fromBER(inputBuffer, inputOffset, returnObject.lenBlock.isIndefiniteForm ? inputLength : returnObject.lenBlock.length);
    returnObject.valueBeforeDecodeView = inputBuffer.subarray(incomingOffset, incomingOffset + returnObject.blockLength);
    return {
      offset: resultOffset,
      result: returnObject
    };
  }
  function fromBER(inputBuffer) {
    if (!inputBuffer.byteLength) {
      var result = new BaseBlock({}, ValueBlock);
      result.error = "Input buffer has zero length";
      return {
        offset: -1,
        result: result
      };
    }
    return localFromBER(BufferSourceConverter.toUint8Array(inputBuffer).slice(), 0, inputBuffer.byteLength);
  }
  function checkLen(indefiniteLength, length) {
    if (indefiniteLength) {
      return 1;
    }
    return length;
  }
  var LocalConstructedValueBlock = function (_ValueBlock) {
    _inherits(LocalConstructedValueBlock, _ValueBlock);
    var _super10 = _createSuper(LocalConstructedValueBlock);
    function LocalConstructedValueBlock() {
      var _this9;
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref7$value = _ref7.value,
        value = _ref7$value === void 0 ? [] : _ref7$value,
        _ref7$isIndefiniteFor = _ref7.isIndefiniteForm,
        isIndefiniteForm = _ref7$isIndefiniteFor === void 0 ? false : _ref7$isIndefiniteFor,
        parameters = _objectWithoutProperties(_ref7, _excluded4);
      _classCallCheck(this, LocalConstructedValueBlock);
      _this9 = _super10.call(this, parameters);
      _this9.value = value;
      _this9.isIndefiniteForm = isIndefiniteForm;
      return _this9;
    }
    _createClass(LocalConstructedValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var view = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, view, inputOffset, inputLength)) {
          return -1;
        }
        this.valueBeforeDecodeView = view.subarray(inputOffset, inputOffset + inputLength);
        if (this.valueBeforeDecodeView.length === 0) {
          this.warnings.push("Zero buffer length");
          return inputOffset;
        }
        var currentOffset = inputOffset;
        while (checkLen(this.isIndefiniteForm, inputLength) > 0) {
          var returnObject = localFromBER(view, currentOffset, inputLength);
          if (returnObject.offset === -1) {
            this.error = returnObject.result.error;
            this.warnings.concat(returnObject.result.warnings);
            return -1;
          }
          currentOffset = returnObject.offset;
          this.blockLength += returnObject.result.blockLength;
          inputLength -= returnObject.result.blockLength;
          this.value.push(returnObject.result);
          if (this.isIndefiniteForm && returnObject.result.constructor.NAME === END_OF_CONTENT_NAME) {
            break;
          }
        }
        if (this.isIndefiniteForm) {
          if (this.value[this.value.length - 1].constructor.NAME === END_OF_CONTENT_NAME) {
            this.value.pop();
          } else {
            this.warnings.push("No EndOfContent block encoded");
          }
        }
        return currentOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        var _writer = writer || new ViewWriter();
        for (var i = 0; i < this.value.length; i++) {
          this.value[i].toBER(sizeOnly, _writer);
        }
        if (!writer) {
          return _writer.final();
        }
        return EMPTY_BUFFER;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var object = _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalConstructedValueBlock.prototype), "toJSON", this).call(this)), {}, {
          isIndefiniteForm: this.isIndefiniteForm,
          value: []
        });
        var _iterator5 = _createForOfIteratorHelper(this.value),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var value = _step5.value;
            object.value.push(value.toJSON());
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        return object;
      }
    }]);
    return LocalConstructedValueBlock;
  }(ValueBlock);
  LocalConstructedValueBlock.NAME = "ConstructedValueBlock";
  var _a$v;
  var Constructed = function (_BaseBlock3) {
    _inherits(Constructed, _BaseBlock3);
    var _super11 = _createSuper(Constructed);
    function Constructed() {
      var _this10;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Constructed);
      _this10 = _super11.call(this, parameters, LocalConstructedValueBlock);
      _this10.idBlock.isConstructed = true;
      return _this10;
    }
    _createClass(Constructed, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
        var resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
        if (resultOffset === -1) {
          this.error = this.valueBlock.error;
          return resultOffset;
        }
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        if (!this.valueBlock.error.length) this.blockLength += this.valueBlock.blockLength;
        return resultOffset;
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        var values = [];
        var _iterator6 = _createForOfIteratorHelper(this.valueBlock.value),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var value = _step6.value;
            values.push(value.toString("ascii").split("\n").map(function (o) {
              return "  ".concat(o);
            }).join("\n"));
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        var blockName = this.idBlock.tagClass === 3 ? "[".concat(this.idBlock.tagNumber, "]") : this.constructor.NAME;
        return values.length ? "".concat(blockName, " :\n").concat(values.join("\n")) : "".concat(blockName, " :");
      }
    }]);
    return Constructed;
  }(BaseBlock);
  _a$v = Constructed;
  (function () {
    typeStore.Constructed = _a$v;
  })();
  Constructed.NAME = "CONSTRUCTED";
  var LocalEndOfContentValueBlock = function (_ValueBlock2) {
    _inherits(LocalEndOfContentValueBlock, _ValueBlock2);
    var _super12 = _createSuper(LocalEndOfContentValueBlock);
    function LocalEndOfContentValueBlock() {
      _classCallCheck(this, LocalEndOfContentValueBlock);
      return _super12.apply(this, arguments);
    }
    _createClass(LocalEndOfContentValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        return inputOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly) {
        return EMPTY_BUFFER;
      }
    }]);
    return LocalEndOfContentValueBlock;
  }(ValueBlock);
  LocalEndOfContentValueBlock.override = "EndOfContentValueBlock";
  var _a$u;
  var EndOfContent = function (_BaseBlock4) {
    _inherits(EndOfContent, _BaseBlock4);
    var _super13 = _createSuper(EndOfContent);
    function EndOfContent() {
      var _this11;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, EndOfContent);
      _this11 = _super13.call(this, parameters, LocalEndOfContentValueBlock);
      _this11.idBlock.tagClass = 1;
      _this11.idBlock.tagNumber = 0;
      return _this11;
    }
    return _createClass(EndOfContent);
  }(BaseBlock);
  _a$u = EndOfContent;
  (function () {
    typeStore.EndOfContent = _a$u;
  })();
  EndOfContent.NAME = END_OF_CONTENT_NAME;
  var _a$t;
  var Null = function (_BaseBlock5) {
    _inherits(Null, _BaseBlock5);
    var _super14 = _createSuper(Null);
    function Null() {
      var _this12;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Null);
      _this12 = _super14.call(this, parameters, ValueBlock);
      _this12.idBlock.tagClass = 1;
      _this12.idBlock.tagNumber = 5;
      return _this12;
    }
    _createClass(Null, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        if (this.lenBlock.length > 0) this.warnings.push("Non-zero length of value block for Null type");
        if (!this.idBlock.error.length) this.blockLength += this.idBlock.blockLength;
        if (!this.lenBlock.error.length) this.blockLength += this.lenBlock.blockLength;
        this.blockLength += inputLength;
        if (inputOffset + inputLength > inputBuffer.byteLength) {
          this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
          return -1;
        }
        return inputOffset + inputLength;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        var retBuf = new ArrayBuffer(2);
        if (!sizeOnly) {
          var retView = new Uint8Array(retBuf);
          retView[0] = 0x05;
          retView[1] = 0x00;
        }
        if (writer) {
          writer.write(retBuf);
        }
        return retBuf;
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME);
      }
    }]);
    return Null;
  }(BaseBlock);
  _a$t = Null;
  (function () {
    typeStore.Null = _a$t;
  })();
  Null.NAME = "NULL";
  var LocalBooleanValueBlock = function (_HexBlock3) {
    _inherits(LocalBooleanValueBlock, _HexBlock3);
    var _super15 = _createSuper(LocalBooleanValueBlock);
    function LocalBooleanValueBlock() {
      var _this13;
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref8.value,
        parameters = _objectWithoutProperties(_ref8, _excluded5);
      _classCallCheck(this, LocalBooleanValueBlock);
      _this13 = _super15.call(this, parameters);
      if (parameters.valueHex) {
        _this13.valueHexView = BufferSourceConverter.toUint8Array(parameters.valueHex);
      } else {
        _this13.valueHexView = new Uint8Array(1);
      }
      if (value) {
        _this13.value = value;
      }
      return _this13;
    }
    _createClass(LocalBooleanValueBlock, [{
      key: "value",
      get: function get() {
        var _iterator7 = _createForOfIteratorHelper(this.valueHexView),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var octet = _step7.value;
            if (octet > 0) {
              return true;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        return false;
      },
      set: function set(value) {
        this.valueHexView[0] = value ? 0xFF : 0x00;
      }
    }, {
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var inputView = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
          return -1;
        }
        this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);
        if (inputLength > 1) this.warnings.push("Boolean value encoded in more then 1 octet");
        this.isHexOnly = true;
        utilDecodeTC.call(this);
        this.blockLength = inputLength;
        return inputOffset + inputLength;
      }
    }, {
      key: "toBER",
      value: function toBER() {
        return this.valueHexView.slice();
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalBooleanValueBlock.prototype), "toJSON", this).call(this)), {}, {
          value: this.value
        });
      }
    }]);
    return LocalBooleanValueBlock;
  }(HexBlock(ValueBlock));
  LocalBooleanValueBlock.NAME = "BooleanValueBlock";
  var _a$s;
  var Boolean = function (_BaseBlock6) {
    _inherits(Boolean, _BaseBlock6);
    var _super16 = _createSuper(Boolean);
    function Boolean() {
      var _this14;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Boolean);
      _this14 = _super16.call(this, parameters, LocalBooleanValueBlock);
      _this14.idBlock.tagClass = 1;
      _this14.idBlock.tagNumber = 1;
      return _this14;
    }
    _createClass(Boolean, [{
      key: "getValue",
      value: function getValue() {
        return this.valueBlock.value;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.valueBlock.value = value;
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : ").concat(this.getValue);
      }
    }]);
    return Boolean;
  }(BaseBlock);
  _a$s = Boolean;
  (function () {
    typeStore.Boolean = _a$s;
  })();
  Boolean.NAME = "BOOLEAN";
  var LocalOctetStringValueBlock = function (_HexBlock4) {
    _inherits(LocalOctetStringValueBlock, _HexBlock4);
    var _super17 = _createSuper(LocalOctetStringValueBlock);
    function LocalOctetStringValueBlock() {
      var _this15;
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref9$isConstructed = _ref9.isConstructed,
        isConstructed = _ref9$isConstructed === void 0 ? false : _ref9$isConstructed,
        parameters = _objectWithoutProperties(_ref9, _excluded6);
      _classCallCheck(this, LocalOctetStringValueBlock);
      _this15 = _super17.call(this, parameters);
      _this15.isConstructed = isConstructed;
      return _this15;
    }
    _createClass(LocalOctetStringValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var resultOffset = 0;
        if (this.isConstructed) {
          this.isHexOnly = false;
          resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
          if (resultOffset === -1) return resultOffset;
          for (var i = 0; i < this.value.length; i++) {
            var currentBlockName = this.value[i].constructor.NAME;
            if (currentBlockName === END_OF_CONTENT_NAME) {
              if (this.isIndefiniteForm) break;else {
                this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
                return -1;
              }
            }
            if (currentBlockName !== OCTET_STRING_NAME) {
              this.error = "OCTET STRING may consists of OCTET STRINGs only";
              return -1;
            }
          }
        } else {
          this.isHexOnly = true;
          resultOffset = _get(_getPrototypeOf(LocalOctetStringValueBlock.prototype), "fromBER", this).call(this, inputBuffer, inputOffset, inputLength);
          this.blockLength = inputLength;
        }
        return resultOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        if (this.isConstructed) return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
        return sizeOnly ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalOctetStringValueBlock.prototype), "toJSON", this).call(this)), {}, {
          isConstructed: this.isConstructed
        });
      }
    }]);
    return LocalOctetStringValueBlock;
  }(HexBlock(LocalConstructedValueBlock));
  LocalOctetStringValueBlock.NAME = "OctetStringValueBlock";
  var _a$r;
  var OctetString$1 = function (_BaseBlock7) {
    _inherits(OctetString, _BaseBlock7);
    var _super18 = _createSuper(OctetString);
    function OctetString() {
      var _this16;
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref10$idBlock = _ref10.idBlock,
        idBlock = _ref10$idBlock === void 0 ? {} : _ref10$idBlock,
        _ref10$lenBlock = _ref10.lenBlock,
        lenBlock = _ref10$lenBlock === void 0 ? {} : _ref10$lenBlock,
        parameters = _objectWithoutProperties(_ref10, _excluded7);
      _classCallCheck(this, OctetString);
      var _b, _c;
      (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
      _this16 = _super18.call(this, _objectSpread({
        idBlock: _objectSpread({
          isConstructed: parameters.isConstructed
        }, idBlock),
        lenBlock: _objectSpread(_objectSpread({}, lenBlock), {}, {
          isIndefiniteForm: !!parameters.isIndefiniteForm
        })
      }, parameters), LocalOctetStringValueBlock);
      _this16.idBlock.tagClass = 1;
      _this16.idBlock.tagNumber = 4;
      return _this16;
    }
    _createClass(OctetString, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        this.valueBlock.isConstructed = this.idBlock.isConstructed;
        this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
        if (inputLength === 0) {
          if (this.idBlock.error.length === 0) this.blockLength += this.idBlock.blockLength;
          if (this.lenBlock.error.length === 0) this.blockLength += this.lenBlock.blockLength;
          return inputOffset;
        }
        if (!this.valueBlock.isConstructed) {
          var view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
          var buf = view.subarray(inputOffset, inputOffset + inputLength);
          try {
            if (buf.byteLength) {
              var asn = localFromBER(buf, 0, buf.byteLength);
              if (asn.offset !== -1 && asn.offset === inputLength) {
                this.valueBlock.value = [asn.result];
              }
            }
          } catch (e) {}
        }
        return _get(_getPrototypeOf(OctetString.prototype), "fromBER", this).call(this, inputBuffer, inputOffset, inputLength);
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
          return Constructed.prototype.onAsciiEncoding.call(this);
        }
        return "".concat(this.constructor.NAME, " : ").concat(Convert.ToHex(this.valueBlock.valueHexView));
      }
    }, {
      key: "getValue",
      value: function getValue() {
        if (!this.idBlock.isConstructed) {
          return this.valueBlock.valueHexView.slice().buffer;
        }
        var array = [];
        var _iterator8 = _createForOfIteratorHelper(this.valueBlock.value),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var content = _step8.value;
            if (content instanceof OctetString) {
              array.push(content.valueBlock.valueHexView);
            }
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        return BufferSourceConverter.concat(array);
      }
    }]);
    return OctetString;
  }(BaseBlock);
  _a$r = OctetString$1;
  (function () {
    typeStore.OctetString = _a$r;
  })();
  OctetString$1.NAME = OCTET_STRING_NAME;
  var LocalBitStringValueBlock = function (_HexBlock5) {
    _inherits(LocalBitStringValueBlock, _HexBlock5);
    var _super19 = _createSuper(LocalBitStringValueBlock);
    function LocalBitStringValueBlock() {
      var _this17;
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref11$unusedBits = _ref11.unusedBits,
        unusedBits = _ref11$unusedBits === void 0 ? 0 : _ref11$unusedBits,
        _ref11$isConstructed = _ref11.isConstructed,
        isConstructed = _ref11$isConstructed === void 0 ? false : _ref11$isConstructed,
        parameters = _objectWithoutProperties(_ref11, _excluded8);
      _classCallCheck(this, LocalBitStringValueBlock);
      _this17 = _super19.call(this, parameters);
      _this17.unusedBits = unusedBits;
      _this17.isConstructed = isConstructed;
      _this17.blockLength = _this17.valueHexView.byteLength;
      return _this17;
    }
    _createClass(LocalBitStringValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        if (!inputLength) {
          return inputOffset;
        }
        var resultOffset = -1;
        if (this.isConstructed) {
          resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
          if (resultOffset === -1) return resultOffset;
          var _iterator9 = _createForOfIteratorHelper(this.value),
            _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var value = _step9.value;
              var currentBlockName = value.constructor.NAME;
              if (currentBlockName === END_OF_CONTENT_NAME) {
                if (this.isIndefiniteForm) break;else {
                  this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
                  return -1;
                }
              }
              if (currentBlockName !== BIT_STRING_NAME) {
                this.error = "BIT STRING may consists of BIT STRINGs only";
                return -1;
              }
              var valueBlock = value.valueBlock;
              if (this.unusedBits > 0 && valueBlock.unusedBits > 0) {
                this.error = "Using of \"unused bits\" inside constructive BIT STRING allowed for least one only";
                return -1;
              }
              this.unusedBits = valueBlock.unusedBits;
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
          return resultOffset;
        }
        var inputView = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
          return -1;
        }
        var intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        this.unusedBits = intBuffer[0];
        if (this.unusedBits > 7) {
          this.error = "Unused bits for BitString must be in range 0-7";
          return -1;
        }
        if (!this.unusedBits) {
          var buf = intBuffer.subarray(1);
          try {
            if (buf.byteLength) {
              var asn = localFromBER(buf, 0, buf.byteLength);
              if (asn.offset !== -1 && asn.offset === inputLength - 1) {
                this.value = [asn.result];
              }
            }
          } catch (e) {}
        }
        this.valueHexView = intBuffer.subarray(1);
        this.blockLength = intBuffer.length;
        return inputOffset + inputLength;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        if (this.isConstructed) {
          return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
        }
        if (sizeOnly) {
          return new ArrayBuffer(this.valueHexView.byteLength + 1);
        }
        if (!this.valueHexView.byteLength) {
          return EMPTY_BUFFER;
        }
        var retView = new Uint8Array(this.valueHexView.length + 1);
        retView[0] = this.unusedBits;
        retView.set(this.valueHexView, 1);
        return retView.buffer;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalBitStringValueBlock.prototype), "toJSON", this).call(this)), {}, {
          unusedBits: this.unusedBits,
          isConstructed: this.isConstructed
        });
      }
    }]);
    return LocalBitStringValueBlock;
  }(HexBlock(LocalConstructedValueBlock));
  LocalBitStringValueBlock.NAME = "BitStringValueBlock";
  var _a$q;
  var BitString$1 = function (_BaseBlock8) {
    _inherits(BitString, _BaseBlock8);
    var _super20 = _createSuper(BitString);
    function BitString() {
      var _this18;
      var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref12$idBlock = _ref12.idBlock,
        idBlock = _ref12$idBlock === void 0 ? {} : _ref12$idBlock,
        _ref12$lenBlock = _ref12.lenBlock,
        lenBlock = _ref12$lenBlock === void 0 ? {} : _ref12$lenBlock,
        parameters = _objectWithoutProperties(_ref12, _excluded9);
      _classCallCheck(this, BitString);
      var _b, _c;
      (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
      _this18 = _super20.call(this, _objectSpread({
        idBlock: _objectSpread({
          isConstructed: parameters.isConstructed
        }, idBlock),
        lenBlock: _objectSpread(_objectSpread({}, lenBlock), {}, {
          isIndefiniteForm: !!parameters.isIndefiniteForm
        })
      }, parameters), LocalBitStringValueBlock);
      _this18.idBlock.tagClass = 1;
      _this18.idBlock.tagNumber = 3;
      return _this18;
    }
    _createClass(BitString, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        this.valueBlock.isConstructed = this.idBlock.isConstructed;
        this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
        return _get(_getPrototypeOf(BitString.prototype), "fromBER", this).call(this, inputBuffer, inputOffset, inputLength);
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
          return Constructed.prototype.onAsciiEncoding.call(this);
        } else {
          var bits = [];
          var valueHex = this.valueBlock.valueHexView;
          var _iterator10 = _createForOfIteratorHelper(valueHex),
            _step10;
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var byte = _step10.value;
              bits.push(byte.toString(2).padStart(8, "0"));
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
          var bitsStr = bits.join("");
          return "".concat(this.constructor.NAME, " : ").concat(bitsStr.substring(0, bitsStr.length - this.valueBlock.unusedBits));
        }
      }
    }]);
    return BitString;
  }(BaseBlock);
  _a$q = BitString$1;
  (function () {
    typeStore.BitString = _a$q;
  })();
  BitString$1.NAME = BIT_STRING_NAME;
  var _a$p;
  function viewAdd(first, second) {
    var c = new Uint8Array([0]);
    var firstView = new Uint8Array(first);
    var secondView = new Uint8Array(second);
    var firstViewCopy = firstView.slice(0);
    var firstViewCopyLength = firstViewCopy.length - 1;
    var secondViewCopy = secondView.slice(0);
    var secondViewCopyLength = secondViewCopy.length - 1;
    var value = 0;
    var max = secondViewCopyLength < firstViewCopyLength ? firstViewCopyLength : secondViewCopyLength;
    var counter = 0;
    for (var i = max; i >= 0; i--, counter++) {
      switch (true) {
        case counter < secondViewCopy.length:
          value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
          break;
        default:
          value = firstViewCopy[firstViewCopyLength - counter] + c[0];
      }
      c[0] = value / 10;
      switch (true) {
        case counter >= firstViewCopy.length:
          firstViewCopy = utilConcatView(new Uint8Array([value % 10]), firstViewCopy);
          break;
        default:
          firstViewCopy[firstViewCopyLength - counter] = value % 10;
      }
    }
    if (c[0] > 0) firstViewCopy = utilConcatView(c, firstViewCopy);
    return firstViewCopy;
  }
  function power2(n) {
    if (n >= powers2.length) {
      for (var p = powers2.length; p <= n; p++) {
        var c = new Uint8Array([0]);
        var digits = powers2[p - 1].slice(0);
        for (var i = digits.length - 1; i >= 0; i--) {
          var newValue = new Uint8Array([(digits[i] << 1) + c[0]]);
          c[0] = newValue[0] / 10;
          digits[i] = newValue[0] % 10;
        }
        if (c[0] > 0) digits = utilConcatView(c, digits);
        powers2.push(digits);
      }
    }
    return powers2[n];
  }
  function viewSub(first, second) {
    var b = 0;
    var firstView = new Uint8Array(first);
    var secondView = new Uint8Array(second);
    var firstViewCopy = firstView.slice(0);
    var firstViewCopyLength = firstViewCopy.length - 1;
    var secondViewCopy = secondView.slice(0);
    var secondViewCopyLength = secondViewCopy.length - 1;
    var value;
    var counter = 0;
    for (var i = secondViewCopyLength; i >= 0; i--, counter++) {
      value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
      switch (true) {
        case value < 0:
          b = 1;
          firstViewCopy[firstViewCopyLength - counter] = value + 10;
          break;
        default:
          b = 0;
          firstViewCopy[firstViewCopyLength - counter] = value;
      }
    }
    if (b > 0) {
      for (var _i6 = firstViewCopyLength - secondViewCopyLength + 1; _i6 >= 0; _i6--, counter++) {
        value = firstViewCopy[firstViewCopyLength - counter] - b;
        if (value < 0) {
          b = 1;
          firstViewCopy[firstViewCopyLength - counter] = value + 10;
        } else {
          b = 0;
          firstViewCopy[firstViewCopyLength - counter] = value;
          break;
        }
      }
    }
    return firstViewCopy.slice();
  }
  var LocalIntegerValueBlock = function (_HexBlock6) {
    _inherits(LocalIntegerValueBlock, _HexBlock6);
    var _super21 = _createSuper(LocalIntegerValueBlock);
    function LocalIntegerValueBlock() {
      var _this19;
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref13.value,
        parameters = _objectWithoutProperties(_ref13, _excluded10);
      _classCallCheck(this, LocalIntegerValueBlock);
      _this19 = _super21.call(this, parameters);
      _this19._valueDec = 0;
      if (parameters.valueHex) {
        _this19.setValueHex();
      }
      if (value !== undefined) {
        _this19.valueDec = value;
      }
      return _this19;
    }
    _createClass(LocalIntegerValueBlock, [{
      key: "setValueHex",
      value: function setValueHex() {
        if (this.valueHexView.length >= 4) {
          this.warnings.push("Too big Integer for decoding, hex only");
          this.isHexOnly = true;
          this._valueDec = 0;
        } else {
          this.isHexOnly = false;
          if (this.valueHexView.length > 0) {
            this._valueDec = utilDecodeTC.call(this);
          }
        }
      }
    }, {
      key: "valueDec",
      get: function get() {
        return this._valueDec;
      },
      set: function set(v) {
        this._valueDec = v;
        this.isHexOnly = false;
        this.valueHexView = new Uint8Array(utilEncodeTC(v));
      }
    }, {
      key: "fromDER",
      value: function fromDER(inputBuffer, inputOffset, inputLength) {
        var expectedLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var offset = this.fromBER(inputBuffer, inputOffset, inputLength);
        if (offset === -1) return offset;
        var view = this.valueHexView;
        if (view[0] === 0x00 && (view[1] & 0x80) !== 0) {
          this.valueHexView = view.subarray(1);
        } else {
          if (expectedLength !== 0) {
            if (view.length < expectedLength) {
              if (expectedLength - view.length > 1) expectedLength = view.length + 1;
              this.valueHexView = view.subarray(expectedLength - view.length);
            }
          }
        }
        return offset;
      }
    }, {
      key: "toDER",
      value: function toDER() {
        var sizeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var view = this.valueHexView;
        switch (true) {
          case (view[0] & 0x80) !== 0:
            {
              var updatedView = new Uint8Array(this.valueHexView.length + 1);
              updatedView[0] = 0x00;
              updatedView.set(view, 1);
              this.valueHexView = updatedView;
            }
            break;
          case view[0] === 0x00 && (view[1] & 0x80) === 0:
            {
              this.valueHexView = this.valueHexView.subarray(1);
            }
            break;
        }
        return this.toBER(sizeOnly);
      }
    }, {
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var resultOffset = _get(_getPrototypeOf(LocalIntegerValueBlock.prototype), "fromBER", this).call(this, inputBuffer, inputOffset, inputLength);
        if (resultOffset === -1) {
          return resultOffset;
        }
        this.setValueHex();
        return resultOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly) {
        return sizeOnly ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalIntegerValueBlock.prototype), "toJSON", this).call(this)), {}, {
          valueDec: this.valueDec
        });
      }
    }, {
      key: "toString",
      value: function toString() {
        var firstBit = this.valueHexView.length * 8 - 1;
        var digits = new Uint8Array(this.valueHexView.length * 8 / 3);
        var bitNumber = 0;
        var currentByte;
        var asn1View = this.valueHexView;
        var result = "";
        var flag = false;
        for (var byteNumber = asn1View.byteLength - 1; byteNumber >= 0; byteNumber--) {
          currentByte = asn1View[byteNumber];
          for (var i = 0; i < 8; i++) {
            if ((currentByte & 1) === 1) {
              switch (bitNumber) {
                case firstBit:
                  digits = viewSub(power2(bitNumber), digits);
                  result = "-";
                  break;
                default:
                  digits = viewAdd(digits, power2(bitNumber));
              }
            }
            bitNumber++;
            currentByte >>= 1;
          }
        }
        for (var _i7 = 0; _i7 < digits.length; _i7++) {
          if (digits[_i7]) flag = true;
          if (flag) result += digitsString.charAt(digits[_i7]);
        }
        if (flag === false) result += digitsString.charAt(0);
        return result;
      }
    }]);
    return LocalIntegerValueBlock;
  }(HexBlock(ValueBlock));
  _a$p = LocalIntegerValueBlock;
  LocalIntegerValueBlock.NAME = "IntegerValueBlock";
  (function () {
    Object.defineProperty(_a$p.prototype, "valueHex", {
      set: function set(v) {
        this.valueHexView = new Uint8Array(v);
        this.setValueHex();
      },
      get: function get() {
        return this.valueHexView.slice().buffer;
      }
    });
  })();
  var _a$o;
  var Integer = function (_BaseBlock9) {
    _inherits(Integer, _BaseBlock9);
    var _super22 = _createSuper(Integer);
    function Integer() {
      var _this20;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Integer);
      _this20 = _super22.call(this, parameters, LocalIntegerValueBlock);
      _this20.idBlock.tagClass = 1;
      _this20.idBlock.tagNumber = 2;
      return _this20;
    }
    _createClass(Integer, [{
      key: "toBigInt",
      value: function toBigInt() {
        assertBigInt();
        return BigInt(this.valueBlock.toString());
      }
    }, {
      key: "convertToDER",
      value: function convertToDER() {
        var integer = new Integer({
          valueHex: this.valueBlock.valueHexView
        });
        integer.valueBlock.toDER();
        return integer;
      }
    }, {
      key: "convertFromDER",
      value: function convertFromDER() {
        return new Integer({
          valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
        });
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : ").concat(this.valueBlock.toString());
      }
    }], [{
      key: "fromBigInt",
      value: function fromBigInt(value) {
        assertBigInt();
        var bigIntValue = BigInt(value);
        var writer = new ViewWriter();
        var hex = bigIntValue.toString(16).replace(/^-/, "");
        var view = new Uint8Array(Convert.FromHex(hex));
        if (bigIntValue < 0) {
          var first = new Uint8Array(view.length + (view[0] & 0x80 ? 1 : 0));
          first[0] |= 0x80;
          var firstInt = BigInt("0x".concat(Convert.ToHex(first)));
          var secondInt = firstInt + bigIntValue;
          var second = BufferSourceConverter.toUint8Array(Convert.FromHex(secondInt.toString(16)));
          second[0] |= 0x80;
          writer.write(second);
        } else {
          if (view[0] & 0x80) {
            writer.write(new Uint8Array([0]));
          }
          writer.write(view);
        }
        var res = new Integer({
          valueHex: writer.final()
        });
        return res;
      }
    }]);
    return Integer;
  }(BaseBlock);
  _a$o = Integer;
  (function () {
    typeStore.Integer = _a$o;
  })();
  Integer.NAME = "INTEGER";
  var _a$n;
  var Enumerated = function (_Integer) {
    _inherits(Enumerated, _Integer);
    var _super23 = _createSuper(Enumerated);
    function Enumerated() {
      var _this21;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Enumerated);
      _this21 = _super23.call(this, parameters);
      _this21.idBlock.tagClass = 1;
      _this21.idBlock.tagNumber = 10;
      return _this21;
    }
    return _createClass(Enumerated);
  }(Integer);
  _a$n = Enumerated;
  (function () {
    typeStore.Enumerated = _a$n;
  })();
  Enumerated.NAME = "ENUMERATED";
  var LocalSidValueBlock = function (_HexBlock7) {
    _inherits(LocalSidValueBlock, _HexBlock7);
    var _super24 = _createSuper(LocalSidValueBlock);
    function LocalSidValueBlock() {
      var _this22;
      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref14$valueDec = _ref14.valueDec,
        valueDec = _ref14$valueDec === void 0 ? -1 : _ref14$valueDec,
        _ref14$isFirstSid = _ref14.isFirstSid,
        isFirstSid = _ref14$isFirstSid === void 0 ? false : _ref14$isFirstSid,
        parameters = _objectWithoutProperties(_ref14, _excluded11);
      _classCallCheck(this, LocalSidValueBlock);
      _this22 = _super24.call(this, parameters);
      _this22.valueDec = valueDec;
      _this22.isFirstSid = isFirstSid;
      return _this22;
    }
    _createClass(LocalSidValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        if (!inputLength) {
          return inputOffset;
        }
        var inputView = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
          return -1;
        }
        var intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        this.valueHexView = new Uint8Array(inputLength);
        for (var i = 0; i < inputLength; i++) {
          this.valueHexView[i] = intBuffer[i] & 0x7F;
          this.blockLength++;
          if ((intBuffer[i] & 0x80) === 0x00) break;
        }
        var tempView = new Uint8Array(this.blockLength);
        for (var _i8 = 0; _i8 < this.blockLength; _i8++) {
          tempView[_i8] = this.valueHexView[_i8];
        }
        this.valueHexView = tempView;
        if ((intBuffer[this.blockLength - 1] & 0x80) !== 0x00) {
          this.error = "End of input reached before message was fully decoded";
          return -1;
        }
        if (this.valueHexView[0] === 0x00) this.warnings.push("Needlessly long format of SID encoding");
        if (this.blockLength <= 8) this.valueDec = utilFromBase(this.valueHexView, 7);else {
          this.isHexOnly = true;
          this.warnings.push("Too big SID for decoding, hex only");
        }
        return inputOffset + this.blockLength;
      }
    }, {
      key: "valueBigInt",
      set: function set(value) {
        assertBigInt();
        var bits = BigInt(value).toString(2);
        while (bits.length % 7) {
          bits = "0" + bits;
        }
        var bytes = new Uint8Array(bits.length / 7);
        for (var i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(bits.slice(i * 7, i * 7 + 7), 2) + (i + 1 < bytes.length ? 0x80 : 0);
        }
        this.fromBER(bytes.buffer, 0, bytes.length);
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly) {
        if (this.isHexOnly) {
          if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
          var curView = this.valueHexView;
          var _retView4 = new Uint8Array(this.blockLength);
          for (var i = 0; i < this.blockLength - 1; i++) _retView4[i] = curView[i] | 0x80;
          _retView4[this.blockLength - 1] = curView[this.blockLength - 1];
          return _retView4.buffer;
        }
        var encodedBuf = utilToBase(this.valueDec, 7);
        if (encodedBuf.byteLength === 0) {
          this.error = "Error during encoding SID value";
          return EMPTY_BUFFER;
        }
        var retView = new Uint8Array(encodedBuf.byteLength);
        if (!sizeOnly) {
          var encodedView = new Uint8Array(encodedBuf);
          var len = encodedBuf.byteLength - 1;
          for (var _i9 = 0; _i9 < len; _i9++) retView[_i9] = encodedView[_i9] | 0x80;
          retView[len] = encodedView[len];
        }
        return retView;
      }
    }, {
      key: "toString",
      value: function toString() {
        var result = "";
        if (this.isHexOnly) result = Convert.ToHex(this.valueHexView);else {
          if (this.isFirstSid) {
            var sidValue = this.valueDec;
            if (this.valueDec <= 39) result = "0.";else {
              if (this.valueDec <= 79) {
                result = "1.";
                sidValue -= 40;
              } else {
                result = "2.";
                sidValue -= 80;
              }
            }
            result += sidValue.toString();
          } else result = this.valueDec.toString();
        }
        return result;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalSidValueBlock.prototype), "toJSON", this).call(this)), {}, {
          valueDec: this.valueDec,
          isFirstSid: this.isFirstSid
        });
      }
    }]);
    return LocalSidValueBlock;
  }(HexBlock(ValueBlock));
  LocalSidValueBlock.NAME = "sidBlock";
  var LocalObjectIdentifierValueBlock = function (_ValueBlock3) {
    _inherits(LocalObjectIdentifierValueBlock, _ValueBlock3);
    var _super25 = _createSuper(LocalObjectIdentifierValueBlock);
    function LocalObjectIdentifierValueBlock() {
      var _this23;
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref15$value = _ref15.value,
        value = _ref15$value === void 0 ? EMPTY_STRING : _ref15$value,
        parameters = _objectWithoutProperties(_ref15, _excluded12);
      _classCallCheck(this, LocalObjectIdentifierValueBlock);
      _this23 = _super25.call(this, parameters);
      _this23.value = [];
      if (value) {
        _this23.fromString(value);
      }
      return _this23;
    }
    _createClass(LocalObjectIdentifierValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var resultOffset = inputOffset;
        while (inputLength > 0) {
          var sidBlock = new LocalSidValueBlock();
          resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
          if (resultOffset === -1) {
            this.blockLength = 0;
            this.error = sidBlock.error;
            return resultOffset;
          }
          if (this.value.length === 0) sidBlock.isFirstSid = true;
          this.blockLength += sidBlock.blockLength;
          inputLength -= sidBlock.blockLength;
          this.value.push(sidBlock);
        }
        return resultOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly) {
        var retBuffers = [];
        for (var i = 0; i < this.value.length; i++) {
          var valueBuf = this.value[i].toBER(sizeOnly);
          if (valueBuf.byteLength === 0) {
            this.error = this.value[i].error;
            return EMPTY_BUFFER;
          }
          retBuffers.push(valueBuf);
        }
        return concat$1(retBuffers);
      }
    }, {
      key: "fromString",
      value: function fromString(string) {
        this.value = [];
        var pos1 = 0;
        var pos2 = 0;
        var sid = "";
        var flag = false;
        do {
          pos2 = string.indexOf(".", pos1);
          if (pos2 === -1) sid = string.substring(pos1);else sid = string.substring(pos1, pos2);
          pos1 = pos2 + 1;
          if (flag) {
            var sidBlock = this.value[0];
            var plus = 0;
            switch (sidBlock.valueDec) {
              case 0:
                break;
              case 1:
                plus = 40;
                break;
              case 2:
                plus = 80;
                break;
              default:
                this.value = [];
                return;
            }
            var parsedSID = parseInt(sid, 10);
            if (isNaN(parsedSID)) return;
            sidBlock.valueDec = parsedSID + plus;
            flag = false;
          } else {
            var _sidBlock = new LocalSidValueBlock();
            if (sid > Number.MAX_SAFE_INTEGER) {
              assertBigInt();
              var sidValue = BigInt(sid);
              _sidBlock.valueBigInt = sidValue;
            } else {
              _sidBlock.valueDec = parseInt(sid, 10);
              if (isNaN(_sidBlock.valueDec)) return;
            }
            if (!this.value.length) {
              _sidBlock.isFirstSid = true;
              flag = true;
            }
            this.value.push(_sidBlock);
          }
        } while (pos2 !== -1);
      }
    }, {
      key: "toString",
      value: function toString() {
        var result = "";
        var isHexOnly = false;
        for (var i = 0; i < this.value.length; i++) {
          isHexOnly = this.value[i].isHexOnly;
          var sidStr = this.value[i].toString();
          if (i !== 0) result = "".concat(result, ".");
          if (isHexOnly) {
            sidStr = "{".concat(sidStr, "}");
            if (this.value[i].isFirstSid) result = "2.{".concat(sidStr, " - 80}");else result += sidStr;
          } else result += sidStr;
        }
        return result;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var object = _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalObjectIdentifierValueBlock.prototype), "toJSON", this).call(this)), {}, {
          value: this.toString(),
          sidArray: []
        });
        for (var i = 0; i < this.value.length; i++) {
          object.sidArray.push(this.value[i].toJSON());
        }
        return object;
      }
    }]);
    return LocalObjectIdentifierValueBlock;
  }(ValueBlock);
  LocalObjectIdentifierValueBlock.NAME = "ObjectIdentifierValueBlock";
  var _a$m;
  var ObjectIdentifier$1 = function (_BaseBlock10) {
    _inherits(ObjectIdentifier, _BaseBlock10);
    var _super26 = _createSuper(ObjectIdentifier);
    function ObjectIdentifier() {
      var _this24;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, ObjectIdentifier);
      _this24 = _super26.call(this, parameters, LocalObjectIdentifierValueBlock);
      _this24.idBlock.tagClass = 1;
      _this24.idBlock.tagNumber = 6;
      return _this24;
    }
    _createClass(ObjectIdentifier, [{
      key: "getValue",
      value: function getValue() {
        return this.valueBlock.toString();
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.valueBlock.fromString(value);
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : ").concat(this.valueBlock.toString() || "empty");
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(ObjectIdentifier.prototype), "toJSON", this).call(this)), {}, {
          value: this.getValue()
        });
      }
    }]);
    return ObjectIdentifier;
  }(BaseBlock);
  _a$m = ObjectIdentifier$1;
  (function () {
    typeStore.ObjectIdentifier = _a$m;
  })();
  ObjectIdentifier$1.NAME = "OBJECT IDENTIFIER";
  var LocalRelativeSidValueBlock = function (_HexBlock8) {
    _inherits(LocalRelativeSidValueBlock, _HexBlock8);
    var _super27 = _createSuper(LocalRelativeSidValueBlock);
    function LocalRelativeSidValueBlock() {
      var _this25;
      var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref16$valueDec = _ref16.valueDec,
        valueDec = _ref16$valueDec === void 0 ? 0 : _ref16$valueDec,
        parameters = _objectWithoutProperties(_ref16, _excluded13);
      _classCallCheck(this, LocalRelativeSidValueBlock);
      _this25 = _super27.call(this, parameters);
      _this25.valueDec = valueDec;
      return _this25;
    }
    _createClass(LocalRelativeSidValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        if (inputLength === 0) return inputOffset;
        var inputView = BufferSourceConverter.toUint8Array(inputBuffer);
        if (!checkBufferParams(this, inputView, inputOffset, inputLength)) return -1;
        var intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
        this.valueHexView = new Uint8Array(inputLength);
        for (var i = 0; i < inputLength; i++) {
          this.valueHexView[i] = intBuffer[i] & 0x7F;
          this.blockLength++;
          if ((intBuffer[i] & 0x80) === 0x00) break;
        }
        var tempView = new Uint8Array(this.blockLength);
        for (var _i10 = 0; _i10 < this.blockLength; _i10++) tempView[_i10] = this.valueHexView[_i10];
        this.valueHexView = tempView;
        if ((intBuffer[this.blockLength - 1] & 0x80) !== 0x00) {
          this.error = "End of input reached before message was fully decoded";
          return -1;
        }
        if (this.valueHexView[0] === 0x00) this.warnings.push("Needlessly long format of SID encoding");
        if (this.blockLength <= 8) this.valueDec = utilFromBase(this.valueHexView, 7);else {
          this.isHexOnly = true;
          this.warnings.push("Too big SID for decoding, hex only");
        }
        return inputOffset + this.blockLength;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly) {
        if (this.isHexOnly) {
          if (sizeOnly) return new ArrayBuffer(this.valueHexView.byteLength);
          var curView = this.valueHexView;
          var _retView5 = new Uint8Array(this.blockLength);
          for (var i = 0; i < this.blockLength - 1; i++) _retView5[i] = curView[i] | 0x80;
          _retView5[this.blockLength - 1] = curView[this.blockLength - 1];
          return _retView5.buffer;
        }
        var encodedBuf = utilToBase(this.valueDec, 7);
        if (encodedBuf.byteLength === 0) {
          this.error = "Error during encoding SID value";
          return EMPTY_BUFFER;
        }
        var retView = new Uint8Array(encodedBuf.byteLength);
        if (!sizeOnly) {
          var encodedView = new Uint8Array(encodedBuf);
          var len = encodedBuf.byteLength - 1;
          for (var _i11 = 0; _i11 < len; _i11++) retView[_i11] = encodedView[_i11] | 0x80;
          retView[len] = encodedView[len];
        }
        return retView.buffer;
      }
    }, {
      key: "toString",
      value: function toString() {
        var result = "";
        if (this.isHexOnly) result = Convert.ToHex(this.valueHexView);else {
          result = this.valueDec.toString();
        }
        return result;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalRelativeSidValueBlock.prototype), "toJSON", this).call(this)), {}, {
          valueDec: this.valueDec
        });
      }
    }]);
    return LocalRelativeSidValueBlock;
  }(HexBlock(LocalBaseBlock));
  LocalRelativeSidValueBlock.NAME = "relativeSidBlock";
  var LocalRelativeObjectIdentifierValueBlock = function (_ValueBlock4) {
    _inherits(LocalRelativeObjectIdentifierValueBlock, _ValueBlock4);
    var _super28 = _createSuper(LocalRelativeObjectIdentifierValueBlock);
    function LocalRelativeObjectIdentifierValueBlock() {
      var _this26;
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref17$value = _ref17.value,
        value = _ref17$value === void 0 ? EMPTY_STRING : _ref17$value,
        parameters = _objectWithoutProperties(_ref17, _excluded14);
      _classCallCheck(this, LocalRelativeObjectIdentifierValueBlock);
      _this26 = _super28.call(this, parameters);
      _this26.value = [];
      if (value) {
        _this26.fromString(value);
      }
      return _this26;
    }
    _createClass(LocalRelativeObjectIdentifierValueBlock, [{
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var resultOffset = inputOffset;
        while (inputLength > 0) {
          var sidBlock = new LocalRelativeSidValueBlock();
          resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
          if (resultOffset === -1) {
            this.blockLength = 0;
            this.error = sidBlock.error;
            return resultOffset;
          }
          this.blockLength += sidBlock.blockLength;
          inputLength -= sidBlock.blockLength;
          this.value.push(sidBlock);
        }
        return resultOffset;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly, writer) {
        var retBuffers = [];
        for (var i = 0; i < this.value.length; i++) {
          var valueBuf = this.value[i].toBER(sizeOnly);
          if (valueBuf.byteLength === 0) {
            this.error = this.value[i].error;
            return EMPTY_BUFFER;
          }
          retBuffers.push(valueBuf);
        }
        return concat$1(retBuffers);
      }
    }, {
      key: "fromString",
      value: function fromString(string) {
        this.value = [];
        var pos1 = 0;
        var pos2 = 0;
        var sid = "";
        do {
          pos2 = string.indexOf(".", pos1);
          if (pos2 === -1) sid = string.substring(pos1);else sid = string.substring(pos1, pos2);
          pos1 = pos2 + 1;
          var sidBlock = new LocalRelativeSidValueBlock();
          sidBlock.valueDec = parseInt(sid, 10);
          if (isNaN(sidBlock.valueDec)) return true;
          this.value.push(sidBlock);
        } while (pos2 !== -1);
        return true;
      }
    }, {
      key: "toString",
      value: function toString() {
        var result = "";
        var isHexOnly = false;
        for (var i = 0; i < this.value.length; i++) {
          isHexOnly = this.value[i].isHexOnly;
          var sidStr = this.value[i].toString();
          if (i !== 0) result = "".concat(result, ".");
          if (isHexOnly) {
            sidStr = "{".concat(sidStr, "}");
            result += sidStr;
          } else result += sidStr;
        }
        return result;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var object = _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalRelativeObjectIdentifierValueBlock.prototype), "toJSON", this).call(this)), {}, {
          value: this.toString(),
          sidArray: []
        });
        for (var i = 0; i < this.value.length; i++) object.sidArray.push(this.value[i].toJSON());
        return object;
      }
    }]);
    return LocalRelativeObjectIdentifierValueBlock;
  }(ValueBlock);
  LocalRelativeObjectIdentifierValueBlock.NAME = "RelativeObjectIdentifierValueBlock";
  var _a$l;
  var RelativeObjectIdentifier = function (_BaseBlock11) {
    _inherits(RelativeObjectIdentifier, _BaseBlock11);
    var _super29 = _createSuper(RelativeObjectIdentifier);
    function RelativeObjectIdentifier() {
      var _this27;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, RelativeObjectIdentifier);
      _this27 = _super29.call(this, parameters, LocalRelativeObjectIdentifierValueBlock);
      _this27.idBlock.tagClass = 1;
      _this27.idBlock.tagNumber = 13;
      return _this27;
    }
    _createClass(RelativeObjectIdentifier, [{
      key: "getValue",
      value: function getValue() {
        return this.valueBlock.toString();
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this.valueBlock.fromString(value);
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : ").concat(this.valueBlock.toString() || "empty");
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(RelativeObjectIdentifier.prototype), "toJSON", this).call(this)), {}, {
          value: this.getValue()
        });
      }
    }]);
    return RelativeObjectIdentifier;
  }(BaseBlock);
  _a$l = RelativeObjectIdentifier;
  (function () {
    typeStore.RelativeObjectIdentifier = _a$l;
  })();
  RelativeObjectIdentifier.NAME = "RelativeObjectIdentifier";
  var _a$k;
  var Sequence = function (_Constructed) {
    _inherits(Sequence, _Constructed);
    var _super30 = _createSuper(Sequence);
    function Sequence() {
      var _this28;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Sequence);
      _this28 = _super30.call(this, parameters);
      _this28.idBlock.tagClass = 1;
      _this28.idBlock.tagNumber = 16;
      return _this28;
    }
    return _createClass(Sequence);
  }(Constructed);
  _a$k = Sequence;
  (function () {
    typeStore.Sequence = _a$k;
  })();
  Sequence.NAME = "SEQUENCE";
  var _a$j;
  var Set = function (_Constructed2) {
    _inherits(Set, _Constructed2);
    var _super31 = _createSuper(Set);
    function Set() {
      var _this29;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Set);
      _this29 = _super31.call(this, parameters);
      _this29.idBlock.tagClass = 1;
      _this29.idBlock.tagNumber = 17;
      return _this29;
    }
    return _createClass(Set);
  }(Constructed);
  _a$j = Set;
  (function () {
    typeStore.Set = _a$j;
  })();
  Set.NAME = "SET";
  var LocalStringValueBlock = function (_HexBlock9) {
    _inherits(LocalStringValueBlock, _HexBlock9);
    var _super32 = _createSuper(LocalStringValueBlock);
    function LocalStringValueBlock() {
      var _this30;
      var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parameters = Object.assign({}, (_objectDestructuringEmpty(_ref18), _ref18));
      _classCallCheck(this, LocalStringValueBlock);
      _this30 = _super32.call(this, parameters);
      _this30.isHexOnly = true;
      _this30.value = EMPTY_STRING;
      return _this30;
    }
    _createClass(LocalStringValueBlock, [{
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(LocalStringValueBlock.prototype), "toJSON", this).call(this)), {}, {
          value: this.value
        });
      }
    }]);
    return LocalStringValueBlock;
  }(HexBlock(ValueBlock));
  LocalStringValueBlock.NAME = "StringValueBlock";
  var LocalSimpleStringValueBlock = function (_LocalStringValueBloc) {
    _inherits(LocalSimpleStringValueBlock, _LocalStringValueBloc);
    var _super33 = _createSuper(LocalSimpleStringValueBlock);
    function LocalSimpleStringValueBlock() {
      _classCallCheck(this, LocalSimpleStringValueBlock);
      return _super33.apply(this, arguments);
    }
    return _createClass(LocalSimpleStringValueBlock);
  }(LocalStringValueBlock);
  LocalSimpleStringValueBlock.NAME = "SimpleStringValueBlock";
  var LocalSimpleStringBlock = function (_BaseStringBlock) {
    _inherits(LocalSimpleStringBlock, _BaseStringBlock);
    var _super34 = _createSuper(LocalSimpleStringBlock);
    function LocalSimpleStringBlock() {
      var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parameters = Object.assign({}, (_objectDestructuringEmpty(_ref19), _ref19));
      _classCallCheck(this, LocalSimpleStringBlock);
      return _super34.call(this, parameters, LocalSimpleStringValueBlock);
    }
    _createClass(LocalSimpleStringBlock, [{
      key: "fromBuffer",
      value: function fromBuffer(inputBuffer) {
        this.valueBlock.value = String.fromCharCode.apply(null, BufferSourceConverter.toUint8Array(inputBuffer));
      }
    }, {
      key: "fromString",
      value: function fromString(inputString) {
        var strLen = inputString.length;
        var view = this.valueBlock.valueHexView = new Uint8Array(strLen);
        for (var i = 0; i < strLen; i++) view[i] = inputString.charCodeAt(i);
        this.valueBlock.value = inputString;
      }
    }]);
    return LocalSimpleStringBlock;
  }(BaseStringBlock);
  LocalSimpleStringBlock.NAME = "SIMPLE STRING";
  var LocalUtf8StringValueBlock = function (_LocalSimpleStringBlo) {
    _inherits(LocalUtf8StringValueBlock, _LocalSimpleStringBlo);
    var _super35 = _createSuper(LocalUtf8StringValueBlock);
    function LocalUtf8StringValueBlock() {
      _classCallCheck(this, LocalUtf8StringValueBlock);
      return _super35.apply(this, arguments);
    }
    _createClass(LocalUtf8StringValueBlock, [{
      key: "fromBuffer",
      value: function fromBuffer(inputBuffer) {
        this.valueBlock.valueHexView = BufferSourceConverter.toUint8Array(inputBuffer);
        try {
          this.valueBlock.value = Convert.ToUtf8String(inputBuffer);
        } catch (ex) {
          this.warnings.push("Error during \"decodeURIComponent\": ".concat(ex, ", using raw string"));
          this.valueBlock.value = Convert.ToBinary(inputBuffer);
        }
      }
    }, {
      key: "fromString",
      value: function fromString(inputString) {
        this.valueBlock.valueHexView = new Uint8Array(Convert.FromUtf8String(inputString));
        this.valueBlock.value = inputString;
      }
    }]);
    return LocalUtf8StringValueBlock;
  }(LocalSimpleStringBlock);
  LocalUtf8StringValueBlock.NAME = "Utf8StringValueBlock";
  var _a$i;
  var Utf8String = function (_LocalUtf8StringValue) {
    _inherits(Utf8String, _LocalUtf8StringValue);
    var _super36 = _createSuper(Utf8String);
    function Utf8String() {
      var _this31;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Utf8String);
      _this31 = _super36.call(this, parameters);
      _this31.idBlock.tagClass = 1;
      _this31.idBlock.tagNumber = 12;
      return _this31;
    }
    return _createClass(Utf8String);
  }(LocalUtf8StringValueBlock);
  _a$i = Utf8String;
  (function () {
    typeStore.Utf8String = _a$i;
  })();
  Utf8String.NAME = "UTF8String";
  var LocalBmpStringValueBlock = function (_LocalSimpleStringBlo2) {
    _inherits(LocalBmpStringValueBlock, _LocalSimpleStringBlo2);
    var _super37 = _createSuper(LocalBmpStringValueBlock);
    function LocalBmpStringValueBlock() {
      _classCallCheck(this, LocalBmpStringValueBlock);
      return _super37.apply(this, arguments);
    }
    _createClass(LocalBmpStringValueBlock, [{
      key: "fromBuffer",
      value: function fromBuffer(inputBuffer) {
        this.valueBlock.value = Convert.ToUtf16String(inputBuffer);
        this.valueBlock.valueHexView = BufferSourceConverter.toUint8Array(inputBuffer);
      }
    }, {
      key: "fromString",
      value: function fromString(inputString) {
        this.valueBlock.value = inputString;
        this.valueBlock.valueHexView = new Uint8Array(Convert.FromUtf16String(inputString));
      }
    }]);
    return LocalBmpStringValueBlock;
  }(LocalSimpleStringBlock);
  LocalBmpStringValueBlock.NAME = "BmpStringValueBlock";
  var _a$h;
  var BmpString = function (_LocalBmpStringValueB) {
    _inherits(BmpString, _LocalBmpStringValueB);
    var _super38 = _createSuper(BmpString);
    function BmpString() {
      var _this32;
      var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parameters = Object.assign({}, (_objectDestructuringEmpty(_ref20), _ref20));
      _classCallCheck(this, BmpString);
      _this32 = _super38.call(this, parameters);
      _this32.idBlock.tagClass = 1;
      _this32.idBlock.tagNumber = 30;
      return _this32;
    }
    return _createClass(BmpString);
  }(LocalBmpStringValueBlock);
  _a$h = BmpString;
  (function () {
    typeStore.BmpString = _a$h;
  })();
  BmpString.NAME = "BMPString";
  var LocalUniversalStringValueBlock = function (_LocalSimpleStringBlo3) {
    _inherits(LocalUniversalStringValueBlock, _LocalSimpleStringBlo3);
    var _super39 = _createSuper(LocalUniversalStringValueBlock);
    function LocalUniversalStringValueBlock() {
      _classCallCheck(this, LocalUniversalStringValueBlock);
      return _super39.apply(this, arguments);
    }
    _createClass(LocalUniversalStringValueBlock, [{
      key: "fromBuffer",
      value: function fromBuffer(inputBuffer) {
        var copyBuffer = ArrayBuffer.isView(inputBuffer) ? inputBuffer.slice().buffer : inputBuffer.slice(0);
        var valueView = new Uint8Array(copyBuffer);
        for (var i = 0; i < valueView.length; i += 4) {
          valueView[i] = valueView[i + 3];
          valueView[i + 1] = valueView[i + 2];
          valueView[i + 2] = 0x00;
          valueView[i + 3] = 0x00;
        }
        this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
      }
    }, {
      key: "fromString",
      value: function fromString(inputString) {
        var strLength = inputString.length;
        var valueHexView = this.valueBlock.valueHexView = new Uint8Array(strLength * 4);
        for (var i = 0; i < strLength; i++) {
          var codeBuf = utilToBase(inputString.charCodeAt(i), 8);
          var codeView = new Uint8Array(codeBuf);
          if (codeView.length > 4) continue;
          var dif = 4 - codeView.length;
          for (var j = codeView.length - 1; j >= 0; j--) valueHexView[i * 4 + j + dif] = codeView[j];
        }
        this.valueBlock.value = inputString;
      }
    }]);
    return LocalUniversalStringValueBlock;
  }(LocalSimpleStringBlock);
  LocalUniversalStringValueBlock.NAME = "UniversalStringValueBlock";
  var _a$g;
  var UniversalString = function (_LocalUniversalString) {
    _inherits(UniversalString, _LocalUniversalString);
    var _super40 = _createSuper(UniversalString);
    function UniversalString() {
      var _this33;
      var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        parameters = Object.assign({}, (_objectDestructuringEmpty(_ref21), _ref21));
      _classCallCheck(this, UniversalString);
      _this33 = _super40.call(this, parameters);
      _this33.idBlock.tagClass = 1;
      _this33.idBlock.tagNumber = 28;
      return _this33;
    }
    return _createClass(UniversalString);
  }(LocalUniversalStringValueBlock);
  _a$g = UniversalString;
  (function () {
    typeStore.UniversalString = _a$g;
  })();
  UniversalString.NAME = "UniversalString";
  var _a$f;
  var NumericString = function (_LocalSimpleStringBlo4) {
    _inherits(NumericString, _LocalSimpleStringBlo4);
    var _super41 = _createSuper(NumericString);
    function NumericString() {
      var _this34;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, NumericString);
      _this34 = _super41.call(this, parameters);
      _this34.idBlock.tagClass = 1;
      _this34.idBlock.tagNumber = 18;
      return _this34;
    }
    return _createClass(NumericString);
  }(LocalSimpleStringBlock);
  _a$f = NumericString;
  (function () {
    typeStore.NumericString = _a$f;
  })();
  NumericString.NAME = "NumericString";
  var _a$e;
  var PrintableString = function (_LocalSimpleStringBlo5) {
    _inherits(PrintableString, _LocalSimpleStringBlo5);
    var _super42 = _createSuper(PrintableString);
    function PrintableString() {
      var _this35;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, PrintableString);
      _this35 = _super42.call(this, parameters);
      _this35.idBlock.tagClass = 1;
      _this35.idBlock.tagNumber = 19;
      return _this35;
    }
    return _createClass(PrintableString);
  }(LocalSimpleStringBlock);
  _a$e = PrintableString;
  (function () {
    typeStore.PrintableString = _a$e;
  })();
  PrintableString.NAME = "PrintableString";
  var _a$d;
  var TeletexString = function (_LocalSimpleStringBlo6) {
    _inherits(TeletexString, _LocalSimpleStringBlo6);
    var _super43 = _createSuper(TeletexString);
    function TeletexString() {
      var _this36;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, TeletexString);
      _this36 = _super43.call(this, parameters);
      _this36.idBlock.tagClass = 1;
      _this36.idBlock.tagNumber = 20;
      return _this36;
    }
    return _createClass(TeletexString);
  }(LocalSimpleStringBlock);
  _a$d = TeletexString;
  (function () {
    typeStore.TeletexString = _a$d;
  })();
  TeletexString.NAME = "TeletexString";
  var _a$c;
  var VideotexString = function (_LocalSimpleStringBlo7) {
    _inherits(VideotexString, _LocalSimpleStringBlo7);
    var _super44 = _createSuper(VideotexString);
    function VideotexString() {
      var _this37;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, VideotexString);
      _this37 = _super44.call(this, parameters);
      _this37.idBlock.tagClass = 1;
      _this37.idBlock.tagNumber = 21;
      return _this37;
    }
    return _createClass(VideotexString);
  }(LocalSimpleStringBlock);
  _a$c = VideotexString;
  (function () {
    typeStore.VideotexString = _a$c;
  })();
  VideotexString.NAME = "VideotexString";
  var _a$b;
  var IA5String = function (_LocalSimpleStringBlo8) {
    _inherits(IA5String, _LocalSimpleStringBlo8);
    var _super45 = _createSuper(IA5String);
    function IA5String() {
      var _this38;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, IA5String);
      _this38 = _super45.call(this, parameters);
      _this38.idBlock.tagClass = 1;
      _this38.idBlock.tagNumber = 22;
      return _this38;
    }
    return _createClass(IA5String);
  }(LocalSimpleStringBlock);
  _a$b = IA5String;
  (function () {
    typeStore.IA5String = _a$b;
  })();
  IA5String.NAME = "IA5String";
  var _a$a;
  var GraphicString = function (_LocalSimpleStringBlo9) {
    _inherits(GraphicString, _LocalSimpleStringBlo9);
    var _super46 = _createSuper(GraphicString);
    function GraphicString() {
      var _this39;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, GraphicString);
      _this39 = _super46.call(this, parameters);
      _this39.idBlock.tagClass = 1;
      _this39.idBlock.tagNumber = 25;
      return _this39;
    }
    return _createClass(GraphicString);
  }(LocalSimpleStringBlock);
  _a$a = GraphicString;
  (function () {
    typeStore.GraphicString = _a$a;
  })();
  GraphicString.NAME = "GraphicString";
  var _a$9;
  var VisibleString = function (_LocalSimpleStringBlo10) {
    _inherits(VisibleString, _LocalSimpleStringBlo10);
    var _super47 = _createSuper(VisibleString);
    function VisibleString() {
      var _this40;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, VisibleString);
      _this40 = _super47.call(this, parameters);
      _this40.idBlock.tagClass = 1;
      _this40.idBlock.tagNumber = 26;
      return _this40;
    }
    return _createClass(VisibleString);
  }(LocalSimpleStringBlock);
  _a$9 = VisibleString;
  (function () {
    typeStore.VisibleString = _a$9;
  })();
  VisibleString.NAME = "VisibleString";
  var _a$8;
  var GeneralString = function (_LocalSimpleStringBlo11) {
    _inherits(GeneralString, _LocalSimpleStringBlo11);
    var _super48 = _createSuper(GeneralString);
    function GeneralString() {
      var _this41;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, GeneralString);
      _this41 = _super48.call(this, parameters);
      _this41.idBlock.tagClass = 1;
      _this41.idBlock.tagNumber = 27;
      return _this41;
    }
    return _createClass(GeneralString);
  }(LocalSimpleStringBlock);
  _a$8 = GeneralString;
  (function () {
    typeStore.GeneralString = _a$8;
  })();
  GeneralString.NAME = "GeneralString";
  var _a$7;
  var CharacterString = function (_LocalSimpleStringBlo12) {
    _inherits(CharacterString, _LocalSimpleStringBlo12);
    var _super49 = _createSuper(CharacterString);
    function CharacterString() {
      var _this42;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, CharacterString);
      _this42 = _super49.call(this, parameters);
      _this42.idBlock.tagClass = 1;
      _this42.idBlock.tagNumber = 29;
      return _this42;
    }
    return _createClass(CharacterString);
  }(LocalSimpleStringBlock);
  _a$7 = CharacterString;
  (function () {
    typeStore.CharacterString = _a$7;
  })();
  CharacterString.NAME = "CharacterString";
  var _a$6;
  var UTCTime = function (_VisibleString) {
    _inherits(UTCTime, _VisibleString);
    var _super50 = _createSuper(UTCTime);
    function UTCTime() {
      var _this43;
      var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        value = _ref22.value,
        valueDate = _ref22.valueDate,
        parameters = _objectWithoutProperties(_ref22, _excluded15);
      _classCallCheck(this, UTCTime);
      _this43 = _super50.call(this, parameters);
      _this43.year = 0;
      _this43.month = 0;
      _this43.day = 0;
      _this43.hour = 0;
      _this43.minute = 0;
      _this43.second = 0;
      if (value) {
        _this43.fromString(value);
        _this43.valueBlock.valueHexView = new Uint8Array(value.length);
        for (var i = 0; i < value.length; i++) _this43.valueBlock.valueHexView[i] = value.charCodeAt(i);
      }
      if (valueDate) {
        _this43.fromDate(valueDate);
        _this43.valueBlock.valueHexView = new Uint8Array(_this43.toBuffer());
      }
      _this43.idBlock.tagClass = 1;
      _this43.idBlock.tagNumber = 23;
      return _this43;
    }
    _createClass(UTCTime, [{
      key: "fromBuffer",
      value: function fromBuffer(inputBuffer) {
        this.fromString(String.fromCharCode.apply(null, BufferSourceConverter.toUint8Array(inputBuffer)));
      }
    }, {
      key: "toBuffer",
      value: function toBuffer() {
        var str = this.toString();
        var buffer = new ArrayBuffer(str.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
        return buffer;
      }
    }, {
      key: "fromDate",
      value: function fromDate(inputDate) {
        this.year = inputDate.getUTCFullYear();
        this.month = inputDate.getUTCMonth() + 1;
        this.day = inputDate.getUTCDate();
        this.hour = inputDate.getUTCHours();
        this.minute = inputDate.getUTCMinutes();
        this.second = inputDate.getUTCSeconds();
      }
    }, {
      key: "toDate",
      value: function toDate() {
        return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
      }
    }, {
      key: "fromString",
      value: function fromString(inputString) {
        var parser = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
        var parserArray = parser.exec(inputString);
        if (parserArray === null) {
          this.error = "Wrong input string for conversion";
          return;
        }
        var year = parseInt(parserArray[1], 10);
        if (year >= 50) this.year = 1900 + year;else this.year = 2000 + year;
        this.month = parseInt(parserArray[2], 10);
        this.day = parseInt(parserArray[3], 10);
        this.hour = parseInt(parserArray[4], 10);
        this.minute = parseInt(parserArray[5], 10);
        this.second = parseInt(parserArray[6], 10);
      }
    }, {
      key: "toString",
      value: function toString() {
        var encoding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "iso";
        if (encoding === "iso") {
          var outputArray = new Array(7);
          outputArray[0] = padNumber(this.year < 2000 ? this.year - 1900 : this.year - 2000, 2);
          outputArray[1] = padNumber(this.month, 2);
          outputArray[2] = padNumber(this.day, 2);
          outputArray[3] = padNumber(this.hour, 2);
          outputArray[4] = padNumber(this.minute, 2);
          outputArray[5] = padNumber(this.second, 2);
          outputArray[6] = "Z";
          return outputArray.join("");
        }
        return _get(_getPrototypeOf(UTCTime.prototype), "toString", this).call(this, encoding);
      }
    }, {
      key: "onAsciiEncoding",
      value: function onAsciiEncoding() {
        return "".concat(this.constructor.NAME, " : ").concat(this.toDate().toISOString());
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(UTCTime.prototype), "toJSON", this).call(this)), {}, {
          year: this.year,
          month: this.month,
          day: this.day,
          hour: this.hour,
          minute: this.minute,
          second: this.second
        });
      }
    }]);
    return UTCTime;
  }(VisibleString);
  _a$6 = UTCTime;
  (function () {
    typeStore.UTCTime = _a$6;
  })();
  UTCTime.NAME = "UTCTime";
  var _a$5;
  var GeneralizedTime = function (_UTCTime) {
    _inherits(GeneralizedTime, _UTCTime);
    var _super51 = _createSuper(GeneralizedTime);
    function GeneralizedTime() {
      var _this44;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, GeneralizedTime);
      var _b;
      _this44 = _super51.call(this, parameters);
      (_b = _this44.millisecond) !== null && _b !== void 0 ? _b : _this44.millisecond = 0;
      _this44.idBlock.tagClass = 1;
      _this44.idBlock.tagNumber = 24;
      return _this44;
    }
    _createClass(GeneralizedTime, [{
      key: "fromDate",
      value: function fromDate(inputDate) {
        _get(_getPrototypeOf(GeneralizedTime.prototype), "fromDate", this).call(this, inputDate);
        this.millisecond = inputDate.getUTCMilliseconds();
      }
    }, {
      key: "toDate",
      value: function toDate() {
        return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond));
      }
    }, {
      key: "fromString",
      value: function fromString(inputString) {
        var isUTC = false;
        var timeString = "";
        var dateTimeString = "";
        var fractionPart = 0;
        var parser;
        var hourDifference = 0;
        var minuteDifference = 0;
        if (inputString[inputString.length - 1] === "Z") {
          timeString = inputString.substring(0, inputString.length - 1);
          isUTC = true;
        } else {
          var number = new Number(inputString[inputString.length - 1]);
          if (isNaN(number.valueOf())) throw new Error("Wrong input string for conversion");
          timeString = inputString;
        }
        if (isUTC) {
          if (timeString.indexOf("+") !== -1) throw new Error("Wrong input string for conversion");
          if (timeString.indexOf("-") !== -1) throw new Error("Wrong input string for conversion");
        } else {
          var multiplier = 1;
          var differencePosition = timeString.indexOf("+");
          var differenceString = "";
          if (differencePosition === -1) {
            differencePosition = timeString.indexOf("-");
            multiplier = -1;
          }
          if (differencePosition !== -1) {
            differenceString = timeString.substring(differencePosition + 1);
            timeString = timeString.substring(0, differencePosition);
            if (differenceString.length !== 2 && differenceString.length !== 4) throw new Error("Wrong input string for conversion");
            var _number = parseInt(differenceString.substring(0, 2), 10);
            if (isNaN(_number.valueOf())) throw new Error("Wrong input string for conversion");
            hourDifference = multiplier * _number;
            if (differenceString.length === 4) {
              _number = parseInt(differenceString.substring(2, 4), 10);
              if (isNaN(_number.valueOf())) throw new Error("Wrong input string for conversion");
              minuteDifference = multiplier * _number;
            }
          }
        }
        var fractionPointPosition = timeString.indexOf(".");
        if (fractionPointPosition === -1) fractionPointPosition = timeString.indexOf(",");
        if (fractionPointPosition !== -1) {
          var fractionPartCheck = new Number("0".concat(timeString.substring(fractionPointPosition)));
          if (isNaN(fractionPartCheck.valueOf())) throw new Error("Wrong input string for conversion");
          fractionPart = fractionPartCheck.valueOf();
          dateTimeString = timeString.substring(0, fractionPointPosition);
        } else dateTimeString = timeString;
        switch (true) {
          case dateTimeString.length === 8:
            parser = /(\d{4})(\d{2})(\d{2})/ig;
            if (fractionPointPosition !== -1) throw new Error("Wrong input string for conversion");
            break;
          case dateTimeString.length === 10:
            parser = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;
            if (fractionPointPosition !== -1) {
              var fractionResult = 60 * fractionPart;
              this.minute = Math.floor(fractionResult);
              fractionResult = 60 * (fractionResult - this.minute);
              this.second = Math.floor(fractionResult);
              fractionResult = 1000 * (fractionResult - this.second);
              this.millisecond = Math.floor(fractionResult);
            }
            break;
          case dateTimeString.length === 12:
            parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
            if (fractionPointPosition !== -1) {
              var _fractionResult = 60 * fractionPart;
              this.second = Math.floor(_fractionResult);
              _fractionResult = 1000 * (_fractionResult - this.second);
              this.millisecond = Math.floor(_fractionResult);
            }
            break;
          case dateTimeString.length === 14:
            parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
            if (fractionPointPosition !== -1) {
              var _fractionResult2 = 1000 * fractionPart;
              this.millisecond = Math.floor(_fractionResult2);
            }
            break;
          default:
            throw new Error("Wrong input string for conversion");
        }
        var parserArray = parser.exec(dateTimeString);
        if (parserArray === null) throw new Error("Wrong input string for conversion");
        for (var j = 1; j < parserArray.length; j++) {
          switch (j) {
            case 1:
              this.year = parseInt(parserArray[j], 10);
              break;
            case 2:
              this.month = parseInt(parserArray[j], 10);
              break;
            case 3:
              this.day = parseInt(parserArray[j], 10);
              break;
            case 4:
              this.hour = parseInt(parserArray[j], 10) + hourDifference;
              break;
            case 5:
              this.minute = parseInt(parserArray[j], 10) + minuteDifference;
              break;
            case 6:
              this.second = parseInt(parserArray[j], 10);
              break;
            default:
              throw new Error("Wrong input string for conversion");
          }
        }
        if (isUTC === false) {
          var tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
          this.year = tempDate.getUTCFullYear();
          this.month = tempDate.getUTCMonth();
          this.day = tempDate.getUTCDay();
          this.hour = tempDate.getUTCHours();
          this.minute = tempDate.getUTCMinutes();
          this.second = tempDate.getUTCSeconds();
          this.millisecond = tempDate.getUTCMilliseconds();
        }
      }
    }, {
      key: "toString",
      value: function toString() {
        var encoding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "iso";
        if (encoding === "iso") {
          var outputArray = [];
          outputArray.push(padNumber(this.year, 4));
          outputArray.push(padNumber(this.month, 2));
          outputArray.push(padNumber(this.day, 2));
          outputArray.push(padNumber(this.hour, 2));
          outputArray.push(padNumber(this.minute, 2));
          outputArray.push(padNumber(this.second, 2));
          if (this.millisecond !== 0) {
            outputArray.push(".");
            outputArray.push(padNumber(this.millisecond, 3));
          }
          outputArray.push("Z");
          return outputArray.join("");
        }
        return _get(_getPrototypeOf(GeneralizedTime.prototype), "toString", this).call(this, encoding);
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(GeneralizedTime.prototype), "toJSON", this).call(this)), {}, {
          millisecond: this.millisecond
        });
      }
    }]);
    return GeneralizedTime;
  }(UTCTime);
  _a$5 = GeneralizedTime;
  (function () {
    typeStore.GeneralizedTime = _a$5;
  })();
  GeneralizedTime.NAME = "GeneralizedTime";
  var _a$4;
  var DATE = function (_Utf8String) {
    _inherits(DATE, _Utf8String);
    var _super52 = _createSuper(DATE);
    function DATE() {
      var _this45;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, DATE);
      _this45 = _super52.call(this, parameters);
      _this45.idBlock.tagClass = 1;
      _this45.idBlock.tagNumber = 31;
      return _this45;
    }
    return _createClass(DATE);
  }(Utf8String);
  _a$4 = DATE;
  (function () {
    typeStore.DATE = _a$4;
  })();
  DATE.NAME = "DATE";
  var _a$3;
  var TimeOfDay = function (_Utf8String2) {
    _inherits(TimeOfDay, _Utf8String2);
    var _super53 = _createSuper(TimeOfDay);
    function TimeOfDay() {
      var _this46;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, TimeOfDay);
      _this46 = _super53.call(this, parameters);
      _this46.idBlock.tagClass = 1;
      _this46.idBlock.tagNumber = 32;
      return _this46;
    }
    return _createClass(TimeOfDay);
  }(Utf8String);
  _a$3 = TimeOfDay;
  (function () {
    typeStore.TimeOfDay = _a$3;
  })();
  TimeOfDay.NAME = "TimeOfDay";
  var _a$2;
  var DateTime = function (_Utf8String3) {
    _inherits(DateTime, _Utf8String3);
    var _super54 = _createSuper(DateTime);
    function DateTime() {
      var _this47;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, DateTime);
      _this47 = _super54.call(this, parameters);
      _this47.idBlock.tagClass = 1;
      _this47.idBlock.tagNumber = 33;
      return _this47;
    }
    return _createClass(DateTime);
  }(Utf8String);
  _a$2 = DateTime;
  (function () {
    typeStore.DateTime = _a$2;
  })();
  DateTime.NAME = "DateTime";
  var _a$1;
  var Duration = function (_Utf8String4) {
    _inherits(Duration, _Utf8String4);
    var _super55 = _createSuper(Duration);
    function Duration() {
      var _this48;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, Duration);
      _this48 = _super55.call(this, parameters);
      _this48.idBlock.tagClass = 1;
      _this48.idBlock.tagNumber = 34;
      return _this48;
    }
    return _createClass(Duration);
  }(Utf8String);
  _a$1 = Duration;
  (function () {
    typeStore.Duration = _a$1;
  })();
  Duration.NAME = "Duration";
  var _a;
  var TIME = function (_Utf8String5) {
    _inherits(TIME, _Utf8String5);
    var _super56 = _createSuper(TIME);
    function TIME() {
      var _this49;
      var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, TIME);
      _this49 = _super56.call(this, parameters);
      _this49.idBlock.tagClass = 1;
      _this49.idBlock.tagNumber = 14;
      return _this49;
    }
    return _createClass(TIME);
  }(Utf8String);
  _a = TIME;
  (function () {
    typeStore.TIME = _a;
  })();
  TIME.NAME = "TIME";
  var Any = _createClass(function Any() {
    var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref23$name = _ref23.name,
      name = _ref23$name === void 0 ? EMPTY_STRING : _ref23$name,
      _ref23$optional = _ref23.optional,
      optional = _ref23$optional === void 0 ? false : _ref23$optional;
    _classCallCheck(this, Any);
    this.name = name;
    this.optional = optional;
  });
  var Choice = function (_Any) {
    _inherits(Choice, _Any);
    var _super57 = _createSuper(Choice);
    function Choice() {
      var _this50;
      var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref24$value = _ref24.value,
        value = _ref24$value === void 0 ? [] : _ref24$value,
        parameters = _objectWithoutProperties(_ref24, _excluded16);
      _classCallCheck(this, Choice);
      _this50 = _super57.call(this, parameters);
      _this50.value = value;
      return _this50;
    }
    return _createClass(Choice);
  }(Any);
  var Repeated = function (_Any2) {
    _inherits(Repeated, _Any2);
    var _super58 = _createSuper(Repeated);
    function Repeated() {
      var _this51;
      var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref25$value = _ref25.value,
        value = _ref25$value === void 0 ? new Any() : _ref25$value,
        _ref25$local = _ref25.local,
        local = _ref25$local === void 0 ? false : _ref25$local,
        parameters = _objectWithoutProperties(_ref25, _excluded17);
      _classCallCheck(this, Repeated);
      _this51 = _super58.call(this, parameters);
      _this51.value = value;
      _this51.local = local;
      return _this51;
    }
    return _createClass(Repeated);
  }(Any);
  var RawData = function () {
    function RawData() {
      var _ref26 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref26$data = _ref26.data,
        data = _ref26$data === void 0 ? EMPTY_VIEW : _ref26$data;
      _classCallCheck(this, RawData);
      this.dataView = BufferSourceConverter.toUint8Array(data);
    }
    _createClass(RawData, [{
      key: "data",
      get: function get() {
        return this.dataView.slice().buffer;
      },
      set: function set(value) {
        this.dataView = BufferSourceConverter.toUint8Array(value);
      }
    }, {
      key: "fromBER",
      value: function fromBER(inputBuffer, inputOffset, inputLength) {
        var endLength = inputOffset + inputLength;
        this.dataView = BufferSourceConverter.toUint8Array(inputBuffer).subarray(inputOffset, endLength);
        return endLength;
      }
    }, {
      key: "toBER",
      value: function toBER(sizeOnly) {
        return this.dataView.slice().buffer;
      }
    }]);
    return RawData;
  }();
  function compareSchema(root, inputData, inputSchema) {
    if (inputSchema instanceof Choice) {
      for (var j = 0; j < inputSchema.value.length; j++) {
        var result = compareSchema(root, inputData, inputSchema.value[j]);
        if (result.verified) {
          return {
            verified: true,
            result: root
          };
        }
      }
      {
        var _result = {
          verified: false,
          result: {
            error: "Wrong values for Choice type"
          }
        };
        if (inputSchema.hasOwnProperty(NAME)) _result.name = inputSchema.name;
        return _result;
      }
    }
    if (inputSchema instanceof Any) {
      if (inputSchema.hasOwnProperty(NAME)) root[inputSchema.name] = inputData;
      return {
        verified: true,
        result: root
      };
    }
    if (root instanceof Object === false) {
      return {
        verified: false,
        result: {
          error: "Wrong root object"
        }
      };
    }
    if (inputData instanceof Object === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 data"
        }
      };
    }
    if (inputSchema instanceof Object === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (ID_BLOCK in inputSchema === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (FROM_BER in inputSchema.idBlock === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (TO_BER in inputSchema.idBlock === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    var encodedId = inputSchema.idBlock.toBER(false);
    if (encodedId.byteLength === 0) {
      return {
        verified: false,
        result: {
          error: "Error encoding idBlock for ASN.1 schema"
        }
      };
    }
    var decodedOffset = inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength);
    if (decodedOffset === -1) {
      return {
        verified: false,
        result: {
          error: "Error decoding idBlock for ASN.1 schema"
        }
      };
    }
    if (inputSchema.idBlock.hasOwnProperty(TAG_CLASS) === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass) {
      return {
        verified: false,
        result: root
      };
    }
    if (inputSchema.idBlock.hasOwnProperty(TAG_NUMBER) === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber) {
      return {
        verified: false,
        result: root
      };
    }
    if (inputSchema.idBlock.hasOwnProperty(IS_CONSTRUCTED) === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed) {
      return {
        verified: false,
        result: root
      };
    }
    if (!(IS_HEX_ONLY in inputSchema.idBlock)) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema"
        }
      };
    }
    if (inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly) {
      return {
        verified: false,
        result: root
      };
    }
    if (inputSchema.idBlock.isHexOnly) {
      if (VALUE_HEX_VIEW in inputSchema.idBlock === false) {
        return {
          verified: false,
          result: {
            error: "Wrong ASN.1 schema"
          }
        };
      }
      var schemaView = inputSchema.idBlock.valueHexView;
      var asn1View = inputData.idBlock.valueHexView;
      if (schemaView.length !== asn1View.length) {
        return {
          verified: false,
          result: root
        };
      }
      for (var i = 0; i < schemaView.length; i++) {
        if (schemaView[i] !== asn1View[1]) {
          return {
            verified: false,
            result: root
          };
        }
      }
    }
    if (inputSchema.name) {
      inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
      if (inputSchema.name) root[inputSchema.name] = inputData;
    }
    if (inputSchema instanceof typeStore.Constructed) {
      var admission = 0;
      var _result2 = {
        verified: false,
        result: {
          error: "Unknown error"
        }
      };
      var maxLength = inputSchema.valueBlock.value.length;
      if (maxLength > 0) {
        if (inputSchema.valueBlock.value[0] instanceof Repeated) {
          maxLength = inputData.valueBlock.value.length;
        }
      }
      if (maxLength === 0) {
        return {
          verified: true,
          result: root
        };
      }
      if (inputData.valueBlock.value.length === 0 && inputSchema.valueBlock.value.length !== 0) {
        var _optional = true;
        for (var _i12 = 0; _i12 < inputSchema.valueBlock.value.length; _i12++) _optional = _optional && (inputSchema.valueBlock.value[_i12].optional || false);
        if (_optional) {
          return {
            verified: true,
            result: root
          };
        }
        if (inputSchema.name) {
          inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
          if (inputSchema.name) delete root[inputSchema.name];
        }
        root.error = "Inconsistent object length";
        return {
          verified: false,
          result: root
        };
      }
      for (var _i13 = 0; _i13 < maxLength; _i13++) {
        if (_i13 - admission >= inputData.valueBlock.value.length) {
          if (inputSchema.valueBlock.value[_i13].optional === false) {
            var _result3 = {
              verified: false,
              result: root
            };
            root.error = "Inconsistent length between ASN.1 data and schema";
            if (inputSchema.name) {
              inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
              if (inputSchema.name) {
                delete root[inputSchema.name];
                _result3.name = inputSchema.name;
              }
            }
            return _result3;
          }
        } else {
          if (inputSchema.valueBlock.value[0] instanceof Repeated) {
            _result2 = compareSchema(root, inputData.valueBlock.value[_i13], inputSchema.valueBlock.value[0].value);
            if (_result2.verified === false) {
              if (inputSchema.valueBlock.value[0].optional) admission++;else {
                if (inputSchema.name) {
                  inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                  if (inputSchema.name) delete root[inputSchema.name];
                }
                return _result2;
              }
            }
            if (NAME in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].name.length > 0) {
              var arrayRoot = {};
              if (LOCAL in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].local) arrayRoot = inputData;else arrayRoot = root;
              if (typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined") arrayRoot[inputSchema.valueBlock.value[0].name] = [];
              arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[_i13]);
            }
          } else {
            _result2 = compareSchema(root, inputData.valueBlock.value[_i13 - admission], inputSchema.valueBlock.value[_i13]);
            if (_result2.verified === false) {
              if (inputSchema.valueBlock.value[_i13].optional) admission++;else {
                if (inputSchema.name) {
                  inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                  if (inputSchema.name) delete root[inputSchema.name];
                }
                return _result2;
              }
            }
          }
        }
      }
      if (_result2.verified === false) {
        var _result4 = {
          verified: false,
          result: root
        };
        if (inputSchema.name) {
          inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
          if (inputSchema.name) {
            delete root[inputSchema.name];
            _result4.name = inputSchema.name;
          }
        }
        return _result4;
      }
      return {
        verified: true,
        result: root
      };
    }
    if (inputSchema.primitiveSchema && VALUE_HEX_VIEW in inputData.valueBlock) {
      var asn1 = localFromBER(inputData.valueBlock.valueHexView);
      if (asn1.offset === -1) {
        var _result5 = {
          verified: false,
          result: asn1.result
        };
        if (inputSchema.name) {
          inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
          if (inputSchema.name) {
            delete root[inputSchema.name];
            _result5.name = inputSchema.name;
          }
        }
        return _result5;
      }
      return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
    }
    return {
      verified: true,
      result: root
    };
  }
  function verifySchema(inputBuffer, inputSchema) {
    if (inputSchema instanceof Object === false) {
      return {
        verified: false,
        result: {
          error: "Wrong ASN.1 schema type"
        }
      };
    }
    var asn1 = localFromBER(BufferSourceConverter.toUint8Array(inputBuffer));
    if (asn1.offset === -1) {
      return {
        verified: false,
        result: asn1.result
      };
    }
    return compareSchema(asn1.result, asn1.result, inputSchema);
  }
  var asn1js = Object.freeze({
    __proto__: null,
    Any: Any,
    BaseBlock: BaseBlock,
    BaseStringBlock: BaseStringBlock,
    BitString: BitString$1,
    BmpString: BmpString,
    Boolean: Boolean,
    CharacterString: CharacterString,
    Choice: Choice,
    Constructed: Constructed,
    DATE: DATE,
    DateTime: DateTime,
    Duration: Duration,
    EndOfContent: EndOfContent,
    Enumerated: Enumerated,
    GeneralString: GeneralString,
    GeneralizedTime: GeneralizedTime,
    GraphicString: GraphicString,
    HexBlock: HexBlock,
    IA5String: IA5String,
    Integer: Integer,
    Null: Null,
    NumericString: NumericString,
    ObjectIdentifier: ObjectIdentifier$1,
    OctetString: OctetString$1,
    Primitive: Primitive,
    PrintableString: PrintableString,
    RawData: RawData,
    RelativeObjectIdentifier: RelativeObjectIdentifier,
    Repeated: Repeated,
    Sequence: Sequence,
    Set: Set,
    TIME: TIME,
    TeletexString: TeletexString,
    TimeOfDay: TimeOfDay,
    UTCTime: UTCTime,
    UniversalString: UniversalString,
    Utf8String: Utf8String,
    ValueBlock: ValueBlock,
    VideotexString: VideotexString,
    ViewWriter: ViewWriter,
    VisibleString: VisibleString,
    compareSchema: compareSchema,
    fromBER: fromBER,
    verifySchema: verifySchema
  });
  var AsnTypeTypes;
  (function (AsnTypeTypes) {
    AsnTypeTypes[AsnTypeTypes["Sequence"] = 0] = "Sequence";
    AsnTypeTypes[AsnTypeTypes["Set"] = 1] = "Set";
    AsnTypeTypes[AsnTypeTypes["Choice"] = 2] = "Choice";
  })(AsnTypeTypes || (AsnTypeTypes = {}));
  var AsnPropTypes;
  (function (AsnPropTypes) {
    AsnPropTypes[AsnPropTypes["Any"] = 1] = "Any";
    AsnPropTypes[AsnPropTypes["Boolean"] = 2] = "Boolean";
    AsnPropTypes[AsnPropTypes["OctetString"] = 3] = "OctetString";
    AsnPropTypes[AsnPropTypes["BitString"] = 4] = "BitString";
    AsnPropTypes[AsnPropTypes["Integer"] = 5] = "Integer";
    AsnPropTypes[AsnPropTypes["Enumerated"] = 6] = "Enumerated";
    AsnPropTypes[AsnPropTypes["ObjectIdentifier"] = 7] = "ObjectIdentifier";
    AsnPropTypes[AsnPropTypes["Utf8String"] = 8] = "Utf8String";
    AsnPropTypes[AsnPropTypes["BmpString"] = 9] = "BmpString";
    AsnPropTypes[AsnPropTypes["UniversalString"] = 10] = "UniversalString";
    AsnPropTypes[AsnPropTypes["NumericString"] = 11] = "NumericString";
    AsnPropTypes[AsnPropTypes["PrintableString"] = 12] = "PrintableString";
    AsnPropTypes[AsnPropTypes["TeletexString"] = 13] = "TeletexString";
    AsnPropTypes[AsnPropTypes["VideotexString"] = 14] = "VideotexString";
    AsnPropTypes[AsnPropTypes["IA5String"] = 15] = "IA5String";
    AsnPropTypes[AsnPropTypes["GraphicString"] = 16] = "GraphicString";
    AsnPropTypes[AsnPropTypes["VisibleString"] = 17] = "VisibleString";
    AsnPropTypes[AsnPropTypes["GeneralString"] = 18] = "GeneralString";
    AsnPropTypes[AsnPropTypes["CharacterString"] = 19] = "CharacterString";
    AsnPropTypes[AsnPropTypes["UTCTime"] = 20] = "UTCTime";
    AsnPropTypes[AsnPropTypes["GeneralizedTime"] = 21] = "GeneralizedTime";
    AsnPropTypes[AsnPropTypes["DATE"] = 22] = "DATE";
    AsnPropTypes[AsnPropTypes["TimeOfDay"] = 23] = "TimeOfDay";
    AsnPropTypes[AsnPropTypes["DateTime"] = 24] = "DateTime";
    AsnPropTypes[AsnPropTypes["Duration"] = 25] = "Duration";
    AsnPropTypes[AsnPropTypes["TIME"] = 26] = "TIME";
    AsnPropTypes[AsnPropTypes["Null"] = 27] = "Null";
  })(AsnPropTypes || (AsnPropTypes = {}));
  var OctetString = function () {
    function OctetString(param) {
      _classCallCheck(this, OctetString);
      if (typeof param === "number") {
        this.buffer = new ArrayBuffer(param);
      } else {
        if (BufferSourceConverter.isBufferSource(param)) {
          this.buffer = BufferSourceConverter.toArrayBuffer(param);
        } else if (Array.isArray(param)) {
          this.buffer = new Uint8Array(param);
        } else {
          this.buffer = new ArrayBuffer(0);
        }
      }
    }
    _createClass(OctetString, [{
      key: "byteLength",
      get: function get() {
        return this.buffer.byteLength;
      }
    }, {
      key: "byteOffset",
      get: function get() {
        return 0;
      }
    }, {
      key: "fromASN",
      value: function fromASN(asn) {
        if (!(asn instanceof OctetString$1)) {
          throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
        }
        this.buffer = asn.valueBlock.valueHex;
        return this;
      }
    }, {
      key: "toASN",
      value: function toASN() {
        return new OctetString$1({
          valueHex: this.buffer
        });
      }
    }, {
      key: "toSchema",
      value: function toSchema(name) {
        return new OctetString$1({
          name: name
        });
      }
    }]);
    return OctetString;
  }();
  var AsnAnyConverter = {
    fromASN: function fromASN(value) {
      return value instanceof Null ? null : value.valueBeforeDecodeView;
    },
    toASN: function toASN(value) {
      if (value === null) {
        return new Null();
      }
      var schema = fromBER(value);
      if (schema.result.error) {
        throw new Error(schema.result.error);
      }
      return schema.result;
    }
  };
  var AsnIntegerConverter = {
    fromASN: function fromASN(value) {
      return value.valueBlock.valueHexView.byteLength >= 4 ? value.valueBlock.toString() : value.valueBlock.valueDec;
    },
    toASN: function toASN(value) {
      return new Integer({
        value: +value
      });
    }
  };
  var AsnEnumeratedConverter = {
    fromASN: function fromASN(value) {
      return value.valueBlock.valueDec;
    },
    toASN: function toASN(value) {
      return new Enumerated({
        value: value
      });
    }
  };
  var AsnBitStringConverter = {
    fromASN: function fromASN(value) {
      return value.valueBlock.valueHexView;
    },
    toASN: function toASN(value) {
      return new BitString$1({
        valueHex: value
      });
    }
  };
  var AsnObjectIdentifierConverter = {
    fromASN: function fromASN(value) {
      return value.valueBlock.toString();
    },
    toASN: function toASN(value) {
      return new ObjectIdentifier$1({
        value: value
      });
    }
  };
  var AsnBooleanConverter = {
    fromASN: function fromASN(value) {
      return value.valueBlock.value;
    },
    toASN: function toASN(value) {
      return new Boolean({
        value: value
      });
    }
  };
  var AsnOctetStringConverter = {
    fromASN: function fromASN(value) {
      return value.valueBlock.valueHexView;
    },
    toASN: function toASN(value) {
      return new OctetString$1({
        valueHex: value
      });
    }
  };
  function createStringConverter(Asn1Type) {
    return {
      fromASN: function fromASN(value) {
        return value.valueBlock.value;
      },
      toASN: function toASN(value) {
        return new Asn1Type({
          value: value
        });
      }
    };
  }
  var AsnUtf8StringConverter = createStringConverter(Utf8String);
  var AsnBmpStringConverter = createStringConverter(BmpString);
  var AsnUniversalStringConverter = createStringConverter(UniversalString);
  var AsnNumericStringConverter = createStringConverter(NumericString);
  var AsnPrintableStringConverter = createStringConverter(PrintableString);
  var AsnTeletexStringConverter = createStringConverter(TeletexString);
  var AsnVideotexStringConverter = createStringConverter(VideotexString);
  var AsnIA5StringConverter = createStringConverter(IA5String);
  var AsnGraphicStringConverter = createStringConverter(GraphicString);
  var AsnVisibleStringConverter = createStringConverter(VisibleString);
  var AsnGeneralStringConverter = createStringConverter(GeneralString);
  var AsnCharacterStringConverter = createStringConverter(CharacterString);
  var AsnUTCTimeConverter = {
    fromASN: function fromASN(value) {
      return value.toDate();
    },
    toASN: function toASN(value) {
      return new UTCTime({
        valueDate: value
      });
    }
  };
  var AsnGeneralizedTimeConverter = {
    fromASN: function fromASN(value) {
      return value.toDate();
    },
    toASN: function toASN(value) {
      return new GeneralizedTime({
        valueDate: value
      });
    }
  };
  var AsnNullConverter = {
    fromASN: function fromASN() {
      return null;
    },
    toASN: function toASN() {
      return new Null();
    }
  };
  function defaultConverter(type) {
    switch (type) {
      case AsnPropTypes.Any:
        return AsnAnyConverter;
      case AsnPropTypes.BitString:
        return AsnBitStringConverter;
      case AsnPropTypes.BmpString:
        return AsnBmpStringConverter;
      case AsnPropTypes.Boolean:
        return AsnBooleanConverter;
      case AsnPropTypes.CharacterString:
        return AsnCharacterStringConverter;
      case AsnPropTypes.Enumerated:
        return AsnEnumeratedConverter;
      case AsnPropTypes.GeneralString:
        return AsnGeneralStringConverter;
      case AsnPropTypes.GeneralizedTime:
        return AsnGeneralizedTimeConverter;
      case AsnPropTypes.GraphicString:
        return AsnGraphicStringConverter;
      case AsnPropTypes.IA5String:
        return AsnIA5StringConverter;
      case AsnPropTypes.Integer:
        return AsnIntegerConverter;
      case AsnPropTypes.Null:
        return AsnNullConverter;
      case AsnPropTypes.NumericString:
        return AsnNumericStringConverter;
      case AsnPropTypes.ObjectIdentifier:
        return AsnObjectIdentifierConverter;
      case AsnPropTypes.OctetString:
        return AsnOctetStringConverter;
      case AsnPropTypes.PrintableString:
        return AsnPrintableStringConverter;
      case AsnPropTypes.TeletexString:
        return AsnTeletexStringConverter;
      case AsnPropTypes.UTCTime:
        return AsnUTCTimeConverter;
      case AsnPropTypes.UniversalString:
        return AsnUniversalStringConverter;
      case AsnPropTypes.Utf8String:
        return AsnUtf8StringConverter;
      case AsnPropTypes.VideotexString:
        return AsnVideotexStringConverter;
      case AsnPropTypes.VisibleString:
        return AsnVisibleStringConverter;
      default:
        return null;
    }
  }
  function isConvertible$1(target) {
    if (typeof target === "function" && target.prototype) {
      if (target.prototype.toASN && target.prototype.fromASN) {
        return true;
      } else {
        return isConvertible$1(target.prototype);
      }
    } else {
      return !!(target && _typeof(target) === "object" && "toASN" in target && "fromASN" in target);
    }
  }
  function isTypeOfArray(target) {
    var _a;
    if (target) {
      var _proto = Object.getPrototypeOf(target);
      if (((_a = _proto === null || _proto === void 0 ? void 0 : _proto.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === Array) {
        return true;
      }
      return isTypeOfArray(_proto);
    }
    return false;
  }
  function isArrayEqual(bytes1, bytes2) {
    if (!(bytes1 && bytes2)) {
      return false;
    }
    if (bytes1.byteLength !== bytes2.byteLength) {
      return false;
    }
    var b1 = new Uint8Array(bytes1);
    var b2 = new Uint8Array(bytes2);
    for (var i = 0; i < bytes1.byteLength; i++) {
      if (b1[i] !== b2[i]) {
        return false;
      }
    }
    return true;
  }
  var AsnSchemaStorage = function () {
    function AsnSchemaStorage() {
      _classCallCheck(this, AsnSchemaStorage);
      this.items = new WeakMap();
    }
    _createClass(AsnSchemaStorage, [{
      key: "has",
      value: function has(target) {
        return this.items.has(target);
      }
    }, {
      key: "get",
      value: function get(target) {
        var checkSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var schema = this.items.get(target);
        if (!schema) {
          throw new Error("Cannot get schema for '".concat(target.prototype.constructor.name, "' target"));
        }
        if (checkSchema && !schema.schema) {
          throw new Error("Schema '".concat(target.prototype.constructor.name, "' doesn't contain ASN.1 schema. Call 'AsnSchemaStorage.cache'."));
        }
        return schema;
      }
    }, {
      key: "cache",
      value: function cache(target) {
        var schema = this.get(target);
        if (!schema.schema) {
          schema.schema = this.create(target, true);
        }
      }
    }, {
      key: "createDefault",
      value: function createDefault(target) {
        var schema = {
          type: AsnTypeTypes.Sequence,
          items: {}
        };
        var parentSchema = this.findParentSchema(target);
        if (parentSchema) {
          Object.assign(schema, parentSchema);
          schema.items = Object.assign({}, schema.items, parentSchema.items);
        }
        return schema;
      }
    }, {
      key: "create",
      value: function create(target, useNames) {
        var schema = this.items.get(target) || this.createDefault(target);
        var asn1Value = [];
        for (var key in schema.items) {
          var item = schema.items[key];
          var name = useNames ? key : "";
          var asn1Item = void 0;
          if (typeof item.type === "number") {
            var Asn1TypeName = AsnPropTypes[item.type];
            var Asn1Type = asn1js[Asn1TypeName];
            if (!Asn1Type) {
              throw new Error("Cannot get ASN1 class by name '".concat(Asn1TypeName, "'"));
            }
            asn1Item = new Asn1Type({
              name: name
            });
          } else if (isConvertible$1(item.type)) {
            var instance = new item.type();
            asn1Item = instance.toSchema(name);
          } else if (item.optional) {
            var itemSchema = this.get(item.type);
            if (itemSchema.type === AsnTypeTypes.Choice) {
              asn1Item = new Any({
                name: name
              });
            } else {
              asn1Item = this.create(item.type, false);
              asn1Item.name = name;
            }
          } else {
            asn1Item = new Any({
              name: name
            });
          }
          var optional = !!item.optional || item.defaultValue !== undefined;
          if (item.repeated) {
            asn1Item.name = "";
            var Container = item.repeated === "set" ? Set : Sequence;
            asn1Item = new Container({
              name: "",
              value: [new Repeated({
                name: name,
                value: asn1Item
              })]
            });
          }
          if (item.context !== null && item.context !== undefined) {
            if (item.implicit) {
              if (typeof item.type === "number" || isConvertible$1(item.type)) {
                var _Container = item.repeated ? Constructed : Primitive;
                asn1Value.push(new _Container({
                  name: name,
                  optional: optional,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: item.context
                  }
                }));
              } else {
                this.cache(item.type);
                var isRepeated = !!item.repeated;
                var value = !isRepeated ? this.get(item.type, true).schema : asn1Item;
                value = "valueBlock" in value ? value.valueBlock.value : value.value;
                asn1Value.push(new Constructed({
                  name: !isRepeated ? name : "",
                  optional: optional,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: item.context
                  },
                  value: value
                }));
              }
            } else {
              asn1Value.push(new Constructed({
                optional: optional,
                idBlock: {
                  tagClass: 3,
                  tagNumber: item.context
                },
                value: [asn1Item]
              }));
            }
          } else {
            asn1Item.optional = optional;
            asn1Value.push(asn1Item);
          }
        }
        switch (schema.type) {
          case AsnTypeTypes.Sequence:
            return new Sequence({
              value: asn1Value,
              name: ""
            });
          case AsnTypeTypes.Set:
            return new Set({
              value: asn1Value,
              name: ""
            });
          case AsnTypeTypes.Choice:
            return new Choice({
              value: asn1Value,
              name: ""
            });
          default:
            throw new Error("Unsupported ASN1 type in use");
        }
      }
    }, {
      key: "set",
      value: function set(target, schema) {
        this.items.set(target, schema);
        return this;
      }
    }, {
      key: "findParentSchema",
      value: function findParentSchema(target) {
        var parent = Object.getPrototypeOf(target);
        if (parent) {
          var schema = this.items.get(parent);
          return schema || this.findParentSchema(parent);
        }
        return null;
      }
    }]);
    return AsnSchemaStorage;
  }();
  var schemaStorage$1 = new AsnSchemaStorage();
  var AsnType = function AsnType(options) {
    return function (target) {
      var schema;
      if (!schemaStorage$1.has(target)) {
        schema = schemaStorage$1.createDefault(target);
        schemaStorage$1.set(target, schema);
      } else {
        schema = schemaStorage$1.get(target);
      }
      Object.assign(schema, options);
    };
  };
  var AsnProp = function AsnProp(options) {
    return function (target, propertyKey) {
      var schema;
      if (!schemaStorage$1.has(target.constructor)) {
        schema = schemaStorage$1.createDefault(target.constructor);
        schemaStorage$1.set(target.constructor, schema);
      } else {
        schema = schemaStorage$1.get(target.constructor);
      }
      var copyOptions = Object.assign({}, options);
      if (typeof copyOptions.type === "number" && !copyOptions.converter) {
        var defaultConverter$1 = defaultConverter(options.type);
        if (!defaultConverter$1) {
          throw new Error("Cannot get default converter for property '".concat(propertyKey, "' of ").concat(target.constructor.name));
        }
        copyOptions.converter = defaultConverter$1;
      }
      schema.items[propertyKey] = copyOptions;
    };
  };
  var AsnSchemaValidationError = function (_Error) {
    _inherits(AsnSchemaValidationError, _Error);
    var _super59 = _createSuper(AsnSchemaValidationError);
    function AsnSchemaValidationError() {
      var _this52;
      _classCallCheck(this, AsnSchemaValidationError);
      _this52 = _super59.apply(this, arguments);
      _this52.schemas = [];
      return _this52;
    }
    return _createClass(AsnSchemaValidationError);
  }(_wrapNativeSuper(Error));
  var AsnParser = function () {
    function AsnParser() {
      _classCallCheck(this, AsnParser);
    }
    _createClass(AsnParser, null, [{
      key: "parse",
      value: function parse(data, target) {
        var asn1Parsed = fromBER(data);
        if (asn1Parsed.result.error) {
          throw new Error(asn1Parsed.result.error);
        }
        var res = this.fromASN(asn1Parsed.result, target);
        return res;
      }
    }, {
      key: "fromASN",
      value: function fromASN(asn1Schema, target) {
        var _this53 = this;
        var _a;
        try {
          if (isConvertible$1(target)) {
            var value = new target();
            return value.fromASN(asn1Schema);
          }
          var schema = schemaStorage$1.get(target);
          schemaStorage$1.cache(target);
          var targetSchema = schema.schema;
          if (asn1Schema.constructor === Constructed && schema.type !== AsnTypeTypes.Choice) {
            targetSchema = new Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: asn1Schema.idBlock.tagNumber
              },
              value: schema.schema.valueBlock.value
            });
            for (var key in schema.items) {
              delete asn1Schema[key];
            }
          }
          var asn1ComparedSchema = compareSchema({}, asn1Schema, targetSchema);
          if (!asn1ComparedSchema.verified) {
            throw new AsnSchemaValidationError("Data does not match to ".concat(target.name, " ASN1 schema. ").concat(asn1ComparedSchema.result.error));
          }
          var res = new target();
          if (isTypeOfArray(target)) {
            if (!("value" in asn1Schema.valueBlock && Array.isArray(asn1Schema.valueBlock.value))) {
              throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
            }
            var itemType = schema.itemType;
            if (typeof itemType === "number") {
              var converter = defaultConverter(itemType);
              if (!converter) {
                throw new Error("Cannot get default converter for array item of ".concat(target.name, " ASN1 schema"));
              }
              return target.from(asn1Schema.valueBlock.value, function (element) {
                return converter.fromASN(element);
              });
            } else {
              return target.from(asn1Schema.valueBlock.value, function (element) {
                return _this53.fromASN(element, itemType);
              });
            }
          }
          var _loop = function _loop() {
            var asn1SchemaValue = asn1ComparedSchema.result[_key5];
            if (!asn1SchemaValue) {
              return "continue";
            }
            var schemaItem = schema.items[_key5];
            var schemaItemType = schemaItem.type;
            if (typeof schemaItemType === "number" || isConvertible$1(schemaItemType)) {
              var _converter = (_a = schemaItem.converter) !== null && _a !== void 0 ? _a : isConvertible$1(schemaItemType) ? new schemaItemType() : null;
              if (!_converter) {
                throw new Error("Converter is empty");
              }
              if (schemaItem.repeated) {
                if (schemaItem.implicit) {
                  var Container = schemaItem.repeated === "sequence" ? Sequence : Set;
                  var newItem = new Container();
                  newItem.valueBlock = asn1SchemaValue.valueBlock;
                  var newItemAsn = fromBER(newItem.toBER(false));
                  if (newItemAsn.offset === -1) {
                    throw new Error("Cannot parse the child item. ".concat(newItemAsn.result.error));
                  }
                  if (!("value" in newItemAsn.result.valueBlock && Array.isArray(newItemAsn.result.valueBlock.value))) {
                    throw new Error("Cannot get items from the ASN.1 parsed value. ASN.1 object is not constructed.");
                  }
                  var _value = newItemAsn.result.valueBlock.value;
                  res[_key5] = Array.from(_value, function (element) {
                    return _converter.fromASN(element);
                  });
                } else {
                  res[_key5] = Array.from(asn1SchemaValue, function (element) {
                    return _converter.fromASN(element);
                  });
                }
              } else {
                var _value2 = asn1SchemaValue;
                if (schemaItem.implicit) {
                  var _newItem;
                  if (isConvertible$1(schemaItemType)) {
                    _newItem = new schemaItemType().toSchema("");
                  } else {
                    var Asn1TypeName = AsnPropTypes[schemaItemType];
                    var Asn1Type = asn1js[Asn1TypeName];
                    if (!Asn1Type) {
                      throw new Error("Cannot get '".concat(Asn1TypeName, "' class from asn1js module"));
                    }
                    _newItem = new Asn1Type();
                  }
                  _newItem.valueBlock = _value2.valueBlock;
                  _value2 = fromBER(_newItem.toBER(false)).result;
                }
                res[_key5] = _converter.fromASN(_value2);
              }
            } else {
              if (schemaItem.repeated) {
                if (!Array.isArray(asn1SchemaValue)) {
                  throw new Error("Cannot get list of items from the ASN.1 parsed value. ASN.1 value should be iterable.");
                }
                res[_key5] = Array.from(asn1SchemaValue, function (element) {
                  return _this53.fromASN(element, schemaItemType);
                });
              } else {
                res[_key5] = _this53.fromASN(asn1SchemaValue, schemaItemType);
              }
            }
          };
          for (var _key5 in schema.items) {
            var _ret = _loop();
            if (_ret === "continue") continue;
          }
          return res;
        } catch (error) {
          if (error instanceof AsnSchemaValidationError) {
            error.schemas.push(target.name);
          }
          throw error;
        }
      }
    }]);
    return AsnParser;
  }();
  var AsnSerializer = function () {
    function AsnSerializer() {
      _classCallCheck(this, AsnSerializer);
    }
    _createClass(AsnSerializer, null, [{
      key: "serialize",
      value: function serialize(obj) {
        if (obj instanceof BaseBlock) {
          return obj.toBER(false);
        }
        return this.toASN(obj).toBER(false);
      }
    }, {
      key: "toASN",
      value: function toASN(obj) {
        var _this54 = this;
        if (obj && _typeof(obj) === "object" && isConvertible$1(obj)) {
          return obj.toASN();
        }
        if (!(obj && _typeof(obj) === "object")) {
          throw new TypeError("Parameter 1 should be type of Object.");
        }
        var target = obj.constructor;
        var schema = schemaStorage$1.get(target);
        schemaStorage$1.cache(target);
        var asn1Value = [];
        if (schema.itemType) {
          if (!Array.isArray(obj)) {
            throw new TypeError("Parameter 1 should be type of Array.");
          }
          if (typeof schema.itemType === "number") {
            var converter = defaultConverter(schema.itemType);
            if (!converter) {
              throw new Error("Cannot get default converter for array item of ".concat(target.name, " ASN1 schema"));
            }
            asn1Value = obj.map(function (o) {
              return converter.toASN(o);
            });
          } else {
            asn1Value = obj.map(function (o) {
              return _this54.toAsnItem({
                type: schema.itemType
              }, "[]", target, o);
            });
          }
        } else {
          for (var key in schema.items) {
            var schemaItem = schema.items[key];
            var objProp = obj[key];
            if (objProp === undefined || schemaItem.defaultValue === objProp || _typeof(schemaItem.defaultValue) === "object" && _typeof(objProp) === "object" && isArrayEqual(this.serialize(schemaItem.defaultValue), this.serialize(objProp))) {
              continue;
            }
            var asn1Item = AsnSerializer.toAsnItem(schemaItem, key, target, objProp);
            if (typeof schemaItem.context === "number") {
              if (schemaItem.implicit) {
                if (!schemaItem.repeated && (typeof schemaItem.type === "number" || isConvertible$1(schemaItem.type))) {
                  var value = {};
                  value.valueHex = asn1Item instanceof Null ? asn1Item.valueBeforeDecodeView : asn1Item.valueBlock.toBER();
                  asn1Value.push(new Primitive(_objectSpread({
                    optional: schemaItem.optional,
                    idBlock: {
                      tagClass: 3,
                      tagNumber: schemaItem.context
                    }
                  }, value)));
                } else {
                  asn1Value.push(new Constructed({
                    optional: schemaItem.optional,
                    idBlock: {
                      tagClass: 3,
                      tagNumber: schemaItem.context
                    },
                    value: asn1Item.valueBlock.value
                  }));
                }
              } else {
                asn1Value.push(new Constructed({
                  optional: schemaItem.optional,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: schemaItem.context
                  },
                  value: [asn1Item]
                }));
              }
            } else if (schemaItem.repeated) {
              asn1Value = asn1Value.concat(asn1Item);
            } else {
              asn1Value.push(asn1Item);
            }
          }
        }
        var asnSchema;
        switch (schema.type) {
          case AsnTypeTypes.Sequence:
            asnSchema = new Sequence({
              value: asn1Value
            });
            break;
          case AsnTypeTypes.Set:
            asnSchema = new Set({
              value: asn1Value
            });
            break;
          case AsnTypeTypes.Choice:
            if (!asn1Value[0]) {
              throw new Error("Schema '".concat(target.name, "' has wrong data. Choice cannot be empty."));
            }
            asnSchema = asn1Value[0];
            break;
        }
        return asnSchema;
      }
    }, {
      key: "toAsnItem",
      value: function toAsnItem(schemaItem, key, target, objProp) {
        var _this55 = this;
        var asn1Item;
        if (typeof schemaItem.type === "number") {
          var converter = schemaItem.converter;
          if (!converter) {
            throw new Error("Property '".concat(key, "' doesn't have converter for type ").concat(AsnPropTypes[schemaItem.type], " in schema '").concat(target.name, "'"));
          }
          if (schemaItem.repeated) {
            if (!Array.isArray(objProp)) {
              throw new TypeError("Parameter 'objProp' should be type of Array.");
            }
            var items = Array.from(objProp, function (element) {
              return converter.toASN(element);
            });
            var Container = schemaItem.repeated === "sequence" ? Sequence : Set;
            asn1Item = new Container({
              value: items
            });
          } else {
            asn1Item = converter.toASN(objProp);
          }
        } else {
          if (schemaItem.repeated) {
            if (!Array.isArray(objProp)) {
              throw new TypeError("Parameter 'objProp' should be type of Array.");
            }
            var _items = Array.from(objProp, function (element) {
              return _this55.toASN(element);
            });
            var _Container2 = schemaItem.repeated === "sequence" ? Sequence : Set;
            asn1Item = new _Container2({
              value: _items
            });
          } else {
            asn1Item = this.toASN(objProp);
          }
        }
        return asn1Item;
      }
    }]);
    return AsnSerializer;
  }();
  var AsnConvert = function () {
    function AsnConvert() {
      _classCallCheck(this, AsnConvert);
    }
    _createClass(AsnConvert, null, [{
      key: "serialize",
      value: function serialize(obj) {
        return AsnSerializer.serialize(obj);
      }
    }, {
      key: "parse",
      value: function parse(data, target) {
        return AsnParser.parse(data, target);
      }
    }, {
      key: "toString",
      value: function toString(data) {
        var buf = BufferSourceConverter.isBufferSource(data) ? BufferSourceConverter.toArrayBuffer(data) : AsnConvert.serialize(data);
        var asn = fromBER(buf);
        if (asn.offset === -1) {
          throw new Error("Cannot decode ASN.1 data. ".concat(asn.result.error));
        }
        return asn.result.toString();
      }
    }]);
    return AsnConvert;
  }();
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }
  var JsonError = function (_Error2) {
    _inherits(JsonError, _Error2);
    var _super60 = _createSuper(JsonError);
    function JsonError(message, innerError) {
      var _this56;
      _classCallCheck(this, JsonError);
      _this56 = _super60.call(this, innerError ? "".concat(message, ". See the inner exception for more details.") : message);
      _this56.message = message;
      _this56.innerError = innerError;
      return _this56;
    }
    return _createClass(JsonError);
  }(_wrapNativeSuper(Error));
  var TransformError = function (_JsonError) {
    _inherits(TransformError, _JsonError);
    var _super61 = _createSuper(TransformError);
    function TransformError(schema, message, innerError) {
      var _this57;
      _classCallCheck(this, TransformError);
      _this57 = _super61.call(this, message, innerError);
      _this57.schema = schema;
      return _this57;
    }
    return _createClass(TransformError);
  }(JsonError);
  var ParserError = function (_TransformError) {
    _inherits(ParserError, _TransformError);
    var _super62 = _createSuper(ParserError);
    function ParserError(schema, message, innerError) {
      _classCallCheck(this, ParserError);
      return _super62.call(this, schema, "JSON doesn't match to '".concat(schema.target.name, "' schema. ").concat(message), innerError);
    }
    return _createClass(ParserError);
  }(TransformError);
  var ValidationError = function (_JsonError2) {
    _inherits(ValidationError, _JsonError2);
    var _super63 = _createSuper(ValidationError);
    function ValidationError() {
      _classCallCheck(this, ValidationError);
      return _super63.apply(this, arguments);
    }
    return _createClass(ValidationError);
  }(JsonError);
  var SerializerError = function (_JsonError3) {
    _inherits(SerializerError, _JsonError3);
    var _super64 = _createSuper(SerializerError);
    function SerializerError(schemaName, message, innerError) {
      var _this58;
      _classCallCheck(this, SerializerError);
      _this58 = _super64.call(this, "Cannot serialize by '".concat(schemaName, "' schema. ").concat(message), innerError);
      _this58.schemaName = schemaName;
      return _this58;
    }
    return _createClass(SerializerError);
  }(JsonError);
  var KeyError = function (_ParserError) {
    _inherits(KeyError, _ParserError);
    var _super65 = _createSuper(KeyError);
    function KeyError(schema, keys) {
      var _this59;
      var errors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      _classCallCheck(this, KeyError);
      _this59 = _super65.call(this, schema, "Some keys doesn't match to schema");
      _this59.keys = keys;
      _this59.errors = errors;
      return _this59;
    }
    return _createClass(KeyError);
  }(ParserError);
  var JsonPropTypes;
  (function (JsonPropTypes) {
    JsonPropTypes[JsonPropTypes["Any"] = 0] = "Any";
    JsonPropTypes[JsonPropTypes["Boolean"] = 1] = "Boolean";
    JsonPropTypes[JsonPropTypes["Number"] = 2] = "Number";
    JsonPropTypes[JsonPropTypes["String"] = 3] = "String";
  })(JsonPropTypes || (JsonPropTypes = {}));
  function checkType(value, type) {
    switch (type) {
      case JsonPropTypes.Boolean:
        return typeof value === "boolean";
      case JsonPropTypes.Number:
        return typeof value === "number";
      case JsonPropTypes.String:
        return typeof value === "string";
    }
    return true;
  }
  function throwIfTypeIsWrong(value, type) {
    if (!checkType(value, type)) {
      throw new TypeError("Value must be ".concat(JsonPropTypes[type]));
    }
  }
  function isConvertible(target) {
    if (target && target.prototype) {
      if (target.prototype.toJSON && target.prototype.fromJSON) {
        return true;
      } else {
        return isConvertible(target.prototype);
      }
    } else {
      return !!(target && target.toJSON && target.fromJSON);
    }
  }
  var JsonSchemaStorage = function () {
    function JsonSchemaStorage() {
      _classCallCheck(this, JsonSchemaStorage);
      this.items = new Map();
    }
    _createClass(JsonSchemaStorage, [{
      key: "has",
      value: function has(target) {
        return this.items.has(target) || !!this.findParentSchema(target);
      }
    }, {
      key: "get",
      value: function get(target) {
        var schema = this.items.get(target) || this.findParentSchema(target);
        if (!schema) {
          throw new Error("Cannot get schema for current target");
        }
        return schema;
      }
    }, {
      key: "create",
      value: function create(target) {
        var schema = {
          names: {}
        };
        var parentSchema = this.findParentSchema(target);
        if (parentSchema) {
          Object.assign(schema, parentSchema);
          schema.names = {};
          for (var name in parentSchema.names) {
            schema.names[name] = Object.assign({}, parentSchema.names[name]);
          }
        }
        schema.target = target;
        return schema;
      }
    }, {
      key: "set",
      value: function set(target, schema) {
        this.items.set(target, schema);
        return this;
      }
    }, {
      key: "findParentSchema",
      value: function findParentSchema(target) {
        var parent = target.__proto__;
        if (parent) {
          var schema = this.items.get(parent);
          return schema || this.findParentSchema(parent);
        }
        return null;
      }
    }]);
    return JsonSchemaStorage;
  }();
  var DEFAULT_SCHEMA = "default";
  var schemaStorage = new JsonSchemaStorage();
  var PatternValidation = function () {
    function PatternValidation(pattern) {
      _classCallCheck(this, PatternValidation);
      this.pattern = new RegExp(pattern);
    }
    _createClass(PatternValidation, [{
      key: "validate",
      value: function validate(value) {
        var pattern = new RegExp(this.pattern.source, this.pattern.flags);
        if (typeof value !== "string") {
          throw new ValidationError("Incoming value must be string");
        }
        if (!pattern.exec(value)) {
          throw new ValidationError("Value doesn't match to pattern '".concat(pattern.toString(), "'"));
        }
      }
    }]);
    return PatternValidation;
  }();
  var InclusiveValidation = function () {
    function InclusiveValidation() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MIN_VALUE;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;
      _classCallCheck(this, InclusiveValidation);
      this.min = min;
      this.max = max;
    }
    _createClass(InclusiveValidation, [{
      key: "validate",
      value: function validate(value) {
        throwIfTypeIsWrong(value, JsonPropTypes.Number);
        if (!(this.min <= value && value <= this.max)) {
          var min = this.min === Number.MIN_VALUE ? "MIN" : this.min;
          var max = this.max === Number.MAX_VALUE ? "MAX" : this.max;
          throw new ValidationError("Value doesn't match to diapason [".concat(min, ",").concat(max, "]"));
        }
      }
    }]);
    return InclusiveValidation;
  }();
  var ExclusiveValidation = function () {
    function ExclusiveValidation() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Number.MIN_VALUE;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;
      _classCallCheck(this, ExclusiveValidation);
      this.min = min;
      this.max = max;
    }
    _createClass(ExclusiveValidation, [{
      key: "validate",
      value: function validate(value) {
        throwIfTypeIsWrong(value, JsonPropTypes.Number);
        if (!(this.min < value && value < this.max)) {
          var min = this.min === Number.MIN_VALUE ? "MIN" : this.min;
          var max = this.max === Number.MAX_VALUE ? "MAX" : this.max;
          throw new ValidationError("Value doesn't match to diapason (".concat(min, ",").concat(max, ")"));
        }
      }
    }]);
    return ExclusiveValidation;
  }();
  var LengthValidation = function () {
    function LengthValidation(length, minLength, maxLength) {
      _classCallCheck(this, LengthValidation);
      this.length = length;
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
    _createClass(LengthValidation, [{
      key: "validate",
      value: function validate(value) {
        if (this.length !== undefined) {
          if (value.length !== this.length) {
            throw new ValidationError("Value length must be exactly ".concat(this.length, "."));
          }
          return;
        }
        if (this.minLength !== undefined) {
          if (value.length < this.minLength) {
            throw new ValidationError("Value length must be more than ".concat(this.minLength, "."));
          }
        }
        if (this.maxLength !== undefined) {
          if (value.length > this.maxLength) {
            throw new ValidationError("Value length must be less than ".concat(this.maxLength, "."));
          }
        }
      }
    }]);
    return LengthValidation;
  }();
  var EnumerationValidation = function () {
    function EnumerationValidation(enumeration) {
      _classCallCheck(this, EnumerationValidation);
      this.enumeration = enumeration;
    }
    _createClass(EnumerationValidation, [{
      key: "validate",
      value: function validate(value) {
        throwIfTypeIsWrong(value, JsonPropTypes.String);
        if (!this.enumeration.includes(value)) {
          throw new ValidationError("Value must be one of ".concat(this.enumeration.map(function (v) {
            return "'".concat(v, "'");
          }).join(", ")));
        }
      }
    }]);
    return EnumerationValidation;
  }();
  var JsonTransform = function () {
    function JsonTransform() {
      _classCallCheck(this, JsonTransform);
    }
    _createClass(JsonTransform, null, [{
      key: "checkValues",
      value: function checkValues(data, schemaItem) {
        var values = Array.isArray(data) ? data : [data];
        var _iterator11 = _createForOfIteratorHelper(values),
          _step11;
        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
            var value = _step11.value;
            var _iterator12 = _createForOfIteratorHelper(schemaItem.validations),
              _step12;
            try {
              for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
                var validation = _step12.value;
                if (validation instanceof LengthValidation && schemaItem.repeated) {
                  validation.validate(data);
                } else {
                  validation.validate(value);
                }
              }
            } catch (err) {
              _iterator12.e(err);
            } finally {
              _iterator12.f();
            }
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
      }
    }, {
      key: "checkTypes",
      value: function checkTypes(value, schemaItem) {
        if (schemaItem.repeated && !Array.isArray(value)) {
          throw new TypeError("Value must be Array");
        }
        if (typeof schemaItem.type === "number") {
          var values = Array.isArray(value) ? value : [value];
          var _iterator13 = _createForOfIteratorHelper(values),
            _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var v = _step13.value;
              throwIfTypeIsWrong(v, schemaItem.type);
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        }
      }
    }, {
      key: "getSchemaByName",
      value: function getSchemaByName(schema) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SCHEMA;
        return _objectSpread(_objectSpread({}, schema.names[DEFAULT_SCHEMA]), schema.names[name]);
      }
    }]);
    return JsonTransform;
  }();
  var JsonSerializer = function (_JsonTransform) {
    _inherits(JsonSerializer, _JsonTransform);
    var _super66 = _createSuper(JsonSerializer);
    function JsonSerializer() {
      _classCallCheck(this, JsonSerializer);
      return _super66.apply(this, arguments);
    }
    _createClass(JsonSerializer, null, [{
      key: "serialize",
      value: function serialize(obj, options, replacer, space) {
        var json = this.toJSON(obj, options);
        return JSON.stringify(json, replacer, space);
      }
    }, {
      key: "toJSON",
      value: function toJSON(obj) {
        var _this60 = this;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var res;
        var targetSchema = options.targetSchema;
        var schemaName = options.schemaName || DEFAULT_SCHEMA;
        if (isConvertible(obj)) {
          return obj.toJSON();
        }
        if (Array.isArray(obj)) {
          res = [];
          var _iterator14 = _createForOfIteratorHelper(obj),
            _step14;
          try {
            for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
              var item = _step14.value;
              res.push(this.toJSON(item, options));
            }
          } catch (err) {
            _iterator14.e(err);
          } finally {
            _iterator14.f();
          }
        } else if (_typeof(obj) === "object") {
          if (targetSchema && !schemaStorage.has(targetSchema)) {
            throw new JsonError("Cannot get schema for `targetSchema` param");
          }
          targetSchema = targetSchema || obj.constructor;
          if (schemaStorage.has(targetSchema)) {
            var schema = schemaStorage.get(targetSchema);
            res = {};
            var namedSchema = this.getSchemaByName(schema, schemaName);
            var _loop2 = function _loop2() {
              try {
                var _item = namedSchema[key];
                var objItem = obj[key];
                var value;
                if (_item.optional && objItem === undefined || _item.defaultValue !== undefined && objItem === _item.defaultValue) {
                  return "continue";
                }
                if (!_item.optional && objItem === undefined) {
                  throw new SerializerError(targetSchema.name, "Property '".concat(key, "' is required."));
                }
                if (typeof _item.type === "number") {
                  if (_item.converter) {
                    if (_item.repeated) {
                      value = objItem.map(function (el) {
                        return _item.converter.toJSON(el, obj);
                      });
                    } else {
                      value = _item.converter.toJSON(objItem, obj);
                    }
                  } else {
                    value = objItem;
                  }
                } else {
                  if (_item.repeated) {
                    value = objItem.map(function (el) {
                      return _this60.toJSON(el, {
                        schemaName: schemaName
                      });
                    });
                  } else {
                    value = _this60.toJSON(objItem, {
                      schemaName: schemaName
                    });
                  }
                }
                _this60.checkTypes(value, _item);
                _this60.checkValues(value, _item);
                res[_item.name || key] = value;
              } catch (e) {
                if (e instanceof SerializerError) {
                  throw e;
                } else {
                  throw new SerializerError(schema.target.name, "Property '".concat(key, "' is wrong. ").concat(e.message), e);
                }
              }
            };
            for (var key in namedSchema) {
              var _ret2 = _loop2();
              if (_ret2 === "continue") continue;
            }
          } else {
            res = {};
            for (var _key6 in obj) {
              res[_key6] = this.toJSON(obj[_key6], {
                schemaName: schemaName
              });
            }
          }
        } else {
          res = obj;
        }
        return res;
      }
    }]);
    return JsonSerializer;
  }(JsonTransform);
  var JsonParser = function (_JsonTransform2) {
    _inherits(JsonParser, _JsonTransform2);
    var _super67 = _createSuper(JsonParser);
    function JsonParser() {
      _classCallCheck(this, JsonParser);
      return _super67.apply(this, arguments);
    }
    _createClass(JsonParser, null, [{
      key: "parse",
      value: function parse(data, options) {
        var obj = JSON.parse(data);
        return this.fromJSON(obj, options);
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(target, options) {
        var _this61 = this;
        var targetSchema = options.targetSchema;
        var schemaName = options.schemaName || DEFAULT_SCHEMA;
        var obj = new targetSchema();
        if (isConvertible(obj)) {
          return obj.fromJSON(target);
        }
        var schema = schemaStorage.get(targetSchema);
        var namedSchema = this.getSchemaByName(schema, schemaName);
        var keyErrors = {};
        if (options.strictProperty && !Array.isArray(target)) {
          JsonParser.checkStrictProperty(target, namedSchema, schema);
        }
        var _loop3 = function _loop3() {
          try {
            var item = namedSchema[key];
            var name = item.name || key;
            var value = target[name];
            if (value === undefined && (item.optional || item.defaultValue !== undefined)) {
              return "continue";
            }
            if (!item.optional && value === undefined) {
              throw new ParserError(schema, "Property '".concat(name, "' is required."));
            }
            _this61.checkTypes(value, item);
            _this61.checkValues(value, item);
            if (typeof item.type === "number") {
              if (item.converter) {
                if (item.repeated) {
                  obj[key] = value.map(function (el) {
                    return item.converter.fromJSON(el, obj);
                  });
                } else {
                  obj[key] = item.converter.fromJSON(value, obj);
                }
              } else {
                obj[key] = value;
              }
            } else {
              var newOptions = _objectSpread(_objectSpread({}, options), {}, {
                targetSchema: item.type,
                schemaName: schemaName
              });
              if (item.repeated) {
                obj[key] = value.map(function (el) {
                  return _this61.fromJSON(el, newOptions);
                });
              } else {
                obj[key] = _this61.fromJSON(value, newOptions);
              }
            }
          } catch (e) {
            if (!(e instanceof ParserError)) {
              e = new ParserError(schema, "Property '".concat(key, "' is wrong. ").concat(e.message), e);
            }
            if (options.strictAllKeys) {
              keyErrors[key] = e;
            } else {
              throw e;
            }
          }
        };
        for (var key in namedSchema) {
          var _ret3 = _loop3();
          if (_ret3 === "continue") continue;
        }
        var keys = Object.keys(keyErrors);
        if (keys.length) {
          throw new KeyError(schema, keys, keyErrors);
        }
        return obj;
      }
    }, {
      key: "checkStrictProperty",
      value: function checkStrictProperty(target, namedSchema, schema) {
        var jsonProps = Object.keys(target);
        var schemaProps = Object.keys(namedSchema);
        var keys = [];
        for (var _i14 = 0, _jsonProps = jsonProps; _i14 < _jsonProps.length; _i14++) {
          var key = _jsonProps[_i14];
          if (schemaProps.indexOf(key) === -1) {
            keys.push(key);
          }
        }
        if (keys.length) {
          throw new KeyError(schema, keys);
        }
      }
    }]);
    return JsonParser;
  }(JsonTransform);
  function getValidations(item) {
    var validations = [];
    if (item.pattern) {
      validations.push(new PatternValidation(item.pattern));
    }
    if (item.type === JsonPropTypes.Number || item.type === JsonPropTypes.Any) {
      if (item.minInclusive !== undefined || item.maxInclusive !== undefined) {
        validations.push(new InclusiveValidation(item.minInclusive, item.maxInclusive));
      }
      if (item.minExclusive !== undefined || item.maxExclusive !== undefined) {
        validations.push(new ExclusiveValidation(item.minExclusive, item.maxExclusive));
      }
      if (item.enumeration !== undefined) {
        validations.push(new EnumerationValidation(item.enumeration));
      }
    }
    if (item.type === JsonPropTypes.String || item.repeated || item.type === JsonPropTypes.Any) {
      if (item.length !== undefined || item.minLength !== undefined || item.maxLength !== undefined) {
        validations.push(new LengthValidation(item.length, item.minLength, item.maxLength));
      }
    }
    return validations;
  }
  var JsonProp = function JsonProp() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return function (target, propertyKey) {
      var errorMessage = "Cannot set type for ".concat(propertyKey, " property of ").concat(target.constructor.name, " schema");
      var schema;
      if (!schemaStorage.has(target.constructor)) {
        schema = schemaStorage.create(target.constructor);
        schemaStorage.set(target.constructor, schema);
      } else {
        schema = schemaStorage.get(target.constructor);
        if (schema.target !== target.constructor) {
          schema = schemaStorage.create(target.constructor);
          schemaStorage.set(target.constructor, schema);
        }
      }
      var defaultSchema = {
        type: JsonPropTypes.Any,
        validations: []
      };
      var copyOptions = Object.assign(defaultSchema, options);
      copyOptions.validations = getValidations(copyOptions);
      if (typeof copyOptions.type !== "number") {
        if (!schemaStorage.has(copyOptions.type) && !isConvertible(copyOptions.type)) {
          throw new Error("".concat(errorMessage, ". Assigning type doesn't have schema."));
        }
      }
      var schemaNames;
      if (Array.isArray(options.schema)) {
        schemaNames = options.schema;
      } else {
        schemaNames = [options.schema || DEFAULT_SCHEMA];
      }
      var _iterator15 = _createForOfIteratorHelper(schemaNames),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var schemaName = _step15.value;
          if (!schema.names[schemaName]) {
            schema.names[schemaName] = {};
          }
          var namedSchema = schema.names[schemaName];
          namedSchema[propertyKey] = copyOptions;
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
    };
  };
  var CryptoError = function (_Error3) {
    _inherits(CryptoError, _Error3);
    var _super68 = _createSuper(CryptoError);
    function CryptoError() {
      _classCallCheck(this, CryptoError);
      return _super68.apply(this, arguments);
    }
    return _createClass(CryptoError);
  }(_wrapNativeSuper(Error));
  var AlgorithmError = function (_CryptoError) {
    _inherits(AlgorithmError, _CryptoError);
    var _super69 = _createSuper(AlgorithmError);
    function AlgorithmError() {
      _classCallCheck(this, AlgorithmError);
      return _super69.apply(this, arguments);
    }
    return _createClass(AlgorithmError);
  }(CryptoError);
  var UnsupportedOperationError = function (_CryptoError2) {
    _inherits(UnsupportedOperationError, _CryptoError2);
    var _super70 = _createSuper(UnsupportedOperationError);
    function UnsupportedOperationError(methodName) {
      _classCallCheck(this, UnsupportedOperationError);
      return _super70.call(this, "Unsupported operation: ".concat(methodName ? "".concat(methodName) : ""));
    }
    return _createClass(UnsupportedOperationError);
  }(CryptoError);
  var OperationError = function (_CryptoError3) {
    _inherits(OperationError, _CryptoError3);
    var _super71 = _createSuper(OperationError);
    function OperationError() {
      _classCallCheck(this, OperationError);
      return _super71.apply(this, arguments);
    }
    return _createClass(OperationError);
  }(CryptoError);
  var RequiredPropertyError = function (_CryptoError4) {
    _inherits(RequiredPropertyError, _CryptoError4);
    var _super72 = _createSuper(RequiredPropertyError);
    function RequiredPropertyError(propName) {
      _classCallCheck(this, RequiredPropertyError);
      return _super72.call(this, "".concat(propName, ": Missing required property"));
    }
    return _createClass(RequiredPropertyError);
  }(CryptoError);
  function isJWK(data) {
    return _typeof(data) === "object" && "kty" in data;
  }
  var ProviderCrypto = function () {
    function ProviderCrypto() {
      _classCallCheck(this, ProviderCrypto);
    }
    _createClass(ProviderCrypto, [{
      key: "digest",
      value: function () {
        var _digest = _asyncToGenerator(_regeneratorRuntime().mark(function _callee() {
          var _len5,
            args,
            _key7,
            _args = arguments;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                for (_len5 = _args.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
                  args[_key7] = _args[_key7];
                }
                this.checkDigest.apply(this, args);
                return _context.abrupt("return", this.onDigest.apply(this, args));
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function digest() {
          return _digest.apply(this, arguments);
        }
        return digest;
      }()
    }, {
      key: "checkDigest",
      value: function checkDigest(algorithm, data) {
        this.checkAlgorithmName(algorithm);
      }
    }, {
      key: "onDigest",
      value: function () {
        var _onDigest = _asyncToGenerator(_regeneratorRuntime().mark(function _callee2(algorithm, data) {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                throw new UnsupportedOperationError("digest");
              case 1:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function onDigest(_x, _x2) {
          return _onDigest.apply(this, arguments);
        }
        return onDigest;
      }()
    }, {
      key: "generateKey",
      value: function () {
        var _generateKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee3() {
          var _len6,
            args,
            _key8,
            _args3 = arguments;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                for (_len6 = _args3.length, args = new Array(_len6), _key8 = 0; _key8 < _len6; _key8++) {
                  args[_key8] = _args3[_key8];
                }
                this.checkGenerateKey.apply(this, args);
                return _context3.abrupt("return", this.onGenerateKey.apply(this, args));
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function generateKey() {
          return _generateKey.apply(this, arguments);
        }
        return generateKey;
      }()
    }, {
      key: "checkGenerateKey",
      value: function checkGenerateKey(algorithm, extractable, keyUsages) {
        this.checkAlgorithmName(algorithm);
        this.checkGenerateKeyParams(algorithm);
        if (!(keyUsages && keyUsages.length)) {
          throw new TypeError("Usages cannot be empty when creating a key.");
        }
        var allowedUsages;
        if (Array.isArray(this.usages)) {
          allowedUsages = this.usages;
        } else {
          allowedUsages = this.usages.privateKey.concat(this.usages.publicKey);
        }
        this.checkKeyUsages(keyUsages, allowedUsages);
      }
    }, {
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {}
    }, {
      key: "onGenerateKey",
      value: function () {
        var _onGenerateKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee4(algorithm, extractable, keyUsages) {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                throw new UnsupportedOperationError("generateKey");
              case 1:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        function onGenerateKey(_x3, _x4, _x5) {
          return _onGenerateKey.apply(this, arguments);
        }
        return onGenerateKey;
      }()
    }, {
      key: "sign",
      value: function () {
        var _sign = _asyncToGenerator(_regeneratorRuntime().mark(function _callee5() {
          var _len7,
            args,
            _key9,
            _args5 = arguments;
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                for (_len7 = _args5.length, args = new Array(_len7), _key9 = 0; _key9 < _len7; _key9++) {
                  args[_key9] = _args5[_key9];
                }
                this.checkSign.apply(this, args);
                return _context5.abrupt("return", this.onSign.apply(this, args));
              case 3:
              case "end":
                return _context5.stop();
            }
          }, _callee5, this);
        }));
        function sign() {
          return _sign.apply(this, arguments);
        }
        return sign;
      }()
    }, {
      key: "checkSign",
      value: function checkSign(algorithm, key, data) {
        this.checkAlgorithmName(algorithm);
        this.checkAlgorithmParams(algorithm);
        this.checkCryptoKey(key, "sign");
      }
    }, {
      key: "onSign",
      value: function () {
        var _onSign = _asyncToGenerator(_regeneratorRuntime().mark(function _callee6(algorithm, key, data) {
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                throw new UnsupportedOperationError("sign");
              case 1:
              case "end":
                return _context6.stop();
            }
          }, _callee6);
        }));
        function onSign(_x6, _x7, _x8) {
          return _onSign.apply(this, arguments);
        }
        return onSign;
      }()
    }, {
      key: "verify",
      value: function () {
        var _verify = _asyncToGenerator(_regeneratorRuntime().mark(function _callee7() {
          var _len8,
            args,
            _key10,
            _args7 = arguments;
          return _regeneratorRuntime().wrap(function _callee7$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                for (_len8 = _args7.length, args = new Array(_len8), _key10 = 0; _key10 < _len8; _key10++) {
                  args[_key10] = _args7[_key10];
                }
                this.checkVerify.apply(this, args);
                return _context7.abrupt("return", this.onVerify.apply(this, args));
              case 3:
              case "end":
                return _context7.stop();
            }
          }, _callee7, this);
        }));
        function verify() {
          return _verify.apply(this, arguments);
        }
        return verify;
      }()
    }, {
      key: "checkVerify",
      value: function checkVerify(algorithm, key, signature, data) {
        this.checkAlgorithmName(algorithm);
        this.checkAlgorithmParams(algorithm);
        this.checkCryptoKey(key, "verify");
      }
    }, {
      key: "onVerify",
      value: function () {
        var _onVerify = _asyncToGenerator(_regeneratorRuntime().mark(function _callee8(algorithm, key, signature, data) {
          return _regeneratorRuntime().wrap(function _callee8$(_context8) {
            while (1) switch (_context8.prev = _context8.next) {
              case 0:
                throw new UnsupportedOperationError("verify");
              case 1:
              case "end":
                return _context8.stop();
            }
          }, _callee8);
        }));
        function onVerify(_x9, _x10, _x11, _x12) {
          return _onVerify.apply(this, arguments);
        }
        return onVerify;
      }()
    }, {
      key: "encrypt",
      value: function () {
        var _encrypt2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee9() {
          var _len9,
            args,
            _key11,
            _args9 = arguments;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                for (_len9 = _args9.length, args = new Array(_len9), _key11 = 0; _key11 < _len9; _key11++) {
                  args[_key11] = _args9[_key11];
                }
                this.checkEncrypt.apply(this, args);
                return _context9.abrupt("return", this.onEncrypt.apply(this, args));
              case 3:
              case "end":
                return _context9.stop();
            }
          }, _callee9, this);
        }));
        function encrypt() {
          return _encrypt2.apply(this, arguments);
        }
        return encrypt;
      }()
    }, {
      key: "checkEncrypt",
      value: function checkEncrypt(algorithm, key, data) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.checkAlgorithmName(algorithm);
        this.checkAlgorithmParams(algorithm);
        this.checkCryptoKey(key, options.keyUsage ? "encrypt" : void 0);
      }
    }, {
      key: "onEncrypt",
      value: function () {
        var _onEncrypt = _asyncToGenerator(_regeneratorRuntime().mark(function _callee10(algorithm, key, data) {
          return _regeneratorRuntime().wrap(function _callee10$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                throw new UnsupportedOperationError("encrypt");
              case 1:
              case "end":
                return _context10.stop();
            }
          }, _callee10);
        }));
        function onEncrypt(_x13, _x14, _x15) {
          return _onEncrypt.apply(this, arguments);
        }
        return onEncrypt;
      }()
    }, {
      key: "decrypt",
      value: function () {
        var _decrypt2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee11() {
          var _len10,
            args,
            _key12,
            _args11 = arguments;
          return _regeneratorRuntime().wrap(function _callee11$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                for (_len10 = _args11.length, args = new Array(_len10), _key12 = 0; _key12 < _len10; _key12++) {
                  args[_key12] = _args11[_key12];
                }
                this.checkDecrypt.apply(this, args);
                return _context11.abrupt("return", this.onDecrypt.apply(this, args));
              case 3:
              case "end":
                return _context11.stop();
            }
          }, _callee11, this);
        }));
        function decrypt() {
          return _decrypt2.apply(this, arguments);
        }
        return decrypt;
      }()
    }, {
      key: "checkDecrypt",
      value: function checkDecrypt(algorithm, key, data) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.checkAlgorithmName(algorithm);
        this.checkAlgorithmParams(algorithm);
        this.checkCryptoKey(key, options.keyUsage ? "decrypt" : void 0);
      }
    }, {
      key: "onDecrypt",
      value: function () {
        var _onDecrypt = _asyncToGenerator(_regeneratorRuntime().mark(function _callee12(algorithm, key, data) {
          return _regeneratorRuntime().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                throw new UnsupportedOperationError("decrypt");
              case 1:
              case "end":
                return _context12.stop();
            }
          }, _callee12);
        }));
        function onDecrypt(_x16, _x17, _x18) {
          return _onDecrypt.apply(this, arguments);
        }
        return onDecrypt;
      }()
    }, {
      key: "deriveBits",
      value: function () {
        var _deriveBits = _asyncToGenerator(_regeneratorRuntime().mark(function _callee13() {
          var _len11,
            args,
            _key13,
            _args13 = arguments;
          return _regeneratorRuntime().wrap(function _callee13$(_context13) {
            while (1) switch (_context13.prev = _context13.next) {
              case 0:
                for (_len11 = _args13.length, args = new Array(_len11), _key13 = 0; _key13 < _len11; _key13++) {
                  args[_key13] = _args13[_key13];
                }
                this.checkDeriveBits.apply(this, args);
                return _context13.abrupt("return", this.onDeriveBits.apply(this, args));
              case 3:
              case "end":
                return _context13.stop();
            }
          }, _callee13, this);
        }));
        function deriveBits() {
          return _deriveBits.apply(this, arguments);
        }
        return deriveBits;
      }()
    }, {
      key: "checkDeriveBits",
      value: function checkDeriveBits(algorithm, baseKey, length) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.checkAlgorithmName(algorithm);
        this.checkAlgorithmParams(algorithm);
        this.checkCryptoKey(baseKey, options.keyUsage ? "deriveBits" : void 0);
        if (length % 8 !== 0) {
          throw new OperationError("length: Is not multiple of 8");
        }
      }
    }, {
      key: "onDeriveBits",
      value: function () {
        var _onDeriveBits = _asyncToGenerator(_regeneratorRuntime().mark(function _callee14(algorithm, baseKey, length) {
          return _regeneratorRuntime().wrap(function _callee14$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
              case 0:
                throw new UnsupportedOperationError("deriveBits");
              case 1:
              case "end":
                return _context14.stop();
            }
          }, _callee14);
        }));
        function onDeriveBits(_x19, _x20, _x21) {
          return _onDeriveBits.apply(this, arguments);
        }
        return onDeriveBits;
      }()
    }, {
      key: "exportKey",
      value: function () {
        var _exportKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee15() {
          var _len12,
            args,
            _key14,
            _args15 = arguments;
          return _regeneratorRuntime().wrap(function _callee15$(_context15) {
            while (1) switch (_context15.prev = _context15.next) {
              case 0:
                for (_len12 = _args15.length, args = new Array(_len12), _key14 = 0; _key14 < _len12; _key14++) {
                  args[_key14] = _args15[_key14];
                }
                this.checkExportKey.apply(this, args);
                return _context15.abrupt("return", this.onExportKey.apply(this, args));
              case 3:
              case "end":
                return _context15.stop();
            }
          }, _callee15, this);
        }));
        function exportKey() {
          return _exportKey.apply(this, arguments);
        }
        return exportKey;
      }()
    }, {
      key: "checkExportKey",
      value: function checkExportKey(format, key) {
        this.checkKeyFormat(format);
        this.checkCryptoKey(key);
        if (!key.extractable) {
          throw new CryptoError("key: Is not extractable");
        }
      }
    }, {
      key: "onExportKey",
      value: function () {
        var _onExportKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee16(format, key) {
          return _regeneratorRuntime().wrap(function _callee16$(_context16) {
            while (1) switch (_context16.prev = _context16.next) {
              case 0:
                throw new UnsupportedOperationError("exportKey");
              case 1:
              case "end":
                return _context16.stop();
            }
          }, _callee16);
        }));
        function onExportKey(_x22, _x23) {
          return _onExportKey.apply(this, arguments);
        }
        return onExportKey;
      }()
    }, {
      key: "importKey",
      value: function () {
        var _importKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee17() {
          var _len13,
            args,
            _key15,
            _args17 = arguments;
          return _regeneratorRuntime().wrap(function _callee17$(_context17) {
            while (1) switch (_context17.prev = _context17.next) {
              case 0:
                for (_len13 = _args17.length, args = new Array(_len13), _key15 = 0; _key15 < _len13; _key15++) {
                  args[_key15] = _args17[_key15];
                }
                this.checkImportKey.apply(this, args);
                return _context17.abrupt("return", this.onImportKey.apply(this, args));
              case 3:
              case "end":
                return _context17.stop();
            }
          }, _callee17, this);
        }));
        function importKey() {
          return _importKey.apply(this, arguments);
        }
        return importKey;
      }()
    }, {
      key: "checkImportKey",
      value: function checkImportKey(format, keyData, algorithm, extractable, keyUsages) {
        this.checkKeyFormat(format);
        this.checkKeyData(format, keyData);
        this.checkAlgorithmName(algorithm);
        this.checkImportParams(algorithm);
        if (Array.isArray(this.usages)) {
          this.checkKeyUsages(keyUsages, this.usages);
        }
      }
    }, {
      key: "onImportKey",
      value: function () {
        var _onImportKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee18(format, keyData, algorithm, extractable, keyUsages) {
          return _regeneratorRuntime().wrap(function _callee18$(_context18) {
            while (1) switch (_context18.prev = _context18.next) {
              case 0:
                throw new UnsupportedOperationError("importKey");
              case 1:
              case "end":
                return _context18.stop();
            }
          }, _callee18);
        }));
        function onImportKey(_x24, _x25, _x26, _x27, _x28) {
          return _onImportKey.apply(this, arguments);
        }
        return onImportKey;
      }()
    }, {
      key: "checkAlgorithmName",
      value: function checkAlgorithmName(algorithm) {
        if (algorithm.name.toLowerCase() !== this.name.toLowerCase()) {
          throw new AlgorithmError("Unrecognized name");
        }
      }
    }, {
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {}
    }, {
      key: "checkDerivedKeyParams",
      value: function checkDerivedKeyParams(algorithm) {}
    }, {
      key: "checkKeyUsages",
      value: function checkKeyUsages(usages, allowed) {
        var _iterator16 = _createForOfIteratorHelper(usages),
          _step16;
        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var usage = _step16.value;
            if (allowed.indexOf(usage) === -1) {
              throw new TypeError("Cannot create a key using the specified key usages");
            }
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        this.checkAlgorithmName(key.algorithm);
        if (keyUsage && key.usages.indexOf(keyUsage) === -1) {
          throw new CryptoError("key does not match that of operation");
        }
      }
    }, {
      key: "checkRequiredProperty",
      value: function checkRequiredProperty(data, propName) {
        if (!(propName in data)) {
          throw new RequiredPropertyError(propName);
        }
      }
    }, {
      key: "checkHashAlgorithm",
      value: function checkHashAlgorithm(algorithm, hashAlgorithms) {
        var _iterator17 = _createForOfIteratorHelper(hashAlgorithms),
          _step17;
        try {
          for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
            var item = _step17.value;
            if (item.toLowerCase() === algorithm.name.toLowerCase()) {
              return;
            }
          }
        } catch (err) {
          _iterator17.e(err);
        } finally {
          _iterator17.f();
        }
        throw new OperationError("hash: Must be one of ".concat(hashAlgorithms.join(", ")));
      }
    }, {
      key: "checkImportParams",
      value: function checkImportParams(algorithm) {}
    }, {
      key: "checkKeyFormat",
      value: function checkKeyFormat(format) {
        switch (format) {
          case "raw":
          case "pkcs8":
          case "spki":
          case "jwk":
            break;
          default:
            throw new TypeError("format: Is invalid value. Must be 'jwk', 'raw', 'spki', or 'pkcs8'");
        }
      }
    }, {
      key: "checkKeyData",
      value: function checkKeyData(format, keyData) {
        if (!keyData) {
          throw new TypeError("keyData: Cannot be empty on empty on key importing");
        }
        if (format === "jwk") {
          if (!isJWK(keyData)) {
            throw new TypeError("keyData: Is not JsonWebToken");
          }
        } else if (!BufferSourceConverter.isBufferSource(keyData)) {
          throw new TypeError("keyData: Is not ArrayBufferView or ArrayBuffer");
        }
      }
    }, {
      key: "prepareData",
      value: function prepareData(data) {
        return BufferSourceConverter.toArrayBuffer(data);
      }
    }]);
    return ProviderCrypto;
  }();
  var AesProvider = function (_ProviderCrypto) {
    _inherits(AesProvider, _ProviderCrypto);
    var _super73 = _createSuper(AesProvider);
    function AesProvider() {
      _classCallCheck(this, AesProvider);
      return _super73.apply(this, arguments);
    }
    _createClass(AesProvider, [{
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {
        this.checkRequiredProperty(algorithm, "length");
        if (typeof algorithm.length !== "number") {
          throw new TypeError("length: Is not of type Number");
        }
        switch (algorithm.length) {
          case 128:
          case 192:
          case 256:
            break;
          default:
            throw new TypeError("length: Must be 128, 192, or 256");
        }
      }
    }, {
      key: "checkDerivedKeyParams",
      value: function checkDerivedKeyParams(algorithm) {
        this.checkGenerateKeyParams(algorithm);
      }
    }]);
    return AesProvider;
  }(ProviderCrypto);
  var AesCbcProvider$1 = function (_AesProvider) {
    _inherits(AesCbcProvider, _AesProvider);
    var _super74 = _createSuper(AesCbcProvider);
    function AesCbcProvider() {
      var _this62;
      _classCallCheck(this, AesCbcProvider);
      _this62 = _super74.apply(this, arguments);
      _this62.name = "AES-CBC";
      _this62.usages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
      return _this62;
    }
    _createClass(AesCbcProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "iv");
        if (!(algorithm.iv instanceof ArrayBuffer || ArrayBuffer.isView(algorithm.iv))) {
          throw new TypeError("iv: Is not of type '(ArrayBuffer or ArrayBufferView)'");
        }
        if (algorithm.iv.byteLength !== 16) {
          throw new TypeError("iv: Must have length 16 bytes");
        }
      }
    }]);
    return AesCbcProvider;
  }(AesProvider);
  var AesCtrProvider$1 = function (_AesProvider2) {
    _inherits(AesCtrProvider, _AesProvider2);
    var _super75 = _createSuper(AesCtrProvider);
    function AesCtrProvider() {
      var _this63;
      _classCallCheck(this, AesCtrProvider);
      _this63 = _super75.apply(this, arguments);
      _this63.name = "AES-CTR";
      _this63.usages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
      return _this63;
    }
    _createClass(AesCtrProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "counter");
        if (!(algorithm.counter instanceof ArrayBuffer || ArrayBuffer.isView(algorithm.counter))) {
          throw new TypeError("counter: Is not of type '(ArrayBuffer or ArrayBufferView)'");
        }
        if (algorithm.counter.byteLength !== 16) {
          throw new TypeError("iv: Must have length 16 bytes");
        }
        this.checkRequiredProperty(algorithm, "length");
        if (typeof algorithm.length !== "number") {
          throw new TypeError("length: Is not a Number");
        }
        if (algorithm.length < 1) {
          throw new OperationError("length: Must be more than 0");
        }
      }
    }]);
    return AesCtrProvider;
  }(AesProvider);
  var AesEcbProvider$1 = function (_AesProvider3) {
    _inherits(AesEcbProvider, _AesProvider3);
    var _super76 = _createSuper(AesEcbProvider);
    function AesEcbProvider() {
      var _this64;
      _classCallCheck(this, AesEcbProvider);
      _this64 = _super76.apply(this, arguments);
      _this64.name = "AES-ECB";
      _this64.usages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
      return _this64;
    }
    return _createClass(AesEcbProvider);
  }(AesProvider);
  var AesGcmProvider$1 = function (_AesProvider4) {
    _inherits(AesGcmProvider, _AesProvider4);
    var _super77 = _createSuper(AesGcmProvider);
    function AesGcmProvider() {
      var _this65;
      _classCallCheck(this, AesGcmProvider);
      _this65 = _super77.apply(this, arguments);
      _this65.name = "AES-GCM";
      _this65.usages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
      return _this65;
    }
    _createClass(AesGcmProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "iv");
        if (!(algorithm.iv instanceof ArrayBuffer || ArrayBuffer.isView(algorithm.iv))) {
          throw new TypeError("iv: Is not of type '(ArrayBuffer or ArrayBufferView)'");
        }
        if (algorithm.iv.byteLength < 1) {
          throw new OperationError("iv: Must have length more than 0 and less than 2^64 - 1");
        }
        if (!("tagLength" in algorithm)) {
          algorithm.tagLength = 128;
        }
        switch (algorithm.tagLength) {
          case 32:
          case 64:
          case 96:
          case 104:
          case 112:
          case 120:
          case 128:
            break;
          default:
            throw new OperationError("tagLength: Must be one of 32, 64, 96, 104, 112, 120 or 128");
        }
      }
    }]);
    return AesGcmProvider;
  }(AesProvider);
  var AesKwProvider$1 = function (_AesProvider5) {
    _inherits(AesKwProvider, _AesProvider5);
    var _super78 = _createSuper(AesKwProvider);
    function AesKwProvider() {
      var _this66;
      _classCallCheck(this, AesKwProvider);
      _this66 = _super78.apply(this, arguments);
      _this66.name = "AES-KW";
      _this66.usages = ["wrapKey", "unwrapKey"];
      return _this66;
    }
    return _createClass(AesKwProvider);
  }(AesProvider);
  var DesProvider = function (_ProviderCrypto2) {
    _inherits(DesProvider, _ProviderCrypto2);
    var _super79 = _createSuper(DesProvider);
    function DesProvider() {
      var _this67;
      _classCallCheck(this, DesProvider);
      _this67 = _super79.apply(this, arguments);
      _this67.usages = ["encrypt", "decrypt", "wrapKey", "unwrapKey"];
      return _this67;
    }
    _createClass(DesProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        if (this.ivSize) {
          this.checkRequiredProperty(algorithm, "iv");
          if (!(algorithm.iv instanceof ArrayBuffer || ArrayBuffer.isView(algorithm.iv))) {
            throw new TypeError("iv: Is not of type '(ArrayBuffer or ArrayBufferView)'");
          }
          if (algorithm.iv.byteLength !== this.ivSize) {
            throw new TypeError("iv: Must have length ".concat(this.ivSize, " bytes"));
          }
        }
      }
    }, {
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {
        this.checkRequiredProperty(algorithm, "length");
        if (typeof algorithm.length !== "number") {
          throw new TypeError("length: Is not of type Number");
        }
        if (algorithm.length !== this.keySizeBits) {
          throw new OperationError("algorithm.length: Must be ".concat(this.keySizeBits));
        }
      }
    }, {
      key: "checkDerivedKeyParams",
      value: function checkDerivedKeyParams(algorithm) {
        this.checkGenerateKeyParams(algorithm);
      }
    }]);
    return DesProvider;
  }(ProviderCrypto);
  var RsaProvider = function (_ProviderCrypto3) {
    _inherits(RsaProvider, _ProviderCrypto3);
    var _super80 = _createSuper(RsaProvider);
    function RsaProvider() {
      var _this68;
      _classCallCheck(this, RsaProvider);
      _this68 = _super80.apply(this, arguments);
      _this68.hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
      return _this68;
    }
    _createClass(RsaProvider, [{
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {
        this.checkRequiredProperty(algorithm, "hash");
        this.checkHashAlgorithm(algorithm.hash, this.hashAlgorithms);
        this.checkRequiredProperty(algorithm, "publicExponent");
        if (!(algorithm.publicExponent && algorithm.publicExponent instanceof Uint8Array)) {
          throw new TypeError("publicExponent: Missing or not a Uint8Array");
        }
        var publicExponent = Convert.ToBase64(algorithm.publicExponent);
        if (!(publicExponent === "Aw==" || publicExponent === "AQAB")) {
          throw new TypeError("publicExponent: Must be [3] or [1,0,1]");
        }
        this.checkRequiredProperty(algorithm, "modulusLength");
        if (algorithm.modulusLength % 8 || algorithm.modulusLength < 256 || algorithm.modulusLength > 16384) {
          throw new TypeError("The modulus length must be a multiple of 8 bits and >= 256 and <= 16384");
        }
      }
    }, {
      key: "checkImportParams",
      value: function checkImportParams(algorithm) {
        this.checkRequiredProperty(algorithm, "hash");
        this.checkHashAlgorithm(algorithm.hash, this.hashAlgorithms);
      }
    }]);
    return RsaProvider;
  }(ProviderCrypto);
  var RsaSsaProvider$1 = function (_RsaProvider) {
    _inherits(RsaSsaProvider, _RsaProvider);
    var _super81 = _createSuper(RsaSsaProvider);
    function RsaSsaProvider() {
      var _this69;
      _classCallCheck(this, RsaSsaProvider);
      _this69 = _super81.apply(this, arguments);
      _this69.name = "RSASSA-PKCS1-v1_5";
      _this69.usages = {
        privateKey: ["sign"],
        publicKey: ["verify"]
      };
      return _this69;
    }
    return _createClass(RsaSsaProvider);
  }(RsaProvider);
  var RsaPssProvider$1 = function (_RsaProvider2) {
    _inherits(RsaPssProvider, _RsaProvider2);
    var _super82 = _createSuper(RsaPssProvider);
    function RsaPssProvider() {
      var _this70;
      _classCallCheck(this, RsaPssProvider);
      _this70 = _super82.apply(this, arguments);
      _this70.name = "RSA-PSS";
      _this70.usages = {
        privateKey: ["sign"],
        publicKey: ["verify"]
      };
      return _this70;
    }
    _createClass(RsaPssProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "saltLength");
        if (typeof algorithm.saltLength !== "number") {
          throw new TypeError("saltLength: Is not a Number");
        }
        if (algorithm.saltLength < 0) {
          throw new RangeError("saltLength: Must be positive number");
        }
      }
    }]);
    return RsaPssProvider;
  }(RsaProvider);
  var RsaOaepProvider$1 = function (_RsaProvider3) {
    _inherits(RsaOaepProvider, _RsaProvider3);
    var _super83 = _createSuper(RsaOaepProvider);
    function RsaOaepProvider() {
      var _this71;
      _classCallCheck(this, RsaOaepProvider);
      _this71 = _super83.apply(this, arguments);
      _this71.name = "RSA-OAEP";
      _this71.usages = {
        privateKey: ["decrypt", "unwrapKey"],
        publicKey: ["encrypt", "wrapKey"]
      };
      return _this71;
    }
    _createClass(RsaOaepProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        if (algorithm.label && !(algorithm.label instanceof ArrayBuffer || ArrayBuffer.isView(algorithm.label))) {
          throw new TypeError("label: Is not of type '(ArrayBuffer or ArrayBufferView)'");
        }
      }
    }]);
    return RsaOaepProvider;
  }(RsaProvider);
  var EllipticProvider = function (_ProviderCrypto4) {
    _inherits(EllipticProvider, _ProviderCrypto4);
    var _super84 = _createSuper(EllipticProvider);
    function EllipticProvider() {
      _classCallCheck(this, EllipticProvider);
      return _super84.apply(this, arguments);
    }
    _createClass(EllipticProvider, [{
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {
        this.checkRequiredProperty(algorithm, "namedCurve");
        this.checkNamedCurve(algorithm.namedCurve);
      }
    }, {
      key: "checkNamedCurve",
      value: function checkNamedCurve(namedCurve) {
        var _iterator18 = _createForOfIteratorHelper(this.namedCurves),
          _step18;
        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var item = _step18.value;
            if (item.toLowerCase() === namedCurve.toLowerCase()) {
              return;
            }
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }
        throw new OperationError("namedCurve: Must be one of ".concat(this.namedCurves.join(", ")));
      }
    }]);
    return EllipticProvider;
  }(ProviderCrypto);
  var EcdsaProvider$1 = function (_EllipticProvider) {
    _inherits(EcdsaProvider, _EllipticProvider);
    var _super85 = _createSuper(EcdsaProvider);
    function EcdsaProvider() {
      var _this72;
      _classCallCheck(this, EcdsaProvider);
      _this72 = _super85.apply(this, arguments);
      _this72.name = "ECDSA";
      _this72.hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
      _this72.usages = {
        privateKey: ["sign"],
        publicKey: ["verify"]
      };
      _this72.namedCurves = ["P-256", "P-384", "P-521", "K-256"];
      return _this72;
    }
    _createClass(EcdsaProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "hash");
        this.checkHashAlgorithm(algorithm.hash, this.hashAlgorithms);
      }
    }]);
    return EcdsaProvider;
  }(EllipticProvider);
  var KEY_TYPES = ["secret", "private", "public"];
  var CryptoKey$1 = function (_Symbol$toStringTag) {
    function CryptoKey() {
      _classCallCheck(this, CryptoKey);
    }
    _createClass(CryptoKey, [{
      key: _Symbol$toStringTag,
      get: function get() {
        return "CryptoKey";
      }
    }], [{
      key: "create",
      value: function create(algorithm, type, extractable, usages) {
        var key = new this();
        key.algorithm = algorithm;
        key.type = type;
        key.extractable = extractable;
        key.usages = usages;
        return key;
      }
    }, {
      key: "isKeyType",
      value: function isKeyType(data) {
        return KEY_TYPES.indexOf(data) !== -1;
      }
    }]);
    return CryptoKey;
  }(Symbol.toStringTag);
  var EcdhProvider$1 = function (_EllipticProvider2) {
    _inherits(EcdhProvider, _EllipticProvider2);
    var _super86 = _createSuper(EcdhProvider);
    function EcdhProvider() {
      var _this73;
      _classCallCheck(this, EcdhProvider);
      _this73 = _super86.apply(this, arguments);
      _this73.name = "ECDH";
      _this73.usages = {
        privateKey: ["deriveBits", "deriveKey"],
        publicKey: []
      };
      _this73.namedCurves = ["P-256", "P-384", "P-521", "K-256"];
      return _this73;
    }
    _createClass(EcdhProvider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "public");
        if (!(algorithm.public instanceof CryptoKey$1)) {
          throw new TypeError("public: Is not a CryptoKey");
        }
        if (algorithm.public.type !== "public") {
          throw new OperationError("public: Is not a public key");
        }
        if (algorithm.public.algorithm.name !== this.name) {
          throw new OperationError("public: Is not ".concat(this.name, " key"));
        }
      }
    }]);
    return EcdhProvider;
  }(EllipticProvider);
  var EcdhEsProvider$1 = function (_EcdhProvider$) {
    _inherits(EcdhEsProvider, _EcdhProvider$);
    var _super87 = _createSuper(EcdhEsProvider);
    function EcdhEsProvider() {
      var _this74;
      _classCallCheck(this, EcdhEsProvider);
      _this74 = _super87.apply(this, arguments);
      _this74.name = "ECDH-ES";
      _this74.namedCurves = ["X25519", "X448"];
      return _this74;
    }
    return _createClass(EcdhEsProvider);
  }(EcdhProvider$1);
  var EdDsaProvider$1 = function (_EllipticProvider3) {
    _inherits(EdDsaProvider, _EllipticProvider3);
    var _super88 = _createSuper(EdDsaProvider);
    function EdDsaProvider() {
      var _this75;
      _classCallCheck(this, EdDsaProvider);
      _this75 = _super88.apply(this, arguments);
      _this75.name = "EdDSA";
      _this75.usages = {
        privateKey: ["sign"],
        publicKey: ["verify"]
      };
      _this75.namedCurves = ["Ed25519", "Ed448"];
      return _this75;
    }
    return _createClass(EdDsaProvider);
  }(EllipticProvider);
  var ObjectIdentifier = _createClass(function ObjectIdentifier(value) {
    _classCallCheck(this, ObjectIdentifier);
    if (value) {
      this.value = value;
    }
  });
  __decorate([AsnProp({
    type: AsnPropTypes.ObjectIdentifier
  })], ObjectIdentifier.prototype, "value", void 0);
  ObjectIdentifier = __decorate([AsnType({
    type: AsnTypeTypes.Choice
  })], ObjectIdentifier);
  var AlgorithmIdentifier = _createClass(function AlgorithmIdentifier(params) {
    _classCallCheck(this, AlgorithmIdentifier);
    Object.assign(this, params);
  });
  __decorate([AsnProp({
    type: AsnPropTypes.ObjectIdentifier
  })], AlgorithmIdentifier.prototype, "algorithm", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Any,
    optional: true
  })], AlgorithmIdentifier.prototype, "parameters", void 0);
  var PrivateKeyInfo = _createClass(function PrivateKeyInfo() {
    _classCallCheck(this, PrivateKeyInfo);
    this.version = 0;
    this.privateKeyAlgorithm = new AlgorithmIdentifier();
    this.privateKey = new ArrayBuffer(0);
  });
  __decorate([AsnProp({
    type: AsnPropTypes.Integer
  })], PrivateKeyInfo.prototype, "version", void 0);
  __decorate([AsnProp({
    type: AlgorithmIdentifier
  })], PrivateKeyInfo.prototype, "privateKeyAlgorithm", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.OctetString
  })], PrivateKeyInfo.prototype, "privateKey", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Any,
    optional: true
  })], PrivateKeyInfo.prototype, "attributes", void 0);
  var PublicKeyInfo = _createClass(function PublicKeyInfo() {
    _classCallCheck(this, PublicKeyInfo);
    this.publicKeyAlgorithm = new AlgorithmIdentifier();
    this.publicKey = new ArrayBuffer(0);
  });
  __decorate([AsnProp({
    type: AlgorithmIdentifier
  })], PublicKeyInfo.prototype, "publicKeyAlgorithm", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.BitString
  })], PublicKeyInfo.prototype, "publicKey", void 0);
  var JsonBase64UrlArrayBufferConverter = {
    fromJSON: function fromJSON(value) {
      return Convert.FromBase64Url(value);
    },
    toJSON: function toJSON(value) {
      return Convert.ToBase64Url(new Uint8Array(value));
    }
  };
  var AsnIntegerArrayBufferConverter = {
    fromASN: function fromASN(value) {
      var valueHex = value.valueBlock.valueHex;
      return !new Uint8Array(valueHex)[0] ? value.valueBlock.valueHex.slice(1) : value.valueBlock.valueHex;
    },
    toASN: function toASN(value) {
      var valueHex = new Uint8Array(value)[0] > 127 ? combine(new Uint8Array([0]).buffer, value) : value;
      return new Integer({
        valueHex: valueHex
      });
    }
  };
  var RsaPrivateKey = _createClass(function RsaPrivateKey() {
    _classCallCheck(this, RsaPrivateKey);
    this.version = 0;
    this.modulus = new ArrayBuffer(0);
    this.publicExponent = new ArrayBuffer(0);
    this.privateExponent = new ArrayBuffer(0);
    this.prime1 = new ArrayBuffer(0);
    this.prime2 = new ArrayBuffer(0);
    this.exponent1 = new ArrayBuffer(0);
    this.exponent2 = new ArrayBuffer(0);
    this.coefficient = new ArrayBuffer(0);
  });
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerConverter
  })], RsaPrivateKey.prototype, "version", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "n",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "modulus", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "e",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "publicExponent", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "d",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "privateExponent", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "p",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "prime1", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "q",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "prime2", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "dp",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "exponent1", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "dq",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "exponent2", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "qi",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPrivateKey.prototype, "coefficient", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Any,
    optional: true
  })], RsaPrivateKey.prototype, "otherPrimeInfos", void 0);
  var RsaPublicKey = _createClass(function RsaPublicKey() {
    _classCallCheck(this, RsaPublicKey);
    this.modulus = new ArrayBuffer(0);
    this.publicExponent = new ArrayBuffer(0);
  });
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "n",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPublicKey.prototype, "modulus", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerArrayBufferConverter
  }), JsonProp({
    name: "e",
    converter: JsonBase64UrlArrayBufferConverter
  })], RsaPublicKey.prototype, "publicExponent", void 0);
  var EcPublicKey = function () {
    function EcPublicKey(value) {
      _classCallCheck(this, EcPublicKey);
      this.value = new ArrayBuffer(0);
      if (value) {
        this.value = value;
      }
    }
    _createClass(EcPublicKey, [{
      key: "toJSON",
      value: function toJSON() {
        var bytes = new Uint8Array(this.value);
        if (bytes[0] !== 0x04) {
          throw new CryptoError("Wrong ECPoint. Current version supports only Uncompressed (0x04) point");
        }
        bytes = new Uint8Array(this.value.slice(1));
        var size = bytes.length / 2;
        var offset = 0;
        var json = {
          x: Convert.ToBase64Url(bytes.buffer.slice(offset, offset + size)),
          y: Convert.ToBase64Url(bytes.buffer.slice(offset + size, offset + size + size))
        };
        return json;
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(json) {
        if (!("x" in json)) {
          throw new Error("x: Missing required property");
        }
        if (!("y" in json)) {
          throw new Error("y: Missing required property");
        }
        var x = Convert.FromBase64Url(json.x);
        var y = Convert.FromBase64Url(json.y);
        var value = combine(new Uint8Array([0x04]).buffer, x, y);
        this.value = new Uint8Array(value).buffer;
        return this;
      }
    }]);
    return EcPublicKey;
  }();
  __decorate([AsnProp({
    type: AsnPropTypes.OctetString
  })], EcPublicKey.prototype, "value", void 0);
  EcPublicKey = __decorate([AsnType({
    type: AsnTypeTypes.Choice
  })], EcPublicKey);
  var EcPrivateKey = function () {
    function EcPrivateKey() {
      _classCallCheck(this, EcPrivateKey);
      this.version = 1;
      this.privateKey = new ArrayBuffer(0);
    }
    _createClass(EcPrivateKey, [{
      key: "fromJSON",
      value: function fromJSON(json) {
        if (!("d" in json)) {
          throw new Error("d: Missing required property");
        }
        this.privateKey = Convert.FromBase64Url(json.d);
        if ("x" in json) {
          var publicKey = new EcPublicKey();
          publicKey.fromJSON(json);
          var asn = AsnSerializer.toASN(publicKey);
          if ("valueHex" in asn.valueBlock) {
            this.publicKey = asn.valueBlock.valueHex;
          }
        }
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var jwk = {};
        jwk.d = Convert.ToBase64Url(this.privateKey);
        if (this.publicKey) {
          Object.assign(jwk, new EcPublicKey(this.publicKey).toJSON());
        }
        return jwk;
      }
    }]);
    return EcPrivateKey;
  }();
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerConverter
  })], EcPrivateKey.prototype, "version", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.OctetString
  })], EcPrivateKey.prototype, "privateKey", void 0);
  __decorate([AsnProp({
    context: 0,
    type: AsnPropTypes.Any,
    optional: true
  })], EcPrivateKey.prototype, "parameters", void 0);
  __decorate([AsnProp({
    context: 1,
    type: AsnPropTypes.BitString,
    optional: true
  })], EcPrivateKey.prototype, "publicKey", void 0);
  var AsnIntegerWithoutPaddingConverter = {
    fromASN: function fromASN(value) {
      var bytes = new Uint8Array(value.valueBlock.valueHex);
      return bytes[0] === 0 ? bytes.buffer.slice(1) : bytes.buffer;
    },
    toASN: function toASN(value) {
      var bytes = new Uint8Array(value);
      if (bytes[0] > 127) {
        var newValue = new Uint8Array(bytes.length + 1);
        newValue.set(bytes, 1);
        return new Integer({
          valueHex: newValue.buffer
        });
      }
      return new Integer({
        valueHex: value
      });
    }
  };
  var index$2 = Object.freeze({
    __proto__: null,
    AsnIntegerWithoutPaddingConverter: AsnIntegerWithoutPaddingConverter
  });
  var EcUtils = function () {
    function EcUtils() {
      _classCallCheck(this, EcUtils);
    }
    _createClass(EcUtils, null, [{
      key: "decodePoint",
      value: function decodePoint(data, pointSize) {
        var view = BufferSourceConverter.toUint8Array(data);
        if (view.length === 0 || view[0] !== 4) {
          throw new Error("Only uncompressed point format supported");
        }
        var n = (view.length - 1) / 2;
        if (n !== Math.ceil(pointSize / 8)) {
          throw new Error("Point does not match field size");
        }
        var xb = view.slice(1, n + 1);
        var yb = view.slice(n + 1, n + 1 + n);
        return {
          x: xb,
          y: yb
        };
      }
    }, {
      key: "encodePoint",
      value: function encodePoint(point, pointSize) {
        var size = Math.ceil(pointSize / 8);
        if (point.x.byteLength !== size || point.y.byteLength !== size) {
          throw new Error("X,Y coordinates don't match point size criteria");
        }
        var x = BufferSourceConverter.toUint8Array(point.x);
        var y = BufferSourceConverter.toUint8Array(point.y);
        var res = new Uint8Array(size * 2 + 1);
        res[0] = 4;
        res.set(x, 1);
        res.set(y, size + 1);
        return res;
      }
    }, {
      key: "getSize",
      value: function getSize(pointSize) {
        return Math.ceil(pointSize / 8);
      }
    }, {
      key: "encodeSignature",
      value: function encodeSignature(signature, pointSize) {
        var size = this.getSize(pointSize);
        var r = BufferSourceConverter.toUint8Array(signature.r);
        var s = BufferSourceConverter.toUint8Array(signature.s);
        var res = new Uint8Array(size * 2);
        res.set(this.padStart(r, size));
        res.set(this.padStart(s, size), size);
        return res;
      }
    }, {
      key: "decodeSignature",
      value: function decodeSignature(data, pointSize) {
        var size = this.getSize(pointSize);
        var view = BufferSourceConverter.toUint8Array(data);
        if (view.length !== size * 2) {
          throw new Error("Incorrect size of the signature");
        }
        var r = view.slice(0, size);
        var s = view.slice(size);
        return {
          r: this.trimStart(r),
          s: this.trimStart(s)
        };
      }
    }, {
      key: "trimStart",
      value: function trimStart(data) {
        var i = 0;
        while (i < data.length - 1 && data[i] === 0) {
          i++;
        }
        if (i === 0) {
          return data;
        }
        return data.slice(i, data.length);
      }
    }, {
      key: "padStart",
      value: function padStart(data, size) {
        if (size === data.length) {
          return data;
        }
        var res = new Uint8Array(size);
        res.set(data, size - data.length);
        return res;
      }
    }]);
    return EcUtils;
  }();
  var EcDsaSignature = function () {
    function EcDsaSignature() {
      _classCallCheck(this, EcDsaSignature);
      this.r = new ArrayBuffer(0);
      this.s = new ArrayBuffer(0);
    }
    _createClass(EcDsaSignature, [{
      key: "toWebCryptoSignature",
      value: function toWebCryptoSignature(pointSize) {
        pointSize !== null && pointSize !== void 0 ? pointSize : pointSize = Math.max(this.r.byteLength, this.s.byteLength) * 8;
        var signature = EcUtils.encodeSignature(this, pointSize);
        return signature.buffer;
      }
    }], [{
      key: "fromWebCryptoSignature",
      value: function fromWebCryptoSignature(value) {
        var pointSize = value.byteLength / 2;
        var point = EcUtils.decodeSignature(value, pointSize * 8);
        var ecSignature = new EcDsaSignature();
        ecSignature.r = BufferSourceConverter.toArrayBuffer(point.r);
        ecSignature.s = BufferSourceConverter.toArrayBuffer(point.s);
        return ecSignature;
      }
    }]);
    return EcDsaSignature;
  }();
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerWithoutPaddingConverter
  })], EcDsaSignature.prototype, "r", void 0);
  __decorate([AsnProp({
    type: AsnPropTypes.Integer,
    converter: AsnIntegerWithoutPaddingConverter
  })], EcDsaSignature.prototype, "s", void 0);
  var OneAsymmetricKey = function (_PrivateKeyInfo) {
    _inherits(OneAsymmetricKey, _PrivateKeyInfo);
    var _super89 = _createSuper(OneAsymmetricKey);
    function OneAsymmetricKey() {
      _classCallCheck(this, OneAsymmetricKey);
      return _super89.apply(this, arguments);
    }
    return _createClass(OneAsymmetricKey);
  }(PrivateKeyInfo);
  __decorate([AsnProp({
    context: 1,
    implicit: true,
    type: AsnPropTypes.BitString,
    optional: true
  })], OneAsymmetricKey.prototype, "publicKey", void 0);
  var EdPrivateKey$1 = function () {
    function EdPrivateKey() {
      _classCallCheck(this, EdPrivateKey);
      this.value = new ArrayBuffer(0);
    }
    _createClass(EdPrivateKey, [{
      key: "fromJSON",
      value: function fromJSON(json) {
        if (!json.d) {
          throw new Error("d: Missing required property");
        }
        this.value = Convert.FromBase64Url(json.d);
        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var jwk = {
          d: Convert.ToBase64Url(this.value)
        };
        return jwk;
      }
    }]);
    return EdPrivateKey;
  }();
  __decorate([AsnProp({
    type: AsnPropTypes.OctetString
  })], EdPrivateKey$1.prototype, "value", void 0);
  EdPrivateKey$1 = __decorate([AsnType({
    type: AsnTypeTypes.Choice
  })], EdPrivateKey$1);
  var EdPublicKey$1 = function () {
    function EdPublicKey(value) {
      _classCallCheck(this, EdPublicKey);
      this.value = new ArrayBuffer(0);
      if (value) {
        this.value = value;
      }
    }
    _createClass(EdPublicKey, [{
      key: "toJSON",
      value: function toJSON() {
        var json = {
          x: Convert.ToBase64Url(this.value)
        };
        return json;
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(json) {
        if (!("x" in json)) {
          throw new Error("x: Missing required property");
        }
        this.value = Convert.FromBase64Url(json.x);
        return this;
      }
    }]);
    return EdPublicKey;
  }();
  __decorate([AsnProp({
    type: AsnPropTypes.BitString
  })], EdPublicKey$1.prototype, "value", void 0);
  EdPublicKey$1 = __decorate([AsnType({
    type: AsnTypeTypes.Choice
  })], EdPublicKey$1);
  var CurvePrivateKey = _createClass(function CurvePrivateKey() {
    _classCallCheck(this, CurvePrivateKey);
  });
  __decorate([AsnProp({
    type: AsnPropTypes.OctetString
  }), JsonProp({
    type: JsonPropTypes.String,
    converter: JsonBase64UrlArrayBufferConverter
  })], CurvePrivateKey.prototype, "d", void 0);
  CurvePrivateKey = __decorate([AsnType({
    type: AsnTypeTypes.Choice
  })], CurvePrivateKey);
  var idSecp256r1 = "1.2.840.10045.3.1.7";
  var idEllipticCurve = "1.3.132.0";
  var idSecp384r1 = "".concat(idEllipticCurve, ".34");
  var idSecp521r1 = "".concat(idEllipticCurve, ".35");
  var idSecp256k1 = "".concat(idEllipticCurve, ".10");
  var idVersionOne = "1.3.36.3.3.2.8.1.1";
  var idBrainpoolP160r1 = "".concat(idVersionOne, ".1");
  var idBrainpoolP160t1 = "".concat(idVersionOne, ".2");
  var idBrainpoolP192r1 = "".concat(idVersionOne, ".3");
  var idBrainpoolP192t1 = "".concat(idVersionOne, ".4");
  var idBrainpoolP224r1 = "".concat(idVersionOne, ".5");
  var idBrainpoolP224t1 = "".concat(idVersionOne, ".6");
  var idBrainpoolP256r1 = "".concat(idVersionOne, ".7");
  var idBrainpoolP256t1 = "".concat(idVersionOne, ".8");
  var idBrainpoolP320r1 = "".concat(idVersionOne, ".9");
  var idBrainpoolP320t1 = "".concat(idVersionOne, ".10");
  var idBrainpoolP384r1 = "".concat(idVersionOne, ".11");
  var idBrainpoolP384t1 = "".concat(idVersionOne, ".12");
  var idBrainpoolP512r1 = "".concat(idVersionOne, ".13");
  var idBrainpoolP512t1 = "".concat(idVersionOne, ".14");
  var idX25519 = "1.3.101.110";
  var idX448 = "1.3.101.111";
  var idEd25519 = "1.3.101.112";
  var idEd448 = "1.3.101.113";
  var index$1 = Object.freeze({
    __proto__: null,
    AlgorithmIdentifier: AlgorithmIdentifier,
    get CurvePrivateKey() {
      return CurvePrivateKey;
    },
    EcDsaSignature: EcDsaSignature,
    EcPrivateKey: EcPrivateKey,
    get EcPublicKey() {
      return EcPublicKey;
    },
    get EdPrivateKey() {
      return EdPrivateKey$1;
    },
    get EdPublicKey() {
      return EdPublicKey$1;
    },
    get ObjectIdentifier() {
      return ObjectIdentifier;
    },
    OneAsymmetricKey: OneAsymmetricKey,
    PrivateKeyInfo: PrivateKeyInfo,
    PublicKeyInfo: PublicKeyInfo,
    RsaPrivateKey: RsaPrivateKey,
    RsaPublicKey: RsaPublicKey,
    converters: index$2,
    idBrainpoolP160r1: idBrainpoolP160r1,
    idBrainpoolP160t1: idBrainpoolP160t1,
    idBrainpoolP192r1: idBrainpoolP192r1,
    idBrainpoolP192t1: idBrainpoolP192t1,
    idBrainpoolP224r1: idBrainpoolP224r1,
    idBrainpoolP224t1: idBrainpoolP224t1,
    idBrainpoolP256r1: idBrainpoolP256r1,
    idBrainpoolP256t1: idBrainpoolP256t1,
    idBrainpoolP320r1: idBrainpoolP320r1,
    idBrainpoolP320t1: idBrainpoolP320t1,
    idBrainpoolP384r1: idBrainpoolP384r1,
    idBrainpoolP384t1: idBrainpoolP384t1,
    idBrainpoolP512r1: idBrainpoolP512r1,
    idBrainpoolP512t1: idBrainpoolP512t1,
    idEd25519: idEd25519,
    idEd448: idEd448,
    idEllipticCurve: idEllipticCurve,
    idSecp256k1: idSecp256k1,
    idSecp256r1: idSecp256r1,
    idSecp384r1: idSecp384r1,
    idSecp521r1: idSecp521r1,
    idVersionOne: idVersionOne,
    idX25519: idX25519,
    idX448: idX448
  });
  var EcCurves = function () {
    function EcCurves() {
      _classCallCheck(this, EcCurves);
    }
    _createClass(EcCurves, null, [{
      key: "register",
      value: function register(item) {
        var oid = new ObjectIdentifier();
        oid.value = item.id;
        var raw = AsnConvert.serialize(oid);
        this.items.push(_objectSpread(_objectSpread({}, item), {}, {
          raw: raw
        }));
        this.names.push(item.name);
      }
    }, {
      key: "find",
      value: function find(nameOrId) {
        nameOrId = nameOrId.toUpperCase();
        var _iterator19 = _createForOfIteratorHelper(this.items),
          _step19;
        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var item = _step19.value;
            if (item.name.toUpperCase() === nameOrId || item.id.toUpperCase() === nameOrId) {
              return item;
            }
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
        return null;
      }
    }, {
      key: "get",
      value: function get(nameOrId) {
        var res = this.find(nameOrId);
        if (!res) {
          throw new Error("Unsupported EC named curve '".concat(nameOrId, "'"));
        }
        return res;
      }
    }]);
    return EcCurves;
  }();
  EcCurves.items = [];
  EcCurves.names = [];
  EcCurves.register({
    name: "P-256",
    id: idSecp256r1,
    size: 256
  });
  EcCurves.register({
    name: "P-384",
    id: idSecp384r1,
    size: 384
  });
  EcCurves.register({
    name: "P-521",
    id: idSecp521r1,
    size: 521
  });
  EcCurves.register({
    name: "K-256",
    id: idSecp256k1,
    size: 256
  });
  EcCurves.register({
    name: "brainpoolP160r1",
    id: idBrainpoolP160r1,
    size: 160
  });
  EcCurves.register({
    name: "brainpoolP160t1",
    id: idBrainpoolP160t1,
    size: 160
  });
  EcCurves.register({
    name: "brainpoolP192r1",
    id: idBrainpoolP192r1,
    size: 192
  });
  EcCurves.register({
    name: "brainpoolP192t1",
    id: idBrainpoolP192t1,
    size: 192
  });
  EcCurves.register({
    name: "brainpoolP224r1",
    id: idBrainpoolP224r1,
    size: 224
  });
  EcCurves.register({
    name: "brainpoolP224t1",
    id: idBrainpoolP224t1,
    size: 224
  });
  EcCurves.register({
    name: "brainpoolP256r1",
    id: idBrainpoolP256r1,
    size: 256
  });
  EcCurves.register({
    name: "brainpoolP256t1",
    id: idBrainpoolP256t1,
    size: 256
  });
  EcCurves.register({
    name: "brainpoolP320r1",
    id: idBrainpoolP320r1,
    size: 320
  });
  EcCurves.register({
    name: "brainpoolP320t1",
    id: idBrainpoolP320t1,
    size: 320
  });
  EcCurves.register({
    name: "brainpoolP384r1",
    id: idBrainpoolP384r1,
    size: 384
  });
  EcCurves.register({
    name: "brainpoolP384t1",
    id: idBrainpoolP384t1,
    size: 384
  });
  EcCurves.register({
    name: "brainpoolP512r1",
    id: idBrainpoolP512r1,
    size: 512
  });
  EcCurves.register({
    name: "brainpoolP512t1",
    id: idBrainpoolP512t1,
    size: 512
  });
  var HmacProvider$1 = function (_ProviderCrypto5) {
    _inherits(HmacProvider, _ProviderCrypto5);
    var _super90 = _createSuper(HmacProvider);
    function HmacProvider() {
      var _this76;
      _classCallCheck(this, HmacProvider);
      _this76 = _super90.apply(this, arguments);
      _this76.name = "HMAC";
      _this76.hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
      _this76.usages = ["sign", "verify"];
      return _this76;
    }
    _createClass(HmacProvider, [{
      key: "getDefaultLength",
      value: function getDefaultLength(algName) {
        switch (algName.toUpperCase()) {
          case "SHA-1":
          case "SHA-256":
          case "SHA-384":
          case "SHA-512":
            return 512;
          default:
            throw new Error("Unknown algorithm name '".concat(algName, "'"));
        }
      }
    }, {
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {
        this.checkRequiredProperty(algorithm, "hash");
        this.checkHashAlgorithm(algorithm.hash, this.hashAlgorithms);
        if ("length" in algorithm) {
          if (typeof algorithm.length !== "number") {
            throw new TypeError("length: Is not a Number");
          }
          if (algorithm.length < 1) {
            throw new RangeError("length: Number is out of range");
          }
        }
      }
    }, {
      key: "checkImportParams",
      value: function checkImportParams(algorithm) {
        this.checkRequiredProperty(algorithm, "hash");
        this.checkHashAlgorithm(algorithm.hash, this.hashAlgorithms);
      }
    }]);
    return HmacProvider;
  }(ProviderCrypto);
  var Pbkdf2Provider$1 = function (_ProviderCrypto6) {
    _inherits(Pbkdf2Provider, _ProviderCrypto6);
    var _super91 = _createSuper(Pbkdf2Provider);
    function Pbkdf2Provider() {
      var _this77;
      _classCallCheck(this, Pbkdf2Provider);
      _this77 = _super91.apply(this, arguments);
      _this77.name = "PBKDF2";
      _this77.hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
      _this77.usages = ["deriveBits", "deriveKey"];
      return _this77;
    }
    _createClass(Pbkdf2Provider, [{
      key: "checkAlgorithmParams",
      value: function checkAlgorithmParams(algorithm) {
        this.checkRequiredProperty(algorithm, "hash");
        this.checkHashAlgorithm(algorithm.hash, this.hashAlgorithms);
        this.checkRequiredProperty(algorithm, "salt");
        if (!(algorithm.salt instanceof ArrayBuffer || ArrayBuffer.isView(algorithm.salt))) {
          throw new TypeError("salt: Is not of type '(ArrayBuffer or ArrayBufferView)'");
        }
        this.checkRequiredProperty(algorithm, "iterations");
        if (typeof algorithm.iterations !== "number") {
          throw new TypeError("iterations: Is not a Number");
        }
        if (algorithm.iterations < 1) {
          throw new TypeError("iterations: Is less than 1");
        }
      }
    }, {
      key: "checkImportKey",
      value: function checkImportKey(format, keyData, algorithm, extractable, keyUsages) {
        _get(_getPrototypeOf(Pbkdf2Provider.prototype), "checkImportKey", this).call(this, format, keyData, algorithm, extractable, keyUsages);
        if (extractable) {
          throw new SyntaxError("extractable: Must be 'false'");
        }
      }
    }]);
    return Pbkdf2Provider;
  }(ProviderCrypto);
  var ShakeProvider = function (_ProviderCrypto7) {
    _inherits(ShakeProvider, _ProviderCrypto7);
    var _super92 = _createSuper(ShakeProvider);
    function ShakeProvider() {
      var _this78;
      _classCallCheck(this, ShakeProvider);
      _this78 = _super92.apply(this, arguments);
      _this78.usages = [];
      _this78.defaultLength = 0;
      return _this78;
    }
    _createClass(ShakeProvider, [{
      key: "digest",
      value: function digest() {
        for (var _len14 = arguments.length, args = new Array(_len14), _key16 = 0; _key16 < _len14; _key16++) {
          args[_key16] = arguments[_key16];
        }
        args[0] = _objectSpread({
          length: this.defaultLength
        }, args[0]);
        return _get(_getPrototypeOf(ShakeProvider.prototype), "digest", this).apply(this, args);
      }
    }, {
      key: "checkDigest",
      value: function checkDigest(algorithm, data) {
        _get(_getPrototypeOf(ShakeProvider.prototype), "checkDigest", this).call(this, algorithm, data);
        var length = algorithm.length || 0;
        if (typeof length !== "number") {
          throw new TypeError("length: Is not a Number");
        }
        if (length < 0) {
          throw new TypeError("length: Is negative");
        }
      }
    }]);
    return ShakeProvider;
  }(ProviderCrypto);
  var Shake128Provider$1 = function (_ShakeProvider) {
    _inherits(Shake128Provider, _ShakeProvider);
    var _super93 = _createSuper(Shake128Provider);
    function Shake128Provider() {
      var _this79;
      _classCallCheck(this, Shake128Provider);
      _this79 = _super93.apply(this, arguments);
      _this79.name = "shake128";
      _this79.defaultLength = 16;
      return _this79;
    }
    return _createClass(Shake128Provider);
  }(ShakeProvider);
  var Shake256Provider$1 = function (_ShakeProvider2) {
    _inherits(Shake256Provider, _ShakeProvider2);
    var _super94 = _createSuper(Shake256Provider);
    function Shake256Provider() {
      var _this80;
      _classCallCheck(this, Shake256Provider);
      _this80 = _super94.apply(this, arguments);
      _this80.name = "shake256";
      _this80.defaultLength = 32;
      return _this80;
    }
    return _createClass(Shake256Provider);
  }(ShakeProvider);
  var Crypto$1 = function (_Symbol$toStringTag2) {
    function Crypto() {
      _classCallCheck(this, Crypto);
    }
    _createClass(Crypto, [{
      key: _Symbol$toStringTag2,
      get: function get() {
        return "Crypto";
      }
    }, {
      key: "randomUUID",
      value: function randomUUID() {
        var b = this.getRandomValues(new Uint8Array(16));
        b[6] = b[6] & 0x0f | 0x40;
        b[8] = b[8] & 0x3f | 0x80;
        var uuid = Convert.ToHex(b).toLowerCase();
        return "".concat(uuid.substring(0, 8), "-").concat(uuid.substring(8, 12), "-").concat(uuid.substring(12, 16), "-").concat(uuid.substring(16, 20), "-").concat(uuid.substring(20));
      }
    }]);
    return Crypto;
  }(Symbol.toStringTag);
  var ProviderStorage = function () {
    function ProviderStorage() {
      _classCallCheck(this, ProviderStorage);
      this.items = {};
    }
    _createClass(ProviderStorage, [{
      key: "get",
      value: function get(algorithmName) {
        return this.items[algorithmName.toLowerCase()] || null;
      }
    }, {
      key: "set",
      value: function set(provider) {
        this.items[provider.name.toLowerCase()] = provider;
      }
    }, {
      key: "removeAt",
      value: function removeAt(algorithmName) {
        var provider = this.get(algorithmName.toLowerCase());
        if (provider) {
          delete this.items[algorithmName];
        }
        return provider;
      }
    }, {
      key: "has",
      value: function has(name) {
        return !!this.get(name);
      }
    }, {
      key: "length",
      get: function get() {
        return Object.keys(this.items).length;
      }
    }, {
      key: "algorithms",
      get: function get() {
        var algorithms = [];
        for (var key in this.items) {
          var provider = this.items[key];
          algorithms.push(provider.name);
        }
        return algorithms.sort();
      }
    }]);
    return ProviderStorage;
  }();
  var SubtleCrypto$1 = function (_Symbol$toStringTag3) {
    function SubtleCrypto() {
      _classCallCheck(this, SubtleCrypto);
      this.providers = new ProviderStorage();
    }
    _createClass(SubtleCrypto, [{
      key: _Symbol$toStringTag3,
      get: function get() {
        return "SubtleCrypto";
      }
    }, {
      key: "digest",
      value: function () {
        var _digest2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee19() {
          var _len15,
            args,
            _key17,
            algorithm,
            data,
            params,
            preparedAlgorithm,
            preparedData,
            provider,
            result,
            _args19 = arguments;
          return _regeneratorRuntime().wrap(function _callee19$(_context19) {
            while (1) switch (_context19.prev = _context19.next) {
              case 0:
                for (_len15 = _args19.length, args = new Array(_len15), _key17 = 0; _key17 < _len15; _key17++) {
                  args[_key17] = _args19[_key17];
                }
                this.checkRequiredArguments(args, 2, "digest");
                algorithm = args[0], data = args[1], params = args.slice(2);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(data);
                provider = this.getProvider(preparedAlgorithm.name);
                _context19.next = 8;
                return provider.digest.apply(provider, [preparedAlgorithm, preparedData].concat(_toConsumableArray(params)));
              case 8:
                result = _context19.sent;
                return _context19.abrupt("return", result);
              case 10:
              case "end":
                return _context19.stop();
            }
          }, _callee19, this);
        }));
        function digest() {
          return _digest2.apply(this, arguments);
        }
        return digest;
      }()
    }, {
      key: "generateKey",
      value: function () {
        var _generateKey2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee20() {
          var _len16,
            args,
            _key18,
            algorithm,
            extractable,
            keyUsages,
            params,
            preparedAlgorithm,
            provider,
            result,
            _args20 = arguments;
          return _regeneratorRuntime().wrap(function _callee20$(_context20) {
            while (1) switch (_context20.prev = _context20.next) {
              case 0:
                for (_len16 = _args20.length, args = new Array(_len16), _key18 = 0; _key18 < _len16; _key18++) {
                  args[_key18] = _args20[_key18];
                }
                this.checkRequiredArguments(args, 3, "generateKey");
                algorithm = args[0], extractable = args[1], keyUsages = args[2], params = args.slice(3);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                provider = this.getProvider(preparedAlgorithm.name);
                _context20.next = 7;
                return provider.generateKey.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), extractable, keyUsages].concat(_toConsumableArray(params)));
              case 7:
                result = _context20.sent;
                return _context20.abrupt("return", result);
              case 9:
              case "end":
                return _context20.stop();
            }
          }, _callee20, this);
        }));
        function generateKey() {
          return _generateKey2.apply(this, arguments);
        }
        return generateKey;
      }()
    }, {
      key: "sign",
      value: function () {
        var _sign2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee21() {
          var _len17,
            args,
            _key19,
            algorithm,
            key,
            data,
            params,
            preparedAlgorithm,
            preparedData,
            provider,
            result,
            _args21 = arguments;
          return _regeneratorRuntime().wrap(function _callee21$(_context21) {
            while (1) switch (_context21.prev = _context21.next) {
              case 0:
                for (_len17 = _args21.length, args = new Array(_len17), _key19 = 0; _key19 < _len17; _key19++) {
                  args[_key19] = _args21[_key19];
                }
                this.checkRequiredArguments(args, 3, "sign");
                algorithm = args[0], key = args[1], data = args[2], params = args.slice(3);
                this.checkCryptoKey(key);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(data);
                provider = this.getProvider(preparedAlgorithm.name);
                _context21.next = 9;
                return provider.sign.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), key, preparedData].concat(_toConsumableArray(params)));
              case 9:
                result = _context21.sent;
                return _context21.abrupt("return", result);
              case 11:
              case "end":
                return _context21.stop();
            }
          }, _callee21, this);
        }));
        function sign() {
          return _sign2.apply(this, arguments);
        }
        return sign;
      }()
    }, {
      key: "verify",
      value: function () {
        var _verify2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee22() {
          var _len18,
            args,
            _key20,
            algorithm,
            key,
            signature,
            data,
            params,
            preparedAlgorithm,
            preparedData,
            preparedSignature,
            provider,
            result,
            _args22 = arguments;
          return _regeneratorRuntime().wrap(function _callee22$(_context22) {
            while (1) switch (_context22.prev = _context22.next) {
              case 0:
                for (_len18 = _args22.length, args = new Array(_len18), _key20 = 0; _key20 < _len18; _key20++) {
                  args[_key20] = _args22[_key20];
                }
                this.checkRequiredArguments(args, 4, "verify");
                algorithm = args[0], key = args[1], signature = args[2], data = args[3], params = args.slice(4);
                this.checkCryptoKey(key);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(data);
                preparedSignature = BufferSourceConverter.toArrayBuffer(signature);
                provider = this.getProvider(preparedAlgorithm.name);
                _context22.next = 10;
                return provider.verify.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), key, preparedSignature, preparedData].concat(_toConsumableArray(params)));
              case 10:
                result = _context22.sent;
                return _context22.abrupt("return", result);
              case 12:
              case "end":
                return _context22.stop();
            }
          }, _callee22, this);
        }));
        function verify() {
          return _verify2.apply(this, arguments);
        }
        return verify;
      }()
    }, {
      key: "encrypt",
      value: function () {
        var _encrypt3 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee23() {
          var _len19,
            args,
            _key21,
            algorithm,
            key,
            data,
            params,
            preparedAlgorithm,
            preparedData,
            provider,
            result,
            _args23 = arguments;
          return _regeneratorRuntime().wrap(function _callee23$(_context23) {
            while (1) switch (_context23.prev = _context23.next) {
              case 0:
                for (_len19 = _args23.length, args = new Array(_len19), _key21 = 0; _key21 < _len19; _key21++) {
                  args[_key21] = _args23[_key21];
                }
                this.checkRequiredArguments(args, 3, "encrypt");
                algorithm = args[0], key = args[1], data = args[2], params = args.slice(3);
                this.checkCryptoKey(key);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(data);
                provider = this.getProvider(preparedAlgorithm.name);
                _context23.next = 9;
                return provider.encrypt.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), key, preparedData, {
                  keyUsage: true
                }].concat(_toConsumableArray(params)));
              case 9:
                result = _context23.sent;
                return _context23.abrupt("return", result);
              case 11:
              case "end":
                return _context23.stop();
            }
          }, _callee23, this);
        }));
        function encrypt() {
          return _encrypt3.apply(this, arguments);
        }
        return encrypt;
      }()
    }, {
      key: "decrypt",
      value: function () {
        var _decrypt3 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee24() {
          var _len20,
            args,
            _key22,
            algorithm,
            key,
            data,
            params,
            preparedAlgorithm,
            preparedData,
            provider,
            result,
            _args24 = arguments;
          return _regeneratorRuntime().wrap(function _callee24$(_context24) {
            while (1) switch (_context24.prev = _context24.next) {
              case 0:
                for (_len20 = _args24.length, args = new Array(_len20), _key22 = 0; _key22 < _len20; _key22++) {
                  args[_key22] = _args24[_key22];
                }
                this.checkRequiredArguments(args, 3, "decrypt");
                algorithm = args[0], key = args[1], data = args[2], params = args.slice(3);
                this.checkCryptoKey(key);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(data);
                provider = this.getProvider(preparedAlgorithm.name);
                _context24.next = 9;
                return provider.decrypt.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), key, preparedData, {
                  keyUsage: true
                }].concat(_toConsumableArray(params)));
              case 9:
                result = _context24.sent;
                return _context24.abrupt("return", result);
              case 11:
              case "end":
                return _context24.stop();
            }
          }, _callee24, this);
        }));
        function decrypt() {
          return _decrypt3.apply(this, arguments);
        }
        return decrypt;
      }()
    }, {
      key: "deriveBits",
      value: function () {
        var _deriveBits2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee25() {
          var _len21,
            args,
            _key23,
            algorithm,
            baseKey,
            length,
            params,
            preparedAlgorithm,
            provider,
            result,
            _args25 = arguments;
          return _regeneratorRuntime().wrap(function _callee25$(_context25) {
            while (1) switch (_context25.prev = _context25.next) {
              case 0:
                for (_len21 = _args25.length, args = new Array(_len21), _key23 = 0; _key23 < _len21; _key23++) {
                  args[_key23] = _args25[_key23];
                }
                this.checkRequiredArguments(args, 3, "deriveBits");
                algorithm = args[0], baseKey = args[1], length = args[2], params = args.slice(3);
                this.checkCryptoKey(baseKey);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                provider = this.getProvider(preparedAlgorithm.name);
                _context25.next = 8;
                return provider.deriveBits.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), baseKey, length, {
                  keyUsage: true
                }].concat(_toConsumableArray(params)));
              case 8:
                result = _context25.sent;
                return _context25.abrupt("return", result);
              case 10:
              case "end":
                return _context25.stop();
            }
          }, _callee25, this);
        }));
        function deriveBits() {
          return _deriveBits2.apply(this, arguments);
        }
        return deriveBits;
      }()
    }, {
      key: "deriveKey",
      value: function () {
        var _deriveKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee26() {
          var _len22,
            args,
            _key24,
            algorithm,
            baseKey,
            derivedKeyType,
            extractable,
            keyUsages,
            params,
            preparedDerivedKeyType,
            importProvider,
            preparedAlgorithm,
            provider,
            derivedBits,
            _args26 = arguments;
          return _regeneratorRuntime().wrap(function _callee26$(_context26) {
            while (1) switch (_context26.prev = _context26.next) {
              case 0:
                for (_len22 = _args26.length, args = new Array(_len22), _key24 = 0; _key24 < _len22; _key24++) {
                  args[_key24] = _args26[_key24];
                }
                this.checkRequiredArguments(args, 5, "deriveKey");
                algorithm = args[0], baseKey = args[1], derivedKeyType = args[2], extractable = args[3], keyUsages = args[4], params = args.slice(5);
                preparedDerivedKeyType = this.prepareAlgorithm(derivedKeyType);
                importProvider = this.getProvider(preparedDerivedKeyType.name);
                importProvider.checkDerivedKeyParams(preparedDerivedKeyType);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                provider = this.getProvider(preparedAlgorithm.name);
                provider.checkCryptoKey(baseKey, "deriveKey");
                _context26.next = 11;
                return provider.deriveBits.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), baseKey, derivedKeyType.length || 512, {
                  keyUsage: false
                }].concat(_toConsumableArray(params)));
              case 11:
                derivedBits = _context26.sent;
                return _context26.abrupt("return", this.importKey.apply(this, ["raw", derivedBits, derivedKeyType, extractable, keyUsages].concat(_toConsumableArray(params))));
              case 13:
              case "end":
                return _context26.stop();
            }
          }, _callee26, this);
        }));
        function deriveKey() {
          return _deriveKey.apply(this, arguments);
        }
        return deriveKey;
      }()
    }, {
      key: "exportKey",
      value: function () {
        var _exportKey2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee27() {
          var _len23,
            args,
            _key25,
            format,
            key,
            params,
            provider,
            result,
            _args27 = arguments;
          return _regeneratorRuntime().wrap(function _callee27$(_context27) {
            while (1) switch (_context27.prev = _context27.next) {
              case 0:
                for (_len23 = _args27.length, args = new Array(_len23), _key25 = 0; _key25 < _len23; _key25++) {
                  args[_key25] = _args27[_key25];
                }
                this.checkRequiredArguments(args, 2, "exportKey");
                format = args[0], key = args[1], params = args.slice(2);
                this.checkCryptoKey(key);
                provider = this.getProvider(key.algorithm.name);
                _context27.next = 7;
                return provider.exportKey.apply(provider, [format, key].concat(_toConsumableArray(params)));
              case 7:
                result = _context27.sent;
                return _context27.abrupt("return", result);
              case 9:
              case "end":
                return _context27.stop();
            }
          }, _callee27, this);
        }));
        function exportKey() {
          return _exportKey2.apply(this, arguments);
        }
        return exportKey;
      }()
    }, {
      key: "importKey",
      value: function () {
        var _importKey2 = _asyncToGenerator(_regeneratorRuntime().mark(function _callee28() {
          var _len24,
            args,
            _key26,
            format,
            keyData,
            algorithm,
            extractable,
            keyUsages,
            params,
            preparedAlgorithm,
            provider,
            preparedData,
            _args28 = arguments;
          return _regeneratorRuntime().wrap(function _callee28$(_context28) {
            while (1) switch (_context28.prev = _context28.next) {
              case 0:
                for (_len24 = _args28.length, args = new Array(_len24), _key26 = 0; _key26 < _len24; _key26++) {
                  args[_key26] = _args28[_key26];
                }
                this.checkRequiredArguments(args, 5, "importKey");
                format = args[0], keyData = args[1], algorithm = args[2], extractable = args[3], keyUsages = args[4], params = args.slice(5);
                preparedAlgorithm = this.prepareAlgorithm(algorithm);
                provider = this.getProvider(preparedAlgorithm.name);
                if (!(["pkcs8", "spki", "raw"].indexOf(format) !== -1)) {
                  _context28.next = 10;
                  break;
                }
                preparedData = BufferSourceConverter.toArrayBuffer(keyData);
                return _context28.abrupt("return", provider.importKey.apply(provider, [format, preparedData, _objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), extractable, keyUsages].concat(_toConsumableArray(params))));
              case 10:
                if (keyData.kty) {
                  _context28.next = 12;
                  break;
                }
                throw new TypeError("keyData: Is not JSON");
              case 12:
                return _context28.abrupt("return", provider.importKey.apply(provider, [format, keyData, _objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), extractable, keyUsages].concat(_toConsumableArray(params))));
              case 13:
              case "end":
                return _context28.stop();
            }
          }, _callee28, this);
        }));
        function importKey() {
          return _importKey2.apply(this, arguments);
        }
        return importKey;
      }()
    }, {
      key: "wrapKey",
      value: function () {
        var _wrapKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee29(format, key, wrappingKey, wrapAlgorithm) {
          var _len25,
            args,
            _key27,
            keyData,
            json,
            preparedAlgorithm,
            preparedData,
            provider,
            _args29 = arguments;
          return _regeneratorRuntime().wrap(function _callee29$(_context29) {
            while (1) switch (_context29.prev = _context29.next) {
              case 0:
                for (_len25 = _args29.length, args = new Array(_len25 > 4 ? _len25 - 4 : 0), _key27 = 4; _key27 < _len25; _key27++) {
                  args[_key27 - 4] = _args29[_key27];
                }
                _context29.next = 3;
                return this.exportKey.apply(this, [format, key].concat(args));
              case 3:
                keyData = _context29.sent;
                if (format === "jwk") {
                  json = JSON.stringify(keyData);
                  keyData = Convert.FromUtf8String(json);
                }
                preparedAlgorithm = this.prepareAlgorithm(wrapAlgorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(keyData);
                provider = this.getProvider(preparedAlgorithm.name);
                return _context29.abrupt("return", provider.encrypt.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), wrappingKey, preparedData, {
                  keyUsage: false
                }].concat(args)));
              case 9:
              case "end":
                return _context29.stop();
            }
          }, _callee29, this);
        }));
        function wrapKey(_x29, _x30, _x31, _x32) {
          return _wrapKey.apply(this, arguments);
        }
        return wrapKey;
      }()
    }, {
      key: "unwrapKey",
      value: function () {
        var _unwrapKey = _asyncToGenerator(_regeneratorRuntime().mark(function _callee30(format, wrappedKey, unwrappingKey, unwrapAlgorithm, unwrappedKeyAlgorithm, extractable, keyUsages) {
          var preparedAlgorithm,
            preparedData,
            provider,
            _len26,
            args,
            _key28,
            keyData,
            error,
            _args30 = arguments;
          return _regeneratorRuntime().wrap(function _callee30$(_context30) {
            while (1) switch (_context30.prev = _context30.next) {
              case 0:
                preparedAlgorithm = this.prepareAlgorithm(unwrapAlgorithm);
                preparedData = BufferSourceConverter.toArrayBuffer(wrappedKey);
                provider = this.getProvider(preparedAlgorithm.name);
                for (_len26 = _args30.length, args = new Array(_len26 > 7 ? _len26 - 7 : 0), _key28 = 7; _key28 < _len26; _key28++) {
                  args[_key28 - 7] = _args30[_key28];
                }
                _context30.next = 6;
                return provider.decrypt.apply(provider, [_objectSpread(_objectSpread({}, preparedAlgorithm), {}, {
                  name: provider.name
                }), unwrappingKey, preparedData, {
                  keyUsage: false
                }].concat(args));
              case 6:
                keyData = _context30.sent;
                if (!(format === "jwk")) {
                  _context30.next = 17;
                  break;
                }
                _context30.prev = 8;
                keyData = JSON.parse(Convert.ToUtf8String(keyData));
                _context30.next = 17;
                break;
              case 12:
                _context30.prev = 12;
                _context30.t0 = _context30["catch"](8);
                error = new TypeError("wrappedKey: Is not a JSON");
                error.internal = _context30.t0;
                throw error;
              case 17:
                return _context30.abrupt("return", this.importKey.apply(this, [format, keyData, unwrappedKeyAlgorithm, extractable, keyUsages].concat(args)));
              case 18:
              case "end":
                return _context30.stop();
            }
          }, _callee30, this, [[8, 12]]);
        }));
        function unwrapKey(_x33, _x34, _x35, _x36, _x37, _x38, _x39) {
          return _unwrapKey.apply(this, arguments);
        }
        return unwrapKey;
      }()
    }, {
      key: "checkRequiredArguments",
      value: function checkRequiredArguments(args, size, methodName) {
        if (args.length < size) {
          throw new TypeError("Failed to execute '".concat(methodName, "' on 'SubtleCrypto': ").concat(size, " arguments required, but only ").concat(args.length, " present"));
        }
      }
    }, {
      key: "prepareAlgorithm",
      value: function prepareAlgorithm(algorithm) {
        if (typeof algorithm === "string") {
          return {
            name: algorithm
          };
        }
        if (SubtleCrypto.isHashedAlgorithm(algorithm)) {
          var preparedAlgorithm = _objectSpread({}, algorithm);
          preparedAlgorithm.hash = this.prepareAlgorithm(algorithm.hash);
          return preparedAlgorithm;
        }
        return _objectSpread({}, algorithm);
      }
    }, {
      key: "getProvider",
      value: function getProvider(name) {
        var provider = this.providers.get(name);
        if (!provider) {
          throw new AlgorithmError("Unrecognized name");
        }
        return provider;
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key) {
        if (!(key instanceof CryptoKey$1)) {
          throw new TypeError("Key is not of type 'CryptoKey'");
        }
      }
    }], [{
      key: "isHashedAlgorithm",
      value: function isHashedAlgorithm(data) {
        return data && _typeof(data) === "object" && "name" in data && "hash" in data ? true : false;
      }
    }]);
    return SubtleCrypto;
  }(Symbol.toStringTag);
  var Debug = function () {
    function Debug() {
      _classCallCheck(this, Debug);
    }
    _createClass(Debug, null, [{
      key: "enabled",
      get: function get() {
        return typeof self !== "undefined" && self.PV_WEBCRYPTO_LINER_LOG;
      }
    }, {
      key: "log",
      value: function log() {
        if (this.enabled) {
          for (var _len27 = arguments.length, args = new Array(_len27), _key29 = 0; _key29 < _len27; _key29++) {
            args[_key29] = arguments[_key29];
          }
          console.log.apply(console, args);
        }
      }
    }, {
      key: "error",
      value: function error() {
        if (this.enabled) {
          for (var _len28 = arguments.length, args = new Array(_len28), _key30 = 0; _key30 < _len28; _key30++) {
            args[_key30] = arguments[_key30];
          }
          console.error.apply(console, args);
        }
      }
    }, {
      key: "info",
      value: function info() {
        if (this.enabled) {
          for (var _len29 = arguments.length, args = new Array(_len29), _key31 = 0; _key31 < _len29; _key31++) {
            args[_key31] = arguments[_key31];
          }
          console.info.apply(console, args);
        }
      }
    }, {
      key: "warn",
      value: function warn() {
        if (this.enabled) {
          for (var _len30 = arguments.length, args = new Array(_len30), _key32 = 0; _key32 < _len30; _key32++) {
            args[_key32] = arguments[_key32];
          }
          console.warn.apply(console, args);
        }
      }
    }, {
      key: "trace",
      value: function trace() {
        if (this.enabled) {
          for (var _len31 = arguments.length, args = new Array(_len31), _key33 = 0; _key33 < _len31; _key33++) {
            args[_key33] = arguments[_key33];
          }
          console.trace.apply(console, args);
        }
      }
    }]);
    return Debug;
  }();
  var Browser;
  (function (Browser) {
    Browser["Unknown"] = "Unknown";
    Browser["IE"] = "Internet Explorer";
    Browser["Safari"] = "Safari";
    Browser["Edge"] = "Edge";
    Browser["Chrome"] = "Chrome";
    Browser["Firefox"] = "Firefox Mozilla";
    Browser["Mobile"] = "Mobile";
  })(Browser || (Browser = {}));
  function BrowserInfo() {
    var res = {
      name: Browser.Unknown,
      version: "0"
    };
    if (typeof self === "undefined") {
      return res;
    }
    var userAgent = self.navigator.userAgent;
    var reg;
    if (reg = /edge\/([\d\.]+)/i.exec(userAgent)) {
      res.name = Browser.Edge;
      res.version = reg[1];
    } else if (/msie/i.test(userAgent)) {
      res.name = Browser.IE;
      res.version = /msie ([\d\.]+)/i.exec(userAgent)[1];
    } else if (/Trident/i.test(userAgent)) {
      res.name = Browser.IE;
      res.version = /rv:([\d\.]+)/i.exec(userAgent)[1];
    } else if (/chrome/i.test(userAgent)) {
      res.name = Browser.Chrome;
      res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1];
    } else if (/firefox/i.test(userAgent)) {
      res.name = Browser.Firefox;
      res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1];
    } else if (/mobile/i.test(userAgent)) {
      res.name = Browser.Mobile;
      res.version = /mobile\/([\w]+)/i.exec(userAgent)[1];
    } else if (/safari/i.test(userAgent)) {
      res.name = Browser.Safari;
      res.version = /version\/([\d\.]+)/i.exec(userAgent)[1];
    }
    return res;
  }
  function concat() {
    for (var _len32 = arguments.length, buf = new Array(_len32), _key34 = 0; _key34 < _len32; _key34++) {
      buf[_key34] = arguments[_key34];
    }
    var res = new Uint8Array(buf.map(function (item) {
      return item.length;
    }).reduce(function (prev, cur) {
      return prev + cur;
    }));
    var offset = 0;
    buf.forEach(function (item, index) {
      for (var i = 0; i < item.length; i++) {
        res[offset + i] = item[i];
      }
      offset += item.length;
    });
    return res;
  }
  var CryptoKey = function (_CryptoKey$) {
    _inherits(CryptoKey, _CryptoKey$);
    var _super95 = _createSuper(CryptoKey);
    function CryptoKey(algorithm, extractable, type, usages) {
      var _this81;
      _classCallCheck(this, CryptoKey);
      _this81 = _super95.call(this);
      _this81.extractable = extractable;
      _this81.type = type;
      _this81.usages = usages;
      _this81.algorithm = Object.assign({}, algorithm);
      return _this81;
    }
    return _createClass(CryptoKey);
  }(CryptoKey$1);
  function string_to_bytes(str) {
    var utf8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var len = str.length,
      bytes = new Uint8Array(utf8 ? 4 * len : len);
    for (var i = 0, j = 0; i < len; i++) {
      var c = str.charCodeAt(i);
      if (utf8 && 0xd800 <= c && c <= 0xdbff) {
        if (++i >= len) throw new Error('Malformed string, low surrogate expected at position ' + i);
        c = (c ^ 0xd800) << 10 | 0x10000 | str.charCodeAt(i) ^ 0xdc00;
      } else if (!utf8 && c >>> 8) {
        throw new Error('Wide characters are not allowed.');
      }
      if (!utf8 || c <= 0x7f) {
        bytes[j++] = c;
      } else if (c <= 0x7ff) {
        bytes[j++] = 0xc0 | c >> 6;
        bytes[j++] = 0x80 | c & 0x3f;
      } else if (c <= 0xffff) {
        bytes[j++] = 0xe0 | c >> 12;
        bytes[j++] = 0x80 | c >> 6 & 0x3f;
        bytes[j++] = 0x80 | c & 0x3f;
      } else {
        bytes[j++] = 0xf0 | c >> 18;
        bytes[j++] = 0x80 | c >> 12 & 0x3f;
        bytes[j++] = 0x80 | c >> 6 & 0x3f;
        bytes[j++] = 0x80 | c & 0x3f;
      }
    }
    return bytes.subarray(0, j);
  }
  function is_bytes(a) {
    return a instanceof Uint8Array;
  }
  function _heap_init(heap, heapSize) {
    var size = heap ? heap.byteLength : heapSize || 65536;
    if (size & 0xfff || size <= 0) throw new Error('heap size must be a positive integer and a multiple of 4096');
    heap = heap || new Uint8Array(new ArrayBuffer(size));
    return heap;
  }
  function _heap_write(heap, hpos, data, dpos, dlen) {
    var hlen = heap.length - hpos;
    var wlen = hlen < dlen ? hlen : dlen;
    heap.set(data.subarray(dpos, dpos + wlen), hpos);
    return wlen;
  }
  function joinBytes() {
    for (var _len33 = arguments.length, arg = new Array(_len33), _key35 = 0; _key35 < _len33; _key35++) {
      arg[_key35] = arguments[_key35];
    }
    var totalLenght = arg.reduce(function (sum, curr) {
      return sum + curr.length;
    }, 0);
    var ret = new Uint8Array(totalLenght);
    var cursor = 0;
    for (var i = 0; i < arg.length; i++) {
      ret.set(arg[i], cursor);
      cursor += arg[i].length;
    }
    return ret;
  }
  var IllegalStateError = function (_Error4) {
    _inherits(IllegalStateError, _Error4);
    var _super96 = _createSuper(IllegalStateError);
    function IllegalStateError() {
      _classCallCheck(this, IllegalStateError);
      for (var _len34 = arguments.length, args = new Array(_len34), _key36 = 0; _key36 < _len34; _key36++) {
        args[_key36] = arguments[_key36];
      }
      return _super96.call.apply(_super96, [this].concat(args));
    }
    return _createClass(IllegalStateError);
  }(_wrapNativeSuper(Error));
  var IllegalArgumentError = function (_Error5) {
    _inherits(IllegalArgumentError, _Error5);
    var _super97 = _createSuper(IllegalArgumentError);
    function IllegalArgumentError() {
      _classCallCheck(this, IllegalArgumentError);
      for (var _len35 = arguments.length, args = new Array(_len35), _key37 = 0; _key37 < _len35; _key37++) {
        args[_key37] = arguments[_key37];
      }
      return _super97.call.apply(_super97, [this].concat(args));
    }
    return _createClass(IllegalArgumentError);
  }(_wrapNativeSuper(Error));
  var SecurityError = function (_Error6) {
    _inherits(SecurityError, _Error6);
    var _super98 = _createSuper(SecurityError);
    function SecurityError() {
      _classCallCheck(this, SecurityError);
      for (var _len36 = arguments.length, args = new Array(_len36), _key38 = 0; _key38 < _len36; _key38++) {
        args[_key38] = arguments[_key38];
      }
      return _super98.call.apply(_super98, [this].concat(args));
    }
    return _createClass(SecurityError);
  }(_wrapNativeSuper(Error));
  /**
   * @file {@link http://asmjs.org Asm.js} implementation of the {@link https://en.wikipedia.org/wiki/Advanced_Encryption_Standard Advanced Encryption Standard}.
   * @author Artem S Vybornov <vybornov@gmail.com>
   * @license MIT
   */
  var AES_asm = function () {
    var ginit_done = false;
    var gexp3, glog3;
    function ginit() {
      gexp3 = [], glog3 = [];
      var a = 1,
        c,
        d;
      for (c = 0; c < 255; c++) {
        gexp3[c] = a;
        d = a & 0x80, a <<= 1, a &= 255;
        if (d === 0x80) a ^= 0x1b;
        a ^= gexp3[c];
        glog3[gexp3[c]] = c;
      }
      gexp3[255] = gexp3[0];
      glog3[0] = 0;
      ginit_done = true;
    }
    function gmul(a, b) {
      var c = gexp3[(glog3[a] + glog3[b]) % 255];
      if (a === 0 || b === 0) c = 0;
      return c;
    }
    function ginv(a) {
      var i = gexp3[255 - glog3[a]];
      if (a === 0) i = 0;
      return i;
    }
    var aes_init_done = false;
    var aes_sbox;
    var aes_sinv;
    var aes_enc;
    var aes_dec;
    function aes_init() {
      if (!ginit_done) ginit();
      function _s(a) {
        var c, s, x;
        s = x = ginv(a);
        for (c = 0; c < 4; c++) {
          s = (s << 1 | s >>> 7) & 255;
          x ^= s;
        }
        x ^= 99;
        return x;
      }
      aes_sbox = [], aes_sinv = [], aes_enc = [[], [], [], []], aes_dec = [[], [], [], []];
      for (var i = 0; i < 256; i++) {
        var s = _s(i);
        aes_sbox[i] = s;
        aes_sinv[s] = i;
        aes_enc[0][i] = gmul(2, s) << 24 | s << 16 | s << 8 | gmul(3, s);
        aes_dec[0][s] = gmul(14, i) << 24 | gmul(9, i) << 16 | gmul(13, i) << 8 | gmul(11, i);
        for (var t = 1; t < 4; t++) {
          aes_enc[t][i] = aes_enc[t - 1][i] >>> 8 | aes_enc[t - 1][i] << 24;
          aes_dec[t][s] = aes_dec[t - 1][s] >>> 8 | aes_dec[t - 1][s] << 24;
        }
      }
      aes_init_done = true;
    }
    var wrapper = function wrapper(foreign, buffer) {
      if (!aes_init_done) aes_init();
      var heap = new Uint32Array(buffer);
      heap.set(aes_sbox, 0x0800 >> 2);
      heap.set(aes_sinv, 0x0c00 >> 2);
      for (var i = 0; i < 4; i++) {
        heap.set(aes_enc[i], 0x1000 + 0x400 * i >> 2);
        heap.set(aes_dec[i], 0x2000 + 0x400 * i >> 2);
      }
      function set_key(ks, k0, k1, k2, k3, k4, k5, k6, k7) {
        var ekeys = heap.subarray(0x000, 60),
          dkeys = heap.subarray(0x100, 0x100 + 60);
        ekeys.set([k0, k1, k2, k3, k4, k5, k6, k7]);
        for (var i = ks, rcon = 1; i < 4 * ks + 28; i++) {
          var k = ekeys[i - 1];
          if (i % ks === 0 || ks === 8 && i % ks === 4) {
            k = aes_sbox[k >>> 24] << 24 ^ aes_sbox[k >>> 16 & 255] << 16 ^ aes_sbox[k >>> 8 & 255] << 8 ^ aes_sbox[k & 255];
          }
          if (i % ks === 0) {
            k = k << 8 ^ k >>> 24 ^ rcon << 24;
            rcon = rcon << 1 ^ (rcon & 0x80 ? 0x1b : 0);
          }
          ekeys[i] = ekeys[i - ks] ^ k;
        }
        for (var j = 0; j < i; j += 4) {
          for (var jj = 0; jj < 4; jj++) {
            var k = ekeys[i - (4 + j) + (4 - jj) % 4];
            if (j < 4 || j >= i - 4) {
              dkeys[j + jj] = k;
            } else {
              dkeys[j + jj] = aes_dec[0][aes_sbox[k >>> 24]] ^ aes_dec[1][aes_sbox[k >>> 16 & 255]] ^ aes_dec[2][aes_sbox[k >>> 8 & 255]] ^ aes_dec[3][aes_sbox[k & 255]];
            }
          }
        }
        asm.set_rounds(ks + 5);
      }
      var stdlib = {
        Uint8Array: Uint8Array,
        Uint32Array: Uint32Array
      };
      var asm = function (stdlib, foreign, buffer) {
        "use asm";

        var S0 = 0,
          S1 = 0,
          S2 = 0,
          S3 = 0,
          I0 = 0,
          I1 = 0,
          I2 = 0,
          I3 = 0,
          N0 = 0,
          N1 = 0,
          N2 = 0,
          N3 = 0,
          M0 = 0,
          M1 = 0,
          M2 = 0,
          M3 = 0,
          H0 = 0,
          H1 = 0,
          H2 = 0,
          H3 = 0,
          R = 0;
        var HEAP = new stdlib.Uint32Array(buffer),
          DATA = new stdlib.Uint8Array(buffer);
        function _core(k, s, t, r, x0, x1, x2, x3) {
          k = k | 0;
          s = s | 0;
          t = t | 0;
          r = r | 0;
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          var t1 = 0,
            t2 = 0,
            t3 = 0,
            y0 = 0,
            y1 = 0,
            y2 = 0,
            y3 = 0,
            i = 0;
          t1 = t | 0x400, t2 = t | 0x800, t3 = t | 0xc00;
          x0 = x0 ^ HEAP[(k | 0) >> 2], x1 = x1 ^ HEAP[(k | 4) >> 2], x2 = x2 ^ HEAP[(k | 8) >> 2], x3 = x3 ^ HEAP[(k | 12) >> 2];
          for (i = 16; (i | 0) <= r << 4; i = i + 16 | 0) {
            y0 = HEAP[(t | x0 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x1 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x2 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x3 << 2 & 1020) >> 2] ^ HEAP[(k | i | 0) >> 2], y1 = HEAP[(t | x1 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x2 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x3 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x0 << 2 & 1020) >> 2] ^ HEAP[(k | i | 4) >> 2], y2 = HEAP[(t | x2 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x3 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x0 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x1 << 2 & 1020) >> 2] ^ HEAP[(k | i | 8) >> 2], y3 = HEAP[(t | x3 >> 22 & 1020) >> 2] ^ HEAP[(t1 | x0 >> 14 & 1020) >> 2] ^ HEAP[(t2 | x1 >> 6 & 1020) >> 2] ^ HEAP[(t3 | x2 << 2 & 1020) >> 2] ^ HEAP[(k | i | 12) >> 2];
            x0 = y0, x1 = y1, x2 = y2, x3 = y3;
          }
          S0 = HEAP[(s | x0 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x1 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x2 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x3 << 2 & 1020) >> 2] ^ HEAP[(k | i | 0) >> 2], S1 = HEAP[(s | x1 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x2 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x3 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x0 << 2 & 1020) >> 2] ^ HEAP[(k | i | 4) >> 2], S2 = HEAP[(s | x2 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x3 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x0 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x1 << 2 & 1020) >> 2] ^ HEAP[(k | i | 8) >> 2], S3 = HEAP[(s | x3 >> 22 & 1020) >> 2] << 24 ^ HEAP[(s | x0 >> 14 & 1020) >> 2] << 16 ^ HEAP[(s | x1 >> 6 & 1020) >> 2] << 8 ^ HEAP[(s | x2 << 2 & 1020) >> 2] ^ HEAP[(k | i | 12) >> 2];
        }
        function _ecb_enc(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          _core(0x0000, 0x0800, 0x1000, R, x0, x1, x2, x3);
        }
        function _ecb_dec(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          var t = 0;
          _core(0x0400, 0x0c00, 0x2000, R, x0, x3, x2, x1);
          t = S1, S1 = S3, S3 = t;
        }
        function _cbc_enc(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          _core(0x0000, 0x0800, 0x1000, R, I0 ^ x0, I1 ^ x1, I2 ^ x2, I3 ^ x3);
          I0 = S0, I1 = S1, I2 = S2, I3 = S3;
        }
        function _cbc_dec(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          var t = 0;
          _core(0x0400, 0x0c00, 0x2000, R, x0, x3, x2, x1);
          t = S1, S1 = S3, S3 = t;
          S0 = S0 ^ I0, S1 = S1 ^ I1, S2 = S2 ^ I2, S3 = S3 ^ I3;
          I0 = x0, I1 = x1, I2 = x2, I3 = x3;
        }
        function _cfb_enc(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          _core(0x0000, 0x0800, 0x1000, R, I0, I1, I2, I3);
          I0 = S0 = S0 ^ x0, I1 = S1 = S1 ^ x1, I2 = S2 = S2 ^ x2, I3 = S3 = S3 ^ x3;
        }
        function _cfb_dec(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          _core(0x0000, 0x0800, 0x1000, R, I0, I1, I2, I3);
          S0 = S0 ^ x0, S1 = S1 ^ x1, S2 = S2 ^ x2, S3 = S3 ^ x3;
          I0 = x0, I1 = x1, I2 = x2, I3 = x3;
        }
        function _ofb(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          _core(0x0000, 0x0800, 0x1000, R, I0, I1, I2, I3);
          I0 = S0, I1 = S1, I2 = S2, I3 = S3;
          S0 = S0 ^ x0, S1 = S1 ^ x1, S2 = S2 ^ x2, S3 = S3 ^ x3;
        }
        function _ctr(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          _core(0x0000, 0x0800, 0x1000, R, N0, N1, N2, N3);
          N3 = ~M3 & N3 | M3 & N3 + 1;
          N2 = ~M2 & N2 | M2 & N2 + ((N3 | 0) == 0);
          N1 = ~M1 & N1 | M1 & N1 + ((N2 | 0) == 0);
          N0 = ~M0 & N0 | M0 & N0 + ((N1 | 0) == 0);
          S0 = S0 ^ x0;
          S1 = S1 ^ x1;
          S2 = S2 ^ x2;
          S3 = S3 ^ x3;
        }
        function _gcm_mac(x0, x1, x2, x3) {
          x0 = x0 | 0;
          x1 = x1 | 0;
          x2 = x2 | 0;
          x3 = x3 | 0;
          var y0 = 0,
            y1 = 0,
            y2 = 0,
            y3 = 0,
            z0 = 0,
            z1 = 0,
            z2 = 0,
            z3 = 0,
            i = 0,
            c = 0;
          x0 = x0 ^ I0, x1 = x1 ^ I1, x2 = x2 ^ I2, x3 = x3 ^ I3;
          y0 = H0 | 0, y1 = H1 | 0, y2 = H2 | 0, y3 = H3 | 0;
          for (; (i | 0) < 128; i = i + 1 | 0) {
            if (y0 >>> 31) {
              z0 = z0 ^ x0, z1 = z1 ^ x1, z2 = z2 ^ x2, z3 = z3 ^ x3;
            }
            y0 = y0 << 1 | y1 >>> 31, y1 = y1 << 1 | y2 >>> 31, y2 = y2 << 1 | y3 >>> 31, y3 = y3 << 1;
            c = x3 & 1;
            x3 = x3 >>> 1 | x2 << 31, x2 = x2 >>> 1 | x1 << 31, x1 = x1 >>> 1 | x0 << 31, x0 = x0 >>> 1;
            if (c) x0 = x0 ^ 0xe1000000;
          }
          I0 = z0, I1 = z1, I2 = z2, I3 = z3;
        }
        function set_rounds(r) {
          r = r | 0;
          R = r;
        }
        function set_state(s0, s1, s2, s3) {
          s0 = s0 | 0;
          s1 = s1 | 0;
          s2 = s2 | 0;
          s3 = s3 | 0;
          S0 = s0, S1 = s1, S2 = s2, S3 = s3;
        }
        function set_iv(i0, i1, i2, i3) {
          i0 = i0 | 0;
          i1 = i1 | 0;
          i2 = i2 | 0;
          i3 = i3 | 0;
          I0 = i0, I1 = i1, I2 = i2, I3 = i3;
        }
        function set_nonce(n0, n1, n2, n3) {
          n0 = n0 | 0;
          n1 = n1 | 0;
          n2 = n2 | 0;
          n3 = n3 | 0;
          N0 = n0, N1 = n1, N2 = n2, N3 = n3;
        }
        function set_mask(m0, m1, m2, m3) {
          m0 = m0 | 0;
          m1 = m1 | 0;
          m2 = m2 | 0;
          m3 = m3 | 0;
          M0 = m0, M1 = m1, M2 = m2, M3 = m3;
        }
        function set_counter(c0, c1, c2, c3) {
          c0 = c0 | 0;
          c1 = c1 | 0;
          c2 = c2 | 0;
          c3 = c3 | 0;
          N3 = ~M3 & N3 | M3 & c3, N2 = ~M2 & N2 | M2 & c2, N1 = ~M1 & N1 | M1 & c1, N0 = ~M0 & N0 | M0 & c0;
        }
        function get_state(pos) {
          pos = pos | 0;
          if (pos & 15) return -1;
          DATA[pos | 0] = S0 >>> 24, DATA[pos | 1] = S0 >>> 16 & 255, DATA[pos | 2] = S0 >>> 8 & 255, DATA[pos | 3] = S0 & 255, DATA[pos | 4] = S1 >>> 24, DATA[pos | 5] = S1 >>> 16 & 255, DATA[pos | 6] = S1 >>> 8 & 255, DATA[pos | 7] = S1 & 255, DATA[pos | 8] = S2 >>> 24, DATA[pos | 9] = S2 >>> 16 & 255, DATA[pos | 10] = S2 >>> 8 & 255, DATA[pos | 11] = S2 & 255, DATA[pos | 12] = S3 >>> 24, DATA[pos | 13] = S3 >>> 16 & 255, DATA[pos | 14] = S3 >>> 8 & 255, DATA[pos | 15] = S3 & 255;
          return 16;
        }
        function get_iv(pos) {
          pos = pos | 0;
          if (pos & 15) return -1;
          DATA[pos | 0] = I0 >>> 24, DATA[pos | 1] = I0 >>> 16 & 255, DATA[pos | 2] = I0 >>> 8 & 255, DATA[pos | 3] = I0 & 255, DATA[pos | 4] = I1 >>> 24, DATA[pos | 5] = I1 >>> 16 & 255, DATA[pos | 6] = I1 >>> 8 & 255, DATA[pos | 7] = I1 & 255, DATA[pos | 8] = I2 >>> 24, DATA[pos | 9] = I2 >>> 16 & 255, DATA[pos | 10] = I2 >>> 8 & 255, DATA[pos | 11] = I2 & 255, DATA[pos | 12] = I3 >>> 24, DATA[pos | 13] = I3 >>> 16 & 255, DATA[pos | 14] = I3 >>> 8 & 255, DATA[pos | 15] = I3 & 255;
          return 16;
        }
        function gcm_init() {
          _ecb_enc(0, 0, 0, 0);
          H0 = S0, H1 = S1, H2 = S2, H3 = S3;
        }
        function cipher(mode, pos, len) {
          mode = mode | 0;
          pos = pos | 0;
          len = len | 0;
          var ret = 0;
          if (pos & 15) return -1;
          while ((len | 0) >= 16) {
            _cipher_modes[mode & 7](DATA[pos | 0] << 24 | DATA[pos | 1] << 16 | DATA[pos | 2] << 8 | DATA[pos | 3], DATA[pos | 4] << 24 | DATA[pos | 5] << 16 | DATA[pos | 6] << 8 | DATA[pos | 7], DATA[pos | 8] << 24 | DATA[pos | 9] << 16 | DATA[pos | 10] << 8 | DATA[pos | 11], DATA[pos | 12] << 24 | DATA[pos | 13] << 16 | DATA[pos | 14] << 8 | DATA[pos | 15]);
            DATA[pos | 0] = S0 >>> 24, DATA[pos | 1] = S0 >>> 16 & 255, DATA[pos | 2] = S0 >>> 8 & 255, DATA[pos | 3] = S0 & 255, DATA[pos | 4] = S1 >>> 24, DATA[pos | 5] = S1 >>> 16 & 255, DATA[pos | 6] = S1 >>> 8 & 255, DATA[pos | 7] = S1 & 255, DATA[pos | 8] = S2 >>> 24, DATA[pos | 9] = S2 >>> 16 & 255, DATA[pos | 10] = S2 >>> 8 & 255, DATA[pos | 11] = S2 & 255, DATA[pos | 12] = S3 >>> 24, DATA[pos | 13] = S3 >>> 16 & 255, DATA[pos | 14] = S3 >>> 8 & 255, DATA[pos | 15] = S3 & 255;
            ret = ret + 16 | 0, pos = pos + 16 | 0, len = len - 16 | 0;
          }
          return ret | 0;
        }
        function mac(mode, pos, len) {
          mode = mode | 0;
          pos = pos | 0;
          len = len | 0;
          var ret = 0;
          if (pos & 15) return -1;
          while ((len | 0) >= 16) {
            _mac_modes[mode & 1](DATA[pos | 0] << 24 | DATA[pos | 1] << 16 | DATA[pos | 2] << 8 | DATA[pos | 3], DATA[pos | 4] << 24 | DATA[pos | 5] << 16 | DATA[pos | 6] << 8 | DATA[pos | 7], DATA[pos | 8] << 24 | DATA[pos | 9] << 16 | DATA[pos | 10] << 8 | DATA[pos | 11], DATA[pos | 12] << 24 | DATA[pos | 13] << 16 | DATA[pos | 14] << 8 | DATA[pos | 15]);
            ret = ret + 16 | 0, pos = pos + 16 | 0, len = len - 16 | 0;
          }
          return ret | 0;
        }
        var _cipher_modes = [_ecb_enc, _ecb_dec, _cbc_enc, _cbc_dec, _cfb_enc, _cfb_dec, _ofb, _ctr];
        var _mac_modes = [_cbc_enc, _gcm_mac];
        return {
          set_rounds: set_rounds,
          set_state: set_state,
          set_iv: set_iv,
          set_nonce: set_nonce,
          set_mask: set_mask,
          set_counter: set_counter,
          get_state: get_state,
          get_iv: get_iv,
          gcm_init: gcm_init,
          cipher: cipher,
          mac: mac
        };
      }(stdlib, foreign, buffer);
      asm.set_key = set_key;
      return asm;
    };
    wrapper.ENC = {
      ECB: 0,
      CBC: 2,
      CFB: 4,
      OFB: 6,
      CTR: 7
    }, wrapper.DEC = {
      ECB: 1,
      CBC: 3,
      CFB: 5,
      OFB: 6,
      CTR: 7
    }, wrapper.MAC = {
      CBC: 0,
      GCM: 1
    };
    wrapper.HEAP_DATA = 0x4000;
    return wrapper;
  }();
  var AES = function () {
    function AES(key, iv) {
      var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var mode = arguments.length > 3 ? arguments[3] : undefined;
      _classCallCheck(this, AES);
      this.pos = 0;
      this.len = 0;
      this.mode = mode;
      this.heap = _heap_init().subarray(AES_asm.HEAP_DATA);
      this.asm = new AES_asm(null, this.heap.buffer);
      this.pos = 0;
      this.len = 0;
      var keylen = key.length;
      if (keylen !== 16 && keylen !== 24 && keylen !== 32) throw new IllegalArgumentError('illegal key size');
      var keyview = new DataView(key.buffer, key.byteOffset, key.byteLength);
      this.asm.set_key(keylen >> 2, keyview.getUint32(0), keyview.getUint32(4), keyview.getUint32(8), keyview.getUint32(12), keylen > 16 ? keyview.getUint32(16) : 0, keylen > 16 ? keyview.getUint32(20) : 0, keylen > 24 ? keyview.getUint32(24) : 0, keylen > 24 ? keyview.getUint32(28) : 0);
      if (iv !== undefined) {
        if (iv.length !== 16) throw new IllegalArgumentError('illegal iv size');
        var ivview = new DataView(iv.buffer, iv.byteOffset, iv.byteLength);
        this.asm.set_iv(ivview.getUint32(0), ivview.getUint32(4), ivview.getUint32(8), ivview.getUint32(12));
      } else {
        this.asm.set_iv(0, 0, 0, 0);
      }
      this.padding = padding;
    }
    _createClass(AES, [{
      key: "AES_Encrypt_process",
      value: function AES_Encrypt_process(data) {
        if (!is_bytes(data)) throw new TypeError("data isn't of expected type");
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.ENC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var dpos = 0;
        var dlen = data.length || 0;
        var rpos = 0;
        var rlen = len + dlen & -16;
        var wlen = 0;
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
          wlen = _heap_write(heap, pos + len, data, dpos, dlen);
          len += wlen;
          dpos += wlen;
          dlen -= wlen;
          wlen = asm.cipher(amode, hpos + pos, len);
          if (wlen) result.set(heap.subarray(pos, pos + wlen), rpos);
          rpos += wlen;
          if (wlen < len) {
            pos += wlen;
            len -= wlen;
          } else {
            pos = 0;
            len = 0;
          }
        }
        this.pos = pos;
        this.len = len;
        return result;
      }
    }, {
      key: "AES_Encrypt_finish",
      value: function AES_Encrypt_finish() {
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.ENC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var plen = 16 - len % 16;
        var rlen = len;
        if (this.hasOwnProperty('padding')) {
          if (this.padding) {
            for (var p = 0; p < plen; ++p) {
              heap[pos + len + p] = plen;
            }
            len += plen;
            rlen = len;
          } else if (len % 16) {
            throw new IllegalArgumentError('data length must be a multiple of the block size');
          }
        } else {
          len += plen;
        }
        var result = new Uint8Array(rlen);
        if (len) asm.cipher(amode, hpos + pos, len);
        if (rlen) result.set(heap.subarray(pos, pos + rlen));
        this.pos = 0;
        this.len = 0;
        return result;
      }
    }, {
      key: "AES_Decrypt_process",
      value: function AES_Decrypt_process(data) {
        if (!is_bytes(data)) throw new TypeError("data isn't of expected type");
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.DEC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var dpos = 0;
        var dlen = data.length || 0;
        var rpos = 0;
        var rlen = len + dlen & -16;
        var plen = 0;
        var wlen = 0;
        if (this.padding) {
          plen = len + dlen - rlen || 16;
          rlen -= plen;
        }
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
          wlen = _heap_write(heap, pos + len, data, dpos, dlen);
          len += wlen;
          dpos += wlen;
          dlen -= wlen;
          wlen = asm.cipher(amode, hpos + pos, len - (!dlen ? plen : 0));
          if (wlen) result.set(heap.subarray(pos, pos + wlen), rpos);
          rpos += wlen;
          if (wlen < len) {
            pos += wlen;
            len -= wlen;
          } else {
            pos = 0;
            len = 0;
          }
        }
        this.pos = pos;
        this.len = len;
        return result;
      }
    }, {
      key: "AES_Decrypt_finish",
      value: function AES_Decrypt_finish() {
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.DEC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var rlen = len;
        if (len > 0) {
          if (len % 16) {
            if (this.hasOwnProperty('padding')) {
              throw new IllegalArgumentError('data length must be a multiple of the block size');
            } else {
              len += 16 - len % 16;
            }
          }
          asm.cipher(amode, hpos + pos, len);
          if (this.hasOwnProperty('padding') && this.padding) {
            var pad = heap[pos + rlen - 1];
            if (pad < 1 || pad > 16 || pad > rlen) throw new SecurityError('bad padding');
            var pcheck = 0;
            for (var i = pad; i > 1; i--) pcheck |= pad ^ heap[pos + rlen - i];
            if (pcheck) throw new SecurityError('bad padding');
            rlen -= pad;
          }
        }
        var result = new Uint8Array(rlen);
        if (rlen > 0) {
          result.set(heap.subarray(pos, pos + rlen));
        }
        this.pos = 0;
        this.len = 0;
        return result;
      }
    }]);
    return AES;
  }();
  var AES_CBC = function (_AES) {
    _inherits(AES_CBC, _AES);
    var _super99 = _createSuper(AES_CBC);
    function AES_CBC(key, iv) {
      var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      _classCallCheck(this, AES_CBC);
      return _super99.call(this, key, iv, padding, 'CBC');
    }
    _createClass(AES_CBC, [{
      key: "encrypt",
      value: function encrypt(data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data) {
        var r1 = this.AES_Decrypt_process(data);
        var r2 = this.AES_Decrypt_finish();
        return joinBytes(r1, r2);
      }
    }], [{
      key: "encrypt",
      value: function encrypt(data, key) {
        var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var iv = arguments.length > 3 ? arguments[3] : undefined;
        return new AES_CBC(key, iv, padding).encrypt(data);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data, key) {
        var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var iv = arguments.length > 3 ? arguments[3] : undefined;
        return new AES_CBC(key, iv, padding).decrypt(data);
      }
    }]);
    return AES_CBC;
  }(AES);
  var AES_ECB = function (_AES2) {
    _inherits(AES_ECB, _AES2);
    var _super100 = _createSuper(AES_ECB);
    function AES_ECB(key) {
      var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classCallCheck(this, AES_ECB);
      return _super100.call(this, key, undefined, padding, 'ECB');
    }
    _createClass(AES_ECB, [{
      key: "encrypt",
      value: function encrypt(data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data) {
        var r1 = this.AES_Decrypt_process(data);
        var r2 = this.AES_Decrypt_finish();
        return joinBytes(r1, r2);
      }
    }], [{
      key: "encrypt",
      value: function encrypt(data, key) {
        var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return new AES_ECB(key, padding).encrypt(data);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data, key) {
        var padding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        return new AES_ECB(key, padding).decrypt(data);
      }
    }]);
    return AES_ECB;
  }(AES);
  var AES_CTR = function (_AES3) {
    _inherits(AES_CTR, _AES3);
    var _super101 = _createSuper(AES_CTR);
    function AES_CTR(key, nonce) {
      var _this82;
      _classCallCheck(this, AES_CTR);
      _this82 = _super101.call(this, key, undefined, false, 'CTR');
      delete _this82.padding;
      _this82.AES_CTR_set_options(nonce);
      return _this82;
    }
    _createClass(AES_CTR, [{
      key: "encrypt",
      value: function encrypt(data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
      }
    }, {
      key: "AES_CTR_set_options",
      value: function AES_CTR_set_options(nonce, counter, size) {
        if (size !== undefined) {
          if (size < 8 || size > 48) throw new IllegalArgumentError('illegal counter size');
          var mask = Math.pow(2, size) - 1;
          this.asm.set_mask(0, 0, mask / 0x100000000 | 0, mask | 0);
        } else {
          size = 48;
          this.asm.set_mask(0, 0, 0xffff, 0xffffffff);
        }
        if (nonce !== undefined) {
          var len = nonce.length;
          if (!len || len > 16) throw new IllegalArgumentError('illegal nonce size');
          var view = new DataView(new ArrayBuffer(16));
          new Uint8Array(view.buffer).set(nonce);
          this.asm.set_nonce(view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12));
        } else {
          throw new Error('nonce is required');
        }
        if (counter !== undefined) {
          if (counter < 0 || counter >= Math.pow(2, size)) throw new IllegalArgumentError('illegal counter value');
          this.asm.set_counter(0, 0, counter / 0x100000000 | 0, counter | 0);
        }
      }
    }], [{
      key: "encrypt",
      value: function encrypt(data, key, nonce) {
        return new AES_CTR(key, nonce).encrypt(data);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data, key, nonce) {
        return new AES_CTR(key, nonce).encrypt(data);
      }
    }]);
    return AES_CTR;
  }(AES);
  var _AES_GCM_data_maxLength = 68719476704;
  var AES_GCM = function (_AES4) {
    _inherits(AES_GCM, _AES4);
    var _super102 = _createSuper(AES_GCM);
    function AES_GCM(key, nonce, adata) {
      var _this83;
      var tagSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 16;
      _classCallCheck(this, AES_GCM);
      _this83 = _super102.call(this, key, undefined, false, 'CTR');
      _this83.tagSize = tagSize;
      _this83.gamma0 = 0;
      _this83.counter = 1;
      _this83.asm.gcm_init();
      if (_this83.tagSize < 4 || _this83.tagSize > 16) throw new IllegalArgumentError('illegal tagSize value');
      var noncelen = nonce.length || 0;
      var noncebuf = new Uint8Array(16);
      if (noncelen !== 12) {
        _this83._gcm_mac_process(nonce);
        _this83.heap[0] = 0;
        _this83.heap[1] = 0;
        _this83.heap[2] = 0;
        _this83.heap[3] = 0;
        _this83.heap[4] = 0;
        _this83.heap[5] = 0;
        _this83.heap[6] = 0;
        _this83.heap[7] = 0;
        _this83.heap[8] = 0;
        _this83.heap[9] = 0;
        _this83.heap[10] = 0;
        _this83.heap[11] = noncelen >>> 29;
        _this83.heap[12] = noncelen >>> 21 & 255;
        _this83.heap[13] = noncelen >>> 13 & 255;
        _this83.heap[14] = noncelen >>> 5 & 255;
        _this83.heap[15] = noncelen << 3 & 255;
        _this83.asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, 16);
        _this83.asm.get_iv(AES_asm.HEAP_DATA);
        _this83.asm.set_iv(0, 0, 0, 0);
        noncebuf.set(_this83.heap.subarray(0, 16));
      } else {
        noncebuf.set(nonce);
        noncebuf[15] = 1;
      }
      var nonceview = new DataView(noncebuf.buffer);
      _this83.gamma0 = nonceview.getUint32(12);
      _this83.asm.set_nonce(nonceview.getUint32(0), nonceview.getUint32(4), nonceview.getUint32(8), 0);
      _this83.asm.set_mask(0, 0, 0, 0xffffffff);
      if (adata !== undefined) {
        if (adata.length > _AES_GCM_data_maxLength) throw new IllegalArgumentError('illegal adata length');
        if (adata.length) {
          _this83.adata = adata;
          _this83._gcm_mac_process(adata);
        } else {
          _this83.adata = undefined;
        }
      } else {
        _this83.adata = undefined;
      }
      if (_this83.counter < 1 || _this83.counter > 0xffffffff) throw new RangeError('counter must be a positive 32-bit integer');
      _this83.asm.set_counter(0, 0, 0, _this83.gamma0 + _this83.counter | 0);
      return _this83;
    }
    _createClass(AES_GCM, [{
      key: "encrypt",
      value: function encrypt(data) {
        return this.AES_GCM_encrypt(data);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data) {
        return this.AES_GCM_decrypt(data);
      }
    }, {
      key: "AES_GCM_Encrypt_process",
      value: function AES_GCM_Encrypt_process(data) {
        var dpos = 0;
        var dlen = data.length || 0;
        var asm = this.asm;
        var heap = this.heap;
        var counter = this.counter;
        var pos = this.pos;
        var len = this.len;
        var rpos = 0;
        var rlen = len + dlen & -16;
        var wlen = 0;
        if ((counter - 1 << 4) + len + dlen > _AES_GCM_data_maxLength) throw new RangeError('counter overflow');
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
          wlen = _heap_write(heap, pos + len, data, dpos, dlen);
          len += wlen;
          dpos += wlen;
          dlen -= wlen;
          wlen = asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA + pos, len);
          wlen = asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, wlen);
          if (wlen) result.set(heap.subarray(pos, pos + wlen), rpos);
          counter += wlen >>> 4;
          rpos += wlen;
          if (wlen < len) {
            pos += wlen;
            len -= wlen;
          } else {
            pos = 0;
            len = 0;
          }
        }
        this.counter = counter;
        this.pos = pos;
        this.len = len;
        return result;
      }
    }, {
      key: "AES_GCM_Encrypt_finish",
      value: function AES_GCM_Encrypt_finish() {
        var asm = this.asm;
        var heap = this.heap;
        var counter = this.counter;
        var tagSize = this.tagSize;
        var adata = this.adata;
        var pos = this.pos;
        var len = this.len;
        var result = new Uint8Array(len + tagSize);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA + pos, len + 15 & -16);
        if (len) result.set(heap.subarray(pos, pos + len));
        var i = len;
        for (; i & 15; i++) heap[pos + i] = 0;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, i);
        var alen = adata !== undefined ? adata.length : 0;
        var clen = (counter - 1 << 4) + len;
        heap[0] = 0;
        heap[1] = 0;
        heap[2] = 0;
        heap[3] = alen >>> 29;
        heap[4] = alen >>> 21;
        heap[5] = alen >>> 13 & 255;
        heap[6] = alen >>> 5 & 255;
        heap[7] = alen << 3 & 255;
        heap[8] = heap[9] = heap[10] = 0;
        heap[11] = clen >>> 29;
        heap[12] = clen >>> 21 & 255;
        heap[13] = clen >>> 13 & 255;
        heap[14] = clen >>> 5 & 255;
        heap[15] = clen << 3 & 255;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, 16);
        asm.get_iv(AES_asm.HEAP_DATA);
        asm.set_counter(0, 0, 0, this.gamma0);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA, 16);
        result.set(heap.subarray(0, tagSize), len);
        this.counter = 1;
        this.pos = 0;
        this.len = 0;
        return result;
      }
    }, {
      key: "AES_GCM_Decrypt_process",
      value: function AES_GCM_Decrypt_process(data) {
        var dpos = 0;
        var dlen = data.length || 0;
        var asm = this.asm;
        var heap = this.heap;
        var counter = this.counter;
        var tagSize = this.tagSize;
        var pos = this.pos;
        var len = this.len;
        var rpos = 0;
        var rlen = len + dlen > tagSize ? len + dlen - tagSize & -16 : 0;
        var tlen = len + dlen - rlen;
        var wlen = 0;
        if ((counter - 1 << 4) + len + dlen > _AES_GCM_data_maxLength) throw new RangeError('counter overflow');
        var result = new Uint8Array(rlen);
        while (dlen > tlen) {
          wlen = _heap_write(heap, pos + len, data, dpos, dlen - tlen);
          len += wlen;
          dpos += wlen;
          dlen -= wlen;
          wlen = asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, wlen);
          wlen = asm.cipher(AES_asm.DEC.CTR, AES_asm.HEAP_DATA + pos, wlen);
          if (wlen) result.set(heap.subarray(pos, pos + wlen), rpos);
          counter += wlen >>> 4;
          rpos += wlen;
          pos = 0;
          len = 0;
        }
        if (dlen > 0) {
          len += _heap_write(heap, 0, data, dpos, dlen);
        }
        this.counter = counter;
        this.pos = pos;
        this.len = len;
        return result;
      }
    }, {
      key: "AES_GCM_Decrypt_finish",
      value: function AES_GCM_Decrypt_finish() {
        var asm = this.asm;
        var heap = this.heap;
        var tagSize = this.tagSize;
        var adata = this.adata;
        var counter = this.counter;
        var pos = this.pos;
        var len = this.len;
        var rlen = len - tagSize;
        if (len < tagSize) throw new IllegalStateError('authentication tag not found');
        var result = new Uint8Array(rlen);
        var atag = new Uint8Array(heap.subarray(pos + rlen, pos + len));
        var i = rlen;
        for (; i & 15; i++) heap[pos + i] = 0;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, i);
        asm.cipher(AES_asm.DEC.CTR, AES_asm.HEAP_DATA + pos, i);
        if (rlen) result.set(heap.subarray(pos, pos + rlen));
        var alen = adata !== undefined ? adata.length : 0;
        var clen = (counter - 1 << 4) + len - tagSize;
        heap[0] = 0;
        heap[1] = 0;
        heap[2] = 0;
        heap[3] = alen >>> 29;
        heap[4] = alen >>> 21;
        heap[5] = alen >>> 13 & 255;
        heap[6] = alen >>> 5 & 255;
        heap[7] = alen << 3 & 255;
        heap[8] = heap[9] = heap[10] = 0;
        heap[11] = clen >>> 29;
        heap[12] = clen >>> 21 & 255;
        heap[13] = clen >>> 13 & 255;
        heap[14] = clen >>> 5 & 255;
        heap[15] = clen << 3 & 255;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, 16);
        asm.get_iv(AES_asm.HEAP_DATA);
        asm.set_counter(0, 0, 0, this.gamma0);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA, 16);
        var acheck = 0;
        for (var _i15 = 0; _i15 < tagSize; ++_i15) acheck |= atag[_i15] ^ heap[_i15];
        if (acheck) throw new SecurityError('data integrity check failed');
        this.counter = 1;
        this.pos = 0;
        this.len = 0;
        return result;
      }
    }, {
      key: "AES_GCM_decrypt",
      value: function AES_GCM_decrypt(data) {
        var result1 = this.AES_GCM_Decrypt_process(data);
        var result2 = this.AES_GCM_Decrypt_finish();
        var result = new Uint8Array(result1.length + result2.length);
        if (result1.length) result.set(result1);
        if (result2.length) result.set(result2, result1.length);
        return result;
      }
    }, {
      key: "AES_GCM_encrypt",
      value: function AES_GCM_encrypt(data) {
        var result1 = this.AES_GCM_Encrypt_process(data);
        var result2 = this.AES_GCM_Encrypt_finish();
        var result = new Uint8Array(result1.length + result2.length);
        if (result1.length) result.set(result1);
        if (result2.length) result.set(result2, result1.length);
        return result;
      }
    }, {
      key: "_gcm_mac_process",
      value: function _gcm_mac_process(data) {
        var heap = this.heap;
        var asm = this.asm;
        var dpos = 0;
        var dlen = data.length || 0;
        var wlen = 0;
        while (dlen > 0) {
          wlen = _heap_write(heap, 0, data, dpos, dlen);
          dpos += wlen;
          dlen -= wlen;
          while (wlen & 15) heap[wlen++] = 0;
          asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, wlen);
        }
      }
    }], [{
      key: "encrypt",
      value: function encrypt(cleartext, key, nonce, adata, tagsize) {
        return new AES_GCM(key, nonce, adata, tagsize).encrypt(cleartext);
      }
    }, {
      key: "decrypt",
      value: function decrypt(ciphertext, key, nonce, adata, tagsize) {
        return new AES_GCM(key, nonce, adata, tagsize).decrypt(ciphertext);
      }
    }]);
    return AES_GCM;
  }(AES);
  var bigint_asm = function bigint_asm(stdlib, foreign, buffer) {
    "use asm";

    var SP = 0;
    var HEAP32 = new stdlib.Uint32Array(buffer);
    var imul = stdlib.Math.imul;
    function sreset(p) {
      p = p | 0;
      SP = p = p + 31 & -32;
      return p | 0;
    }
    function salloc(l) {
      l = l | 0;
      var p = 0;
      p = SP;
      SP = p + (l + 31 & -32) | 0;
      return p | 0;
    }
    function sfree(l) {
      l = l | 0;
      SP = SP - (l + 31 & -32) | 0;
    }
    function cp(l, A, B) {
      l = l | 0;
      A = A | 0;
      B = B | 0;
      var i = 0;
      if ((A | 0) > (B | 0)) {
        for (; (i | 0) < (l | 0); i = i + 4 | 0) {
          HEAP32[B + i >> 2] = HEAP32[A + i >> 2];
        }
      } else {
        for (i = l - 4 | 0; (i | 0) >= 0; i = i - 4 | 0) {
          HEAP32[B + i >> 2] = HEAP32[A + i >> 2];
        }
      }
    }
    function z(l, z, A) {
      l = l | 0;
      z = z | 0;
      A = A | 0;
      var i = 0;
      for (; (i | 0) < (l | 0); i = i + 4 | 0) {
        HEAP32[A + i >> 2] = z;
      }
    }
    function neg(A, lA, R, lR) {
      A = A | 0;
      lA = lA | 0;
      R = R | 0;
      lR = lR | 0;
      var a = 0,
        c = 0,
        t = 0,
        r = 0,
        i = 0;
      if ((lR | 0) <= 0) lR = lA;
      if ((lR | 0) < (lA | 0)) lA = lR;
      c = 1;
      for (; (i | 0) < (lA | 0); i = i + 4 | 0) {
        a = ~HEAP32[A + i >> 2];
        t = (a & 0xffff) + c | 0;
        r = (a >>> 16) + (t >>> 16) | 0;
        HEAP32[R + i >> 2] = r << 16 | t & 0xffff;
        c = r >>> 16;
      }
      for (; (i | 0) < (lR | 0); i = i + 4 | 0) {
        HEAP32[R + i >> 2] = c - 1 | 0;
      }
      return c | 0;
    }
    function cmp(A, lA, B, lB) {
      A = A | 0;
      lA = lA | 0;
      B = B | 0;
      lB = lB | 0;
      var a = 0,
        b = 0,
        i = 0;
      if ((lA | 0) > (lB | 0)) {
        for (i = lA - 4 | 0; (i | 0) >= (lB | 0); i = i - 4 | 0) {
          if (HEAP32[A + i >> 2] | 0) return 1;
        }
      } else {
        for (i = lB - 4 | 0; (i | 0) >= (lA | 0); i = i - 4 | 0) {
          if (HEAP32[B + i >> 2] | 0) return -1;
        }
      }
      for (; (i | 0) >= 0; i = i - 4 | 0) {
        a = HEAP32[A + i >> 2] | 0, b = HEAP32[B + i >> 2] | 0;
        if (a >>> 0 < b >>> 0) return -1;
        if (a >>> 0 > b >>> 0) return 1;
      }
      return 0;
    }
    function tst(A, lA) {
      A = A | 0;
      lA = lA | 0;
      var i = 0;
      for (i = lA - 4 | 0; (i | 0) >= 0; i = i - 4 | 0) {
        if (HEAP32[A + i >> 2] | 0) return i + 4 | 0;
      }
      return 0;
    }
    function add(A, lA, B, lB, R, lR) {
      A = A | 0;
      lA = lA | 0;
      B = B | 0;
      lB = lB | 0;
      R = R | 0;
      lR = lR | 0;
      var a = 0,
        b = 0,
        c = 0,
        t = 0,
        r = 0,
        i = 0;
      if ((lA | 0) < (lB | 0)) {
        t = A, A = B, B = t;
        t = lA, lA = lB, lB = t;
      }
      if ((lR | 0) <= 0) lR = lA + 4 | 0;
      if ((lR | 0) < (lB | 0)) lA = lB = lR;
      for (; (i | 0) < (lB | 0); i = i + 4 | 0) {
        a = HEAP32[A + i >> 2] | 0;
        b = HEAP32[B + i >> 2] | 0;
        t = ((a & 0xffff) + (b & 0xffff) | 0) + c | 0;
        r = ((a >>> 16) + (b >>> 16) | 0) + (t >>> 16) | 0;
        HEAP32[R + i >> 2] = t & 0xffff | r << 16;
        c = r >>> 16;
      }
      for (; (i | 0) < (lA | 0); i = i + 4 | 0) {
        a = HEAP32[A + i >> 2] | 0;
        t = (a & 0xffff) + c | 0;
        r = (a >>> 16) + (t >>> 16) | 0;
        HEAP32[R + i >> 2] = t & 0xffff | r << 16;
        c = r >>> 16;
      }
      for (; (i | 0) < (lR | 0); i = i + 4 | 0) {
        HEAP32[R + i >> 2] = c | 0;
        c = 0;
      }
      return c | 0;
    }
    function sub(A, lA, B, lB, R, lR) {
      A = A | 0;
      lA = lA | 0;
      B = B | 0;
      lB = lB | 0;
      R = R | 0;
      lR = lR | 0;
      var a = 0,
        b = 0,
        c = 0,
        t = 0,
        r = 0,
        i = 0;
      if ((lR | 0) <= 0) lR = (lA | 0) > (lB | 0) ? lA + 4 | 0 : lB + 4 | 0;
      if ((lR | 0) < (lA | 0)) lA = lR;
      if ((lR | 0) < (lB | 0)) lB = lR;
      if ((lA | 0) < (lB | 0)) {
        for (; (i | 0) < (lA | 0); i = i + 4 | 0) {
          a = HEAP32[A + i >> 2] | 0;
          b = HEAP32[B + i >> 2] | 0;
          t = ((a & 0xffff) - (b & 0xffff) | 0) + c | 0;
          r = ((a >>> 16) - (b >>> 16) | 0) + (t >> 16) | 0;
          HEAP32[R + i >> 2] = t & 0xffff | r << 16;
          c = r >> 16;
        }
        for (; (i | 0) < (lB | 0); i = i + 4 | 0) {
          b = HEAP32[B + i >> 2] | 0;
          t = c - (b & 0xffff) | 0;
          r = (t >> 16) - (b >>> 16) | 0;
          HEAP32[R + i >> 2] = t & 0xffff | r << 16;
          c = r >> 16;
        }
      } else {
        for (; (i | 0) < (lB | 0); i = i + 4 | 0) {
          a = HEAP32[A + i >> 2] | 0;
          b = HEAP32[B + i >> 2] | 0;
          t = ((a & 0xffff) - (b & 0xffff) | 0) + c | 0;
          r = ((a >>> 16) - (b >>> 16) | 0) + (t >> 16) | 0;
          HEAP32[R + i >> 2] = t & 0xffff | r << 16;
          c = r >> 16;
        }
        for (; (i | 0) < (lA | 0); i = i + 4 | 0) {
          a = HEAP32[A + i >> 2] | 0;
          t = (a & 0xffff) + c | 0;
          r = (a >>> 16) + (t >> 16) | 0;
          HEAP32[R + i >> 2] = t & 0xffff | r << 16;
          c = r >> 16;
        }
      }
      for (; (i | 0) < (lR | 0); i = i + 4 | 0) {
        HEAP32[R + i >> 2] = c | 0;
      }
      return c | 0;
    }
    function mul(A, lA, B, lB, R, lR) {
      A = A | 0;
      lA = lA | 0;
      B = B | 0;
      lB = lB | 0;
      R = R | 0;
      lR = lR | 0;
      var al0 = 0,
        al1 = 0,
        al2 = 0,
        al3 = 0,
        al4 = 0,
        al5 = 0,
        al6 = 0,
        al7 = 0,
        ah0 = 0,
        ah1 = 0,
        ah2 = 0,
        ah3 = 0,
        ah4 = 0,
        ah5 = 0,
        ah6 = 0,
        ah7 = 0,
        bl0 = 0,
        bl1 = 0,
        bl2 = 0,
        bl3 = 0,
        bl4 = 0,
        bl5 = 0,
        bl6 = 0,
        bl7 = 0,
        bh0 = 0,
        bh1 = 0,
        bh2 = 0,
        bh3 = 0,
        bh4 = 0,
        bh5 = 0,
        bh6 = 0,
        bh7 = 0,
        r0 = 0,
        r1 = 0,
        r2 = 0,
        r3 = 0,
        r4 = 0,
        r5 = 0,
        r6 = 0,
        r7 = 0,
        r8 = 0,
        r9 = 0,
        r10 = 0,
        r11 = 0,
        r12 = 0,
        r13 = 0,
        r14 = 0,
        r15 = 0,
        u = 0,
        v = 0,
        w = 0,
        m = 0,
        i = 0,
        Ai = 0,
        j = 0,
        Bj = 0,
        Rk = 0;
      if ((lA | 0) > (lB | 0)) {
        u = A, v = lA;
        A = B, lA = lB;
        B = u, lB = v;
      }
      m = lA + lB | 0;
      if ((lR | 0) > (m | 0) | (lR | 0) <= 0) lR = m;
      if ((lR | 0) < (lA | 0)) lA = lR;
      if ((lR | 0) < (lB | 0)) lB = lR;
      for (; (i | 0) < (lA | 0); i = i + 32 | 0) {
        Ai = A + i | 0;
        ah0 = HEAP32[(Ai | 0) >> 2] | 0, ah1 = HEAP32[(Ai | 4) >> 2] | 0, ah2 = HEAP32[(Ai | 8) >> 2] | 0, ah3 = HEAP32[(Ai | 12) >> 2] | 0, ah4 = HEAP32[(Ai | 16) >> 2] | 0, ah5 = HEAP32[(Ai | 20) >> 2] | 0, ah6 = HEAP32[(Ai | 24) >> 2] | 0, ah7 = HEAP32[(Ai | 28) >> 2] | 0, al0 = ah0 & 0xffff, al1 = ah1 & 0xffff, al2 = ah2 & 0xffff, al3 = ah3 & 0xffff, al4 = ah4 & 0xffff, al5 = ah5 & 0xffff, al6 = ah6 & 0xffff, al7 = ah7 & 0xffff, ah0 = ah0 >>> 16, ah1 = ah1 >>> 16, ah2 = ah2 >>> 16, ah3 = ah3 >>> 16, ah4 = ah4 >>> 16, ah5 = ah5 >>> 16, ah6 = ah6 >>> 16, ah7 = ah7 >>> 16;
        r8 = r9 = r10 = r11 = r12 = r13 = r14 = r15 = 0;
        for (j = 0; (j | 0) < (lB | 0); j = j + 32 | 0) {
          Bj = B + j | 0;
          Rk = R + (i + j | 0) | 0;
          bh0 = HEAP32[(Bj | 0) >> 2] | 0, bh1 = HEAP32[(Bj | 4) >> 2] | 0, bh2 = HEAP32[(Bj | 8) >> 2] | 0, bh3 = HEAP32[(Bj | 12) >> 2] | 0, bh4 = HEAP32[(Bj | 16) >> 2] | 0, bh5 = HEAP32[(Bj | 20) >> 2] | 0, bh6 = HEAP32[(Bj | 24) >> 2] | 0, bh7 = HEAP32[(Bj | 28) >> 2] | 0, bl0 = bh0 & 0xffff, bl1 = bh1 & 0xffff, bl2 = bh2 & 0xffff, bl3 = bh3 & 0xffff, bl4 = bh4 & 0xffff, bl5 = bh5 & 0xffff, bl6 = bh6 & 0xffff, bl7 = bh7 & 0xffff, bh0 = bh0 >>> 16, bh1 = bh1 >>> 16, bh2 = bh2 >>> 16, bh3 = bh3 >>> 16, bh4 = bh4 >>> 16, bh5 = bh5 >>> 16, bh6 = bh6 >>> 16, bh7 = bh7 >>> 16;
          r0 = HEAP32[(Rk | 0) >> 2] | 0, r1 = HEAP32[(Rk | 4) >> 2] | 0, r2 = HEAP32[(Rk | 8) >> 2] | 0, r3 = HEAP32[(Rk | 12) >> 2] | 0, r4 = HEAP32[(Rk | 16) >> 2] | 0, r5 = HEAP32[(Rk | 20) >> 2] | 0, r6 = HEAP32[(Rk | 24) >> 2] | 0, r7 = HEAP32[(Rk | 28) >> 2] | 0;
          u = ((imul(al0, bl0) | 0) + (r8 & 0xffff) | 0) + (r0 & 0xffff) | 0;
          v = ((imul(ah0, bl0) | 0) + (r8 >>> 16) | 0) + (r0 >>> 16) | 0;
          w = ((imul(al0, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r0 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl1) | 0) + (m & 0xffff) | 0) + (r1 & 0xffff) | 0;
          v = ((imul(ah0, bl1) | 0) + (m >>> 16) | 0) + (r1 >>> 16) | 0;
          w = ((imul(al0, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r1 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl2) | 0) + (m & 0xffff) | 0) + (r2 & 0xffff) | 0;
          v = ((imul(ah0, bl2) | 0) + (m >>> 16) | 0) + (r2 >>> 16) | 0;
          w = ((imul(al0, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r2 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl3) | 0) + (m & 0xffff) | 0) + (r3 & 0xffff) | 0;
          v = ((imul(ah0, bl3) | 0) + (m >>> 16) | 0) + (r3 >>> 16) | 0;
          w = ((imul(al0, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r3 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl4) | 0) + (m & 0xffff) | 0) + (r4 & 0xffff) | 0;
          v = ((imul(ah0, bl4) | 0) + (m >>> 16) | 0) + (r4 >>> 16) | 0;
          w = ((imul(al0, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r4 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl5) | 0) + (m & 0xffff) | 0) + (r5 & 0xffff) | 0;
          v = ((imul(ah0, bl5) | 0) + (m >>> 16) | 0) + (r5 >>> 16) | 0;
          w = ((imul(al0, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r5 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl6) | 0) + (m & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah0, bl6) | 0) + (m >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al0, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al0, bl7) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah0, bl7) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al0, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah0, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          r8 = m;
          u = ((imul(al1, bl0) | 0) + (r9 & 0xffff) | 0) + (r1 & 0xffff) | 0;
          v = ((imul(ah1, bl0) | 0) + (r9 >>> 16) | 0) + (r1 >>> 16) | 0;
          w = ((imul(al1, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r1 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl1) | 0) + (m & 0xffff) | 0) + (r2 & 0xffff) | 0;
          v = ((imul(ah1, bl1) | 0) + (m >>> 16) | 0) + (r2 >>> 16) | 0;
          w = ((imul(al1, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r2 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl2) | 0) + (m & 0xffff) | 0) + (r3 & 0xffff) | 0;
          v = ((imul(ah1, bl2) | 0) + (m >>> 16) | 0) + (r3 >>> 16) | 0;
          w = ((imul(al1, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r3 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl3) | 0) + (m & 0xffff) | 0) + (r4 & 0xffff) | 0;
          v = ((imul(ah1, bl3) | 0) + (m >>> 16) | 0) + (r4 >>> 16) | 0;
          w = ((imul(al1, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r4 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl4) | 0) + (m & 0xffff) | 0) + (r5 & 0xffff) | 0;
          v = ((imul(ah1, bl4) | 0) + (m >>> 16) | 0) + (r5 >>> 16) | 0;
          w = ((imul(al1, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r5 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl5) | 0) + (m & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah1, bl5) | 0) + (m >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al1, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl6) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah1, bl6) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al1, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al1, bl7) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah1, bl7) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al1, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah1, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          r9 = m;
          u = ((imul(al2, bl0) | 0) + (r10 & 0xffff) | 0) + (r2 & 0xffff) | 0;
          v = ((imul(ah2, bl0) | 0) + (r10 >>> 16) | 0) + (r2 >>> 16) | 0;
          w = ((imul(al2, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r2 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl1) | 0) + (m & 0xffff) | 0) + (r3 & 0xffff) | 0;
          v = ((imul(ah2, bl1) | 0) + (m >>> 16) | 0) + (r3 >>> 16) | 0;
          w = ((imul(al2, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r3 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl2) | 0) + (m & 0xffff) | 0) + (r4 & 0xffff) | 0;
          v = ((imul(ah2, bl2) | 0) + (m >>> 16) | 0) + (r4 >>> 16) | 0;
          w = ((imul(al2, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r4 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl3) | 0) + (m & 0xffff) | 0) + (r5 & 0xffff) | 0;
          v = ((imul(ah2, bl3) | 0) + (m >>> 16) | 0) + (r5 >>> 16) | 0;
          w = ((imul(al2, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r5 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl4) | 0) + (m & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah2, bl4) | 0) + (m >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al2, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl5) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah2, bl5) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al2, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl6) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah2, bl6) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al2, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          u = ((imul(al2, bl7) | 0) + (m & 0xffff) | 0) + (r9 & 0xffff) | 0;
          v = ((imul(ah2, bl7) | 0) + (m >>> 16) | 0) + (r9 >>> 16) | 0;
          w = ((imul(al2, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah2, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r9 = w << 16 | u & 0xffff;
          r10 = m;
          u = ((imul(al3, bl0) | 0) + (r11 & 0xffff) | 0) + (r3 & 0xffff) | 0;
          v = ((imul(ah3, bl0) | 0) + (r11 >>> 16) | 0) + (r3 >>> 16) | 0;
          w = ((imul(al3, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r3 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl1) | 0) + (m & 0xffff) | 0) + (r4 & 0xffff) | 0;
          v = ((imul(ah3, bl1) | 0) + (m >>> 16) | 0) + (r4 >>> 16) | 0;
          w = ((imul(al3, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r4 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl2) | 0) + (m & 0xffff) | 0) + (r5 & 0xffff) | 0;
          v = ((imul(ah3, bl2) | 0) + (m >>> 16) | 0) + (r5 >>> 16) | 0;
          w = ((imul(al3, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r5 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl3) | 0) + (m & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah3, bl3) | 0) + (m >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al3, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl4) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah3, bl4) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al3, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl5) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah3, bl5) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al3, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl6) | 0) + (m & 0xffff) | 0) + (r9 & 0xffff) | 0;
          v = ((imul(ah3, bl6) | 0) + (m >>> 16) | 0) + (r9 >>> 16) | 0;
          w = ((imul(al3, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r9 = w << 16 | u & 0xffff;
          u = ((imul(al3, bl7) | 0) + (m & 0xffff) | 0) + (r10 & 0xffff) | 0;
          v = ((imul(ah3, bl7) | 0) + (m >>> 16) | 0) + (r10 >>> 16) | 0;
          w = ((imul(al3, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah3, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r10 = w << 16 | u & 0xffff;
          r11 = m;
          u = ((imul(al4, bl0) | 0) + (r12 & 0xffff) | 0) + (r4 & 0xffff) | 0;
          v = ((imul(ah4, bl0) | 0) + (r12 >>> 16) | 0) + (r4 >>> 16) | 0;
          w = ((imul(al4, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r4 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl1) | 0) + (m & 0xffff) | 0) + (r5 & 0xffff) | 0;
          v = ((imul(ah4, bl1) | 0) + (m >>> 16) | 0) + (r5 >>> 16) | 0;
          w = ((imul(al4, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r5 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl2) | 0) + (m & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah4, bl2) | 0) + (m >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al4, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl3) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah4, bl3) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al4, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl4) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah4, bl4) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al4, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl5) | 0) + (m & 0xffff) | 0) + (r9 & 0xffff) | 0;
          v = ((imul(ah4, bl5) | 0) + (m >>> 16) | 0) + (r9 >>> 16) | 0;
          w = ((imul(al4, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r9 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl6) | 0) + (m & 0xffff) | 0) + (r10 & 0xffff) | 0;
          v = ((imul(ah4, bl6) | 0) + (m >>> 16) | 0) + (r10 >>> 16) | 0;
          w = ((imul(al4, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r10 = w << 16 | u & 0xffff;
          u = ((imul(al4, bl7) | 0) + (m & 0xffff) | 0) + (r11 & 0xffff) | 0;
          v = ((imul(ah4, bl7) | 0) + (m >>> 16) | 0) + (r11 >>> 16) | 0;
          w = ((imul(al4, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah4, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r11 = w << 16 | u & 0xffff;
          r12 = m;
          u = ((imul(al5, bl0) | 0) + (r13 & 0xffff) | 0) + (r5 & 0xffff) | 0;
          v = ((imul(ah5, bl0) | 0) + (r13 >>> 16) | 0) + (r5 >>> 16) | 0;
          w = ((imul(al5, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r5 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl1) | 0) + (m & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah5, bl1) | 0) + (m >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al5, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl2) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah5, bl2) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al5, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl3) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah5, bl3) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al5, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl4) | 0) + (m & 0xffff) | 0) + (r9 & 0xffff) | 0;
          v = ((imul(ah5, bl4) | 0) + (m >>> 16) | 0) + (r9 >>> 16) | 0;
          w = ((imul(al5, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r9 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl5) | 0) + (m & 0xffff) | 0) + (r10 & 0xffff) | 0;
          v = ((imul(ah5, bl5) | 0) + (m >>> 16) | 0) + (r10 >>> 16) | 0;
          w = ((imul(al5, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r10 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl6) | 0) + (m & 0xffff) | 0) + (r11 & 0xffff) | 0;
          v = ((imul(ah5, bl6) | 0) + (m >>> 16) | 0) + (r11 >>> 16) | 0;
          w = ((imul(al5, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r11 = w << 16 | u & 0xffff;
          u = ((imul(al5, bl7) | 0) + (m & 0xffff) | 0) + (r12 & 0xffff) | 0;
          v = ((imul(ah5, bl7) | 0) + (m >>> 16) | 0) + (r12 >>> 16) | 0;
          w = ((imul(al5, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah5, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r12 = w << 16 | u & 0xffff;
          r13 = m;
          u = ((imul(al6, bl0) | 0) + (r14 & 0xffff) | 0) + (r6 & 0xffff) | 0;
          v = ((imul(ah6, bl0) | 0) + (r14 >>> 16) | 0) + (r6 >>> 16) | 0;
          w = ((imul(al6, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r6 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl1) | 0) + (m & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah6, bl1) | 0) + (m >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al6, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl2) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah6, bl2) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al6, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl3) | 0) + (m & 0xffff) | 0) + (r9 & 0xffff) | 0;
          v = ((imul(ah6, bl3) | 0) + (m >>> 16) | 0) + (r9 >>> 16) | 0;
          w = ((imul(al6, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r9 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl4) | 0) + (m & 0xffff) | 0) + (r10 & 0xffff) | 0;
          v = ((imul(ah6, bl4) | 0) + (m >>> 16) | 0) + (r10 >>> 16) | 0;
          w = ((imul(al6, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r10 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl5) | 0) + (m & 0xffff) | 0) + (r11 & 0xffff) | 0;
          v = ((imul(ah6, bl5) | 0) + (m >>> 16) | 0) + (r11 >>> 16) | 0;
          w = ((imul(al6, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r11 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl6) | 0) + (m & 0xffff) | 0) + (r12 & 0xffff) | 0;
          v = ((imul(ah6, bl6) | 0) + (m >>> 16) | 0) + (r12 >>> 16) | 0;
          w = ((imul(al6, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r12 = w << 16 | u & 0xffff;
          u = ((imul(al6, bl7) | 0) + (m & 0xffff) | 0) + (r13 & 0xffff) | 0;
          v = ((imul(ah6, bl7) | 0) + (m >>> 16) | 0) + (r13 >>> 16) | 0;
          w = ((imul(al6, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah6, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r13 = w << 16 | u & 0xffff;
          r14 = m;
          u = ((imul(al7, bl0) | 0) + (r15 & 0xffff) | 0) + (r7 & 0xffff) | 0;
          v = ((imul(ah7, bl0) | 0) + (r15 >>> 16) | 0) + (r7 >>> 16) | 0;
          w = ((imul(al7, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r7 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl1) | 0) + (m & 0xffff) | 0) + (r8 & 0xffff) | 0;
          v = ((imul(ah7, bl1) | 0) + (m >>> 16) | 0) + (r8 >>> 16) | 0;
          w = ((imul(al7, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r8 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl2) | 0) + (m & 0xffff) | 0) + (r9 & 0xffff) | 0;
          v = ((imul(ah7, bl2) | 0) + (m >>> 16) | 0) + (r9 >>> 16) | 0;
          w = ((imul(al7, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r9 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl3) | 0) + (m & 0xffff) | 0) + (r10 & 0xffff) | 0;
          v = ((imul(ah7, bl3) | 0) + (m >>> 16) | 0) + (r10 >>> 16) | 0;
          w = ((imul(al7, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r10 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl4) | 0) + (m & 0xffff) | 0) + (r11 & 0xffff) | 0;
          v = ((imul(ah7, bl4) | 0) + (m >>> 16) | 0) + (r11 >>> 16) | 0;
          w = ((imul(al7, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r11 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl5) | 0) + (m & 0xffff) | 0) + (r12 & 0xffff) | 0;
          v = ((imul(ah7, bl5) | 0) + (m >>> 16) | 0) + (r12 >>> 16) | 0;
          w = ((imul(al7, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r12 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl6) | 0) + (m & 0xffff) | 0) + (r13 & 0xffff) | 0;
          v = ((imul(ah7, bl6) | 0) + (m >>> 16) | 0) + (r13 >>> 16) | 0;
          w = ((imul(al7, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r13 = w << 16 | u & 0xffff;
          u = ((imul(al7, bl7) | 0) + (m & 0xffff) | 0) + (r14 & 0xffff) | 0;
          v = ((imul(ah7, bl7) | 0) + (m >>> 16) | 0) + (r14 >>> 16) | 0;
          w = ((imul(al7, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
          m = ((imul(ah7, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
          r14 = w << 16 | u & 0xffff;
          r15 = m;
          HEAP32[(Rk | 0) >> 2] = r0, HEAP32[(Rk | 4) >> 2] = r1, HEAP32[(Rk | 8) >> 2] = r2, HEAP32[(Rk | 12) >> 2] = r3, HEAP32[(Rk | 16) >> 2] = r4, HEAP32[(Rk | 20) >> 2] = r5, HEAP32[(Rk | 24) >> 2] = r6, HEAP32[(Rk | 28) >> 2] = r7;
        }
        Rk = R + (i + j | 0) | 0;
        HEAP32[(Rk | 0) >> 2] = r8, HEAP32[(Rk | 4) >> 2] = r9, HEAP32[(Rk | 8) >> 2] = r10, HEAP32[(Rk | 12) >> 2] = r11, HEAP32[(Rk | 16) >> 2] = r12, HEAP32[(Rk | 20) >> 2] = r13, HEAP32[(Rk | 24) >> 2] = r14, HEAP32[(Rk | 28) >> 2] = r15;
      }
    }
    function sqr(A, lA, R) {
      A = A | 0;
      lA = lA | 0;
      R = R | 0;
      var al0 = 0,
        al1 = 0,
        al2 = 0,
        al3 = 0,
        al4 = 0,
        al5 = 0,
        al6 = 0,
        al7 = 0,
        ah0 = 0,
        ah1 = 0,
        ah2 = 0,
        ah3 = 0,
        ah4 = 0,
        ah5 = 0,
        ah6 = 0,
        ah7 = 0,
        bl0 = 0,
        bl1 = 0,
        bl2 = 0,
        bl3 = 0,
        bl4 = 0,
        bl5 = 0,
        bl6 = 0,
        bl7 = 0,
        bh0 = 0,
        bh1 = 0,
        bh2 = 0,
        bh3 = 0,
        bh4 = 0,
        bh5 = 0,
        bh6 = 0,
        bh7 = 0,
        r0 = 0,
        r1 = 0,
        r2 = 0,
        r3 = 0,
        r4 = 0,
        r5 = 0,
        r6 = 0,
        r7 = 0,
        r8 = 0,
        r9 = 0,
        r10 = 0,
        r11 = 0,
        r12 = 0,
        r13 = 0,
        r14 = 0,
        r15 = 0,
        u = 0,
        v = 0,
        w = 0,
        c = 0,
        h = 0,
        m = 0,
        r = 0,
        d = 0,
        dd = 0,
        p = 0,
        i = 0,
        j = 0,
        k = 0,
        Ai = 0,
        Aj = 0,
        Rk = 0;
      for (; (i | 0) < (lA | 0); i = i + 4 | 0) {
        Rk = R + (i << 1) | 0;
        ah0 = HEAP32[A + i >> 2] | 0, al0 = ah0 & 0xffff, ah0 = ah0 >>> 16;
        u = imul(al0, al0) | 0;
        v = (imul(al0, ah0) | 0) + (u >>> 17) | 0;
        w = (imul(ah0, ah0) | 0) + (v >>> 15) | 0;
        HEAP32[Rk >> 2] = v << 17 | u & 0x1ffff;
        HEAP32[(Rk | 4) >> 2] = w;
      }
      for (p = 0; (p | 0) < (lA | 0); p = p + 8 | 0) {
        Ai = A + p | 0, Rk = R + (p << 1) | 0;
        ah0 = HEAP32[Ai >> 2] | 0, al0 = ah0 & 0xffff, ah0 = ah0 >>> 16;
        bh0 = HEAP32[(Ai | 4) >> 2] | 0, bl0 = bh0 & 0xffff, bh0 = bh0 >>> 16;
        u = imul(al0, bl0) | 0;
        v = (imul(al0, bh0) | 0) + (u >>> 16) | 0;
        w = (imul(ah0, bl0) | 0) + (v & 0xffff) | 0;
        m = ((imul(ah0, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r = HEAP32[(Rk | 4) >> 2] | 0;
        u = (r & 0xffff) + ((u & 0xffff) << 1) | 0;
        w = ((r >>> 16) + ((w & 0xffff) << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 4) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 8) >> 2] | 0;
        u = ((r & 0xffff) + ((m & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (m >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 8) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        if (c) {
          r = HEAP32[(Rk | 12) >> 2] | 0;
          u = (r & 0xffff) + c | 0;
          w = (r >>> 16) + (u >>> 16) | 0;
          HEAP32[(Rk | 12) >> 2] = w << 16 | u & 0xffff;
        }
      }
      for (p = 0; (p | 0) < (lA | 0); p = p + 16 | 0) {
        Ai = A + p | 0, Rk = R + (p << 1) | 0;
        ah0 = HEAP32[Ai >> 2] | 0, al0 = ah0 & 0xffff, ah0 = ah0 >>> 16, ah1 = HEAP32[(Ai | 4) >> 2] | 0, al1 = ah1 & 0xffff, ah1 = ah1 >>> 16;
        bh0 = HEAP32[(Ai | 8) >> 2] | 0, bl0 = bh0 & 0xffff, bh0 = bh0 >>> 16, bh1 = HEAP32[(Ai | 12) >> 2] | 0, bl1 = bh1 & 0xffff, bh1 = bh1 >>> 16;
        u = imul(al0, bl0) | 0;
        v = imul(ah0, bl0) | 0;
        w = ((imul(al0, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah0, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r0 = w << 16 | u & 0xffff;
        u = (imul(al0, bl1) | 0) + (m & 0xffff) | 0;
        v = (imul(ah0, bl1) | 0) + (m >>> 16) | 0;
        w = ((imul(al0, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah0, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r1 = w << 16 | u & 0xffff;
        r2 = m;
        u = (imul(al1, bl0) | 0) + (r1 & 0xffff) | 0;
        v = (imul(ah1, bl0) | 0) + (r1 >>> 16) | 0;
        w = ((imul(al1, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah1, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r1 = w << 16 | u & 0xffff;
        u = ((imul(al1, bl1) | 0) + (r2 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah1, bl1) | 0) + (r2 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al1, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah1, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r2 = w << 16 | u & 0xffff;
        r3 = m;
        r = HEAP32[(Rk | 8) >> 2] | 0;
        u = (r & 0xffff) + ((r0 & 0xffff) << 1) | 0;
        w = ((r >>> 16) + (r0 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 8) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 12) >> 2] | 0;
        u = ((r & 0xffff) + ((r1 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r1 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 12) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 16) >> 2] | 0;
        u = ((r & 0xffff) + ((r2 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r2 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 16) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 20) >> 2] | 0;
        u = ((r & 0xffff) + ((r3 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r3 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 20) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        for (k = 24; !!c & (k | 0) < 32; k = k + 4 | 0) {
          r = HEAP32[(Rk | k) >> 2] | 0;
          u = (r & 0xffff) + c | 0;
          w = (r >>> 16) + (u >>> 16) | 0;
          HEAP32[(Rk | k) >> 2] = w << 16 | u & 0xffff;
          c = w >>> 16;
        }
      }
      for (p = 0; (p | 0) < (lA | 0); p = p + 32 | 0) {
        Ai = A + p | 0, Rk = R + (p << 1) | 0;
        ah0 = HEAP32[Ai >> 2] | 0, al0 = ah0 & 0xffff, ah0 = ah0 >>> 16, ah1 = HEAP32[(Ai | 4) >> 2] | 0, al1 = ah1 & 0xffff, ah1 = ah1 >>> 16, ah2 = HEAP32[(Ai | 8) >> 2] | 0, al2 = ah2 & 0xffff, ah2 = ah2 >>> 16, ah3 = HEAP32[(Ai | 12) >> 2] | 0, al3 = ah3 & 0xffff, ah3 = ah3 >>> 16;
        bh0 = HEAP32[(Ai | 16) >> 2] | 0, bl0 = bh0 & 0xffff, bh0 = bh0 >>> 16, bh1 = HEAP32[(Ai | 20) >> 2] | 0, bl1 = bh1 & 0xffff, bh1 = bh1 >>> 16, bh2 = HEAP32[(Ai | 24) >> 2] | 0, bl2 = bh2 & 0xffff, bh2 = bh2 >>> 16, bh3 = HEAP32[(Ai | 28) >> 2] | 0, bl3 = bh3 & 0xffff, bh3 = bh3 >>> 16;
        u = imul(al0, bl0) | 0;
        v = imul(ah0, bl0) | 0;
        w = ((imul(al0, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah0, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r0 = w << 16 | u & 0xffff;
        u = (imul(al0, bl1) | 0) + (m & 0xffff) | 0;
        v = (imul(ah0, bl1) | 0) + (m >>> 16) | 0;
        w = ((imul(al0, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah0, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r1 = w << 16 | u & 0xffff;
        u = (imul(al0, bl2) | 0) + (m & 0xffff) | 0;
        v = (imul(ah0, bl2) | 0) + (m >>> 16) | 0;
        w = ((imul(al0, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah0, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r2 = w << 16 | u & 0xffff;
        u = (imul(al0, bl3) | 0) + (m & 0xffff) | 0;
        v = (imul(ah0, bl3) | 0) + (m >>> 16) | 0;
        w = ((imul(al0, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah0, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r3 = w << 16 | u & 0xffff;
        r4 = m;
        u = (imul(al1, bl0) | 0) + (r1 & 0xffff) | 0;
        v = (imul(ah1, bl0) | 0) + (r1 >>> 16) | 0;
        w = ((imul(al1, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah1, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r1 = w << 16 | u & 0xffff;
        u = ((imul(al1, bl1) | 0) + (r2 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah1, bl1) | 0) + (r2 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al1, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah1, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r2 = w << 16 | u & 0xffff;
        u = ((imul(al1, bl2) | 0) + (r3 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah1, bl2) | 0) + (r3 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al1, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah1, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r3 = w << 16 | u & 0xffff;
        u = ((imul(al1, bl3) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah1, bl3) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al1, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah1, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r4 = w << 16 | u & 0xffff;
        r5 = m;
        u = (imul(al2, bl0) | 0) + (r2 & 0xffff) | 0;
        v = (imul(ah2, bl0) | 0) + (r2 >>> 16) | 0;
        w = ((imul(al2, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah2, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r2 = w << 16 | u & 0xffff;
        u = ((imul(al2, bl1) | 0) + (r3 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah2, bl1) | 0) + (r3 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al2, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah2, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r3 = w << 16 | u & 0xffff;
        u = ((imul(al2, bl2) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah2, bl2) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al2, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah2, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r4 = w << 16 | u & 0xffff;
        u = ((imul(al2, bl3) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah2, bl3) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al2, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah2, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r5 = w << 16 | u & 0xffff;
        r6 = m;
        u = (imul(al3, bl0) | 0) + (r3 & 0xffff) | 0;
        v = (imul(ah3, bl0) | 0) + (r3 >>> 16) | 0;
        w = ((imul(al3, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah3, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r3 = w << 16 | u & 0xffff;
        u = ((imul(al3, bl1) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah3, bl1) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al3, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah3, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r4 = w << 16 | u & 0xffff;
        u = ((imul(al3, bl2) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah3, bl2) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al3, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah3, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r5 = w << 16 | u & 0xffff;
        u = ((imul(al3, bl3) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
        v = ((imul(ah3, bl3) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
        w = ((imul(al3, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
        m = ((imul(ah3, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
        r6 = w << 16 | u & 0xffff;
        r7 = m;
        r = HEAP32[(Rk | 16) >> 2] | 0;
        u = (r & 0xffff) + ((r0 & 0xffff) << 1) | 0;
        w = ((r >>> 16) + (r0 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 16) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 20) >> 2] | 0;
        u = ((r & 0xffff) + ((r1 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r1 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 20) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 24) >> 2] | 0;
        u = ((r & 0xffff) + ((r2 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r2 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 24) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[(Rk | 28) >> 2] | 0;
        u = ((r & 0xffff) + ((r3 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r3 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[(Rk | 28) >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[Rk + 32 >> 2] | 0;
        u = ((r & 0xffff) + ((r4 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r4 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[Rk + 32 >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[Rk + 36 >> 2] | 0;
        u = ((r & 0xffff) + ((r5 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r5 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[Rk + 36 >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[Rk + 40 >> 2] | 0;
        u = ((r & 0xffff) + ((r6 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r6 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[Rk + 40 >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        r = HEAP32[Rk + 44 >> 2] | 0;
        u = ((r & 0xffff) + ((r7 & 0xffff) << 1) | 0) + c | 0;
        w = ((r >>> 16) + (r7 >>> 16 << 1) | 0) + (u >>> 16) | 0;
        HEAP32[Rk + 44 >> 2] = w << 16 | u & 0xffff;
        c = w >>> 16;
        for (k = 48; !!c & (k | 0) < 64; k = k + 4 | 0) {
          r = HEAP32[Rk + k >> 2] | 0;
          u = (r & 0xffff) + c | 0;
          w = (r >>> 16) + (u >>> 16) | 0;
          HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
          c = w >>> 16;
        }
      }
      for (d = 32; (d | 0) < (lA | 0); d = d << 1) {
        dd = d << 1;
        for (p = 0; (p | 0) < (lA | 0); p = p + dd | 0) {
          Rk = R + (p << 1) | 0;
          h = 0;
          for (i = 0; (i | 0) < (d | 0); i = i + 32 | 0) {
            Ai = (A + p | 0) + i | 0;
            ah0 = HEAP32[Ai >> 2] | 0, al0 = ah0 & 0xffff, ah0 = ah0 >>> 16, ah1 = HEAP32[(Ai | 4) >> 2] | 0, al1 = ah1 & 0xffff, ah1 = ah1 >>> 16, ah2 = HEAP32[(Ai | 8) >> 2] | 0, al2 = ah2 & 0xffff, ah2 = ah2 >>> 16, ah3 = HEAP32[(Ai | 12) >> 2] | 0, al3 = ah3 & 0xffff, ah3 = ah3 >>> 16, ah4 = HEAP32[(Ai | 16) >> 2] | 0, al4 = ah4 & 0xffff, ah4 = ah4 >>> 16, ah5 = HEAP32[(Ai | 20) >> 2] | 0, al5 = ah5 & 0xffff, ah5 = ah5 >>> 16, ah6 = HEAP32[(Ai | 24) >> 2] | 0, al6 = ah6 & 0xffff, ah6 = ah6 >>> 16, ah7 = HEAP32[(Ai | 28) >> 2] | 0, al7 = ah7 & 0xffff, ah7 = ah7 >>> 16;
            r8 = r9 = r10 = r11 = r12 = r13 = r14 = r15 = c = 0;
            for (j = 0; (j | 0) < (d | 0); j = j + 32 | 0) {
              Aj = ((A + p | 0) + d | 0) + j | 0;
              bh0 = HEAP32[Aj >> 2] | 0, bl0 = bh0 & 0xffff, bh0 = bh0 >>> 16, bh1 = HEAP32[(Aj | 4) >> 2] | 0, bl1 = bh1 & 0xffff, bh1 = bh1 >>> 16, bh2 = HEAP32[(Aj | 8) >> 2] | 0, bl2 = bh2 & 0xffff, bh2 = bh2 >>> 16, bh3 = HEAP32[(Aj | 12) >> 2] | 0, bl3 = bh3 & 0xffff, bh3 = bh3 >>> 16, bh4 = HEAP32[(Aj | 16) >> 2] | 0, bl4 = bh4 & 0xffff, bh4 = bh4 >>> 16, bh5 = HEAP32[(Aj | 20) >> 2] | 0, bl5 = bh5 & 0xffff, bh5 = bh5 >>> 16, bh6 = HEAP32[(Aj | 24) >> 2] | 0, bl6 = bh6 & 0xffff, bh6 = bh6 >>> 16, bh7 = HEAP32[(Aj | 28) >> 2] | 0, bl7 = bh7 & 0xffff, bh7 = bh7 >>> 16;
              r0 = r1 = r2 = r3 = r4 = r5 = r6 = r7 = 0;
              u = ((imul(al0, bl0) | 0) + (r0 & 0xffff) | 0) + (r8 & 0xffff) | 0;
              v = ((imul(ah0, bl0) | 0) + (r0 >>> 16) | 0) + (r8 >>> 16) | 0;
              w = ((imul(al0, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r0 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl1) | 0) + (r1 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl1) | 0) + (r1 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r1 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl2) | 0) + (r2 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl2) | 0) + (r2 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r2 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl3) | 0) + (r3 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl3) | 0) + (r3 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r3 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl4) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl4) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r4 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl5) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl5) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r5 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl6) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl6) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al0, bl7) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah0, bl7) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al0, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah0, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              r8 = m;
              u = ((imul(al1, bl0) | 0) + (r1 & 0xffff) | 0) + (r9 & 0xffff) | 0;
              v = ((imul(ah1, bl0) | 0) + (r1 >>> 16) | 0) + (r9 >>> 16) | 0;
              w = ((imul(al1, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r1 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl1) | 0) + (r2 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl1) | 0) + (r2 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r2 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl2) | 0) + (r3 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl2) | 0) + (r3 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r3 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl3) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl3) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r4 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl4) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl4) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r5 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl5) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl5) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl6) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl6) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al1, bl7) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah1, bl7) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al1, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah1, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              r9 = m;
              u = ((imul(al2, bl0) | 0) + (r2 & 0xffff) | 0) + (r10 & 0xffff) | 0;
              v = ((imul(ah2, bl0) | 0) + (r2 >>> 16) | 0) + (r10 >>> 16) | 0;
              w = ((imul(al2, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r2 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl1) | 0) + (r3 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl1) | 0) + (r3 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r3 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl2) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl2) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r4 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl3) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl3) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r5 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl4) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl4) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl5) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl5) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl6) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl6) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              u = ((imul(al2, bl7) | 0) + (r9 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah2, bl7) | 0) + (r9 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al2, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah2, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r9 = w << 16 | u & 0xffff;
              r10 = m;
              u = ((imul(al3, bl0) | 0) + (r3 & 0xffff) | 0) + (r11 & 0xffff) | 0;
              v = ((imul(ah3, bl0) | 0) + (r3 >>> 16) | 0) + (r11 >>> 16) | 0;
              w = ((imul(al3, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r3 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl1) | 0) + (r4 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl1) | 0) + (r4 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r4 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl2) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl2) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r5 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl3) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl3) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl4) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl4) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl5) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl5) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl6) | 0) + (r9 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl6) | 0) + (r9 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r9 = w << 16 | u & 0xffff;
              u = ((imul(al3, bl7) | 0) + (r10 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah3, bl7) | 0) + (r10 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al3, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah3, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r10 = w << 16 | u & 0xffff;
              r11 = m;
              u = ((imul(al4, bl0) | 0) + (r4 & 0xffff) | 0) + (r12 & 0xffff) | 0;
              v = ((imul(ah4, bl0) | 0) + (r4 >>> 16) | 0) + (r12 >>> 16) | 0;
              w = ((imul(al4, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r4 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl1) | 0) + (r5 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl1) | 0) + (r5 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r5 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl2) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl2) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl3) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl3) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl4) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl4) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl5) | 0) + (r9 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl5) | 0) + (r9 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r9 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl6) | 0) + (r10 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl6) | 0) + (r10 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r10 = w << 16 | u & 0xffff;
              u = ((imul(al4, bl7) | 0) + (r11 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah4, bl7) | 0) + (r11 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al4, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah4, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r11 = w << 16 | u & 0xffff;
              r12 = m;
              u = ((imul(al5, bl0) | 0) + (r5 & 0xffff) | 0) + (r13 & 0xffff) | 0;
              v = ((imul(ah5, bl0) | 0) + (r5 >>> 16) | 0) + (r13 >>> 16) | 0;
              w = ((imul(al5, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r5 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl1) | 0) + (r6 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl1) | 0) + (r6 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl2) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl2) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl3) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl3) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl4) | 0) + (r9 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl4) | 0) + (r9 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r9 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl5) | 0) + (r10 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl5) | 0) + (r10 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r10 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl6) | 0) + (r11 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl6) | 0) + (r11 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r11 = w << 16 | u & 0xffff;
              u = ((imul(al5, bl7) | 0) + (r12 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah5, bl7) | 0) + (r12 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al5, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah5, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r12 = w << 16 | u & 0xffff;
              r13 = m;
              u = ((imul(al6, bl0) | 0) + (r6 & 0xffff) | 0) + (r14 & 0xffff) | 0;
              v = ((imul(ah6, bl0) | 0) + (r6 >>> 16) | 0) + (r14 >>> 16) | 0;
              w = ((imul(al6, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r6 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl1) | 0) + (r7 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl1) | 0) + (r7 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl2) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl2) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl3) | 0) + (r9 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl3) | 0) + (r9 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r9 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl4) | 0) + (r10 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl4) | 0) + (r10 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r10 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl5) | 0) + (r11 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl5) | 0) + (r11 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r11 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl6) | 0) + (r12 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl6) | 0) + (r12 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r12 = w << 16 | u & 0xffff;
              u = ((imul(al6, bl7) | 0) + (r13 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah6, bl7) | 0) + (r13 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al6, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah6, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r13 = w << 16 | u & 0xffff;
              r14 = m;
              u = ((imul(al7, bl0) | 0) + (r7 & 0xffff) | 0) + (r15 & 0xffff) | 0;
              v = ((imul(ah7, bl0) | 0) + (r7 >>> 16) | 0) + (r15 >>> 16) | 0;
              w = ((imul(al7, bh0) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh0) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r7 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl1) | 0) + (r8 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl1) | 0) + (r8 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh1) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh1) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r8 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl2) | 0) + (r9 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl2) | 0) + (r9 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh2) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh2) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r9 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl3) | 0) + (r10 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl3) | 0) + (r10 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh3) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh3) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r10 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl4) | 0) + (r11 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl4) | 0) + (r11 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh4) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh4) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r11 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl5) | 0) + (r12 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl5) | 0) + (r12 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh5) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh5) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r12 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl6) | 0) + (r13 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl6) | 0) + (r13 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh6) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh6) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r13 = w << 16 | u & 0xffff;
              u = ((imul(al7, bl7) | 0) + (r14 & 0xffff) | 0) + (m & 0xffff) | 0;
              v = ((imul(ah7, bl7) | 0) + (r14 >>> 16) | 0) + (m >>> 16) | 0;
              w = ((imul(al7, bh7) | 0) + (v & 0xffff) | 0) + (u >>> 16) | 0;
              m = ((imul(ah7, bh7) | 0) + (v >>> 16) | 0) + (w >>> 16) | 0;
              r14 = w << 16 | u & 0xffff;
              r15 = m;
              k = d + (i + j | 0) | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r0 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r0 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r1 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r1 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r2 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r2 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r3 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r3 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r4 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r4 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r5 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r5 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r6 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r6 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
              k = k + 4 | 0;
              r = HEAP32[Rk + k >> 2] | 0;
              u = ((r & 0xffff) + ((r7 & 0xffff) << 1) | 0) + c | 0;
              w = ((r >>> 16) + (r7 >>> 16 << 1) | 0) + (u >>> 16) | 0;
              HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
              c = w >>> 16;
            }
            k = d + (i + j | 0) | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = (((r & 0xffff) + ((r8 & 0xffff) << 1) | 0) + c | 0) + h | 0;
            w = ((r >>> 16) + (r8 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r9 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r9 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r10 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r10 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r11 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r11 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r12 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r12 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r13 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r13 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r14 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r14 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            c = w >>> 16;
            k = k + 4 | 0;
            r = HEAP32[Rk + k >> 2] | 0;
            u = ((r & 0xffff) + ((r15 & 0xffff) << 1) | 0) + c | 0;
            w = ((r >>> 16) + (r15 >>> 16 << 1) | 0) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            h = w >>> 16;
          }
          for (k = k + 4 | 0; !!h & (k | 0) < dd << 1; k = k + 4 | 0) {
            r = HEAP32[Rk + k >> 2] | 0;
            u = (r & 0xffff) + h | 0;
            w = (r >>> 16) + (u >>> 16) | 0;
            HEAP32[Rk + k >> 2] = w << 16 | u & 0xffff;
            h = w >>> 16;
          }
        }
      }
    }
    function div(N, lN, D, lD, Q) {
      N = N | 0;
      lN = lN | 0;
      D = D | 0;
      lD = lD | 0;
      Q = Q | 0;
      var n = 0,
        d = 0,
        e = 0,
        u1 = 0,
        u0 = 0,
        v0 = 0,
        vh = 0,
        vl = 0,
        qh = 0,
        ql = 0,
        rh = 0,
        rl = 0,
        t1 = 0,
        t2 = 0,
        m = 0,
        c = 0,
        i = 0,
        j = 0,
        k = 0;
      for (i = lN - 1 & -4; (i | 0) >= 0; i = i - 4 | 0) {
        n = HEAP32[N + i >> 2] | 0;
        if (n) {
          lN = i;
          break;
        }
      }
      for (i = lD - 1 & -4; (i | 0) >= 0; i = i - 4 | 0) {
        d = HEAP32[D + i >> 2] | 0;
        if (d) {
          lD = i;
          break;
        }
      }
      while ((d & 0x80000000) == 0) {
        d = d << 1;
        e = e + 1 | 0;
      }
      u0 = HEAP32[N + lN >> 2] | 0;
      if (e) {
        u1 = u0 >>> (32 - e | 0);
        for (i = lN - 4 | 0; (i | 0) >= 0; i = i - 4 | 0) {
          n = HEAP32[N + i >> 2] | 0;
          HEAP32[N + i + 4 >> 2] = u0 << e | (e ? n >>> (32 - e | 0) : 0);
          u0 = n;
        }
        HEAP32[N >> 2] = u0 << e;
      }
      if (e) {
        v0 = HEAP32[D + lD >> 2] | 0;
        for (i = lD - 4 | 0; (i | 0) >= 0; i = i - 4 | 0) {
          d = HEAP32[D + i >> 2] | 0;
          HEAP32[D + i + 4 >> 2] = v0 << e | d >>> (32 - e | 0);
          v0 = d;
        }
        HEAP32[D >> 2] = v0 << e;
      }
      v0 = HEAP32[D + lD >> 2] | 0;
      vh = v0 >>> 16, vl = v0 & 0xffff;
      for (i = lN; (i | 0) >= (lD | 0); i = i - 4 | 0) {
        j = i - lD | 0;
        u0 = HEAP32[N + i >> 2] | 0;
        qh = (u1 >>> 0) / (vh >>> 0) | 0, rh = (u1 >>> 0) % (vh >>> 0) | 0, t1 = imul(qh, vl) | 0;
        while ((qh | 0) == 0x10000 | t1 >>> 0 > (rh << 16 | u0 >>> 16) >>> 0) {
          qh = qh - 1 | 0, rh = rh + vh | 0, t1 = t1 - vl | 0;
          if ((rh | 0) >= 0x10000) break;
        }
        m = 0, c = 0;
        for (k = 0; (k | 0) <= (lD | 0); k = k + 4 | 0) {
          d = HEAP32[D + k >> 2] | 0;
          t1 = (imul(qh, d & 0xffff) | 0) + (m >>> 16) | 0;
          t2 = (imul(qh, d >>> 16) | 0) + (t1 >>> 16) | 0;
          d = m & 0xffff | t1 << 16;
          m = t2;
          n = HEAP32[N + j + k >> 2] | 0;
          t1 = ((n & 0xffff) - (d & 0xffff) | 0) + c | 0;
          t2 = ((n >>> 16) - (d >>> 16) | 0) + (t1 >> 16) | 0;
          HEAP32[N + j + k >> 2] = t2 << 16 | t1 & 0xffff;
          c = t2 >> 16;
        }
        t1 = ((u1 & 0xffff) - (m & 0xffff) | 0) + c | 0;
        t2 = ((u1 >>> 16) - (m >>> 16) | 0) + (t1 >> 16) | 0;
        u1 = t2 << 16 | t1 & 0xffff;
        c = t2 >> 16;
        if (c) {
          qh = qh - 1 | 0;
          c = 0;
          for (k = 0; (k | 0) <= (lD | 0); k = k + 4 | 0) {
            d = HEAP32[D + k >> 2] | 0;
            n = HEAP32[N + j + k >> 2] | 0;
            t1 = (n & 0xffff) + c | 0;
            t2 = (n >>> 16) + d + (t1 >>> 16) | 0;
            HEAP32[N + j + k >> 2] = t2 << 16 | t1 & 0xffff;
            c = t2 >>> 16;
          }
          u1 = u1 + c | 0;
        }
        u0 = HEAP32[N + i >> 2] | 0;
        n = u1 << 16 | u0 >>> 16;
        ql = (n >>> 0) / (vh >>> 0) | 0, rl = (n >>> 0) % (vh >>> 0) | 0, t1 = imul(ql, vl) | 0;
        while ((ql | 0) == 0x10000 | t1 >>> 0 > (rl << 16 | u0 & 0xffff) >>> 0) {
          ql = ql - 1 | 0, rl = rl + vh | 0, t1 = t1 - vl | 0;
          if ((rl | 0) >= 0x10000) break;
        }
        m = 0, c = 0;
        for (k = 0; (k | 0) <= (lD | 0); k = k + 4 | 0) {
          d = HEAP32[D + k >> 2] | 0;
          t1 = (imul(ql, d & 0xffff) | 0) + (m & 0xffff) | 0;
          t2 = ((imul(ql, d >>> 16) | 0) + (t1 >>> 16) | 0) + (m >>> 16) | 0;
          d = t1 & 0xffff | t2 << 16;
          m = t2 >>> 16;
          n = HEAP32[N + j + k >> 2] | 0;
          t1 = ((n & 0xffff) - (d & 0xffff) | 0) + c | 0;
          t2 = ((n >>> 16) - (d >>> 16) | 0) + (t1 >> 16) | 0;
          c = t2 >> 16;
          HEAP32[N + j + k >> 2] = t2 << 16 | t1 & 0xffff;
        }
        t1 = ((u1 & 0xffff) - (m & 0xffff) | 0) + c | 0;
        t2 = ((u1 >>> 16) - (m >>> 16) | 0) + (t1 >> 16) | 0;
        c = t2 >> 16;
        if (c) {
          ql = ql - 1 | 0;
          c = 0;
          for (k = 0; (k | 0) <= (lD | 0); k = k + 4 | 0) {
            d = HEAP32[D + k >> 2] | 0;
            n = HEAP32[N + j + k >> 2] | 0;
            t1 = ((n & 0xffff) + (d & 0xffff) | 0) + c | 0;
            t2 = ((n >>> 16) + (d >>> 16) | 0) + (t1 >>> 16) | 0;
            c = t2 >>> 16;
            HEAP32[N + j + k >> 2] = t1 & 0xffff | t2 << 16;
          }
        }
        HEAP32[Q + j >> 2] = qh << 16 | ql;
        u1 = HEAP32[N + i >> 2] | 0;
      }
      if (e) {
        u0 = HEAP32[N >> 2] | 0;
        for (i = 4; (i | 0) <= (lD | 0); i = i + 4 | 0) {
          n = HEAP32[N + i >> 2] | 0;
          HEAP32[N + i - 4 >> 2] = n << (32 - e | 0) | u0 >>> e;
          u0 = n;
        }
        HEAP32[N + lD >> 2] = u0 >>> e;
      }
    }
    function mredc(A, lA, N, lN, y, R) {
      A = A | 0;
      lA = lA | 0;
      N = N | 0;
      lN = lN | 0;
      y = y | 0;
      R = R | 0;
      var T = 0,
        c = 0,
        uh = 0,
        ul = 0,
        vl = 0,
        vh = 0,
        w0 = 0,
        w1 = 0,
        w2 = 0,
        r0 = 0,
        r1 = 0,
        i = 0,
        j = 0,
        k = 0;
      T = salloc(lN << 1) | 0;
      z(lN << 1, 0, T);
      cp(lA, A, T);
      for (i = 0; (i | 0) < (lN | 0); i = i + 4 | 0) {
        uh = HEAP32[T + i >> 2] | 0, ul = uh & 0xffff, uh = uh >>> 16;
        vh = y >>> 16, vl = y & 0xffff;
        w0 = imul(ul, vl) | 0, w1 = ((imul(ul, vh) | 0) + (imul(uh, vl) | 0) | 0) + (w0 >>> 16) | 0;
        ul = w0 & 0xffff, uh = w1 & 0xffff;
        r1 = 0;
        for (j = 0; (j | 0) < (lN | 0); j = j + 4 | 0) {
          k = i + j | 0;
          vh = HEAP32[N + j >> 2] | 0, vl = vh & 0xffff, vh = vh >>> 16;
          r0 = HEAP32[T + k >> 2] | 0;
          w0 = ((imul(ul, vl) | 0) + (r1 & 0xffff) | 0) + (r0 & 0xffff) | 0;
          w1 = ((imul(ul, vh) | 0) + (r1 >>> 16) | 0) + (r0 >>> 16) | 0;
          w2 = ((imul(uh, vl) | 0) + (w1 & 0xffff) | 0) + (w0 >>> 16) | 0;
          r1 = ((imul(uh, vh) | 0) + (w2 >>> 16) | 0) + (w1 >>> 16) | 0;
          r0 = w2 << 16 | w0 & 0xffff;
          HEAP32[T + k >> 2] = r0;
        }
        k = i + j | 0;
        r0 = HEAP32[T + k >> 2] | 0;
        w0 = ((r0 & 0xffff) + (r1 & 0xffff) | 0) + c | 0;
        w1 = ((r0 >>> 16) + (r1 >>> 16) | 0) + (w0 >>> 16) | 0;
        HEAP32[T + k >> 2] = w1 << 16 | w0 & 0xffff;
        c = w1 >>> 16;
      }
      cp(lN, T + lN | 0, R);
      sfree(lN << 1);
      if (c | (cmp(N, lN, R, lN) | 0) <= 0) {
        sub(R, lN, N, lN, R, lN) | 0;
      }
    }
    return {
      sreset: sreset,
      salloc: salloc,
      sfree: sfree,
      z: z,
      tst: tst,
      neg: neg,
      cmp: cmp,
      add: add,
      sub: sub,
      mul: mul,
      sqr: sqr,
      div: div,
      mredc: mredc
    };
  };
  function Number_extGCD(a, b) {
    var sa = a < 0 ? -1 : 1,
      sb = b < 0 ? -1 : 1,
      xi = 1,
      xj = 0,
      yi = 0,
      yj = 1,
      r,
      q,
      t,
      a_cmp_b;
    a *= sa;
    b *= sb;
    a_cmp_b = a < b;
    if (a_cmp_b) {
      t = a;
      a = b, b = t;
      t = sa;
      sa = sb;
      sb = t;
    }
    q = Math.floor(a / b), r = a - q * b;
    while (r) {
      t = xi - q * xj, xi = xj, xj = t;
      t = yi - q * yj, yi = yj, yj = t;
      a = b, b = r;
      q = Math.floor(a / b), r = a - q * b;
    }
    xj *= sa;
    yj *= sb;
    if (a_cmp_b) {
      t = xj;
      xj = yj, yj = t;
    }
    return {
      gcd: b,
      x: xj,
      y: yj
    };
  }
  function BigNumber_extGCD(a, b) {
    var sa = a.sign;
    var sb = b.sign;
    if (sa < 0) a = a.negate();
    if (sb < 0) b = b.negate();
    var a_cmp_b = a.compare(b);
    if (a_cmp_b < 0) {
      var t = a;
      a = b, b = t;
      var t2 = sa;
      sa = sb;
      sb = t2;
    }
    var xi = BigNumber.ONE,
      xj = BigNumber.ZERO,
      lx = b.bitLength,
      yi = BigNumber.ZERO,
      yj = BigNumber.ONE,
      ly = a.bitLength,
      z,
      r,
      q;
    z = a.divide(b);
    while ((r = z.remainder) !== BigNumber.ZERO) {
      q = z.quotient;
      z = xi.subtract(q.multiply(xj).clamp(lx)).clamp(lx), xi = xj, xj = z;
      z = yi.subtract(q.multiply(yj).clamp(ly)).clamp(ly), yi = yj, yj = z;
      a = b, b = r;
      z = a.divide(b);
    }
    if (sa < 0) xj = xj.negate();
    if (sb < 0) yj = yj.negate();
    if (a_cmp_b < 0) {
      var _t = xj;
      xj = yj, yj = _t;
    }
    return {
      gcd: b,
      x: xj,
      y: yj
    };
  }
  function getRandomValues(buf) {
    if (typeof process !== 'undefined') {
      var nodeCrypto = require('crypto');
      var bytes = nodeCrypto.randomBytes(buf.length);
      buf.set(bytes);
      return;
    }
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(buf);
      return;
    }
    if (self.crypto && self.crypto.getRandomValues) {
      self.crypto.getRandomValues(buf);
      return;
    }
    if (window.msCrypto && window.msCrypto.getRandomValues) {
      window.msCrypto.getRandomValues(buf);
      return;
    }
    throw new Error('No secure random number generator available.');
  }
  var _bigint_stdlib = {
    Uint32Array: Uint32Array,
    Math: Math
  };
  var _bigint_heap = new Uint32Array(0x100000);
  var _bigint_asm;
  function _half_imul(a, b) {
    return a * b | 0;
  }
  if (_bigint_stdlib.Math.imul === undefined) {
    _bigint_stdlib.Math.imul = _half_imul;
    _bigint_asm = bigint_asm(_bigint_stdlib, null, _bigint_heap.buffer);
    delete _bigint_stdlib.Math.imul;
  } else {
    _bigint_asm = bigint_asm(_bigint_stdlib, null, _bigint_heap.buffer);
  }
  var _BigNumber_ZERO_limbs = new Uint32Array(0);
  var BigNumber = function () {
    function BigNumber(num) {
      _classCallCheck(this, BigNumber);
      var limbs = _BigNumber_ZERO_limbs;
      var bitlen = 0;
      var sign = 0;
      if (num === undefined) ;else {
        for (var i = 0; !num[i]; i++);
        bitlen = (num.length - i) * 8;
        if (!bitlen) return BigNumber.ZERO;
        limbs = new Uint32Array(bitlen + 31 >> 5);
        for (var j = num.length - 4; j >= i; j -= 4) {
          limbs[num.length - 4 - j >> 2] = num[j] << 24 | num[j + 1] << 16 | num[j + 2] << 8 | num[j + 3];
        }
        if (i - j === 3) {
          limbs[limbs.length - 1] = num[i];
        } else if (i - j === 2) {
          limbs[limbs.length - 1] = num[i] << 8 | num[i + 1];
        } else if (i - j === 1) {
          limbs[limbs.length - 1] = num[i] << 16 | num[i + 1] << 8 | num[i + 2];
        }
        sign = 1;
      }
      this.limbs = limbs;
      this.bitLength = bitlen;
      this.sign = sign;
    }
    _createClass(BigNumber, [{
      key: "toString",
      value: function toString(radix) {
        radix = radix || 16;
        var limbs = this.limbs;
        var bitlen = this.bitLength;
        var str = '';
        if (radix === 16) {
          for (var i = (bitlen + 31 >> 5) - 1; i >= 0; i--) {
            var h = limbs[i].toString(16);
            str += '00000000'.substr(h.length);
            str += h;
          }
          str = str.replace(/^0+/, '');
          if (!str.length) str = '0';
        } else {
          throw new IllegalArgumentError('bad radix');
        }
        if (this.sign < 0) str = '-' + str;
        return str;
      }
    }, {
      key: "toBytes",
      value: function toBytes() {
        var bitlen = this.bitLength;
        var limbs = this.limbs;
        if (bitlen === 0) return new Uint8Array(0);
        var bytelen = bitlen + 7 >> 3;
        var bytes = new Uint8Array(bytelen);
        for (var i = 0; i < bytelen; i++) {
          var j = bytelen - i - 1;
          bytes[i] = limbs[j >> 2] >> ((j & 3) << 3);
        }
        return bytes;
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        var limbs = this.limbs;
        var bits = this.bitLength;
        var sign = this.sign;
        if (!sign) return 0;
        if (bits <= 32) return sign * (limbs[0] >>> 0);
        if (bits <= 52) return sign * (0x100000000 * (limbs[1] >>> 0) + (limbs[0] >>> 0));
        var i,
          l,
          e = 0;
        for (i = limbs.length - 1; i >= 0; i--) {
          if ((l = limbs[i]) === 0) continue;
          while ((l << e & 0x80000000) === 0) e++;
          break;
        }
        if (i === 0) return sign * (limbs[0] >>> 0);
        return sign * (0x100000 * ((limbs[i] << e | (e ? limbs[i - 1] >>> 32 - e : 0)) >>> 0) + ((limbs[i - 1] << e | (e && i > 1 ? limbs[i - 2] >>> 32 - e : 0)) >>> 12)) * Math.pow(2, 32 * i - e - 52);
      }
    }, {
      key: "clamp",
      value: function clamp(b) {
        var limbs = this.limbs;
        var bitlen = this.bitLength;
        if (b >= bitlen) return this;
        var clamped = new BigNumber();
        var n = b + 31 >> 5;
        var k = b % 32;
        clamped.limbs = new Uint32Array(limbs.subarray(0, n));
        clamped.bitLength = b;
        clamped.sign = this.sign;
        if (k) clamped.limbs[n - 1] &= -1 >>> 32 - k;
        return clamped;
      }
    }, {
      key: "slice",
      value: function slice(f, b) {
        var limbs = this.limbs;
        var bitlen = this.bitLength;
        if (f < 0) throw new RangeError('TODO');
        if (f >= bitlen) return BigNumber.ZERO;
        if (b === undefined || b > bitlen - f) b = bitlen - f;
        var sliced = new BigNumber();
        var n = f >> 5;
        var m = f + b + 31 >> 5;
        var l = b + 31 >> 5;
        var t = f % 32;
        var k = b % 32;
        var slimbs = new Uint32Array(l);
        if (t) {
          for (var i = 0; i < m - n - 1; i++) {
            slimbs[i] = limbs[n + i] >>> t | limbs[n + i + 1] << 32 - t;
          }
          slimbs[i] = limbs[n + i] >>> t;
        } else {
          slimbs.set(limbs.subarray(n, m));
        }
        if (k) {
          slimbs[l - 1] &= -1 >>> 32 - k;
        }
        sliced.limbs = slimbs;
        sliced.bitLength = b;
        sliced.sign = this.sign;
        return sliced;
      }
    }, {
      key: "negate",
      value: function negate() {
        var negative = new BigNumber();
        negative.limbs = this.limbs;
        negative.bitLength = this.bitLength;
        negative.sign = -1 * this.sign;
        return negative;
      }
    }, {
      key: "compare",
      value: function compare(that) {
        var alimbs = this.limbs,
          alimbcnt = alimbs.length,
          blimbs = that.limbs,
          blimbcnt = blimbs.length,
          z = 0;
        if (this.sign < that.sign) return -1;
        if (this.sign > that.sign) return 1;
        _bigint_heap.set(alimbs, 0);
        _bigint_heap.set(blimbs, alimbcnt);
        z = _bigint_asm.cmp(0, alimbcnt << 2, alimbcnt << 2, blimbcnt << 2);
        return z * this.sign;
      }
    }, {
      key: "add",
      value: function add(that) {
        if (!this.sign) return that;
        if (!that.sign) return this;
        var abitlen = this.bitLength,
          alimbs = this.limbs,
          alimbcnt = alimbs.length,
          asign = this.sign,
          bbitlen = that.bitLength,
          blimbs = that.limbs,
          blimbcnt = blimbs.length,
          bsign = that.sign,
          rbitlen,
          rlimbcnt,
          rsign,
          rof,
          result = new BigNumber();
        rbitlen = (abitlen > bbitlen ? abitlen : bbitlen) + (asign * bsign > 0 ? 1 : 0);
        rlimbcnt = rbitlen + 31 >> 5;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2),
          pB = _bigint_asm.salloc(blimbcnt << 2),
          pR = _bigint_asm.salloc(rlimbcnt << 2);
        _bigint_asm.z(pR - pA + (rlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(blimbs, pB >> 2);
        if (asign * bsign > 0) {
          _bigint_asm.add(pA, alimbcnt << 2, pB, blimbcnt << 2, pR, rlimbcnt << 2);
          rsign = asign;
        } else if (asign > bsign) {
          rof = _bigint_asm.sub(pA, alimbcnt << 2, pB, blimbcnt << 2, pR, rlimbcnt << 2);
          rsign = rof ? bsign : asign;
        } else {
          rof = _bigint_asm.sub(pB, blimbcnt << 2, pA, alimbcnt << 2, pR, rlimbcnt << 2);
          rsign = rof ? asign : bsign;
        }
        if (rof) _bigint_asm.neg(pR, rlimbcnt << 2, pR, rlimbcnt << 2);
        if (_bigint_asm.tst(pR, rlimbcnt << 2) === 0) return BigNumber.ZERO;
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + rlimbcnt));
        result.bitLength = rbitlen;
        result.sign = rsign;
        return result;
      }
    }, {
      key: "subtract",
      value: function subtract(that) {
        return this.add(that.negate());
      }
    }, {
      key: "square",
      value: function square() {
        if (!this.sign) return BigNumber.ZERO;
        var abitlen = this.bitLength,
          alimbs = this.limbs,
          alimbcnt = alimbs.length,
          rbitlen,
          rlimbcnt,
          result = new BigNumber();
        rbitlen = abitlen << 1;
        rlimbcnt = rbitlen + 31 >> 5;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2),
          pR = _bigint_asm.salloc(rlimbcnt << 2);
        _bigint_asm.z(pR - pA + (rlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_asm.sqr(pA, alimbcnt << 2, pR);
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + rlimbcnt));
        result.bitLength = rbitlen;
        result.sign = 1;
        return result;
      }
    }, {
      key: "divide",
      value: function divide(that) {
        var abitlen = this.bitLength,
          alimbs = this.limbs,
          alimbcnt = alimbs.length,
          bbitlen = that.bitLength,
          blimbs = that.limbs,
          blimbcnt = blimbs.length,
          qlimbcnt,
          rlimbcnt,
          quotient = BigNumber.ZERO,
          remainder = BigNumber.ZERO;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2),
          pB = _bigint_asm.salloc(blimbcnt << 2),
          pQ = _bigint_asm.salloc(alimbcnt << 2);
        _bigint_asm.z(pQ - pA + (alimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(blimbs, pB >> 2);
        _bigint_asm.div(pA, alimbcnt << 2, pB, blimbcnt << 2, pQ);
        qlimbcnt = _bigint_asm.tst(pQ, alimbcnt << 2) >> 2;
        if (qlimbcnt) {
          quotient = new BigNumber();
          quotient.limbs = new Uint32Array(_bigint_heap.subarray(pQ >> 2, (pQ >> 2) + qlimbcnt));
          quotient.bitLength = abitlen < qlimbcnt << 5 ? abitlen : qlimbcnt << 5;
          quotient.sign = this.sign * that.sign;
        }
        rlimbcnt = _bigint_asm.tst(pA, blimbcnt << 2) >> 2;
        if (rlimbcnt) {
          remainder = new BigNumber();
          remainder.limbs = new Uint32Array(_bigint_heap.subarray(pA >> 2, (pA >> 2) + rlimbcnt));
          remainder.bitLength = bbitlen < rlimbcnt << 5 ? bbitlen : rlimbcnt << 5;
          remainder.sign = this.sign;
        }
        return {
          quotient: quotient,
          remainder: remainder
        };
      }
    }, {
      key: "multiply",
      value: function multiply(that) {
        if (!this.sign || !that.sign) return BigNumber.ZERO;
        var abitlen = this.bitLength,
          alimbs = this.limbs,
          alimbcnt = alimbs.length,
          bbitlen = that.bitLength,
          blimbs = that.limbs,
          blimbcnt = blimbs.length,
          rbitlen,
          rlimbcnt,
          result = new BigNumber();
        rbitlen = abitlen + bbitlen;
        rlimbcnt = rbitlen + 31 >> 5;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2),
          pB = _bigint_asm.salloc(blimbcnt << 2),
          pR = _bigint_asm.salloc(rlimbcnt << 2);
        _bigint_asm.z(pR - pA + (rlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(blimbs, pB >> 2);
        _bigint_asm.mul(pA, alimbcnt << 2, pB, blimbcnt << 2, pR, rlimbcnt << 2);
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + rlimbcnt));
        result.sign = this.sign * that.sign;
        result.bitLength = rbitlen;
        return result;
      }
    }, {
      key: "isMillerRabinProbablePrime",
      value: function isMillerRabinProbablePrime(rounds) {
        var t = BigNumber.fromConfig(this),
          s = 0;
        t.limbs[0] -= 1;
        while (t.limbs[s >> 5] === 0) s += 32;
        while ((t.limbs[s >> 5] >> (s & 31) & 1) === 0) s++;
        t = t.slice(s);
        var m = new Modulus(this),
          m1 = this.subtract(BigNumber.ONE),
          a = BigNumber.fromConfig(this),
          l = this.limbs.length - 1;
        while (a.limbs[l] === 0) l--;
        while (--rounds >= 0) {
          getRandomValues(a.limbs);
          if (a.limbs[0] < 2) a.limbs[0] += 2;
          while (a.compare(m1) >= 0) a.limbs[l] >>>= 1;
          var x = m.power(a, t);
          if (x.compare(BigNumber.ONE) === 0) continue;
          if (x.compare(m1) === 0) continue;
          var c = s;
          while (--c > 0) {
            x = x.square().divide(m).remainder;
            if (x.compare(BigNumber.ONE) === 0) return false;
            if (x.compare(m1) === 0) break;
          }
          if (c === 0) return false;
        }
        return true;
      }
    }, {
      key: "isProbablePrime",
      value: function isProbablePrime() {
        var paranoia = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 80;
        var limbs = this.limbs;
        var i = 0;
        if ((limbs[0] & 1) === 0) return false;
        if (paranoia <= 1) return true;
        var s3 = 0,
          s5 = 0,
          s17 = 0;
        for (i = 0; i < limbs.length; i++) {
          var l3 = limbs[i];
          while (l3) {
            s3 += l3 & 3;
            l3 >>>= 2;
          }
          var l5 = limbs[i];
          while (l5) {
            s5 += l5 & 3;
            l5 >>>= 2;
            s5 -= l5 & 3;
            l5 >>>= 2;
          }
          var l17 = limbs[i];
          while (l17) {
            s17 += l17 & 15;
            l17 >>>= 4;
            s17 -= l17 & 15;
            l17 >>>= 4;
          }
        }
        if (!(s3 % 3) || !(s5 % 5) || !(s17 % 17)) return false;
        if (paranoia <= 2) return true;
        return this.isMillerRabinProbablePrime(paranoia >>> 1);
      }
    }], [{
      key: "fromString",
      value: function fromString(str) {
        var bytes = string_to_bytes(str);
        return new BigNumber(bytes);
      }
    }, {
      key: "fromNumber",
      value: function fromNumber(num) {
        var limbs = _BigNumber_ZERO_limbs;
        var bitlen = 0;
        var sign = 0;
        var absnum = Math.abs(num);
        if (absnum > 0xffffffff) {
          limbs = new Uint32Array(2);
          limbs[0] = absnum | 0;
          limbs[1] = absnum / 0x100000000 | 0;
          bitlen = 52;
        } else if (absnum > 0) {
          limbs = new Uint32Array(1);
          limbs[0] = absnum;
          bitlen = 32;
        } else {
          limbs = _BigNumber_ZERO_limbs;
          bitlen = 0;
        }
        sign = num < 0 ? -1 : 1;
        return BigNumber.fromConfig({
          limbs: limbs,
          bitLength: bitlen,
          sign: sign
        });
      }
    }, {
      key: "fromArrayBuffer",
      value: function fromArrayBuffer(buffer) {
        return new BigNumber(new Uint8Array(buffer));
      }
    }, {
      key: "fromConfig",
      value: function fromConfig(obj) {
        var bn = new BigNumber();
        bn.limbs = new Uint32Array(obj.limbs);
        bn.bitLength = obj.bitLength;
        bn.sign = obj.sign;
        return bn;
      }
    }]);
    return BigNumber;
  }();
  BigNumber.extGCD = BigNumber_extGCD;
  BigNumber.ZERO = BigNumber.fromNumber(0);
  BigNumber.ONE = BigNumber.fromNumber(1);
  var Modulus = function (_BigNumber) {
    _inherits(Modulus, _BigNumber);
    var _super103 = _createSuper(Modulus);
    function Modulus(number) {
      var _this84;
      _classCallCheck(this, Modulus);
      _this84 = _super103.call(this);
      _this84.limbs = number.limbs;
      _this84.bitLength = number.bitLength;
      _this84.sign = number.sign;
      if (_this84.valueOf() < 1) throw new RangeError();
      if (_this84.bitLength <= 32) return _possibleConstructorReturn(_this84);
      var comodulus;
      if (_this84.limbs[0] & 1) {
        var bitlen = (_this84.bitLength + 31 & -32) + 1;
        var limbs = new Uint32Array(bitlen + 31 >> 5);
        limbs[limbs.length - 1] = 1;
        comodulus = new BigNumber();
        comodulus.sign = 1;
        comodulus.bitLength = bitlen;
        comodulus.limbs = limbs;
        var k = Number_extGCD(0x100000000, _this84.limbs[0]).y;
        _this84.coefficient = k < 0 ? -k : 0x100000000 - k;
      } else {
        return _possibleConstructorReturn(_this84);
      }
      _this84.comodulus = comodulus;
      _this84.comodulusRemainder = comodulus.divide(_assertThisInitialized(_this84)).remainder;
      _this84.comodulusRemainderSquare = comodulus.square().divide(_assertThisInitialized(_this84)).remainder;
      return _this84;
    }
    _createClass(Modulus, [{
      key: "reduce",
      value: function reduce(a) {
        if (a.bitLength <= 32 && this.bitLength <= 32) return BigNumber.fromNumber(a.valueOf() % this.valueOf());
        if (a.compare(this) < 0) return a;
        return a.divide(this).remainder;
      }
    }, {
      key: "inverse",
      value: function inverse(a) {
        a = this.reduce(a);
        var r = BigNumber_extGCD(this, a);
        if (r.gcd.valueOf() !== 1) throw new Error('GCD is not 1');
        if (r.y.sign < 0) return r.y.add(this).clamp(this.bitLength);
        return r.y;
      }
    }, {
      key: "power",
      value: function power(g, e) {
        var c = 0;
        for (var i = 0; i < e.limbs.length; i++) {
          var t = e.limbs[i];
          while (t) {
            if (t & 1) c++;
            t >>>= 1;
          }
        }
        var k = 8;
        if (e.bitLength <= 4536) k = 7;
        if (e.bitLength <= 1736) k = 6;
        if (e.bitLength <= 630) k = 5;
        if (e.bitLength <= 210) k = 4;
        if (e.bitLength <= 60) k = 3;
        if (e.bitLength <= 12) k = 2;
        if (c <= 1 << k - 1) k = 1;
        g = Modulus._Montgomery_reduce(this.reduce(g).multiply(this.comodulusRemainderSquare), this);
        var g2 = Modulus._Montgomery_reduce(g.square(), this),
          gn = new Array(1 << k - 1);
        gn[0] = g;
        gn[1] = Modulus._Montgomery_reduce(g.multiply(g2), this);
        for (var _i16 = 2; _i16 < 1 << k - 1; _i16++) {
          gn[_i16] = Modulus._Montgomery_reduce(gn[_i16 - 1].multiply(g2), this);
        }
        var u = this.comodulusRemainder;
        var r = u;
        for (var _i17 = e.limbs.length - 1; _i17 >= 0; _i17--) {
          var _t2 = e.limbs[_i17];
          for (var j = 32; j > 0;) {
            if (_t2 & 0x80000000) {
              var n = _t2 >>> 32 - k,
                l = k;
              while ((n & 1) === 0) {
                n >>>= 1;
                l--;
              }
              var m = gn[n >>> 1];
              while (n) {
                n >>>= 1;
                if (r !== u) r = Modulus._Montgomery_reduce(r.square(), this);
              }
              r = r !== u ? Modulus._Montgomery_reduce(r.multiply(m), this) : m;
              _t2 <<= l, j -= l;
            } else {
              if (r !== u) r = Modulus._Montgomery_reduce(r.square(), this);
              _t2 <<= 1, j--;
            }
          }
        }
        return Modulus._Montgomery_reduce(r, this);
      }
    }], [{
      key: "_Montgomery_reduce",
      value: function _Montgomery_reduce(a, n) {
        var alimbs = a.limbs;
        var alimbcnt = alimbs.length;
        var nlimbs = n.limbs;
        var nlimbcnt = nlimbs.length;
        var y = n.coefficient;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2),
          pN = _bigint_asm.salloc(nlimbcnt << 2),
          pR = _bigint_asm.salloc(nlimbcnt << 2);
        _bigint_asm.z(pR - pA + (nlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(nlimbs, pN >> 2);
        _bigint_asm.mredc(pA, alimbcnt << 2, pN, nlimbcnt << 2, y, pR);
        var result = new BigNumber();
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + nlimbcnt));
        result.bitLength = n.bitLength;
        result.sign = 1;
        return result;
      }
    }]);
    return Modulus;
  }(BigNumber);
  var sha1_asm = function sha1_asm(stdlib, foreign, buffer) {
    "use asm";
    var H0 = 0,
      H1 = 0,
      H2 = 0,
      H3 = 0,
      H4 = 0,
      TOTAL0 = 0,
      TOTAL1 = 0;
    var I0 = 0,
      I1 = 0,
      I2 = 0,
      I3 = 0,
      I4 = 0,
      O0 = 0,
      O1 = 0,
      O2 = 0,
      O3 = 0,
      O4 = 0;
    var HEAP = new stdlib.Uint8Array(buffer);
    function _core(w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15) {
      w0 = w0 | 0;
      w1 = w1 | 0;
      w2 = w2 | 0;
      w3 = w3 | 0;
      w4 = w4 | 0;
      w5 = w5 | 0;
      w6 = w6 | 0;
      w7 = w7 | 0;
      w8 = w8 | 0;
      w9 = w9 | 0;
      w10 = w10 | 0;
      w11 = w11 | 0;
      w12 = w12 | 0;
      w13 = w13 | 0;
      w14 = w14 | 0;
      w15 = w15 | 0;
      var a = 0,
        b = 0,
        c = 0,
        d = 0,
        e = 0,
        n = 0,
        t = 0,
        w16 = 0,
        w17 = 0,
        w18 = 0,
        w19 = 0,
        w20 = 0,
        w21 = 0,
        w22 = 0,
        w23 = 0,
        w24 = 0,
        w25 = 0,
        w26 = 0,
        w27 = 0,
        w28 = 0,
        w29 = 0,
        w30 = 0,
        w31 = 0,
        w32 = 0,
        w33 = 0,
        w34 = 0,
        w35 = 0,
        w36 = 0,
        w37 = 0,
        w38 = 0,
        w39 = 0,
        w40 = 0,
        w41 = 0,
        w42 = 0,
        w43 = 0,
        w44 = 0,
        w45 = 0,
        w46 = 0,
        w47 = 0,
        w48 = 0,
        w49 = 0,
        w50 = 0,
        w51 = 0,
        w52 = 0,
        w53 = 0,
        w54 = 0,
        w55 = 0,
        w56 = 0,
        w57 = 0,
        w58 = 0,
        w59 = 0,
        w60 = 0,
        w61 = 0,
        w62 = 0,
        w63 = 0,
        w64 = 0,
        w65 = 0,
        w66 = 0,
        w67 = 0,
        w68 = 0,
        w69 = 0,
        w70 = 0,
        w71 = 0,
        w72 = 0,
        w73 = 0,
        w74 = 0,
        w75 = 0,
        w76 = 0,
        w77 = 0,
        w78 = 0,
        w79 = 0;
      a = H0;
      b = H1;
      c = H2;
      d = H3;
      e = H4;
      t = w0 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w1 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w2 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w3 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w4 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w5 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w6 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w7 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w8 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w9 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w10 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w11 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w12 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w13 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w14 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      t = w15 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w13 ^ w8 ^ w2 ^ w0;
      w16 = n << 1 | n >>> 31;
      t = w16 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w14 ^ w9 ^ w3 ^ w1;
      w17 = n << 1 | n >>> 31;
      t = w17 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w15 ^ w10 ^ w4 ^ w2;
      w18 = n << 1 | n >>> 31;
      t = w18 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w16 ^ w11 ^ w5 ^ w3;
      w19 = n << 1 | n >>> 31;
      t = w19 + (a << 5 | a >>> 27) + e + (b & c | ~b & d) + 0x5a827999 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w17 ^ w12 ^ w6 ^ w4;
      w20 = n << 1 | n >>> 31;
      t = w20 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w18 ^ w13 ^ w7 ^ w5;
      w21 = n << 1 | n >>> 31;
      t = w21 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w19 ^ w14 ^ w8 ^ w6;
      w22 = n << 1 | n >>> 31;
      t = w22 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w20 ^ w15 ^ w9 ^ w7;
      w23 = n << 1 | n >>> 31;
      t = w23 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w21 ^ w16 ^ w10 ^ w8;
      w24 = n << 1 | n >>> 31;
      t = w24 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w22 ^ w17 ^ w11 ^ w9;
      w25 = n << 1 | n >>> 31;
      t = w25 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w23 ^ w18 ^ w12 ^ w10;
      w26 = n << 1 | n >>> 31;
      t = w26 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w24 ^ w19 ^ w13 ^ w11;
      w27 = n << 1 | n >>> 31;
      t = w27 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w25 ^ w20 ^ w14 ^ w12;
      w28 = n << 1 | n >>> 31;
      t = w28 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w26 ^ w21 ^ w15 ^ w13;
      w29 = n << 1 | n >>> 31;
      t = w29 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w27 ^ w22 ^ w16 ^ w14;
      w30 = n << 1 | n >>> 31;
      t = w30 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w28 ^ w23 ^ w17 ^ w15;
      w31 = n << 1 | n >>> 31;
      t = w31 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w29 ^ w24 ^ w18 ^ w16;
      w32 = n << 1 | n >>> 31;
      t = w32 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w30 ^ w25 ^ w19 ^ w17;
      w33 = n << 1 | n >>> 31;
      t = w33 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w31 ^ w26 ^ w20 ^ w18;
      w34 = n << 1 | n >>> 31;
      t = w34 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w32 ^ w27 ^ w21 ^ w19;
      w35 = n << 1 | n >>> 31;
      t = w35 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w33 ^ w28 ^ w22 ^ w20;
      w36 = n << 1 | n >>> 31;
      t = w36 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w34 ^ w29 ^ w23 ^ w21;
      w37 = n << 1 | n >>> 31;
      t = w37 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w35 ^ w30 ^ w24 ^ w22;
      w38 = n << 1 | n >>> 31;
      t = w38 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w36 ^ w31 ^ w25 ^ w23;
      w39 = n << 1 | n >>> 31;
      t = w39 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) + 0x6ed9eba1 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w37 ^ w32 ^ w26 ^ w24;
      w40 = n << 1 | n >>> 31;
      t = w40 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w38 ^ w33 ^ w27 ^ w25;
      w41 = n << 1 | n >>> 31;
      t = w41 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w39 ^ w34 ^ w28 ^ w26;
      w42 = n << 1 | n >>> 31;
      t = w42 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w40 ^ w35 ^ w29 ^ w27;
      w43 = n << 1 | n >>> 31;
      t = w43 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w41 ^ w36 ^ w30 ^ w28;
      w44 = n << 1 | n >>> 31;
      t = w44 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w42 ^ w37 ^ w31 ^ w29;
      w45 = n << 1 | n >>> 31;
      t = w45 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w43 ^ w38 ^ w32 ^ w30;
      w46 = n << 1 | n >>> 31;
      t = w46 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w44 ^ w39 ^ w33 ^ w31;
      w47 = n << 1 | n >>> 31;
      t = w47 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w45 ^ w40 ^ w34 ^ w32;
      w48 = n << 1 | n >>> 31;
      t = w48 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w46 ^ w41 ^ w35 ^ w33;
      w49 = n << 1 | n >>> 31;
      t = w49 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w47 ^ w42 ^ w36 ^ w34;
      w50 = n << 1 | n >>> 31;
      t = w50 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w48 ^ w43 ^ w37 ^ w35;
      w51 = n << 1 | n >>> 31;
      t = w51 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w49 ^ w44 ^ w38 ^ w36;
      w52 = n << 1 | n >>> 31;
      t = w52 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w50 ^ w45 ^ w39 ^ w37;
      w53 = n << 1 | n >>> 31;
      t = w53 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w51 ^ w46 ^ w40 ^ w38;
      w54 = n << 1 | n >>> 31;
      t = w54 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w52 ^ w47 ^ w41 ^ w39;
      w55 = n << 1 | n >>> 31;
      t = w55 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w53 ^ w48 ^ w42 ^ w40;
      w56 = n << 1 | n >>> 31;
      t = w56 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w54 ^ w49 ^ w43 ^ w41;
      w57 = n << 1 | n >>> 31;
      t = w57 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w55 ^ w50 ^ w44 ^ w42;
      w58 = n << 1 | n >>> 31;
      t = w58 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w56 ^ w51 ^ w45 ^ w43;
      w59 = n << 1 | n >>> 31;
      t = w59 + (a << 5 | a >>> 27) + e + (b & c | b & d | c & d) - 0x70e44324 | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w57 ^ w52 ^ w46 ^ w44;
      w60 = n << 1 | n >>> 31;
      t = w60 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w58 ^ w53 ^ w47 ^ w45;
      w61 = n << 1 | n >>> 31;
      t = w61 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w59 ^ w54 ^ w48 ^ w46;
      w62 = n << 1 | n >>> 31;
      t = w62 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w60 ^ w55 ^ w49 ^ w47;
      w63 = n << 1 | n >>> 31;
      t = w63 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w61 ^ w56 ^ w50 ^ w48;
      w64 = n << 1 | n >>> 31;
      t = w64 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w62 ^ w57 ^ w51 ^ w49;
      w65 = n << 1 | n >>> 31;
      t = w65 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w63 ^ w58 ^ w52 ^ w50;
      w66 = n << 1 | n >>> 31;
      t = w66 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w64 ^ w59 ^ w53 ^ w51;
      w67 = n << 1 | n >>> 31;
      t = w67 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w65 ^ w60 ^ w54 ^ w52;
      w68 = n << 1 | n >>> 31;
      t = w68 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w66 ^ w61 ^ w55 ^ w53;
      w69 = n << 1 | n >>> 31;
      t = w69 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w67 ^ w62 ^ w56 ^ w54;
      w70 = n << 1 | n >>> 31;
      t = w70 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w68 ^ w63 ^ w57 ^ w55;
      w71 = n << 1 | n >>> 31;
      t = w71 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w69 ^ w64 ^ w58 ^ w56;
      w72 = n << 1 | n >>> 31;
      t = w72 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w70 ^ w65 ^ w59 ^ w57;
      w73 = n << 1 | n >>> 31;
      t = w73 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w71 ^ w66 ^ w60 ^ w58;
      w74 = n << 1 | n >>> 31;
      t = w74 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w72 ^ w67 ^ w61 ^ w59;
      w75 = n << 1 | n >>> 31;
      t = w75 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w73 ^ w68 ^ w62 ^ w60;
      w76 = n << 1 | n >>> 31;
      t = w76 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w74 ^ w69 ^ w63 ^ w61;
      w77 = n << 1 | n >>> 31;
      t = w77 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w75 ^ w70 ^ w64 ^ w62;
      w78 = n << 1 | n >>> 31;
      t = w78 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      n = w76 ^ w71 ^ w65 ^ w63;
      w79 = n << 1 | n >>> 31;
      t = w79 + (a << 5 | a >>> 27) + e + (b ^ c ^ d) - 0x359d3e2a | 0;
      e = d;
      d = c;
      c = b << 30 | b >>> 2;
      b = a;
      a = t;
      H0 = H0 + a | 0;
      H1 = H1 + b | 0;
      H2 = H2 + c | 0;
      H3 = H3 + d | 0;
      H4 = H4 + e | 0;
    }
    function _core_heap(offset) {
      offset = offset | 0;
      _core(HEAP[offset | 0] << 24 | HEAP[offset | 1] << 16 | HEAP[offset | 2] << 8 | HEAP[offset | 3], HEAP[offset | 4] << 24 | HEAP[offset | 5] << 16 | HEAP[offset | 6] << 8 | HEAP[offset | 7], HEAP[offset | 8] << 24 | HEAP[offset | 9] << 16 | HEAP[offset | 10] << 8 | HEAP[offset | 11], HEAP[offset | 12] << 24 | HEAP[offset | 13] << 16 | HEAP[offset | 14] << 8 | HEAP[offset | 15], HEAP[offset | 16] << 24 | HEAP[offset | 17] << 16 | HEAP[offset | 18] << 8 | HEAP[offset | 19], HEAP[offset | 20] << 24 | HEAP[offset | 21] << 16 | HEAP[offset | 22] << 8 | HEAP[offset | 23], HEAP[offset | 24] << 24 | HEAP[offset | 25] << 16 | HEAP[offset | 26] << 8 | HEAP[offset | 27], HEAP[offset | 28] << 24 | HEAP[offset | 29] << 16 | HEAP[offset | 30] << 8 | HEAP[offset | 31], HEAP[offset | 32] << 24 | HEAP[offset | 33] << 16 | HEAP[offset | 34] << 8 | HEAP[offset | 35], HEAP[offset | 36] << 24 | HEAP[offset | 37] << 16 | HEAP[offset | 38] << 8 | HEAP[offset | 39], HEAP[offset | 40] << 24 | HEAP[offset | 41] << 16 | HEAP[offset | 42] << 8 | HEAP[offset | 43], HEAP[offset | 44] << 24 | HEAP[offset | 45] << 16 | HEAP[offset | 46] << 8 | HEAP[offset | 47], HEAP[offset | 48] << 24 | HEAP[offset | 49] << 16 | HEAP[offset | 50] << 8 | HEAP[offset | 51], HEAP[offset | 52] << 24 | HEAP[offset | 53] << 16 | HEAP[offset | 54] << 8 | HEAP[offset | 55], HEAP[offset | 56] << 24 | HEAP[offset | 57] << 16 | HEAP[offset | 58] << 8 | HEAP[offset | 59], HEAP[offset | 60] << 24 | HEAP[offset | 61] << 16 | HEAP[offset | 62] << 8 | HEAP[offset | 63]);
    }
    function _state_to_heap(output) {
      output = output | 0;
      HEAP[output | 0] = H0 >>> 24;
      HEAP[output | 1] = H0 >>> 16 & 255;
      HEAP[output | 2] = H0 >>> 8 & 255;
      HEAP[output | 3] = H0 & 255;
      HEAP[output | 4] = H1 >>> 24;
      HEAP[output | 5] = H1 >>> 16 & 255;
      HEAP[output | 6] = H1 >>> 8 & 255;
      HEAP[output | 7] = H1 & 255;
      HEAP[output | 8] = H2 >>> 24;
      HEAP[output | 9] = H2 >>> 16 & 255;
      HEAP[output | 10] = H2 >>> 8 & 255;
      HEAP[output | 11] = H2 & 255;
      HEAP[output | 12] = H3 >>> 24;
      HEAP[output | 13] = H3 >>> 16 & 255;
      HEAP[output | 14] = H3 >>> 8 & 255;
      HEAP[output | 15] = H3 & 255;
      HEAP[output | 16] = H4 >>> 24;
      HEAP[output | 17] = H4 >>> 16 & 255;
      HEAP[output | 18] = H4 >>> 8 & 255;
      HEAP[output | 19] = H4 & 255;
    }
    function reset() {
      H0 = 0x67452301;
      H1 = 0xefcdab89;
      H2 = 0x98badcfe;
      H3 = 0x10325476;
      H4 = 0xc3d2e1f0;
      TOTAL0 = TOTAL1 = 0;
    }
    function init(h0, h1, h2, h3, h4, total0, total1) {
      h0 = h0 | 0;
      h1 = h1 | 0;
      h2 = h2 | 0;
      h3 = h3 | 0;
      h4 = h4 | 0;
      total0 = total0 | 0;
      total1 = total1 | 0;
      H0 = h0;
      H1 = h1;
      H2 = h2;
      H3 = h3;
      H4 = h4;
      TOTAL0 = total0;
      TOTAL1 = total1;
    }
    function process(offset, length) {
      offset = offset | 0;
      length = length | 0;
      var hashed = 0;
      if (offset & 63) return -1;
      while ((length | 0) >= 64) {
        _core_heap(offset);
        offset = offset + 64 | 0;
        length = length - 64 | 0;
        hashed = hashed + 64 | 0;
      }
      TOTAL0 = TOTAL0 + hashed | 0;
      if (TOTAL0 >>> 0 < hashed >>> 0) TOTAL1 = TOTAL1 + 1 | 0;
      return hashed | 0;
    }
    function finish(offset, length, output) {
      offset = offset | 0;
      length = length | 0;
      output = output | 0;
      var hashed = 0,
        i = 0;
      if (offset & 63) return -1;
      if (~output) if (output & 31) return -1;
      if ((length | 0) >= 64) {
        hashed = process(offset, length) | 0;
        if ((hashed | 0) == -1) return -1;
        offset = offset + hashed | 0;
        length = length - hashed | 0;
      }
      hashed = hashed + length | 0;
      TOTAL0 = TOTAL0 + length | 0;
      if (TOTAL0 >>> 0 < length >>> 0) TOTAL1 = TOTAL1 + 1 | 0;
      HEAP[offset | length] = 0x80;
      if ((length | 0) >= 56) {
        for (i = length + 1 | 0; (i | 0) < 64; i = i + 1 | 0) HEAP[offset | i] = 0x00;
        _core_heap(offset);
        length = 0;
        HEAP[offset | 0] = 0;
      }
      for (i = length + 1 | 0; (i | 0) < 59; i = i + 1 | 0) HEAP[offset | i] = 0;
      HEAP[offset | 56] = TOTAL1 >>> 21 & 255;
      HEAP[offset | 57] = TOTAL1 >>> 13 & 255;
      HEAP[offset | 58] = TOTAL1 >>> 5 & 255;
      HEAP[offset | 59] = TOTAL1 << 3 & 255 | TOTAL0 >>> 29;
      HEAP[offset | 60] = TOTAL0 >>> 21 & 255;
      HEAP[offset | 61] = TOTAL0 >>> 13 & 255;
      HEAP[offset | 62] = TOTAL0 >>> 5 & 255;
      HEAP[offset | 63] = TOTAL0 << 3 & 255;
      _core_heap(offset);
      if (~output) _state_to_heap(output);
      return hashed | 0;
    }
    function hmac_reset() {
      H0 = I0;
      H1 = I1;
      H2 = I2;
      H3 = I3;
      H4 = I4;
      TOTAL0 = 64;
      TOTAL1 = 0;
    }
    function _hmac_opad() {
      H0 = O0;
      H1 = O1;
      H2 = O2;
      H3 = O3;
      H4 = O4;
      TOTAL0 = 64;
      TOTAL1 = 0;
    }
    function hmac_init(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15) {
      p0 = p0 | 0;
      p1 = p1 | 0;
      p2 = p2 | 0;
      p3 = p3 | 0;
      p4 = p4 | 0;
      p5 = p5 | 0;
      p6 = p6 | 0;
      p7 = p7 | 0;
      p8 = p8 | 0;
      p9 = p9 | 0;
      p10 = p10 | 0;
      p11 = p11 | 0;
      p12 = p12 | 0;
      p13 = p13 | 0;
      p14 = p14 | 0;
      p15 = p15 | 0;
      reset();
      _core(p0 ^ 0x5c5c5c5c, p1 ^ 0x5c5c5c5c, p2 ^ 0x5c5c5c5c, p3 ^ 0x5c5c5c5c, p4 ^ 0x5c5c5c5c, p5 ^ 0x5c5c5c5c, p6 ^ 0x5c5c5c5c, p7 ^ 0x5c5c5c5c, p8 ^ 0x5c5c5c5c, p9 ^ 0x5c5c5c5c, p10 ^ 0x5c5c5c5c, p11 ^ 0x5c5c5c5c, p12 ^ 0x5c5c5c5c, p13 ^ 0x5c5c5c5c, p14 ^ 0x5c5c5c5c, p15 ^ 0x5c5c5c5c);
      O0 = H0;
      O1 = H1;
      O2 = H2;
      O3 = H3;
      O4 = H4;
      reset();
      _core(p0 ^ 0x36363636, p1 ^ 0x36363636, p2 ^ 0x36363636, p3 ^ 0x36363636, p4 ^ 0x36363636, p5 ^ 0x36363636, p6 ^ 0x36363636, p7 ^ 0x36363636, p8 ^ 0x36363636, p9 ^ 0x36363636, p10 ^ 0x36363636, p11 ^ 0x36363636, p12 ^ 0x36363636, p13 ^ 0x36363636, p14 ^ 0x36363636, p15 ^ 0x36363636);
      I0 = H0;
      I1 = H1;
      I2 = H2;
      I3 = H3;
      I4 = H4;
      TOTAL0 = 64;
      TOTAL1 = 0;
    }
    function hmac_finish(offset, length, output) {
      offset = offset | 0;
      length = length | 0;
      output = output | 0;
      var t0 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0,
        t4 = 0,
        hashed = 0;
      if (offset & 63) return -1;
      if (~output) if (output & 31) return -1;
      hashed = finish(offset, length, -1) | 0;
      t0 = H0, t1 = H1, t2 = H2, t3 = H3, t4 = H4;
      _hmac_opad();
      _core(t0, t1, t2, t3, t4, 0x80000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672);
      if (~output) _state_to_heap(output);
      return hashed | 0;
    }
    function pbkdf2_generate_block(offset, length, block, count, output) {
      offset = offset | 0;
      length = length | 0;
      block = block | 0;
      count = count | 0;
      output = output | 0;
      var h0 = 0,
        h1 = 0,
        h2 = 0,
        h3 = 0,
        h4 = 0,
        t0 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0,
        t4 = 0;
      if (offset & 63) return -1;
      if (~output) if (output & 31) return -1;
      HEAP[offset + length | 0] = block >>> 24;
      HEAP[offset + length + 1 | 0] = block >>> 16 & 255;
      HEAP[offset + length + 2 | 0] = block >>> 8 & 255;
      HEAP[offset + length + 3 | 0] = block & 255;
      hmac_finish(offset, length + 4 | 0, -1) | 0;
      h0 = t0 = H0, h1 = t1 = H1, h2 = t2 = H2, h3 = t3 = H3, h4 = t4 = H4;
      count = count - 1 | 0;
      while ((count | 0) > 0) {
        hmac_reset();
        _core(t0, t1, t2, t3, t4, 0x80000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672);
        t0 = H0, t1 = H1, t2 = H2, t3 = H3, t4 = H4;
        _hmac_opad();
        _core(t0, t1, t2, t3, t4, 0x80000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 672);
        t0 = H0, t1 = H1, t2 = H2, t3 = H3, t4 = H4;
        h0 = h0 ^ H0;
        h1 = h1 ^ H1;
        h2 = h2 ^ H2;
        h3 = h3 ^ H3;
        h4 = h4 ^ H4;
        count = count - 1 | 0;
      }
      H0 = h0;
      H1 = h1;
      H2 = h2;
      H3 = h3;
      H4 = h4;
      if (~output) _state_to_heap(output);
      return 0;
    }
    return {
      reset: reset,
      init: init,
      process: process,
      finish: finish,
      hmac_reset: hmac_reset,
      hmac_init: hmac_init,
      hmac_finish: hmac_finish,
      pbkdf2_generate_block: pbkdf2_generate_block
    };
  };
  var Hash = function () {
    function Hash() {
      _classCallCheck(this, Hash);
      this.pos = 0;
      this.len = 0;
    }
    _createClass(Hash, [{
      key: "reset",
      value: function reset() {
        this.result = null;
        this.pos = 0;
        this.len = 0;
        this.asm.reset();
        return this;
      }
    }, {
      key: "process",
      value: function process(data) {
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        var asm = this.asm;
        var heap = this.heap;
        var hpos = this.pos;
        var hlen = this.len;
        var dpos = 0;
        var dlen = data.length;
        var wlen = 0;
        while (dlen > 0) {
          wlen = _heap_write(heap, hpos + hlen, data, dpos, dlen);
          hlen += wlen;
          dpos += wlen;
          dlen -= wlen;
          wlen = asm.process(hpos, hlen);
          hpos += wlen;
          hlen -= wlen;
          if (!hlen) hpos = 0;
        }
        this.pos = hpos;
        this.len = hlen;
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        this.asm.finish(this.pos, this.len, 0);
        this.result = new Uint8Array(this.HASH_SIZE);
        this.result.set(this.heap.subarray(0, this.HASH_SIZE));
        this.pos = 0;
        this.len = 0;
        return this;
      }
    }]);
    return Hash;
  }();
  var _sha1_block_size = 64;
  var _sha1_hash_size = 20;
  var Sha1 = function (_Hash) {
    _inherits(Sha1, _Hash);
    var _super104 = _createSuper(Sha1);
    function Sha1() {
      var _this85;
      _classCallCheck(this, Sha1);
      _this85 = _super104.call(this);
      _this85.NAME = 'sha1';
      _this85.BLOCK_SIZE = _sha1_block_size;
      _this85.HASH_SIZE = _sha1_hash_size;
      _this85.heap = _heap_init();
      _this85.asm = sha1_asm({
        Uint8Array: Uint8Array
      }, null, _this85.heap.buffer);
      _this85.reset();
      return _this85;
    }
    return _createClass(Sha1);
  }(Hash);
  Sha1.NAME = 'sha1';
  var sha256_asm = function sha256_asm(stdlib, foreign, buffer) {
    "use asm";
    var H0 = 0,
      H1 = 0,
      H2 = 0,
      H3 = 0,
      H4 = 0,
      H5 = 0,
      H6 = 0,
      H7 = 0,
      TOTAL0 = 0,
      TOTAL1 = 0;
    var I0 = 0,
      I1 = 0,
      I2 = 0,
      I3 = 0,
      I4 = 0,
      I5 = 0,
      I6 = 0,
      I7 = 0,
      O0 = 0,
      O1 = 0,
      O2 = 0,
      O3 = 0,
      O4 = 0,
      O5 = 0,
      O6 = 0,
      O7 = 0;
    var HEAP = new stdlib.Uint8Array(buffer);
    function _core(w0, w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12, w13, w14, w15) {
      w0 = w0 | 0;
      w1 = w1 | 0;
      w2 = w2 | 0;
      w3 = w3 | 0;
      w4 = w4 | 0;
      w5 = w5 | 0;
      w6 = w6 | 0;
      w7 = w7 | 0;
      w8 = w8 | 0;
      w9 = w9 | 0;
      w10 = w10 | 0;
      w11 = w11 | 0;
      w12 = w12 | 0;
      w13 = w13 | 0;
      w14 = w14 | 0;
      w15 = w15 | 0;
      var a = 0,
        b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 0,
        g = 0,
        h = 0;
      a = H0;
      b = H1;
      c = H2;
      d = H3;
      e = H4;
      f = H5;
      g = H6;
      h = H7;
      h = w0 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0x428a2f98 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      g = w1 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0x71374491 | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      f = w2 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0xb5c0fbcf | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      e = w3 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0xe9b5dba5 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      d = w4 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0x3956c25b | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      c = w5 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0x59f111f1 | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      b = w6 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0x923f82a4 | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      a = w7 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0xab1c5ed5 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      h = w8 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0xd807aa98 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      g = w9 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0x12835b01 | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      f = w10 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0x243185be | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      e = w11 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0x550c7dc3 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      d = w12 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0x72be5d74 | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      c = w13 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0x80deb1fe | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      b = w14 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0x9bdc06a7 | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      a = w15 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0xc19bf174 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      w0 = (w1 >>> 7 ^ w1 >>> 18 ^ w1 >>> 3 ^ w1 << 25 ^ w1 << 14) + (w14 >>> 17 ^ w14 >>> 19 ^ w14 >>> 10 ^ w14 << 15 ^ w14 << 13) + w0 + w9 | 0;
      h = w0 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0xe49b69c1 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      w1 = (w2 >>> 7 ^ w2 >>> 18 ^ w2 >>> 3 ^ w2 << 25 ^ w2 << 14) + (w15 >>> 17 ^ w15 >>> 19 ^ w15 >>> 10 ^ w15 << 15 ^ w15 << 13) + w1 + w10 | 0;
      g = w1 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0xefbe4786 | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      w2 = (w3 >>> 7 ^ w3 >>> 18 ^ w3 >>> 3 ^ w3 << 25 ^ w3 << 14) + (w0 >>> 17 ^ w0 >>> 19 ^ w0 >>> 10 ^ w0 << 15 ^ w0 << 13) + w2 + w11 | 0;
      f = w2 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0x0fc19dc6 | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      w3 = (w4 >>> 7 ^ w4 >>> 18 ^ w4 >>> 3 ^ w4 << 25 ^ w4 << 14) + (w1 >>> 17 ^ w1 >>> 19 ^ w1 >>> 10 ^ w1 << 15 ^ w1 << 13) + w3 + w12 | 0;
      e = w3 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0x240ca1cc | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      w4 = (w5 >>> 7 ^ w5 >>> 18 ^ w5 >>> 3 ^ w5 << 25 ^ w5 << 14) + (w2 >>> 17 ^ w2 >>> 19 ^ w2 >>> 10 ^ w2 << 15 ^ w2 << 13) + w4 + w13 | 0;
      d = w4 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0x2de92c6f | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      w5 = (w6 >>> 7 ^ w6 >>> 18 ^ w6 >>> 3 ^ w6 << 25 ^ w6 << 14) + (w3 >>> 17 ^ w3 >>> 19 ^ w3 >>> 10 ^ w3 << 15 ^ w3 << 13) + w5 + w14 | 0;
      c = w5 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0x4a7484aa | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      w6 = (w7 >>> 7 ^ w7 >>> 18 ^ w7 >>> 3 ^ w7 << 25 ^ w7 << 14) + (w4 >>> 17 ^ w4 >>> 19 ^ w4 >>> 10 ^ w4 << 15 ^ w4 << 13) + w6 + w15 | 0;
      b = w6 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0x5cb0a9dc | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      w7 = (w8 >>> 7 ^ w8 >>> 18 ^ w8 >>> 3 ^ w8 << 25 ^ w8 << 14) + (w5 >>> 17 ^ w5 >>> 19 ^ w5 >>> 10 ^ w5 << 15 ^ w5 << 13) + w7 + w0 | 0;
      a = w7 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0x76f988da | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      w8 = (w9 >>> 7 ^ w9 >>> 18 ^ w9 >>> 3 ^ w9 << 25 ^ w9 << 14) + (w6 >>> 17 ^ w6 >>> 19 ^ w6 >>> 10 ^ w6 << 15 ^ w6 << 13) + w8 + w1 | 0;
      h = w8 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0x983e5152 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      w9 = (w10 >>> 7 ^ w10 >>> 18 ^ w10 >>> 3 ^ w10 << 25 ^ w10 << 14) + (w7 >>> 17 ^ w7 >>> 19 ^ w7 >>> 10 ^ w7 << 15 ^ w7 << 13) + w9 + w2 | 0;
      g = w9 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0xa831c66d | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      w10 = (w11 >>> 7 ^ w11 >>> 18 ^ w11 >>> 3 ^ w11 << 25 ^ w11 << 14) + (w8 >>> 17 ^ w8 >>> 19 ^ w8 >>> 10 ^ w8 << 15 ^ w8 << 13) + w10 + w3 | 0;
      f = w10 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0xb00327c8 | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      w11 = (w12 >>> 7 ^ w12 >>> 18 ^ w12 >>> 3 ^ w12 << 25 ^ w12 << 14) + (w9 >>> 17 ^ w9 >>> 19 ^ w9 >>> 10 ^ w9 << 15 ^ w9 << 13) + w11 + w4 | 0;
      e = w11 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0xbf597fc7 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      w12 = (w13 >>> 7 ^ w13 >>> 18 ^ w13 >>> 3 ^ w13 << 25 ^ w13 << 14) + (w10 >>> 17 ^ w10 >>> 19 ^ w10 >>> 10 ^ w10 << 15 ^ w10 << 13) + w12 + w5 | 0;
      d = w12 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0xc6e00bf3 | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      w13 = (w14 >>> 7 ^ w14 >>> 18 ^ w14 >>> 3 ^ w14 << 25 ^ w14 << 14) + (w11 >>> 17 ^ w11 >>> 19 ^ w11 >>> 10 ^ w11 << 15 ^ w11 << 13) + w13 + w6 | 0;
      c = w13 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0xd5a79147 | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      w14 = (w15 >>> 7 ^ w15 >>> 18 ^ w15 >>> 3 ^ w15 << 25 ^ w15 << 14) + (w12 >>> 17 ^ w12 >>> 19 ^ w12 >>> 10 ^ w12 << 15 ^ w12 << 13) + w14 + w7 | 0;
      b = w14 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0x06ca6351 | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      w15 = (w0 >>> 7 ^ w0 >>> 18 ^ w0 >>> 3 ^ w0 << 25 ^ w0 << 14) + (w13 >>> 17 ^ w13 >>> 19 ^ w13 >>> 10 ^ w13 << 15 ^ w13 << 13) + w15 + w8 | 0;
      a = w15 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0x14292967 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      w0 = (w1 >>> 7 ^ w1 >>> 18 ^ w1 >>> 3 ^ w1 << 25 ^ w1 << 14) + (w14 >>> 17 ^ w14 >>> 19 ^ w14 >>> 10 ^ w14 << 15 ^ w14 << 13) + w0 + w9 | 0;
      h = w0 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0x27b70a85 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      w1 = (w2 >>> 7 ^ w2 >>> 18 ^ w2 >>> 3 ^ w2 << 25 ^ w2 << 14) + (w15 >>> 17 ^ w15 >>> 19 ^ w15 >>> 10 ^ w15 << 15 ^ w15 << 13) + w1 + w10 | 0;
      g = w1 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0x2e1b2138 | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      w2 = (w3 >>> 7 ^ w3 >>> 18 ^ w3 >>> 3 ^ w3 << 25 ^ w3 << 14) + (w0 >>> 17 ^ w0 >>> 19 ^ w0 >>> 10 ^ w0 << 15 ^ w0 << 13) + w2 + w11 | 0;
      f = w2 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0x4d2c6dfc | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      w3 = (w4 >>> 7 ^ w4 >>> 18 ^ w4 >>> 3 ^ w4 << 25 ^ w4 << 14) + (w1 >>> 17 ^ w1 >>> 19 ^ w1 >>> 10 ^ w1 << 15 ^ w1 << 13) + w3 + w12 | 0;
      e = w3 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0x53380d13 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      w4 = (w5 >>> 7 ^ w5 >>> 18 ^ w5 >>> 3 ^ w5 << 25 ^ w5 << 14) + (w2 >>> 17 ^ w2 >>> 19 ^ w2 >>> 10 ^ w2 << 15 ^ w2 << 13) + w4 + w13 | 0;
      d = w4 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0x650a7354 | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      w5 = (w6 >>> 7 ^ w6 >>> 18 ^ w6 >>> 3 ^ w6 << 25 ^ w6 << 14) + (w3 >>> 17 ^ w3 >>> 19 ^ w3 >>> 10 ^ w3 << 15 ^ w3 << 13) + w5 + w14 | 0;
      c = w5 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0x766a0abb | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      w6 = (w7 >>> 7 ^ w7 >>> 18 ^ w7 >>> 3 ^ w7 << 25 ^ w7 << 14) + (w4 >>> 17 ^ w4 >>> 19 ^ w4 >>> 10 ^ w4 << 15 ^ w4 << 13) + w6 + w15 | 0;
      b = w6 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0x81c2c92e | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      w7 = (w8 >>> 7 ^ w8 >>> 18 ^ w8 >>> 3 ^ w8 << 25 ^ w8 << 14) + (w5 >>> 17 ^ w5 >>> 19 ^ w5 >>> 10 ^ w5 << 15 ^ w5 << 13) + w7 + w0 | 0;
      a = w7 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0x92722c85 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      w8 = (w9 >>> 7 ^ w9 >>> 18 ^ w9 >>> 3 ^ w9 << 25 ^ w9 << 14) + (w6 >>> 17 ^ w6 >>> 19 ^ w6 >>> 10 ^ w6 << 15 ^ w6 << 13) + w8 + w1 | 0;
      h = w8 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0xa2bfe8a1 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      w9 = (w10 >>> 7 ^ w10 >>> 18 ^ w10 >>> 3 ^ w10 << 25 ^ w10 << 14) + (w7 >>> 17 ^ w7 >>> 19 ^ w7 >>> 10 ^ w7 << 15 ^ w7 << 13) + w9 + w2 | 0;
      g = w9 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0xa81a664b | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      w10 = (w11 >>> 7 ^ w11 >>> 18 ^ w11 >>> 3 ^ w11 << 25 ^ w11 << 14) + (w8 >>> 17 ^ w8 >>> 19 ^ w8 >>> 10 ^ w8 << 15 ^ w8 << 13) + w10 + w3 | 0;
      f = w10 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0xc24b8b70 | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      w11 = (w12 >>> 7 ^ w12 >>> 18 ^ w12 >>> 3 ^ w12 << 25 ^ w12 << 14) + (w9 >>> 17 ^ w9 >>> 19 ^ w9 >>> 10 ^ w9 << 15 ^ w9 << 13) + w11 + w4 | 0;
      e = w11 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0xc76c51a3 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      w12 = (w13 >>> 7 ^ w13 >>> 18 ^ w13 >>> 3 ^ w13 << 25 ^ w13 << 14) + (w10 >>> 17 ^ w10 >>> 19 ^ w10 >>> 10 ^ w10 << 15 ^ w10 << 13) + w12 + w5 | 0;
      d = w12 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0xd192e819 | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      w13 = (w14 >>> 7 ^ w14 >>> 18 ^ w14 >>> 3 ^ w14 << 25 ^ w14 << 14) + (w11 >>> 17 ^ w11 >>> 19 ^ w11 >>> 10 ^ w11 << 15 ^ w11 << 13) + w13 + w6 | 0;
      c = w13 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0xd6990624 | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      w14 = (w15 >>> 7 ^ w15 >>> 18 ^ w15 >>> 3 ^ w15 << 25 ^ w15 << 14) + (w12 >>> 17 ^ w12 >>> 19 ^ w12 >>> 10 ^ w12 << 15 ^ w12 << 13) + w14 + w7 | 0;
      b = w14 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0xf40e3585 | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      w15 = (w0 >>> 7 ^ w0 >>> 18 ^ w0 >>> 3 ^ w0 << 25 ^ w0 << 14) + (w13 >>> 17 ^ w13 >>> 19 ^ w13 >>> 10 ^ w13 << 15 ^ w13 << 13) + w15 + w8 | 0;
      a = w15 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0x106aa070 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      w0 = (w1 >>> 7 ^ w1 >>> 18 ^ w1 >>> 3 ^ w1 << 25 ^ w1 << 14) + (w14 >>> 17 ^ w14 >>> 19 ^ w14 >>> 10 ^ w14 << 15 ^ w14 << 13) + w0 + w9 | 0;
      h = w0 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0x19a4c116 | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      w1 = (w2 >>> 7 ^ w2 >>> 18 ^ w2 >>> 3 ^ w2 << 25 ^ w2 << 14) + (w15 >>> 17 ^ w15 >>> 19 ^ w15 >>> 10 ^ w15 << 15 ^ w15 << 13) + w1 + w10 | 0;
      g = w1 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0x1e376c08 | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      w2 = (w3 >>> 7 ^ w3 >>> 18 ^ w3 >>> 3 ^ w3 << 25 ^ w3 << 14) + (w0 >>> 17 ^ w0 >>> 19 ^ w0 >>> 10 ^ w0 << 15 ^ w0 << 13) + w2 + w11 | 0;
      f = w2 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0x2748774c | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      w3 = (w4 >>> 7 ^ w4 >>> 18 ^ w4 >>> 3 ^ w4 << 25 ^ w4 << 14) + (w1 >>> 17 ^ w1 >>> 19 ^ w1 >>> 10 ^ w1 << 15 ^ w1 << 13) + w3 + w12 | 0;
      e = w3 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0x34b0bcb5 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      w4 = (w5 >>> 7 ^ w5 >>> 18 ^ w5 >>> 3 ^ w5 << 25 ^ w5 << 14) + (w2 >>> 17 ^ w2 >>> 19 ^ w2 >>> 10 ^ w2 << 15 ^ w2 << 13) + w4 + w13 | 0;
      d = w4 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0x391c0cb3 | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      w5 = (w6 >>> 7 ^ w6 >>> 18 ^ w6 >>> 3 ^ w6 << 25 ^ w6 << 14) + (w3 >>> 17 ^ w3 >>> 19 ^ w3 >>> 10 ^ w3 << 15 ^ w3 << 13) + w5 + w14 | 0;
      c = w5 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0x4ed8aa4a | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      w6 = (w7 >>> 7 ^ w7 >>> 18 ^ w7 >>> 3 ^ w7 << 25 ^ w7 << 14) + (w4 >>> 17 ^ w4 >>> 19 ^ w4 >>> 10 ^ w4 << 15 ^ w4 << 13) + w6 + w15 | 0;
      b = w6 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0x5b9cca4f | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      w7 = (w8 >>> 7 ^ w8 >>> 18 ^ w8 >>> 3 ^ w8 << 25 ^ w8 << 14) + (w5 >>> 17 ^ w5 >>> 19 ^ w5 >>> 10 ^ w5 << 15 ^ w5 << 13) + w7 + w0 | 0;
      a = w7 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0x682e6ff3 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      w8 = (w9 >>> 7 ^ w9 >>> 18 ^ w9 >>> 3 ^ w9 << 25 ^ w9 << 14) + (w6 >>> 17 ^ w6 >>> 19 ^ w6 >>> 10 ^ w6 << 15 ^ w6 << 13) + w8 + w1 | 0;
      h = w8 + h + (e >>> 6 ^ e >>> 11 ^ e >>> 25 ^ e << 26 ^ e << 21 ^ e << 7) + (g ^ e & (f ^ g)) + 0x748f82ee | 0;
      d = d + h | 0;
      h = h + (a & b ^ c & (a ^ b)) + (a >>> 2 ^ a >>> 13 ^ a >>> 22 ^ a << 30 ^ a << 19 ^ a << 10) | 0;
      w9 = (w10 >>> 7 ^ w10 >>> 18 ^ w10 >>> 3 ^ w10 << 25 ^ w10 << 14) + (w7 >>> 17 ^ w7 >>> 19 ^ w7 >>> 10 ^ w7 << 15 ^ w7 << 13) + w9 + w2 | 0;
      g = w9 + g + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (f ^ d & (e ^ f)) + 0x78a5636f | 0;
      c = c + g | 0;
      g = g + (h & a ^ b & (h ^ a)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      w10 = (w11 >>> 7 ^ w11 >>> 18 ^ w11 >>> 3 ^ w11 << 25 ^ w11 << 14) + (w8 >>> 17 ^ w8 >>> 19 ^ w8 >>> 10 ^ w8 << 15 ^ w8 << 13) + w10 + w3 | 0;
      f = w10 + f + (c >>> 6 ^ c >>> 11 ^ c >>> 25 ^ c << 26 ^ c << 21 ^ c << 7) + (e ^ c & (d ^ e)) + 0x84c87814 | 0;
      b = b + f | 0;
      f = f + (g & h ^ a & (g ^ h)) + (g >>> 2 ^ g >>> 13 ^ g >>> 22 ^ g << 30 ^ g << 19 ^ g << 10) | 0;
      w11 = (w12 >>> 7 ^ w12 >>> 18 ^ w12 >>> 3 ^ w12 << 25 ^ w12 << 14) + (w9 >>> 17 ^ w9 >>> 19 ^ w9 >>> 10 ^ w9 << 15 ^ w9 << 13) + w11 + w4 | 0;
      e = w11 + e + (b >>> 6 ^ b >>> 11 ^ b >>> 25 ^ b << 26 ^ b << 21 ^ b << 7) + (d ^ b & (c ^ d)) + 0x8cc70208 | 0;
      a = a + e | 0;
      e = e + (f & g ^ h & (f ^ g)) + (f >>> 2 ^ f >>> 13 ^ f >>> 22 ^ f << 30 ^ f << 19 ^ f << 10) | 0;
      w12 = (w13 >>> 7 ^ w13 >>> 18 ^ w13 >>> 3 ^ w13 << 25 ^ w13 << 14) + (w10 >>> 17 ^ w10 >>> 19 ^ w10 >>> 10 ^ w10 << 15 ^ w10 << 13) + w12 + w5 | 0;
      d = w12 + d + (a >>> 6 ^ a >>> 11 ^ a >>> 25 ^ a << 26 ^ a << 21 ^ a << 7) + (c ^ a & (b ^ c)) + 0x90befffa | 0;
      h = h + d | 0;
      d = d + (e & f ^ g & (e ^ f)) + (e >>> 2 ^ e >>> 13 ^ e >>> 22 ^ e << 30 ^ e << 19 ^ e << 10) | 0;
      w13 = (w14 >>> 7 ^ w14 >>> 18 ^ w14 >>> 3 ^ w14 << 25 ^ w14 << 14) + (w11 >>> 17 ^ w11 >>> 19 ^ w11 >>> 10 ^ w11 << 15 ^ w11 << 13) + w13 + w6 | 0;
      c = w13 + c + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (b ^ h & (a ^ b)) + 0xa4506ceb | 0;
      g = g + c | 0;
      c = c + (d & e ^ f & (d ^ e)) + (d >>> 2 ^ d >>> 13 ^ d >>> 22 ^ d << 30 ^ d << 19 ^ d << 10) | 0;
      w14 = (w15 >>> 7 ^ w15 >>> 18 ^ w15 >>> 3 ^ w15 << 25 ^ w15 << 14) + (w12 >>> 17 ^ w12 >>> 19 ^ w12 >>> 10 ^ w12 << 15 ^ w12 << 13) + w14 + w7 | 0;
      b = w14 + b + (g >>> 6 ^ g >>> 11 ^ g >>> 25 ^ g << 26 ^ g << 21 ^ g << 7) + (a ^ g & (h ^ a)) + 0xbef9a3f7 | 0;
      f = f + b | 0;
      b = b + (c & d ^ e & (c ^ d)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
      w15 = (w0 >>> 7 ^ w0 >>> 18 ^ w0 >>> 3 ^ w0 << 25 ^ w0 << 14) + (w13 >>> 17 ^ w13 >>> 19 ^ w13 >>> 10 ^ w13 << 15 ^ w13 << 13) + w15 + w8 | 0;
      a = w15 + a + (f >>> 6 ^ f >>> 11 ^ f >>> 25 ^ f << 26 ^ f << 21 ^ f << 7) + (h ^ f & (g ^ h)) + 0xc67178f2 | 0;
      e = e + a | 0;
      a = a + (b & c ^ d & (b ^ c)) + (b >>> 2 ^ b >>> 13 ^ b >>> 22 ^ b << 30 ^ b << 19 ^ b << 10) | 0;
      H0 = H0 + a | 0;
      H1 = H1 + b | 0;
      H2 = H2 + c | 0;
      H3 = H3 + d | 0;
      H4 = H4 + e | 0;
      H5 = H5 + f | 0;
      H6 = H6 + g | 0;
      H7 = H7 + h | 0;
    }
    function _core_heap(offset) {
      offset = offset | 0;
      _core(HEAP[offset | 0] << 24 | HEAP[offset | 1] << 16 | HEAP[offset | 2] << 8 | HEAP[offset | 3], HEAP[offset | 4] << 24 | HEAP[offset | 5] << 16 | HEAP[offset | 6] << 8 | HEAP[offset | 7], HEAP[offset | 8] << 24 | HEAP[offset | 9] << 16 | HEAP[offset | 10] << 8 | HEAP[offset | 11], HEAP[offset | 12] << 24 | HEAP[offset | 13] << 16 | HEAP[offset | 14] << 8 | HEAP[offset | 15], HEAP[offset | 16] << 24 | HEAP[offset | 17] << 16 | HEAP[offset | 18] << 8 | HEAP[offset | 19], HEAP[offset | 20] << 24 | HEAP[offset | 21] << 16 | HEAP[offset | 22] << 8 | HEAP[offset | 23], HEAP[offset | 24] << 24 | HEAP[offset | 25] << 16 | HEAP[offset | 26] << 8 | HEAP[offset | 27], HEAP[offset | 28] << 24 | HEAP[offset | 29] << 16 | HEAP[offset | 30] << 8 | HEAP[offset | 31], HEAP[offset | 32] << 24 | HEAP[offset | 33] << 16 | HEAP[offset | 34] << 8 | HEAP[offset | 35], HEAP[offset | 36] << 24 | HEAP[offset | 37] << 16 | HEAP[offset | 38] << 8 | HEAP[offset | 39], HEAP[offset | 40] << 24 | HEAP[offset | 41] << 16 | HEAP[offset | 42] << 8 | HEAP[offset | 43], HEAP[offset | 44] << 24 | HEAP[offset | 45] << 16 | HEAP[offset | 46] << 8 | HEAP[offset | 47], HEAP[offset | 48] << 24 | HEAP[offset | 49] << 16 | HEAP[offset | 50] << 8 | HEAP[offset | 51], HEAP[offset | 52] << 24 | HEAP[offset | 53] << 16 | HEAP[offset | 54] << 8 | HEAP[offset | 55], HEAP[offset | 56] << 24 | HEAP[offset | 57] << 16 | HEAP[offset | 58] << 8 | HEAP[offset | 59], HEAP[offset | 60] << 24 | HEAP[offset | 61] << 16 | HEAP[offset | 62] << 8 | HEAP[offset | 63]);
    }
    function _state_to_heap(output) {
      output = output | 0;
      HEAP[output | 0] = H0 >>> 24;
      HEAP[output | 1] = H0 >>> 16 & 255;
      HEAP[output | 2] = H0 >>> 8 & 255;
      HEAP[output | 3] = H0 & 255;
      HEAP[output | 4] = H1 >>> 24;
      HEAP[output | 5] = H1 >>> 16 & 255;
      HEAP[output | 6] = H1 >>> 8 & 255;
      HEAP[output | 7] = H1 & 255;
      HEAP[output | 8] = H2 >>> 24;
      HEAP[output | 9] = H2 >>> 16 & 255;
      HEAP[output | 10] = H2 >>> 8 & 255;
      HEAP[output | 11] = H2 & 255;
      HEAP[output | 12] = H3 >>> 24;
      HEAP[output | 13] = H3 >>> 16 & 255;
      HEAP[output | 14] = H3 >>> 8 & 255;
      HEAP[output | 15] = H3 & 255;
      HEAP[output | 16] = H4 >>> 24;
      HEAP[output | 17] = H4 >>> 16 & 255;
      HEAP[output | 18] = H4 >>> 8 & 255;
      HEAP[output | 19] = H4 & 255;
      HEAP[output | 20] = H5 >>> 24;
      HEAP[output | 21] = H5 >>> 16 & 255;
      HEAP[output | 22] = H5 >>> 8 & 255;
      HEAP[output | 23] = H5 & 255;
      HEAP[output | 24] = H6 >>> 24;
      HEAP[output | 25] = H6 >>> 16 & 255;
      HEAP[output | 26] = H6 >>> 8 & 255;
      HEAP[output | 27] = H6 & 255;
      HEAP[output | 28] = H7 >>> 24;
      HEAP[output | 29] = H7 >>> 16 & 255;
      HEAP[output | 30] = H7 >>> 8 & 255;
      HEAP[output | 31] = H7 & 255;
    }
    function reset() {
      H0 = 0x6a09e667;
      H1 = 0xbb67ae85;
      H2 = 0x3c6ef372;
      H3 = 0xa54ff53a;
      H4 = 0x510e527f;
      H5 = 0x9b05688c;
      H6 = 0x1f83d9ab;
      H7 = 0x5be0cd19;
      TOTAL0 = TOTAL1 = 0;
    }
    function init(h0, h1, h2, h3, h4, h5, h6, h7, total0, total1) {
      h0 = h0 | 0;
      h1 = h1 | 0;
      h2 = h2 | 0;
      h3 = h3 | 0;
      h4 = h4 | 0;
      h5 = h5 | 0;
      h6 = h6 | 0;
      h7 = h7 | 0;
      total0 = total0 | 0;
      total1 = total1 | 0;
      H0 = h0;
      H1 = h1;
      H2 = h2;
      H3 = h3;
      H4 = h4;
      H5 = h5;
      H6 = h6;
      H7 = h7;
      TOTAL0 = total0;
      TOTAL1 = total1;
    }
    function process(offset, length) {
      offset = offset | 0;
      length = length | 0;
      var hashed = 0;
      if (offset & 63) return -1;
      while ((length | 0) >= 64) {
        _core_heap(offset);
        offset = offset + 64 | 0;
        length = length - 64 | 0;
        hashed = hashed + 64 | 0;
      }
      TOTAL0 = TOTAL0 + hashed | 0;
      if (TOTAL0 >>> 0 < hashed >>> 0) TOTAL1 = TOTAL1 + 1 | 0;
      return hashed | 0;
    }
    function finish(offset, length, output) {
      offset = offset | 0;
      length = length | 0;
      output = output | 0;
      var hashed = 0,
        i = 0;
      if (offset & 63) return -1;
      if (~output) if (output & 31) return -1;
      if ((length | 0) >= 64) {
        hashed = process(offset, length) | 0;
        if ((hashed | 0) == -1) return -1;
        offset = offset + hashed | 0;
        length = length - hashed | 0;
      }
      hashed = hashed + length | 0;
      TOTAL0 = TOTAL0 + length | 0;
      if (TOTAL0 >>> 0 < length >>> 0) TOTAL1 = TOTAL1 + 1 | 0;
      HEAP[offset | length] = 0x80;
      if ((length | 0) >= 56) {
        for (i = length + 1 | 0; (i | 0) < 64; i = i + 1 | 0) HEAP[offset | i] = 0x00;
        _core_heap(offset);
        length = 0;
        HEAP[offset | 0] = 0;
      }
      for (i = length + 1 | 0; (i | 0) < 59; i = i + 1 | 0) HEAP[offset | i] = 0;
      HEAP[offset | 56] = TOTAL1 >>> 21 & 255;
      HEAP[offset | 57] = TOTAL1 >>> 13 & 255;
      HEAP[offset | 58] = TOTAL1 >>> 5 & 255;
      HEAP[offset | 59] = TOTAL1 << 3 & 255 | TOTAL0 >>> 29;
      HEAP[offset | 60] = TOTAL0 >>> 21 & 255;
      HEAP[offset | 61] = TOTAL0 >>> 13 & 255;
      HEAP[offset | 62] = TOTAL0 >>> 5 & 255;
      HEAP[offset | 63] = TOTAL0 << 3 & 255;
      _core_heap(offset);
      if (~output) _state_to_heap(output);
      return hashed | 0;
    }
    function hmac_reset() {
      H0 = I0;
      H1 = I1;
      H2 = I2;
      H3 = I3;
      H4 = I4;
      H5 = I5;
      H6 = I6;
      H7 = I7;
      TOTAL0 = 64;
      TOTAL1 = 0;
    }
    function _hmac_opad() {
      H0 = O0;
      H1 = O1;
      H2 = O2;
      H3 = O3;
      H4 = O4;
      H5 = O5;
      H6 = O6;
      H7 = O7;
      TOTAL0 = 64;
      TOTAL1 = 0;
    }
    function hmac_init(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15) {
      p0 = p0 | 0;
      p1 = p1 | 0;
      p2 = p2 | 0;
      p3 = p3 | 0;
      p4 = p4 | 0;
      p5 = p5 | 0;
      p6 = p6 | 0;
      p7 = p7 | 0;
      p8 = p8 | 0;
      p9 = p9 | 0;
      p10 = p10 | 0;
      p11 = p11 | 0;
      p12 = p12 | 0;
      p13 = p13 | 0;
      p14 = p14 | 0;
      p15 = p15 | 0;
      reset();
      _core(p0 ^ 0x5c5c5c5c, p1 ^ 0x5c5c5c5c, p2 ^ 0x5c5c5c5c, p3 ^ 0x5c5c5c5c, p4 ^ 0x5c5c5c5c, p5 ^ 0x5c5c5c5c, p6 ^ 0x5c5c5c5c, p7 ^ 0x5c5c5c5c, p8 ^ 0x5c5c5c5c, p9 ^ 0x5c5c5c5c, p10 ^ 0x5c5c5c5c, p11 ^ 0x5c5c5c5c, p12 ^ 0x5c5c5c5c, p13 ^ 0x5c5c5c5c, p14 ^ 0x5c5c5c5c, p15 ^ 0x5c5c5c5c);
      O0 = H0;
      O1 = H1;
      O2 = H2;
      O3 = H3;
      O4 = H4;
      O5 = H5;
      O6 = H6;
      O7 = H7;
      reset();
      _core(p0 ^ 0x36363636, p1 ^ 0x36363636, p2 ^ 0x36363636, p3 ^ 0x36363636, p4 ^ 0x36363636, p5 ^ 0x36363636, p6 ^ 0x36363636, p7 ^ 0x36363636, p8 ^ 0x36363636, p9 ^ 0x36363636, p10 ^ 0x36363636, p11 ^ 0x36363636, p12 ^ 0x36363636, p13 ^ 0x36363636, p14 ^ 0x36363636, p15 ^ 0x36363636);
      I0 = H0;
      I1 = H1;
      I2 = H2;
      I3 = H3;
      I4 = H4;
      I5 = H5;
      I6 = H6;
      I7 = H7;
      TOTAL0 = 64;
      TOTAL1 = 0;
    }
    function hmac_finish(offset, length, output) {
      offset = offset | 0;
      length = length | 0;
      output = output | 0;
      var t0 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0,
        t4 = 0,
        t5 = 0,
        t6 = 0,
        t7 = 0,
        hashed = 0;
      if (offset & 63) return -1;
      if (~output) if (output & 31) return -1;
      hashed = finish(offset, length, -1) | 0;
      t0 = H0, t1 = H1, t2 = H2, t3 = H3, t4 = H4, t5 = H5, t6 = H6, t7 = H7;
      _hmac_opad();
      _core(t0, t1, t2, t3, t4, t5, t6, t7, 0x80000000, 0, 0, 0, 0, 0, 0, 768);
      if (~output) _state_to_heap(output);
      return hashed | 0;
    }
    function pbkdf2_generate_block(offset, length, block, count, output) {
      offset = offset | 0;
      length = length | 0;
      block = block | 0;
      count = count | 0;
      output = output | 0;
      var h0 = 0,
        h1 = 0,
        h2 = 0,
        h3 = 0,
        h4 = 0,
        h5 = 0,
        h6 = 0,
        h7 = 0,
        t0 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0,
        t4 = 0,
        t5 = 0,
        t6 = 0,
        t7 = 0;
      if (offset & 63) return -1;
      if (~output) if (output & 31) return -1;
      HEAP[offset + length | 0] = block >>> 24;
      HEAP[offset + length + 1 | 0] = block >>> 16 & 255;
      HEAP[offset + length + 2 | 0] = block >>> 8 & 255;
      HEAP[offset + length + 3 | 0] = block & 255;
      hmac_finish(offset, length + 4 | 0, -1) | 0;
      h0 = t0 = H0, h1 = t1 = H1, h2 = t2 = H2, h3 = t3 = H3, h4 = t4 = H4, h5 = t5 = H5, h6 = t6 = H6, h7 = t7 = H7;
      count = count - 1 | 0;
      while ((count | 0) > 0) {
        hmac_reset();
        _core(t0, t1, t2, t3, t4, t5, t6, t7, 0x80000000, 0, 0, 0, 0, 0, 0, 768);
        t0 = H0, t1 = H1, t2 = H2, t3 = H3, t4 = H4, t5 = H5, t6 = H6, t7 = H7;
        _hmac_opad();
        _core(t0, t1, t2, t3, t4, t5, t6, t7, 0x80000000, 0, 0, 0, 0, 0, 0, 768);
        t0 = H0, t1 = H1, t2 = H2, t3 = H3, t4 = H4, t5 = H5, t6 = H6, t7 = H7;
        h0 = h0 ^ H0;
        h1 = h1 ^ H1;
        h2 = h2 ^ H2;
        h3 = h3 ^ H3;
        h4 = h4 ^ H4;
        h5 = h5 ^ H5;
        h6 = h6 ^ H6;
        h7 = h7 ^ H7;
        count = count - 1 | 0;
      }
      H0 = h0;
      H1 = h1;
      H2 = h2;
      H3 = h3;
      H4 = h4;
      H5 = h5;
      H6 = h6;
      H7 = h7;
      if (~output) _state_to_heap(output);
      return 0;
    }
    return {
      reset: reset,
      init: init,
      process: process,
      finish: finish,
      hmac_reset: hmac_reset,
      hmac_init: hmac_init,
      hmac_finish: hmac_finish,
      pbkdf2_generate_block: pbkdf2_generate_block
    };
  };
  var _sha256_block_size = 64;
  var _sha256_hash_size = 32;
  var Sha256 = function (_Hash2) {
    _inherits(Sha256, _Hash2);
    var _super105 = _createSuper(Sha256);
    function Sha256() {
      var _this86;
      _classCallCheck(this, Sha256);
      _this86 = _super105.call(this);
      _this86.NAME = 'sha256';
      _this86.BLOCK_SIZE = _sha256_block_size;
      _this86.HASH_SIZE = _sha256_hash_size;
      _this86.heap = _heap_init();
      _this86.asm = sha256_asm({
        Uint8Array: Uint8Array
      }, null, _this86.heap.buffer);
      _this86.reset();
      return _this86;
    }
    return _createClass(Sha256);
  }(Hash);
  Sha256.NAME = 'sha256';
  var sha512_asm = function sha512_asm(stdlib, foreign, buffer) {
    "use asm";
    var H0h = 0,
      H0l = 0,
      H1h = 0,
      H1l = 0,
      H2h = 0,
      H2l = 0,
      H3h = 0,
      H3l = 0,
      H4h = 0,
      H4l = 0,
      H5h = 0,
      H5l = 0,
      H6h = 0,
      H6l = 0,
      H7h = 0,
      H7l = 0,
      TOTAL0 = 0,
      TOTAL1 = 0;
    var I0h = 0,
      I0l = 0,
      I1h = 0,
      I1l = 0,
      I2h = 0,
      I2l = 0,
      I3h = 0,
      I3l = 0,
      I4h = 0,
      I4l = 0,
      I5h = 0,
      I5l = 0,
      I6h = 0,
      I6l = 0,
      I7h = 0,
      I7l = 0,
      O0h = 0,
      O0l = 0,
      O1h = 0,
      O1l = 0,
      O2h = 0,
      O2l = 0,
      O3h = 0,
      O3l = 0,
      O4h = 0,
      O4l = 0,
      O5h = 0,
      O5l = 0,
      O6h = 0,
      O6l = 0,
      O7h = 0,
      O7l = 0;
    var HEAP = new stdlib.Uint8Array(buffer);
    function _core(w0h, w0l, w1h, w1l, w2h, w2l, w3h, w3l, w4h, w4l, w5h, w5l, w6h, w6l, w7h, w7l, w8h, w8l, w9h, w9l, w10h, w10l, w11h, w11l, w12h, w12l, w13h, w13l, w14h, w14l, w15h, w15l) {
      w0h = w0h | 0;
      w0l = w0l | 0;
      w1h = w1h | 0;
      w1l = w1l | 0;
      w2h = w2h | 0;
      w2l = w2l | 0;
      w3h = w3h | 0;
      w3l = w3l | 0;
      w4h = w4h | 0;
      w4l = w4l | 0;
      w5h = w5h | 0;
      w5l = w5l | 0;
      w6h = w6h | 0;
      w6l = w6l | 0;
      w7h = w7h | 0;
      w7l = w7l | 0;
      w8h = w8h | 0;
      w8l = w8l | 0;
      w9h = w9h | 0;
      w9l = w9l | 0;
      w10h = w10h | 0;
      w10l = w10l | 0;
      w11h = w11h | 0;
      w11l = w11l | 0;
      w12h = w12h | 0;
      w12l = w12l | 0;
      w13h = w13h | 0;
      w13l = w13l | 0;
      w14h = w14h | 0;
      w14l = w14l | 0;
      w15h = w15h | 0;
      w15l = w15l | 0;
      var ah = 0,
        al = 0,
        bh = 0,
        bl = 0,
        ch = 0,
        cl = 0,
        dh = 0,
        dl = 0,
        eh = 0,
        el = 0,
        fh = 0,
        fl = 0,
        gh = 0,
        gl = 0,
        hh = 0,
        hl = 0,
        th = 0,
        tl = 0,
        xl = 0;
      ah = H0h;
      al = H0l;
      bh = H1h;
      bl = H1l;
      ch = H2h;
      cl = H2l;
      dh = H3h;
      dl = H3l;
      eh = H4h;
      el = H4l;
      fh = H5h;
      fl = H5l;
      gh = H6h;
      gl = H6l;
      hh = H7h;
      hl = H7l;
      tl = 0xd728ae22 + w0l | 0;
      th = 0x428a2f98 + w0h + (tl >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x23ef65cd + w1l | 0;
      th = 0x71374491 + w1h + (tl >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xec4d3b2f + w2l | 0;
      th = 0xb5c0fbcf + w2h + (tl >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x8189dbbc + w3l | 0;
      th = 0xe9b5dba5 + w3h + (tl >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xf348b538 + w4l | 0;
      th = 0x3956c25b + w4h + (tl >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xb605d019 + w5l | 0;
      th = 0x59f111f1 + w5h + (tl >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xaf194f9b + w6l | 0;
      th = 0x923f82a4 + w6h + (tl >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xda6d8118 + w7l | 0;
      th = 0xab1c5ed5 + w7h + (tl >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xa3030242 + w8l | 0;
      th = 0xd807aa98 + w8h + (tl >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x45706fbe + w9l | 0;
      th = 0x12835b01 + w9h + (tl >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x4ee4b28c + w10l | 0;
      th = 0x243185be + w10h + (tl >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xd5ffb4e2 + w11l | 0;
      th = 0x550c7dc3 + w11h + (tl >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xf27b896f + w12l | 0;
      th = 0x72be5d74 + w12h + (tl >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x3b1696b1 + w13l | 0;
      th = 0x80deb1fe + w13h + (tl >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x25c71235 + w14l | 0;
      th = 0x9bdc06a7 + w14h + (tl >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xcf692694 + w15l | 0;
      th = 0xc19bf174 + w15h + (tl >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w0l = w0l + w9l | 0;
      w0h = w0h + w9h + (w0l >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 1 | w1h << 31) ^ (w1l >>> 8 | w1h << 24) ^ (w1l >>> 7 | w1h << 25) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w1h >>> 1 | w1l << 31) ^ (w1h >>> 8 | w1l << 24) ^ w1h >>> 7) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 19 | w14h << 13) ^ (w14l << 3 | w14h >>> 29) ^ (w14l >>> 6 | w14h << 26) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w14h >>> 19 | w14l << 13) ^ (w14h << 3 | w14l >>> 29) ^ w14h >>> 6) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x9ef14ad2 + w0l | 0;
      th = 0xe49b69c1 + w0h + (tl >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w1l = w1l + w10l | 0;
      w1h = w1h + w10h + (w1l >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 1 | w2h << 31) ^ (w2l >>> 8 | w2h << 24) ^ (w2l >>> 7 | w2h << 25) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w2h >>> 1 | w2l << 31) ^ (w2h >>> 8 | w2l << 24) ^ w2h >>> 7) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 19 | w15h << 13) ^ (w15l << 3 | w15h >>> 29) ^ (w15l >>> 6 | w15h << 26) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w15h >>> 19 | w15l << 13) ^ (w15h << 3 | w15l >>> 29) ^ w15h >>> 6) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x384f25e3 + w1l | 0;
      th = 0xefbe4786 + w1h + (tl >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w2l = w2l + w11l | 0;
      w2h = w2h + w11h + (w2l >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 1 | w3h << 31) ^ (w3l >>> 8 | w3h << 24) ^ (w3l >>> 7 | w3h << 25) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w3h >>> 1 | w3l << 31) ^ (w3h >>> 8 | w3l << 24) ^ w3h >>> 7) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 19 | w0h << 13) ^ (w0l << 3 | w0h >>> 29) ^ (w0l >>> 6 | w0h << 26) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w0h >>> 19 | w0l << 13) ^ (w0h << 3 | w0l >>> 29) ^ w0h >>> 6) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x8b8cd5b5 + w2l | 0;
      th = 0xfc19dc6 + w2h + (tl >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w3l = w3l + w12l | 0;
      w3h = w3h + w12h + (w3l >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 1 | w4h << 31) ^ (w4l >>> 8 | w4h << 24) ^ (w4l >>> 7 | w4h << 25) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w4h >>> 1 | w4l << 31) ^ (w4h >>> 8 | w4l << 24) ^ w4h >>> 7) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 19 | w1h << 13) ^ (w1l << 3 | w1h >>> 29) ^ (w1l >>> 6 | w1h << 26) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w1h >>> 19 | w1l << 13) ^ (w1h << 3 | w1l >>> 29) ^ w1h >>> 6) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x77ac9c65 + w3l | 0;
      th = 0x240ca1cc + w3h + (tl >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w4l = w4l + w13l | 0;
      w4h = w4h + w13h + (w4l >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 1 | w5h << 31) ^ (w5l >>> 8 | w5h << 24) ^ (w5l >>> 7 | w5h << 25) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w5h >>> 1 | w5l << 31) ^ (w5h >>> 8 | w5l << 24) ^ w5h >>> 7) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 19 | w2h << 13) ^ (w2l << 3 | w2h >>> 29) ^ (w2l >>> 6 | w2h << 26) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w2h >>> 19 | w2l << 13) ^ (w2h << 3 | w2l >>> 29) ^ w2h >>> 6) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x592b0275 + w4l | 0;
      th = 0x2de92c6f + w4h + (tl >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w5l = w5l + w14l | 0;
      w5h = w5h + w14h + (w5l >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 1 | w6h << 31) ^ (w6l >>> 8 | w6h << 24) ^ (w6l >>> 7 | w6h << 25) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w6h >>> 1 | w6l << 31) ^ (w6h >>> 8 | w6l << 24) ^ w6h >>> 7) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 19 | w3h << 13) ^ (w3l << 3 | w3h >>> 29) ^ (w3l >>> 6 | w3h << 26) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w3h >>> 19 | w3l << 13) ^ (w3h << 3 | w3l >>> 29) ^ w3h >>> 6) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x6ea6e483 + w5l | 0;
      th = 0x4a7484aa + w5h + (tl >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w6l = w6l + w15l | 0;
      w6h = w6h + w15h + (w6l >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 1 | w7h << 31) ^ (w7l >>> 8 | w7h << 24) ^ (w7l >>> 7 | w7h << 25) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w7h >>> 1 | w7l << 31) ^ (w7h >>> 8 | w7l << 24) ^ w7h >>> 7) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 19 | w4h << 13) ^ (w4l << 3 | w4h >>> 29) ^ (w4l >>> 6 | w4h << 26) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w4h >>> 19 | w4l << 13) ^ (w4h << 3 | w4l >>> 29) ^ w4h >>> 6) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xbd41fbd4 + w6l | 0;
      th = 0x5cb0a9dc + w6h + (tl >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w7l = w7l + w0l | 0;
      w7h = w7h + w0h + (w7l >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 1 | w8h << 31) ^ (w8l >>> 8 | w8h << 24) ^ (w8l >>> 7 | w8h << 25) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w8h >>> 1 | w8l << 31) ^ (w8h >>> 8 | w8l << 24) ^ w8h >>> 7) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 19 | w5h << 13) ^ (w5l << 3 | w5h >>> 29) ^ (w5l >>> 6 | w5h << 26) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w5h >>> 19 | w5l << 13) ^ (w5h << 3 | w5l >>> 29) ^ w5h >>> 6) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x831153b5 + w7l | 0;
      th = 0x76f988da + w7h + (tl >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w8l = w8l + w1l | 0;
      w8h = w8h + w1h + (w8l >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 1 | w9h << 31) ^ (w9l >>> 8 | w9h << 24) ^ (w9l >>> 7 | w9h << 25) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w9h >>> 1 | w9l << 31) ^ (w9h >>> 8 | w9l << 24) ^ w9h >>> 7) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 19 | w6h << 13) ^ (w6l << 3 | w6h >>> 29) ^ (w6l >>> 6 | w6h << 26) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w6h >>> 19 | w6l << 13) ^ (w6h << 3 | w6l >>> 29) ^ w6h >>> 6) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xee66dfab + w8l | 0;
      th = 0x983e5152 + w8h + (tl >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w9l = w9l + w2l | 0;
      w9h = w9h + w2h + (w9l >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 1 | w10h << 31) ^ (w10l >>> 8 | w10h << 24) ^ (w10l >>> 7 | w10h << 25) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w10h >>> 1 | w10l << 31) ^ (w10h >>> 8 | w10l << 24) ^ w10h >>> 7) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 19 | w7h << 13) ^ (w7l << 3 | w7h >>> 29) ^ (w7l >>> 6 | w7h << 26) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w7h >>> 19 | w7l << 13) ^ (w7h << 3 | w7l >>> 29) ^ w7h >>> 6) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x2db43210 + w9l | 0;
      th = 0xa831c66d + w9h + (tl >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w10l = w10l + w3l | 0;
      w10h = w10h + w3h + (w10l >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 1 | w11h << 31) ^ (w11l >>> 8 | w11h << 24) ^ (w11l >>> 7 | w11h << 25) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w11h >>> 1 | w11l << 31) ^ (w11h >>> 8 | w11l << 24) ^ w11h >>> 7) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 19 | w8h << 13) ^ (w8l << 3 | w8h >>> 29) ^ (w8l >>> 6 | w8h << 26) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w8h >>> 19 | w8l << 13) ^ (w8h << 3 | w8l >>> 29) ^ w8h >>> 6) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x98fb213f + w10l | 0;
      th = 0xb00327c8 + w10h + (tl >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w11l = w11l + w4l | 0;
      w11h = w11h + w4h + (w11l >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 1 | w12h << 31) ^ (w12l >>> 8 | w12h << 24) ^ (w12l >>> 7 | w12h << 25) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w12h >>> 1 | w12l << 31) ^ (w12h >>> 8 | w12l << 24) ^ w12h >>> 7) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 19 | w9h << 13) ^ (w9l << 3 | w9h >>> 29) ^ (w9l >>> 6 | w9h << 26) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w9h >>> 19 | w9l << 13) ^ (w9h << 3 | w9l >>> 29) ^ w9h >>> 6) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xbeef0ee4 + w11l | 0;
      th = 0xbf597fc7 + w11h + (tl >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w12l = w12l + w5l | 0;
      w12h = w12h + w5h + (w12l >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 1 | w13h << 31) ^ (w13l >>> 8 | w13h << 24) ^ (w13l >>> 7 | w13h << 25) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w13h >>> 1 | w13l << 31) ^ (w13h >>> 8 | w13l << 24) ^ w13h >>> 7) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 19 | w10h << 13) ^ (w10l << 3 | w10h >>> 29) ^ (w10l >>> 6 | w10h << 26) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w10h >>> 19 | w10l << 13) ^ (w10h << 3 | w10l >>> 29) ^ w10h >>> 6) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x3da88fc2 + w12l | 0;
      th = 0xc6e00bf3 + w12h + (tl >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w13l = w13l + w6l | 0;
      w13h = w13h + w6h + (w13l >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 1 | w14h << 31) ^ (w14l >>> 8 | w14h << 24) ^ (w14l >>> 7 | w14h << 25) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w14h >>> 1 | w14l << 31) ^ (w14h >>> 8 | w14l << 24) ^ w14h >>> 7) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 19 | w11h << 13) ^ (w11l << 3 | w11h >>> 29) ^ (w11l >>> 6 | w11h << 26) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w11h >>> 19 | w11l << 13) ^ (w11h << 3 | w11l >>> 29) ^ w11h >>> 6) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x930aa725 + w13l | 0;
      th = 0xd5a79147 + w13h + (tl >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w14l = w14l + w7l | 0;
      w14h = w14h + w7h + (w14l >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 1 | w15h << 31) ^ (w15l >>> 8 | w15h << 24) ^ (w15l >>> 7 | w15h << 25) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w15h >>> 1 | w15l << 31) ^ (w15h >>> 8 | w15l << 24) ^ w15h >>> 7) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 19 | w12h << 13) ^ (w12l << 3 | w12h >>> 29) ^ (w12l >>> 6 | w12h << 26) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w12h >>> 19 | w12l << 13) ^ (w12h << 3 | w12l >>> 29) ^ w12h >>> 6) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xe003826f + w14l | 0;
      th = 0x6ca6351 + w14h + (tl >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w15l = w15l + w8l | 0;
      w15h = w15h + w8h + (w15l >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 1 | w0h << 31) ^ (w0l >>> 8 | w0h << 24) ^ (w0l >>> 7 | w0h << 25) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w0h >>> 1 | w0l << 31) ^ (w0h >>> 8 | w0l << 24) ^ w0h >>> 7) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 19 | w13h << 13) ^ (w13l << 3 | w13h >>> 29) ^ (w13l >>> 6 | w13h << 26) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w13h >>> 19 | w13l << 13) ^ (w13h << 3 | w13l >>> 29) ^ w13h >>> 6) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xa0e6e70 + w15l | 0;
      th = 0x14292967 + w15h + (tl >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w0l = w0l + w9l | 0;
      w0h = w0h + w9h + (w0l >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 1 | w1h << 31) ^ (w1l >>> 8 | w1h << 24) ^ (w1l >>> 7 | w1h << 25) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w1h >>> 1 | w1l << 31) ^ (w1h >>> 8 | w1l << 24) ^ w1h >>> 7) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 19 | w14h << 13) ^ (w14l << 3 | w14h >>> 29) ^ (w14l >>> 6 | w14h << 26) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w14h >>> 19 | w14l << 13) ^ (w14h << 3 | w14l >>> 29) ^ w14h >>> 6) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x46d22ffc + w0l | 0;
      th = 0x27b70a85 + w0h + (tl >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w1l = w1l + w10l | 0;
      w1h = w1h + w10h + (w1l >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 1 | w2h << 31) ^ (w2l >>> 8 | w2h << 24) ^ (w2l >>> 7 | w2h << 25) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w2h >>> 1 | w2l << 31) ^ (w2h >>> 8 | w2l << 24) ^ w2h >>> 7) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 19 | w15h << 13) ^ (w15l << 3 | w15h >>> 29) ^ (w15l >>> 6 | w15h << 26) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w15h >>> 19 | w15l << 13) ^ (w15h << 3 | w15l >>> 29) ^ w15h >>> 6) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x5c26c926 + w1l | 0;
      th = 0x2e1b2138 + w1h + (tl >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w2l = w2l + w11l | 0;
      w2h = w2h + w11h + (w2l >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 1 | w3h << 31) ^ (w3l >>> 8 | w3h << 24) ^ (w3l >>> 7 | w3h << 25) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w3h >>> 1 | w3l << 31) ^ (w3h >>> 8 | w3l << 24) ^ w3h >>> 7) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 19 | w0h << 13) ^ (w0l << 3 | w0h >>> 29) ^ (w0l >>> 6 | w0h << 26) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w0h >>> 19 | w0l << 13) ^ (w0h << 3 | w0l >>> 29) ^ w0h >>> 6) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x5ac42aed + w2l | 0;
      th = 0x4d2c6dfc + w2h + (tl >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w3l = w3l + w12l | 0;
      w3h = w3h + w12h + (w3l >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 1 | w4h << 31) ^ (w4l >>> 8 | w4h << 24) ^ (w4l >>> 7 | w4h << 25) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w4h >>> 1 | w4l << 31) ^ (w4h >>> 8 | w4l << 24) ^ w4h >>> 7) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 19 | w1h << 13) ^ (w1l << 3 | w1h >>> 29) ^ (w1l >>> 6 | w1h << 26) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w1h >>> 19 | w1l << 13) ^ (w1h << 3 | w1l >>> 29) ^ w1h >>> 6) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x9d95b3df + w3l | 0;
      th = 0x53380d13 + w3h + (tl >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w4l = w4l + w13l | 0;
      w4h = w4h + w13h + (w4l >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 1 | w5h << 31) ^ (w5l >>> 8 | w5h << 24) ^ (w5l >>> 7 | w5h << 25) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w5h >>> 1 | w5l << 31) ^ (w5h >>> 8 | w5l << 24) ^ w5h >>> 7) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 19 | w2h << 13) ^ (w2l << 3 | w2h >>> 29) ^ (w2l >>> 6 | w2h << 26) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w2h >>> 19 | w2l << 13) ^ (w2h << 3 | w2l >>> 29) ^ w2h >>> 6) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x8baf63de + w4l | 0;
      th = 0x650a7354 + w4h + (tl >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w5l = w5l + w14l | 0;
      w5h = w5h + w14h + (w5l >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 1 | w6h << 31) ^ (w6l >>> 8 | w6h << 24) ^ (w6l >>> 7 | w6h << 25) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w6h >>> 1 | w6l << 31) ^ (w6h >>> 8 | w6l << 24) ^ w6h >>> 7) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 19 | w3h << 13) ^ (w3l << 3 | w3h >>> 29) ^ (w3l >>> 6 | w3h << 26) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w3h >>> 19 | w3l << 13) ^ (w3h << 3 | w3l >>> 29) ^ w3h >>> 6) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x3c77b2a8 + w5l | 0;
      th = 0x766a0abb + w5h + (tl >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w6l = w6l + w15l | 0;
      w6h = w6h + w15h + (w6l >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 1 | w7h << 31) ^ (w7l >>> 8 | w7h << 24) ^ (w7l >>> 7 | w7h << 25) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w7h >>> 1 | w7l << 31) ^ (w7h >>> 8 | w7l << 24) ^ w7h >>> 7) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 19 | w4h << 13) ^ (w4l << 3 | w4h >>> 29) ^ (w4l >>> 6 | w4h << 26) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w4h >>> 19 | w4l << 13) ^ (w4h << 3 | w4l >>> 29) ^ w4h >>> 6) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x47edaee6 + w6l | 0;
      th = 0x81c2c92e + w6h + (tl >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w7l = w7l + w0l | 0;
      w7h = w7h + w0h + (w7l >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 1 | w8h << 31) ^ (w8l >>> 8 | w8h << 24) ^ (w8l >>> 7 | w8h << 25) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w8h >>> 1 | w8l << 31) ^ (w8h >>> 8 | w8l << 24) ^ w8h >>> 7) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 19 | w5h << 13) ^ (w5l << 3 | w5h >>> 29) ^ (w5l >>> 6 | w5h << 26) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w5h >>> 19 | w5l << 13) ^ (w5h << 3 | w5l >>> 29) ^ w5h >>> 6) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x1482353b + w7l | 0;
      th = 0x92722c85 + w7h + (tl >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w8l = w8l + w1l | 0;
      w8h = w8h + w1h + (w8l >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 1 | w9h << 31) ^ (w9l >>> 8 | w9h << 24) ^ (w9l >>> 7 | w9h << 25) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w9h >>> 1 | w9l << 31) ^ (w9h >>> 8 | w9l << 24) ^ w9h >>> 7) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 19 | w6h << 13) ^ (w6l << 3 | w6h >>> 29) ^ (w6l >>> 6 | w6h << 26) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w6h >>> 19 | w6l << 13) ^ (w6h << 3 | w6l >>> 29) ^ w6h >>> 6) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x4cf10364 + w8l | 0;
      th = 0xa2bfe8a1 + w8h + (tl >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w9l = w9l + w2l | 0;
      w9h = w9h + w2h + (w9l >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 1 | w10h << 31) ^ (w10l >>> 8 | w10h << 24) ^ (w10l >>> 7 | w10h << 25) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w10h >>> 1 | w10l << 31) ^ (w10h >>> 8 | w10l << 24) ^ w10h >>> 7) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 19 | w7h << 13) ^ (w7l << 3 | w7h >>> 29) ^ (w7l >>> 6 | w7h << 26) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w7h >>> 19 | w7l << 13) ^ (w7h << 3 | w7l >>> 29) ^ w7h >>> 6) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xbc423001 + w9l | 0;
      th = 0xa81a664b + w9h + (tl >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w10l = w10l + w3l | 0;
      w10h = w10h + w3h + (w10l >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 1 | w11h << 31) ^ (w11l >>> 8 | w11h << 24) ^ (w11l >>> 7 | w11h << 25) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w11h >>> 1 | w11l << 31) ^ (w11h >>> 8 | w11l << 24) ^ w11h >>> 7) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 19 | w8h << 13) ^ (w8l << 3 | w8h >>> 29) ^ (w8l >>> 6 | w8h << 26) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w8h >>> 19 | w8l << 13) ^ (w8h << 3 | w8l >>> 29) ^ w8h >>> 6) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xd0f89791 + w10l | 0;
      th = 0xc24b8b70 + w10h + (tl >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w11l = w11l + w4l | 0;
      w11h = w11h + w4h + (w11l >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 1 | w12h << 31) ^ (w12l >>> 8 | w12h << 24) ^ (w12l >>> 7 | w12h << 25) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w12h >>> 1 | w12l << 31) ^ (w12h >>> 8 | w12l << 24) ^ w12h >>> 7) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 19 | w9h << 13) ^ (w9l << 3 | w9h >>> 29) ^ (w9l >>> 6 | w9h << 26) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w9h >>> 19 | w9l << 13) ^ (w9h << 3 | w9l >>> 29) ^ w9h >>> 6) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x654be30 + w11l | 0;
      th = 0xc76c51a3 + w11h + (tl >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w12l = w12l + w5l | 0;
      w12h = w12h + w5h + (w12l >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 1 | w13h << 31) ^ (w13l >>> 8 | w13h << 24) ^ (w13l >>> 7 | w13h << 25) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w13h >>> 1 | w13l << 31) ^ (w13h >>> 8 | w13l << 24) ^ w13h >>> 7) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 19 | w10h << 13) ^ (w10l << 3 | w10h >>> 29) ^ (w10l >>> 6 | w10h << 26) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w10h >>> 19 | w10l << 13) ^ (w10h << 3 | w10l >>> 29) ^ w10h >>> 6) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xd6ef5218 + w12l | 0;
      th = 0xd192e819 + w12h + (tl >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w13l = w13l + w6l | 0;
      w13h = w13h + w6h + (w13l >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 1 | w14h << 31) ^ (w14l >>> 8 | w14h << 24) ^ (w14l >>> 7 | w14h << 25) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w14h >>> 1 | w14l << 31) ^ (w14h >>> 8 | w14l << 24) ^ w14h >>> 7) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 19 | w11h << 13) ^ (w11l << 3 | w11h >>> 29) ^ (w11l >>> 6 | w11h << 26) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w11h >>> 19 | w11l << 13) ^ (w11h << 3 | w11l >>> 29) ^ w11h >>> 6) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x5565a910 + w13l | 0;
      th = 0xd6990624 + w13h + (tl >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w14l = w14l + w7l | 0;
      w14h = w14h + w7h + (w14l >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 1 | w15h << 31) ^ (w15l >>> 8 | w15h << 24) ^ (w15l >>> 7 | w15h << 25) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w15h >>> 1 | w15l << 31) ^ (w15h >>> 8 | w15l << 24) ^ w15h >>> 7) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 19 | w12h << 13) ^ (w12l << 3 | w12h >>> 29) ^ (w12l >>> 6 | w12h << 26) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w12h >>> 19 | w12l << 13) ^ (w12h << 3 | w12l >>> 29) ^ w12h >>> 6) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x5771202a + w14l | 0;
      th = 0xf40e3585 + w14h + (tl >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w15l = w15l + w8l | 0;
      w15h = w15h + w8h + (w15l >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 1 | w0h << 31) ^ (w0l >>> 8 | w0h << 24) ^ (w0l >>> 7 | w0h << 25) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w0h >>> 1 | w0l << 31) ^ (w0h >>> 8 | w0l << 24) ^ w0h >>> 7) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 19 | w13h << 13) ^ (w13l << 3 | w13h >>> 29) ^ (w13l >>> 6 | w13h << 26) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w13h >>> 19 | w13l << 13) ^ (w13h << 3 | w13l >>> 29) ^ w13h >>> 6) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x32bbd1b8 + w15l | 0;
      th = 0x106aa070 + w15h + (tl >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w0l = w0l + w9l | 0;
      w0h = w0h + w9h + (w0l >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 1 | w1h << 31) ^ (w1l >>> 8 | w1h << 24) ^ (w1l >>> 7 | w1h << 25) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w1h >>> 1 | w1l << 31) ^ (w1h >>> 8 | w1l << 24) ^ w1h >>> 7) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 19 | w14h << 13) ^ (w14l << 3 | w14h >>> 29) ^ (w14l >>> 6 | w14h << 26) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w14h >>> 19 | w14l << 13) ^ (w14h << 3 | w14l >>> 29) ^ w14h >>> 6) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xb8d2d0c8 + w0l | 0;
      th = 0x19a4c116 + w0h + (tl >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w1l = w1l + w10l | 0;
      w1h = w1h + w10h + (w1l >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 1 | w2h << 31) ^ (w2l >>> 8 | w2h << 24) ^ (w2l >>> 7 | w2h << 25) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w2h >>> 1 | w2l << 31) ^ (w2h >>> 8 | w2l << 24) ^ w2h >>> 7) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 19 | w15h << 13) ^ (w15l << 3 | w15h >>> 29) ^ (w15l >>> 6 | w15h << 26) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w15h >>> 19 | w15l << 13) ^ (w15h << 3 | w15l >>> 29) ^ w15h >>> 6) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x5141ab53 + w1l | 0;
      th = 0x1e376c08 + w1h + (tl >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w2l = w2l + w11l | 0;
      w2h = w2h + w11h + (w2l >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 1 | w3h << 31) ^ (w3l >>> 8 | w3h << 24) ^ (w3l >>> 7 | w3h << 25) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w3h >>> 1 | w3l << 31) ^ (w3h >>> 8 | w3l << 24) ^ w3h >>> 7) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 19 | w0h << 13) ^ (w0l << 3 | w0h >>> 29) ^ (w0l >>> 6 | w0h << 26) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w0h >>> 19 | w0l << 13) ^ (w0h << 3 | w0l >>> 29) ^ w0h >>> 6) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xdf8eeb99 + w2l | 0;
      th = 0x2748774c + w2h + (tl >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w3l = w3l + w12l | 0;
      w3h = w3h + w12h + (w3l >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 1 | w4h << 31) ^ (w4l >>> 8 | w4h << 24) ^ (w4l >>> 7 | w4h << 25) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w4h >>> 1 | w4l << 31) ^ (w4h >>> 8 | w4l << 24) ^ w4h >>> 7) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 19 | w1h << 13) ^ (w1l << 3 | w1h >>> 29) ^ (w1l >>> 6 | w1h << 26) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w1h >>> 19 | w1l << 13) ^ (w1h << 3 | w1l >>> 29) ^ w1h >>> 6) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xe19b48a8 + w3l | 0;
      th = 0x34b0bcb5 + w3h + (tl >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w4l = w4l + w13l | 0;
      w4h = w4h + w13h + (w4l >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 1 | w5h << 31) ^ (w5l >>> 8 | w5h << 24) ^ (w5l >>> 7 | w5h << 25) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w5h >>> 1 | w5l << 31) ^ (w5h >>> 8 | w5l << 24) ^ w5h >>> 7) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 19 | w2h << 13) ^ (w2l << 3 | w2h >>> 29) ^ (w2l >>> 6 | w2h << 26) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w2h >>> 19 | w2l << 13) ^ (w2h << 3 | w2l >>> 29) ^ w2h >>> 6) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xc5c95a63 + w4l | 0;
      th = 0x391c0cb3 + w4h + (tl >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w5l = w5l + w14l | 0;
      w5h = w5h + w14h + (w5l >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 1 | w6h << 31) ^ (w6l >>> 8 | w6h << 24) ^ (w6l >>> 7 | w6h << 25) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w6h >>> 1 | w6l << 31) ^ (w6h >>> 8 | w6l << 24) ^ w6h >>> 7) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 19 | w3h << 13) ^ (w3l << 3 | w3h >>> 29) ^ (w3l >>> 6 | w3h << 26) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w3h >>> 19 | w3l << 13) ^ (w3h << 3 | w3l >>> 29) ^ w3h >>> 6) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xe3418acb + w5l | 0;
      th = 0x4ed8aa4a + w5h + (tl >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w6l = w6l + w15l | 0;
      w6h = w6h + w15h + (w6l >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 1 | w7h << 31) ^ (w7l >>> 8 | w7h << 24) ^ (w7l >>> 7 | w7h << 25) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w7h >>> 1 | w7l << 31) ^ (w7h >>> 8 | w7l << 24) ^ w7h >>> 7) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 19 | w4h << 13) ^ (w4l << 3 | w4h >>> 29) ^ (w4l >>> 6 | w4h << 26) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w4h >>> 19 | w4l << 13) ^ (w4h << 3 | w4l >>> 29) ^ w4h >>> 6) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x7763e373 + w6l | 0;
      th = 0x5b9cca4f + w6h + (tl >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w7l = w7l + w0l | 0;
      w7h = w7h + w0h + (w7l >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 1 | w8h << 31) ^ (w8l >>> 8 | w8h << 24) ^ (w8l >>> 7 | w8h << 25) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w8h >>> 1 | w8l << 31) ^ (w8h >>> 8 | w8l << 24) ^ w8h >>> 7) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 19 | w5h << 13) ^ (w5l << 3 | w5h >>> 29) ^ (w5l >>> 6 | w5h << 26) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w5h >>> 19 | w5l << 13) ^ (w5h << 3 | w5l >>> 29) ^ w5h >>> 6) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xd6b2b8a3 + w7l | 0;
      th = 0x682e6ff3 + w7h + (tl >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w8l = w8l + w1l | 0;
      w8h = w8h + w1h + (w8l >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 1 | w9h << 31) ^ (w9l >>> 8 | w9h << 24) ^ (w9l >>> 7 | w9h << 25) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w9h >>> 1 | w9l << 31) ^ (w9h >>> 8 | w9l << 24) ^ w9h >>> 7) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 19 | w6h << 13) ^ (w6l << 3 | w6h >>> 29) ^ (w6l >>> 6 | w6h << 26) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w6h >>> 19 | w6l << 13) ^ (w6h << 3 | w6l >>> 29) ^ w6h >>> 6) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x5defb2fc + w8l | 0;
      th = 0x748f82ee + w8h + (tl >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w9l = w9l + w2l | 0;
      w9h = w9h + w2h + (w9l >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 1 | w10h << 31) ^ (w10l >>> 8 | w10h << 24) ^ (w10l >>> 7 | w10h << 25) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w10h >>> 1 | w10l << 31) ^ (w10h >>> 8 | w10l << 24) ^ w10h >>> 7) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 19 | w7h << 13) ^ (w7l << 3 | w7h >>> 29) ^ (w7l >>> 6 | w7h << 26) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w7h >>> 19 | w7l << 13) ^ (w7h << 3 | w7l >>> 29) ^ w7h >>> 6) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x43172f60 + w9l | 0;
      th = 0x78a5636f + w9h + (tl >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w10l = w10l + w3l | 0;
      w10h = w10h + w3h + (w10l >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 1 | w11h << 31) ^ (w11l >>> 8 | w11h << 24) ^ (w11l >>> 7 | w11h << 25) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w11h >>> 1 | w11l << 31) ^ (w11h >>> 8 | w11l << 24) ^ w11h >>> 7) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 19 | w8h << 13) ^ (w8l << 3 | w8h >>> 29) ^ (w8l >>> 6 | w8h << 26) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w8h >>> 19 | w8l << 13) ^ (w8h << 3 | w8l >>> 29) ^ w8h >>> 6) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xa1f0ab72 + w10l | 0;
      th = 0x84c87814 + w10h + (tl >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w11l = w11l + w4l | 0;
      w11h = w11h + w4h + (w11l >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 1 | w12h << 31) ^ (w12l >>> 8 | w12h << 24) ^ (w12l >>> 7 | w12h << 25) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w12h >>> 1 | w12l << 31) ^ (w12h >>> 8 | w12l << 24) ^ w12h >>> 7) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 19 | w9h << 13) ^ (w9l << 3 | w9h >>> 29) ^ (w9l >>> 6 | w9h << 26) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w9h >>> 19 | w9l << 13) ^ (w9h << 3 | w9l >>> 29) ^ w9h >>> 6) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x1a6439ec + w11l | 0;
      th = 0x8cc70208 + w11h + (tl >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w12l = w12l + w5l | 0;
      w12h = w12h + w5h + (w12l >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 1 | w13h << 31) ^ (w13l >>> 8 | w13h << 24) ^ (w13l >>> 7 | w13h << 25) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w13h >>> 1 | w13l << 31) ^ (w13h >>> 8 | w13l << 24) ^ w13h >>> 7) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 19 | w10h << 13) ^ (w10l << 3 | w10h >>> 29) ^ (w10l >>> 6 | w10h << 26) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w10h >>> 19 | w10l << 13) ^ (w10h << 3 | w10l >>> 29) ^ w10h >>> 6) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x23631e28 + w12l | 0;
      th = 0x90befffa + w12h + (tl >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w13l = w13l + w6l | 0;
      w13h = w13h + w6h + (w13l >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 1 | w14h << 31) ^ (w14l >>> 8 | w14h << 24) ^ (w14l >>> 7 | w14h << 25) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w14h >>> 1 | w14l << 31) ^ (w14h >>> 8 | w14l << 24) ^ w14h >>> 7) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 19 | w11h << 13) ^ (w11l << 3 | w11h >>> 29) ^ (w11l >>> 6 | w11h << 26) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w11h >>> 19 | w11l << 13) ^ (w11h << 3 | w11l >>> 29) ^ w11h >>> 6) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xde82bde9 + w13l | 0;
      th = 0xa4506ceb + w13h + (tl >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w14l = w14l + w7l | 0;
      w14h = w14h + w7h + (w14l >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 1 | w15h << 31) ^ (w15l >>> 8 | w15h << 24) ^ (w15l >>> 7 | w15h << 25) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w15h >>> 1 | w15l << 31) ^ (w15h >>> 8 | w15l << 24) ^ w15h >>> 7) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 19 | w12h << 13) ^ (w12l << 3 | w12h >>> 29) ^ (w12l >>> 6 | w12h << 26) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w12h >>> 19 | w12l << 13) ^ (w12h << 3 | w12l >>> 29) ^ w12h >>> 6) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xb2c67915 + w14l | 0;
      th = 0xbef9a3f7 + w14h + (tl >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w15l = w15l + w8l | 0;
      w15h = w15h + w8h + (w15l >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 1 | w0h << 31) ^ (w0l >>> 8 | w0h << 24) ^ (w0l >>> 7 | w0h << 25) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w0h >>> 1 | w0l << 31) ^ (w0h >>> 8 | w0l << 24) ^ w0h >>> 7) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 19 | w13h << 13) ^ (w13l << 3 | w13h >>> 29) ^ (w13l >>> 6 | w13h << 26) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w13h >>> 19 | w13l << 13) ^ (w13h << 3 | w13l >>> 29) ^ w13h >>> 6) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xe372532b + w15l | 0;
      th = 0xc67178f2 + w15h + (tl >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w0l = w0l + w9l | 0;
      w0h = w0h + w9h + (w0l >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 1 | w1h << 31) ^ (w1l >>> 8 | w1h << 24) ^ (w1l >>> 7 | w1h << 25) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w1h >>> 1 | w1l << 31) ^ (w1h >>> 8 | w1l << 24) ^ w1h >>> 7) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 19 | w14h << 13) ^ (w14l << 3 | w14h >>> 29) ^ (w14l >>> 6 | w14h << 26) | 0;
      w0l = w0l + xl | 0;
      w0h = w0h + ((w14h >>> 19 | w14l << 13) ^ (w14h << 3 | w14l >>> 29) ^ w14h >>> 6) + (w0l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xea26619c + w0l | 0;
      th = 0xca273ece + w0h + (tl >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w1l = w1l + w10l | 0;
      w1h = w1h + w10h + (w1l >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 1 | w2h << 31) ^ (w2l >>> 8 | w2h << 24) ^ (w2l >>> 7 | w2h << 25) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w2h >>> 1 | w2l << 31) ^ (w2h >>> 8 | w2l << 24) ^ w2h >>> 7) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 19 | w15h << 13) ^ (w15l << 3 | w15h >>> 29) ^ (w15l >>> 6 | w15h << 26) | 0;
      w1l = w1l + xl | 0;
      w1h = w1h + ((w15h >>> 19 | w15l << 13) ^ (w15h << 3 | w15l >>> 29) ^ w15h >>> 6) + (w1l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x21c0c207 + w1l | 0;
      th = 0xd186b8c7 + w1h + (tl >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w2l = w2l + w11l | 0;
      w2h = w2h + w11h + (w2l >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 1 | w3h << 31) ^ (w3l >>> 8 | w3h << 24) ^ (w3l >>> 7 | w3h << 25) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w3h >>> 1 | w3l << 31) ^ (w3h >>> 8 | w3l << 24) ^ w3h >>> 7) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 19 | w0h << 13) ^ (w0l << 3 | w0h >>> 29) ^ (w0l >>> 6 | w0h << 26) | 0;
      w2l = w2l + xl | 0;
      w2h = w2h + ((w0h >>> 19 | w0l << 13) ^ (w0h << 3 | w0l >>> 29) ^ w0h >>> 6) + (w2l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xcde0eb1e + w2l | 0;
      th = 0xeada7dd6 + w2h + (tl >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w3l = w3l + w12l | 0;
      w3h = w3h + w12h + (w3l >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 1 | w4h << 31) ^ (w4l >>> 8 | w4h << 24) ^ (w4l >>> 7 | w4h << 25) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w4h >>> 1 | w4l << 31) ^ (w4h >>> 8 | w4l << 24) ^ w4h >>> 7) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w1l >>> 19 | w1h << 13) ^ (w1l << 3 | w1h >>> 29) ^ (w1l >>> 6 | w1h << 26) | 0;
      w3l = w3l + xl | 0;
      w3h = w3h + ((w1h >>> 19 | w1l << 13) ^ (w1h << 3 | w1l >>> 29) ^ w1h >>> 6) + (w3l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xee6ed178 + w3l | 0;
      th = 0xf57d4f7f + w3h + (tl >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w4l = w4l + w13l | 0;
      w4h = w4h + w13h + (w4l >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 1 | w5h << 31) ^ (w5l >>> 8 | w5h << 24) ^ (w5l >>> 7 | w5h << 25) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w5h >>> 1 | w5l << 31) ^ (w5h >>> 8 | w5l << 24) ^ w5h >>> 7) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w2l >>> 19 | w2h << 13) ^ (w2l << 3 | w2h >>> 29) ^ (w2l >>> 6 | w2h << 26) | 0;
      w4l = w4l + xl | 0;
      w4h = w4h + ((w2h >>> 19 | w2l << 13) ^ (w2h << 3 | w2l >>> 29) ^ w2h >>> 6) + (w4l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x72176fba + w4l | 0;
      th = 0x6f067aa + w4h + (tl >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w5l = w5l + w14l | 0;
      w5h = w5h + w14h + (w5l >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 1 | w6h << 31) ^ (w6l >>> 8 | w6h << 24) ^ (w6l >>> 7 | w6h << 25) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w6h >>> 1 | w6l << 31) ^ (w6h >>> 8 | w6l << 24) ^ w6h >>> 7) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w3l >>> 19 | w3h << 13) ^ (w3l << 3 | w3h >>> 29) ^ (w3l >>> 6 | w3h << 26) | 0;
      w5l = w5l + xl | 0;
      w5h = w5h + ((w3h >>> 19 | w3l << 13) ^ (w3h << 3 | w3l >>> 29) ^ w3h >>> 6) + (w5l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xa2c898a6 + w5l | 0;
      th = 0xa637dc5 + w5h + (tl >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w6l = w6l + w15l | 0;
      w6h = w6h + w15h + (w6l >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 1 | w7h << 31) ^ (w7l >>> 8 | w7h << 24) ^ (w7l >>> 7 | w7h << 25) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w7h >>> 1 | w7l << 31) ^ (w7h >>> 8 | w7l << 24) ^ w7h >>> 7) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w4l >>> 19 | w4h << 13) ^ (w4l << 3 | w4h >>> 29) ^ (w4l >>> 6 | w4h << 26) | 0;
      w6l = w6l + xl | 0;
      w6h = w6h + ((w4h >>> 19 | w4l << 13) ^ (w4h << 3 | w4l >>> 29) ^ w4h >>> 6) + (w6l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xbef90dae + w6l | 0;
      th = 0x113f9804 + w6h + (tl >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w7l = w7l + w0l | 0;
      w7h = w7h + w0h + (w7l >>> 0 < w0l >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 1 | w8h << 31) ^ (w8l >>> 8 | w8h << 24) ^ (w8l >>> 7 | w8h << 25) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w8h >>> 1 | w8l << 31) ^ (w8h >>> 8 | w8l << 24) ^ w8h >>> 7) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w5l >>> 19 | w5h << 13) ^ (w5l << 3 | w5h >>> 29) ^ (w5l >>> 6 | w5h << 26) | 0;
      w7l = w7l + xl | 0;
      w7h = w7h + ((w5h >>> 19 | w5l << 13) ^ (w5h << 3 | w5l >>> 29) ^ w5h >>> 6) + (w7l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x131c471b + w7l | 0;
      th = 0x1b710b35 + w7h + (tl >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w8l = w8l + w1l | 0;
      w8h = w8h + w1h + (w8l >>> 0 < w1l >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 1 | w9h << 31) ^ (w9l >>> 8 | w9h << 24) ^ (w9l >>> 7 | w9h << 25) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w9h >>> 1 | w9l << 31) ^ (w9h >>> 8 | w9l << 24) ^ w9h >>> 7) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w6l >>> 19 | w6h << 13) ^ (w6l << 3 | w6h >>> 29) ^ (w6l >>> 6 | w6h << 26) | 0;
      w8l = w8l + xl | 0;
      w8h = w8h + ((w6h >>> 19 | w6l << 13) ^ (w6h << 3 | w6l >>> 29) ^ w6h >>> 6) + (w8l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x23047d84 + w8l | 0;
      th = 0x28db77f5 + w8h + (tl >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w9l = w9l + w2l | 0;
      w9h = w9h + w2h + (w9l >>> 0 < w2l >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 1 | w10h << 31) ^ (w10l >>> 8 | w10h << 24) ^ (w10l >>> 7 | w10h << 25) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w10h >>> 1 | w10l << 31) ^ (w10h >>> 8 | w10l << 24) ^ w10h >>> 7) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w7l >>> 19 | w7h << 13) ^ (w7l << 3 | w7h >>> 29) ^ (w7l >>> 6 | w7h << 26) | 0;
      w9l = w9l + xl | 0;
      w9h = w9h + ((w7h >>> 19 | w7l << 13) ^ (w7h << 3 | w7l >>> 29) ^ w7h >>> 6) + (w9l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x40c72493 + w9l | 0;
      th = 0x32caab7b + w9h + (tl >>> 0 < w9l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w10l = w10l + w3l | 0;
      w10h = w10h + w3h + (w10l >>> 0 < w3l >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 1 | w11h << 31) ^ (w11l >>> 8 | w11h << 24) ^ (w11l >>> 7 | w11h << 25) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w11h >>> 1 | w11l << 31) ^ (w11h >>> 8 | w11l << 24) ^ w11h >>> 7) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w8l >>> 19 | w8h << 13) ^ (w8l << 3 | w8h >>> 29) ^ (w8l >>> 6 | w8h << 26) | 0;
      w10l = w10l + xl | 0;
      w10h = w10h + ((w8h >>> 19 | w8l << 13) ^ (w8h << 3 | w8l >>> 29) ^ w8h >>> 6) + (w10l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x15c9bebc + w10l | 0;
      th = 0x3c9ebe0a + w10h + (tl >>> 0 < w10l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w11l = w11l + w4l | 0;
      w11h = w11h + w4h + (w11l >>> 0 < w4l >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 1 | w12h << 31) ^ (w12l >>> 8 | w12h << 24) ^ (w12l >>> 7 | w12h << 25) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w12h >>> 1 | w12l << 31) ^ (w12h >>> 8 | w12l << 24) ^ w12h >>> 7) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w9l >>> 19 | w9h << 13) ^ (w9l << 3 | w9h >>> 29) ^ (w9l >>> 6 | w9h << 26) | 0;
      w11l = w11l + xl | 0;
      w11h = w11h + ((w9h >>> 19 | w9l << 13) ^ (w9h << 3 | w9l >>> 29) ^ w9h >>> 6) + (w11l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x9c100d4c + w11l | 0;
      th = 0x431d67c4 + w11h + (tl >>> 0 < w11l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w12l = w12l + w5l | 0;
      w12h = w12h + w5h + (w12l >>> 0 < w5l >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 1 | w13h << 31) ^ (w13l >>> 8 | w13h << 24) ^ (w13l >>> 7 | w13h << 25) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w13h >>> 1 | w13l << 31) ^ (w13h >>> 8 | w13l << 24) ^ w13h >>> 7) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w10l >>> 19 | w10h << 13) ^ (w10l << 3 | w10h >>> 29) ^ (w10l >>> 6 | w10h << 26) | 0;
      w12l = w12l + xl | 0;
      w12h = w12h + ((w10h >>> 19 | w10l << 13) ^ (w10h << 3 | w10l >>> 29) ^ w10h >>> 6) + (w12l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xcb3e42b6 + w12l | 0;
      th = 0x4cc5d4be + w12h + (tl >>> 0 < w12l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w13l = w13l + w6l | 0;
      w13h = w13h + w6h + (w13l >>> 0 < w6l >>> 0 ? 1 : 0) | 0;
      xl = (w14l >>> 1 | w14h << 31) ^ (w14l >>> 8 | w14h << 24) ^ (w14l >>> 7 | w14h << 25) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w14h >>> 1 | w14l << 31) ^ (w14h >>> 8 | w14l << 24) ^ w14h >>> 7) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w11l >>> 19 | w11h << 13) ^ (w11l << 3 | w11h >>> 29) ^ (w11l >>> 6 | w11h << 26) | 0;
      w13l = w13l + xl | 0;
      w13h = w13h + ((w11h >>> 19 | w11l << 13) ^ (w11h << 3 | w11l >>> 29) ^ w11h >>> 6) + (w13l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0xfc657e2a + w13l | 0;
      th = 0x597f299c + w13h + (tl >>> 0 < w13l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w14l = w14l + w7l | 0;
      w14h = w14h + w7h + (w14l >>> 0 < w7l >>> 0 ? 1 : 0) | 0;
      xl = (w15l >>> 1 | w15h << 31) ^ (w15l >>> 8 | w15h << 24) ^ (w15l >>> 7 | w15h << 25) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w15h >>> 1 | w15l << 31) ^ (w15h >>> 8 | w15l << 24) ^ w15h >>> 7) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w12l >>> 19 | w12h << 13) ^ (w12l << 3 | w12h >>> 29) ^ (w12l >>> 6 | w12h << 26) | 0;
      w14l = w14l + xl | 0;
      w14h = w14h + ((w12h >>> 19 | w12l << 13) ^ (w12h << 3 | w12l >>> 29) ^ w12h >>> 6) + (w14l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x3ad6faec + w14l | 0;
      th = 0x5fcb6fab + w14h + (tl >>> 0 < w14l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      w15l = w15l + w8l | 0;
      w15h = w15h + w8h + (w15l >>> 0 < w8l >>> 0 ? 1 : 0) | 0;
      xl = (w0l >>> 1 | w0h << 31) ^ (w0l >>> 8 | w0h << 24) ^ (w0l >>> 7 | w0h << 25) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w0h >>> 1 | w0l << 31) ^ (w0h >>> 8 | w0l << 24) ^ w0h >>> 7) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = (w13l >>> 19 | w13h << 13) ^ (w13l << 3 | w13h >>> 29) ^ (w13l >>> 6 | w13h << 26) | 0;
      w15l = w15l + xl | 0;
      w15h = w15h + ((w13h >>> 19 | w13l << 13) ^ (w13h << 3 | w13l >>> 29) ^ w13h >>> 6) + (w15l >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      tl = 0x4a475817 + w15l | 0;
      th = 0x6c44198c + w15h + (tl >>> 0 < w15l >>> 0 ? 1 : 0) | 0;
      tl = tl + hl | 0;
      th = th + hh + (tl >>> 0 < hl >>> 0 ? 1 : 0) | 0;
      xl = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9) | 0;
      tl = tl + xl | 0;
      th = th + ((eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      xl = gl ^ el & (fl ^ gl) | 0;
      tl = tl + xl | 0;
      th = th + (gh ^ eh & (fh ^ gh)) + (tl >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      hl = gl;
      hh = gh;
      gl = fl;
      gh = fh;
      fl = el;
      fh = eh;
      el = dl + tl | 0;
      eh = dh + th + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      dl = cl;
      dh = ch;
      cl = bl;
      ch = bh;
      bl = al;
      bh = ah;
      al = tl + (bl & cl ^ dl & (bl ^ cl)) | 0;
      ah = th + (bh & ch ^ dh & (bh ^ ch)) + (al >>> 0 < tl >>> 0 ? 1 : 0) | 0;
      xl = (bl >>> 28 | bh << 4) ^ (bl << 30 | bh >>> 2) ^ (bl << 25 | bh >>> 7) | 0;
      al = al + xl | 0;
      ah = ah + ((bh >>> 28 | bl << 4) ^ (bh << 30 | bl >>> 2) ^ (bh << 25 | bl >>> 7)) + (al >>> 0 < xl >>> 0 ? 1 : 0) | 0;
      H0l = H0l + al | 0;
      H0h = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0) | 0;
      H1l = H1l + bl | 0;
      H1h = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0) | 0;
      H2l = H2l + cl | 0;
      H2h = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0) | 0;
      H3l = H3l + dl | 0;
      H3h = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0) | 0;
      H4l = H4l + el | 0;
      H4h = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0) | 0;
      H5l = H5l + fl | 0;
      H5h = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0) | 0;
      H6l = H6l + gl | 0;
      H6h = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0) | 0;
      H7l = H7l + hl | 0;
      H7h = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0) | 0;
    }
    function _core_heap(offset) {
      offset = offset | 0;
      _core(HEAP[offset | 0] << 24 | HEAP[offset | 1] << 16 | HEAP[offset | 2] << 8 | HEAP[offset | 3], HEAP[offset | 4] << 24 | HEAP[offset | 5] << 16 | HEAP[offset | 6] << 8 | HEAP[offset | 7], HEAP[offset | 8] << 24 | HEAP[offset | 9] << 16 | HEAP[offset | 10] << 8 | HEAP[offset | 11], HEAP[offset | 12] << 24 | HEAP[offset | 13] << 16 | HEAP[offset | 14] << 8 | HEAP[offset | 15], HEAP[offset | 16] << 24 | HEAP[offset | 17] << 16 | HEAP[offset | 18] << 8 | HEAP[offset | 19], HEAP[offset | 20] << 24 | HEAP[offset | 21] << 16 | HEAP[offset | 22] << 8 | HEAP[offset | 23], HEAP[offset | 24] << 24 | HEAP[offset | 25] << 16 | HEAP[offset | 26] << 8 | HEAP[offset | 27], HEAP[offset | 28] << 24 | HEAP[offset | 29] << 16 | HEAP[offset | 30] << 8 | HEAP[offset | 31], HEAP[offset | 32] << 24 | HEAP[offset | 33] << 16 | HEAP[offset | 34] << 8 | HEAP[offset | 35], HEAP[offset | 36] << 24 | HEAP[offset | 37] << 16 | HEAP[offset | 38] << 8 | HEAP[offset | 39], HEAP[offset | 40] << 24 | HEAP[offset | 41] << 16 | HEAP[offset | 42] << 8 | HEAP[offset | 43], HEAP[offset | 44] << 24 | HEAP[offset | 45] << 16 | HEAP[offset | 46] << 8 | HEAP[offset | 47], HEAP[offset | 48] << 24 | HEAP[offset | 49] << 16 | HEAP[offset | 50] << 8 | HEAP[offset | 51], HEAP[offset | 52] << 24 | HEAP[offset | 53] << 16 | HEAP[offset | 54] << 8 | HEAP[offset | 55], HEAP[offset | 56] << 24 | HEAP[offset | 57] << 16 | HEAP[offset | 58] << 8 | HEAP[offset | 59], HEAP[offset | 60] << 24 | HEAP[offset | 61] << 16 | HEAP[offset | 62] << 8 | HEAP[offset | 63], HEAP[offset | 64] << 24 | HEAP[offset | 65] << 16 | HEAP[offset | 66] << 8 | HEAP[offset | 67], HEAP[offset | 68] << 24 | HEAP[offset | 69] << 16 | HEAP[offset | 70] << 8 | HEAP[offset | 71], HEAP[offset | 72] << 24 | HEAP[offset | 73] << 16 | HEAP[offset | 74] << 8 | HEAP[offset | 75], HEAP[offset | 76] << 24 | HEAP[offset | 77] << 16 | HEAP[offset | 78] << 8 | HEAP[offset | 79], HEAP[offset | 80] << 24 | HEAP[offset | 81] << 16 | HEAP[offset | 82] << 8 | HEAP[offset | 83], HEAP[offset | 84] << 24 | HEAP[offset | 85] << 16 | HEAP[offset | 86] << 8 | HEAP[offset | 87], HEAP[offset | 88] << 24 | HEAP[offset | 89] << 16 | HEAP[offset | 90] << 8 | HEAP[offset | 91], HEAP[offset | 92] << 24 | HEAP[offset | 93] << 16 | HEAP[offset | 94] << 8 | HEAP[offset | 95], HEAP[offset | 96] << 24 | HEAP[offset | 97] << 16 | HEAP[offset | 98] << 8 | HEAP[offset | 99], HEAP[offset | 100] << 24 | HEAP[offset | 101] << 16 | HEAP[offset | 102] << 8 | HEAP[offset | 103], HEAP[offset | 104] << 24 | HEAP[offset | 105] << 16 | HEAP[offset | 106] << 8 | HEAP[offset | 107], HEAP[offset | 108] << 24 | HEAP[offset | 109] << 16 | HEAP[offset | 110] << 8 | HEAP[offset | 111], HEAP[offset | 112] << 24 | HEAP[offset | 113] << 16 | HEAP[offset | 114] << 8 | HEAP[offset | 115], HEAP[offset | 116] << 24 | HEAP[offset | 117] << 16 | HEAP[offset | 118] << 8 | HEAP[offset | 119], HEAP[offset | 120] << 24 | HEAP[offset | 121] << 16 | HEAP[offset | 122] << 8 | HEAP[offset | 123], HEAP[offset | 124] << 24 | HEAP[offset | 125] << 16 | HEAP[offset | 126] << 8 | HEAP[offset | 127]);
    }
    function _state_to_heap(output) {
      output = output | 0;
      HEAP[output | 0] = H0h >>> 24;
      HEAP[output | 1] = H0h >>> 16 & 255;
      HEAP[output | 2] = H0h >>> 8 & 255;
      HEAP[output | 3] = H0h & 255;
      HEAP[output | 4] = H0l >>> 24;
      HEAP[output | 5] = H0l >>> 16 & 255;
      HEAP[output | 6] = H0l >>> 8 & 255;
      HEAP[output | 7] = H0l & 255;
      HEAP[output | 8] = H1h >>> 24;
      HEAP[output | 9] = H1h >>> 16 & 255;
      HEAP[output | 10] = H1h >>> 8 & 255;
      HEAP[output | 11] = H1h & 255;
      HEAP[output | 12] = H1l >>> 24;
      HEAP[output | 13] = H1l >>> 16 & 255;
      HEAP[output | 14] = H1l >>> 8 & 255;
      HEAP[output | 15] = H1l & 255;
      HEAP[output | 16] = H2h >>> 24;
      HEAP[output | 17] = H2h >>> 16 & 255;
      HEAP[output | 18] = H2h >>> 8 & 255;
      HEAP[output | 19] = H2h & 255;
      HEAP[output | 20] = H2l >>> 24;
      HEAP[output | 21] = H2l >>> 16 & 255;
      HEAP[output | 22] = H2l >>> 8 & 255;
      HEAP[output | 23] = H2l & 255;
      HEAP[output | 24] = H3h >>> 24;
      HEAP[output | 25] = H3h >>> 16 & 255;
      HEAP[output | 26] = H3h >>> 8 & 255;
      HEAP[output | 27] = H3h & 255;
      HEAP[output | 28] = H3l >>> 24;
      HEAP[output | 29] = H3l >>> 16 & 255;
      HEAP[output | 30] = H3l >>> 8 & 255;
      HEAP[output | 31] = H3l & 255;
      HEAP[output | 32] = H4h >>> 24;
      HEAP[output | 33] = H4h >>> 16 & 255;
      HEAP[output | 34] = H4h >>> 8 & 255;
      HEAP[output | 35] = H4h & 255;
      HEAP[output | 36] = H4l >>> 24;
      HEAP[output | 37] = H4l >>> 16 & 255;
      HEAP[output | 38] = H4l >>> 8 & 255;
      HEAP[output | 39] = H4l & 255;
      HEAP[output | 40] = H5h >>> 24;
      HEAP[output | 41] = H5h >>> 16 & 255;
      HEAP[output | 42] = H5h >>> 8 & 255;
      HEAP[output | 43] = H5h & 255;
      HEAP[output | 44] = H5l >>> 24;
      HEAP[output | 45] = H5l >>> 16 & 255;
      HEAP[output | 46] = H5l >>> 8 & 255;
      HEAP[output | 47] = H5l & 255;
      HEAP[output | 48] = H6h >>> 24;
      HEAP[output | 49] = H6h >>> 16 & 255;
      HEAP[output | 50] = H6h >>> 8 & 255;
      HEAP[output | 51] = H6h & 255;
      HEAP[output | 52] = H6l >>> 24;
      HEAP[output | 53] = H6l >>> 16 & 255;
      HEAP[output | 54] = H6l >>> 8 & 255;
      HEAP[output | 55] = H6l & 255;
      HEAP[output | 56] = H7h >>> 24;
      HEAP[output | 57] = H7h >>> 16 & 255;
      HEAP[output | 58] = H7h >>> 8 & 255;
      HEAP[output | 59] = H7h & 255;
      HEAP[output | 60] = H7l >>> 24;
      HEAP[output | 61] = H7l >>> 16 & 255;
      HEAP[output | 62] = H7l >>> 8 & 255;
      HEAP[output | 63] = H7l & 255;
    }
    function reset() {
      H0h = 0x6a09e667;
      H0l = 0xf3bcc908;
      H1h = 0xbb67ae85;
      H1l = 0x84caa73b;
      H2h = 0x3c6ef372;
      H2l = 0xfe94f82b;
      H3h = 0xa54ff53a;
      H3l = 0x5f1d36f1;
      H4h = 0x510e527f;
      H4l = 0xade682d1;
      H5h = 0x9b05688c;
      H5l = 0x2b3e6c1f;
      H6h = 0x1f83d9ab;
      H6l = 0xfb41bd6b;
      H7h = 0x5be0cd19;
      H7l = 0x137e2179;
      TOTAL0 = TOTAL1 = 0;
    }
    function init(h0h, h0l, h1h, h1l, h2h, h2l, h3h, h3l, h4h, h4l, h5h, h5l, h6h, h6l, h7h, h7l, total0, total1) {
      h0h = h0h | 0;
      h0l = h0l | 0;
      h1h = h1h | 0;
      h1l = h1l | 0;
      h2h = h2h | 0;
      h2l = h2l | 0;
      h3h = h3h | 0;
      h3l = h3l | 0;
      h4h = h4h | 0;
      h4l = h4l | 0;
      h5h = h5h | 0;
      h5l = h5l | 0;
      h6h = h6h | 0;
      h6l = h6l | 0;
      h7h = h7h | 0;
      h7l = h7l | 0;
      total0 = total0 | 0;
      total1 = total1 | 0;
      H0h = h0h;
      H0l = h0l;
      H1h = h1h;
      H1l = h1l;
      H2h = h2h;
      H2l = h2l;
      H3h = h3h;
      H3l = h3l;
      H4h = h4h;
      H4l = h4l;
      H5h = h5h;
      H5l = h5l;
      H6h = h6h;
      H6l = h6l;
      H7h = h7h;
      H7l = h7l;
      TOTAL0 = total0;
      TOTAL1 = total1;
    }
    function process(offset, length) {
      offset = offset | 0;
      length = length | 0;
      var hashed = 0;
      if (offset & 127) return -1;
      while ((length | 0) >= 128) {
        _core_heap(offset);
        offset = offset + 128 | 0;
        length = length - 128 | 0;
        hashed = hashed + 128 | 0;
      }
      TOTAL0 = TOTAL0 + hashed | 0;
      if (TOTAL0 >>> 0 < hashed >>> 0) TOTAL1 = TOTAL1 + 1 | 0;
      return hashed | 0;
    }
    function finish(offset, length, output) {
      offset = offset | 0;
      length = length | 0;
      output = output | 0;
      var hashed = 0,
        i = 0;
      if (offset & 127) return -1;
      if (~output) if (output & 63) return -1;
      if ((length | 0) >= 128) {
        hashed = process(offset, length) | 0;
        if ((hashed | 0) == -1) return -1;
        offset = offset + hashed | 0;
        length = length - hashed | 0;
      }
      hashed = hashed + length | 0;
      TOTAL0 = TOTAL0 + length | 0;
      if (TOTAL0 >>> 0 < length >>> 0) TOTAL1 = TOTAL1 + 1 | 0;
      HEAP[offset | length] = 0x80;
      if ((length | 0) >= 112) {
        for (i = length + 1 | 0; (i | 0) < 128; i = i + 1 | 0) HEAP[offset | i] = 0x00;
        _core_heap(offset);
        length = 0;
        HEAP[offset | 0] = 0;
      }
      for (i = length + 1 | 0; (i | 0) < 123; i = i + 1 | 0) HEAP[offset | i] = 0;
      HEAP[offset | 120] = TOTAL1 >>> 21 & 255;
      HEAP[offset | 121] = TOTAL1 >>> 13 & 255;
      HEAP[offset | 122] = TOTAL1 >>> 5 & 255;
      HEAP[offset | 123] = TOTAL1 << 3 & 255 | TOTAL0 >>> 29;
      HEAP[offset | 124] = TOTAL0 >>> 21 & 255;
      HEAP[offset | 125] = TOTAL0 >>> 13 & 255;
      HEAP[offset | 126] = TOTAL0 >>> 5 & 255;
      HEAP[offset | 127] = TOTAL0 << 3 & 255;
      _core_heap(offset);
      if (~output) _state_to_heap(output);
      return hashed | 0;
    }
    function hmac_reset() {
      H0h = I0h;
      H0l = I0l;
      H1h = I1h;
      H1l = I1l;
      H2h = I2h;
      H2l = I2l;
      H3h = I3h;
      H3l = I3l;
      H4h = I4h;
      H4l = I4l;
      H5h = I5h;
      H5l = I5l;
      H6h = I6h;
      H6l = I6l;
      H7h = I7h;
      H7l = I7l;
      TOTAL0 = 128;
      TOTAL1 = 0;
    }
    function _hmac_opad() {
      H0h = O0h;
      H0l = O0l;
      H1h = O1h;
      H1l = O1l;
      H2h = O2h;
      H2l = O2l;
      H3h = O3h;
      H3l = O3l;
      H4h = O4h;
      H4l = O4l;
      H5h = O5h;
      H5l = O5l;
      H6h = O6h;
      H6l = O6l;
      H7h = O7h;
      H7l = O7l;
      TOTAL0 = 128;
      TOTAL1 = 0;
    }
    function hmac_init(p0h, p0l, p1h, p1l, p2h, p2l, p3h, p3l, p4h, p4l, p5h, p5l, p6h, p6l, p7h, p7l, p8h, p8l, p9h, p9l, p10h, p10l, p11h, p11l, p12h, p12l, p13h, p13l, p14h, p14l, p15h, p15l) {
      p0h = p0h | 0;
      p0l = p0l | 0;
      p1h = p1h | 0;
      p1l = p1l | 0;
      p2h = p2h | 0;
      p2l = p2l | 0;
      p3h = p3h | 0;
      p3l = p3l | 0;
      p4h = p4h | 0;
      p4l = p4l | 0;
      p5h = p5h | 0;
      p5l = p5l | 0;
      p6h = p6h | 0;
      p6l = p6l | 0;
      p7h = p7h | 0;
      p7l = p7l | 0;
      p8h = p8h | 0;
      p8l = p8l | 0;
      p9h = p9h | 0;
      p9l = p9l | 0;
      p10h = p10h | 0;
      p10l = p10l | 0;
      p11h = p11h | 0;
      p11l = p11l | 0;
      p12h = p12h | 0;
      p12l = p12l | 0;
      p13h = p13h | 0;
      p13l = p13l | 0;
      p14h = p14h | 0;
      p14l = p14l | 0;
      p15h = p15h | 0;
      p15l = p15l | 0;
      reset();
      _core(p0h ^ 0x5c5c5c5c, p0l ^ 0x5c5c5c5c, p1h ^ 0x5c5c5c5c, p1l ^ 0x5c5c5c5c, p2h ^ 0x5c5c5c5c, p2l ^ 0x5c5c5c5c, p3h ^ 0x5c5c5c5c, p3l ^ 0x5c5c5c5c, p4h ^ 0x5c5c5c5c, p4l ^ 0x5c5c5c5c, p5h ^ 0x5c5c5c5c, p5l ^ 0x5c5c5c5c, p6h ^ 0x5c5c5c5c, p6l ^ 0x5c5c5c5c, p7h ^ 0x5c5c5c5c, p7l ^ 0x5c5c5c5c, p8h ^ 0x5c5c5c5c, p8l ^ 0x5c5c5c5c, p9h ^ 0x5c5c5c5c, p9l ^ 0x5c5c5c5c, p10h ^ 0x5c5c5c5c, p10l ^ 0x5c5c5c5c, p11h ^ 0x5c5c5c5c, p11l ^ 0x5c5c5c5c, p12h ^ 0x5c5c5c5c, p12l ^ 0x5c5c5c5c, p13h ^ 0x5c5c5c5c, p13l ^ 0x5c5c5c5c, p14h ^ 0x5c5c5c5c, p14l ^ 0x5c5c5c5c, p15h ^ 0x5c5c5c5c, p15l ^ 0x5c5c5c5c);
      O0h = H0h;
      O0l = H0l;
      O1h = H1h;
      O1l = H1l;
      O2h = H2h;
      O2l = H2l;
      O3h = H3h;
      O3l = H3l;
      O4h = H4h;
      O4l = H4l;
      O5h = H5h;
      O5l = H5l;
      O6h = H6h;
      O6l = H6l;
      O7h = H7h;
      O7l = H7l;
      reset();
      _core(p0h ^ 0x36363636, p0l ^ 0x36363636, p1h ^ 0x36363636, p1l ^ 0x36363636, p2h ^ 0x36363636, p2l ^ 0x36363636, p3h ^ 0x36363636, p3l ^ 0x36363636, p4h ^ 0x36363636, p4l ^ 0x36363636, p5h ^ 0x36363636, p5l ^ 0x36363636, p6h ^ 0x36363636, p6l ^ 0x36363636, p7h ^ 0x36363636, p7l ^ 0x36363636, p8h ^ 0x36363636, p8l ^ 0x36363636, p9h ^ 0x36363636, p9l ^ 0x36363636, p10h ^ 0x36363636, p10l ^ 0x36363636, p11h ^ 0x36363636, p11l ^ 0x36363636, p12h ^ 0x36363636, p12l ^ 0x36363636, p13h ^ 0x36363636, p13l ^ 0x36363636, p14h ^ 0x36363636, p14l ^ 0x36363636, p15h ^ 0x36363636, p15l ^ 0x36363636);
      I0h = H0h;
      I0l = H0l;
      I1h = H1h;
      I1l = H1l;
      I2h = H2h;
      I2l = H2l;
      I3h = H3h;
      I3l = H3l;
      I4h = H4h;
      I4l = H4l;
      I5h = H5h;
      I5l = H5l;
      I6h = H6h;
      I6l = H6l;
      I7h = H7h;
      I7l = H7l;
      TOTAL0 = 128;
      TOTAL1 = 0;
    }
    function hmac_finish(offset, length, output) {
      offset = offset | 0;
      length = length | 0;
      output = output | 0;
      var t0h = 0,
        t0l = 0,
        t1h = 0,
        t1l = 0,
        t2h = 0,
        t2l = 0,
        t3h = 0,
        t3l = 0,
        t4h = 0,
        t4l = 0,
        t5h = 0,
        t5l = 0,
        t6h = 0,
        t6l = 0,
        t7h = 0,
        t7l = 0,
        hashed = 0;
      if (offset & 127) return -1;
      if (~output) if (output & 63) return -1;
      hashed = finish(offset, length, -1) | 0;
      t0h = H0h;
      t0l = H0l;
      t1h = H1h;
      t1l = H1l;
      t2h = H2h;
      t2l = H2l;
      t3h = H3h;
      t3l = H3l;
      t4h = H4h;
      t4l = H4l;
      t5h = H5h;
      t5l = H5l;
      t6h = H6h;
      t6l = H6l;
      t7h = H7h;
      t7l = H7l;
      _hmac_opad();
      _core(t0h, t0l, t1h, t1l, t2h, t2l, t3h, t3l, t4h, t4l, t5h, t5l, t6h, t6l, t7h, t7l, 0x80000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1536);
      if (~output) _state_to_heap(output);
      return hashed | 0;
    }
    function pbkdf2_generate_block(offset, length, block, count, output) {
      offset = offset | 0;
      length = length | 0;
      block = block | 0;
      count = count | 0;
      output = output | 0;
      var h0h = 0,
        h0l = 0,
        h1h = 0,
        h1l = 0,
        h2h = 0,
        h2l = 0,
        h3h = 0,
        h3l = 0,
        h4h = 0,
        h4l = 0,
        h5h = 0,
        h5l = 0,
        h6h = 0,
        h6l = 0,
        h7h = 0,
        h7l = 0,
        t0h = 0,
        t0l = 0,
        t1h = 0,
        t1l = 0,
        t2h = 0,
        t2l = 0,
        t3h = 0,
        t3l = 0,
        t4h = 0,
        t4l = 0,
        t5h = 0,
        t5l = 0,
        t6h = 0,
        t6l = 0,
        t7h = 0,
        t7l = 0;
      if (offset & 127) return -1;
      if (~output) if (output & 63) return -1;
      HEAP[offset + length | 0] = block >>> 24;
      HEAP[offset + length + 1 | 0] = block >>> 16 & 255;
      HEAP[offset + length + 2 | 0] = block >>> 8 & 255;
      HEAP[offset + length + 3 | 0] = block & 255;
      hmac_finish(offset, length + 4 | 0, -1) | 0;
      h0h = t0h = H0h;
      h0l = t0l = H0l;
      h1h = t1h = H1h;
      h1l = t1l = H1l;
      h2h = t2h = H2h;
      h2l = t2l = H2l;
      h3h = t3h = H3h;
      h3l = t3l = H3l;
      h4h = t4h = H4h;
      h4l = t4l = H4l;
      h5h = t5h = H5h;
      h5l = t5l = H5l;
      h6h = t6h = H6h;
      h6l = t6l = H6l;
      h7h = t7h = H7h;
      h7l = t7l = H7l;
      count = count - 1 | 0;
      while ((count | 0) > 0) {
        hmac_reset();
        _core(t0h, t0l, t1h, t1l, t2h, t2l, t3h, t3l, t4h, t4l, t5h, t5l, t6h, t6l, t7h, t7l, 0x80000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1536);
        t0h = H0h;
        t0l = H0l;
        t1h = H1h;
        t1l = H1l;
        t2h = H2h;
        t2l = H2l;
        t3h = H3h;
        t3l = H3l;
        t4h = H4h;
        t4l = H4l;
        t5h = H5h;
        t5l = H5l;
        t6h = H6h;
        t6l = H6l;
        t7h = H7h;
        t7l = H7l;
        _hmac_opad();
        _core(t0h, t0l, t1h, t1l, t2h, t2l, t3h, t3l, t4h, t4l, t5h, t5l, t6h, t6l, t7h, t7l, 0x80000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1536);
        t0h = H0h;
        t0l = H0l;
        t1h = H1h;
        t1l = H1l;
        t2h = H2h;
        t2l = H2l;
        t3h = H3h;
        t3l = H3l;
        t4h = H4h;
        t4l = H4l;
        t5h = H5h;
        t5l = H5l;
        t6h = H6h;
        t6l = H6l;
        t7h = H7h;
        t7l = H7l;
        h0h = h0h ^ H0h;
        h0l = h0l ^ H0l;
        h1h = h1h ^ H1h;
        h1l = h1l ^ H1l;
        h2h = h2h ^ H2h;
        h2l = h2l ^ H2l;
        h3h = h3h ^ H3h;
        h3l = h3l ^ H3l;
        h4h = h4h ^ H4h;
        h4l = h4l ^ H4l;
        h5h = h5h ^ H5h;
        h5l = h5l ^ H5l;
        h6h = h6h ^ H6h;
        h6l = h6l ^ H6l;
        h7h = h7h ^ H7h;
        h7l = h7l ^ H7l;
        count = count - 1 | 0;
      }
      H0h = h0h;
      H0l = h0l;
      H1h = h1h;
      H1l = h1l;
      H2h = h2h;
      H2l = h2l;
      H3h = h3h;
      H3l = h3l;
      H4h = h4h;
      H4l = h4l;
      H5h = h5h;
      H5l = h5l;
      H6h = h6h;
      H6l = h6l;
      H7h = h7h;
      H7l = h7l;
      if (~output) _state_to_heap(output);
      return 0;
    }
    return {
      reset: reset,
      init: init,
      process: process,
      finish: finish,
      hmac_reset: hmac_reset,
      hmac_init: hmac_init,
      hmac_finish: hmac_finish,
      pbkdf2_generate_block: pbkdf2_generate_block
    };
  };
  var _sha512_block_size = 128;
  var _sha512_hash_size = 64;
  var Sha512 = function (_Hash3) {
    _inherits(Sha512, _Hash3);
    var _super106 = _createSuper(Sha512);
    function Sha512() {
      var _this87;
      _classCallCheck(this, Sha512);
      _this87 = _super106.call(this);
      _this87.NAME = 'sha512';
      _this87.BLOCK_SIZE = _sha512_block_size;
      _this87.HASH_SIZE = _sha512_hash_size;
      _this87.heap = _heap_init();
      _this87.asm = sha512_asm({
        Uint8Array: Uint8Array
      }, null, _this87.heap.buffer);
      _this87.reset();
      return _this87;
    }
    return _createClass(Sha512);
  }(Hash);
  Sha512.NAME = 'sha512';
  var Hmac = function () {
    function Hmac(hash, password, verify) {
      _classCallCheck(this, Hmac);
      if (!hash.HASH_SIZE) throw new SyntaxError("option 'hash' supplied doesn't seem to be a valid hash function");
      this.hash = hash;
      this.BLOCK_SIZE = this.hash.BLOCK_SIZE;
      this.HMAC_SIZE = this.hash.HASH_SIZE;
      this.result = null;
      this.key = _hmac_key(this.hash, password);
      var ipad = new Uint8Array(this.key);
      for (var i = 0; i < ipad.length; ++i) ipad[i] ^= 0x36;
      this.hash.reset().process(ipad);
      if (verify !== undefined) {
        this._hmac_init_verify(verify);
      } else {
        this.verify = null;
      }
    }
    _createClass(Hmac, [{
      key: "process",
      value: function process(data) {
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        this.hash.process(data);
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        var inner_result = this.hash.finish().result;
        var opad = new Uint8Array(this.key);
        for (var i = 0; i < opad.length; ++i) opad[i] ^= 0x5c;
        var verify = this.verify;
        var result = this.hash.reset().process(opad).process(inner_result).finish().result;
        if (verify) {
          if (verify.length === result.length) {
            var diff = 0;
            for (var _i18 = 0; _i18 < verify.length; _i18++) {
              diff |= verify[_i18] ^ result[_i18];
            }
            if (diff !== 0) throw new Error("HMAC verification failed, hash value doesn't match");
          } else {
            throw new Error("HMAC verification failed, lengths doesn't match");
          }
        }
        this.result = result;
        return this;
      }
    }, {
      key: "_hmac_init_verify",
      value: function _hmac_init_verify(verify) {
        if (verify.length !== this.HMAC_SIZE) throw new IllegalArgumentError('illegal verification tag size');
        this.verify = verify;
      }
    }]);
    return Hmac;
  }();
  function _hmac_key(hash, password) {
    var key = new Uint8Array(hash.BLOCK_SIZE);
    if (password.length > hash.BLOCK_SIZE) {
      key.set(hash.reset().process(password).finish().result);
    } else {
      key.set(password);
    }
    return key;
  }
  var HmacSha1 = function (_Hmac) {
    _inherits(HmacSha1, _Hmac);
    var _super107 = _createSuper(HmacSha1);
    function HmacSha1(password, verify) {
      var _this88;
      _classCallCheck(this, HmacSha1);
      var hash = new Sha1();
      _this88 = _super107.call(this, hash, password, verify);
      _this88.reset();
      if (verify !== undefined) {
        _this88._hmac_init_verify(verify);
      } else {
        _this88.verify = null;
      }
      return _possibleConstructorReturn(_this88, _assertThisInitialized(_this88));
    }
    _createClass(HmacSha1, [{
      key: "reset",
      value: function reset() {
        this.result = null;
        var key = this.key;
        this.hash.reset().asm.hmac_init(key[0] << 24 | key[1] << 16 | key[2] << 8 | key[3], key[4] << 24 | key[5] << 16 | key[6] << 8 | key[7], key[8] << 24 | key[9] << 16 | key[10] << 8 | key[11], key[12] << 24 | key[13] << 16 | key[14] << 8 | key[15], key[16] << 24 | key[17] << 16 | key[18] << 8 | key[19], key[20] << 24 | key[21] << 16 | key[22] << 8 | key[23], key[24] << 24 | key[25] << 16 | key[26] << 8 | key[27], key[28] << 24 | key[29] << 16 | key[30] << 8 | key[31], key[32] << 24 | key[33] << 16 | key[34] << 8 | key[35], key[36] << 24 | key[37] << 16 | key[38] << 8 | key[39], key[40] << 24 | key[41] << 16 | key[42] << 8 | key[43], key[44] << 24 | key[45] << 16 | key[46] << 8 | key[47], key[48] << 24 | key[49] << 16 | key[50] << 8 | key[51], key[52] << 24 | key[53] << 16 | key[54] << 8 | key[55], key[56] << 24 | key[57] << 16 | key[58] << 8 | key[59], key[60] << 24 | key[61] << 16 | key[62] << 8 | key[63]);
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        var hash = this.hash;
        var asm = this.hash.asm;
        var heap = this.hash.heap;
        asm.hmac_finish(hash.pos, hash.len, 0);
        var verify = this.verify;
        var result = new Uint8Array(_sha1_hash_size);
        result.set(heap.subarray(0, _sha1_hash_size));
        if (verify) {
          if (verify.length === result.length) {
            var diff = 0;
            for (var i = 0; i < verify.length; i++) {
              diff |= verify[i] ^ result[i];
            }
            if (diff !== 0) throw new Error("HMAC verification failed, hash value doesn't match");
          } else {
            throw new Error("HMAC verification failed, lengths doesn't match");
          }
        } else {
          this.result = result;
        }
        return this;
      }
    }]);
    return HmacSha1;
  }(Hmac);
  var HmacSha256 = function (_Hmac2) {
    _inherits(HmacSha256, _Hmac2);
    var _super108 = _createSuper(HmacSha256);
    function HmacSha256(password, verify) {
      var _this89;
      _classCallCheck(this, HmacSha256);
      var hash = new Sha256();
      _this89 = _super108.call(this, hash, password, verify);
      _this89.reset();
      if (verify !== undefined) {
        _this89._hmac_init_verify(verify);
      } else {
        _this89.verify = null;
      }
      return _possibleConstructorReturn(_this89, _assertThisInitialized(_this89));
    }
    _createClass(HmacSha256, [{
      key: "reset",
      value: function reset() {
        var key = this.key;
        this.hash.reset().asm.hmac_init(key[0] << 24 | key[1] << 16 | key[2] << 8 | key[3], key[4] << 24 | key[5] << 16 | key[6] << 8 | key[7], key[8] << 24 | key[9] << 16 | key[10] << 8 | key[11], key[12] << 24 | key[13] << 16 | key[14] << 8 | key[15], key[16] << 24 | key[17] << 16 | key[18] << 8 | key[19], key[20] << 24 | key[21] << 16 | key[22] << 8 | key[23], key[24] << 24 | key[25] << 16 | key[26] << 8 | key[27], key[28] << 24 | key[29] << 16 | key[30] << 8 | key[31], key[32] << 24 | key[33] << 16 | key[34] << 8 | key[35], key[36] << 24 | key[37] << 16 | key[38] << 8 | key[39], key[40] << 24 | key[41] << 16 | key[42] << 8 | key[43], key[44] << 24 | key[45] << 16 | key[46] << 8 | key[47], key[48] << 24 | key[49] << 16 | key[50] << 8 | key[51], key[52] << 24 | key[53] << 16 | key[54] << 8 | key[55], key[56] << 24 | key[57] << 16 | key[58] << 8 | key[59], key[60] << 24 | key[61] << 16 | key[62] << 8 | key[63]);
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        if (this.key === null) throw new IllegalStateError('no key is associated with the instance');
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        var hash = this.hash;
        var asm = this.hash.asm;
        var heap = this.hash.heap;
        asm.hmac_finish(hash.pos, hash.len, 0);
        var verify = this.verify;
        var result = new Uint8Array(_sha256_hash_size);
        result.set(heap.subarray(0, _sha256_hash_size));
        if (verify) {
          if (verify.length === result.length) {
            var diff = 0;
            for (var i = 0; i < verify.length; i++) {
              diff |= verify[i] ^ result[i];
            }
            if (diff !== 0) throw new Error("HMAC verification failed, hash value doesn't match");
          } else {
            throw new Error("HMAC verification failed, lengths doesn't match");
          }
        } else {
          this.result = result;
        }
        return this;
      }
    }]);
    return HmacSha256;
  }(Hmac);
  var HmacSha512 = function (_Hmac3) {
    _inherits(HmacSha512, _Hmac3);
    var _super109 = _createSuper(HmacSha512);
    function HmacSha512(password, verify) {
      var _this90;
      _classCallCheck(this, HmacSha512);
      var hash = new Sha512();
      _this90 = _super109.call(this, hash, password, verify);
      _this90.reset();
      if (verify !== undefined) {
        _this90._hmac_init_verify(verify);
      } else {
        _this90.verify = null;
      }
      return _possibleConstructorReturn(_this90, _assertThisInitialized(_this90));
    }
    _createClass(HmacSha512, [{
      key: "reset",
      value: function reset() {
        var key = this.key;
        this.hash.reset().asm.hmac_init(key[0] << 24 | key[1] << 16 | key[2] << 8 | key[3], key[4] << 24 | key[5] << 16 | key[6] << 8 | key[7], key[8] << 24 | key[9] << 16 | key[10] << 8 | key[11], key[12] << 24 | key[13] << 16 | key[14] << 8 | key[15], key[16] << 24 | key[17] << 16 | key[18] << 8 | key[19], key[20] << 24 | key[21] << 16 | key[22] << 8 | key[23], key[24] << 24 | key[25] << 16 | key[26] << 8 | key[27], key[28] << 24 | key[29] << 16 | key[30] << 8 | key[31], key[32] << 24 | key[33] << 16 | key[34] << 8 | key[35], key[36] << 24 | key[37] << 16 | key[38] << 8 | key[39], key[40] << 24 | key[41] << 16 | key[42] << 8 | key[43], key[44] << 24 | key[45] << 16 | key[46] << 8 | key[47], key[48] << 24 | key[49] << 16 | key[50] << 8 | key[51], key[52] << 24 | key[53] << 16 | key[54] << 8 | key[55], key[56] << 24 | key[57] << 16 | key[58] << 8 | key[59], key[60] << 24 | key[61] << 16 | key[62] << 8 | key[63], key[64] << 24 | key[65] << 16 | key[66] << 8 | key[67], key[68] << 24 | key[69] << 16 | key[70] << 8 | key[71], key[72] << 24 | key[73] << 16 | key[74] << 8 | key[75], key[76] << 24 | key[77] << 16 | key[78] << 8 | key[79], key[80] << 24 | key[81] << 16 | key[82] << 8 | key[83], key[84] << 24 | key[85] << 16 | key[86] << 8 | key[87], key[88] << 24 | key[89] << 16 | key[90] << 8 | key[91], key[92] << 24 | key[93] << 16 | key[94] << 8 | key[95], key[96] << 24 | key[97] << 16 | key[98] << 8 | key[99], key[100] << 24 | key[101] << 16 | key[102] << 8 | key[103], key[104] << 24 | key[105] << 16 | key[106] << 8 | key[107], key[108] << 24 | key[109] << 16 | key[110] << 8 | key[111], key[112] << 24 | key[113] << 16 | key[114] << 8 | key[115], key[116] << 24 | key[117] << 16 | key[118] << 8 | key[119], key[120] << 24 | key[121] << 16 | key[122] << 8 | key[123], key[124] << 24 | key[125] << 16 | key[126] << 8 | key[127]);
        return this;
      }
    }, {
      key: "finish",
      value: function finish() {
        if (this.key === null) throw new IllegalStateError('no key is associated with the instance');
        if (this.result !== null) throw new IllegalStateError('state must be reset before processing new data');
        var hash = this.hash;
        var asm = this.hash.asm;
        var heap = this.hash.heap;
        asm.hmac_finish(hash.pos, hash.len, 0);
        var verify = this.verify;
        var result = new Uint8Array(_sha512_hash_size);
        result.set(heap.subarray(0, _sha512_hash_size));
        if (verify) {
          if (verify.length === result.length) {
            var diff = 0;
            for (var i = 0; i < verify.length; i++) {
              diff |= verify[i] ^ result[i];
            }
            if (diff !== 0) throw new Error("HMAC verification failed, hash value doesn't match");
          } else {
            throw new Error("HMAC verification failed, lengths doesn't match");
          }
        } else {
          this.result = result;
        }
        return this;
      }
    }]);
    return HmacSha512;
  }(Hmac);
  function Pbkdf2HmacSha1(password, salt, count, length) {
    var hmac = new HmacSha1(password);
    var result = new Uint8Array(length);
    var blocks = Math.ceil(length / hmac.HMAC_SIZE);
    for (var i = 1; i <= blocks; ++i) {
      var j = (i - 1) * hmac.HMAC_SIZE;
      var l = (i < blocks ? 0 : length % hmac.HMAC_SIZE) || hmac.HMAC_SIZE;
      hmac.reset().process(salt);
      hmac.hash.asm.pbkdf2_generate_block(hmac.hash.pos, hmac.hash.len, i, count, 0);
      result.set(hmac.hash.heap.subarray(0, l), j);
    }
    return result;
  }
  function Pbkdf2HmacSha256(password, salt, count, length) {
    var hmac = new HmacSha256(password);
    var result = new Uint8Array(length);
    var blocks = Math.ceil(length / hmac.HMAC_SIZE);
    for (var i = 1; i <= blocks; ++i) {
      var j = (i - 1) * hmac.HMAC_SIZE;
      var l = (i < blocks ? 0 : length % hmac.HMAC_SIZE) || hmac.HMAC_SIZE;
      hmac.reset().process(salt);
      hmac.hash.asm.pbkdf2_generate_block(hmac.hash.pos, hmac.hash.len, i, count, 0);
      result.set(hmac.hash.heap.subarray(0, l), j);
    }
    return result;
  }
  function Pbkdf2HmacSha512(password, salt, count, length) {
    var hmac = new HmacSha512(password);
    var result = new Uint8Array(length);
    var blocks = Math.ceil(length / hmac.HMAC_SIZE);
    for (var i = 1; i <= blocks; ++i) {
      var j = (i - 1) * hmac.HMAC_SIZE;
      var l = (i < blocks ? 0 : length % hmac.HMAC_SIZE) || hmac.HMAC_SIZE;
      hmac.reset().process(salt);
      hmac.hash.asm.pbkdf2_generate_block(hmac.hash.pos, hmac.hash.len, i, count, 0);
      result.set(hmac.hash.heap.subarray(0, l), j);
    }
    return result;
  }
  var RSA = function () {
    function RSA(key) {
      _classCallCheck(this, RSA);
      var l = key.length;
      if (l !== 2 && l !== 3 && l !== 8) throw new SyntaxError('unexpected key type');
      var k0 = new Modulus(new BigNumber(key[0]));
      var k1 = new BigNumber(key[1]);
      this.key = {
        0: k0,
        1: k1
      };
      if (l > 2) {
        this.key[2] = new BigNumber(key[2]);
      }
      if (l > 3) {
        this.key[3] = new Modulus(new BigNumber(key[3]));
        this.key[4] = new Modulus(new BigNumber(key[4]));
        this.key[5] = new BigNumber(key[5]);
        this.key[6] = new BigNumber(key[6]);
        this.key[7] = new BigNumber(key[7]);
      }
    }
    _createClass(RSA, [{
      key: "encrypt",
      value: function encrypt(msg) {
        if (!this.key) throw new IllegalStateError('no key is associated with the instance');
        if (this.key[0].compare(msg) <= 0) throw new RangeError('data too large');
        var m = this.key[0];
        var e = this.key[1];
        var result = m.power(msg, e).toBytes();
        var bytelen = m.bitLength + 7 >> 3;
        if (result.length < bytelen) {
          var r = new Uint8Array(bytelen);
          r.set(result, bytelen - result.length);
          result = r;
        }
        this.result = result;
        return this;
      }
    }, {
      key: "decrypt",
      value: function decrypt(msg) {
        if (this.key[0].compare(msg) <= 0) throw new RangeError('data too large');
        var result;
        var m;
        if (this.key[3] !== undefined) {
          m = this.key[0];
          var p = this.key[3];
          var q = this.key[4];
          var dp = this.key[5];
          var dq = this.key[6];
          var u = this.key[7];
          var x = p.power(msg, dp);
          var y = q.power(msg, dq);
          var t = x.subtract(y);
          while (t.sign < 0) t = t.add(p);
          var h = p.reduce(u.multiply(t));
          result = h.multiply(q).add(y).clamp(m.bitLength).toBytes();
        } else {
          m = this.key[0];
          var d = this.key[2];
          result = m.power(msg, d).toBytes();
        }
        var bytelen = m.bitLength + 7 >> 3;
        if (result.length < bytelen) {
          var r = new Uint8Array(bytelen);
          r.set(result, bytelen - result.length);
          result = r;
        }
        this.result = result;
        return this;
      }
    }]);
    return RSA;
  }();
  var RSA_OAEP = function () {
    function RSA_OAEP(key, hash, label) {
      _classCallCheck(this, RSA_OAEP);
      this.rsa = new RSA(key);
      this.hash = hash;
      if (label !== undefined) {
        this.label = label.length > 0 ? label : null;
      } else {
        this.label = null;
      }
    }
    _createClass(RSA_OAEP, [{
      key: "encrypt",
      value: function encrypt(data, random) {
        var key_size = Math.ceil(this.rsa.key[0].bitLength / 8);
        var hash_size = this.hash.HASH_SIZE;
        var data_length = data.byteLength || data.length || 0;
        var ps_length = key_size - data_length - 2 * hash_size - 2;
        if (data_length > key_size - 2 * this.hash.HASH_SIZE - 2) throw new IllegalArgumentError('data too large');
        var message = new Uint8Array(key_size);
        var seed = message.subarray(1, hash_size + 1);
        var data_block = message.subarray(hash_size + 1);
        data_block.set(data, hash_size + ps_length + 1);
        data_block.set(this.hash.process(this.label || new Uint8Array(0)).finish().result, 0);
        data_block[hash_size + ps_length] = 1;
        if (random !== undefined) {
          if (seed.length !== random.length) throw new IllegalArgumentError('random size must equal the hash size');
          seed.set(random);
        } else {
          getRandomValues(seed);
        }
        var data_block_mask = this.RSA_MGF1_generate(seed, data_block.length);
        for (var i = 0; i < data_block.length; i++) data_block[i] ^= data_block_mask[i];
        var seed_mask = this.RSA_MGF1_generate(data_block, seed.length);
        for (var _i19 = 0; _i19 < seed.length; _i19++) seed[_i19] ^= seed_mask[_i19];
        this.rsa.encrypt(new BigNumber(message));
        return new Uint8Array(this.rsa.result);
      }
    }, {
      key: "decrypt",
      value: function decrypt(data) {
        if (!this.rsa.key) throw new IllegalStateError('no key is associated with the instance');
        var key_size = Math.ceil(this.rsa.key[0].bitLength / 8);
        var hash_size = this.hash.HASH_SIZE;
        var data_length = data.byteLength || data.length || 0;
        if (data_length !== key_size) throw new IllegalArgumentError('bad data');
        this.rsa.decrypt(new BigNumber(data));
        var z = this.rsa.result[0];
        var seed = this.rsa.result.subarray(1, hash_size + 1);
        var data_block = this.rsa.result.subarray(hash_size + 1);
        if (z !== 0) throw new SecurityError('decryption failed');
        var seed_mask = this.RSA_MGF1_generate(data_block, seed.length);
        for (var i = 0; i < seed.length; i++) seed[i] ^= seed_mask[i];
        var data_block_mask = this.RSA_MGF1_generate(seed, data_block.length);
        for (var _i20 = 0; _i20 < data_block.length; _i20++) data_block[_i20] ^= data_block_mask[_i20];
        var lhash = this.hash.reset().process(this.label || new Uint8Array(0)).finish().result;
        for (var _i21 = 0; _i21 < hash_size; _i21++) {
          if (lhash[_i21] !== data_block[_i21]) throw new SecurityError('decryption failed');
        }
        var ps_end = hash_size;
        for (; ps_end < data_block.length; ps_end++) {
          var psz = data_block[ps_end];
          if (psz === 1) break;
          if (psz !== 0) throw new SecurityError('decryption failed');
        }
        if (ps_end === data_block.length) throw new SecurityError('decryption failed');
        this.rsa.result = data_block.subarray(ps_end + 1);
        return new Uint8Array(this.rsa.result);
      }
    }, {
      key: "RSA_MGF1_generate",
      value: function RSA_MGF1_generate(seed) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var hash_size = this.hash.HASH_SIZE;
        var mask = new Uint8Array(length);
        var counter = new Uint8Array(4);
        var chunks = Math.ceil(length / hash_size);
        for (var i = 0; i < chunks; i++) {
          counter[0] = i >>> 24, counter[1] = i >>> 16 & 255, counter[2] = i >>> 8 & 255, counter[3] = i & 255;
          var submask = mask.subarray(i * hash_size);
          var chunk = this.hash.reset().process(seed).process(counter).finish().result;
          if (chunk.length > submask.length) chunk = chunk.subarray(0, submask.length);
          submask.set(chunk);
        }
        return mask;
      }
    }]);
    return RSA_OAEP;
  }();
  var RSA_PSS = function () {
    function RSA_PSS(key, hash) {
      var saltLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
      _classCallCheck(this, RSA_PSS);
      this.rsa = new RSA(key);
      this.hash = hash;
      this.saltLength = saltLength;
      if (this.saltLength < 0) throw new TypeError('saltLength should be a non-negative number');
      if (this.rsa.key !== null && Math.ceil((this.rsa.key[0].bitLength - 1) / 8) < this.hash.HASH_SIZE + this.saltLength + 2) throw new SyntaxError('saltLength is too large');
    }
    _createClass(RSA_PSS, [{
      key: "sign",
      value: function sign(data, random) {
        var key_bits = this.rsa.key[0].bitLength;
        var hash_size = this.hash.HASH_SIZE;
        var message_length = Math.ceil((key_bits - 1) / 8);
        var salt_length = this.saltLength;
        var ps_length = message_length - salt_length - hash_size - 2;
        var message = new Uint8Array(message_length);
        var h_block = message.subarray(message_length - hash_size - 1, message_length - 1);
        var d_block = message.subarray(0, message_length - hash_size - 1);
        var d_salt = d_block.subarray(ps_length + 1);
        var m_block = new Uint8Array(8 + hash_size + salt_length);
        var m_hash = m_block.subarray(8, 8 + hash_size);
        var m_salt = m_block.subarray(8 + hash_size);
        m_hash.set(this.hash.process(data).finish().result);
        if (salt_length > 0) {
          if (random !== undefined) {
            if (m_salt.length !== random.length) throw new IllegalArgumentError('random size must equal the salt size');
            m_salt.set(random);
          } else {
            getRandomValues(m_salt);
          }
        }
        d_block[ps_length] = 1;
        d_salt.set(m_salt);
        h_block.set(this.hash.reset().process(m_block).finish().result);
        var d_block_mask = this.RSA_MGF1_generate(h_block, d_block.length);
        for (var i = 0; i < d_block.length; i++) d_block[i] ^= d_block_mask[i];
        message[message_length - 1] = 0xbc;
        var zbits = 8 * message_length - key_bits + 1;
        if (zbits % 8) message[0] &= 0xff >>> zbits;
        this.rsa.decrypt(new BigNumber(message));
        return this.rsa.result;
      }
    }, {
      key: "verify",
      value: function verify(signature, data) {
        var key_bits = this.rsa.key[0].bitLength;
        var hash_size = this.hash.HASH_SIZE;
        var message_length = Math.ceil((key_bits - 1) / 8);
        var salt_length = this.saltLength;
        var ps_length = message_length - salt_length - hash_size - 2;
        this.rsa.encrypt(new BigNumber(signature));
        var message = this.rsa.result;
        if (message[message_length - 1] !== 0xbc) throw new SecurityError('bad signature');
        var h_block = message.subarray(message_length - hash_size - 1, message_length - 1);
        var d_block = message.subarray(0, message_length - hash_size - 1);
        var d_salt = d_block.subarray(ps_length + 1);
        var zbits = 8 * message_length - key_bits + 1;
        if (zbits % 8 && message[0] >>> 8 - zbits) throw new SecurityError('bad signature');
        var d_block_mask = this.RSA_MGF1_generate(h_block, d_block.length);
        for (var i = 0; i < d_block.length; i++) d_block[i] ^= d_block_mask[i];
        if (zbits % 8) message[0] &= 0xff >>> zbits;
        for (var _i22 = 0; _i22 < ps_length; _i22++) {
          if (d_block[_i22] !== 0) throw new SecurityError('bad signature');
        }
        if (d_block[ps_length] !== 1) throw new SecurityError('bad signature');
        var m_block = new Uint8Array(8 + hash_size + salt_length);
        var m_hash = m_block.subarray(8, 8 + hash_size);
        var m_salt = m_block.subarray(8 + hash_size);
        m_hash.set(this.hash.reset().process(data).finish().result);
        m_salt.set(d_salt);
        var h_block_verify = this.hash.reset().process(m_block).finish().result;
        for (var _i23 = 0; _i23 < hash_size; _i23++) {
          if (h_block[_i23] !== h_block_verify[_i23]) throw new SecurityError('bad signature');
        }
      }
    }, {
      key: "RSA_MGF1_generate",
      value: function RSA_MGF1_generate(seed) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var hash_size = this.hash.HASH_SIZE;
        var mask = new Uint8Array(length);
        var counter = new Uint8Array(4);
        var chunks = Math.ceil(length / hash_size);
        for (var i = 0; i < chunks; i++) {
          counter[0] = i >>> 24, counter[1] = i >>> 16 & 255, counter[2] = i >>> 8 & 255, counter[3] = i & 255;
          var submask = mask.subarray(i * hash_size);
          var chunk = this.hash.reset().process(seed).process(counter).finish().result;
          if (chunk.length > submask.length) chunk = chunk.subarray(0, submask.length);
          submask.set(chunk);
        }
        return mask;
      }
    }]);
    return RSA_PSS;
  }();
  var RSA_PKCS1_v1_5 = function () {
    function RSA_PKCS1_v1_5(key, hash) {
      _classCallCheck(this, RSA_PKCS1_v1_5);
      this.rsa = new RSA(key);
      this.hash = hash;
    }
    _createClass(RSA_PKCS1_v1_5, [{
      key: "sign",
      value: function sign(data) {
        if (!this.rsa.key) {
          throw new IllegalStateError('no key is associated with the instance');
        }
        var prefix = getHashPrefix(this.hash);
        var hash_size = this.hash.HASH_SIZE;
        var t_len = prefix.length + hash_size;
        var k = this.rsa.key[0].bitLength + 7 >> 3;
        if (k < t_len + 11) {
          throw new Error('Message too long');
        }
        var m_hash = new Uint8Array(hash_size);
        m_hash.set(this.hash.process(data).finish().result);
        var em = new Uint8Array(k);
        var i = 0;
        em[i++] = 0;
        em[i++] = 1;
        for (i; i < k - t_len - 1; i++) {
          em[i] = 0xff;
        }
        em[i++] = 0;
        em.set(prefix, i);
        em.set(m_hash, em.length - hash_size);
        this.rsa.decrypt(new BigNumber(em));
        return this.rsa.result;
      }
    }, {
      key: "verify",
      value: function verify(signature, data) {
        var prefix = getHashPrefix(this.hash);
        var hash_size = this.hash.HASH_SIZE;
        var t_len = prefix.length + hash_size;
        var k = this.rsa.key[0].bitLength + 7 >> 3;
        if (k < t_len + 11) {
          throw new SecurityError('Bad signature');
        }
        this.rsa.encrypt(new BigNumber(signature));
        var m_hash = new Uint8Array(hash_size);
        m_hash.set(this.hash.process(data).finish().result);
        var res = 1;
        var decryptedSignature = this.rsa.result;
        var i = 0;
        res &= decryptedSignature[i++] === 0 ? 1 : 0;
        res &= decryptedSignature[i++] === 1 ? 1 : 0;
        for (i; i < k - t_len - 1; i++) {
          res &= decryptedSignature[i] === 0xff ? 1 : 0;
        }
        res &= decryptedSignature[i++] === 0 ? 1 : 0;
        var j = 0;
        var n = i + prefix.length;
        for (i; i < n; i++) {
          res &= decryptedSignature[i] === prefix[j++] ? 1 : 0;
        }
        j = 0;
        n = i + m_hash.length;
        for (i; i < n; i++) {
          res &= decryptedSignature[i] === m_hash[j++] ? 1 : 0;
        }
        if (!res) {
          throw new SecurityError('Bad signature');
        }
      }
    }]);
    return RSA_PKCS1_v1_5;
  }();
  var HASH_PREFIXES = {
    sha1: new Uint8Array([0x30, 0x21, 0x30, 0x09, 0x06, 0x05, 0x2b, 0x0e, 0x03, 0x02, 0x1a, 0x05, 0x00, 0x04, 0x14]),
    sha256: new Uint8Array([0x30, 0x31, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01, 0x05, 0x00, 0x04, 0x20]),
    sha384: new Uint8Array([0x30, 0x41, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x02, 0x05, 0x00, 0x04, 0x30]),
    sha512: new Uint8Array([0x30, 0x51, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x03, 0x05, 0x00, 0x04, 0x40])
  };
  function getHashPrefix(hash) {
    var prefix = HASH_PREFIXES[hash.NAME];
    if (!prefix) {
      throw new Error("Cannot get hash prefix for hash algorithm '" + hash.NAME + "'");
    }
    return prefix;
  }
  function isAlgorithm(algorithm, name) {
    return algorithm.name.toUpperCase() === name.toUpperCase();
  }
  var AesCryptoKey = function (_CryptoKey) {
    _inherits(AesCryptoKey, _CryptoKey);
    var _super110 = _createSuper(AesCryptoKey);
    function AesCryptoKey(algorithm, extractable, usages, raw) {
      var _this91;
      _classCallCheck(this, AesCryptoKey);
      _this91 = _super110.call(this, algorithm, extractable, "secret", usages);
      _this91.raw = raw;
      return _this91;
    }
    _createClass(AesCryptoKey, [{
      key: "toJSON",
      value: function toJSON() {
        var jwk = {
          kty: "oct",
          alg: this.getJwkAlgorithm(),
          k: Convert.ToBase64Url(this.raw),
          ext: this.extractable,
          key_ops: this.usages
        };
        return jwk;
      }
    }, {
      key: "getJwkAlgorithm",
      value: function getJwkAlgorithm() {
        switch (this.algorithm.name.toUpperCase()) {
          case "AES-CBC":
            return "A".concat(this.algorithm.length, "CBC");
          case "AES-CTR":
            return "A".concat(this.algorithm.length, "CTR");
          case "AES-GCM":
            return "A".concat(this.algorithm.length, "GCM");
          case "AES-ECB":
            return "A".concat(this.algorithm.length, "ECB");
          default:
            throw new AlgorithmError("Unsupported algorithm name");
        }
      }
    }]);
    return AesCryptoKey;
  }(CryptoKey);
  var AesCrypto = function () {
    function AesCrypto() {
      _classCallCheck(this, AesCrypto);
    }
    _createClass(AesCrypto, null, [{
      key: "checkCryptoKey",
      value: function checkCryptoKey(key) {
        if (!(key instanceof AesCryptoKey)) {
          throw new TypeError("key: Is not AesCryptoKey");
        }
      }
    }, {
      key: "generateKey",
      value: function generateKey(algorithm, extractable, usages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee31() {
          var raw;
          return _regeneratorRuntime().wrap(function _callee31$(_context31) {
            while (1) switch (_context31.prev = _context31.next) {
              case 0:
                raw = exports.nativeCrypto.getRandomValues(new Uint8Array(algorithm.length / 8));
                return _context31.abrupt("return", new AesCryptoKey(algorithm, extractable, usages, raw));
              case 2:
              case "end":
                return _context31.stop();
            }
          }, _callee31);
        }));
      }
    }, {
      key: "encrypt",
      value: function encrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee32() {
          return _regeneratorRuntime().wrap(function _callee32$(_context32) {
            while (1) switch (_context32.prev = _context32.next) {
              case 0:
                return _context32.abrupt("return", this.cipher(algorithm, key, BufferSourceConverter.toUint8Array(data), true));
              case 1:
              case "end":
                return _context32.stop();
            }
          }, _callee32, this);
        }));
      }
    }, {
      key: "decrypt",
      value: function decrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee33() {
          return _regeneratorRuntime().wrap(function _callee33$(_context33) {
            while (1) switch (_context33.prev = _context33.next) {
              case 0:
                return _context33.abrupt("return", this.cipher(algorithm, key, BufferSourceConverter.toUint8Array(data), false));
              case 1:
              case "end":
                return _context33.stop();
            }
          }, _callee33, this);
        }));
      }
    }, {
      key: "exportKey",
      value: function exportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee34() {
          return _regeneratorRuntime().wrap(function _callee34$(_context34) {
            while (1) switch (_context34.prev = _context34.next) {
              case 0:
                _context34.t0 = format;
                _context34.next = _context34.t0 === "jwk" ? 3 : _context34.t0 === "raw" ? 4 : 5;
                break;
              case 3:
                return _context34.abrupt("return", key.toJSON());
              case 4:
                return _context34.abrupt("return", key.raw.buffer);
              case 5:
                throw new OperationError("format: Must be 'jwk' or 'raw'");
              case 6:
              case "end":
                return _context34.stop();
            }
          }, _callee34);
        }));
      }
    }, {
      key: "importKey",
      value: function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee35() {
          var raw, key;
          return _regeneratorRuntime().wrap(function _callee35$(_context35) {
            while (1) switch (_context35.prev = _context35.next) {
              case 0:
                if (isJWK(keyData)) {
                  raw = Convert.FromBase64Url(keyData.k);
                } else {
                  raw = BufferSourceConverter.toArrayBuffer(keyData);
                }
                _context35.t0 = raw.byteLength << 3;
                _context35.next = _context35.t0 === 128 ? 4 : _context35.t0 === 192 ? 4 : _context35.t0 === 256 ? 4 : 5;
                break;
              case 4:
                return _context35.abrupt("break", 6);
              case 5:
                throw new OperationError("keyData: Is wrong key length");
              case 6:
                key = new AesCryptoKey({
                  name: algorithm.name,
                  length: raw.byteLength << 3
                }, extractable, keyUsages, new Uint8Array(raw));
                return _context35.abrupt("return", key);
              case 8:
              case "end":
                return _context35.stop();
            }
          }, _callee35);
        }));
      }
    }, {
      key: "cipher",
      value: function cipher(algorithm, key, data, encrypt) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee36() {
          var action, result, iv, _iv, additionalData, tagLength;
          return _regeneratorRuntime().wrap(function _callee36$(_context36) {
            while (1) switch (_context36.prev = _context36.next) {
              case 0:
                action = encrypt ? "encrypt" : "decrypt";
                if (!isAlgorithm(algorithm, AesCrypto.AesCBC)) {
                  _context36.next = 6;
                  break;
                }
                iv = BufferSourceConverter.toUint8Array(algorithm.iv);
                result = AES_CBC[action](data, key.raw, undefined, iv);
                _context36.next = 18;
                break;
              case 6:
                if (!isAlgorithm(algorithm, AesCrypto.AesGCM)) {
                  _context36.next = 13;
                  break;
                }
                _iv = BufferSourceConverter.toUint8Array(algorithm.iv);
                if (algorithm.additionalData) {
                  additionalData = BufferSourceConverter.toUint8Array(algorithm.additionalData);
                }
                tagLength = (algorithm.tagLength || 128) / 8;
                result = AES_GCM[action](data, key.raw, _iv, additionalData, tagLength);
                _context36.next = 18;
                break;
              case 13:
                if (!isAlgorithm(algorithm, AesCrypto.AesECB)) {
                  _context36.next = 17;
                  break;
                }
                result = AES_ECB[action](data, key.raw, true);
                _context36.next = 18;
                break;
              case 17:
                throw new OperationError("algorithm: Is not recognized");
              case 18:
                return _context36.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 19:
              case "end":
                return _context36.stop();
            }
          }, _callee36);
        }));
      }
    }]);
    return AesCrypto;
  }();
  AesCrypto.AesCBC = "AES-CBC";
  AesCrypto.AesECB = "AES-ECB";
  AesCrypto.AesGCM = "AES-GCM";
  var AesCbcProvider = function (_AesCbcProvider$) {
    _inherits(AesCbcProvider, _AesCbcProvider$);
    var _super111 = _createSuper(AesCbcProvider);
    function AesCbcProvider() {
      _classCallCheck(this, AesCbcProvider);
      return _super111.apply(this, arguments);
    }
    _createClass(AesCbcProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee37() {
          return _regeneratorRuntime().wrap(function _callee37$(_context37) {
            while (1) switch (_context37.prev = _context37.next) {
              case 0:
                return _context37.abrupt("return", AesCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context37.stop();
            }
          }, _callee37);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee38() {
          return _regeneratorRuntime().wrap(function _callee38$(_context38) {
            while (1) switch (_context38.prev = _context38.next) {
              case 0:
                return _context38.abrupt("return", AesCrypto.encrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context38.stop();
            }
          }, _callee38);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee39() {
          return _regeneratorRuntime().wrap(function _callee39$(_context39) {
            while (1) switch (_context39.prev = _context39.next) {
              case 0:
                return _context39.abrupt("return", AesCrypto.decrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context39.stop();
            }
          }, _callee39);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee40() {
          return _regeneratorRuntime().wrap(function _callee40$(_context40) {
            while (1) switch (_context40.prev = _context40.next) {
              case 0:
                return _context40.abrupt("return", AesCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context40.stop();
            }
          }, _callee40);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee41() {
          return _regeneratorRuntime().wrap(function _callee41$(_context41) {
            while (1) switch (_context41.prev = _context41.next) {
              case 0:
                return _context41.abrupt("return", AesCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context41.stop();
            }
          }, _callee41);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(AesCbcProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        AesCrypto.checkCryptoKey(key);
      }
    }]);
    return AesCbcProvider;
  }(AesCbcProvider$1);
  var AesEcbProvider = function (_AesEcbProvider$) {
    _inherits(AesEcbProvider, _AesEcbProvider$);
    var _super112 = _createSuper(AesEcbProvider);
    function AesEcbProvider() {
      _classCallCheck(this, AesEcbProvider);
      return _super112.apply(this, arguments);
    }
    _createClass(AesEcbProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee42() {
          return _regeneratorRuntime().wrap(function _callee42$(_context42) {
            while (1) switch (_context42.prev = _context42.next) {
              case 0:
                return _context42.abrupt("return", AesCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context42.stop();
            }
          }, _callee42);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee43() {
          return _regeneratorRuntime().wrap(function _callee43$(_context43) {
            while (1) switch (_context43.prev = _context43.next) {
              case 0:
                return _context43.abrupt("return", AesCrypto.encrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context43.stop();
            }
          }, _callee43);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee44() {
          return _regeneratorRuntime().wrap(function _callee44$(_context44) {
            while (1) switch (_context44.prev = _context44.next) {
              case 0:
                return _context44.abrupt("return", AesCrypto.decrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context44.stop();
            }
          }, _callee44);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee45() {
          return _regeneratorRuntime().wrap(function _callee45$(_context45) {
            while (1) switch (_context45.prev = _context45.next) {
              case 0:
                return _context45.abrupt("return", AesCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context45.stop();
            }
          }, _callee45);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee46() {
          return _regeneratorRuntime().wrap(function _callee46$(_context46) {
            while (1) switch (_context46.prev = _context46.next) {
              case 0:
                return _context46.abrupt("return", AesCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context46.stop();
            }
          }, _callee46);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(AesEcbProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        AesCrypto.checkCryptoKey(key);
      }
    }]);
    return AesEcbProvider;
  }(AesEcbProvider$1);
  var AesGcmProvider = function (_AesGcmProvider$) {
    _inherits(AesGcmProvider, _AesGcmProvider$);
    var _super113 = _createSuper(AesGcmProvider);
    function AesGcmProvider() {
      _classCallCheck(this, AesGcmProvider);
      return _super113.apply(this, arguments);
    }
    _createClass(AesGcmProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee47() {
          return _regeneratorRuntime().wrap(function _callee47$(_context47) {
            while (1) switch (_context47.prev = _context47.next) {
              case 0:
                return _context47.abrupt("return", AesCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context47.stop();
            }
          }, _callee47);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee48() {
          return _regeneratorRuntime().wrap(function _callee48$(_context48) {
            while (1) switch (_context48.prev = _context48.next) {
              case 0:
                return _context48.abrupt("return", AesCrypto.encrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context48.stop();
            }
          }, _callee48);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee49() {
          return _regeneratorRuntime().wrap(function _callee49$(_context49) {
            while (1) switch (_context49.prev = _context49.next) {
              case 0:
                return _context49.abrupt("return", AesCrypto.decrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context49.stop();
            }
          }, _callee49);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee50() {
          return _regeneratorRuntime().wrap(function _callee50$(_context50) {
            while (1) switch (_context50.prev = _context50.next) {
              case 0:
                return _context50.abrupt("return", AesCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context50.stop();
            }
          }, _callee50);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee51() {
          return _regeneratorRuntime().wrap(function _callee51$(_context51) {
            while (1) switch (_context51.prev = _context51.next) {
              case 0:
                return _context51.abrupt("return", AesCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context51.stop();
            }
          }, _callee51);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(AesGcmProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        AesCrypto.checkCryptoKey(key);
      }
    }]);
    return AesGcmProvider;
  }(AesGcmProvider$1);
  var AesCtrProvider = function (_AesCtrProvider$) {
    _inherits(AesCtrProvider, _AesCtrProvider$);
    var _super114 = _createSuper(AesCtrProvider);
    function AesCtrProvider() {
      _classCallCheck(this, AesCtrProvider);
      return _super114.apply(this, arguments);
    }
    _createClass(AesCtrProvider, [{
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee52() {
          var result;
          return _regeneratorRuntime().wrap(function _callee52$(_context52) {
            while (1) switch (_context52.prev = _context52.next) {
              case 0:
                result = new AES_CTR(key.raw, BufferSourceConverter.toUint8Array(algorithm.counter)).encrypt(BufferSourceConverter.toUint8Array(data));
                return _context52.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 2:
              case "end":
                return _context52.stop();
            }
          }, _callee52);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee53() {
          var result;
          return _regeneratorRuntime().wrap(function _callee53$(_context53) {
            while (1) switch (_context53.prev = _context53.next) {
              case 0:
                result = new AES_CTR(key.raw, BufferSourceConverter.toUint8Array(algorithm.counter)).decrypt(BufferSourceConverter.toUint8Array(data));
                return _context53.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 2:
              case "end":
                return _context53.stop();
            }
          }, _callee53);
        }));
      }
    }, {
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee54() {
          return _regeneratorRuntime().wrap(function _callee54$(_context54) {
            while (1) switch (_context54.prev = _context54.next) {
              case 0:
                return _context54.abrupt("return", AesCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context54.stop();
            }
          }, _callee54);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee55() {
          return _regeneratorRuntime().wrap(function _callee55$(_context55) {
            while (1) switch (_context55.prev = _context55.next) {
              case 0:
                return _context55.abrupt("return", AesCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context55.stop();
            }
          }, _callee55);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee56() {
          return _regeneratorRuntime().wrap(function _callee56$(_context56) {
            while (1) switch (_context56.prev = _context56.next) {
              case 0:
                return _context56.abrupt("return", AesCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context56.stop();
            }
          }, _callee56);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(AesCtrProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        AesCrypto.checkCryptoKey(key);
      }
    }]);
    return AesCtrProvider;
  }(AesCtrProvider$1);
  var AesKwProvider = function (_AesKwProvider$) {
    _inherits(AesKwProvider, _AesKwProvider$);
    var _super115 = _createSuper(AesKwProvider);
    function AesKwProvider() {
      _classCallCheck(this, AesKwProvider);
      return _super115.apply(this, arguments);
    }
    _createClass(AesKwProvider, [{
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee57() {
          return _regeneratorRuntime().wrap(function _callee57$(_context57) {
            while (1) switch (_context57.prev = _context57.next) {
              case 0:
                throw new Error("Method not implemented.");
              case 1:
              case "end":
                return _context57.stop();
            }
          }, _callee57);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee58() {
          return _regeneratorRuntime().wrap(function _callee58$(_context58) {
            while (1) switch (_context58.prev = _context58.next) {
              case 0:
                throw new Error("Method not implemented.");
              case 1:
              case "end":
                return _context58.stop();
            }
          }, _callee58);
        }));
      }
    }, {
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee59() {
          return _regeneratorRuntime().wrap(function _callee59$(_context59) {
            while (1) switch (_context59.prev = _context59.next) {
              case 0:
                throw new Error("Method not implemented.");
              case 1:
              case "end":
                return _context59.stop();
            }
          }, _callee59);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee60() {
          return _regeneratorRuntime().wrap(function _callee60$(_context60) {
            while (1) switch (_context60.prev = _context60.next) {
              case 0:
                throw new Error("Method not implemented.");
              case 1:
              case "end":
                return _context60.stop();
            }
          }, _callee60);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee61() {
          return _regeneratorRuntime().wrap(function _callee61$(_context61) {
            while (1) switch (_context61.prev = _context61.next) {
              case 0:
                throw new Error("Method not implemented.");
              case 1:
              case "end":
                return _context61.stop();
            }
          }, _callee61);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(AesKwProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        AesCrypto.checkCryptoKey(key);
      }
    }]);
    return AesKwProvider;
  }(AesKwProvider$1);
  var RsaCryptoKey = function (_CryptoKey2) {
    _inherits(RsaCryptoKey, _CryptoKey2);
    var _super116 = _createSuper(RsaCryptoKey);
    function RsaCryptoKey(algorithm, extractable, type, usages, data) {
      var _this92;
      _classCallCheck(this, RsaCryptoKey);
      _this92 = _super116.call(this, algorithm, extractable, type, usages);
      _this92.data = data;
      return _this92;
    }
    return _createClass(RsaCryptoKey);
  }(CryptoKey);
  var RsaCrypto = function () {
    function RsaCrypto() {
      _classCallCheck(this, RsaCrypto);
    }
    _createClass(RsaCrypto, null, [{
      key: "checkCryptoKey",
      value: function checkCryptoKey(key) {
        if (!(key instanceof RsaCryptoKey)) {
          throw new TypeError("key: Is not RsaCryptoKey");
        }
      }
    }, {
      key: "generateKey",
      value: function generateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee62() {
          var _this93 = this;
          var alg, keys, crypto, pkcs8, privateKey, spki, publicKey;
          return _regeneratorRuntime().wrap(function _callee62$(_context62) {
            while (1) switch (_context62.prev = _context62.next) {
              case 0:
                alg = {
                  name: "RSA-PSS",
                  hash: "SHA-256",
                  publicExponent: algorithm.publicExponent,
                  modulusLength: algorithm.modulusLength
                };
                _context62.next = 3;
                return exports.nativeSubtle.generateKey(alg, true, ["sign", "verify"]);
              case 3:
                keys = _context62.sent;
                crypto = new Crypto();
                _context62.next = 7;
                return crypto.subtle.exportKey("pkcs8", keys.privateKey);
              case 7:
                pkcs8 = _context62.sent;
                _context62.next = 10;
                return crypto.subtle.importKey("pkcs8", pkcs8, algorithm, extractable, keyUsages.filter(function (o) {
                  return _this93.privateUsages.includes(o);
                }));
              case 10:
                privateKey = _context62.sent;
                _context62.next = 13;
                return crypto.subtle.exportKey("spki", keys.publicKey);
              case 13:
                spki = _context62.sent;
                _context62.next = 16;
                return crypto.subtle.importKey("spki", spki, algorithm, true, keyUsages.filter(function (o) {
                  return _this93.publicUsages.includes(o);
                }));
              case 16:
                publicKey = _context62.sent;
                return _context62.abrupt("return", {
                  privateKey: privateKey,
                  publicKey: publicKey
                });
              case 18:
              case "end":
                return _context62.stop();
            }
          }, _callee62);
        }));
      }
    }, {
      key: "exportKey",
      value: function exportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee63() {
          return _regeneratorRuntime().wrap(function _callee63$(_context63) {
            while (1) switch (_context63.prev = _context63.next) {
              case 0:
                _context63.t0 = format;
                _context63.next = _context63.t0 === "pkcs8" ? 3 : _context63.t0 === "spki" ? 4 : _context63.t0 === "jwk" ? 5 : 6;
                break;
              case 3:
                return _context63.abrupt("return", this.exportPkcs8Key(key));
              case 4:
                return _context63.abrupt("return", this.exportSpkiKey(key));
              case 5:
                return _context63.abrupt("return", this.exportJwkKey(key));
              case 6:
                throw new OperationError("format: Must be 'jwk', 'pkcs8' or 'spki'");
              case 7:
              case "end":
                return _context63.stop();
            }
          }, _callee63, this);
        }));
      }
    }, {
      key: "importKey",
      value: function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee64() {
          var asmKey, key;
          return _regeneratorRuntime().wrap(function _callee64$(_context64) {
            while (1) switch (_context64.prev = _context64.next) {
              case 0:
                _context64.t0 = format;
                _context64.next = _context64.t0 === "pkcs8" ? 3 : _context64.t0 === "spki" ? 5 : _context64.t0 === "jwk" ? 7 : 9;
                break;
              case 3:
                asmKey = this.importPkcs8Key(keyData);
                return _context64.abrupt("break", 10);
              case 5:
                asmKey = this.importSpkiKey(keyData);
                return _context64.abrupt("break", 10);
              case 7:
                asmKey = this.importJwkKey(keyData);
                return _context64.abrupt("break", 10);
              case 9:
                throw new OperationError("format: Must be 'jwk', 'pkcs8' or 'spki'");
              case 10:
                key = new RsaCryptoKey(Object.assign({
                  publicExponent: asmKey[1][1] === 1 ? asmKey[1].slice(1) : asmKey[1].slice(3),
                  modulusLength: asmKey[0].byteLength << 3
                }, algorithm), extractable, asmKey.length === 2 ? "public" : "private", keyUsages, asmKey);
                return _context64.abrupt("return", key);
              case 12:
              case "end":
                return _context64.stop();
            }
          }, _callee64, this);
        }));
      }
    }, {
      key: "randomNonZeroValues",
      value: function randomNonZeroValues(data) {
        data = exports.nativeCrypto.getRandomValues(data);
        return data.map(function (n) {
          while (!n) {
            n = exports.nativeCrypto.getRandomValues(new Uint8Array(1))[0];
          }
          return n;
        });
      }
    }, {
      key: "exportPkcs8Key",
      value: function exportPkcs8Key(key) {
        var keyInfo = new index$1.PrivateKeyInfo();
        keyInfo.privateKeyAlgorithm.algorithm = "1.2.840.113549.1.1.1";
        keyInfo.privateKeyAlgorithm.parameters = null;
        keyInfo.privateKey = AsnConvert.serialize(this.exportAsmKey(key.data));
        return AsnConvert.serialize(keyInfo);
      }
    }, {
      key: "importPkcs8Key",
      value: function importPkcs8Key(data) {
        var keyInfo = AsnConvert.parse(data, index$1.PrivateKeyInfo);
        var privateKey = AsnConvert.parse(keyInfo.privateKey, index$1.RsaPrivateKey);
        return this.importAsmKey(privateKey);
      }
    }, {
      key: "importSpkiKey",
      value: function importSpkiKey(data) {
        var keyInfo = AsnConvert.parse(data, index$1.PublicKeyInfo);
        var publicKey = AsnConvert.parse(keyInfo.publicKey, index$1.RsaPublicKey);
        return this.importAsmKey(publicKey);
      }
    }, {
      key: "exportSpkiKey",
      value: function exportSpkiKey(key) {
        var publicKey = new index$1.RsaPublicKey();
        publicKey.modulus = key.data[0].buffer;
        publicKey.publicExponent = key.data[1][1] === 1 ? key.data[1].buffer.slice(1) : key.data[1].buffer.slice(3);
        var keyInfo = new index$1.PublicKeyInfo();
        keyInfo.publicKeyAlgorithm.algorithm = "1.2.840.113549.1.1.1";
        keyInfo.publicKeyAlgorithm.parameters = null;
        keyInfo.publicKey = AsnConvert.serialize(publicKey);
        return AsnConvert.serialize(keyInfo);
      }
    }, {
      key: "importJwkKey",
      value: function importJwkKey(data) {
        var key;
        if (data.d) {
          key = JsonParser.fromJSON(data, {
            targetSchema: index$1.RsaPrivateKey
          });
        } else {
          key = JsonParser.fromJSON(data, {
            targetSchema: index$1.RsaPublicKey
          });
        }
        return this.importAsmKey(key);
      }
    }, {
      key: "exportJwkKey",
      value: function exportJwkKey(key) {
        var asnKey = this.exportAsmKey(key.data);
        var jwk = JsonSerializer.toJSON(asnKey);
        jwk.ext = true;
        jwk.key_ops = key.usages;
        jwk.kty = "RSA";
        jwk.alg = this.getJwkAlgorithm(key.algorithm);
        return jwk;
      }
    }, {
      key: "getJwkAlgorithm",
      value: function getJwkAlgorithm(algorithm) {
        switch (algorithm.name.toUpperCase()) {
          case "RSA-OAEP":
            var mdSize = /(\d+)$/.exec(algorithm.hash.name)[1];
            return "RSA-OAEP".concat(mdSize !== "1" ? "-".concat(mdSize) : "");
          case "RSASSA-PKCS1-V1_5":
            return "RS".concat(/(\d+)$/.exec(algorithm.hash.name)[1]);
          case "RSA-PSS":
            return "PS".concat(/(\d+)$/.exec(algorithm.hash.name)[1]);
          case "RSAES-PKCS1-V1_5":
            return "PS1";
          default:
            throw new OperationError("algorithm: Is not recognized");
        }
      }
    }, {
      key: "exportAsmKey",
      value: function exportAsmKey(asmKey) {
        var key;
        if (asmKey.length > 2) {
          var privateKey = new index$1.RsaPrivateKey();
          privateKey.privateExponent = asmKey[2].buffer;
          privateKey.prime1 = asmKey[3].buffer;
          privateKey.prime2 = asmKey[4].buffer;
          privateKey.exponent1 = asmKey[5].buffer;
          privateKey.exponent2 = asmKey[6].buffer;
          privateKey.coefficient = asmKey[7].buffer;
          key = privateKey;
        } else {
          key = new index$1.RsaPublicKey();
        }
        key.modulus = asmKey[0].buffer;
        key.publicExponent = asmKey[1][1] === 1 ? asmKey[1].buffer.slice(1) : asmKey[1].buffer.slice(3);
        return key;
      }
    }, {
      key: "importAsmKey",
      value: function importAsmKey(key) {
        var expPadding = new Uint8Array(4 - key.publicExponent.byteLength);
        var asmKey = [new Uint8Array(key.modulus), concat(expPadding, new Uint8Array(key.publicExponent))];
        if (key instanceof index$1.RsaPrivateKey) {
          asmKey.push(new Uint8Array(key.privateExponent));
          asmKey.push(new Uint8Array(key.prime1));
          asmKey.push(new Uint8Array(key.prime2));
          asmKey.push(new Uint8Array(key.exponent1));
          asmKey.push(new Uint8Array(key.exponent2));
          asmKey.push(new Uint8Array(key.coefficient));
        }
        return asmKey;
      }
    }]);
    return RsaCrypto;
  }();
  RsaCrypto.RsaSsa = "RSASSA-PKCS1-v1_5";
  RsaCrypto.RsaPss = "RSA-PSS";
  RsaCrypto.RsaOaep = "RSA-OAEP";
  RsaCrypto.privateUsages = ["sign", "decrypt", "unwrapKey"];
  RsaCrypto.publicUsages = ["verify", "encrypt", "wrapKey"];
  var ShaCrypto = function () {
    function ShaCrypto() {
      _classCallCheck(this, ShaCrypto);
    }
    _createClass(ShaCrypto, null, [{
      key: "getDigest",
      value: function getDigest(name) {
        switch (name) {
          case "SHA-1":
            return new Sha1();
          case "SHA-256":
            return new Sha256();
          case "SHA-512":
            return new Sha512();
          default:
            throw new AlgorithmError("keyAlgorithm.hash: Is not recognized");
        }
      }
    }, {
      key: "digest",
      value: function digest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee65() {
          var mech, result;
          return _regeneratorRuntime().wrap(function _callee65$(_context65) {
            while (1) switch (_context65.prev = _context65.next) {
              case 0:
                mech = this.getDigest(algorithm.name);
                result = mech.process(BufferSourceConverter.toUint8Array(data)).finish().result;
                return _context65.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 3:
              case "end":
                return _context65.stop();
            }
          }, _callee65, this);
        }));
      }
    }]);
    return ShaCrypto;
  }();
  var RsaOaepProvider = function (_RsaOaepProvider$) {
    _inherits(RsaOaepProvider, _RsaOaepProvider$);
    var _super117 = _createSuper(RsaOaepProvider);
    function RsaOaepProvider() {
      _classCallCheck(this, RsaOaepProvider);
      return _super117.apply(this, arguments);
    }
    _createClass(RsaOaepProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee66() {
          return _regeneratorRuntime().wrap(function _callee66$(_context66) {
            while (1) switch (_context66.prev = _context66.next) {
              case 0:
                return _context66.abrupt("return", RsaCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context66.stop();
            }
          }, _callee66);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee67() {
          return _regeneratorRuntime().wrap(function _callee67$(_context67) {
            while (1) switch (_context67.prev = _context67.next) {
              case 0:
                return _context67.abrupt("return", RsaCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context67.stop();
            }
          }, _callee67);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee68() {
          return _regeneratorRuntime().wrap(function _callee68$(_context68) {
            while (1) switch (_context68.prev = _context68.next) {
              case 0:
                return _context68.abrupt("return", RsaCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context68.stop();
            }
          }, _callee68);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee69() {
          return _regeneratorRuntime().wrap(function _callee69$(_context69) {
            while (1) switch (_context69.prev = _context69.next) {
              case 0:
                return _context69.abrupt("return", this.cipher(algorithm, key, data));
              case 1:
              case "end":
                return _context69.stop();
            }
          }, _callee69, this);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee70() {
          return _regeneratorRuntime().wrap(function _callee70$(_context70) {
            while (1) switch (_context70.prev = _context70.next) {
              case 0:
                return _context70.abrupt("return", this.cipher(algorithm, key, data));
              case 1:
              case "end":
                return _context70.stop();
            }
          }, _callee70, this);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(RsaOaepProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        RsaCrypto.checkCryptoKey(key);
      }
    }, {
      key: "cipher",
      value: function cipher(algorithm, key, data) {
        var digest = ShaCrypto.getDigest(key.algorithm.hash.name);
        var label;
        if (algorithm.label) {
          label = BufferSourceConverter.toUint8Array(algorithm.label);
        }
        var cipher = new RSA_OAEP(key.data, digest, label);
        var res;
        var u8Data = BufferSourceConverter.toUint8Array(data);
        if (key.type === "public") {
          res = cipher.encrypt(u8Data);
        } else {
          res = cipher.decrypt(u8Data);
        }
        return BufferSourceConverter.toArrayBuffer(res);
      }
    }]);
    return RsaOaepProvider;
  }(RsaOaepProvider$1);
  var RsaPssProvider = function (_RsaPssProvider$) {
    _inherits(RsaPssProvider, _RsaPssProvider$);
    var _super118 = _createSuper(RsaPssProvider);
    function RsaPssProvider() {
      _classCallCheck(this, RsaPssProvider);
      return _super118.apply(this, arguments);
    }
    _createClass(RsaPssProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee71() {
          return _regeneratorRuntime().wrap(function _callee71$(_context71) {
            while (1) switch (_context71.prev = _context71.next) {
              case 0:
                return _context71.abrupt("return", RsaCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context71.stop();
            }
          }, _callee71);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee72() {
          return _regeneratorRuntime().wrap(function _callee72$(_context72) {
            while (1) switch (_context72.prev = _context72.next) {
              case 0:
                return _context72.abrupt("return", RsaCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context72.stop();
            }
          }, _callee72);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee73() {
          return _regeneratorRuntime().wrap(function _callee73$(_context73) {
            while (1) switch (_context73.prev = _context73.next) {
              case 0:
                return _context73.abrupt("return", RsaCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context73.stop();
            }
          }, _callee73);
        }));
      }
    }, {
      key: "onSign",
      value: function onSign(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee74() {
          var rsa, result;
          return _regeneratorRuntime().wrap(function _callee74$(_context74) {
            while (1) switch (_context74.prev = _context74.next) {
              case 0:
                rsa = new RSA_PSS(key.data, ShaCrypto.getDigest(key.algorithm.hash.name), algorithm.saltLength);
                result = rsa.sign(BufferSourceConverter.toUint8Array(data));
                return _context74.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 3:
              case "end":
                return _context74.stop();
            }
          }, _callee74);
        }));
      }
    }, {
      key: "onVerify",
      value: function onVerify(algorithm, key, signature, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee75() {
          var rsa;
          return _regeneratorRuntime().wrap(function _callee75$(_context75) {
            while (1) switch (_context75.prev = _context75.next) {
              case 0:
                rsa = new RSA_PSS(key.data, ShaCrypto.getDigest(key.algorithm.hash.name), algorithm.saltLength);
                _context75.prev = 1;
                rsa.verify(BufferSourceConverter.toUint8Array(signature), BufferSourceConverter.toUint8Array(data));
                _context75.next = 8;
                break;
              case 5:
                _context75.prev = 5;
                _context75.t0 = _context75["catch"](1);
                return _context75.abrupt("return", false);
              case 8:
                return _context75.abrupt("return", true);
              case 9:
              case "end":
                return _context75.stop();
            }
          }, _callee75, null, [[1, 5]]);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(RsaPssProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        RsaCrypto.checkCryptoKey(key);
      }
    }]);
    return RsaPssProvider;
  }(RsaPssProvider$1);
  var RsaSsaProvider = function (_RsaSsaProvider$) {
    _inherits(RsaSsaProvider, _RsaSsaProvider$);
    var _super119 = _createSuper(RsaSsaProvider);
    function RsaSsaProvider() {
      _classCallCheck(this, RsaSsaProvider);
      return _super119.apply(this, arguments);
    }
    _createClass(RsaSsaProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee76() {
          return _regeneratorRuntime().wrap(function _callee76$(_context76) {
            while (1) switch (_context76.prev = _context76.next) {
              case 0:
                return _context76.abrupt("return", RsaCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context76.stop();
            }
          }, _callee76);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee77() {
          return _regeneratorRuntime().wrap(function _callee77$(_context77) {
            while (1) switch (_context77.prev = _context77.next) {
              case 0:
                return _context77.abrupt("return", RsaCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context77.stop();
            }
          }, _callee77);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee78() {
          return _regeneratorRuntime().wrap(function _callee78$(_context78) {
            while (1) switch (_context78.prev = _context78.next) {
              case 0:
                return _context78.abrupt("return", RsaCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context78.stop();
            }
          }, _callee78);
        }));
      }
    }, {
      key: "onSign",
      value: function onSign(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee79() {
          var rsa, result;
          return _regeneratorRuntime().wrap(function _callee79$(_context79) {
            while (1) switch (_context79.prev = _context79.next) {
              case 0:
                rsa = new RSA_PKCS1_v1_5(key.data, ShaCrypto.getDigest(key.algorithm.hash.name));
                result = rsa.sign(BufferSourceConverter.toUint8Array(data));
                return _context79.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 3:
              case "end":
                return _context79.stop();
            }
          }, _callee79);
        }));
      }
    }, {
      key: "onVerify",
      value: function onVerify(algorithm, key, signature, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee80() {
          var rsa;
          return _regeneratorRuntime().wrap(function _callee80$(_context80) {
            while (1) switch (_context80.prev = _context80.next) {
              case 0:
                rsa = new RSA_PKCS1_v1_5(key.data, ShaCrypto.getDigest(key.algorithm.hash.name));
                _context80.prev = 1;
                rsa.verify(BufferSourceConverter.toUint8Array(signature), BufferSourceConverter.toUint8Array(data));
                _context80.next = 8;
                break;
              case 5:
                _context80.prev = 5;
                _context80.t0 = _context80["catch"](1);
                return _context80.abrupt("return", false);
              case 8:
                return _context80.abrupt("return", true);
              case 9:
              case "end":
                return _context80.stop();
            }
          }, _callee80, null, [[1, 5]]);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(RsaSsaProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        RsaCrypto.checkCryptoKey(key);
      }
    }]);
    return RsaSsaProvider;
  }(RsaSsaProvider$1);
  var RsaEsProvider = function (_ProviderCrypto8) {
    _inherits(RsaEsProvider, _ProviderCrypto8);
    var _super120 = _createSuper(RsaEsProvider);
    function RsaEsProvider() {
      var _this94;
      _classCallCheck(this, RsaEsProvider);
      _this94 = _super120.apply(this, arguments);
      _this94.name = "RSAES-PKCS1-v1_5";
      _this94.usages = {
        publicKey: ["encrypt", "wrapKey"],
        privateKey: ["decrypt", "unwrapKey"]
      };
      _this94.hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
      return _this94;
    }
    _createClass(RsaEsProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee81() {
          return _regeneratorRuntime().wrap(function _callee81$(_context81) {
            while (1) switch (_context81.prev = _context81.next) {
              case 0:
                return _context81.abrupt("return", RsaCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context81.stop();
            }
          }, _callee81);
        }));
      }
    }, {
      key: "checkGenerateKeyParams",
      value: function checkGenerateKeyParams(algorithm) {
        this.checkRequiredProperty(algorithm, "publicExponent");
        if (!(algorithm.publicExponent && algorithm.publicExponent instanceof Uint8Array)) {
          throw new TypeError("publicExponent: Missing or not a Uint8Array");
        }
        var publicExponent = Convert.ToBase64(algorithm.publicExponent);
        if (!(publicExponent === "Aw==" || publicExponent === "AQAB")) {
          throw new TypeError("publicExponent: Must be [3] or [1,0,1]");
        }
        this.checkRequiredProperty(algorithm, "modulusLength");
        switch (algorithm.modulusLength) {
          case 1024:
          case 2048:
          case 4096:
            break;
          default:
            throw new TypeError("modulusLength: Must be 1024, 2048, or 4096");
        }
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee82() {
          var EM, k, offset;
          return _regeneratorRuntime().wrap(function _callee82$(_context82) {
            while (1) switch (_context82.prev = _context82.next) {
              case 0:
                EM = new RSA(key.data).decrypt(new BigNumber(BufferSourceConverter.toUint8Array(data))).result;
                k = key.algorithm.modulusLength >> 3;
                if (!(data.byteLength !== k)) {
                  _context82.next = 4;
                  break;
                }
                throw new CryptoError("Decryption error. Encrypted message size doesn't match to key length");
              case 4:
                offset = 0;
                if (!(EM[offset++] || EM[offset++] !== 2)) {
                  _context82.next = 7;
                  break;
                }
                throw new CryptoError("Decryption error");
              case 7:
                if (!(EM[offset++] === 0)) {
                  _context82.next = 9;
                  break;
                }
                return _context82.abrupt("break", 10);
              case 9:
                if (offset < EM.length) {
                  _context82.next = 7;
                  break;
                }
              case 10:
                if (!(offset < 11)) {
                  _context82.next = 12;
                  break;
                }
                throw new CryptoError("Decryption error. PS is less than 8 octets.");
              case 12:
                if (!(offset === EM.length)) {
                  _context82.next = 14;
                  break;
                }
                throw new CryptoError("Decryption error. There is no octet with hexadecimal value 0x00 to separate PS from M");
              case 14:
                return _context82.abrupt("return", EM.buffer.slice(offset));
              case 15:
              case "end":
                return _context82.stop();
            }
          }, _callee82);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee83() {
          var k, psLen, PS, EM, result;
          return _regeneratorRuntime().wrap(function _callee83$(_context83) {
            while (1) switch (_context83.prev = _context83.next) {
              case 0:
                k = key.algorithm.modulusLength >> 3;
                if (!(data.byteLength > k - 11)) {
                  _context83.next = 3;
                  break;
                }
                throw new CryptoError("Message too long");
              case 3:
                psLen = k - data.byteLength - 3;
                PS = RsaCrypto.randomNonZeroValues(new Uint8Array(psLen));
                EM = new Uint8Array(k);
                EM[0] = 0;
                EM[1] = 2;
                EM.set(PS, 2);
                EM[2 + psLen] = 0;
                EM.set(new Uint8Array(data), 3 + psLen);
                result = new RSA(key.data).encrypt(new BigNumber(EM)).result;
                return _context83.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 13:
              case "end":
                return _context83.stop();
            }
          }, _callee83);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee84() {
          return _regeneratorRuntime().wrap(function _callee84$(_context84) {
            while (1) switch (_context84.prev = _context84.next) {
              case 0:
                return _context84.abrupt("return", RsaCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context84.stop();
            }
          }, _callee84);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee85() {
          var key;
          return _regeneratorRuntime().wrap(function _callee85$(_context85) {
            while (1) switch (_context85.prev = _context85.next) {
              case 0:
                _context85.next = 2;
                return RsaCrypto.importKey(format, keyData, Object.assign(Object.assign({}, algorithm), {
                  name: this.name
                }), extractable, keyUsages);
              case 2:
                key = _context85.sent;
                return _context85.abrupt("return", key);
              case 4:
              case "end":
                return _context85.stop();
            }
          }, _callee85, this);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(RsaEsProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        RsaCrypto.checkCryptoKey(key);
      }
    }, {
      key: "prepareSignData",
      value: function prepareSignData(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee86() {
          var crypto;
          return _regeneratorRuntime().wrap(function _callee86$(_context86) {
            while (1) switch (_context86.prev = _context86.next) {
              case 0:
                crypto = new Crypto();
                return _context86.abrupt("return", crypto.subtle.digest(algorithm.hash, data));
              case 2:
              case "end":
                return _context86.stop();
            }
          }, _callee86);
        }));
      }
    }]);
    return RsaEsProvider;
  }(ProviderCrypto);
  var namedOIDs = {
    "1.2.840.10045.3.1.7": "P-256",
    "P-256": "1.2.840.10045.3.1.7",
    "1.3.132.0.34": "P-384",
    "P-384": "1.3.132.0.34",
    "1.3.132.0.35": "P-521",
    "P-521": "1.3.132.0.35",
    "1.3.132.0.10": "K-256",
    "K-256": "1.3.132.0.10",
    "1.3.36.3.3.2.8.1.1.7": "brainpoolP256r1",
    "brainpoolP256r1": "1.3.36.3.3.2.8.1.1.7",
    "1.3.36.3.3.2.8.1.1.11": "brainpoolP384r1",
    "brainpoolP384r1": "1.3.36.3.3.2.8.1.1.11",
    "1.3.36.3.3.2.8.1.1.13": "brainpoolP512r1",
    "brainpoolP512r1": "1.3.36.3.3.2.8.1.1.13"
  };
  function getOidByNamedCurve$1(namedCurve) {
    var oid = namedOIDs[namedCurve];
    if (!oid) {
      throw new OperationError("Cannot convert WebCrypto named curve '".concat(namedCurve, "' to OID"));
    }
    return oid;
  }
  var EcCryptoKey = function (_CryptoKey3) {
    _inherits(EcCryptoKey, _CryptoKey3);
    var _super121 = _createSuper(EcCryptoKey);
    function EcCryptoKey(algorithm, extractable, type, usages, data) {
      var _this95;
      _classCallCheck(this, EcCryptoKey);
      _this95 = _super121.call(this, algorithm, extractable, type, usages);
      _this95.data = data;
      return _this95;
    }
    return _createClass(EcCryptoKey);
  }(CryptoKey);
  var EcCrypto = function () {
    function EcCrypto() {
      _classCallCheck(this, EcCrypto);
    }
    _createClass(EcCrypto, null, [{
      key: "checkLib",
      value: function checkLib() {
        if (typeof elliptic__namespace === "undefined") {
          throw new OperationError("Cannot implement EC mechanism. Add 'https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js' script to your project");
        }
      }
    }, {
      key: "generateKey",
      value: function generateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee87() {
          var _this96 = this;
          var key, ecKey, prvKey, pubKey;
          return _regeneratorRuntime().wrap(function _callee87$(_context87) {
            while (1) switch (_context87.prev = _context87.next) {
              case 0:
                this.checkLib();
                key = this.initEcKey(algorithm.namedCurve);
                ecKey = key.genKeyPair();
                ecKey.getPublic();
                prvKey = new EcCryptoKey(Object.assign({}, algorithm), extractable, "private", keyUsages.filter(function (usage) {
                  return ~_this96.privateUsages.indexOf(usage);
                }), ecKey);
                pubKey = new EcCryptoKey(Object.assign({}, algorithm), true, "public", keyUsages.filter(function (usage) {
                  return ~_this96.publicUsages.indexOf(usage);
                }), ecKey);
                return _context87.abrupt("return", {
                  privateKey: prvKey,
                  publicKey: pubKey
                });
              case 7:
              case "end":
                return _context87.stop();
            }
          }, _callee87, this);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key) {
        if (!(key instanceof EcCryptoKey)) {
          throw new TypeError("key: Is not EcCryptoKey");
        }
      }
    }, {
      key: "concat",
      value: function concat() {
        for (var _len37 = arguments.length, buf = new Array(_len37), _key39 = 0; _key39 < _len37; _key39++) {
          buf[_key39] = arguments[_key39];
        }
        var res = new Uint8Array(buf.map(function (item) {
          return item.length;
        }).reduce(function (prev, cur) {
          return prev + cur;
        }));
        var offset = 0;
        buf.forEach(function (item, index) {
          for (var i = 0; i < item.length; i++) {
            res[offset + i] = item[i];
          }
          offset += item.length;
        });
        return res;
      }
    }, {
      key: "exportKey",
      value: function exportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee88() {
          return _regeneratorRuntime().wrap(function _callee88$(_context88) {
            while (1) switch (_context88.prev = _context88.next) {
              case 0:
                this.checkLib();
                _context88.t0 = format;
                _context88.next = _context88.t0 === "pkcs8" ? 4 : _context88.t0 === "spki" ? 5 : _context88.t0 === "jwk" ? 6 : _context88.t0 === "raw" ? 7 : 8;
                break;
              case 4:
                return _context88.abrupt("return", this.exportPkcs8Key(key));
              case 5:
                return _context88.abrupt("return", this.exportSpkiKey(key));
              case 6:
                return _context88.abrupt("return", this.exportJwkKey(key));
              case 7:
                return _context88.abrupt("return", new Uint8Array(key.data.getPublic("der")).buffer);
              case 8:
                throw new OperationError("format: Must be 'jwk', 'raw, 'pkcs8' or 'spki'");
              case 9:
              case "end":
                return _context88.stop();
            }
          }, _callee88, this);
        }));
      }
    }, {
      key: "importKey",
      value: function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee89() {
          var ecKey, key;
          return _regeneratorRuntime().wrap(function _callee89$(_context89) {
            while (1) switch (_context89.prev = _context89.next) {
              case 0:
                this.checkLib();
                _context89.t0 = format;
                _context89.next = _context89.t0 === "pkcs8" ? 4 : _context89.t0 === "spki" ? 6 : _context89.t0 === "raw" ? 8 : _context89.t0 === "jwk" ? 10 : 12;
                break;
              case 4:
                ecKey = this.importPkcs8Key(keyData, algorithm.namedCurve);
                return _context89.abrupt("break", 13);
              case 6:
                ecKey = this.importSpkiKey(keyData, algorithm.namedCurve);
                return _context89.abrupt("break", 13);
              case 8:
                ecKey = this.importEcKey(new index$1.EcPublicKey(keyData), algorithm.namedCurve);
                return _context89.abrupt("break", 13);
              case 10:
                ecKey = this.importJwkKey(keyData);
                return _context89.abrupt("break", 13);
              case 12:
                throw new OperationError("format: Must be 'jwk', 'raw', 'pkcs8' or 'spki'");
              case 13:
                key = new EcCryptoKey(Object.assign({}, algorithm), extractable, ecKey.priv ? "private" : "public", keyUsages, ecKey);
                return _context89.abrupt("return", key);
              case 15:
              case "end":
                return _context89.stop();
            }
          }, _callee89, this);
        }));
      }
    }, {
      key: "getNamedCurve",
      value: function getNamedCurve(wcNamedCurve) {
        var crv = wcNamedCurve.toUpperCase();
        var res = "";
        if (["P-256", "P-384", "P-521"].indexOf(crv) > -1) {
          res = crv.replace("-", "").toLowerCase();
        } else if (crv === "K-256") {
          res = "secp256k1";
        } else if (["brainpoolP256r1", "brainpoolP384r1", "brainpoolP512r1"].includes(wcNamedCurve)) {
          res = wcNamedCurve;
        } else {
          throw new OperationError("Unsupported named curve '".concat(wcNamedCurve, "'"));
        }
        return res;
      }
    }, {
      key: "initEcKey",
      value: function initEcKey(namedCurve) {
        return elliptic__namespace.ec(this.getNamedCurve(namedCurve));
      }
    }, {
      key: "exportPkcs8Key",
      value: function exportPkcs8Key(key) {
        var keyInfo = new index$1.PrivateKeyInfo();
        keyInfo.privateKeyAlgorithm.algorithm = this.ASN_ALGORITHM;
        keyInfo.privateKeyAlgorithm.parameters = AsnConvert.serialize(new index$1.ObjectIdentifier(getOidByNamedCurve$1(key.algorithm.namedCurve)));
        keyInfo.privateKey = AsnConvert.serialize(this.exportEcKey(key));
        return AsnConvert.serialize(keyInfo);
      }
    }, {
      key: "importPkcs8Key",
      value: function importPkcs8Key(data, namedCurve) {
        var keyInfo = AsnConvert.parse(data, index$1.PrivateKeyInfo);
        var privateKey = AsnConvert.parse(keyInfo.privateKey, index$1.EcPrivateKey);
        return this.importEcKey(privateKey, namedCurve);
      }
    }, {
      key: "importSpkiKey",
      value: function importSpkiKey(data, namedCurve) {
        var keyInfo = AsnConvert.parse(data, index$1.PublicKeyInfo);
        var publicKey = new index$1.EcPublicKey(keyInfo.publicKey);
        return this.importEcKey(publicKey, namedCurve);
      }
    }, {
      key: "exportSpkiKey",
      value: function exportSpkiKey(key) {
        var publicKey = new index$1.EcPublicKey(new Uint8Array(key.data.getPublic("der")).buffer);
        var keyInfo = new index$1.PublicKeyInfo();
        keyInfo.publicKeyAlgorithm.algorithm = this.ASN_ALGORITHM;
        keyInfo.publicKeyAlgorithm.parameters = AsnConvert.serialize(new index$1.ObjectIdentifier(getOidByNamedCurve$1(key.algorithm.namedCurve)));
        keyInfo.publicKey = publicKey.value;
        return AsnConvert.serialize(keyInfo);
      }
    }, {
      key: "importJwkKey",
      value: function importJwkKey(data) {
        var key;
        if (data.d) {
          key = JsonParser.fromJSON(data, {
            targetSchema: index$1.EcPrivateKey
          });
        } else {
          key = JsonParser.fromJSON(data, {
            targetSchema: index$1.EcPublicKey
          });
        }
        return this.importEcKey(key, data.crv);
      }
    }, {
      key: "exportJwkKey",
      value: function exportJwkKey(key) {
        var asnKey = this.exportEcKey(key);
        var jwk = JsonSerializer.toJSON(asnKey);
        jwk.ext = true;
        jwk.key_ops = key.usages;
        jwk.crv = key.algorithm.namedCurve;
        jwk.kty = "EC";
        return jwk;
      }
    }, {
      key: "exportEcKey",
      value: function exportEcKey(ecKey) {
        if (ecKey.type === "private") {
          var privateKey = new index$1.EcPrivateKey();
          var point = new Uint8Array(ecKey.data.getPrivate("der").toArray());
          var pointPad = new Uint8Array(this.getPointSize(ecKey.algorithm.namedCurve) - point.length);
          privateKey.privateKey = concat(pointPad, point);
          privateKey.publicKey = new Uint8Array(ecKey.data.getPublic("der"));
          return privateKey;
        } else if (ecKey.data.pub) {
          return new index$1.EcPublicKey(new Uint8Array(ecKey.data.getPublic("der")).buffer);
        } else {
          throw new Error("Cannot get private or public key");
        }
      }
    }, {
      key: "importEcKey",
      value: function importEcKey(key, namedCurve) {
        var ecKey = this.initEcKey(namedCurve);
        if (key instanceof index$1.EcPublicKey) {
          return ecKey.keyFromPublic(new Uint8Array(key.value));
        }
        return ecKey.keyFromPrivate(new Uint8Array(key.privateKey));
      }
    }, {
      key: "getPointSize",
      value: function getPointSize(namedCurve) {
        switch (namedCurve) {
          case "P-256":
          case "K-256":
            return 32;
          case "P-384":
            return 48;
          case "P-521":
            return 66;
        }
        throw new Error("namedCurve: Is not recognized");
      }
    }]);
    return EcCrypto;
  }();
  EcCrypto.privateUsages = ["sign", "deriveKey", "deriveBits"];
  EcCrypto.publicUsages = ["verify"];
  EcCrypto.ASN_ALGORITHM = "1.2.840.10045.2.1";
  var EcdhProvider = function (_EcdhProvider$2) {
    _inherits(EcdhProvider, _EcdhProvider$2);
    var _super122 = _createSuper(EcdhProvider);
    function EcdhProvider() {
      var _this97;
      _classCallCheck(this, EcdhProvider);
      _this97 = _super122.apply(this, arguments);
      _this97.namedCurves = ["P-256", "P-384", "P-521", "K-256", "brainpoolP256r1", "brainpoolP384r1", "brainpoolP512r1"];
      return _this97;
    }
    _createClass(EcdhProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee90() {
          return _regeneratorRuntime().wrap(function _callee90$(_context90) {
            while (1) switch (_context90.prev = _context90.next) {
              case 0:
                return _context90.abrupt("return", EcCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context90.stop();
            }
          }, _callee90);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee91() {
          return _regeneratorRuntime().wrap(function _callee91$(_context91) {
            while (1) switch (_context91.prev = _context91.next) {
              case 0:
                return _context91.abrupt("return", EcCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context91.stop();
            }
          }, _callee91);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee92() {
          return _regeneratorRuntime().wrap(function _callee92$(_context92) {
            while (1) switch (_context92.prev = _context92.next) {
              case 0:
                return _context92.abrupt("return", EcCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context92.stop();
            }
          }, _callee92);
        }));
      }
    }, {
      key: "onDeriveBits",
      value: function onDeriveBits(algorithm, baseKey, length) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee93() {
          var shared, array, len, buf;
          return _regeneratorRuntime().wrap(function _callee93$(_context93) {
            while (1) switch (_context93.prev = _context93.next) {
              case 0:
                EcCrypto.checkLib();
                shared = baseKey.data.derive(algorithm.public.data.getPublic());
                array = new Uint8Array(shared.toArray());
                len = array.length;
                len = len > 32 ? len > 48 ? 66 : 48 : 32;
                if (array.length < len) {
                  array = EcCrypto.concat(new Uint8Array(len - array.length), array);
                }
                buf = array.slice(0, length / 8).buffer;
                return _context93.abrupt("return", buf);
              case 8:
              case "end":
                return _context93.stop();
            }
          }, _callee93);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(EcdhProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        EcCrypto.checkCryptoKey(key);
      }
    }]);
    return EcdhProvider;
  }(EcdhProvider$1);
  function b2a(buffer) {
    var buf = new Uint8Array(buffer);
    var res = [];
    for (var i = 0; i < buf.length; i++) {
      res.push(buf[i]);
    }
    return res;
  }
  var EcdsaProvider = function (_EcdsaProvider$) {
    _inherits(EcdsaProvider, _EcdsaProvider$);
    var _super123 = _createSuper(EcdsaProvider);
    function EcdsaProvider() {
      var _this98;
      _classCallCheck(this, EcdsaProvider);
      _this98 = _super123.apply(this, arguments);
      _this98.hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512", "SHA3-256", "SHA3-384", "SHA3-512"];
      _this98.namedCurves = ["P-256", "P-384", "P-521", "K-256", "brainpoolP256r1", "brainpoolP384r1", "brainpoolP512r1"];
      return _this98;
    }
    _createClass(EcdsaProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee94() {
          return _regeneratorRuntime().wrap(function _callee94$(_context94) {
            while (1) switch (_context94.prev = _context94.next) {
              case 0:
                return _context94.abrupt("return", EcCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context94.stop();
            }
          }, _callee94);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee95() {
          return _regeneratorRuntime().wrap(function _callee95$(_context95) {
            while (1) switch (_context95.prev = _context95.next) {
              case 0:
                return _context95.abrupt("return", EcCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context95.stop();
            }
          }, _callee95);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee96() {
          return _regeneratorRuntime().wrap(function _callee96$(_context96) {
            while (1) switch (_context96.prev = _context96.next) {
              case 0:
                return _context96.abrupt("return", EcCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context96.stop();
            }
          }, _callee96);
        }));
      }
    }, {
      key: "onSign",
      value: function onSign(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee97() {
          var crypto, array, hash, signature, asnSignature;
          return _regeneratorRuntime().wrap(function _callee97$(_context97) {
            while (1) switch (_context97.prev = _context97.next) {
              case 0:
                EcCrypto.checkLib();
                crypto = new Crypto();
                _context97.next = 4;
                return crypto.subtle.digest(algorithm.hash, data);
              case 4:
                hash = _context97.sent;
                array = b2a(hash);
                _context97.next = 8;
                return key.data.sign(array);
              case 8:
                signature = _context97.sent;
                asnSignature = new index$1.EcDsaSignature();
                asnSignature.r = new Uint8Array(signature.r.toArray()).buffer;
                asnSignature.s = new Uint8Array(signature.s.toArray()).buffer;
                return _context97.abrupt("return", asnSignature.toWebCryptoSignature());
              case 13:
              case "end":
                return _context97.stop();
            }
          }, _callee97);
        }));
      }
    }, {
      key: "onVerify",
      value: function onVerify(algorithm, key, signature, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee98() {
          var crypto, sig, hashedData, array;
          return _regeneratorRuntime().wrap(function _callee98$(_context98) {
            while (1) switch (_context98.prev = _context98.next) {
              case 0:
                EcCrypto.checkLib();
                crypto = new Crypto();
                sig = {
                  r: new Uint8Array(signature.slice(0, signature.byteLength / 2)),
                  s: new Uint8Array(signature.slice(signature.byteLength / 2))
                };
                _context98.next = 5;
                return crypto.subtle.digest(algorithm.hash, data);
              case 5:
                hashedData = _context98.sent;
                array = b2a(hashedData);
                return _context98.abrupt("return", key.data.verify(array, sig));
              case 8:
              case "end":
                return _context98.stop();
            }
          }, _callee98);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(EcdsaProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        EcCrypto.checkCryptoKey(key);
      }
    }]);
    return EcdsaProvider;
  }(EcdsaProvider$1);
  var edOIDs = (_edOIDs = {}, _defineProperty(_edOIDs, index$1.idEd448, "Ed448"), _defineProperty(_edOIDs, "ed448", index$1.idEd448), _defineProperty(_edOIDs, index$1.idX448, "X448"), _defineProperty(_edOIDs, "x448", index$1.idX448), _defineProperty(_edOIDs, index$1.idEd25519, "Ed25519"), _defineProperty(_edOIDs, "ed25519", index$1.idEd25519), _defineProperty(_edOIDs, index$1.idX25519, "X25519"), _defineProperty(_edOIDs, "x25519", index$1.idX25519), _edOIDs);
  function getOidByNamedCurve(namedCurve) {
    var oid = edOIDs[namedCurve.toLowerCase()];
    if (!oid) {
      throw new OperationError("Cannot convert WebCrypto named curve '".concat(namedCurve, "' to OID"));
    }
    return oid;
  }
  var EdPrivateKey = function (_CryptoKey4) {
    _inherits(EdPrivateKey, _CryptoKey4);
    var _super124 = _createSuper(EdPrivateKey);
    function EdPrivateKey(algorithm, extractable, usages, data) {
      var _this99;
      _classCallCheck(this, EdPrivateKey);
      _this99 = _super124.call(this, algorithm, extractable, "private", usages);
      _this99.data = data;
      return _this99;
    }
    _createClass(EdPrivateKey, [{
      key: "toJSON",
      value: function toJSON() {
        var json = {
          kty: "OKP",
          crv: this.algorithm.namedCurve,
          key_ops: this.usages,
          ext: this.extractable
        };
        return Object.assign(json, {
          d: Convert.ToBase64Url(Convert.FromHex(/^ed/i.test(json.crv) ? this.data.getSecret("hex") : this.data.getPrivate("hex")))
        });
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(json) {
        if (!json.d) {
          throw new OperationError("Cannot get private data from JWK. Property 'd' is required");
        }
        if (!json.crv) {
          throw new OperationError("Cannot get named curve from JWK. Property 'crv' is required");
        }
        var hexPrivateKey = Convert.ToHex(Convert.FromBase64Url(json.d));
        {
          var eddsa = new elliptic__namespace.eddsa("ed25519");
          this.data = eddsa.keyFromSecret(hexPrivateKey);
        }
        return this;
      }
    }]);
    return EdPrivateKey;
  }(CryptoKey);
  var EdPublicKey = function (_CryptoKey5) {
    _inherits(EdPublicKey, _CryptoKey5);
    var _super125 = _createSuper(EdPublicKey);
    function EdPublicKey(algorithm, extractable, usages, data) {
      var _this100;
      _classCallCheck(this, EdPublicKey);
      _this100 = _super125.call(this, algorithm, extractable, "public", usages);
      _this100.data = data;
      return _this100;
    }
    _createClass(EdPublicKey, [{
      key: "toJSON",
      value: function toJSON() {
        var json = {
          kty: "OKP",
          crv: this.algorithm.namedCurve,
          key_ops: this.usages,
          ext: this.extractable
        };
        return Object.assign(json, {
          x: Convert.ToBase64Url(Convert.FromHex(this.data.getPublic("hex")))
        });
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(json) {
        if (!json.crv) {
          throw new OperationError("Cannot get named curve from JWK. Property 'crv' is required");
        }
        if (!json.x) {
          throw new OperationError("Cannot get property from JWK. Property 'x' is required");
        }
        var hexPublicKey = Convert.ToHex(Convert.FromBase64Url(json.x));
        if (/^ed/i.test(json.crv)) {
          var eddsa = new elliptic__namespace.eddsa(json.crv.toLowerCase());
          this.data = eddsa.keyFromPublic(hexPublicKey, "hex");
        } else {
          var ecdhEs = elliptic__namespace.ec(json.crv.replace(/^x/i, "curve"));
          this.data = ecdhEs.keyFromPublic(hexPublicKey, "hex");
        }
        return this;
      }
    }]);
    return EdPublicKey;
  }(CryptoKey);
  var EdCrypto = function () {
    function EdCrypto() {
      _classCallCheck(this, EdCrypto);
    }
    _createClass(EdCrypto, null, [{
      key: "checkLib",
      value: function checkLib() {
        if (typeof elliptic__namespace === "undefined") {
          throw new OperationError("Cannot implement EC mechanism. Add 'https://peculiarventures.github.io/pv-webcrypto-tests/src/elliptic.js' script to your project");
        }
      }
    }, {
      key: "concat",
      value: function concat() {
        for (var _len38 = arguments.length, buf = new Array(_len38), _key40 = 0; _key40 < _len38; _key40++) {
          buf[_key40] = arguments[_key40];
        }
        var res = new Uint8Array(buf.map(function (item) {
          return item.length;
        }).reduce(function (prev, cur) {
          return prev + cur;
        }));
        var offset = 0;
        buf.forEach(function (item, index) {
          for (var i = 0; i < item.length; i++) {
            res[offset + i] = item[i];
          }
          offset += item.length;
        });
        return res;
      }
    }, {
      key: "generateKey",
      value: function generateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee99() {
          var _this101 = this;
          var curve, edKey, raw, eddsa, prvKey, pubKey;
          return _regeneratorRuntime().wrap(function _callee99$(_context99) {
            while (1) switch (_context99.prev = _context99.next) {
              case 0:
                this.checkLib();
                curve = "ed25519";
                raw = exports.nativeCrypto.getRandomValues(new Uint8Array(32));
                eddsa = new elliptic__namespace.eddsa(curve);
                edKey = eddsa.keyFromSecret(raw);
                prvKey = new EdPrivateKey(algorithm, extractable, keyUsages.filter(function (usage) {
                  return _this101.privateKeyUsages.indexOf(usage) !== -1;
                }), edKey);
                pubKey = new EdPublicKey(algorithm, true, keyUsages.filter(function (usage) {
                  return _this101.publicKeyUsages.indexOf(usage) !== -1;
                }), edKey);
                return _context99.abrupt("return", {
                  privateKey: prvKey,
                  publicKey: pubKey
                });
              case 8:
              case "end":
                return _context99.stop();
            }
          }, _callee99, this);
        }));
      }
    }, {
      key: "sign",
      value: function sign(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee100() {
          var array, signature;
          return _regeneratorRuntime().wrap(function _callee100$(_context100) {
            while (1) switch (_context100.prev = _context100.next) {
              case 0:
                this.checkLib();
                array = b2a(data);
                signature = key.data.sign(array).toHex();
                return _context100.abrupt("return", Convert.FromHex(signature));
              case 4:
              case "end":
                return _context100.stop();
            }
          }, _callee100, this);
        }));
      }
    }, {
      key: "verify",
      value: function verify(algorithm, key, signature, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee101() {
          var array, ok;
          return _regeneratorRuntime().wrap(function _callee101$(_context101) {
            while (1) switch (_context101.prev = _context101.next) {
              case 0:
                this.checkLib();
                array = b2a(data);
                ok = key.data.verify(array, Convert.ToHex(signature));
                return _context101.abrupt("return", ok);
              case 4:
              case "end":
                return _context101.stop();
            }
          }, _callee101, this);
        }));
      }
    }, {
      key: "deriveBits",
      value: function deriveBits(algorithm, baseKey, length) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee102() {
          var key, ecdh, privateKey, publicHex, publicKey, shared, array, len, buf;
          return _regeneratorRuntime().wrap(function _callee102$(_context102) {
            while (1) switch (_context102.prev = _context102.next) {
              case 0:
                this.checkLib();
                key = new Uint8Array(Convert.FromHex(baseKey.data.getSecret("hex")));
                ecdh = new elliptic__namespace.ec("curve25519");
                privateKey = ecdh.keyFromPrivate(Convert.ToHex(key), "hex");
                publicHex = algorithm.public.data.getPublic("hex");
                new Uint8Array(Convert.FromHex(publicHex));
                publicKey = algorithm.public.data.getPublic();
                shared = privateKey.derive(publicKey);
                array = new Uint8Array(shared.toArray());
                len = array.length;
                len = len > 32 ? len > 48 ? 66 : 48 : 32;
                if (array.length < len) {
                  array = EdCrypto.concat(new Uint8Array(len - array.length), array);
                }
                buf = array.slice(0, length / 8).buffer;
                return _context102.abrupt("return", buf);
              case 14:
              case "end":
                return _context102.stop();
            }
          }, _callee102, this);
        }));
      }
    }, {
      key: "exportKey",
      value: function exportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee103() {
          var raw, keyInfo, _raw, _keyInfo;
          return _regeneratorRuntime().wrap(function _callee103$(_context103) {
            while (1) switch (_context103.prev = _context103.next) {
              case 0:
                this.checkLib();
                _context103.t0 = format.toLowerCase();
                _context103.next = _context103.t0 === "jwk" ? 4 : _context103.t0 === "pkcs8" ? 5 : _context103.t0 === "spki" ? 10 : _context103.t0 === "raw" ? 15 : 16;
                break;
              case 4:
                return _context103.abrupt("return", JsonSerializer.toJSON(key));
              case 5:
                raw = Convert.FromHex(key.data.getSecret("hex"));
                keyInfo = new index$1.PrivateKeyInfo();
                keyInfo.privateKeyAlgorithm.algorithm = getOidByNamedCurve(key.algorithm.namedCurve);
                keyInfo.privateKey = AsnConvert.serialize(new OctetString(raw));
                return _context103.abrupt("return", AsnConvert.serialize(keyInfo));
              case 10:
                _raw = Convert.FromHex(key.data.getPublic("hex"));
                _keyInfo = new index$1.PublicKeyInfo();
                _keyInfo.publicKeyAlgorithm.algorithm = getOidByNamedCurve(key.algorithm.namedCurve);
                _keyInfo.publicKey = _raw;
                return _context103.abrupt("return", AsnConvert.serialize(_keyInfo));
              case 15:
                return _context103.abrupt("return", Convert.FromHex(key.data.getPublic("hex")));
              case 16:
                throw new OperationError("format: Must be 'jwk', 'raw', pkcs8' or 'spki'");
              case 17:
              case "end":
                return _context103.stop();
            }
          }, _callee103, this);
        }));
      }
    }, {
      key: "importKey",
      value: function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee104() {
          var jwk, asnKey, keyInfo, _keyInfo2, _asnKey;
          return _regeneratorRuntime().wrap(function _callee104$(_context104) {
            while (1) switch (_context104.prev = _context104.next) {
              case 0:
                this.checkLib();
                _context104.t0 = format.toLowerCase();
                _context104.next = _context104.t0 === "jwk" ? 4 : _context104.t0 === "raw" ? 13 : _context104.t0 === "spki" ? 14 : _context104.t0 === "pkcs8" ? 16 : 19;
                break;
              case 4:
                jwk = keyData;
                if (!jwk.d) {
                  _context104.next = 10;
                  break;
                }
                asnKey = JsonParser.fromJSON(keyData, {
                  targetSchema: index$1.CurvePrivateKey
                });
                return _context104.abrupt("return", this.importPrivateKey(asnKey, algorithm, extractable, keyUsages));
              case 10:
                if (jwk.x) {
                  _context104.next = 12;
                  break;
                }
                throw new TypeError("keyData: Cannot get required 'x' field");
              case 12:
                return _context104.abrupt("return", this.importPublicKey(Convert.FromBase64Url(jwk.x), algorithm, extractable, keyUsages));
              case 13:
                return _context104.abrupt("return", this.importPublicKey(keyData, algorithm, extractable, keyUsages));
              case 14:
                keyInfo = AsnConvert.parse(new Uint8Array(keyData), index$1.PublicKeyInfo);
                return _context104.abrupt("return", this.importPublicKey(keyInfo.publicKey, algorithm, extractable, keyUsages));
              case 16:
                _keyInfo2 = AsnConvert.parse(new Uint8Array(keyData), index$1.PrivateKeyInfo);
                _asnKey = AsnConvert.parse(_keyInfo2.privateKey, index$1.CurvePrivateKey);
                return _context104.abrupt("return", this.importPrivateKey(_asnKey, algorithm, extractable, keyUsages));
              case 19:
                throw new OperationError("format: Must be 'jwk', 'raw', 'pkcs8' or 'spki'");
              case 20:
              case "end":
                return _context104.stop();
            }
          }, _callee104, this);
        }));
      }
    }, {
      key: "importPrivateKey",
      value: function importPrivateKey(asnKey, algorithm, extractable, keyUsages) {
        var key = new EdPrivateKey(Object.assign({}, algorithm), extractable, keyUsages, null);
        key.fromJSON({
          crv: algorithm.namedCurve,
          d: Convert.ToBase64Url(asnKey.d)
        });
        return key;
      }
    }, {
      key: "importPublicKey",
      value: function importPublicKey(asnKey, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee105() {
          var key;
          return _regeneratorRuntime().wrap(function _callee105$(_context105) {
            while (1) switch (_context105.prev = _context105.next) {
              case 0:
                key = new EdPublicKey(Object.assign({}, algorithm), extractable, keyUsages, null);
                key.fromJSON({
                  crv: algorithm.namedCurve,
                  x: Convert.ToBase64Url(asnKey)
                });
                return _context105.abrupt("return", key);
              case 3:
              case "end":
                return _context105.stop();
            }
          }, _callee105);
        }));
      }
    }]);
    return EdCrypto;
  }();
  EdCrypto.publicKeyUsages = ["verify"];
  EdCrypto.privateKeyUsages = ["sign", "deriveKey", "deriveBits"];
  var EdDsaProvider = function (_EdDsaProvider$) {
    _inherits(EdDsaProvider, _EdDsaProvider$);
    var _super126 = _createSuper(EdDsaProvider);
    function EdDsaProvider() {
      var _this102;
      _classCallCheck(this, EdDsaProvider);
      _this102 = _super126.apply(this, arguments);
      _this102.namedCurves = ["Ed25519"];
      return _this102;
    }
    _createClass(EdDsaProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee106() {
          var keys;
          return _regeneratorRuntime().wrap(function _callee106$(_context106) {
            while (1) switch (_context106.prev = _context106.next) {
              case 0:
                _context106.next = 2;
                return EdCrypto.generateKey({
                  name: this.name,
                  namedCurve: algorithm.namedCurve.replace(/^ed/i, "Ed")
                }, extractable, keyUsages);
              case 2:
                keys = _context106.sent;
                return _context106.abrupt("return", keys);
              case 4:
              case "end":
                return _context106.stop();
            }
          }, _callee106, this);
        }));
      }
    }, {
      key: "onSign",
      value: function onSign(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee107() {
          return _regeneratorRuntime().wrap(function _callee107$(_context107) {
            while (1) switch (_context107.prev = _context107.next) {
              case 0:
                return _context107.abrupt("return", EdCrypto.sign(algorithm, key, new Uint8Array(data)));
              case 1:
              case "end":
                return _context107.stop();
            }
          }, _callee107);
        }));
      }
    }, {
      key: "onVerify",
      value: function onVerify(algorithm, key, signature, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee108() {
          return _regeneratorRuntime().wrap(function _callee108$(_context108) {
            while (1) switch (_context108.prev = _context108.next) {
              case 0:
                return _context108.abrupt("return", EdCrypto.verify(algorithm, key, new Uint8Array(signature), new Uint8Array(data)));
              case 1:
              case "end":
                return _context108.stop();
            }
          }, _callee108);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee109() {
          return _regeneratorRuntime().wrap(function _callee109$(_context109) {
            while (1) switch (_context109.prev = _context109.next) {
              case 0:
                return _context109.abrupt("return", EdCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context109.stop();
            }
          }, _callee109);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee110() {
          var key;
          return _regeneratorRuntime().wrap(function _callee110$(_context110) {
            while (1) switch (_context110.prev = _context110.next) {
              case 0:
                _context110.next = 2;
                return EdCrypto.importKey(format, keyData, Object.assign(Object.assign({}, algorithm), {
                  name: this.name
                }), extractable, keyUsages);
              case 2:
                key = _context110.sent;
                return _context110.abrupt("return", key);
              case 4:
              case "end":
                return _context110.stop();
            }
          }, _callee110, this);
        }));
      }
    }]);
    return EdDsaProvider;
  }(EdDsaProvider$1);
  var EcdhEsProvider = function (_EcdhEsProvider$) {
    _inherits(EcdhEsProvider, _EcdhEsProvider$);
    var _super127 = _createSuper(EcdhEsProvider);
    function EcdhEsProvider() {
      var _this103;
      _classCallCheck(this, EcdhEsProvider);
      _this103 = _super127.apply(this, arguments);
      _this103.namedCurves = ["X25519"];
      return _this103;
    }
    _createClass(EcdhEsProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee111() {
          var keys;
          return _regeneratorRuntime().wrap(function _callee111$(_context111) {
            while (1) switch (_context111.prev = _context111.next) {
              case 0:
                _context111.next = 2;
                return EdCrypto.generateKey({
                  name: this.name,
                  namedCurve: algorithm.namedCurve.replace(/^x/i, "X")
                }, extractable, keyUsages);
              case 2:
                keys = _context111.sent;
                return _context111.abrupt("return", keys);
              case 4:
              case "end":
                return _context111.stop();
            }
          }, _callee111, this);
        }));
      }
    }, {
      key: "onDeriveBits",
      value: function onDeriveBits(algorithm, baseKey, length) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee112() {
          var bits;
          return _regeneratorRuntime().wrap(function _callee112$(_context112) {
            while (1) switch (_context112.prev = _context112.next) {
              case 0:
                _context112.next = 2;
                return EdCrypto.deriveBits(Object.assign(Object.assign({}, algorithm), {
                  public: algorithm.public
                }), baseKey, length);
              case 2:
                bits = _context112.sent;
                return _context112.abrupt("return", bits);
              case 4:
              case "end":
                return _context112.stop();
            }
          }, _callee112);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee113() {
          return _regeneratorRuntime().wrap(function _callee113$(_context113) {
            while (1) switch (_context113.prev = _context113.next) {
              case 0:
                return _context113.abrupt("return", EdCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context113.stop();
            }
          }, _callee113);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee114() {
          var key;
          return _regeneratorRuntime().wrap(function _callee114$(_context114) {
            while (1) switch (_context114.prev = _context114.next) {
              case 0:
                _context114.next = 2;
                return EdCrypto.importKey(format, keyData, Object.assign(Object.assign({}, algorithm), {
                  name: this.name
                }), extractable, keyUsages);
              case 2:
                key = _context114.sent;
                return _context114.abrupt("return", key);
              case 4:
              case "end":
                return _context114.stop();
            }
          }, _callee114, this);
        }));
      }
    }]);
    return EcdhEsProvider;
  }(EcdhEsProvider$1);
  var Sha1Provider = function (_ProviderCrypto9) {
    _inherits(Sha1Provider, _ProviderCrypto9);
    var _super128 = _createSuper(Sha1Provider);
    function Sha1Provider() {
      var _this104;
      _classCallCheck(this, Sha1Provider);
      _this104 = _super128.apply(this, arguments);
      _this104.name = "SHA-1";
      _this104.usages = [];
      return _this104;
    }
    _createClass(Sha1Provider, [{
      key: "onDigest",
      value: function onDigest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee115() {
          return _regeneratorRuntime().wrap(function _callee115$(_context115) {
            while (1) switch (_context115.prev = _context115.next) {
              case 0:
                return _context115.abrupt("return", ShaCrypto.digest(algorithm, data));
              case 1:
              case "end":
                return _context115.stop();
            }
          }, _callee115);
        }));
      }
    }]);
    return Sha1Provider;
  }(ProviderCrypto);
  var Sha256Provider = function (_Sha1Provider) {
    _inherits(Sha256Provider, _Sha1Provider);
    var _super129 = _createSuper(Sha256Provider);
    function Sha256Provider() {
      var _this105;
      _classCallCheck(this, Sha256Provider);
      _this105 = _super129.apply(this, arguments);
      _this105.name = "SHA-256";
      return _this105;
    }
    return _createClass(Sha256Provider);
  }(Sha1Provider);
  var Sha512Provider = function (_Sha1Provider2) {
    _inherits(Sha512Provider, _Sha1Provider2);
    var _super130 = _createSuper(Sha512Provider);
    function Sha512Provider() {
      var _this106;
      _classCallCheck(this, Sha512Provider);
      _this106 = _super130.apply(this, arguments);
      _this106.name = "SHA-512";
      return _this106;
    }
    return _createClass(Sha512Provider);
  }(Sha1Provider);
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  var sha3 = {};
  var binary = {};
  var int = {};
  (function (exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function imulShim(a, b) {
      var ah = a >>> 16 & 0xffff,
        al = a & 0xffff;
      var bh = b >>> 16 & 0xffff,
        bl = b & 0xffff;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    }
    exports.mul = Math.imul || imulShim;
    function add(a, b) {
      return a + b | 0;
    }
    exports.add = add;
    function sub(a, b) {
      return a - b | 0;
    }
    exports.sub = sub;
    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }
    exports.rotl = rotl;
    function rotr(x, n) {
      return x << 32 - n | x >>> n;
    }
    exports.rotr = rotr;
    function isIntegerShim(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
    }
    exports.isInteger = Number.isInteger || isIntegerShim;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.isSafeInteger = function (n) {
      return exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER;
    };
  })(int);
  Object.defineProperty(binary, "__esModule", {
    value: true
  });
  var int_1 = int;
  function readInt16BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
  }
  binary.readInt16BE = readInt16BE;
  function readUint16BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
  }
  binary.readUint16BE = readUint16BE;
  function readInt16LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
  }
  binary.readInt16LE = readInt16LE;
  function readUint16LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return (array[offset + 1] << 8 | array[offset]) >>> 0;
  }
  binary.readUint16LE = readUint16LE;
  function writeUint16BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(2);
    }
    if (offset === void 0) {
      offset = 0;
    }
    out[offset + 0] = value >>> 8;
    out[offset + 1] = value >>> 0;
    return out;
  }
  binary.writeUint16BE = writeUint16BE;
  binary.writeInt16BE = writeUint16BE;
  function writeUint16LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(2);
    }
    if (offset === void 0) {
      offset = 0;
    }
    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    return out;
  }
  binary.writeUint16LE = writeUint16LE;
  binary.writeInt16LE = writeUint16LE;
  function readInt32BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
  }
  binary.readInt32BE = readInt32BE;
  function readUint32BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
  }
  binary.readUint32BE = readUint32BE;
  function readInt32LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
  }
  binary.readInt32LE = readInt32LE;
  function readUint32LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
  }
  binary.readUint32LE = readUint32LE;
  function writeUint32BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }
    if (offset === void 0) {
      offset = 0;
    }
    out[offset + 0] = value >>> 24;
    out[offset + 1] = value >>> 16;
    out[offset + 2] = value >>> 8;
    out[offset + 3] = value >>> 0;
    return out;
  }
  binary.writeUint32BE = writeUint32BE;
  binary.writeInt32BE = writeUint32BE;
  function writeUint32LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }
    if (offset === void 0) {
      offset = 0;
    }
    out[offset + 0] = value >>> 0;
    out[offset + 1] = value >>> 8;
    out[offset + 2] = value >>> 16;
    out[offset + 3] = value >>> 24;
    return out;
  }
  binary.writeUint32LE = writeUint32LE;
  binary.writeInt32LE = writeUint32LE;
  function readInt64BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var hi = readInt32BE(array, offset);
    var lo = readInt32BE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
  }
  binary.readInt64BE = readInt64BE;
  function readUint64BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var hi = readUint32BE(array, offset);
    var lo = readUint32BE(array, offset + 4);
    return hi * 0x100000000 + lo;
  }
  binary.readUint64BE = readUint64BE;
  function readInt64LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var lo = readInt32LE(array, offset);
    var hi = readInt32LE(array, offset + 4);
    return hi * 0x100000000 + lo - (lo >> 31) * 0x100000000;
  }
  binary.readInt64LE = readInt64LE;
  function readUint64LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var lo = readUint32LE(array, offset);
    var hi = readUint32LE(array, offset + 4);
    return hi * 0x100000000 + lo;
  }
  binary.readUint64LE = readUint64LE;
  function writeUint64BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }
    if (offset === void 0) {
      offset = 0;
    }
    writeUint32BE(value / 0x100000000 >>> 0, out, offset);
    writeUint32BE(value >>> 0, out, offset + 4);
    return out;
  }
  binary.writeUint64BE = writeUint64BE;
  binary.writeInt64BE = writeUint64BE;
  function writeUint64LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }
    if (offset === void 0) {
      offset = 0;
    }
    writeUint32LE(value >>> 0, out, offset);
    writeUint32LE(value / 0x100000000 >>> 0, out, offset + 4);
    return out;
  }
  binary.writeUint64LE = writeUint64LE;
  binary.writeInt64LE = writeUint64LE;
  function readUintBE(bitLength, array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    if (bitLength % 8 !== 0) {
      throw new Error("readUintBE supports only bitLengths divisible by 8");
    }
    if (bitLength / 8 > array.length - offset) {
      throw new Error("readUintBE: array is too short for the given bitLength");
    }
    var result = 0;
    var mul = 1;
    for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
      result += array[i] * mul;
      mul *= 256;
    }
    return result;
  }
  binary.readUintBE = readUintBE;
  function readUintLE(bitLength, array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    if (bitLength % 8 !== 0) {
      throw new Error("readUintLE supports only bitLengths divisible by 8");
    }
    if (bitLength / 8 > array.length - offset) {
      throw new Error("readUintLE: array is too short for the given bitLength");
    }
    var result = 0;
    var mul = 1;
    for (var i = offset; i < offset + bitLength / 8; i++) {
      result += array[i] * mul;
      mul *= 256;
    }
    return result;
  }
  binary.readUintLE = readUintLE;
  function writeUintBE(bitLength, value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(bitLength / 8);
    }
    if (offset === void 0) {
      offset = 0;
    }
    if (bitLength % 8 !== 0) {
      throw new Error("writeUintBE supports only bitLengths divisible by 8");
    }
    if (!int_1.isSafeInteger(value)) {
      throw new Error("writeUintBE value must be an integer");
    }
    var div = 1;
    for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
      out[i] = value / div & 0xff;
      div *= 256;
    }
    return out;
  }
  binary.writeUintBE = writeUintBE;
  function writeUintLE(bitLength, value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(bitLength / 8);
    }
    if (offset === void 0) {
      offset = 0;
    }
    if (bitLength % 8 !== 0) {
      throw new Error("writeUintLE supports only bitLengths divisible by 8");
    }
    if (!int_1.isSafeInteger(value)) {
      throw new Error("writeUintLE value must be an integer");
    }
    var div = 1;
    for (var i = offset; i < offset + bitLength / 8; i++) {
      out[i] = value / div & 0xff;
      div *= 256;
    }
    return out;
  }
  binary.writeUintLE = writeUintLE;
  function readFloat32BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset);
  }
  binary.readFloat32BE = readFloat32BE;
  function readFloat32LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat32(offset, true);
  }
  binary.readFloat32LE = readFloat32LE;
  function readFloat64BE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset);
  }
  binary.readFloat64BE = readFloat64BE;
  function readFloat64LE(array, offset) {
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getFloat64(offset, true);
  }
  binary.readFloat64LE = readFloat64LE;
  function writeFloat32BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value);
    return out;
  }
  binary.writeFloat32BE = writeFloat32BE;
  function writeFloat32LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(4);
    }
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat32(offset, value, true);
    return out;
  }
  binary.writeFloat32LE = writeFloat32LE;
  function writeFloat64BE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value);
    return out;
  }
  binary.writeFloat64BE = writeFloat64BE;
  function writeFloat64LE(value, out, offset) {
    if (out === void 0) {
      out = new Uint8Array(8);
    }
    if (offset === void 0) {
      offset = 0;
    }
    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setFloat64(offset, value, true);
    return out;
  }
  binary.writeFloat64LE = writeFloat64LE;
  var wipe$1 = {};
  Object.defineProperty(wipe$1, "__esModule", {
    value: true
  });
  function wipe(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = 0;
    }
    return array;
  }
  wipe$1.wipe = wipe;
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
      return _extendStatics(d, b);
    };
    return function (d, b) {
      _extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(sha3, "__esModule", {
    value: true
  });
  var binary_1 = binary;
  var wipe_1 = wipe$1;
  var Keccak = function () {
    function Keccak(capacity) {
      if (capacity === void 0) {
        capacity = 32;
      }
      this.capacity = capacity;
      this._sh = new Int32Array(25);
      this._sl = new Int32Array(25);
      this._state = new Uint8Array(200);
      this._pos = 0;
      this._finished = false;
      this.clean = this.reset;
      if (capacity <= 0 || capacity > 128) {
        throw new Error("SHA3: incorrect capacity");
      }
      this.blockSize = 200 - capacity;
    }
    Keccak.prototype.reset = function () {
      wipe_1.wipe(this._sh);
      wipe_1.wipe(this._sl);
      wipe_1.wipe(this._state);
      this._pos = 0;
      this._finished = false;
      return this;
    };
    Keccak.prototype.update = function (data) {
      if (this._finished) {
        throw new Error("SHA3: can't update because hash was finished");
      }
      for (var i = 0; i < data.length; i++) {
        this._state[this._pos++] ^= data[i];
        if (this._pos >= this.blockSize) {
          keccakf(this._sh, this._sl, this._state);
          this._pos = 0;
        }
      }
      return this;
    };
    Keccak.prototype._padAndPermute = function (paddingByte) {
      this._state[this._pos] ^= paddingByte;
      this._state[this.blockSize - 1] ^= 0x80;
      keccakf(this._sh, this._sl, this._state);
      this._finished = true;
      this._pos = 0;
    };
    Keccak.prototype._squeeze = function (dst) {
      if (!this._finished) {
        throw new Error("SHA3: squeezing before padAndPermute");
      }
      for (var i = 0; i < dst.length; i++) {
        if (this._pos === this.blockSize) {
          keccakf(this._sh, this._sl, this._state);
          this._pos = 0;
        }
        dst[i] = this._state[this._pos++];
      }
    };
    return Keccak;
  }();
  sha3.Keccak = Keccak;
  var SHA3 = function (_super) {
    __extends(SHA3, _super);
    function SHA3(digestLength) {
      if (digestLength === void 0) {
        digestLength = 32;
      }
      var _this = _super.call(this, digestLength * 2) || this;
      _this.digestLength = digestLength;
      return _this;
    }
    SHA3.prototype.finish = function (dst) {
      if (!this._finished) {
        this._padAndPermute(0x06);
      } else {
        this._pos = 0;
      }
      this._squeeze(dst);
      return this;
    };
    SHA3.prototype.digest = function () {
      var out = new Uint8Array(this.digestLength);
      this.finish(out);
      return out;
    };
    SHA3.prototype.saveState = function () {
      if (this._finished) {
        throw new Error("SHA3: cannot save finished state");
      }
      return new Uint8Array(this._state.subarray(0, this._pos));
    };
    SHA3.prototype.restoreState = function (savedState) {
      this._state.set(savedState);
      this._pos = savedState.length;
      this._finished = false;
      return this;
    };
    SHA3.prototype.cleanSavedState = function (savedState) {
      wipe_1.wipe(savedState);
    };
    return SHA3;
  }(Keccak);
  sha3.SHA3 = SHA3;
  var SHA3224 = function (_super) {
    __extends(SHA3224, _super);
    function SHA3224() {
      return _super.call(this, 224 / 8) || this;
    }
    return SHA3224;
  }(SHA3);
  sha3.SHA3224 = SHA3224;
  var SHA3256 = function (_super) {
    __extends(SHA3256, _super);
    function SHA3256() {
      return _super.call(this, 256 / 8) || this;
    }
    return SHA3256;
  }(SHA3);
  sha3.SHA3256 = SHA3256;
  var SHA3384 = function (_super) {
    __extends(SHA3384, _super);
    function SHA3384() {
      return _super.call(this, 384 / 8) || this;
    }
    return SHA3384;
  }(SHA3);
  sha3.SHA3384 = SHA3384;
  var SHA3512 = function (_super) {
    __extends(SHA3512, _super);
    function SHA3512() {
      return _super.call(this, 512 / 8) || this;
    }
    return SHA3512;
  }(SHA3);
  sha3.SHA3512 = SHA3512;
  function hash(digestLength, data) {
    var h = new SHA3(digestLength);
    h.update(data);
    var digest = h.digest();
    h.clean();
    return digest;
  }
  sha3.hash = hash;
  sha3.hash224 = function (data) {
    return hash(224 / 8, data);
  };
  var hash256 = sha3.hash256 = function (data) {
    return hash(256 / 8, data);
  };
  var hash384 = sha3.hash384 = function (data) {
    return hash(384 / 8, data);
  };
  var hash512 = sha3.hash512 = function (data) {
    return hash(512 / 8, data);
  };
  var SHAKE = function (_super) {
    __extends(SHAKE, _super);
    function SHAKE(bitSize) {
      var _this = _super.call(this, bitSize / 8 * 2) || this;
      _this.bitSize = bitSize;
      return _this;
    }
    SHAKE.prototype.stream = function (dst) {
      if (!this._finished) {
        this._padAndPermute(0x1f);
      }
      this._squeeze(dst);
    };
    return SHAKE;
  }(Keccak);
  sha3.SHAKE = SHAKE;
  var SHAKE128 = function (_super) {
    __extends(SHAKE128, _super);
    function SHAKE128() {
      return _super.call(this, 128) || this;
    }
    return SHAKE128;
  }(SHAKE);
  var SHAKE128_1 = sha3.SHAKE128 = SHAKE128;
  var SHAKE256 = function (_super) {
    __extends(SHAKE256, _super);
    function SHAKE256() {
      return _super.call(this, 256) || this;
    }
    return SHAKE256;
  }(SHAKE);
  var SHAKE256_1 = sha3.SHAKE256 = SHAKE256;
  var RNDC_HI = new Int32Array([0x00000000, 0x00000000, 0x80000000, 0x80000000, 0x00000000, 0x00000000, 0x80000000, 0x80000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000, 0x80000000, 0x00000000, 0x80000000, 0x80000000, 0x80000000, 0x00000000, 0x80000000]);
  var RNDC_LO = new Int32Array([0x00000001, 0x00008082, 0x0000808a, 0x80008000, 0x0000808b, 0x80000001, 0x80008081, 0x00008009, 0x0000008a, 0x00000088, 0x80008009, 0x8000000a, 0x8000808b, 0x0000008b, 0x00008089, 0x00008003, 0x00008002, 0x00000080, 0x0000800a, 0x8000000a, 0x80008081, 0x00008080, 0x80000001, 0x80008008]);
  function keccakf(sh, sl, buf) {
    var bch0, bch1, bch2, bch3, bch4;
    var bcl0, bcl1, bcl2, bcl3, bcl4;
    var th, tl;
    for (var i = 0; i < 25; i++) {
      sl[i] = binary_1.readUint32LE(buf, i * 8);
      sh[i] = binary_1.readUint32LE(buf, i * 8 + 4);
    }
    for (var r = 0; r < 24; r++) {
      bch0 = sh[0] ^ sh[5] ^ sh[10] ^ sh[15] ^ sh[20];
      bch1 = sh[1] ^ sh[6] ^ sh[11] ^ sh[16] ^ sh[21];
      bch2 = sh[2] ^ sh[7] ^ sh[12] ^ sh[17] ^ sh[22];
      bch3 = sh[3] ^ sh[8] ^ sh[13] ^ sh[18] ^ sh[23];
      bch4 = sh[4] ^ sh[9] ^ sh[14] ^ sh[19] ^ sh[24];
      bcl0 = sl[0] ^ sl[5] ^ sl[10] ^ sl[15] ^ sl[20];
      bcl1 = sl[1] ^ sl[6] ^ sl[11] ^ sl[16] ^ sl[21];
      bcl2 = sl[2] ^ sl[7] ^ sl[12] ^ sl[17] ^ sl[22];
      bcl3 = sl[3] ^ sl[8] ^ sl[13] ^ sl[18] ^ sl[23];
      bcl4 = sl[4] ^ sl[9] ^ sl[14] ^ sl[19] ^ sl[24];
      th = bch4 ^ (bch1 << 1 | bcl1 >>> 32 - 1);
      tl = bcl4 ^ (bcl1 << 1 | bch1 >>> 32 - 1);
      sh[0] ^= th;
      sh[5] ^= th;
      sh[10] ^= th;
      sh[15] ^= th;
      sh[20] ^= th;
      sl[0] ^= tl;
      sl[5] ^= tl;
      sl[10] ^= tl;
      sl[15] ^= tl;
      sl[20] ^= tl;
      th = bch0 ^ (bch2 << 1 | bcl2 >>> 32 - 1);
      tl = bcl0 ^ (bcl2 << 1 | bch2 >>> 32 - 1);
      sh[1] ^= th;
      sh[6] ^= th;
      sh[11] ^= th;
      sh[16] ^= th;
      sh[21] ^= th;
      sl[1] ^= tl;
      sl[6] ^= tl;
      sl[11] ^= tl;
      sl[16] ^= tl;
      sl[21] ^= tl;
      th = bch1 ^ (bch3 << 1 | bcl3 >>> 32 - 1);
      tl = bcl1 ^ (bcl3 << 1 | bch3 >>> 32 - 1);
      sh[2] ^= th;
      sh[7] ^= th;
      sh[12] ^= th;
      sh[17] ^= th;
      sh[22] ^= th;
      sl[2] ^= tl;
      sl[7] ^= tl;
      sl[12] ^= tl;
      sl[17] ^= tl;
      sl[22] ^= tl;
      th = bch2 ^ (bch4 << 1 | bcl4 >>> 32 - 1);
      tl = bcl2 ^ (bcl4 << 1 | bch4 >>> 32 - 1);
      sh[3] ^= th;
      sl[3] ^= tl;
      sh[8] ^= th;
      sl[8] ^= tl;
      sh[13] ^= th;
      sl[13] ^= tl;
      sh[18] ^= th;
      sl[18] ^= tl;
      sh[23] ^= th;
      sl[23] ^= tl;
      th = bch3 ^ (bch0 << 1 | bcl0 >>> 32 - 1);
      tl = bcl3 ^ (bcl0 << 1 | bch0 >>> 32 - 1);
      sh[4] ^= th;
      sh[9] ^= th;
      sh[14] ^= th;
      sh[19] ^= th;
      sh[24] ^= th;
      sl[4] ^= tl;
      sl[9] ^= tl;
      sl[14] ^= tl;
      sl[19] ^= tl;
      sl[24] ^= tl;
      th = sh[1];
      tl = sl[1];
      bch0 = sh[10];
      bcl0 = sl[10];
      sh[10] = th << 1 | tl >>> 32 - 1;
      sl[10] = tl << 1 | th >>> 32 - 1;
      th = bch0;
      tl = bcl0;
      bch0 = sh[7];
      bcl0 = sl[7];
      sh[7] = th << 3 | tl >>> 32 - 3;
      sl[7] = tl << 3 | th >>> 32 - 3;
      th = bch0;
      tl = bcl0;
      bch0 = sh[11];
      bcl0 = sl[11];
      sh[11] = th << 6 | tl >>> 32 - 6;
      sl[11] = tl << 6 | th >>> 32 - 6;
      th = bch0;
      tl = bcl0;
      bch0 = sh[17];
      bcl0 = sl[17];
      sh[17] = th << 10 | tl >>> 32 - 10;
      sl[17] = tl << 10 | th >>> 32 - 10;
      th = bch0;
      tl = bcl0;
      bch0 = sh[18];
      bcl0 = sl[18];
      sh[18] = th << 15 | tl >>> 32 - 15;
      sl[18] = tl << 15 | th >>> 32 - 15;
      th = bch0;
      tl = bcl0;
      bch0 = sh[3];
      bcl0 = sl[3];
      sh[3] = th << 21 | tl >>> 32 - 21;
      sl[3] = tl << 21 | th >>> 32 - 21;
      th = bch0;
      tl = bcl0;
      bch0 = sh[5];
      bcl0 = sl[5];
      sh[5] = th << 28 | tl >>> 32 - 28;
      sl[5] = tl << 28 | th >>> 32 - 28;
      th = bch0;
      tl = bcl0;
      bch0 = sh[16];
      bcl0 = sl[16];
      sh[16] = tl << 4 | th >>> 32 - 4;
      sl[16] = th << 4 | tl >>> 32 - 4;
      th = bch0;
      tl = bcl0;
      bch0 = sh[8];
      bcl0 = sl[8];
      sh[8] = tl << 13 | th >>> 32 - 13;
      sl[8] = th << 13 | tl >>> 32 - 13;
      th = bch0;
      tl = bcl0;
      bch0 = sh[21];
      bcl0 = sl[21];
      sh[21] = tl << 23 | th >>> 32 - 23;
      sl[21] = th << 23 | tl >>> 32 - 23;
      th = bch0;
      tl = bcl0;
      bch0 = sh[24];
      bcl0 = sl[24];
      sh[24] = th << 2 | tl >>> 32 - 2;
      sl[24] = tl << 2 | th >>> 32 - 2;
      th = bch0;
      tl = bcl0;
      bch0 = sh[4];
      bcl0 = sl[4];
      sh[4] = th << 14 | tl >>> 32 - 14;
      sl[4] = tl << 14 | th >>> 32 - 14;
      th = bch0;
      tl = bcl0;
      bch0 = sh[15];
      bcl0 = sl[15];
      sh[15] = th << 27 | tl >>> 32 - 27;
      sl[15] = tl << 27 | th >>> 32 - 27;
      th = bch0;
      tl = bcl0;
      bch0 = sh[23];
      bcl0 = sl[23];
      sh[23] = tl << 9 | th >>> 32 - 9;
      sl[23] = th << 9 | tl >>> 32 - 9;
      th = bch0;
      tl = bcl0;
      bch0 = sh[19];
      bcl0 = sl[19];
      sh[19] = tl << 24 | th >>> 32 - 24;
      sl[19] = th << 24 | tl >>> 32 - 24;
      th = bch0;
      tl = bcl0;
      bch0 = sh[13];
      bcl0 = sl[13];
      sh[13] = th << 8 | tl >>> 32 - 8;
      sl[13] = tl << 8 | th >>> 32 - 8;
      th = bch0;
      tl = bcl0;
      bch0 = sh[12];
      bcl0 = sl[12];
      sh[12] = th << 25 | tl >>> 32 - 25;
      sl[12] = tl << 25 | th >>> 32 - 25;
      th = bch0;
      tl = bcl0;
      bch0 = sh[2];
      bcl0 = sl[2];
      sh[2] = tl << 11 | th >>> 32 - 11;
      sl[2] = th << 11 | tl >>> 32 - 11;
      th = bch0;
      tl = bcl0;
      bch0 = sh[20];
      bcl0 = sl[20];
      sh[20] = tl << 30 | th >>> 32 - 30;
      sl[20] = th << 30 | tl >>> 32 - 30;
      th = bch0;
      tl = bcl0;
      bch0 = sh[14];
      bcl0 = sl[14];
      sh[14] = th << 18 | tl >>> 32 - 18;
      sl[14] = tl << 18 | th >>> 32 - 18;
      th = bch0;
      tl = bcl0;
      bch0 = sh[22];
      bcl0 = sl[22];
      sh[22] = tl << 7 | th >>> 32 - 7;
      sl[22] = th << 7 | tl >>> 32 - 7;
      th = bch0;
      tl = bcl0;
      bch0 = sh[9];
      bcl0 = sl[9];
      sh[9] = tl << 29 | th >>> 32 - 29;
      sl[9] = th << 29 | tl >>> 32 - 29;
      th = bch0;
      tl = bcl0;
      bch0 = sh[6];
      bcl0 = sl[6];
      sh[6] = th << 20 | tl >>> 32 - 20;
      sl[6] = tl << 20 | th >>> 32 - 20;
      th = bch0;
      tl = bcl0;
      bch0 = sh[1];
      bcl0 = sl[1];
      sh[1] = tl << 12 | th >>> 32 - 12;
      sl[1] = th << 12 | tl >>> 32 - 12;
      th = bch0;
      tl = bcl0;
      bch0 = sh[0];
      bch1 = sh[1];
      bch2 = sh[2];
      bch3 = sh[3];
      bch4 = sh[4];
      sh[0] ^= ~bch1 & bch2;
      sh[1] ^= ~bch2 & bch3;
      sh[2] ^= ~bch3 & bch4;
      sh[3] ^= ~bch4 & bch0;
      sh[4] ^= ~bch0 & bch1;
      bcl0 = sl[0];
      bcl1 = sl[1];
      bcl2 = sl[2];
      bcl3 = sl[3];
      bcl4 = sl[4];
      sl[0] ^= ~bcl1 & bcl2;
      sl[1] ^= ~bcl2 & bcl3;
      sl[2] ^= ~bcl3 & bcl4;
      sl[3] ^= ~bcl4 & bcl0;
      sl[4] ^= ~bcl0 & bcl1;
      bch0 = sh[5];
      bch1 = sh[6];
      bch2 = sh[7];
      bch3 = sh[8];
      bch4 = sh[9];
      sh[5] ^= ~bch1 & bch2;
      sh[6] ^= ~bch2 & bch3;
      sh[7] ^= ~bch3 & bch4;
      sh[8] ^= ~bch4 & bch0;
      sh[9] ^= ~bch0 & bch1;
      bcl0 = sl[5];
      bcl1 = sl[6];
      bcl2 = sl[7];
      bcl3 = sl[8];
      bcl4 = sl[9];
      sl[5] ^= ~bcl1 & bcl2;
      sl[6] ^= ~bcl2 & bcl3;
      sl[7] ^= ~bcl3 & bcl4;
      sl[8] ^= ~bcl4 & bcl0;
      sl[9] ^= ~bcl0 & bcl1;
      bch0 = sh[10];
      bch1 = sh[11];
      bch2 = sh[12];
      bch3 = sh[13];
      bch4 = sh[14];
      sh[10] ^= ~bch1 & bch2;
      sh[11] ^= ~bch2 & bch3;
      sh[12] ^= ~bch3 & bch4;
      sh[13] ^= ~bch4 & bch0;
      sh[14] ^= ~bch0 & bch1;
      bcl0 = sl[10];
      bcl1 = sl[11];
      bcl2 = sl[12];
      bcl3 = sl[13];
      bcl4 = sl[14];
      sl[10] ^= ~bcl1 & bcl2;
      sl[11] ^= ~bcl2 & bcl3;
      sl[12] ^= ~bcl3 & bcl4;
      sl[13] ^= ~bcl4 & bcl0;
      sl[14] ^= ~bcl0 & bcl1;
      bch0 = sh[15];
      bch1 = sh[16];
      bch2 = sh[17];
      bch3 = sh[18];
      bch4 = sh[19];
      sh[15] ^= ~bch1 & bch2;
      sh[16] ^= ~bch2 & bch3;
      sh[17] ^= ~bch3 & bch4;
      sh[18] ^= ~bch4 & bch0;
      sh[19] ^= ~bch0 & bch1;
      bcl0 = sl[15];
      bcl1 = sl[16];
      bcl2 = sl[17];
      bcl3 = sl[18];
      bcl4 = sl[19];
      sl[15] ^= ~bcl1 & bcl2;
      sl[16] ^= ~bcl2 & bcl3;
      sl[17] ^= ~bcl3 & bcl4;
      sl[18] ^= ~bcl4 & bcl0;
      sl[19] ^= ~bcl0 & bcl1;
      bch0 = sh[20];
      bch1 = sh[21];
      bch2 = sh[22];
      bch3 = sh[23];
      bch4 = sh[24];
      sh[20] ^= ~bch1 & bch2;
      sh[21] ^= ~bch2 & bch3;
      sh[22] ^= ~bch3 & bch4;
      sh[23] ^= ~bch4 & bch0;
      sh[24] ^= ~bch0 & bch1;
      bcl0 = sl[20];
      bcl1 = sl[21];
      bcl2 = sl[22];
      bcl3 = sl[23];
      bcl4 = sl[24];
      sl[20] ^= ~bcl1 & bcl2;
      sl[21] ^= ~bcl2 & bcl3;
      sl[22] ^= ~bcl3 & bcl4;
      sl[23] ^= ~bcl4 & bcl0;
      sl[24] ^= ~bcl0 & bcl1;
      sh[0] ^= RNDC_HI[r];
      sl[0] ^= RNDC_LO[r];
    }
    for (var i = 0; i < 25; i++) {
      binary_1.writeUint32LE(sl[i], buf, i * 8);
      binary_1.writeUint32LE(sh[i], buf, i * 8 + 4);
    }
  }
  var Sha3256Provider = function (_ProviderCrypto10) {
    _inherits(Sha3256Provider, _ProviderCrypto10);
    var _super131 = _createSuper(Sha3256Provider);
    function Sha3256Provider() {
      var _this107;
      _classCallCheck(this, Sha3256Provider);
      _this107 = _super131.apply(this, arguments);
      _this107.name = "SHA3-256";
      _this107.usages = [];
      return _this107;
    }
    _createClass(Sha3256Provider, [{
      key: "onDigest",
      value: function onDigest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee116() {
          return _regeneratorRuntime().wrap(function _callee116$(_context116) {
            while (1) switch (_context116.prev = _context116.next) {
              case 0:
                return _context116.abrupt("return", hash256(new Uint8Array(data)).buffer);
              case 1:
              case "end":
                return _context116.stop();
            }
          }, _callee116);
        }));
      }
    }]);
    return Sha3256Provider;
  }(ProviderCrypto);
  var Sha3384Provider = function (_ProviderCrypto11) {
    _inherits(Sha3384Provider, _ProviderCrypto11);
    var _super132 = _createSuper(Sha3384Provider);
    function Sha3384Provider() {
      var _this108;
      _classCallCheck(this, Sha3384Provider);
      _this108 = _super132.apply(this, arguments);
      _this108.name = "SHA3-384";
      _this108.usages = [];
      return _this108;
    }
    _createClass(Sha3384Provider, [{
      key: "onDigest",
      value: function onDigest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee117() {
          return _regeneratorRuntime().wrap(function _callee117$(_context117) {
            while (1) switch (_context117.prev = _context117.next) {
              case 0:
                return _context117.abrupt("return", hash384(new Uint8Array(data)).buffer);
              case 1:
              case "end":
                return _context117.stop();
            }
          }, _callee117);
        }));
      }
    }]);
    return Sha3384Provider;
  }(ProviderCrypto);
  var Sha3512Provider = function (_ProviderCrypto12) {
    _inherits(Sha3512Provider, _ProviderCrypto12);
    var _super133 = _createSuper(Sha3512Provider);
    function Sha3512Provider() {
      var _this109;
      _classCallCheck(this, Sha3512Provider);
      _this109 = _super133.apply(this, arguments);
      _this109.name = "SHA3-512";
      _this109.usages = [];
      return _this109;
    }
    _createClass(Sha3512Provider, [{
      key: "onDigest",
      value: function onDigest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee118() {
          return _regeneratorRuntime().wrap(function _callee118$(_context118) {
            while (1) switch (_context118.prev = _context118.next) {
              case 0:
                return _context118.abrupt("return", hash512(new Uint8Array(data)).buffer);
              case 1:
              case "end":
                return _context118.stop();
            }
          }, _callee118);
        }));
      }
    }]);
    return Sha3512Provider;
  }(ProviderCrypto);
  var Shake128Provider = function (_Shake128Provider$) {
    _inherits(Shake128Provider, _Shake128Provider$);
    var _super134 = _createSuper(Shake128Provider);
    function Shake128Provider() {
      _classCallCheck(this, Shake128Provider);
      return _super134.apply(this, arguments);
    }
    _createClass(Shake128Provider, [{
      key: "onDigest",
      value: function onDigest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee119() {
          var output;
          return _regeneratorRuntime().wrap(function _callee119$(_context119) {
            while (1) switch (_context119.prev = _context119.next) {
              case 0:
                output = new Uint8Array(algorithm.length);
                new SHAKE128_1().update(new Uint8Array(data)).stream(output);
                return _context119.abrupt("return", output.buffer);
              case 3:
              case "end":
                return _context119.stop();
            }
          }, _callee119);
        }));
      }
    }]);
    return Shake128Provider;
  }(Shake128Provider$1);
  var Shake256Provider = function (_Shake256Provider$) {
    _inherits(Shake256Provider, _Shake256Provider$);
    var _super135 = _createSuper(Shake256Provider);
    function Shake256Provider() {
      _classCallCheck(this, Shake256Provider);
      return _super135.apply(this, arguments);
    }
    _createClass(Shake256Provider, [{
      key: "onDigest",
      value: function onDigest(algorithm, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee120() {
          var output;
          return _regeneratorRuntime().wrap(function _callee120$(_context120) {
            while (1) switch (_context120.prev = _context120.next) {
              case 0:
                output = new Uint8Array(algorithm.length);
                new SHAKE256_1().update(new Uint8Array(data)).stream(output);
                return _context120.abrupt("return", output.buffer);
              case 3:
              case "end":
                return _context120.stop();
            }
          }, _callee120);
        }));
      }
    }]);
    return Shake256Provider;
  }(Shake256Provider$1);
  var PbkdfCryptoKey = function (_CryptoKey6) {
    _inherits(PbkdfCryptoKey, _CryptoKey6);
    var _super136 = _createSuper(PbkdfCryptoKey);
    function PbkdfCryptoKey(algorithm, extractable, usages, raw) {
      var _this110;
      _classCallCheck(this, PbkdfCryptoKey);
      _this110 = _super136.call(this, algorithm, extractable, "secret", usages);
      _this110.raw = raw;
      return _this110;
    }
    return _createClass(PbkdfCryptoKey);
  }(CryptoKey);
  var Pbkdf2Provider = function (_Pbkdf2Provider$) {
    _inherits(Pbkdf2Provider, _Pbkdf2Provider$);
    var _super137 = _createSuper(Pbkdf2Provider);
    function Pbkdf2Provider() {
      _classCallCheck(this, Pbkdf2Provider);
      return _super137.apply(this, arguments);
    }
    _createClass(Pbkdf2Provider, [{
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee121() {
          return _regeneratorRuntime().wrap(function _callee121$(_context121) {
            while (1) switch (_context121.prev = _context121.next) {
              case 0:
                return _context121.abrupt("return", new PbkdfCryptoKey(algorithm, extractable, keyUsages, BufferSourceConverter.toUint8Array(keyData)));
              case 1:
              case "end":
                return _context121.stop();
            }
          }, _callee121);
        }));
      }
    }, {
      key: "onDeriveBits",
      value: function onDeriveBits(algorithm, baseKey, length) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee122() {
          var result, salt, password;
          return _regeneratorRuntime().wrap(function _callee122$(_context122) {
            while (1) switch (_context122.prev = _context122.next) {
              case 0:
                salt = BufferSourceConverter.toUint8Array(algorithm.salt);
                password = baseKey.raw;
                _context122.t0 = algorithm.hash.name.toUpperCase();
                _context122.next = _context122.t0 === "SHA-1" ? 5 : _context122.t0 === "SHA-256" ? 7 : _context122.t0 === "SHA-512" ? 9 : 11;
                break;
              case 5:
                result = Pbkdf2HmacSha1(password, salt, algorithm.iterations, length >> 3);
                return _context122.abrupt("break", 12);
              case 7:
                result = Pbkdf2HmacSha256(password, salt, algorithm.iterations, length >> 3);
                return _context122.abrupt("break", 12);
              case 9:
                result = Pbkdf2HmacSha512(password, salt, algorithm.iterations, length >> 3);
                return _context122.abrupt("break", 12);
              case 11:
                throw new OperationError("algorithm.hash: '".concat(algorithm.hash.name, "' hash algorithm is not supported"));
              case 12:
                return _context122.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 13:
              case "end":
                return _context122.stop();
            }
          }, _callee122);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(Pbkdf2Provider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        if (!(key instanceof PbkdfCryptoKey)) {
          throw new TypeError("key: Is not PbkdfCryptoKey");
        }
      }
    }]);
    return Pbkdf2Provider;
  }(Pbkdf2Provider$1);
  var des$2 = {};
  var utils$2 = {};
  utils$2.readUInt32BE = function readUInt32BE(bytes, off) {
    var res = bytes[0 + off] << 24 | bytes[1 + off] << 16 | bytes[2 + off] << 8 | bytes[3 + off];
    return res >>> 0;
  };
  utils$2.writeUInt32BE = function writeUInt32BE(bytes, value, off) {
    bytes[0 + off] = value >>> 24;
    bytes[1 + off] = value >>> 16 & 0xff;
    bytes[2 + off] = value >>> 8 & 0xff;
    bytes[3 + off] = value & 0xff;
  };
  utils$2.ip = function ip(inL, inR, out, off) {
    var outL = 0;
    var outR = 0;
    for (var i = 6; i >= 0; i -= 2) {
      for (var j = 0; j <= 24; j += 8) {
        outL <<= 1;
        outL |= inR >>> j + i & 1;
      }
      for (var j = 0; j <= 24; j += 8) {
        outL <<= 1;
        outL |= inL >>> j + i & 1;
      }
    }
    for (var i = 6; i >= 0; i -= 2) {
      for (var j = 1; j <= 25; j += 8) {
        outR <<= 1;
        outR |= inR >>> j + i & 1;
      }
      for (var j = 1; j <= 25; j += 8) {
        outR <<= 1;
        outR |= inL >>> j + i & 1;
      }
    }
    out[off + 0] = outL >>> 0;
    out[off + 1] = outR >>> 0;
  };
  utils$2.rip = function rip(inL, inR, out, off) {
    var outL = 0;
    var outR = 0;
    for (var i = 0; i < 4; i++) {
      for (var j = 24; j >= 0; j -= 8) {
        outL <<= 1;
        outL |= inR >>> j + i & 1;
        outL <<= 1;
        outL |= inL >>> j + i & 1;
      }
    }
    for (var i = 4; i < 8; i++) {
      for (var j = 24; j >= 0; j -= 8) {
        outR <<= 1;
        outR |= inR >>> j + i & 1;
        outR <<= 1;
        outR |= inL >>> j + i & 1;
      }
    }
    out[off + 0] = outL >>> 0;
    out[off + 1] = outR >>> 0;
  };
  utils$2.pc1 = function pc1(inL, inR, out, off) {
    var outL = 0;
    var outR = 0;
    for (var i = 7; i >= 5; i--) {
      for (var j = 0; j <= 24; j += 8) {
        outL <<= 1;
        outL |= inR >> j + i & 1;
      }
      for (var j = 0; j <= 24; j += 8) {
        outL <<= 1;
        outL |= inL >> j + i & 1;
      }
    }
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= inR >> j + i & 1;
    }
    for (var i = 1; i <= 3; i++) {
      for (var j = 0; j <= 24; j += 8) {
        outR <<= 1;
        outR |= inR >> j + i & 1;
      }
      for (var j = 0; j <= 24; j += 8) {
        outR <<= 1;
        outR |= inL >> j + i & 1;
      }
    }
    for (var j = 0; j <= 24; j += 8) {
      outR <<= 1;
      outR |= inL >> j + i & 1;
    }
    out[off + 0] = outL >>> 0;
    out[off + 1] = outR >>> 0;
  };
  utils$2.r28shl = function r28shl(num, shift) {
    return num << shift & 0xfffffff | num >>> 28 - shift;
  };
  var pc2table = [14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24];
  utils$2.pc2 = function pc2(inL, inR, out, off) {
    var outL = 0;
    var outR = 0;
    var len = pc2table.length >>> 1;
    for (var i = 0; i < len; i++) {
      outL <<= 1;
      outL |= inL >>> pc2table[i] & 0x1;
    }
    for (var i = len; i < pc2table.length; i++) {
      outR <<= 1;
      outR |= inR >>> pc2table[i] & 0x1;
    }
    out[off + 0] = outL >>> 0;
    out[off + 1] = outR >>> 0;
  };
  utils$2.expand = function expand(r, out, off) {
    var outL = 0;
    var outR = 0;
    outL = (r & 1) << 5 | r >>> 27;
    for (var i = 23; i >= 15; i -= 4) {
      outL <<= 6;
      outL |= r >>> i & 0x3f;
    }
    for (var i = 11; i >= 3; i -= 4) {
      outR |= r >>> i & 0x3f;
      outR <<= 6;
    }
    outR |= (r & 0x1f) << 1 | r >>> 31;
    out[off + 0] = outL >>> 0;
    out[off + 1] = outR >>> 0;
  };
  var sTable = [14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11];
  utils$2.substitute = function substitute(inL, inR) {
    var out = 0;
    for (var i = 0; i < 4; i++) {
      var b = inL >>> 18 - i * 6 & 0x3f;
      var sb = sTable[i * 0x40 + b];
      out <<= 4;
      out |= sb;
    }
    for (var i = 0; i < 4; i++) {
      var b = inR >>> 18 - i * 6 & 0x3f;
      var sb = sTable[4 * 0x40 + i * 0x40 + b];
      out <<= 4;
      out |= sb;
    }
    return out >>> 0;
  };
  var permuteTable = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7];
  utils$2.permute = function permute(num) {
    var out = 0;
    for (var i = 0; i < permuteTable.length; i++) {
      out <<= 1;
      out |= num >>> permuteTable[i] & 0x1;
    }
    return out >>> 0;
  };
  utils$2.padSplit = function padSplit(num, size, group) {
    var str = num.toString(2);
    while (str.length < size) str = '0' + str;
    var out = [];
    for (var i = 0; i < size; i += group) out.push(str.slice(i, i + group));
    return out.join(' ');
  };
  var minimalisticAssert = assert$4;
  function assert$4(val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }
  assert$4.equal = function assertEqual(l, r, msg) {
    if (l != r) throw new Error(msg || 'Assertion failed: ' + l + ' != ' + r);
  };
  var assert$3 = minimalisticAssert;
  function Cipher$3(options) {
    this.options = options;
    this.type = this.options.type;
    this.blockSize = 8;
    this._init();
    this.buffer = new Array(this.blockSize);
    this.bufferOff = 0;
  }
  var cipher = Cipher$3;
  Cipher$3.prototype._init = function _init() {};
  Cipher$3.prototype.update = function update(data) {
    if (data.length === 0) return [];
    if (this.type === 'decrypt') return this._updateDecrypt(data);else return this._updateEncrypt(data);
  };
  Cipher$3.prototype._buffer = function _buffer(data, off) {
    var min = Math.min(this.buffer.length - this.bufferOff, data.length - off);
    for (var i = 0; i < min; i++) this.buffer[this.bufferOff + i] = data[off + i];
    this.bufferOff += min;
    return min;
  };
  Cipher$3.prototype._flushBuffer = function _flushBuffer(out, off) {
    this._update(this.buffer, 0, out, off);
    this.bufferOff = 0;
    return this.blockSize;
  };
  Cipher$3.prototype._updateEncrypt = function _updateEncrypt(data) {
    var inputOff = 0;
    var outputOff = 0;
    var count = (this.bufferOff + data.length) / this.blockSize | 0;
    var out = new Array(count * this.blockSize);
    if (this.bufferOff !== 0) {
      inputOff += this._buffer(data, inputOff);
      if (this.bufferOff === this.buffer.length) outputOff += this._flushBuffer(out, outputOff);
    }
    var max = data.length - (data.length - inputOff) % this.blockSize;
    for (; inputOff < max; inputOff += this.blockSize) {
      this._update(data, inputOff, out, outputOff);
      outputOff += this.blockSize;
    }
    for (; inputOff < data.length; inputOff++, this.bufferOff++) this.buffer[this.bufferOff] = data[inputOff];
    return out;
  };
  Cipher$3.prototype._updateDecrypt = function _updateDecrypt(data) {
    var inputOff = 0;
    var outputOff = 0;
    var count = Math.ceil((this.bufferOff + data.length) / this.blockSize) - 1;
    var out = new Array(count * this.blockSize);
    for (; count > 0; count--) {
      inputOff += this._buffer(data, inputOff);
      outputOff += this._flushBuffer(out, outputOff);
    }
    inputOff += this._buffer(data, inputOff);
    return out;
  };
  Cipher$3.prototype.final = function final(buffer) {
    var first;
    if (buffer) first = this.update(buffer);
    var last;
    if (this.type === 'encrypt') last = this._finalEncrypt();else last = this._finalDecrypt();
    if (first) return first.concat(last);else return last;
  };
  Cipher$3.prototype._pad = function _pad(buffer, off) {
    if (off === 0) return false;
    while (off < buffer.length) buffer[off++] = 0;
    return true;
  };
  Cipher$3.prototype._finalEncrypt = function _finalEncrypt() {
    if (!this._pad(this.buffer, this.bufferOff)) return [];
    var out = new Array(this.blockSize);
    this._update(this.buffer, 0, out, 0);
    return out;
  };
  Cipher$3.prototype._unpad = function _unpad(buffer) {
    return buffer;
  };
  Cipher$3.prototype._finalDecrypt = function _finalDecrypt() {
    assert$3.equal(this.bufferOff, this.blockSize, 'Not enough data to decrypt');
    var out = new Array(this.blockSize);
    this._flushBuffer(out, 0);
    return this._unpad(out);
  };
  var inheritsExports = {};
  var inherits$3 = {
    get exports() {
      return inheritsExports;
    },
    set exports(v) {
      inheritsExports = v;
    }
  };
  var inherits_browserExports = {};
  var inherits_browser = {
    get exports() {
      return inherits_browserExports;
    },
    set exports(v) {
      inherits_browserExports = v;
    }
  };
  var hasRequiredInherits_browser;
  function requireInherits_browser() {
    if (hasRequiredInherits_browser) return inherits_browserExports;
    hasRequiredInherits_browser = 1;
    if (typeof Object.create === 'function') {
      inherits_browser.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      inherits_browser.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function TempCtor() {};
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
    return inherits_browserExports;
  }
  (function (module) {
    try {
      var util = require('util');
      if (typeof util.inherits !== 'function') throw '';
      module.exports = util.inherits;
    } catch (e) {
      module.exports = requireInherits_browser();
    }
  })(inherits$3);
  var assert$2 = minimalisticAssert;
  var inherits$2 = inheritsExports;
  var utils$1 = utils$2;
  var Cipher$2 = cipher;
  function DESState() {
    this.tmp = new Array(2);
    this.keys = null;
  }
  function DES$2(options) {
    Cipher$2.call(this, options);
    var state = new DESState();
    this._desState = state;
    this.deriveKeys(state, options.key);
  }
  inherits$2(DES$2, Cipher$2);
  var des$1 = DES$2;
  DES$2.create = function create(options) {
    return new DES$2(options);
  };
  var shiftTable = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
  DES$2.prototype.deriveKeys = function deriveKeys(state, key) {
    state.keys = new Array(16 * 2);
    assert$2.equal(key.length, this.blockSize, 'Invalid key length');
    var kL = utils$1.readUInt32BE(key, 0);
    var kR = utils$1.readUInt32BE(key, 4);
    utils$1.pc1(kL, kR, state.tmp, 0);
    kL = state.tmp[0];
    kR = state.tmp[1];
    for (var i = 0; i < state.keys.length; i += 2) {
      var shift = shiftTable[i >>> 1];
      kL = utils$1.r28shl(kL, shift);
      kR = utils$1.r28shl(kR, shift);
      utils$1.pc2(kL, kR, state.keys, i);
    }
  };
  DES$2.prototype._update = function _update(inp, inOff, out, outOff) {
    var state = this._desState;
    var l = utils$1.readUInt32BE(inp, inOff);
    var r = utils$1.readUInt32BE(inp, inOff + 4);
    utils$1.ip(l, r, state.tmp, 0);
    l = state.tmp[0];
    r = state.tmp[1];
    if (this.type === 'encrypt') this._encrypt(state, l, r, state.tmp, 0);else this._decrypt(state, l, r, state.tmp, 0);
    l = state.tmp[0];
    r = state.tmp[1];
    utils$1.writeUInt32BE(out, l, outOff);
    utils$1.writeUInt32BE(out, r, outOff + 4);
  };
  DES$2.prototype._pad = function _pad(buffer, off) {
    var value = buffer.length - off;
    for (var i = off; i < buffer.length; i++) buffer[i] = value;
    return true;
  };
  DES$2.prototype._unpad = function _unpad(buffer) {
    var pad = buffer[buffer.length - 1];
    for (var i = buffer.length - pad; i < buffer.length; i++) assert$2.equal(buffer[i], pad);
    return buffer.slice(0, buffer.length - pad);
  };
  DES$2.prototype._encrypt = function _encrypt(state, lStart, rStart, out, off) {
    var l = lStart;
    var r = rStart;
    for (var i = 0; i < state.keys.length; i += 2) {
      var keyL = state.keys[i];
      var keyR = state.keys[i + 1];
      utils$1.expand(r, state.tmp, 0);
      keyL ^= state.tmp[0];
      keyR ^= state.tmp[1];
      var s = utils$1.substitute(keyL, keyR);
      var f = utils$1.permute(s);
      var t = r;
      r = (l ^ f) >>> 0;
      l = t;
    }
    utils$1.rip(r, l, out, off);
  };
  DES$2.prototype._decrypt = function _decrypt(state, lStart, rStart, out, off) {
    var l = rStart;
    var r = lStart;
    for (var i = state.keys.length - 2; i >= 0; i -= 2) {
      var keyL = state.keys[i];
      var keyR = state.keys[i + 1];
      utils$1.expand(l, state.tmp, 0);
      keyL ^= state.tmp[0];
      keyR ^= state.tmp[1];
      var s = utils$1.substitute(keyL, keyR);
      var f = utils$1.permute(s);
      var t = l;
      l = (r ^ f) >>> 0;
      r = t;
    }
    utils$1.rip(l, r, out, off);
  };
  var cbc = {};
  var assert$1 = minimalisticAssert;
  var inherits$1 = inheritsExports;
  var proto = {};
  function CBCState(iv) {
    assert$1.equal(iv.length, 8, 'Invalid IV length');
    this.iv = new Array(8);
    for (var i = 0; i < this.iv.length; i++) this.iv[i] = iv[i];
  }
  function instantiate(Base) {
    function CBC(options) {
      Base.call(this, options);
      this._cbcInit();
    }
    inherits$1(CBC, Base);
    var keys = Object.keys(proto);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      CBC.prototype[key] = proto[key];
    }
    CBC.create = function create(options) {
      return new CBC(options);
    };
    return CBC;
  }
  cbc.instantiate = instantiate;
  proto._cbcInit = function _cbcInit() {
    var state = new CBCState(this.options.iv);
    this._cbcState = state;
  };
  proto._update = function _update(inp, inOff, out, outOff) {
    var state = this._cbcState;
    var superProto = this.constructor.super_.prototype;
    var iv = state.iv;
    if (this.type === 'encrypt') {
      for (var i = 0; i < this.blockSize; i++) iv[i] ^= inp[inOff + i];
      superProto._update.call(this, iv, 0, out, outOff);
      for (var i = 0; i < this.blockSize; i++) iv[i] = out[outOff + i];
    } else {
      superProto._update.call(this, inp, inOff, out, outOff);
      for (var i = 0; i < this.blockSize; i++) out[outOff + i] ^= iv[i];
      for (var i = 0; i < this.blockSize; i++) iv[i] = inp[inOff + i];
    }
  };
  var assert = minimalisticAssert;
  var inherits = inheritsExports;
  var Cipher$1 = cipher;
  var DES$1 = des$1;
  function EDEState(type, key) {
    assert.equal(key.length, 24, 'Invalid key length');
    var k1 = key.slice(0, 8);
    var k2 = key.slice(8, 16);
    var k3 = key.slice(16, 24);
    if (type === 'encrypt') {
      this.ciphers = [DES$1.create({
        type: 'encrypt',
        key: k1
      }), DES$1.create({
        type: 'decrypt',
        key: k2
      }), DES$1.create({
        type: 'encrypt',
        key: k3
      })];
    } else {
      this.ciphers = [DES$1.create({
        type: 'decrypt',
        key: k3
      }), DES$1.create({
        type: 'encrypt',
        key: k2
      }), DES$1.create({
        type: 'decrypt',
        key: k1
      })];
    }
  }
  function EDE$1(options) {
    Cipher$1.call(this, options);
    var state = new EDEState(this.type, this.options.key);
    this._edeState = state;
  }
  inherits(EDE$1, Cipher$1);
  var ede = EDE$1;
  EDE$1.create = function create(options) {
    return new EDE$1(options);
  };
  EDE$1.prototype._update = function _update(inp, inOff, out, outOff) {
    var state = this._edeState;
    state.ciphers[0]._update(inp, inOff, out, outOff);
    state.ciphers[1]._update(out, outOff, out, outOff);
    state.ciphers[2]._update(out, outOff, out, outOff);
  };
  EDE$1.prototype._pad = DES$1.prototype._pad;
  EDE$1.prototype._unpad = DES$1.prototype._unpad;
  var utils = des$2.utils = utils$2;
  var Cipher = des$2.Cipher = cipher;
  var DES = des$2.DES = des$1;
  var CBC = des$2.CBC = cbc;
  var EDE = des$2.EDE = ede;
  var des = _mergeNamespaces({
    __proto__: null,
    CBC: CBC,
    Cipher: Cipher,
    DES: DES,
    EDE: EDE,
    default: des$2,
    utils: utils
  }, [des$2]);
  var DesCryptoKey = function (_CryptoKey7) {
    _inherits(DesCryptoKey, _CryptoKey7);
    var _super138 = _createSuper(DesCryptoKey);
    function DesCryptoKey(algorithm, extractable, usages, raw) {
      var _this111;
      _classCallCheck(this, DesCryptoKey);
      _this111 = _super138.call(this, algorithm, extractable, "secret", usages);
      _this111.raw = raw;
      return _this111;
    }
    _createClass(DesCryptoKey, [{
      key: "toJSON",
      value: function toJSON() {
        var jwk = {
          kty: "oct",
          alg: this.getJwkAlgorithm(),
          k: Convert.ToBase64Url(this.raw),
          ext: this.extractable,
          key_ops: this.usages
        };
        return jwk;
      }
    }, {
      key: "getJwkAlgorithm",
      value: function getJwkAlgorithm() {
        switch (this.algorithm.name.toUpperCase()) {
          case "DES-CBC":
            return "DES-CBC";
          case "DES-EDE3-CBC":
            return "3DES-CBC";
          default:
            throw new AlgorithmError("Unsupported algorithm name");
        }
      }
    }]);
    return DesCryptoKey;
  }(CryptoKey);
  var DesCrypto = function () {
    function DesCrypto() {
      _classCallCheck(this, DesCrypto);
    }
    _createClass(DesCrypto, null, [{
      key: "checkLib",
      value: function checkLib() {
        if (typeof des === "undefined") {
          throw new OperationError("Cannot implement DES mechanism. Add 'https://peculiarventures.github.io/pv-webcrypto-tests/src/des.js' script to your project");
        }
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key) {
        if (!(key instanceof DesCryptoKey)) {
          throw new TypeError("key: Is not DesCryptoKey");
        }
      }
    }, {
      key: "generateKey",
      value: function generateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee123() {
          var raw;
          return _regeneratorRuntime().wrap(function _callee123$(_context123) {
            while (1) switch (_context123.prev = _context123.next) {
              case 0:
                this.checkLib();
                raw = exports.nativeCrypto.getRandomValues(new Uint8Array(algorithm.length / 8));
                return _context123.abrupt("return", new DesCryptoKey(algorithm, extractable, keyUsages, raw));
              case 3:
              case "end":
                return _context123.stop();
            }
          }, _callee123, this);
        }));
      }
    }, {
      key: "exportKey",
      value: function exportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee124() {
          return _regeneratorRuntime().wrap(function _callee124$(_context124) {
            while (1) switch (_context124.prev = _context124.next) {
              case 0:
                this.checkLib();
                _context124.t0 = format;
                _context124.next = _context124.t0 === "jwk" ? 4 : _context124.t0 === "raw" ? 5 : 6;
                break;
              case 4:
                return _context124.abrupt("return", key.toJSON());
              case 5:
                return _context124.abrupt("return", key.raw.buffer);
              case 6:
                throw new OperationError("format: Must be 'jwk' or 'raw'");
              case 7:
              case "end":
                return _context124.stop();
            }
          }, _callee124, this);
        }));
      }
    }, {
      key: "importKey",
      value: function importKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee125() {
          var raw, key;
          return _regeneratorRuntime().wrap(function _callee125$(_context125) {
            while (1) switch (_context125.prev = _context125.next) {
              case 0:
                this.checkLib();
                if (isJWK(keyData)) {
                  raw = Convert.FromBase64Url(keyData.k);
                } else {
                  raw = BufferSourceConverter.toArrayBuffer(keyData);
                }
                if (!(algorithm.name === "DES-CBC" && raw.byteLength !== 8 || algorithm.name === "DES-EDE3-CBC" && raw.byteLength !== 24)) {
                  _context125.next = 4;
                  break;
                }
                throw new OperationError("keyData: Is wrong key length");
              case 4:
                key = new DesCryptoKey({
                  name: algorithm.name,
                  length: raw.byteLength << 3
                }, extractable, keyUsages, new Uint8Array(raw));
                return _context125.abrupt("return", key);
              case 6:
              case "end":
                return _context125.stop();
            }
          }, _callee125, this);
        }));
      }
    }, {
      key: "encrypt",
      value: function encrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee126() {
          return _regeneratorRuntime().wrap(function _callee126$(_context126) {
            while (1) switch (_context126.prev = _context126.next) {
              case 0:
                return _context126.abrupt("return", this.cipher(algorithm, key, data, true));
              case 1:
              case "end":
                return _context126.stop();
            }
          }, _callee126, this);
        }));
      }
    }, {
      key: "decrypt",
      value: function decrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee127() {
          return _regeneratorRuntime().wrap(function _callee127$(_context127) {
            while (1) switch (_context127.prev = _context127.next) {
              case 0:
                return _context127.abrupt("return", this.cipher(algorithm, key, data, false));
              case 1:
              case "end":
                return _context127.stop();
            }
          }, _callee127, this);
        }));
      }
    }, {
      key: "cipher",
      value: function cipher(algorithm, key, data, encrypt) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee128() {
          var type, DesCipher, iv, enc;
          return _regeneratorRuntime().wrap(function _callee128$(_context128) {
            while (1) switch (_context128.prev = _context128.next) {
              case 0:
                this.checkLib();
                type = encrypt ? "encrypt" : "decrypt";
                iv = BufferSourceConverter.toUint8Array(algorithm.iv);
                _context128.t0 = algorithm.name.toUpperCase();
                _context128.next = _context128.t0 === "DES-CBC" ? 6 : _context128.t0 === "DES-EDE3-CBC" ? 8 : 10;
                break;
              case 6:
                DesCipher = CBC.instantiate(DES).create({
                  key: key.raw,
                  type: type,
                  iv: iv
                });
                return _context128.abrupt("break", 11);
              case 8:
                DesCipher = CBC.instantiate(EDE).create({
                  key: key.raw,
                  type: type,
                  iv: iv
                });
                return _context128.abrupt("break", 11);
              case 10:
                throw new OperationError("algorithm: Is not recognized");
              case 11:
                enc = DesCipher.update(new Uint8Array(data)).concat(DesCipher.final());
                return _context128.abrupt("return", new Uint8Array(enc).buffer);
              case 13:
              case "end":
                return _context128.stop();
            }
          }, _callee128, this);
        }));
      }
    }]);
    return DesCrypto;
  }();
  var DesCbcProvider = function (_DesProvider) {
    _inherits(DesCbcProvider, _DesProvider);
    var _super139 = _createSuper(DesCbcProvider);
    function DesCbcProvider() {
      var _this112;
      _classCallCheck(this, DesCbcProvider);
      _this112 = _super139.apply(this, arguments);
      _this112.keySizeBits = 64;
      _this112.ivSize = 8;
      _this112.name = "DES-CBC";
      return _this112;
    }
    _createClass(DesCbcProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee129() {
          return _regeneratorRuntime().wrap(function _callee129$(_context129) {
            while (1) switch (_context129.prev = _context129.next) {
              case 0:
                return _context129.abrupt("return", DesCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context129.stop();
            }
          }, _callee129);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee130() {
          return _regeneratorRuntime().wrap(function _callee130$(_context130) {
            while (1) switch (_context130.prev = _context130.next) {
              case 0:
                return _context130.abrupt("return", DesCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context130.stop();
            }
          }, _callee130);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee131() {
          return _regeneratorRuntime().wrap(function _callee131$(_context131) {
            while (1) switch (_context131.prev = _context131.next) {
              case 0:
                return _context131.abrupt("return", DesCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context131.stop();
            }
          }, _callee131);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee132() {
          return _regeneratorRuntime().wrap(function _callee132$(_context132) {
            while (1) switch (_context132.prev = _context132.next) {
              case 0:
                return _context132.abrupt("return", DesCrypto.encrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context132.stop();
            }
          }, _callee132);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee133() {
          return _regeneratorRuntime().wrap(function _callee133$(_context133) {
            while (1) switch (_context133.prev = _context133.next) {
              case 0:
                return _context133.abrupt("return", DesCrypto.decrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context133.stop();
            }
          }, _callee133);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(DesCbcProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        DesCrypto.checkCryptoKey(key);
      }
    }]);
    return DesCbcProvider;
  }(DesProvider);
  var DesEde3CbcProvider = function (_DesProvider2) {
    _inherits(DesEde3CbcProvider, _DesProvider2);
    var _super140 = _createSuper(DesEde3CbcProvider);
    function DesEde3CbcProvider() {
      var _this113;
      _classCallCheck(this, DesEde3CbcProvider);
      _this113 = _super140.apply(this, arguments);
      _this113.keySizeBits = 192;
      _this113.ivSize = 8;
      _this113.name = "DES-EDE3-CBC";
      return _this113;
    }
    _createClass(DesEde3CbcProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee134() {
          return _regeneratorRuntime().wrap(function _callee134$(_context134) {
            while (1) switch (_context134.prev = _context134.next) {
              case 0:
                return _context134.abrupt("return", DesCrypto.generateKey(algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context134.stop();
            }
          }, _callee134);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee135() {
          return _regeneratorRuntime().wrap(function _callee135$(_context135) {
            while (1) switch (_context135.prev = _context135.next) {
              case 0:
                return _context135.abrupt("return", DesCrypto.exportKey(format, key));
              case 1:
              case "end":
                return _context135.stop();
            }
          }, _callee135);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee136() {
          return _regeneratorRuntime().wrap(function _callee136$(_context136) {
            while (1) switch (_context136.prev = _context136.next) {
              case 0:
                return _context136.abrupt("return", DesCrypto.importKey(format, keyData, algorithm, extractable, keyUsages));
              case 1:
              case "end":
                return _context136.stop();
            }
          }, _callee136);
        }));
      }
    }, {
      key: "onEncrypt",
      value: function onEncrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee137() {
          return _regeneratorRuntime().wrap(function _callee137$(_context137) {
            while (1) switch (_context137.prev = _context137.next) {
              case 0:
                return _context137.abrupt("return", DesCrypto.encrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context137.stop();
            }
          }, _callee137);
        }));
      }
    }, {
      key: "onDecrypt",
      value: function onDecrypt(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee138() {
          return _regeneratorRuntime().wrap(function _callee138$(_context138) {
            while (1) switch (_context138.prev = _context138.next) {
              case 0:
                return _context138.abrupt("return", DesCrypto.decrypt(algorithm, key, data));
              case 1:
              case "end":
                return _context138.stop();
            }
          }, _callee138);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(DesEde3CbcProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        DesCrypto.checkCryptoKey(key);
      }
    }]);
    return DesEde3CbcProvider;
  }(DesProvider);
  var JsonBase64UrlConverter = {
    fromJSON: function fromJSON(value) {
      return Buffer.from(Convert.FromBase64Url(value));
    },
    toJSON: function toJSON(value) {
      return Convert.ToBase64Url(value);
    }
  };
  var HmacCryptoKey = function (_CryptoKey8) {
    _inherits(HmacCryptoKey, _CryptoKey8);
    var _super141 = _createSuper(HmacCryptoKey);
    function HmacCryptoKey() {
      var _this114;
      var algorithm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        name: "HMAC"
      };
      var extractable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var usages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Uint8Array(0);
      _classCallCheck(this, HmacCryptoKey);
      _this114 = _super141.call(this, algorithm, extractable, "secret", usages);
      _this114.kty = "oct";
      _this114.data = data;
      return _this114;
    }
    _createClass(HmacCryptoKey, [{
      key: "alg",
      get: function get() {
        var hash = this.algorithm.hash.name.toUpperCase();
        return "HS".concat(hash.replace("SHA-", ""));
      },
      set: function set(value) {}
    }]);
    return HmacCryptoKey;
  }(CryptoKey);
  __decorate([JsonProp({
    name: "ext",
    type: JsonPropTypes.Boolean,
    optional: true
  })], HmacCryptoKey.prototype, "extractable", void 0);
  __decorate([JsonProp({
    name: "key_ops",
    type: JsonPropTypes.String,
    repeated: true,
    optional: true
  })], HmacCryptoKey.prototype, "usages", void 0);
  __decorate([JsonProp({
    name: "k",
    converter: JsonBase64UrlConverter
  })], HmacCryptoKey.prototype, "data", void 0);
  __decorate([JsonProp({
    type: JsonPropTypes.String
  })], HmacCryptoKey.prototype, "kty", void 0);
  __decorate([JsonProp({
    type: JsonPropTypes.String
  })], HmacCryptoKey.prototype, "alg", null);
  var HmacProvider = function (_HmacProvider$) {
    _inherits(HmacProvider, _HmacProvider$);
    var _super142 = _createSuper(HmacProvider);
    function HmacProvider() {
      _classCallCheck(this, HmacProvider);
      return _super142.apply(this, arguments);
    }
    _createClass(HmacProvider, [{
      key: "onGenerateKey",
      value: function onGenerateKey(algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee139() {
          var length, raw, key;
          return _regeneratorRuntime().wrap(function _callee139$(_context139) {
            while (1) switch (_context139.prev = _context139.next) {
              case 0:
                length = algorithm.length || this.getDefaultLength(algorithm.hash.name);
                raw = exports.nativeCrypto.getRandomValues(new Uint8Array(length >> 3));
                key = new HmacCryptoKey(algorithm, extractable, keyUsages, raw);
                return _context139.abrupt("return", key);
              case 4:
              case "end":
                return _context139.stop();
            }
          }, _callee139, this);
        }));
      }
    }, {
      key: "onSign",
      value: function onSign(algorithm, key, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee140() {
          var fn, result;
          return _regeneratorRuntime().wrap(function _callee140$(_context140) {
            while (1) switch (_context140.prev = _context140.next) {
              case 0:
                _context140.t0 = key.algorithm.hash.name.toUpperCase();
                _context140.next = _context140.t0 === "SHA-1" ? 3 : _context140.t0 === "SHA-256" ? 5 : _context140.t0 === "SHA-512" ? 7 : 9;
                break;
              case 3:
                fn = HmacSha1;
                return _context140.abrupt("break", 10);
              case 5:
                fn = HmacSha256;
                return _context140.abrupt("break", 10);
              case 7:
                fn = HmacSha512;
                return _context140.abrupt("break", 10);
              case 9:
                throw new OperationError("key.algorithm.hash: Is not recognized");
              case 10:
                result = new fn(key.data).process(BufferSourceConverter.toUint8Array(data)).finish().result;
                return _context140.abrupt("return", BufferSourceConverter.toArrayBuffer(result));
              case 12:
              case "end":
                return _context140.stop();
            }
          }, _callee140);
        }));
      }
    }, {
      key: "onVerify",
      value: function onVerify(algorithm, key, signature, data) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee141() {
          var signature2;
          return _regeneratorRuntime().wrap(function _callee141$(_context141) {
            while (1) switch (_context141.prev = _context141.next) {
              case 0:
                _context141.next = 2;
                return this.onSign(algorithm, key, data);
              case 2:
                signature2 = _context141.sent;
                return _context141.abrupt("return", Convert.ToHex(signature2) === Convert.ToHex(signature));
              case 4:
              case "end":
                return _context141.stop();
            }
          }, _callee141, this);
        }));
      }
    }, {
      key: "onImportKey",
      value: function onImportKey(format, keyData, algorithm, extractable, keyUsages) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee142() {
          var key;
          return _regeneratorRuntime().wrap(function _callee142$(_context142) {
            while (1) switch (_context142.prev = _context142.next) {
              case 0:
                _context142.t0 = format.toLowerCase();
                _context142.next = _context142.t0 === "jwk" ? 3 : _context142.t0 === "raw" ? 5 : 9;
                break;
              case 3:
                key = JsonParser.fromJSON(keyData, {
                  targetSchema: HmacCryptoKey
                });
                return _context142.abrupt("break", 10);
              case 5:
                if (BufferSourceConverter.isBufferSource(keyData)) {
                  _context142.next = 7;
                  break;
                }
                throw new TypeError("keyData: Is not ArrayBuffer or ArrayBufferView");
              case 7:
                key = new HmacCryptoKey(algorithm, extractable, keyUsages, BufferSourceConverter.toUint8Array(keyData));
                return _context142.abrupt("break", 10);
              case 9:
                throw new OperationError("format: Must be 'jwk' or 'raw'");
              case 10:
                key.algorithm = {
                  hash: {
                    name: algorithm.hash.name
                  },
                  name: this.name,
                  length: key.data.length << 3
                };
                key.extractable = extractable;
                key.usages = keyUsages;
                return _context142.abrupt("return", key);
              case 14:
              case "end":
                return _context142.stop();
            }
          }, _callee142, this);
        }));
      }
    }, {
      key: "onExportKey",
      value: function onExportKey(format, key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee143() {
          var jwk;
          return _regeneratorRuntime().wrap(function _callee143$(_context143) {
            while (1) switch (_context143.prev = _context143.next) {
              case 0:
                _context143.t0 = format.toLowerCase();
                _context143.next = _context143.t0 === "jwk" ? 3 : _context143.t0 === "raw" ? 5 : 6;
                break;
              case 3:
                jwk = JsonSerializer.toJSON(key);
                return _context143.abrupt("return", jwk);
              case 5:
                return _context143.abrupt("return", new Uint8Array(key.data).buffer);
              case 6:
                throw new OperationError("format: Must be 'jwk' or 'raw'");
              case 7:
              case "end":
                return _context143.stop();
            }
          }, _callee143);
        }));
      }
    }, {
      key: "checkCryptoKey",
      value: function checkCryptoKey(key, keyUsage) {
        _get(_getPrototypeOf(HmacProvider.prototype), "checkCryptoKey", this).call(this, key, keyUsage);
        if (!(key instanceof HmacCryptoKey)) {
          throw new TypeError("key: Is not HMAC CryptoKey");
        }
      }
    }]);
    return HmacProvider;
  }(HmacProvider$1);
  var _WrappedNativeCryptoKey_nativeKey;
  var WrappedNativeCryptoKey = function (_CryptoKey9) {
    _inherits(WrappedNativeCryptoKey, _CryptoKey9);
    var _super143 = _createSuper(WrappedNativeCryptoKey);
    function WrappedNativeCryptoKey(algorithm, extractable, type, usages, nativeKey) {
      var _this115;
      _classCallCheck(this, WrappedNativeCryptoKey);
      _this115 = _super143.call(this, algorithm, extractable, type, usages);
      _WrappedNativeCryptoKey_nativeKey.set(_assertThisInitialized(_this115), void 0);
      __classPrivateFieldSet(_assertThisInitialized(_this115), _WrappedNativeCryptoKey_nativeKey, nativeKey, "f");
      return _this115;
    }
    _createClass(WrappedNativeCryptoKey, [{
      key: "getNative",
      value: function getNative() {
        return __classPrivateFieldGet(this, _WrappedNativeCryptoKey_nativeKey, "f");
      }
    }]);
    return WrappedNativeCryptoKey;
  }(CryptoKey);
  _WrappedNativeCryptoKey_nativeKey = new WeakMap();
  var SubtleCrypto = function (_SubtleCrypto$) {
    _inherits(SubtleCrypto, _SubtleCrypto$);
    var _super144 = _createSuper(SubtleCrypto);
    function SubtleCrypto() {
      var _this116;
      _classCallCheck(this, SubtleCrypto);
      _this116 = _super144.call(this);
      _this116.browserInfo = BrowserInfo();
      _this116.providers.set(new AesCbcProvider());
      _this116.providers.set(new AesCtrProvider());
      _this116.providers.set(new AesEcbProvider());
      _this116.providers.set(new AesGcmProvider());
      _this116.providers.set(new AesKwProvider());
      _this116.providers.set(new DesCbcProvider());
      _this116.providers.set(new DesEde3CbcProvider());
      _this116.providers.set(new RsaSsaProvider());
      _this116.providers.set(new RsaPssProvider());
      _this116.providers.set(new RsaOaepProvider());
      _this116.providers.set(new RsaEsProvider());
      _this116.providers.set(new EcdsaProvider());
      _this116.providers.set(new EcdhProvider());
      _this116.providers.set(new Sha1Provider());
      _this116.providers.set(new Sha256Provider());
      _this116.providers.set(new Sha512Provider());
      _this116.providers.set(new Pbkdf2Provider());
      _this116.providers.set(new HmacProvider());
      _this116.providers.set(new EdDsaProvider());
      _this116.providers.set(new EcdhEsProvider());
      _this116.providers.set(new Sha3256Provider());
      _this116.providers.set(new Sha3384Provider());
      _this116.providers.set(new Sha3512Provider());
      _this116.providers.set(new Shake128Provider());
      _this116.providers.set(new Shake256Provider());
      return _this116;
    }
    _createClass(SubtleCrypto, [{
      key: "digest",
      value: function digest() {
        for (var _len39 = arguments.length, args = new Array(_len39), _key41 = 0; _key41 < _len39; _key41++) {
          args[_key41] = arguments[_key41];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee144() {
          return _regeneratorRuntime().wrap(function _callee144$(_context144) {
            while (1) switch (_context144.prev = _context144.next) {
              case 0:
                return _context144.abrupt("return", this.wrapNative.apply(this, ["digest"].concat(args)));
              case 1:
              case "end":
                return _context144.stop();
            }
          }, _callee144, this);
        }));
      }
    }, {
      key: "importKey",
      value: function importKey() {
        for (var _len40 = arguments.length, args = new Array(_len40), _key42 = 0; _key42 < _len40; _key42++) {
          args[_key42] = arguments[_key42];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee145() {
          return _regeneratorRuntime().wrap(function _callee145$(_context145) {
            while (1) switch (_context145.prev = _context145.next) {
              case 0:
                this.fixFirefoxEcImportPkcs8(args);
                return _context145.abrupt("return", this.wrapNative.apply(this, ["importKey"].concat(args)));
              case 2:
              case "end":
                return _context145.stop();
            }
          }, _callee145, this);
        }));
      }
    }, {
      key: "exportKey",
      value: function exportKey() {
        for (var _len41 = arguments.length, args = new Array(_len41), _key43 = 0; _key43 < _len41; _key43++) {
          args[_key43] = arguments[_key43];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee146() {
          return _regeneratorRuntime().wrap(function _callee146$(_context146) {
            while (1) switch (_context146.prev = _context146.next) {
              case 0:
                _context146.next = 2;
                return this.fixFirefoxEcExportPkcs8(args);
              case 2:
                _context146.t0 = _context146.sent;
                if (_context146.t0) {
                  _context146.next = 7;
                  break;
                }
                _context146.next = 6;
                return this.wrapNative.apply(this, ["exportKey"].concat(args));
              case 6:
                _context146.t0 = _context146.sent;
              case 7:
                return _context146.abrupt("return", _context146.t0);
              case 8:
              case "end":
                return _context146.stop();
            }
          }, _callee146, this);
        }));
      }
    }, {
      key: "generateKey",
      value: function generateKey() {
        for (var _len42 = arguments.length, args = new Array(_len42), _key44 = 0; _key44 < _len42; _key44++) {
          args[_key44] = arguments[_key44];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee147() {
          return _regeneratorRuntime().wrap(function _callee147$(_context147) {
            while (1) switch (_context147.prev = _context147.next) {
              case 0:
                return _context147.abrupt("return", this.wrapNative.apply(this, ["generateKey"].concat(args)));
              case 1:
              case "end":
                return _context147.stop();
            }
          }, _callee147, this);
        }));
      }
    }, {
      key: "sign",
      value: function sign() {
        for (var _len43 = arguments.length, args = new Array(_len43), _key45 = 0; _key45 < _len43; _key45++) {
          args[_key45] = arguments[_key45];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee148() {
          return _regeneratorRuntime().wrap(function _callee148$(_context148) {
            while (1) switch (_context148.prev = _context148.next) {
              case 0:
                return _context148.abrupt("return", this.wrapNative.apply(this, ["sign"].concat(args)));
              case 1:
              case "end":
                return _context148.stop();
            }
          }, _callee148, this);
        }));
      }
    }, {
      key: "verify",
      value: function verify() {
        for (var _len44 = arguments.length, args = new Array(_len44), _key46 = 0; _key46 < _len44; _key46++) {
          args[_key46] = arguments[_key46];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee149() {
          return _regeneratorRuntime().wrap(function _callee149$(_context149) {
            while (1) switch (_context149.prev = _context149.next) {
              case 0:
                return _context149.abrupt("return", this.wrapNative.apply(this, ["verify"].concat(args)));
              case 1:
              case "end":
                return _context149.stop();
            }
          }, _callee149, this);
        }));
      }
    }, {
      key: "encrypt",
      value: function encrypt() {
        for (var _len45 = arguments.length, args = new Array(_len45), _key47 = 0; _key47 < _len45; _key47++) {
          args[_key47] = arguments[_key47];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee150() {
          return _regeneratorRuntime().wrap(function _callee150$(_context150) {
            while (1) switch (_context150.prev = _context150.next) {
              case 0:
                return _context150.abrupt("return", this.wrapNative.apply(this, ["encrypt"].concat(args)));
              case 1:
              case "end":
                return _context150.stop();
            }
          }, _callee150, this);
        }));
      }
    }, {
      key: "decrypt",
      value: function decrypt() {
        for (var _len46 = arguments.length, args = new Array(_len46), _key48 = 0; _key48 < _len46; _key48++) {
          args[_key48] = arguments[_key48];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee151() {
          return _regeneratorRuntime().wrap(function _callee151$(_context151) {
            while (1) switch (_context151.prev = _context151.next) {
              case 0:
                return _context151.abrupt("return", this.wrapNative.apply(this, ["decrypt"].concat(args)));
              case 1:
              case "end":
                return _context151.stop();
            }
          }, _callee151, this);
        }));
      }
    }, {
      key: "wrapKey",
      value: function wrapKey() {
        for (var _len47 = arguments.length, args = new Array(_len47), _key49 = 0; _key49 < _len47; _key49++) {
          args[_key49] = arguments[_key49];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee152() {
          return _regeneratorRuntime().wrap(function _callee152$(_context152) {
            while (1) switch (_context152.prev = _context152.next) {
              case 0:
                return _context152.abrupt("return", this.wrapNative.apply(this, ["wrapKey"].concat(args)));
              case 1:
              case "end":
                return _context152.stop();
            }
          }, _callee152, this);
        }));
      }
    }, {
      key: "unwrapKey",
      value: function unwrapKey() {
        for (var _len48 = arguments.length, args = new Array(_len48), _key50 = 0; _key50 < _len48; _key50++) {
          args[_key50] = arguments[_key50];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee153() {
          return _regeneratorRuntime().wrap(function _callee153$(_context153) {
            while (1) switch (_context153.prev = _context153.next) {
              case 0:
                return _context153.abrupt("return", this.wrapNative.apply(this, ["unwrapKey"].concat(args)));
              case 1:
              case "end":
                return _context153.stop();
            }
          }, _callee153, this);
        }));
      }
    }, {
      key: "deriveBits",
      value: function deriveBits() {
        for (var _len49 = arguments.length, args = new Array(_len49), _key51 = 0; _key51 < _len49; _key51++) {
          args[_key51] = arguments[_key51];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee154() {
          return _regeneratorRuntime().wrap(function _callee154$(_context154) {
            while (1) switch (_context154.prev = _context154.next) {
              case 0:
                return _context154.abrupt("return", this.wrapNative.apply(this, ["deriveBits"].concat(args)));
              case 1:
              case "end":
                return _context154.stop();
            }
          }, _callee154, this);
        }));
      }
    }, {
      key: "deriveKey",
      value: function deriveKey() {
        for (var _len50 = arguments.length, args = new Array(_len50), _key52 = 0; _key52 < _len50; _key52++) {
          args[_key52] = arguments[_key52];
        }
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee155() {
          return _regeneratorRuntime().wrap(function _callee155$(_context155) {
            while (1) switch (_context155.prev = _context155.next) {
              case 0:
                return _context155.abrupt("return", this.wrapNative.apply(this, ["deriveKey"].concat(args)));
              case 1:
              case "end":
                return _context155.stop();
            }
          }, _callee155, this);
        }));
      }
    }, {
      key: "wrapNative",
      value: function wrapNative(method) {
        var _this117 = this;
        for (var _len51 = arguments.length, args = new Array(_len51 > 1 ? _len51 - 1 : 0), _key53 = 1; _key53 < _len51; _key53++) {
          args[_key53 - 1] = arguments[_key53];
        }
        var _superIndex = function _superIndex(name) {
          return _get(_getPrototypeOf(SubtleCrypto.prototype), name, _this117);
        };
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee156() {
          var nativeArgs, res, data, keyData, _res, _data, _keyData, _res2, _data2, _res3, _i24, _args156, arg, i, _arg, fn;
          return _regeneratorRuntime().wrap(function _callee156$(_context156) {
            while (1) switch (_context156.prev = _context156.next) {
              case 0:
                if (~["generateKey", "unwrapKey", "deriveKey", "importKey"].indexOf(method)) {
                  this.fixAlgorithmName(args);
                }
                _context156.prev = 1;
                if (!(method !== "digest" || !args.some(function (a) {
                  return a instanceof CryptoKey;
                }))) {
                  _context156.next = 9;
                  break;
                }
                nativeArgs = this.fixNativeArguments(method, args);
                Debug.info("Call native '".concat(method, "' method"), nativeArgs);
                _context156.next = 7;
                return exports.nativeSubtle[method].apply(exports.nativeSubtle, nativeArgs);
              case 7:
                res = _context156.sent;
                return _context156.abrupt("return", this.fixNativeResult(method, args, res));
              case 9:
                _context156.next = 14;
                break;
              case 11:
                _context156.prev = 11;
                _context156.t0 = _context156["catch"](1);
                Debug.warn("Error on native '".concat(method, "' calling. ").concat(_context156.t0.message), _context156.t0);
              case 14:
                if (!(method === "wrapKey")) {
                  _context156.next = 30;
                  break;
                }
                _context156.prev = 15;
                Debug.info("Trying to wrap key by using native functions", args);
                _context156.next = 19;
                return this.exportKey(args[0], args[1]);
              case 19:
                data = _context156.sent;
                keyData = args[0] === "jwk" ? Convert.FromUtf8String(JSON.stringify(data)) : data;
                _context156.next = 23;
                return this.encrypt(args[3], args[2], keyData);
              case 23:
                _res = _context156.sent;
                return _context156.abrupt("return", _res);
              case 27:
                _context156.prev = 27;
                _context156.t1 = _context156["catch"](15);
                Debug.warn("Cannot wrap key by native functions. ".concat(_context156.t1.message), _context156.t1);
              case 30:
                if (!(method === "unwrapKey")) {
                  _context156.next = 46;
                  break;
                }
                _context156.prev = 31;
                Debug.info("Trying to unwrap key by using native functions", args);
                _context156.next = 35;
                return this.decrypt(args[3], args[2], args[1]);
              case 35:
                _data = _context156.sent;
                _keyData = args[0] === "jwk" ? JSON.parse(Convert.ToUtf8String(_data)) : _data;
                _context156.next = 39;
                return this.importKey(args[0], _keyData, args[4], args[5], args[6]);
              case 39:
                _res2 = _context156.sent;
                return _context156.abrupt("return", _res2);
              case 43:
                _context156.prev = 43;
                _context156.t2 = _context156["catch"](31);
                Debug.warn("Cannot unwrap key by native functions. ".concat(_context156.t2.message), _context156.t2);
              case 46:
                if (!(method === "deriveKey")) {
                  _context156.next = 61;
                  break;
                }
                _context156.prev = 47;
                Debug.info("Trying to derive key by using native functions", args);
                _context156.next = 51;
                return this.deriveBits(args[0], args[1], args[2].length);
              case 51:
                _data2 = _context156.sent;
                _context156.next = 54;
                return this.importKey("raw", _data2, args[2], args[3], args[4]);
              case 54:
                _res3 = _context156.sent;
                return _context156.abrupt("return", _res3);
              case 58:
                _context156.prev = 58;
                _context156.t3 = _context156["catch"](47);
                Debug.warn("Cannot derive key by native functions. ".concat(_context156.t3.message), _context156.t3);
              case 61:
                if (!(method === "deriveBits" || method === "deriveKey")) {
                  _context156.next = 72;
                  break;
                }
                _i24 = 0, _args156 = args;
              case 63:
                if (!(_i24 < _args156.length)) {
                  _context156.next = 72;
                  break;
                }
                arg = _args156[_i24];
                if (!(_typeof(arg) === "object" && arg.public && SubtleCrypto.isAnotherKey(arg.public))) {
                  _context156.next = 69;
                  break;
                }
                _context156.next = 68;
                return this.castKey(arg.public);
              case 68:
                arg.public = _context156.sent;
              case 69:
                _i24++;
                _context156.next = 63;
                break;
              case 72:
                i = 0;
              case 73:
                if (!(i < args.length)) {
                  _context156.next = 82;
                  break;
                }
                _arg = args[i];
                if (!SubtleCrypto.isAnotherKey(_arg)) {
                  _context156.next = 79;
                  break;
                }
                _context156.next = 78;
                return this.castKey(_arg);
              case 78:
                args[i] = _context156.sent;
              case 79:
                i++;
                _context156.next = 73;
                break;
              case 82:
                fn = _superIndex(method);
                if (!(typeof fn === "function")) {
                  _context156.next = 85;
                  break;
                }
                return _context156.abrupt("return", fn.apply(this, args));
              case 85:
                throw new Error("Incorrect type of 'method'. Must be 'function'.");
              case 86:
              case "end":
                return _context156.stop();
            }
          }, _callee156, this, [[1, 11], [15, 27], [31, 43], [47, 58]]);
        }));
      }
    }, {
      key: "fixNativeArguments",
      value: function fixNativeArguments(method, args) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var res = _toConsumableArray(args);
        if (method === "importKey") {
          if (this.browserInfo.name === Browser.IE && ((_b = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === "jwk" && !BufferSourceConverter.isBufferSource(res[1])) {
            res[1] = Convert.FromUtf8String(JSON.stringify(res[1]));
          }
        }
        if (this.browserInfo.name === Browser.IE && args[1] instanceof WrappedNativeCryptoKey) {
          switch (method) {
            case "sign":
            case "verify":
            case "encrypt":
            case "decrypt":
              res[0] = Object.assign(Object.assign({}, this.prepareAlgorithm(res[0])), {
                hash: (_e = (_d = (_c = res[1]) === null || _c === void 0 ? void 0 : _c.algorithm) === null || _d === void 0 ? void 0 : _d.hash) === null || _e === void 0 ? void 0 : _e.name
              });
              break;
            case "wrapKey":
            case "unwrapKey":
              res[4] = Object.assign(Object.assign({}, this.prepareAlgorithm(res[4])), {
                hash: (_h = (_g = (_f = res[3]) === null || _f === void 0 ? void 0 : _f.algorithm) === null || _g === void 0 ? void 0 : _g.hash) === null || _h === void 0 ? void 0 : _h.name
              });
              break;
          }
        }
        for (var i = 0; i < res.length; i++) {
          var arg = res[i];
          if (arg instanceof WrappedNativeCryptoKey) {
            res[i] = arg.getNative();
          }
        }
        return res;
      }
    }, {
      key: "fixNativeResult",
      value: function fixNativeResult(method, args, res) {
        var _a, _b;
        if (this.browserInfo.name === Browser.IE) {
          if (method === "exportKey") {
            if (((_b = (_a = args[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === "jwk" && res instanceof ArrayBuffer) {
              return JSON.parse(Convert.ToUtf8String(res));
            }
          }
          if ("privateKey" in res) {
            var privateKeyUsages = ["sign", "decrypt", "unwrapKey", "deriveKey", "deriveBits"];
            var publicKeyUsages = ["verify", "encrypt", "wrapKey"];
            return {
              privateKey: this.wrapNativeKey(res.privateKey, args[0], args[1], args[2].filter(function (o) {
                return privateKeyUsages.includes(o);
              })),
              publicKey: this.wrapNativeKey(res.publicKey, args[0], args[1], args[2].filter(function (o) {
                return publicKeyUsages.includes(o);
              }))
            };
          } else if ("extractable" in res) {
            var algorithm;
            var usages;
            switch (method) {
              case "importKey":
                algorithm = args[2];
                usages = args[4];
                break;
              case "unwrapKey":
                algorithm = args[4];
                usages = args[6];
                break;
              case "generateKey":
                algorithm = args[0];
                usages = args[2];
                break;
              default:
                throw new OperationError("Cannot wrap native key. Unsupported method in use");
            }
            return this.wrapNativeKey(res, algorithm, res.extractable, usages);
          }
        }
        return res;
      }
    }, {
      key: "wrapNativeKey",
      value: function wrapNativeKey(key, algorithm, extractable, keyUsages) {
        if (this.browserInfo.name === Browser.IE) {
          var algs = ["RSASSA-PKCS1-v1_5", "RSA-PSS", "RSA-OAEP", "AES-CBC", "AES-CTR", "AES-KW", "HMAC"];
          var index = algs.map(function (o) {
            return o.toLowerCase();
          }).indexOf(key.algorithm.name.toLowerCase());
          if (index !== -1) {
            var alg = this.prepareAlgorithm(algorithm);
            var newAlg = Object.assign(Object.assign({}, key.algorithm), {
              name: algs[index]
            });
            if (SubtleCrypto$1.isHashedAlgorithm(alg)) {
              newAlg.hash = {
                name: alg.hash.name.toUpperCase()
              };
            }
            Debug.info("Wrapping ".concat(algs[index], " crypto key to WrappedNativeCryptoKey"));
            return new WrappedNativeCryptoKey(newAlg, extractable, key.type, keyUsages, key);
          }
        }
        return key;
      }
    }, {
      key: "castKey",
      value: function castKey(key) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee157() {
          var provider, jwk;
          return _regeneratorRuntime().wrap(function _callee157$(_context157) {
            while (1) switch (_context157.prev = _context157.next) {
              case 0:
                Debug.info("Cast native CryptoKey to linter key.", key);
                if (key.extractable) {
                  _context157.next = 3;
                  break;
                }
                throw new Error("Cannot cast unextractable crypto key");
              case 3:
                provider = this.getProvider(key.algorithm.name);
                _context157.next = 6;
                return this.exportKey("jwk", key);
              case 6:
                jwk = _context157.sent;
                return _context157.abrupt("return", provider.importKey("jwk", jwk, key.algorithm, true, key.usages));
              case 8:
              case "end":
                return _context157.stop();
            }
          }, _callee157, this);
        }));
      }
    }, {
      key: "fixAlgorithmName",
      value: function fixAlgorithmName(args) {
        if (this.browserInfo.name === Browser.Edge) {
          for (var i = 0; i < args.length; i++) {
            var arg = args[0];
            if (typeof arg === "string") {
              var _iterator20 = _createForOfIteratorHelper(this.providers.algorithms),
                _step20;
              try {
                for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
                  var algorithm = _step20.value;
                  if (algorithm.toLowerCase() === arg.toLowerCase()) {
                    args[i] = algorithm;
                    break;
                  }
                }
              } catch (err) {
                _iterator20.e(err);
              } finally {
                _iterator20.f();
              }
            } else if (_typeof(arg) === "object" && typeof arg.name === "string") {
              var _iterator21 = _createForOfIteratorHelper(this.providers.algorithms),
                _step21;
              try {
                for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
                  var _algorithm = _step21.value;
                  if (_algorithm.toLowerCase() === arg.name.toLowerCase()) {
                    arg.name = _algorithm;
                  }
                  if (typeof arg.hash === "string" && _algorithm.toLowerCase() === arg.hash.toLowerCase() || _typeof(arg.hash) === "object" && typeof arg.hash.name === "string" && _algorithm.toLowerCase() === arg.hash.name.toLowerCase()) {
                    arg.hash = {
                      name: _algorithm
                    };
                  }
                }
              } catch (err) {
                _iterator21.e(err);
              } finally {
                _iterator21.f();
              }
            }
          }
        }
      }
    }, {
      key: "fixFirefoxEcImportPkcs8",
      value: function fixFirefoxEcImportPkcs8(args) {
        var preparedAlgorithm = this.prepareAlgorithm(args[2]);
        var algName = preparedAlgorithm.name.toUpperCase();
        if (this.browserInfo.name === Browser.Firefox && args[0] === "pkcs8" && ~["ECDSA", "ECDH"].indexOf(algName) && ~["P-256", "P-384", "P-521"].indexOf(preparedAlgorithm.namedCurve)) {
          if (!BufferSourceConverter.isBufferSource(args[1])) {
            throw new TypeError("data: Is not ArrayBuffer or ArrayBufferView");
          }
          var preparedData = BufferSourceConverter.toArrayBuffer(args[1]);
          var keyInfo = AsnConvert.parse(preparedData, index$1.PrivateKeyInfo);
          var privateKey = AsnConvert.parse(keyInfo.privateKey, index$1.EcPrivateKey);
          var jwk = JsonSerializer.toJSON(privateKey);
          jwk.ext = true;
          jwk.key_ops = args[4];
          jwk.crv = preparedAlgorithm.namedCurve;
          jwk.kty = "EC";
          args[0] = "jwk";
          args[1] = jwk;
        }
      }
    }, {
      key: "fixFirefoxEcExportPkcs8",
      value: function fixFirefoxEcExportPkcs8(args) {
        return __awaiter(this, void 0, void 0, _regeneratorRuntime().mark(function _callee158() {
          var jwk, ecKey, keyInfo;
          return _regeneratorRuntime().wrap(function _callee158$(_context158) {
            while (1) switch (_context158.prev = _context158.next) {
              case 0:
                _context158.prev = 0;
                if (!(this.browserInfo.name === Browser.Firefox && args[0] === "pkcs8" && ~["ECDSA", "ECDH"].indexOf(args[1].algorithm.name) && ~["P-256", "P-384", "P-521"].indexOf(args[1].algorithm.namedCurve))) {
                  _context158.next = 11;
                  break;
                }
                _context158.next = 4;
                return this.exportKey("jwk", args[1]);
              case 4:
                jwk = _context158.sent;
                ecKey = JsonParser.fromJSON(jwk, {
                  targetSchema: index$1.EcPrivateKey
                });
                keyInfo = new index$1.PrivateKeyInfo();
                keyInfo.privateKeyAlgorithm.algorithm = EcCrypto.ASN_ALGORITHM;
                keyInfo.privateKeyAlgorithm.parameters = AsnConvert.serialize(new index$1.ObjectIdentifier(getOidByNamedCurve$1(args[1].algorithm.namedCurve)));
                keyInfo.privateKey = AsnConvert.serialize(ecKey);
                return _context158.abrupt("return", AsnConvert.serialize(keyInfo));
              case 11:
                _context158.next = 17;
                break;
              case 13:
                _context158.prev = 13;
                _context158.t0 = _context158["catch"](0);
                Debug.error(_context158.t0);
                return _context158.abrupt("return", null);
              case 17:
              case "end":
                return _context158.stop();
            }
          }, _callee158, this, [[0, 13]]);
        }));
      }
    }], [{
      key: "isAnotherKey",
      value: function isAnotherKey(key) {
        if (_typeof(key) === "object" && typeof key.type === "string" && typeof key.extractable === "boolean" && _typeof(key.algorithm) === "object") {
          return !(key instanceof CryptoKey);
        }
        return false;
      }
    }]);
    return SubtleCrypto;
  }(SubtleCrypto$1);
  SubtleCrypto.methods = ["digest", "importKey", "exportKey", "sign", "verify", "generateKey", "encrypt", "decrypt", "deriveBits", "deriveKey", "wrapKey", "unwrapKey"];
  var Crypto = function (_Crypto$) {
    _inherits(Crypto, _Crypto$);
    var _super145 = _createSuper(Crypto);
    function Crypto() {
      var _this118;
      _classCallCheck(this, Crypto);
      _this118 = _super145.apply(this, arguments);
      _this118.subtle = new SubtleCrypto();
      return _this118;
    }
    _createClass(Crypto, [{
      key: "nativeCrypto",
      get: function get() {
        return exports.nativeCrypto;
      }
    }, {
      key: "getRandomValues",
      value: function getRandomValues(array) {
        return exports.nativeCrypto.getRandomValues(array);
      }
    }]);
    return Crypto;
  }(Crypto$1);
  function WrapFunction(subtle, name) {
    var fn = subtle[name];
    subtle[name] = function () {
      var args = arguments;
      return new Promise(function (resolve, reject) {
        var op = fn.apply(subtle, args);
        op.oncomplete = function (e) {
          resolve(e.target.result);
        };
        op.onerror = function (e) {
          reject("Error on running '".concat(name, "' function"));
        };
      });
    };
  }
  if (typeof self !== "undefined" && self["msCrypto"]) {
    WrapFunction(exports.nativeSubtle, "generateKey");
    WrapFunction(exports.nativeSubtle, "digest");
    WrapFunction(exports.nativeSubtle, "sign");
    WrapFunction(exports.nativeSubtle, "verify");
    WrapFunction(exports.nativeSubtle, "encrypt");
    WrapFunction(exports.nativeSubtle, "decrypt");
    WrapFunction(exports.nativeSubtle, "importKey");
    WrapFunction(exports.nativeSubtle, "exportKey");
    WrapFunction(exports.nativeSubtle, "wrapKey");
    WrapFunction(exports.nativeSubtle, "unwrapKey");
    WrapFunction(exports.nativeSubtle, "deriveKey");
    WrapFunction(exports.nativeSubtle, "deriveBits");
  }
  if (!Math.imul) {
    Math.imul = function imul(a, b) {
      var ah = a >>> 16 & 0xffff;
      var al = a & 0xffff;
      var bh = b >>> 16 & 0xffff;
      var bl = b & 0xffff;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    };
  }
  var window$1 = self;
  if (exports.nativeCrypto) {
    Object.freeze(exports.nativeCrypto.getRandomValues);
  }
  try {
    delete self.crypto;
    window$1.crypto = new Crypto();
    Object.freeze(window$1.crypto);
  } catch (e) {
    Debug.error(e);
  }
  var crypto = window$1.crypto;
  exports.Crypto = Crypto;
  exports.CryptoKey = CryptoKey;
  exports.crypto = crypto;
  exports.setCrypto = setCrypto;
  return exports;
}({}, self.elliptic);
