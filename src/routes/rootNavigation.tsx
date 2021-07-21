import { NavigationContainerRef } from "@react-navigation/native"
import React from "react"

export const navigationRef = React.createRef<NavigationContainerRef>()

export function navigate(name: string, params: object) {
  navigationRef?.current?.navigate(name, params)
}