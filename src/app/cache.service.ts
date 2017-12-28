import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class CacheService {
  private cache: Map<string, any> = new Map<string, any>();

  constructor() { }

  get(key: string, fallback: Observable<any>) {
    if (this.hasValidCachedValue(key)) {
      return Observable.of(this.cache.get(key));
    }

    return fallback.do(value => this.set(key, value));
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  clear(key: string) {
    this.cache.delete(key);
  }

  private hasValidCachedValue(key: string): boolean {
    return this.cache.has(key);
  }

}
