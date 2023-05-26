import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message = '';

  constructor(private resourcesService: ResourcesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.resourcesService.user().subscribe(
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