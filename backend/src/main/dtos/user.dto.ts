import { GenericDto }                                from "@/core/abstracts/generic.dto";
import { Expose }                                    from "class-transformer";
import {  IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class UserSignIn extends GenericDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(8)
  password: string;
}

export class UserSignUp extends GenericDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(8)
  password: string;

  @Expose()
  @IsString()
  @MinLength(3)
  name: string;
}

export class UpdateUser extends GenericDto {
  @Expose()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Expose()
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @Expose()
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;
}
