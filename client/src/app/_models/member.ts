import { Photo } from "./photo";

export interface Member {
    id:           number;
    userName:     string;
    photoUrl:     string;
    petAge:       number;
    userAge:      number;
    knownAs:      string;
    created:      Date;
    lastActive:   Date;
    gender:       string;
    petType:      string;
    introduction: string;
    lookingFor:   string;
    interests:    string;
    city:         string;
    country:      string;
    photos:       Photo[];
  }
  
