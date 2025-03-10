import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MainPage from "../components/MainPage";
import { QuinielaContext } from "../providers/QuinielaProvider";

const mockQuinielas = [
  {
    jornada: 1,
    fecha: "2025-03-07",
    partidos: [
      {
        local: "Equipo A",
        visitante: "Equipo B",
        apuestas: { 1: 3, 2: 2, X: 1 },
      },
    ],
  },
];

test("Debe renderizar el botón de apostar y el título", () => {
  render(
    <QuinielaContext.Provider value={{ quinielas: mockQuinielas }}>
      <MainPage />
    </QuinielaContext.Provider>
  );

  expect(screen.getByText(/Partidos y apuestas/i)).toBeInTheDocument();
  expect(screen.getByText(/Apostar/i)).toBeInTheDocument();
});

test("Debe mostrar el modal al pulsar apostar", () => {
  render(
    <QuinielaContext.Provider
      value={{ quinielas: mockQuinielas, handleApostar: jest.fn() }}
    >
      <MainPage />
    </QuinielaContext.Provider>
  );

  const buttonApostar = screen.getByText(/Apostar/i);
  fireEvent.click(buttonApostar);

  expect(screen.getByText(/Apostar en el partido/i)).toBeInTheDocument();
});

test("El botón closeButton del modal debe cerrarlo", async () => {
    render(
      <QuinielaContext.Provider
        value={{ quinielas: mockQuinielas, handleApostar: jest.fn() }}
      >
        <MainPage />
      </QuinielaContext.Provider>
    );
  
    // Abrir el modal
    fireEvent.click(screen.getByRole("button", { name: /Apostar/i }));
  
    // Verificar que el modal está abierto
    expect(screen.getByText(/Apostar en el partido/i)).toBeInTheDocument();
  
    // Hacer clic en el botón de cerrar (X)
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
  
    // Esperar a que el modal desaparezca
    await waitFor(() => {
      expect(screen.queryByText(/Apostar en el partido/i)).not.toBeInTheDocument();
      expect()
    });
  });

test("Debe realizar una apuesta correctamente al seleccionar partido y apuesta", async () => {
  const mockHandleApostar = jest.fn();
  render(
    <QuinielaContext.Provider
      value={{ quinielas: mockQuinielas, handleApostar: mockHandleApostar }}
    >
      <MainPage />
    </QuinielaContext.Provider>
  );

  // Abrir el modal de apuestas
  fireEvent.click(screen.getByRole("button", { name: /Apostar/i }));

  // Abrir el dropdown de partidos y seleccionar uno
  fireEvent.click(screen.getByText(/Seleccionar Partido/i));
  const partidoOption = screen.getByText("Equipo A vs Equipo B");
  fireEvent.click(partidoOption);

  // Seleccionar apuesta tipo '1'
  fireEvent.click(screen.getByRole("button", { name: "1" }));

  // Confirmar la apuesta
  fireEvent.click(screen.getByRole("button", { name: /Confirmar Apuesta/i }));

  // Verificar que handleApostar fue llamado con los argumentos correctos
  expect(mockHandleApostar).toHaveBeenCalledWith(
    mockQuinielas[0].partidos[0], // Partido esperado    1 // Apuesta esperada
  );

  // Verificar que el modal se cerró
  await waitFor(() => {
    expect(screen.queryByText(/Apostar en el partido/i)).not.toBeInTheDocument();
  });
});