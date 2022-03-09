import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   OneToMany,
   CreateDateColumn,
   UpdateDateColumn,
   BeforeInsert,
} from 'typeorm';
import { Expose } from 'class-transformer';
import * as argon2 from 'argon2';
import { ArticleEntity as Article } from '../../articles/models/article.entity';

@Entity('users_table')
export class UserEntity {
   @PrimaryGeneratedColumn()
   @Expose()
   id: number;

   @Column()
   @Expose()
   name: string;

   @Column({ unique: true })
   @Expose()
   email: string;

   @Column()
   password: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @BeforeInsert()
   public async hashPassword() {
      this.password = await argon2.hash(this.password);
   }

   @OneToMany((type) => Article, (article) => article.author, {
      eager: true,
      cascade: true,
   })
   @Expose()
   articles: Article[];
}
