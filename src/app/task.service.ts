import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private tasksUrl = 'api/tasks';

  getTasks(): Observable<Task[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Task[]>(this.tasksUrl)
  }

  getTask(id: number): Observable<Task> {
    this.messageService.add(`TaskService: fetched task id=${id}`);
    return of(TASKS.find(task => task.id === id));
  }
}
