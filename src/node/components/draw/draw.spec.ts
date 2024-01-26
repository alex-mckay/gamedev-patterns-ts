import { NodeDrawComponent } from "./draw";
import { CanvasLayer } from "@/canvas-layer";
import { mockNodeFactory } from "@/node";
import { Settings } from "@/settings";

describe(">>> Node Draw Component", () => {
  let comp: NodeDrawComponent;
  beforeEach(() => {
    comp = new NodeDrawComponent();
    comp.Entity = mockNodeFactory();
  });

  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Background, "ClearRect");
    expect(spy).not.toBeCalled();

    comp.Awake();

    expect(spy).toBeCalled();
  });

  it("should cleanup then redraw upon update", () => {
    const spy = jest.spyOn(CanvasLayer.Background, "ClearRect");
    const drawSpy = jest.spyOn(CanvasLayer.Background, "FillRect");
    expect(spy).not.toBeCalled();
    expect(drawSpy).not.toBeCalled();

    comp.Update(1);

    expect(spy).toBeCalled();
    expect(drawSpy).toBeCalled();
  });

  it("should render range color if entity is in range, path color if is on path, and regular color otherwise", () => {
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "FillRect");

    comp.Entity.IsOnPath = true;
    comp.Update(0);
    expect(spyFillRect).toBeCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.onPath
    );

    comp.Entity.IsOnPath = false;
    comp.Entity.IsInLocomotionRange = true;
    comp.Update(0);
    expect(spyFillRect).toBeCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.inLocomotionRange
    );

    comp.Entity.IsInLocomotionRange = false;
    comp.Update(0);
    expect(spyFillRect).toBeCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.regular
    );
  });
});
