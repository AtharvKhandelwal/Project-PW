import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7007/api';      // Change this to your .NET Core Web API URL

  constructor(private http: HttpClient) {}

  // Signup method
  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/signup`, user);
  }

  // Login method
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/login`, user);

  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Or however you store JWT
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
  
  convertWordToPdf(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);
  
    // const token = localStorage.getItem('token'); // Get the JWT token
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });
  
    return this.http.post(`${this.apiUrl}/Features/ConvertWordToPdf`, formData, {
      // headers: headers,
      responseType: 'blob'
    });
  }

  convertPdfToPpt(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);

    // const token = localStorage.getItem('token'); // assuming you stored token at login
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });

    return this.http.post(`${this.apiUrl}/Features/ConvertPdfToPpt`, formData, {
      // headers,
      responseType: 'blob'
    });
  }
  

  convertPptToPdf(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);
  
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });
  
    return this.http.post(`${this.apiUrl}/Features/ConvertPptToPdf`, formData, {
      // headers,
      responseType: 'blob'
    });
  }
  
}

