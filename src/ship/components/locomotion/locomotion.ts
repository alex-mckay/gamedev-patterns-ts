// src/ship/components/locomotion/locomotion.ts
import { IComponent, Vector2D } from "@/utils";
import { Ship } from "@/ship";
import { Node } from "@/node";

export class ShipLocomotionComponent implements IComponent {
  public Entity: Ship;

  protected _node: Node;
  protected _path: Node[] = [];
  private _previousPosition: Vector2D | null = null;

  constructor(node: Node) {
    this._node = node;
  }

  public get Node(): Node {
    return this._node;
  }

  public set Node(v: Node) {
    this._previousPosition = this.Position;
    this._node = v;
    this._node.Ship = this.Entity;
  }

  public Awake(): void {
    this._node.Ship = this.Entity;
  }

  public Update(deltaTime: number): void {
    if (!this.Entity.IsActive) {
      return;
    }
    const next = this._path.shift();
    // either there are still nodes on the path, or we're done moving
    if (next) {
      this.Node.Ship = null;
      this.Node = next;
    } else {
      // todo: getting too often by being inside update, ideally only called once per movement
      this.Entity.OnMoveCompleted(this._node);
    }
  }

  public get Position(): Vector2D | null {
    return this.Node ? this.Node.Center : null;
  }

  public get PreviousPosition(): Vector2D | null {
    return this._previousPosition;
  }

  public set Path(v: Node[]) {
    this._path = [...v];
  }
}
