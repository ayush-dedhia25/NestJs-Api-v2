import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   OneToMany,
   CreateDateColumn,
   UpdateDateColumn,
   JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { UserEntity } from '../../users/models/user.entity';
import { CommentEntity as Comment } from '../../comments/comment.entity';

@Entity('articles_table')
export class ArticleEntity {
   @PrimaryGeneratedColumn()
   @Expose()
   id: number;

   @Column({ type: 'varchar', unique: true, nullable: false })
   @Expose()
   title: string;

   @Column({ type: 'varchar', nullable: true })
   @Expose()
   content: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @ManyToOne((type) => UserEntity, (user) => user.articles)
   @JoinColumn()
   author: UserEntity;
   
   @OneToMany((type) => Comment, (comment) => comment.article, {
      eager: true,
      cascade: true,
   })
   @Expose()
   comments: Comment[];
}
