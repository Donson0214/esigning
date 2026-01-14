function sortKeys(value: Record<string, unknown>) {
  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = value[key];
      return acc;
    }, {});
}

export function stableStringify(value: unknown): string {
  if (value === null || value === undefined) {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  }
  if (typeof value === 'object') {
    const sorted = sortKeys(value as Record<string, unknown>);
    return `{${Object.keys(sorted)
      .map((key) => `${JSON.stringify(key)}:${stableStringify(sorted[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}
