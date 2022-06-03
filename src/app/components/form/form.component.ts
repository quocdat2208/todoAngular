import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/app/models/task.class';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output('titleTask') titleConnected = new EventEmitter()
  // public subscription: Subscription
  // public task: Task
  public titleTask : string
  constructor(

  ) { }

  ngOnInit(): void {

  }
  onAdd() {
    this.titleConnected.emit(this.titleTask)
    this.titleTask = ''

  }
}
