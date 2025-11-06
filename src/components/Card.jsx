/**
 * Card.jsx
 * 
 * Componente de tarjeta simple para mostrar contenido básico.
 * 
 * Características:
 * - Componente funcional sin estado
 * - Utiliza clases de Bootstrap para el estilo
 * - Diseño fijo de 18rem de ancho
 * - Estructura básica de card con título, texto y botón
 * 
 * Propósito: Componente de demostración para mostrar la integración de Bootstrap en React.
 * 
 * @returns {JSX.Element} Card component con Bootstrap styling
 */

import React from 'react'

const Card = () => {
  return (
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">Card Title</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  )
}

export default Card