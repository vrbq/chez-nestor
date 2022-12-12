import { ClientService } from './client.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '../entity/client.entity';
import { Response } from 'express';

@ApiTags('client')
@Controller('user')
export class ClientController {
  @Inject(ClientService)
  private readonly clientService: ClientService;

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Get a client',
    type: [Client],
  })
  async getClient(
    @Query('id') id: number,
    @Res() response: Response<any>,
  ): Promise<Client[]> {
    try {
      //   response.send(this.clientService.getClient(id));
      return this.clientService.getClient(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  async createClient(
    @Body() body: any,
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(this.clientService.createClient(body));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
