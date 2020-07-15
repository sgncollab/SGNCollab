import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavController, Platform, IonRouterOutlet } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-aarti-list',
  templateUrl: './aarti-list.page.html',
  styleUrls: ['./aarti-list.page.scss'],
})
export class AartiListPage implements OnInit {
 
 lang = false;
  data: any=[];
  isItemAvailable = true;
  searchAarti:string = "";
  copyData=[]

  constructor(
    private navController: NavController,
    private dataService: DataService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private router: Router
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
    
}

  ngOnInit() {
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
        this.copyData =json;
      });
  }                                    
  displayLang() {
    this.lang = !this.lang;
  }
      
  reasignData(){
 this.copyData=this.data
  }
  searchList(ev: CustomEvent){
    //console.log(this.searchAarti);
    //let filterData = this.data;
     this.reasignData()
    const val = ev.detail.value;
    if(val && val.trim() !== ''){
      this.copyData = this.copyData.filter(term => {
        return term.englishTitle.toLowerCase().indexOf(val.trim().toLowerCase())> -1;
      });
    }
  }

  openAartiDetails(item, index) {
    this.dataService.setLang(this.lang)
    this.dataService.setIndex(index);
    this.dataService.setData(item);
    this.dataService.setmyPlaylistArtilist(this.data);
    this.navController.navigateForward('aarti-details');
  }
}
