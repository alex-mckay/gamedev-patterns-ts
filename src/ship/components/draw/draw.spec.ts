import { CanvasLayer } from "@/canvas-layer";
import { ShipDrawComponent, mockShipFactory } from "@/ship";

describe(">>> Node Ship Component", () => {
  let comp: ShipDrawComponent;
  beforeEach(() => {
    comp = new ShipDrawComponent();
    comp.Entity = mockShipFactory();
  });
  it("should cleanup when awakens", () => {
    const spy = jest.spyOn(CanvasLayer.Foreground, "ClearRect");
    expect(spy).not.toBeCalled();

    comp.Awake();
    expect(spy).toBeCalled;
  });
  it("should cleanup and draw rect every frame", () => {
    const spy = jest.spyOn(CanvasLayer.Foreground, "ClearRect");
    const drawSpy = jest.spyOn(CanvasLayer.Foreground, "FillCircle");
    expect(spy).not.toBeCalled();
    expect(drawSpy).not.toBeCalled();

    comp.Update(1);

    expect(spy).toBeCalled();
    expect(drawSpy).toBeCalled();
  });
});
