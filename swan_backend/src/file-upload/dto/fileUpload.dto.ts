import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  file: any;

  @IsNotEmpty()
  objMetaData: Record<string, string>[];

  @IsNotEmpty()
  scanId: string;
}
