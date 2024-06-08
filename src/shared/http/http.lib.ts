export const getQueryParams = (
  inputParams: Partial<Record<string, unknown>>
): string => {
  const params = new URLSearchParams();

  !!Object.entries(inputParams).length &&
    Object.entries(inputParams).forEach(([key, value]) => {
      if (key === 'typeTab') return;
      if (key === 'id') return;

      const isArrayValue = Array.isArray(value);
      if (isArrayValue) {
        value.forEach((tag) => params.append(key, tag));
        return;
      }

      if (!String(value) || !value) return;

      params.append(key, String(value));
    });

  if (params.toString() === '?') {
    return '';
  }

  return params.has.length ? `?${params.toString()}` : '';
};
