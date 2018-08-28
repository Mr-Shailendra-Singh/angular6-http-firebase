import { ServerService } from './server.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MY First Change';
  newName = '';
  appName = this.serverService.getAppName();

  namesList = [
    {
      name: "Shailendra",
      place: "Lucnkow",
      id: this.generateId()
    },
    {
      name: "Kumar",
      place: "Lucknow",
      id: this.generateId()
    },
    {
      name: "Singh",
      place: "Uttar Pradesh",
      id: this.generateId()
    }
  ];

  constructor(private serverService: ServerService) {}
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  // Add new Name in the list

  addName() {
    this.namesList.push({
      name: this.newName,
      place: "Uttar Pradesh",
      id: this.generateId()
    });
  }

  // Post Data to Server
  onSave() {
    this.serverService.storeName(this.namesList)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log("error" + error)
      );
  }

  // Get Name from Server
  onGetName() {
    this.serverService.getNames()
      .subscribe(
        (data: any[]) => {
          // const data = response.json();
          this.namesList = data;
          console.log(data);
        },
        (error) => console.log(error)
      );
  }
}
