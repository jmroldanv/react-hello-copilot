import { render, screen } from '@testing-library/react'
import Card from './Card.jsx'

describe('Card', () => {
  it('renderiza la estructura base de la tarjeta', () => {
    const { container } = render(<Card />)

    const card = container.querySelector('.card')

    expect(card).toBeInTheDocument()
    expect(card).toHaveStyle({ width: '18rem' })
    expect(card).toHaveClass('card')
  })

  it('muestra el contenido estatico esperado', () => {
    render(<Card />)

    expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument()
    expect(screen.getByText(/Some quick example text to build on the card title/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Go somewhere' })).toHaveAttribute('href', '#')
  })
})