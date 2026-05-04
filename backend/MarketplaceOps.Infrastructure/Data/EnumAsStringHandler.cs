using System.Data;
using Dapper;

namespace MarketplaceOps.Infrastructure.Data;

public class EnumAsStringHandler<T> : SqlMapper.TypeHandler<T> where T : struct, Enum
{
    public override void SetValue(IDbDataParameter parameter, T value)
    {
        parameter.Value = value.ToString();
        parameter.DbType = DbType.String;
    }

    public override T Parse(object value)
    {
        if (value == null || value is DBNull)
            return default;

        return Enum.TryParse(value.ToString(), true, out T result) ? result : default;
    }
}
