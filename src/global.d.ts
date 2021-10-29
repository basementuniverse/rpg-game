declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    public constructor();
  }

  export default WebpackWorker;
}

declare type Colour = string;
