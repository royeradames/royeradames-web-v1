import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { AboutPageDataInterface } from '../../model/aboutPageDataInterface';
import { DataService } from '../../share/data.service';
import { AboutComponent } from './about.component';

const aboutPageData: AboutPageDataInterface = {
  name: 'Royer Adames',
  greeting: 'Nice to meet you! I’m',
  about: 'Based in the US, I’m a front-end developer.',
  link: '#contact',
  pageAnchor: '#about',
  actionLabel: 'Contact me',
  img: { src: 'https://images.ctfassets.net/example/me.png', alt: 'Me', width: '2448', height: '3028' },
  sources: [],
};

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [NgOptimizedImage],
      providers: [{ provide: DataService, useValue: { aboutPageData: new BehaviorSubject(aboutPageData) } }],
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The photo is the page's largest paint on every device, so it must not wait behind lazy loading.
  it('loads the photo eagerly at high priority', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('picture img');
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });
});
