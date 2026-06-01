import{Screen as t}from"../../models/screen.js";class e extends t{data;constructor(t){super(t),this.data=e.getScreenData(t)}static getScreenData=t=>{const e=t.data;return e&&"string"==typeof e.text_code&&0!==e.text_code.length?{textCode:e.text_code}:null}}export{e as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
