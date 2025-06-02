import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class BookFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsNumber()
  price_min?: number;

  @IsOptional()
  @IsNumber()
  price_max?: number;

  @IsOptional()
  @IsDateString()
  pub_date_from?: string;

  @IsOptional()
  @IsDateString()
  pub_date_to?: string;
}
