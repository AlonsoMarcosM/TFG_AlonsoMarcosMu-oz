import { Component } from '@angular/core';
import { ProgramFormComponent } from '../program-form.component';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProgramFormComponent, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'APPWEB';
}
