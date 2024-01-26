import { IGraphNode } from "./node.h";

export interface IGraph {
  GetNeighborsOf(node: IGraphNode): IGraphNode[];
  GetCost(a: IGraphNode, b: IGraphNode): number;
}
