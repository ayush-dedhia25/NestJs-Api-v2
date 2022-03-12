import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   CreateDateColumn,
   UpdateDateColumn,
   JoinColumn
} from 'typeorm';
import { Expose } from 'class-transformer';
import { ArticleEntity as Article } from '../articles/models/article.entity';

@Entity('comments_table')
export class CommentEntity {
   @PrimaryGeneratedColumn()
   @Expose()
   id: number;
   
   @Column({ type: 'text', nullable: false })
   @Expose()
   comment: string;
   
   @CreateDateColumn()
   createdAt: Date;
   
   @UpdateDateColumn()
   updatedAt: Date;
   
   @ManyToOne((type) => Article, (article) => article.comments)
   @JoinColumn()
   article: Article;
}
