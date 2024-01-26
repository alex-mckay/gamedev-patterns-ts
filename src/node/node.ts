import { Entity, IGraphNode, Vector2D } from "@/utils";
import { NodeDrawComponent } from "./components";
import { Ship } from "@/ship";

export class Node extends Entity implements IGraphNode {
  public IsInLocomotionRange = false;
  public Ship: Ship | null = null;
  public IsOnPath = false;

  constructor(
    // start is the top left corner of the node
    public readonly Start: Vector2D,
    // end is the bottom right corner of the node
    public readonly End: Vector2D,
    // index is the (row, col) representation of the node's position
    public readonly Index: Vector2D,
    // immeadiately adjacent neighbors
    public readonly Neighbors: Node[]
  ) {
    super();
  }

  public get Position(): Vector2D {
    return this.Index;
  }

  public Awake(): void {
    this.AddComponent(new NodeDrawComponent());

    super.Awake();
  }

  public get Size(): Vector2D {
    return new Vector2D(this.End.x - this.Start.x, this.End.y - this.Start.y);
  }

  public get Center(): Vector2D {
    return new Vector2D(
      this.Start.x + this.Size.x / 2,
      this.Start.y + this.Size.y / 2
    );
  }

  public Occupies(point: Vector2D): boolean {
    if (point.x < this.Start.x) {
      return false;
    }

    if (point.x > this.End.x) {
      return false;
    }

    if (point.y < this.Start.y) {
      return false;
    }

    if (point.y > this.End.y) {
      return false;
    }

    return true;
  }

  public FindAndSetInLocomotionRange(range: number): void {
    if (!this.Ship) {
      this.IsInLocomotionRange = true;
    }
    const newRange = --range;
    if (newRange <= 0) {
      return;
    }

    this.Neighbors.filter((neighbor) => !neighbor.Ship).map((neighbor) =>
      neighbor.FindAndSetInLocomotionRange(range)
    );
  }
}
