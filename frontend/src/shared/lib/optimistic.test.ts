import { describe, it, expect } from 'vitest';
import { OptimisticManager } from './optimistic';

describe('OptimisticManager', () => {
  it('reapplies pending mutations on reconcile', () => {
    const manager = new OptimisticManager<{ value: number }>();
    const initial = { value: 1 };
    const { nextState } = manager.begin(initial, {
      description: 'increment',
      apply: (state) => ({ value: state.value + 1 }),
    });
    expect(nextState.value).toBe(2);

    const reconciled = manager.reconcile({ value: 10 });
    expect(reconciled.value).toBe(11);
  });

  it('rolls back on rejection', () => {
    const manager = new OptimisticManager<{ value: number }>();
    const initial = { value: 5 };
    const optimistic = manager.begin(initial, {
      description: 'decrement',
      apply: (state) => ({ value: state.value - 2 }),
    });
    const rolledBack = manager.reject(optimistic.nextState, optimistic.mutation.id);
    expect(rolledBack.value).toBe(5);
  });
});
