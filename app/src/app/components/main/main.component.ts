import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import {
  NgbAccordionModule,
  NgbModule,
  NgbScrollSpy,
  NgbScrollSpyModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { AuthService } from '../../auth/auth.service';

const _chats = [
  {
    id: 'f8ca7751-b479-4495-b8fe-b94df252ed8c',
    name: 'John Doe',
    lastMessage: 'Hey how are you?',
    unread: 1,
  },
  {
    id: 'c9a5b2d9-4857-470d-9b92-3a67e62e6fb3',
    name: 'Jane Smith',
    lastMessage: 'Let’s meet up later.',
    unread: 4,
  },
  {
    id: 'f3b1a7e3-2fd4-4c4e-8a36-1b87b2b237c2',
    name: 'Michael Johnson',
    lastMessage: 'I’ll call you tomorrow.',
    unread: 0,
  },
  {
    id: 'a8c9fa92-9e9f-4506-92f7-935b2e0fdbe0',
    name: 'Emily Davis',
    lastMessage: 'How’s everything going?',
    unread: 0,
  },
  {
    id: 'db37b982-5365-4701-a74d-d215742e2c5a',
    name: 'Daniel Brown',
    lastMessage: 'See you at the event!',
    unread: 0,
  },
  {
    id: '2b04c55f-98c2-4ff7-a7d7-bc06f00f1567',
    name: 'Sarah Miller',
    lastMessage: 'Can you send me the report?',
    unread: 0,
  },
  {
    id: 'ec92c95d-32a0-4d9b-8e96-bfa1f3c003db',
    name: 'David Wilson',
    lastMessage: 'I need to talk to you about something important.',
    unread: 0,
  },
  {
    id: '6b0db7c8-b125-4b19-84b8-c97d18c3e88f',
    name: 'Olivia Moore',
    lastMessage: 'Let me know when you’re free.',
    unread: 0,
  },
  {
    id: '19bdf911-c375-42ab-828b-e3a1588c4a56',
    name: 'James Taylor',
    lastMessage: 'What time works for you?',
    unread: 0,
  },
  {
    id: 'c0722f56-2f63-4321-bb2b-58065782604d',
    name: 'Sophia Anderson',
    lastMessage: 'I’ve got some exciting news!',
    unread: 0,
  },
  {
    id: '0b8f7732-0e2a-4a52-b736-ef5153851575',
    name: 'Lucas Thomas',
    lastMessage: 'Let’s catch up soon.',
    unread: 0,
  },
];

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    NgbModule,
    NgbAccordionModule,
    NgbScrollSpyModule,
    NgbToastModule,
    FormsModule,
    TruncatePipe,
  ],
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild(NgbScrollSpy) scrollSpy!: NgbScrollSpy;

  show = true;
  model: any;
  chats: Array<{
    id: string;
    name: string;
    lastMessage: string;
    unread: number;
  }> = [];

  formatter = (x: { name: string }) => x.name;

  constructor(private router: Router, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.chats = _chats;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollSpy.active = 'last';
    }, 0);
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/auth/login']);
  }
}
