import { ComponentComparisonType } from '../../enums';
import { SpriteComponent, TransformsComponent } from '../components';
import Entity from '../Entity';
import System from './System';

export class RenderSystem extends System {
  public update(): void {}

  public draw(context: CanvasRenderingContext2D, entities: Entity[]): void {
    entities.forEach(entity => {

      // Only render entities with transforms and sprite components
      if (
        entity.hasComponents(ComponentComparisonType.All, 'transforms', 'sprite')
      ) {
        const sprite = entity.components['sprite'] as SpriteComponent;
        const transforms = entity.components['transforms'] as TransformsComponent;

        context.save();
        context.fillStyle = sprite.tempColour;
        context.fillRect(
          transforms.position.x,
          transforms.position.y,
          transforms.size.x,
          transforms.size.y
        );
        context.restore();
      }
    });
  }
}
