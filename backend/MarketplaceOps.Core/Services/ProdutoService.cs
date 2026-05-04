using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Core.Services;

public class ProdutoService(IProdutoRepository repository) : IProdutoService
{
    public Task<IEnumerable<Produto>> ObterProdutosComEstoqueAsync() => repository.ObterProdutosComEstoqueAsync();

    public Task<IEnumerable<Produto>> BuscarPorNomeAsync(string termo) => repository.BuscarPorNomeAsync(termo);

    public Task<IEnumerable<ProdutoDashboardDto>> ObterNotaMediaPorProdutoAsync() => repository.ObterNotaMediaPorProdutoAsync();

    public Task AtualizarPrecoAsync(int produtoId, decimal novoPreco) => repository.AtualizarPrecoAsync(produtoId, novoPreco);
}
