import { stableStringify } from './canonical-json.util';
import { hashString } from './hash.util';

export function computeManifestHash(manifest: unknown) {
  const canonical = stableStringify(manifest);
  return { canonical, hash: hashString(canonical) };
}
