const Fn = {
    /**
     * @param {number} time
     * @returns {Promise<void>}
     */
    sleep(time) {
        return new Promise(res => setInterval(res, time));
    },
    /**
     * @template T
     * @param {() => T} fn Function that we will wait for the return
     * @param {object} options
     * @param {number | undefined} options.times Times that `fn` will be executed
     * @param {number | undefined} options.delay Delay between the executions of `fn`
     * @returns {Promise<T>}
     */
    waitFor(fn, { times, delay } = {}) {
        if (!delay) delay = 500;
        if (!times) times = 50;
        return new Promise(async (res, rej) => {
            for (let i = 0; i < times; i++) {
                try {
                    if (result = fn())
                        return res(result);
                    await this.sleep(delay);
                } catch (err) {
                    return rej(err);
                }
            }
            return rej("timed out");
        });
    }
}
