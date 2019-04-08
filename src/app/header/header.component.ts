import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageServer: DataStorageService) { }

  onSaveData() {
    this.dataStorageServer.storeRecipes().subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }

  onFetchData() {
    this.dataStorageServer.getRecipes();
  }
}
