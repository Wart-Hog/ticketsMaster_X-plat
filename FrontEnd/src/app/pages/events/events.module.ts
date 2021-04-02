import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events.page';
import { TheatreModule } from 'src/app/components/theatre/theatre.module';
import { MusicModule } from 'src/app/components/music/music.module';
import { SportModule } from 'src/app/components/sport/sport.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    TheatreModule,
    MusicModule,
    SportModule
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
