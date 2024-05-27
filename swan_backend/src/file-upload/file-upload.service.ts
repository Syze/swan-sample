import { BadRequestException, Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/fileUpload.dto';
import Swan from '@swan-admin/swan-ai-measurements';

@Injectable()
export class FileUploadService {
  private swan: Swan;
  constructor() {
    this.swan = new Swan('7a338f76-e3ec-4788-9abd-ed1e408bc94e', true);
  }
  async uploadFile(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    if (!file) {
      throw new BadRequestException('File not found!');
    }
    try {
      const blob = new Blob([file.buffer], { type: file.mimetype });
      const files = new File([blob], file.originalname, {
        lastModified: Date.now(),
        type: file.mimetype,
      });

      const data = {
        scanId: fileUploadDto.scanId,
        file: files,
        arrayMetaData: JSON.parse(fileUploadDto.arrayMetaData),
      };
      return await this.swan.fileUpload.uploadFileBackend(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMeasurements(scan_id: string) {
    try {
      const res = await this.swan.measurement.getMeasurementResult(scan_id);
      return res?.data;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }
}
