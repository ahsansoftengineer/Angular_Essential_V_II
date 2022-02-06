import { SelectOption } from "../common/select";

export interface AllowPurpose{
  donation_category: string;
  donation_type_id : string;
  fund_category_id : string;
  donationType: SelectOption;
  fund_category: SelectOption;
}


