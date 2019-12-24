import { } from 'react'; // don't remove this line
declare module 'react' {
  export const useImperativeHandle: typeof useImperativeMethods;
  export function useDebugValue<T>(
    value: T,
    formatter?: (value: T) => any
  ): void;
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    for?: string
  }
}
