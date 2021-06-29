import MenuMapWorker from './MenuMap.worker';
import TestWorker from './TestWorker.worker';

const context: Worker = self as any as Worker;

context.addEventListener('message', event => {
  switch (event.data) {
    case 'menu':
      context.postMessage(`worker ${new MenuMapWorker().doSomething()}`);
      break;
    case 'test':
      context.postMessage(`worker ${new TestWorker().doSomething()}`);
      break;
    default:
      context.postMessage('worker unknown');
      break;
  }
});
