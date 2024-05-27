import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadDto } from './dto/fileUpload.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileUploadDto: FileUploadDto,
  ) {
    return this.fileUploadService.uploadFile(file, fileUploadDto);
  }

  @Post('/webhook')
  webHookMeasurements(@Body() measurements: any) {
    console.log(measurements);
  }

  @Get('/measurements/:scan_id')
  getMeasurements(@Param('scan_id') scan_id: string) {
    console.log(process.env.API_KEY);
    return this.fileUploadService.getMeasurements(scan_id);
  }
}
