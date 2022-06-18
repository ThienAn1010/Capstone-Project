import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllServices() {
    const services = await this.prismaService.service.findMany();
    return { status: 'success', length: services.length, services: services };
  }
}
