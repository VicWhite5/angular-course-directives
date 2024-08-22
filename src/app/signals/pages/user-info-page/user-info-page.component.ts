import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css',
})
export class UserInfoPageComponent implements OnInit {
  private userService = inject(UsersService);

  public userId = signal<number>(1);
  public currentUser = signal<User | undefined>(undefined);
  public currentUserName = computed<string>(() => {
    if (!this.currentUser()) return 'Usuario no encontrado';

    return this.currentUser()!.first_name + ' ' + this.currentUser()!.last_name;
  });

  public userWasFound = signal<boolean>(false);

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  public loadUser(userId: number): void {
    if (userId <= 0) return;

    this.userId.set(userId);

    this.currentUser.set(undefined);

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
      },
    });
  }
}
