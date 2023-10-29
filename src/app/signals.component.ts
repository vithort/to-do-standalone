import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>signals works!</p> `,
  styles: [],
})
export class SignalsComponent implements OnInit {
  ngOnInit(): void {
    this.withoutSignal();
  }

  withoutSignal(): void {
    let x = 5;
    let y = 3;
    let z = x + y;
    console.log(z);
    x = 10;
    console.log(z);
  }

  withSignal(): void {
    let x = signal(5);
    let y = signal(3);
    let z = computed(() => x() + y());
    console.log(z());
    x.set(10);
    console.log(z());
  }
}
