import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import * as Joi from "@hapi/joi";
import { RequestLoggerMiddleware } from './middlewares/request-logger/request-logger.middleware';
import { YearModule } from './app/year/year.module';
import { MonthModule } from './app/month/month.module';
import { MonthlyEntryModule } from './app/monthly-entry/monthly-entry.module';
import { GroupModule } from './app/group/group.module';
import { CategoryModule } from './app/category/category.module';
import { ExpenseModule } from './app/expense/expense.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './app/analytics/analytics.module';
import { APP_GUARD } from '@nestjs/core';
import { IpGuard } from './guards/ip/ip.guard';
import { IpModule } from './app/ip/ip.module';
import { AuthModule } from './app/auth/auth.module';
import { TokenGuard } from './guards/token/token.guard';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVER_PORT: Joi.number().default(8000),
        JWT: Joi.string().required(),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
    }),
    AuthModule,
    YearModule, 
    MonthModule, 
    MonthlyEntryModule, 
    GroupModule, 
    CategoryModule, 
    ExpenseModule, 
    AnalyticsModule,
    IpModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    // GUARDS
    {
      provide: APP_GUARD,
      useClass: IpGuard,
    },
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*')
  }
}
