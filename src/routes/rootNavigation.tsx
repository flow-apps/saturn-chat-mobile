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

  return navigationRef.current.getCurrentRoute()
}