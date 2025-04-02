import { NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [NgIf],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  // Заміняємо простий @Input на сеттер і геттер
  private _dateString = '';

  @Input()
  set dateString(value: string) {
    // Перезапускаємо лише якщо значення справді змінилося
    if (value !== this._dateString) {
      this._dateString = value;

      // Перезапускаємо незалежно від стану компонента
      this.resetComponent();
    }
  }

  get dateString(): string {
    return this._dateString;
  }

  secondsElapsed: number | null = null;
  isVisible: boolean = true;
  radius: number = 15;
  circumference: number = 2 * Math.PI * 15;
  filledLength: number = 0;

  private intervalId: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeCountdown();
  }

  ngOnDestroy(): void {
    this.clear();
  }

  // Метод для повного скидання компонента
  private resetComponent(): void {
    this.clear();
    // Важливо скинути видимість
    this.isVisible = true;
    this.secondsElapsed = null;
    this.initializeCountdown();
  }

  private initializeCountdown(): void {
    // Calculate initial seconds
    const initialSeconds = this.calculateInitialSeconds();
    this.secondsElapsed = initialSeconds;

    // Оновлюємо довжину заповнення кола на початку
    this.updateFilledLength();

    // Якщо більше 60 секунд або менше 0, то компонент не повинен бути видимим
    // і ми НЕ запускаємо інтервал взагалі
    if (initialSeconds >= 60 || initialSeconds < 0) {
      this.isVisible = false;
      this.secondsElapsed = null;
      this.cdr.detectChanges();

      // Важливо: виходимо з методу, щоб не запускати інтервал
      return;
    }

    // Тільки якщо компонент повинен бути видимим, запускаємо таймер
    if (this.isVisible && this.secondsElapsed !== null) {
      this.intervalId = setInterval(() => {
        if (this.secondsElapsed === null) {
          // Зупиняємо інтервал, якщо з якоїсь причини secondsElapsed став null
          this.clear();
          return;
        }

        const newValue = this.secondsElapsed + 1;

        // Якщо досягли або перевищили 60 секунд
        if (newValue >= 60) {
          // Зупиняємо інтервал
          this.clear();
          this.isVisible = false;
          this.secondsElapsed = null;
        } else {
          this.secondsElapsed = newValue;
          this.updateFilledLength();
        }

        this.cdr.detectChanges();
      }, 1000);
    }
  }

  private calculateInitialSeconds(): number {
    const inputDate = new Date(this.dateString.replace(' ', 'T'));
    const currentDate = new Date();
    const diffInSeconds = Math.floor(
      (currentDate.getTime() - inputDate.getTime()) / 1000,
    );

    return diffInSeconds;
  }

  private updateFilledLength(): void {
    if (this.secondsElapsed !== null) {
      this.filledLength = (this.secondsElapsed / 60) * this.circumference;
    }
  }

  private clear(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get strokeDashoffset(): number {
    return this.circumference - this.filledLength;
  }

  // Додаткові геттери для спрощення шаблону
  get shouldDisplay(): boolean {
    return (
      this.isVisible && this.secondsElapsed !== null && this.secondsElapsed < 60
    );
  }
}
