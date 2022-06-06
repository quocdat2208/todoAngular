import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.class';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input('tasks') tasks : Task[];
  @Output('updateStatus') updateStatusConnected = new EventEmitter<Task>()
  @Output('deleteIdList') onDeleteIdConnected = new EventEmitter<number>()
  @Output('titleList') onTitleList = new EventEmitter<Task>()

  public completed : number = 0;
  public subscription : Subscription
  constructor(
    private _ActivatedRoute : ActivatedRoute
  ) { }
    // 0: all -1: false 1 : true
  ngOnInit() {
    this.subscription = this._ActivatedRoute.params.subscribe((data: Params) => {
        this.completed = data['status'] ?(data['status'] == 'true' ? 1 : -1):0;
        // console.log(this.completed);
      })
  }
// onDeleteIdList(id: number){
  //   this.onDeleteIdConnected.emit()
  // }
  onUpdateStatus(updateStatus: Task){
    this.updateStatusConnected.emit(updateStatus)
  }

}
