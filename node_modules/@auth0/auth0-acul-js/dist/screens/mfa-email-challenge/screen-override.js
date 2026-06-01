import{Screen as e}from"../../models/screen.js";class t extends e{data;constructor(e){super(e),this.data=t.getScreenData(e)}static getScreenData=e=>{const t=e.data;return t?{email:"string"==typeof t.email?t.email:"",showRememberDevice:"boolean"==typeof t.show_remember_device?t.show_remember_device:void 0}:null}}export{t as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
