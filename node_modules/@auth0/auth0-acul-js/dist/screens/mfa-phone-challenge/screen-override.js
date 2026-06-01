import{Screen as e}from"../../models/screen.js";class t extends e{data;constructor(e){super(e),this.data=t.getScreenData(e)}static getScreenData=e=>{const t=e.data;return t&&"string"==typeof t.phone_number?{phoneNumber:t.phone_number}:null}}export{t as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
