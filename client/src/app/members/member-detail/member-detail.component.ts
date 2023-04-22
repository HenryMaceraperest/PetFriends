import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Gallery, GalleryItem, GalleryRef, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute, private gallery: Gallery) { }
  
  ngOnInit(): void {
    this.loadMember();

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
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
      this.memberService.getMember(username).subscribe({
        next: member => {
          this.member = member;
          this.galleryImages = this.getImages();
        }
      })
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
