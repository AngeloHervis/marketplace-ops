using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Services;

public interface IPedidoService
{
    Task<IEnumerable<Pedido>> ObterPedidosPorClienteAsync(int usuarioId);
    Task<IEnumerable<PedidoSuporteDto>> ObterTicketsSuporteAsync();
    Task<IEnumerable<PedidoStatusCountDto>> ObterContagemPedidosPorStatusAsync();
    Task AtualizarEnderecoAsync(int pedidoId, string novoEndereco);
    Task CancelarPedidoEDevolverEstoqueAsync(int pedidoId, int produtoId);
    Task RealizarCompraComBaixaDeEstoqueAsync(Pedido pedido, int produtoId);
}
