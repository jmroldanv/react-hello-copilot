/**
 * PostsList.jsx
 * 
 * Lista paginada de posts obtenidos desde JSONPlaceholder API.
 * 
 * Características principales:
 * - Paginación del lado del cliente: Obtiene todos los posts y los pagina localmente
 * - Estados de carga y error: Manejo completo de estados de la aplicación
 * - Interfaz responsive: Grid adaptativo con Bootstrap
 * - Paginación avanzada: Navegación inteligente con puntos suspensivos
 * - Función de actualización: Botón para recargar datos
 * 
 * Estados:
 * - allPosts: Array con todos los posts de la API
 * - currentPage: Página actual (inicia en 1)
 * - loading: Estado de carga
 * - error: Manejo de errores
 * 
 * API: https://jsonplaceholder.typicode.com/posts
 * Configuración: 10 posts por página
 * 
 * @returns {JSX.Element} Lista paginada de posts con navegación
 */

import React, { useState, useEffect } from 'react'

const PostsList = () => {
  const [allPosts, setAllPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const postsPerPage = 10
  
  /* Calcular posts para la página actual */
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost)
  
  /* Calcular número total de páginas */
  const totalPages = Math.ceil(allPosts.length / postsPerPage)

  /**
   * Función para obtener los posts de la API
   * Carga todos los posts una sola vez y resetea a la primera página
   */
  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      
      const data = await response.json()
      setAllPosts(data) // Guardamos todos los posts
      setCurrentPage(1) // Resetear a la primera página
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* useEffect para cargar los posts al montar el componente */
  useEffect(() => {
    fetchPosts()
  }, [])

  /**
   * Función para recargar los posts
   * Vuelve a ejecutar fetchPosts para obtener datos frescos
   */
  const handleRefresh = () => {
    fetchPosts()
  }

  /**
   * Funciones de paginación para navegación entre páginas
   */
  /* Ir a una página específica */
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
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
   * Generar números de página para mostrar en la navegación
   * Implementa lógica inteligente para mostrar máximo 5 páginas centradas
   * alrededor de la página actual, con ajustes en los extremos
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

  /* Estado de carga: Muestra spinner mientras se obtienen los datos */
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando posts...</p>
      </div>
    )
  }

  /* Estado de error: Muestra mensaje de error con opción de reintento */
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error al cargar posts</h4>
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
          <h2>Posts desde API</h2>
          <p className="text-muted mb-0">
            Mostrando {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, allPosts.length)} de {allPosts.length} posts
          </p>
        </div>
        <button 
          className="btn btn-outline-primary" 
          onClick={handleRefresh}
        >
          <i className="bi bi-arrow-clockwise me-1"></i>
          Actualizar
        </button>
      </div>

      <div className="row">
        {currentPosts.map(post => (
          <div key={post.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h6 className="card-title mb-0">Post #{post.id}</h6>
              </div>
              <div className="card-body">
                <h5 className="card-title text-capitalize">
                  {post.title}
                </h5>
                <p className="card-text">
                  {post.body.length > 100 
                    ? `${post.body.substring(0, 100)}...` 
                    : post.body
                  }
                </p>
              </div>
              <div className="card-footer text-muted">
                <small>Usuario ID: {post.userId}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Componente de Paginación */}
      {totalPages > 1 && (
        <nav aria-label="Paginación de posts" className="mt-4">
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

      {allPosts.length === 0 && !loading && (
        <div className="text-center text-muted">
          <p>No hay posts disponibles</p>
        </div>
      )}
    </div>
  )
}

export default PostsList