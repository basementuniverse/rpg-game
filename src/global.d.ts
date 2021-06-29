declare type Colour = string;

declare type ContentItemLoader = <T>(...args: string[]) => Promise<T>;

declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    public constructor();
  }

  export default WebpackWorker;
}
