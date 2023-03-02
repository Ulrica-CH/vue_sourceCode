import { observe } from "./observe/index";

export function initState(vm) {
  const opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }
}
function proxy(vm, target, key) {
  Object.defineProperty({
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    },
  });
}
export function initData(vm) {
  let data = vm.$options.data;
  data = typeof data === "function" ? data.call(vm) : data;
  vm._data = data;
  // 响应式处理
  observe(data);

  // vm._data 简化为vm.
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}
