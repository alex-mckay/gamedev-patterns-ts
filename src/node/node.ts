import { Entity, Vector2D } from "@/utils";
import { NodeDrawComponent } from "./components";

export class Node extends Entity {
  constructor(
    // start is the top left corner of the node
    public readonly Start: Vector2D,
    // end is the bottom right corner of the node
    public readonly End: Vector2D,
    // index is the (row, col) representation of the node's position
    public readonly Index: Vector2D
  ) {
    super();
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
}
