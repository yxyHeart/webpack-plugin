const deepcopy = (target, map = new WeakMap()) => {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  const constructor = target.constructor;
  if (
    /^(Function|RegExp|Date|Map|WeakMap|Set|WeakSet)$/.test(constructor.name)
  ) {
    return new constructor(target);
  }
  if (map.has(target)) {
    return map.get(target);
  }
  const ans = Array.isArray(target) ? [] : {};
  map.set(target, ans);
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      ans[key] = deepcopy(target[key], map);
    }
  }
  return ans;
};
