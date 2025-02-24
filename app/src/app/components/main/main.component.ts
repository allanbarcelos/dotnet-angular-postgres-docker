import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    RouterModule,
    FooterComponent,
    NgbModule
  ]
})
export class MainComponent {

}
