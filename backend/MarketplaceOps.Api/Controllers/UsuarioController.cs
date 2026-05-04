using Microsoft.AspNetCore.Mvc;
using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController(IUsuarioService service) : ControllerBase
{
    [HttpGet("buscar")]
    public async Task<IActionResult> Buscar([FromQuery] string termo)
    {
        var result = await service.BuscarPorEmailOuNomeAsync(termo);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Inserir([FromBody] Usuario usuario)
    {
        await service.InserirAsync(usuario);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        await service.ExcluirAsync(id);
        return Ok();
    }
}
