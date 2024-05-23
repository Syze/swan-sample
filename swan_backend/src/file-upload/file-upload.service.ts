import { BadRequestException, Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/fileUpload.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires

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
      // const data = { ...fileUploadDto, file };
      // console.log({file, ...fileUploadDto});
      const data = {
        scanId: fileUploadDto.scanId,
        file,
        arrayMetaData: JSON.parse(fileUploadDto.arrayMetaData),
      };
      // return data;
      return await this.swan.fileUpload.uploadFile(data);
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }
}
