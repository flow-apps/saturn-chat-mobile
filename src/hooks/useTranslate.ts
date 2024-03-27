import { useTranslation } from "react-i18next"

const useTranslate = (prefix: string, ns?: string) => {
  const { t } = useTranslation(ns, { keyPrefix: prefix })

  return { t }
}

export { useTranslate }
