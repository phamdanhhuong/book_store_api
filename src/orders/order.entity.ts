import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order_items.entity";
import { OrderStatus } from "src/enums/order-status.enum";
import { PaymentMethod } from "src/enums/payment-method.enum";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('float')
  total_price: number;

  @Column({ 
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING, })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Column({ type: 'varchar', length: 255 })
  shipping_address: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;
}
