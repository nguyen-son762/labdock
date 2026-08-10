import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "@/test/render-with-providers";

import { newsArticles } from "../data/news-data";
import { NewsFeed } from "./news-feed";

describe("NewsFeed", () => {
  it("filters the visible articles by category", async () => {
    const user = userEvent.setup();
    renderWithProviders(<NewsFeed articles={newsArticles.slice(1)} />);

    await user.click(screen.getByRole("button", { name: "Events" }));

    expect(screen.getByText("LabTech Innovations Showcase connects science and technology")).toBeInTheDocument();
    expect(screen.queryByText("Advancing research collaboration across Southeast Asia")).not.toBeInTheDocument();
  });
});
