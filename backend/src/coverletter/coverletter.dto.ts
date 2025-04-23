import { Types } from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";
import { IUser } from "../user/user.dto";

export interface ICoverLetter extends BaseSchema {
    userId: IUser | Types.ObjectId;
    title: string;
    content: string;
      template?: string;
}
