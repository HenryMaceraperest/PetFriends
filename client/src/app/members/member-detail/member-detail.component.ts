import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';
import { parseDate } from 'ngx-bootstrap/chronos';
import { PresenceService } from 'src/app/_services/presence.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent | undefined;
  
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab: TabDirective | undefined;
  messages: Message[] = [];
  user: User | undefined;

  constructor(private route: ActivatedRoute, private messageService: MessageService, public presenceService: PresenceService, private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  loadMessages() {
    if (this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }


  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === "Messages" && this.user) {
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }


  getImages() {    
    if (!this.member) return [];
    const tempImages = [];
    for (const photo of this.member.photos) {
      tempImages.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    };
    return tempImages;
  }
}
