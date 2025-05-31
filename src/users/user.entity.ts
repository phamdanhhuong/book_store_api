import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column({default:"https://bopuiwpbccpifydfplgj.supabase.co/storage/v1/object/public/avatars//avatar3.png"})
    avatar_url: string;
}
