using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Repositories;

public interface IUsuarioRepository
{
    Task<Usuario> BuscarPorEmailOuNomeAsync(string termo);
    Task InserirAsync(Usuario usuario);
    Task ExcluirAsync(int usuarioId);
}
