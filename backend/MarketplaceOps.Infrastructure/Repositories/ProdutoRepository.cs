using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;

namespace MarketplaceOps.Infrastructure.Repositories;

public class ProdutoRepository : IProdutoRepository
{
    public Task<IEnumerable<Produto>> ObterProdutosComEstoqueAsync()
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task<IEnumerable<Produto>> BuscarPorNomeAsync(string termo)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task<IEnumerable<ProdutoDashboardDto>> ObterNotaMediaPorProdutoAsync()
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task AtualizarPrecoAsync(int produtoId, decimal novoPreco)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }
}
