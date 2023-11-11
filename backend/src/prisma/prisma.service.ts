import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';


export class PrismaService {
  public client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
}
