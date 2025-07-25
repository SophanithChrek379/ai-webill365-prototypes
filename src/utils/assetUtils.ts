/**
 * Utility function to get the correct asset path for GitHub Pages deployment
 * This ensures that static assets are referenced with the correct base path
 */

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/ai-webill365-prototypes" : "";

export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Return the path with base path for production
  return `${basePath}/${cleanPath}`;
}

export function getImagePath(imageName: string): string {
  return getAssetPath(`assets/images/${imageName}`);
}

export function getFlagPath(flagName: string): string {
  return getAssetPath(`assets/flag/${flagName}`);
}

export function getIconPath(iconName: string): string {
  return getAssetPath(`assets/images/${iconName}`);
}

export function getAvatarPath(avatarName: string): string {
  return getAssetPath(`assets/images/avatar/${avatarName}`);
}

// Helper function for icon properties in component data
export function getIconAssetPath(iconPath: string): string {
  return getAssetPath(iconPath.replace('/assets/', 'assets/'));
} 