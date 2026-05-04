namespace MarketplaceOps.Application;

using MarketplaceOps.Domain;

public interface IUsuarioRepository
{
    Task<Usuario> GetUsuarioByIdAsync(int id);
    Task<IEnumerable<Usuario>> SearchUsuariosAsync(string termo);
    Task AddUsuarioAsync(Usuario usuario);
    Task DeleteUsuarioAsync(int id);
}