import{Screen as r}from"../../models/screen.js";class e extends r{data;constructor(r){super(r),this.data=e.getScreenData(r)}static getScreenData=r=>{const e=r.data;return e?{qrCode:"string"==typeof e.qr_code?e.qr_code:"",qrUri:"string"==typeof e.qr_uri?e.qr_uri:"",showCodeCopy:!!e.show_code_copy}:null}}export{e as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
