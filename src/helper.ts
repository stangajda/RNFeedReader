export const createUrl = (
  base: string,
  path: string,
  params: Record<string, string>,
): string => {
  const url = new URL(`${base}${path}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value),
  );
  return url.toString();
};

export const createPathUrl = (
  movieListUrlLocal: string,
  apiBaseUrl: string,
): string => {
  return movieListUrlLocal
    .replace(apiBaseUrl, '')
    .replace(/(?:\/+(\?))/, '$1')
    .replace(/\/+$/, '');
};
