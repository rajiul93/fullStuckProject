import bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { connectDB } from '@/lib/db';
import { JWTService, TokenPayload } from '@/lib/jwt';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export class AuthService {
  static async login(data: LoginData) {
    await connectDB();

    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = JWTService.generateAccessToken(payload);
    const refreshToken = JWTService.generateRefreshToken(payload);

    const userObj = user.toObject();
    delete userObj.password;

    return {
      user: userObj,
      accessToken,
      refreshToken,
    };
  }

  static async register(data: RegisterData) {
    await connectDB();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'user',
    });

    const userObj = user.toObject();
    delete userObj.password;

    return {
      user: userObj,
      message: 'User registered successfully',
    };
  }
}
