import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import ToggleMessage from "./ToggleMessage.jsx";

test("muestra/oculta el saludo al clickear el botón (queries por rol)", async () => {
  render(<ToggleMessage />);

  // 1) El botón existe y su nombre accesible es “Mostrar saludo”
  const button = screen.getByRole("button", { name: /mostrar saludo/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveAccessibleName(/mostrar saludo/i);

  // Opcional para depurar si algo falla
  // screen.debug();

  // 2) El saludo NO debe estar al inicio
  expect(
    screen.queryByRole("heading", { level: 2, name: "¡Hola!" })
  ).toBeNull();

  // 3) Click: ahora debe mostrarse el <h2> y actualizarse el nombre del botón
  await userEvent.click(button);
  const heading = screen.getByRole("heading", { level: 2, name: "¡Hola!" });
  expect(heading).toBeInTheDocument();
  expect(button).toHaveAccessibleName(/ocultar saludo/i);
  expect(button).toHaveAttribute("aria-pressed", "true");

  // 4) Segundo click: se oculta otra vez
  await userEvent.click(button);
  expect(
    screen.queryByRole("heading", { level: 2, name: "¡Hola!" })
  ).toBeNull();
  expect(button).toHaveAccessibleName(/mostrar saludo/i);
  expect(button).toHaveAttribute("aria-pressed", "false");
});
