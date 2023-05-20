import { Component } from '@angular/core';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  message = '';

  constructor(
    private resourcesService: ResourcesService
  ) { }

  ngOnInit(): void {
    this.resourcesService.admin().subscribe(
      {
        next: data =>  this.message = data.message,
        error: error => console.log(error)
      },
      
      
    );
  }
}
