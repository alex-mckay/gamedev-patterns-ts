import { Color, IComponent, Vector2D } from "@/utils";
import { Node } from "@/node";
import { Settings } from "@/settings";
import { CanvasLayer } from "@/canvas-layer";

export class NodeDrawComponent implements IComponent {
  public Entity: Node;

  public Awake(): void {
    this.Clear();
  }

  public Update(deltaTime: number): void {
    // could be more performant here by checking for change before re-drawing
    this.Clear();
    this.Draw();
    if (Settings.debugMode) {
      this.DrawDebugInfo();
    }
  }

  public Draw(): void {
    this.Entity.IsOnPath;
    CanvasLayer.Background.FillRect(
      this.Entity.Start,
      this.Entity.Size,
      this.GetColor()
    );
  }

  private GetColor(): Color {
    if (this.Entity.IsOnPath) {
      return Settings.grid.color.onPath;
    }
    if (this.Entity.IsInLocomotionRange) {
      return Settings.grid.color.inLocomotionRange;
    }

    return Settings.grid.color.regular;
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(this.Entity.Start, this.Entity.Size);
  }

  private DrawDebugInfo(): void {
    const black = new Color(0, 0, 0, 1);
    CanvasLayer.Background.DrawText(
      this.Entity.Index.AsString(),
      this.Entity.Start,
      black
    );
    if (this.Entity.Ship) {
      CanvasLayer.Background.DrawText(
        "Ship",
        new Vector2D(this.Entity.Start.x + 40, this.Entity.Start.y),
        black
      );
    } else {
      CanvasLayer.Background.ClearRect(
        new Vector2D(this.Entity.Start.x + 40, this.Entity.Start.y - 10),
        new Vector2D(30, 10)
      );
    }
  }
}
