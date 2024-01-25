class g extends Error{constructor(c){super(c),this.name="AddChainError"}}class I extends Error{constructor(){super(),this.name="AlreadyDestroyedError"}}class E extends Error{constructor(){super(),this.name="JsonRpcDisabledError"}}class M extends Error{constructor(c){super(c)}}class v extends Error{constructor(){super("JSON-RPC requests queue is full")}}function y(r,c,d){return R(r,c,d),new TextDecoder().decode(r.slice(c,c+d))}function A(r,c){return R(r,c,1),r[c]}function x(r,c){return R(r,c,2),r[c]<<8|r[c+1]}function S(r,c){return R(r,c,4),(r[c]|r[c+1]<<8|r[c+2]<<16)+r[c+3]*16777216}function O(r,c,d){R(r,c,1),r[c]=d&255}function P(r,c,d){R(r,c,4),r[c+3]=d>>>24&255,r[c+2]=d>>>16&255,r[c+1]=d>>>8&255,r[c]=d&255}function R(r,c,d){if(!Number.isInteger(c)||c<0)throw new RangeError;if(c+d>r.length)throw new RangeError}var k=function(r,c,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(a){try{s(o.next(a))}catch(i){u(i)}}function e(a){try{s(o.throw(a))}catch(i){u(i)}}function s(a){a.done?n(a.value):h(a.value).then(t,e)}s((o=o.apply(r,c||[])).next())})};function j(r,c,d){return k(this,void 0,void 0,function*(){const o={instance:null,currentTask:null,bufferIndices:new Array,advanceExecutionPromise:null,onShutdownExecutorOrWasmPanic:()=>{}},h={panic:(t,e)=>{const s=o.instance;o.instance=null,t>>>=0,e>>>=0;const a=y(new Uint8Array(s.exports.memory.buffer),t,e);throw d({ty:"wasm-panic",message:a,currentTask:o.currentTask}),o.onShutdownExecutorOrWasmPanic(),o.onShutdownExecutorOrWasmPanic=()=>{},new Error},random_get:(t,e)=>{const s=o.instance;t>>>=0,e>>>=0;const a=new Uint8Array(s.exports.memory.buffer).subarray(t,t+e);for(let i=0;i<e;i+=65536)r.getRandomValues(a.subarray(i,i+65536))},unix_timestamp_us:()=>{const t=Math.floor(Date.now());if(t<0)throw new Error("UNIX timestamp inferior to 0");return BigInt(t)*BigInt(1e3)},monotonic_clock_us:()=>{const t=r.performanceNow(),e=Math.floor(t);return BigInt(e)*BigInt(1e3)+BigInt(Math.floor((t-e)*1e3))},buffer_size:t=>o.bufferIndices[t].byteLength,buffer_copy:(t,e)=>{const s=o.instance;e=e>>>0;const a=o.bufferIndices[t];new Uint8Array(s.exports.memory.buffer).set(a,e)},advance_execution_ready:()=>{o.advanceExecutionPromise&&o.advanceExecutionPromise(),o.advanceExecutionPromise=null},json_rpc_responses_non_empty:t=>{d({ty:"json-rpc-responses-non-empty",chainId:t})},log:(t,e,s,a,i)=>{const l=o.instance;e>>>=0,s>>>=0,a>>>=0,i>>>=0;const f=new Uint8Array(l.exports.memory.buffer);let p=y(f,e,s),m=y(f,a,i);d({ty:"log",level:t,message:m,target:p})},start_timer:t=>{const e=o.instance;t>2147483647&&(t=2147483647),t<1&&typeof setImmediate=="function"?setImmediate(()=>{if(o.instance)try{e.exports.timer_finished()}catch{}}):setTimeout(()=>{if(o.instance)try{e.exports.timer_finished()}catch{}},t)},connection_type_supported:t=>{switch(t){case 0:case 1:case 2:return r.forbidTcp?0:1;case 4:case 5:case 6:return r.forbidNonLocalWs?0:1;case 7:return r.forbidWs?0:1;case 14:return r.forbidWss?0:1;case 16:case 17:return r.forbidWebRtc?0:1;default:throw new Error("Invalid connection type passed to `connection_type_supported`")}},connection_new:(t,e,s)=>{const a=o.instance,i=new Uint8Array(a.exports.memory.buffer);e>>>=0,s>>>=0;let l;switch(A(i,e)){case 0:case 1:case 2:{const f=x(i,e+1),p=y(i,e+3,s-3);l={ty:"tcp",port:f,hostname:p};break}case 4:case 6:{const f=x(i,e+1);l={ty:"websocket",url:"ws://"+y(i,e+3,s-3)+":"+f};break}case 5:{const f=x(i,e+1);l={ty:"websocket",url:"ws://["+y(i,e+3,s-3)+"]:"+f};break}case 14:{const f=x(i,e+1);l={ty:"websocket",url:"wss://"+y(i,e+3,s-3)+":"+f};break}case 16:{const f=x(i,e+1),p=i.slice(e+3,e+35),m=y(i,e+35,s-35);l={ty:"webrtc",ipVersion:"4",remoteTlsCertificateSha256:p,targetIp:m,targetPort:f};break}case 17:{const f=x(i,e+1),p=i.slice(e+3,e+35),m=y(i,e+35,s-35);l={ty:"webrtc",ipVersion:"6",remoteTlsCertificateSha256:p,targetIp:m,targetPort:f};break}default:throw new Error("Invalid encoded address passed to `connection_new`")}d({ty:"new-connection",connectionId:t,address:l})},reset_connection:t=>{d({ty:"connection-reset",connectionId:t})},connection_stream_open:t=>{d({ty:"connection-stream-open",connectionId:t})},connection_stream_reset:(t,e)=>{d({ty:"connection-stream-reset",connectionId:t,streamId:e})},stream_send:(t,e,s,a)=>{const i=o.instance,l=new Uint8Array(i.exports.memory.buffer);s>>>=0,a>>>=0;const f=new Array;for(let p=0;p<a;++p){const m=S(l,s+8*p),w=S(l,s+8*p+4);f.push(l.slice(m,m+w))}d({ty:"stream-send",connectionId:t,streamId:e,data:f})},stream_send_close:(t,e)=>{d({ty:"stream-send-close",connectionId:t,streamId:e})},current_task_entered:(t,e)=>{t>>>=0,e>>>=0;const s=y(new Uint8Array(o.instance.exports.memory.buffer),t,e);o.currentTask=s},current_task_exit:()=>{o.currentTask=null}},n=yield WebAssembly.instantiate(c,{smoldot:h});o.instance=n,o.instance.exports.init(r.maxLogLevel);const u=new Promise(t=>o.onShutdownExecutorOrWasmPanic=()=>t("stop"));return k(this,void 0,void 0,function*(){const t=r.cpuRateLimit;let e=0,s=r.performanceNow();for(;;){const a=new Promise(m=>o.advanceExecutionPromise=()=>m("ready"));if(!o.instance)break;o.instance.exports.advance_execution();const i=r.performanceNow(),l=i-s;s=i;const f=l*(1/t-1);if(e+=f,e>5){e>2147483646&&(e=2147483646);const m=new Promise(w=>setTimeout(()=>w("timeout"),e));if((yield Promise.race([m,u]))==="stop")break}if((yield Promise.race([a,u]))==="stop")break;const p=r.performanceNow();e-=p-s,e<-1e4&&(e=-1e4),s=p}o.instance&&d({ty:"executor-shutdown"})}),{request:(t,e)=>o.instance?(o.bufferIndices[0]=new TextEncoder().encode(t),o.instance.exports.json_rpc_send(0,e)>>>0):1,peekJsonRpcResponse:t=>{if(!o.instance)return null;const e=new Uint8Array(o.instance.exports.memory.buffer),s=o.instance.exports.json_rpc_responses_peek(t)>>>0,a=S(e,s)>>>0,i=S(e,s+4)>>>0;if(i!==0){const l=y(e,a,i);return o.instance.exports.json_rpc_responses_pop(t),l}else return null},addChain:(t,e,s,a,i,l)=>{if(!o.instance){d({ty:"add-chain-result",success:!1,error:"Smoldot has crashed"});return}console.assert(a||i!=0,"invalid jsonRpcMaxPendingRequests value passed to local-instance::addChain"),o.bufferIndices[0]=new TextEncoder().encode(t),o.bufferIndices[1]=new TextEncoder().encode(e);const f=new Uint8Array(s.length*4);for(let m=0;m<s.length;++m)P(f,m*4,s[m]);o.bufferIndices[2]=f;const p=o.instance.exports.add_chain(0,1,a?0:i,l,2);if(delete o.bufferIndices[0],delete o.bufferIndices[1],delete o.bufferIndices[2],o.instance.exports.chain_is_ok(p)!=0)d({ty:"add-chain-result",success:!0,chainId:p});else{const m=o.instance.exports.chain_error_len(p)>>>0,w=o.instance.exports.chain_error_ptr(p)>>>0,b=y(new Uint8Array(o.instance.exports.memory.buffer),w,m);o.instance.exports.remove_chain(p),d({ty:"add-chain-result",success:!1,error:b})}},removeChain:t=>{o.instance&&o.instance.exports.remove_chain(t)},shutdownExecutor:()=>{if(!o.instance)return;const t=o.onShutdownExecutorOrWasmPanic;o.onShutdownExecutorOrWasmPanic=()=>{},t()},connectionMultiStreamSetHandshakeInfo:(t,e)=>{if(!o.instance)return;const s=new Uint8Array(1+e.localTlsCertificateSha256.length);O(s,0,0),s.set(e.localTlsCertificateSha256,1),o.bufferIndices[0]=s,o.instance.exports.connection_multi_stream_set_handshake_info(t,0),delete o.bufferIndices[0]},connectionReset:(t,e)=>{o.instance&&(o.bufferIndices[0]=new TextEncoder().encode(e),o.instance.exports.connection_reset(t,0),delete o.bufferIndices[0])},streamWritableBytes:(t,e,s)=>{o.instance&&o.instance.exports.stream_writable_bytes(t,s||0,e)},streamMessage:(t,e,s)=>{o.instance&&(o.bufferIndices[0]=e,o.instance.exports.stream_message(t,s||0,0),delete o.bufferIndices[0])},streamOpened:(t,e,s)=>{o.instance&&o.instance.exports.connection_stream_opened(t,e,s==="outbound"?1:0)},streamReset:(t,e,s)=>{o.instance&&(o.bufferIndices[0]=new TextEncoder().encode(s),o.instance.exports.stream_reset(t,e,0),delete o.bufferIndices[0])}}})}var W=function(r,c,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(a){try{s(o.next(a))}catch(i){u(i)}}function e(a){try{s(o.throw(a))}catch(i){u(i)}}function s(a){a.done?n(a.value):h(a.value).then(t,e)}s((o=o.apply(r,c||[])).next())})};function U(r){return W(this,void 0,void 0,function*(){const{port1:c,port2:d}=new MessageChannel,o=r.portToServer,h={wasmModule:yield r.wasmModule,serverToClient:d,maxLogLevel:r.maxLogLevel,cpuRateLimit:r.cpuRateLimit,forbidWs:r.forbidWs,forbidWss:r.forbidWss,forbidNonLocalWs:r.forbidNonLocalWs,forbidTcp:r.forbidTcp,forbidWebRtc:r.forbidWebRtc};o.postMessage(h,[d]);const n={jsonRpcResponses:new Map,connections:new Map};return c.onmessage=u=>{const t=u.data;switch(t.ty){case"wasm-panic":case"executor-shutdown":{c.close(),o.close();break}case"add-chain-result":{if(t.success){n.jsonRpcResponses.set(t.chainId,new Array);const e={ty:"accept-more-json-rpc-answers",chainId:t.chainId};for(let s=0;s<10;++s)c.postMessage(e)}break}case"new-connection":{n.connections.set(t.connectionId,new Set);break}case"connection-reset":{if(!n.connections.has(t.connectionId))return;n.connections.delete(t.connectionId);break}case"connection-stream-open":{if(!n.connections.has(t.connectionId))return;break}case"connection-stream-reset":{if(!n.connections.has(t.connectionId)||!n.connections.get(t.connectionId).has(t.streamId))return;break}case"stream-send":{if(!n.connections.has(t.connectionId)||t.streamId&&!n.connections.get(t.connectionId).has(t.streamId))return;break}case"stream-send-close":{if(!n.connections.has(t.connectionId)||t.streamId&&!n.connections.get(t.connectionId).has(t.streamId))return;break}case"json-rpc-response":{const e=n.jsonRpcResponses.get(t.chainId);e&&(e.push(t.response),r.eventCallback({ty:"json-rpc-responses-non-empty",chainId:t.chainId}));return}}r.eventCallback(t)},{addChain(u,t,e,s,a,i){return W(this,void 0,void 0,function*(){const l={ty:"add-chain",chainSpec:u,databaseContent:t,potentialRelayChains:e,disableJsonRpc:s,jsonRpcMaxPendingRequests:a,jsonRpcMaxSubscriptions:i};c.postMessage(l)})},removeChain(u){n.jsonRpcResponses.delete(u);const t={ty:"remove-chain",chainId:u};c.postMessage(t)},request(u,t){const e={ty:"request",chainId:t,request:u};return c.postMessage(e),0},peekJsonRpcResponse(u){const t=n.jsonRpcResponses.get(u).shift();if(!t)return null;const e={ty:"accept-more-json-rpc-answers",chainId:u};return c.postMessage(e),t},shutdownExecutor(){const u={ty:"shutdown"};c.postMessage(u)},connectionReset(u,t){n.connections.delete(u);const e={ty:"connection-reset",connectionId:u,message:t};c.postMessage(e)},connectionMultiStreamSetHandshakeInfo(u,t){const e={ty:"connection-multistream-set-info",connectionId:u,info:t};c.postMessage(e)},streamMessage(u,t,e){const s={ty:"stream-message",connectionId:u,message:t,streamId:e};c.postMessage(s)},streamOpened(u,t,e){n.connections.get(u).add(t);const s={ty:"stream-opened",connectionId:u,streamId:t,direction:e};c.postMessage(s)},streamWritableBytes(u,t,e){const s={ty:"stream-writable-bytes",connectionId:u,numExtra:t,streamId:e};c.postMessage(s)},streamReset(u,t,e){n.connections.get(u).delete(t);const s={ty:"stream-reset",connectionId:u,streamId:t,message:e};c.postMessage(s)}}})}var _=function(r,c,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(a){try{s(o.next(a))}catch(i){u(i)}}function e(a){try{s(o.throw(a))}catch(i){u(i)}}function s(a){a.done?n(a.value):h(a.value).then(t,e)}s((o=o.apply(r,c||[])).next())})};function B(r,c,d){const o=r.logCallback||((e,s,a)=>{e<=1?console.error("[%s] %s",s,a):e==2?console.warn("[%s] %s",s,a):e==3?console.info("[%s] %s",s,a):e==4?console.debug("[%s] %s",s,a):console.trace("[%s] %s",s,a)});c instanceof Promise||(c=Promise.resolve(c));let h=r.cpuRateLimit||1;isNaN(h)&&(h=1),h>1&&(h=1),h<0&&(h=0);const n={instance:{status:"not-created"},chainIds:new WeakMap,connections:new Map,addChainResults:[],onExecutorShutdownOrWasmPanic:()=>{},chains:new Map},u=e=>{switch(e.ty){case"wasm-panic":{console.error("Smoldot has panicked"+(e.currentTask?" while executing task `"+e.currentTask+"`":"")+`. This is a bug in smoldot. Please open an issue at https://github.com/smol-dot/smoldot/issues with the following message:
`+e.message),n.instance={status:"destroyed",error:new M(e.message)},n.connections.forEach(a=>a.reset()),n.connections.clear();for(const a of n.addChainResults)a({success:!1,error:"Smoldot has crashed"});n.addChainResults=[];for(const a of Array.from(n.chains.values())){for(const i of a.jsonRpcResponsesPromises)i();a.jsonRpcResponsesPromises=[]}n.chains.clear();const s=n.onExecutorShutdownOrWasmPanic;n.onExecutorShutdownOrWasmPanic=()=>{},s();break}case"executor-shutdown":{const s=n.onExecutorShutdownOrWasmPanic;n.onExecutorShutdownOrWasmPanic=()=>{},s();break}case"log":{o(e.level,e.target,e.message);break}case"add-chain-result":{n.addChainResults.shift()(e);break}case"json-rpc-responses-non-empty":{const s=n.chains.get(e.chainId).jsonRpcResponsesPromises;for(;s.length!==0;)s.shift()();break}case"new-connection":{const s=e.connectionId;n.connections.set(s,d.connect({address:e.address,onConnectionReset(a){if(n.instance.status!=="ready")throw new Error;n.connections.delete(s),n.instance.instance.connectionReset(s,a)},onMessage(a,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamMessage(s,a,i)},onStreamOpened(a,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamOpened(s,a,i)},onMultistreamHandshakeInfo(a){if(n.instance.status!=="ready")throw new Error;n.instance.instance.connectionMultiStreamSetHandshakeInfo(s,a)},onWritableBytes(a,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamWritableBytes(s,a,i)},onStreamReset(a,i){if(n.instance.status!=="ready")throw new Error;n.instance.instance.streamReset(s,a,i)}}));break}case"connection-reset":{n.connections.get(e.connectionId).reset(),n.connections.delete(e.connectionId);break}case"connection-stream-open":{n.connections.get(e.connectionId).openOutSubstream();break}case"connection-stream-reset":{n.connections.get(e.connectionId).reset(e.streamId);break}case"stream-send":{n.connections.get(e.connectionId).send(e.data,e.streamId);break}case"stream-send-close":{n.connections.get(e.connectionId).closeSend(e.streamId);break}}},t=r.portToWorker;return t?n.instance={status:"not-ready",whenReady:U({wasmModule:c.then(e=>e.wasm),forbidTcp:r.forbidTcp||!1,forbidWs:r.forbidWs||!1,forbidNonLocalWs:r.forbidNonLocalWs||!1,forbidWss:r.forbidWss||!1,forbidWebRtc:r.forbidWebRtc||!1,maxLogLevel:r.maxLogLevel||3,cpuRateLimit:h,portToServer:t,eventCallback:u}).then(e=>{n.instance.status!=="destroyed"&&(n.instance={status:"ready",instance:e})})}:n.instance={status:"not-ready",whenReady:c.then(e=>j({forbidTcp:r.forbidTcp||!1,forbidWs:r.forbidWs||!1,forbidNonLocalWs:r.forbidNonLocalWs||!1,forbidWss:r.forbidWss||!1,forbidWebRtc:r.forbidWebRtc||!1,maxLogLevel:r.maxLogLevel||3,cpuRateLimit:h,envVars:[],performanceNow:d.performanceNow,getRandomValues:d.getRandomValues},e.wasm,u)).then(e=>{n.instance.status!=="destroyed"&&(n.instance={status:"ready",instance:e})})},{addChain:e=>_(this,void 0,void 0,function*(){if(n.instance.status==="not-ready"&&(yield n.instance.whenReady),n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status==="not-created"||n.instance.status==="not-ready")throw new Error;if(typeof e.chainSpec!="string")throw new Error("Chain specification must be a string");let s=[];if(e.potentialRelayChains)for(const w of e.potentialRelayChains){const b=n.chainIds.get(w);b!==void 0&&s.push(b)}let a=e.jsonRpcMaxPendingRequests===void 0?1/0:e.jsonRpcMaxPendingRequests;if(a=Math.floor(a),a<=0||isNaN(a))throw new g("Invalid value for `jsonRpcMaxPendingRequests`");a>4294967295&&(a=4294967295);let i=e.jsonRpcMaxSubscriptions===void 0?1/0:e.jsonRpcMaxSubscriptions;if(i=Math.floor(i),i<0||isNaN(i))throw new g("Invalid value for `jsonRpcMaxSubscriptions`");if(i>4294967295&&(i=4294967295),e.databaseContent!==void 0&&typeof e.databaseContent!="string")throw new g("`databaseContent` is not a string");const l=new Promise(w=>n.addChainResults.push(w));n.instance.instance.addChain(e.chainSpec,e.databaseContent||"",s,!!e.disableJsonRpc,a,i);const f=yield l;if(!f.success)throw new g(f.error);const p=f.chainId;n.chains.set(p,{jsonRpcResponsesPromises:new Array});const m={sendJsonRpc:w=>{if(n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;if(!n.chains.has(p))throw new I;if(e.disableJsonRpc)throw new E;const b=n.instance.instance.request(w,p);switch(b){case 0:break;case 1:throw new v;default:throw new Error("Internal error: unknown json_rpc_send error code: "+b)}},nextJsonRpcResponse:()=>_(this,void 0,void 0,function*(){for(;;){if(!n.chains.has(p))throw new I;if(e.disableJsonRpc)return Promise.reject(new E);if(n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;const w=n.instance.instance.peekJsonRpcResponse(p);if(w)return w;yield new Promise(b=>{n.chains.get(p).jsonRpcResponsesPromises.push(b)})}}),remove:()=>{if(n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;if(!n.chains.has(p))throw new I;console.assert(n.chainIds.has(m)),n.chainIds.delete(m);for(const w of n.chains.get(p).jsonRpcResponsesPromises)w();n.chains.delete(p),n.instance.instance.removeChain(p)}};return n.chainIds.set(m,p),m}),terminate:()=>_(this,void 0,void 0,function*(){if(n.instance.status==="not-ready"&&(yield n.instance.whenReady),n.instance.status==="destroyed")throw n.instance.error;if(n.instance.status!=="ready")throw new Error;n.instance.instance.shutdownExecutor(),yield new Promise(e=>n.onExecutorShutdownOrWasmPanic=e),n.instance.status==="ready"&&(n.instance={status:"destroyed",error:new I}),n.connections.forEach(e=>e.reset()),n.connections.clear();for(const e of n.addChainResults)e({success:!1,error:"Client.terminate() has been called"});n.addChainResults=[];for(const e of Array.from(n.chains.values())){for(const s of e.jsonRpcResponsesPromises)s();e.jsonRpcResponsesPromises=[]}n.chains.clear()})}}var T=function(r,c,d,o){function h(n){return n instanceof d?n:new d(function(u){u(n)})}return new(d||(d=Promise))(function(n,u){function t(a){try{s(o.next(a))}catch(i){u(i)}}function e(a){try{s(o.throw(a))}catch(i){u(i)}}function s(a){a.done?n(a.value):h(a.value).then(t,e)}s((o=o.apply(r,c||[])).next())})};function N(r){if(r.forbidTcp=!0,typeof isSecureContext=="boolean"&&isSecureContext&&typeof location!==void 0){const c=location.toString();c.indexOf("localhost")!==-1&&c.indexOf("127.0.0.1")!==-1&&c.indexOf("::1")!==-1&&(r.forbidNonLocalWs=!0)}return B(r,r.bytecode,{performanceNow:()=>performance.now(),getRandomValues:c=>{const d=globalThis.crypto;if(!d)throw new Error("randomness not available");if(c.buffer instanceof ArrayBuffer)d.getRandomValues(c);else{const o=new Uint8Array(c.length);d.getRandomValues(o),c.set(o)}},connect:c=>L(c)})}function L(r){if(r.address.ty==="websocket"){let c;try{c=new WebSocket(r.address.url)}catch(h){c=h instanceof Error?h.toString():"Exception thrown by new WebSocket"}const d={quenedUnreportedBytes:0,nextTimeout:10},o=()=>{if(!(c instanceof WebSocket)||c.readyState!=1)return;const h=c.bufferedAmount;let n=d.quenedUnreportedBytes-h;n<0&&(n=0),d.quenedUnreportedBytes-=n,d.quenedUnreportedBytes!=0&&(setTimeout(o,d.nextTimeout),d.nextTimeout*=2,d.nextTimeout>500&&(d.nextTimeout=500)),n!=0&&r.onWritableBytes(n)};return c instanceof WebSocket?(c.binaryType="arraybuffer",c.onopen=()=>{r.onWritableBytes(1024*1024)},c.onclose=h=>{const n="Error code "+h.code+(h.reason?": "+h.reason:"");r.onConnectionReset(n)},c.onmessage=h=>{r.onMessage(new Uint8Array(h.data))}):setTimeout(()=>{c&&!(c instanceof WebSocket)&&(r.onConnectionReset(c),c=null)},1),{reset:()=>{c instanceof WebSocket&&(c.onopen=null,c.onclose=null,c.onmessage=null,c.onerror=null,c.readyState==WebSocket.OPEN&&c.close()),c=null},send:h=>{d.quenedUnreportedBytes==0&&(d.nextTimeout=10,setTimeout(o,10));for(const n of h)d.quenedUnreportedBytes+=n.length;c.send(new Blob(h))},closeSend:()=>{throw new Error("Wrong connection type")},openOutSubstream:()=>{throw new Error("Wrong connection type")}}}else if(r.address.ty==="webrtc"){const{targetPort:c,ipVersion:d,targetIp:o,remoteTlsCertificateSha256:h}=r.address,n={pc:void 0,dataChannels:new Map,nextStreamId:0,isFirstOutSubstream:!0},u=()=>{if(!n.pc){console.assert(n.dataChannels.size===0,"substreams exist while pc is undef"),n.pc=null;return}n.pc.onconnectionstatechange=null,n.pc.onnegotiationneeded=null,n.pc.ondatachannel=null;for(const e of Array.from(n.dataChannels.values()))e.channel.onopen=null,e.channel.onerror=null,e.channel.onclose=null,e.channel.onbufferedamountlow=null,e.channel.onmessage=null;n.dataChannels.clear(),n.pc.close()},t=(e,s)=>{const a=n.nextStreamId;n.nextStreamId+=1,e.binaryType="arraybuffer";let i={value:!1};e.onopen=()=>{console.assert(!i.value,"substream opened twice"),i.value=!0,r.onStreamOpened(a,s),r.onWritableBytes(65536,a)},e.onerror=e.onclose=l=>{const f=l instanceof RTCErrorEvent?l.error.toString():"RTCDataChannel closed";i.value?(e.onopen=null,e.onerror=null,e.onclose=null,e.onbufferedamountlow=null,e.onmessage=null,n.dataChannels.delete(a),r.onStreamReset(a,f)):(u(),r.onConnectionReset("data channel failed to open: "+f))},e.onbufferedamountlow=()=>{const l=n.dataChannels.get(a),f=l.bufferedBytes;l.bufferedBytes=0,r.onWritableBytes(f,a)},e.onmessage=l=>{r.onMessage(new Uint8Array(l.data),a)},n.dataChannels.set(a,{channel:e,bufferedBytes:0})};return RTCPeerConnection.generateCertificate({name:"ECDSA",namedCurve:"P-256",hash:"SHA-256"}).then(e=>T(this,void 0,void 0,function*(){if(n.pc===null)return;if((o=="localhost"||o=="127.0.0.1"||o=="::1")&&navigator.userAgent.indexOf("Firefox")!==-1){u(),r.onConnectionReset("Firefox can't connect to a localhost WebRTC server");return}n.pc=new RTCPeerConnection({certificates:[e]});let s;if(e.getFingerprints){for(const{algorithm:i,value:l}of e.getFingerprints())if(i==="sha-256"){s=l;break}}else{const l=(yield n.pc.createOffer()).sdp.match(/a(\s*)=(\s*)fingerprint:(\s*)(sha|SHA)-256(\s*)(([a-fA-F0-9]{2}(:)*){32})/);l&&(s=l[6])}if(s===void 0){r.onConnectionReset("Failed to obtain the browser certificate fingerprint");return}let a=new Uint8Array(32);a.set(s.split(":").map(i=>parseInt(i,16)),0),n.pc.onconnectionstatechange=i=>{(n.pc.connectionState=="closed"||n.pc.connectionState=="disconnected"||n.pc.connectionState=="failed")&&(u(),r.onConnectionReset("WebRTC state transitioned to "+n.pc.connectionState))},n.pc.onnegotiationneeded=i=>T(this,void 0,void 0,function*(){var l;let f=(yield n.pc.createOffer()).sdp;f.match(/^m=application(\s+)(\d+)(\s+)UDP\/DTLS\/SCTP(\s+)webrtc-datachannel$/m)===null&&console.error("Local offer doesn't contain UDP data channel. WebRTC connections will likely fail. Please report this issue.");const p=(l=f.match(/^a=ice-pwd:(.+)$/m))===null||l===void 0?void 0:l.at(1);p===void 0&&console.error("Failed to set ufrag to pwd. WebRTC connections will likely fail. Please report this issue.");const m="libp2p+webrtc+v1/"+p;f=f.replace(/^a=ice-ufrag.*$/m,"a=ice-ufrag:"+m),f=f.replace(/^a=ice-pwd.*$/m,"a=ice-pwd:"+m),yield n.pc.setLocalDescription({type:"offer",sdp:f});const w=Array.from(h).map(C=>("0"+C.toString(16)).slice(-2).toUpperCase()).join(":"),b=`v=0
o=- 0 0 IN IP`+d+" "+o+`
s=-
t=0 0
a=ice-lite
m=application `+String(c)+` UDP/DTLS/SCTP webrtc-datachannel
c=IN IP`+d+" "+o+`
a=mid:0
a=ice-options:ice2
a=ice-ufrag:`+m+`
a=ice-pwd:`+m+`
a=fingerprint:sha-256 `+w+`
a=setup:passive
a=sctp-port:5000
a=max-message-size:16384
a=candidate:1 1 UDP 1 `+o+" "+String(c)+` typ host
`;yield n.pc.setRemoteDescription({type:"answer",sdp:b})}),n.pc.ondatachannel=({channel:i})=>{t(i,"inbound")},r.onMultistreamHandshakeInfo({handshake:"webrtc",localTlsCertificateSha256:a})})),{reset:e=>{if(e===void 0)u();else{const s=n.dataChannels.get(e);s.channel.onopen=null,s.channel.onerror=null,s.channel.onclose=null,s.channel.onbufferedamountlow=null,s.channel.onmessage=null,s.channel.close(),n.dataChannels.delete(e)}},send:(e,s)=>{const a=n.dataChannels.get(s);for(const i of e)a.bufferedBytes+=i.length;a.channel.send(new Blob(e))},closeSend:()=>{throw new Error("Wrong connection type")},openOutSubstream:()=>{const e=n.isFirstOutSubstream?{negotiated:!0,id:0}:{};n.isFirstOutSubstream=!1,t(n.pc.createDataChannel("",e),"outbound")}}}else throw new Error}export{g as AddChainError,I as AlreadyDestroyedError,M as CrashError,E as JsonRpcDisabledError,v as QueueFullError,N as startWithBytecode};
