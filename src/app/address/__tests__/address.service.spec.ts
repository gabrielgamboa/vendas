import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../address.service';
import { Address } from '../entities/address.entity';
import { createAddressMock } from '../__mocks__/create-address.mock';
import { addressMock } from '../__mocks__/address.mock';
import { userMock } from '../../user/__mocks__/user.mock';
import { UserService } from '../../user/users.service';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__mocks__/city.mock';
import { NotFoundException } from '@nestjs/common';

describe('AddressService', () => {
  let service: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let addressRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue([addressMock]),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should be able to create a new address and return it', async () => {
    const address = await service.createAddress(createAddressMock, userMock.id);
    expect(address).toEqual(addressMock);
  });

  it('should return error in create address when user is not found', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userMock.id),
    ).rejects.toThrowError();
  });

  it('should return error in create address when city is not found', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());
    expect(
      service.createAddress(createAddressMock, userMock.id),
    ).rejects.toThrowError();
  });

  it('should be able to list all addresses to user', async () => {
    const addresses = await service.findAddressByUserId(userMock.id);
    expect(addresses).toEqual([addressMock]);
    expect(addresses.length).toBeGreaterThan(0);
  });

  it('should return error if user has no address registred', async () => {
    jest.spyOn(addressRepository, 'find').mockResolvedValue(undefined);
    expect(service.findAddressByUserId(userMock.id)).rejects.toThrowError();
    expect(service.findAddressByUserId(userMock.id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
