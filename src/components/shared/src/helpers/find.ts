export const find = (
  a: NodeListOf<Node> | HTMLCollectionOf<Element>,
  predicate: (search: Node, index?: number) => boolean,
  thisObject?: any
) => Array.prototype.find.call(a, predicate, thisObject);
