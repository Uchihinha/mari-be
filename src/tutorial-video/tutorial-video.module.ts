import { Module } from '@nestjs/common';
import { TutorialVideoService } from './tutorial-video.service';
import { TutorialVideoController } from './tutorial-video.controller';

@Module({
  controllers: [TutorialVideoController],
  providers: [TutorialVideoService],
})
export class TutorialVideoModule {}
