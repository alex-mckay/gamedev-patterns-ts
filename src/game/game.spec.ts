import { Grid } from "@/grid";
import { Game, mockGameFactory } from "@/game";
import { Fleet } from "@/fleet";
import { GameInputComponent } from "./components";

describe(">>> Game", () => {
  let game: Game;

  beforeEach(() => {
    game = mockGameFactory();
    window.requestAnimationFrame = jest
      .fn()
      .mockImplementationOnce((cb) => cb());
  });

  it("should start update loop next frame after awake", () => {
    const spy = jest.spyOn(game, "Update");

    game.Awake();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should awake and update all Components", () => {
    const spyAwakeGameClickComp = jest.spyOn(
      GameInputComponent.prototype,
      "Awake"
    );
    const spyUpdateGameClickComp = jest.spyOn(
      GameInputComponent.prototype,
      "Update"
    );

    expect(spyAwakeGameClickComp).not.toBeCalled();
    expect(spyUpdateGameClickComp).not.toBeCalled();

    game.Awake();
    expect(spyAwakeGameClickComp).toBeCalled();

    game.Update();
    expect(spyUpdateGameClickComp).toBeCalled();
  });

  it("should awake and update all children", () => {
    const spyGridAwake = jest.spyOn(Grid.prototype, "Awake");
    const spyGridUpdate = jest.spyOn(Grid.prototype, "Update");
    const spyFleetAwake = jest.spyOn(Fleet.prototype, "Awake");
    const spyFleetUpdate = jest.spyOn(Fleet.prototype, "Update");

    expect(spyGridAwake).not.toBeCalled();
    expect(spyGridUpdate).not.toBeCalled();
    expect(spyFleetAwake).not.toBeCalled();
    expect(spyFleetUpdate).not.toBeCalled();

    game.Awake();
    expect(spyGridAwake).toBeCalled();
    // should instantiate two fleets
    expect(spyFleetAwake).toBeCalledTimes(2);

    game.Update();
    expect(spyGridUpdate).toBeCalled();
    // each fleet was updated once in awake, and once more in update
    expect(spyFleetUpdate).toBeCalledTimes(4);
  });
});
