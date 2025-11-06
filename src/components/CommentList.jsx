/**
 * CommentList.jsx
 * 
 * Lista paginada de comentarios con paginación del lado del servidor.
 * 
 * Características principales:
 * - Paginación del lado del servidor: Utiliza parámetros _start y _limit de la API
 * - Optimización de rendimiento: Solo carga los datos necesarios por página
 * - Diseño de comentarios: Muestra email del autor y cuerpo del comentario
 * - Avatar generado: Círculo con la primera letra del email
 * - Navegación eficiente: Recarga de la API en cada cambio de página
 * 
 * Estados:
 * - comments: Array con comentarios de la página actual
 * - currentPage: Página actual
 * - loading: Estado de carga
 * - error: Manejo de errores
 * 
 * API: https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${limit}
 * Configuración: 10 comentarios por página, 500 comentarios totales (50 páginas)
 * 
 * Diferencias con PostsList:
 * - Paginación en servidor vs cliente
 * - Datos mínimos vs datos completos
 * - Diseño de lista vs grid de tarjetas
 * 
 * @returns {JSX.Element} Lista paginada de comentarios con navegación del servidor
 */

import React, { useState, useEffect } from 'react'

const CommentList = () => {
  const [comments, setComments] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const commentsPerPage = 10
  const totalComments = 500 /* JSONPlaceholder tiene 500 comentarios */
  const totalPages = Math.ceil(totalComments / commentsPerPage)

  /**
   * Función para obtener comentarios de la API con paginación del servidor
   * Realiza una nueva llamada HTTP por cada página solicitada
   * 
   * @param {number} page - Número de página a cargar (default: 1)
   */
  const fetchComments = async (page = 1) => {
    try {
      setLoading(true)
      setError(null)
      
      /* Calcular el _start para la paginación basado en la página solicitada */
      const start = (page - 1) * commentsPerPage
      
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${commentsPerPage}`
      )
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      
      const data = await response.json()
      setComments(data)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* 
   * useEffect para cargar comentarios cuando cambie la página
   * IMPORTANTE: Se ejecuta en cada cambio de currentPage (diferente a PostsList)
   */
  useEffect(() => {
    fetchComments(currentPage)
  }, [currentPage])

  /**
   * Funciones de navegación para cambio de página
   * Cada cambio activa una nueva llamada a la API
   */
  
  /* Ir a una página específica con validación de límites */
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  /* Ir a la página anterior */
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  /* Ir a la página siguiente */
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  /**
   * Función para recargar la página actual
   * Útil para obtener datos actualizados sin cambiar de página
   */
  const handleRefresh = () => {
    fetchComments(currentPage)
  }

  /**
   * Generar números de página para mostrar (similar a PostsList)
   * Implementa la misma lógica de paginación inteligente
   * 
   * @returns {Array<number>} Array de números de página a mostrar
   */
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
    
    // Ajustar startPage si estamos cerca del final
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    
    return pageNumbers
  }

  /* Estados de renderizado condicional */
  
  /* Estado de carga: Muestra spinner durante la llamada a la API */
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Cargando comentarios...</span>
        </div>
        <p className="mt-2">Cargando comentarios...</p>
      </div>
    )
  }

  /* Estado de error: Muestra mensaje de error con opción de reintento */
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error al cargar comentarios</h4>
        <p>{error}</p>
        <button 
          className="btn btn-outline-danger" 
          onClick={handleRefresh}
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Comentarios desde API</h2>
          <p className="text-muted mb-0">
            Página {currentPage} de {totalPages} - Mostrando {comments.length} comentarios
          </p>
          <small className="text-muted">
            (Paginación del lado del servidor)
          </small>
        </div>
        <button 
          className="btn btn-outline-info" 
          onClick={handleRefresh}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Actualizar
        </button>
        </div>

      {/* Lista de comentarios con diseño optimizado para contenido textual */}
      <div className="row">
        {comments.map(comment => (
          <div key={comment.id} className="col-12 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-start">
                  {/* Avatar generado con la primera letra del email */}
                  <div className="flex-shrink-0">
                    <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" 
                         style={{width: '40px', height: '40px', fontSize: '14px'}}>
                      {comment.email.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {/* Contenido del comentario: email y body */}
                  <div className="flex-grow-1 ms-3">
                    <h6 className="card-title mb-1">
                      <strong>{comment.email}</strong>
                    </h6>
                    <p className="card-text mb-0">
                      {comment.body}
                    </p>
                    <small className="text-muted">
                      Comentario #{comment.id}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Componente de Paginación del lado del servidor */}
      {totalPages > 1 && (
        <nav aria-label="Paginación de comentarios" className="mt-4">
          <ul className="pagination justify-content-center">
            {/* Botón Anterior */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
            </li>

            {/* Primera página si no está visible */}
            {getPageNumbers()[0] > 1 && (
              <>
                <li className="page-item">
                  <button className="page-link" onClick={() => goToPage(1)}>
                    1
                  </button>
                </li>
                {getPageNumbers()[0] > 2 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
              </>
            )}

            {/* Números de página */}
            {getPageNumbers().map(pageNumber => (
              <li 
                key={pageNumber} 
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
              >
                <button 
                  className="page-link" 
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            {/* Última página si no está visible */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}
                <li className="page-item">
                  <button className="page-link" onClick={() => goToPage(totalPages)}>
                    {totalPages}
                  </button>
                </li>
              </>
            )}

            {/* Botón Siguiente */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}

      {comments.length === 0 && !loading && (
        <div className="text-center text-muted">
          <p>No hay comentarios disponibles</p>
        </div>
      )}
    </div>
  )
}

export default CommentList