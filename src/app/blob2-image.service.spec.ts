import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Blob2ImageService } from './blob2-image.service';

describe('Blob2ImageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Blob2ImageService = TestBed.get(Blob2ImageService);
    expect(service).toBeTruthy();
  });
});
