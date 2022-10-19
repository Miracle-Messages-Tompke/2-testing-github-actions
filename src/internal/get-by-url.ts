const _fetchMap = new Map();

export const getByUrl = (uri: string) => {
    const responseParser = ((response) => response.text());

    if (!_fetchMap.has(uri)) {
      _fetchMap.set(uri, fetch(uri).then(responseParser).catch(() => {
        /* do nothing */
      }));
    }

    return _fetchMap.get(uri);
}
