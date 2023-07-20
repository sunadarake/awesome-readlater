import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Popup from "./Popup";
import React from "react";
import { chrome } from "jest-chrome";

test("renders Add button", () => {

    render(<Popup />);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeInTheDocument();
});

test("renders Total URLs count", () => {
    const items = [
        { url: "https://example.com", title: "Example", favicon: "https://example.com/favicon.ico" },
        { url: "https://test.com", title: "Test", favicon: "https://test.com/favicon.ico" },
    ];
    jest.spyOn(chrome.storage.sync, "get").mockImplementation((_, callback) => {
        callback({ items: items });
    });

    render(<Popup />);
    const totalUrlsCount = screen.getByText("Total: 2");
    expect(totalUrlsCount).toBeInTheDocument();
});