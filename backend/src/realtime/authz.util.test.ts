import { describe, it, expect } from 'vitest';
import { isDocAccessAllowed } from './authz.util';

describe('isDocAccessAllowed', () => {
  it('allows access for the owning user', () => {
    expect(isDocAccessAllowed('owner-1', 'owner-1')).toBe(true);
  });

  it('denies access for a different user', () => {
    expect(isDocAccessAllowed('owner-1', 'user-2')).toBe(false);
  });
});
