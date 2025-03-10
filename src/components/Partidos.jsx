import React, { useContext } from "react";
import { QuinielaContext } from "../providers/QuinielaProvider";
import {
    Card,
    Table,
    Stack,
  } from "react-bootstrap";
function Partidos(){
  const { quinielas } = useContext(QuinielaContext);

    return(
        <Stack direction="horizontal" gap={2} className="justify-content-center">
                {quinielas.map((item, index) => (
                  <Card key={index} className="p-3">
                    <Card.Body>
                      <Card.Title>Jornada: {item.jornada}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {item.fecha}
                      </Card.Subtitle>
                      <Table>
                        <thead>
                          <tr>
                            <th>Local</th>
                            <th>Visitante</th>
                            <th>Resultado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.partidos.map((partido, partidoIndex) => (
                            <tr key={partidoIndex}>
                              <td>{partido.local}</td>
                              <td>{partido.visitante}</td>
                              <td>
                                <Table size="sm">
                                  <thead>
                                    <tr>
                                      <th>1</th>
                                      <th>2</th>
                                      <th>X</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>{partido.apuestas["1"]}</td>
                                      <td>{partido.apuestas["2"]}</td>
                                      <td>{partido.apuestas["X"]}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                ))}
              </Stack>
        
    )
}
export default Partidos;