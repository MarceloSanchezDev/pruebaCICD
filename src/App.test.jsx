import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { expect, test } from "vitest";

test("renderiza algo de Vite o React", () => {
  render(<App />);
  // Intenta con alguno de estos textos que trae el template de Vite:
  const candidato = screen.getByText(/ci|cd/i);
  expect(candidato).toBeInTheDocument();
});
