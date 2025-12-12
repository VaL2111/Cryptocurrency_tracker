import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDTO } from "../modules/user/dto/create-user.dto";
import { UpdateUserDTO } from "../modules/user/dto/update-user.dto";
import { UserCoreService } from "./user-core.service";
import {
  UserEntity,
  UserRepository,
} from "./interfaces/user-repository.interface";
import { PasswordHasher } from "./interfaces/password-hasher.interface";

describe("UserCoreService", () => {
  let service: UserCoreService;

  const mockUserRepository = {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockEncryptionService = {
    hash: jest.fn().mockResolvedValue("hashed_password"),
    compare: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserCoreService,
          useFactory: (
            userRepository: UserRepository,
            encryptionService: PasswordHasher,
          ) => {
            return new UserCoreService(userRepository, encryptionService);
          },
          inject: ["USER_REPOSITORY", "ENCRYPTION_SERVICE"],
        },
        {
          provide: "USER_REPOSITORY",
          useValue: mockUserRepository,
        },
        {
          provide: "ENCRYPTION_SERVICE",
          useValue: mockEncryptionService,
        },
      ],
    }).compile();

    service = module.get<UserCoreService>(UserCoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const dto: CreateUserDTO = {
        firstName: "John",
        username: "john_doe",
        email: "test@test.com",
        password: "password123",
      };

      const expectedResult: UserEntity = {
        ...dto,
        id: 1,
        password: "hashed_password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.create.mockResolvedValue(expectedResult);

      const result = await service.createUser(dto as UserEntity);

      expect(mockEncryptionService.hash).toHaveBeenCalledWith(dto.password);
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: "hashed_password",
        }),
      );
      expect(result.email).toEqual(dto.email);
      expect(result.password).toBeUndefined();
    });
  });

  describe("updateUser", () => {
    it("should update user and return entity", async () => {
      const dto: UpdateUserDTO = { firstName: "Updated Name" };
      const userId = 1;

      const updatedUser: UserEntity = {
        id: userId,
        firstName: "Updated Name",
        username: "old_username",
        email: "test@test.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(userId, dto);

      expect(mockUserRepository.update).toHaveBeenCalledWith(userId, dto);

      expect(result).toBeDefined();
      expect(result?.firstName).toEqual(dto.firstName);
    });

    it("should return null if user not found", async () => {
      const dto: UpdateUserDTO = { firstName: "Updated Name" };

      mockUserRepository.update.mockResolvedValue(null);

      const result = await service.updateUser(999, dto);

      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should return true if user was deleted", async () => {
      mockUserRepository.delete.mockResolvedValue(true);

      const result = await service.deleteUser(1);
      expect(result).toBe(true);
    });

    it("should return false if user was not found", async () => {
      mockUserRepository.delete.mockResolvedValue(false);

      const result = await service.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe("findUserByEmail", () => {
    it("should return a user", async () => {
      const user = { email: "test@test.com", id: 1 };
      mockUserRepository.findByEmail.mockResolvedValue(user);

      const result = await service.findUserByEmail("test@test.com");
      expect(result).toEqual(user);
    });
  });
});
