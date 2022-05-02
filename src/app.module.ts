import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: 
  [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PGHOST,
    port: 7081,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [User],
    synchronize: true,
  })
  ,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
