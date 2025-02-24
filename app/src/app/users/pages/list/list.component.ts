import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../user.interface';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  page = 1;
  pageSize = 5;
  totalUsers = 0;
  searchName = '';

  private subscriptions: Array<Subscription> = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  loadUsers(): void {
    this.subscriptions.push(
      this.userService
        .getUsers(this.page, this.pageSize, this.searchName)
        .subscribe((data) => {
          this.users = data;
          this.totalUsers = data.length;
        })
    );
  }

  search(): void {
    this.page = 1;
    this.loadUsers();
  }
}
