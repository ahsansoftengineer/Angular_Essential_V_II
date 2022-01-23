/** Flat node with expandable and level information */
// This is Not in Use
export class Analysis {
  constructor(
    public id: number,
    public title: string = '',
    public children: Analysis[] = []
  ) {}
}
// Own Property
export interface AnalysisFlat extends AnalysisServer {
   expandable: boolean, // total > 1
   isLoading?: boolean, // For Progress Bar
   isExpanded?: boolean, //
   disabled?: boolean, //
   defaultTabIndex?: number, //
   data?: any //
   freez: number;
}
// Server Property
export interface AnalysisServer extends AnalysisUserServer {
  id: string;
  title: string;
  type?: string; // Dropdown
  level: number;
  allowed?: number; // Not in Use
  total: number;
}
// Server Extra Property
export interface AnalysisUserServer {
  checked?: number;
  user?: any;
}
