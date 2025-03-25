import { GenericDto }                                              from "@/core/abstracts/generic.dto";
import { Expose, Type }                                            from "class-transformer";
import {  IsString, MinLength, IsOptional, IsNumber, Min, IsUUID } from "class-validator";

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
  @Type(() => String)
  @IsUUID()
  id: string;
}

export class ListGet extends GenericDto {
  @Expose()
  @IsUUID()
  id: string;
}

export class ListGetAll extends GenericDto {
  @Expose()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  take: number;

  @Expose()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  skip: number;
}
