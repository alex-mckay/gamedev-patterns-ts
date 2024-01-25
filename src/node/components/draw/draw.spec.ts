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

  it("should render active color if entity is active and regular color otherwise", () => {
    const spyFillRect = jest.spyOn(CanvasLayer.Background, "FillRect");

    comp.Entity.IsActive = true;
    comp.Update(0);
    expect(spyFillRect).toBeCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.active
    );

    comp.Entity.IsActive = false;
    comp.Update(0);
    expect(spyFillRect).toBeCalledWith(
      comp.Entity.Start,
      comp.Entity.Size,
      Settings.grid.color.regular
    );
  });
});
