namespace MarketplaceOps.Application;

using MarketplaceOps.Domain;

public interface IPedidoRepository
{
    Task<IEnumerable<Pedido>> GetPedidosByUsuarioIdAsync(int usuarioId);
    Task UpdatePedidoStatusAsync(int id, string novoStatus);
}