import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity, ArticleEntity } from './entities';

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: 'sqlite',
         database: 'dev.db',
         entities: [UserEntity, ArticleEntity],
         synchronize: true,
      }),
      AuthModule,
      UsersModule
   ],
})
export class AppModule {}
