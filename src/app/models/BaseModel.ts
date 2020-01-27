export abstract class BaseModel {

  constructor(data: any = null) {
      try {
          Object.assign(this, JSON.parse(data));
      } catch {
          Object.assign(this, null);
      }
  }
}
