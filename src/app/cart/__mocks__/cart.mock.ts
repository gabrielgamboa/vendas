import { userMock } from "../../../app/user/__mocks__/user.mock";
import { Cart } from "../entities/cart.entity";

export const cartMock: Cart = {
    id: 1,
    active: true,
    userId: userMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
}