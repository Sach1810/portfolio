// Utility function to load remote apps
export async function loadRemoteApp(remoteName: string, moduleName: string) {
  try {
    // Wait for the remote to be available
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Load the remote module
    const module = await import(/* webpackIgnore: true */ `${remoteName}/${moduleName}`)
    return module.default
  } catch (error) {
    console.error(`Failed to load remote app ${remoteName}/${moduleName}:`, error)
    throw error
  }
}

// Type for remote app loader functions
export type RemoteAppLoader = (container: HTMLElement) => void 