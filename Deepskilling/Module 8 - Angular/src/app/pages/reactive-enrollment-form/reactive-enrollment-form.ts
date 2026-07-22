import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [this.emailExistsValidator()]
      ],

      courseId: [
        '',
        [Validators.required, this.noCourseCodeValidator()]
      ],

      preferredSemester: ['Odd'],

      agreeToTerms: [false, Validators.requiredTrue],

      additionalCourses: this.fb.array([])

    });

  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse() {
    this.additionalCourses.push(
      this.fb.control('')
    );
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  noCourseCodeValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '000') {
        return { invalidCourse: true };
      }
      return null;
    };
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {

      return of(control.value).pipe(

        delay(1000),

        map(email => {

          if (email === 'admin@test.com') {
            return { emailExists: true };
          }

          return null;

        })

      );

    };
  }

  onSubmit() {
    console.log(this.enrollForm.value);
  }

}