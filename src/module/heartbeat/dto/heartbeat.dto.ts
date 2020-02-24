import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class HeartBeatDTO {
  @IsNumber()
  humidity: number;

  @IsNumber()
  temperature: number;

  @IsDate()
  @IsNotEmpty()
  time: Date;

  @IsString()
  @IsNotEmpty()
  siteId: string;
}
