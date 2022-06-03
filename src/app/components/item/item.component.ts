import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { TaskService } from 'src/services/task.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input('task') task: Task;
  @Output('updateStatus') updateStatusConnected = new EventEmitter<Task>()
  @Output('deleteIdItem') deleteIdConnected = new EventEmitter<any>();
  @Output('titleItem') titleItemConnected = new EventEmitter<any>();
  public subscription : Subscription;
  public edit : boolean = false;
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }
  onCompleted(){
    this.updateStatusConnected.emit(this.task)

  }
  onDeleteIdItem(){
    this.deleteIdConnected.emit()

  }
  onEditing(){
    this.edit = true
  }
  onCancel(){
    this.edit = false;
  }
  onSubmit(){
    this.titleItemConnected.emit()
    console.log(this.task);
    this.edit = false;

  }
}
