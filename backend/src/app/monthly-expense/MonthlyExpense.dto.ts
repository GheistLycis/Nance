import BaseDTO from "@interfaces/BaseDTO";
import MonthDTO from "../month/Month.dto";

export default interface MonthlyExpenseDTO extends BaseDTO {
  value: number
  date?: Date
  description?: string
  month: MonthDTO
}