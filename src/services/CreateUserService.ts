import { userRepository } from "../repositories/userRepository";
import { hash } from "bcryptjs";

interface UserRequest {
  email: string;
  name: string;
  password: string;
  role: number;
}

export class CreateUserService {
  async execute({ email, name, password }: UserRequest) {
    const userExists = await userRepository.findOneBy({
      email,
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      email,
      name,
      password: passwordHash,
    });

    await userRepository.save(user);

    return { id: user.id, email: user.name, name: user.email };
  }
}
