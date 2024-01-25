import { Node } from "@/node";
import { Settings } from "@/settings";
import { Grid, mockGridFactory, GridOnclickComponent } from "@/grid";

describe(">>> Grid", () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension;
  let grid: Grid;

  beforeEach(() => {
    grid = mockGridFactory();
  });

  it("should awake and update all components", () => {
    const spyCompAwake = jest.spyOn(GridOnclickComponent.prototype, "Awake");
    const spyCompUpdate = jest.spyOn(GridOnclickComponent.prototype, "Update");

    expect(spyCompAwake).not.toBeCalled();
    expect(spyCompUpdate).not.toBeCalled();

    grid.Awake();
    expect(spyCompAwake).toBeCalled();

    grid.Update(0);
    expect(spyCompUpdate).toBeCalled();
  });

  it("should awake and update all children", () => {
    const spyNodeAwake = jest.spyOn(Node.prototype, "Awake");
    const spyNodeUpdate = jest.spyOn(Node.prototype, "Update");

    expect(spyNodeAwake).not.toBeCalled();
    expect(spyNodeUpdate).not.toBeCalled();

    grid.Awake();
    expect(spyNodeAwake).toBeCalledTimes(nodeCount);

    grid.Update(0);
    expect(spyNodeUpdate).toBeCalledTimes(nodeCount);
  });
});
