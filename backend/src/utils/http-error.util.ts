export function createHttpError(status: number, code: string, message: string) {
  const err = new Error(message) as Error & { status?: number; code?: string };
  err.status = status;
  err.code = code;
  return err;
}
