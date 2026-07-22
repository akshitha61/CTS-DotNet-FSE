import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses = [
    { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Java', code: 'JAVA201', credits: 3, gradeStatus: 'failed' },
    { id: 3, name: 'Python', code: 'PY301', credits: 2, gradeStatus: 'pending' },
    { id: 4, name: 'C#', code: 'CS401', credits: 4, gradeStatus: 'passed' },
    { id: 5, name: 'SQL', code: 'SQL501', credits: 2, gradeStatus: 'pending' }
  ];

  getCourses() {
    return this.courses;
  }

  addCourse(course: any) {
    this.courses.push(course);
  }

  updateCourse(id: number, updatedCourse: any) {
    const index = this.courses.findIndex(c => c.id === id);

    if (index !== -1) {
      this.courses[index] = updatedCourse;
    }
  }

  deleteCourse(id: number) {
    this.courses = this.courses.filter(c => c.id !== id);
  }

}