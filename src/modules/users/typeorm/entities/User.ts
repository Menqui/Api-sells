import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')//Decorador que define users a ser mapeado no banco

export class User{
@PrimaryGeneratedColumn('uuid')//Decorador que marca id como chave primaria
 id:string;

@Column()
name:string;

@Column()
email:string;

@Column()
password:string;

@Column()
avatar:string;

@CreateDateColumn()
created_at:Date;

@UpdateDateColumn()
updated_at:Date;
}
export default User;
