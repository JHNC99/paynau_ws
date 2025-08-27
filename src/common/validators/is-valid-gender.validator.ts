import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from 'src/clients/entities/gender.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidGenderConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepo: Repository<Gender>,
  ) {}

  async validate(genderId: number): Promise<boolean> {
    console.log(genderId);
    if (!genderId) return false;
    const gender = await this.genderRepo.findBy({ id: genderId });
    console.log(gender);
    return true;
  }
}

// decorador que se usará en el DTO
export function IsValidGender(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidGenderConstraint,
    });
  };
}
