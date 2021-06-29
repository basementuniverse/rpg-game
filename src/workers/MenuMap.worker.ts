// const menuMapContext: Worker = self as any as Worker;

import GameWorker from './GameWorker';

// menuMapContext.addEventListener('message', event => {
//   menuMapContext.postMessage(`menumapworker ${event.data}`);
// });

export default class MenuMapWorker implements GameWorker {
  public doSomething(): string {
    return 'MenuMapWorker';
  }
}
