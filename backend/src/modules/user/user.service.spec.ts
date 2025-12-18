import { User } from "./models/user.model";
import { UserService } from "./user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { CreateUserDTO } from "./dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";
import { UpdateUserDTO } from "./dto/update-user.dto";

describe("UserService", () => {
  let service: UserService;

  const mockUserRepository = {
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
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

      const expectedResult = {
        ...dto,
        id: 1,
        password: "hashed_password",
        createdAt: new Date(),
        updatedAt: new Date(),
        mfaSecret: "",
        watchlist: [],
      };

      mockUserRepository.create.mockReturnValue(expectedResult);

      const result = await service.createUser(dto);

      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(result.email).toEqual(dto.email);
    });
  });

  describe("updateUser", () => {
    it("should update user and return response DTO", async () => {
      const dto: UpdateUserDTO = { firstName: "Updated Name" };
      const userId = 1;
      const updatedUser = {
        id: userId,
        firstName: "Updated Name",
        email: "test@test.com",
      };

      mockUserRepository.update.mockReturnValue([1, [updatedUser]]);

      const result = await service.updateUser(userId, dto);

      expect(mockUserRepository.update).toHaveBeenCalledWith(dto, {
        where: { id: userId },
        returning: true,
      });
      expect(result.firstName).toEqual(dto.firstName);
    });

    it("should throw error if user not found", async () => {
      const dto: UpdateUserDTO = { firstName: "Updated Name" };
      mockUserRepository.update.mockReturnValue([0, []]);

      await expect(service.updateUser(999, dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe("deleteUser", () => {
    it("should return true if user was deleted", async () => {
      mockUserRepository.destroy.mockReturnValue(1);

      const result = await service.deleteUser(1);
      expect(result).toBe(true);
    });

    it("should return false if user was not found", async () => {
      mockUserRepository.destroy.mockReturnValue(0);

      const result = await service.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe("findUserByEmail", () => {
    it("should return a user", async () => {
      const user = { email: "test@test.com" };
      mockUserRepository.findOne.mockReturnValue(user);

      const result = await service.findUserByEmail("test@test.com");
      expect(result).toEqual(user);
    });
  });
});
