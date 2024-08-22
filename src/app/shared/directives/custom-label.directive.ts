import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;

  private _color: string = 'red';
  private _errors?: ValidationErrors | null | undefined;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessages();
    // console.log(this._errors);
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    // console.log('OnInit de la directiva');
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessages(): void {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }
    console.log(this._errors);


    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const requiredLength = this._errors['minlength']?.requiredLength;
      this.htmlElement.nativeElement.innerText = requiredLength
        ? `La longitud mínima es de ${requiredLength} caracteres`
        : 'Aún no tiene los caracteres necesarios';

      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText =
        'El valor ingresado no tiene formato de email';
      return;
    }
  }
}
