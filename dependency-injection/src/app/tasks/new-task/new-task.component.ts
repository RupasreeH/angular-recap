import { Component, ElementRef, viewChild,Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import {TasksServiceToken} from '../../../main'
@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(@Inject(TasksServiceToken) private taskService: TasksService){}

  onAddTask(title: string, description: string) {
    this.taskService.addTask({title,description});
    this.formEl()?.nativeElement.reset();
  }
}
