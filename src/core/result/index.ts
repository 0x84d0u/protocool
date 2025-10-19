
export type Ok<T> = { ok: true; value: T };
export type Ko<E extends Error> = { ok: false; error: E };
export type Any<T, E extends Error = Error> = Ok<T> | Ko<E>;

export const ok = <T>(value: T): Ok<T> => ({
  ok: true,
  value
})

export const ko = <E extends Error>(error: E) => ({
  ok: false,
  error
})

export const wrap = <T>(fn: () => T) => {
  try {
    return ok(fn());
  } catch (error: any) {
    return ko(error);
  }
}
