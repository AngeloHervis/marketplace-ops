using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Repositories;

public interface IProdutoRepository
{
    Task<IEnumerable<Produto>> ObterProdutosComEstoqueAsync();
    Task<IEnumerable<Produto>> BuscarPorNomeAsync(string termo);
    Task<IEnumerable<ProdutoDashboardDto>> ObterNotaMediaPorProdutoAsync();
    Task AtualizarPrecoAsync(int produtoId, decimal novoPreco);
}
