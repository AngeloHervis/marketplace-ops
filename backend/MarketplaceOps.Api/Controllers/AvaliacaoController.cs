using Microsoft.AspNetCore.Mvc;
using MarketplaceOps.Core.Entities;
using MarketplaceOps.Core.Interfaces.Services;

namespace MarketplaceOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AvaliacaoController(IAvaliacaoService service) : ControllerBase
{
    [HttpGet("produto/{produtoId}")]
    public async Task<IActionResult> ObterDetalhes(int produtoId)
    {
        var result = await service.ObterDetalhesComUsuarioAsync(produtoId);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Inserir([FromBody] Avaliacao avaliacao)
    {
        await service.InserirAsync(avaliacao);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        await service.ExcluirAsync(id);
        return Ok();
    }
}
