using MarketplaceOps.Core.Entities;

namespace MarketplaceOps.Core.Interfaces.Services;

public interface IUsuarioService
{
    Task<Usuario> BuscarPorEmailOuNomeAsync(string termo);
    Task InserirAsync(Usuario usuario);
    Task ExcluirAsync(int usuarioId);
}
