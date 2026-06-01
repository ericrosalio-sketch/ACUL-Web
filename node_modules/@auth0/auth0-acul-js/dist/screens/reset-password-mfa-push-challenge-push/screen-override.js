import{Screen as e}from"../../models/screen.js";class t extends e{data;constructor(e){super(e),this.data=t.getScreenData(e)}static getScreenData=e=>{const t=e.data;return t?{deviceName:"string"==typeof t.device_name?t.device_name:""}:null}}export{t as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
