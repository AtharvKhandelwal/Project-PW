import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convert-pdf-to-jpg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './convert-pdf-to-jpg.component.html',
  styleUrl: './convert-pdf-to-jpg.component.css'
})

export class PdfToJpgComponent {
  selectedFile: File | null = null;
  loading = false;
  errorMessage = '';
  convertedFileUrl: string | null = null;
  convertedFileName = '';

  constructor(private userService: UserService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = '';
      this.convertedFileUrl = null;
    }
  }

  convertPdfToJpg(): void {
    
    this.loading = true;
    this.errorMessage = '';
    this.convertedFileUrl = null;
    
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a PDF file.';
      return;
    }

    this.userService.convertPdfToJpg(this.selectedFile).subscribe({
      next: (blob) => {
        const type = blob.type;
        const extension = type === 'application/zip' ? 'zip' : 'jpg';
        this.convertedFileName = `converted.${extension}`;
        this.convertedFileUrl = URL.createObjectURL(blob);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Conversion failed. Please try again.';
        this.loading = false;
      }
    });
  }
}