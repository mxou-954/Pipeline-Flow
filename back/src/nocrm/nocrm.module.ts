import { Module } from '@nestjs/common';
import { NocrmService } from './nocrm.service';
import { NocrmController } from './nocrm.controller';

@Module({
  controllers: [NocrmController],
  providers: [NocrmService],
})
export class NocrmModule {}
