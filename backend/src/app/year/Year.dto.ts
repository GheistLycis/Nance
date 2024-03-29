import BaseDTO from "@interfaces/BaseDTO";
import UserDTO from "../user/User.dto";

export default interface YearDTO extends BaseDTO {
  year: number
  user: UserDTO
}