import{Screen as t}from"../../models/screen.js";import{getLoginLink as s}from"../../shared/screen.js";class e extends t{data;loginLink;constructor(t){super(t),this.data=e.getScreenData(t),this.loginLink=s(t)}static getScreenData=t=>{const s=t.data;return s&&"string"==typeof s.status?{status:s.status}:null}}export{e as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
