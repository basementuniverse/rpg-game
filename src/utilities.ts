import { vec } from '@basementuniverse/commonjs';

/**
 * Pause execution for some number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Draw a rounded rectangle path
 */
export function roundedRectangle(
  context: CanvasRenderingContext2D,
  position: vec,
  size: vec,
  radius: number
): void {
  context.beginPath();

  // Top edge
  context.moveTo(position.x + radius, position.y);
  context.lineTo(position.x + size.x - radius, position.y);
  context.quadraticCurveTo( // Top right corner
    position.x + size.x,
    position.y,
    position.x + size.x,
    position.y + radius
  );

  // Right edge
  context.lineTo(position.x + size.x, position.y + size.y - radius);
  context.quadraticCurveTo( // Bottom right corner
    position.x + size.x,
    position.y + size.y,
    position.x + size.x - radius,
    position.y + size.y
  );

  // Bottom edge
  context.lineTo(position.x + radius, position.y + size.y);
  context.quadraticCurveTo( // Bottom left corner
    position.x,
    position.y + size.y,
    position.x,
    position.y + size.y - radius
  );

  // Left edge
  context.lineTo(position.x, position.y + radius);
  context.quadraticCurveTo( // Top left corner
    position.x,
    position.y,
    position.x + radius,
    position.y
  );
  context.closePath();
}
