import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCG63MY-xqxXUHjhwbL9VZj8Io8cQiCJqw',
      authDomain: 'ng-recipe-book-f5071.firebaseio.com'
    });
  }
}
