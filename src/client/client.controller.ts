import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const editFileName = (req, file, cb) => {
  const randomName = uuidv4() + file.originalname;
  cb(null, randomName);
};

@Controller('client')
export class ClientController {
  // Dependency Injection
  constructor(private MyClientService: ClientService) {}
  @UseGuards(AuthGuard('jwt-client'))
  @Get('/clientInfo')
  getSomething(@Req() req: any) {
    return req.user;
  }

  @Get('clientInfoByEmail/:email')
  async getClientByEmail(@Param('email') email: any) {
    const client = await this.MyClientService.findClientByEmail(email);
    if (client) {
      return client;
    }
  }
  @UseGuards(AuthGuard('jwt-client'))
  @Post('/picture/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadProfilePicture(@Req() req: any, @UploadedFile() file) {
    return this.MyClientService.updatePicture(req.id, file.filename);
  }
  @UseGuards(AuthGuard('jwt-client'))
  @Get('/picture/:filename')
  seeUploadedFile(@Param('filename') filename: string, @Res() res) {
    return res.sendFile(filename, { root: './uploads/clients' });
  }
}
