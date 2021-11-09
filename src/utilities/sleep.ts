/**
 * Pause execution for some number of milliseconds
 */
export default function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
