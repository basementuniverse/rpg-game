declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    public constructor();
  }

  export default WebpackWorker;
}

declare type Colour = string;

declare type ContentItemLoader = <T>(...args: string[]) => Promise<T>;

declare type EntityData = {
  id: string;
  name: string;
};
