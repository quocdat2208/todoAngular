import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/app/models/task.class';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public tasks: Task[]=[]
  public subscription : Subscription
  public subscriptionParams : Subscription
  constructor(
    private _TaskService: TaskService,
    private _ActivatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this._TaskService.getAll().subscribe((task: Task[]) => {
      // this.tasks = task;
      this.subscriptionParams = this._ActivatedRoute.params.subscribe((data: Params) => {
        let status = data['status'] ? (data['status'] == 'false' ? -1 : 1 ) : 0;
        this.tasks = task.filter(data => {
          if(status == 1){
            return data.status == true 
          }
          else if(status == -1){
            return data.status == false
          }
          else {
            return data
          }
        })

      })
    })
  }

  onTitleConnected(taskTitle: string): void {
    let task = new Task(taskTitle);
    this.subscription = this._TaskService.add(task).subscribe((data) => {
      this.tasks.push(data);
    })
  }

  setStatus(taskStatus : Task){
    taskStatus.status = !taskStatus.status
    this.subscription = this._TaskService.update(taskStatus).subscribe((data:Task) => {
      this.updateStatus(data);
    })
  }

  updateStatus(data : Task){
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id === data.id) {
        this.tasks[i].status = data.status;
        break;
      }
    }
  }

  onDeleteIdTasks(id: number) {
    console.log(typeof id);
    this.subscription = this._TaskService.delete(id).subscribe((data: Task) => {
      this.updateAfterDelete(id);
      // let i = this.tasks.indexOf(data);
      // this.tasks.splice(i, 1);
    });
  }

  updateAfterDelete(id: number){
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id == id) {
        this.tasks.splice(i,1);
         break;
      }
    }
  }

  onEditing(titleEditing: Task){
    this.subscription = this._TaskService.update(titleEditing).subscribe((data: Task) => {
      this.updateEditing(data)
    })
  }

  updateEditing(data : Task): void {
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id == data.id) {
        this.tasks[i] = data;
        break;
      }
    }
  }

}
