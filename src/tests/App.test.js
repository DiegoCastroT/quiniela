import { render, screen } from '@testing-library/react';
import Partidos from '../components/Partidos';
import { QuinielaContext } from '../providers/QuinielaProvider';

test("Debe renderizar los partidos", () => {
    const mockQuinielas = [
        {
            jornada: 1,
            fecha: "2025-03-07",
            partidos: [
                {
                    local: "Equipo A",
                    visitante: "Equipo B",
                    apuestas: { "1": 3, "2": 2, "X": 1 }
                }
            ]
        }
    ];

    render(
        <QuinielaContext.Provider value={{ quinielas: mockQuinielas }}>
            <Partidos />
        </QuinielaContext.Provider>
    );

    expect(screen.getByText(/Jornada/i)).toBeInTheDocument();
    expect(screen.getByText(/Equipo A/i)).toBeInTheDocument();
    expect(screen.getByText(/Equipo B/i)).toBeInTheDocument();
    expect(screen.getByText(/Resultado/i)).toBeInTheDocument();
});
 