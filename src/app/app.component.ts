import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeItem = 1;

  onMenuItemClick(value: number) {
    this.activeItem = value;
  }
}
