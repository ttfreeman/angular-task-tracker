import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { Task } from "../task";
import { EChartOption } from "echarts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  tasks: Task[];
  chartOption: EChartOption;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;

      let xData = [];
      let yData = [];
      tasks.map(task => {
        xData.push(task.name);
        yData.push(task.estimate);
      });

      this.chartOption = {
        xAxis: {
          type: "category",
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yData,
            type: "bar"
          }
        ]
      };
    });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
    this.getTasks();
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
