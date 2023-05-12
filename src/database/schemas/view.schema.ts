import { prop } from '@typegoose/typegoose';

class Phone {
  @prop()
  public owner?: string;

  @prop()
  public partner?: string;
}

class Address {
  @prop()
  public text?: string;

  @prop()
  public lat?: number;

  @prop()
  public lng?: number;
}

class Activity {
  @prop()
  public open?: string;

  @prop()
  public close?: string;

  @prop()
  public fromDay?: string;

  @prop()
  public toDay?: string;
}

class Form {
  @prop()
  public name?: string;

  @prop()
  public label?: string;

  @prop()
  public isRequired?: boolean;

  @prop()
  public type?: string;
}

class Subject {
  @prop()
  public id?: number;

  @prop()
  public name?: string;

  @prop()
  public label?: string;

  @prop()
  public images?: Array<{ url: string; group?: string }>;
}

class ContactUsData {
  @prop()
  public social?: { instagram?: string; facebook?: string };

  @prop()
  public phone?: Phone;

  @prop()
  public address?: Address;

  @prop()
  public activity?: Activity;

  @prop()
  public email?: string;

  @prop({ type: [Form] })
  public form?: Form[];
}

class GalleryData {
  @prop({ type: [Subject] })
  public subjects?: Subject[];
}

class AboutUsData {
  @prop()
  public text?: string;

  @prop({ type: [Form] })
  public form?: Form[];

  @prop()
  public phone?: Phone;

  @prop()
  public address?: Address;

  @prop()
  public activity?: Activity;

  @prop()
  public email?: string;
}

export class View {
  @prop()
  public label?: string;

  @prop()
  public value?: string;

  @prop()
  public data?: AboutUsData | GalleryData | ContactUsData;

  @prop()
  public isEmpty?: boolean;

  @prop()
  public index: number;
}