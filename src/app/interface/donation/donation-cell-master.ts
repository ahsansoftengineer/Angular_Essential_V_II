import { SelectOption } from "src/app/interface/common/select";

export interface CellMaster {
  bg: string; // business group
  le: string; // legal entity
  ou: string; // operating unit
  su:string // sub Unit
  title:string;
  address: string
  location_id: string; // Analysis Location
  majlis_id: string; // Analysis Majlis
  location: SelectOption; // Analysis Location
  majlis: SelectOption; // Analysis Majlis
  business_group:SelectOption
  legal_entity:SelectOption
  operating_unit:SelectOption
  sub_unit:SelectOption
  activate?: string;
}
