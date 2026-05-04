using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;

namespace MarketplaceOps.Infrastructure.Repositories;

public class PedidoRepository : IPedidoRepository
{
    public Task<IEnumerable<Pedido>> ObterPedidosPorClienteAsync(int usuarioId)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task<IEnumerable<PedidoSuporteDto>> ObterTicketsSuporteAsync()
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task<IEnumerable<PedidoStatusCountDto>> ObterContagemPedidosPorStatusAsync()
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task AtualizarEnderecoAsync(int pedidoId, string novoEndereco)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task CancelarPedidoEDevolverEstoqueAsync(int pedidoId, int produtoId)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task RealizarCompraComBaixaDeEstoqueAsync(Pedido pedido, int produtoId)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }
}
