import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector } from '@angular/core';
import { Custom } from '../static/custom';
import { DynamicDatabase } from '../class/allow-permission/DynamicDataBase';
import { DynamicDataSource } from '../class/allow-permission/DynamicDataSource';
import { AnalysisFlat } from '../class/allow-permission/DynamicFlatNode';
import { BaseForm } from './base.form';

@Component({
  selector: 'di-tree-view',
  template: '',
  providers: [DynamicDatabase],
})
export class TreeView extends BaseForm {
  constructor(public injector: Injector) {
    super(injector);
    this.database = injector.get(DynamicDatabase);
    this.treeControl = new FlatTreeControl<AnalysisFlat>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource =
      new DynamicDataSource(this.treeControl, this.database);
  }
  ngOnInit() {
    this._fs._form.valueChanges.subscribe((selectedValue) => {
      this.dataSource.data = [];
    });
    this.database.dbForm = this._fs._form;
  }
  database: DynamicDatabase;
  treeControl: FlatTreeControl<AnalysisFlat>;
  dataSource: DynamicDataSource;
  loadingTree = false;
  _process() {
    this.loadingTree = true;
    this.dataSource._activeNode = '';
    let data = { ...this._fs._form.value };
    data.level = '1';
    data = Custom.objToURLQuery(data);
    this.database.getAnalysis(data).subscribe((res) => {
      this.dataSource.data = res.data.records;
    }, (err) => {this.loadingTree = false}
    ,() => this.loadingTree = false);
  }
  saveNodeTree(node: AnalysisFlat) {
    let data = { ...this._fs._form.value };
    data.id = node.id;
    data.level = node.level;
    data.checked = node.checked;
    node.isLoading = true
    this.database.saveAnalysis(data)
      .subscribe(
        res => {},
        (httpErrorResponse: HttpErrorResponse) => {
          this._vs._error_server(httpErrorResponse.error);
        },
        () => {
          node.isLoading = false;
        }

    );
  }
  _disabledNode(node: AnalysisFlat) {
    return (
      node.id !== this.dataSource?._activeNode &&
      this.dataSource?._activeNode != '' &&
      node.level === 1
    );
  }
  getLevel = (node: AnalysisFlat) => {
    return node.level;
  };
  isExpandable = (node: AnalysisFlat) => {
    return node.expandable;
  };
  hasChild = (_: number, _nodeData: AnalysisFlat) => {
    return _nodeData.expandable;
  };
  /* Allowed multiple Selection */
  checklistSelection = new SelectionModel<AnalysisFlat>(true);
  /** Whether all the descendants of the node are selected. */
  parentAll(node: AnalysisFlat) {
    if (node.allowed >= node.total && node.total != 0) {
      return true;
    } else return false;
  }
  /** Whether part of the descendants are selected */
  parentPartially(node) {
    if (
      node.allowed != 0 &&
      node.allowed != node.total &&
      node.allowed < node.total
    ) {
      return true;
    } else {
      return false;
      //this.descendantsparentPartially(node);
    }
  }
  checkSelection(node: AnalysisFlat) {
    if (node.checked === 1) {
      return true;
    } else false;
  }
  // Only For Parent Toggle Selection
  itemToggle(node: AnalysisFlat): void {
    if (node.allowed >=  node.total) {
      node.checked = 0;
      node.allowed = 0
    } else {
      node.checked = 1;
      node.allowed = node.total
    }
    if (this.treeControl.isExpanded(node)) {
      const descendants = this.treeControl.getDescendants(node);
      descendants.forEach((child) => {
        if (node.checked == 1) {
          child.allowed = child.total;
          child.checked = 1;
        } else {
          child.allowed = 0;
          child.checked = 0;
        }
      });
    }
    this.saveNodeTree(node);
    this.checkAllParentsSelection(node);
  }
  // For Child Toggle Selection
  leafSelected(node: AnalysisFlat): void {
    if (node.checked == 1) {
      node.checked = 0;
      node.allowed = 0
    } else {
      node.checked = 1;
      node.allowed = node.total
    }
    this.saveNodeTree(node);
    this.checkAllParentsSelection(node);
  }
  checkAllParentsSelection(node: AnalysisFlat): void {
    let parent: AnalysisFlat | null = this.getParentNode(node);
    let checkMore = true;
    let childTotal = node.total;
    let increment = 0
    let childParentDecrement = false;
    while (parent) {
      this.checkRootNodeSelection(parent);
      if(node.checked == 1){
        if (checkMore &&
          ((parent.allowed + childTotal) + 1) >= parent.total) {
          parent.allowed = parent.total;
          parent.checked = 1
          increment += 1
          childTotal = parent.total;
          checkMore = true;
        }
        else {
          parent.allowed += node.total + increment;
          parent.checked = 2
          checkMore = false;
        };
      } else {
        // If anything goes wrong work here
        if(parent.allowed == parent.total){
          childParentDecrement = true;
          childTotal += 1
          parent.allowed -= childTotal;
          parent.checked = 2;
        } else if((parent.allowed - childTotal) == 0){
          parent.allowed = 0;
          parent.checked = 0
        } else if(childParentDecrement){
          parent.allowed -= childTotal;
          parent.checked = 2;
        } else{
          parent.allowed -= node.total;
        }
      }
      parent = this.getParentNode(parent);
    }
  }
  checkRootNodeSelection(node: AnalysisFlat): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descparentAll =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descparentAll) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descparentAll) {
      this.checklistSelection.select(node);
    }
  }
  getParentNode(node: AnalysisFlat): AnalysisFlat | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
