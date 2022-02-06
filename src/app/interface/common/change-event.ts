import { MatOptionSelectionChange } from "@angular/material/core";

export interface ChangeEvent{
  who?:string;
  id?: string;
  code?: string;
  obj?: any;
  event?: MatOptionSelectionChange
}
