import { describe, it, expect } from 'vitest';
import { SignerStatus } from '@prisma/client';
import { isSignerInOrder } from './signing-order.util';

describe('isSignerInOrder', () => {
  it('allows the next pending signer', () => {
    const signers = [
      { id: 'a', status: SignerStatus.SIGNED, signOrder: 1 },
      { id: 'b', status: SignerStatus.VIEWED, signOrder: 2 },
      { id: 'c', status: SignerStatus.PENDING, signOrder: 3 },
    ];
    expect(isSignerInOrder(signers, 'b')).toBe(true);
  });

  it('rejects out-of-order signers', () => {
    const signers = [
      { id: 'a', status: SignerStatus.PENDING, signOrder: 1 },
      { id: 'b', status: SignerStatus.PENDING, signOrder: 2 },
    ];
    expect(isSignerInOrder(signers, 'b')).toBe(false);
  });

  it('allows any signer when none are pending', () => {
    const signers = [
      { id: 'a', status: SignerStatus.SIGNED, signOrder: 1 },
      { id: 'b', status: SignerStatus.DECLINED, signOrder: 2 },
    ];
    expect(isSignerInOrder(signers, 'b')).toBe(true);
  });
});
