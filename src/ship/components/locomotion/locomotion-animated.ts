import { Vector2D } from "@/utils";
import { ShipLocomotionComponent } from "./locomotion";
import { Node } from "@/node";
import { Settings } from "@/settings";

export class ShipLocomotionAnimatedComponent extends ShipLocomotionComponent {
  private _currentPosition: Vector2D;
  private _next: Node;
  private _timeElapsed: number;
  private _startPosition: Vector2D;
  private _endPosition: Vector2D;
  private _isInProgress = false;
  private _isAnimInProgress = false;

  constructor(node: Node) {
    super(node);
    this._currentPosition = node.Center;
  }

  public get Position(): Vector2D {
    return this._currentPosition;
  }

  public Update(deltaTime: number): void {
    if (!this.Entity.IsActive) {
      return;
    }

    this._next = this._path[0];
    if (this._next) {
      if (!this._isInProgress) {
        this.StartLocomotion();
        return;
      }

      if (!this._isAnimInProgress) {
        this.StartAnimation();
        return;
      }

      return this.Animate(deltaTime);
    }

    if (this._isInProgress) {
      this.CompleteLocomotion();
    }
  }

  // locomotion is a series of animations along the path
  private StartLocomotion(): void {
    this._isInProgress = true;
  }

  // an animation is all the moments between two adjacdent nodes
  private StartAnimation(): void {
    this._isAnimInProgress = true;
    this._startPosition = this._node.Center;
    this._endPosition = this._next.Center;

    // move the ship logic-wise as soon as we trigger animation
    this.Node.Ship = null;
    this.Node = this._next;

    this._timeElapsed = 0;
  }

  private CompleteAnimation(): void {
    this._currentPosition = this._endPosition;
    this._isAnimInProgress = false;

    this._path.shift();
  }

  private Animate(deltaTime: number): void {
    const duration = Settings.ships.locomotion.duration / 1000;

    if (this._timeElapsed < duration) {
      this._currentPosition = Vector2D.Lerp(
        this._startPosition,
        this._endPosition,
        this._timeElapsed / duration
      );
      this._timeElapsed += deltaTime;
    } else {
      this.CompleteAnimation();
    }
  }

  private CompleteLocomotion(): void {
    this._isInProgress = false;
    this.Entity.OnMoveCompleted(this._node);
  }
}
