import { ErrorResponse } from './http.types';

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

export const isError = <T extends object>(
  response: ErrorResponse | T
): response is ErrorResponse => 'error' in response;

export const getErrorResponse = (response: ErrorResponse) => ({
  error: true,
  status: response.status,
  message: response.message,
});
