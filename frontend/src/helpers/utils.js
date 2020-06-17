export const serializeObjectToQueryParams = (obj) => {
  let str = [];
  for (let p in obj) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}