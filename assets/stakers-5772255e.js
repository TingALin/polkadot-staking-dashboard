(function(){"use strict";var ve=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,he=Math.ceil,Z=Math.floor,X="[BigNumber Error] ",me=X+"Number primitive has more than 15 significant digits: ",j=1e14,E=14,pe=9007199254740991,ge=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],te=1e7,L=1e9;function Ee(g){var w,v,O,p=h.prototype={constructor:h,toString:null,valueOf:null},B=new h(1),A=20,S=4,y=-7,C=21,T=-1e7,I=1e7,b=!1,z=1,F=0,D={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},H="0123456789abcdefghijklmnopqrstuvwxyz",Y=!0;function h(e,r){var n,l,i,s,c,t,o,u,f=this;if(!(f instanceof h))return new h(e,r);if(r==null){if(e&&e._isBigNumber===!0){f.s=e.s,!e.c||e.e>I?f.c=f.e=null:e.e<T?f.c=[f.e=0]:(f.e=e.e,f.c=e.c.slice());return}if((t=typeof e=="number")&&e*0==0){if(f.s=1/e<0?(e=-e,-1):1,e===~~e){for(s=0,c=e;c>=10;c/=10,s++);s>I?f.c=f.e=null:(f.e=s,f.c=[e]);return}u=String(e)}else{if(!ve.test(u=String(e)))return O(f,u,t);f.s=u.charCodeAt(0)==45?(u=u.slice(1),-1):1}(s=u.indexOf("."))>-1&&(u=u.replace(".","")),(c=u.search(/e/i))>0?(s<0&&(s=c),s+=+u.slice(c+1),u=u.substring(0,c)):s<0&&(s=u.length)}else{if(_(r,2,H.length,"Base"),r==10&&Y)return f=new h(e),U(f,A+f.e+1,S);if(u=String(e),t=typeof e=="number"){if(e*0!=0)return O(f,u,t,r);if(f.s=1/e<0?(u=u.slice(1),-1):1,h.DEBUG&&u.replace(/^0\.0*|\./,"").length>15)throw Error(me+e)}else f.s=u.charCodeAt(0)===45?(u=u.slice(1),-1):1;for(n=H.slice(0,r),s=c=0,o=u.length;c<o;c++)if(n.indexOf(l=u.charAt(c))<0){if(l=="."){if(c>s){s=o;continue}}else if(!i&&(u==u.toUpperCase()&&(u=u.toLowerCase())||u==u.toLowerCase()&&(u=u.toUpperCase()))){i=!0,c=-1,s=0;continue}return O(f,String(e),t,r)}t=!1,u=v(u,r,10,f.s),(s=u.indexOf("."))>-1?u=u.replace(".",""):s=u.length}for(c=0;u.charCodeAt(c)===48;c++);for(o=u.length;u.charCodeAt(--o)===48;);if(u=u.slice(c,++o)){if(o-=c,t&&h.DEBUG&&o>15&&(e>pe||e!==Z(e)))throw Error(me+f.s*e);if((s=s-c-1)>I)f.c=f.e=null;else if(s<T)f.c=[f.e=0];else{if(f.e=s,f.c=[],c=(s+1)%E,s<0&&(c+=E),c<o){for(c&&f.c.push(+u.slice(0,c)),o-=E;c<o;)f.c.push(+u.slice(c,c+=E));c=E-(u=u.slice(c)).length}else c-=o;for(;c--;u+="0");f.c.push(+u)}}else f.c=[f.e=0]}h.clone=Ee,h.ROUND_UP=0,h.ROUND_DOWN=1,h.ROUND_CEIL=2,h.ROUND_FLOOR=3,h.ROUND_HALF_UP=4,h.ROUND_HALF_DOWN=5,h.ROUND_HALF_EVEN=6,h.ROUND_HALF_CEIL=7,h.ROUND_HALF_FLOOR=8,h.EUCLID=9,h.config=h.set=function(e){var r,n;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(r="DECIMAL_PLACES")&&(n=e[r],_(n,0,L,r),A=n),e.hasOwnProperty(r="ROUNDING_MODE")&&(n=e[r],_(n,0,8,r),S=n),e.hasOwnProperty(r="EXPONENTIAL_AT")&&(n=e[r],n&&n.pop?(_(n[0],-L,0,r),_(n[1],0,L,r),y=n[0],C=n[1]):(_(n,-L,L,r),y=-(C=n<0?-n:n))),e.hasOwnProperty(r="RANGE"))if(n=e[r],n&&n.pop)_(n[0],-L,-1,r),_(n[1],1,L,r),T=n[0],I=n[1];else if(_(n,-L,L,r),n)T=-(I=n<0?-n:n);else throw Error(X+r+" cannot be zero: "+n);if(e.hasOwnProperty(r="CRYPTO"))if(n=e[r],n===!!n)if(n)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))b=n;else throw b=!n,Error(X+"crypto unavailable");else b=n;else throw Error(X+r+" not true or false: "+n);if(e.hasOwnProperty(r="MODULO_MODE")&&(n=e[r],_(n,0,9,r),z=n),e.hasOwnProperty(r="POW_PRECISION")&&(n=e[r],_(n,0,L,r),F=n),e.hasOwnProperty(r="FORMAT"))if(n=e[r],typeof n=="object")D=n;else throw Error(X+r+" not an object: "+n);if(e.hasOwnProperty(r="ALPHABET"))if(n=e[r],typeof n=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(n))Y=n.slice(0,10)=="0123456789",H=n;else throw Error(X+r+" invalid: "+n)}else throw Error(X+"Object expected: "+e);return{DECIMAL_PLACES:A,ROUNDING_MODE:S,EXPONENTIAL_AT:[y,C],RANGE:[T,I],CRYPTO:b,MODULO_MODE:z,POW_PRECISION:F,FORMAT:D,ALPHABET:H}},h.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!h.DEBUG)return!0;var r,n,l=e.c,i=e.e,s=e.s;e:if({}.toString.call(l)=="[object Array]"){if((s===1||s===-1)&&i>=-L&&i<=L&&i===Z(i)){if(l[0]===0){if(i===0&&l.length===1)return!0;break e}if(r=(i+1)%E,r<1&&(r+=E),String(l[0]).length==r){for(r=0;r<l.length;r++)if(n=l[r],n<0||n>=j||n!==Z(n))break e;if(n!==0)return!0}}}else if(l===null&&i===null&&(s===null||s===1||s===-1))return!0;throw Error(X+"Invalid BigNumber: "+e)},h.maximum=h.max=function(){return fe(arguments,-1)},h.minimum=h.min=function(){return fe(arguments,1)},h.random=function(){var e=9007199254740992,r=Math.random()*e&2097151?function(){return Z(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(n){var l,i,s,c,t,o=0,u=[],f=new h(B);if(n==null?n=A:_(n,0,L),c=he(n/E),b)if(crypto.getRandomValues){for(l=crypto.getRandomValues(new Uint32Array(c*=2));o<c;)t=l[o]*131072+(l[o+1]>>>11),t>=9e15?(i=crypto.getRandomValues(new Uint32Array(2)),l[o]=i[0],l[o+1]=i[1]):(u.push(t%1e14),o+=2);o=c/2}else if(crypto.randomBytes){for(l=crypto.randomBytes(c*=7);o<c;)t=(l[o]&31)*281474976710656+l[o+1]*1099511627776+l[o+2]*4294967296+l[o+3]*16777216+(l[o+4]<<16)+(l[o+5]<<8)+l[o+6],t>=9e15?crypto.randomBytes(7).copy(l,o):(u.push(t%1e14),o+=7);o=c/7}else throw b=!1,Error(X+"crypto unavailable");if(!b)for(;o<c;)t=r(),t<9e15&&(u[o++]=t%1e14);for(c=u[--o],n%=E,c&&n&&(t=ge[E-n],u[o]=Z(c/t)*t);u[o]===0;u.pop(),o--);if(o<0)u=[s=0];else{for(s=-1;u[0]===0;u.splice(0,1),s-=E);for(o=1,t=u[0];t>=10;t/=10,o++);o<E&&(s-=E-o)}return f.e=s,f.c=u,f}}(),h.sum=function(){for(var e=1,r=arguments,n=new h(r[0]);e<r.length;)n=n.plus(r[e++]);return n},v=function(){var e="0123456789";function r(n,l,i,s){for(var c,t=[0],o,u=0,f=n.length;u<f;){for(o=t.length;o--;t[o]*=l);for(t[0]+=s.indexOf(n.charAt(u++)),c=0;c<t.length;c++)t[c]>i-1&&(t[c+1]==null&&(t[c+1]=0),t[c+1]+=t[c]/i|0,t[c]%=i)}return t.reverse()}return function(n,l,i,s,c){var t,o,u,f,a,d,m,x,M=n.indexOf("."),P=A,N=S;for(M>=0&&(f=F,F=0,n=n.replace(".",""),x=new h(l),d=x.pow(n.length-M),F=f,x.c=r(ne(Q(d.c),d.e,"0"),10,i,e),x.e=x.c.length),m=r(n,l,i,c?(t=H,e):(t=e,H)),u=f=m.length;m[--f]==0;m.pop());if(!m[0])return t.charAt(0);if(M<0?--u:(d.c=m,d.e=u,d.s=s,d=w(d,x,P,N,i),m=d.c,a=d.r,u=d.e),o=u+P+1,M=m[o],f=i/2,a=a||o<0||m[o+1]!=null,a=N<4?(M!=null||a)&&(N==0||N==(d.s<0?3:2)):M>f||M==f&&(N==4||a||N==6&&m[o-1]&1||N==(d.s<0?8:7)),o<1||!m[0])n=a?ne(t.charAt(1),-P,t.charAt(0)):t.charAt(0);else{if(m.length=o,a)for(--i;++m[--o]>i;)m[o]=0,o||(++u,m=[1].concat(m));for(f=m.length;!m[--f];);for(M=0,n="";M<=f;n+=t.charAt(m[M++]));n=ne(n,u,t.charAt(0))}return n}}(),w=function(){function e(l,i,s){var c,t,o,u,f=0,a=l.length,d=i%te,m=i/te|0;for(l=l.slice();a--;)o=l[a]%te,u=l[a]/te|0,c=m*o+u*d,t=d*o+c%te*te+f,f=(t/s|0)+(c/te|0)+m*u,l[a]=t%s;return f&&(l=[f].concat(l)),l}function r(l,i,s,c){var t,o;if(s!=c)o=s>c?1:-1;else for(t=o=0;t<s;t++)if(l[t]!=i[t]){o=l[t]>i[t]?1:-1;break}return o}function n(l,i,s,c){for(var t=0;s--;)l[s]-=t,t=l[s]<i[s]?1:0,l[s]=t*c+l[s]-i[s];for(;!l[0]&&l.length>1;l.splice(0,1));}return function(l,i,s,c,t){var o,u,f,a,d,m,x,M,P,N,R,V,ae,we,de,re,le,K=l.s==i.s?1:-1,$=l.c,k=i.c;if(!$||!$[0]||!k||!k[0])return new h(!l.s||!i.s||($?k&&$[0]==k[0]:!k)?NaN:$&&$[0]==0||!k?K*0:K/0);for(M=new h(K),P=M.c=[],u=l.e-i.e,K=s+u+1,t||(t=j,u=J(l.e/E)-J(i.e/E),K=K/E|0),f=0;k[f]==($[f]||0);f++);if(k[f]>($[f]||0)&&u--,K<0)P.push(1),a=!0;else{for(we=$.length,re=k.length,f=0,K+=2,d=Z(t/(k[0]+1)),d>1&&(k=e(k,d,t),$=e($,d,t),re=k.length,we=$.length),ae=re,N=$.slice(0,re),R=N.length;R<re;N[R++]=0);le=k.slice(),le=[0].concat(le),de=k[0],k[1]>=t/2&&de++;do{if(d=0,o=r(k,N,re,R),o<0){if(V=N[0],re!=R&&(V=V*t+(N[1]||0)),d=Z(V/de),d>1)for(d>=t&&(d=t-1),m=e(k,d,t),x=m.length,R=N.length;r(m,N,x,R)==1;)d--,n(m,re<x?le:k,x,t),x=m.length,o=1;else d==0&&(o=d=1),m=k.slice(),x=m.length;if(x<R&&(m=[0].concat(m)),n(N,m,R,t),R=N.length,o==-1)for(;r(k,N,re,R)<1;)d++,n(N,re<R?le:k,R,t),R=N.length}else o===0&&(d++,N=[0]);P[f++]=d,N[0]?N[R++]=$[ae]||0:(N=[$[ae]],R=1)}while((ae++<we||N[0]!=null)&&K--);a=N[0]!=null,P[0]||P.splice(0,1)}if(t==j){for(f=1,K=P[0];K>=10;K/=10,f++);U(M,s+(M.e=f+u*E-1)+1,c,a)}else M.e=u,M.r=+a;return M}}();function se(e,r,n,l){var i,s,c,t,o;if(n==null?n=S:_(n,0,8),!e.c)return e.toString();if(i=e.c[0],c=e.e,r==null)o=Q(e.c),o=l==1||l==2&&(c<=y||c>=C)?ce(o,c):ne(o,c,"0");else if(e=U(new h(e),r,n),s=e.e,o=Q(e.c),t=o.length,l==1||l==2&&(r<=s||s<=y)){for(;t<r;o+="0",t++);o=ce(o,s)}else if(r-=c,o=ne(o,s,"0"),s+1>t){if(--r>0)for(o+=".";r--;o+="0");}else if(r+=s-t,r>0)for(s+1==t&&(o+=".");r--;o+="0");return e.s<0&&i?"-"+o:o}function fe(e,r){for(var n,l,i=1,s=new h(e[0]);i<e.length;i++)l=new h(e[i]),(!l.s||(n=ie(s,l))===r||n===0&&s.s===r)&&(s=l);return s}function ee(e,r,n){for(var l=1,i=r.length;!r[--i];r.pop());for(i=r[0];i>=10;i/=10,l++);return(n=l+n*E-1)>I?e.c=e.e=null:n<T?e.c=[e.e=0]:(e.e=n,e.c=r),e}O=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,r=/^([^.]+)\.$/,n=/^\.([^.]+)$/,l=/^-?(Infinity|NaN)$/,i=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(s,c,t,o){var u,f=t?c:c.replace(i,"");if(l.test(f))s.s=isNaN(f)?null:f<0?-1:1;else{if(!t&&(f=f.replace(e,function(a,d,m){return u=(m=m.toLowerCase())=="x"?16:m=="b"?2:8,!o||o==u?d:a}),o&&(u=o,f=f.replace(r,"$1").replace(n,"0.$1")),c!=f))return new h(f,u);if(h.DEBUG)throw Error(X+"Not a"+(o?" base "+o:"")+" number: "+c);s.s=null}s.c=s.e=null}}();function U(e,r,n,l){var i,s,c,t,o,u,f,a=e.c,d=ge;if(a){e:{for(i=1,t=a[0];t>=10;t/=10,i++);if(s=r-i,s<0)s+=E,c=r,o=a[u=0],f=Z(o/d[i-c-1]%10);else if(u=he((s+1)/E),u>=a.length)if(l){for(;a.length<=u;a.push(0));o=f=0,i=1,s%=E,c=s-E+1}else break e;else{for(o=t=a[u],i=1;t>=10;t/=10,i++);s%=E,c=s-E+i,f=c<0?0:Z(o/d[i-c-1]%10)}if(l=l||r<0||a[u+1]!=null||(c<0?o:o%d[i-c-1]),l=n<4?(f||l)&&(n==0||n==(e.s<0?3:2)):f>5||f==5&&(n==4||l||n==6&&(s>0?c>0?o/d[i-c]:0:a[u-1])%10&1||n==(e.s<0?8:7)),r<1||!a[0])return a.length=0,l?(r-=e.e+1,a[0]=d[(E-r%E)%E],e.e=-r||0):a[0]=e.e=0,e;if(s==0?(a.length=u,t=1,u--):(a.length=u+1,t=d[E-s],a[u]=c>0?Z(o/d[i-c]%d[c])*t:0),l)for(;;)if(u==0){for(s=1,c=a[0];c>=10;c/=10,s++);for(c=a[0]+=t,t=1;c>=10;c/=10,t++);s!=t&&(e.e++,a[0]==j&&(a[0]=1));break}else{if(a[u]+=t,a[u]!=j)break;a[u--]=0,t=1}for(s=a.length;a[--s]===0;a.pop());}e.e>I?e.c=e.e=null:e.e<T&&(e.c=[e.e=0])}return e}function q(e){var r,n=e.e;return n===null?e.toString():(r=Q(e.c),r=n<=y||n>=C?ce(r,n):ne(r,n,"0"),e.s<0?"-"+r:r)}return p.absoluteValue=p.abs=function(){var e=new h(this);return e.s<0&&(e.s=1),e},p.comparedTo=function(e,r){return ie(this,new h(e,r))},p.decimalPlaces=p.dp=function(e,r){var n,l,i,s=this;if(e!=null)return _(e,0,L),r==null?r=S:_(r,0,8),U(new h(s),e+s.e+1,r);if(!(n=s.c))return null;if(l=((i=n.length-1)-J(this.e/E))*E,i=n[i])for(;i%10==0;i/=10,l--);return l<0&&(l=0),l},p.dividedBy=p.div=function(e,r){return w(this,new h(e,r),A,S)},p.dividedToIntegerBy=p.idiv=function(e,r){return w(this,new h(e,r),0,1)},p.exponentiatedBy=p.pow=function(e,r){var n,l,i,s,c,t,o,u,f,a=this;if(e=new h(e),e.c&&!e.isInteger())throw Error(X+"Exponent not an integer: "+q(e));if(r!=null&&(r=new h(r)),t=e.e>14,!a.c||!a.c[0]||a.c[0]==1&&!a.e&&a.c.length==1||!e.c||!e.c[0])return f=new h(Math.pow(+q(a),t?e.s*(2-ue(e)):+q(e))),r?f.mod(r):f;if(o=e.s<0,r){if(r.c?!r.c[0]:!r.s)return new h(NaN);l=!o&&a.isInteger()&&r.isInteger(),l&&(a=a.mod(r))}else{if(e.e>9&&(a.e>0||a.e<-1||(a.e==0?a.c[0]>1||t&&a.c[1]>=24e7:a.c[0]<8e13||t&&a.c[0]<=9999975e7)))return s=a.s<0&&ue(e)?-0:0,a.e>-1&&(s=1/s),new h(o?1/s:s);F&&(s=he(F/E+2))}for(t?(n=new h(.5),o&&(e.s=1),u=ue(e)):(i=Math.abs(+q(e)),u=i%2),f=new h(B);;){if(u){if(f=f.times(a),!f.c)break;s?f.c.length>s&&(f.c.length=s):l&&(f=f.mod(r))}if(i){if(i=Z(i/2),i===0)break;u=i%2}else if(e=e.times(n),U(e,e.e+1,1),e.e>14)u=ue(e);else{if(i=+q(e),i===0)break;u=i%2}a=a.times(a),s?a.c&&a.c.length>s&&(a.c.length=s):l&&(a=a.mod(r))}return l?f:(o&&(f=B.div(f)),r?f.mod(r):s?U(f,F,S,c):f)},p.integerValue=function(e){var r=new h(this);return e==null?e=S:_(e,0,8),U(r,r.e+1,e)},p.isEqualTo=p.eq=function(e,r){return ie(this,new h(e,r))===0},p.isFinite=function(){return!!this.c},p.isGreaterThan=p.gt=function(e,r){return ie(this,new h(e,r))>0},p.isGreaterThanOrEqualTo=p.gte=function(e,r){return(r=ie(this,new h(e,r)))===1||r===0},p.isInteger=function(){return!!this.c&&J(this.e/E)>this.c.length-2},p.isLessThan=p.lt=function(e,r){return ie(this,new h(e,r))<0},p.isLessThanOrEqualTo=p.lte=function(e,r){return(r=ie(this,new h(e,r)))===-1||r===0},p.isNaN=function(){return!this.s},p.isNegative=function(){return this.s<0},p.isPositive=function(){return this.s>0},p.isZero=function(){return!!this.c&&this.c[0]==0},p.minus=function(e,r){var n,l,i,s,c=this,t=c.s;if(e=new h(e,r),r=e.s,!t||!r)return new h(NaN);if(t!=r)return e.s=-r,c.plus(e);var o=c.e/E,u=e.e/E,f=c.c,a=e.c;if(!o||!u){if(!f||!a)return f?(e.s=-r,e):new h(a?c:NaN);if(!f[0]||!a[0])return a[0]?(e.s=-r,e):new h(f[0]?c:S==3?-0:0)}if(o=J(o),u=J(u),f=f.slice(),t=o-u){for((s=t<0)?(t=-t,i=f):(u=o,i=a),i.reverse(),r=t;r--;i.push(0));i.reverse()}else for(l=(s=(t=f.length)<(r=a.length))?t:r,t=r=0;r<l;r++)if(f[r]!=a[r]){s=f[r]<a[r];break}if(s&&(i=f,f=a,a=i,e.s=-e.s),r=(l=a.length)-(n=f.length),r>0)for(;r--;f[n++]=0);for(r=j-1;l>t;){if(f[--l]<a[l]){for(n=l;n&&!f[--n];f[n]=r);--f[n],f[l]+=j}f[l]-=a[l]}for(;f[0]==0;f.splice(0,1),--u);return f[0]?ee(e,f,u):(e.s=S==3?-1:1,e.c=[e.e=0],e)},p.modulo=p.mod=function(e,r){var n,l,i=this;return e=new h(e,r),!i.c||!e.s||e.c&&!e.c[0]?new h(NaN):!e.c||i.c&&!i.c[0]?new h(i):(z==9?(l=e.s,e.s=1,n=w(i,e,0,3),e.s=l,n.s*=l):n=w(i,e,0,z),e=i.minus(n.times(e)),!e.c[0]&&z==1&&(e.s=i.s),e)},p.multipliedBy=p.times=function(e,r){var n,l,i,s,c,t,o,u,f,a,d,m,x,M,P,N=this,R=N.c,V=(e=new h(e,r)).c;if(!R||!V||!R[0]||!V[0])return!N.s||!e.s||R&&!R[0]&&!V||V&&!V[0]&&!R?e.c=e.e=e.s=null:(e.s*=N.s,!R||!V?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(l=J(N.e/E)+J(e.e/E),e.s*=N.s,o=R.length,a=V.length,o<a&&(x=R,R=V,V=x,i=o,o=a,a=i),i=o+a,x=[];i--;x.push(0));for(M=j,P=te,i=a;--i>=0;){for(n=0,d=V[i]%P,m=V[i]/P|0,c=o,s=i+c;s>i;)u=R[--c]%P,f=R[c]/P|0,t=m*u+f*d,u=d*u+t%P*P+x[s]+n,n=(u/M|0)+(t/P|0)+m*f,x[s--]=u%M;x[s]=n}return n?++l:x.splice(0,1),ee(e,x,l)},p.negated=function(){var e=new h(this);return e.s=-e.s||null,e},p.plus=function(e,r){var n,l=this,i=l.s;if(e=new h(e,r),r=e.s,!i||!r)return new h(NaN);if(i!=r)return e.s=-r,l.minus(e);var s=l.e/E,c=e.e/E,t=l.c,o=e.c;if(!s||!c){if(!t||!o)return new h(i/0);if(!t[0]||!o[0])return o[0]?e:new h(t[0]?l:i*0)}if(s=J(s),c=J(c),t=t.slice(),i=s-c){for(i>0?(c=s,n=o):(i=-i,n=t),n.reverse();i--;n.push(0));n.reverse()}for(i=t.length,r=o.length,i-r<0&&(n=o,o=t,t=n,r=i),i=0;r;)i=(t[--r]=t[r]+o[r]+i)/j|0,t[r]=j===t[r]?0:t[r]%j;return i&&(t=[i].concat(t),++c),ee(e,t,c)},p.precision=p.sd=function(e,r){var n,l,i,s=this;if(e!=null&&e!==!!e)return _(e,1,L),r==null?r=S:_(r,0,8),U(new h(s),e,r);if(!(n=s.c))return null;if(i=n.length-1,l=i*E+1,i=n[i]){for(;i%10==0;i/=10,l--);for(i=n[0];i>=10;i/=10,l++);}return e&&s.e+1>l&&(l=s.e+1),l},p.shiftedBy=function(e){return _(e,-pe,pe),this.times("1e"+e)},p.squareRoot=p.sqrt=function(){var e,r,n,l,i,s=this,c=s.c,t=s.s,o=s.e,u=A+4,f=new h("0.5");if(t!==1||!c||!c[0])return new h(!t||t<0&&(!c||c[0])?NaN:c?s:1/0);if(t=Math.sqrt(+q(s)),t==0||t==1/0?(r=Q(c),(r.length+o)%2==0&&(r+="0"),t=Math.sqrt(+r),o=J((o+1)/2)-(o<0||o%2),t==1/0?r="5e"+o:(r=t.toExponential(),r=r.slice(0,r.indexOf("e")+1)+o),n=new h(r)):n=new h(t+""),n.c[0]){for(o=n.e,t=o+u,t<3&&(t=0);;)if(i=n,n=f.times(i.plus(w(s,i,u,1))),Q(i.c).slice(0,t)===(r=Q(n.c)).slice(0,t))if(n.e<o&&--t,r=r.slice(t-3,t+1),r=="9999"||!l&&r=="4999"){if(!l&&(U(i,i.e+A+2,0),i.times(i).eq(s))){n=i;break}u+=4,t+=4,l=1}else{(!+r||!+r.slice(1)&&r.charAt(0)=="5")&&(U(n,n.e+A+2,1),e=!n.times(n).eq(s));break}}return U(n,n.e+A+1,S,e)},p.toExponential=function(e,r){return e!=null&&(_(e,0,L),e++),se(this,e,r,1)},p.toFixed=function(e,r){return e!=null&&(_(e,0,L),e=e+this.e+1),se(this,e,r)},p.toFormat=function(e,r,n){var l,i=this;if(n==null)e!=null&&r&&typeof r=="object"?(n=r,r=null):e&&typeof e=="object"?(n=e,e=r=null):n=D;else if(typeof n!="object")throw Error(X+"Argument not an object: "+n);if(l=i.toFixed(e,r),i.c){var s,c=l.split("."),t=+n.groupSize,o=+n.secondaryGroupSize,u=n.groupSeparator||"",f=c[0],a=c[1],d=i.s<0,m=d?f.slice(1):f,x=m.length;if(o&&(s=t,t=o,o=s,x-=s),t>0&&x>0){for(s=x%t||t,f=m.substr(0,s);s<x;s+=t)f+=u+m.substr(s,t);o>0&&(f+=u+m.slice(s)),d&&(f="-"+f)}l=a?f+(n.decimalSeparator||"")+((o=+n.fractionGroupSize)?a.replace(new RegExp("\\d{"+o+"}\\B","g"),"$&"+(n.fractionGroupSeparator||"")):a):f}return(n.prefix||"")+l+(n.suffix||"")},p.toFraction=function(e){var r,n,l,i,s,c,t,o,u,f,a,d,m=this,x=m.c;if(e!=null&&(t=new h(e),!t.isInteger()&&(t.c||t.s!==1)||t.lt(B)))throw Error(X+"Argument "+(t.isInteger()?"out of range: ":"not an integer: ")+q(t));if(!x)return new h(m);for(r=new h(B),u=n=new h(B),l=o=new h(B),d=Q(x),s=r.e=d.length-m.e-1,r.c[0]=ge[(c=s%E)<0?E+c:c],e=!e||t.comparedTo(r)>0?s>0?r:u:t,c=I,I=1/0,t=new h(d),o.c[0]=0;f=w(t,r,0,1),i=n.plus(f.times(l)),i.comparedTo(e)!=1;)n=l,l=i,u=o.plus(f.times(i=u)),o=i,r=t.minus(f.times(i=r)),t=i;return i=w(e.minus(n),l,0,1),o=o.plus(i.times(u)),n=n.plus(i.times(l)),o.s=u.s=m.s,s=s*2,a=w(u,l,s,S).minus(m).abs().comparedTo(w(o,n,s,S).minus(m).abs())<1?[u,l]:[o,n],I=c,a},p.toNumber=function(){return+q(this)},p.toPrecision=function(e,r){return e!=null&&_(e,1,L),se(this,e,r,2)},p.toString=function(e){var r,n=this,l=n.s,i=n.e;return i===null?l?(r="Infinity",l<0&&(r="-"+r)):r="NaN":(e==null?r=i<=y||i>=C?ce(Q(n.c),i):ne(Q(n.c),i,"0"):e===10&&Y?(n=U(new h(n),A+i+1,S),r=ne(Q(n.c),n.e,"0")):(_(e,2,H.length,"Base"),r=v(ne(Q(n.c),i,"0"),10,e,l,!0)),l<0&&n.c[0]&&(r="-"+r)),r},p.valueOf=p.toJSON=function(){return q(this)},p._isBigNumber=!0,p[Symbol.toStringTag]="BigNumber",p[Symbol.for("nodejs.util.inspect.custom")]=p.valueOf,g!=null&&h.set(g),h}function J(g){var w=g|0;return g>0||g===w?w:w-1}function Q(g){for(var w,v,O=1,p=g.length,B=g[0]+"";O<p;){for(w=g[O++]+"",v=E-w.length;v--;w="0"+w);B+=w}for(p=B.length;B.charCodeAt(--p)===48;);return B.slice(0,p+1||1)}function ie(g,w){var v,O,p=g.c,B=w.c,A=g.s,S=w.s,y=g.e,C=w.e;if(!A||!S)return null;if(v=p&&!p[0],O=B&&!B[0],v||O)return v?O?0:-S:A;if(A!=S)return A;if(v=A<0,O=y==C,!p||!B)return O?0:!p^v?1:-1;if(!O)return y>C^v?1:-1;for(S=(y=p.length)<(C=B.length)?y:C,A=0;A<S;A++)if(p[A]!=B[A])return p[A]>B[A]^v?1:-1;return y==C?0:y>C^v?1:-1}function _(g,w,v,O){if(g<w||g>v||g!==Z(g))throw Error(X+(O||"Argument")+(typeof g=="number"?g<w||g>v?" out of range: ":" not an integer: ":" not a primitive number: ")+String(g))}function ue(g){var w=g.c.length-1;return J(g.e/E)==w&&g.c[w]%2!=0}function ce(g,w){return(g.length>1?g.charAt(0)+"."+g.slice(1):g)+(w<0?"e":"e+")+w}function ne(g,w,v){var O,p;if(w<0){for(p=v+".";++w;p+=v);g=p+g}else if(O=g.length,++w>O){for(p=v,w-=O;--w;p+=v);g+=p}else w<O&&(g=g.slice(0,w)+"."+g.slice(w));return g}var W=Ee();typeof SuppressedError=="function"&&SuppressedError;/* @license Copyright 2023 @paritytech/polkadot-cloud authors & contributors
SPDX-License-Identifier: GPL-3.0-only */var Oe;(function(g){g.GIBBERISH="Input is not correct. Use numbers, floats or expression (e.g. 1k, 1.3m)",g.ZERO="You cannot send 0 funds",g.SUCCESS="",g.SYMBOL_ERROR="Provided symbol is not correct",g.GENERAL_ERROR="Check your input. Something went wrong"})(Oe||(Oe={}));var Ne=function(g,w){return new W(g.dividedBy(new W(10).exponentiatedBy(w)).toFixed(w))},oe=function(g){return g.replace(/,/g,"")},G=function(g){return new W(10).pow(new W(g))},xe=[{value:G(24),symbol:"y",isMil:!0},{value:G(21),symbol:"z",isMil:!0},{value:G(18),symbol:"a",isMil:!0},{value:G(15),symbol:"f",isMil:!0},{value:G(12),symbol:"p",isMil:!0},{value:G(9),symbol:"n",isMil:!0},{value:G(6),symbol:"μ",isMil:!0},{value:G(3),symbol:"m",isMil:!0},{value:new W(1),symbol:""},{value:G(3),symbol:"k"},{value:G(6),symbol:"M"},{value:G(9),symbol:"G"},{value:G(12),symbol:"T"},{value:G(15),symbol:"P"},{value:G(18),symbol:"E"},{value:G(21),symbol:"Y"},{value:G(24),symbol:"Z"}];xe.map(function(g){return g.symbol}).join(", ").replace(", ,",","),self.addEventListener("message",g=>{const{data:w}=g,{task:v}=w;let O={};switch(v){case"processExposures":O=Se(w);break;case"processEraForExposure":O=Ae(w);break}postMessage({task:v,...O})});const Ae=g=>{const{era:w,exposures:v,exitOnExposed:O,task:p,networkName:B,who:A}=g;let S=!1;const y={};return v.every(({keys:C,val:T})=>{const I=C[1],b=(T==null?void 0:T.others)??[],z=(T==null?void 0:T.own)||0,F=(T==null?void 0:T.total)||0,D=I===A;if(D){const Y=new W(z).isZero()?"0":new W(z).dividedBy(F).toString();if(y[I]={staked:z,total:F,share:Y,isValidator:D},S=!0,O)return!1}const H=b.find(Y=>Y.who===A);if(H){const Y=new W(H.value).isZero()?"0":new W(H.value).dividedBy(F).toString();if(y[I]={staked:H.value,total:F,share:Y,isValidator:D},S=!0,O)return!1}return!0}),{networkName:B,era:w,exposed:S,exposedValidators:Object.keys(y).length?y:null,task:p,who:A}},Se=g=>{const{task:w,networkName:v,era:O,units:p,exposures:B,activeAccount:A,maxNominatorRewardedPerValidator:S}=g,y=[];let C=0;const T=[],I=[];return B.forEach(({keys:b,val:z})=>{var H;C++;const F=b[1];let D=(z==null?void 0:z.others.map(Y=>({...Y,value:oe(Y.value)})))??[];if(D.length){D=D.sort((ee,U)=>{const q=new W(oe(U.value)).minus(oe(ee.value));return q.isZero()?0:q.isLessThan(0)?-1:1});const Y=Math.min(S-1,D.length),h=D.length>0?Ne(new W(((H=D[Y])==null?void 0:H.value)||0),p).toString():"0",se=D.length>S;y.push({address:F,lowestReward:h,oversubscribed:se,others:D,own:oe(z.own),total:oe(z.total)});for(const ee of D){const U=new W(oe(ee.value)),q=I.findIndex(({who:e})=>e===ee.who);q===-1?I.push({who:ee.who,value:U.toString()}):I[q].value=new W(I[q].value).plus(U).toString()}const fe=D.find(({who:ee})=>ee===A);fe!==void 0&&T.push({address:F,value:Ne(new W(oe(fe.value)),p).toString()})}}),{networkName:v,era:O,stakers:y,totalActiveNominators:I.length,activeAccountOwnStake:T,activeValidators:C,task:w,who:A}}})();
