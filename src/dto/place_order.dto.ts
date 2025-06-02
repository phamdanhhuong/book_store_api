import {IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { PaymentMethod } from 'src/enums/payment-method.enum';

export class PlaceOrderDto {
  @IsNotEmpty()
  itemIds : number[]

  @IsNotEmpty()
  @IsString()
  address : string

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method : PaymentMethod

}
