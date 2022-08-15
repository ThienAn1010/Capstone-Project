import { Controller, Get } from '@nestjs/common';
import { PapermakerService } from './papermakers.service';

@Controller('/papermakers')
export class PapermakerController {
  constructor(private readonly papermakerService: PapermakerService) {}
  @Get('')
  async getAllPapermakers() {
    return this.papermakerService.getAllPapermakers();
  }
}
