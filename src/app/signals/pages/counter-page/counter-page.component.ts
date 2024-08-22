import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
})
export class CounterPageComponent {
  public counter = signal<number>(10);

  //Señal computada de solo lectura
  public squareCounter = computed(() => this.counter() ** 2);

  public increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }
}
