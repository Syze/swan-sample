import { Body, Controller, Post } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadDto } from './dto/fileUpload.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/')
  uploadFile(@Body() fileUploadDto: FileUploadDto) {
    return this.fileUploadService.uploadFile(fileUploadDto);
  }
}
