import{Screen as e}from"../../models/screen.js";import{getScopes as s}from"../../shared/screen.js";class o extends e{scopes;hideScopes;constructor(e){super(e),this.scopes=o.getScopes(e),this.hideScopes=o.getHideScopes(e)}static getScopes=e=>s(e);static getHideScopes=e=>!!e.data?.hideScopes}export{o as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
