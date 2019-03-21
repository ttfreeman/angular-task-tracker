import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 11, name: 'task 1' },
      { id: 12, name: 'other task' },
      { id: 13, name: 'task 3' },
      { id: 14, name: 'walk the dog' },
      { id: 15, name: 'awesome stufff' },
      { id: 16, name: 'do something fun' },
    ];
    return { tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }
}
