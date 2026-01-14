export type ParsedDataUrl = {
  mimeType: string;
  buffer: Buffer;
};

export function parseDataUrl(input: string): ParsedDataUrl | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(input);
  if (!match) return null;
  const [, mimeType, data] = match;
  try {
    const buffer = Buffer.from(data, 'base64');
    return { mimeType, buffer };
  } catch {
    return null;
  }
}
