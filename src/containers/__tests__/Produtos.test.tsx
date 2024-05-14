import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import Produto from '../Produtos'
import { renderizaComProvider } from '../../utils/tests'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Tibia'
  },
  {
    id: 3,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'World of Warcraft'
  },
  {
    id: 4,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produto />)
    await waitFor(() => {
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
      debug()
    })
  })
})
