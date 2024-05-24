import { BadRequestException, Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/fileUpload.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly type: string;
}
// import detectDevice from 'ottoleads_log_aggregation';
import Swan from '@swan-admin/swan-ai-measurements';

@Injectable()
export class FileUploadService {
  private swan: Swan;
  constructor() {
    this.swan = new Swan('7a338f76-e3ec-4788-9abd-ed1e408bc94e');
  }

  async uploadFile(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    try {
      const blob = new Blob([file.buffer], { type: file.mimetype });
      // Create a File object from the Blob
      const files = new File([blob], file.originalname, {
        lastModified: Date.now(),
        type: file.mimetype,
      });
      console.log(files, 'gggg');

      const data = {
        scanId: fileUploadDto.scanId,
        file: files,
        arrayMetaData: JSON.parse(fileUploadDto.arrayMetaData),
      };
      // // return data;
      return await this.swan.fileUpload.uploadFile(data);
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }
}
