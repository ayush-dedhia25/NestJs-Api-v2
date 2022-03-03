import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   CreateDateColumn,
   UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../../users/models/user.entity';

@Entity('articles_table')
export class ArticleEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'varchar',
      unique: true,
      nullable: false,
   })
   title: string;

   @Column({
      type: 'varchar',
      nullable: true,
   })
   content: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne(type => UserEntity, user => user.articles)
   author: UserEntity;
}