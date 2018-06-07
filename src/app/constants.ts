export class API {
  static url(segment:string) {
    return `http://192.168.43.43:8000/api/${segment}`;
  }
}