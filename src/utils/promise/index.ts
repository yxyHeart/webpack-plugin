const promiseAllSettled = (promises: Promise<any>[]) => {
  return new Promise((res) => {
    let count = 0;
    const result: any[] = [];
    const len = promises.length;
    for (let i = 0; i < len; i++) {
      promises[i]
        .then((res) => {
          result[i] = {
            status: 'fulfilled',
            value: res,
          };
        })
        .catch((err) => {
          result[i] = {
            status: 'rejected',
            reason: err,
          };
        })
        .finally(() => {
          count++;
          if (count === len) {
            res(result);
          }
        });
    }
  });
};

const promiseRace = (promises: Promise<any>[]) => {
  return new Promise((res, rej) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((x) => {
          res(x);
        })
        .catch((err) => {
          rej(err);
        });
    }
  });
};

const promiseAny = (promises: Promise<any>[]) => {
  return new Promise((res, rej) => {
    let count = 0;
    const len = promises.length;
    for (let i = 0; i < len; i++) {
      promises[i]
        .then((x) => {
          res(x);
        })
        .catch((err) => {
          count++;
          if (count === len) {
            rej(err);
          }
        });
    }
  });
};
