import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PapermakerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPapermakers() {
    const papermakers = await this.prismaService.user.findMany({
      where: {
        role: 'paperMaker',
      },
      select: {
        id: true,
        username: true,
        name: true,
        address: true,
        lat: true,
        long: true,
        picture: true,
        phoneNumber: true,
        createdAt: true,
        role: true,
        paperMaker: true,
      },
    });
    return {
      status: 'success',
      length: papermakers.length,
      papermakers: papermakers,
    };
  }
}
