import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.class';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
public API : string = 'http://localhost:3000/courses'
  constructor(
    private http: HttpClient,
  ) { }
  getAll() : Observable<Task[]>{
    return this.http.get<Task[]>(this.API)
  }
  add(task : Task) : Observable<Task>{
    return this.http.post<Task>(this.API, task)
  }
  update(task: Task) : Observable<Task>{
    return this.http.put<Task>(`${this.API}/${task.id}`,{
      title: task.title,
      status: task.status
    })
  }
  delete(task : number) : Observable<Task> {
    return this.http.delete<Task>(`${this.API}/${task}`)
  }
}
