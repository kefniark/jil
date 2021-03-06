import { SceneManager } from './sceneManager';
import { registerComponent, registerLayout, registerClassname } from './behaviours';
/**
 * Init Helper
 * @function
 */
export declare const init: typeof SceneManager.init;
/**
 * Create a new scene
 * @function
 */
export declare const create: typeof SceneManager.create;
/**
 * Switch to a scene
 * @function
 */
export declare const use: typeof SceneManager.use;
export { SceneManager, registerClassname, registerComponent, registerLayout };
