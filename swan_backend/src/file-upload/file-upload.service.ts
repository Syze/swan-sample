import { Injectable } from '@nestjs/common';
import { FileUploadDto } from './dto/fileUpload.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// import detectDevice from 'ottoleads_log_aggregation';
import Swan from '@swan-admin/swan-ai-measurements';

@Injectable()
export class FileUploadService {
  private swan: any;
  constructor() {
    // console.log(process.env.ACCESS_KEY);
    console.log(Swan);
    this.swan = new Swan('7a338f76-e3ec-4788-9abd-ed1e408bc94e');
  }

  uploadFile(fileUploadDto: FileUploadDto) {
    // console.log(fileUploadDto);
    // console.log(process.env.ACCESS_KEY);
    // const data = { ...fileUploadDto };
    // return swan.fileUpload.uploadFile(data);
  }
}
