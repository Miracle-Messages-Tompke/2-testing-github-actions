export const filter = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Node, index?: number) => boolean,
  thisObject?: any
) => Array.prototype.filter.call(a, predicate, thisObject);
