import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LawyerService } from './lawyer.service';
import { lawyerentity } from './entities/lawyer.entity';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const editFileName = (req, file, cb) => {
  const randomName = uuidv4() + file.originalname;
  cb(null, randomName);
};
@Controller('lawyer')
export class LawyerController {
  constructor(private lawyerService: LawyerService) {}

  @UseGuards(AuthGuard('jwt-lawyer'))
  @Get('/lawyerinfo')
  async getLawyerInfo(@Req() req: any) {
    return req.user;
  }

  @Get('/lawyerInfoByEmail/:email')
  async lawyerInfoByEmail(@Param('email') email: string) {
    return await this.lawyerService.findLawyerByEmail(email);
  }

  @Post('/picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  async uploadProfilePicture(@Req() req: any, @UploadedFile() file) {
    return this.lawyerService.updateProfilePicture(req.id, file.filename);
  }

  @Get('/picture/:filename')
  seeUploadedFile(@Param('filename') filename: string, @Res() res) {
    return res.sendFile(filename, { root: './uploads/lawyers' });
  }

  @Post('/updateRating/:email/:rating')
  async updateRating(
    @Param('email') email: string,
    @Param('rating', ParseIntPipe) rating: number,
  ) {
    return this.lawyerService.updateLawyerRating(email, rating);
  }

  @UseGuards(AuthGuard('jwt-client'))
  @Get()
  async findAllLawyers(): Promise<lawyerentity[]> {
    return await this.lawyerService.findAllLawyers();
  }

  @Get('/:id')
  async findLawyerById(@Param('id') id: string): Promise<lawyerentity> {
    return await this.lawyerService.findLawyerById(id);
  }
}
