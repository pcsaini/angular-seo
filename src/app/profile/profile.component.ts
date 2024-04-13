import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;
  constructor(
    private http: HttpClient,
    private meta: Meta, 
    private titleService: Title
  ) {
    this.getProfile();
  }

  getProfile() {
    this.http.get('https://dummyjson.com/users/1').subscribe((response: any) => {
      console.log(response);
      this.user = response;

      this.titleService.setTitle(response?.firstName);
      this.meta.addTags([
        { name: 'description', content: response?.firstName + ' : App Landing Page' },
        { property: 'og:title', content: response?.firstName + ' : App Landing Page' },
        { property: 'og:description', content: response?.firstName + ' : App Landing Page' },
        { property: 'og:type', content: 'website' },
      ]);
    });
  }
}
