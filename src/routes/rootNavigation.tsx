import { NavigationContainerRef } from "@react-navigation/native"
import React from "react"

export const navigationRef = React.createRef<NavigationContainerRef<any>>()

export function navigate(name: string, params: object) {
  if (!navigationRef.current)
    return;

  navigationRef.current.navigate(name, params)
}