// src/genders/gender.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from './client.entity';


@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn() // ahora es autoincremental (INT)
  id: number;

  @Column({ length: 20, unique: true })
  name: string; // 'male', 'female', 'genderless', 'unknown'

  @OneToMany(() =>Client, client => client.gender)
  users: Client[];
}
