import { Component, ViewChild } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { trigger, transition, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('imgState', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show => hide', animate("500ms ease-out")),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class AppComponent {
  @ViewChild(LoadingComponent) myLoading: LoadingComponent;
  title = 'app';
  name: string = "";
  cardTemplateList: Array<Object> = [{
    'name': 'تصميم ١',
    'value': 'greenCard',
    'path': '/assets/images/eid-card-1.jpeg',
    'style': "top:'72.5% !important';right:'8% !important'"
  }, {
    'name': 'تصميم ٢',
    'value': 'redCard',
    'path': '/assets/images/eid-card-2.jpeg',
    'style': "top:'72.5% !important';right:'25% !important'"
  }
  ];
  selectedCardTemplate: any = this.cardTemplateList[0];
  imgSrc: string = this.selectedCardTemplate.path;
  isDownloading: boolean = false;
  show: boolean = true;
  downloadImgUrl: string = "";

  constructor() {
  }

  ngOnInit() {
    this.myLoading.show();
    // hide loading indicator after 1 second
    setTimeout(() => {
      this.myLoading.dismiss();
    }, 1000);
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }
  
  updateImg() {
    if (this.selectedCardTemplate.path) {
      this.show = !this.show;
      this.downloadImgUrl = null;
      setTimeout(() => {
        this.show = !this.show;
        this.imgSrc = this.selectedCardTemplate.path;
      }, 500);

    }
  }

  download(): void {
    this.isDownloading = true;
    this.myLoading.show();

    let { canvas, context } = this.getCanvas();
    // image
    let image = new Image();
    image.src = this.imgSrc;
    image.onload = () => {

      this.makeImage(canvas, context, image);
      // clear
      this.name = "";
      this.isDownloading = false;
      this.myLoading.dismiss();
    }; // end image load event
  }// end download method

  private makeImage(canvas, context, image) {
    const width = 500;
    const height = 500;
    // extend canvas size to get proper resolution
    let { x, y, color } = this.getXYValues();
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0);
    // text and font
    context.font = "30px Harmattan"; // font-size font-family
    context.fillStyle = color;
    context.fillText(this.name, x, y);
    // update download link
    this.downloadImgUrl = canvas.toDataURL('image/png');
  }

  private getCanvas() {
    let card = document.getElementById("card");
    // create canvas
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let context = canvas.getContext('2d');
    return { canvas, context };
  }

  private getXYValues() {
    let x, y, color;
    if (this.selectedCardTemplate.value === "greenCard") {
      x = 430;
      y = 390;
      color = "#333333";
    } else if (this.selectedCardTemplate.value === "redCard") {
      // redCard
      x = 330;
      y = 390;
      color = "#556b2f";
    }

    return { x, y, color };
  }
}
