import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  blog: any;
  blogId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      if (this.blogId) {
        this.loadBlog(this.blogId);
      }
    });
  }

  loadBlog(blogId: string): void {
    this.firebaseService.getDocument('blogs', blogId).subscribe((doc) => {
      this.blog = doc.data();
    });
  }
}
