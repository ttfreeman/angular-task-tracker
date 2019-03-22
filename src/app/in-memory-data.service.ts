import { InMemoryDbService } from "angular-in-memory-web-api";
import { Task } from "./task";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        name: "data modeling",
        description: "update the data model",
        estimate: 12,
        state: "Planned"
      },
      {
        id: 2,
        name: "add a page",
        description: "add a new page describing the services",
        estimate: 24,
        state: "In Progress"
      },
      {
        id: 3,
        name: "update charts",
        description: "update the dashboard with new charts",
        estimate: 15,
        state: "Completed"
      },
      {
        id: 4,
        name: "backend",
        description: "debug API fetch frequency",
        estimate: 6,
        state: "Planned"
      },
      {
        id: 5,
        name: "data science",
        description: "predict annual forecast",
        estimate: 8,
        state: "Completed"
      }
    ];
    return { tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }
}
