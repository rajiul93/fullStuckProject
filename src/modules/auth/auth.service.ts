import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { connectDB } from '@/lib/db';
import { JWTService, TokenPayload } from '@/lib/jwt';
import { AppError } from '../utils/app-error';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  status?: 'active' | 'inactive';
}

export class AuthService {
  static async login(data: LoginData) {
    await connectDB();

    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (user.status) {
      throw new AppError('Account is deactivated', 403);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = JWTService.generateAccessToken(payload);

    const userObj = user.toObject();
    delete userObj.password;

    return {
      role: user.role,
      accessToken,
    };
  }

  static async register(data: RegisterData) {
    await connectDB();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'user',
      status: 'active',
    });
    const accessToken = JWTService.generateAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      role: user.role,
      accessToken,
    };
  }
}
