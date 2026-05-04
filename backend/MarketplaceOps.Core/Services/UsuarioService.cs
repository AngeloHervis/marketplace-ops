using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Core.Services;

public class UsuarioService(IUsuarioRepository repository) : IUsuarioService
{
    public Task<Usuario> BuscarPorEmailOuNomeAsync(string termo) => repository.BuscarPorEmailOuNomeAsync(termo);

    public Task InserirAsync(Usuario usuario) => repository.InserirAsync(usuario);

    public Task ExcluirAsync(int usuarioId) => repository.ExcluirAsync(usuarioId);
}
