import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LightToggle from "./LightToggle";

describe("LightToggle Component", () => {
    beforeEach(() => {
        localStorage.clear();
        document.querySelector("html").removeAttribute("data-theme");
    });

    it("should render the component with the correct initial state", () => {
        render(<LightToggle />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(false);
        expect(document.querySelector("html").getAttribute("data-theme")).toBe("light");
    });

    it("should toggle to dark mode when the checkbox is checked", () => {
        render(<LightToggle />);
        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
        expect(document.querySelector("html").getAttribute("data-theme")).toBe("dark");
        expect(localStorage.getItem("isDark")).toBe("true");
    });

    it("should toggle back to light mode when the checkbox is unchecked", () => {
        localStorage.setItem("isDark", "true");
        render(<LightToggle />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox.checked).toBe(true);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
        expect(document.querySelector("html").getAttribute("data-theme")).toBe("light");
        expect(localStorage.getItem("isDark")).toBe("false");
    });

    it("should initialize with dark mode if localStorage is set to true", () => {
        localStorage.setItem("isDark", "true");
        render(<LightToggle />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox.checked).toBe(true);
        expect(document.querySelector("html").getAttribute("data-theme")).toBe("dark");
    });

    it("should initialize with light mode if localStorage is set to false", () => {
        localStorage.setItem("isDark", "false");
        render(<LightToggle />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox.checked).toBe(false);
        expect(document.querySelector("html").getAttribute("data-theme")).toBe("light");
    });
});