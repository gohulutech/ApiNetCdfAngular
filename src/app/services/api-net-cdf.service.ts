import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../Models/data-response.model';
import { HttpClient } from '@angular/common/http';
import { Variable } from '../Models/variable';
import { Metadata } from '../Models/metadata';

@Injectable({
  providedIn: 'root'
})
export class ApiNetCdfService {
  constructor(private http: HttpClient) { }

  Upload(file: File) : Observable<DataResponse> {
    var formData = new FormData();
    formData.append("file", file);
    return this.http.post<DataResponse>('/api/ApiNetCDF/Upload', formData);
  }

  GetVariables() : Observable<Variable[]> {
    return this.http.get<Variable[]>('/api/ApiNetCDF/GetVariables');
  }

  GetMetadata(id: number) : Observable<Metadata[]> {
    return this.http.get<Metadata[]>(`/api/ApiNetCDF/GetMetadata/${id}`);
  }

  GetData(id: number) : Observable<DataResponse> {
    return this.http.get<DataResponse>(`/api/ApiNetCDF/GetData/${id}`);
  }
}
