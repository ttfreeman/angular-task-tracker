import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { Task } from "../task";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"]
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  showAll(): void {
    this.getTasks();
  }
  showCompleted(): void {
    this.taskService
      .getTasks()
      .subscribe(
        tasks => (this.tasks = tasks.filter(task => task.state === "Completed"))
      );
  }
  showInProgress(): void {
    this.taskService
      .getTasks()
      .subscribe(
        tasks =>
          (this.tasks = tasks.filter(task => task.state === "In Progress"))
      );
  }
  showPlanned(): void {
    this.taskService
      .getTasks()
      .subscribe(
        tasks => (this.tasks = tasks.filter(task => task.state === "Planned"))
      );
  }
}
