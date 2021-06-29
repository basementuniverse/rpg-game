// const testContext: Worker = self as any as Worker;

import GameWorker from './GameWorker';

// testContext.addEventListener('message', event => {
//   testContext.postMessage(`testworker ${event.data}`);
// });

export default class TestWorker implements GameWorker {
  public doSomething(): string {
    return 'TestWorker';
  }
}
