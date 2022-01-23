import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Custom } from "src/app/static/custom";
import { DynamicDatabase } from "./DynamicDataBase";
import { AnalysisFlat } from "./DynamicFlatNode";

@Injectable({
  providedIn: 'root'
})
export class DynamicDataSource {
  constructor(
    public treeControl: FlatTreeControl<AnalysisFlat>,
    public database: DynamicDatabase) {}
  get data(): AnalysisFlat[] { return this.dataChange.value; }
  set data(value: AnalysisFlat[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }
  dataChange: BehaviorSubject<AnalysisFlat[]> = new BehaviorSubject<AnalysisFlat[]>([]);
  _activeNode = ''
  // Expande and Close
  connect(collectionViewer: CollectionViewer): Observable<AnalysisFlat[]> {
      this.treeControl.expansionModel.changed!.subscribe(change => {
      if ((change as SelectionChange<AnalysisFlat>).added ||
        (change as SelectionChange<AnalysisFlat>).removed) {
        this.handleTreeControl(change as SelectionChange<AnalysisFlat>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data));
  }
  // Problemetic
  handleTreeControl(change: SelectionChange<AnalysisFlat>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.reverse().forEach((node) => this.toggleNode(node, false));
    }
  }
  // Adding Removing Child from Server
  toggleNode(node: AnalysisFlat, expand: boolean) {
    node.isLoading = true;
    const index = this.data.indexOf(node);
    if(expand){
      if(node.level === 1)
      this._activeNode = node.id
        let data = { ...this.database.dbForm.value };
      data.id = node.id;
      data.level = node.level + 1;
      data.type = node.type
      data = Custom.objToURLQuery(data)
      this.database.getAnalysis(data).subscribe(res => {
        const children: AnalysisFlat[] = res.data.records
        // if (!children || index < 0) {
        //   return node.isLoading = false;
        // }
        this.data.splice(index + 1, 0, ...children);
          this.dataChange.next(this.data);
          node.isLoading = false;
          node.freez = -1;
      })
    } else {
      let imidiateChildren = 0;
      let continu = false;
      this.data.forEach(subNode => {
        if(subNode.level > node.level && continu){
          imidiateChildren++
        }
        else if(subNode.id == node.id) {
          continu = true
        } else if(subNode.level == node.level){
          continu = false
        }
      })
      this.data.splice(index + 1, imidiateChildren);
      this.dataChange.next(this.data);
      node.isLoading = false;
      if(node.level === 1){
        this._activeNode = '';
        node.freez = node.checked;
      }
    }
  }

}

