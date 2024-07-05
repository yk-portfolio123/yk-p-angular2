import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/shared/connect.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  cardList:any[] = [];
  constructor(private data: ConnectService,private router:Router,private route: ActivatedRoute) {}

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get("category")!;
    this.data.getCategory(category).subscribe((res: any) => {
      this.cardList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.docid = e.payload.doc.id;
        return data;
      })
      console.log(this.cardList)
    }, () => {
      alert('データを取得できませんでした。エラーコード:2');
    })
  }

  addpage(){
    this.router.navigate(['/addpage'], { queryParams: { id: '1' } });
  }
}
  