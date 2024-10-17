import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_tokens')//Decorador que define  a ser mapeado no banco

export class UserToken{
@PrimaryGeneratedColumn('uuid')//Decorador que marca id como chave primaria
 id:string;

@Column()
@Generated('uuid')
 token:string;

@Column()
 user_id:string;

@CreateDateColumn()
 created_at:Date;

@UpdateDateColumn()
 updated_at:Date;
}
export default UserToken;
