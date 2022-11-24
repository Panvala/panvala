export function stringify(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj)
      .map(function(k) {
        const ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k]
            .map(function(v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            })
            .join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      })
      .filter(Boolean)
      .join(sep);
  }

  if (!name) {
    return '';
  }
  return (
    encodeURIComponent(stringifyPrimitive(name)) +
    eq +
    encodeURIComponent(stringifyPrimitive(obj))
  );
}

function stringifyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
}
