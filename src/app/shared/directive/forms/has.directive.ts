import { Directive, Injector, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpServiceParam } from 'src/app/interface/common/http-service-param';
import { BaseControlComponent } from '../../components/control/base-control.component';

// This directive only works for forms
@Directive({
  selector: '[has]'
})
export class HasDirective  {
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
    ) {
      console.log(this.templateRef);
      console.log(this.viewContainer);
      console.log(this.templateRef.elementRef);

      if(this.templateRef && this.templateRef['_declarationTContainer'] &&
      this.templateRef['_declarationTContainer']['attrs'][0]){
        let array: string[] = this.templateRef['_declarationTContainer']['attrs'];
        let found = false;
        array.forEach((x, i) => {
          if(x == 'field'){
              console.log(x, i);
              found = true;
          }else if(found){
            console.log(x);
            found=false
            return

          }
        })
      }
    }
}

// _declarationTContainer
