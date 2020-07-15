import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-menue',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public page: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const s = this.activatedRoute.snapshot.paramMap.get('id');
    this.page = (s.charAt(0).toUpperCase() + s.slice(1));
  }

}
