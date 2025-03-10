import React, { createContext, useEffect, useState } from 'react';

export const QuinielaContext = createContext()

export const QuinielaProvider = ({ children }) => {
    const [quinielas, setQuinielas] = useState([])

    useEffect(() => {
        fetch('/quinielas.json')
            .then(res => res.json())
            .then(data => {
                setQuinielas(data.apuestas)
            });
    }, []);


    const handleApostar = (partidoSeleccionado, apuestaSeleccionada) => {
        // Crear una copia 
        const nuevasQuinielas = [];
        
        for (let i = 0; i < quinielas.length; i++) {
            const quiniela = quinielas[i];
            const nuevosPartidos = [];
    
            for (let j = 0; j < quiniela.partidos.length; j++) {
                const partido = quiniela.partidos[j];
    
                // Si es el partido seleccionado, aumentar la apuesta
                if (partido.local === partidoSeleccionado.local && partido.visitante === partidoSeleccionado.visitante) {
                    const nuevosApuestas = { ...partido.apuestas }; // Copiar apuestas
                    nuevosApuestas[apuestaSeleccionada] = nuevosApuestas[apuestaSeleccionada] + 1;
    
                    // Añadir partido con las apuestas actualizadas
                    nuevosPartidos.push({ ...partido, apuestas: nuevosApuestas });
                } else {
                    // Si no es el partido seleccionado, añadirlo sin cambios
                    nuevosPartidos.push(partido);
                }
            }
    
            // Añadir quiniela con los nuevos partidos
            nuevasQuinielas.push({ ...quiniela, partidos: nuevosPartidos });
        }
    
        setQuinielas(nuevasQuinielas);
    };
    
    return (
        <QuinielaContext.Provider value={{ quinielas, setQuinielas, handleApostar}}>
            {children}
        </QuinielaContext.Provider>
    )
}

