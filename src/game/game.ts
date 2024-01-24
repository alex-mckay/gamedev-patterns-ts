import { Entity } from "@/utils";

export class Game extends Entity {
  private _lastTimestamp = 0;
  public Entities: Entity[] = [];

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
    super.Update(deltaTime);
    // update all children
    for (const entity of this.Entities) {
      entity.Update(deltaTime);
    }
    this._lastTimestamp = Date.now();
    window.requestAnimationFrame(() => this.Update());
  }

  Awake(): void {
    // wake up all components associated with Game
    super.Awake();

    // awake all children
    for (const entity of this.Entities) {
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
