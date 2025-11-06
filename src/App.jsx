import { useState } from 'react'
import './App.css'
import Card from './components/Card.jsx'
import PostsList from './components/PostsList.jsx'
import CommentList from './components/CommentList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Hello from React 19</h1>
        
        {/* Botón para abrir el modal */}
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

        <Card />

        {/* Componente para mostrar posts de la API */}
        <PostsList />

        {/* Componente para mostrar comentarios de la API */}
        <CommentList />

        {/* Modal de Bootstrap */}
        <div 
          className="modal fade" 
          id="exampleModal" 
          tabIndex="-1" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
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
              <div className="modal-body">
                <p>¡Este es un modal de Bootstrap funcionando en React 19!</p>
                <p>Counter actual: <strong>{count}</strong></p>
                <button 
                  className="btn btn-success" 
                  onClick={() => setCount(count + 1)}
                >
                  Incrementar contador
                </button>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
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
