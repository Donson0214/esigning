import { createId } from './ids';

export type OptimisticMutation<State> = {
  id: string;
  correlationId: string;
  description?: string;
  apply: (state: State) => State;
};

type PendingMutation<State> = {
  mutation: OptimisticMutation<State>;
  snapshot: State;
};

const cloneState = <T>(state: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(state);
  }
  return JSON.parse(JSON.stringify(state)) as T;
};

export class OptimisticManager<State> {
  pendingMutations = new Map<string, PendingMutation<State>>();

  begin(state: State, mutation: Omit<OptimisticMutation<State>, 'id' | 'correlationId'>) {
    const id = createId();
    const correlationId = createId();
    const snapshot = cloneState(state);
    const fullMutation: OptimisticMutation<State> = {
      ...mutation,
      id,
      correlationId,
    };
    const nextState = fullMutation.apply(state);
    this.pendingMutations.set(id, { mutation: fullMutation, snapshot });
    return { nextState, mutation: fullMutation };
  }

  confirm(state: State, mutationId: string, serverState: State) {
    this.pendingMutations.delete(mutationId);
    return this.reapply(serverState);
  }

  reject(state: State, mutationId: string) {
    const entry = this.pendingMutations.get(mutationId);
    if (!entry) return state;
    this.pendingMutations.delete(mutationId);
    return entry.snapshot;
  }

  reconcile(serverState: State) {
    return this.reapply(serverState);
  }

  private reapply(state: State) {
    let nextState = cloneState(state);
    for (const { mutation } of this.pendingMutations.values()) {
      nextState = mutation.apply(nextState);
    }
    return nextState;
  }
}
