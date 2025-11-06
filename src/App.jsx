/**
 * App.jsx
 * 
 * Componente raíz que integra todos los componentes y funcionalidades.
 * 
 * Características:
 * - Estado de contador: Ejemplo de estado local con hooks
 * - Modal de Bootstrap: Implementación completa de modal interactivo
 * - Integración de componentes: Renderiza Card, PostsList y CommentList
 * - Layout responsivo: Utiliza container de Bootstrap
 * 
 * Estructura:
 * 1. Título principal "Hello from React 19"
 * 2. Botón para abrir modal
 * 3. Componente Card (demo)
 * 4. Lista de Posts (paginación cliente)
 * 5. Lista de Comentarios (paginación servidor)
 * 6. Modal con contador interactivo
 * 
 * Estados:
 * - count: Contador para demostrar interactividad en el modal
 * 
 * @returns {JSX.Element} Aplicación principal con todos los componentes integrados
 */

import { useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import PostsList from './components/PostsList.jsx'
import CommentList from './components/CommentList.jsx'

function App() {
  /* Estado para el contador utilizado en el modal interactivo */
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container mt-5">
        {/* Título principal de la aplicación */}
        <h1 className="text-center mb-4">Hello from React 19</h1>
        
        {/* Botón para abrir el modal de Bootstrap */}
        <div className="text-center mb-4">
          <button 
            type="button" 
            className="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
          >
            Abrir Modal
          </button>
        </div>

        {/* Componente Card: Ejemplo básico de integración Bootstrap */}
        <Card />

        {/* Componente para mostrar posts de la API con paginación local */}
        <PostsList />

        {/* Componente para mostrar comentarios de la API con paginación del servidor */}
        <CommentList />

        {/* Modal de Bootstrap con funcionalidad interactiva */}
        <div 
          className="modal fade" 
          id="exampleModal" 
          tabIndex="-1" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              {/* Header del modal con título y botón de cerrar */}
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal de Ejemplo
                </h1>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                ></button>
              </div>
              {/* Cuerpo del modal con contenido interactivo */}
              <div className="modal-body">
                <p>¡Este es un modal de Bootstrap funcionando en React 19!</p>
                {/* Muestra el valor actual del contador */}
                <p>Counter actual: <strong>{count}</strong></p>
                {/* Botón para incrementar el contador (demuestra interactividad React + Bootstrap) */}
                <button 
                  className="btn btn-success" 
                  onClick={() => setCount(count + 1)}
                >
                  Incrementar contador
                </button>
              </div>
              {/* Footer del modal con botones de acción */}
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                {/* Botón para resetear el contador a cero */}
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setCount(0)}
                >
                  Resetear contador
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
