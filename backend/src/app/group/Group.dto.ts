import BaseDTO from "src/interfaces/BaseDTO";
import CategoryDTO from "../category/Category.dto";

export default interface GroupDTO extends BaseDTO {
  name: string
  color: string
  category: CategoryDTO
}