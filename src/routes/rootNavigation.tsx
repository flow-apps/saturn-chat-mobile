import { NavigationContainerRef } from "@react-navigation/core"
import React from "react"

export const navigationRef = React.createRef<NavigationContainerRef<any>>()

export function navigate(name: string, params?: object) {
  if (!navigationRef.current)
    return;

  navigationRef.current.navigate(name, params)
}

export function setParams(params?: object) {
  if (!navigationRef.current)
    return;

  navigationRef.current.setParams(params)
}

export function getRoutes() {
  if (!navigationRef.current)
    return;

  return navigationRef.current.getState()?.routes
}

export function getCurrentRoute() {
  if (!navigationRef.current)
    return;

  const route = navigationRef.current.getCurrentRoute();

  if (!route?.state) {
    return route;
  }

  let currentRoute: any = route;

  while (currentRoute?.state && currentRoute.state.routes?.length) {
    const index = currentRoute.state.index ?? 0;
    currentRoute = currentRoute.state.routes[index];
  }

  return currentRoute;
}

export function subscribeToRouteChanges(
  callback: (routeName?: string) => void,
) {
  if (!navigationRef.current) {
    callback(undefined);
    return () => undefined;
  }

  const emitCurrentRoute = () => {
    callback(navigationRef.current?.getCurrentRoute()?.name);
  };

  emitCurrentRoute();

  const unsubscribe = navigationRef.current.addListener("state", emitCurrentRoute);

  return unsubscribe;
}