import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ScoreList from "./ScoreList.jsx";

test("renderiza estado vacío cuando no hay items", () => {
  render(<ScoreList items={[]} />);
  const status = screen.getByRole("status");
  expect(status).toBeInTheDocument();
  expect(status).toHaveTextContent(/no hay datos/i); // valida el contenido
  expect(screen.queryByRole("list")).toBeNull();
  expect(screen.queryByTestId("total")).toBeNull();
});

test("renderiza lista con título por defecto y muestra total cuando showTotal=true", () => {
  const data = [
    { label: "Triples", value: 5 },
    { label: "Dobles", value: 7 },
    { label: "Libres", value: 4 },
  ];

  render(<ScoreList items={data} showTotal />);

  // Heading accesible
  expect(
    screen.getByRole("heading", { name: /estadísticas/i, level: 2 })
  ).toBeInTheDocument();

  // Lista y elementos
  const list = screen.getByRole("list");
  const items = screen.getAllByRole("listitem");
  expect(list).toBeInTheDocument();
  expect(items).toHaveLength(3);

  // Un par de textos concretos
  const listItems = screen.getAllByRole("listitem");
  expect(listItems[0]).toHaveTextContent(/triples:\s*5/i);
  expect(listItems[1]).toHaveTextContent(/dobles:\s*7/i);

  // Total correcto (5+7+4)
  expect(screen.getByTestId("total")).toHaveTextContent("Total: 16");
});

test("permite título personalizado y no muestra total cuando showTotal=false", () => {
  const data = [{ label: "Rebotes", value: 12 }];
  render(<ScoreList items={data} title="Resumen de tiros" showTotal={false} />);

  expect(
    screen.getByRole("heading", { name: /resumen de tiros/i, level: 2 })
  ).toBeInTheDocument();
  expect(screen.queryByTestId("total")).toBeNull();
});
