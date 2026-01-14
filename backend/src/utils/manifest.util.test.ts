import { describe, it, expect } from 'vitest';
import { computeManifestHash } from './manifest.util';

describe('computeManifestHash', () => {
  it('produces stable hashes for reordered keys', () => {
    const first = {
      docId: 'doc-1',
      signerId: 'signer-1',
      fields: [{ fieldId: 'a', value: 'sig' }],
    };
    const second = {
      signerId: 'signer-1',
      fields: [{ fieldId: 'a', value: 'sig' }],
      docId: 'doc-1',
    };

    expect(computeManifestHash(first).hash).toBe(computeManifestHash(second).hash);
  });

  it('changes hash when values change', () => {
    const base = {
      docId: 'doc-1',
      signerId: 'signer-1',
      fields: [{ fieldId: 'a', value: 'sig' }],
    };
    const changed = {
      docId: 'doc-1',
      signerId: 'signer-1',
      fields: [{ fieldId: 'a', value: 'sig-2' }],
    };

    expect(computeManifestHash(base).hash).not.toBe(computeManifestHash(changed).hash);
  });
});
