import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import NameField from "./NameField";

test("permite escribir el nombre (label y placeholder)", async () => {
  render(<NameField />);

  // 1) Buscar por label (recomendado cuando existe <label>)
  const inputPorLabel = screen.getByLabelText(/nombre/i);
  expect(inputPorLabel).toBeInTheDocument();

  // 2) También podríamos localizarlo por placeholder
  const inputPorPlaceholder = screen.getByPlaceholderText(/escribe tu nombre/i);
  expect(inputPorPlaceholder).toBeInTheDocument();

  // 3) Escribir y verificar el cambio reflejado en pantalla
  await userEvent.type(inputPorLabel, "Marcelo");
  expect(screen.getByText(/valor:\s*Marcelo/i)).toBeInTheDocument();
});
