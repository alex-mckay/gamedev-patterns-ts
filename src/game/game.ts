import { Entity } from "@/utils";
import { Grid } from "@/grid";

export class Game extends Entity {
  private _lastTimestamp = 0;
  private _entities: Entity[] = [];

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    super.Update(deltaTime);
    // update all children
    for (const entity of this._entities) {
      entity.Update(deltaTime);
    }
    this._lastTimestamp = Date.now();
    window.requestAnimationFrame(() => this.Update());
  }

  public get Entities(): Entity[] {
    return this._entities;
  }

  Awake(): void {
    // wake up all components associated with Game
    super.Awake();

    // instantiate and Grid to the list of children
    this._entities.push(new Grid());

    // awake all children
    for (const entity of this._entities) {
      entity.Awake();
    }

    window.requestAnimationFrame(() => {
      // set initial timestamp
      this._lastTimestamp = Date.now();

      // start update loop
      this.Update();
    });
  }
}
