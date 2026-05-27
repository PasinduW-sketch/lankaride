import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusesModule } from './buses/buses.module';

@Module({
  imports: [BusesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
