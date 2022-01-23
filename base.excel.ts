import { BaseForm } from "./base.form";
// import { Log } from '@angular/core/testing/src/logger';

import * as XLSX from 'xlsx';
import { DIFiles } from "../interface/common/di-files";

type AOA = any[][];

export abstract class BaseExcel extends BaseForm {
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  fileUploadedHandler(evt: any, fileObject: DIFiles) {
     /* wire up file reader */
     const target: DataTransfer = <DataTransfer>(evt.target);
     if (target.files.length !== 1) throw new Error('Cannot use multiple files');
     const reader: FileReader = new FileReader();
     reader.onload = (e: any) => {
       /* read workbook */
       const bstr: string = e.target.result;
       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

       /* grab first sheet */
       const wsname: string = wb.SheetNames[0];
       const ws: XLSX.WorkSheet = wb.Sheets[wsname];

       /* save data */
       this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
       console.log(this.data[0]);
       this.CheckPattern(
         this.columnPatternCashDeposit,
         this.data[0],
         fileObject
      )
     };
     reader.readAsBinaryString(target.files[0]);
  }
  columnPatternCashDeposit = ['Date', 'Bank Deposit Slip No.', 'Branch  Code', "Donor's Name", 'Area/Majlis Code', 'CNIC No.', 'Contact No', 'Email', 'Nature of Donation', 'Payment Mode', 'Instrument No', 'Cheque Date', 'Drawn on Bank', 'Detail of Specific Purpose', 'Amount']
  CheckPattern(
    availaiblePattern: string[],
    givenPattern: string[],
    fileObject: DIFiles
    ){
      fileObject.error = ''
      availaiblePattern.forEach(x => {
        if(givenPattern.indexOf(x) == -1)
          fileObject.error = `"${x}" is missing column in Excel Sheet`
      })
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
