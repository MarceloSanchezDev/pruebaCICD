import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { expect, test } from "vitest";

test("renderiza algo de Prueba CICD", () => {
  render(<App />);
  // Queries "accesibles": por rol y nombre visible
  const title = screen.getByRole("heading", { name: /Prueba CI CD/i });
  expect(title).toBeInTheDocument();
});
