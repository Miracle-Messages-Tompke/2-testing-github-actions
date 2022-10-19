export const forEach = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Element, index?: number) => void,
  thisObject?: any
) => Array.prototype.forEach.call(a, predicate, thisObject);
