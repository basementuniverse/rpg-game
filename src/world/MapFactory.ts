import Map, { MapData } from './Map';

export default class MapFactory {

  /**
   * Create a map from JSON data
   */
  public static fromData(data: MapData): Map {
    const map = new Map(
      data.id,
      data.name,
      data.width,
      data.height
    );
    return map;
  }
}
