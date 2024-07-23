import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { PaginationProductsDto } from './dto/pagination-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
      },
    });
  }

  async findAll(paginationProductsDto: PaginationProductsDto) {
    const { limit, page } = paginationProductsDto;
    const totalPages = await this.prisma.product.count({
      where: {
        active: true,
      },
    });
    const products = await this.prisma.product.findMany({
      where: {
        active: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data: products,
      totalPages: Math.ceil(totalPages / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
        active: true,
      },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return {
      data: product,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    const { id: __, ...data } = updateProductDto;
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
}
