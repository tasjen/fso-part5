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

  const titleAndAuthor = screen.getByText("123 456");

  const url = screen.getByText("789");
  const likes = screen.getByText("likes 0");
  const userName = screen.getByText("abc");
  expect(titleAndAuthor).toBeVisible();
  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
  expect(userName).not.toBeVisible();
});
