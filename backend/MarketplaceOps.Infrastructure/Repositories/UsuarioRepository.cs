using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Repositories;

namespace MarketplaceOps.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    public Task<Usuario> BuscarPorEmailOuNomeAsync(string termo)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task InserirAsync(Usuario usuario)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }

    public Task ExcluirAsync(int usuarioId)
    {
        // TODO MENTORADO: Escreva sua query SQL aqui
        throw new NotImplementedException("Query não implementada.");
    }
}
