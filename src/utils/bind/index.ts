const _bind = (fn: Function, obj: Record<any, any>, ...args: any[]) => {
  return (...args2: any[]) => {
    obj.temp = fn;
    const ans = obj.temp(...args, ...args2);
    delete obj.temp;
    return ans;
  };
};

export { _bind };
