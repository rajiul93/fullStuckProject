import { User, IUser, UserRole } from './user.model';
import { connectDB } from '@/lib/db';

export class UserService {
  static async getAll(role?: UserRole) {
    await connectDB();

    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password');
    return users;
  }

  static async getById(id: string) {
    await connectDB();

    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async getByEmail(email: string) {
    await connectDB();

    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async create(data: Partial<IUser>) {
    await connectDB();

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = await User.create(data);
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }

  static async update(id: string, data: Partial<IUser>) {
    await connectDB();

    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateRole(id: string, role: UserRole) {
    await connectDB();

    const user = await User.findByIdAndUpdate(
      id,
      { $set: { role } },
      { new: true, runValidators: true },
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async delete(id: string) {
    await connectDB();

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  static async toggleActive(id: string) {
    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.isActive = !user.isActive;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
}
