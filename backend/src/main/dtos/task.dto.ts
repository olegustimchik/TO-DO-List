import { GenericDto }                                          from "@/core/abstracts/generic.dto";
import { Expose  }                                             from "class-transformer";
import { IsString, MinLength, IsOptional,  IsBoolean, IsUUID } from "class-validator";

export class TaskCreate extends GenericDto {
  @Expose()
  @IsString()
  @MinLength(3)
  name: string;

  @Expose()
  @IsString()
  @MinLength(8)
  description: string;

  @Expose()
  @IsOptional()
  @IsString()
  listId: string;
}

export class TaskUpdate extends GenericDto {
  @Expose()
  @IsString()
  @MinLength(3)
  name: string;

  @Expose()
  @IsString()
  @MinLength(8)
  description: string;

  @Expose()
  @IsBoolean()
  completed: boolean;
}

export class TaskGet extends GenericDto {
  @Expose()
  @IsUUID()
  id: string;
}

export class ChangeStatus extends GenericDto{ 
  @Expose()
  @IsBoolean()
  completed: boolean; 
}
