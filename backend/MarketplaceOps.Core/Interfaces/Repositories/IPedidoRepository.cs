using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Repositories;

public interface IPedidoRepository
{
    Task<IEnumerable<Pedido>> ObterPedidosPorClienteAsync(int usuarioId);
    Task<IEnumerable<PedidoSuporteDto>> ObterTicketsSuporteAsync();
    Task<IEnumerable<PedidoStatusCountDto>> ObterContagemPedidosPorStatusAsync();
    Task AtualizarEnderecoAsync(int pedidoId, string novoEndereco); // Assume que seria tratado numa coluna ou json

    // Desafios
    Task CancelarPedidoEDevolverEstoqueAsync(int pedidoId, int produtoId);
    Task RealizarCompraComBaixaDeEstoqueAsync(Pedido pedido, int produtoId);
}
