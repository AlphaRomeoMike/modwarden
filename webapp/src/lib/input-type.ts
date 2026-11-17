type InputTypeProps<T> = T extends string ? { type: T } : never;

/**
 * Preact 11 types <input> props per `type`, so `type={show ? 'text' : 'password'}` no longer type-checks.
 * Spreading one object per member keeps each branch on its own variant: <input {...inputType(show ? 'text' : 'password')} />
 */
export const inputType = <T extends string>(type: T) => ({ type }) as InputTypeProps<T>;
