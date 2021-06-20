declare type ContentItemType = 'image' | 'sound' | 'font' | 'json';

declare type ContentItem = {
  name: string;
  type: ContentItemType;
  args: string[];
};

declare type ContentItemLoader = <T>(...args: string[]) => Promise<T>;
