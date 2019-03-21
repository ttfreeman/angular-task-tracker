import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Task } from './task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private tasksUrl = 'api/tasks';

  getTasks(): Observable<Task[]> {
    this.messageService.add('TaskService: fetched tasks');
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(_ => this.log('fetched tasks')),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTask(id: number): Observable<Task> {
    this.messageService.add(`TaskService: fetched task id=${id}`);
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => this.log(`fetched task id=${id}`)),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, httpOptions)
      .pipe(
        tap(_ => this.log(`updated task id=${task.id}`)),
        catchError(this.handleError<any>('updateTask'))
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, httpOptions)
      .pipe(
        tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted task id=${id}`)),
        catchError(this.handleError<Task>('deleteTask'))
      );
  }

  /* GET tasks whose name contains search term */
  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found tasks matching "${term}"`)),
        catchError(this.handleError<Task[]>('searchTasks', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }
}
