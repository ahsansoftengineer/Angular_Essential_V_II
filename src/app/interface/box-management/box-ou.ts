import { SelectOption } from '../common/select';

export interface BoxStockOU {
  id: string;
  box_stock_id: string;
  bg: string;
  le: string;
  ou: string;
  date: string;
  issued: string;
  parent_id: string;
  box_stock: {
    id: string;
    reference_no: string;
    organisation_id: string;
    system_id: string;
  };
  box_stock_issued: {
    parent_id: string;
    collectorIssued: string;
  };
  business_group: SelectOption;
  legal_entity: SelectOption;
  operating_unit: SelectOption;
}
