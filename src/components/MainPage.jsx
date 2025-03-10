import React, { useContext, useState } from "react";
import { QuinielaContext } from "../providers/QuinielaProvider";
import {
  Button,
  Modal,
  Dropdown,
} from "react-bootstrap";
import "../App.css";
import Partidos from "./Partidos";

function MainPage() {
  const { quinielas, handleApostar } = useContext(QuinielaContext);
  const [show, setShow] = useState(false);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const [apuestaSeleccionada, setApuestaSeleccionada] = useState(null);
  const handleClose = () => {
    setShow(false);
    setPartidoSeleccionado(null);
    setApuestaSeleccionada(null);
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      <h1>Partidos y apuestas</h1>
      <Button variant="primary" onClick={handleShow} className="buttonApostar">Apostar</Button>
      <Partidos/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Apostar en el partido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selecciona en qué partido deseas apostar:</p>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              Seleccionar Partido
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {quinielas.map((item, quinielaIndex) =>
                item.partidos.map((partido, partidoIndex) => (
                  <Dropdown.Item key={`${quinielaIndex}-${partidoIndex}`}onClick={() => setPartidoSeleccionado(partido)} >
                    {partido.local} vs {partido.visitante}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
          {partidoSeleccionado && (
            <p className="mt-3">
              <strong>Seleccionado:</strong> {partidoSeleccionado.local} vs {" "}
              {partidoSeleccionado.visitante}
            </p>
          )}
          <Button variant="secondary" onClick={() => setApuestaSeleccionada(1)}>1</Button>
          <Button variant="secondary" onClick={() => setApuestaSeleccionada(2)}>2</Button>
          <Button variant="secondary" onClick={() => setApuestaSeleccionada("X")}>X</Button>
          {apuestaSeleccionada && (
            <p className="mt-3">
              <strong>Apuesta seleccionada: </strong> {apuestaSeleccionada}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary"onClick={() => {handleApostar(partidoSeleccionado, apuestaSeleccionada); handleClose();}}
            disabled={!partidoSeleccionado || !apuestaSeleccionada} >
            Confirmar Apuesta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MainPage;