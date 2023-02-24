import { ReportShape } from "types";

export const getRouteStatus = (report: ReportShape | undefined) => {
  if (!report) return [];
  const {
    formTemplate: { routes },
  } = report;
  const validRoutes = routes.filter((r) => r.pageType !== "reviewSubmit");
  const parent = validRoutes.map((route) => {
    const children = route.children?.map((child: any) => {
      const grandchildren = child.children?.map((grandchild: any) => {
        return {
          name: grandchild.name,
          path: grandchild.path,
          status: "error",
        };
      });

      return {
        name: child.name,
        path: child.path,
        status: undefined,
        children: grandchildren,
      };
    });

    return {
      name: route.name,
      path: route.path,
      status: undefined,
      children,
    };
  });

  return parent;
};