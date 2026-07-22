import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-api-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-demo.html',
  styleUrl: './api-demo.css'
})
export class ApiDemo implements OnInit {

  posts: any[] = [];

  newPost = {
    title: 'Angular Hands-On',
    body: 'Learning HttpClient POST',
    userId: 1
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.slice(0, 5);
      },
      error: (err) => {
        console.error('GET Error:', err);
      }
    });
  }

  // POST
  createPost(): void {
    this.apiService.addPost(this.newPost).subscribe({
      next: (response) => {
        console.log('POST Success:', response);
        alert('Post created successfully!');
      },
      error: (err) => {
        console.error('POST Error:', err);
      }
    });
  }

  // PUT
  updatePost(): void {

    const updatedPost = {
      id: 1,
      title: 'Updated Angular Post',
      body: 'This post has been updated successfully.',
      userId: 1
    };

    this.apiService.updatePost(1, updatedPost).subscribe({
      next: (response) => {
        console.log('PUT Success:', response);
        alert('Post updated successfully!');
      },
      error: (err) => {
        console.error('PUT Error:', err);
      }
    });

  }

  // DELETE
  deletePost(): void {

    this.apiService.deletePost(1).subscribe({
      next: () => {
        console.log('DELETE Success');
        alert('Post deleted successfully!');
      },
      error: (err) => {
        console.error('DELETE Error:', err);
      }
    });

  }

}