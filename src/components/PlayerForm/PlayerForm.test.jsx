import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import PlayerForm from "./PlayerForm.jsx";

test("muestra errores cuando se envía vacío y no llama onSubmit", async () => {
  const onSubmit = vi.fn();
  render(<PlayerForm onSubmit={onSubmit} />);

  await userEvent.click(screen.getByRole("button", { name: /guardar/i }));

  // ✅ role="alert" SIN name; validamos por contenido
  const alerts = screen.getAllByRole("alert");
  expect(alerts[0]).toHaveTextContent(/el nombre es requerido/i);
  expect(alerts[1]).toHaveTextContent(/los puntos son requeridos/i);

  expect(onSubmit).not.toHaveBeenCalled();
});

test("valida número negativo y texto no-numérico", async () => {
  render(<PlayerForm />);

  const name = screen.getByLabelText(/nombre/i);
  const points = screen.getByLabelText(/puntos/i);
  const submit = screen.getByRole("button", { name: /guardar/i });

  await userEvent.type(name, "Ana");

  // 1) Negativo
  await userEvent.clear(points);
  await userEvent.type(points, "-1");
  await userEvent.click(submit);

  // Re-consulta el alert actual
  let alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent(/no pueden ser negativos/i);

  // 2) No numérico
  await userEvent.clear(points);
  await userEvent.type(points, "dos");
  await userEvent.click(submit);

  // Re-consulta otra vez (el DOM cambió)
  alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent(/deben ser numéricos/i);
});

test("con datos válidos llama onSubmit con payload correcto", async () => {
  const onSubmit = vi.fn();
  render(<PlayerForm onSubmit={onSubmit} />);

  const name = screen.getByLabelText(/nombre/i);
  const points = screen.getByLabelText(/puntos/i);
  const submit = screen.getByRole("button", { name: /guardar/i });

  await userEvent.type(name, "  Marcelo  ");
  await userEvent.clear(points);
  await userEvent.type(points, "15");

  await userEvent.click(submit);

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ name: "Marcelo", points: 15 });
});
