import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Category} from "../entities/category/category";
import {Topic} from "../entities/topic/topic";
import {Post} from "../entities/post/post";

function convert(data) {
  if (data instanceof Array) {
    data = data.map(obj => convert(obj));
  } else if (data.cid && data.parentCid){
    data = Category.convert(data);
  } else if (data.tid && data.cid) {
    data = Topic.convert(data);
  } else if (data.pid && data.tid) {
    data = Post.convert(data);
  }
  return data;
}

@Injectable()
export class ConvertInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => convert(data)));
  }
}
