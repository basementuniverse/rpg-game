declare type Colour = string;

declare type ContentItemLoader = <T>(...args: string[]) => Promise<T>;
