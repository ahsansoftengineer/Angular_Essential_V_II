import { FullGSBDonor } from "src/app/model/donor/full-donor-gsb.form";
import { SelectOption } from "../common/select";

export interface DonorBoxSell extends FullGSBDonor{
  box: BoxSell
}
interface BoxSell{
  id: string,
  box_stock_id: string,
  issued: string,
  box_stock : BoxStockSell
}
interface BoxStockSell {
  id: string,
  reference_no: string,
  organisation_id: string,
  system_id: string,
  system: SelectOption,
  price_per_box: string,
  image: string,
}
