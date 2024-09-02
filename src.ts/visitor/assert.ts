export function assert(
  condition: any,
  message: string = "assertion failed",
): any {
  if (!condition) throw Error(message);
  return condition;
}
