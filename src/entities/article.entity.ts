import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('articles_table')
export class ArticleEntity {
   @PrimaryGeneratedColumn()
   id: number;
   
   @Column({ type: 'varchar', nullable: false })
   title: string;
   
   @Column({ type: 'varchar', nullable: true })
   content: string;
   
   @ManyToOne(type => UserEntity, user => user.articles)
   author: UserEntity;
   
   @CreateDateColumn()
   createdAt: Date;
   
   @UpdateDateColumn()
   updatedAt: Date;
}