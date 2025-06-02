import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { FirestoreConfigDbModule } from './core/config/db/firestore-config.db';
import { i18nModuleRegister } from './core/config/i18n/i18n-config.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TaskModule,
    UserModule,
    FirestoreConfigDbModule.forRoot(),
    i18nModuleRegister,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
