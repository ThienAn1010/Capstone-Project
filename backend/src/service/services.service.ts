import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) {}
  private checkSortField(field: string) {
    if (field.charAt(0) === '+' || field.charAt(0) === '-') {
      const orderBy = field.charAt(0) === '+' ? 'asc' : 'desc';
      const actualFied = field.slice(1);
      return { [actualFied]: orderBy };
    } else {
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
    console.log(filterBy);
    return filterBy;
  }
  async getAllServices(query) {
    // Filter
    // Allowed filter fields = service=id, paperMaker
    const filterBy = this.filter(query);
    // Sort
    const orderBy = this.sort(query.sort);
    // Pagination
    const { skip, take } = this.pagination(query);

    try {
      const services = await this.prismaService.offeredService.findMany({
        include: {
          paperMaker: {
            include: {
              user: {
                select: {
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
      return { status: 'success', length: services.length, data: services };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
