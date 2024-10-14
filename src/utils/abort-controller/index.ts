const controller = new AbortController();
const signal = controller.signal;

fetch('https://www.baidu.com', { signal })
  .then((res) => {
    console.log(res.json());
  })
  .catch((e) => {
    console.log(e);
  });

setTimeout(() => {
  controller.abort();
  console.log('abort');
}, 2000);
