import { renderHook, act } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import useCounter from './useCounter';

test('usa el valor inicial', () => {
  const { result } = renderHook(() => useCounter({ initial: 10 }));
  expect(result.current.count).toBe(10);
});

test('inc/dec/reset funcionan con step', () => {
  const { result } = renderHook(() => useCounter({ initial: 0, step: 2 }));

  act(() => result.current.inc()); // 0 -> 2
  expect(result.current.count).toBe(2);

  act(() => result.current.dec()); // 2 -> 0
  expect(result.current.count).toBe(0);

  act(() => result.current.reset()); // 0 -> 0
  expect(result.current.count).toBe(0);

  act(() => result.current.reset(5)); // 0 -> 5
  expect(result.current.count).toBe(5);
});

test('onChange se llama con (actual, previo)', () => {
  const onChange = vi.fn();
  const { result } = renderHook(() => useCounter({ initial: 1, step: 3, onChange }));

  expect(onChange).not.toHaveBeenCalled();

  act(() => result.current.inc()); // 1 -> 4
  expect(onChange).toHaveBeenLastCalledWith(4, 1);

  act(() => result.current.dec()); // 4 -> 1
  expect(onChange).toHaveBeenLastCalledWith(1, 4);
});
