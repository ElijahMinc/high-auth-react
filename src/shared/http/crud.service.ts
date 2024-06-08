import { getQueryParams } from '@shared/http/http.lib';
import { HttpRequest } from '@shared/http/http.service';

class CrudService {
  protected httpRequest: HttpRequest;

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

  protected async get<ReturnV>(params: Record<string, unknown>, route: string) {
    const routeParams = getQueryParams({
      ...params,
    });

    return await this.httpRequest.get<ReturnV>(routeParams, route);
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
