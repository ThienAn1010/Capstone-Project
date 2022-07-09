import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfferedServiceDto } from './dto/create-offered-service.dto';
import { UpdateOfferedServiceDto } from './dto/update-offered-service.dto';

@Injectable()
export class OfferedServicesService {
  constructor(private readonly prismaService: PrismaService) {}
  private checkSortField(field: string) {
    if (field.charAt(0) === '+' || field.charAt(0) === '-') {
      const orderBy = field.charAt(0) === '+' ? 'asc' : 'desc';
      const actualFied = field.slice(1);
      if (actualFied === 'rating' || actualFied === 'totalCases') {
        return {
          paperMaker: {
            [actualFied]: orderBy,
          },
        };
      }
      return { [actualFied]: orderBy };
    } else {
      if (field === 'rating' || field === 'totalCases') {
        return {
          paperMaker: {
            [field]: 'asc',
          },
        };
      }
      return { [field]: 'asc' };
    }
  }
  private parseNumberField(
    field: string | { gte?: string; lte?: string; gt?: string; lt?: string },
  ) {
    if (typeof field === 'string') {
      return parseFloat(field);
    }
    const result = {} as any;
    Object.keys(field).forEach((key) => {
      result[key] = parseFloat(field[key]);
    });
    return result;
  }

  private pagination(queryObj) {
    const page = parseInt(queryObj.page) || 1;
    const pageSize = parseInt(queryObj.limit) || 10;
    const skip = (page - 1) * pageSize;
    return { skip: skip, take: pageSize };
  }

  // Sort
  private sort(sort: string) {
    if (!sort) {
      return { createdAt: 'desc' };
    }

    const fields = sort.split(',');
    return fields.map(this.checkSortField) as any;
  }

  // Filter
  private filter(queryObj) {
    const filterBy = { ...queryObj };
    const excludeField = ['sort', 'page', 'limit'];
    excludeField.forEach((field) => delete filterBy[field]);
    if (filterBy.duration) {
      filterBy.duration = this.parseNumberField(filterBy.duration);
    }
    if (filterBy.price) {
      filterBy.price = this.parseNumberField(filterBy.price);
    }
    if (filterBy.rating) {
      filterBy.paperMaker = {
        rating: this.parseNumberField(filterBy.rating),
      };
      delete filterBy.rating;
    }
    if (filterBy.serviceId) {
      if (typeof filterBy.serviceId === 'object') {
        filterBy.serviceId = {
          in: filterBy.serviceId,
        };
      }
    }
    return filterBy;
  }
  async getAllOfferedServices(query) {
    // Filter
    // Allowed filter fields = service=id, paperMaker
    const filterBy = this.filter(query);
    // Sort
    const orderBy = this.sort(query.sort);
    // Pagination
    const { skip, take } = this.pagination(query);

    try {
      const offeredServices = await this.prismaService.offeredService.findMany({
        include: {
          paperMaker: {
            include: {
              user: {
                select: {
                  id: true,
                  role: true,
                  name: true,
                  username: true,
                  picture: true,
                },
              },
            },
          },
          service: true,
        },
        where: filterBy,
        orderBy,
        skip,
        take,
      });
      const numberOfRecords = await this.prismaService.offeredService.count({
        where: filterBy,
      });
      return {
        status: 'success',
        length: offeredServices.length,
        numberOfRecords,
        offeredServices: offeredServices,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        status: 'fail',
        message: 'Invalid request',
      });
    }
  }

  async getOfferedService(serviceId: string) {
    const offeredService = await this.prismaService.offeredService.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        service: true,
        paperMaker: {
          include: {
            user: {
              select: {
                id: true,
                role: true,
                name: true,
                username: true,
                picture: true,
              },
            },
          },
        },
      },
    });
    return offeredService;
  }

  async createOfferedService(service: CreateOfferedServiceDto) {
    const { duration, serviceId, price, userId } = service;
    const paperMaker = await this.prismaService.paperMaker.findFirst({
      where: {
        userId: userId,
      },
      include: {
        offeredServices: true,
      },
    });
    if (paperMaker.offeredServices.length > 0) {
      throw new BadRequestException({
        status: 'fail',
        message: 'PaperMaker can only have one service',
      });
    }
    const offeredService = await this.prismaService.offeredService.create({
      data: {
        duration,
        price,
        serviceId,
        paperMakerId: paperMaker.id,
      },
      include: {
        service: true,
        paperMaker: true,
      },
    });
    return offeredService;
  }

  private async findOfferedServiceByUserId(
    offeredServiceId: string,
    userId: string,
  ) {
    const offeredService = await this.prismaService.offeredService.findFirst({
      where: {
        id: offeredServiceId,
        paperMaker: {
          userId: userId,
        },
      },
    });
    return offeredService;
  }

  async updateOfferedService(updateOfferedServiceDto: UpdateOfferedServiceDto) {
    const offeredService = await this.findOfferedServiceByUserId(
      updateOfferedServiceDto.offeredServiceId,
      updateOfferedServiceDto.userId,
    );
    if (!offeredService) {
      throw new BadRequestException({
        status: 'fail',
        message: 'Not an author or invalid offered service provided',
      });
    }
    const updatedField = {} as any;
    if (updateOfferedServiceDto.price) {
      updatedField.price = updateOfferedServiceDto.price;
    }
    if (updateOfferedServiceDto.duration) {
      updatedField.duration = updateOfferedServiceDto.duration;
    }
    const updateOfferedService = await this.prismaService.offeredService.update(
      {
        where: {
          id: updateOfferedServiceDto.offeredServiceId,
        },
        data: updatedField,
        include: {
          paperMaker: true,
          service: true,
        },
      },
    );
    return updateOfferedService;
  }

  async deleteOfferedService(deleteService: {
    userId: string;
    offeredServiceId: string;
  }) {
    const offeredService = await this.findOfferedServiceByUserId(
      deleteService.offeredServiceId,
      deleteService.userId,
    );
    if (!offeredService) {
      throw new BadRequestException({
        status: 'fail',
        message: 'Not an author or invalid offered service provided',
      });
    }
    await this.prismaService.offeredService.delete({
      where: {
        id: deleteService.offeredServiceId,
      },
    });
    return { status: 'success' };
  }
}
