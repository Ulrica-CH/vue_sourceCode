import { initMixin } from "./init";
export default function Vue(options) {
  // 原型上方法
  this._init(options);
}
// 混入_init方法
initMixin(Vue);
