import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Task } from "./task";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private tasksUrl = "api/tasks";

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>("getTasks", [])));
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http
      .get<Task>(url)
      .pipe(catchError(this.handleError<Task>(`getTask id=${id}`)));
  }

  updateTask(task: Task): Observable<any> {
    return this.http
      .put(this.tasksUrl, task, httpOptions)
      .pipe(catchError(this.handleError<any>("updateTask")));
  }

  addTask(task: Task): Observable<Task> {
    console.log(task);

    return this.http
      .post<Task>(this.tasksUrl, task, httpOptions)
      .pipe(catchError(this.handleError<Task>("addTask")));
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === "number" ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .delete<Task>(url, httpOptions)
      .pipe(catchError(this.handleError<Task>("deleteTask")));
  }

  searchTasks(term: string): Observable<Task[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Task[]>(`${this.tasksUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Task[]>("searchTasks", [])));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
