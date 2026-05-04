// Enums correspondentes ao backend
export enum PedidoStatus {
  Pendente = 'Pendente',
  Enviado = 'Enviado',
  Cancelado = 'Cancelado',
}

export enum UsuarioRole {
  Cliente = 'Cliente',
  Admin = 'Admin',
}

// Entidades principais
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: UsuarioRole;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

export interface Pedido {
  id: number;
  usuarioId: number;
  dataPedido: string;
  status: PedidoStatus;
}

export interface Avaliacao {
  id: number;
  produtoId: number;
  usuarioId: number;
  nota: number;
  comentario: string;
}

// DTOs de resposta
export interface PedidoStatusCountDto {
  status: PedidoStatus;
  quantidade: number;
}

export interface PedidoSuporteDto {
  pedidoId: number;
  nomeCliente: string;
  emailCliente: string;
  nomeProduto: string;
  dataPedido: string;
}

export interface ProdutoDashboardDto {
  produtoId: number;
  nomeProduto: string;
  notaMedia: number;
}

export interface AvaliacaoDetalheDto {
  avaliacaoId: number;
  nomeUsuario: string;
  comentario: string;
  nota: number;
}

// DTOs de criacao/atualizacao
export interface CreateUsuarioDto {
  nome: string;
  email: string;
  role: UsuarioRole;
}

export interface CreatePedidoDto {
  usuarioId: number;
  dataPedido: string;
  status: PedidoStatus;
}

export interface CreateAvaliacaoDto {
  produtoId: number;
  usuarioId: number;
  nota: number;
  comentario: string;
}
