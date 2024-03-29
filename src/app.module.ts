import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SprintModule } from './sprints/sprints.module';

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
          synchronize: true,
          bigNumberStrings: false,
        };
      },
      imports: undefined,
    }),
    TasksModule,
    SprintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
