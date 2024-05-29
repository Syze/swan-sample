import { BadRequestException, Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/fileUpload.dto';
import Swan from '@swan-admin/swan-ai-measurements';

@Injectable()
export class FileUploadService {
  private swan: Swan;
  constructor() {
    this.swan = new Swan(process.env.API_KEY);
  }
  async uploadFile(file: Express.Multer.File, fileUploadDto: FileUploadDto) {
    if (!file) {
      throw new BadRequestException('File not found!');
    }

    const keyValuePairs = JSON.parse(fileUploadDto.arrayMetaData).reduce(
      (acc, obj) => {
        const key = Object.keys(obj)[0];
        acc[key] = obj[key];
        return acc;
      },
      {},
    );
    let customerConfig = null;
    try {
      customerConfig = await this.swan.custom.getCustomCustomerConfig(
        keyValuePairs.customer_store_url,
      );
    } catch (e) {}
    if (!customerConfig) {
      try {
        await this.swan.custom.createCustomer({
          name: keyValuePairs.customer_store_url,
          storeUrl: keyValuePairs.customer_store_url,
          location: 'IE',
          email: keyValuePairs.email,
          emailsTier_1: null,
          emailsTier_2: null,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
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
      return await this.swan.fileUpload.uploadFile(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMeasurements(scan_id: string) {
    try {
      const res = await this.swan.measurement.getMeasurementResult(scan_id);
      return res?.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
