// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  blogs: any[] = [];
  currentUserBlog: any = null;

  constructor(
    private firebaseService: FirebaseService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.loadBlogs(user.uid);
      }
    });
  }

  loadBlogs(userId: string): void {
    this.firebaseService
      .getCollectionData('blogs')
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .subscribe((data) => {
        this.blogs = data.filter((blog) => blog.userId !== userId);
        this.currentUserBlog = data.find((blog) => blog.userId === userId);
      });
  }

  goToMyBlog(): void {
    if (this.currentUserBlog) {
      this.router.navigate(['/blog', this.currentUserBlog.id]);
    }
  }
}
