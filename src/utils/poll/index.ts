type PollOptions<T> = {
  fn: () => Promise<T>;
  interval: number;
  maxAttempts: number;
  validate: (value: T) => boolean;
};

function poll<T>(options: PollOptions<T>) {
  const { fn, interval, maxAttempts, validate } = options;

  let attempts = 0;
  const executePoll = async (
    resolve: (value: T) => void,
    reject: (reason: unknown) => void
  ) => {
    attempts++;
    const result = await fn();
    if (validate(result)) {
      resolve(result);
    } else if (attempts >= maxAttempts) {
      reject(new Error("Max attempts reached"));
    } else {
      setTimeout(() => {
        executePoll(resolve, reject);
      }, interval);
    }
  };
  return new Promise(executePoll);
}
