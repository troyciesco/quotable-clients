export type Client = {
  id: number
  name: string
  title: string
  avatar: string
  quote?: string
  nationality?: string
  /**
   * @deprecated A client's favorite food is no longer tracked
   */
  favoriteFood?: string
}
