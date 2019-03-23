import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { NgxEchartsModule } from "ngx-echarts";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TaskSearchComponent } from "./task-search/task-search.component";
import { AddTaskComponent } from "./add-task/add-task.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxEchartsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDetailComponent,
    DashboardComponent,
    TaskSearchComponent,
    AddTaskComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
