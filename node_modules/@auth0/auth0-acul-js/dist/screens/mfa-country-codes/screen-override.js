import{Screen as e}from"../../models/screen.js";class r extends e{data;constructor(e){super(e),this.data=r.getScreenData(e)}static getScreenData=e=>{const r=e.data;return r?{phone_prefixes:Array.isArray(r.phone_prefixes)?r.phone_prefixes:[]}:null}}export{r as ScreenOverride};
//# sourceMappingURL=screen-override.js.map
