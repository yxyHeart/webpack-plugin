class Pool {
  constructor(mx) {
    this.mx = mx;
    this.q = [];
    this.cur = 0;
  }
  addTask(f) {
    return new Promise((res, rej) => {
      this.q.push({
        res,
        rej,
        f,
      });
      this.run();
    });
  }
  run() {
    if (this.cur < this.mx && this.q.length > 0) {
      this.cur++;
      const { res, rej, f } = this.q.shift();
      Promise.resolve(f())
        .then((r) => {
          res(r);
        })
        .catch((e) => {
          rej(e);
        })
        .finally(() => {
          this.cur--;
          this.run();
        });
    }
  }
}
const pool = new Pool(2);
const createTask = (t) => {
  return () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(t);
      }, 100 * t);
    });
  };
};

const tasks = [
  createTask(1),
  createTask(2),
  createTask(3),
  createTask(4),
  createTask(5),
  createTask(6),
  createTask(7),
  createTask(8),
  createTask(9),
  createTask(10),
  createTask(11),
  createTask(12),
];

tasks.forEach((t) => {
  pool.addTask(t).then((r) => {
    console.log(r, Date.now());
  });
});
