using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Core.Services;

public class PedidoService(IPedidoRepository repository) : IPedidoService
{
    public Task<IEnumerable<Pedido>> ObterPedidosPorClienteAsync(int usuarioId) => repository.ObterPedidosPorClienteAsync(usuarioId);

    public Task<IEnumerable<PedidoSuporteDto>> ObterTicketsSuporteAsync() => repository.ObterTicketsSuporteAsync();

    public Task<IEnumerable<PedidoStatusCountDto>> ObterContagemPedidosPorStatusAsync() => repository.ObterContagemPedidosPorStatusAsync();

    public Task AtualizarEnderecoAsync(int pedidoId, string novoEndereco) => repository.AtualizarEnderecoAsync(pedidoId, novoEndereco);

    public Task CancelarPedidoEDevolverEstoqueAsync(int pedidoId, int produtoId) => repository.CancelarPedidoEDevolverEstoqueAsync(pedidoId, produtoId);

    public Task RealizarCompraComBaixaDeEstoqueAsync(Pedido pedido, int produtoId) => repository.RealizarCompraComBaixaDeEstoqueAsync(pedido, produtoId);
}
