/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLOCK_SIZE: string
  readonly VITE_MAX_SPEED: string
  readonly VITE_MAX_FORCE: string
  readonly VITE_NEIGHBOR_DISTANCE: string
  readonly VITE_DESIRED_SEPARATION: string
  readonly VITE_RADIUS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
