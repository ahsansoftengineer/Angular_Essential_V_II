import { SelectOption } from "../common/select";

export interface Receive {
  id?: any;
  receive_date?: any;
  vendor_id?: string;
  vendor?: SelectOption
  box_qty?: number;
  box_price?: number;
  ref_no?: string;
  box_img?: string;
  activate?: number;
}

