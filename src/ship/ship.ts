import { Fleet } from "@/fleet";
import { Entity, Vector2D } from "@/utils";
import { ShipDrawComponent, ShipLocomotionComponent } from "./components";
import { Node } from "@/node";

export class Ship extends Entity {
  private readonly _locomotionComponent: ShipLocomotionComponent;
  constructor(public readonly Factory: Fleet, node: Node) {
    super();
    this._locomotionComponent = new ShipLocomotionComponent();
    this._locomotionComponent.Node = node;
  }

  public Awake(): void {
    this.AddComponent(new ShipDrawComponent());
    this.AddComponent(this._locomotionComponent);

    super.Awake();
  }

  public get Position(): Vector2D | null {
    return this._locomotionComponent.Position;
  }
}
