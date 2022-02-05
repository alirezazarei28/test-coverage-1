import React from "react";
import Enzyme, { shallow } from "enzyme";
import App from "./App";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });
const app = shallow(<App />);

describe("App", () => {
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });

  it("initializes the state with an empty array of gifts", () => {
    expect(app.state().gifts).toEqual([]);
  });

  describe("when clicking add-gift button", () => {
    const id = 1;

    beforeEach(() => {
      app.find(".btn-add").simulate("click");
    });

    afterEach(() => {
      app.setState({ gifts: [] });
    });

    it("adds a new gift to `state`", () => {
      expect(app.state().gifts).toEqual([{ id }]);
    });

    it("adds a new gift to render list", () => {
      expect(app.find(".gift-list").children().length).toEqual(1);
    });

    it("creates a gift component", () => {
      expect(app.find("Gift").exists()).toBe(true);
    });

    describe("user wants to remove the added gift", () => {
      beforeEach(() => {
        app.instance().removeGift(id);
      });

      it("removes the gift from state", () => {
        expect(app.state().gifts).toEqual([]);
      });
    });
  });
});
