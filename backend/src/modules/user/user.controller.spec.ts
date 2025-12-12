import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserCoreService } from "../../user-core/user-core.service";

describe("UserController", () => {
  let controller: UserController;

  const mockUserService = {
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserCoreService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("updateUser", () => {
    it("should call service.updateUser with correct params", async () => {
      const dto: UpdateUserDTO = { firstName: "New Name" };
      const requestMock = { user: { id: 1 } };
      const expectedResult = { email: "test@test.com", firstName: "New Name" };

      mockUserService.updateUser.mockResolvedValue(expectedResult);

      const result = await controller.updateUser(dto, requestMock);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        requestMock.user.id,
        dto,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe("deleteUser", () => {
    it("should call service.deleteUser and return result", async () => {
      const requestMock = { user: { id: 1 } };
      mockUserService.deleteUser.mockResolvedValue(true);

      const result = await controller.deleteUser(requestMock);

      expect(mockUserService.deleteUser).toHaveBeenCalledWith(
        requestMock.user.id,
      );
      expect(result).toBe(true);
    });
  });
});
