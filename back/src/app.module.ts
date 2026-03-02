import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NocrmModule } from './nocrm/nocrm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NocrmModule,
  ],
})
export class AppModule {}
