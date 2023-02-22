export function getError({type, message}: {type: string; message?: string}) {
  return {type, message: message || type};
}
