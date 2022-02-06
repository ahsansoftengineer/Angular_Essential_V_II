import { SelectOption } from "src/app/interface/common/select";

export interface SubType {
  id: number;
  title: any;
  donation_type: SelectOption;
  category: string;
  description: string;
  isEnabled: boolean;
}
