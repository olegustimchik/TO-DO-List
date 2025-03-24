import { GenericDto }                                from "@/core/abstracts/generic.dto";
import { Expose, Type }                                    from "class-transformer";
import {  IsString, IsEmail, MinLength, IsOptional, IsNumber } from "class-validator";

export class ListCreate extends GenericDto {
  @Expose()
  @IsString()
  @MinLength(3)
  name: string;
}

export class ListUpdate extends GenericDto {
  @Expose()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;
}

export class ListDelete extends GenericDto {
  @Expose()
  @IsString()
  id: string;
}


export class ListGet extends GenericDto {
  @Expose()
  @IsString()
  id: string;
}

export class ListGetAll extends GenericDto {
  @Expose()
  @Type(() => Number)
  @IsNumber()
  take: number; 

  @Expose()
  @Type(() => Number)
  @IsNumber()
  skip: number;
}