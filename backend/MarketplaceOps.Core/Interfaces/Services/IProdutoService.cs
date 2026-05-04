using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Services;

public interface IProdutoService
{
    Task<IEnumerable<Produto>> ObterProdutosComEstoqueAsync();
    Task<IEnumerable<Produto>> BuscarPorNomeAsync(string termo);
    Task<IEnumerable<ProdutoDashboardDto>> ObterNotaMediaPorProdutoAsync();
    Task AtualizarPrecoAsync(int produtoId, decimal novoPreco);
}
