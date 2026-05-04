using MarketplaceOps.Core.Enums;

namespace MarketplaceOps.Core.Entities;

public class Usuario
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UsuarioRole Role { get; set; } = UsuarioRole.Cliente;
}
