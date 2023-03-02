(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  // src/obserber/index.js
  class Observer {
    // 观测值
    constructor(value) {
      Object.defineProperty(value, "__ob__", {
        //  值指代的就是Observer的实例
        value: this,
        //  不可枚举
        enumerable: false,
        writable: true,
        configurable: true,
      });

      if (Array.isArray(value)) {
        // 重写数组原型方法来对数组的7种方法进行拦截
        value.__proto__ = arrayMethods;
        // 如果数组中包含数组，递归处理
        this.observeArray(vlaue);
      } else this.walk(value);
    }
    walk(data) {
      // 对象上的所有属性依次进行观测
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = data[key];
        defineReactive(data, key, value);
      }
    }
    observeArray(value) {
      value.forEach((item) => {
        observe(item);
      });
    }
  }
  // Object.defineProperty数据劫持核心 兼容性在ie9以及以上
  function defineReactive(data, key, value) {
    observe(value); // 递归关键
    // --如果value还是一个对象会继续走一遍odefineReactive 层层遍历一直到value不是对象才停止
    //   思考？如果Vue数据嵌套层级过深 >>性能会受影响
    Object.defineProperty(data, key, {
      get() {
        console.log("获取值");
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        console.log("设置值");
        value = newValue;
      },
    });
  }
  function observe(value) {
    // 如果传过来的是对象或者数组 进行属性劫持
    if (typeof data !== "object" || data === null) return;
    if (data._ob__ instanceof Observer) return data._ob__;
    return new Observer(value);
  }

  function initState(vm) {
    const opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }
  function initData(vm) {
    let data = vm.$options.data;
    data = typeof data === "function" ? data.call(vm) : data;
    vm._data = data;
    // 响应式处理
    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;
      initState(vm);
    };
  }

  function Vue(options) {
    // 原型上方法
    this._init(options);
  }
  // 混入_init方法
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
