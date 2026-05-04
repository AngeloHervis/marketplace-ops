import type {
  Usuario,
  Produto,
  Pedido,
  Avaliacao,
  PedidoStatusCountDto,
  PedidoSuporteDto,
  ProdutoDashboardDto,
  AvaliacaoDetalheDto,
  CreateUsuarioDto,
  CreatePedidoDto,
  CreateAvaliacaoDto,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// ============== USUARIO ==============
export const usuarioApi = {
  buscar: (termo: string) =>
    fetchApi<Usuario[]>(`/usuario/buscar?termo=${encodeURIComponent(termo)}`),

  inserir: (usuario: CreateUsuarioDto) =>
    fetchApi<void>('/usuario', {
      method: 'POST',
      body: JSON.stringify(usuario),
    }),

  excluir: (id: number) =>
    fetchApi<void>(`/usuario/${id}`, {
      method: 'DELETE',
    }),
};

// ============== PRODUTO ==============
export const produtoApi = {
  obterComEstoque: () => fetchApi<Produto[]>('/produto'),

  buscar: (termo: string) =>
    fetchApi<Produto[]>(`/produto/buscar?termo=${encodeURIComponent(termo)}`),

  obterNotaMedia: () =>
    fetchApi<ProdutoDashboardDto[]>('/produto/dashboard/media-avaliacoes'),

  atualizarPreco: (id: number, novoPreco: number) =>
    fetchApi<void>(`/produto/${id}/preco`, {
      method: 'PUT',
      body: JSON.stringify(novoPreco),
    }),
};

// ============== PEDIDO ==============
export const pedidoApi = {
  obterPorCliente: (usuarioId: number) =>
    fetchApi<Pedido[]>(`/pedido/cliente/${usuarioId}`),

  obterSuporte: () => fetchApi<PedidoSuporteDto[]>('/pedido/suporte'),

  obterContagemStatus: () =>
    fetchApi<PedidoStatusCountDto[]>('/pedido/dashboard/status'),

  atualizarEndereco: (id: number, novoEndereco: string) =>
    fetchApi<void>(`/pedido/${id}/endereco`, {
      method: 'PUT',
      body: JSON.stringify(novoEndereco),
    }),

  cancelar: (id: number, produtoId: number) =>
    fetchApi<void>(`/pedido/${id}/cancelar?produtoId=${produtoId}`, {
      method: 'POST',
    }),

  comprar: (pedido: CreatePedidoDto, produtoId: number) =>
    fetchApi<void>(`/pedido/comprar/${produtoId}`, {
      method: 'POST',
      body: JSON.stringify(pedido),
    }),
};

// ============== AVALIACAO ==============
export const avaliacaoApi = {
  obterDetalhes: (produtoId: number) =>
    fetchApi<AvaliacaoDetalheDto[]>(`/avaliacao/produto/${produtoId}`),

  inserir: (avaliacao: CreateAvaliacaoDto) =>
    fetchApi<void>('/avaliacao', {
      method: 'POST',
      body: JSON.stringify(avaliacao),
    }),

  excluir: (id: number) =>
    fetchApi<void>(`/avaliacao/${id}`, {
      method: 'DELETE',
    }),
};
