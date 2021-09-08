// Doesn't cover all use case, we just want to check for empty objects, null and undefined
function leanIsEmpty(val) {
  if (val === undefined) return true;

  if (typeof (val) === 'number' || typeof (val) === 'boolean' || Object.prototype.toString.call(val) === '[object Date]') { return false; }

  if (val == null || val.length === 0) return true;

  if (typeof (val) === 'object') {
    // empty object

    return !(Object.keys(val).length > 0);

    for (const f in val) { r = false; }

    return r;
  }

  return false;
}
