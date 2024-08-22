import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  router: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  //Antes
  // public menuItems: MenuItem[] = [
  //   { title: 'Counter', router: 'counter' },
  //   { title: 'User Info', router: 'user-info' },
  //   { title: 'Mutations', router: 'properties' },
  // ];

  //Despues
  public menuItems = signal<MenuItem[]>([
    { title: 'Counter', router: 'counter' },
    { title: 'User Info', router: 'user-info' },
    { title: 'Mutations', router: 'properties' },
  ]);

  constructor() {}
}
