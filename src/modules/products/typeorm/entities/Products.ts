import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';

@Entity('products')
class Product{
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  name:string;

  @Column({ type: 'varchar', nullable: true }) // Definir explicitamente como 'varchar'
  description: string | null;  // Permitir que seja null

  @Column('decimal')
  price:number;

  @Column('int')
  quantity:number;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}
export default Product;
