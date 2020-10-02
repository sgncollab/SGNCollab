import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavController, Platform, IonRouterOutlet,MenuController} from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { App } = Plugins;

@Component({
  selector: 'app-aarti-list',
  templateUrl: './aarti-list.page.html',
  styleUrls: ['./aarti-list.page.scss'],
})
export class AartiListPage implements OnInit {
  backButtonSubscription: any;
  lang = false;
  data: any = [];
  isItemAvailable = true;
  searchAarti: string = "";
  copyData = []
  currentPage = "aarti-list";

  constructor(
    private navController: NavController,
    private dataService: DataService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    public alertController: AlertController,
    private menu: MenuController
  ) { }

  
  ngOnInit() {
    fetch('./assets/data/aarti-data.json').then(res => res.json())
      .then(json => {
        this.data = json;
        this.copyData = json;
      });
    this.dataService.setPresentPage(this.currentPage);
  }
  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(6666, () => {
       this.menu.close();
        if (window.confirm("Do you want to Exit App")) {
          navigator["app"].exitApp();
        }
    })
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }
  

  checkLang(identifier) {
    if (identifier == "marathi") {
      this.lang = true;
    }
    if (identifier == "english") {
      this.lang = false;
    }
  }

  displayLang() {
    this.lang = !this.lang;
  }

  reasignData() {
    this.copyData = this.data
  }

  searchList(ev: CustomEvent) {
    this.reasignData()
    const val = ev.detail.value;
    if (/^[a-zA-Z]+$/.test(val.toString())) {
      if (val && val.trim() !== '') {
        this.copyData = this.copyData.filter(term => {
          return term.englishTitle.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
        });
      }
    }
    else {
      if (val && val.trim() !== '') {
        this.copyData = this.copyData.filter(term => {
          return term.marathiTitle.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
        });
      }
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

