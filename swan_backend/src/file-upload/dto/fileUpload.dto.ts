import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  arrayMetaData: string;

  @IsNotEmpty()
  scanId: string;
}
