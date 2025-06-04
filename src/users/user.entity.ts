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

    @Column({type: 'varchar', nullable: true })
    otp: string|null;

    @Column({ type: 'timestamp', nullable: true })
    otp_expiry: Date|null;

    @Column({ default: false })
    is_verified: boolean;
}
