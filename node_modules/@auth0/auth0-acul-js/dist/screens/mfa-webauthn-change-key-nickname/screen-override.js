import{Screen as t}from"../../models/screen.js";class e extends t{data;constructor(t){super(t),this.data=e.getScreenData(t)}static getScreenData=t=>{const e=t.data;return e&&"string"==typeof e.nickname?{nickname:e.nickname}:null}}export{e as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
