export function isDocAccessAllowed(documentOwnerId: string, userId: string) {
  return documentOwnerId === userId;
}
