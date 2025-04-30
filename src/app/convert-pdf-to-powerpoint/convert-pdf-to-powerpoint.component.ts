import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-convert-pdf-to-powerpoint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './convert-pdf-to-powerpoint.component.html',
  styleUrl: './convert-pdf-to-powerpoint.component.css'
})
export class ConvertPdfToPowerpointComponent {
  selectedFile: File | null = null;
  loading = false;
  errorMessage: string | null = null;
  convertedFileUrl: string | null = null;
  convertedFileName: string | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = null;
    }
  }

  convertPdfToPpt(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a PDF file.';
      return;
    }

    this.loading = true;

    this.userService.convertPdfToPpt(this.selectedFile).subscribe({
      next: (response) => {
        const blob = response;
        this.convertedFileUrl = window.URL.createObjectURL(blob);
        this.convertedFileName = 'converted.pptx';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Conversion failed. Please try again.';
        this.loading = false;
      }
    });
  }
}