import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'scrumple',
          autoLoadEntities: true,
          // DO NOT TURN ON SYNCHRONIZE
          synchronize: false,
          bigNumberStrings: false,
        };
      },
      imports: undefined,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
