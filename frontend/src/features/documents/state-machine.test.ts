import { describe, it, expect } from 'vitest';
import { deriveLifecycleState, documentReducer, type DocumentMachineState } from './state-machine';

describe('document lifecycle state machine', () => {
  it('maps completed documents to COMPLETED', () => {
    expect(
      deriveLifecycleState({
        status: 'COMPLETED',
        lockedAt: null,
        version: 2,
      }),
    ).toBe('COMPLETED');
  });

  it('maps in-progress documents to IN_PROGRESS', () => {
    expect(
      deriveLifecycleState({
        status: 'IN_PROGRESS',
        lockedAt: null,
        version: 3,
      }),
    ).toBe('IN_PROGRESS');
  });

  it('transitions to ERROR on error events', () => {
    const state: DocumentMachineState = { state: 'DRAFT', doc: null };
    const next = documentReducer(state, { type: 'ERROR', error: 'boom' });
    expect(next.state).toBe('ERROR');
    expect(next.error).toBe('boom');
  });
});
