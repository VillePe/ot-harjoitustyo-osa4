import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import Blog from "./Blog";

afterEach(cleanup);

test("Renders content", () => {
    const blog = {
        title: "Test",
        author: "Testitest",
        url: "www.test.st",
        likes: 999
    };
    const component = render(<Blog pBlog={blog} />);
    expect(component.container).toHaveTextContent("Test");
});