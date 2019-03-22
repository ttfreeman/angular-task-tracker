import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { AddTaskComponent } from "./add-task/add-task.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "tasks", component: TasksComponent },
  { path: "detail/:id", component: TaskDetailComponent },
  { path: "create", component: AddTaskComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
