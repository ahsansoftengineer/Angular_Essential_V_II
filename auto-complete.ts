import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { URLz } from "../../enums/url.enum";
import { SelectOption } from "./select";

export interface AutoComplete{
  url: URLz
  control: FormControl;
  list?: SelectOption[];
  temp?: Observable<SelectOption[]>;
  tempSub?:any;
  controlSub?: FormControl[];
  page?: number;
  rows?: number;
  param?: string;
}
// Location = api/location
// Majlis = api/majlis
// Purpose = api/purpose
// Branch = api/branch
// Fund Category = api/fund_category
// Cost 5 = api/costFive
// Usher Item
