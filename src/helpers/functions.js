export function trimLeft(string, replace = '\/') {
  let regex = new RegExp(`/^(${replace}*)(.*)/`)
  return string.replace(regex, '$2');
}
