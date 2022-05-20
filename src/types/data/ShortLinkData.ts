// import { apiResponse } from "../api";

export interface ShortLinkFormData {
  url: string
  title?: string
  description?: string
  active: boolean
}

export interface ShortLinkUpdateFormData {
  url?: string
  title?: string
  description?: string
  active: boolean
}

export interface ShortLinkData extends ShortLinkFormData {
  id: number
  url_string: string
  tag?: string
  thumbnail?: string
}

export interface RedirectLinkData {
  url: string
}
