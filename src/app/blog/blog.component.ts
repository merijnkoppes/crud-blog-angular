// src/app/blog/blog.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  blog: any;
  blogId: string | null = null;
  blogPosts: any[] = [];
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      if (this.blogId) {
        this.loadBlog(this.blogId);
        this.loadBlogPosts(this.blogId);
      }
    });
  }

  loadBlog(blogId: string): void {
    this.firebaseService.getDocument('blogs', blogId).subscribe((doc) => {
      this.blog = doc.data();
    });
  }

  loadBlogPosts(blogId: string): void {
    this.firebaseService.getBlogPostsByBlogId(blogId).subscribe((data) => {
      this.blogPosts = data.map((a) => {
        const post = a.payload.doc.data() as any;
        post.id = a.payload.doc.id;
        return post;
      });
    });
  }
}
