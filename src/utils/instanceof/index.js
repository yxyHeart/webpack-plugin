const _instanceof = (obj, f) => {
  let p = Object.getPrototypeOf(obj);
  while (p) {
    if (p === f.prototype) {
      return true;
    }
    p = Object.getPrototypeOf(p);
  }

  return false;
};
