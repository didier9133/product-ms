import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, max } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  @Type(() => Number)
  public price: number;
}
