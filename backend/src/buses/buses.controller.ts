import { Controller, Get, Query } from '@nestjs/common';
import { BusesService } from './buses.service';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Get()
  findAll(@Query('from') from: string, @Query('to') to: string) {
    return this.busesService.searchBuses(from, to);
  }
}
