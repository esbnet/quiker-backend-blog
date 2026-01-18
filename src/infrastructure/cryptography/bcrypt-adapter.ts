import bcryptjs from "bcryptjs";

export class BcryptAdapter {
  async hash(value: string, salt = 6): Promise<string> {
    return bcryptjs.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(value, hash);
  }
}
