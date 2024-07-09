import { getQueryParams } from '@shared/http/http.lib';
import { HttpRequest } from '@shared/http/http.service';
import { AxiosRequestConfig } from 'axios';

class CrudService {
  public httpRequest: HttpRequest;
  static unauthorizedStatusCode = 401;

  constructor(path: string) {
    this.httpRequest = new HttpRequest(path);
  }

  protected async getAll<ReturnV>(
    params: Record<string, unknown>,
    route: string
  ) {
    const routeParams = getQueryParams({
      ...params,
    });
    return await this.httpRequest.get<ReturnV>(routeParams, route);
  }

  protected async getById<TData extends string, ReturnV>(
    id: TData,
    params: { [key: string]: string },
    route: string
  ) {
    const routeParams = getQueryParams({
      ...params,
    });
    return await this.httpRequest.get<ReturnV>(routeParams, `${route}/${id}`);
  }

  protected async get<ReturnV>(
    params: Record<string, unknown>,
    route: string,
    options?: AxiosRequestConfig<any>
  ) {
    const routeParams = getQueryParams({
      ...params,
    });

    return await this.httpRequest.get<ReturnV>(routeParams, route, options);
  }

  protected async create<TData, VoidR>(
    data: TData,
    params: { [key: string]: string },
    route: string
  ) {
    const routeParams = getQueryParams(params ?? {});
    return await this.httpRequest.post<TData, VoidR>(data, routeParams, route);
  }

  protected async update<TData, ReturnV>(
    data: TData,
    params: { [key: string]: string },
    route: string
  ) {
    const routeParams = getQueryParams(params ?? {});
    return await this.httpRequest.put<TData, ReturnV>(data, routeParams, route);
  }

  protected async delete<VoidR>(
    params: { [key: string]: string },
    route: string
  ) {
    const routeParams = getQueryParams(params ?? {});
    return await this.httpRequest.delete<VoidR>(routeParams, route);
  }

  protected abortRequest() {
    this.httpRequest.abortRequest();
  }
}

export { CrudService };
