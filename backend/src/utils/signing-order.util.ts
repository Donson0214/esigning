import { SignerStatus } from '@prisma/client';

export type SignerOrderEntry = {
  id: string;
  status: SignerStatus;
  signOrder: number;
};

export function isSignerInOrder(signers: SignerOrderEntry[], signerId: string) {
  const pending = signers.filter(
    (signer) => signer.status !== SignerStatus.SIGNED && signer.status !== SignerStatus.DECLINED,
  );
  if (pending.length === 0) return true;
  const next = pending.sort((a, b) => a.signOrder - b.signOrder)[0];
  return next?.id === signerId;
}
