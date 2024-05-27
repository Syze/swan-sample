import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [FileUploadModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
