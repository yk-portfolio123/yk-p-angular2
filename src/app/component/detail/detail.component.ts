import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ConnectService } from 'src/app/shared/connect.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit,AfterViewChecked {
  htmlContent = '';
  open_date = Timestamp.now();
  update_date =  Timestamp.now();
  edited:boolean = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '1200px',
    minHeight: '1rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  title = '';
  studyData: any = {
    title: '',
    text: '',
    url: '',
    open_date:Timestamp.now(),
    docid:''
  };

  id = 0;

  url = '';
  onetime:boolean = true;

  base64Output:string = '';
  dataUrl : SafeResourceUrl = '';
  constructor(private route: ActivatedRoute,private data: ConnectService,dateAdapter: DateAdapter<NativeDateAdapter>,private router:Router,
    private fireStorage: AngularFireStorage,private domSanitizer: DomSanitizer) {
    dateAdapter.setLocale('ja-JP');
  }

  ngOnInit() {
    
  }

  ngAfterViewChecked(){
    let element = document.querySelectorAll('img')!;
    
    element.forEach((style) => {
      style.style.maxWidth = '100%';
    });

  }
  getData() {
    const category = this.route.snapshot.paramMap.get("category")!;
    const id = this.route.snapshot.paramMap.get("id")!;
    this.data.getDetail(category,id).subscribe(res => {

      this.title = res.get('title');
      this.url = res.get('url');
      const urlText = res.get('url').replace('https://youtu.be/', '')
      this.url = urlText;
      if(this.onetime){
        let vi = document.getElementById('video')!;
        vi.innerHTML  = '<iframe width="100%" height="100%" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/'+this.getURLid()+'?autoplay=1><img src=https://img.youtube.com/vi/'+this.getURLid()+'/maxresdefault.jpg></a>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="YouTube video player"></iframe>';
        this.onetime = false;
      }
      this.htmlContent = res.get('text')
    });
  }
  private getURLid(){
    const text = this.url.replace('https://youtu.be/', '')
    return text;
  }

  dataURItoBlob(dataURI:any) {
   var byteString = atob( dataURI.split( "," )[1] ) ;
   var mimeType = dataURI.match( /(:)([a-z\/]+)(;)/ )[2] ;

    for( var i=0, l=byteString.length, content=new Uint8Array( l ); l>i; i++ ) {
      content[i] = byteString.charCodeAt( i ) ;
    }
    var blob = new Blob( [ content ], {
      type: mimeType ,
    } ) ;
    return blob;
  }

  onFileSelected(event:any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      this.dataUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+base64);
    });
  }

  convertFile(file : File) : Observable<string> {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
  return result;
  }

  upload(file:string,name:string){
    var directory = 'Data/'+this.id.toString()+'/';
    const imageName = name+'.png';
    const imageBlob = this.dataURItoBlob(file);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
    this.uploadFiles(imageFile,directory);
  }

  uploadFiles(file:any,directory:string) {
    const path = directory + file.name;
    const storageRef = this.fireStorage.ref(path);
    const uploadTask = storageRef.put(file);

    uploadTask.snapshotChanges().pipe(finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadLink => {
         console.log(downloadLink);
         console.log(this.htmlContent);
         var fileNumber = downloadLink.replace('https://firebasestorage.googleapis.com/v0/b/koja-fx.appspot.com/o/Data%2F'+this.id+'%2Fimage','');
         fileNumber = fileNumber.substring(0, fileNumber.indexOf("."))
         this.htmlContent = this.htmlContent.replace( '[image'+fileNumber+']', '<img src="'+downloadLink+'" style="max-width: 100%;">' );
         this.doUpdate();
       })
    })
    ).subscribe( (res : any) => {
    }, err => {
       console.log('Error occured');
    });
  }
  editData(){
    this.edited = !this.edited;

    const result = this.htmlContent.match(/<img(?: .+?)?>.*?<\/p>/g);//.match(/<a(?: .+?)?>.*?<\/a>/g);
    if(result != null){
      result?.forEach((res,index)=>{
        console.log(res);
        this.htmlContent = this.htmlContent.replace(res, '[image'+(index+1)+']');
        var text = res.replace('<img src=\"', '');
        text = text.substring(0, text.indexOf("\" width="));
        this.upload(text,'image'+(index + 1));
      })
    }else{
      this.doUpdate();
    }
  }
  doUpdate(){
    if(this.title == ''){
      alert('タイトルを入力してください');
      return;
    }else if(this.url == ''){
      alert('URLを入力してください');
      return;
    }else if(this.id == 0){
      alert('IDを入力してください');
      return;
    }
    this.studyData.id = this.id;
    this.studyData.title = this.title;
    this.studyData.url = this.url;
    this.studyData.text = this.htmlContent;
    
    //this.data.setStudyData(this.route.snapshot.paramMap.get("id")!,this.studyData);
  }
}
