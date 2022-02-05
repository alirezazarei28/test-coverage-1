import React from "react";
import Enzyme, { shallow } from "enzyme";
import Gift from "../components/Gift";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("Gift", () => {
  const mockRemove = jest.fn();
  const id = 1;
  const props = { gift: { id }, removeGift: mockRemove };
  const gift = shallow(<Gift {...props} />);

  it("renders properly", () => {
    expect(gift).toMatchSnapshot();
  });

  it("initializes a person and present in state", () => {
    expect(gift.state()).toEqual({ person: "", present: "" });
  });

  describe("when typing into person input", () => {
    const person = "Uncle";

    beforeEach(() => {
      gift
        .find(".input-person")
        .simulate("change", { target: { value: person } });
    });

    it("updates the person in input", () => {
      expect(gift.state().person).toEqual(person);
    });
  });

  describe("when typing into present input", () => {
    const present = "pen";

    beforeEach(() => {
      gift
        .find(".input-present")
        .simulate("change", { target: { value: present } });
    });

    it("updates the present in input", () => {
      expect(gift.state().present).toEqual(present);
    });
  });

  describe("when clicking the remove gift button", () => {
    beforeEach(() => {
      gift.find(".btn-remove").simulate("click");
    });

    it("calls the removeGift callback", () => {
      expect(mockRemove).toHaveBeenCalledWith(id);
    });
  });
});
