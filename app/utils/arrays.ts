export function lastElement(arr: any[]) {
  return arr.slice(-1)[0]
}

export function zip(a, b) {
  return a.map((k, i) => [k, b[i]])
}
