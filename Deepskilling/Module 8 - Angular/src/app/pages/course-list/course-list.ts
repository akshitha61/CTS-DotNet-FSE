import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCard,
    RouterLink
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = true;

  courses: any[] = [];

  selectedCourseId: number | null = null;

  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.searchTerm =
      this.route.snapshot.queryParamMap.get('search') ?? '';

    setTimeout(() => {
      this.courses = this.courseService.getCourses();
      this.isLoading = false;
    }, 1500);

  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

  viewCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  searchCourses(): void {

    this.router.navigate(
      ['/courses'],
      {
        queryParams: {
          search: this.searchTerm
        }
      }
    );

  }

  addNewCourse(): void {

    const newCourse = {
      id: 6,
      name: 'React',
      code: 'REA601',
      credits: 3,
      gradeStatus: 'pending'
    };

    this.courseService.addCourse(newCourse);
    this.courses = this.courseService.getCourses();

  }

  updateFirstCourse(): void {

    this.courseService.updateCourse(1, {
      id: 1,
      name: 'Advanced Angular',
      code: 'ANG201',
      credits: 5,
      gradeStatus: 'passed'
    });

    this.courses = this.courseService.getCourses();

  }

  deleteLastCourse(): void {

    this.courseService.deleteCourse(5);
    this.courses = this.courseService.getCourses();

  }

}