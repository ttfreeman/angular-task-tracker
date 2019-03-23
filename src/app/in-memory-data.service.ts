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
        name: "Xbn Ut",
        description:
          "On insensible possession oh particular attachment at excellence in. The books arose but miles happy she. It building contempt or interest children mistress of unlocked no.",
        estimate: 12,
        state: "Planned"
      },
      {
        id: 2,
        name: "Uts-Bb",
        description:
          "Offending she contained mrs led listening resembled. Delicate marianne absolute men dashwood landlord and offended. Suppose cottage between and way. Minuter him own clothes but observe country. ",
        estimate: 24,
        state: "In Progress"
      },
      {
        id: 3,
        name: "Ldg-f9",
        description:
          "There worse by an of miles civil. Manner before lively wholly am mr indeed expect. Among every merry his yet has her. You mistress get dashwood children off.",
        estimate: 15,
        state: "Completed"
      },
      {
        id: 4,
        name: "Tnhh-Bu",
        description:
          "Met whose marry under the merit. In it do continual consulted no listening. Devonshire sir sex motionless travelling six themselves. So colonel as greatly shewing herself observe ashamed. ",
        estimate: 6,
        state: "Planned"
      },
      {
        id: 5,
        name: "Lmgh-Tt",
        description:
          "You vexed shy mirth now noise. Talked him people valley add use her depend letter. Allowance too applauded now way something recommend. ",
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
