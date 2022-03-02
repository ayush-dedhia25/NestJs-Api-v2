import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   OneToMany,
   CreateDateColumn,
   UpdateDateColumn,
   BeforeInsert
} from 'typeorm';
import * as argon2 from 'argon2';
import { ArticleEntity } from './article.entity';

@Entity('users_table')
export class UserEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @OneToMany(type => ArticleEntity, article => article.author)
   articles: ArticleEntity[];

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
   
   @BeforeInsert()
   public async hashPassword() {
      this.password = await argon2.hash(this.password);
   }
}