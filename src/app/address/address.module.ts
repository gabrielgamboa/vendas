import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserModule } from '../user/users.module';
import { CityModule } from '../city/city.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
    UserModule,
    CityModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
