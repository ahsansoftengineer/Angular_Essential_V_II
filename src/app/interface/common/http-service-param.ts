import { URLz } from "src/app/enums/url.enum";

export interface HttpServiceParam {
  body?: any; // Specific to CREATE, PATCH, DELETE
  resource?: string; // employee/1
  param?: string; // ?id=1&name=Muhammad
  pid?: string; // (Parent ID ) Only Specific to SelectOptions / LOVs
  paramObj?: any;// {id:1, name:Muhammad}
  endpoint?: URLz | string; // *Required masjidNabawi
  url?: string;// http://www.arab.madina/ || environment.API_URL
}
