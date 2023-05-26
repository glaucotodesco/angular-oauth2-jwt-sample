import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  message = '';

  constructor(private resourcesService: ResourcesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.resourcesService.admin().subscribe(
      {
        next: data =>  this.message = data.message,
        error: error => console.log(error)
      },
    );
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }
}
