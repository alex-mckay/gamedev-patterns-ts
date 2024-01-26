import { Node } from "@/node";
import { Settings } from "@/settings";
import { Grid, mockGridFactory, GridOnclickComponent } from "@/grid";
import { Pathfinder } from "@/pathfinder";
import { mockShipFactory } from "@/ship";
import { mockFleetFactory } from "@/fleet";

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

  describe("Determine path to", () => {
    let destination: Node;
    let randomNode: Node;
    beforeEach(() => {
      grid.Awake();
      randomNode = grid.Nodes[0];
      destination = grid.Nodes[grid.Nodes.length - 1];
    });
    it("should NOT calculate path if there is no currently active ship", () => {
      const spyCalcPath = jest.spyOn(Pathfinder.prototype, "CalculatePath");
      grid.CalcPathAndMoveActive(destination);
      expect(spyCalcPath).not.toBeCalled();
      expect(grid.Nodes.some((node) => node.IsOnPath)).toBeFalsy();
    });

    it("should calculate path if there is currently active ship", () => {
      const spyCalcPath = jest.spyOn(Pathfinder.prototype, "CalculatePath");
      const mockPath = [randomNode, destination];
      spyCalcPath.mockImplementation(() => mockPath);
      grid.ActiveShip = mockShipFactory(mockFleetFactory(), randomNode);
      grid.CalcPathAndMoveActive(destination);

      const path = grid.Nodes.filter((node) => node.IsOnPath);
      expect(path.length).toBe(2);
      expect(path[0]).toBe(randomNode);
      expect(path[1]).toBe(destination);
    });
  });
});
