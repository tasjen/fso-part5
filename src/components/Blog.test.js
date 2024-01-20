import React from "react";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
    user: {
      name: "name",
    },
  };
  const user = userEvent.setup();

  beforeEach(() => {
    cleanup();
    user;
    container = render(<Blog blog={blog} />).container;
  });

  it("By default, renders only blog's title and author", () => {
    const titleAndAuthor = screen.getByText("title author");
    const url = screen.getByText("url");
    const likes = screen.getByText("likes 0");
    const userName = screen.getByText("name");
    expect(titleAndAuthor).toBeVisible();
    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();
    expect(userName).not.toBeVisible();
  });

  it("Renders blog's URL and number of likes when view button is clicked", async () => {
    const viewButton = screen.getByText("view");

    await user.click(viewButton);

    const titleAndAuthor = screen.getByText("title author");
    const url = screen.getByText("url");
    const likes = screen.getByText("likes 0");
    const userName = screen.getByText("name");
    expect(titleAndAuthor).toBeVisible();
    expect(url).toBeVisible();
    expect(likes).toBeVisible();
    expect(userName).toBeVisible();
  });
});
