import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy'; 
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    AuthModule,
    TodoModule,
    ConfigModule.forRoot(), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [PrismaService, JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
