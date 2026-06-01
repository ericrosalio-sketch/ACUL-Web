import{Screen as t}from"../../models/screen.js";class e extends t{data;constructor(t){super(t),this.data=e.getScreenData(t)}static getScreenData=t=>{const e=t.data;return e?{inviter:"string"==typeof e.inviter?e.inviter:"",email:"string"==typeof e.email?e.email:""}:null}}export{e as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
