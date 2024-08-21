const _new = (fn, ...args) => {
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  if (typeof res === "object") {
    return res;
  }
  return obj;
};
