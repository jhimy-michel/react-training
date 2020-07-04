import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });
describe("Navigation items test cases", () => {
  it("Should render properly if props are complete", () => {
    const props = { isAuthenticated: false };
    const wrapper = shallow(<NavigationItems {...props} />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("Should render properly if props are complete & auth=true", () => {
    const props = { isAuthenticated: true };
    const wrapper = shallow(<NavigationItems {...props} />);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
