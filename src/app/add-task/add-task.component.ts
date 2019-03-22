import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { TaskService } from "../task.service";
import { Task } from "../task";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"]
})
export class AddTaskComponent implements OnInit {
  tasks: Task[];
  public stateRadio: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getTasks();
    this.stateRadio = "";
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }

  add(
    name: string,
    description: string,
    estimate: number,
    state: string
  ): void {
    name = name.trim();
    description = description.trim();
    estimate = +estimate;

    if (!name) {
      return;
    }
    this.taskService
      .addTask({ name, description, estimate, state } as Task)
      .subscribe(task => {
        this.tasks.push(task);
      });
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }
}
