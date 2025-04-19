// import { WorkspaceConstant } from 'constant';

export const UrlUtils = (() => {
  let route: string[] = [];

  function splitSearchParams(str: string | undefined) {
    if (str) {
      const ar = str.split('?');
      if (ar[1] && ar[1] !== '') {
        return ar[1];
      }
    }
  }

  function makeRouteArray(
    domain: string | undefined,
    view: string | undefined,
    entity: string | undefined,
    detail: string | undefined = undefined,
    detailId: string | undefined = undefined,
    extra1: string | undefined = undefined,
    extra2: string | undefined = undefined
  ) {
    // route.push(WorkspaceConstant.API_MAIN_ROUTE);

    if (domain) route.push(domain);
    if (view) route.push(view);
    if (entity) route.push(entity);
    if (detail) route.push(detail);
    if (detailId) route.push(detailId);
    if (extra1) route.push(extra1);
    if (extra2) route.push(extra2);
  }

  return {
    makeRoute: (
      domain: string | undefined,
      view: string | undefined,
      entity: string | undefined = undefined,
      detail: string | undefined = undefined,
      detailId: string | undefined = undefined,
      extra1: string | undefined = undefined,
      extra2: string | undefined = undefined
    ) => {
      route = [];

      makeRouteArray(domain, view, entity, detail, detailId, extra1, extra2);

      const params = splitSearchParams(window.location.hash);

      if (params && params !== '') route.push(`?${params}`);

      return '/' + route.join('/');
    },
    makeRouteWidthoutSearch: (
      domain: string | undefined,
      view: string | undefined = undefined,
      entity: string | undefined = undefined,
      detail: string | undefined = undefined,
      detailId: string | undefined = undefined,
      extra1: string | undefined = undefined,
      extra2: string | undefined = undefined
    ) => {
      route = [];

      makeRouteArray(domain, view, entity, detail, detailId, extra1, extra2);

      return '/' + route.join('/');
    },
  };
})();
