import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

it("By default, renders only blog's title and author", () => {
  const blog = {
    title: "123",
    author: "456",
    url: "789",
    likes: 0,
    user: {
      name: "abc",
    },
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("123 456");
  expect(element).toBeDefined();
});
