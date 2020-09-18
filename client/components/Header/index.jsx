import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>Brand link</Navbar.Brand>
      </Navbar>
      Bonjour,  Bienvenue au TP1 de l&apos;UE Technologies
      Web synchrones et multi-dispositifs
    </div>
  );
}
