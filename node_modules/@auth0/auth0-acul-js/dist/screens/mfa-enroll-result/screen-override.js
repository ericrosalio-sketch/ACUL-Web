import{Screen as t}from"../../models/screen.js";class s extends t{data;constructor(t){super(t),this.data=s.getScreenData(t)}static getScreenData=t=>{const s=t.data;return s&&"string"==typeof s.status?{status:s.status}:null}}export{s as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
