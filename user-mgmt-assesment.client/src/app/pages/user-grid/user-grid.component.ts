import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpHelperService } from '../../services/http-helper.service';
import { finalize } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-grid',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.css',
})
export class UserGridComponent implements OnInit {
  constructor(private httpService: HttpHelperService) {}

  userList: User[] = [];
  order: number = -1; // -1 : unordered, 0: asc, 1: desc

  columns = [
    { displayName: 'Name', key: 'name' },
    { displayName: 'Age', key: 'age' },
    { displayName: 'Phone', key: 'phone' },
    { displayName: 'Status', key: 'status' },
    { displayName: 'Designation', key: 'designation' },
  ];

  ngOnInit(): void {
    this.getAllUsers();
  }

  sortByCol(key: string) {
    const compare = (a: any, b: any, isNumeric: boolean, multiplier: number) => {
      if (isNumeric) {
        return (a[key] - b[key]) * multiplier;
      } else {
        return a[key].localeCompare(b[key]) * multiplier;
      }
    };
  
    const isNumeric = (key: string) => {
      return key === 'age' || key === 'status';
    };
  
    const multiplier = this.order === 0 ? 1 : -1;
  
    switch (key) {
      case 'age':
      case 'status':
        this.userList.sort((a, b) => compare(a, b, true, multiplier));
        break;
      case 'phone':
      case 'designation':
      default:
        this.userList.sort((a, b) => compare(a, b, false, multiplier));
    }
    this.order = this.order === 0 ? 1 : 0; // Toggle sorting order
  }

  getAllUsers() {
    this.httpService
      .httpGet('user/getall')
      .pipe(finalize(() => {}))
      .subscribe({
        next: (res: any) => {
          this.userList = res;
        },
        error: (err) => console.log,
      });
  }
}

//User 
export interface User {
  name: string;
  age: number;
  status: number;
  phone: string;
  designation: string;
}

