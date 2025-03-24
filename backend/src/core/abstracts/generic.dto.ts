import { constructDto } from "@/core/inc/functions";

export abstract class GenericDto {
  constructor(data: unknown) {
    Object.assign(this, constructDto(this, data));
  }
}
