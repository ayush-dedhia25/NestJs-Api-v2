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
import { ArticleEntity } from '../../articles/models/article.entity';

@Entity('users_table')
export class UserEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column({ unique: true })
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
   
   @OneToMany(type => ArticleEntity, article => article.author)
   articles: ArticleEntity[];
}
