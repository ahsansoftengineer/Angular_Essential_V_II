import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { DIFiles } from 'src/app/interface/common/my-files';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'my-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent
extends BaseControlComponent
implements OnInit
{
  @Input() fileObj : DIFiles;
  @Input() imgURL;
  @Output() fileUploaded = new EventEmitter<{
    object: DIFiles,
    outerEvent,
    innerEvent
  }>();
  @Input('submitted') _submitted;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
  readUrl(event: any) {
    if (event.target.files.length === 0) {
      this.fileObj.link = '';
      this.fileObj.error = 'req'
      this.fileObj.lbl;
      this.fileObj.uploadedFileName = undefined
      return;
    }
    const file: File = event.target.files[0];
    const name = file.name;
    this.fileObj.error = '';
    const ext = name.substring(name.lastIndexOf('.') + 1, file.name.length);
    if (this.fileObj.fileExtens.indexOf(ext.toLowerCase()) < 1) {
      this.fileObj.error = 'type';
      this.fileObj.link = '';
      this.fileObj.uploadedFileName = undefined
    }
    if (file.size > this.fileObj.size) {
      this.fileObj.error = 'size';
      this.fileObj.link = '';
      this.fileObj.uploadedFileName = undefined
    }
    if (this.fileObj.error == '') {
      this.fileObj.size = file.size;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      this.fileUploaded.emit(event)
      reader.onload = (_event) => {
        this.fileObj.link = this.fileObj.defaultImage;
        this.fileObj.file = event.srcElement.files[0];
        this.fileObj.uploadedFileName = event.srcElement.files[0].name;

      };
    }
  }
  ImageLink(){
    if(this.fileObj.link == this.fileObj.defaultImage){
      return  'assets/images/' + this.fileObj.defaultImage;
    }
    else return 'assets/images/select.png'
  }
  markTouched(){
    this._submitted = true;
    // this.fileObj.link = '';
  }
  _error_file(file: DIFiles) {
    if (file.error === 'type')
      return file.fileExtensMsg;
    else if (file.error === 'size')
      return  `${file.lbl} size is greater than ${file.sizeMsg}`;
    else if (file.error === 'req')
      return 'Please select ' + file.lbl;
    else if (file.error !== '' && this._submitted)
      return file.error
    else if ((!file.link || file.link == '') && this._submitted)
        return 'Please select ' + file.lbl;
    else return '';
  }
}
