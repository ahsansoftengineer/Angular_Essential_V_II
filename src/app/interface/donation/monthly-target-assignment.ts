import { HierarchyOnly } from "../common/hierarchy";

export interface MonthlyTargetFilters extends HierarchyOnly {
  target_from?: string;
  target_for?: string;
  increase_percentage?: string;
}
